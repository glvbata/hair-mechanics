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

const MarqueeContent = ({ ariaHidden = false }: { ariaHidden?: boolean }) => (
  <div className="flex items-center shrink-0" aria-hidden={ariaHidden || undefined}>
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

// Two copies is enough for a seamless loop when the keyframe translates -50%.
// Second copy is aria-hidden so screen readers don't announce items twice.
const Marquee = () => (
  <div className="bg-gold-500 py-3 overflow-hidden">
    <div className="flex animate-marquee">
      <MarqueeContent />
      <MarqueeContent ariaHidden />
    </div>
  </div>
);

export default Marquee;
