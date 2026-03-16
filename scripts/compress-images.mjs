import sharp from 'sharp';
import { readdir, stat, readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const INPUT_DIR = 'public/assets/haircuts';
const QUALITY = 75;
const MAX_WIDTH = 800;

async function compressOne(filePath, maxWidth = MAX_WIDTH, quality = QUALITY) {
  const inputBuffer = await readFile(filePath);
  const outputBuffer = await sharp(inputBuffer)
    .resize({ width: maxWidth, withoutEnlargement: true })
    .jpeg({ quality, mozjpeg: true })
    .toBuffer();
  await writeFile(filePath, outputBuffer);
  return { before: inputBuffer.length, after: outputBuffer.length };
}

async function compressImages() {
  const files = await readdir(INPUT_DIR);
  const jpgs = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f));

  let totalBefore = 0;
  let totalAfter = 0;
  let count = 0;

  for (const file of jpgs) {
    const filePath = join(INPUT_DIR, file);
    try {
      const { before, after } = await compressOne(filePath);
      totalBefore += before;
      totalAfter += after;
      count++;
      if (count % 10 === 0) console.log(`Compressed ${count}/${jpgs.length}...`);
    } catch (e) {
      console.error(`Failed: ${file}`, e.message);
    }
  }

  // Hero image
  try {
    const { before, after } = await compressOne('public/assets/HeroImage.jpg', 1920, 80);
    totalBefore += before;
    totalAfter += after;
    console.log('Compressed HeroImage.jpg');
  } catch (e) {
    console.error('Failed hero:', e.message);
  }

  console.log(`\nDone! Compressed ${count} gallery images + hero`);
  console.log(`Before: ${(totalBefore / 1024 / 1024).toFixed(1)} MB`);
  console.log(`After:  ${(totalAfter / 1024 / 1024).toFixed(1)} MB`);
  console.log(`Saved:  ${((totalBefore - totalAfter) / 1024 / 1024).toFixed(1)} MB (${Math.round((1 - totalAfter / totalBefore) * 100)}%)`);
}

compressImages();
