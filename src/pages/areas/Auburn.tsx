import { Phone, MapPin, Clock, Star } from 'lucide-react';
import PageLayout from '../../components/PageLayout';
import HeroSection from '../../components/HeroSection';
import CTABand from '../../components/CTABand';
import {
  ADDRESS,
  COORDS,
  HOURS,
  PHONE_DISPLAY,
  RATING,
  REVIEWS_COUNT,
  SERVICES,
  SITE_URL,
} from '../../constants/business';

const url = `${SITE_URL}/auburn-barber`;

const AuburnPage = () => (
  <PageLayout
    title="Barber Shop in Auburn WA | Hair Mechanics | Haircuts & Fades"
    description={`Hair Mechanics is Auburn's top-rated barber shop. Expert haircuts, fades, beard trims for men, women & kids. Walk-ins welcome, open 7 days. Call ${PHONE_DISPLAY}.`}
    canonical={url}
  >
    <HeroSection
      eyebrow="Auburn's Top-Rated"
      subhead="Barber Shop"
      description={`Hair Mechanics — expert haircuts, clean fades, and beard trims right here in ${ADDRESS.city}, ${ADDRESS.region}. Walk-ins welcome, open 7 days.`}
      ctaLabel={`Call Now: ${PHONE_DISPLAY}`}
    />

    <section className="py-16 bg-dark-900">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gold-500 text-center mb-10">Services & Pricing</h2>
        <div className="space-y-3 max-w-lg mx-auto">
          {SERVICES.map((s) => (
            <div key={s.slug} className="flex justify-between items-center bg-gray-800 px-5 py-4 rounded-lg">
              <span className="font-medium">{s.name}</span>
              <span className="text-gold-500 font-bold text-lg">${s.price}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-16 bg-dark-800">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gold-500 text-center mb-10">Why Auburn Chooses Hair Mechanics</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { icon: Star, title: `${RATING} Google Rating`, desc: `Consistently top-rated by Auburn locals — ${REVIEWS_COUNT} reviews.` },
            { icon: Clock, title: 'Open 7 Days', desc: `${HOURS.weekday}, ${HOURS.weekend}.` },
            { icon: MapPin, title: 'Central Auburn Location', desc: `${ADDRESS.full} — free parking.` },
            { icon: Phone, title: 'Walk-ins Welcome', desc: 'No appointment needed. Call or just stop by.' },
          ].map((item, i) => (
            <div key={i} className="bg-gray-800 p-6 rounded-lg flex items-start">
              <item.icon className="h-6 w-6 text-gold-500 mr-4 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-bold mb-1">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-12 bg-dark-900">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gold-500 text-center mb-8">Find Us in Auburn</h2>
        <div className="rounded-lg overflow-hidden h-64 sm:h-80">
          <iframe
            title="Hair Mechanics Auburn Location"
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2706.5!2d${COORDS.lng}!3d${COORDS.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5490597faf9a7db9%3A0x2b1b86ed4f8db0cd!2sHair%20Mechanics%20LLC!5e0!3m2!1sen!2sus!4v1`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>

    <CTABand heading="Auburn's Favorite Barber Shop" subtext="Walk in or call — we're ready for you." />
  </PageLayout>
);

export default AuburnPage;
