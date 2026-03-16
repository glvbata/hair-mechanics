import React from 'react';
import { Phone } from 'lucide-react';

interface HeroProps {
  onBook: () => void;
}

const Hero = ({ onBook }: HeroProps) => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/assets/HeroImage.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-dark-900/80"></div>
      </div>
      
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
          <span className="block text-white">Auburn's Favorite</span>
          <span className="block text-gold-500 mt-2">Barber Shop</span>
        </h1>
        <p className="mt-6 text-xl sm:text-2xl max-w-lg mx-auto text-gray-300">
          Expert haircuts, clean fades, and beard trims — walk-ins welcome
        </p>
        <div className="mt-10 space-y-4">
          <button 
            onClick={onBook}
            className="btn-primary text-lg inline-flex items-center"
            aria-label="Call to book your appointment"
          >
            <Phone className="h-5 w-5 mr-2" />
            Call to Book: (206) 399-9288
          </button>
          <p className="text-sm text-gray-400">
            Weekdays: 10am - 8pm, Weekends: 8am - 8pm
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;