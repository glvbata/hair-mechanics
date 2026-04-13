import { createServer } from 'vite';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// All static routes to prerender — must match main.tsx Routes
const ROUTES = [
  '/',
  '/book',
  '/gallery',
  '/blog',
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
];

function routeToFilePath(route, distDir) {
  if (route === '/') return resolve(distDir, 'index.html');
  // /foo → dist/foo/index.html  (works with Netlify's SPA + static serving)
  const dir = resolve(distDir, route.replace(/^\//, ''));
  mkdirSync(dir, { recursive: true });
  return resolve(dir, 'index.html');
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

    for (const route of ROUTES) {
      try {
        const appHtml = render(route);
        const html = asyncCssTemplate.replace(
          `<div id="root"></div>`,
          `<div id="root">${appHtml}</div>`
        );
        const filePath = routeToFilePath(route, distDir);
        writeFileSync(filePath, html);
        console.log(`✓ Prerendered: ${route}`);
      } catch (err) {
        console.warn(`⚠ Skipped ${route}: ${err.message}`);
      }
    }
  } finally {
    await vite.close();
  }
}

prerender().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
