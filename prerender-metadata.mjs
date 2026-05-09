/**
 * Route → head-tag metadata used during prerender.
 *
 * Why this exists: the site uses useSEO (a useEffect hook) to manage <title>,
 * <meta>, hreflang, and JSON-LD. useEffect doesn't run during renderToString,
 * so the prerendered HTML otherwise has the static index.html head on every
 * route. Google's first crawl reads that static HTML — for English pages the
 * default is "good enough," but for the Spanish landing it actively hurts
 * (an es-language URL served with <html lang="en"> and an English title is
 * a contradictory signal).
 *
 * This file is the prerender-time source of truth. Routes not listed here
 * keep the default index.html head and rely on client-side useSEO to mutate
 * it post-hydration (which Google handles via JS rendering, slower but works).
 *
 * Keep entries here in sync with what each page's useSEO call declares.
 */

const SITE = 'https://hairmechanics.net';
const PHONE = '(206) 399-9288';

/** @type {Record<string, RouteMeta>} */
export const ROUTE_METADATA = {
  '/': {
    lang: 'en',
    title: 'Haircut Near Me | Barbershop in Auburn, WA | Hair Mechanics',
    description: `Looking for a haircut near you in Auburn, WA? Hair Mechanics is Auburn's top-rated barber shop — expert haircuts, fades, beard trims, and kids' cuts. Walk-ins welcome, open 7 days. Call ${PHONE}.`,
    canonical: SITE,
    alternates: [
      { hreflang: 'en', href: SITE },
      { hreflang: 'es', href: `${SITE}/barberia-auburn-wa` },
      { hreflang: 'x-default', href: SITE },
    ],
  },
  '/barberia-auburn-wa': {
    lang: 'es',
    title: 'Barbería en Auburn, WA | Cortes de Pelo y Degradados | Hair Mechanics',
    description: `¿Buscando una barbería cerca de mi en Auburn, WA? Hair Mechanics — cortes de pelo, degradados, arreglo de barba. Walk-ins bienvenidos, abiertos 7 días. Llame al ${PHONE}.`,
    canonical: `${SITE}/barberia-auburn-wa`,
    ogLocale: 'es_US',
    alternates: [
      { hreflang: 'es', href: `${SITE}/barberia-auburn-wa` },
      { hreflang: 'en', href: SITE },
      { hreflang: 'x-default', href: SITE },
    ],
  },
  '/filipino-barber-auburn': {
    lang: 'en',
    title: 'Filipino Barber in Auburn, WA | Hair Mechanics',
    description: `Looking for a Filipino barber in Auburn, WA? Hair Mechanics cuts Filipino hair every day — taper fades, side parts, modern styles. Walk-ins welcome. 4.9★ on Google. Call ${PHONE}.`,
    canonical: `${SITE}/filipino-barber-auburn`,
  },
  '/auburn-barber': {
    lang: 'en',
    title: 'Barbershop in Auburn, WA | Haircut Near Me | Hair Mechanics',
    description: `Looking for a barbershop in Auburn, WA? Hair Mechanics is Auburn's top-rated barber shop — expert haircuts, fades, beard trims, and kids' cuts. Walk-ins welcome, open 7 days. Call ${PHONE}.`,
    canonical: `${SITE}/auburn-barber`,
  },
  '/services/beard-trim': {
    lang: 'en',
    title: 'Beard Trim Near Me | Beard Shaping in Auburn, WA | Hair Mechanics',
    description: 'Looking for a beard trim near me in Auburn, WA? Hair Mechanics offers professional beard trims, shaping, and hot-towel finish. Walk-ins welcome.',
    canonical: `${SITE}/services/beard-trim`,
  },
};

/**
 * @typedef {{
 *   lang: 'en' | 'es' | string,
 *   title: string,
 *   description: string,
 *   canonical: string,
 *   ogLocale?: string,
 *   alternates?: Array<{ hreflang: string, href: string }>,
 * }} RouteMeta
 */

/**
 * Apply route metadata to an HTML template by patching <html lang>, <title>,
 * description meta, canonical link, and hreflang alternates. Returns the
 * patched HTML string.
 */
export function applyRouteMetadata(template, route) {
  const meta = ROUTE_METADATA[route];
  if (!meta) return template;

  let html = template;

  // <html lang="...">
  html = html.replace(/<html[^>]*lang="[^"]*"/, `<html lang="${meta.lang}"`);

  // <title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(meta.title)}</title>`);

  // <meta name="description">
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`,
  );

  // Drop any existing canonical / hreflang links and rewrite. Insert before
  // </head> to keep them grouped.
  const insertions = [];
  insertions.push(`<link rel="canonical" href="${meta.canonical}" />`);
  if (meta.alternates) {
    for (const alt of meta.alternates) {
      insertions.push(`<link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}" />`);
    }
  }
  if (meta.ogLocale) {
    insertions.push(`<meta property="og:locale" content="${meta.ogLocale}" />`);
  }

  // Strip any pre-existing canonical the template might have, to avoid duplicates.
  html = html.replace(/<link\s+rel="canonical"[^>]*\/?>/g, '');
  html = html.replace(/<link\s+rel="alternate"\s+hreflang="[^"]+"[^>]*\/?>/g, '');

  html = html.replace('</head>', `${insertions.join('\n    ')}\n  </head>`);

  return html;
}

function escapeHtml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
