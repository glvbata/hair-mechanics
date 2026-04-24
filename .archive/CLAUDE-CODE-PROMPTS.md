# Hair Mechanics — Claude Code Prompts
> Copy-paste these directly into Claude Code. Each is self-contained.

---

## PROMPT 1 — Blog Post: How to Maintain a Fade Between Cuts

```
You are working in the hair-mechanics project at projects/hair-mechanics/.

Add a new blog post to the site. The blog system works like this:
- Post data lives in src/pages/BlogPost.tsx inside the `blogPostsData` object (keyed by slug)
- Post cards live in src/pages/Blog.tsx inside the `blogPosts` array
- Each new slug must be added to the ROUTES array in prerender.mjs
- Each new slug must be added to public/sitemap.xml

Add the following post. Match the exact structure of existing posts.

--- BLOG CARD (add to blogPosts array in Blog.tsx, insert FIRST in the array) ---

{
  id: 4,
  title: "How to Maintain a Fade Between Cuts",
  excerpt: "A great fade starts fading within a week. Here's exactly how to keep it sharp longer — and when it's time to come back in.",
  image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
  author: "Hair Mechanics",
  date: "April 19, 2026",
  readTime: "4 min read",
  tags: ["Fade", "Maintenance", "Grooming Tips"],
  slug: "how-to-maintain-a-fade"
}

--- FULL POST (add to blogPostsData in BlogPost.tsx) ---

Key: "how-to-maintain-a-fade"

title: "How to Maintain a Fade Between Cuts"
excerpt: "A great fade starts fading within a week. Here's exactly how to keep it sharp longer — and when it's time to come back in."
image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
author: "Hair Mechanics"
authorRole: "Auburn's Premier Barbershop"
authorImage: "/assets/Logo.png"
date: "April 19, 2026"
readTime: "4 min read"
tags: ["Fade", "Maintenance", "Grooming Tips"]

content (HTML string):
`
  <p class="mb-4">A clean fade looks incredible the day you leave the chair. But by day 10, the lines soften, the blend starts to blur, and the whole thing loses its edge. That's not a flaw — it's just how hair grows. The question is what you do about it.</p>

  <p class="mb-4">Here's how to extend the life of your fade and know exactly when to come back in.</p>

  <h2 class="text-2xl font-bold mt-8 mb-4 text-amber-500">How Fast Does a Fade Grow Out?</h2>
  <p class="mb-4">On average, hair grows about half an inch per month — roughly 1/8 inch per week. For a tight skin fade, you'll notice softening within 7–10 days. A mid or taper fade typically stays clean for 2–3 weeks before needing a touch-up.</p>
  <p class="mb-4">The tighter the fade, the faster it shows growth. That's the trade-off with a skin fade — it looks the sharpest, but it also needs the most maintenance.</p>

  <h2 class="text-2xl font-bold mt-8 mb-4 text-amber-500">1. Keep Your Scalp Clean</h2>
  <p class="mb-4">Dead skin, oil, and product buildup can make a fade look dull even when the length is still good. Wash your hair 2–3 times a week with a gentle shampoo. On non-wash days, rinse with water and condition the longer hair on top.</p>
  <p class="mb-4">A clean scalp also means healthier, faster-growing hair — which matters when you're trying to maintain shape.</p>

  <h2 class="text-2xl font-bold mt-8 mb-4 text-amber-500">2. Moisturize the Skin on Your Sides</h2>
  <p class="mb-4">Short faded sides expose a lot of scalp. Dry skin shows — especially under light. Apply a small amount of a light moisturizer or beard oil to the faded areas every couple of days. It keeps the skin looking healthy and makes the fade look cleaner longer.</p>

  <h2 class="text-2xl font-bold mt-8 mb-4 text-amber-500">3. Style the Top Consistently</h2>
  <p class="mb-4">The contrast between your fade and the length on top is what makes the cut look intentional. If the top gets frizzy, flat, or shapeless, the whole style suffers even if the sides are still clean.</p>
  <p class="mb-4">Use a small amount of pomade, clay, or cream (depending on your hair type) to keep the top styled. Ask your barber what product works best for your texture — they'll know exactly what to recommend.</p>

  <h2 class="text-2xl font-bold mt-8 mb-4 text-amber-500">4. Get a Line-Up Between Full Cuts</h2>
  <p class="mb-4">If you're on a 3–4 week schedule between full cuts, consider coming in at the halfway point for a line-up. A line-up cleans up your hairline, temple fade, and neckline for $20 — and it resets how sharp the whole cut looks without a full session.</p>
  <p class="mb-4">A lot of our regulars at Hair Mechanics do a full cut every 3–4 weeks and a line-up in between. It's the most cost-effective way to always look clean.</p>

  <h2 class="text-2xl font-bold mt-8 mb-4 text-amber-500">When to Come Back for a Full Cut</h2>
  <p class="mb-4">Here's a simple guide by fade type:</p>
  <ul class="list-disc pl-6 mb-6 space-y-2">
    <li><strong>Skin fade:</strong> Every 2–3 weeks for a full cut, or a line-up at week 1.5</li>
    <li><strong>Mid fade:</strong> Every 3–4 weeks</li>
    <li><strong>Taper fade:</strong> Every 4 weeks — the most low-maintenance option</li>
  </ul>
  <p class="mb-4">When the blend starts to look like two separate lengths instead of a smooth gradient, it's time to come back in.</p>

  <p class="mt-8 mb-4">Ready for a fresh cut or a quick line-up? Walk in anytime — we're open 7 days a week in Auburn, WA, until 8PM on weekdays.</p>
