/**
 * CLIENT-FACING performance report. Lives at /_internal/client-report.
 *
 * This is SAFE to share with Glen — unlike /_internal/seo, it contains NO
 * internal strategy (no retainer pricing, no "what to do next", no raw query
 * tables). Plain language, positive framing, big numbers.
 *
 * noindex + not in sitemap + not prerendered. Share by sending the URL, or
 * open it and Print → Save as PDF to send a file.
 *
 * Reads the latest report folder:
 *   - ga4-summary.json   → visitors + website-driven calls/texts/directions (MoM)
 *   - gsc-queries.json   → search visibility
 *   - client-summary.md  → optional Gian-authored "what we did" in plain words
 */

import { useMemo, useState } from 'react';
import { marked } from 'marked';
import { useSEO } from '../utils/useSEO';
import { BUSINESS_NAME, PHONE_DISPLAY } from '../constants/business';

const ga4Jsons = import.meta.glob('../../docs/seo-reports/*/ga4-summary.json', {
  eager: true,
  import: 'default',
}) as Record<string, Ga4Summary>;
const gscJsons = import.meta.glob('../../docs/seo-reports/*/gsc-queries.json', {
  eager: true,
  import: 'default',
}) as Record<string, { rows: { impressions: number; clicks: number }[] }>;
const clientSummaries = import.meta.glob('../../docs/seo-reports/*/client-summary.md', {
  query: '?raw',
  import: 'default',
}) as Record<string, () => Promise<string>>;

interface Ga4Summary {
  displayName: string;
  pulledAt: string;
  totals: {
    current: Record<string, number>;
    previous: Record<string, number>;
  };
  events: Record<string, { current: number; previous: number }>;
  channels: { channel: string; sessions: number }[];
}

