'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/Container';
import { Button } from '@/components/Button';
import { QuantitySelector } from '@/components/QuantitySelector';
import { CartItem } from '@/lib/types';
import { getCart, updateQuantity, removeFromCart, getCartTotal } from '@/lib/cart';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCart(getCart());
  }, []);

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    const updatedCart = updateQuantity(productId, quantity);
    setCart(updatedCart);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleRemove = (productId: string) => {
    const updatedCart = removeFromCart(productId);
    setCart(updatedCart);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  if (!mounted) {
    return (
      <div className="py-12">
        <Container>
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Your Cart</h1>
          <p className="text-gray-600">Loading...</p>
        </Container>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="py-12">
        <Container>
          <div className="text-center max-w-md mx-auto py-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">
              Start adding some plants to your collection
            </p>
            <Button as={Link} href="/shop">
              Continue Shopping
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  const total = getCartTotal(cart);

  return (
    <div className="py-12">
      <Container>
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <ul className="space-y-6" role="list" aria-label="Cart items">
              {cart.map(item => (
                <li
                  key={item.product.id}
                  className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6 bg-white border border-gray-200 rounded-lg"
                >
                  <div className="relative w-full sm:w-24 h-48 sm:h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 96px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col gap-3">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 text-lg">
                          <Link
                            href={`/products/${item.product.slug}`}
                            className="hover:text-green-800 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded"
                          >
                            {item.product.name}
                          </Link>
                        </h3>
                        {item.product.latinName && (
                          <p className="text-sm text-gray-500 italic mt-1">
                            {item.product.latinName}
                          </p>
                        )}
                        <p className="text-sm text-gray-600 mt-1">
                          {formatPrice(item.product.price)} each
                        </p>
                      </div>
                      <p className="font-semibold text-gray-900 text-lg sm:text-right">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2 border-t border-gray-100">
                      <QuantitySelector
                        quantity={item.quantity}
                        onQuantityChange={q => handleUpdateQuantity(item.product.id, q)}
                        max={item.product.stock}
                      />

                      <button
                        onClick={() => handleRemove(item.product.id)}
                        className="text-sm text-red-600 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded px-2 py-1 self-start sm:self-auto"
                        aria-label={`Remove ${item.product.name} from cart`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <Button as={Link} href="/shop" variant="ghost">
                ← Continue Shopping
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>

              <dl className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Subtotal</dt>
                  <dd className="text-gray-900">{formatPrice(total)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Shipping</dt>
                  <dd className="text-gray-900">Calculated at checkout</dd>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between">
                  <dt className="text-lg font-semibold text-gray-900">Total</dt>
                  <dd className="text-lg font-semibold text-gray-900">
                    {formatPrice(total)}
                  </dd>
                </div>
              </dl>

              <Button as={Link} href="/checkout" size="lg" className="w-full">
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
