import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const handleBooking = () => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', {
        send_to: 'AW-17956338356/ONVqCLjl6IgcELT1n_JC',
        value: 1.0,
        currency: 'USD',
      });
    }
    window.location.href = 'tel:+1-206-399-9288';
  };

  return (
    <div className="min-h-screen bg-dark-800 text-white">
      <Navbar onBook={handleBooking} />
      <main>
        <Hero onBook={handleBooking} />
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