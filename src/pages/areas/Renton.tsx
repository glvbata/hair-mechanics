import { MapPin, Clock, Phone, Star, Car } from 'lucide-react';
import PageLayout from '../../components/PageLayout';
import HeroSection from '../../components/HeroSection';
import CTABand from '../../components/CTABand';
import FAQ from '../../components/FAQ';
import RelatedLinks from '../../components/RelatedLinks';
import {
  ADDRESS,
  HOURS,
  PHONE_DISPLAY,
  RATING,
  REVIEWS_COUNT,
  SERVICES,
  SITE_URL,
} from '../../constants/business';

const url = `${SITE_URL}/renton-barber`;

const FAQ_ITEMS = [
  {
    q: 'How long is the drive from Renton to Hair Mechanics?',
    a: `About 15–20 minutes south via WA-167. Quick straight shot from anywhere in Renton — Highlands, Kennydale, Talbot, Benson Hill — to ${ADDRESS.full}.`,
  },
  {
    q: 'Why drive south from Renton when there are barbers locally?',
    a: `Renton clients have been making the drive for years because of the cut quality. ${RATING}-star rating from ${REVIEWS_COUNT}+ Google reviews, walk-ins welcome 7 days, open late until 8pm every night.`,
  },
  {
    q: 'Best route from Renton?',
    a: 'WA-167 south is the fastest — about 15 minutes door-to-door from downtown Renton. Easy off and on, free parking right out front in Auburn.',
  },
  {
    q: 'What hours are you open?',
    a: `${HOURS.weekday}, ${HOURS.weekend}. We stay open until 8pm every day so it's an easy stop after work on the way home from Boeing, the Landing, or anywhere in Renton.`,
  },
  {
    q: 'Do you accept walk-ins?',
    a: "Yes — walk in any day during open hours. Or call (206) 399-9288 ahead and we'll let you know the wait so you don't drive down for nothing.",
  },
];

const RELATED = [
  { to: '/services/fade', label: 'Fade Haircuts', desc: 'Skin, mid, taper.' },
  { to: '/services/haircut', label: "Men's Haircut", desc: '$40 precision cut.' },
  { to: '/services/beard-trim', label: 'Haircut + Beard', desc: '$50 combo.' },
  { to: '/auburn-barber', label: 'Auburn, WA', desc: 'Our home shop.' },
  { to: '/kent-barber', label: 'Near Kent', desc: 'Closer to Kent.' },
  { to: '/gallery', label: '76+ Cut Gallery', desc: 'See real cuts.' },
];

const RentonPage = () => (
  <PageLayout
    title="Barber Shop Near Renton WA | Hair Mechanics Auburn | Fades & Cuts"
    description={`Looking for a barber near Renton, WA? Hair Mechanics in Auburn is 15 minutes south via WA-167. Expert haircuts, fades, beard trims. Walk-ins welcome. Call ${PHONE_DISPLAY}.`}
    canonical={url}
  >
    <HeroSection
      eyebrow="Barber Shop Near Renton, WA"
      subhead={null}
      description={
        <>
          <p>Hair Mechanics in Auburn is a quick drive south from Renton on WA-167. Precision haircuts, clean fades, and beard work — walk-ins welcome.</p>
          <div className="mt-3 text-gray-400 text-sm flex items-center justify-center">
            <MapPin className="h-4 w-4 mr-1" /> ~15 minutes from Renton via WA-167
          </div>
        </>
      }
      ctaLabel={`Call Now: ${PHONE_DISPLAY}`}
    />

    {/* Drive context */}
    <section className="py-16 bg-dark-900">
      <div className="max-w-3xl mx-auto px-4 text-gray-300 leading-relaxed">
        <h2 className="text-2xl font-bold text-gold-500 mb-6 text-center">Easy Drive South from Renton</h2>
        <p className="mb-4">
          From the Highlands, Kennydale, Talbot, Benson Hill, or downtown Renton — WA-167 south takes you straight here in about 15 minutes. We see Renton clients who work at Boeing, near the Landing, or come down from north Renton on a regular basis.
        </p>
        <p className="mb-4">
          The reason to drive past closer shops? Consistency. Every cut looks like the one before it. {REVIEWS_COUNT}+ Google reviews back it up at {RATING} stars. Walk in any day, or call <a href={`tel:${PHONE_DISPLAY}`} className="text-gold-500 underline">{PHONE_DISPLAY}</a> for a wait estimate.
        </p>
      </div>
    </section>

    <section className="py-16 bg-dark-800">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gold-500 text-center mb-10">Why Renton Clients Choose Us</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { icon: Car, title: 'Easy Drive from Renton', desc: `Located at ${ADDRESS.full} — quick trip south via WA-167.` },
            { icon: Star, title: `${RATING} Google Rating`, desc: `Trusted by clients from Renton, Kent, Auburn, and beyond — ${REVIEWS_COUNT} reviews.` },
            { icon: Clock, title: 'Open 7 Days, Until 8pm', desc: `${HOURS.weekday}, ${HOURS.weekend}.` },
            { icon: Phone, title: 'Walk-ins Welcome', desc: 'No appointment needed — call, text, or just show up.' },
          ].map((item, i) => (
            <div key={i} className="bg-gray-800 p-6 rounded-lg flex items-start">
              <item.icon className="h-6 w-6 text-gold-500 mr-4 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-bold mb-1">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-16 bg-dark-900">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gold-500 text-center mb-8">Services & Pricing</h2>
        <div className="space-y-3">
          {SERVICES.map((s) => (
            <div key={s.slug} className="flex justify-between items-center bg-gray-800 px-5 py-4 rounded-lg">
              <span className="font-medium">{s.name}</span>
              <span className="text-gold-500 font-bold text-lg">${s.price}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    <FAQ items={FAQ_ITEMS} schemaId="renton-faq-schema" />

    <RelatedLinks heading="Explore More" links={RELATED} />

    <CTABand heading="Worth the Drive from Renton" subtext="Walk in or call — open 7 days a week." />
  </PageLayout>
);

export default RentonPage;
