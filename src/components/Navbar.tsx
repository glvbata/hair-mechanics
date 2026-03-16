import React, { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface NavbarProps {
  onBook: () => void;
}

const Navbar = ({ onBook }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSectionNavigation = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    
    // If we're on the home page, scroll to the section
    if (window.location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If we're on another page, navigate to home with the hash
      navigate(`/#${sectionId}`);
    }
    
    // Close mobile menu if open
    setIsOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 bg-dark-900/95 backdrop-blur-sm border-b border-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/assets/Logo.png" 
                alt="Hair Mechanics Logo" 
                className="h-10 w-auto rounded-md"
              />
              <span className="ml-3 text-xl font-bold tracking-wider text-white">HAIR MECHANICS</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-300 hover:text-gold-500 transition-colors">Home</Link>
            <a 
              href="/#about" 
              className="text-gray-300 hover:text-gold-500 transition-colors"
              onClick={(e) => handleSectionNavigation(e, 'about')}
            >
              About
            </a>
            <a 
              href="/#services" 
              className="text-gray-300 hover:text-gold-500 transition-colors"
              onClick={(e) => handleSectionNavigation(e, 'services')}
            >
              Services
            </a>
            <Link to="/gallery" className="text-gray-300 hover:text-gold-500 transition-colors">Gallery</Link>
            <a 
              href="/#contact" 
              className="text-gray-300 hover:text-gold-500 transition-colors"
              onClick={(e) => handleSectionNavigation(e, 'contact')}
            >
              Contact
            </a>
            <button 
              onClick={onBook}
              className="btn-primary inline-flex items-center"
              aria-label="Call to book appointment"
            >
              <Phone className="h-5 w-5 mr-2" />
              Call to Book
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-gray-300 hover:text-gold-500"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-dark-900 border-t border-dark-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="block px-3 py-2 text-gray-300 hover:text-gold-500 hover:bg-dark-800 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <a 
              href="/#about" 
              className="block px-3 py-2 text-gray-300 hover:text-gold-500 hover:bg-dark-800 rounded-md"
              onClick={(e) => handleSectionNavigation(e, 'about')}
            >
              About
            </a>
            <a 
              href="/#services" 
              className="block px-3 py-2 text-gray-300 hover:text-gold-500 hover:bg-dark-800 rounded-md"
              onClick={(e) => handleSectionNavigation(e, 'services')}
            >
              Services
            </a>
            <Link 
              to="/gallery" 
              className="block px-3 py-2 text-gray-300 hover:text-gold-500 hover:bg-dark-800 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Gallery
            </Link>
            <a 
              href="/#contact" 
              className="block px-3 py-2 text-gray-300 hover:text-gold-500 hover:bg-dark-800 rounded-md"
              onClick={(e) => handleSectionNavigation(e, 'contact')}
            >
              Contact
            </a>
            <button 
              onClick={() => {
                onBook();
                setIsOpen(false);
              }}
              className="w-full btn-primary mt-4 inline-flex items-center justify-center"
              aria-label="Call to book appointment"
            >
              <Phone className="h-5 w-5 mr-2" />
              Call to Book
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;