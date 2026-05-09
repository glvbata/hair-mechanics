import { Phone, MapPin, Clock, Star } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import HeroSection from '../components/HeroSection';
import CTABand from '../components/CTABand';
import {
  ADDRESS,
  COORDS,
  HOURS,
  PHONE_DISPLAY,
  RATING,
  REVIEWS_COUNT,
  SERVICES,
  SITE_URL,
} from '../constants/business';

const url = `${SITE_URL}/barberia-auburn-wa`;
const englishUrl = SITE_URL;

// hreflang alternates — both Spanish and English versions declare each other,
// plus an x-default that points to the English homepage as the canonical fallback.
const ALTERNATES = [
  { hreflang: 'es', href: url },
  { hreflang: 'en', href: englishUrl },
  { hreflang: 'x-default', href: englishUrl },
];

// Service name overrides for the Spanish UI — keeps prices/slugs in sync with
// SERVICES while presenting natural Spanish labels (Mexican-leaning vocabulary).
const SERVICE_LABELS_ES: Record<string, string> = {
  'haircut': 'Corte de Pelo',
  'fade': 'Degradado (Fade)',
  'beard-trim': 'Corte + Barba',
  'kids-cut': "Corte para Niños",
  'line-up': 'Perfilado',
};

const FAQS = [
  {
    q: '¿Dónde está la mejor barbería en Auburn, WA?',
    a: `Hair Mechanics es la barbería mejor calificada de Auburn. Estamos en ${ADDRESS.full} — fácil de llegar desde Kent, Federal Way, Sumner, Puyallup y Renton. ${RATING}★ en Google con más de ${REVIEWS_COUNT} reseñas. Aceptamos walk-ins (sin cita previa) todos los días.`,
  },
  {
    q: '¿Necesito cita o puedo llegar sin appointment?',
    a: `No necesita cita. Aceptamos walk-ins todos los días. Estamos abiertos ${HOURS.weekday} entre semana y ${HOURS.weekend} los fines de semana — incluyendo domingos, cuando la mayoría de las barberías de Auburn están cerradas. Llame al ${PHONE_DISPLAY} si quiere confirmar el tiempo de espera.`,
  },
  {
    q: '¿Cuánto cuesta un corte de pelo?',
    a: `El corte de pelo estándar cuesta $${SERVICES.find((s) => s.slug === 'haircut')?.price ?? 40}. El combo de corte + barba es $${SERVICES.find((s) => s.slug === 'beard-trim')?.price ?? 50}. Los cortes para niños cuestan $${SERVICES.find((s) => s.slug === 'kids-cut')?.price ?? 30}. Sin cargos sorpresa — el precio que ve es el precio que paga.`,
  },
  {
    q: '¿Hablan español los barberos?',
    a: 'No siempre tenemos un barbero hispanohablante en turno, pero nuestro equipo está acostumbrado a clientes que hablan poco inglés. Le mostramos el largo en el peine, hablamos despacio y revisamos el corte con usted varias veces. Traiga una foto de referencia — cortamos de fotos todos los días.',
  },
  {
    q: '¿Hacen degradados (fades), líneas, y arreglo de barba?',
    a: 'Sí. Hacemos degradados bajos, medios y altos (low, mid, high fade), perfilados (line-ups), arreglo y forma de barba con toalla caliente, y todos los estilos clásicos y modernos. Si vio un corte en TikTok o Instagram que le gustó, traiga el video — se lo hacemos.',
  },
  {
    q: '¿Qué áreas atienden?',
    a: 'Atendemos a clientes de Auburn, Kent, Federal Way, Sumner, Puyallup, Renton, Tukwila, SeaTac y Tacoma. Nuestra barbería está justo al lado de la Highway 167, con estacionamiento gratis al frente.',
  },
];

