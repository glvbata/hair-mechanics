import PageLayout from '../components/PageLayout';
import { Phone, Instagram, Scissors, Clock, MapPin } from 'lucide-react';
import { handleCall } from '../utils/analytics';

const BarberPage = () => (
  <PageLayout
    title="Meet Glen Celestial | Hair Mechanics Auburn WA"
    description="Meet Glen Celestial, owner and lead barber at Hair Mechanics in Auburn, WA. Years of experience, clean fades, precision beard work, and a shop that feels like home."
    canonical="https://hairmechanics.net/barber"
  >
    {/* Hero */}
    <section className="relative py-20 sm:py-28">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("/assets/HeroImage.jpg")' }}>
        <div className="absolute inset-0 bg-dark-900/85"></div>
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-3xl sm:text-5xl font-bold">
          <span className="text-amber-500">Meet Glen</span>
        </h1>
        <p className="mt-4 text-lg text-gray-300 max-w-xl mx-auto">
          Owner and lead barber behind Hair Mechanics.
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
              src="/assets/glen.jpg"
              alt="Glen Celestial — Owner and Lead Barber at Hair Mechanics"
              className="w-full h-full object-cover object-top"
              decoding="async"
            />
          </div>

          <div className="p-8 sm:p-10">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-amber-500">Glen Celestial</h2>
              <p className="text-gray-400 mt-1">Owner & Lead Barber</p>
              <p className="text-gray-400 text-sm mt-1">Hair Mechanics — Auburn, WA</p>
            </div>

            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Hair Mechanics started with a simple idea: give people a great haircut in a place that feels like home.
                What began as a dream turned into Auburn's go-to barber shop, built on word of mouth and repeat clients
                who keep coming back.
              </p>
              <p>
                With years of experience behind the chair, every cut is about more than just hair — it's about
                making people feel confident when they walk out the door. From clean fades to precision beard work,
                the attention to detail is what sets Hair Mechanics apart.
              </p>
              <p>
                The shop is open 7 days a week because looking good shouldn't have to wait. Walk-ins are always
                welcome, and every client gets the same level of care whether it's their first visit or their fiftieth.
              </p>
            </div>

            {/* Social links */}
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://www.instagram.com/hairmechanics1997/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-amber-500 hover:text-amber-400 transition-colors"
              >
                <Instagram className="h-5 w-5 mr-2" /> @hairmechanics1997
              </a>
              <a
                href="https://www.tiktok.com/@glencelestial"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-amber-500 hover:text-amber-400 transition-colors"
              >
                🎵 TikTok
              </a>
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
            { icon: Scissors, label: 'Specialties', value: 'Fades & Beard Work' },
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
        <button onClick={handleCall} className="bg-gray-900 text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-gray-800 transition-colors inline-flex items-center">
          <Phone className="h-5 w-5 mr-2" /> (206) 399-9288
        </button>
      </div>
    </section>
  </PageLayout>
);

export default BarberPage;
