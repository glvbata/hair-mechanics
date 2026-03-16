import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="flex flex-col items-center sm:items-start">
            <div className="flex items-center mb-3">
              <img src="/assets/Logo.png" alt="Hair Mechanics Logo" className="h-10 w-auto rounded-md" />
              <span className="ml-3 text-xl font-bold tracking-wider text-white">HAIR MECHANICS</span>
            </div>
            <p className="text-gray-400 text-sm">Auburn's favorite barber shop.</p>
            <p className="text-gray-500 text-xs mt-1">1251 A St, Auburn, WA 98001</p>
          </div>

          {/* Services */}
          <div className="text-center sm:text-left">
            <h3 className="text-sm font-bold text-amber-500 uppercase tracking-wider mb-3">Services</h3>
            <ul className="space-y-1.5 text-sm">
              <li><Link to="/services/haircut" className="text-gray-400 hover:text-amber-500 transition-colors">Haircuts</Link></li>
              <li><Link to="/services/fade" className="text-gray-400 hover:text-amber-500 transition-colors">Fades</Link></li>
              <li><Link to="/services/beard-trim" className="text-gray-400 hover:text-amber-500 transition-colors">Beard Trim</Link></li>
              <li><Link to="/services/kids-cut" className="text-gray-400 hover:text-amber-500 transition-colors">Kids Cuts</Link></li>
              <li><Link to="/services/womens-cut" className="text-gray-400 hover:text-amber-500 transition-colors">Women's Cuts</Link></li>
              <li><Link to="/services/line-up" className="text-gray-400 hover:text-amber-500 transition-colors">Line Up</Link></li>
            </ul>
          </div>

          {/* Areas Served */}
          <div className="text-center sm:text-left">
            <h3 className="text-sm font-bold text-amber-500 uppercase tracking-wider mb-3">Areas We Serve</h3>
            <ul className="space-y-1.5 text-sm">
              <li><Link to="/auburn-barber" className="text-gray-400 hover:text-amber-500 transition-colors">Auburn, WA</Link></li>
              <li><Link to="/kent-barber" className="text-gray-400 hover:text-amber-500 transition-colors">Kent, WA</Link></li>
              <li><Link to="/federal-way-barber" className="text-gray-400 hover:text-amber-500 transition-colors">Federal Way, WA</Link></li>
              <li><Link to="/sumner-barber" className="text-gray-400 hover:text-amber-500 transition-colors">Sumner, WA</Link></li>
              <li><Link to="/puyallup-barber" className="text-gray-400 hover:text-amber-500 transition-colors">Puyallup, WA</Link></li>
              <li><Link to="/renton-barber" className="text-gray-400 hover:text-amber-500 transition-colors">Renton, WA</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Hair Mechanics. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;