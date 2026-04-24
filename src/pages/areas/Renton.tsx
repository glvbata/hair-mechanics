import { MapPin, Clock, Phone, Star } from 'lucide-react';
import PageLayout from '../../components/PageLayout';
import HeroSection from '../../components/HeroSection';
import CTABand from '../../components/CTABand';
import {
  ADDRESS,
  HOURS,
  PHONE_DISPLAY,
  RATING,
  REVIEWS_COUNT,
  SERVICES,
  SITE_URL,
} from '../../constants/business';

const url = `${SITE_URL}/renton-barber`;

const RentonPage = () => (
  <PageLayout
    title="Barber Shop Near Renton WA | Hair Mechanics Auburn | Haircuts & Fades"
    description={`Looking for a barber near Renton, WA? Hair Mechanics in Auburn is a quick drive south. Expert haircuts, fades, beard trims. Walk-ins welcome. Call ${PHONE_DISPLAY}.`}
    canonical={url}
  >
    <HeroSection
      eyebrow="Barber Shop Near Renton, WA"
      subhead={null}
      description={
        <>
          <p>Hair Mechanics in Auburn is a quick drive from Renton. Expert haircuts, clean fades, and beard trims — walk-ins welcome.</p>
          <div className="mt-3 text-gray-400 text-sm flex items-center justify-center">
            <MapPin className="h-4 w-4 mr-1" /> About 15 minutes from Renton
          </div>
        </>
      }
      ctaLabel={`Call Now: ${PHONE_DISPLAY}`}
    />

    <section className="py-16 bg-dark-900">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gold-500 text-center mb-10">Why Renton Clients Choose Us</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { icon: MapPin, title: 'Easy Drive from Renton', desc: `Located at ${ADDRESS.full} — quick trip south via WA-167.` },
            { icon: Star, title: `${RATING} Google Rating`, desc: `Trusted by clients from Renton, Kent, Auburn, and beyond — ${REVIEWS_COUNT} reviews.` },
            { icon: Clock, title: 'Open 7 Days', desc: `${HOURS.weekday}, ${HOURS.weekend}.` },
            { icon: Phone, title: 'Walk-ins Welcome', desc: 'No appointment needed — call, text, or just show up.' },
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

    <section className="py-16 bg-dark-800">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gold-500 text-center mb-8">Services & Pricing</h2>
        <div className="space-y-3">
          {SERVICES.map((s) => (
            <div key={s.slug} className="flex justify-between items-center bg-gray-800 px-5 py-4 rounded-lg">
              <span className="font-medium">{s.name}</span>
              <span className="text-gold-500 font-bold text-lg">${s.price}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    <CTABand heading="Worth the Drive from Renton" subtext="Walk in or call — open 7 days a week." />
  </PageLayout>
);

export default RentonPage;
