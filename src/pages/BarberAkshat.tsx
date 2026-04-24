import PageLayout from '../components/PageLayout';
import HeroSection from '../components/HeroSection';
import CTABand from '../components/CTABand';
import { Phone, Scissors, Clock, MapPin } from 'lucide-react';
import { SITE_URL } from '../constants/business';

const BarberAkshatPage = () => (
  <PageLayout
    title="Akshat Rait | Barber at Hair Mechanics Auburn WA"
    description="Meet Akshat Rait, barber at Hair Mechanics in Auburn, WA. Specializing in tapers, skin fades, and modern styles. Walk-ins welcome, open 7 days a week."
    canonical={`${SITE_URL}/barber/akshat`}
  >
    <HeroSection
      eyebrow="Meet Akshat"
      subhead={null}
      description="Barber at Hair Mechanics — Auburn, WA."
      hideCta
    />

    {/* Profile */}
    <section className="py-16 bg-dark-900">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          {/* Photo */}
          <div className="aspect-[4/3] bg-dark-700 overflow-hidden">
            <picture>
              <source srcSet="/assets/akshat.webp" type="image/webp" />
              <img
                src="/assets/akshat.jpg"
                alt="Akshat Rait — Barber at Hair Mechanics"
                className="w-full h-full object-cover object-center"
                decoding="async"
                width="800"
                height="600"
              />
            </picture>
          </div>

          <div className="p-8 sm:p-10">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gold-500">Akshat Rait</h2>
              <p className="text-gray-400 mt-1">Barber</p>
              <p className="text-gray-400 text-sm mt-1">Hair Mechanics — Auburn, WA</p>
            </div>

            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Akshat brings precision and consistency to every cut. Whether you're coming in for a skin fade,
                a taper, or a full style refresh, he takes the time to understand what you want and delivers it
                clean every time.
              </p>
              <p>
                With a sharp eye for detail and a passion for modern barbering, Akshat keeps up with trends
                while staying true to the fundamentals — sharp lines, smooth blends, and a finish that holds up.
              </p>
              <p>
                He's part of what makes Hair Mechanics the go-to spot in Auburn. Walk-ins are always welcome,
                or call ahead to make sure he's in.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Quick facts */}
    <section className="py-12 bg-dark-800">
      <div className="max-w-3xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { icon: Scissors, label: 'Specialties', value: 'Fades & Tapers' },
            { icon: Clock, label: 'Open', value: '7 Days a Week' },
            { icon: MapPin, label: 'Location', value: 'Auburn, WA' },
            { icon: Phone, label: 'Walk-ins', value: 'Always Welcome' },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              <item.icon className="h-6 w-6 text-gold-500 mb-2" />
              <p className="text-sm font-bold">{item.value}</p>
              <p className="text-xs text-gray-400 mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <CTABand heading="Ready for a Cut?" subtext="Walk in or call — open 7 days a week." />
  </PageLayout>
);

export default BarberAkshatPage;
