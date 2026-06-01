/**
 * Diff the two most recent GSC pulls.
 *
 * Highlights what changed between runs:
 *   - Queries that moved up (better rank)
 *   - Queries that moved down (worse rank)
 *   - New queries (impressions only in the newer report)
 *   - Lost queries (impressions only in the older report)
 *
 * Writes:
 *   docs/seo-reports/<NEW_DATE>/diff-vs-<OLD_DATE>.md
 *
 * Run: npm run seo:diff   (uses the two newest reports)
 *      npm run seo:diff -- --from=2026-04-15 --to=2026-05-09
 */

import { readFile, writeFile, readdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';

const REPORT_DIR = 'docs/seo-reports';
const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, '').split('=');
    return [k, v ?? true];
  }),
);

async function listReportDates() {
  const entries = await readdir(REPORT_DIR, { withFileTypes: true });
  const dated = entries
    .filter((e) => e.isDirectory() && /^\d{4}-\d{2}-\d{2}$/.test(e.name))
    .map((e) => e.name);
  // Only folders that actually have a GSC pull — GA4-only folders (e.g. a
  // standalone ga4:pull day) have no gsc-queries.json and would crash the diff.
  const withGsc = [];
  for (const d of dated) {
    if (existsSync(join(REPORT_DIR, d, 'gsc-queries.json'))) withGsc.push(d);
  }
  return withGsc.sort();
}

async function loadReport(date) {
  const raw = await readFile(join(REPORT_DIR, date, 'gsc-queries.json'), 'utf8');
  return JSON.parse(raw);
}

function indexByQuery(rows) {
  const m = new Map();
  for (const r of rows) m.set(r.keys[0], r);
  return m;
}

function fmtPos(p) { return p ? p.toFixed(1) : '—'; }

async function main() {
  const dates = await listReportDates();
  if (dates.length < 2) {
    console.error('Need at least 2 dated reports to diff. Run npm run seo:pull more than once.');
    process.exit(1);
  }
  const fromDate = args.from || dates[dates.length - 2];
  const toDate = args.to || dates[dates.length - 1];
  if (fromDate === toDate) {
    console.error(`Same date on both sides (${fromDate}). Nothing to diff.`);
    process.exit(1);
  }

  const oldReport = await loadReport(fromDate);
  const newReport = await loadReport(toDate);
  const oldIdx = indexByQuery(oldReport.rows);
  const newIdx = indexByQuery(newReport.rows);

  const movedUp = [];   // rank improved (lower position number = better)
  const movedDown = []; // rank worsened
  const newQ = [];      // appeared in new only
  const lostQ = [];     // appeared in old only

  for (const [q, n] of newIdx) {
    const o = oldIdx.get(q);
    if (!o) {
      newQ.push({ q, n });
      continue;
    }
    const delta = o.position - n.position; // positive = moved up
    if (delta >= 1) movedUp.push({ q, o, n, delta });
    else if (delta <= -1) movedDown.push({ q, o, n, delta });
  }
  for (const [q, o] of oldIdx) {
    if (!newIdx.has(q)) lostQ.push({ q, o });
  }

  movedUp.sort((a, b) => b.n.impressions * b.delta - a.n.impressions * a.delta);
  movedDown.sort((a, b) => b.n.impressions * (-b.delta) - a.n.impressions * (-a.delta));
  newQ.sort((a, b) => b.n.impressions - a.n.impressions);
  lostQ.sort((a, b) => b.o.impressions - a.o.impressions);

  const lines = [];
  lines.push(`# GSC Diff — ${fromDate} → ${toDate}`);
  lines.push(`Old window: ${oldReport.startDate} → ${oldReport.endDate}`);
  lines.push(`New window: ${newReport.startDate} → ${newReport.endDate}`);
  lines.push('');
  lines.push(`## Summary`);
  lines.push(`- Queries moved up (rank improved ≥1 position): **${movedUp.length}**`);
  lines.push(`- Queries moved down: **${movedDown.length}**`);
  lines.push(`- New queries appearing: **${newQ.length}**`);
  lines.push(`- Queries that fell off: **${lostQ.length}**`);
  lines.push('');

  const section = (title, arr, fmt) => {
    lines.push(`## ${title} (${arr.length})`);
    if (!arr.length) {
      lines.push('_None._');
      lines.push('');
      return;
    }
    lines.push('| Query | Old Pos | New Pos | Δ | Old Impr | New Impr |');
    lines.push('|---|---:|---:|---:|---:|---:|');
    arr.slice(0, 50).forEach(fmt);
    lines.push('');
  };

  section('Moved up — biggest wins', movedUp, ({ q, o, n, delta }) => {
    lines.push(`| ${q} | ${fmtPos(o.position)} | ${fmtPos(n.position)} | +${delta.toFixed(1)} | ${o.impressions} | ${n.impressions} |`);
  });
  section('Moved down — needs attention', movedDown, ({ q, o, n, delta }) => {
    lines.push(`| ${q} | ${fmtPos(o.position)} | ${fmtPos(n.position)} | ${delta.toFixed(1)} | ${o.impressions} | ${n.impressions} |`);
  });

  lines.push(`## New queries (${newQ.length})`);
  if (newQ.length) {
    lines.push('| Query | Pos | Impr | Clicks |');
    lines.push('|---|---:|---:|---:|');
    newQ.slice(0, 50).forEach(({ q, n }) => {
      lines.push(`| ${q} | ${fmtPos(n.position)} | ${n.impressions} | ${n.clicks} |`);
    });
  } else lines.push('_None._');
  lines.push('');

  lines.push(`## Lost queries (${lostQ.length})`);
  if (lostQ.length) {
    lines.push('| Query | Old Pos | Old Impr |');
    lines.push('|---|---:|---:|');
    lostQ.slice(0, 50).forEach(({ q, o }) => {
      lines.push(`| ${q} | ${fmtPos(o.position)} | ${o.impressions} |`);
    });
  } else lines.push('_None._');
  lines.push('');

  const outPath = join(REPORT_DIR, toDate, `diff-vs-${fromDate}.md`);
  await writeFile(outPath, lines.join('\n'));
  console.log(`✓ Diff written → ${outPath}`);
  console.log(`  ${movedUp.length} up · ${movedDown.length} down · ${newQ.length} new · ${lostQ.length} lost`);
}

main().catch((e) => {
  console.error('Diff failed:', e.message || e);
  process.exit(1);
});
