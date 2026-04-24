import { ADDRESS, BUSINESS_LEGAL_NAME, PHONE_TEL, SITE_URL } from '../constants/business';

interface ServiceSchemaProps {
  name: string;
  description: string;
  price: string;
  url: string;
}

const ServiceSchema = ({ name, description, price, url }: ServiceSchemaProps) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name,
        description,
        provider: {
          '@type': 'BarberShop',
          name: BUSINESS_LEGAL_NAME,
          address: {
            '@type': 'PostalAddress',
            streetAddress: ADDRESS.street,
            addressLocality: ADDRESS.city,
            addressRegion: ADDRESS.region,
            postalCode: ADDRESS.postal,
            addressCountry: ADDRESS.country,
          },
          telephone: PHONE_TEL,
          url: SITE_URL,
        },
        areaServed: {
          '@type': 'City',
          name: `${ADDRESS.city}, ${ADDRESS.region}`,
        },
        offers: {
          '@type': 'Offer',
          price,
          priceCurrency: 'USD',
        },
        url,
      }),
    }}
  />
);

export default ServiceSchema;
