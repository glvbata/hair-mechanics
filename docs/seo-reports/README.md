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
    └── diff-vs-2026-04-15.md  ← (after 2nd run) what moved since last time
```

## Weekly workflow

```bash
# Pull a fresh report
npm run seo:pull

# Diff against the previous report — what moved up, down, new, lost
npm run seo:diff
```

Both write to `docs/seo-reports/<today>/`. Open the dashboard at
`/_internal/seo` (or `https://hairmechanics.net/_internal/seo` once deployed)
to read it visually.

## Re-authentication

Google issues 7-day refresh tokens for OAuth apps in **Testing** status.
If you see `invalid_grant` or `token expired` from `npm run seo:pull`,
re-auth once:

```bash
npm run seo:auth
```

To get long-lived tokens, publish the OAuth consent screen to "In production"
in the Google Cloud Console (project `robust-charge-495814-v8`). For
`webmasters.readonly` (a sensitive scope) Google may require app verification
— skip this until automation actually matters. Manual weekly pulls are fine.

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
