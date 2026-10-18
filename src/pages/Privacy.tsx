import { ReactNode } from 'react';
import PageLayout from '../components/PageLayout';
import DraftBanner from '../components/DraftBanner';
import CallLink from '../components/CallLink';
import { ADDRESS, PHONE_DISPLAY, SITE_URL } from '../constants/business';

/**
 * /privacy — Privacy Policy. Copy owner: Nami (privacy-page.md), word for
 * word. DRAFT until Gian and Glen review. Bracketed placeholders stay visible
 * on purpose: they are the open items Glen has to fill before this goes live.
 *
 * Must be live and public (with every placeholder filled) before the 10DLC
 * SMS campaign is submitted — reviewers reject placeholder pages. The bold
 * "will not be sold or shared" sentence must stay in substance.
 */

const EMAIL_PLACEHOLDER = '[EMAIL — Glen to confirm]';
const EFFECTIVE_DATE_PLACEHOLDER = '[EFFECTIVE DATE — set when published]';
const RETENTION_PLACEHOLDER = '[12 MONTHS — Glen to confirm]';

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="mb-10">
    <h2 className="text-xl font-bold text-gold-500 mb-3">{title}</h2>
    <div className="space-y-3 text-gray-300 leading-relaxed">{children}</div>
  </section>
);

const Address = () => (
  <>
    {ADDRESS.street}, {ADDRESS.city} {ADDRESS.region} {ADDRESS.postal}
  </>
);

