import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Stats from './components/Stats';
import About from './components/About';
import Services from './components/Services';
import PhotoStrip from './components/PhotoStrip';
import Reviews from './components/Reviews';
import CallToAction from './components/CallToAction';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MobileCTA from './components/MobileCTA';
import { handleCall } from './utils/analytics';
import { useSEO } from './utils/useSEO';
import { PHONE_DISPLAY, SITE_URL } from './constants/business';

function App() {
  // Title leads with the highest-volume queries from GSC ("haircut near me",
  // "barbershop near me", "barber Auburn WA") rather than brand. Brand awareness
  // is fine — branded clicks already convert. Cold-search clicks are the gap.
  useSEO({
    title: 'Haircut Near Me | Barbershop in Auburn, WA | Hair Mechanics',
    description: `Looking for a haircut near you in Auburn, WA? Hair Mechanics is Auburn's top-rated barber shop — expert haircuts, fades, beard trims, and kids' cuts. Walk-ins welcome, open 7 days. Call ${PHONE_DISPLAY}.`,
    canonical: SITE_URL,
  });

  return (
    <div className="min-h-screen bg-dark-800 text-white">
      <Navbar onBook={handleCall} />
      <main>
        <Hero onBook={handleCall} />
        <Marquee />
        <Stats />
        <About />
        <Services />
        <PhotoStrip />
        <Reviews />
        <CallToAction />
        <Contact />
      </main>
      <Footer />
      <MobileCTA />
    </div>
  );
}

export default App;