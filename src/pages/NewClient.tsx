import { useEffect, useState } from 'react';
import { Phone, MapPin, Star, Clock, Tag, ShieldCheck } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import DraftBanner from '../components/DraftBanner';
import LeadForm from '../components/LeadForm';
import CallLink from '../components/CallLink';
import { handleCall, trackDirectionsClick } from '../utils/analytics';
import {
  ADDRESS,
  HOURS,
  PHONE_DISPLAY,
  RATING,
  REVIEWS_COUNT,
  SITE_URL,
  SOCIAL,
  getService,
} from '../constants/business';

/**
 * /new-client — promo landing page for the new-client offer.
 *
 * DRAFT: copy owner Nami (promo-page.md, word for word); the offer itself
 * still needs Glen's final yes. While draft: noindex (here and in
 * prerender-metadata.mjs), not in the sitemap, not in the nav. Reach it only
 * by direct link (ads, GBP, tests). Remove the banner + noindex once approved.
 *
 * Prices, rating and hours come from constants/business.ts — nothing here
 * changes them. Call / directions buttons reuse the site's handlers so the
 * existing GA4 phone_call / get_directions events keep firing; generate_lead
 * fires inside LeadForm only after the function saves.
 */

const FORM_ID = 'grab-your-spot';
const price = (slug: string) => getService(slug)!.price;

const StickyMobileBar = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="bg-dark-900 border-t border-dark-700 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] flex gap-3">
        <a
          href={`#${FORM_ID}`}
          className="flex-1 inline-flex items-center justify-center bg-gold-500 text-dark-900 font-display font-bold uppercase tracking-wider text-sm py-3.5 rounded-lg"
        >
          Book my cut
        </a>
        <button
          onClick={handleCall}
          aria-label={`Call ${PHONE_DISPLAY}`}
          className="inline-flex items-center justify-center border-2 border-gold-500 text-gold-500 px-5 rounded-lg"
        >
          <Phone className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

