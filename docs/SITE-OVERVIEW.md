# hairmechanics.net — Complete Site Overview

**Last updated: 2026-07-25** (verified against the code, not the README — the README predates several systems below)

This is the single document that answers: *what is live on this site, how does it work, and what is it doing for the business right now.* Written so both a human and an AI assistant can read it and understand the whole machine.

---

## 1. What this site is

Business website for **Hair Mechanics LLC**, a barbershop in Auburn, WA owned by Glen Celestial. Pro bono client project. The site's only job is to produce **bookings**: phone calls, texts, walk-ins, and direction requests. Everything on it — pages, SEO, analytics, reviews — serves that.

| Fact | Value |
|---|---|
| Domain | hairmechanics.net |
| Business | Hair Mechanics LLC, 1251 A Street NE, Auburn, WA 98002 |
| Phone | (206) 399-9288 |
| Hours | Mon–Fri 10am–8pm, Sat–Sun 8am–8pm |
| Google rating | 4.5★ / 83 reviews (tracked in `src/constants/business.ts`, update quarterly) |
| Repo | https://github.com/glvbata/hair-mechanics (branch `main`) |
| Host | Netlify — auto-deploys on every push to `main` |

---

## 2. Tech stack (and the one important lesson in it)

- **React 18 + TypeScript + Vite + Tailwind CSS 3 + React Router v6**
- **Build-time prerendering** (`prerender.mjs`) — this is the important part
- **Netlify** hosting with SPA fallback + custom headers (`netlify.toml`)

**The lesson:** this started as a client-only React SPA — meaning Google's first look at every page was an empty `<div id="root">`. We had to **bolt on a prerender step** that renders all 26 routes to real, static HTML files at build time (`dist/auburn-barber/index.html`, etc.), including per-route `<title>`, meta description, canonical, and hreflang tags (`prerender-metadata.mjs`). Search engines now get finished HTML instantly; React "hydrates" on top for interactivity.

The build command chain (`package.json`):

```
npm run build  =  optimize-images.mjs  →  vite build  →  prerender.mjs
```

`optimize-images.mjs` converts images to WebP with JPG fallbacks. The prerender step also swaps render-blocking CSS to async-load.

---

## 3. Every page that exists (26 public + 2 hidden)

### Core
| URL | Purpose |
|---|---|
| `/` | Homepage — hero, about, services + FAQ accordion, reviews, contact/map |
| `/gallery` | 76-photo masonry gallery with lightbox |
| `/book` | Google Ads landing page (sticky CTA) |
| `/team`, `/barber`, `/barber/akshat` | Team page + individual barber profiles (Person schema) |
| `/blog` | Blog index |

### Blog posts (6 live)
- `best-summer-haircuts-men-2026`
- `haircut-cost-auburn-wa` ← pricing post; classic high-intent winner
- `walk-in-barber-auburn-wa-open-late`
- `top-mens-haircut-trends-2026`
- `how-to-maintain-a-fade`
- `complete-guide-to-beard-maintenance`

Posts cross-link to each other and to service pages.

### Service pages (5) — one search intent each
`/services/fade` · `/services/beard-trim` · `/services/haircut` · `/services/kids-cut` · `/services/line-up`

### Local SEO area pages (6)
`/auburn-barber` · `/kent-barber` · `/federal-way-barber` · `/sumner-barber` · `/puyallup-barber` · `/renton-barber`

### Community / niche pages (2) — differentiation pages competitors don't have
- `/filipino-barber-auburn` — targets "filipino barber auburn"
- `/barberia-auburn-wa` — **full Spanish-language page**, served with `<html lang="es">` and proper `hreflang` en/es/x-default alternates

### Utility
- `/review` — static page (`public/review/index.html`) behind the review QR code. Fires a GA4 `review_click`, then self-redirects to the Google review form in ~2s. Static-page-instead-of-301 on purpose: a 301 was invisible to analytics.
- `*` → 404 page

