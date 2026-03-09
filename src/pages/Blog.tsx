import React from 'react';
import { Calendar, User, Clock, Tag } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const blogPosts = [
  {
    id: 1,
    title: "Top 5 Men's Haircut Trends for 2025",
    excerpt: "Discover the hottest men's haircut styles that are dominating this year, from modern crops to classic fades with contemporary twists.",
    image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    author: "James Wilson",
    date: "April 15, 2025",
    readTime: "5 min read",
    tags: ["Trends", "Men's Styles", "Haircuts"],
    slug: "top-mens-haircut-trends-2025"
  },
  {
    id: 2,
    title: "The Complete Guide to Beard Maintenance",
    excerpt: "Learn how to keep your beard looking its best with our comprehensive guide covering everything from washing to styling.",
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    author: "Michael Rodriguez",
    date: "April 8, 2025",
    readTime: "7 min read",
    tags: ["Beard Care", "Grooming", "Maintenance"],
    slug: "complete-guide-to-beard-maintenance"
  },
  {
    id: 3,
    title: "How to Choose the Right Haircut for Your Face Shape",
    excerpt: "Finding the perfect haircut for your face shape can make all the difference. We break down the best styles for every face shape.",
    image: "https://images.unsplash.com/photo-1619625506362-608ea7e91054?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    author: "David Chen",
    date: "March 27, 2025",
    readTime: "6 min read",
    tags: ["Hair Guide", "Face Shapes", "Style Tips"],
    slug: "haircut-for-your-face-shape"
  },
  {
    id: 4,
    title: "The Ultimate Hair Product Guide: Which One Is Right for You?",
    excerpt: "Navigate the world of hair products with confidence. From pomades to clays, we help you find the perfect product for your style.",
    image: "https://images.unsplash.com/photo-1581674210501-c760093514f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    author: "James Wilson",
    date: "March 18, 2025",
    readTime: "8 min read",
    tags: ["Products", "Styling", "Hair Care"],
    slug: "ultimate-hair-product-guide"
  },
  {
    id: 5,
    title: "From Bowl Cuts to Buzz Cuts: The Evolution of Men's Hairstyles",
    excerpt: "Take a journey through the decades and explore how men's hairstyles have evolved and the cultural influences behind them.",
    image: "https://images.unsplash.com/photo-1593702288056-f17f118085d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    author: "Michael Rodriguez",
    date: "March 5, 2025",
    readTime: "10 min read",
    tags: ["History", "Hair Culture", "Trends"],
    slug: "evolution-of-mens-hairstyles"
  },
  {
    id: 6,
    title: "5 Quick Fixes for Bad Hair Days",
    excerpt: "Everyone has bad hair days, but with these simple tricks and tips, you can turn your hair situation around in minutes.",
    image: "https://images.unsplash.com/photo-1586083702768-190ae093d34d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    author: "David Chen",
    date: "February 22, 2025",
    readTime: "4 min read",
    tags: ["Quick Tips", "Hair Care", "Styling"],
    slug: "quick-fixes-for-bad-hair-days"
  }
];

const BlogPage = () => {
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
                      <User className="h-4 w-4 mr-1" />
                      <span className="mr-4">{post.author}</span>
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