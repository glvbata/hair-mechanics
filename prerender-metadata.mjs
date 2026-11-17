/**
 * Bake a page's SEO props into its prerendered <head>.
 *
 * Why this exists: useSEO manages <title>, meta, canonical, hreflang and
 * JSON-LD inside a useEffect, and useEffect never runs during renderToString.
 * Before this, the static HTML for 21 of 26 routes carried the homepage's
 * title and canonical — telling Google on first crawl that every service page
 * and blog post was a duplicate of the homepage.
 *
 * Source of truth is each page's own useSEO call: useSEO records its props
 * during SSR (takeSSRSEO in src/utils/useSEO.ts) and prerender.mjs passes them
 * here. There is no hand-kept route list to drift out of sync.
 */

const SITE = 'https://hairmechanics.net';

/**
 * @param {string} template  index.html with the app markup already injected
 * @param {import('./src/utils/useSEO').SEOProps} seo
 * @returns {string}
 */
export function applySEO(template, seo) {
  const lang = seo.lang || 'en';
  const image = seo.ogImage ? absolute(seo.ogImage) : null;
  let html = template;

  html = html.replace(/<html[^>]*lang="[^"]*"/, `<html lang="${lang}"`);
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(seo.title)}</title>`);
  html = setMeta(html, 'name', 'title', seo.title);
  html = setMeta(html, 'name', 'description', seo.description);
  html = setMeta(html, 'name', 'robots', seo.noindex ? 'noindex, nofollow' : 'index, follow');

  html = setMeta(html, 'property', 'og:title', seo.title);
  html = setMeta(html, 'property', 'og:description', seo.description);
  html = setMeta(html, 'property', 'twitter:title', seo.title);
  html = setMeta(html, 'property', 'twitter:description', seo.description);
  if (seo.canonical) {
    html = setMeta(html, 'property', 'og:url', seo.canonical);
    html = setMeta(html, 'property', 'twitter:url', seo.canonical);
  }
  if (image) {
    html = setMeta(html, 'property', 'og:image', image);
    html = setMeta(html, 'property', 'twitter:image', image);
  }

  // Canonical + hreflang: drop the template's copies, then write this page's.
  html = html.replace(/<link\s+rel="canonical"[^>]*\/?>\s*/g, '');
  html = html.replace(/<link\s+rel="alternate"\s+hreflang="[^"]+"[^>]*\/?>\s*/g, '');

  const head = [];
  if (seo.canonical && !seo.noindex) head.push(`<link rel="canonical" href="${esc(seo.canonical)}" />`);
  for (const alt of seo.alternates ?? []) {
    head.push(`<link rel="alternate" hreflang="${esc(alt.hreflang)}" href="${esc(alt.href)}" />`);
  }
  head.push(`<meta property="og:locale" content="${lang === 'es' ? 'es_US' : 'en_US'}" />`);
  if (seo.schema) {
    // Same id useSEO uses, so the client reuses this node instead of adding a second copy.
    const id = seo.schemaId || 'page-schema';
    const json = JSON.stringify(seo.schema).replace(/</g, '\\u003c');
    head.push(`<script type="application/ld+json" id="${esc(id)}">${json}</script>`);
  }

  return html.replace('</head>', `  ${head.join('\n    ')}\n  </head>`);
}

/** Replace an existing <meta {attr}="{key}" content="…"> tag, or append one before </head>. */
function setMeta(html, attr, key, value) {
  const re = new RegExp(`<meta\\s+${attr}="${key.replace('.', '\\.')}"\\s+content="[^"]*"\\s*\\/?>`);
  const tag = `<meta ${attr}="${key}" content="${esc(value)}">`;
  return re.test(html) ? html.replace(re, tag) : html.replace('</head>', `  ${tag}\n  </head>`);
}

function absolute(url) {
  return url.startsWith('/') ? `${SITE}${url}` : url;
}

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
