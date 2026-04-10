/**
 * Image optimization script — converts JPGs to WebP using Sharp.
 * Skips files that already have an up-to-date WebP version.
 * Run: node scripts/optimize-images.mjs
 * Called automatically by: npm run build
 */

import sharp from 'sharp';
import { readdirSync, statSync, existsSync } from 'fs';
import { resolve, join, extname, basename } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const WEBP_QUALITY = 80;

const INPUT_DIRS = [
  resolve(__dirname, '../public/assets'),
  resolve(__dirname, '../public/assets/haircuts'),
];

let converted = 0;
let skipped = 0;

for (const INPUT_DIR of INPUT_DIRS) {
  const files = readdirSync(INPUT_DIR).filter(f =>
    ['.jpg', '.jpeg', '.png'].includes(extname(f).toLowerCase())
  );

  await Promise.all(
    files.map(async (file) => {
      const inputPath = join(INPUT_DIR, file);
      const webpName = basename(file, extname(file)) + '.webp';
      const webpPath = join(INPUT_DIR, webpName);

      if (existsSync(webpPath)) {
        const srcMtime = statSync(inputPath).mtimeMs;
        const webpMtime = statSync(webpPath).mtimeMs;
        if (webpMtime >= srcMtime) {
          skipped++;
          return;
        }
      }

      await sharp(inputPath)
        .webp({ quality: WEBP_QUALITY })
        .toFile(webpPath);

      converted++;
    })
  );
}

console.log(`[optimize-images] Done — ${converted} converted, ${skipped} skipped (already up to date)`);
