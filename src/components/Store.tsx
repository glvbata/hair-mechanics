import React from 'react';
import { ShoppingCart, Star, Plus } from 'lucide-react';

const products = [
  {
    name: "Premium Pomade",
    price: 24.99,
    rating: 4.8,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1627384113743-6bd5a479fffd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Professional-grade styling pomade for ultimate hold and shine."
  },
  {
    name: "Beard Oil Kit",
    price: 34.99,
    rating: 4.9,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1621607512214-68297480165e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Organic beard oil kit for maintenance and growth."
  },
  {
    name: "Luxury Shaving Set",
    price: 89.99,
    rating: 4.7,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1626808642875-0aa545482dfb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Complete premium shaving set with razor and brush."
  },
  {
    name: "Gift Card",
    price: 50,
    rating: 5.0,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1606663889134-b1dedb5ed8b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Perfect gift for any occasion. Valid for services and products."
  }
];

const Store = () => {
  return (
    <section id="store" className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          <span className="text-amber-500">Premium Products</span>
        </h2>
        
        <div className="grid md:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div key={index} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2">
                  <div className="flex items-center bg-gray-900/80 rounded-full px-2 py-1">
                    <Star className="h-4 w-4 text-amber-500 fill-current" />
                    <span className="ml-1 text-sm">{product.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">{product.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{product.description}</p>
                
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-amber-500">${product.price}</span>
                  <button className="bg-amber-500 text-gray-900 p-2 rounded-full hover:bg-amber-400 transition-colors">
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
                
                <p className="text-gray-500 text-sm mt-2">{product.reviews} reviews</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <button className="bg-amber-500 text-gray-900 px-8 py-3 rounded-md font-medium hover:bg-amber-400 transition-colors inline-flex items-center">
            <ShoppingCart className="h-5 w-5 mr-2" />
            View Full Store
          </button>
        </div>
      </div>
    </section>
  );
};

export default Store;