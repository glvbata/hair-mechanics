import React from 'react';
import { Star } from 'lucide-react';
import { trackReviewClick } from '../utils/analytics';

const reviews = [
  {
    name: "Ricky M.",
    rating: 5,
    text: "I've been bouncing around looking for someone who can really cut my hair and do a really good job. Glen, the owner, is absolutely amazing with what he does. He really puts a lot of effort into making sure that you like what he's doing. The place is nice, clean, and roomy!",
  },
  {
    name: "khon meckdara",
    rating: 5,
    text: "Glen is a great barber, he's been cutting my hair for years. The shop is very modern and clean. I'm glad that I found a barber that can cut my type of hair.",
  },
];

const Reviews = () => {
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "BarberShop",
    "name": "Hair Mechanics LLC",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.5",
      "reviewCount": "83",
      "bestRating": "5"
    },
    "review": reviews.map(r => ({
      "@type": "Review",
      "author": { "@type": "Person", "name": r.name },
      "reviewRating": { "@type": "Rating", "ratingValue": String(r.rating), "bestRating": "5" },
      "reviewBody": r.text
    }))
  };

  return (
    <section id="reviews" className="py-24 bg-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-4">
          <span className="text-amber-500">Client Reviews</span>
        </h2>
        <p className="text-center text-gray-400 mb-10">4.5 out of 5 stars — 83 reviews on Google</p>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
            onClick={trackReviewClick}
          >
            ⭐ Leave Us a Review on Google
          </a>
          <p className="text-gray-500 text-sm">
            <a href="https://g.page/r/Cc2wjU_thhsrEAI/review" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors underline" onClick={trackReviewClick}>
              See all reviews on Google
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Reviews;