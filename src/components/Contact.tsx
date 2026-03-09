import React from 'react';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, GitBranch as BrandTiktok } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-1 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-8">
              <span className="text-amber-500">Get in Touch</span>
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-center">
                <MapPin className="h-6 w-6 text-amber-500 mr-4" />
                <p itemProp="address">1251 A St, Auburn, WA 98001, United States</p>
              </div>
              <div className="flex items-center">
                <Phone className="h-6 w-6 text-amber-500 mr-4" />
                <p itemProp="telephone">(206) 399-9288</p>
              </div>
              <div className="flex items-center">
                <Mail className="h-6 w-6 text-amber-500 mr-4" />
                <p itemProp="email">Hairmechanicsllc@yahoo.com</p>
              </div>
              <div className="flex items-center">
                <Clock className="h-6 w-6 text-amber-500 mr-4" />
                <div itemProp="openingHours">
                  <p>Weekdays: 10am - 8pm</p>
                  <p>Weekends: 8am - 8pm</p>
                </div>
              </div>
            </div>

            <div className="flex space-x-4 mt-8">
              <a href="https://instagram.com/hairmechanics" className="text-gray-300 hover:text-amber-500" aria-label="Follow us on Instagram">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="https://www.facebook.com/hairmechanics1997" className="text-gray-300 hover:text-amber-500" aria-label="Like us on Facebook">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://www.tiktok.com/@glencelestial" className="text-gray-300 hover:text-amber-500" aria-label="Follow us on TikTok">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="h-6 w-6"
                >
                  <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/>
                  <path d="M15 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
                  <path d="M15 8v8a4 4 0 0 1-4 4"/>
                  <line x1="15" y1="4" x2="15" y2="12"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;