const BarberiaAuburnPage = () => (
  <PageLayout
    title="Barbería en Auburn, WA | Cortes de Pelo y Degradados | Hair Mechanics"
    description={`¿Buscando una barbería cerca de mi en Auburn, WA? Hair Mechanics — cortes de pelo, degradados, arreglo de barba. Walk-ins bienvenidos, abiertos 7 días. Llame al ${PHONE_DISPLAY}.`}
    canonical={url}
    lang="es"
    alternates={ALTERNATES}
    schema={{
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage: 'es',
      mainEntity: FAQS.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    }}
    schemaId="barberia-faq-schema"
  >
    <HeroSection
      eyebrow="Barbería en Auburn, WA"
      subhead="Cortes de Pelo · Walk-Ins Bienvenidos"
      description={`Hair Mechanics — la barbería mejor calificada de Auburn. Cortes, degradados (fades), arreglo de barba. Abiertos 7 días, sin cita necesaria. ${RATING}★ en Google con más de ${REVIEWS_COUNT} reseñas.`}
      ctaLabel={`Llame Ahora: ${PHONE_DISPLAY}`}
    />

    {/* Long-form intro in Spanish — covers the cluster of high-volume Spanish
        queries seen in GBP: barbería cerca de mi, corte de pelo, barbershop
        cerca de mi abierto. */}
    <section className="py-16 bg-dark-800">
      <div className="max-w-3xl mx-auto px-4 prose prose-invert prose-lg max-w-none prose-headings:text-gold-500 prose-a:text-gold-400">
        <h2>La Mejor Barbería en Auburn, Washington</h2>
        <p>
          Cuando la gente busca una <strong>barbería cerca de mi</strong> en Auburn, terminan en Hair Mechanics. Somos una barbería de servicio completo en {ADDRESS.street}, en pleno centro de Auburn, WA — cerca de la Highway 167, el Auburn Outlet, y Green River College. Ya sea que viva aquí o venga manejando desde Kent, Federal Way, Sumner o Puyallup, va a encontrar barberos expertos, precios justos, y la posibilidad de entrar sin cita.
        </p>
        <p>
          Nos especializamos en <strong>cortes de pelo para hombre, degradados (fades), arreglo de barba, perfilados (line-ups), y cortes para niños</strong>. Nuestros barberos saben trabajar con todo tipo de cabello — lacio, ondulado, rizado, grueso, fino — y nos enorgullece atender a la diversa comunidad de Auburn, incluyendo clientes mexicanos, centroamericanos, filipinos, y asiáticos que nos dicen que somos la única barbería de la zona que entiende su tipo de cabello desde el primer corte.
        </p>
        <h2>¿Por Qué Auburn Elige Hair Mechanics?</h2>
        <p>
          No somos la barbería <em>más barata</em> de Auburn — y eso es a propósito. Un degradado limpio o una barba bien perfilada toman tiempo, las herramientas correctas, y un barbero con años de experiencia. Nuestro corte estándar de $40 incluye consulta, corte de precisión, perfilado del cuello, y peinado — no un pase rápido de máquina. Muéstrenos una foto de lo que quiere; le decimos honestamente si le va a quedar con su tipo de cabello, y qué se le va a ver mejor si no.
        </p>
        <p>
          Walk-ins son siempre bienvenidos. Estamos abiertos {HOURS.weekday} entre semana y {HOURS.weekend} los fines de semana — incluyendo domingos, cuando la mayoría de las barberías de Auburn están cerradas. Estacionamiento gratis al frente, sin esperas incómodas, y barberos que platican con usted como si fuera su primo.
        </p>
      </div>
    </section>

    <section className="py-16 bg-dark-900">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gold-500 text-center mb-10">Servicios y Precios</h2>
        <div className="space-y-3 max-w-lg mx-auto">
          {SERVICES.map((s) => (
            <div key={s.slug} className="flex justify-between items-center bg-gray-800 px-5 py-4 rounded-lg">
              <span className="font-medium">{SERVICE_LABELS_ES[s.slug] ?? s.name}</span>
              <span className="text-gold-500 font-bold text-lg">${s.price}</span>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-400 text-sm mt-8 max-w-2xl mx-auto">
          Los precios incluyen consulta, corte y peinado. Agregue arreglo de barba o perfilado a cualquier corte para una sesión completa.
        </p>
      </div>
    </section>

    <section className="py-16 bg-dark-800">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gold-500 text-center mb-10">Por Qué Auburn Confía en Hair Mechanics</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { icon: Star, title: `${RATING} Estrellas en Google`, desc: `Más de ${REVIEWS_COUNT} reseñas — calificación constante de los locales.` },
            { icon: Clock, title: 'Abiertos 7 Días', desc: `${HOURS.weekday}, ${HOURS.weekend}.` },
            { icon: MapPin, title: 'En el Centro de Auburn', desc: `${ADDRESS.full} — estacionamiento gratis.` },
            { icon: Phone, title: 'Walk-Ins Bienvenidos', desc: 'Sin cita necesaria. Llame o simplemente venga.' },
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

    {/* FAQ — also emitted as FAQPage JSON-LD in Spanish via PageLayout.schema. */}
    <section className="py-16 bg-dark-900">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gold-500 text-center mb-10">Preguntas Frecuentes</h2>
        <div className="space-y-4">
          {FAQS.map(({ q, a }, i) => (
            <details key={i} className="bg-gray-800 rounded-lg p-5 group">
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

    <section className="py-12 bg-dark-800">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gold-500 text-center mb-8">Encuéntrenos en Auburn</h2>
        <div className="rounded-lg overflow-hidden h-64 sm:h-80">
          <iframe
            title="Hair Mechanics Auburn — Ubicación"
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2706.5!2d${COORDS.lng}!3d${COORDS.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5490597faf9a7db9%3A0x2b1b86ed4f8db0cd!2sHair%20Mechanics%20LLC!5e0!3m2!1ses!2sus!4v1`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <p className="text-center text-gray-400 text-sm mt-6">
          {ADDRESS.full} · Junto a la Highway 167 · Estacionamiento gratis
        </p>
      </div>
    </section>

    <CTABand heading="La Barbería Favorita de Auburn" subtext="Llame o venga directamente — lo atendemos." />
  </PageLayout>
);

export default BarberiaAuburnPage;
