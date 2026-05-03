import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface FAQItem {
  q: string;
  a: string;
}

interface FAQProps {
  items: FAQItem[];
  heading?: string;
  /** Stable id used on the JSON-LD <script> tag. Required when multiple FAQs exist on one page. */
  schemaId?: string;
}

/**
 * Accordion FAQ block + FAQPage JSON-LD for rich-result eligibility.
 * Pure visible content + schema in the same component keeps the two in sync.
 */
const FAQ = ({ items, heading = 'Frequently Asked Questions', schemaId = 'faq-schema' }: FAQProps) => {
  const [open, setOpen] = useState<number | null>(0);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <section className="py-16 bg-dark-900">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gold-500 text-center mb-10">{heading}</h2>
        <div className="space-y-3">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="bg-gray-800 rounded-lg overflow-hidden">
                <button
                  className="w-full flex items-center justify-between text-left px-5 py-4 hover:bg-gray-700/40 transition-colors"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-white pr-4">{item.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-gold-500 flex-shrink-0 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-gray-300 text-sm leading-relaxed">{item.a}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <script
        id={schemaId}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </section>
  );
};

export default FAQ;
