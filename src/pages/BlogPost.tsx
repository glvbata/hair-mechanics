import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Share2, Facebook, Twitter } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const blogPostsData = {
  "top-mens-haircut-trends-2026": {
    title: "Top 5 Men's Haircut Trends for 2026",
    excerpt: "Discover the hottest men's haircut styles that are dominating this year, from modern crops to classic fades with contemporary twists.",
    image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    author: "Hair Mechanics",
    authorRole: "Auburn's Premier Barbershop",
    authorImage: "/assets/Logo.png",
    date: "April 15, 2026",
    readTime: "5 min read",
    tags: ["Trends", "Men's Styles", "Haircuts"],
    content: `
      <p class="mb-4">The world of men's hairstyling is constantly evolving, and 2026 is bringing some exciting trends to the forefront. At Hair Mechanics, we're always on top of the latest styles, and we're excited to share the top trends that are dominating this year.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4 text-amber-500">1. Textured Crop</h2>
      <p class="mb-4">The textured crop continues to evolve in 2025, with more emphasis on natural texture and movement. This versatile style features short sides with length on top, styled forward with natural texture.</p>
      <p class="mb-4">Why it's trending: The textured crop offers a perfect balance between low maintenance and style. It's adaptable to different hair types and face shapes, making it universally flattering.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4 text-amber-500">2. Modern Mullet</h2>
      <p class="mb-4">The mullet has made a significant comeback, but the 2025 version is more refined and wearable. Today's mullet features cleaner sides and a more gradual transition to the longer back section.</p>
      <p class="mb-4">Why it's trending: This style offers a bold statement while maintaining a fashionable edge. The modern interpretation makes it accessible to those who appreciate retro aesthetics with contemporary sensibilities.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4 text-amber-500">3. Clean Fade with Long Fringe</h2>
      <p class="mb-4">This style combines a clean, tight fade on the sides with significantly longer hair on top that's typically swept to one side. The contrast between the short sides and long top creates a dramatic effect.</p>
      <p class="mb-4">Why it's trending: The style offers versatility—the long top can be styled in multiple ways while the fade keeps the look clean and professional.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4 text-amber-500">4. Buzz Cut with Design</h2>
      <p class="mb-4">The traditional buzz cut gets an artistic upgrade in 2025 with the addition of subtle patterns and designs. These can range from simple lines to more complex geometric patterns.</p>
      <p class="mb-4">Why it's trending: It's a low-maintenance option that still allows for personal expression and creativity.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4 text-amber-500">5. Natural Curls</h2>
      <p class="mb-4">Men with natural curls or waves are embracing their texture in 2025, opting for cuts that enhance rather than hide their natural hair pattern. These styles typically feature shorter sides with more length on top to showcase the curl pattern.</p>
      <p class="mb-4">Why it's trending: The movement toward authenticity in personal style has made natural textures more appreciated than ever before.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4 text-amber-500">How to Choose the Right Trend for You</h2>
      <p class="mb-4">While these trends are popular, it's important to consider your hair type, face shape, and lifestyle when choosing a new style. At Hair Mechanics, our expert barbers can help you find the perfect trend-inspired cut that suits your individual needs.</p>
      
      <p class="mt-8 mb-4">Ready to try one of these trending styles? Book an appointment with us today and stay ahead of the curve!</p>
    `,
    relatedPosts: [
      {
        id: 2,
        title: "The Complete Guide to Beard Maintenance",
        slug: "complete-guide-to-beard-maintenance",
        image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 3,
        title: "How to Choose the Right Haircut for Your Face Shape",
        slug: "haircut-for-your-face-shape",
        image: "https://images.unsplash.com/photo-1619625506362-608ea7e91054?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  "complete-guide-to-beard-maintenance": {
    title: "The Complete Guide to Beard Maintenance",
    excerpt: "Learn how to keep your beard looking its best with our comprehensive guide covering everything from washing to styling.",
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    author: "Hair Mechanics",
    authorRole: "Auburn's Premier Barbershop",
    authorImage: "/assets/Logo.png",
    date: "April 8, 2026",
    readTime: "7 min read",
    tags: ["Beard Care", "Grooming", "Maintenance"],
    content: `
      <p class="mb-4">A well-maintained beard can elevate your look and boost your confidence. However, growing and maintaining a beard requires more than just letting it grow. In this comprehensive guide, we'll walk you through everything you need to know about beard maintenance.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4 text-amber-500">Daily Beard Care Routine</h2>
      <p class="mb-4">Establishing a daily beard care routine is essential for keeping your beard looking its best. Here's what your routine should include:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Washing: Clean your beard 2-3 times a week with a dedicated beard wash to remove dirt, oil, and debris without stripping natural oils.</li>
        <li>Conditioning: Apply beard conditioner or balm after washing to keep it soft and manageable.</li>
        <li>Oiling: Apply beard oil daily to moisturize both your beard and the skin beneath it.</li>
        <li>Brushing/Combing: Use a beard brush or comb daily to distribute oils, remove tangles, and train your beard hair to grow in the desired direction.</li>
      </ul>
      
      <h2 class="text-2xl font-bold mt-8 mb-4 text-amber-500">Trimming and Shaping</h2>
      <p class="mb-4">Regular trimming is crucial for maintaining a neat, intentional look. Here are some tips:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Invest in quality tools: A good beard trimmer with various guard lengths and sharp scissors are essential.</li>
        <li>Define your neckline: Trim everything below an imaginary curved line that connects your ears and passes just above your Adam's apple.</li>
        <li>Check your cheek line: Decide whether you want a natural or defined cheek line and maintain it accordingly.</li>
        <li>Maintain symmetry: Always check both sides of your face to ensure your beard is even.</li>
        <li>Regular maintenance: Trim every 1-2 weeks, depending on how fast your beard grows.</li>
      </ul>
      
      <h2 class="text-2xl font-bold mt-8 mb-4 text-amber-500">Dealing with Common Beard Problems</h2>
      <h3 class="text-xl font-semibold mt-6 mb-2 text-amber-400">Beard Itch</h3>
      <p class="mb-4">Beard itch is common, especially when you're first growing your beard. To alleviate it:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Keep your beard clean and moisturized</li>
        <li>Apply beard oil regularly to hydrate the skin beneath</li>
        <li>Exfoliate the skin under your beard once a week</li>
        <li>Avoid scratching, which can cause irritation</li>
      </ul>
      
      <h3 class="text-xl font-semibold mt-6 mb-2 text-amber-400">Beard Dandruff</h3>
      <p class="mb-4">Beard dandruff (beardruff) is flaky skin that appears in your beard. To combat it:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Wash regularly with anti-dandruff beard wash</li>
        <li>Exfoliate gently to remove dead skin cells</li>
        <li>Keep your skin and beard moisturized with beard oil</li>
        <li>Maintain a healthy diet and stay hydrated</li>
      </ul>
      
      <h3 class="text-xl font-semibold mt-6 mb-2 text-amber-400">Patchiness</h3>
      <p class="mb-4">If your beard grows unevenly or has patches:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Give it time—sometimes patches fill in after several months of growth</li>
        <li>Choose a style that works with your growth pattern</li>
        <li>Keep the beard at a length that minimizes the appearance of patches</li>
        <li>Consider beard products with thickening properties</li>
      </ul>
      
      <h2 class="text-2xl font-bold mt-8 mb-4 text-amber-500">Professional Beard Care</h2>
      <p class="mb-4">While daily maintenance can be done at home, visiting a professional barber every 4-6 weeks for a beard trim and shape-up can help maintain your beard's health and appearance. At Hair Mechanics, our barbers are experts in beard care and can provide personalized advice for your specific beard type and style goals.</p>
      
      <p class="mt-8 mb-4">Ready to take your beard to the next level? Book an appointment with us today for a professional beard trim and personalized maintenance plan!</p>
    `,
    relatedPosts: [
      {
        id: 1,
        title: "Top 5 Men's Haircut Trends for 2025",
        slug: "top-mens-haircut-trends-2026",
        image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 4,
        title: "The Ultimate Hair Product Guide: Which One Is Right for You?",
        slug: "ultimate-hair-product-guide",
        image: "https://images.unsplash.com/photo-1581674210501-c760093514f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      }
    ]
  }
};

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPostsData[slug as keyof typeof blogPostsData];
  const handleBooking = () => {
    window.location.href = 'tel:+1-206-399-9288';
  };
  
  if (!post) {
    return (
      <div className="min-h-screen bg-dark-800">
        <Navbar onBook={handleBooking} />
        <div className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <p className="mb-6">The blog post you're looking for doesn't exist or has been moved.</p>
          <Link to="/blog" className="text-amber-500 hover:text-amber-400 inline-flex items-center">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to all articles
          </Link>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-dark-800">
      <Navbar onBook={handleBooking} />
      
      <main className="pt-24">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link to="/blog" className="text-amber-500 hover:text-amber-400 inline-flex items-center mb-8">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to all articles
          </Link>
          
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag, i) => (
                <span 
                  key={i}
                  className="bg-gray-800 text-amber-500 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            
            <div className="flex items-center mb-6">
              <img
                src={post.authorImage}
                alt={post.author}
                className="w-12 h-12 rounded-full mr-4 object-cover"
              />
              <div>
                <p className="font-medium">{post.author}</p>
                <p className="text-gray-400 text-sm">{post.authorRole}</p>
              </div>
              <div className="ml-auto flex items-center text-sm text-gray-400">
                <Calendar className="h-4 w-4 mr-1" />
                <span className="mr-4">{post.date}</span>
                <Clock className="h-4 w-4 mr-1" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
          
          <div className="mb-12">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          
          <div 
            className="prose prose-lg prose-invert prose-headings:text-amber-500 prose-a:text-amber-400 max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-800">
            <div>
              <p className="text-gray-400 mb-2">Share this article</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-amber-500" aria-label="Share on Facebook">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-amber-500" aria-label="Share on Twitter">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-amber-500" aria-label="Share">
                  <Share2 className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <button
              onClick={handleBooking}
              className="btn-primary text-base"
            >
              Book an Appointment
            </button>
          </div>
        </article>
        
        {post.relatedPosts && (
          <section className="bg-gray-900 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                {post.relatedPosts.map((related) => (
                  <a 
                    key={related.id}
                    href={`/blog/${related.slug}`}
                    className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:transform hover:scale-[1.02] transition-transform duration-300"
                  >
                    <img 
                      src={related.image} 
                      alt={related.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2">{related.title}</h3>
                      <p className="text-amber-500 text-sm">Read article</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;