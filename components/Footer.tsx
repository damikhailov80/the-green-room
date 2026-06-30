import Link from 'next/link';
import { Container } from './Container';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-auto">
      <Container>
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">The Green Room</h3>
            <p className="text-sm text-gray-600">
              Bringing nature indoors, one plant at a time.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/shop" className="text-sm text-gray-600 hover:text-green-800 transition-colors">
                  All Plants
                </Link>
              </li>
              <li>
                <Link href="/shop?category=indoor-plants" className="text-sm text-gray-600 hover:text-green-800 transition-colors">
                  Indoor Plants
                </Link>
              </li>
              <li>
                <Link href="/shop?category=succulents" className="text-sm text-gray-600 hover:text-green-800 transition-colors">
                  Succulents
                </Link>
              </li>
              <li>
                <Link href="/shop?category=large-plants" className="text-sm text-gray-600 hover:text-green-800 transition-colors">
                  Large Plants
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-4">About</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-green-800 transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-green-800 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Stay Connected</h4>
            <p className="text-sm text-gray-600 mb-4">
              Subscribe to our newsletter for plant care tips and special offers.
            </p>
            <form className="flex flex-col gap-2">
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Your email"
                className="px-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                aria-label="Email for newsletter"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-green-800 text-white rounded-full text-sm hover:bg-green-900 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="py-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} The Green Room. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
