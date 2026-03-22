# Hair Mechanics — hairmechanics.net

Barber shop website for **Hair Mechanics LLC** in Auburn, WA.  
React 18 + TypeScript + Vite + Tailwind CSS 3 + React Router v6. Deployed on **Netlify**.

---

## Business Info

| Field | Value |
|-------|-------|
| Name | Hair Mechanics LLC |
| Address | 1251 A Street NE, Auburn, WA 98002 |
| Phone | (206) 399-9288 |
| Email | Hairmechanicsllc@yahoo.com |
| Hours | Mon–Fri 10am–8pm, Sat–Sun 8am–8pm |
| Google Rating | 4.5 ★ (83 reviews) |
| Barbers | Glen Celestial (Owner), Angel Lara, Michael Nonog |

**Socials:**
- Instagram: https://www.instagram.com/hairmechanics1997/
- Facebook: https://www.facebook.com/hairmechanics1997/
- TikTok: https://www.tiktok.com/@glencelestial

---

## Pages & Routes

### Public (in nav)
| Route | Page | Purpose |
|-------|------|---------|
| `/` | Homepage | Hero, About, Services, Reviews, Contact, Footer |
| `/gallery` | Gallery | Masonry photo grid with lightbox (76 images) |
| `/#about` | About section | Scroll anchor on homepage |
| `/#services` | Services section | Scroll anchor on homepage |
| `/#contact` | Contact section | Scroll anchor with map embed |

### Public (in footer / internal links)
| Route | Page | Purpose |
|-------|------|---------|
| `/book` | Booking Landing Page | Google Ads landing page with sticky CTA |
| `/services/fade` | Fade Haircut | SEO service page |
| `/services/beard-trim` | Beard Trim | SEO service page |
| `/services/haircut` | Haircut | SEO service page |
| `/services/kids-cut` | Kids Cut | SEO service page |
| `/services/womens-cut` | Women's Cut | SEO service page |
| `/services/line-up` | Line Up | SEO service page |
| `/auburn-barber` | Auburn area page | Local SEO |
| `/kent-barber` | Kent area page | Local SEO |
| `/federal-way-barber` | Federal Way area page | Local SEO |
| `/sumner-barber` | Sumner area page | Local SEO |
| `/puyallup-barber` | Puyallup area page | Local SEO |
| `/renton-barber` | Renton area page | Local SEO |

### Hidden / Draft
| Route | Page | Status |
|-------|------|--------|
| `/barber` | Barber profile (Glen) | Accessible but NOT linked in nav/footer |
| `/blog`, `/blog/:slug` | Blog | Routes removed, code kept in codebase for later |
| `*` | 404 Not Found | Catch-all with link back to home |

---

## SEO Setup

### Per-page SEO
- `useSEO` hook (`src/utils/useSEO.ts`) dynamically sets `<title>`, meta description, OG tags, Twitter cards, and canonical URL on every route change.
- Each page/component calls `useSEO()` with its own title, description, and canonical.

### Structured Data (JSON-LD)
- **BarberShop schema** in `index.html` — name, address, geo, hours, phone, rating, services catalog
- **AggregateRating** — 4.5 stars, 83 reviews
- **Service schema** (`ServiceSchema.tsx`) on each of the 6 service pages — individual service + price + provider
- **FAQPage schema** in the Services component — FAQ accordion with structured data

### Sitemap & Robots
- `public/sitemap.xml` — all 16 public pages with priorities
- `public/robots.txt` — allows all, blocks `/assets/haircuts/`, points to sitemap
- Submitted to Google via: `https://hairmechanics.net/sitemap.xml`

### Keywords
Targeting: auburn hair, barber, haircut near me, barbershop, barber shop, hair salon, auburn barber shop, fade haircut, beard trim, asian hair salons auburn

---

## Google & Analytics

### Google Analytics (GA4)
- **Property ID:** `G-93J5P4VBV2`
- Loaded in `index.html` via gtag.js

