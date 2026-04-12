import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Instagram, Facebook } from 'lucide-react';
import { trackSocialClick } from '../utils/analytics';

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
            <p className="text-gray-500 text-xs mt-1">1251 A Street NE, Auburn, WA 98002</p>
            <a href="tel:+1-206-399-9288" className="text-amber-500 hover:text-amber-400 text-sm mt-2 inline-flex items-center">
              <Phone className="h-3.5 w-3.5 mr-1.5" /> (206) 399-9288
            </a>
            <div className="flex space-x-3 mt-3">
              <a href="https://www.instagram.com/hairmechanics1997" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amber-500 transition-colors" aria-label="Instagram" onClick={() => trackSocialClick('instagram')}>
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.facebook.com/hairmechanics1997" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amber-500 transition-colors" aria-label="Facebook" onClick={() => trackSocialClick('facebook')}>
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://www.tiktok.com/@glencelestial" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amber-500 transition-colors" aria-label="TikTok" onClick={() => trackSocialClick('tiktok')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/><path d="M15 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/><path d="M15 8v8a4 4 0 0 1-4 4"/><line x1="15" y1="4" x2="15" y2="12"/></svg>
              </a>
              <a href="https://www.google.com/maps/place/Hair+Mechanics+LLC" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amber-500 transition-colors" aria-label="Google Business Profile" onClick={() => trackSocialClick('google')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="text-center sm:text-left">
            <h3 className="text-sm font-bold text-amber-500 uppercase tracking-wider mb-3">Services</h3>
            <ul className="space-y-1.5 text-sm">
              <li><Link to="/services/haircut" className="text-gray-400 hover:text-amber-500 transition-colors">Haircuts</Link></li>
              <li><Link to="/services/fade" className="text-gray-400 hover:text-amber-500 transition-colors">Fades</Link></li>
              <li><Link to="/services/beard-trim" className="text-gray-400 hover:text-amber-500 transition-colors">Beard Trim</Link></li>
              <li><Link to="/services/kids-cut" className="text-gray-400 hover:text-amber-500 transition-colors">Kids Cuts</Link></li>
              <li><Link to="/services/line-up" className="text-gray-400 hover:text-amber-500 transition-colors">Line Up / Trim</Link></li>
              <li><Link to="/team" className="text-gray-400 hover:text-amber-500 transition-colors">Our Team</Link></li>
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