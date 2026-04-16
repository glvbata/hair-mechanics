import React, { useEffect, useState } from 'react';
import { Phone } from 'lucide-react';
import { handleCall, trackSMSClick } from '../utils/analytics';

const MobileCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show after scrolling past ~100vh
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      {/* Safe area padding for notched phones */}
      <div className="bg-dark-900 border-t border-dark-700 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] flex gap-3">
        <button
          onClick={handleCall}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-gold-500 text-dark-900 font-display font-bold uppercase tracking-wider text-sm py-3.5 rounded-lg"
        >
          <Phone className="h-4 w-4" />
          Call Now
        </button>
        <a
          href="sms:+12063999288?body=Hi, I'd like to book a haircut at Hair Mechanics"
          onClick={trackSMSClick}
          className="flex-1 inline-flex items-center justify-center gap-2 border-2 border-gold-500 text-gold-500 font-display font-bold uppercase tracking-wider text-sm py-3.5 rounded-lg"
        >
          💬 Text Us
        </a>
      </div>
    </div>
  );
};

export default MobileCTA;
