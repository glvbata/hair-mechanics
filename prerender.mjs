import { createServer } from 'vite';
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function prerender() {
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    logLevel: 'warn',
  });

  try {
    const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');
    const templatePath = resolve(__dirname, 'dist/index.html');
    const template = readFileSync(templatePath, 'utf-8');
    const appHtml = render('/');
    const html = template.replace(
      `<div id="root"></div>`,
      `<div id="root">${appHtml}</div>`
    );
    writeFileSync(templatePath, html);
    console.log('✓ Prerendered: index.html');
  } finally {
    await vite.close();
  }
}

prerender().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
