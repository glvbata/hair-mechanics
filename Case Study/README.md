# Hair Mechanics — SEO Case Study

Monthly Google SERP baseline captures for `hairmechanics.net`, tracking Auburn, WA ranking changes over time. Used to **prove SEO work moves rankings** — without comparable monthly snapshots, improvements are just hand-wavy claims.

## Structure

```
Case Study/
├── keywords.txt                  ← locked keyword list (DO NOT change mid-series)
├── baseline.js                   ← Playwright capture script
├── package.json                  ← isolated from the main site's deps
├── README.md                     ← this file
│
├── April 19 Baseline/            ← month zero (pre-indexation-fix)
│   ├── baseline.md               ← methodology + observations
│   ├── manifest.json             ← machine-readable capture log
│   └── screenshots/              ← gitignored (back up separately!)
├── May 2026 Baseline/            ← etc.
└── ...
```

## Quick start

```bash
# one-time setup
cd "Case Study"
npm install

# capture a new baseline (label auto-generates as "{Month YYYY} Baseline")
npm run baseline

# or with a custom label
node baseline.js "April 19 Baseline"
```

A Chromium window will open (headful — so you can watch and intervene if Google shows a CAPTCHA). Capturing 9 keywords × 2 pages takes ~3 minutes. When done, check `{label}/baseline.md` and fill in the **Observations** section manually.

## Why this exists

Locking keyword targets and tracking them the same way every month is the only way to **prove** that SEO work (indexation fixes, content, backlinks, schema) is actually moving the needle. See `../docs/hair-mechanics-seo-audit.md` for the full audit that sourced the keyword list in `keywords.txt`.

## Methodology rules — do not violate

| Rule | Why |
|---|---|
| Keyword order in `keywords.txt` is load-bearing | File naming uses the index; reordering breaks diffability |
| Viewport 1440×900, always | Changing viewport changes SERP layout; invalidates comparison |
| Fresh browser context (logged-out, no cookies) | Google personalizes for signed-in users → results aren't comparable |
| en-US locale, America/Los_Angeles timezone | Google uses locale + timezone to rank local results |
| Run from the Auburn area IP (or same IP each month) | Local pack composition depends heavily on IP geolocation |
| Screenshots are gitignored | PNGs don't diff; back up `Case Study/` to cloud storage separately |

## If something goes wrong

**CAPTCHA appears:** the script pauses and tells you to solve it manually, then press Enter. If this happens every run, investigate: either the IP's been flagged, or Google's bot detection got more aggressive. Fallback options in that case:
- Add `playwright-extra` + stealth plugin
- Use a SERP API (SerpAPI, ScraperAPI) — $$$
- Fall back to manual capture with Chrome guest window

**Consent banner covering SERP:** `baseline.js` auto-dismisses the common variants, but if Google changes the wording, update `dismissConsent()` in the script.

**Different layout than last month:** Google A/B tests SERP UI constantly. Note in `baseline.md` under Anomalies. As long as it's the same for all keywords in a given run, comparability within that snapshot still holds.

## Skill reference

This directory is the canonical implementation of the `seo-local-baseline` workspace skill (see `.claude/skills/seo-local-baseline/SKILL.md`). If you're adapting this pattern for another client, copy this folder into their project and swap the keyword list.
