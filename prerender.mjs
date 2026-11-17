import { createServer } from 'vite';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { applySEO } from './prerender-metadata.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

// All static routes to prerender — must match main.tsx Routes
const ROUTES = [
  '/',
  '/book',
  '/gallery',
  '/blog',
  '/blog/best-summer-haircuts-men-2026',
  '/blog/haircut-cost-auburn-wa',
  '/blog/walk-in-barber-auburn-wa-open-late',
  '/blog/top-mens-haircut-trends-2026',
  '/blog/complete-guide-to-beard-maintenance',
  '/blog/how-to-maintain-a-fade',
  '/services/fade',
  '/services/beard-trim',
  '/services/haircut',
  '/services/kids-cut',
  '/services/line-up',
  '/auburn-barber',
  '/kent-barber',
  '/federal-way-barber',
  '/sumner-barber',
  '/puyallup-barber',
  '/renton-barber',
  '/team',
  '/barber',
  '/barber/akshat',
  '/filipino-barber-auburn',
  '/barberia-auburn-wa',
];

// /foo → dist/foo.html, not dist/foo/index.html. Netlify 301s /foo → /foo/
// whenever a folder index exists, which put a redirect on every URL in the
// sitemap and contradicted the no-slash canonicals. A .html file is served at
// /foo directly.
function routeToFilePath(route, distDir) {
  if (route === '/') return resolve(distDir, 'index.html');
  const file = resolve(distDir, `${route.replace(/^\//, '')}.html`);
  mkdirSync(dirname(file), { recursive: true });
  return file;
}

async function prerender() {
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    logLevel: 'warn',
  });

  try {
    const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');
    const distDir = resolve(__dirname, 'dist');
    const template = readFileSync(resolve(distDir, 'index.html'), 'utf-8');

    // Convert render-blocking CSS once — applied to every page
    const asyncCssTemplate = template.replace(
      /<link rel="stylesheet" crossorigin href="([^"]+)">/g,
      (_, href) =>
        `<link rel="preload" as="style" href="${href}" onload="this.onload=null;this.rel='stylesheet'">` +
        `<noscript><link rel="stylesheet" href="${href}"></noscript>`
    );

    const renderPage = (route) => {
      const { html: appHtml, seo } = render(route);
      // Fail the build rather than ship a page with the homepage's head tags.
      if (!seo) throw new Error(`${route}: page never called useSEO`);
      const html = asyncCssTemplate.replace(
        `<div id="root"></div>`,
        `<div id="root">${appHtml}</div>`
      );
      return { html, seo };
    };

    // Any failure is fatal: there is no SPA catch-all anymore, so a route that
    // isn't prerendered would be a real 404 on the live site.
    for (const route of ROUTES) {
      const { html, seo } = renderPage(route);
      if (!seo.canonical) throw new Error(`${route}: useSEO has no canonical`);
      writeFileSync(routeToFilePath(route, distDir), applySEO(html, seo));
      console.log(`✓ Prerendered: ${route}  →  ${seo.canonical}`);
    }

    // Netlify serves dist/404.html with a real 404 status for unknown URLs.
    const notFound = renderPage('/__not-found__');
    writeFileSync(resolve(distDir, '404.html'), applySEO(notFound.html, { ...notFound.seo, noindex: true }));
    console.log('✓ Prerendered: 404.html');
  } finally {
    await vite.close();
  }
}

prerender().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
