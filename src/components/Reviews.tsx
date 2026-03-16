import React from 'react';
import { Star } from 'lucide-react';

const reviews = [
  {
    name: "Marcus T.",
    rating: 5,
    text: "Been coming here for over a year now. Always leave looking fresh. The vibe is chill and the cuts are clean every single time.",
  },
  {
    name: "Ryan P.",
    rating: 5,
    text: "Drove 30 minutes to get here and it's worth every mile. They actually listen to what you want and nail it.",
  },
  {
    name: "Chris L.",
    rating: 5,
    text: "My go-to spot in Auburn. Walked in for a fade and beard trim, walked out feeling like a new man. Fair prices too.",
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
        
        <div className="text-center mt-10 space-y-3">
          <a
            href="https://g.page/r/Cc2wjU_thhsrEAI/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-amber-500 text-gray-900 px-6 py-3 rounded-md font-medium hover:bg-amber-400 transition-colors"
          >
            ⭐ Leave Us a Review on Google
          </a>
          <p className="text-gray-500 text-sm">
            <a href="https://g.page/r/Cc2wjU_thhsrEAI/review" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors underline">
              See all reviews on Google
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Reviews;