import React from 'react';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
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
              <a href="https://www.instagram.com/hairmechanics1997" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-amber-500" aria-label="Follow us on Instagram">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="https://www.facebook.com/hairmechanics1997" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-amber-500" aria-label="Like us on Facebook">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://www.tiktok.com/@glencelestial" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-amber-500" aria-label="Follow us on TikTok">

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

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <a
                href="https://www.google.com/maps/place/Hair+Mechanics/@47.3073,-122.2285"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white px-5 py-2.5 rounded-md text-sm font-medium transition-colors"
              >
                <MapPin className="h-4 w-4 mr-2" />
                Get Directions
              </a>
              <a
                href="https://g.page/r/Cc2wjU_thhsrEAI/review"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-amber-500 hover:bg-amber-400 text-gray-900 px-5 py-2.5 rounded-md text-sm font-medium transition-colors"
              >
                ⭐ Leave Us a Review
              </a>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden h-80 md:h-auto">
            <iframe
              title="Hair Mechanics Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2706.5!2d-122.2285!3d47.3073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDE4JzI2LjMiTiAxMjLCsDEzJzQyLjYiVw!5e0!3m2!1sen!2sus!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '320px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;