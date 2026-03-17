import PageLayout from '../../components/PageLayout';
import ServiceSchema from '../../components/ServiceSchema';
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

const BeardTrimPage = () => (
  <PageLayout
    title="Beard Trim & Shaping Auburn WA | Hair Mechanics Barber Shop"
    description="Professional beard trims and shaping at Hair Mechanics in Auburn, WA. Clean lines, hot towel finish. Included with haircut & beard combo ($50). Call (206) 399-9288."
    canonical="https://hairmechanics.com/services/beard-trim"
  >
    <ServiceSchema name="Beard Trim & Shaping" description="Professional beard trim and shaping included with haircut and beard combo service." price="50.00" url="https://hairmechanics.com/services/beard-trim" />
    <section className="relative py-20 sm:py-28">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("/assets/HeroImage.jpg")' }}>
        <div className="absolute inset-0 bg-dark-900/85"></div>
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-3xl sm:text-5xl font-bold">
          <span className="text-amber-500">Beard Trim & Shaping</span>
          <span className="block text-white mt-2">in Auburn, WA</span>
        </h1>
        <p className="mt-4 text-lg text-gray-300 max-w-xl mx-auto">
          Clean beard lines, precise shaping, and grooming — paired with a fresh cut for the complete look.
        </p>
        <button onClick={handleCall} className="mt-8 bg-amber-500 text-gray-900 px-8 py-4 rounded-md font-bold text-lg hover:bg-amber-400 transition-colors inline-flex items-center">
          <Phone className="h-5 w-5 mr-2" /> Book Now: (206) 399-9288
        </button>
      </div>
    </section>

    <section className="py-16 bg-dark-900">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-amber-500 text-center mb-10">What's Included</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { name: 'Haircut & Beard Combo', price: '$50', desc: 'Full haircut plus beard trim, shaping, and line up.' },
            { name: 'Beard Trim Add-On', price: 'Included', desc: 'Beard shaping and clean lines included with the combo service.' },
          ].map((s, i) => (
            <div key={i} className="bg-gray-800 p-6 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold">{s.name}</h3>
                <span className="text-amber-500 font-bold">{s.price}</span>
              </div>
              <p className="text-gray-400 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-12 bg-dark-800">
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

    <section className="py-16 bg-amber-500">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Get the Full Package</h2>
        <p className="text-gray-800 mb-6">Haircut + beard trim combo — walk in or call today.</p>
        <button onClick={handleCall} className="bg-gray-900 text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-gray-800 transition-colors inline-flex items-center">
          <Phone className="h-5 w-5 mr-2" /> (206) 399-9288
        </button>
      </div>
    </section>
  </PageLayout>
);

export default BeardTrimPage;
