import { useEffect, useState } from 'react';
import { Phone, MessageCircle, MapPin } from 'lucide-react';
import { handleCall, trackSMSClick, trackDirectionsClick } from '../utils/analytics';
import { PHONE_SMS, SOCIAL } from '../constants/business';

const MobileCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show after a short scroll so the bar appears almost immediately on mobile.
      setVisible(window.scrollY > 240);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="bg-dark-900 border-t border-dark-700 px-3 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] flex gap-2">
        <button
          onClick={handleCall}
          className="flex-[1.4] inline-flex items-center justify-center gap-1.5 bg-gold-500 text-dark-900 font-display font-bold uppercase tracking-wider text-xs py-3 rounded-lg"
          aria-label="Call Hair Mechanics now"
        >
          <Phone className="h-4 w-4" />
          Call
        </button>
        <a
          href={`sms:${PHONE_SMS}?body=Hi, I'd like to book a haircut at Hair Mechanics`}
          onClick={trackSMSClick}
          className="flex-1 inline-flex items-center justify-center gap-1.5 border border-gold-500 text-gold-500 font-display font-bold uppercase tracking-wider text-xs py-3 rounded-lg"
          aria-label="Text Hair Mechanics"
        >
          <MessageCircle className="h-4 w-4" />
          Text
        </a>
        <a
          href={SOCIAL.directions}
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackDirectionsClick}
          className="flex-1 inline-flex items-center justify-center gap-1.5 border border-gold-500 text-gold-500 font-display font-bold uppercase tracking-wider text-xs py-3 rounded-lg"
          aria-label="Get directions to Hair Mechanics"
        >
          <MapPin className="h-4 w-4" />
          Map
        </a>
      </div>
    </div>
  );
};

export default MobileCTA;
