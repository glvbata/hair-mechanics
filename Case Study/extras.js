#!/usr/bin/env node
/**
 * SEO Baseline Extras — PageSpeed, Maps, GA4, GSC (all via Playwright)
 *
 * Uses your real installed Chrome (channel: 'chrome') with a dedicated profile
 * at .auth/chrome-profile/. Google treats it as a normal Chrome login, so the
 * "this browser may not be secure" block doesn't fire. Profile persists cookies
 * automatically — no storageState file to manage.
 *
 * Usage:
 *   node extras.js --login                 # one-time: log into Google (~2 min)
 *   node extras.js "April 19 Baseline"     # monthly run against a specific baseline folder
 *   node extras.js                         # same, auto-picks the most recent baseline folder
 *
 * Data sources (all Playwright):
 *   - PageSpeed  → pagespeed.web.dev        (no login)
 *   - Maps       → google.com/maps          (no login, geolocation-locked to client city)
 *   - GA4        → analytics.google.com     (uses the signed-in profile)
 *   - GSC        → search.google.com/search-console (uses the signed-in profile)
 *
 * When the profile is not signed in, GA4/GSC skip with a clear message telling
 * you to re-run with --login. The rest of the run still completes.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { chromium } = require('playwright');

// ---------- Per-client config (edit when forking for a new client) ----------
const SITE_URL = 'https://hairmechanics.net';
const LOCAL_PACK_QUERY = 'barbershop Auburn WA';
// Must match how the property is registered in GSC. URL-prefix properties use the
// full URL with trailing slash; domain properties use "sc-domain:example.com".
const GSC_PROPERTY = 'https://hairmechanics.net/';
// GA4 numeric property ID (the "Property ID" under GA4 → Admin → Property Settings).
// Digits only, e.g. '482193057'. Without this, landing on analytics.google.com/
// just dumps you on the property chooser. Leave empty to fall back to the root
// page with a clear warning in the log.
const GA4_PROPERTY_ID = '532417952';
// Auburn, WA — locks Maps to the client's city so results don't drift to the runner's IP.
const GEOLOCATION = { latitude: 47.3073, longitude: -122.2285 };

// ---------- Fixed (don't edit per client) ----------
const VIEWPORT = { width: 1440, height: 900 };
const LOCALE = 'en-US';
const TIMEZONE = 'America/Los_Angeles';
const USER_DATA_DIR = path.join(__dirname, '.auth', 'chrome-profile');

// ---------- tiny helpers ----------
const log = (tag, msg) => console.log(`  [${tag}] ${msg}`);
const warn = (tag, msg) => console.log(`  [${tag}] ⚠️  ${msg}`);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function resolveLabel(argLabel) {
  if (argLabel) return argLabel;
  const entries = fs
    .readdirSync(__dirname, { withFileTypes: true })
    .filter((d) => d.isDirectory() && /Baseline/i.test(d.name))
    .map((d) => ({ name: d.name, mtime: fs.statSync(path.join(__dirname, d.name)).mtimeMs }))
    .sort((a, b) => b.mtime - a.mtime);
  if (!entries.length) {
    console.error('ERROR: no *Baseline* folder found. Pass a label: node extras.js "April 19 Baseline"');
    process.exit(1);
  }
  return entries[0].name;
}

// Rough heuristic: the profile exists and has a Cookies file. Not foolproof
// (logged-out Chrome also has cookies), but catches the "never logged in" case.
function hasAuth() {
  if (!fs.existsSync(USER_DATA_DIR)) return false;
  const cookies = path.join(USER_DATA_DIR, 'Default', 'Cookies');
  const network = path.join(USER_DATA_DIR, 'Default', 'Network', 'Cookies');
  return fs.existsSync(cookies) || fs.existsSync(network);
}

// Detect if Google has kicked us to a login / account-picker / reauth screen.
// Any URL on accounts.google.com means we're NOT inside the signed-in app —
// covers /signin, /ServiceLogin, /AccountChooser, /signinchooser, /speedbump,
// /DomainInterrupt, and reauth redirects.
function isLoginPage(url) {
  try {
    return new URL(url).hostname === 'accounts.google.com';
  } catch {
    return false;
  }
}

// Wait for either a signed-in signal or a login redirect, whichever comes first.
// Returns the final URL after the race settles.
async function settlePage(page, signedInSelector, maxMs = 20000) {
  const start = Date.now();
  // Give the SPA a beat to kick off redirects.
  await sleep(2500);
  while (Date.now() - start < maxMs) {
    if (isLoginPage(page.url())) return page.url();
    try {
      const el = await page.$(signedInSelector);
      if (el) return page.url();
    } catch {}
    await sleep(800);
  }
  return page.url();
}

function waitForEnter(prompt) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question(prompt, () => {
      rl.close();
      resolve();
    });
  });
}

// ---------- browser bootstrapping ----------
// Single path: real installed Chrome + dedicated persistent profile.
// `channel: 'chrome'` uses your installed Chrome (not Playwright's bundled Chromium),
// which dodges Google's "this browser may not be secure" block on sign-in.
// The profile is isolated from your everyday Chrome — cookies only touch this tool.
async function launchContext() {
  fs.mkdirSync(USER_DATA_DIR, { recursive: true });
  return await chromium.launchPersistentContext(USER_DATA_DIR, {
    channel: 'chrome',
    headless: false,
    viewport: VIEWPORT,
    locale: LOCALE,
    timezoneId: TIMEZONE,
    geolocation: GEOLOCATION,
    permissions: ['geolocation'],
    // Hide the webdriver flag that Google's login page sniffs for.
    args: ['--disable-blink-features=AutomationControlled'],
    ignoreDefaultArgs: ['--enable-automation'],
  });
}

async function closeContext(context) {
  try { await context.close(); } catch {}
}

// ---------- --login flow ----------
async function runLogin() {
  console.log('\n🔐 One-time Google login — saves a signed-in Chrome profile to reuse every month.\n');

  const context = await launchContext();
  const page = await context.newPage();

  await page.goto('https://accounts.google.com/');
  console.log('  1. Log into the Google account that has access to GA4 + GSC.');
  console.log('  2. Complete any 2FA / device prompts.');
  console.log('  3. When you see your Google avatar / account chooser, come back here.\n');
  await waitForEnter('  Press Enter once you are fully logged in... ');

  // Prime the two subdomains so their cookies are already warm next run.
  log('login', 'priming analytics.google.com...');
  await page.goto('https://analytics.google.com/', { waitUntil: 'domcontentloaded', timeout: 30000 }).catch(() => {});
  await sleep(4000);
  log('login', 'priming search.google.com/search-console...');
  await page.goto('https://search.google.com/search-console/welcome', { waitUntil: 'domcontentloaded', timeout: 30000 }).catch(() => {});
  await sleep(4000);

  await closeContext(context);

  console.log(`\n✅ Signed-in profile saved to ${path.relative(process.cwd(), USER_DATA_DIR)}`);
  console.log('   Run `node extras.js "{label}"` — GA4 and GSC will pull automatically.\n');
}

// ---------- PageSpeed (pagespeed.web.dev, no login) ----------
async function runPageSpeed(context, outDir) {
  const results = {};

  for (const strategy of ['mobile', 'desktop']) {
    const url = `https://pagespeed.web.dev/analysis?url=${encodeURIComponent(SITE_URL)}&form_factor=${strategy}`;
    log('pagespeed', `analyzing ${strategy}...`);
    const page = await context.newPage();
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

      // PageSpeed runs Lighthouse server-side, typically 20–60s. Poll
      // document.body.innerText for metric labels that only appear post-analysis —
      // more forgiving than waitForSelector('text=...') which misses when
      // labels are split across nodes / inside aria-only markup.
      log('pagespeed', `${strategy}: waiting for analysis to complete (up to 3 min)...`);
      const readyUrl = await page.waitForFunction(
        () => {
          const t = document.body.innerText || '';
          return /Largest Contentful Paint/i.test(t) && /Cumulative Layout Shift/i.test(t);
        },
        { timeout: 180000 }
      ).then(() => true).catch(() => false);

      if (!readyUrl) {
        warn('pagespeed', `${strategy}: timed out waiting for metrics — capturing whatever is on screen`);
      }
      await sleep(2000); // let gauge numbers settle

      const shot = path.join(outDir, 'screenshots', `pagespeed-${strategy}.png`);
      await page.screenshot({ path: shot, fullPage: true }).catch(() => {});
      log('pagespeed', `${strategy}: saved ${path.relative(outDir, shot)}`);

      const text = await page.evaluate(() => document.body.innerText);
      results[strategy] = {
        strategy,
        score: extractPerfScore(text),
        ...extractCoreVitals(text),
        screenshot: path.relative(outDir, shot).replace(/\\/g, '/'),
        fetched_at: new Date().toISOString(),
      };
      log('pagespeed', `${strategy}: ${results[strategy].score ?? '—'} (LCP ${results[strategy].lcp ?? '—'}, CLS ${results[strategy].cls ?? '—'})`);
    } catch (e) {
      warn('pagespeed', `${strategy}: ${e.message}`);
      results[strategy] = { strategy, error: e.message };
    } finally {
      await page.close().catch(() => {});
    }
  }

  return results;
}

function extractPerfScore(text) {
  const m = text.match(/Performance[\s\S]{0,40}?(\b\d{1,3}\b)/);
  const n = m ? Number(m[1]) : null;
  return n != null && n >= 0 && n <= 100 ? n : null;
}

function extractCoreVitals(text) {
  const pick = (label) => {
    const re = new RegExp(`${label}[\\s\\S]{0,80}?(\\d+(?:\\.\\d+)?\\s*(?:s|ms|))`, 'i');
    const m = text.match(re);
    return m ? m[1].trim() : null;
  };
  return {
    lcp: pick('Largest Contentful Paint'),
    cls: pick('Cumulative Layout Shift'),
    tbt: pick('Total Blocking Time'),
    inp: pick('Interaction to Next Paint'),
  };
}

// ---------- Maps / Local Pack ----------
async function captureMaps(context, outDir) {
  log('maps', 'capturing Auburn local pack...');
  const page = await context.newPage();
  const file = path.join(outDir, 'screenshots', 'local-pack-maps.png');

  try {
    await page.goto(`https://www.google.com/maps/search/${encodeURIComponent(LOCAL_PACK_QUERY)}`, {
      waitUntil: 'networkidle',
      timeout: 20000,
    });
  } catch (e) {
    warn('maps', `slow nav: ${e.message}`);
  }
  await page.waitForTimeout(4000);
  await page.screenshot({ path: file, fullPage: false });
  log('maps', `saved ${path.relative(outDir, file)}`);

  await page.close().catch(() => {});
  return {
    screenshot: path.relative(outDir, file).replace(/\\/g, '/'),
    query: LOCAL_PACK_QUERY,
  };
}

// ---------- GA4 (manual-confirm: user arranges the view, then presses Enter) ----------
// GA4/GSC SPAs have too many conditional states (property chooser, reauth,
// consent, date-range picker) to auto-detect reliably. Since we run this
// monthly, it's cheaper to let the human confirm the view is right.
async function fetchGA4(context, outDir) {
  const page = await context.newPage();

  try {
    const ga4Url = GA4_PROPERTY_ID
      ? `https://analytics.google.com/analytics/web/#/p${GA4_PROPERTY_ID}/reports/reportinghub`
      : 'https://analytics.google.com/';
    if (!GA4_PROPERTY_ID) {
      warn('ga4', 'GA4_PROPERTY_ID not set at top of extras.js — you will need to pick the property manually.');
    }
    log('ga4', `opening ${ga4Url} ...`);
    await page.goto(ga4Url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.bringToFront().catch(() => {});

    // Short-circuit if we're stuck on a sign-in page — no point asking Gian
    // to stare at a login wall.
    await sleep(3000);
    if (isLoginPage(page.url())) {
      const landing = path.join(outDir, 'screenshots', 'ga4-landing.png');
      await page.screenshot({ path: landing, fullPage: true }).catch(() => {});
      warn('ga4', `landed on ${page.url()} — profile is not signed in`);
      warn('ga4', 'fix: node extras.js --login  (the dedicated profile expired, not your everyday Chrome)');
      await page.close().catch(() => {});
      return {
        skipped: true,
        reason: 'profile not signed in (run --login)',
        landed_on: page.url(),
        landing_screenshot: path.relative(outDir, landing).replace(/\\/g, '/'),
      };
    }

    console.log('');
    console.log('  👉 [GA4] Arrange the view in the Chrome window:');
    console.log('     - Pick the Hair Mechanics property if prompted');
    console.log('     - Set the date range you want (e.g. Last 28 days)');
    console.log('     - Scroll to the Users / Sessions cards so they are visible');
    console.log('     Then come back here.');
    await waitForEnter('  Press Enter to capture the GA4 screenshot... ');

    const shot = path.join(outDir, 'screenshots', 'ga4-home.png');
    await page.screenshot({ path: shot, fullPage: true });
    log('ga4', `saved ${path.relative(outDir, shot)}`);

    const text = await page.evaluate(() => document.body.innerText);
    const users = matchNumberNear(text, /Users/);
    const sessions = matchNumberNear(text, /Sessions/);

    await page.close().catch(() => {});
    return {
      screenshot: path.relative(outDir, shot).replace(/\\/g, '/'),
      users_guess: users,
      sessions_guess: sessions,
      note: 'GA4 SPA DOM is unstable — numbers above are best-effort regex from visible text. Screenshot is the source of truth.',
      fetched_at: new Date().toISOString(),
    };
  } catch (e) {
    warn('ga4', e.message);
    await page.close().catch(() => {});
    return { error: e.message };
  }
}

// ---------- GSC (Playwright + signed-in profile) ----------
async function fetchGSC(context, outDir) {
  const page = await context.newPage();

  try {
    const resourceId = encodeURIComponent(GSC_PROPERTY);
    const url = `https://search.google.com/search-console/performance/search-analytics?resource_id=${resourceId}&num_of_days=28`;
    log('gsc', `opening Performance report (28 days)...`);
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.bringToFront().catch(() => {});

    await sleep(3000);
    if (isLoginPage(page.url())) {
      const landing = path.join(outDir, 'screenshots', 'gsc-landing.png');
      await page.screenshot({ path: landing, fullPage: true }).catch(() => {});
      warn('gsc', `landed on ${page.url()} — profile is not signed in`);
      warn('gsc', 'fix: node extras.js --login  (the dedicated profile expired, not your everyday Chrome)');
      await page.close().catch(() => {});
      return {
        skipped: true,
        reason: 'profile not signed in (run --login)',
        landed_on: page.url(),
        landing_screenshot: path.relative(outDir, landing).replace(/\\/g, '/'),
      };
    }

    console.log('');
    console.log('  👉 [GSC] Arrange the view in the Chrome window:');
    console.log('     - Confirm the property is Hair Mechanics');
    console.log('     - Set the date range (default is 3 months — 28 days is fine too)');
    console.log('     - Make sure Total Clicks / Impressions / CTR / Avg Position cards are visible');
    console.log('     Then come back here.');
    await waitForEnter('  Press Enter to capture the GSC screenshot... ');

    const shot = path.join(outDir, 'screenshots', 'gsc-performance.png');
    await page.screenshot({ path: shot, fullPage: true });
    log('gsc', `saved ${path.relative(outDir, shot)}`);

    const text = await page.evaluate(() => document.body.innerText);
    const clicks = matchNumberNear(text, /Total clicks/i);
    const impressions = matchNumberNear(text, /Total impressions/i);
    const ctr = matchPercentNear(text, /Average CTR/i);
    const position = matchDecimalNear(text, /Average position/i);

    await page.close().catch(() => {});
    return {
      property: GSC_PROPERTY,
      screenshot: path.relative(outDir, shot).replace(/\\/g, '/'),
      clicks,
      impressions,
      ctr_pct: ctr,
      avg_position: position,
      note: 'Numbers parsed from rendered text. Screenshot is the source of truth.',
      fetched_at: new Date().toISOString(),
    };
  } catch (e) {
    warn('gsc', e.message);
    await page.close().catch(() => {});
    return { error: e.message };
  }
}

// ---------- text-extraction helpers ----------
function matchNumberNear(text, labelRe) {
  const re = new RegExp(`${labelRe.source}[\\s\\S]{0,120}?([\\d,]+(?:\\.\\d+)?\\s*[KMB]?)`, labelRe.flags);
  const m = text.match(re);
  if (!m) return null;
  const raw = m[1].replace(/,/g, '').trim();
  const mult = raw.endsWith('K') ? 1e3 : raw.endsWith('M') ? 1e6 : raw.endsWith('B') ? 1e9 : 1;
  const n = parseFloat(raw) * mult;
  return Number.isFinite(n) ? Math.round(n) : null;
}

function matchPercentNear(text, labelRe) {
  const re = new RegExp(`${labelRe.source}[\\s\\S]{0,80}?([\\d.]+)\\s*%`, labelRe.flags);
  const m = text.match(re);
  return m ? Number(m[1]) : null;
}

function matchDecimalNear(text, labelRe) {
  const re = new RegExp(`${labelRe.source}[\\s\\S]{0,80}?([\\d]+\\.[\\d]+)`, labelRe.flags);
  const m = text.match(re);
  return m ? Number(m[1]) : null;
}

// ---------- baseline.md patching ----------
function renderObservations(extras) {
  const lines = [];
  lines.push(`## Observations — auto-captured ${new Date().toLocaleString('en-US', { timeZone: TIMEZONE })} (${TIMEZONE})`);
  lines.push('');

  if (extras.ga4?.skipped) {
    lines.push(`**GA4:** _skipped — ${extras.ga4.reason}_`);
  } else if (extras.ga4?.error) {
    lines.push(`**GA4:** _error — ${extras.ga4.error}_`);
  } else if (extras.ga4) {
    const g = extras.ga4;
    const users = g.users_guess ?? '—';
    const sessions = g.sessions_guess ?? '—';
    lines.push(`**GA4:** ${users} users · ${sessions} sessions _(parsed from screenshot — source of truth: [${g.screenshot}](${g.screenshot}))_`);
  }
  lines.push('');

  if (extras.gsc?.skipped) {
    lines.push(`**GSC:** _skipped — ${extras.gsc.reason}_`);
  } else if (extras.gsc?.error) {
    lines.push(`**GSC:** _error — ${extras.gsc.error}_`);
  } else if (extras.gsc) {
    const s = extras.gsc;
    const clicks = s.clicks ?? '—';
    const impressions = s.impressions ?? '—';
    const ctr = s.ctr_pct != null ? `${s.ctr_pct}%` : '—';
    const pos = s.avg_position ?? '—';
    lines.push(`**GSC (28d):** ${clicks} clicks · ${impressions} impressions · ${ctr} CTR · avg pos ${pos} _(screenshot: [${s.screenshot}](${s.screenshot}))_`);
  }
  lines.push('');

  if (extras.maps?.error) {
    lines.push(`**Local Pack / Maps:** _error — ${extras.maps.error}_`);
  } else if (extras.maps) {
    lines.push(`**Local Pack / Maps:** captured [${extras.maps.screenshot}](${extras.maps.screenshot}) for "${extras.maps.query}". Note business position manually (in pack? rank 1/2/3 or absent).`);
  }
  lines.push('');

  if (extras.pagespeed) {
    const m = extras.pagespeed.mobile || {};
    const d = extras.pagespeed.desktop || {};
    lines.push(
      `**PageSpeed:** Mobile **${m.score ?? '—'}** (LCP ${m.lcp ?? '—'}, CLS ${m.cls ?? '—'}) · Desktop **${d.score ?? '—'}** (LCP ${d.lcp ?? '—'}, CLS ${d.cls ?? '—'})`
    );
  }
  lines.push('');

  return lines.join('\n');
}

function upsertObservations(baselineMdPath, block) {
  const original = fs.readFileSync(baselineMdPath, 'utf8');
  const startIdx = original.indexOf('## Observations');
  const anomaliesIdx = original.indexOf('## Anomalies');

  let next;
  if (startIdx === -1) {
    next = original.trimEnd() + '\n\n' + block + '\n';
  } else if (anomaliesIdx === -1 || anomaliesIdx < startIdx) {
    next = original.slice(0, startIdx) + block + '\n';
  } else {
    next = original.slice(0, startIdx) + block + '\n' + original.slice(anomaliesIdx);
  }
  fs.writeFileSync(baselineMdPath, next);
}

// ---------- main ----------
(async () => {
  const args = process.argv.slice(2);
  const labelArg = args.find((a) => !a.startsWith('--'));

  if (args.includes('--login')) {
    await runLogin();
    return;
  }

  const label = resolveLabel(labelArg);
  const outDir = path.join(__dirname, label);
  if (!fs.existsSync(outDir)) {
    console.error(`ERROR: baseline folder not found: ${outDir}`);
    process.exit(1);
  }
  fs.mkdirSync(path.join(outDir, 'screenshots'), { recursive: true });

  console.log(`\n📊 SEO Baseline Extras — ${label}`);
  console.log(`   Output: ${outDir}\n`);

  if (!hasAuth()) {
    console.log('ℹ️  No signed-in profile yet — GA4 and GSC will be skipped.');
    console.log('   First-time setup: node extras.js --login (~2 minutes)\n');
  }

  const context = await launchContext();
  const extras = { label, captured_at: new Date().toISOString() };

  try { extras.pagespeed = await runPageSpeed(context, outDir); } catch (e) { warn('pagespeed', e.message); extras.pagespeed = { error: e.message }; }
  try { extras.maps = await captureMaps(context, outDir); } catch (e) { warn('maps', e.message); extras.maps = { error: e.message }; }
  try { extras.ga4 = await fetchGA4(context, outDir); } catch (e) { warn('ga4', e.message); extras.ga4 = { error: e.message }; }
  try { extras.gsc = await fetchGSC(context, outDir); } catch (e) { warn('gsc', e.message); extras.gsc = { error: e.message }; }

  await closeContext(context);

  fs.writeFileSync(path.join(outDir, 'extras.json'), JSON.stringify(extras, null, 2));

  const baselineMdPath = path.join(outDir, 'baseline.md');
  if (fs.existsSync(baselineMdPath)) {
    upsertObservations(baselineMdPath, renderObservations(extras));
    log('md', 'baseline.md Observations updated');
  } else {
    warn('md', 'baseline.md not found, skipped patch');
  }

  console.log(`\n✅ Done.\n   Wrote:  extras.json\n   Patched: baseline.md\n   Folder: ${outDir}\n`);
})();
