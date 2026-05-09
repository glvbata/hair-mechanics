/**
 * One-time OAuth flow for Google Search Console.
 *
 * - Reads the OAuth desktop client from .secrets/gsc-oauth-client.json
 * - Spins up a tiny localhost server to capture the redirect
 * - Opens the consent screen in your default browser
 * - Saves the resulting refresh token to .secrets/gsc-token.json
 *
 * Run once: node scripts/seo/gsc-auth.mjs
 * After that, gsc-pull-queries.mjs reuses the saved token forever
 * (Google refresh tokens for desktop apps don't expire unless you revoke them
 * or your OAuth consent app is left in "Testing" mode for >7 days).
 */

import { google } from 'googleapis';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { createServer } from 'http';
import { URL } from 'url';
import open from 'open';

const CLIENT_PATH = '.secrets/gsc-oauth-client.json';
const TOKEN_PATH = '.secrets/gsc-token.json';
// Single token covers both Search Console (read-only) and Business Profile
// (manage). Both APIs are read by our pull scripts; business.manage is the
// only scope Google offers — there's no business.readonly equivalent.
const SCOPES = [
  'https://www.googleapis.com/auth/webmasters.readonly',
  'https://www.googleapis.com/auth/business.manage',
];
const PORT = 53682; // unprivileged, unlikely to clash

async function main() {
  if (!existsSync(CLIENT_PATH)) {
    console.error(`Missing ${CLIENT_PATH}. Drop the OAuth desktop client JSON there.`);
    process.exit(1);
  }

  const raw = JSON.parse(await readFile(CLIENT_PATH, 'utf8'));
  const creds = raw.installed || raw.web;
  if (!creds) {
    console.error('Unrecognized OAuth client JSON shape — expected `installed` or `web` key.');
    process.exit(1);
  }

  const redirectUri = `http://localhost:${PORT}`;
  const oAuth2Client = new google.auth.OAuth2(creds.client_id, creds.client_secret, redirectUri);

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent', // forces refresh token even if user has granted before
    scope: SCOPES,
  });

  // Capture the code from Google's redirect to localhost.
  const code = await new Promise((resolve, reject) => {
    const server = createServer((req, res) => {
      try {
        const url = new URL(req.url, redirectUri);
        const c = url.searchParams.get('code');
        const err = url.searchParams.get('error');
        if (err) {
          res.end(`Auth error: ${err}. You can close this tab.`);
          server.close();
          reject(new Error(err));
          return;
        }
        if (c) {
          res.end('Auth complete. You can close this tab and return to the terminal.');
          server.close();
          resolve(c);
        }
      } catch (e) {
        reject(e);
      }
    });
    server.listen(PORT, () => {
      console.log(`Opening browser for Google consent...`);
      console.log(`If it doesn't open, paste this URL: ${authUrl}`);
      open(authUrl).catch(() => {});
    });
  });

  const { tokens } = await oAuth2Client.getToken(code);
  if (!tokens.refresh_token) {
    console.error('No refresh_token returned. Re-run with prompt=consent (already set) or revoke prior grant at https://myaccount.google.com/permissions');
    process.exit(1);
  }

  await mkdir('.secrets', { recursive: true });
  await writeFile(TOKEN_PATH, JSON.stringify(tokens, null, 2));
  console.log(`Saved token → ${TOKEN_PATH}`);
  console.log('Done. Now run: node scripts/seo/gsc-pull-queries.mjs');
}

main().catch((e) => {
  console.error('Auth failed:', e.message);
  process.exit(1);
});
