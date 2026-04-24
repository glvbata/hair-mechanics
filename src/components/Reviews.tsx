import React from 'react';
import { Star } from 'lucide-react';
import { trackReviewClick } from '../utils/analytics';
import { useScrollAnimation } from '../utils/useScrollAnimation';
import { RATING, REVIEWS_COUNT, SOCIAL } from '../constants/business';

// Full review quotes live here rather than in business constants — they're
// display copy specific to this block.
const reviews = [
  {
    name: 'Ricky M.',
    rating: 5,
    text: "I've been bouncing around looking for someone who can really cut my hair and do a really good job. Glen, the owner, is absolutely amazing with what he does. He really puts a lot of effort into making sure that you like what he's doing. The place is nice, clean, and roomy!",
  },
  {
    name: 'khon meckdara',
    rating: 5,
    text: "Glen is a great barber, he's been cutting my hair for years. The shop is very modern and clean. I'm glad that I found a barber that can cut my type of hair.",
  },
];

const Reviews = () => {
  const ref = useScrollAnimation<HTMLElement>();

  return (
    <section id="reviews" ref={ref} className="py-24 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="fade-up flex items-center gap-3 mb-4">
          <span className="block w-10 h-0.5 bg-gold-500"></span>
          <span className="font-display text-gold-500 text-sm tracking-[0.3em] uppercase">Client Reviews</span>
        </div>
        <h2 className="font-display font-bold uppercase leading-none text-white mb-3"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
          What Our <span className="text-gold-500">Clients Say</span>
        </h2>
        <p className="text-gray-500 mb-14 text-sm tracking-wider">{RATING} OUT OF 5 · {REVIEWS_COUNT} REVIEWS ON GOOGLE</p>

        {/* Editorial pull-quote cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
          {reviews.map((review, index) => (
            <div key={index} className={`fade-up fade-up-delay-${index + 1} bg-dark-800 border border-dark-700 p-8 relative`}>
              {/* Giant decorative quote mark */}
              <span className="absolute top-4 right-6 font-display text-8xl text-gold-500/10 leading-none select-none pointer-events-none">"</span>

              <div className="flex mb-5">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-gold-500 fill-current" />
                ))}
              </div>
              <p className="text-gray-200 text-lg leading-relaxed mb-6 relative z-10">"{review.text}"</p>
              <div className="flex items-center gap-3">
                <span className="w-8 h-0.5 bg-gold-500"></span>
                <p className="font-display uppercase tracking-widest text-sm text-gold-500">{review.name}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-start gap-4">
          <a
            href={SOCIAL.review}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
            onClick={trackReviewClick}
          >
            <Star className="h-4 w-4 fill-current" />
            Leave a Review
          </a>
          <a
            href={SOCIAL.review}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gold-500 transition-colors text-sm underline underline-offset-4 self-center"
            onClick={trackReviewClick}
          >
            See all {REVIEWS_COUNT} reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
