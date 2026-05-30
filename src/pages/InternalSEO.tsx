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

// GBP search keywords + performance metrics, written by `npm run gbp:pull`.
const gbpKeywords = import.meta.glob('../../docs/seo-reports/*/gbp-keywords.md', {
  query: '?raw',
  import: 'default',
}) as Record<string, () => Promise<string>>;
const gbpPerformance = import.meta.glob('../../docs/seo-reports/*/gbp-performance.md', {
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

// --- Date helpers for the Action Center ---
const fmtDate = (d: Date): string => d.toISOString().slice(0, 10);
const daysSince = (iso: string, now: Date): number =>
  Math.floor((now.getTime() - new Date(`${iso}T00:00:00Z`).getTime()) / 86_400_000);
const addDays = (iso: string, n: number): Date =>
  new Date(new Date(`${iso}T00:00:00Z`).getTime() + n * 86_400_000);

// How long Google typically takes to recrawl + rerank after on-page changes.
const RERANK_WINDOW_DAYS = 14;

// External dependencies we're tracking. Edit these as state changes — they
// drive the Setup Status board. Keeping it here (not in a report file) since
// it's project-level state, not per-pull data.
type SetupState = 'done' | 'waiting' | 'todo';
const SETUP_STATUS: { label: string; status: SetupState; note: string }[] = [
  { label: 'Google Search Console API', status: 'done', note: 'Connected — npm run seo:pull' },
  { label: 'Indexing requested (5 priority URLs)', status: 'done', note: 'Submitted 2026-05-09 via GSC URL Inspection' },
  { label: 'Homepage schema errors', status: 'done', note: 'FAQ duplicate + self-serving reviews removed' },
  { label: 'Spanish + Filipino landing pages', status: 'done', note: 'Live, in sitemap, hreflang wired' },
  { label: 'Google Business Profile API', status: 'waiting', note: 'Code shipped — pending Google project approval (2d–4wk)' },
  { label: 'GA4 calls/bookings → dashboard', status: 'todo', note: 'Wire analytics.readonly pull once GA4 account access is settled' },
];

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
const gbpKwLoadersByDate: Record<string, () => Promise<string>> = Object.fromEntries(
  Object.entries(gbpKeywords).map(([path, load]) => [dateFromPath(path), load]),
);
const gbpPerfLoadersByDate: Record<string, () => Promise<string>> = Object.fromEntries(
  Object.entries(gbpPerformance).map(([path, load]) => [dateFromPath(path), load]),
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
  const [gbpKwHtml, setGbpKwHtml] = useState<string>('');
  const [gbpPerfHtml, setGbpPerfHtml] = useState<string>('');

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

  // Lazy-load GBP search keywords + performance for the active date.
  useMemo(() => {
    const kwLoader = gbpKwLoadersByDate[activeDate];
    if (kwLoader) {
      kwLoader().then((md) => {
        setGbpKwHtml(marked.parse(md, { gfm: true, breaks: false }) as string);
      });
    } else setGbpKwHtml('');

    const perfLoader = gbpPerfLoadersByDate[activeDate];
    if (perfLoader) {
      perfLoader().then((md) => {
        setGbpPerfHtml(marked.parse(md, { gfm: true, breaks: false }) as string);
      });
    } else setGbpPerfHtml('');
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

  // --- Action Center: derive "what to do next" from real state ---
  const now = new Date();
  const latestDate = allDates[0];
  const sincePull = daysSince(latestDate, now);
  const reportCount = allDates.length;
  const hasGbpDrafts = Boolean(gbpLoadersByDate[latestDate]);
  const nextMeasure = addDays(latestDate, RERANK_WINDOW_DAYS);
  const daysToMeasure = Math.max(0, daysSince(fmtDate(nextMeasure), now) * -1);

  type Action = { priority: 'now' | 'weekly' | 'waiting'; title: string; detail: string };
  const actions: Action[] = [];

  // Data-pull cadence.
  if (sincePull >= 7) {
    actions.push({
      priority: 'now',
      title: 'Pull fresh search data',
      detail: `Last pull was ${sincePull} days ago. Run: npm run seo:pull && npm run seo:diff`,
    });
  } else if (reportCount < 2) {
    actions.push({
      priority: 'waiting',
      title: 'Wait to measure impact, then re-pull',
      detail: `Only one report so far. Google needs ~${RERANK_WINDOW_DAYS} days to recrawl + rerank the changes. Re-pull on/after ${fmtDate(nextMeasure)} (${daysToMeasure} days) to see what moved.`,
    });
  }

  // Weekly GBP post (recurring while drafts exist).
  if (hasGbpDrafts) {
    actions.push({
      priority: 'weekly',
      title: "Post this week's Google Business Profile update",
      detail: '~2 min. Copy from the GBP Post Drafts section below. One per week: walk-ins → beard combo → Filipino → Spanish.',
    });
  }

  // Weekly client update — always on.
  actions.push({
    priority: 'weekly',
    title: 'Send Glen his weekly update',
    detail:
      reportCount < 2
        ? 'Use the baseline + what-shipped template. Real movement numbers land with the 2nd report.'
        : 'Lead with what moved (from the diff section), then the one ask for the week.',
  });

  // Retainer milestone — gated on having proof.
  actions.push({
    priority: 'waiting',
    title: 'Retainer conversation with Glen',
    detail: `Hold until the 2nd report shows movement (~${fmtDate(nextMeasure)}). Then propose $400/mo with the diff report as the proof artifact.`,
  });

  const priorityRank: Record<Action['priority'], number> = { now: 0, weekly: 1, waiting: 2 };
  actions.sort((a, b) => priorityRank[a.priority] - priorityRank[b.priority]);

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

        {/* ===== ACTION CENTER — what to do next ===== */}
        <section className="grid lg:grid-cols-3 gap-6">
          {/* Next actions (spans 2 cols on desktop) */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold text-gold-500 mb-3">What To Do Next</h2>
            <div className="space-y-2">
              {actions.map((a, i) => (
                <ActionItem key={i} priority={a.priority} title={a.title} detail={a.detail} />
              ))}
            </div>
          </div>

          {/* Setup status board */}
          <div>
            <h2 className="text-lg font-semibold text-gray-300 mb-3">Setup Status</h2>
            <div className="bg-dark-800 border border-gray-800 rounded-lg divide-y divide-gray-800">
              {SETUP_STATUS.map((s, i) => (
                <StatusRow key={i} label={s.label} status={s.status} note={s.note} />
              ))}
            </div>
          </div>
        </section>

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

        {/* GBP performance — business outcomes (calls, directions, clicks). */}
        {gbpPerfHtml && (
          <section>
            <h2 className="text-lg font-semibold text-gray-300 mb-3">GBP Business Performance</h2>
            <div
              className="prose prose-invert prose-sm max-w-none prose-headings:text-gold-500 prose-a:text-gold-400 prose-table:text-xs"
              dangerouslySetInnerHTML={{ __html: gbpPerfHtml }}
            />
          </section>
        )}

        {/* GBP search keywords — what people typed to find the listing on Maps. */}
        {gbpKwHtml && (
          <section>
            <h2 className="text-lg font-semibold text-gray-300 mb-3">GBP Search Keywords</h2>
            <div
              className="prose prose-invert prose-sm max-w-none prose-headings:text-gold-500 prose-a:text-gold-400 prose-table:text-xs"
              dangerouslySetInnerHTML={{ __html: gbpKwHtml }}
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

const PRIORITY_META: Record<'now' | 'weekly' | 'waiting', { label: string; cls: string }> = {
  now: { label: 'DO NOW', cls: 'bg-gold-500 text-dark-900' },
  weekly: { label: 'WEEKLY', cls: 'bg-blue-500/20 text-blue-300 border border-blue-500/40' },
  waiting: { label: 'WAITING', cls: 'bg-gray-700 text-gray-300' },
};

const ActionItem = ({
  priority,
  title,
  detail,
}: {
  priority: 'now' | 'weekly' | 'waiting';
  title: string;
  detail: string;
}) => {
  const meta = PRIORITY_META[priority];
  return (
    <div className="bg-dark-800 border border-gray-800 rounded-lg p-4 flex gap-3">
      <span className={`shrink-0 h-fit text-[10px] font-bold tracking-wider px-2 py-1 rounded ${meta.cls}`}>
        {meta.label}
      </span>
      <div>
        <div className="font-semibold text-gray-100">{title}</div>
        <div className="text-sm text-gray-400 mt-0.5">{detail}</div>
      </div>
    </div>
  );
};

const STATUS_META: Record<SetupState, { icon: string; cls: string }> = {
  done: { icon: '✓', cls: 'text-green-400' },
  waiting: { icon: '⏳', cls: 'text-gold-500' },
  todo: { icon: '○', cls: 'text-gray-500' },
};

const StatusRow = ({ label, status, note }: { label: string; status: SetupState; note: string }) => {
  const meta = STATUS_META[status];
  return (
    <div className="flex items-start gap-3 px-4 py-3">
      <span className={`shrink-0 ${meta.cls} font-bold`}>{meta.icon}</span>
      <div>
        <div className="text-sm font-medium text-gray-200">{label}</div>
        <div className="text-xs text-gray-500 mt-0.5">{note}</div>
      </div>
    </div>
  );
};

export default InternalSEO;
