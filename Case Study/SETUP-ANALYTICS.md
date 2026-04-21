# One-time Google login (for GA4 + GSC)

`extras.js` drives every data source through Playwright — including GA4 and Google Search Console. No service accounts, no API keys, no Cloud Console project.

One-time setup: log into Google once via `--login`. Playwright saves the signed-in Chrome profile to `Case Study/.auth/chrome-profile/` and reuses it every month until Google expires the session.

> **Why a dedicated profile instead of your real Chrome?**
> Google's login page blocks Playwright's bundled Chromium with "this browser or app may not be secure." Using `channel: 'chrome'` with a dedicated user-data-dir gets us the *real* Chrome binary (same one you use daily), just pointed at an isolated profile folder — Google sees it as normal Chrome, and your personal Chrome profile stays untouched.

---

## First run (~2 minutes)

From the `Case Study` folder:

```bash
npm install                 # first time only — also downloads Playwright browsers
node extras.js --login      # opens real Chrome, you log in, it saves the profile
```

What happens:
1. A **Chrome** window opens on `accounts.google.com` (your installed Chrome, not bundled Chromium).
2. Log into the Google account that has **GA4 access + GSC access** for the client.
3. Complete any 2FA prompts.
4. When you see your avatar / account chooser, come back to the terminal and press Enter.
5. The script primes `analytics.google.com` and `search.google.com/search-console` so their cookies are warm, then closes.

Profile saved to `Case Study/.auth/chrome-profile/` (gitignored — treat as a password).

---

## Every month after that

```bash
node baseline.js "April 19 Baseline"     # SERP captures
node extras.js  "April 19 Baseline"      # PageSpeed + Maps + GA4 + GSC
```

No login prompt. The signed-in profile is reused silently.

**GA4 and GSC pause for you to confirm the view.** PageSpeed and Maps run hands-off, but when the GA4 and GSC tabs open, the script pauses and asks you to:
1. Pick the right property if Google shows a chooser.
2. Set the date range you want (e.g. Last 28 days).
3. Make sure the numbers you care about are visible on screen.
4. Switch back to the terminal and press **Enter** — the screenshot captures exactly what you've arranged.

This is intentional. Google's analytics UIs have too many conditional states (consent modals, reauth, property pickers, onboarding) to auto-detect reliably, and once a month it's cheaper to confirm visually than to maintain brittle selectors.

---

## When Google logs you out

Expect this every 1–3 months. Google periodically expires long-lived sessions.

**Symptom:** `extras.js` logs this on GA4/GSC steps:
```
  [ga4] ⚠️  not signed in — re-run: node extras.js --login
  [gsc] ⚠️  not signed in — re-run: node extras.js --login
```

The rest of the run (PageSpeed + Maps) still completes. In `baseline.md` you'll see `_skipped — not signed in (run --login)_`.

**Fix:**
```bash
node extras.js --login              # 30 seconds — same profile, just re-auth
node extras.js "April 19 Baseline"  # re-run to backfill
```

---

## Editing per client (one-time when forking to a new client)

Top of `extras.js`:
```js
const SITE_URL = 'https://hairmechanics.net';
const LOCAL_PACK_QUERY = 'barbershop Auburn WA';
const GSC_PROPERTY = 'https://hairmechanics.net/';   // or 'sc-domain:example.com' for domain properties
const GA4_PROPERTY_ID = '';                           // digits only, e.g. '482193057'
const GEOLOCATION = { latitude: 47.3073, longitude: -122.2285 };
```

`GSC_PROPERTY` must **exactly** match how the site is registered in Search Console:
- URL-prefix property → `https://example.com/` (trailing slash)
- Domain property → `sc-domain:example.com` (no protocol, no slash)

`GA4_PROPERTY_ID` is the numeric property ID. Without it, `extras.js` lands on
GA4's account chooser instead of the report.
- Find it: GA4 → Admin (gear icon, bottom-left) → Property column → **Property Settings** → **Property ID**.
- It's digits only, ~9 digits. Paste as a string, no `G-` prefix (that's the Measurement ID, different thing).

---

## What gets captured

| Source | Method | Signed-in session needed |
|---|---|---|
| PageSpeed (mobile + desktop) | headful real Chrome → pagespeed.web.dev | no |
| Local Pack / Maps | headful real Chrome → google.com/maps (geolocation-locked) | no |
| GA4 (Home screenshot + parsed users/sessions) | headful real Chrome → analytics.google.com | yes |
| GSC (Performance 28d: clicks / impressions / CTR / avg pos) | headful real Chrome → search.google.com/search-console | yes |

Headful + real Chrome because Google's login/security checks flag automated Chromium aggressively — you see the browser windows fly through, same as `baseline.js`.

---

## Security notes

- `.auth/chrome-profile/` contains your Google cookies and local state. **Do not commit.** `.gitignore` excludes the whole `.auth/` folder.
- If the profile leaks: in your Google Account → Security → "Your devices" → sign the compromised session out. Then run `--login` again.
- Same blast radius as logging in on a new laptop — only whatever access that Google account has.
- The profile is isolated from your everyday Chrome; only the SEO baseline tool uses it.

---

## Why not service accounts / API keys?

An earlier version used a Google Cloud service account + PageSpeed API key. More robust long-term (no expiration), but ~30 minutes of Cloud Console setup per client. For a solo dev running this monthly, re-logging in every couple of months beats the setup tax.

If you ever want that path back: Cloud project → service account JSON → enable GA4 Data API + GSC API + PageSpeed API → grant Viewer in GA4 + Restricted in GSC.
