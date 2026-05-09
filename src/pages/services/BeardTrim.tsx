import PageLayout from '../../components/PageLayout';
import ServiceSchema from '../../components/ServiceSchema';
import HeroSection from '../../components/HeroSection';
import CTABand from '../../components/CTABand';
import { ADDRESS, HOURS, PHONE_DISPLAY, RATING, SITE_URL, getService } from '../../constants/business';

const svc = getService('beard-trim')!;
const url = `${SITE_URL}/services/beard-trim`;

const FAQS = [
  {
    q: 'How much is a beard trim near me in Auburn, WA?',
    a: `Hair Mechanics offers a haircut + beard trim combo for $${svc.price} — that includes a full haircut, beard shape-up, neckline cleanup, and line work. A standalone beard trim is best paired with a haircut for the cleanest finish.`,
  },
  {
    q: "What's the difference between a beard trim and beard shaping?",
    a: 'A beard trim takes off length and bulk to keep your beard tidy. Beard shaping (which we include in the combo) defines the cheek line, jaw line, and neck line so the beard frames your face cleanly. Most clients want both — done together they look intentional, not just "trimmed".',
  },
  {
    q: 'Do you do hot-towel beard service?',
    a: 'Yes — our beard combo finishes with a hot-towel treatment to soften the skin and lay the beard down for a sharper line. It also feels great after a long week. No extra charge.',
  },
  {
    q: 'Can you fix a patchy or uneven beard?',
    a: "Patchy beards aren't a flaw — they're a styling problem. We'll work with what's there: shape the line so the patchy spots aren't the focus, suggest a length that hides them, and tell you honestly whether a goatee or chinstrap will look better than a full beard. Bring a reference photo.",
  },
  {
    q: 'Do I need an appointment for a beard trim?',
    a: `No — walk-ins are welcome at our Auburn shop (${ADDRESS.full}). We're open ${HOURS.weekday} on weekdays and ${HOURS.weekend} on weekends. A beard combo runs about 30–45 minutes; call ${PHONE_DISPLAY} ahead if you want to confirm wait times.`,
  },
  {
    q: 'How often should I get a beard trim?',
    a: "Every 3–4 weeks for a cleanly-shaped beard. Every 6 weeks if you're growing it out and just want the neck/cheek lines cleaned up. Daily home maintenance (a beard comb + light beard oil) keeps the shape between visits.",
  },
];

const BeardTrimPage = () => (
  <PageLayout
    title={`Beard Trim Near Me | Beard Shaping in Auburn, WA | Hair Mechanics`}
    description={`Looking for a beard trim near me in Auburn, WA? Hair Mechanics offers professional beard trims, shaping, and hot-towel finish. Combo with haircut $${svc.price}. Walk-ins welcome.`}
    canonical={url}
    schema={{
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQS.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    }}
    schemaId="beard-trim-faq-schema"
  >
    <ServiceSchema
      name="Beard Trim & Shaping"
      description="Professional beard trim and shaping with hot-towel finish, included in the haircut + beard combo at Hair Mechanics in Auburn, WA."
      price={svc.price.toFixed(2)}
      url={url}
    />
    <HeroSection
      eyebrow="Beard Trim Near Me"
      subhead="Beard Shaping in Auburn, WA"
      description="Clean lines, precise shaping, and a hot-towel finish — paired with a fresh cut for the complete look. Walk-ins welcome."
      ctaLabel={`Book Now: ${PHONE_DISPLAY}`}
    />

    {/* Long-form intro — was previously two cards + stats strip, ranked
        position 61. Adding 400+ words of natural keyword-rich copy plus an
        FAQ block to claim the "beard trim near me" / "beard shaping Auburn"
        cluster. */}
    <section className="py-16 bg-dark-800">
      <div className="max-w-3xl mx-auto px-4 prose prose-invert prose-lg max-w-none prose-headings:text-gold-500 prose-a:text-gold-400">
        <h2>The Best Beard Trim in Auburn, WA</h2>
        <p>
          When Auburn locals search for a <strong>beard trim near me</strong>, they end up at Hair Mechanics. Our barbers don't just take length off — we shape your beard around your face, clean the neck and cheek lines, and finish with a hot towel for a salon-grade result. A real <strong>beard shaping</strong> is the difference between "I trimmed it myself" and "where do you go?"
        </p>
        <h2>What a Beard Trim at Hair Mechanics Looks Like</h2>
        <p>
          Every beard combo includes a consult, a length-reduction trim with clippers and shears, neckline definition, cheek line cleanup, mustache shaping, and a hot-towel finish. We use sharp tools, sanitized between every client, and we'll tell you honestly if a slightly different length or shape will work better for your face. If you're growing it out, we'll just clean the lines and leave the bulk alone.
        </p>
        <h2>Combo Pricing — Haircut + Beard</h2>
        <p>
          The smartest way to get a beard trim is with a haircut. Our combo is <strong>${svc.price}</strong> — full haircut, beard shape-up, neckline, and hot towel. That's significantly less than booking the two separately at most Auburn shops, and it's the only way to make sure your hairline and beard line look intentional together.
        </p>
        <h2>Walk-Ins Welcome — Open 7 Days</h2>
        <p>
          We're at <strong>{ADDRESS.full}</strong> in central Auburn, just off Highway 167. Open {HOURS.weekday} on weekdays and {HOURS.weekend} on weekends — including Sundays, when most barbers nearby are closed. Walk in or call <strong>{PHONE_DISPLAY}</strong>.
        </p>
      </div>
    </section>

    <section className="py-16 bg-dark-900">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gold-500 text-center mb-10">What's Included</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { name: 'Haircut & Beard Combo', price: `$${svc.price}`, desc: 'Full haircut + beard shaping, neckline, mustache trim, and hot-towel finish.' },
            { name: 'Beard Add-On', price: 'Included', desc: 'Beard shaping is included in the combo — no upcharge for the hot towel or line work.' },
          ].map((s, i) => (
            <div key={i} className="bg-gray-800 p-6 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold">{s.name}</h3>
                <span className="text-gold-500 font-bold">{s.price}</span>
              </div>
              <p className="text-gray-400 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* FAQ — also emitted as FAQPage JSON-LD via PageLayout.schema for
        rich SERP results. */}
    <section className="py-16 bg-dark-800">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gold-500 text-center mb-10">Beard Trim FAQs</h2>
        <div className="space-y-4">
          {FAQS.map(({ q, a }, i) => (
            <details key={i} className="bg-gray-900 rounded-lg p-5 group">
              <summary className="font-semibold text-white cursor-pointer list-none flex justify-between items-center">
                {q}
                <span className="text-gold-500 text-xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="text-gray-300 mt-3 leading-relaxed">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>

    <section className="py-12 bg-dark-900">
      <div className="max-w-3xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { label: 'Years Experience', value: '5+' },
            { label: 'Google Rating', value: `${RATING} ★` },
            { label: 'Walk-ins Welcome', value: '✓' },
            { label: 'Open 7 Days', value: '✓' },
          ].map((s, i) => (
            <div key={i}>
              <p className="text-2xl font-bold text-gold-500">{s.value}</p>
              <p className="text-sm text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <CTABand heading="Get the Full Package" subtext="Haircut + beard trim combo — walk in or call today." />
  </PageLayout>
);

export default BeardTrimPage;
