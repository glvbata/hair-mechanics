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

const url = `${SITE_URL}/sumner-barber`;

const FAQ_ITEMS = [
  {
    q: 'How far is Hair Mechanics from Sumner, WA?',
    a: `About 10 minutes north via WA-167 or Stewart Road. One of the closest premium barber shops to Sumner — we see regulars from downtown Sumner, North Sumner, and Bonney Lake every week.`,
  },
  {
    q: 'Why drive to Auburn from Sumner?',
    a: `${RATING}-star Google rating, ${REVIEWS_COUNT}+ reviews, walk-ins 7 days a week, and consistent precision cuts every visit. The drive is short and worth it.`,
  },
  {
    q: 'Best route from Sumner?',
    a: 'WA-167 north is the fastest — under 10 minutes from downtown Sumner. Stewart Road also connects you quickly. Free parking right out front when you arrive.',
  },
  {
    q: 'What hours are you open?',
    a: `${HOURS.weekday}, ${HOURS.weekend}. Open until 8pm every night so it's easy to come over after work or after picking up the kids.`,
  },
  {
    q: 'Do you accept walk-ins?',
    a: "Yes — walk in 7 days a week. Or call (206) 399-9288 ahead from Sumner and we'll let you know the wait before you leave the house.",
  },
];

const RELATED = [
  { to: '/services/fade', label: 'Fade Haircuts', desc: 'Skin, mid, taper.' },
  { to: '/services/haircut', label: "Men's Haircut", desc: '$40 precision cut.' },
  { to: '/services/beard-trim', label: 'Haircut + Beard', desc: '$50 combo.' },
  { to: '/services/kids-cut', label: 'Kids Cuts', desc: '$35, ages 12 & under.' },
  { to: '/auburn-barber', label: 'Auburn, WA', desc: 'Our home shop.' },
  { to: '/puyallup-barber', label: 'Near Puyallup', desc: 'Also serving Puyallup.' },
];

const SumnerPage = () => (
  <PageLayout
    title="Barber Shop Near Sumner WA | Hair Mechanics Auburn | Fades & Cuts"
    description={`Looking for a barber near Sumner, WA? Hair Mechanics in Auburn is just 10 minutes via WA-167. Expert haircuts, fades, beard trims. Walk-ins welcome. Call ${PHONE_DISPLAY}.`}
    canonical={url}
  >
    <HeroSection
      eyebrow="Barber Shop Near Sumner, WA"
      subhead={null}
      description={
        <>
          <p>Hair Mechanics in Auburn is just a short drive north from Sumner. Precision haircuts, clean fades, beard work — walk-ins welcome 7 days a week.</p>
          <div className="mt-3 text-gray-400 text-sm flex items-center justify-center">
            <MapPin className="h-4 w-4 mr-1" /> Only 10 minutes from Sumner via WA-167
          </div>
        </>
      }
      ctaLabel={`Call Now: ${PHONE_DISPLAY}`}
    />

    {/* Drive context */}
    <section className="py-16 bg-dark-900">
      <div className="max-w-3xl mx-auto px-4 text-gray-300 leading-relaxed">
        <h2 className="text-2xl font-bold text-gold-500 mb-6 text-center">Quick Drive from Sumner</h2>
        <p className="mb-4">
          From downtown Sumner, North Sumner, or out toward Bonney Lake — we're a 10-minute trip up WA-167 or via Stewart Road. Easy stop on the way to or from Auburn for groceries, work, or errands.
        </p>
        <p className="mb-4">
          A lot of our Sumner regulars come in every 2–3 weeks for the fade and line-up routine. {REVIEWS_COUNT}+ Google reviews at {RATING} stars — walk in any day or call <a href={`tel:${PHONE_DISPLAY}`} className="text-gold-500 underline">{PHONE_DISPLAY}</a> first if you want a wait time.
        </p>
      </div>
    </section>

    <section className="py-16 bg-dark-800">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gold-500 text-center mb-10">Why Sumner Residents Choose Us</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { icon: Car, title: 'Close to Sumner', desc: `Located at ${ADDRESS.full} — quick drive via WA-167 or Stewart Rd.` },
            { icon: Star, title: `${RATING} Google Rating`, desc: `Trusted by clients from Sumner, Auburn, and the valley — ${REVIEWS_COUNT} reviews.` },
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

    <FAQ items={FAQ_ITEMS} schemaId="sumner-faq-schema" />

    <RelatedLinks heading="Explore More" links={RELATED} />

    <CTABand heading="Worth the Short Drive from Sumner" subtext="Walk in or call — open 7 days a week." />
  </PageLayout>
);

export default SumnerPage;
