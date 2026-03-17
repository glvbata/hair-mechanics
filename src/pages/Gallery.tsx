import { useState, useEffect, useMemo } from 'react';
import { X, Phone } from 'lucide-react';
import PageLayout from '../components/PageLayout';

type Category = 'all' | 'fade' | 'taper' | 'classic' | 'beard' | 'kids';

interface GalleryImage {
  src: string;
  category: Category[];
  alt: string;
}

// Categorize images — since these are from Facebook and we can't tell from filenames,
// we distribute them across categories for filtering. You can re-categorize later.
const galleryImages: GalleryImage[] = [
  { src: "/assets/haircuts/cut_1-1.jpg", category: ['fade'], alt: "Fade haircut" },
  { src: "/assets/haircuts/cut_1-2.jpg", category: ['fade'], alt: "Skin fade" },
  { src: "/assets/haircuts/cut_1-3.jpg", category: ['taper'], alt: "Taper cut" },
  { src: "/assets/haircuts/117177259_171243871267999_2539513688223642210_n.jpg", category: ['fade'], alt: "Fade haircut style" },
  { src: "/assets/haircuts/117194153_171243904601329_3184484268043285779_n.jpg", category: ['taper'], alt: "Taper haircut" },
  { src: "/assets/haircuts/117212049_171243447934708_1504320330852135190_n.jpg", category: ['classic'], alt: "Classic haircut" },
  { src: "/assets/haircuts/117246166_171243501268036_6943416825657207028_n.jpg", category: ['fade'], alt: "Mid fade" },
  { src: "/assets/haircuts/117301459_171243674601352_9128453643540599895_n.jpg", category: ['beard'], alt: "Beard trim and shape" },
  { src: "/assets/haircuts/117306837_171243944601325_3137892813058056448_n.jpg", category: ['fade'], alt: "Skin fade haircut" },
  { src: "/assets/haircuts/117312549_171244097934643_4165608619082929260_n.jpg", category: ['taper'], alt: "Taper fade" },
  { src: "/assets/haircuts/117316301_171243951267991_615931564478480879_n.jpg", category: ['classic'], alt: "Classic men's cut" },
  { src: "/assets/haircuts/117336554_171243754601344_6269840343230817545_n.jpg", category: ['fade'], alt: "Low fade" },
  { src: "/assets/haircuts/117339330_171243734601346_3884303529806118020_n.jpg", category: ['beard'], alt: "Beard grooming" },
  { src: "/assets/haircuts/117341248_171243814601338_2923503478215104209_n.jpg", category: ['fade'], alt: "High fade" },
  { src: "/assets/haircuts/117354996_171243571268029_2743043945717384265_n.jpg", category: ['taper'], alt: "Taper cut style" },
  { src: "/assets/haircuts/117367707_171244057934647_8582219426566142485_n.jpg", category: ['classic'], alt: "Classic haircut" },
  { src: "/assets/haircuts/117381696_171243787934674_8394206958897097299_n.jpg", category: ['fade'], alt: "Fade with design" },
  { src: "/assets/haircuts/117391176_171243981267988_7568359580580046051_n.jpg", category: ['beard'], alt: "Beard trim" },
  { src: "/assets/haircuts/117392482_171243824601337_3395631504897013690_n.jpg", category: ['fade'], alt: "Clean fade" },
  { src: "/assets/haircuts/117392684_171243687934684_7827229805858208524_n.jpg", category: ['taper'], alt: "Taper blend" },
  { src: "/assets/haircuts/117398815_171243617934691_2557385180871969227_n.jpg", category: ['classic'], alt: "Classic style" },
  { src: "/assets/haircuts/117592260_171243714601348_1515291277186717910_n.jpg", category: ['fade'], alt: "Fade haircut" },
  { src: "/assets/haircuts/117596826_171244114601308_9202047305979245262_n.jpg", category: ['beard'], alt: "Beard shape up" },
  { src: "/assets/haircuts/117606138_171243524601367_5235036221306176632_n.jpg", category: ['taper'], alt: "Taper fade" },
  { src: "/assets/haircuts/117616116_171243464601373_8403484118767972182_n.jpg", category: ['fade'], alt: "Mid fade style" },
  { src: "/assets/haircuts/117648169_171243891267997_8807645488976187584_n.jpg", category: ['classic'], alt: "Classic cut" },
  { src: "/assets/haircuts/117649652_171243724601347_1121076096998174922_n.jpg", category: ['fade'], alt: "Fade" },
  { src: "/assets/haircuts/117666711_171243541268032_6330189113066832076_n.jpg", category: ['taper'], alt: "Taper" },
  { src: "/assets/haircuts/117706222_171243864601333_3873380388721576884_n.jpg", category: ['beard'], alt: "Beard work" },
  { src: "/assets/haircuts/117714320_171243421268044_1198405247214800215_n.jpg", category: ['fade'], alt: "Fade" },
  { src: "/assets/haircuts/117724429_171244047934648_6953493351766151312_n.jpg", category: ['classic'], alt: "Classic" },
  { src: "/assets/haircuts/117726969_171243601268026_1693472497321000755_n.jpg", category: ['fade'], alt: "Fade" },
  { src: "/assets/haircuts/117756676_171243797934673_5141401677822179_n.jpg", category: ['taper'], alt: "Taper" },
  { src: "/assets/haircuts/117764172_171244121267974_8102207010045562480_n.jpg", category: ['fade'], alt: "Fade" },
  { src: "/assets/haircuts/117769068_171244037934649_2486369129904534195_n.jpg", category: ['beard'], alt: "Beard" },
  { src: "/assets/haircuts/117771771_171243484601371_1235303961218640444_n.jpg", category: ['classic'], alt: "Classic" },
  { src: "/assets/haircuts/117842512_171243967934656_4538198746717045797_n.jpg", category: ['fade'], alt: "Fade" },
  { src: "/assets/haircuts/118403749_178450983880621_1989438386961960122_n.jpg", category: ['taper'], alt: "Taper" },
  { src: "/assets/haircuts/118487989_178697363855983_6147248210252892268_n.jpg", category: ['fade'], alt: "Fade" },
  { src: "/assets/haircuts/118498211_178430617215991_6145526906636965839_n.jpg", category: ['classic'], alt: "Classic" },
  { src: "/assets/haircuts/118515188_178451010547285_3281519962290917570_n.jpg", category: ['fade'], alt: "Fade" },
  { src: "/assets/haircuts/118519089_178697380522648_3876600016891248877_n.jpg", category: ['beard'], alt: "Beard" },
  { src: "/assets/haircuts/118537497_178430477216005_1199379388011466912_n.jpg", category: ['taper'], alt: "Taper" },
  { src: "/assets/haircuts/118544942_178451023880617_7709044802301241993_n.jpg", category: ['fade'], alt: "Fade" },
  { src: "/assets/haircuts/118552830_178430570549329_6328414942930746856_n.jpg", category: ['classic'], alt: "Classic" },
  { src: "/assets/haircuts/118583704_178697420522644_9112869283729704689_n.jpg", category: ['fade'], alt: "Fade" },
  { src: "/assets/haircuts/118604754_178430493882670_6592322216392164492_n.jpg", category: ['beard'], alt: "Beard" },
  { src: "/assets/haircuts/118615742_178450970547289_6851998880024028926_n.jpg", category: ['taper'], alt: "Taper" },
  { src: "/assets/haircuts/118641201_178430530549333_7051180895122417740_n.jpg", category: ['fade'], alt: "Fade" },
  { src: "/assets/haircuts/118647998_178697413855978_5964264709281205411_n.jpg", category: ['classic'], alt: "Classic" },
  { src: "/assets/haircuts/118652577_178430513882668_8796341061393385556_n.jpg", category: ['fade'], alt: "Fade" },
  { src: "/assets/haircuts/118677177_178430580549328_3832755245709368582_n.jpg", category: ['beard'], alt: "Beard" },
  { src: "/assets/haircuts/119009452_181409153584804_3007842038921260012_n.jpg", category: ['taper'], alt: "Taper" },
  { src: "/assets/haircuts/119037637_181409170251469_5811987441242090646_n.jpg", category: ['fade'], alt: "Fade" },
  { src: "/assets/haircuts/119096006_181409213584798_841336634579845397_n.jpg", category: ['classic'], alt: "Classic" },
  { src: "/assets/haircuts/119117408_181409196918133_5079997678844632271_n.jpg", category: ['fade'], alt: "Fade" },
  { src: "/assets/haircuts/119181743_182081250184261_9083592135949224346_n.jpg", category: ['beard'], alt: "Beard" },
  { src: "/assets/haircuts/119244249_182650440127342_6305594959185721329_n.jpg", category: ['taper'], alt: "Taper" },
  { src: "/assets/haircuts/119415102_182081230184263_5599045700284882471_n.jpg", category: ['fade'], alt: "Fade" },
  { src: "/assets/haircuts/119459925_182650470127339_6927344400632988151_n.jpg", category: ['classic'], alt: "Classic" },
  { src: "/assets/haircuts/119475570_182081276850925_1806671613725667677_n.jpg", category: ['fade'], alt: "Fade" },
  { src: "/assets/haircuts/119520210_182650480127338_3829470504142873520_n.jpg", category: ['beard'], alt: "Beard" },
  { src: "/assets/haircuts/119564998_182650426794010_5443684404550629292_n.jpg", category: ['taper'], alt: "Taper" },
  { src: "/assets/haircuts/119710070_184741326584920_282564339425486527_n.jpg", category: ['fade'], alt: "Fade" },
  { src: "/assets/haircuts/119726049_184741369918249_1330245133753929899_n.jpg", category: ['classic'], alt: "Classic" },
  { src: "/assets/haircuts/119751951_184741346584918_8046492334387383731_n.jpg", category: ['fade'], alt: "Fade" },
  { src: "/assets/haircuts/119847559_184741383251581_3011442104850538213_n.jpg", category: ['beard'], alt: "Beard" },
  { src: "/assets/haircuts/120192866_187438606315192_8556056621658220634_n.jpg", category: ['taper'], alt: "Taper" },
  { src: "/assets/haircuts/120198954_187438666315186_2298418981343919499_n.jpg", category: ['fade'], alt: "Fade" },
  { src: "/assets/haircuts/120244548_187438732981846_1441721413991015795_n.jpg", category: ['classic'], alt: "Classic" },
  { src: "/assets/haircuts/120250917_187438816315171_3023365384090376301_n.jpg", category: ['fade'], alt: "Fade" },
  { src: "/assets/haircuts/120306053_188273976231655_6832250971169126311_n.jpg", category: ['beard'], alt: "Beard" },
  { src: "/assets/haircuts/120332120_187438512981868_3476902944729840216_n.jpg", category: ['taper'], alt: "Taper" },
  { src: "/assets/haircuts/120408145_188273939564992_4001107855723984527_n.jpg", category: ['fade'], alt: "Fade" },
  { src: "/assets/haircuts/120425281_188273982898321_3467569890463318454_n.jpg", category: ['classic'], alt: "Classic" },
  { src: "/assets/haircuts/120502941_188273952898324_4665440233750489347_n.jpg", category: ['fade'], alt: "Fade" },
];

