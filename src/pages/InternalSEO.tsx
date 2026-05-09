/**
 * Hidden SEO dashboard. Lives at /_internal/seo — noindex'd, not in sitemap,
 * not prerendered, blocked in robots.txt. URL is "security through obscurity"
 * only; do NOT put anything here that would be a problem if a competitor saw it.
 *
 * Reads docs/seo-reports/<YYYY-MM-DD>/*.{json,md} via Vite's import.meta.glob,
 * so every new report folder shows up automatically on next build — no code
 * changes needed.
 */

import { useMemo, useState } from 'react';
import { marked } from 'marked';
import { useSEO } from '../utils/useSEO';

// Eager-load JSON (small + needed for table sort), lazy-load markdown
// (rendered on demand when a date is selected).
const queryJsons = import.meta.glob('../../docs/seo-reports/*/gsc-queries.json', {
  eager: true,
  import: 'default',
}) as Record<string, GscReport>;

const keywordMaps = import.meta.glob('../../docs/seo-reports/*/keyword-map.md', {
  query: '?raw',
  import: 'default',
}) as Record<string, () => Promise<string>>;

// Diff files are written by `npm run seo:diff` — one per dated folder
// (e.g. diff-vs-2026-04-15.md). Show the freshest one for the active date.
const diffFiles = import.meta.glob('../../docs/seo-reports/*/diff-vs-*.md', {
  query: '?raw',
  import: 'default',
}) as Record<string, () => Promise<string>>;

// Optional GBP post drafts per report — drops into a dedicated section.
const gbpPosts = import.meta.glob('../../docs/seo-reports/*/gbp-posts.md', {
  query: '?raw',
  import: 'default',
}) as Record<string, () => Promise<string>>;

