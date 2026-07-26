/**
 * Single source of truth for Hair Mechanics business details.
 *
 * Any NAP (Name/Address/Phone) or pricing change goes here first — consumers
 * import from this module. Keeps structured data, analytics, SEO, and UI in
 * sync and prevents the "changed phone in 12 places" bug class.
 */

export const BUSINESS_NAME = 'Hair Mechanics';
export const BUSINESS_LEGAL_NAME = 'Hair Mechanics LLC';

// Phone — `PHONE_TEL` for tel:/sms: href, `PHONE_DISPLAY` for UI copy.
export const PHONE_TEL = '+1-206-399-9288';
export const PHONE_SMS = '+12063999288';
export const PHONE_DISPLAY = '(206) 399-9288';

export const EMAIL = 'Hairmechanicsllc@yahoo.com';

export const ADDRESS = {
  street: '1251 A Street NE',
  city: 'Auburn',
  region: 'WA',
  postal: '98002',
  country: 'US',
  full: '1251 A Street NE, Auburn, WA 98002',
} as const;

export const HOURS = {
  weekday: 'Mon–Fri 10am–8pm',
  weekend: 'Sat–Sun 8am–8pm',
  weekdayOpen: '10:00',
  weekendOpen: '08:00',
  close: '20:00',
} as const;

// Google Business ratings — update quarterly from Google profile.
export const RATING = 4.5;
export const REVIEWS_COUNT = 83;

export const COORDS = { lat: 47.3190759, lng: -122.2289829 } as const;

/**
 * Cities the shop draws from — mirrors the six /{city}-barber area pages.
 * Feeds `areaServed` in structured data. Keep in sync with the routes.
 */
export const AREAS_SERVED = [
  'Auburn',
  'Kent',
  'Federal Way',
  'Sumner',
  'Puyallup',
  'Renton',
] as const;

export const SITE_URL = 'https://hairmechanics.net';
export const HERO_IMAGE = `${SITE_URL}/assets/HeroImage.jpg`;

/**
 * Stable JSON-LD node ids.
 *
 * Every schema block on the site points at these instead of re-declaring the
 * business inline. One consolidated entity is what search engines and LLM
 * answer engines resolve against — several disconnected BarberShop nodes
 * describing the same shop dilute it and can be read as separate businesses.
 *
 * BUSINESS_ID is declared in index.html (the head template shared by every
 * prerendered page), so referencing it from any page is always resolvable.
 */
export const BUSINESS_ID = `${SITE_URL}/#business`;
export const BARBER_IDS = {
  glen: `${SITE_URL}/barber#person`,
  akshat: `${SITE_URL}/barber/akshat#person`,
} as const;

export const SOCIAL = {
  instagram: 'https://www.instagram.com/hairmechanics1997',
  facebook: 'https://www.facebook.com/hairmechanics1997',
  tiktok: 'https://www.tiktok.com/@glencelestial',
  google: 'https://www.google.com/maps/place/Hair+Mechanics+LLC',
  review: 'https://g.page/r/Cc2wjU_thhsrEAI/review',
  directions:
    'https://www.google.com/maps/dir/?api=1&destination=1251+A+Street+NE+Auburn+WA+98002',
} as const;

// Google Ads conversion — consumed by analytics.handleCall().
export const ADS_CONVERSION = 'AW-17956338356/ONVqCLjl6IgcELT1n_JC';

export interface Service {
  slug: string;
  name: string;
  price: number;
  description: string;
}

export const SERVICES: readonly Service[] = [
  { slug: 'haircut', name: 'Haircut', price: 40, description: 'Precision haircut tailored to your style with consultation and finishing.' },
  { slug: 'beard-trim', name: 'Haircut & Beard', price: 50, description: 'Complete grooming — haircut plus professional beard shape and trim.' },
  { slug: 'kids-cut', name: 'Kids Cut', price: 35, description: 'Patient, friendly cuts for ages 12 and under.' },
  { slug: 'line-up', name: 'Line Up / Trim', price: 20, description: 'Quick touch-up between cuts — clean hairline, neck trim, light styling.' },
  { slug: 'fade', name: 'Fade', price: 40, description: 'Skin, mid, and taper fades with precision blending.' },
] as const;

export const getService = (slug: string): Service | undefined =>
  SERVICES.find((s) => s.slug === slug);

export const REVIEWS = [
  {
    author: 'Ricky M.',
    rating: 5,
    text: 'Best barber in Auburn. Glen takes his time and the cut is always sharp. Been coming here for years.',
  },
  {
    author: 'Khon Meckdara',
    rating: 5,
    text: 'Great spot. Clean shop, friendly barbers, solid fade every time. Highly recommend.',
  },
] as const;
