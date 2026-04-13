import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useSEO } from '../utils/useSEO';

const blogPosts = [
  {
    id: 4,
    title: "How to Maintain a Fade Between Cuts",
    excerpt: "A great fade starts fading within a week. Here's exactly how to keep it sharp longer — and when it's time to come back in.",
    image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    author: "Hair Mechanics",
    date: "April 19, 2026",
    readTime: "4 min read",
    tags: ["Fade", "Maintenance", "Grooming Tips"],
    slug: "how-to-maintain-a-fade"
  },
  {
    id: 3,
    title: "Best Walk-In Barber in Auburn, WA — Open Late 7 Days a Week",
    excerpt: "Need a haircut without an appointment? Hair Mechanics is Auburn's top walk-in barber shop, open until 8PM weekdays and 8AM–8PM on weekends. No booking required.",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    author: "Hair Mechanics",
    date: "April 12, 2026",
    readTime: "4 min read",
    tags: ["Walk-Ins", "Auburn WA", "Hours"],
    slug: "walk-in-barber-auburn-wa-open-late"
  },
  {
    id: 1,
    title: "Top 5 Men's Haircut Trends for 2026",
    excerpt: "Discover the hottest men's haircut styles that are dominating this year, from modern crops to classic fades with contemporary twists.",
    image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    author: "Hair Mechanics",
    date: "April 15, 2026",
    readTime: "5 min read",
    tags: ["Trends", "Men's Styles", "Haircuts"],
    slug: "top-mens-haircut-trends-2026"
  },
  {
    id: 2,
    title: "The Complete Guide to Beard Maintenance",
    excerpt: "Learn how to keep your beard looking its best with our comprehensive guide covering everything from washing to styling.",
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    author: "Hair Mechanics",
    date: "April 8, 2026",
    readTime: "7 min read",
    tags: ["Beard Care", "Grooming", "Maintenance"],
    slug: "complete-guide-to-beard-maintenance"
  }
];

const BlogPage = () => {
  useSEO({
    title: 'Hair Care Blog | Haircut Tips & Trends | Hair Mechanics Auburn WA',
    description: 'Expert hair and grooming tips from Hair Mechanics, Auburn\'s top-rated barber shop. Haircut trends, beard care, fade guides, and more.',
    canonical: 'https://hairmechanics.net/blog',
  });

  const handleBooking = () => {
    window.location.href = 'tel:+1-206-399-9288';
  };

  return (
    <div className="min-h-screen bg-dark-800">
      <Navbar onBook={handleBooking} />
      
      <main className="pt-24">
        <section className="py-12 bg-dark-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-center mb-4">
              <span className="text-amber-500">Hair Mechanics Blog</span>
            </h1>
            <p className="text-gray-300 text-center max-w-3xl mx-auto mb-12">
              Expert tips, style guides, and grooming advice from Auburn's premier barbershop professionals
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <article 
                  key={post.id}
                  className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-[1.02]"
                >
                  <div className="relative">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-50"></div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag, i) => (
                        <span 
                          key={i}
                          className="text-xs bg-gray-800 text-amber-500 px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <h2 className="text-xl font-bold mb-3 hover:text-amber-500 transition-colors">
                      <a href={`/blog/${post.slug}`}>
                        {post.title}
                      </a>
                    </h2>
                    
                    <p className="text-gray-400 mb-4">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span className="mr-4">{post.date}</span>
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{post.readTime}</span>
                    </div>
                    
                    <a 
                      href={`/blog/${post.slug}`}
                      className="text-amber-500 hover:text-amber-400 font-medium inline-flex items-center"
                    >
                      Read More
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;