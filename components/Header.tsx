'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Container } from './Container';
import { getCartCount, getCart } from '@/lib/cart';

export function Header() {
  const [cartCount, setCartCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    updateCartCount();
    
    const handleStorage = () => updateCartCount();
    window.addEventListener('storage', handleStorage);
    window.addEventListener('cartUpdated', handleStorage);
    
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('cartUpdated', handleStorage);
    };
  }, []);

  function updateCartCount() {
    const cart = getCart();
    setCartCount(getCartCount(cart));
  }

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <Container>
        <nav className="flex items-center justify-between h-16" aria-label="Main navigation">
          <Link 
            href="/" 
            className="text-xl font-semibold text-gray-900 hover:text-green-800 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded"
          >
            The Green Room
          </Link>
          
          <ul className="flex items-center gap-8">
            <li>
              <Link 
                href="/shop" 
                className="text-gray-700 hover:text-green-800 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded"
              >
                Shop
              </Link>
            </li>
            <li>
              <Link 
                href="/about" 
                className="text-gray-700 hover:text-green-800 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded"
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                href="/contact" 
                className="text-gray-700 hover:text-green-800 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link 
                href="/cart" 
                className="relative inline-flex items-center text-gray-700 hover:text-green-800 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded pr-1"
                aria-label={mounted && cartCount > 0 ? `Cart with ${cartCount} items` : 'Cart'}
              >
                <span>Cart</span>
                {mounted && cartCount > 0 && (
                  <span className="ml-1.5 bg-green-800 text-white text-xs font-medium rounded-full h-5 min-w-[20px] px-1.5 flex items-center justify-center" aria-hidden="true">
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}