`

relatedPosts:
[
  { id: 3, title: "Best Walk-In Barber in Auburn, WA — Open Late 7 Days a Week", slug: "walk-in-barber-auburn-wa-open-late", image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  { id: 1, title: "Top 5 Men's Haircut Trends for 2026", slug: "top-mens-haircut-trends-2026", image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" }
]

--- PRERENDER (add to ROUTES array in prerender.mjs) ---
'/blog/how-to-maintain-a-fade',

--- SITEMAP (add to public/sitemap.xml inside the Blog comment block) ---
<url>
  <loc>https://hairmechanics.net/blog/how-to-maintain-a-fade</loc>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
</url>

After making all changes, run:
git add src/pages/Blog.tsx src/pages/BlogPost.tsx prerender.mjs public/sitemap.xml
git commit -m "content: add blog post — how to maintain a fade between cuts"
git push
```

---

## PROMPT 2 — Blog Post: Best Haircut for Your Face Shape

```
You are working in the hair-mechanics project at projects/hair-mechanics/.

Add a new blog post to the site. The blog system works like this:
- Post data lives in src/pages/BlogPost.tsx inside the `blogPostsData` object (keyed by slug)
- Post cards live in src/pages/Blog.tsx inside the `blogPosts` array
- Each new slug must be added to the ROUTES array in prerender.mjs
- Each new slug must be added to public/sitemap.xml

Add the following post. Match the exact structure of existing posts.

--- BLOG CARD (add to blogPosts array in Blog.tsx, insert FIRST in the array) ---

{
  id: 5,
  title: "How to Find the Best Haircut for Your Face Shape",
  excerpt: "Oval, square, round, oblong — your face shape is the biggest factor in choosing a flattering haircut. Here's how to figure out yours and what cut works best.",
  image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
  author: "Hair Mechanics",
  date: "April 26, 2026",
  readTime: "5 min read",
  tags: ["Style Guide", "Face Shape", "Haircuts"],
  slug: "best-haircut-for-your-face-shape"
}

--- FULL POST (add to blogPostsData in BlogPost.tsx) ---

Key: "best-haircut-for-your-face-shape"

title: "How to Find the Best Haircut for Your Face Shape"
excerpt: "Oval, square, round, oblong — your face shape is the biggest factor in choosing a flattering haircut. Here's how to figure out yours and what cut works best."
image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
author: "Hair Mechanics"
authorRole: "Auburn's Premier Barbershop"
authorImage: "/assets/Logo.png"
date: "April 26, 2026"
readTime: "5 min read"
tags: ["Style Guide", "Face Shape", "Haircuts"]

content (HTML string):
`
  <p class="mb-4">The most common mistake people make when choosing a haircut is picking one based on what looks good on someone else. The problem: their face shape isn't yours. A cut that looks incredible on a square jaw can make a round face look wider. Context matters.</p>

  <p class="mb-4">Here's how to figure out your face shape and which cuts actually work for it.</p>

  <h2 class="text-2xl font-bold mt-8 mb-4 text-amber-500">How to Identify Your Face Shape</h2>
  <p class="mb-4">Pull your hair back and stand in front of a mirror. Look at the overall outline of your face and compare it to these five shapes:</p>
  <ul class="list-disc pl-6 mb-6 space-y-3">
    <li><strong>Oval:</strong> Forehead slightly wider than the jaw, face longer than it is wide, rounded chin. The most balanced face shape.</li>
    <li><strong>Square:</strong> Strong jawline roughly as wide as the forehead, minimal tapering, angular features.</li>
    <li><strong>Round:</strong> Face is nearly as wide as it is long, soft jawline, full cheeks.</li>
    <li><strong>Oblong / Rectangle:</strong> Face is noticeably longer than it is wide, with a long straight cheek line.</li>
    <li><strong>Diamond:</strong> Narrow forehead and jaw, wide cheekbones — the widest point is the middle of the face.</li>
  </ul>

  <h2 class="text-2xl font-bold mt-8 mb-4 text-amber-500">Oval Face — The Most Versatile</h2>
  <p class="mb-4">Good news: almost any haircut works for an oval face. The proportions are naturally balanced, so you have the most freedom to experiment.</p>
  <p class="mb-4"><strong>Best cuts:</strong> Textured crop, slick back, undercut, buzz cut, quiff. Basically anything. Avoid cuts that add too much volume on top — they can elongate the face unnecessarily.</p>

  <h2 class="text-2xl font-bold mt-8 mb-4 text-amber-500">Square Face — Work With the Angles</h2>
  <p class="mb-4">A square face has strong natural structure. The goal is to complement those angles without making the jaw look too heavy.</p>
  <p class="mb-4"><strong>Best cuts:</strong> Textured quiff, faux hawk, or a fade with volume on top. Adding height draws the eye upward and balances the jaw width. Avoid cuts that are too flat on top or that end right at the jawline.</p>

  <h2 class="text-2xl font-bold mt-8 mb-4 text-amber-500">Round Face — Create Length</h2>
  <p class="mb-4">The goal with a round face is to add the illusion of length and definition where the jaw naturally softens.</p>
  <p class="mb-4"><strong>Best cuts:</strong> High fade with height on top, angular fringe, or a pompadour. These cuts elongate the face visually. Avoid styles that add width at the sides — like afros worn very wide, or cuts with no fade — which can make the face look rounder.</p>

  <h2 class="text-2xl font-bold mt-8 mb-4 text-amber-500">Oblong / Rectangle Face — Add Width</h2>
  <p class="mb-4">The opposite goal from a round face. You want to add the appearance of width, not length.</p>
  <p class="mb-4"><strong>Best cuts:</strong> Mid fade or taper fade (rather than a high fade), textured crop, or styles with volume at the sides. Avoid very long hair on top or high-volume styles that add more height — they'll stretch the face further.</p>

  <h2 class="text-2xl font-bold mt-8 mb-4 text-amber-500">Diamond Face — Balance the Forehead and Jaw</h2>
  <p class="mb-4">The wide cheekbones are your asset. The goal is to balance the narrower forehead and jaw so the cheekbones don't look oversized.</p>
  <p class="mb-4"><strong>Best cuts:</strong> Styles with a side part, textured cuts with some volume near the forehead and temples, or a low to mid fade. Avoid cuts that take all the hair off the sides — this emphasizes the cheekbone width.</p>

  <h2 class="text-2xl font-bold mt-8 mb-4 text-amber-500">Still Not Sure? Ask Your Barber.</h2>
  <p class="mb-4">Reading a guide is helpful. But nothing replaces a barber who can actually look at your face, your hair texture, and your lifestyle and recommend something that works for all three.</p>
  <p class="mb-4">At Hair Mechanics in Auburn, we do a quick consultation before every cut. Tell us what you're going for — or just say "I don't know, what do you think?" — and we'll point you in the right direction.</p>

  <p class="mt-8 mb-4">Walk in anytime, 7 days a week, open until 8PM on weekdays. 1251 A Street NE, Auburn, WA.</p>
