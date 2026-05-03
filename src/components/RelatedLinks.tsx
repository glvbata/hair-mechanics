import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export interface RelatedLink {
  to: string;
  label: string;
  desc?: string;
}

interface RelatedLinksProps {
  heading?: string;
  links: RelatedLink[];
}

/**
 * Internal-linking grid for service ↔ area ↔ blog cross-references.
 * Helps Google crawl topical clusters and pushes visitors deeper into the site.
 */
const RelatedLinks = ({ heading = 'Explore More', links }: RelatedLinksProps) => (
  <section className="py-14 bg-dark-800">
    <div className="max-w-5xl mx-auto px-4">
      <h2 className="text-2xl font-bold text-gold-500 text-center mb-8">{heading}</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="group bg-gray-800 hover:bg-gray-700/70 border border-gray-700 hover:border-gold-500/40 rounded-lg p-5 transition-colors"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white group-hover:text-gold-500 transition-colors">
                {link.label}
              </h3>
              <ArrowRight className="h-4 w-4 text-gold-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            {link.desc && <p className="text-gray-400 text-sm mt-2">{link.desc}</p>}
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default RelatedLinks;
