import PageLayout from '../../components/PageLayout';
import { Phone, MapPin, Clock, Star } from 'lucide-react';
import { handleCall } from '../../utils/analytics';

const AuburnPage = () => (
  <PageLayout
    title="Barber Shop in Auburn WA | Hair Mechanics | Haircuts & Fades"
    description="Hair Mechanics is Auburn's top-rated barber shop. Expert haircuts, fades, beard trims for men, women & kids. Walk-ins welcome, open 7 days. Call (206) 399-9288."
    canonical="https://hairmechanics.net/auburn-barber"
  >
    <section className="relative py-20 sm:py-28">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("/assets/HeroImage.jpg")' }}>
        <div className="absolute inset-0 bg-dark-900/85"></div>
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-3xl sm:text-5xl font-bold">
          <span className="text-amber-500">Auburn's Top-Rated</span>
          <span className="block text-white mt-2">Barber Shop</span>
        </h1>
        <p className="mt-4 text-lg text-gray-300 max-w-xl mx-auto">
          Hair Mechanics — expert haircuts, clean fades, and beard trims right here in Auburn, WA. Walk-ins welcome, open 7 days.
        </p>
        <button onClick={handleCall} className="mt-8 bg-amber-500 text-gray-900 px-8 py-4 rounded-md font-bold text-lg hover:bg-amber-400 transition-colors inline-flex items-center">
          <Phone className="h-5 w-5 mr-2" /> Call Now: (206) 399-9288
        </button>
      </div>
    </section>

    <section className="py-16 bg-dark-900">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-amber-500 text-center mb-10">Services & Pricing</h2>
        <div className="space-y-3 max-w-lg mx-auto">
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

    <section className="py-16 bg-dark-800">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-amber-500 text-center mb-10">Why Auburn Chooses Hair Mechanics</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { icon: Star, title: '4.5 Google Rating', desc: 'Consistently top-rated by Auburn locals — 83 reviews.' },
            { icon: Clock, title: 'Open 7 Days', desc: 'Mon–Fri 10am–8pm, Sat–Sun 8am–8pm.' },
            { icon: MapPin, title: 'Central Auburn Location', desc: '1251 A Street NE, Auburn, WA 98002 — free parking.' },
            { icon: Phone, title: 'Walk-ins Welcome', desc: 'No appointment needed. Call or just stop by.' },
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

    <section className="py-12 bg-dark-900">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-amber-500 text-center mb-8">Find Us in Auburn</h2>
        <div className="rounded-lg overflow-hidden h-64 sm:h-80">
          <iframe
            title="Hair Mechanics Auburn Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2706.5!2d-122.2289829!3d47.3190759!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5490597faf9a7db9%3A0x2b1b86ed4f8db0cd!2sHair%20Mechanics%20LLC!5e0!3m2!1sen!2sus!4v1"
            width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>

    <section className="py-16 bg-amber-500">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Auburn's Favorite Barber Shop</h2>
        <p className="text-gray-800 mb-6">Walk in or call — we're ready for you.</p>
        <button onClick={handleCall} className="bg-gray-900 text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-gray-800 transition-colors inline-flex items-center">
          <Phone className="h-5 w-5 mr-2" /> (206) 399-9288
        </button>
      </div>
    </section>
  </PageLayout>
);

export default AuburnPage;