`

relatedPosts:
[
  { id: 4, title: "How to Maintain a Fade Between Cuts", slug: "how-to-maintain-a-fade", image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  { id: 3, title: "Best Walk-In Barber in Auburn, WA — Open Late 7 Days a Week", slug: "walk-in-barber-auburn-wa-open-late", image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" }
]

--- PRERENDER (add to ROUTES array in prerender.mjs) ---
'/blog/best-haircut-for-your-face-shape',

--- SITEMAP (add to public/sitemap.xml inside the Blog comment block) ---
<url>
  <loc>https://hairmechanics.net/blog/best-haircut-for-your-face-shape</loc>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
</url>

After making all changes, run:
git add src/pages/Blog.tsx src/pages/BlogPost.tsx prerender.mjs public/sitemap.xml
git commit -m "content: add blog post — best haircut for your face shape"
git push
```

---

## PROMPT 3 — Homepage: Areas We Serve Section

```
You are working in the hair-mechanics project at projects/hair-mechanics/.

Add an "Areas We Serve" section to the homepage. This improves internal linking
from the homepage body to the area landing pages, which helps Google discover
and rank those pages faster.

--- WHERE TO ADD IT ---

In src/App.tsx, add the new section BETWEEN the <Services /> and <Reviews /> components.

--- WHAT TO BUILD ---

Create a new component file: src/components/AreasServed.tsx

The component should:
- Have a dark background (bg-dark-900) matching the site's color scheme
- Use an amber-500 heading: "Serving Auburn & Surrounding Cities"
- Have a short subheading: "Hair Mechanics is Auburn's barbershop — and the go-to spot for customers from across South King County."
- Render a 2x3 grid (sm:grid-cols-3) of city cards, each linking to its area page
- Each card: dark bg-gray-800, rounded-lg, amber-500 city name, gray-400 subtext ("Barber Shop"), hover:bg-gray-700 transition, Link to the area route

Cities and routes:
  - Auburn, WA → /auburn-barber
  - Kent, WA → /kent-barber
  - Federal Way, WA → /federal-way-barber
  - Renton, WA → /renton-barber
  - Puyallup, WA → /puyallup-barber
  - Sumner, WA → /sumner-barber

- Import Link from react-router-dom
- Add a "View All Services →" style CTA at the bottom: a Link to /auburn-barber that says "Find your nearest location →" in amber-500

--- IMPORT AND USE IN App.tsx ---

Import AreasServed and place it between <Services /> and <Reviews />:

import AreasServed from './components/AreasServed';

...

<Services />
<AreasServed />
<Reviews />

After making all changes, run:
git add src/components/AreasServed.tsx src/App.tsx
git commit -m "seo: add Areas We Serve section to homepage for internal linking"
git push
```
