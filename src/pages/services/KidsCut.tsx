import PageLayout from '../../components/PageLayout';
import ServiceSchema from '../../components/ServiceSchema';
import HeroSection from '../../components/HeroSection';
import CTABand from '../../components/CTABand';
import { PHONE_DISPLAY, SITE_URL, getService } from '../../constants/business';

const svc = getService('kids-cut')!;
const url = `${SITE_URL}/services/kids-cut`;

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
      description="Patient, friendly barbers who make haircuts fun. Ages 12 and under — walk-ins welcome."
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

    <CTABand heading="Bring the Kids In" subtext="Walk-ins welcome — open 7 days a week in Auburn." />
  </PageLayout>
);

export default KidsCutPage;