const PrivacyPage = () => (
  <PageLayout
    title="Privacy Policy | Hair Mechanics Auburn"
    description={`What Hair Mechanics collects on hairmechanics.net, why, and what you can do about it. Plain English. Questions? Call ${PHONE_DISPLAY}.`}
    canonical={`${SITE_URL}/privacy`}
  >
    <DraftBanner text="DRAFT — Not legal advice. Gian and Glen review before publishing." />

    <article className="max-w-3xl mx-auto px-4 py-12 sm:py-16">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">Privacy Policy</h1>
      <div className="text-gray-300 mb-8 space-y-1">
        <p className="font-bold text-white">Hair Mechanics</p>
        <p>
          <Address />
        </p>
        <p>
          <CallLink className="hover:text-gold-500">{PHONE_DISPLAY}</CallLink>
        </p>
        <p>Effective date: {EFFECTIVE_DATE_PLACEHOLDER}</p>
      </div>
      <p className="text-gray-300 leading-relaxed mb-10">
        This page explains what we collect on hairmechanics.net, why, and what you can do about it.
        Plain English. No tricks.
      </p>

      <Section title="What we collect">
        <p className="font-bold text-white">When you fill out our form:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>First name</li>
          <li>Mobile phone number</li>
          <li>Best day or time (if you give one)</li>
          <li>The service you want</li>
          <li>Whether you said yes to texts, plus the date and time you said it</li>
        </ul>
        <p className="font-bold text-white">When you browse our site:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong className="text-white">Google Analytics (GA4).</strong> It tells us how people
            use the site: pages viewed, rough location (city level), device type, and clicks like
            "call," "text," "get directions," and form submits. It uses cookies.
          </li>
          <li>
            <strong className="text-white">Google Ads conversion tracking.</strong> If you came from
            one of our Google ads, it tells us when someone clicks to call or sends the form. It uses
            cookies.
          </li>
          <li>
            <strong className="text-white">Meta (Facebook / Instagram), if we use it later.</strong>{' '}
            We may run ads on Meta. If we do, we may use the Meta pixel to see whether an ad led to a
            form submit, or use a Meta lead form. If you fill out a Meta lead form, Meta shares what
            you entered with us. We'll update this page before we turn either one on.
          </li>
        </ul>
        <p>We don't collect payment info, health info, or photos on this site.</p>
      </Section>

      <Section title="Why we collect it">
        <ul className="list-disc pl-6 space-y-1">
          <li>To call or text you back and book your appointment.</li>
          <li>To honor your offer (for example, checking it's your first visit).</li>
          <li>To see which ads and pages work, so we spend less on the ones that don't.</li>
        </ul>
        <p>That's it. We don't sell your info.</p>
      </Section>

      <Section title="Text messages (SMS)">
        <ul className="list-disc pl-6 space-y-1">
          <li>
            We only text you if you check the text box on our form. The box is optional. You can
            book without it.
          </li>
          <li>What we send: texts about your booking request and appointment.</li>
          <li>How often: it varies, usually 1–2 texts per request.</li>
          <li>Msg &amp; data rates may apply.</li>
          <li>
            <strong className="text-white">Reply STOP to opt out</strong> at any time. Reply HELP
            for help, or call <CallLink className="underline">{PHONE_DISPLAY}</CallLink>.
          </li>
          <li>Carriers aren't responsible for delayed or undelivered messages.</li>
        </ul>
        <p>
          <strong className="text-white">
            Your mobile information will not be sold or shared with third parties or affiliates for
            marketing or promotional purposes. We don't share your text opt-in data or consent with
            anyone.
          </strong>{' '}
          The only exception is the service providers below who help us send the texts. They can't
          use your info for their own marketing.
        </p>
      </Section>

      <Section title="Who helps us run this">
        <p>These companies process data for us, only to run the site and contact you:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong className="text-white">Netlify</strong> hosts our website and handles the form.
          </li>
          <li>
            <strong className="text-white">Supabase</strong> stores form submissions.
          </li>
          <li>
            <strong className="text-white">Twilio</strong> sends and receives our text messages.
          </li>
          <li>
            <strong className="text-white">Resend</strong> sends email alerts to the shop about new
            requests.
          </li>
          <li>
            <strong className="text-white">Google</strong> provides Analytics and Ads conversion
            tracking.
          </li>
          <li>
            <strong className="text-white">Meta</strong>, only if we run Meta ads later (see above).
          </li>
        </ul>
        <p>We may also share info if the law requires it.</p>
      </Section>

      <Section title="How long we keep it">
        <ul className="list-disc pl-6 space-y-1">
          <li>Form requests: up to {RETENTION_PLACEHOLDER}, then deleted.</li>
          <li>
            Your text consent and any opt-out: kept as long as we need to prove you agreed or that we
            stopped texting you.
          </li>
          <li>Google Analytics data: kept for the period set in our Google Analytics settings.</li>
        </ul>
      </Section>

      <Section title="Your choices">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong className="text-white">Stop texts:</strong> reply STOP.
          </li>
          <li>
            <strong className="text-white">Delete your info:</strong> call us at{' '}
            <CallLink className="underline">{PHONE_DISPLAY}</CallLink>, email {EMAIL_PLACEHOLDER},
            or ask in person at <Address />. We'll delete your form info and confirm when it's done.
            We keep only a record of your opt-out, so we never text you by mistake.
          </li>
          <li>
            <strong className="text-white">Cookies:</strong> you can block or clear cookies in your
            browser. Google's opt-out tool for Analytics is at{' '}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gold-500"
            >
              tools.google.com/dlpage/gaoptout
            </a>
            .
          </li>
        </ul>
      </Section>

      <Section title="Kids">
        <p>
          The site isn't meant for kids. Parents book Kids Cuts for their children. We don't knowingly
          collect info from anyone under 13.
        </p>
      </Section>

      <Section title="Washington residents">
        <p>
          We're a Washington business, and we follow Washington privacy law. We don't collect consumer
          health data through this site, so we don't ask about health, medical conditions, or anything
          like that. If that ever changes, we'll update this page first and ask for your consent.
        </p>
      </Section>

      <Section title="Changes">
        <p>If we change this policy, we'll update this page and the effective date above.</p>
      </Section>

      <Section title="Contact">
        <p>Hair Mechanics</p>
        <p>
          <Address />
        </p>
        <p>
          <CallLink className="hover:text-gold-500">{PHONE_DISPLAY}</CallLink>
        </p>
        <p>{EMAIL_PLACEHOLDER}</p>
      </Section>
    </article>
  </PageLayout>
);

export default PrivacyPage;
