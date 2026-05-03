import PageLayout from '../../components/PageLayout';
import ServiceSchema from '../../components/ServiceSchema';
import HeroSection from '../../components/HeroSection';
import CTABand from '../../components/CTABand';
import FAQ from '../../components/FAQ';
import RelatedLinks from '../../components/RelatedLinks';
import { PHONE_DISPLAY, RATING, SITE_URL, getService } from '../../constants/business';

const svc = getService('beard-trim')!;
const url = `${SITE_URL}/services/beard-trim`;

const FAQ_ITEMS = [
  {
    q: 'How much is a haircut and beard combo?',
    a: `The Haircut + Beard combo is $${svc.price} — a full precision cut plus beard shaping, line-up, and clean finish.`,
  },
  {
    q: 'Do you do beard trims without a haircut?',
    a: "Our standard beard service is included with the combo. If you only need beard work, give us a call at (206) 399-9288 and we'll let you know what's available that day.",
  },
  {
    q: 'How often should I get my beard shaped up?',
    a: 'Most clients come in every 2–4 weeks for a clean shape. Anything longer and the lines start to drift, even with at-home maintenance.',
  },
  {
    q: 'Can you shape a long beard?',
    a: 'Yes. Whether you want a clean short beard, a structured medium beard, or shape on a long beard, we work with what you have and what you want.',
  },
  {
    q: 'Do you do hot towel finishes?',
    a: 'Yes — the combo includes a clean finishing process with hot towel work to soften the skin and close the experience right.',
  },
];

const RELATED = [
  { to: '/services/haircut', label: "Men's Haircut", desc: 'Just the cut — $40.' },
  { to: '/services/fade', label: 'Fade + Beard', desc: 'Pair a clean fade with a shaped beard.' },
  { to: '/services/line-up', label: 'Line Up', desc: '$20 mid-cycle touch-up.' },
  { to: '/blog/complete-guide-to-beard-maintenance', label: 'Beard Care Guide', desc: 'Daily routine and pro tips.' },
  { to: '/auburn-barber', label: 'Auburn, WA', desc: 'Where to find us.' },
  { to: '/gallery', label: 'Beard Work Gallery', desc: 'See cuts and beard combos.' },
];

const BeardTrimPage = () => (
  <PageLayout
    title={`Beard Trim & Shaping Auburn WA | Haircut + Beard $${svc.price} | Hair Mechanics`}
    description={`Professional beard trims and shaping at Hair Mechanics in Auburn, WA. Clean lines, hot towel finish. Haircut & beard combo $${svc.price}. Call ${PHONE_DISPLAY}.`}
    canonical={url}
  >
    <ServiceSchema
      name="Beard Trim & Shaping"
      description="Professional beard trim and shaping included with haircut and beard combo service."
      price={svc.price.toFixed(2)}
      url={url}
    />
    <HeroSection
      eyebrow="Beard Trim & Shaping"
      description={`Clean beard lines, precise shaping, and grooming — paired with a fresh cut for the complete look. $${svc.price}.`}
      ctaLabel={`Book Now: ${PHONE_DISPLAY}`}
    />

    <section className="py-16 bg-dark-900">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gold-500 text-center mb-10">What's Included</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { name: 'Haircut & Beard Combo', price: `$${svc.price}`, desc: 'Full haircut plus beard trim, shaping, and line up.' },
            { name: 'Beard Shape & Detail', price: 'Included', desc: 'Cheek line, neckline, and clean detailing for the full beard look.' },
          ].map((s, i) => (
            <div key={i} className="bg-gray-800 p-6 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold">{s.name}</h3>
                <span className="text-gold-500 font-bold">{s.price}</span>
              </div>
              <p className="text-gray-400 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Beard styles */}
    <section className="py-16 bg-dark-800">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gold-500 text-center mb-10">Beard Styles We Shape</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { name: 'Short Beard / Stubble', desc: 'Clean, low-maintenance, professional.' },
            { name: 'Medium Beard', desc: 'Defined cheek line and neckline with structured shape.' },
            { name: 'Full Beard', desc: 'Sculpted with intention — length kept, lines defined.' },
            { name: 'Goatee / Van Dyke', desc: 'Detailed shaping for the focused chin look.' },
            { name: 'Beard + Mustache Combo', desc: 'Balanced trim across the whole face.' },
            { name: 'Cleanup Only', desc: 'Keep your length, just sharpen the edges.' },
          ].map((s) => (
            <div key={s.name} className="bg-gray-800 p-5 rounded-lg">
              <h3 className="font-bold text-white mb-1">{s.name}</h3>
              <p className="text-gray-400 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-12 bg-dark-900">
      <div className="max-w-3xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { label: 'Years Experience', value: '5+' },
            { label: 'Google Rating', value: `${RATING} ★` },
            { label: 'Walk-ins Welcome', value: '✓' },
            { label: 'Open 7 Days', value: '✓' },
          ].map((s, i) => (
            <div key={i}>
              <p className="text-2xl font-bold text-gold-500">{s.value}</p>
              <p className="text-sm text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <FAQ items={FAQ_ITEMS} schemaId="beard-faq-schema" />

    <RelatedLinks links={RELATED} />

    <CTABand heading="Get the Full Package" subtext="Haircut + beard trim combo — walk in or call today." />
  </PageLayout>
);

export default BeardTrimPage;
