import { MapPin, Clock, Phone, Star, Car } from 'lucide-react';
import PageLayout from '../../components/PageLayout';
import HeroSection from '../../components/HeroSection';
import CTABand from '../../components/CTABand';
import FAQ from '../../components/FAQ';
import RelatedLinks from '../../components/RelatedLinks';
import {
  ADDRESS,
  HOURS,
  PHONE_DISPLAY,
  RATING,
  REVIEWS_COUNT,
  SERVICES,
  SITE_URL,
} from '../../constants/business';

const url = `${SITE_URL}/federal-way-barber`;

const FAQ_ITEMS = [
  {
    q: 'How far is Hair Mechanics from Federal Way, WA?',
    a: `About 15 minutes east via WA-18. Easy trip from anywhere in Federal Way — Twin Lakes, Mirror Lake, Star Lake, downtown — straight to ${ADDRESS.full}.`,
  },
  {
    q: 'Why drive to Auburn from Federal Way for a haircut?',
    a: `Federal Way clients have been driving in for years because the cut is consistent. ${RATING}-star Google rating, ${REVIEWS_COUNT}+ reviews, walk-ins welcome 7 days, open until 8pm every night.`,
  },
  {
    q: 'What route do you recommend from Federal Way?',
    a: 'WA-18 east is the fastest — about 15 minutes. From south Federal Way, I-5 to WA-18 also works. Both have free parking right out front when you arrive.',
  },
  {
    q: 'Do you take walk-ins or only appointments?',
    a: 'Walk-ins are welcome any day, anytime during open hours. Call (206) 399-9288 if you want a wait estimate before you head over from Federal Way.',
  },
  {
    q: 'What services do you offer?',
    a: 'Precision haircuts ($40), fades ($40), haircut + beard combo ($50), kids cuts ages 12 & under ($35), and quick line-ups ($20). All hair types and styles.',
  },
];

const RELATED = [
  { to: '/services/fade', label: 'Fade Haircuts', desc: 'Skin, mid, taper fades.' },
  { to: '/services/haircut', label: "Men's Haircut", desc: '$40 precision cut.' },
  { to: '/services/beard-trim', label: 'Haircut + Beard', desc: '$50 combo.' },
  { to: '/auburn-barber', label: 'Auburn, WA', desc: 'Our home location.' },
  { to: '/kent-barber', label: 'Near Kent', desc: 'Also serving Kent.' },
  { to: '/gallery', label: 'See Our Work', desc: '76+ real cuts.' },
];

const FederalWayPage = () => (
  <PageLayout
    title="Barber Shop Near Federal Way WA | Hair Mechanics Auburn | Fades & Cuts"
    description={`Looking for a barber near Federal Way, WA? Hair Mechanics in Auburn is 15 minutes via WA-18. Expert haircuts, fades, beard trims. Walk-ins welcome. Call ${PHONE_DISPLAY}.`}
    canonical={url}
  >
    <HeroSection
      eyebrow="Barber Shop Near Federal Way"
      subhead={null}
      description={
        <>
          <p>Hair Mechanics in Auburn is a quick trip from Federal Way — precision haircuts, clean fades, and beard work that's worth the drive. Walk-ins welcome.</p>
          <div className="mt-3 text-gray-400 text-sm flex items-center justify-center">
            <MapPin className="h-4 w-4 mr-1" /> ~15 minutes from Federal Way via WA-18
          </div>
        </>
      }
      ctaLabel={`Call Now: ${PHONE_DISPLAY}`}
    />

    {/* Drive context */}
    <section className="py-16 bg-dark-900">
      <div className="max-w-3xl mx-auto px-4 text-gray-300 leading-relaxed">
        <h2 className="text-2xl font-bold text-gold-500 mb-6 text-center">Quick Drive from Federal Way</h2>
        <p className="mb-4">
          Whether you're coming from Twin Lakes, Mirror Lake, Star Lake, the Commons area, or downtown Federal Way — we're a straight 15-minute shot east on WA-18. Take the Auburn exit and you're three minutes from the chair.
        </p>
        <p className="mb-4">
          A lot of our Federal Way regulars drove in once for a fade and never went back to a closer shop. {REVIEWS_COUNT}+ Google reviews and a {RATING}-star average tell that story. Walk in any time we're open, or call ahead at <a href={`tel:${PHONE_DISPLAY}`} className="text-gold-500 underline">{PHONE_DISPLAY}</a>.
        </p>
      </div>
    </section>

    <section className="py-16 bg-dark-800">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gold-500 text-center mb-10">Why Federal Way Clients Choose Us</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { icon: Car, title: 'Easy Drive from Federal Way', desc: `Located at ${ADDRESS.full} — quick trip via WA-18 or I-5.` },
            { icon: Star, title: `${RATING} Google Rating`, desc: `Clients from Federal Way, Auburn, and beyond trust our work — ${REVIEWS_COUNT} reviews.` },
            { icon: Clock, title: 'Open 7 Days, Until 8pm', desc: `${HOURS.weekday}, ${HOURS.weekend}.` },
            { icon: Phone, title: 'Walk-ins Welcome', desc: 'No appointment needed — call, text, or just show up.' },
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

    <section className="py-16 bg-dark-900">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gold-500 text-center mb-8">Services & Pricing</h2>
        <div className="space-y-3">
          {SERVICES.map((s) => (
            <div key={s.slug} className="flex justify-between items-center bg-gray-800 px-5 py-4 rounded-lg">
              <span className="font-medium">{s.name}</span>
              <span className="text-gold-500 font-bold text-lg">${s.price}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    <FAQ items={FAQ_ITEMS} schemaId="federalway-faq-schema" />

    <RelatedLinks heading="Explore More" links={RELATED} />

    <CTABand heading="Worth the Drive from Federal Way" subtext="Walk in or call — open 7 days a week." />
  </PageLayout>
);

export default FederalWayPage;
