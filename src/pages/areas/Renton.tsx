import PageLayout from '../../components/PageLayout';
import { Phone, MapPin, Clock, Star } from 'lucide-react';
import { handleCall } from '../../utils/analytics';

const RentonPage = () => (
  <PageLayout
    title="Barber Shop Near Renton WA | Hair Mechanics Auburn | Haircuts & Fades"
    description="Looking for a barber near Renton, WA? Hair Mechanics in Auburn is a quick drive south. Expert haircuts, fades, beard trims. Walk-ins welcome. Call (206) 399-9288."
    canonical="https://hairmechanics.net/renton-barber"
  >
    <section className="relative py-20 sm:py-28">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("/assets/HeroImage.jpg")' }}>
        <div className="absolute inset-0 bg-dark-900/85"></div>
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-3xl sm:text-5xl font-bold">
          <span className="text-amber-500">Barber Shop Near Renton, WA</span>
        </h1>
        <p className="mt-4 text-lg text-gray-300 max-w-xl mx-auto">
          Hair Mechanics in Auburn is a quick drive from Renton. Expert haircuts, clean fades, and beard trims — walk-ins welcome.
        </p>
        <div className="mt-3 text-gray-400 text-sm flex items-center justify-center">
          <MapPin className="h-4 w-4 mr-1" /> About 15 minutes from Renton
        </div>
        <button onClick={handleCall} className="mt-8 bg-amber-500 text-gray-900 px-8 py-4 rounded-md font-bold text-lg hover:bg-amber-400 transition-colors inline-flex items-center">
          <Phone className="h-5 w-5 mr-2" /> Call Now: (206) 399-9288
        </button>
      </div>
    </section>

    <section className="py-16 bg-dark-900">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-amber-500 text-center mb-10">Why Renton Clients Choose Us</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { icon: MapPin, title: 'Easy Drive from Renton', desc: 'Located at 1251 A Street NE, Auburn — quick trip south via WA-167.' },
            { icon: Star, title: '4.5 Google Rating', desc: 'Trusted by clients from Renton, Kent, Auburn, and beyond — 83 reviews.' },
            { icon: Clock, title: 'Open 7 Days', desc: 'Mon–Fri 10am–8pm, Sat–Sun 8am–8pm.' },
            { icon: Phone, title: 'Walk-ins Welcome', desc: 'No appointment needed — call, text, or just show up.' },
          ].map((item, i) => (
            <div key={i} className="bg-gray-800 p-6 rounded-lg flex items-start">
              <item.icon className="h-6 w-6 text-amber-500 mr-4 mt-0.5 flex-shrink-0" />
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
        <h2 className="text-2xl font-bold text-amber-500 text-center mb-8">Services & Pricing</h2>
        <div className="space-y-3">
          {[
            { name: 'Haircut', price: '$40' },
            { name: 'Haircut & Beard', price: '$50' },
            { name: 'Kids Cut (12 & under)', price: '$35' },
            { name: 'Line Up / Trim', price: '$20' },
          ].map((s, i) => (
            <div key={i} className="flex justify-between items-center bg-gray-800 px-5 py-4 rounded-lg">
              <span className="font-medium">{s.name}</span>
              <span className="text-amber-500 font-bold text-lg">{s.price}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-16 bg-amber-500">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Worth the Drive from Renton</h2>
        <p className="text-gray-800 mb-6">Walk in or call — open 7 days a week.</p>
        <button onClick={handleCall} className="bg-gray-900 text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-gray-800 transition-colors inline-flex items-center">
          <Phone className="h-5 w-5 mr-2" /> (206) 399-9288
        </button>
      </div>
    </section>
  </PageLayout>
);

export default RentonPage;
