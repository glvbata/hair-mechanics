import React from 'react';

const stats = [
  { value: '$40', label: 'HAIRCUTS FROM' },
  { value: '4.5★', label: 'GOOGLE RATING' },
  { value: '7 DAYS', label: 'OPEN EVERY WEEK' },
  { value: '5+ YRS', label: 'IN BUSINESS' },
];

const Stats = () => {
  return (
    <div className="bg-dark-900 border-y border-gold-500/30 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="text-center group">
              <p className="font-display font-bold text-gold-500 leading-none"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>
                {stat.value}
              </p>
              <p className="text-xs tracking-[0.2em] text-gray-500 mt-2 uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
