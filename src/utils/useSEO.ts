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
  /**
   * Page language (BCP 47). Drives <html lang> + og:locale. Defaults to 'en' when omitted.
   * Use 'es' for the Spanish landing, 'en' for English pages.
   */
  lang?: string;
  /**
   * hreflang alternates — tells Google which URLs serve the same content in other
   * languages. Both pages should declare each other plus an x-default fallback.
   */
  alternates?: Array<{ hreflang: string; href: string }>;
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

export const useSEO = ({ title, description, canonical, ogImage, schema, schemaId, noindex, lang, alternates }: SEOProps) => {
  useEffect(() => {
    document.title = title;

    // Set <html lang> so screen readers + Google know the page language.
    const prevLang = document.documentElement.lang;
    document.documentElement.lang = lang || 'en';

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

    // hreflang alternates — clear old ones, then add fresh. Use a data-attribute
    // so we only remove tags we own (not anything from index.html).
    document
      .querySelectorAll('link[rel="alternate"][data-managed="useSEO"]')
      .forEach((n) => n.remove());
    if (alternates && alternates.length) {
      for (const alt of alternates) {
        const l = document.createElement('link');
        l.rel = 'alternate';
        l.hreflang = alt.hreflang;
        l.href = alt.href;
        l.dataset.managed = 'useSEO';
        document.head.appendChild(l);
      }
    }

    // og:locale matches the page language (e.g. en_US, es_US).
    setMetaTag('og:locale', (lang || 'en') === 'es' ? 'es_US' : 'en_US', true);

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
      document.documentElement.lang = prevLang || 'en';
      setMetaTag('description', DEFAULT_DESCRIPTION);
      setMetaTag('og:title', DEFAULT_OG_TITLE, true);
      setMetaTag('og:description', DEFAULT_OG_DESCRIPTION, true);
      setMetaTag('og:image', HERO_IMAGE, true);
      setMetaTag('og:locale', 'en_US', true);
      setMetaTag('robots', 'index,follow');
      if (link) link.href = SITE_URL;
      // Strip our hreflang alternates on unmount.
      document
        .querySelectorAll('link[rel="alternate"][data-managed="useSEO"]')
        .forEach((n) => n.remove());
      if (schemaNode && schemaNode.parentNode) {
        schemaNode.parentNode.removeChild(schemaNode);
      }
    };
  }, [title, description, canonical, ogImage, schema, schemaId, noindex, lang, alternates]);
};
