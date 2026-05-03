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

const url = `${SITE_URL}/kent-barber`;

const FAQ_ITEMS = [
  {
    q: 'How far is Hair Mechanics from Kent, WA?',
    a: `About 10 minutes south of Kent. Take WA-167 south to the Auburn exit, then a short drive to ${ADDRESS.full}. Easy stop on the way home from work.`,
  },
  {
    q: 'Why drive to Auburn for a haircut when there are barbers in Kent?',
    a: `Hair Mechanics has a ${RATING}-star Google rating across ${REVIEWS_COUNT}+ reviews — clients drive in from Kent because the cut is worth it. Walk-ins welcome, open 7 days, until 8pm every night.`,
  },
  {
    q: 'What neighborhoods do you serve from Kent?',
    a: 'We see regulars from East Hill, West Hill, Panther Lake, Meridian, and downtown Kent. Easy drive from anywhere on the south side of Kent.',
  },
  {
    q: 'Do I need to book ahead coming from Kent?',
    a: "Walk-ins are always welcome. If you want to make sure you don't wait, call (206) 399-9288 before you head out and we can give you a real-time wait estimate.",
  },
  {
    q: 'How much is a haircut?',
    a: 'A precision cut is $40, fades are $40, haircut + beard combo is $50, kids cuts (12 & under) are $35, and a quick line-up is $20.',
  },
];

const RELATED = [
  { to: '/services/haircut', label: "Men's Haircut", desc: '$40 precision cut.' },
  { to: '/services/fade', label: 'Fade Haircuts', desc: 'Skin, mid, taper.' },
  { to: '/services/beard-trim', label: 'Haircut + Beard', desc: '$50 combo.' },
  { to: '/auburn-barber', label: 'Auburn, WA', desc: 'Our home shop.' },
  { to: '/federal-way-barber', label: 'Federal Way', desc: 'Also serving Federal Way.' },
  { to: '/renton-barber', label: 'Renton', desc: 'Quick drive from Renton too.' },
];

const KentPage = () => (
  <PageLayout
    title="Barber Shop Near Kent WA | Hair Mechanics Auburn | Haircuts & Fades"
    description={`Looking for a barber shop near Kent, WA? Hair Mechanics in Auburn is just minutes south via WA-167. Expert haircuts, fades, beard trims. Walk-ins welcome. Call ${PHONE_DISPLAY}.`}
    canonical={url}
  >
    <HeroSection
      eyebrow="Barber Shop Near Kent, WA"
      subhead={null}
      description={
        <>
          <p>Hair Mechanics in Auburn is just a short drive south from Kent — clean fades, precision haircuts, and beard work. Walk-ins welcome 7 days a week.</p>
          <div className="mt-3 text-gray-400 text-sm flex items-center justify-center">
            <MapPin className="h-4 w-4 mr-1" /> About 10 minutes from Kent via WA-167
          </div>
        </>
      }
      ctaLabel={`Call Now: ${PHONE_DISPLAY}`}
    />

    {/* Drive directions */}
    <section className="py-16 bg-dark-900">
      <div className="max-w-3xl mx-auto px-4 text-gray-300 leading-relaxed">
        <h2 className="text-2xl font-bold text-gold-500 mb-6 text-center">Easy Drive from Anywhere in Kent</h2>
        <p className="mb-4">
          Whether you're coming from East Hill, West Hill, Panther Lake, downtown Kent, or anywhere along Kent-Des Moines Road — we're a quick trip down WA-167. Take the Auburn exit, head east to A Street NE, and you'll spot us right away. Free parking out front.
        </p>
        <p className="mb-4">
          Our regulars from Kent come for one reason: the cut. We've earned a {RATING}-star Google rating from {REVIEWS_COUNT}+ clients, many of them driving down from the ShoWare Center area, Kent Station, and Meridian. Worth the 10 minutes.
        </p>
      </div>
    </section>

    <section className="py-16 bg-dark-800">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gold-500 text-center mb-10">Why Kent Residents Choose Hair Mechanics</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { icon: Car, title: '10 Minutes from Kent', desc: `Located at ${ADDRESS.full} — quick drive via WA-167 or city streets.` },
            { icon: Star, title: `${RATING} Google Rating`, desc: `Top-rated by clients from Kent, Auburn, and surrounding areas — ${REVIEWS_COUNT} reviews.` },
            { icon: Clock, title: 'Open 7 Days, Until 8pm', desc: `${HOURS.weekday}, ${HOURS.weekend}. Easy stop after work.` },
            { icon: Phone, title: 'Walk In or Call Ahead', desc: 'No appointment needed — or call (206) 399-9288 for a wait estimate.' },
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

    <FAQ items={FAQ_ITEMS} schemaId="kent-faq-schema" />

    <RelatedLinks heading="Explore More" links={RELATED} />

    <CTABand heading="Worth the Short Drive from Kent" subtext="Walk in or call — open 7 days a week." />
  </PageLayout>
);

export default KentPage;
