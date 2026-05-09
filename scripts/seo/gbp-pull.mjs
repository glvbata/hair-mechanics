/**
 * Pull Google Business Profile data for Hair Mechanics:
 *   1. Search keyword impressions (monthly, last 12 months) — same data
 *      as the GBP UI's "Searches that showed your Business Profile" panel.
 *   2. Performance metrics (daily, last 90 days) — calls, direction
 *      requests, website clicks, profile impressions across maps + search.
 *
 * Outputs to docs/seo-reports/<today>/:
 *   - gbp-keywords.json + gbp-keywords.md   (the search-terms list)
 *   - gbp-performance.json + gbp-performance.md  (the action metrics)
 *
 * First run: discovers the GBP account + location for the authenticated
 * Google account, caches the location name to .secrets/gbp-location.json
 * so subsequent runs skip the discovery roundtrip.
 *
 * Run: npm run gbp:pull
 *
 * Requires:
 *   - .secrets/gsc-token.json with `business.manage` scope (re-auth via
 *     `npm run seo:auth` if you only have the original webmasters scope)
 *   - Business Profile API enabled in your Cloud project
 */

import { google } from 'googleapis';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';

const CLIENT_PATH = '.secrets/gsc-oauth-client.json';
const TOKEN_PATH = '.secrets/gsc-token.json';
const LOCATION_CACHE = '.secrets/gbp-location.json';
const REPORT_DIR = 'docs/seo-reports';

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, '').split('=');
    return [k, v ?? true];
  }),
);

async function authedClient() {
  const raw = JSON.parse(await readFile(CLIENT_PATH, 'utf8'));
  const creds = raw.installed || raw.web;
  const tokens = JSON.parse(await readFile(TOKEN_PATH, 'utf8'));
  const oAuth2 = new google.auth.OAuth2(creds.client_id, creds.client_secret);
  oAuth2.setCredentials(tokens);
  return oAuth2;
}

async function discoverLocation(auth) {
  // Step 1: list accounts the authenticated user has access to.
  // Endpoint: mybusinessaccountmanagement.accounts.list
  console.log('Discovering GBP account...');
  const acctRes = await fetch('https://mybusinessaccountmanagement.googleapis.com/v1/accounts', {
    headers: { Authorization: `Bearer ${(await auth.getAccessToken()).token}` },
  });
  if (!acctRes.ok) {
    throw new Error(`Account list failed: ${acctRes.status} ${await acctRes.text()}`);
  }
  const acctData = await acctRes.json();
  const accounts = acctData.accounts || [];
  if (!accounts.length) {
    throw new Error('No GBP accounts accessible to this Google user.');
  }

  // Pick the first account, or use --account if specified.
  const acct = args.account
    ? accounts.find((a) => a.name === args.account || a.accountName === args.account)
    : accounts[0];
  if (!acct) throw new Error(`Account '${args.account}' not found among: ${accounts.map((a) => a.name).join(', ')}`);
  console.log(`Using account: ${acct.accountName || acct.name}`);

  // Step 2: list locations under the account.
  // Endpoint: mybusinessbusinessinformation.accounts.locations.list
  // The readMask is required — minimum is `name`.
  console.log('Discovering location...');
  const locUrl = `https://mybusinessbusinessinformation.googleapis.com/v1/${acct.name}/locations?readMask=name,title,storefrontAddress`;
  const locRes = await fetch(locUrl, {
    headers: { Authorization: `Bearer ${(await auth.getAccessToken()).token}` },
  });
  if (!locRes.ok) {
    throw new Error(`Location list failed: ${locRes.status} ${await locRes.text()}`);
  }
  const locData = await locRes.json();
  const locations = locData.locations || [];
  if (!locations.length) {
    throw new Error(`No locations under account ${acct.name}.`);
  }

  // Match by title containing "Hair Mechanics", or use --location.
  const loc = args.location
    ? locations.find((l) => l.name === args.location || l.title?.toLowerCase().includes(args.location.toLowerCase()))
    : locations.find((l) => /hair\s*mechanics/i.test(l.title || '')) || locations[0];
  if (!loc) throw new Error(`Location not found among: ${locations.map((l) => l.title).join(', ')}`);

  console.log(`Using location: ${loc.title} (${loc.name})`);
  return { account: acct.name, location: loc.name, title: loc.title };
}

