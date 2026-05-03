import { Link } from 'react-router-dom';
import { Home, Phone, MapPin } from 'lucide-react';
import { useSEO } from '../utils/useSEO';
import { handleCall } from '../utils/analytics';
import { ADDRESS, PHONE_DISPLAY, PHONE_TEL, SOCIAL } from '../constants/business';

const QUICK_LINKS = [
  { to: '/services/haircut', label: "Men's Haircut" },
  { to: '/services/fade', label: 'Fade' },
  { to: '/services/beard-trim', label: 'Haircut + Beard' },
  { to: '/services/kids-cut', label: 'Kids Cut' },
  { to: '/services/line-up', label: 'Line Up' },
  { to: '/gallery', label: 'Gallery' },
];

const AREAS = [
  { to: '/auburn-barber', label: 'Auburn' },
  { to: '/kent-barber', label: 'Kent' },
  { to: '/federal-way-barber', label: 'Federal Way' },
  { to: '/renton-barber', label: 'Renton' },
  { to: '/sumner-barber', label: 'Sumner' },
  { to: '/puyallup-barber', label: 'Puyallup' },
];

const NotFound = () => {
  useSEO({
    title: 'Page Not Found | Hair Mechanics Auburn WA',
    description: `The page you're looking for has moved or doesn't exist. Visit Hair Mechanics — Auburn's top-rated barber shop. Call ${PHONE_DISPLAY}.`,
  });

  return (
    <div className="min-h-screen bg-dark-800 text-white flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-2xl w-full">
        <img src="/assets/Logo.png" alt="Hair Mechanics" className="h-16 w-auto mx-auto mb-8 rounded-md" />
        <h1 className="text-6xl font-bold text-gold-500 mb-4">404</h1>
        <p className="text-xl text-gray-300 mb-2">Page not found</p>
        <p className="text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved — but we're still right here in Auburn, ready for your next cut.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-gold-500 text-gray-900 px-6 py-3 rounded-md font-medium hover:bg-gold-400 transition-colors"
          >
            <Home className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
          <button
            onClick={handleCall}
            className="inline-flex items-center justify-center border-2 border-gold-500 text-gold-500 px-6 py-3 rounded-md font-medium hover:bg-gold-500 hover:text-gray-900 transition-colors"
          >
            <Phone className="h-5 w-5 mr-2" />
            Call {PHONE_DISPLAY}
          </button>
          <a
            href={SOCIAL.directions}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center border-2 border-gold-500 text-gold-500 px-6 py-3 rounded-md font-medium hover:bg-gold-500 hover:text-gray-900 transition-colors"
          >
            <MapPin className="h-5 w-5 mr-2" />
            Get Directions
          </a>
        </div>

        <div className="grid sm:grid-cols-2 gap-8 text-left">
          <div>
            <h2 className="text-sm font-bold text-gold-500 uppercase tracking-wider mb-3">Popular Services</h2>
            <ul className="space-y-1.5 text-sm">
              {QUICK_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-gray-300 hover:text-gold-500 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-bold text-gold-500 uppercase tracking-wider mb-3">Areas We Serve</h2>
            <ul className="space-y-1.5 text-sm">
              {AREAS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-gray-300 hover:text-gold-500 transition-colors">
                    Barber near {link.label}, WA
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-gray-500 text-xs mt-12">
          Hair Mechanics · {ADDRESS.full} · <a href={`tel:${PHONE_TEL}`} className="hover:text-gold-500">{PHONE_DISPLAY}</a>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
