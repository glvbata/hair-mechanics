import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { handleCall } from './utils/analytics';

function App() {
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