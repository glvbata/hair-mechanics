import { Phone, MapPin, Clock, Star } from 'lucide-react';
import PageLayout from '../../components/PageLayout';
import HeroSection from '../../components/HeroSection';
import CTABand from '../../components/CTABand';
import FAQ from '../../components/FAQ';
import RelatedLinks from '../../components/RelatedLinks';
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

const FAQ_ITEMS = [
  {
    q: "Where's the best barber shop in Auburn, WA?",
    a: `Hair Mechanics at ${ADDRESS.full} is one of Auburn's top-rated barber shops with a ${RATING}-star Google rating across ${REVIEWS_COUNT}+ reviews. Walk-ins welcome, open 7 days a week, expert barbers for every cut.`,
  },
  {
    q: 'What hours are you open in Auburn?',
    a: `${HOURS.weekday}, ${HOURS.weekend}. We stay open until 8pm every night so you can come in after work.`,
  },
  {
    q: 'Do you take walk-ins or do I need to book?',
    a: 'Walk-ins are welcome 7 days a week. If you want to lock in a specific time or barber, just call (206) 399-9288.',
  },
  {
    q: "What parts of Auburn do you serve?",
    a: 'We see clients from all over Auburn — Lea Hill, Lakeland Hills, West Hill, downtown — plus the surrounding areas like Kent, Federal Way, Renton, Sumner, and Puyallup.',
  },
  {
    q: 'Is parking easy at the Auburn shop?',
    a: 'Yes — free parking right out front of the shop on A Street NE.',
  },
];

const RELATED = [
  { to: '/services/haircut', label: "Men's Haircut", desc: '$40 precision cut.' },
  { to: '/services/fade', label: 'Fade Haircuts', desc: 'Skin, mid, taper fades.' },
  { to: '/services/beard-trim', label: 'Haircut + Beard', desc: '$50 combo.' },
  { to: '/services/kids-cut', label: 'Kids Cuts', desc: '$35, ages 12 & under.' },
  { to: '/services/line-up', label: 'Line Up', desc: '$20 quick reset.' },
  { to: '/gallery', label: '76+ Cut Gallery', desc: 'Real work from our chairs.' },
];

const AuburnPage = () => (
  <PageLayout
    title="Barber Shop in Auburn WA | Hair Mechanics | Haircuts, Fades & Beard Trims"
    description={`Hair Mechanics is Auburn's top-rated barber shop. Expert haircuts, fades, beard trims for men, women & kids. Walk-ins welcome, open 7 days. Call ${PHONE_DISPLAY}.`}
    canonical={url}
  >
    <HeroSection
      eyebrow="Auburn's Top-Rated"
      subhead="Barber Shop"
      description={`Hair Mechanics — expert haircuts, clean fades, and beard trims right here in ${ADDRESS.city}, ${ADDRESS.region}. Walk-ins welcome, open 7 days.`}
      ctaLabel={`Call Now: ${PHONE_DISPLAY}`}
    />

    {/* Local context */}
    <section className="py-16 bg-dark-900">
      <div className="max-w-3xl mx-auto px-4 text-gray-300 leading-relaxed">
        <h2 className="text-2xl font-bold text-gold-500 mb-6 text-center">Auburn's Local Barber Shop</h2>
        <p className="mb-4">
          Hair Mechanics has been cutting hair in Auburn for years — building a reputation across Lea Hill, Lakeland Hills, West Hill, and downtown for one thing: a sharp, precise cut every time. We're a short drive from the Outlet Collection, Emerald Downs, Auburn High School, and Green River College.
        </p>
        <p className="mb-4">
          Our barbers cut every style — modern fades, scissor cuts, kids' cuts, beard work, line-ups. Walk in any day, or call ahead at <a href={`tel:${PHONE_DISPLAY}`} className="text-gold-500 underline">{PHONE_DISPLAY}</a> to lock in a time. We stay open until 8pm every single day so you can come straight from work.
        </p>
      </div>
    </section>

    <section className="py-16 bg-dark-800">
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

    <section className="py-16 bg-dark-900">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gold-500 text-center mb-10">Why Auburn Chooses Hair Mechanics</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { icon: Star, title: `${RATING} Google Rating`, desc: `Consistently top-rated by Auburn locals — ${REVIEWS_COUNT} reviews.` },
            { icon: Clock, title: 'Open 7 Days', desc: `${HOURS.weekday}, ${HOURS.weekend}.` },
            { icon: MapPin, title: 'Central Auburn Location', desc: `${ADDRESS.full} — free parking right out front.` },
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
      </div>
    </section>

    <FAQ items={FAQ_ITEMS} schemaId="auburn-faq-schema" />

    <RelatedLinks heading="Services & Photos" links={RELATED} />

    <CTABand heading="Auburn's Favorite Barber Shop" subtext="Walk in or call — we're ready for you." />
  </PageLayout>
);

export default AuburnPage;
