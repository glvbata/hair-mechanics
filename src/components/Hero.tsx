import React from 'react';
import { Phone, ArrowDown } from 'lucide-react';
import { trackSMSClick } from '../utils/analytics';
import { PHONE_DISPLAY, PHONE_SMS } from '../constants/business';

interface HeroProps {
  onBook: () => void;
}

const Hero = ({ onBook }: HeroProps) => {
  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-end">
      {/* Full-bleed background photo */}
      <picture className="absolute inset-0">
        <source srcSet="/assets/HeroImage.webp" type="image/webp" />
        {/* eslint-disable-next-line */}
        <img
          src="/assets/HeroImage.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
          {...({ fetchpriority: 'high' } as React.ImgHTMLAttributes<HTMLImageElement>)}
          decoding="async"
        />
      </picture>

      {/* Gradient overlay — fades from transparent at top to near-black at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/70 to-dark-900/20"></div>

      {/* Content — pinned to bottom of viewport */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pb-16 pt-32 max-w-7xl mx-auto w-full">

        {/* Eyebrow line */}
        <div className="flex items-center gap-3 mb-4">
          <span className="block w-10 h-0.5 bg-gold-500"></span>
          <span className="font-display text-gold-500 text-sm tracking-[0.3em] uppercase">Auburn, Washington · Haircut Near Me</span>
        </div>

        {/* Main headline — massive editorial typography. Keeps the "Auburn's
            Favorite Barber Shop" cadence (gold-on-white-on-gold rhythm) but
            picks up the highest-volume search phrase as a visible H1 tier. */}
        <h1 className="font-display font-bold uppercase leading-none">
          <span className="block text-white" style={{ fontSize: 'clamp(3.5rem, 12vw, 9rem)' }}>Auburn's</span>
          <span className="block text-gold-500" style={{ fontSize: 'clamp(3.5rem, 12vw, 9rem)' }}>Favorite</span>
          <span className="block text-white" style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}>Barber Shop</span>
        </h1>

        {/* Search-friendly subhead — high-volume queries as natural prose so
            Google sees the phrase match without making the design shouty. */}
        <p className="mt-6 max-w-2xl text-gray-200 text-lg sm:text-xl leading-relaxed">
          Looking for a <strong className="text-white">haircut near me</strong> in <strong className="text-white">Auburn, WA</strong>? Hair Mechanics is the top-rated <strong className="text-white">barbershop in Auburn</strong> — fresh fades, classic cuts, beard trims, and kids' haircuts. Walk in or call.
        </p>

        {/* Subline + CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <button
            onClick={onBook}
            className="btn-primary text-base inline-flex items-center"
            aria-label="Call to book your appointment"
          >
            <Phone className="h-4 w-4 mr-2" />
            Call: {PHONE_DISPLAY}
          </button>
          <a
            href={`sms:${PHONE_SMS}?body=Hi, I'd like to book a haircut at Hair Mechanics`}
            onClick={trackSMSClick}
            className="text-gray-300 hover:text-gold-500 transition-colors text-sm font-medium inline-flex items-center gap-2"
          >
            💬 Or text us to book
          </a>
          <span className="hidden sm:block text-dark-600">|</span>
          <span className="text-gray-400 text-sm">Walk-ins welcome · Open 7 days</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 text-gray-500 animate-bounce">
        <ArrowDown className="h-5 w-5" />
      </div>
    </section>
  );
};

export default Hero;
