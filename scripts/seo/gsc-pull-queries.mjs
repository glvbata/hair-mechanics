/**
 * Pull top search queries from Google Search Console for hairmechanics.net.
 *
 * Outputs:
 *   - docs/seo-reports/gsc-queries-<date>.json    (full machine-readable)
 *   - docs/seo-reports/gsc-queries-<date>.md      (human-readable top 100)
 *
 * Run: node scripts/seo/gsc-pull-queries.mjs [--days=90] [--site=https://hairmechanics.net/]
 *
 * Requires: scripts/seo/gsc-auth.mjs to have produced .secrets/gsc-token.json
 */

import { google } from 'googleapis';
import { readFile, writeFile, mkdir } from 'fs/promises';

const CLIENT_PATH = '.secrets/gsc-oauth-client.json';
const TOKEN_PATH = '.secrets/gsc-token.json';
const REPORT_DIR = 'docs/seo-reports';
const DEFAULT_SITE = 'sc-domain:hairmechanics.net'; // try this first; fallback below
const FALLBACK_SITE = 'https://hairmechanics.net/';

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, '').split('=');
    return [k, v ?? true];
  }),
);
const DAYS = Number(args.days) || 90;

function isoDaysAgo(n) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  return d.toISOString().slice(0, 10);
}

async function authedClient() {
  const raw = JSON.parse(await readFile(CLIENT_PATH, 'utf8'));
  const creds = raw.installed || raw.web;
  const tokens = JSON.parse(await readFile(TOKEN_PATH, 'utf8'));
  const oAuth2 = new google.auth.OAuth2(creds.client_id, creds.client_secret);
  oAuth2.setCredentials(tokens);
  return google.searchconsole({ version: 'v1', auth: oAuth2 });
}

async function listSites(sc) {
  const { data } = await sc.sites.list();
  return (data.siteEntry || []).map((s) => s.siteUrl);
}

async function pickSite(sc, requested) {
  const sites = await listSites(sc);
  if (!sites.length) throw new Error('No GSC sites accessible to this Google account.');

  if (requested) {
    if (sites.includes(requested)) return requested;
    console.warn(`Requested site '${requested}' not in account. Available:`, sites);
  }
  // Try domain property, then URL-prefix property, else first match for hairmechanics.
  const domainProp = sites.find((s) => s === DEFAULT_SITE);
  if (domainProp) return domainProp;
  const urlProp = sites.find((s) => s === FALLBACK_SITE);
  if (urlProp) return urlProp;
  const fuzzy = sites.find((s) => /hairmechanics/i.test(s));
  if (fuzzy) return fuzzy;
  throw new Error(`No site matching hairmechanics.net. Verify the property at search.google.com/search-console.\nAvailable: ${sites.join(', ')}`);
}

async function pullQueries(sc, siteUrl) {
  const startDate = isoDaysAgo(DAYS);
  const endDate = isoDaysAgo(2); // GSC data lags ~2 days
  const all = [];
  const ROW_LIMIT = 25000;
  let startRow = 0;

  while (true) {
    const { data } = await sc.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['query'],
        rowLimit: ROW_LIMIT,
        startRow,
        type: 'web',
      },
    });
    const rows = data.rows || [];
    all.push(...rows);
    if (rows.length < ROW_LIMIT) break;
    startRow += ROW_LIMIT;
  }
  return { startDate, endDate, rows: all };
}

function toMarkdown({ siteUrl, startDate, endDate, rows }) {
  const top = rows.slice(0, 100);
  const totalImp = rows.reduce((a, r) => a + (r.impressions || 0), 0);
  const totalClk = rows.reduce((a, r) => a + (r.clicks || 0), 0);
  const lines = [];
  lines.push(`# GSC Top Queries — ${siteUrl}`);
  lines.push(`**Window:** ${startDate} → ${endDate} (${DAYS} days)`);
  lines.push(`**Totals:** ${rows.length} unique queries · ${totalClk.toLocaleString()} clicks · ${totalImp.toLocaleString()} impressions · CTR ${((totalClk / Math.max(totalImp, 1)) * 100).toFixed(2)}%`);
  lines.push('');
  lines.push('| # | Query | Clicks | Impr | CTR | Avg Pos |');
  lines.push('|---|---|---:|---:|---:|---:|');
  top.forEach((r, i) => {
    const q = (r.keys?.[0] || '').replace(/\|/g, '\\|');
    lines.push(
      `| ${i + 1} | ${q} | ${r.clicks || 0} | ${r.impressions || 0} | ${((r.ctr || 0) * 100).toFixed(1)}% | ${(r.position || 0).toFixed(1)} |`,
    );
  });
  return lines.join('\n');
}

async function main() {
  const sc = await authedClient();
  const siteUrl = await pickSite(sc, args.site);
  console.log(`Pulling ${DAYS} days from ${siteUrl}...`);
  const result = await pullQueries(sc, siteUrl);
  result.siteUrl = siteUrl;

  // One folder per report run — keeps run-level artifacts grouped (queries, keyword map,
  // future Lighthouse/Lighthouse-CI/broken-link outputs) and avoids filename collisions.
  const stamp = new Date().toISOString().slice(0, 10);
  const runDir = `${REPORT_DIR}/${stamp}`;
  await mkdir(runDir, { recursive: true });
  const jsonPath = `${runDir}/gsc-queries.json`;
  const mdPath = `${runDir}/gsc-queries.md`;
  await writeFile(jsonPath, JSON.stringify(result, null, 2));
  await writeFile(mdPath, toMarkdown(result));
  console.log(`✓ ${result.rows.length} queries → ${jsonPath}`);
  console.log(`✓ Top 100 markdown → ${mdPath}`);
}

main().catch((e) => {
  const msg = e.message || String(e);
  // Common Google failure: refresh token expired (Testing-mode OAuth apps
  // get 7-day tokens). Surface a clear next step instead of a stack trace.
  if (/invalid_grant|invalid_token|expired|unauthorized/i.test(msg)) {
    console.error('Pull failed: GSC token rejected (likely expired).');
    console.error('Re-authenticate with: npm run seo:auth');
    console.error('Original error:', msg);
  } else {
    console.error('Pull failed:', msg);
  }
  process.exit(1);
});
