import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { handleCall } from './utils/analytics';
import { useSEO } from './utils/useSEO';

function App() {
  useSEO({
    title: 'Hair Mechanics | Auburn Barber Shop & Haircuts Near Me | (206) 399-9288',
    description: "Hair Mechanics is Auburn's top-rated barber shop. Expert barbers specializing in haircuts, fades, beard trims, and styling for men, women, and kids. Walk-ins welcome. Open 7 days. Call (206) 399-9288.",
    canonical: 'https://hairmechanics.net',
  });

  return (
    <div className="min-h-screen bg-dark-800 text-white">
      <Navbar onBook={handleCall} />
      <main>
        <Hero onBook={handleCall} />
        <About />
        <Services />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;