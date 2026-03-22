---
inclusion: always
---

# Hair Mechanics - Project Context

## Business
- Hair Mechanics is a barbershop at 1251 A St, Auburn, WA 98001
- Phone: (206) 399-9288
- Email: Hairmechanicsllc@yahoo.com
- Hours: Weekdays 10am-8pm, Weekends 8am-8pm
- Social: Instagram @hairmechanics, Facebook /hairmechanics1997, TikTok @glencelestial

## Tech Stack
- React 18 + TypeScript + Vite + Tailwind CSS 3
- React Router v6 (BrowserRouter with SPA redirects via netlify.toml)
- Lucide React for icons
- Deployed on Netlify from GitHub (glvbata/hair-mechanics, main branch)

## Project Structure
- `src/components/` — Reusable UI components (Navbar, Hero, About, Services, Reviews, Contact, Footer)
- `src/pages/` — Route-level pages (Gallery, Blog, BlogPost)
- `public/assets/` — Static images (logo, hero image, haircut gallery photos)
- `assets/` — Duplicate of public/assets (legacy, can be cleaned up)

## Key Notes
- Gallery has 76 real haircut photos, paginated 12 at a time with lightbox
- Blog has 2 published posts with full content; more can be added to BlogPost.tsx data
- Reviews are manually curated — plan to sync with Google Business reviews
- Unused components exist: Barbers.tsx, Store.tsx, StyleGuide.tsx, Gallery.tsx (component version) — these have placeholder/fake data and are not rendered
- Pricing: Haircut $40, Haircut & Beard $50, Kids Cut $35, Line Up / Trim $20
