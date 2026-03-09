import React from 'react';
import { Star } from 'lucide-react';

const reviews = [
  {
    name: "John Smith",
    rating: 5,
    text: "Best haircut I've ever had. The attention to detail is amazing.",
  },
  {
    name: "Mike Johnson",
    rating: 5,
    text: "Great atmosphere and even better service. Highly recommended!",
  },
  {
    name: "David Wilson",
    rating: 5,
    text: "Professional service and amazing results every time.",
  },
];

const Reviews = () => {
  return (
    <section id="reviews" className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          <span className="text-amber-500">Client Reviews</span>
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg">
              <div className="flex mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-amber-500 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-4">"{review.text}"</p>
              <p className="font-medium">{review.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;