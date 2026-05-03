import { Phone } from 'lucide-react';
import PageLayout from '../../components/PageLayout';
import ServiceSchema from '../../components/ServiceSchema';
import HeroSection from '../../components/HeroSection';
import CTABand from '../../components/CTABand';
import FAQ from '../../components/FAQ';
import RelatedLinks from '../../components/RelatedLinks';
import { handleCall } from '../../utils/analytics';
import { PHONE_DISPLAY, RATING, SITE_URL, getService } from '../../constants/business';

const svc = getService('fade')!;
const url = `${SITE_URL}/services/fade`;

const FAQ_ITEMS = [
  {
    q: 'How much does a fade haircut cost in Auburn, WA?',
    a: `A fade at Hair Mechanics is $${svc.price} and includes a consultation, the precision fade, and styling to finish. Pair it with a beard trim for $50.`,
  },
  {
    q: "What's the difference between a skin fade, mid fade, and taper fade?",
    a: 'A skin fade goes all the way down to the skin for the sharpest contrast. A mid fade starts at the temples for a balanced, versatile look. A taper fade is the most subtle — a gradual blend that keeps more length on the sides.',
  },
  {
    q: 'How often should I get my fade touched up?',
    a: 'Skin fades start losing their edge in 7–10 days, mid fades in 2–3 weeks, and tapers in 3–4 weeks. Most regulars get a full fade every 2–4 weeks and a $20 line-up in between.',
  },
  {
    q: 'Do I need an appointment for a fade?',
    a: 'No — Hair Mechanics is walk-in friendly 7 days a week. You can also call ahead at (206) 399-9288 if you want to lock in a time.',
  },
  {
    q: 'Can you do fades on all hair types?',
    a: 'Yes. Our barbers cut every hair type and texture — straight, wavy, curly, coily — and adjust the blade work and blending technique for the best result on yours.',
  },
];

const RELATED = [
  { to: '/services/haircut', label: "Men's Haircut", desc: 'Precision $40 cut with consultation and styling.' },
  { to: '/services/beard-trim', label: 'Haircut + Beard Combo', desc: 'Fade plus beard shape — the full package for $50.' },
  { to: '/services/line-up', label: 'Line Up / Trim', desc: '$20 mid-cycle clean-up to keep your fade sharp.' },
  { to: '/blog/how-to-maintain-a-fade', label: 'How to Maintain a Fade', desc: 'Make your fade last longer between cuts.' },
  { to: '/auburn-barber', label: 'Barber in Auburn', desc: 'About our Auburn, WA shop.' },
  { to: '/gallery', label: 'Fade Gallery', desc: '76+ real cuts from our chairs.' },
];

const FadePage = () => (
  <PageLayout
    title="Fade Haircuts Auburn WA | Skin, Mid & Taper Fades | Hair Mechanics"
    description={`Get a precision fade haircut at Hair Mechanics in Auburn, WA. Skin fades, mid fades, taper fades — expert barbers, walk-ins welcome. $${svc.price}. Call ${PHONE_DISPLAY}.`}
    canonical={url}
  >
    <ServiceSchema
      name="Fade Haircut"
      description="Precision fade haircut including skin fades, mid fades, and taper fades with consultation and styling."
      price={svc.price.toFixed(2)}
      url={url}
    />
    <HeroSection
      eyebrow="Fade Haircuts"
      description={`Skin fades, mid fades, taper fades — precision blending by experienced barbers. $${svc.price}, walk-ins welcome, open 7 days.`}
      ctaLabel={`Book a Fade: ${PHONE_DISPLAY}`}
    />

    {/* What We Offer */}
    <section className="py-16 bg-dark-900">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gold-500 text-center mb-10">Fade Styles We Offer</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { name: 'Skin Fade', desc: 'Clean down-to-skin blend for the sharpest, most modern look.' },
            { name: 'Mid Fade', desc: 'Balanced fade starting at the temples — versatile and clean.' },
            { name: 'Taper Fade', desc: 'Gradual blend that keeps length on top with a subtle transition.' },
            { name: 'Low Fade', desc: 'Starts just above the ear — a more conservative, professional look.' },
            { name: 'High Fade', desc: 'Starts higher up the head for max contrast with the top.' },
            { name: 'Drop Fade', desc: 'Curves down behind the ear, great for pairing with longer styles.' },
          ].map((s, i) => (
            <div key={i} className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-2">{s.name}</h3>
              <p className="text-gray-400 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Process */}
    <section className="py-16 bg-dark-800">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gold-500 text-center mb-10">How Your Fade Gets Done</h2>
        <ol className="grid sm:grid-cols-4 gap-4">
          {[
            { step: '1', title: 'Consultation', desc: "We talk through what you want — height of the fade, length on top, beard plans." },
            { step: '2', title: 'Outline', desc: "Clipper-over-comb work to set the guideline and section the cut." },
            { step: '3', title: 'Blend', desc: 'Multiple guard lengths blended seamlessly — no harsh lines.' },
            { step: '4', title: 'Finish', desc: 'Line up, neck trim, and styling with product to send you out sharp.' },
          ].map((s) => (
            <li key={s.step} className="bg-gray-800 p-5 rounded-lg">
              <div className="text-gold-500 font-bold text-2xl mb-2">{s.step}</div>
              <h3 className="font-bold mb-1">{s.title}</h3>
              <p className="text-gray-400 text-sm">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>

    {/* Pricing */}
    <section className="py-16 bg-dark-900">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-gold-500 mb-6">Fade Pricing</h2>
        <div className="bg-gray-800 rounded-lg p-6 inline-block">
          <p className="text-4xl font-bold text-gold-500">${svc.price}</p>
          <p className="text-gray-400 mt-2">Includes consultation, precision fade, and styling</p>
        </div>
        <div className="mt-8">
          <button
            onClick={handleCall}
            className="bg-gold-500 text-gray-900 px-8 py-3 rounded-md font-medium hover:bg-gold-400 transition-colors inline-flex items-center"
          >
            <Phone className="h-5 w-5 mr-2" /> Call to Book
          </button>
        </div>
      </div>
    </section>

    {/* Trust */}
    <section className="py-12 bg-dark-800">
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

    <FAQ items={FAQ_ITEMS} schemaId="fade-faq-schema" />

    <RelatedLinks links={RELATED} />

    <CTABand
      heading="Ready for a Clean Fade?"
      subtext="Walk in or call — we're open 7 days a week in Auburn, WA."
    />
  </PageLayout>
);

export default FadePage;
