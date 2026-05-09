import { useEffect } from 'react';
import { HERO_IMAGE, PHONE_DISPLAY, SITE_URL } from '../constants/business';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  /** Optional JSON-LD schema to inject (object or array of objects). */
  schema?: object | object[];
  /** Stable id used on the injected <script> tag — lets cleanup target the right node. */
  schemaId?: string;
  /** When true, emit <meta name="robots" content="noindex,nofollow"> for hidden routes. */
  noindex?: boolean;
}

// Home-page defaults restored when a page unmounts.
const DEFAULT_TITLE = `Hair Mechanics | Auburn Barber Shop & Haircuts Near Me | ${PHONE_DISPLAY}`;
const DEFAULT_DESCRIPTION = `Hair Mechanics is Auburn's top-rated barber shop. Expert barbers specializing in haircuts, fades, beard trims, and styling for men, women, and kids. Walk-ins welcome. Open 7 days. Call ${PHONE_DISPLAY}.`;
const DEFAULT_OG_TITLE = 'Hair Mechanics | Auburn Barber Shop & Haircuts Near Me';
const DEFAULT_OG_DESCRIPTION = "Auburn's top-rated barber shop. Expert haircuts, fades, beard trims. Walk-ins welcome. Open 7 days.";

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

export const useSEO = ({ title, description, canonical, ogImage, schema, schemaId, noindex }: SEOProps) => {
  useEffect(() => {
    document.title = title;

    // Robots — noindex on hidden routes (dashboards, admin). Default removes the tag.
    setMetaTag('robots', noindex ? 'noindex,nofollow' : 'index,follow');

    // Meta description
    setMetaTag('description', description);

    // Open Graph
    setMetaTag('og:title', title, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:image', ogImage || HERO_IMAGE, true);
    setMetaTag('og:type', 'website', true);
    if (canonical) setMetaTag('og:url', canonical, true);

    // Twitter Card
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', ogImage || HERO_IMAGE);
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

    // Optional JSON-LD injection (keyed by schemaId so we can remove on unmount).
    let schemaNode: HTMLScriptElement | null = null;
    if (schema) {
      const id = schemaId || 'page-schema';
      const existing = document.getElementById(id) as HTMLScriptElement | null;
      schemaNode = existing ?? document.createElement('script');
      schemaNode.type = 'application/ld+json';
      schemaNode.id = id;
      schemaNode.text = JSON.stringify(schema);
      if (!existing) document.head.appendChild(schemaNode);
    }

    return () => {
      document.title = DEFAULT_TITLE;
      setMetaTag('description', DEFAULT_DESCRIPTION);
      setMetaTag('og:title', DEFAULT_OG_TITLE, true);
      setMetaTag('og:description', DEFAULT_OG_DESCRIPTION, true);
      setMetaTag('og:image', HERO_IMAGE, true);
      setMetaTag('robots', 'index,follow');
      if (link) link.href = SITE_URL;
      if (schemaNode && schemaNode.parentNode) {
        schemaNode.parentNode.removeChild(schemaNode);
      }
    };
  }, [title, description, canonical, ogImage, schema, schemaId, noindex]);
};
