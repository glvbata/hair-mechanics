import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Share2, Facebook, Twitter } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useSEO } from '../utils/useSEO';
import { PHONE_TEL, SITE_URL } from '../constants/business';
import { BLOG_POSTS, getBlogPost } from '../data/blogPosts';

const toISODate = (dateStr: string): string => {
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? dateStr : d.toISOString().split('T')[0];
};

const BlogPost = () => {
  const { slug } = useParams();
  const post = getBlogPost(slug);

  // BlogPosting JSON-LD — built inline so useSEO handles injection + cleanup.
  const blogSchema = post && slug ? {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: toISODate(post.date),
    dateModified: toISODate(post.date),
    author: {
      '@type': 'Organization',
      name: 'Hair Mechanics',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'LocalBusiness',
      name: 'Hair Mechanics',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/assets/Logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${slug}`,
    },
    url: `${SITE_URL}/blog/${slug}`,
  } : undefined;

  useSEO({
    title: post ? `${post.title} | Hair Mechanics Auburn WA` : 'Post Not Found | Hair Mechanics',
    description: post ? post.excerpt : 'Hair Mechanics barbershop blog — haircut tips, grooming guides, and style trends.',
    canonical: slug ? `${SITE_URL}/blog/${slug}` : `${SITE_URL}/blog`,
    ogImage: post ? post.image : undefined,
    schema: blogSchema,
    schemaId: 'blog-post-schema',
  });

  const handleBooking = () => {
    window.location.href = `tel:${PHONE_TEL}`;
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-dark-800">
        <Navbar onBook={handleBooking} />
        <div className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <p className="mb-6">The blog post you're looking for doesn't exist or has been moved.</p>
          <Link to="/blog" className="text-gold-500 hover:text-gold-400 inline-flex items-center">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to all articles
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Resolve related posts from slugs — skip any that can't be found.
  const relatedPosts = post.related
    .map((r) => BLOG_POSTS[r.slug])
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="min-h-screen bg-dark-800">
      <Navbar onBook={handleBooking} />

      <main className="pt-24">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link to="/blog" className="text-gold-500 hover:text-gold-400 inline-flex items-center mb-8">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to all articles
          </Link>

          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-gray-800 text-gold-500 px-3 py-1 rounded-full text-sm"
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

          {/* Blog content is author-controlled HTML stored in src/data/blogPosts.ts — no user input is
              interpolated, so dangerouslySetInnerHTML is safe here. */}
          <div
            className="prose prose-lg prose-invert prose-headings:text-gold-500 prose-a:text-gold-400 max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-800">
            <div>
              <p className="text-gray-400 mb-2">Share this article</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-gold-500" aria-label="Share on Facebook">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gold-500" aria-label="Share on Twitter">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gold-500" aria-label="Share">
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

        {relatedPosts.length > 0 && (
          <section className="bg-gray-900 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold mb-8">Related Articles</h2>

              <div className="grid md:grid-cols-3 gap-8">
                {relatedPosts.map((related) => (
                  <a
                    key={related.slug}
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
                      <p className="text-gold-500 text-sm">Read article</p>
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
