import React from 'react';
import { Phone } from 'lucide-react';
import { trackSMSClick } from '../utils/analytics';
import { handleCall } from '../utils/analytics';

const CallToAction = () => {
  return (
    <section className="relative bg-dark-900 overflow-hidden py-28">
      {/* Decorative background text */}
      <div
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-display font-bold uppercase text-white/[0.03] whitespace-nowrap leading-none"
          style={{ fontSize: 'clamp(6rem, 20vw, 18rem)' }}
        >
          HAIR MECHANICS
        </span>
      </div>

      {/* Gold top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gold-500/30" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="block w-10 h-0.5 bg-gold-500"></span>
          <span className="font-display text-gold-500 text-sm tracking-[0.3em] uppercase">Walk-Ins Welcome</span>
          <span className="block w-10 h-0.5 bg-gold-500"></span>
        </div>

        <h2 className="font-display font-bold uppercase leading-none text-white"
          style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}>
          Ready for a<br /><span className="text-gold-500">Fresh Cut?</span>
        </h2>

        <p className="mt-8 text-gray-400 text-lg max-w-md mx-auto">
          No appointment needed. Just walk in — we're open 7 days a week.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleCall}
            className="btn-primary text-lg inline-flex items-center gap-3 px-10 py-4"
          >
            <Phone className="h-5 w-5" />
            (206) 399-9288
          </button>
          <a
            href="sms:+12063999288?body=Hi, I'd like to book a haircut at Hair Mechanics"
            onClick={trackSMSClick}
            className="btn-secondary text-base inline-flex items-center gap-2 px-8 py-4"
          >
            💬 Text to Book
          </a>
        </div>

        <p className="mt-6 text-gray-600 text-sm tracking-wider">
          MON–FRI 10AM–8PM · SAT–SUN 8AM–8PM · 1251 A STREET NE, AUBURN WA
        </p>
      </div>
    </section>
  );
};

export default CallToAction;
