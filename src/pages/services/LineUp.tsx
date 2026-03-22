import PageLayout from '../../components/PageLayout';
import ServiceSchema from '../../components/ServiceSchema';
import { Phone } from 'lucide-react';
import { handleCall } from '../../utils/analytics';

const LineUpPage = () => (
  <PageLayout
    title="Line Up & Trim Auburn WA | $20 Quick Touch-Up | Hair Mechanics"
    description="Quick line up and trim at Hair Mechanics in Auburn, WA. Clean hairline, neck trim, light styling — just $20. Walk-ins welcome. Call (206) 399-9288."
    canonical="https://hairmechanics.net/services/line-up"
  >
    <ServiceSchema name="Line Up / Trim" description="Quick line up and trim with neck trim and light styling at Hair Mechanics in Auburn, WA." price="20.00" url="https://hairmechanics.net/services/line-up" />
    <section className="relative py-20 sm:py-28">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("/assets/HeroImage.jpg")' }}>
        <div className="absolute inset-0 bg-dark-900/85"></div>
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-3xl sm:text-5xl font-bold">
          <span className="text-amber-500">Line Up / Trim</span>
          <span className="block text-white mt-2">in Auburn, WA</span>
        </h1>
        <p className="mt-4 text-lg text-gray-300 max-w-xl mx-auto">
          Quick touch-up between cuts — clean hairline, neck trim, and light styling. In and out.
        </p>
        <button onClick={handleCall} className="mt-8 bg-amber-500 text-gray-900 px-8 py-4 rounded-md font-bold text-lg hover:bg-amber-400 transition-colors inline-flex items-center">
          <Phone className="h-5 w-5 mr-2" /> Get a Line Up: (206) 399-9288
        </button>
      </div>
    </section>

    <section className="py-16 bg-dark-900">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-amber-500 text-center mb-10">What's Included</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { name: 'Neck Trim', desc: 'Clean up the neckline for a fresh look.' },
            { name: 'Line Up', desc: 'Sharp edges around the hairline and temples.' },
            { name: 'Light Styling', desc: 'Quick style to finish the look.' },
          ].map((s, i) => (
            <div key={i} className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-2">{s.name}</h3>
              <p className="text-gray-400 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <div className="bg-gray-800 rounded-lg p-6 inline-block">
            <p className="text-4xl font-bold text-amber-500">$20</p>
            <p className="text-gray-400 mt-2">Quick touch-up between cuts</p>
          </div>
        </div>
      </div>
    </section>

    <section className="py-16 bg-amber-500">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Need a Quick Clean-Up?</h2>
        <p className="text-gray-800 mb-6">Walk in for a line up — fast, affordable, and sharp.</p>
        <button onClick={handleCall} className="bg-gray-900 text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-gray-800 transition-colors inline-flex items-center">
          <Phone className="h-5 w-5 mr-2" /> (206) 399-9288
        </button>
      </div>
    </section>
  </PageLayout>
);

export default LineUpPage;