### Hidden (noindex, blocked in robots.txt, not in sitemap)
- `/_internal/seo` — SEO dashboard; renders the reports in `docs/seo-reports/` visually
- `/_internal/client-report` — shareable plain-English performance report for Glen

---

## 4. Notable UI features

- Mobile sticky call CTA (`MobileCTA.tsx`) — phone users always have "Call" one thumb away
- **Live open/closed badge** (`OpenNowBadge.tsx` + `utils/hours.ts`) — computed from real hours; targets the "open now / open late" query cluster (added in the latest commit)
- FAQ accordion wired to FAQPage structured data (schema matches visible content)
- Reviews section with real Google reviews + review CTA
- Google Maps embed with real Place ID + directions link
- Scroll animations, photo strips, stats band — cosmetic, lazy-loaded

---

## 5. SEO systems, layer by layer

### 5a. Real HTML per page (prerendering) — see §2

### 5b. Per-page titles & descriptions
- `src/utils/useSEO.ts` sets title / meta description / OG / Twitter / canonical on every route change (client-side).
- `prerender-metadata.mjs` bakes the same into the static HTML at build time for the routes where first-crawl correctness matters most (home, Spanish page, key service/area pages).

### 5c. Structured data (JSON-LD) — the machine-readable layer
| Schema | Where | Notes |
|---|---|---|
| `BarberShop` | `index.html` (every page) | NAP, geo, hours, price range, services catalog with prices, socials. Declared once with stable `@id` (`/#business`) |
| `Service` | Each service page (`ServiceSchema.tsx`) | References the business `@id` instead of re-declaring it |
| `FAQPage` | Services component | **One per URL** — we learned the hard way that two FAQPage schemas on one page = "invalid items" in Search Console |
| `Person` | Barber profile pages | Stable `@id`s per barber |

Key design decision (documented in `business.ts`): **one consolidated business entity** that all other schema references — multiple disconnected copies of the business dilute the entity for both Google and LLM answer engines.

### 5d. Sitemap & robots
- `public/sitemap.xml` — all 26 public URLs
- `public/robots.txt` — allow all, block `/_internal/`, point to sitemap
- `/_internal/*` additionally gets `X-Robots-Tag: noindex` HTTP headers from Netlify

### 5e. NAP consistency
Single source of truth for name/address/phone/hours/prices/socials: `src/constants/business.ts`. Every component, schema block, and analytics call imports from it. Fixes the "changed the phone number in 12 places" bug class.

### 5f. Performance
- All non-home routes lazy-loaded; initial bundle stays small
- WebP everywhere with JPG fallback; hero image preloaded
- Immutable 1-year caching for `/assets/*`, must-revalidate for HTML
- Preconnects for Google Tag Manager and fonts
- Targets: LCP < 2.5s, CLS < 0.1 (mobile-first — most users are on phones)

### 5g. Security headers (`netlify.toml`)
Full CSP (allowlisted: GA4, Google Ads, Maps embed, Google Fonts), HSTS with preload, X-Frame-Options DENY, nosniff, strict referrer policy, locked-down Permissions-Policy.

---

## 6. Google wiring — analytics, ads, search

### GA4 (Measurement ID `G-C82GRQVLDF`)
Loaded via gtag.js in `index.html`. Custom events (`src/utils/analytics.ts`):

| Event | Fires when |
|---|---|
| `phone_call` | Any "Call" button (centralized `handleCall()`) |
| `sms_click` | "Text to Book" |
| `get_directions` | Directions link |
| `review_click` | Any review link, including the `/review` QR page |
| `gallery_image_view` | Lightbox open (with image index) |
| `social_click` | Footer social links (with platform) |

### Google Ads (`AW-17956338356`)
- Conversion label `ONVqCLjl6IgcELT1n_JC` fires on every call click site-wide, alongside the GA4 event
- `/` and `/book` both function as ad landing pages
- The GA4 report splits conversions by source, so we can compare **SEO vs paid** honestly

