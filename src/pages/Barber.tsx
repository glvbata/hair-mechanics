import PageLayout from '../components/PageLayout';
import HeroSection from '../components/HeroSection';
import CTABand from '../components/CTABand';
import PersonSchema from '../components/PersonSchema';
import { Phone, Instagram, Scissors, Clock, MapPin } from 'lucide-react';
import { BARBER_IDS, SITE_URL, SOCIAL } from '../constants/business';

const BarberPage = () => (
  <PageLayout
    title="Meet Glen Celestial | Hair Mechanics Auburn WA"
    description="Meet Glen Celestial, owner and lead barber at Hair Mechanics in Auburn, WA. Years of experience, clean fades, precision beard work, and a shop that feels like home."
    canonical={`${SITE_URL}/barber`}
  >
    <PersonSchema
      id={BARBER_IDS.glen}
      name="Glen Celestial"
      jobTitle="Owner & Lead Barber"
      description="Owner and lead barber at Hair Mechanics in Auburn, WA. Years of experience behind the chair, specializing in clean fades and precision beard work."
      image="glen.jpg"
      url={`${SITE_URL}/barber`}
      knowsAbout={["Men's haircuts", 'Fades', 'Beard trims', 'Line-ups', 'Barbering']}
      sameAs={[SOCIAL.instagram, SOCIAL.tiktok]}
    />
    <HeroSection
      eyebrow="Meet Glen"
      subhead={null}
      description="Owner and lead barber behind Hair Mechanics."
      hideCta
    />

    {/* Profile */}
    <section className="py-16 bg-dark-900">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          {/* Photo */}
          <div className="aspect-[4/5] bg-dark-700 overflow-hidden">
            <picture>
              <source srcSet="/assets/glen profile.webp" type="image/webp" />
              <img
                src="/assets/glen profile.png"
                alt="Glen Celestial — Owner and Lead Barber at Hair Mechanics"
                className="w-full h-full object-cover object-center"
                decoding="async"
                width="800"
                height="1000"
              />
            </picture>
          </div>

          <div className="p-8 sm:p-10">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gold-500">Glen Celestial</h2>
              <p className="text-gray-400 mt-1">Owner & Lead Barber</p>
              <p className="text-gray-400 text-sm mt-1">Hair Mechanics — Auburn, WA</p>
            </div>

            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Hair Mechanics started with a simple idea: give people a great haircut in a place that feels like home.
                What began as a dream turned into Auburn's go-to barber shop, built on word of mouth and repeat clients
                who keep coming back.
              </p>
              <p>
                With years of experience behind the chair, every cut is about more than just hair — it's about
                making people feel confident when they walk out the door. From clean fades to precision beard work,
                the attention to detail is what sets Hair Mechanics apart.
              </p>
              <p>
                The shop is open 7 days a week because looking good shouldn't have to wait. Walk-ins are always
                welcome, and every client gets the same level of care whether it's their first visit or their fiftieth.
              </p>
            </div>

            {/* Social links */}
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-gold-500 hover:text-gold-400 transition-colors"
              >
                <Instagram className="h-5 w-5 mr-2" /> @hairmechanics1997
              </a>
              <a
                href={SOCIAL.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-gold-500 hover:text-gold-400 transition-colors"
              >
                🎵 TikTok
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Quick facts */}
    <section className="py-12 bg-dark-800">
      <div className="max-w-3xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { icon: Scissors, label: 'Specialties', value: 'Fades & Beard Work' },
            { icon: Clock, label: 'Open', value: '7 Days a Week' },
            { icon: MapPin, label: 'Location', value: 'Auburn, WA' },
            { icon: Phone, label: 'Walk-ins', value: 'Always Welcome' },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              <item.icon className="h-6 w-6 text-gold-500 mb-2" />
              <p className="text-sm font-bold">{item.value}</p>
              <p className="text-xs text-gray-400 mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <CTABand heading="Ready for a Cut?" subtext="Walk in or call — open 7 days a week." />
  </PageLayout>
);

export default BarberPage;
