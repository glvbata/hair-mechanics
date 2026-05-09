import { Phone, MapPin, Clock, Star } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import HeroSection from '../components/HeroSection';
import CTABand from '../components/CTABand';
import {
  ADDRESS,
  HOURS,
  PHONE_DISPLAY,
  RATING,
  REVIEWS_COUNT,
  SERVICES,
  SITE_URL,
} from '../constants/business';

const url = `${SITE_URL}/filipino-barber-auburn`;

// GSC ranks Hair Mechanics #1 on every "filipino barber" query but gets near-zero
// impressions because there's no landing page to surface in search. This page
// claims that niche permanently — natural keyword copy, FAQ schema, walk-in CTA.
const FAQS = [
  {
    q: 'Where can I find a Filipino barber in Auburn, WA?',
    a: `Hair Mechanics in Auburn, WA cuts Filipino hair every day. We're at ${ADDRESS.full} — central Auburn, free parking, walk-ins welcome. Filipino clients drive from across the South Sound (Federal Way, Kent, SeaTac, Tacoma) because we get the cut right the first time.`,
  },
  {
    q: 'Do you understand Filipino hair texture?',
    a: 'Yes. Filipino hair is typically thick, straight to slightly wavy, with strong growth patterns and cowlicks at the crown. We know how to taper it without leaving "shelves," how to fade into thick hair without lines, and how to cut around stubborn growth patterns instead of fighting them. We use sharp tools and take the time the cut needs.',
  },
  {
    q: 'What styles do Filipino clients usually request?',
    a: 'Most popular: low and mid taper fades with longer length on top, classic side parts, two-block / undercut combos, modern pompadours, and the textured-fringe styles common in Manila and Cebu salons. Bring a reference photo — we cut from photos every day.',
  },
  {
    q: 'Do you have Filipino-speaking staff?',
    a: "We can't always guarantee a Tagalog-speaking barber on shift, but our team is comfortable with the language gap — we'll talk through the cut clearly, show you the length on a comb, and check in often. Many of our regulars are Filipino and they tell us the consult feels easy.",
  },
  {
    q: 'How much does a haircut cost?',
    a: `Standard men's haircuts are $${SERVICES.find((s) => s.slug === 'haircut')?.price ?? 40}. Add a beard trim or line-up for the combo. Kids' cuts are $${SERVICES.find((s) => s.slug === 'kids-cut')?.price ?? 30}. Same pricing for everyone — no surprise upcharges.`,
  },
  {
    q: 'Do I need an appointment?',
    a: `No — walk-ins are always welcome. We're open ${HOURS.weekday} on weekdays and ${HOURS.weekend} on weekends, including Sundays. Call ${PHONE_DISPLAY} ahead if you want to confirm wait times.`,
  },
];

