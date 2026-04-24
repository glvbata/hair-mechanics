import { Phone } from 'lucide-react';
import { ReactNode } from 'react';
import { handleCall } from '../utils/analytics';
import { PHONE_DISPLAY } from '../constants/business';

interface CTABandProps {
  heading: ReactNode;
  subtext?: ReactNode;
}

/**
 * Gold call-to-action band used at the bottom of service + area pages.
 * Kills the duplicated "bg-gold-500 / dark button / phone" pattern.
 */
const CTABand = ({ heading, subtext }: CTABandProps) => (
  <section className="py-16 bg-gold-500">
    <div className="max-w-3xl mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">{heading}</h2>
      {subtext && <p className="text-gray-800 mb-6">{subtext}</p>}
      <button
        onClick={handleCall}
        className="bg-gray-900 text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-gray-800 transition-colors inline-flex items-center"
      >
        <Phone className="h-5 w-5 mr-2" /> {PHONE_DISPLAY}
      </button>
    </div>
  </section>
);

export default CTABand;
