import PageLayout from '../../components/PageLayout';
import ServiceSchema from '../../components/ServiceSchema';
import HeroSection from '../../components/HeroSection';
import CTABand from '../../components/CTABand';
import { PHONE_DISPLAY, SITE_URL, getService } from '../../constants/business';

const svc = getService('haircut')!;
const url = `${SITE_URL}/services/haircut`;

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
      description="Precision cuts tailored to your style. Consultation included — walk-ins welcome, open 7 days."
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

    <CTABand heading="Time for a Fresh Cut?" subtext="Walk in or call — Auburn's go-to barber shop." />
  </PageLayout>
);

export default HaircutPage;
