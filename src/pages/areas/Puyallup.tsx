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

const url = `${SITE_URL}/puyallup-barber`;

const FAQ_ITEMS = [
  {
    q: 'How far is Hair Mechanics from Puyallup, WA?',
    a: `About 15 minutes north via WA-167 or WA-512. Quick drive from South Hill, downtown Puyallup, Edgewood, or anywhere along Pioneer Way to ${ADDRESS.full}.`,
  },
  {
    q: 'Why drive from Puyallup for a haircut?',
    a: `${RATING}-star Google rating across ${REVIEWS_COUNT}+ reviews — Puyallup clients drive in because the cut quality holds up every visit. Walk-ins welcome 7 days, open until 8pm.`,
  },
  {
    q: 'Best route from Puyallup?',
    a: 'WA-167 north is fastest from downtown and South Hill — about 15 minutes. WA-512 to WA-167 also works from east Puyallup. Free parking right out front.',
  },
  {
    q: 'What hours work for Puyallup commuters?',
    a: `${HOURS.weekday}, ${HOURS.weekend}. Open until 8pm every night so you can stop in after work coming up from Pierce County.`,
  },
  {
    q: 'Walk-ins or appointment?',
    a: 'Walk in any day during open hours. Call (206) 399-9288 ahead if you want a current wait estimate before you make the drive from Puyallup.',
  },
];

const RELATED = [
  { to: '/services/fade', label: 'Fade Haircuts', desc: 'Skin, mid, taper.' },
  { to: '/services/haircut', label: "Men's Haircut", desc: '$40 precision cut.' },
  { to: '/services/beard-trim', label: 'Haircut + Beard', desc: '$50 combo.' },
  { to: '/auburn-barber', label: 'Auburn, WA', desc: 'Our home shop.' },
  { to: '/sumner-barber', label: 'Near Sumner', desc: 'Also serving Sumner.' },
  { to: '/gallery', label: '76+ Cut Gallery', desc: 'See real cuts.' },
];

const PuyallupPage = () => (
  <PageLayout
    title="Barber Shop Near Puyallup WA | Hair Mechanics Auburn | Fades & Cuts"
    description={`Looking for a barber near Puyallup, WA? Hair Mechanics in Auburn is 15 minutes via WA-167. Expert haircuts, fades, beard trims. Walk-ins welcome. Call ${PHONE_DISPLAY}.`}
    canonical={url}
  >
    <HeroSection
      eyebrow="Barber Shop Near Puyallup, WA"
      subhead={null}
      description={
        <>
          <p>Hair Mechanics in Auburn is a quick drive north from Puyallup. Precision haircuts, clean fades, and beard work — walk-ins welcome.</p>
          <div className="mt-3 text-gray-400 text-sm flex items-center justify-center">
            <MapPin className="h-4 w-4 mr-1" /> ~15 minutes from Puyallup via WA-167 / WA-512
          </div>
        </>
      }
      ctaLabel={`Call Now: ${PHONE_DISPLAY}`}
    />

    {/* Drive context */}
    <section className="py-16 bg-dark-900">
      <div className="max-w-3xl mx-auto px-4 text-gray-300 leading-relaxed">
        <h2 className="text-2xl font-bold text-gold-500 mb-6 text-center">Quick Drive from Puyallup</h2>
        <p className="mb-4">
          Coming from South Hill, downtown Puyallup, Edgewood, or anywhere along Pioneer Way — we're a 15-minute trip north on WA-167 (or WA-512 to WA-167 from the east side). Easy in, easy out, free parking right at the shop.
        </p>
        <p className="mb-4">
          We see Puyallup clients regularly — from State Fair area to South Hill Mall — because the cut comes out clean every time. {REVIEWS_COUNT}+ Google reviews and a {RATING}-star rating across the South King and Pierce County area. Call <a href={`tel:${PHONE_DISPLAY}`} className="text-gold-500 underline">{PHONE_DISPLAY}</a> ahead or just walk in.
        </p>
      </div>
    </section>

    <section className="py-16 bg-dark-800">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gold-500 text-center mb-10">Why Puyallup Clients Choose Us</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { icon: Car, title: 'Easy Drive from Puyallup', desc: `Located at ${ADDRESS.full} — quick trip via WA-167 or WA-512.` },
            { icon: Star, title: `${RATING} Google Rating`, desc: `Trusted by clients across South King and Pierce County — ${REVIEWS_COUNT} reviews.` },
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

    <FAQ items={FAQ_ITEMS} schemaId="puyallup-faq-schema" />

    <RelatedLinks heading="Explore More" links={RELATED} />

    <CTABand heading="Worth the Drive from Puyallup" subtext="Walk in or call — open 7 days a week." />
  </PageLayout>
);

export default PuyallupPage;
