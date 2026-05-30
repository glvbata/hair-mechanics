/**
 * Pull Google Analytics 4 data for Hair Mechanics — the business-outcome
 * layer that GSC (search) and GBP (map listing) don't cover.
 *
 * Unlike GSC, GA4 already has months of history, so this shows month-over-month
 * improvement IMMEDIATELY — no need to wait for a second pull.
 *
 * Pulls (current 28 days vs the prior 28 days):
 *   - Visitors, new visitors, sessions, page views
 *   - Conversion events fired by src/utils/analytics.ts:
 *     phone_call, sms_click, get_directions, review_click
 *   - Traffic by channel (organic / direct / referral / social)
 *
 * Outputs to docs/seo-reports/<today>/:
 *   - ga4-summary.json  (machine-readable, used by the client report page)
 *   - ga4-summary.md    (human-readable)
 *
 * First run auto-discovers the GA4 property for the authenticated account and
 * caches it to .secrets/ga4-property.json.
 *
 * Run: npm run ga4:pull
 *
 * Requires:
 *   - .secrets/gsc-token.json with analytics.readonly scope (re-auth via
 *     `npm run seo:auth` if you authed before this scope was added)
 *   - Google Analytics Data API + Admin API enabled in the Cloud project
 *   - The authed Google account must have at least Viewer on the GA4 property
 */

import { google } from 'googleapis';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';

const CLIENT_PATH = '.secrets/gsc-oauth-client.json';
const TOKEN_PATH = '.secrets/gsc-token.json';
const PROPERTY_CACHE = '.secrets/ga4-property.json';
const REPORT_DIR = 'docs/seo-reports';

// Custom conversion events fired in src/utils/analytics.ts. These are the
// numbers Glen actually cares about — the website driving real contact.
const CONVERSION_EVENTS = ['phone_call', 'sms_click', 'get_directions', 'review_click'];
const EVENT_LABELS = {
  phone_call: 'Phone calls',
  sms_click: 'Text-message clicks',
  get_directions: 'Directions requests',
  review_click: 'Review-link clicks',
};

async function authedToken() {
  const raw = JSON.parse(await readFile(CLIENT_PATH, 'utf8'));
  const creds = raw.installed || raw.web;
  const tokens = JSON.parse(await readFile(TOKEN_PATH, 'utf8'));
  const oAuth2 = new google.auth.OAuth2(creds.client_id, creds.client_secret);
  oAuth2.setCredentials(tokens);
  return oAuth2;
}

async function bearer(auth) {
  return (await auth.getAccessToken()).token;
}

async function discoverProperty(auth) {
  // Admin API lists account summaries → property summaries.
  console.log('Discovering GA4 property...');
  const res = await fetch('https://analyticsadmin.googleapis.com/v1beta/accountSummaries', {
    headers: { Authorization: `Bearer ${await bearer(auth)}` },
  });
  if (!res.ok) throw new Error(`Property discovery failed: ${res.status} ${await res.text()}`);
  const data = await res.json();
  const summaries = data.accountSummaries || [];
  const props = summaries.flatMap((s) =>
    (s.propertySummaries || []).map((p) => ({
      property: p.property, // "properties/123456789"
      displayName: p.displayName,
      account: s.displayName,
    })),
  );
  if (!props.length) {
    throw new Error('No GA4 properties accessible to this account. Either auth with the account that owns GA4, or grant it Viewer access on the property.');
  }
  // Prefer a property whose name mentions Hair Mechanics; else first.
  const pick =
    props.find((p) => /hair\s*mechanics/i.test(p.displayName)) || props[0];
  console.log(`Using property: ${pick.displayName} (${pick.property})`);
  return pick;
}

async function getOrDiscoverProperty(auth) {
  if (existsSync(PROPERTY_CACHE)) {
    return JSON.parse(await readFile(PROPERTY_CACHE, 'utf8'));
  }
  const info = await discoverProperty(auth);
  await mkdir('.secrets', { recursive: true });
  await writeFile(PROPERTY_CACHE, JSON.stringify(info, null, 2));
  console.log(`Cached → ${PROPERTY_CACHE}`);
  return info;
}

