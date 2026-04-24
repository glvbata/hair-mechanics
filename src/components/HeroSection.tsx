import { Phone } from 'lucide-react';
import { ReactNode } from 'react';
import { handleCall } from '../utils/analytics';
import { PHONE_DISPLAY } from '../constants/business';

interface HeroSectionProps {
  /** Gold eyebrow line above the headline (e.g. service name). */
  eyebrow: string;
  /** Subhead under the eyebrow (e.g. "in Auburn, WA"). Defaults to the Auburn tagline. Pass null to omit the second line entirely. */
  subhead?: string | null;
  /** Body copy under the headline. */
  description?: ReactNode;
  /** Button label. Defaults to phone display number. */
  ctaLabel?: string;
  /** Hide the call-to-action button entirely (e.g. content-only team page hero). */
  hideCta?: boolean;
  /** Override the background image (defaults to shared hero). */
  bgWebp?: string;
  bgJpg?: string;
}

/**
 * Shared hero block used by service pages, area pages, and team/profile pages.
 * Replaces the previously-duplicated `image-set()` background + headline
 * pattern that lived in ~11 files.
 */
const HeroSection = ({
  eyebrow,
  subhead = 'in Auburn, WA',
  description,
  ctaLabel,
  hideCta = false,
  bgWebp = '/assets/HeroImage.webp',
  bgJpg = '/assets/HeroImage.jpg',
}: HeroSectionProps) => {
  const bg = `image-set(url("${bgWebp}") type("image/webp"), url("${bgJpg}") type("image/jpeg"))`;

  return (
    <section className="relative py-20 sm:py-28">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: bg }}
      >
        <div className="absolute inset-0 bg-dark-900/85"></div>
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-3xl sm:text-5xl font-bold">
          <span className="text-gold-500">{eyebrow}</span>
          {subhead !== null && (
            <span className="block text-white mt-2">{subhead}</span>
          )}
        </h1>
        {description && (
          <div className="mt-4 text-lg text-gray-300 max-w-xl mx-auto">{description}</div>
        )}
        {!hideCta && (
          <button
            onClick={handleCall}
            className="mt-8 bg-gold-500 text-gray-900 px-8 py-4 rounded-md font-bold text-lg hover:bg-gold-400 transition-colors inline-flex items-center"
          >
            <Phone className="h-5 w-5 mr-2" />
            {ctaLabel ?? PHONE_DISPLAY}
          </button>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