### GA4 Custom Events (`src/utils/analytics.ts`)
| Event Name | Trigger | Where |
|------------|---------|-------|
| `phone_call` | User taps any "Call" button | All pages (centralized via analytics.ts) |
| `sms_click` | User taps "Text to Book" | Hero, Book page |
| `get_directions` | User clicks "Get Directions" | Contact section |
| `review_click` | User clicks any review/leave-review link | Reviews, Contact, Book |
| `gallery_image_view` | User opens a photo in lightbox | Gallery |
| `social_click` | User clicks a social media link | Footer |

### Google Ads
- **Tag ID:** `AW-17956338356`
- **Conversion label:** `AW-17956338356/ONVqCLjl6IgcELT1n_JC`
- Fires on every "Call to Book" button click across the entire site (homepage, /book, gallery, all service/area pages via PageLayout)
- Both `/` and `/book` work as Google Ads landing pages

### Google Maps
- Embedded iframe using real Place ID for Hair Mechanics LLC
- Directions link: `https://www.google.com/maps/dir//Hair+Mechanics+LLC,+1251+A+St+NE,+Auburn,+WA+98002`
- Google review link: `https://g.page/r/Cc2wjU_thhsrEAI/review`

---

## Deployment & Hosting

- **Host:** Netlify
- **Domain:** hairmechanics.net
- **Build:** `npm run build` → outputs to `dist/`
- **SPA redirect:** `/*` → `/index.html` (200) in `netlify.toml`
- **Security headers:** X-Content-Type-Options, X-Frame-Options, Referrer-Policy
- **Caching:** immutable for `/assets/*`, must-revalidate for HTML, 1hr for sitemap/robots

---

## Project Structure

```
src/
├── App.tsx                  # Homepage (Hero + About + Services + Reviews + Contact)
├── main.tsx                 # Router with all routes + scroll restoration
├── global.d.ts              # Window.gtag type declaration
├── components/
│   ├── Navbar.tsx            # Fixed nav with section scroll + mobile menu
│   ├── Hero.tsx              # Hero with call + SMS CTAs
│   ├── About.tsx             # About section + wheelchair accessible badge
│   ├── Services.tsx          # Service cards + FAQ accordion + FAQPage schema
│   ├── Reviews.tsx           # Google reviews + review link
│   ├── Contact.tsx           # Contact info + map + directions + review link
│   ├── Footer.tsx            # 3-column: brand, services links, area links
│   ├── PageLayout.tsx        # Shared layout (Navbar + Footer + SEO + conversion tracking)
│   └── ServiceSchema.tsx     # JSON-LD Service schema component
├── pages/
│   ├── Book.tsx              # Google Ads landing page
│   ├── Gallery.tsx           # Masonry gallery + lightbox
│   ├── Barber.tsx            # Barber profile (draft)
│   ├── NotFound.tsx          # 404 page
│   ├── services/             # 6 service landing pages (Fade, BeardTrim, Haircut, KidsCut, WomensCut, LineUp)
│   └── areas/                # 6 area pages (Auburn, Kent, FederalWay, Sumner, Puyallup, Renton)
├── utils/
│   ├── useSEO.ts             # Dynamic SEO hook (title, meta, OG, Twitter, canonical)
│   └── analytics.ts          # GA4 custom event tracking helpers
└── index.css                 # Tailwind + custom styles
```

---

## What's Missing / TODO

### Should do soon
- [ ] **Google Search Console** — verify hairmechanics.net and submit sitemap
- [ ] **GA4 conversions** — mark `sms_click`, `review_click`, `phone_call`, `social_click` as conversions in GA4 dashboard
- [ ] **Rich Results Test** — run https://search.google.com/test/rich-results on hairmechanics.net to validate structured data

### When ready
- [ ] **Gallery images** — replace/add higher quality photos (currently 76 images from Instagram)
- [ ] **Barber profile page** — finalize `/barber` content and add to nav when ready
- [ ] **Blog** — routes are removed but code is in codebase; re-enable when content is ready
- [ ] **More Google reviews** — add more real reviews to the Reviews component as they come in

### Nice to have
- [ ] **Image optimization** — convert gallery JPGs to WebP with `<picture>` fallbacks
- [ ] **A/B test CTAs** — test "Call Now" vs "Book Now" copy with GA4 events
- [ ] **Email signup / promotions** — capture leads for repeat business