interface GscRow {
  keys: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface GscReport {
  siteUrl: string;
  startDate: string;
  endDate: string;
  rows: GscRow[];
}

// Path looks like ../../docs/seo-reports/2026-05-09/gsc-queries.json — pull the date.
const dateFromPath = (p: string): string => p.match(/seo-reports\/([^/]+)\//)?.[1] || p;

const reportsByDate: Record<string, GscReport> = Object.fromEntries(
  Object.entries(queryJsons).map(([path, report]) => [dateFromPath(path), report]),
);

const keywordMapLoaders: Record<string, () => Promise<string>> = Object.fromEntries(
  Object.entries(keywordMaps).map(([path, loader]) => [dateFromPath(path), loader]),
);

// Group diff loaders by their containing date — there can be multiple diffs
// per folder (e.g. diff-vs-A.md and diff-vs-B.md). Pick the most recent.
const diffLoadersByDate: Record<string, { older: string; load: () => Promise<string> }> = {};
for (const [path, load] of Object.entries(diffFiles)) {
  const date = dateFromPath(path);
  const older = path.match(/diff-vs-([\d-]+)\.md/)?.[1] || 'previous';
  // Keep the diff that compares against the most recent older date.
  if (!diffLoadersByDate[date] || diffLoadersByDate[date].older < older) {
    diffLoadersByDate[date] = { older, load };
  }
}

const gbpLoadersByDate: Record<string, () => Promise<string>> = Object.fromEntries(
  Object.entries(gbpPosts).map(([path, load]) => [dateFromPath(path), load]),
);

const allDates = Object.keys(reportsByDate).sort().reverse();

type SortKey = 'query' | 'clicks' | 'impressions' | 'ctr' | 'position';

const InternalSEO = () => {
  useSEO({
    title: 'SEO Dashboard (internal)',
    description: 'Internal SEO reports — do not link, do not share.',
    // Tell crawlers explicitly: do not index, do not follow.
    // (Belt + suspenders alongside robots.txt and X-Robots-Tag.)
    noindex: true,
  });

  const [activeDate, setActiveDate] = useState<string>(allDates[0] || '');
  const [sortKey, setSortKey] = useState<SortKey>('impressions');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [filter, setFilter] = useState('');
  const [keywordMapHtml, setKeywordMapHtml] = useState<string>('Loading…');
  const [diffHtml, setDiffHtml] = useState<string>('');
  const [gbpHtml, setGbpHtml] = useState<string>('');

  // Lazy-load the keyword map markdown when the active date changes.
  useMemo(() => {
    const loader = keywordMapLoaders[activeDate];
    if (!loader) {
      setKeywordMapHtml('No keyword map for this date.');
      return;
    }
    loader().then((md) => {
      const html = marked.parse(md, { gfm: true, breaks: false }) as string;
      setKeywordMapHtml(html);
    });
  }, [activeDate]);

  // Lazy-load the diff (if one exists) for the active date.
  useMemo(() => {
    const entry = diffLoadersByDate[activeDate];
    if (!entry) {
      setDiffHtml('');
      return;
    }
    entry.load().then((md) => {
      const html = marked.parse(md, { gfm: true, breaks: false }) as string;
      setDiffHtml(html);
    });
  }, [activeDate]);

  // Lazy-load GBP post drafts (if any) for the active date.
  useMemo(() => {
    const loader = gbpLoadersByDate[activeDate];
    if (!loader) {
      setGbpHtml('');
      return;
    }
    loader().then((md) => {
      const html = marked.parse(md, { gfm: true, breaks: false }) as string;
      setGbpHtml(html);
    });
  }, [activeDate]);

  const report = reportsByDate[activeDate];

  const sortedRows = useMemo(() => {
    if (!report) return [];
    const rows = [...report.rows];
    const filterLower = filter.toLowerCase().trim();
    const filtered = filterLower
      ? rows.filter((r) => (r.keys[0] || '').toLowerCase().includes(filterLower))
      : rows;
    filtered.sort((a, b) => {
      const av = sortKey === 'query' ? a.keys[0] || '' : (a as unknown as Record<string, number>)[sortKey];
      const bv = sortKey === 'query' ? b.keys[0] || '' : (b as unknown as Record<string, number>)[sortKey];
      if (av < bv) return sortDir === 'asc' ? -1 : 1;
      if (av > bv) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    return filtered;
  }, [report, sortKey, sortDir, filter]);

  if (!report) {
    return (
      <div className="min-h-screen bg-dark-900 text-gray-200 p-8">
        <h1 className="text-2xl font-bold">No SEO reports available yet.</h1>
        <p className="mt-2 text-gray-400">
          Run <code className="bg-dark-800 px-1 rounded">node scripts/seo/gsc-pull-queries.mjs</code> to generate one.
        </p>
      </div>
    );
  }

  const totalImp = report.rows.reduce((a, r) => a + r.impressions, 0);
  const totalClk = report.rows.reduce((a, r) => a + r.clicks, 0);
  const totalCtr = totalImp ? (totalClk / totalImp) * 100 : 0;

  const toggleSort = (k: SortKey) => {
    if (k === sortKey) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else {
      setSortKey(k);
      setSortDir(k === 'query' ? 'asc' : 'desc');
    }
  };

  const arrow = (k: SortKey) => (sortKey === k ? (sortDir === 'asc' ? ' ▲' : ' ▼') : '');

  return (
    <div className="min-h-screen bg-dark-900 text-gray-200">
      <header className="border-b border-gray-800 px-6 py-4 flex items-center justify-between sticky top-0 bg-dark-900/95 backdrop-blur z-10">
        <div>
          <h1 className="text-xl font-bold text-gold-500">SEO Dashboard</h1>
          <p className="text-xs text-gray-500">internal — do not share</p>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <label className="text-gray-400">Report:</label>
          <select
            value={activeDate}
            onChange={(e) => setActiveDate(e.target.value)}
            className="bg-dark-800 border border-gray-700 rounded px-2 py-1 text-gray-100"
          >
            {allDates.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-10">

        {/* KPI tiles */}
        <section>
          <h2 className="text-lg font-semibold text-gray-300 mb-3">Window: {report.startDate} → {report.endDate}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Tile label="Unique queries" value={report.rows.length.toLocaleString()} />
            <Tile label="Total impressions" value={totalImp.toLocaleString()} />
            <Tile label="Total clicks" value={totalClk.toLocaleString()} />
            <Tile label="Avg CTR" value={`${totalCtr.toFixed(2)}%`} />
          </div>
          <p className="mt-3 text-xs text-gray-500">Site: <code>{report.siteUrl}</code></p>
        </section>

        {/* Diff vs previous report (only renders if one exists) */}
        {diffHtml && (
          <section>
            <h2 className="text-lg font-semibold text-gray-300 mb-3">What Moved Since Last Report</h2>
            <div
              className="prose prose-invert prose-sm max-w-none prose-headings:text-gold-500 prose-a:text-gold-400 prose-table:text-xs"
              dangerouslySetInnerHTML={{ __html: diffHtml }}
            />
          </section>
        )}

        {/* Keyword map (rendered markdown) */}
        <section>
          <h2 className="text-lg font-semibold text-gray-300 mb-3">Keyword Map &amp; Action Plan</h2>
          <div
            className="prose prose-invert prose-sm max-w-none prose-headings:text-gold-500 prose-a:text-gold-400 prose-table:text-xs"
            dangerouslySetInnerHTML={{ __html: keywordMapHtml }}
          />
        </section>

        {/* GBP post drafts (renders only if gbp-posts.md exists for this date) */}
        {gbpHtml && (
          <section>
            <h2 className="text-lg font-semibold text-gray-300 mb-3">GBP Post Drafts</h2>
            <div
              className="prose prose-invert prose-sm max-w-none prose-headings:text-gold-500 prose-a:text-gold-400 prose-code:text-gold-400 prose-pre:bg-dark-800 prose-pre:border prose-pre:border-gray-800"
              dangerouslySetInnerHTML={{ __html: gbpHtml }}
            />
          </section>
        )}

        {/* Query table */}
        <section>
          <div className="flex items-center justify-between mb-3 gap-3 flex-wrap">
            <h2 className="text-lg font-semibold text-gray-300">All Queries ({sortedRows.length})</h2>
            <input
              type="text"
              placeholder="Filter queries…"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-dark-800 border border-gray-700 rounded px-3 py-1.5 text-sm text-gray-100 w-64"
            />
          </div>
          <div className="overflow-x-auto rounded border border-gray-800">
            <table className="w-full text-sm">
              <thead className="bg-dark-800 text-gray-400 text-left">
                <tr>
                  <th className="px-3 py-2 cursor-pointer hover:text-gold-500" onClick={() => toggleSort('query')}>Query{arrow('query')}</th>
                  <th className="px-3 py-2 text-right cursor-pointer hover:text-gold-500" onClick={() => toggleSort('clicks')}>Clicks{arrow('clicks')}</th>
                  <th className="px-3 py-2 text-right cursor-pointer hover:text-gold-500" onClick={() => toggleSort('impressions')}>Impr{arrow('impressions')}</th>
                  <th className="px-3 py-2 text-right cursor-pointer hover:text-gold-500" onClick={() => toggleSort('ctr')}>CTR{arrow('ctr')}</th>
                  <th className="px-3 py-2 text-right cursor-pointer hover:text-gold-500" onClick={() => toggleSort('position')}>Avg Pos{arrow('position')}</th>
                </tr>
              </thead>
              <tbody>
                {sortedRows.map((r, i) => (
                  <tr key={i} className="border-t border-gray-800 hover:bg-dark-800/50">
                    <td className="px-3 py-1.5 text-gray-200">{r.keys[0]}</td>
                    <td className="px-3 py-1.5 text-right text-gray-300">{r.clicks}</td>
                    <td className="px-3 py-1.5 text-right text-gray-300">{r.impressions}</td>
                    <td className="px-3 py-1.5 text-right text-gray-400">{(r.ctr * 100).toFixed(1)}%</td>
                    <td className="px-3 py-1.5 text-right text-gray-400">{r.position.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <footer className="text-xs text-gray-600 pt-8 border-t border-gray-800">
          Reports written by <code>scripts/seo/gsc-pull-queries.mjs</code>. Re-run any time to refresh data.
        </footer>
      </main>
    </div>
  );
};

const Tile = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-dark-800 border border-gray-800 rounded-lg p-4">
    <div className="text-xs text-gray-500 uppercase tracking-wider">{label}</div>
    <div className="text-2xl font-bold text-gold-500 mt-1">{value}</div>
  </div>
);

export default InternalSEO;