const NewClientPage = () => (
  <PageLayout
    title="Free Line-Up With Your First Cut | Hair Mechanics Auburn"
    description={`New to Hair Mechanics? Book a $${price('haircut')} Haircut or Fade at ${ADDRESS.street}, ${ADDRESS.city}, and get a free Line Up / Trim within 14 days. Walk-ins welcome.`}
    canonical={`${SITE_URL}/new-client`}
    noindex
  >
    <DraftBanner text="DRAFT — NOT LIVE until Gian approves." />

    {/* Hero */}
    <section className="relative">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'image-set(url("/assets/HeroImage.webp") type("image/webp"), url("/assets/HeroImage.jpg") type("image/jpeg"))',
        }}
      >
        <div className="absolute inset-0 bg-dark-900/90"></div>
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 sm:py-24">
        <h1 className="text-3xl sm:text-5xl font-bold leading-tight max-w-3xl">
          New here? Your first cut comes with a{' '}
          <span className="text-gold-500">free line-up.</span>
        </h1>
        <p className="mt-5 text-lg sm:text-xl text-gray-300 max-w-2xl">
          Book a ${price('haircut')} Haircut or Fade. Come back within 14 days and your Line Up /
          Trim is on us.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <a
            href={`#${FORM_ID}`}
            className="bg-gold-500 text-gray-900 px-8 py-4 rounded-md font-bold text-lg hover:bg-gold-400 transition-colors inline-flex items-center justify-center"
          >
            Claim my free line-up
          </a>
          {/* Call button (mobile) — existing handler, existing phone_call event */}
          <button
            onClick={handleCall}
            className="md:hidden bg-gray-900 border border-gray-700 text-white px-6 py-4 rounded-md font-bold hover:bg-gray-800 transition-colors inline-flex items-center justify-center"
          >
            <Phone className="h-5 w-5 mr-2" />
            Call {PHONE_DISPLAY}
          </button>
        </div>
      </div>
    </section>

    {/* Why + offer + guarantee on the left, form on the right */}
    <section className="py-14 sm:py-20 bg-dark-900">
      <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
        <div className="space-y-8">
          {/* Why Hair Mechanics */}
          <div>
            <h2 className="text-2xl font-bold text-gold-500 mb-5">Why Hair Mechanics</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Star className="h-5 w-5 text-gold-500 flex-shrink-0 mt-0.5" />
                <p className="text-gray-200">
                  <strong className="text-white">
                    {RATING} stars on Google from {REVIEWS_COUNT} reviews.
                  </strong>
                </p>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-gold-500 flex-shrink-0 mt-0.5" />
                <p className="text-gray-200">
                  <strong className="text-white">Open 7 days.</strong> {HOURS.weekday}.{' '}
                  {HOURS.weekend}. Walk-ins welcome.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <Tag className="h-5 w-5 text-gold-500 flex-shrink-0 mt-0.5" />
                <p className="text-gray-200">
                  <strong className="text-white">Straight prices.</strong> Haircut $
                  {price('haircut')}. Fade ${price('fade')}. Haircut &amp; Beard $
                  {price('beard-trim')}. Kids Cut ${price('kids-cut')} (12 and under). Line Up /
                  Trim ${price('line-up')}.
                </p>
              </li>
            </ul>
          </div>

          {/* Offer box */}
          <div className="bg-gray-800 border border-gold-500/40 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">New client offer</h2>
            <ol className="space-y-2 text-gray-200 list-decimal pl-5">
              <li>
                Book a Haircut (${price('haircut')}) or a Fade (${price('fade')}).
              </li>
              <li>Come back within 14 days.</li>
              <li>Your Line Up / Trim (${price('line-up')}) is free.</li>
            </ol>
            <p className="mt-4 text-gray-300">That's it. No catch.</p>
            <a
              href={`#${FORM_ID}`}
              className="mt-5 inline-flex items-center justify-center bg-gold-500 text-gray-900 px-6 py-3 rounded-md font-bold hover:bg-gold-400 transition-colors"
            >
              Claim my free line-up
            </a>
          </div>

          {/* Guarantee box */}
          <div className="bg-gray-800 rounded-lg p-6 flex items-start gap-4">
            <ShieldCheck className="h-8 w-8 text-gold-500 flex-shrink-0" />
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Don't love your cut? We fix it free.</h2>
              <p className="text-gray-300">Come back within 7 days. We'll make it right. No charge.</p>
            </div>
          </div>
        </div>

        {/* Form section */}
        <div id={FORM_ID} className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-white mb-1">Grab your spot</h2>
          <p className="text-gray-300 mb-5">
            Leave your name and number. We'll call or text you to set a time.
          </p>
          <LeadForm />
          <div className="mt-6 text-gray-300 space-y-1">
            <p>
              Rather call?{' '}
              <CallLink className="font-bold text-white hover:text-gold-500">
                {PHONE_DISPLAY}
              </CallLink>
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gold-500 flex-shrink-0" />
              {ADDRESS.full}
            </p>
            <a
              href={SOCIAL.directions}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackDirectionsClick}
              className="inline-flex items-center text-gold-500 hover:text-gold-400 underline"
            >
              Get directions
            </a>
          </div>
        </div>
      </div>
    </section>

    {/* Fine print */}
    <section className="py-12 bg-dark-800 pb-28 md:pb-12">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-lg font-bold text-gray-300 mb-4">Fine print</h2>
        <ul className="text-gray-400 text-sm space-y-2 list-disc pl-5">
          <li>New clients only. One per person.</li>
          <li>Free Line Up / Trim must be used within 14 days of your first Haircut or Fade.</li>
          <li>
            The free fix covers the Haircut or Fade from this offer. Come back within 7 days. One
            fix per cut.
          </li>
          <li>No cash value.</li>
          <li>Offer ends [END DATE — Glen sets].</li>
        </ul>
      </div>
    </section>

    <StickyMobileBar />
  </PageLayout>
);

export default NewClientPage;