async function runReport(auth, propertyId, body) {
  const res = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/${propertyId}:runReport`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${await bearer(auth)}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  );
  if (!res.ok) throw new Error(`runReport failed: ${res.status} ${await res.text()}`);
  return res.json();
}

// Two windows: current 28 days, and the 28 days before that. Queried
// SEPARATELY (one date range each) — GA4's multi-dateRange response appends
// an ambiguous `dateRange` dimension that's easy to misparse, so we avoid it.
const WINDOWS = {
  current: { startDate: '28daysAgo', endDate: 'yesterday' },
  previous: { startDate: '56daysAgo', endDate: '29daysAgo' },
};

function pctDelta(cur, prev) {
  if (!prev) return cur > 0 ? 100 : 0;
  return Math.round(((cur - prev) / prev) * 100);
}

// Pull headline totals + conversion events for a single date range.
async function fetchWindow(auth, propertyId, range) {
  const totalsRes = await runReport(auth, propertyId, {
    dateRanges: [range],
    metrics: [
      { name: 'totalUsers' },
      { name: 'newUsers' },
      { name: 'sessions' },
      { name: 'screenPageViews' },
    ],
  });
  const totals = {};
  const headers = (totalsRes.metricHeaders || []).map((m) => m.name);
  const row = (totalsRes.rows || [])[0];
  headers.forEach((m, i) => {
    totals[m] = Number(row?.metricValues?.[i]?.value || 0);
  });

  const eventsRes = await runReport(auth, propertyId, {
    dateRanges: [range],
    dimensions: [{ name: 'eventName' }],
    metrics: [{ name: 'eventCount' }],
    dimensionFilter: {
      filter: { fieldName: 'eventName', inListFilter: { values: CONVERSION_EVENTS } },
    },
  });
  const events = {};
  for (const ev of CONVERSION_EVENTS) events[ev] = 0;
  for (const r of eventsRes.rows || []) {
    const name = r.dimensionValues?.[0]?.value;
    if (name in events) events[name] = Number(r.metricValues?.[0]?.value || 0);
  }

  return { totals, events };
}

async function main() {
  const auth = await authedToken();
  const info = await getOrDiscoverProperty(auth);
  const propertyId = info.property;

  // 1 + 2. Headline metrics + conversion events, each window queried separately.
  const cur = await fetchWindow(auth, propertyId, WINDOWS.current);
  const prev = await fetchWindow(auth, propertyId, WINDOWS.previous);

  const byRange = { current: cur.totals, previous: prev.totals };
  const eventCounts = {};
  for (const ev of CONVERSION_EVENTS) {
    eventCounts[ev] = { current: cur.events[ev], previous: prev.events[ev] };
  }

  // 3. Channel breakdown, current window only.
  const channels = await runReport(auth, propertyId, {
    dateRanges: [WINDOWS.current],
    dimensions: [{ name: 'sessionDefaultChannelGroup' }],
    metrics: [{ name: 'sessions' }],
    orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
  });
  const channelRows = (channels.rows || []).map((r) => ({
    channel: r.dimensionValues?.[0]?.value || 'Unknown',
    sessions: Number(r.metricValues?.[0]?.value || 0),
  }));

  const result = {
    property: info.property,
    displayName: info.displayName,
    pulledAt: new Date().toISOString(),
    windows: { current: '28daysAgo–yesterday', previous: '56daysAgo–29daysAgo' },
    totals: byRange,
    events: eventCounts,
    channels: channelRows,
  };

  const stamp = new Date().toISOString().slice(0, 10);
  const runDir = `${REPORT_DIR}/${stamp}`;
  await mkdir(runDir, { recursive: true });
  await writeFile(`${runDir}/ga4-summary.json`, JSON.stringify(result, null, 2));
  await writeFile(`${runDir}/ga4-summary.md`, toMarkdown(result));
  console.log(`✓ GA4 summary → ${runDir}/ga4-summary.{json,md}`);

  // Quick console readout
  const c = byRange.current;
  const p = byRange.previous;
  console.log(`  Visitors: ${c.totalUsers} (${pctDelta(c.totalUsers, p.totalUsers) >= 0 ? '+' : ''}${pctDelta(c.totalUsers, p.totalUsers)}% MoM)`);
  const totalCalls = eventCounts.phone_call;
  console.log(`  Phone calls: ${totalCalls.current} (${pctDelta(totalCalls.current, totalCalls.previous) >= 0 ? '+' : ''}${pctDelta(totalCalls.current, totalCalls.previous)}% MoM)`);
}

function toMarkdown(r) {
  const c = r.totals.current;
  const p = r.totals.previous;
  const lines = [];
  lines.push(`# GA4 Summary — ${r.displayName}`);
  lines.push(`Current window: last 28 days · vs previous 28 days · pulled ${r.pulledAt.slice(0, 10)}\n`);

  lines.push('## Traffic');
  lines.push('| Metric | Last 28d | Prior 28d | Change |');
  lines.push('|---|---:|---:|---:|');
  const tRow = (label, key) => {
    const cur = c[key] || 0;
    const prev = p[key] || 0;
    const d = pctDelta(cur, prev);
    lines.push(`| ${label} | ${cur.toLocaleString()} | ${prev.toLocaleString()} | ${d >= 0 ? '+' : ''}${d}% |`);
  };
  tRow('Visitors', 'totalUsers');
  tRow('New visitors', 'newUsers');
  tRow('Sessions', 'sessions');
  tRow('Page views', 'screenPageViews');

  lines.push('\n## Conversions (website-driven contact)');
  lines.push('| Action | Last 28d | Prior 28d | Change |');
  lines.push('|---|---:|---:|---:|');
  for (const ev of CONVERSION_EVENTS) {
    const cur = r.events[ev].current;
    const prev = r.events[ev].previous;
    const d = pctDelta(cur, prev);
    lines.push(`| ${EVENT_LABELS[ev]} | ${cur} | ${prev} | ${d >= 0 ? '+' : ''}${d}% |`);
  }

  lines.push('\n## Traffic sources (last 28d)');
  lines.push('| Channel | Sessions |');
  lines.push('|---|---:|');
  for (const ch of r.channels) lines.push(`| ${ch.channel} | ${ch.sessions.toLocaleString()} |`);

  return lines.join('\n');
}

main().catch((e) => {
  const msg = e.message || String(e);
  if (/invalid_grant|invalid_token|expired|unauthorized|insufficient/i.test(msg)) {
    console.error('GA4 pull failed: token rejected or missing analytics.readonly scope.');
    console.error('Re-authenticate with: npm run seo:auth');
  } else if (/SERVICE_DISABLED|has not been used|disabled/i.test(msg)) {
    console.error('GA4 pull failed: a required API is disabled. Enable both:');
    console.error('  - https://console.cloud.google.com/apis/library/analyticsdata.googleapis.com');
    console.error('  - https://console.cloud.google.com/apis/library/analyticsadmin.googleapis.com');
  } else {
    console.error('GA4 pull failed:', msg);
  }
  process.exit(1);
});
