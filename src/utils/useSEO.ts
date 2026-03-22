import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
}

const DEFAULT_OG_IMAGE = 'https://hairmechanics.net/assets/HeroImage.jpg';

const setMetaTag = (property: string, content: string, isProperty = false) => {
  const attr = isProperty ? 'property' : 'name';
  let tag = document.querySelector(`meta[${attr}="${property}"]`);
  if (tag) {
    tag.setAttribute('content', content);
  } else {
    tag = document.createElement('meta');
    tag.setAttribute(attr, property);
    tag.setAttribute('content', content);
    document.head.appendChild(tag);
  }
};

export const useSEO = ({ title, description, canonical, ogImage }: SEOProps) => {
  useEffect(() => {
    document.title = title;

    // Meta description
    setMetaTag('description', description);

    // Open Graph
    setMetaTag('og:title', title, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:image', ogImage || DEFAULT_OG_IMAGE, true);
    setMetaTag('og:type', 'website', true);
    if (canonical) setMetaTag('og:url', canonical, true);

    // Twitter Card
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', ogImage || DEFAULT_OG_IMAGE);
    setMetaTag('twitter:card', 'summary_large_image');

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

    return () => {
      document.title = 'Hair Mechanics | Auburn Barber Shop & Haircuts Near Me | (206) 399-9288';
      setMetaTag('description', 'Hair Mechanics is Auburn\'s top-rated barber shop. Expert barbers specializing in haircuts, fades, beard trims, and styling for men, women, and kids. Walk-ins welcome. Open 7 days. Call (206) 399-9288.');
      setMetaTag('og:title', 'Hair Mechanics | Auburn Barber Shop & Haircuts Near Me', true);
      setMetaTag('og:description', 'Auburn\'s top-rated barber shop. Expert haircuts, fades, beard trims. Walk-ins welcome. Open 7 days.', true);
      setMetaTag('og:image', DEFAULT_OG_IMAGE, true);
      if (link) link.href = 'https://hairmechanics.net';
    };
  }, [title, description, canonical, ogImage]);
};
