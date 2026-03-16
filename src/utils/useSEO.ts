import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
}

export const useSEO = ({ title, description, canonical }: SEOProps) => {
  useEffect(() => {
    document.title = title;

    // Meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    } else {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      metaDesc.setAttribute('content', description);
      document.head.appendChild(metaDesc);
    }

    // Canonical URL
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) {
      if (link) {
        link.href = canonical;
      } else {
        link = document.createElement('link');
        link.rel = 'canonical';
        link.href = canonical;
        document.head.appendChild(link);
      }
    }

    // Cleanup: restore defaults on unmount
    return () => {
      document.title = 'Hair Mechanics | Auburn Barber Shop & Haircuts Near Me | (206) 399-9288';
      if (metaDesc) {
        metaDesc.setAttribute('content', 'Hair Mechanics is Auburn\'s top-rated barber shop. Expert barbers specializing in haircuts, fades, beard trims, and styling for men, women, and kids. Walk-ins welcome. Open 7 days. Call (206) 399-9288.');
      }
      if (link) {
        link.href = 'https://hairmechanics.com';
      }
    };
  }, [title, description, canonical]);
};
