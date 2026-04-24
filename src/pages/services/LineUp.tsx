import PageLayout from '../../components/PageLayout';
import ServiceSchema from '../../components/ServiceSchema';
import HeroSection from '../../components/HeroSection';
import CTABand from '../../components/CTABand';
import { PHONE_DISPLAY, SITE_URL, getService } from '../../constants/business';

const svc = getService('line-up')!;
const url = `${SITE_URL}/services/line-up`;

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
      description="Quick touch-up between cuts — clean hairline, neck trim, and light styling. In and out."
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

    <CTABand heading="Need a Quick Clean-Up?" subtext="Walk in for a line up — fast, affordable, and sharp." />
  </PageLayout>
);

export default LineUpPage;
