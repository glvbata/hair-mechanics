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