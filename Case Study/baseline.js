#!/usr/bin/env node
/**
 * SEO Local Baseline — Playwright edition
 *
 * Captures dated, comparable Google SERP snapshots for a locked keyword list,
 * so ranking changes can be tracked month-over-month.
 *
 * Usage:
 *   node baseline.js                       # label defaults to "{Month YYYY} Baseline"
 *   node baseline.js "April 2026 Baseline" # custom label
 *
 * Prerequisites (one-time):
 *   npm install
 *   npx playwright install chromium
 *
 * Output:
 *   ./{label}/
 *     ├── screenshots/
 *     │   ├── 01-{slug}-p1.png          (full page 1)
 *     │   └── 01-{slug}-p2.png          (positions 11-20)
 *     ├── manifest.json
 *     └── baseline.md
 *
 * Methodology rules (DO NOT change mid-series — comparability breaks):
 *   - Viewport: 1440 × 900 desktop
 *   - Fresh browser context each run (no cookies, no login, no extensions)
 *   - en-US locale, America/Los_Angeles timezone
 *   - Two full-page captures per keyword: page 1, page 2 (via &start=10)
 *   - Keyword order: exactly as listed in keywords.txt
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// ---------- config ----------
const VIEWPORT = { width: 1440, height: 900 };
const LOCALE = 'en-US';
const TIMEZONE = 'America/Los_Angeles';
const PAGE_SETTLE_MS = 2500; // give ads + map to render
const BETWEEN_KEYWORDS_MS = 1500; // be polite, avoid triggering rate limiting

// ---------- helpers ----------
const slugify = (kw) =>
  kw.toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const pad2 = (n) => String(n).padStart(2, '0');

function readKeywords() {
  const file = path.join(__dirname, 'keywords.txt');
  if (!fs.existsSync(file)) {
    console.error('ERROR: keywords.txt not found at', file);
    process.exit(1);
  }
  return fs.readFileSync(file, 'utf8')
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#'));
}

function defaultLabel() {
  const d = new Date();
  const month = d.toLocaleString('en-US', { month: 'long' });
  return `${month} ${d.getFullYear()} Baseline`;
}

async function dismissConsent(page) {
  // Google occasionally shows a cookie/consent banner. Best-effort dismissal.
  const selectors = [
    'button:has-text("Accept all")',
    'button:has-text("Reject all")',
    'button[aria-label*="Accept"]',
    'button[aria-label*="Reject"]',
  ];
  for (const sel of selectors) {
    try {
      const btn = await page.$(sel);
      if (btn) {
        await btn.click({ timeout: 1000 });
        await page.waitForTimeout(500);
        return true;
      }
    } catch (_) { /* keep trying */ }
  }
  return false;
}

async function detectCaptcha(page) {
  const indicators = [
    'form#captcha-form',
    'iframe[src*="recaptcha"]',
    'text=unusual traffic',
    'text=Our systems have detected',
  ];
  for (const sel of indicators) {
    try {
      const el = await page.$(sel);
      if (el) return true;
    } catch (_) {}
  }
  return false;
}