const dateFromPath = (p: string): string => p.match(/seo-reports\/([^/]+)\//)?.[1] || p;
const latestKey = (obj: Record<string, unknown>): string | undefined =>
  Object.keys(obj).map(dateFromPath).sort().reverse()[0];

const pctDelta = (cur: number, prev: number): number => {
  if (!prev) return cur > 0 ? 100 : 0;
  return Math.round(((cur - prev) / prev) * 100);
};

const ga4ByDate: Record<string, Ga4Summary> = Object.fromEntries(
  Object.entries(ga4Jsons).map(([p, v]) => [dateFromPath(p), v]),
);
const gscByDate = Object.fromEntries(
  Object.entries(gscJsons).map(([p, v]) => [dateFromPath(p), v]),
);
const clientSummaryByDate: Record<string, () => Promise<string>> = Object.fromEntries(
  Object.entries(clientSummaries).map(([p, v]) => [dateFromPath(p), v]),
);

const ClientReport = () => {
  useSEO({
    title: `${BUSINESS_NAME} — Website Performance Report`,
    description: 'Monthly website performance summary.',
    noindex: true,
  });

  // GA4 and GSC update on different cadences and land in different dated
  // folders — pick the latest of EACH independently, not the latest shared one.
  const ga4Date = latestKey(ga4ByDate) || '';
  const gscDate = latestKey(gscByDate) || '';
  const summaryDate = latestKey(clientSummaryByDate) || '';
  const ga4 = ga4ByDate[ga4Date];
  const gsc = gscByDate[gscDate];

  const [summaryHtml, setSummaryHtml] = useState('');
  useMemo(() => {
    const loader = clientSummaryByDate[summaryDate];
    if (!loader) {
      setSummaryHtml('');
      return;
    }
    loader().then((md) => setSummaryHtml(marked.parse(md, { gfm: true }) as string));
  }, [summaryDate]);

  const searchImpressions = gsc ? gsc.rows.reduce((a, r) => a + r.impressions, 0) : 0;
  const searchClicks = gsc ? gsc.rows.reduce((a, r) => a + r.clicks, 0) : 0;

  const prettyDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-dark-900 text-gray-100">
      <div className="max-w-3xl mx-auto px-6 py-12 print:py-4">

        {/* Header */}
        <header className="flex items-center justify-between border-b border-gray-800 pb-6 mb-10">
          <div className="flex items-center gap-3">
            <picture>
              <source srcSet="/assets/Logo.webp" type="image/webp" />
              <img src="/assets/Logo.png" alt={BUSINESS_NAME} className="h-12 w-auto rounded-md" />
            </picture>
            <div>
              <h1 className="text-xl font-bold text-white">{BUSINESS_NAME}</h1>
              <p className="text-sm text-gold-500">Website Performance Report</p>
            </div>
          </div>
          <div className="text-right text-sm text-gray-400">
            <div>{prettyDate}</div>
            <div className="text-xs text-gray-500">Last 30 days</div>
          </div>
        </header>

        {/* Headline metrics */}
        {ga4 ? (
          <section className="mb-10">
            <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-4">
              How the website performed
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <BigStat
                label="Phone calls from the website"
                value={ga4.events.phone_call.current}
                delta={pctDelta(ga4.events.phone_call.current, ga4.events.phone_call.previous)}
              />
              <BigStat
                label="Directions requests"
                value={ga4.events.get_directions.current}
                delta={pctDelta(ga4.events.get_directions.current, ga4.events.get_directions.previous)}
              />
              <BigStat
                label="People who visited the site"
                value={ga4.totals.current.totalUsers || 0}
                delta={pctDelta(ga4.totals.current.totalUsers || 0, ga4.totals.previous.totalUsers || 0)}
              />
              <BigStat
                label="Text-message clicks"
                value={ga4.events.sms_click.current}
                delta={pctDelta(ga4.events.sms_click.current, ga4.events.sms_click.previous)}
              />
            </div>
            <p className="text-xs text-gray-500 mt-3">
              Compared to the previous 30 days. "Phone calls" and "directions" are people
              who tapped those buttons on your website.
            </p>
          </section>
        ) : (
          <section className="mb-10 bg-dark-800 border border-gray-800 rounded-lg p-6">
            <p className="text-gray-300">
              Detailed visitor and phone-call data will appear here once Google Analytics
              reporting is connected. Search visibility (below) is live now.
            </p>
          </section>
        )}

        {/* Search visibility */}
        <section className="mb-10">
          <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-4">
            Getting found on Google
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <BigStat label="Times you appeared in Google search" value={searchImpressions} />
            <BigStat label="Clicks to your website from Google" value={searchClicks} />
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Over the last 90 days. As recent improvements get picked up by Google, these
            numbers grow.
          </p>
        </section>

        {/* What we did */}
        {summaryHtml ? (
          <section className="mb-10">
            <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-4">
              What we worked on
            </h2>
            <div
              className="prose prose-invert prose-sm max-w-none prose-headings:text-gold-500"
              dangerouslySetInnerHTML={{ __html: summaryHtml }}
            />
          </section>
        ) : (
          <section className="mb-10">
            <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-4">
              What we worked on
            </h2>
            <ul className="space-y-2 text-gray-300 text-sm list-disc pl-5">
              <li>Rewrote the homepage to rank for "haircut near me" and "barbershop in Auburn"</li>
              <li>Built dedicated pages for Filipino and Spanish-speaking customers</li>
              <li>Improved the Auburn and beard-trim pages with FAQs that can show in Google</li>
              <li>Fixed technical errors Google was flagging on the site</li>
              <li>Asked Google to re-scan the most important pages to speed up results</li>
            </ul>
          </section>
        )}

        <footer className="border-t border-gray-800 pt-6 text-sm text-gray-500">
          <p>Questions? Call or text {PHONE_DISPLAY}.</p>
          <p className="text-xs mt-1">Prepared for {BUSINESS_NAME} · {prettyDate}</p>
        </footer>
      </div>
    </div>
  );
};

const BigStat = ({ label, value, delta }: { label: string; value: number; delta?: number }) => (
  <div className="bg-dark-800 border border-gray-800 rounded-lg p-5">
    <div className="text-3xl font-bold text-gold-500">{value.toLocaleString()}</div>
    {typeof delta === 'number' && (
      <div className={`text-xs font-semibold mt-1 ${delta >= 0 ? 'text-green-400' : 'text-red-400'}`}>
        {delta >= 0 ? '▲' : '▼'} {Math.abs(delta)}% vs last month
      </div>
    )}
    <div className="text-sm text-gray-400 mt-2">{label}</div>
  </div>
);

export default ClientReport;
