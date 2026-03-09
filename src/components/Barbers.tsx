import React from 'react';
import { Instagram, Star, Calendar } from 'lucide-react';

const barbers = [
  {
    name: "James Wilson",
    title: "Master Barber",
    experience: "15 years",
    specialties: ["Classic Cuts", "Razor Fades", "Beard Sculpting"],
    image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    instagram: "@jameswilsoncuts",
    rating: 4.9,
    reviews: 847
  },
  {
    name: "Michael Rodriguez",
    title: "Style Specialist",
    experience: "12 years",
    specialties: ["Modern Styles", "Hair Design", "Color Treatment"],
    image: "https://images.unsplash.com/photo-1582893561942-d61adcb2e534?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    instagram: "@michaelrodcuts",
    rating: 4.8,
    reviews: 635
  },
  {
    name: "David Chen",
    title: "Texture Expert",
    experience: "10 years",
    specialties: ["Asian Hair", "Textured Cuts", "Precision Styling"],
    image: "https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    instagram: "@davidchencuts",
    rating: 4.9,
    reviews: 542
  }
];

const Barbers = ({ onBook }: { onBook: (barber: string) => void }) => {
  return (
    <section id="barbers" className="py-24 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          <span className="text-amber-500">Meet Our Expert Barbers</span>
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {barbers.map((barber, index) => (
            <div key={index} className="bg-gray-900 rounded-lg overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300">
              <img 
                src={barber.image} 
                alt={barber.name}
                className="w-full h-80 object-cover"
              />
              
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">{barber.name}</h3>
                  <a 
                    href={`https://instagram.com/${barber.instagram}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-amber-500 hover:text-amber-400"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                </div>
                
                <p className="text-amber-500 font-medium mb-2">{barber.title}</p>
                <p className="text-gray-400 mb-4">{barber.experience} Experience</p>
                
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <Star className="h-5 w-5 text-amber-500 fill-current" />
                    <span className="ml-2">{barber.rating} ({barber.reviews} reviews)</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Specialties:</h4>
                  <div className="flex flex-wrap gap-2">
                    {barber.specialties.map((specialty, i) => (
                      <span 
                        key={i}
                        className="bg-gray-800 text-sm px-3 py-1 rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button
                  onClick={() => onBook(barber.name)}
                  className="w-full bg-amber-500 text-gray-900 px-4 py-2 rounded-md font-medium hover:bg-amber-400 transition-colors flex items-center justify-center"
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Book with {barber.name.split(' ')[0]}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Barbers;