const FilipinoBarberPage = () => (
  <PageLayout
    title="Filipino Barber in Auburn, WA | Hair Mechanics"
    description={`Looking for a Filipino barber in Auburn, WA? Hair Mechanics cuts Filipino hair every day — taper fades, side parts, modern styles. Walk-ins welcome. ${RATING}★ on Google. Call ${PHONE_DISPLAY}.`}
    canonical={url}
    schema={{
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQS.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    }}
    schemaId="filipino-barber-faq-schema"
  >
    <HeroSection
      eyebrow="Filipino Barber in Auburn, WA"
      subhead="Cuts that get Filipino hair right"
      description={`Hair Mechanics — Auburn's go-to barbershop for Filipino clients. Taper fades, side parts, modern styles. Walk-ins welcome, open 7 days. ${RATING}★ on Google with ${REVIEWS_COUNT}+ reviews.`}
      ctaLabel={`Call Now: ${PHONE_DISPLAY}`}
    />

    <section className="py-16 bg-dark-800">
      <div className="max-w-3xl mx-auto px-4 prose prose-invert prose-lg max-w-none prose-headings:text-gold-500 prose-a:text-gold-400">
        <h2>A Barber Who Gets Filipino Hair</h2>
        <p>
          Filipino hair is its own thing. It's typically thick, straight or with a slight wave, dense at the crown, with cowlicks and growth patterns that punish anyone who tries to fight them. A lot of barbers don't deal with that hair often enough to know the moves — they leave shelves on the taper, push the fade too high, or end up with one side longer because they cut against the grain.
        </p>
        <p>
          At <strong>Hair Mechanics in {ADDRESS.city}, {ADDRESS.region}</strong>, we cut Filipino hair every day. That experience shows up in the small things: clipper-over-comb work that respects the hairline, a fade that blends into thickness without visible lines, and patience with the cowlicks instead of forcing them flat. Show us a reference photo — we cut from photos every day.
        </p>
        <h2>Styles We Cut Every Week</h2>
        <p>
          Low and mid <strong>taper fades</strong> with longer length on top. Classic side parts and pompadours. Two-block undercuts inspired by what's running in Manila and Cebu salons right now. Textured fringes. Crew cuts done right. Whatever you saw on a cousin in the Philippines or on a Filipino actor's Instagram — bring the photo, we'll get you there.
        </p>
        <h2>The Filipino Community in Auburn</h2>
        <p>
          The Auburn / Kent / Federal Way corridor has one of the largest Filipino communities in Washington State. We've earned regulars who drive in from SeaTac, Tacoma, Renton, and even Tukwila because finding a barber who actually understands the texture is rarer than it should be. Half our reviews mention being treated well — that part matters more than the cut, sometimes.
        </p>
        <h2>Walk-Ins Welcome — Open 7 Days</h2>
        <p>
          We're at <strong>{ADDRESS.full}</strong>, just off Highway 167 in central Auburn. Free parking. Open {HOURS.weekday} on weekdays and {HOURS.weekend} on weekends, including Sundays. Walk in or call <strong>{PHONE_DISPLAY}</strong>.
        </p>
      </div>
    </section>

    <section className="py-16 bg-dark-900">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gold-500 text-center mb-10">Services & Pricing</h2>
        <div className="space-y-3 max-w-lg mx-auto">
          {SERVICES.map((s) => (
            <div key={s.slug} className="flex justify-between items-center bg-gray-800 px-5 py-4 rounded-lg">
              <span className="font-medium">{s.name}</span>
              <span className="text-gold-500 font-bold text-lg">${s.price}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-16 bg-dark-800">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gold-500 text-center mb-10">Why Filipino Clients Choose Hair Mechanics</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { icon: Star, title: `${RATING} Google Rating`, desc: `${REVIEWS_COUNT}+ reviews — many from Filipino regulars.` },
            { icon: Clock, title: 'Open 7 Days', desc: `${HOURS.weekday}, ${HOURS.weekend}.` },
            { icon: MapPin, title: 'Central Auburn', desc: `${ADDRESS.full} — easy to reach from Kent, Federal Way, Tacoma, SeaTac.` },
            { icon: Phone, title: 'Walk-Ins Welcome', desc: 'No appointment. Bring a photo. Get the cut you want.' },
          ].map((item, i) => (
            <div key={i} className="bg-gray-800 p-6 rounded-lg flex items-start">
              <item.icon className="h-6 w-6 text-gold-500 mr-4 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-bold mb-1">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* FAQ — also emitted as FAQPage JSON-LD via PageLayout.schema. */}
    <section className="py-16 bg-dark-900">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gold-500 text-center mb-10">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {FAQS.map(({ q, a }, i) => (
            <details key={i} className="bg-gray-800 rounded-lg p-5 group">
              <summary className="font-semibold text-white cursor-pointer list-none flex justify-between items-center">
                {q}
                <span className="text-gold-500 text-xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="text-gray-300 mt-3 leading-relaxed">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>

    <CTABand heading="Filipino Barber in Auburn — Walk In Any Day" subtext="Bring a photo. We'll cut you right." />
  </PageLayout>
);

export default FilipinoBarberPage;
