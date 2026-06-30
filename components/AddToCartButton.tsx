'use client';

import { useState } from 'react';
import { Product } from '@/lib/types';
import { addToCart } from '@/lib/cart';
import { Button } from './Button';
import { QuantitySelector } from './QuantitySelector';

interface AddToCartButtonProps {
  product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    
    // Dispatch custom event to update cart count
    window.dispatchEvent(new Event('cartUpdated'));
    
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
          Quantity
        </label>
        <QuantitySelector
          quantity={quantity}
          onQuantityChange={setQuantity}
          max={product.stock}
        />
      </div>
      
      <Button
        onClick={handleAddToCart}
        size="lg"
        className="w-full"
        disabled={added}
      >
        {added ? 'Added to Cart!' : 'Add to Cart'}
      </Button>
    </div>
  );
}