### Google Search Console
- Verified; sitemap submitted
- **Automated pull scripts** (`scripts/seo/`): `npm run seo:pull` (90 days of query data), `npm run seo:diff` (movement vs previous pull), `npm run ga4:pull` (traffic + conversion summary), `npm run seo:auth` (OAuth; token lives in gitignored `.secrets/`)
- OAuth app is in "Testing" status → refresh tokens expire every 7 days; re-run `seo:auth` when pulls fail. Publishing the consent screen would fix this but requires Google verification — skipped for now.

### Google Business Profile (GBP)
- `npm run gbp:pull` is fully built (search keywords + performance metrics) **but Google's Business Profile APIs are invitation-only** — application for API access is pending. Until approved: export data manually from the GBP dashboard (5 min/month).

---

## 7. The measurement system (how we prove it's working)

### Monthly SERP baseline (`Case Study/`)
- **9 locked keywords** (`keywords.txt` — order is load-bearing, never reorder mid-series)
- Playwright script captures Google results pages 1–2 for each, logged-out, fixed viewport/locale/timezone, same-IP rule — so month-over-month comparisons are honest
- Snapshots live in dated folders with a manifest + observations file

### SEO reports (`docs/seo-reports/YYYY-MM-DD/`)
Each run: raw GSC query export + human-readable top-100 + diff vs last run + GA4 summary. Rendered visually at `/_internal/seo`. Client-friendly version at `/_internal/client-report`.

### Real results so far (May 9 → June 1, 2026 diff)
| Query | Position before | Position after |
|---|---:|---:|
| barber near me | 14.1 | **8.3** |
| barbershop near me | 12.0 | **8.6** |
| haircut near me | 8.9 | **7.8** |
| barbers near me | 24.5 | **11.4** |
| beard trim near me | 61.0 | **23.3** |
| haircut auburn wa | 29.3 | **21.4** |

42 queries moved up, 128 new queries appeared, 0 fell off. GA4 (June): phone calls up +250% month-over-month; **free Google search produced 2× the phone calls of paid ads** (4 vs 2). Traffic is small in absolute terms — this is a single-location shop — but the direction is consistently right.

---

## 8. The reviews engine (`docs/review-playbook.md`)

Rating gap is the #1 constraint: 4.5★/83 vs competitors at ~4.8★/several hundred. The site can rank perfectly and still lose the click to the map pack above it. So:

- **In-chair ask** right after the mirror check (highest conversion, every satisfied client, not just enthusiastic ones)
- **QR cards** at register + mirrors → `hairmechanics.net/review?src=qr` (tracked)
- **Same-evening follow-up text** (once, never bulk, never stale lists — Google filters spikes)
- Generator: `npm run review-card` → printable card with QR
- Target: 4.7★ / 200+ reviews ≈ one quarter at 8–10/week

---

## 9. Operating rules (for any human or AI touching this repo)

1. **Every change must be deployable** — push to `main` = live. Check `netlify.toml` implications.
2. **SEO first** — any content/structure change should consider ranking impact.
3. **Business facts change in one place** — `src/constants/business.ts`, never inline.
4. **New route? Three updates**: `main.tsx` routes, `prerender.mjs` ROUTES list, `public/sitemap.xml` (+ optional `prerender-metadata.mjs` entry).
5. **One FAQPage schema per URL.** Schema must match visible content.
6. **Don't change business info without confirming with Gian** — Glen's details are real.
7. Reports get committed (audit trail); OAuth tokens never do (`.secrets/` is gitignored).

---

## 10. Current gaps / open items

- [ ] GBP API application pending Google approval (manual export until then)
- [ ] OAuth app in Testing → 7-day tokens (annoying, acceptable)
- [ ] Review count still far from the 200 target — the playbook is the active push
- [ ] GA4: confirm all key events are marked as conversions in the GA4 UI
- [ ] `README.md` is partially stale (says blog is disabled, WebP is a TODO — both shipped); this file is the current source of truth
