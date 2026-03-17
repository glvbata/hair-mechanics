import { Phone, MapPin, Clock, Star, CheckCircle } from 'lucide-react';
import { useSEO } from '../utils/useSEO';

const PHONE_NUMBER = '+1-206-399-9288';
const PHONE_DISPLAY = '(206) 399-9288';

const handleCall = () => {
  // Fire Google Ads click-to-call conversion
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', {
      send_to: 'AW-17956338356/ONVqCLjl6IgcELT1n_JC',
      value: 1.0,
      currency: 'USD',
    });
  }
  window.location.href = `tel:${PHONE_NUMBER}`;
};

const services = [
  { name: 'Haircut', price: '$40' },
  { name: 'Haircut & Beard', price: '$50' },
  { name: "Women's Cut", price: '$35' },
  { name: 'Kids Cut (12 & under)', price: '$35' },
  { name: 'Line Up', price: '$20' },
];

const reviews = [
  { name: 'Marcus T.', text: 'Been coming here for over a year now. Always leave looking fresh. The vibe is chill and the cuts are clean every single time.' },
  { name: 'Ryan P.', text: "Drove 30 minutes to get here and it's worth every mile. They actually listen to what you want and nail it." },
  { name: 'Chris L.', text: 'My go-to spot in Auburn. Walked in for a fade and beard trim, walked out feeling like a new man. Fair prices too.' },
];

const BookPage = () => {
  useSEO({
    title: 'Book a Haircut | Hair Mechanics Barber Shop Auburn, WA | (206) 399-9288',
    description: 'Book your haircut at Hair Mechanics, Auburn\'s top barber shop. Walk-ins welcome. Haircuts, fades, beard trims for men, women, and kids. Open 7 days. Call (206) 399-9288.',
    canonical: 'https://hairmechanics.com/book',
  });

  return (
    <div className="min-h-screen bg-dark-800 text-white">
      {/* Sticky CTA bar */}
      <div className="fixed top-0 w-full z-50 bg-dark-900 border-b border-dark-700 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <img src="/assets/Logo.png" alt="Hair Mechanics" className="h-8 w-auto rounded-md" />
            <span className="ml-2 font-bold tracking-wider text-sm sm:text-base">HAIR MECHANICS</span>
          </div>
          <button
            onClick={handleCall}
            className="bg-amber-500 text-gray-900 px-4 py-2 rounded-md font-medium hover:bg-amber-400 transition-colors inline-flex items-center text-sm sm:text-base"
          >
            <Phone className="h-4 w-4 mr-1.5" />
            Call Now
          </button>
        </div>
      </div>

      {/* Hero */}
      <section className="relative pt-20">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("/assets/HeroImage.jpg")' }}
        >
          <div className="absolute inset-0 bg-dark-900/85"></div>
        </div>
        <div className="relative z-10 text-center px-4 py-16 sm:py-24">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            <span className="text-amber-500">Auburn's Top-Rated Barber Shop</span>
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-300 max-w-md mx-auto">
            Walk-ins welcome. Expert haircuts, clean fades, and beard trims — open 7 days.
          </p>
          <button
            onClick={handleCall}
            className="mt-8 bg-amber-500 text-gray-900 px-8 py-4 rounded-md font-bold text-lg hover:bg-amber-400 transition-colors inline-flex items-center"
          >
            <Phone className="h-5 w-5 mr-2" />
            Call to Book: {PHONE_DISPLAY}
          </button>
          <div className="mt-3">
            <a
              href="sms:+12063999288?body=Hi, I'd like to book a haircut at Hair Mechanics"
              className="inline-flex items-center text-amber-500 hover:text-amber-400 font-medium text-lg"
            >
              💬 Or text us to book
            </a>
          </div>
          <div className="mt-4 flex items-center justify-center text-gray-400 text-sm space-x-4">
            <span className="flex items-center"><Clock className="h-4 w-4 mr-1" /> Open 7 days a week</span>
            <span className="flex items-center"><MapPin className="h-4 w-4 mr-1" /> Auburn, WA</span>
          </div>
        </div>
      </section>

      {/* Why Hair Mechanics - quick trust signals */}
      <section className="py-12 bg-dark-900">
        <div className="max-w-3xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { label: 'Years in Business', value: '5+' },
              { label: 'Happy Clients', value: '2K+' },
              { label: 'Google Rating', value: '4.5 ★' },
              { label: 'Open 7 Days', value: '✓' },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-2xl font-bold text-amber-500">{stat.value}</p>
                <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services & Pricing */}
      <section className="py-12 bg-dark-800">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">
            <span className="text-amber-500">Services & Pricing</span>
          </h2>
          <div className="space-y-3">
            {services.map((s, i) => (
              <div key={i} className="flex justify-between items-center bg-gray-800 px-5 py-4 rounded-lg">
                <span className="font-medium">{s.name}</span>
                <span className="text-amber-500 font-bold text-lg">{s.price}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button
              onClick={handleCall}
              className="bg-amber-500 text-gray-900 px-8 py-3 rounded-md font-medium hover:bg-amber-400 transition-colors inline-flex items-center"
            >
              <Phone className="h-5 w-5 mr-2" />
              Book Your Cut
            </button>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-12 bg-dark-900">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">
            <span className="text-amber-500">What Our Clients Say</span>
          </h2>
          <div className="space-y-4">
            {reviews.map((r, i) => (
              <div key={i} className="bg-gray-800 p-5 rounded-lg">
                <div className="flex mb-2">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 text-amber-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-2">"{r.text}"</p>
                <p className="text-sm font-medium text-gray-400">— {r.name}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <a
              href="https://g.page/r/Cc2wjU_thhsrEAI/review"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-500 hover:text-amber-400 text-sm underline"
            >
              See all reviews on Google
            </a>
          </div>
        </div>
      </section>

      {/* Location + Map */}
      <section className="py-12 bg-dark-800">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">
            <span className="text-amber-500">Find Us</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">1251 A Street NE</p>
                  <p className="text-gray-400">Auburn, WA 98002</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                <a href={`tel:${PHONE_NUMBER}`} className="hover:text-amber-500 transition-colors">{PHONE_DISPLAY}</a>
              </div>
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p>Mon–Fri: 10am – 8pm</p>
                  <p>Sat–Sun: 8am – 8pm</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-gray-400">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Walk-ins welcome
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Free parking available
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  All major cards accepted
                </div>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden h-64 sm:h-auto">
              <iframe
                title="Hair Mechanics Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2706.5!2d-122.2285!3d47.3073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDE4JzI2LjMiTiAxMjLCsDEzJzQyLjYiVw!5e0!3m2!1sen!2sus!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '250px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-amber-500">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready for a Fresh Cut?</h2>
          <p className="text-gray-800 mb-8 text-lg">Call now or walk in — we're open 7 days a week.</p>
          <button
            onClick={handleCall}
            className="bg-gray-900 text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-gray-800 transition-colors inline-flex items-center"
          >
            <Phone className="h-5 w-5 mr-2" />
            {PHONE_DISPLAY}
          </button>
          <div className="mt-3">
            <a
              href="sms:+12063999288?body=Hi, I'd like to book a haircut at Hair Mechanics"
              className="text-gray-900 hover:text-gray-700 font-medium underline"
            >
              💬 Text us instead
            </a>
          </div>
        </div>
      </section>

      {/* Minimal footer */}
      <footer className="bg-dark-900 py-6 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Hair Mechanics. All rights reserved.</p>
        <a href="/" className="text-amber-500 hover:text-amber-400 text-xs mt-2 inline-block">Visit full website</a>
      </footer>
    </div>
  );
};

export default BookPage;