async function getOrDiscoverLocation(auth) {
  if (existsSync(LOCATION_CACHE) && !args.rediscover) {
    return JSON.parse(await readFile(LOCATION_CACHE, 'utf8'));
  }
  const info = await discoverLocation(auth);
  await mkdir('.secrets', { recursive: true });
  await writeFile(LOCATION_CACHE, JSON.stringify(info, null, 2));
  console.log(`Cached → ${LOCATION_CACHE}`);
  return info;
}

function ymToMonthKey(y, m) {
  return `${y}-${String(m).padStart(2, '0')}`;
}
function isoDaysAgo(n) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  return d.toISOString().slice(0, 10);
}

async function pullSearchKeywords(auth, location) {
  // GBP UI shows ~last full month of search terms; the API returns up to 12.
  const now = new Date();
  const end = { year: now.getUTCFullYear(), month: now.getUTCMonth() + 1 };
  // 12 months back, avoiding month=0 wraparound.
  const startMonthAbs = end.year * 12 + (end.month - 1) - 11;
  const start = { year: Math.floor(startMonthAbs / 12), month: (startMonthAbs % 12) + 1 };

  const params = new URLSearchParams({
    'monthlyRange.startMonth.year': String(start.year),
    'monthlyRange.startMonth.month': String(start.month),
    'monthlyRange.endMonth.year': String(end.year),
    'monthlyRange.endMonth.month': String(end.month),
    pageSize: '1000',
  });
  const url = `https://businessprofileperformance.googleapis.com/v1/${location}/searchkeywords/impressions/monthly?${params}`;

  console.log(`Pulling GBP search keywords (${ymToMonthKey(start.year, start.month)} → ${ymToMonthKey(end.year, end.month)})...`);
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${(await auth.getAccessToken()).token}` },
  });
  if (!res.ok) {
    throw new Error(`Search keywords pull failed: ${res.status} ${await res.text()}`);
  }
  const data = await res.json();
  return data.searchKeywordsCounts || [];
}

const PERF_METRICS = [
  'BUSINESS_IMPRESSIONS_DESKTOP_MAPS',
  'BUSINESS_IMPRESSIONS_DESKTOP_SEARCH',
  'BUSINESS_IMPRESSIONS_MOBILE_MAPS',
  'BUSINESS_IMPRESSIONS_MOBILE_SEARCH',
  'BUSINESS_DIRECTION_REQUESTS',
  'CALL_CLICKS',
  'WEBSITE_CLICKS',
  'BUSINESS_CONVERSATIONS',
  'BUSINESS_BOOKINGS',
];

async function pullPerformance(auth, location) {
  const days = Number(args.days) || 90;
  const start = isoDaysAgo(days);
  // GBP performance data lags ~3 days.
  const end = isoDaysAgo(3);
  const [sy, sm, sd] = start.split('-');
  const [ey, em, ed] = end.split('-');

  const params = new URLSearchParams();
  for (const m of PERF_METRICS) params.append('dailyMetrics', m);
  params.set('dailyRange.startDate.year', sy);
  params.set('dailyRange.startDate.month', String(Number(sm)));
  params.set('dailyRange.startDate.day', String(Number(sd)));
  params.set('dailyRange.endDate.year', ey);
  params.set('dailyRange.endDate.month', String(Number(em)));
  params.set('dailyRange.endDate.day', String(Number(ed)));

  const url = `https://businessprofileperformance.googleapis.com/v1/${location}:fetchMultiDailyMetricsTimeSeries?${params}`;
  console.log(`Pulling GBP performance metrics (${start} → ${end})...`);
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${(await auth.getAccessToken()).token}` },
  });
  if (!res.ok) {
    throw new Error(`Performance pull failed: ${res.status} ${await res.text()}`);
  }
  return await res.json();
}

function keywordsToMarkdown(rows, info) {
  const lines = [];
  lines.push(`# GBP Search Keywords — ${info.title}`);
  lines.push(`Pulled ${new Date().toISOString().slice(0, 10)} · ${rows.length} keywords across last 12 months\n`);
  lines.push('| # | Search term | Impressions |');
  lines.push('|---:|---|---:|');
  // Sort by total impressions across all months.
  const totals = rows.map((r) => {
    const total = (r.insightsValue?.value && Number(r.insightsValue.value)) || 0;
    return { keyword: r.searchKeyword, total, threshold: r.insightsValue?.threshold };
  });
  totals.sort((a, b) => (b.total || (b.threshold ? Number(b.threshold) - 1 : 0)) - (a.total || 0));
  totals.forEach((t, i) => {
    const display = t.total > 0 ? t.total.toLocaleString() : t.threshold ? `< ${t.threshold}` : '—';
    lines.push(`| ${i + 1} | ${t.keyword} | ${display} |`);
  });
  return lines.join('\n');
}

