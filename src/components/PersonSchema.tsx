import { ADDRESS, BUSINESS_ID, BUSINESS_NAME, SITE_URL } from '../constants/business';

interface PersonSchemaProps {
  /** Stable node id from BARBER_IDS — other entities reference this. */
  id: string;
  name: string;
  /** e.g. "Owner & Lead Barber". Becomes jobTitle. */
  jobTitle: string;
  description: string;
  /** Path under /assets, e.g. "glen.jpg". */
  image: string;
  url: string;
  /** What they're known for — "fades", "beard trims". Feeds knowsAbout. */
  knowsAbout: readonly string[];
  /** Profile URLs that identify the same person elsewhere. */
  sameAs?: readonly string[];
}

/**
 * Person JSON-LD for an individual barber.
 *
 * Barbers get searched by name ("glen hair mechanics", "akshat barber auburn"),
 * and an answer engine asked "who cuts hair at Hair Mechanics?" has nothing to
 * work with unless the people are modelled as entities. `worksFor` points at the
 * shop's @id, so the shop's `employee` array and these profiles resolve to the
 * same two nodes rather than four unrelated ones.
 */
const PersonSchema = ({
  id,
  name,
  jobTitle,
  description,
  image,
  url,
  knowsAbout,
  sameAs,
}: PersonSchemaProps) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        '@id': id,
        name,
        jobTitle,
        description,
        image: `${SITE_URL}/assets/${image}`,
        url,
        worksFor: { '@id': BUSINESS_ID },
        workLocation: {
          '@type': 'Place',
          name: BUSINESS_NAME,
          address: {
            '@type': 'PostalAddress',
            streetAddress: ADDRESS.street,
            addressLocality: ADDRESS.city,
            addressRegion: ADDRESS.region,
            postalCode: ADDRESS.postal,
            addressCountry: ADDRESS.country,
          },
        },
        knowsAbout,
        ...(sameAs && sameAs.length ? { sameAs } : {}),
      }),
    }}
  />
);

export default PersonSchema;
