import PageLayout from '../components/PageLayout';
import { Phone, Scissors, Clock, MapPin } from 'lucide-react';
import { handleCall } from '../utils/analytics';

const BarberAkshatPage = () => (
  <PageLayout
    title="Akshat Rait | Barber at Hair Mechanics Auburn WA"
    description="Meet Akshat Rait, barber at Hair Mechanics in Auburn, WA. Specializing in tapers, skin fades, and modern styles. Walk-ins welcome, open 7 days a week."
    canonical="https://hairmechanics.net/barber/akshat"
  >
    {/* Hero */}
    <section className="relative py-20 sm:py-28">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("/assets/HeroImage.jpg")' }}>
        <div className="absolute inset-0 bg-dark-900/85"></div>
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-3xl sm:text-5xl font-bold">
          <span className="text-amber-500">Meet Akshat</span>
        </h1>
        <p className="mt-4 text-lg text-gray-300 max-w-xl mx-auto">
          Barber at Hair Mechanics — Auburn, WA.
        </p>
      </div>
    </section>

    {/* Profile */}
    <section className="py-16 bg-dark-900">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          {/* Photo */}
          <div className="aspect-[3/2] bg-dark-700 overflow-hidden">
            <img
              src="/assets/akshat.jpg"
              alt="Akshat Rait — Barber at Hair Mechanics"
              className="w-full h-full object-cover object-top"
              decoding="async"
            />
          </div>

          <div className="p-8 sm:p-10">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-amber-500">Akshat Rait</h2>
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
              <item.icon className="h-6 w-6 text-amber-500 mb-2" />
              <p className="text-sm font-bold">{item.value}</p>
              <p className="text-xs text-gray-400 mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-16 bg-amber-500">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready for a Cut?</h2>
        <p className="text-gray-800 mb-6">Walk in or call — open 7 days a week.</p>
        <button
          onClick={handleCall}
          className="bg-gray-900 text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-gray-800 transition-colors inline-flex items-center"
        >
          <Phone className="h-5 w-5 mr-2" /> (206) 399-9288
        </button>
      </div>
    </section>
  </PageLayout>
);

export default BarberAkshatPage;
