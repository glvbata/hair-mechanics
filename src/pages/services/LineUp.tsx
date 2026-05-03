import PageLayout from '../../components/PageLayout';
import ServiceSchema from '../../components/ServiceSchema';
import HeroSection from '../../components/HeroSection';
import CTABand from '../../components/CTABand';
import FAQ from '../../components/FAQ';
import RelatedLinks from '../../components/RelatedLinks';
import { PHONE_DISPLAY, SITE_URL, getService } from '../../constants/business';

const svc = getService('line-up')!;
const url = `${SITE_URL}/services/line-up`;

const FAQ_ITEMS = [
  {
    q: 'What is a line-up?',
    a: 'A line-up cleans the edges of your hairline — forehead, temples, sideburns, and neckline — without doing a full cut. It resets how sharp your style looks between full visits.',
  },
  {
    q: 'How much does a line-up cost?',
    a: `A line-up at Hair Mechanics is $${svc.price}. It's the most cost-effective way to keep a fade or fresh haircut looking sharp longer.`,
  },
  {
    q: 'How often should I get a line-up?',
    a: "If you're on a 3–4 week schedule between full cuts, a line-up at the halfway point keeps the cut looking new. Many of our regulars do a full fade every 3 weeks and a line-up at week 1.5.",
  },
  {
    q: 'How long does a line-up take?',
    a: "Usually 10–15 minutes. It's an in-and-out service designed to keep your edges crisp without a full session in the chair.",
  },
  {
    q: 'Do you take walk-ins for line-ups?',
    a: 'Yes — walk in 7 days a week. Line-ups are quick, so we can usually fit you in even on busier days.',
  },
];

const RELATED = [
  { to: '/services/fade', label: 'Full Fade', desc: 'When the line-up is not enough.' },
  { to: '/services/haircut', label: "Men's Haircut", desc: 'Precision cut with consultation.' },
  { to: '/services/beard-trim', label: 'Haircut + Beard', desc: 'Combo service for the full reset.' },
  { to: '/blog/how-to-maintain-a-fade', label: 'Fade Maintenance Guide', desc: 'How line-ups extend your fade.' },
  { to: '/auburn-barber', label: 'Auburn, WA', desc: 'Our shop on A Street NE.' },
  { to: '/gallery', label: 'Gallery', desc: 'See our line-up work.' },
];

const LineUpPage = () => (
  <PageLayout
    title={`Line Up & Trim Auburn WA | $${svc.price} Quick Touch-Up | Hair Mechanics`}
    description={`Quick line up and trim at Hair Mechanics in Auburn, WA. Clean hairline, neck trim, light styling — just $${svc.price}. Walk-ins welcome. Call ${PHONE_DISPLAY}.`}
    canonical={url}
  >
    <ServiceSchema
      name="Line Up / Trim"
      description="Quick line up and trim with neck trim and light styling at Hair Mechanics in Auburn, WA."
      price={svc.price.toFixed(2)}
      url={url}
    />
    <HeroSection
      eyebrow="Line Up / Trim"
      description={`Quick touch-up between cuts — clean hairline, neck trim, and light styling. $${svc.price}, in and out.`}
      ctaLabel={`Get a Line Up: ${PHONE_DISPLAY}`}
    />

    <section className="py-16 bg-dark-900">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gold-500 text-center mb-10">What's Included</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { name: 'Neck Trim', desc: 'Clean up the neckline for a fresh look.' },
            { name: 'Line Up', desc: 'Sharp edges around the hairline and temples.' },
            { name: 'Light Styling', desc: 'Quick style to finish the look.' },
          ].map((s, i) => (
            <div key={i} className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-2">{s.name}</h3>
              <p className="text-gray-400 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <div className="bg-gray-800 rounded-lg p-6 inline-block">
            <p className="text-4xl font-bold text-gold-500">${svc.price}</p>
            <p className="text-gray-400 mt-2">Quick touch-up between cuts</p>
          </div>
        </div>
      </div>
    </section>

    {/* When to get one */}
    <section className="py-16 bg-dark-800">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gold-500 text-center mb-10">When a Line-Up Makes Sense</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { title: 'Halfway Between Cuts', desc: 'Reset your edges at the 1.5–2 week mark to extend the look of your last cut.' },
            { title: 'Big Event Tomorrow', desc: 'Wedding, photos, interview — a $20 line-up makes you look like you just got a fresh fade.' },
            { title: 'Growing Your Hair Out', desc: 'Keep the edges clean while you grow the length out on top.' },
            { title: 'Fast Schedule', desc: "Not enough time for a full cut? In and out in 15 minutes." },
          ].map((item) => (
            <div key={item.title} className="bg-gray-800 p-5 rounded-lg">
              <h3 className="font-bold text-white mb-1">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <FAQ items={FAQ_ITEMS} schemaId="lineup-faq-schema" />

    <RelatedLinks links={RELATED} />

    <CTABand heading="Need a Quick Clean-Up?" subtext="Walk in for a line up — fast, affordable, and sharp." />
  </PageLayout>
);

export default LineUpPage;
