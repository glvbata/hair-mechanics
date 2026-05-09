import { Phone, MapPin, Clock, Star } from 'lucide-react';
import PageLayout from '../../components/PageLayout';
import HeroSection from '../../components/HeroSection';
import CTABand from '../../components/CTABand';
import {
  ADDRESS,
  COORDS,
  HOURS,
  PHONE_DISPLAY,
  RATING,
  REVIEWS_COUNT,
  SERVICES,
  SITE_URL,
} from '../../constants/business';

const url = `${SITE_URL}/auburn-barber`;

// FAQs are also emitted as JSON-LD so they're eligible for SERP rich results.
const FAQS = [
  {
    q: 'Where is the best barber shop in Auburn, WA?',
    a: `Hair Mechanics is Auburn's top-rated barber shop, located at ${ADDRESS.full}. We're rated ${RATING}★ on Google with ${REVIEWS_COUNT}+ reviews from local clients. Walk-ins are welcome, no appointment needed.`,
  },
  {
    q: 'Do I need an appointment, or can I walk in?',
    a: `Walk-ins are always welcome at Hair Mechanics. We're open ${HOURS.weekday} on weekdays and ${HOURS.weekend} on weekends — just stop by, or call ${PHONE_DISPLAY} ahead if you want to confirm wait times.`,
  },
  {
    q: 'How much does a haircut cost in Auburn?',
    a: `Standard men's haircuts start at $${SERVICES.find((s) => s.slug === 'haircut')?.price ?? 40} at Hair Mechanics. We also offer fades, beard trims, line-ups, and kids' cuts — full pricing is listed below. No hidden fees.`,
  },
  {
    q: "What's the difference between a fade and a regular haircut?",
    a: 'A fade gradually blends hair length from short at the bottom to longer on top — low fade, mid fade, skin fade, and taper fade are common variations. A regular haircut uses scissor work to maintain a more uniform length. Hair Mechanics specializes in both.',
  },
  {
    q: 'Do you cut kids hair?',
    a: `Yes — kids' haircuts are $${SERVICES.find((s) => s.slug === 'kids-cut')?.price ?? 30}. Our barbers are patient with first-time cuts and we keep the chair experience kid-friendly.`,
  },
  {
    q: 'What areas do you serve besides Auburn?',
    a: 'We serve clients from across the South Sound — Auburn, Kent, Federal Way, Sumner, Puyallup, and Renton. Our shop is centrally located off A Street NE, just minutes from Highway 167.',
  },
];

const AuburnPage = () => (
  <PageLayout
    title="Barbershop in Auburn, WA | Haircut Near Me | Hair Mechanics"
    description={`Looking for a barbershop in Auburn, WA? Hair Mechanics is Auburn's top-rated barber shop — expert haircuts, fades, beard trims, and kids' cuts. Walk-ins welcome, open 7 days. Call ${PHONE_DISPLAY}.`}
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
    schemaId="auburn-faq-schema"
  >
    <HeroSection
      eyebrow="Barbershop in Auburn, WA"
      subhead="Haircut Near Me · Walk-Ins Welcome"
      description={`Hair Mechanics — Auburn's top-rated barber shop for expert haircuts, clean fades, and beard trims. ${RATING}★ on Google with ${REVIEWS_COUNT}+ local reviews. Open 7 days, walk-ins welcome.`}
      ctaLabel={`Call Now: ${PHONE_DISPLAY}`}
    />

    {/* Long-form intro — gives Google enough body copy to rank the page on
        local-intent queries (was previously thin and ranked pos 13–15). */}
    <section className="py-16 bg-dark-800">
      <div className="max-w-3xl mx-auto px-4 prose prose-invert prose-lg max-w-none prose-headings:text-gold-500 prose-a:text-gold-400">
        <h2>The Top Barber Shop in Auburn, Washington</h2>
        <p>
          When Auburn locals search for a <strong>haircut near me</strong>, they end up at Hair Mechanics. We're a full-service barbershop on {ADDRESS.street} in central Auburn, WA — close to Highway 167, the Auburn Outlet, and Green River College. Whether you walked over from your apartment or drove in from Kent, Federal Way, Sumner, or Puyallup, you'll find expert barbers, fair pricing, and no appointment hassle.
        </p>
        <p>
          We specialize in <strong>men's haircuts, fades, beard trims, line-ups, and kids' cuts</strong>. Our barbers know how to handle every hair type — straight, curly, coarse, fine — and we take pride in cutting hair for Auburn's diverse community, including Filipino, Hispanic, Asian, and Black clients who've told us we're the only shop in the area that gets their texture right the first time.
        </p>
        <h2>Why Auburn Chooses Hair Mechanics</h2>
        <p>
          We're not the cheapest <strong>barbershop in Auburn, WA</strong> — and that's by design. A clean fade or a properly tapered beard takes time, the right tools, and a barber who's actually been cutting for years. Our $40 standard haircut includes a thorough consult, a precision cut, neckline cleanup, and styling — not a quick clipper run. Show us a photo of what you want; we'll tell you honestly if it'll work with your hair, and what'll look better if it won't.
        </p>
        <p>
          Walk-ins are always welcome. We're open {HOURS.weekday} on weekdays and {HOURS.weekend} on weekends — including Sundays, when most Auburn barbers are closed. Free parking out front, no waiting-room awkwardness, and barbers who'll actually have a conversation with you.
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
        <p className="text-center text-gray-400 text-sm mt-8 max-w-2xl mx-auto">
          Prices include consult, cut, and styling. Add a beard trim or line-up to any haircut for a full grooming session.
        </p>
      </div>
    </section>

    <section className="py-16 bg-dark-800">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gold-500 text-center mb-10">Why Auburn Chooses Hair Mechanics</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { icon: Star, title: `${RATING} Google Rating`, desc: `Consistently top-rated by Auburn locals — ${REVIEWS_COUNT}+ reviews.` },
            { icon: Clock, title: 'Open 7 Days', desc: `${HOURS.weekday}, ${HOURS.weekend}.` },
            { icon: MapPin, title: 'Central Auburn Location', desc: `${ADDRESS.full} — free parking.` },
            { icon: Phone, title: 'Walk-ins Welcome', desc: 'No appointment needed. Call or just stop by.' },
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

    {/* FAQ block — also emitted as FAQPage JSON-LD above for rich SERP results. */}
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

    <section className="py-12 bg-dark-800">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gold-500 text-center mb-8">Find Us in Auburn</h2>
        <div className="rounded-lg overflow-hidden h-64 sm:h-80">
          <iframe
            title="Hair Mechanics Auburn Location"
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2706.5!2d${COORDS.lng}!3d${COORDS.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5490597faf9a7db9%3A0x2b1b86ed4f8db0cd!2sHair%20Mechanics%20LLC!5e0!3m2!1sen!2sus!4v1`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <p className="text-center text-gray-400 text-sm mt-6">
          {ADDRESS.full} · Just off Highway 167 · Free parking
        </p>
      </div>
    </section>

    <CTABand heading="Auburn's Favorite Barber Shop" subtext="Walk in or call — we're ready for you." />
  </PageLayout>
);

export default AuburnPage;
