import PageLayout from '../../components/PageLayout';
import ServiceSchema from '../../components/ServiceSchema';
import HeroSection from '../../components/HeroSection';
import CTABand from '../../components/CTABand';
import FAQ from '../../components/FAQ';
import RelatedLinks from '../../components/RelatedLinks';
import { PHONE_DISPLAY, SITE_URL, getService } from '../../constants/business';

const svc = getService('kids-cut')!;
const url = `${SITE_URL}/services/kids-cut`;

const FAQ_ITEMS = [
  {
    q: 'How much is a kids haircut?',
    a: `Kids cuts are $${svc.price} for ages 12 and under. Same precision and styling as our adult cuts — just a more patient pace.`,
  },
  {
    q: 'What ages do you cut?',
    a: 'Any age. We regularly cut toddlers through pre-teens. For very young kids, parents are welcome to sit close or hold them in the chair.',
  },
  {
    q: 'Do you do fades for kids?',
    a: 'Absolutely — fades, tapers, line-ups, scissor cuts, mohawks, designs. Whatever your kid wants, we can do.',
  },
  {
    q: 'Is the shop kid-friendly?',
    a: "Yes. There's a pool table to keep them busy if there's a wait, and our barbers are patient and great with first-timers. We've been the go-to family barbershop in Auburn for years.",
  },
  {
    q: 'Do you take walk-ins for kids cuts?',
    a: 'Yes — walk in any day, 7 days a week. If your child does better with a quiet room, mid-morning weekdays tend to be slower.',
  },
];

const RELATED = [
  { to: '/services/haircut', label: "Men's Haircut", desc: 'Bring dad in too — $40 precision cut.' },
  { to: '/services/fade', label: 'Fade Haircuts', desc: 'Clean fades for kids and adults.' },
  { to: '/services/line-up', label: 'Line Up / Trim', desc: 'Quick $20 touch-up between cuts.' },
  { to: '/auburn-barber', label: 'Auburn, WA Barber', desc: "Auburn's family-friendly shop." },
  { to: '/kent-barber', label: 'Near Kent, WA', desc: '10 minutes from Kent.' },
  { to: '/gallery', label: 'Cut Gallery', desc: 'See our work — including kids cuts.' },
];

const KidsCutPage = () => (
  <PageLayout
    title={`Kids Haircuts Auburn WA | $${svc.price} Ages 12 & Under | Hair Mechanics`}
    description={`Affordable kids haircuts at Hair Mechanics in Auburn, WA. Patient barbers, fun atmosphere. Ages 12 and under just $${svc.price}. Walk-ins welcome. Call ${PHONE_DISPLAY}.`}
    canonical={url}
  >
    <ServiceSchema
      name="Kids Haircut"
      description="Affordable kids haircuts for ages 12 and under at Hair Mechanics in Auburn, WA."
      price={svc.price.toFixed(2)}
      url={url}
    />
    <HeroSection
      eyebrow="Kids Haircuts"
      description={`Patient, friendly barbers who make haircuts fun. Ages 12 and under, $${svc.price} — walk-ins welcome.`}
      ctaLabel={`Book a Kids Cut: ${PHONE_DISPLAY}`}
    />

    <section className="py-16 bg-dark-900">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gold-500 text-center mb-10">What's Included</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { name: 'Consultation', desc: 'We chat with parents and kids to get the style right.' },
            { name: 'Precision Cut', desc: 'Same quality cut as adults — fades, trims, whatever they want.' },
            { name: 'Styling', desc: 'Finished and styled so they leave looking sharp.' },
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
            <p className="text-gray-400 mt-2">Ages 12 & under</p>
          </div>
        </div>
      </div>
    </section>

    {/* Why parents pick us */}
    <section className="py-16 bg-dark-800">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gold-500 text-center mb-10">Why Auburn Parents Pick Us</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { title: 'Patient Barbers', desc: 'Our team takes the time. No rushing, no stress for first-timers.' },
            { title: 'Fun Atmosphere', desc: 'Pool table, friendly vibe — kids actually want to come back.' },
            { title: 'Real Cuts', desc: 'Not a "kids menu" — your kid gets the same skill we give adults.' },
            { title: 'Family Discounts', desc: 'Bring siblings or come in with dad — easy stop for the whole crew.' },
          ].map((item) => (
            <div key={item.title} className="bg-gray-800 p-5 rounded-lg">
              <h3 className="font-bold text-white mb-1">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <FAQ items={FAQ_ITEMS} schemaId="kidscut-faq-schema" />

    <RelatedLinks links={RELATED} />

    <CTABand heading="Bring the Kids In" subtext="Walk-ins welcome — open 7 days a week in Auburn." />
  </PageLayout>
);

export default KidsCutPage;