function performanceToMarkdown(data, info) {
  const lines = [];
  lines.push(`# GBP Performance — ${info.title}`);
  lines.push(`Pulled ${new Date().toISOString().slice(0, 10)} · last ${Number(args.days) || 90} days\n`);

  const series = data.multiDailyMetricTimeSeries || [];
  // Each series item has dailyMetricTimeSeries[].timeSeries.datedValues[]
  // Aggregate: total per metric.
  const totals = {};
  for (const s of series) {
    for (const m of s.dailyMetricTimeSeries || []) {
      const total = (m.timeSeries?.datedValues || []).reduce(
        (a, v) => a + (Number(v.value) || 0),
        0,
      );
      totals[m.dailyMetric] = total;
    }
  }

  lines.push('| Metric | Total |');
  lines.push('|---|---:|');
  for (const m of PERF_METRICS) {
    const v = totals[m];
    if (v == null) continue;
    lines.push(`| ${m} | ${v.toLocaleString()} |`);
  }

  // Headline numbers — what Glen actually cares about.
  const totalImpressions =
    (totals.BUSINESS_IMPRESSIONS_DESKTOP_MAPS || 0) +
    (totals.BUSINESS_IMPRESSIONS_DESKTOP_SEARCH || 0) +
    (totals.BUSINESS_IMPRESSIONS_MOBILE_MAPS || 0) +
    (totals.BUSINESS_IMPRESSIONS_MOBILE_SEARCH || 0);

  lines.push('');
  lines.push('## Business outcomes');
  lines.push(`- **${(totals.CALL_CLICKS || 0).toLocaleString()}** phone calls placed from the GBP listing`);
  lines.push(`- **${(totals.BUSINESS_DIRECTION_REQUESTS || 0).toLocaleString()}** direction requests (people heading to the shop)`);
  lines.push(`- **${(totals.WEBSITE_CLICKS || 0).toLocaleString()}** website clicks from the listing`);
  lines.push(`- **${totalImpressions.toLocaleString()}** total profile impressions (Maps + Search, mobile + desktop)`);

  return lines.join('\n');
}

async function main() {
  const auth = await authedClient();
  const info = await getOrDiscoverLocation(auth);

  const stamp = new Date().toISOString().slice(0, 10);
  const runDir = `${REPORT_DIR}/${stamp}`;
  await mkdir(runDir, { recursive: true });

  // Search keywords
  try {
    const rows = await pullSearchKeywords(auth, info.location);
    await writeFile(`${runDir}/gbp-keywords.json`, JSON.stringify({ ...info, rows }, null, 2));
    await writeFile(`${runDir}/gbp-keywords.md`, keywordsToMarkdown(rows, info));
    console.log(`✓ ${rows.length} GBP keywords → ${runDir}/gbp-keywords.{json,md}`);
  } catch (e) {
    console.warn(`⚠ Keyword pull failed: ${e.message}`);
  }

  // Performance metrics
  try {
    const perf = await pullPerformance(auth, info.location);
    await writeFile(`${runDir}/gbp-performance.json`, JSON.stringify({ ...info, ...perf }, null, 2));
    await writeFile(`${runDir}/gbp-performance.md`, performanceToMarkdown(perf, info));
    console.log(`✓ GBP performance → ${runDir}/gbp-performance.{json,md}`);
  } catch (e) {
    console.warn(`⚠ Performance pull failed: ${e.message}`);
  }
}

main().catch((e) => {
  const msg = e.message || String(e);
  if (/invalid_grant|invalid_token|expired|unauthorized/i.test(msg)) {
    console.error('GBP pull failed: token rejected (likely expired or missing business.manage scope).');
    console.error('Re-authenticate with: npm run seo:auth');
    console.error('Then make sure business.manage scope is included in scripts/seo/gsc-auth.mjs');
    console.error('Original error:', msg);
  } else if (/SERVICE_DISABLED|API .* has not been used|disabled/i.test(msg)) {
    console.error('GBP pull failed: a required API is disabled in your Cloud project.');
    console.error('Enable in https://console.cloud.google.com/apis/library — search for and enable:');
    console.error('  - My Business Account Management API');
    console.error('  - My Business Business Information API');
    console.error('  - Business Profile Performance API');
    console.error('Original error:', msg);
  } else {
    console.error('GBP pull failed:', msg);
  }
  process.exit(1);
});
