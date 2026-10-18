import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import DraftBanner from '../components/DraftBanner';
import CallLink from '../components/CallLink';
import { ADDRESS, PHONE_DISPLAY, SITE_URL } from '../constants/business';

/**
 * /terms — SMS Terms. Copy owner: Nami (sms-terms.md), word for word.
 * DRAFT until Gian and Glen review.
 *
 * Exists because new 10DLC campaigns (since June 30, 2026) need a Terms &
 * Conditions URL as well as a Privacy Policy URL. Must be live and public
 * before the SMS campaign is submitted.
 */

const EMAIL_PLACEHOLDER = '[EMAIL — Glen to confirm]';
const EFFECTIVE_DATE_PLACEHOLDER = '[EFFECTIVE DATE — set when published]';

const TermsPage = () => (
  <PageLayout
    title="SMS Terms | Hair Mechanics Auburn"
    description={`Terms for Hair Mechanics booking texts: how you join, how often we text, cost, and how to stop. Reply STOP to opt out, HELP for help, or call ${PHONE_DISPLAY}.`}
    canonical={`${SITE_URL}/terms`}
  >
    <DraftBanner text="DRAFT — Not legal advice. Gian and Glen review before publishing." />

    <article className="max-w-3xl mx-auto px-4 py-12 sm:py-16">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">SMS Terms</h1>
      <div className="text-gray-300 mb-8 space-y-1">
        <p className="font-bold text-white">Hair Mechanics booking texts</p>
        <p>Effective date: {EFFECTIVE_DATE_PLACEHOLDER}</p>
      </div>

      <ul className="list-disc pl-6 space-y-3 text-gray-300 leading-relaxed">
        <li>
          <strong className="text-white">Program:</strong> Hair Mechanics, {ADDRESS.street},{' '}
          {ADDRESS.city} {ADDRESS.region} {ADDRESS.postal}, sends texts about your booking request
          and appointment.
        </li>
        <li>
          <strong className="text-white">How you join:</strong> by checking the text box on our form
          at hairmechanics.net. It's optional. You can book without it.
        </li>
        <li>
          <strong className="text-white">How often:</strong> it varies, usually 1–2 texts per
          request.
        </li>
        <li>
          <strong className="text-white">Cost:</strong> Msg &amp; data rates may apply.
        </li>
        <li>
          <strong className="text-white">Stop:</strong> reply{' '}
          <strong className="text-white">STOP</strong> at any time. We'll send one confirmation and
          then stop.
        </li>
        <li>
          <strong className="text-white">Help:</strong> reply{' '}
          <strong className="text-white">HELP</strong>, or call{' '}
          <CallLink className="underline">{PHONE_DISPLAY}</CallLink>.
        </li>
        <li>
          <strong className="text-white">Carriers</strong> aren't responsible for delayed or
          undelivered messages.
        </li>
        <li>
          <strong className="text-white">Privacy:</strong> see our{' '}
          <Link to="/privacy" className="underline hover:text-gold-500">
            Privacy Policy
          </Link>
          . Your mobile information is not sold or shared with third parties for marketing or
          promotional purposes.
        </li>
      </ul>

      <p className="mt-8 text-gray-300">
        Questions: <CallLink className="underline">{PHONE_DISPLAY}</CallLink> · {EMAIL_PLACEHOLDER}
      </p>
    </article>
  </PageLayout>
);

export default TermsPage;
