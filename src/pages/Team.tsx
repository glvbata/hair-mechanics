import { Link } from 'react-router-dom';
import { Scissors } from 'lucide-react';
import PageLayout from '../components/PageLayout';

const barbers = [
  {
    name: 'Glen Celestial',
    title: 'Owner & Lead Barber',
    bio: 'The man behind Hair Mechanics. Glen built this shop from the ground up on word-of-mouth and repeat clients. Known for clean fades, precision beard work, and making every client feel at home.',
    specialties: ['Fades', 'Beard Work', 'Classic Cuts'],
    image: '/assets/glen.jpg',
    slug: '/barber',
  },
  {
    name: 'Akshat Rait',
    title: 'Barber',
    bio: 'Akshat brings a sharp eye for detail and a passion for modern styles. Whether it\'s a taper, a skin fade, or a full style-up, he delivers consistent, clean results every time.',
    specialties: ['Tapers', 'Skin Fades', 'Modern Styles'],
    image: '/assets/akshat.jpg',
    slug: '/barber/akshat',
  },
];

const TeamPage = () => (
  <PageLayout
    title="Meet the Team | Hair Mechanics Auburn WA"
    description="Meet the barbers at Hair Mechanics in Auburn, WA — Glen Celestial and Akshat Rait. Experienced, skilled, and ready to make you look your best."
    canonical="https://hairmechanics.net/team"
  >
    {/* Hero */}
    <section className="relative py-20 sm:py-28">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("/assets/HeroImage.jpg")' }}>
        <div className="absolute inset-0 bg-dark-900/85"></div>
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-3xl sm:text-5xl font-bold">
          <span className="text-amber-500">Our Team</span>
        </h1>
        <p className="mt-4 text-lg text-gray-300 max-w-xl mx-auto">
          Skilled barbers, consistent cuts, and a shop that treats you like a regular — every time.
        </p>
      </div>
    </section>

    {/* Barber cards */}
    <section className="py-16 bg-dark-900">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid sm:grid-cols-2 gap-8">
          {barbers.map((barber) => (
            <Link
              key={barber.slug}
              to={barber.slug}
              className="group bg-gray-800 rounded-lg overflow-hidden hover:ring-2 hover:ring-amber-500 transition-all duration-200"
            >
              <div className="aspect-[4/3] overflow-hidden bg-dark-700">
                <img
                  src={barber.image}
                  alt={barber.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-amber-500">{barber.name}</h2>
                <p className="text-gray-400 text-sm mt-1 mb-3">{barber.title}</p>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">{barber.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {barber.specialties.map((s) => (
                    <span key={s} className="text-xs bg-dark-800 text-gray-300 px-3 py-1 rounded-full flex items-center gap-1">
                      <Scissors className="h-3 w-3 text-amber-500" />{s}
                    </span>
                  ))}
                </div>
                <p className="text-amber-500 text-sm font-medium mt-4 group-hover:underline">
                  View profile →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  </PageLayout>
);

export default TeamPage;
