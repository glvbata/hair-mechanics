import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const services = [
  {
    title: "Haircut",
    price: "$40",
    description: "Precision haircut with styling",
    includes: ["Consultation", "Precision Cut", "Style"],
    link: "/services/haircut",
  },
  {
    title: "Haircut & Beard",
    price: "$50",
    description: "Complete grooming experience",
    includes: ["Haircut", "Beard Trim & Shape", "Line Up", "Style"],
    link: "/services/beard-trim",
  },
  {
    title: "Kids Cut",
    price: "$35",
    description: "Ages 12 and under",
    includes: ["Consultation", "Cut", "Style"],
    link: "/services/kids-cut",
  },
  {
    title: "Line Up / Trim",
    price: "$20",
    description: "Quick touch-up between cuts",
    includes: ["Neck Trim", "Line Up", "Light Styling"],
    link: "/services/line-up",
  }
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
    <section id="services" className="py-24 bg-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          <span className="text-amber-500">Haircut Services & Pricing</span>
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors relative overflow-hidden group"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">{service.title}</h3>
                <div className="text-right">
                  <span className="text-2xl font-bold text-amber-500">{service.price}</span>
                </div>
              </div>
              
              <p className="text-gray-400 mb-4">{service.description}</p>
              
              <ul className="space-y-2">
                {service.includes.map((item, i) => (
                  <li key={i} className="flex items-center text-sm text-gray-300">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2"></span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link to={service.link} className="inline-block mt-4 text-amber-500 hover:text-amber-400 text-sm font-medium transition-colors">
                Learn more →
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-amber-500">Frequently Asked Questions</span>
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {FAQ.map((item, index) => (
              <div 
                key={index}
                className="bg-gray-800 rounded-lg overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-700"
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                >
                  <span className="font-medium">{item.question}</span>
                  <ChevronDown 
                    className={`h-5 w-5 text-amber-500 transform transition-transform ${
                      openFAQ === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div 
                  className={`px-6 transition-all duration-200 ease-in-out ${
                    openFAQ === index ? 'py-4' : 'py-0 h-0'
                  }`}
                >
                  <p className="text-gray-400">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;