import PageLayout from '../../components/PageLayout';
import ServiceSchema from '../../components/ServiceSchema';
import HeroSection from '../../components/HeroSection';
import CTABand from '../../components/CTABand';
import { PHONE_DISPLAY, RATING, SITE_URL, getService } from '../../constants/business';

const svc = getService('beard-trim')!;
const url = `${SITE_URL}/services/beard-trim`;

const BeardTrimPage = () => (
  <PageLayout
    title={`Beard Trim & Shaping Auburn WA | Hair Mechanics Barber Shop`}
    description={`Professional beard trims and shaping at Hair Mechanics in Auburn, WA. Clean lines, hot towel finish. Included with haircut & beard combo ($${svc.price}). Call ${PHONE_DISPLAY}.`}
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
      description="Clean beard lines, precise shaping, and grooming — paired with a fresh cut for the complete look."
      ctaLabel={`Book Now: ${PHONE_DISPLAY}`}
    />

    <section className="py-16 bg-dark-900">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gold-500 text-center mb-10">What's Included</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { name: 'Haircut & Beard Combo', price: `$${svc.price}`, desc: 'Full haircut plus beard trim, shaping, and line up.' },
            { name: 'Beard Trim Add-On', price: 'Included', desc: 'Beard shaping and clean lines included with the combo service.' },
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

    <CTABand heading="Get the Full Package" subtext="Haircut + beard trim combo — walk in or call today." />
  </PageLayout>
);

export default BeardTrimPage;
