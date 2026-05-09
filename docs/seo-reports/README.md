# SEO Reports

One folder per report run. Folder name is the run date in `YYYY-MM-DD`.

## Folder convention

```
docs/seo-reports/
├── README.md                  ← this file
└── 2026-05-09/                ← one folder per run
    ├── gsc-queries.json       ← raw GSC export (all queries, last 90 days)
    ├── gsc-queries.md         ← top 100 queries, human-readable
    └── keyword-map.md         ← analysis + prioritized action plan
```

Future runs may also drop in:
- `lighthouse.html` — Lighthouse score + audit
- `broken-links.md` — broken internal/external links
- `core-web-vitals.json` — CrUX field data
- `schema-validation.md` — JSON-LD lint output

## How to run a new report

```bash
# One-time auth (already done — token cached in .secrets/gsc-token.json)
node scripts/seo/gsc-auth.mjs

# Pull latest 90 days into a new dated folder
node scripts/seo/gsc-pull-queries.mjs

# Then write the analysis (keyword-map.md) by hand or via the seo-check skill
```

Reports are checked into git — they're part of the project's audit trail. The auth token + OAuth client JSON are NOT (gitignored under `.secrets/`).