// ---------- main ----------
(async () => {
  const label = process.argv[2] || defaultLabel();
  const keywords = readKeywords();

  if (keywords.length === 0) {
    console.error('ERROR: keywords.txt has no keywords (only comments/blanks)');
    process.exit(1);
  }

  const outDir = path.join(__dirname, label);
  const shotsDir = path.join(outDir, 'screenshots');
  fs.mkdirSync(shotsDir, { recursive: true });

  console.log(`\n📸 SEO Local Baseline — ${label}`);
  console.log(`   Keywords: ${keywords.length}`);
  console.log(`   Output:   ${outDir}\n`);

  const startedAt = new Date().toISOString();
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: VIEWPORT,
    locale: LOCALE,
    timezoneId: TIMEZONE,
    // No storageState — fresh context every time = logged-out, no cookies
  });
  const page = await context.newPage();

  const anomalies = [];
  const captured = [];

  for (let i = 0; i < keywords.length; i++) {
    const kw = keywords[i];
    const nn = pad2(i + 1);
    const slug = slugify(kw);
    const q = encodeURIComponent(kw);

    for (const { name, start } of [{ name: 'p1', start: 0 }, { name: 'p2', start: 10 }]) {
      const url = `https://www.google.com/search?q=${q}${start ? `&start=${start}` : ''}`;
      const file = `${nn}-${slug}-${name}.png`;
      const filePath = path.join(shotsDir, file);

      console.log(`  [${nn}] ${kw} — ${name}`);
      try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
      } catch (e) {
        console.log(`       ⚠️  navigation slow, continuing: ${e.message}`);
      }

      if (start === 0) {
        await dismissConsent(page);
      }

      await page.waitForTimeout(PAGE_SETTLE_MS);

      if (await detectCaptcha(page)) {
        anomalies.push(`${kw} (${name}): CAPTCHA detected — manual solve required`);
        console.log(`       🚧 CAPTCHA — solve it in the browser, then press Enter here`);
        await new Promise((resolve) => process.stdin.once('data', resolve));
      }

      await page.screenshot({ path: filePath, fullPage: true });
      captured.push({ n: nn, slug, query: kw, page: name, file, url });
    }

    await page.waitForTimeout(BETWEEN_KEYWORDS_MS);
  }

  await browser.close();
  const finishedAt = new Date().toISOString();

  // ---------- manifest.json ----------
  const manifest = {
    business: 'Hair Mechanics',
    label,
    captured_at: startedAt,
    finished_at: finishedAt,
    intended_location: 'Auburn, WA',
    viewport: VIEWPORT,
    locale: LOCALE,
    timezone: TIMEZONE,
    browser: 'chromium (Playwright, fresh context, logged-out)',
    keywords: keywords.map((kw, i) => ({ n: pad2(i + 1), slug: slugify(kw), query: kw })),
    captures: captured,
    anomalies,
  };
  fs.writeFileSync(path.join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2));

  // ---------- baseline.md ----------
  const dateStr = new Date(startedAt).toLocaleString('en-US', { timeZone: TIMEZONE });
  const indexRows = keywords
    .map((kw, i) => {
      const n = pad2(i + 1);
      const slug = slugify(kw);
      return `| ${n} | ${kw} | [p1](screenshots/${n}-${slug}-p1.png) | [p2](screenshots/${n}-${slug}-p2.png) |`;
    })
    .join('\n');

  const anomaliesSection = anomalies.length
    ? anomalies.map((a) => `- ${a}`).join('\n')
    : '_None._';

  const md = `# Hair Mechanics — ${label}

**Date captured:** ${dateStr} (${TIMEZONE})
**Captured by:** baseline.js (Playwright, Chromium, fresh context)
**Search location (intended):** Auburn, WA
**Browser state:** logged-out, no cookies, ${LOCALE} locale, ${TIMEZONE}
**Viewport:** ${VIEWPORT.width}×${VIEWPORT.height}

## Keywords captured (in lock order)
${keywords.map((kw, i) => `${pad2(i + 1)}. ${kw}`).join('\n')}

## File index
| # | Keyword | Page 1 | Page 2 |
|---|---------|--------|--------|
${indexRows}

## Observations (fill in manually)
- Where does Hair Mechanics rank for each keyword? (note organic position, or "not in top 20")
- Is Hair Mechanics in the local pack? (position 1/2/3, or "not present")
- Top 3 competitors appearing consistently across keywords?
- Anything that changed vs. the previous baseline?
- Any SERP feature changes (People Also Ask, Knowledge Panel, featured snippet)?

## Anomalies
${anomaliesSection}

## How to compare to next month
Re-run \`node baseline.js\` from this directory with a new label. File naming is identical,
so screenshots can be diffed side-by-side by filename. Keyword order is locked in
\`../keywords.txt\` — do not change mid-series.
`;
  fs.writeFileSync(path.join(outDir, 'baseline.md'), md);

  console.log(`\n✅ Done.`);
  console.log(`   Screenshots: ${captured.length}`);
  console.log(`   Anomalies:   ${anomalies.length}`);
  console.log(`   Output:      ${outDir}\n`);
})();
