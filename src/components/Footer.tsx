import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center">
          <div className="flex items-center mb-4">
            <img 
              src="/assets/Logo.png" 
              alt="Hair Mechanics Logo" 
              className="h-10 w-auto rounded-md"
            />
            <span className="ml-3 text-xl font-bold tracking-wider text-white">HAIR MECHANICS</span>
          </div>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Hair Mechanics. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;