# SEO Changes — Hair Mechanics

**Date:** April 18, 2026  
**Based on:** Full SEO audit (`hair-mechanics-seo-audit.md`)  
**Scope:** Three critical fixes from audit

---

## 1. Title Tag Fix

**File:** `src/App.tsx` (line 19)

**Before:**
```
Hair Mechanics | Auburn Barber Shop & Haircuts Near Me | (206) 399-9288
```
(68 characters — phone number wastes 16 chars of title real estate)

**After:**
```
Hair Mechanics | Barbershop in Auburn, WA | Walk-Ins Welcome
```
(60 characters)

**Why:** Phone numbers in title tags provide zero SEO value and crowd out keywords. The new title hits the primary keyword phrase ("Barbershop in Auburn, WA") and surfaces the walk-in differentiator. Phone number belongs in Google Business Profile, not the title tag.

---

## 2. Sitemap Fix

**File:** `public/sitemap.xml`

**What was done:** Removed the `/services/womens-cut` entry — the shop does not offer women's cuts. Previously added in error during the initial SEO pass.

**On the blog URL audit finding:** All 4 blog slugs in the sitemap have full content in `BlogPost.tsx` and are being pre-rendered. No blog entries needed to be removed.
- `/blog/how-to-maintain-a-fade` ✅
- `/blog/walk-in-barber-auburn-wa-open-late` ✅
- `/blog/top-mens-haircut-trends-2026` ✅
- `/blog/complete-guide-to-beard-maintenance` ✅

---

## 3. Pre-rendering

**Files:** `src/main.tsx`, `src/entry-server.tsx`, `prerender.mjs`

**What was found:** The site already has a custom pre-rendering pipeline:
- `prerender.mjs` uses Vite's SSR mode to generate static `index.html` files for every route at build time
- The build script (`package.json`) runs it: `vite build && node prerender.mjs`
- Netlify serves static files before applying the `/*` catch-all redirect, so pre-rendered pages are served as real HTML to Googlebot

No changes needed here beyond reverting the `/services/womens-cut` additions (see below).

---

## 5. Women's Cut — Full Removal (corrective)

Hair Mechanics does not offer women's cuts. The `WomensCut.tsx` page was built in error. All references have been removed:

| File | Change |
|------|--------|
| `src/pages/services/WomensCut.tsx` | **Deleted** |
| `src/main.tsx` | Removed lazy import + Route |
| `src/entry-server.tsx` | Removed sync import + Route |
| `prerender.mjs` | Removed `/services/womens-cut` from ROUTES |
| `public/sitemap.xml` | Removed `/services/womens-cut` entry |
| `blog-posts/pricing-guide.md` | Removed "Women's Cuts" section |
| `README.md` | Removed route table row + updated directory comment |

---

## 4. Dead Internal Blog Links Fixed

**File:** `src/pages/BlogPost.tsx`

Two "Related Articles" slugs in `relatedPosts` pointed to blog posts that don't exist in `blogPostsData`, resolving to the "Post Not Found" UI — soft 404s that waste crawl budget:

| Dead slug | Appeared in | Replaced with |
|---|---|---|
| `haircut-for-your-face-shape` | Related posts of `top-mens-haircut-trends-2026` | `how-to-maintain-a-fade` |
| `ultimate-hair-product-guide` | Related posts of `complete-guide-to-beard-maintenance` | `how-to-maintain-a-fade` |

---

## Summary of Files Changed

| File | Change |
|------|--------|
| `index.html` | Removed phone number from `<title>` and `<meta name="title">` |
| `src/App.tsx` | Removed phone number from `useSEO` title |
| `src/pages/BlogPost.tsx` | Fixed 2 dead `relatedPosts` slugs |
| `src/pages/services/WomensCut.tsx` | **Deleted** — service not offered |
| `src/main.tsx` | Removed `WomensCutPage` import + route |
| `src/entry-server.tsx` | Removed `WomensCutPage` import + route |
| `prerender.mjs` | Removed `/services/womens-cut` from ROUTES |
| `public/sitemap.xml` | Removed `/services/womens-cut` entry |
| `blog-posts/pricing-guide.md` | Removed "Women's Cuts" section |
| `README.md` | Removed route row + updated directory comment |

---

## Remaining Audit Items (Not in Scope)

These were flagged in the audit but not addressed in this pass:

- **Google Search Console not verified** — highest-leverage action remaining; requires Glen to add a DNS TXT record
- **Gallery image alt text and filenames** — 76 images have no alt text and UUID-style filenames
- **Internal links to area pages** — Auburn, Kent, Federal Way etc. only linked from footer
- **`/team` and `/barber/akshat` orphaned** — in sitemap but no nav links pointing to them
