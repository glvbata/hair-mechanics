import PageLayout from '../../components/PageLayout';
import { Phone } from 'lucide-react';

const handleCall = () => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', {
      send_to: 'AW-17956338356/ONVqCLjl6IgcELT1n_JC',
      value: 1.0,
      currency: 'USD',
    });
  }
  window.location.href = 'tel:+1-206-399-9288';
};

const FadePage = () => (
  <PageLayout
    title="Fade Haircuts Auburn WA | Clean Fades | Hair Mechanics Barber Shop"
    description="Get a precision fade haircut at Hair Mechanics in Auburn, WA. Skin fades, mid fades, taper fades — expert barbers, walk-ins welcome. Call (206) 399-9288."
    canonical="https://hairmechanics.com/services/fade"
  >
    {/* Hero */}
    <section className="relative py-20 sm:py-28">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("/assets/HeroImage.jpg")' }}>
        <div className="absolute inset-0 bg-dark-900/85"></div>
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-3xl sm:text-5xl font-bold">
          <span className="text-amber-500">Fade Haircuts</span>
          <span className="block text-white mt-2">in Auburn, WA</span>
        </h1>
        <p className="mt-4 text-lg text-gray-300 max-w-xl mx-auto">
          Skin fades, mid fades, taper fades — precision blending by experienced barbers. Walk-ins welcome, open 7 days.
        </p>
        <button onClick={handleCall} className="mt-8 bg-amber-500 text-gray-900 px-8 py-4 rounded-md font-bold text-lg hover:bg-amber-400 transition-colors inline-flex items-center">
          <Phone className="h-5 w-5 mr-2" /> Book a Fade: (206) 399-9288
        </button>
      </div>
    </section>

    {/* What We Offer */}
    <section className="py-16 bg-dark-900">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-amber-500 text-center mb-10">Fade Styles We Offer</h2>
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
        <h2 className="text-2xl font-bold text-amber-500 mb-6">Fade Pricing</h2>
        <div className="bg-gray-800 rounded-lg p-6 inline-block">
          <p className="text-4xl font-bold text-amber-500">$40</p>
          <p className="text-gray-400 mt-2">Includes consultation, precision fade, and styling</p>
        </div>
        <div className="mt-8">
          <button onClick={handleCall} className="bg-amber-500 text-gray-900 px-8 py-3 rounded-md font-medium hover:bg-amber-400 transition-colors inline-flex items-center">
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
            { label: 'Google Rating', value: '4.5 ★' },
            { label: 'Walk-ins Welcome', value: '✓' },
            { label: 'Open 7 Days', value: '✓' },
          ].map((s, i) => (
            <div key={i}>
              <p className="text-2xl font-bold text-amber-500">{s.value}</p>
              <p className="text-sm text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-16 bg-amber-500">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready for a Clean Fade?</h2>
        <p className="text-gray-800 mb-6">Walk in or call — we're open 7 days a week in Auburn, WA.</p>
        <button onClick={handleCall} className="bg-gray-900 text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-gray-800 transition-colors inline-flex items-center">
          <Phone className="h-5 w-5 mr-2" /> (206) 399-9288
        </button>
      </div>
    </section>
  </PageLayout>
);

export default FadePage;
