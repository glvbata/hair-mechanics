# Hair Mechanics - Barbershop Website

## What This Is

Business website for Hair Mechanics LLC, a barbershop in Auburn, WA owned by Glen Celestial. This is a pro bono client project — revenue comes from growing the business (more bookings, foot traffic, visibility).

**Goal:** Get Hair Mechanics ranking higher on Google, more clicks on booking CTAs, more walk-ins.

## Stack

- **Framework:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS 3
- **Routing:** React Router v6
- **Deploy:** Netlify (auto-deploys on push to `main`)
- **Analytics:** GA4 with custom events

## Site: hairmechanics.net

### Pages
- Home (hero, services preview, reviews, CTA)
- Gallery (76 haircut photos)
- Blog
- Service-specific pages
- Local SEO landing pages

### SEO Setup
- JSON-LD structured data (BarberShop + Review schemas)
- Sitemap + robots.txt
- Per-page SEO via `useSEO` hook
- Local SEO pages for Auburn/Kent/Federal Way

### GA4 Custom Events
- `phone_call`, `sms_click`, `get_directions`
- `review_click`, `gallery_image_view`, `social_click`

## Key Rules

- **Every change must be deployable.** Check `netlify.toml` before pushing.
- **SEO first.** Any content or structural change should consider search ranking impact.
- **Performance matters.** Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1.
- **CTAs above the fold.** Phone, directions, and booking links must be immediately visible.
- **Business details are in `README.md`** — use them for copy, structured data, and NAP consistency.
- **Don't change business info without confirming with Gian.** Glen's name, address, phone, hours are real.

## Dev Commands

```bash
npm run dev       # Vite dev server (port 5173)
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # ESLint
```

## Git

- Remote: `https://github.com/glvbata/hair-mechanics.git`
- Branch: `main` (deploys to Netlify on push)
- Treat this like a client repo — clean commits, descriptive messages

## What Success Looks Like

- Higher Google search ranking for "barber auburn wa", "haircut auburn wa"
- More phone calls and direction clicks (tracked via GA4)
- More online booking conversions
- Fast page loads on mobile (most users are on phones)
