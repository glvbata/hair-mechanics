import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// Hand-picked variety — fades, crops, beards, different angles
const photos = [
  { src: '/assets/haircuts/117177259_171243871267999_2539513688223642210_n.jpg', alt: 'Clean fade haircut by Hair Mechanics Auburn WA' },
  { src: '/assets/haircuts/117212049_171243447934708_1504320330852135190_n.jpg', alt: 'Precision taper fade Auburn barber' },
  { src: '/assets/haircuts/117306837_171243944601325_3137892813058056448_n.jpg', alt: 'Fresh haircut and beard trim Hair Mechanics' },
  { src: '/assets/haircuts/117339330_171243734601346_3884303529806118020_n.jpg', alt: 'Skin fade with lineup Auburn WA' },
  { src: '/assets/haircuts/118583704_178697420522644_9112869283729704689_n.jpg', alt: 'Expert barbering work at Hair Mechanics Auburn' },
  { src: '/assets/haircuts/117246166_171243501268036_6943416825657207028_n.jpg', alt: 'Low fade haircut Auburn barbershop' },
  { src: '/assets/haircuts/117301459_171243674601352_9128453643540599895_n.jpg', alt: 'High fade and beard shape Auburn WA barber' },
];

const PhotoStrip = () => {
  return (
    <section className="bg-dark-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="block w-10 h-0.5 bg-gold-500"></span>
              <span className="font-display text-gold-500 text-sm tracking-[0.3em] uppercase">Our Work</span>
            </div>
            <h2 className="font-display font-bold uppercase leading-none text-white"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              Fresh Cuts, <span className="text-gold-500">Every Time</span>
            </h2>
          </div>
          <Link
            to="/gallery"
            className="hidden sm:inline-flex items-center gap-2 text-gold-500 hover:text-gold-400 font-display text-sm uppercase tracking-widest transition-colors shrink-0 mb-1"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Horizontal scroll strip */}
      <div className="flex gap-3 overflow-x-auto pl-4 sm:pl-8 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] pr-4 pb-4 snap-x snap-mandatory no-scrollbar">
        {photos.map((photo, i) => (
          <div
            key={i}
            className="relative flex-none w-56 sm:w-72 h-80 sm:h-96 snap-start overflow-hidden group"
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            {/* Subtle hover overlay */}
            <div className="absolute inset-0 bg-dark-900/0 group-hover:bg-dark-900/20 transition-colors duration-300" />
          </div>
        ))}

        {/* Final "See More" tile */}
        <Link
          to="/gallery"
          className="flex-none w-56 sm:w-72 h-80 sm:h-96 snap-start bg-dark-800 border border-dark-700 hover:border-gold-500 flex flex-col items-center justify-center gap-4 transition-colors group"
        >
          <ArrowRight className="h-8 w-8 text-gold-500 group-hover:translate-x-1 transition-transform" />
          <span className="font-display uppercase tracking-widest text-sm text-white">View Gallery</span>
        </Link>
      </div>

      {/* Mobile link */}
      <div className="text-center mt-6 sm:hidden">
        <Link
          to="/gallery"
          className="inline-flex items-center gap-2 text-gold-500 font-display text-sm uppercase tracking-widest"
        >
          View Full Gallery <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
};

export default PhotoStrip;
