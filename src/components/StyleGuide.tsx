import React, { useState } from 'react';
import { Search, Filter, Camera } from 'lucide-react';

const styles = [
  {
    name: "Classic Fade",
    category: "Modern",
    difficulty: "Medium",
    maintenanceLevel: "Low",
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Clean and timeless look with graduated fading on the sides."
  },
  {
    name: "Textured Crop",
    category: "Trendy",
    difficulty: "Low",
    maintenanceLevel: "Low",
    image: "https://images.unsplash.com/photo-1620975444538-6c97d4e38d5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Modern and effortless style with natural texture on top."
  },
  {
    name: "Pompadour",
    category: "Classic",
    difficulty: "High",
    maintenanceLevel: "High",
    image: "https://images.unsplash.com/photo-1621607512214-68297480165e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Iconic style with volume and sweep-back on top."
  }
];

const categories = ["All", "Modern", "Trendy", "Classic"];

const StyleGuide = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStyles = styles.filter(style => 
    (selectedCategory === "All" || style.category === selectedCategory) &&
    style.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="styles" className="py-24 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          <span className="text-amber-500">Style Guide</span>
        </h2>
        
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search styles..."
                className="w-full pl-10 pr-4 py-2 bg-gray-900 rounded-md focus:ring-2 focus:ring-amber-500 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-md ${
                    selectedCategory === category
                      ? 'bg-amber-500 text-gray-900'
                      : 'bg-gray-900 text-gray-300 hover:bg-gray-700'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {filteredStyles.map((style, index) => (
            <div key={index} className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
              <div className="relative">
                <img 
                  src={style.image} 
                  alt={style.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span className="bg-amber-500 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                    {style.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{style.name}</h3>
                <p className="text-gray-400 mb-4">{style.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <span className="text-sm text-gray-400">Difficulty</span>
                    <p className="font-medium">{style.difficulty}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-400">Maintenance</span>
                    <p className="font-medium">{style.maintenanceLevel}</p>
                  </div>
                </div>
                
                <button className="w-full bg-amber-500 text-gray-900 px-4 py-2 rounded-md font-medium hover:bg-amber-400 transition-colors flex items-center justify-center">
                  <Camera className="h-5 w-5 mr-2" />
                  Try Virtual Style
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StyleGuide;