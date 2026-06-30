import Link from 'next/link';
import { Container } from '@/components/Container';
import { Button } from '@/components/Button';
import { ProductCard } from '@/components/ProductCard';
import { getFeaturedProducts } from '@/lib/api/products';
import { getCategories } from '@/lib/api/categories';

export default async function Home() {
  const [featuredProducts, categories] = await Promise.all([
    getFeaturedProducts(4),
    getCategories(),
  ]);

  return (
    <>
      {/* Hero Section */}
      <section id="hero" className="bg-green-50 py-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Bring nature into your home
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Discover our curated collection of indoor plants, succulents, and stylish planters. 
              Each plant is carefully selected to thrive in your space.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button as={Link} href="/shop" size="lg">
                Shop All Plants
              </Button>
              <Button as={Link} href="/about" variant="secondary" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Products */}
      <section id="featured" className="py-20">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Customer Favorites
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These beloved plants have earned top ratings from our community
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button as={Link} href="/shop" variant="secondary">
              View All Products
            </Button>
          </div>
        </Container>
      </section>

      {/* Categories */}
      <section id="categories" className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-gray-600">
              Find the perfect plants for your lifestyle
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map(category => (
              <Link
                key={category.id}
                href={`/shop?category=${category.slug}`}
                className="group bg-white rounded-lg p-8 hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-green-800 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Benefits */}
      <section id="benefits" className="py-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Quality Guaranteed
              </h3>
              <p className="text-gray-600">
                Every plant is carefully inspected and ships in perfect condition
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Care Guides
              </h3>
              <p className="text-gray-600">
                Detailed instructions help you keep your plants thriving
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Sustainable Practices
              </h3>
              <p className="text-gray-600">
                Eco-friendly packaging and responsibly sourced plants
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Newsletter */}
      <section id="newsletter" className="py-20 bg-green-800 text-white">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join Our Plant Community
            </h2>
            <p className="text-green-100 mb-8 text-lg">
              Get plant care tips, exclusive offers, and inspiration delivered to your inbox
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <label htmlFor="hero-newsletter-email" className="sr-only">Email address</label>
              <input
                id="hero-newsletter-email"
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-800"
                required
              />
              <Button type="submit" variant="secondary">
                Subscribe
              </Button>
            </form>
          </div>
        </Container>
      </section>
    </>
  );
}
