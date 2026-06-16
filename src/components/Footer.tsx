import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Instagram, Facebook, Globe, Star } from 'lucide-react';
import { trackSocialClick } from '../utils/analytics';
import { ADDRESS, PHONE_DISPLAY, PHONE_TEL, SOCIAL } from '../constants/business';

const Footer = () => {
  // Toggle target depends on which language the visitor is currently on.
  // Spanish landing is the only ES page right now — everything else is EN.
  const { pathname } = useLocation();
  const isSpanish = pathname.startsWith('/barberia-auburn-wa');
  const langTarget = isSpanish ? '/' : '/barberia-auburn-wa';
  const langLabel = isSpanish ? 'English' : 'Español';

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="flex flex-col items-center sm:items-start">
            <div className="flex items-center mb-3">
              <picture>
                <source srcSet="/assets/Logo.webp" type="image/webp" />
                <img src="/assets/Logo.png" alt="Hair Mechanics Logo" className="h-10 w-auto rounded-md" width="40" height="40" />
              </picture>
              <span className="ml-3 text-xl font-bold tracking-wider text-white">HAIR MECHANICS</span>
            </div>
            <p className="text-gray-400 text-sm">Auburn's favorite barber shop.</p>
            <p className="text-gray-400 text-xs mt-1">{ADDRESS.full}</p>
            <a href={`tel:${PHONE_TEL}`} className="text-gold-500 hover:text-gold-400 text-sm mt-2 inline-flex items-center">
              <Phone className="h-3.5 w-3.5 mr-1.5" /> {PHONE_DISPLAY}
            </a>
            <a
              href={SOCIAL.review}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackSocialClick('review')}
              className="text-gray-400 hover:text-gold-500 text-sm mt-2 inline-flex items-center"
            >
              <Star className="h-3.5 w-3.5 mr-1.5" /> Leave a Google review
            </a>
            <div className="flex space-x-3 mt-3">
              <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold-500 transition-colors" aria-label="Instagram" onClick={() => trackSocialClick('instagram')}>
                <Instagram className="h-5 w-5" />
              </a>
              <a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold-500 transition-colors" aria-label="Facebook" onClick={() => trackSocialClick('facebook')}>
                <Facebook className="h-5 w-5" />
              </a>
              <a href={SOCIAL.tiktok} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold-500 transition-colors" aria-label="TikTok" onClick={() => trackSocialClick('tiktok')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/><path d="M15 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/><path d="M15 8v8a4 4 0 0 1-4 4"/><line x1="15" y1="4" x2="15" y2="12"/></svg>
              </a>
              <a href={SOCIAL.google} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold-500 transition-colors" aria-label="Google Business Profile" onClick={() => trackSocialClick('google')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="text-center sm:text-left">
            <h3 className="text-sm font-bold text-gold-500 uppercase tracking-wider mb-3">Services</h3>
            <ul className="space-y-1.5 text-sm">
              <li><Link to="/services/haircut" className="text-gray-400 hover:text-gold-500 transition-colors">Haircuts</Link></li>
              <li><Link to="/services/fade" className="text-gray-400 hover:text-gold-500 transition-colors">Fades</Link></li>
              <li><Link to="/services/beard-trim" className="text-gray-400 hover:text-gold-500 transition-colors">Beard Trim</Link></li>
              <li><Link to="/services/kids-cut" className="text-gray-400 hover:text-gold-500 transition-colors">Kids Cuts</Link></li>
              <li><Link to="/services/line-up" className="text-gray-400 hover:text-gold-500 transition-colors">Line Up / Trim</Link></li>
              <li><Link to="/filipino-barber-auburn" className="text-gray-400 hover:text-gold-500 transition-colors">Filipino Barber</Link></li>
              <li><Link to="/barberia-auburn-wa" className="text-gray-400 hover:text-gold-500 transition-colors">Barbería (Español)</Link></li>
              <li><Link to="/team" className="text-gray-400 hover:text-gold-500 transition-colors">Our Team</Link></li>
            </ul>
          </div>

          {/* Areas Served */}
          <div className="text-center sm:text-left">
            <h3 className="text-sm font-bold text-gold-500 uppercase tracking-wider mb-3">Areas We Serve</h3>
            <ul className="space-y-1.5 text-sm">
              <li><Link to="/auburn-barber" className="text-gray-400 hover:text-gold-500 transition-colors">Auburn, WA</Link></li>
              <li><Link to="/kent-barber" className="text-gray-400 hover:text-gold-500 transition-colors">Kent, WA</Link></li>
              <li><Link to="/federal-way-barber" className="text-gray-400 hover:text-gold-500 transition-colors">Federal Way, WA</Link></li>
              <li><Link to="/sumner-barber" className="text-gray-400 hover:text-gold-500 transition-colors">Sumner, WA</Link></li>
              <li><Link to="/puyallup-barber" className="text-gray-400 hover:text-gold-500 transition-colors">Puyallup, WA</Link></li>
              <li><Link to="/renton-barber" className="text-gray-400 hover:text-gold-500 transition-colors">Renton, WA</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Hair Mechanics. All rights reserved.
          </p>
          <Link
            to={langTarget}
            hrefLang={isSpanish ? 'en' : 'es'}
            className="text-gray-400 hover:text-gold-500 transition-colors text-sm inline-flex items-center"
            aria-label={isSpanish ? 'Switch to English' : 'Cambiar a Español'}
          >
            <Globe className="h-4 w-4 mr-1.5" />
            {langLabel}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;