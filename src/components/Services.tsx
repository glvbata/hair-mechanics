import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { useScrollAnimation } from '../utils/useScrollAnimation';
import { getService } from '../constants/business';

// Homepage service cards — price comes from business.ts SERVICES; `includes`
// and short descriptions stay local to this component.
const SERVICE_CARDS: readonly {
  slug: string;
  title: string;
  shortDescription: string;
  includes: string[];
}[] = [
  {
    slug: 'haircut',
    title: 'Haircut',
    shortDescription: 'Precision haircut with styling',
    includes: ['Consultation', 'Precision Cut', 'Style'],
  },
  {
    slug: 'beard-trim',
    title: 'Haircut & Beard',
    shortDescription: 'Complete grooming experience',
    includes: ['Haircut', 'Beard Trim & Shape', 'Line Up', 'Style'],
  },
  {
    slug: 'kids-cut',
    title: 'Kids Cut',
    shortDescription: 'Ages 12 and under',
    includes: ['Consultation', 'Cut', 'Style'],
  },
  {
    slug: 'line-up',
    title: 'Line Up / Trim',
    shortDescription: 'Quick touch-up between cuts',
    includes: ['Neck Trim', 'Line Up', 'Light Styling'],
  },
];

const FAQ = [
  {
    question: "How often should I get a haircut?",
    answer: "For most styles, we recommend every 3-4 weeks to maintain the shape and look. However, this can vary based on your hair type and desired style."
  },
  {
    question: "Do you take walk-ins?",
    answer: "Yes! Both walk-ins and appointments are welcome. While we do our best to accommodate everyone, we recommend booking an appointment to ensure availability and minimize wait times."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, cash, Apple Pay, and Google Pay."
  },
  {
    question: "Is parking available?",
    answer: "Yes, we have free parking available at the side of the shop and additional street parking nearby."
  },
  {
    question: "Is the shop wheelchair accessible?",
    answer: "Yes! We have a wheelchair accessible entrance and parking lot. A restroom is also available on-site."
  }
];

const Services = () => {
  const [openFAQ, setOpenFAQ] = React.useState<number | null>(null);
  const ref = useScrollAnimation<HTMLElement>();

  // FAQ Schema for Google rich results
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <section id="services" ref={ref} className="py-24 bg-dark-800">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="fade-up flex items-center gap-3 mb-4">
          <span className="block w-10 h-0.5 bg-gold-500"></span>
          <span className="font-display text-gold-500 text-sm tracking-[0.3em] uppercase">What We Offer</span>
        </div>
        <h2 className="font-display font-bold uppercase leading-none text-white mb-16"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
          Services <span className="text-gold-500">&</span> Pricing
        </h2>

        {/* Editorial service cards — gold left border, large price */}
        <div className="grid md:grid-cols-2 gap-4 mb-24">
          {SERVICE_CARDS.map((card, index) => {
            const svc = getService(card.slug);
            return (
              <div
                key={card.slug}
                className={`fade-up fade-up-delay-${Math.min(index + 1, 4)} border-l-4 border-gold-500 bg-dark-900 pl-6 pr-6 py-6 hover:bg-dark-900/80 transition-colors group`}
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-display font-bold uppercase tracking-wider text-white text-2xl">
                    {card.title}
                  </h3>
                  <span className="font-display font-bold text-gold-500 text-4xl leading-none">${svc?.price}</span>
                </div>

                <p className="text-gray-400 text-sm mt-2 mb-4">{card.shortDescription}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {card.includes.map((item, i) => (
                    <span key={i} className="text-xs text-gray-400 bg-dark-700 px-3 py-1 rounded-full">
                      {item}
                    </span>
                  ))}
                </div>

                <Link to={`/services/${card.slug}`} className="text-gold-500 hover:text-gold-400 text-xs font-display uppercase tracking-widest transition-colors">
                  Details →
                </Link>
              </div>
            );
          })}
        </div>

        {/* FAQ */}
        <div className="flex items-center gap-3 mb-4">
          <span className="block w-10 h-0.5 bg-gold-500"></span>
          <span className="font-display text-gold-500 text-sm tracking-[0.3em] uppercase">Got Questions?</span>
        </div>
        <h2 className="font-display font-bold uppercase leading-none text-white mb-10"
          style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
          Frequently Asked <span className="text-gold-500">Questions</span>
        </h2>

        <div className="max-w-3xl space-y-2">
          {FAQ.map((item, index) => (
            <div
              key={index}
              className="border-l-2 border-dark-700 hover:border-gold-500 bg-dark-900 overflow-hidden transition-colors"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center"
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              >
                <span className="font-medium text-white text-sm">{item.question}</span>
                <ChevronDown
                  className={`h-4 w-4 text-gold-500 flex-shrink-0 ml-4 transform transition-transform ${
                    openFAQ === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`px-6 transition-all duration-200 ease-in-out ${
                  openFAQ === index ? 'py-4' : 'py-0 h-0'
                }`}
              >
                <p className="text-gray-400 text-sm">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;