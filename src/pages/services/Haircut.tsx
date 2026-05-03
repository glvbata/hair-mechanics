import PageLayout from '../../components/PageLayout';
import ServiceSchema from '../../components/ServiceSchema';
import HeroSection from '../../components/HeroSection';
import CTABand from '../../components/CTABand';
import FAQ from '../../components/FAQ';
import RelatedLinks from '../../components/RelatedLinks';
import { PHONE_DISPLAY, SITE_URL, getService } from '../../constants/business';

const svc = getService('haircut')!;
const url = `${SITE_URL}/services/haircut`;

const FAQ_ITEMS = [
  {
    q: "How much is a men's haircut at Hair Mechanics?",
    a: `A precision men's haircut is $${svc.price} and includes a consultation, the cut, and finishing with product. Add a beard trim for the combo at $50.`,
  },
  {
    q: 'How long does a haircut take?',
    a: 'Most haircuts run 30–45 minutes depending on style and hair length. We never rush — the time is part of why the cut comes out clean.',
  },
  {
    q: 'Do I need to book ahead?',
    a: 'No. Walk-ins are welcome 7 days a week. If you want to lock in a specific barber or time, call (206) 399-9288.',
  },
  {
    q: 'What styles do your barbers do?',
    a: 'Everything — fades, scissor cuts, tapers, classic side parts, textured crops, longer styles, kids cuts, and beard work. Bring a photo or describe what you want.',
  },
  {
    q: 'Where are you located?',
    a: 'Hair Mechanics is at 1251 A Street NE, Auburn, WA 98002. Free parking right out front. We serve clients from Auburn, Kent, Federal Way, Renton, Sumner, and Puyallup.',
  },
];

const RELATED = [
  { to: '/services/fade', label: 'Fade Haircuts', desc: 'Skin, mid, taper — precision blending.' },
  { to: '/services/beard-trim', label: 'Haircut + Beard Combo', desc: 'Cut plus shaped beard for $50.' },
  { to: '/services/line-up', label: 'Line Up / Trim', desc: 'Quick $20 mid-cycle clean-up.' },
  { to: '/blog/top-mens-haircut-trends-2026', label: '2026 Haircut Trends', desc: 'What we are cutting most this year.' },
  { to: '/auburn-barber', label: 'Auburn, WA', desc: 'Our home shop.' },
  { to: '/gallery', label: 'Haircut Gallery', desc: 'See real cuts from our chairs.' },
];

const HaircutPage = () => (
  <PageLayout
    title={`Men's Haircut Auburn WA | $${svc.price} Precision Cuts | Hair Mechanics`}
    description={`Get a precision men's haircut at Hair Mechanics in Auburn, WA. Expert barbers, walk-ins welcome, open 7 days. Haircuts starting at $${svc.price}. Call ${PHONE_DISPLAY}.`}
    canonical={url}
  >
    <ServiceSchema
      name="Men's Haircut"
      description="Precision men's haircut with consultation and styling at Hair Mechanics in Auburn, WA."
      price={svc.price.toFixed(2)}
      url={url}
    />
    <HeroSection
      eyebrow="Men's Haircuts"
      description={`Precision cuts tailored to your style. Consultation included — walk-ins welcome, open 7 days. $${svc.price}.`}
      ctaLabel={`Book a Haircut: ${PHONE_DISPLAY}`}
    />

    <section className="py-16 bg-dark-900">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gold-500 text-center mb-10">What You Get</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { name: 'Consultation', desc: 'We talk through what you want before we start cutting.' },
            { name: 'Precision Cut', desc: 'Clean lines, proper blending, attention to detail.' },
            { name: 'Styling', desc: 'Finished with product and styled to your preference.' },
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
            <p className="text-gray-400 mt-2">Consultation + Cut + Style</p>
          </div>
        </div>
      </div>
    </section>

    {/* Styles */}
    <section className="py-16 bg-dark-800">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gold-500 text-center mb-10">Styles We Cut</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'Classic Side Part', desc: 'Timeless, professional, always in style.' },
            { name: 'Textured Crop', desc: 'Short sides, textured top — modern and low maintenance.' },
            { name: 'Pompadour', desc: 'Volume up top with clean sides for a bold look.' },
            { name: 'Buzz Cut', desc: 'Short, sharp, and easy. We dial in the right guard length.' },
            { name: 'Scissor Cut', desc: 'For longer styles — natural texture and movement.' },
            { name: 'Curly / Coily Styles', desc: 'Cuts shaped to work with your natural texture.' },
          ].map((s) => (
            <div key={s.name} className="bg-gray-800 p-5 rounded-lg">
              <h3 className="font-bold text-white mb-1">{s.name}</h3>
              <p className="text-gray-400 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <FAQ items={FAQ_ITEMS} schemaId="haircut-faq-schema" />

    <RelatedLinks links={RELATED} />

    <CTABand heading="Time for a Fresh Cut?" subtext="Walk in or call — Auburn's go-to barber shop." />
  </PageLayout>
);

export default HaircutPage;
