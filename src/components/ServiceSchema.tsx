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
        "@context": "https://schema.org",
        "@type": "Service",
        "name": name,
        "description": description,
        "provider": {
          "@type": "HairSalon",
          "name": "Hair Mechanics LLC",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "1251 A Street Northeast",
            "addressLocality": "Auburn",
            "addressRegion": "WA",
            "postalCode": "98002",
            "addressCountry": "US"
          },
          "telephone": "+1-206-399-9288",
          "url": "https://hairmechanics.com"
        },
        "areaServed": {
          "@type": "City",
          "name": "Auburn, WA"
        },
        "offers": {
          "@type": "Offer",
          "price": price,
          "priceCurrency": "USD"
        },
        "url": url
      })
    }}
  />
);

export default ServiceSchema;
