import { Phone } from 'lucide-react';
import PageLayout from '../../components/PageLayout';
import ServiceSchema from '../../components/ServiceSchema';
import HeroSection from '../../components/HeroSection';
import CTABand from '../../components/CTABand';
import { handleCall } from '../../utils/analytics';
import { PHONE_DISPLAY, RATING, SITE_URL, getService } from '../../constants/business';

const svc = getService('fade')!;
const url = `${SITE_URL}/services/fade`;

const FadePage = () => (
  <PageLayout
    title="Fade Haircuts Auburn WA | Clean Fades | Hair Mechanics Barber Shop"
    description={`Get a precision fade haircut at Hair Mechanics in Auburn, WA. Skin fades, mid fades, taper fades — expert barbers, walk-ins welcome. Call ${PHONE_DISPLAY}.`}
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
      description="Skin fades, mid fades, taper fades — precision blending by experienced barbers. Walk-ins welcome, open 7 days."
      ctaLabel={`Book a Fade: ${PHONE_DISPLAY}`}
    />

    {/* What We Offer */}
    <section className="py-16 bg-dark-900">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gold-500 text-center mb-10">Fade Styles We Offer</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { name: 'Skin Fade', desc: 'Clean down-to-skin blend for a sharp, modern look.' },
            { name: 'Mid Fade', desc: 'Balanced fade starting at the temples — versatile and clean.' },
            { name: 'Taper Fade', desc: 'Gradual blend that keeps length on top with a subtle transition.' },
          ].map((s, i) => (
            <div key={i} className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-2">{s.name}</h3>
              <p className="text-gray-400 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Pricing */}
    <section className="py-16 bg-dark-800">
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

    <CTABand
      heading="Ready for a Clean Fade?"
      subtext="Walk in or call — we're open 7 days a week in Auburn, WA."
    />
  </PageLayout>
);

export default FadePage;