const categories: { key: Category; label: string }[] = [
  { key: 'all', label: 'All Styles' },
  { key: 'fade', label: 'Fades' },
  { key: 'taper', label: 'Tapers' },
  { key: 'classic', label: 'Classic' },
  { key: 'beard', label: 'Beard' },
];

const GalleryPage = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(12);
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const filteredImages = useMemo(() => {
    if (activeCategory === 'all') return galleryImages;
    return galleryImages.filter(img => img.category.includes(activeCategory));
  }, [activeCategory]);

  const visibleImages = filteredImages.slice(0, visibleCount);
  const hasMore = visibleCount < filteredImages.length;

  // Reset visible count when category changes
  useEffect(() => {
    setVisibleCount(12);
  }, [activeCategory]);

  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedIndex(null);
      else if (e.key === 'ArrowRight' && selectedIndex < filteredImages.length - 1) setSelectedIndex(selectedIndex + 1);
      else if (e.key === 'ArrowLeft' && selectedIndex > 0) setSelectedIndex(selectedIndex - 1);
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedIndex, filteredImages.length]);

  const handleCall = () => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', {
        send_to: 'AW-17956338356/ONVqCLjl6IgcELT1n_JC',
        value: 1.0, currency: 'USD',
      });
    }
    window.location.href = 'tel:+1-206-399-9288';
  };

  return (
    <PageLayout
      title="Gallery | Hair Mechanics Barbershop Auburn, WA | Fades, Tapers & More"
      description="Browse our portfolio of precision haircuts, fades, tapers, and beard work at Hair Mechanics in Auburn, WA. See real results from our expert barbers."
      canonical="https://hairmechanics.com/gallery"
    >
      {/* Hero header */}
      <section className="relative py-16 sm:py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900 to-dark-800"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-5xl font-bold">
            <span className="text-amber-500">Our Work</span>
          </h1>
          <p className="mt-3 text-gray-400 max-w-lg mx-auto">
            {galleryImages.length} cuts and counting — browse by style
          </p>
        </div>
      </section>

      {/* Category filters */}
      <section className="sticky top-16 z-30 bg-dark-900/95 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat.key
                    ? 'bg-amber-500 text-gray-900'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {cat.label}
                {cat.key !== 'all' && (
                  <span className="ml-1.5 text-xs opacity-70">
                    ({galleryImages.filter(img => img.category.includes(cat.key)).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="py-8 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {visibleImages.map((image, index) => (
              <div
                key={image.src}
                className="group relative cursor-pointer overflow-hidden rounded-xl aspect-square"
                onClick={() => setSelectedIndex(index)}
                role="button"
                tabIndex={0}
                aria-label={`View ${image.alt}`}
                onKeyDown={(e) => { if (e.key === 'Enter') setSelectedIndex(index); }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transform transition-all duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="text-center mt-10">
              <button
                onClick={() => setVisibleCount(prev => Math.min(prev + 12, filteredImages.length))}
                className="bg-amber-500 text-gray-900 px-8 py-3 rounded-full font-medium hover:bg-amber-400 transition-all hover:shadow-lg hover:shadow-amber-500/20"
              >
                Load More ({filteredImages.length - visibleCount} remaining)
              </button>
            </div>
          )}

          {filteredImages.length === 0 && (
            <p className="text-center text-gray-500 py-12">No images in this category yet.</p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gradient-to-r from-amber-500 to-amber-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Like What You See?</h2>
          <p className="text-gray-800 mb-6">Walk in or call — open 7 days a week.</p>
          <button onClick={handleCall} className="bg-gray-900 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition-all hover:shadow-lg inline-flex items-center">
            <Phone className="h-5 w-5 mr-2" /> (206) 399-9288
          </button>
        </div>
      </section>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedIndex(null)}
          role="dialog"
          aria-label="Image lightbox"
        >
          <div className="relative max-w-5xl w-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute top-2 right-2 text-white/70 hover:text-amber-500 transition-colors z-10 bg-black/40 rounded-full p-2"
              onClick={() => setSelectedIndex(null)}
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </button>
            {selectedIndex > 0 && (
              <button
                className="absolute left-2 text-white/70 hover:text-amber-500 transition-colors z-10 bg-black/40 rounded-full p-2"
                onClick={() => setSelectedIndex(selectedIndex - 1)}
                aria-label="Previous image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
            )}
            <img
              src={filteredImages[selectedIndex].src}
              alt={filteredImages[selectedIndex].alt}
              className="w-full h-auto max-h-[85vh] object-contain rounded-xl"
            />
            {selectedIndex < filteredImages.length - 1 && (
              <button
                className="absolute right-2 text-white/70 hover:text-amber-500 transition-colors z-10 bg-black/40 rounded-full p-2"
                onClick={() => setSelectedIndex(selectedIndex + 1)}
                aria-label="Next image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            )}
            <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white/50 text-xs bg-black/40 px-3 py-1 rounded-full">
              {selectedIndex + 1} / {filteredImages.length} — Arrow keys to navigate, Esc to close
            </p>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default GalleryPage;
