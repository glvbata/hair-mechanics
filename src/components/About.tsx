import React from 'react';
import { Award, Clock, Scissors, Users } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-24 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold">
              <span className="text-amber-500">Auburn's Go-To Barber Shop</span>
            </h2>
            <p className="mt-4 text-gray-300 text-lg">
              Looking for a great haircut near Auburn? Hair Mechanics is more than just a barbershop — we're a neighborhood spot where you get expert cuts, clean fades, and quality beard work every time. Men, women, and kids welcome.
            </p>
            
            <div className="mt-8 space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-amber-500 rounded-md p-2">
                  <Award className="h-6 w-6 text-gray-900" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium">Expert Barbers</h3>
                  <p className="mt-1 text-gray-400">Our skilled team brings years of experience and continuous training to deliver precision cuts every time.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-amber-500 rounded-md p-2">
                  <Scissors className="h-6 w-6 text-gray-900" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium">Premium Service</h3>
                  <p className="mt-1 text-gray-400">From precision fades to expert styling, we provide luxury services at accessible prices.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-amber-500 rounded-md p-2">
                  <Clock className="h-6 w-6 text-gray-900" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium">Convenient Hours</h3>
                  <p className="mt-1 text-gray-400">Open 7 days a week with extended hours to accommodate your busy schedule.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-amber-500 rounded-md p-2">
                  <Users className="h-6 w-6 text-gray-900" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium">Community Focus</h3>
                  <p className="mt-1 text-gray-400">Proudly serving Auburn and surrounding communities with personalized attention to every client.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="group relative cursor-pointer overflow-hidden rounded-lg">
            <img 
              src="/assets/haircuts/118583704_178697420522644_9112869283729704689_n.jpg"
              alt="Professional Haircut"
              className="w-full h-[32rem] object-cover transform transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;