import React from 'react';

const items = [
  'WALK-INS WELCOME',
  'OPEN 7 DAYS',
  'AUBURN, WA',
  'FRESH CUTS',
  'CLEAN FADES',
  'BEARD TRIMS',
  'FROM $40',
  'NO APPOINTMENT NEEDED',
  'WEEKENDS 8AM–8PM',
];

const MarqueeContent = () => (
  <div className="flex items-center shrink-0">
    {items.map((item, i) => (
      <React.Fragment key={i}>
        <span className="font-display font-bold uppercase tracking-widest text-sm text-dark-900 whitespace-nowrap px-2">
          {item}
        </span>
        <span className="text-dark-900/40 text-lg mx-2">·</span>
      </React.Fragment>
    ))}
  </div>
);

const Marquee = () => {
  return (
    <div className="bg-gold-500 py-3 overflow-hidden">
      <div className="flex animate-marquee">
        {/* Duplicate 4x so the loop is seamless at any screen size */}
        <MarqueeContent />
        <MarqueeContent />
        <MarqueeContent />
        <MarqueeContent />
      </div>
    </div>
  );
};

export default Marquee;
