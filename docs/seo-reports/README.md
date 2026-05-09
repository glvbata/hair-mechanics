# SEO Reports

One folder per report run. Folder name is the run date in `YYYY-MM-DD`.

## Folder convention

```
docs/seo-reports/
├── README.md                  ← this file
└── 2026-05-09/                ← one folder per run
    ├── gsc-queries.json       ← raw GSC export (all queries, last 90 days)
    ├── gsc-queries.md         ← top 100 queries, human-readable
    ├── keyword-map.md         ← analysis + prioritized action plan
    ├── diff-vs-2026-04-15.md  ← (after 2nd run) what moved since last time
    ├── gbp-keywords.json      ← raw GBP search keyword impressions, 12 months
    ├── gbp-keywords.md        ← human-readable keyword table
    ├── gbp-performance.json   ← raw GBP performance time series, 90 days
    ├── gbp-performance.md     ← business outcomes summary (calls, directions, clicks)
    └── gbp-posts.md           ← optional: drafted posts for the next 4 weeks
```

## Weekly workflow

```bash
# Web — Search Console queries
npm run seo:pull          # 90 days of GSC search analytics
npm run seo:diff          # diff vs previous report — what moved

# Map listing — Business Profile data
npm run gbp:pull          # search keywords + performance metrics
```

All write to `docs/seo-reports/<today>/`. Open the dashboard at
`/_internal/seo` (or `https://hairmechanics.net/_internal/seo` once deployed)
to read it visually — every new section appears automatically when its
markdown file is present.

## Re-authentication

Google issues 7-day refresh tokens for OAuth apps in **Testing** status.
If you see `invalid_grant` or `token expired` from any of the pull
scripts, re-auth once:

```bash
npm run seo:auth
```

The single token covers both Search Console (`webmasters.readonly`) and
Business Profile (`business.manage`) — re-running auth refreshes both.

To get long-lived tokens, publish the OAuth consent screen to "In production"
in the Google Cloud Console (project `robust-charge-495814-v8`). Both
scopes are "sensitive" — Google may require app verification — skip this
until automation actually matters. Manual weekly pulls are fine.

## First-time GBP setup — and the reality check

The `npm run gbp:pull` script and dashboard sections are wired up and ready,
**but they don't work out of the box.** All three Google Business Profile
APIs are invitation-only — even after you "enable" them in the Cloud
Console, your project's quota stays at 0/min until Google manually approves
your Cloud project. This is Google's gate to prevent spam tooling.

### Status as of 2026-05-09

- ✅ APIs enabled in Cloud project `robust-charge-495814-v8`
- ✅ OAuth scope `business.manage` granted to the token
- ❌ Cloud project NOT approved for Business Profile API access — pending
  application

### To enable the GBP pull

1. Apply via Google's gating form:
   https://docs.google.com/forms/d/e/1FAIpQLSfBjmoYJTM1KYxhy4yepSDJjwAj02hSXakvqIumTLqZqGTn-Q/viewform
2. Provide:
   - Cloud project ID: `robust-charge-495814-v8`
   - OAuth client ID: `441303402741-fou3nekl3jl8p5j0v9fjs07u349jhace.apps.googleusercontent.com`
   - Single-client read-only SEO use case (see commit message of this
     change for the canned description)
3. Wait. Google review is 2 days to 4 weeks with no SLA.
4. Once approved, `npm run gbp:pull` works as designed — no code changes.

### Fallback while waiting

GBP keyword data comes out of the GBP UI manually. Export the search-terms
list from your Business Profile dashboard (or just paste it into the
keyword-map analysis like we did the first time). Manual cadence is fine
for a single-shop client — 5 minutes / month.

## Future automation

When the OAuth app is published with long-lived tokens, the obvious next step
is GitHub Actions cron — runs `npm run seo:pull && npm run seo:diff` every
Monday morning, commits the report back to main. Skeleton:

```yaml
# .github/workflows/seo-weekly.yml
on:
  schedule:
    - cron: '0 14 * * 1'  # Mondays 14:00 UTC = 7am Pacific
jobs:
  pull:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run seo:pull
        env:
          GSC_REFRESH_TOKEN: ${{ secrets.GSC_REFRESH_TOKEN }}
      - run: npm run seo:diff || true
      - uses: stefanzweifel/git-auto-commit-action@v5
        with:
          commit_message: 'seo: weekly GSC report'
```

(Would need a small change to the pull script to read tokens from env vars
instead of `.secrets/gsc-token.json` for CI use.)

## Future artifacts the dashboard already supports

Drop these into a date folder and the dashboard will pick them up next build:
- `lighthouse.html` — Lighthouse score + audit
- `broken-links.md` — broken internal/external link report
- `core-web-vitals.json` — CrUX field data
- `schema-validation.md` — JSON-LD lint output

Reports are checked into git — they're the audit trail. The OAuth client
JSON and refresh token are NOT (gitignored under `.secrets/`).
