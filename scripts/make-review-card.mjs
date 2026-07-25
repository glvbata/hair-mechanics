/**
 * Generate the review-request QR code + a printable card.
 *
 * The QR points at https://hairmechanics.net/review (the branded redirect in
 * netlify.toml), NOT the raw Google URL — so the printed card never goes stale
 * even if the Google review link changes.
 *
 * Outputs:
 *   - public/assets/review-qr.png   (the QR image, also usable on the site)
 *   - docs/review-card.html          (printable card — open + Print to PDF)
 *
 * Run: node scripts/make-review-card.mjs
 */

import QRCode from 'qrcode';
import { mkdir, writeFile } from 'fs/promises';

// ?src=qr distinguishes printed-card scans from the ?src=sms follow-up texts in
// GA4, so we can tell which channel actually produces reviews.
const REVIEW_URL = 'https://hairmechanics.net/review?src=qr';
const QR_PATH = 'public/assets/review-qr.png';
const CARD_PATH = 'docs/review-card.html';

async function main() {
  await mkdir('public/assets', { recursive: true });
  await mkdir('docs', { recursive: true });

  // High-res QR for print (1000px), dark on transparent-ish white.
  await QRCode.toFile(QR_PATH, REVIEW_URL, {
    width: 1000,
    margin: 2,
    color: { dark: '#0D0D0D', light: '#FFFFFF' },
    errorCorrectionLevel: 'H', // survives logos/scuffs on a printed card
  });
  console.log(`✓ QR → ${QR_PATH}`);

  // Also embed as a data URL in the printable card so it's self-contained.
  const qrDataUrl = await QRCode.toDataURL(REVIEW_URL, {
    width: 600,
    margin: 1,
    color: { dark: '#0D0D0D', light: '#FFFFFF' },
    errorCorrectionLevel: 'H',
  });

  // Two cards per page (cut in half) — standard for a counter/mirror card.
  const card = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>Hair Mechanics — Review Card (print me)</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Oswald', Arial, sans-serif; background: #fff; color: #0D0D0D; }
  .sheet { display: flex; flex-direction: column; gap: 24px; padding: 40px; }
  .card {
    border: 2px dashed #ccc; border-radius: 16px; padding: 40px;
    display: flex; align-items: center; gap: 40px; page-break-inside: avoid;
  }
  .qr { width: 220px; height: 220px; flex-shrink: 0; }
  .qr img { width: 100%; height: 100%; }
  .copy h1 { font-size: 34px; text-transform: uppercase; letter-spacing: 1px; line-height: 1.1; }
  .copy .gold { color: #C99A22; }
  .copy p { font-size: 18px; color: #333; margin-top: 12px; line-height: 1.4; }
  .copy .url { font-size: 16px; color: #888; margin-top: 16px; }
  .stars { color: #C99A22; font-size: 26px; letter-spacing: 4px; margin-top: 8px; }
  @media print { .note { display: none; } .card { border-color: #ddd; } }
  .note { padding: 20px 40px; color: #666; font-size: 14px; }
</style>
</head>
<body>
  <div class="note">Print this page (Ctrl/Cmd+P). Two cards — cut along the dashed line. Put one at the register and one at each mirror.</div>
  ${[0, 1]
    .map(
      () => `
  <div class="sheet">
    <div class="card">
      <div class="qr"><img src="${qrDataUrl}" alt="Scan to review Hair Mechanics on Google" /></div>
      <div class="copy">
        <h1>Loved your cut?<br/><span class="gold">Leave us a review.</span></h1>
        <div class="stars">★ ★ ★ ★ ★</div>
        <p>Scan the code with your phone camera —<br/>takes 20 seconds, means the world to us.</p>
        <p class="url">or visit hairmechanics.net/review</p>
      </div>
    </div>
  </div>`,
    )
    .join('')}
</body>
</html>`;

  await writeFile(CARD_PATH, card);
  console.log(`✓ Printable card → ${CARD_PATH}`);
  console.log('Open docs/review-card.html in a browser and print it (2 cards per sheet).');
}

main().catch((e) => {
  console.error('Failed:', e.message);
  process.exit(1);
});
