import { Link } from 'react-router-dom';
import { Home, Phone } from 'lucide-react';
import { useSEO } from '../utils/useSEO';

const NotFound = () => {
  useSEO({
    title: 'Page Not Found | Hair Mechanics',
    description: 'The page you are looking for does not exist. Visit Hair Mechanics barbershop in Auburn, WA.',
  });

  return (
    <div className="min-h-screen bg-dark-800 text-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <img src="/assets/Logo.png" alt="Hair Mechanics" className="h-16 w-auto mx-auto mb-8 rounded-md" />
        <h1 className="text-6xl font-bold text-amber-500 mb-4">404</h1>
        <p className="text-xl text-gray-300 mb-2">Page not found</p>
        <p className="text-gray-400 mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-amber-500 text-gray-900 px-6 py-3 rounded-md font-medium hover:bg-amber-400 transition-colors"
          >
            <Home className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
          <a
            href="tel:+1-206-399-9288"
            className="inline-flex items-center justify-center border-2 border-amber-500 text-amber-500 px-6 py-3 rounded-md font-medium hover:bg-amber-500 hover:text-gray-900 transition-colors"
          >
            <Phone className="h-5 w-5 mr-2" />
            Call Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
