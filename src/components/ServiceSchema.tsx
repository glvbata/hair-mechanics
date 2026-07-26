import { ADDRESS, AREAS_SERVED, BUSINESS_ID } from '../constants/business';

interface ServiceSchemaProps {
  name: string;
  description: string;
  price: string;
  url: string;
}

/**
 * Per-service JSON-LD.
 *
 * `provider` is a bare {@id} reference to the BarberShop declared in
 * index.html rather than an inline copy of the business. Re-declaring name,
 * address, and phone on five service pages produced five anonymous nodes that
 * nothing tied back to the shop; the reference makes each service an edge on
 * the one entity instead.
 */
const ServiceSchema = ({ name, description, price, url }: ServiceSchemaProps) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${url}#service`,
        name,
        description,
        serviceType: name,
        provider: { '@id': BUSINESS_ID },
        areaServed: AREAS_SERVED.map((city) => ({
          '@type': 'City',
          name: city,
          addressRegion: ADDRESS.region,
        })),
        offers: {
          '@type': 'Offer',
          price,
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url,
        },
        url,
      }),
    }}
  />
);

export default ServiceSchema;
