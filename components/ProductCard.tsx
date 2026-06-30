import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { Badge } from './Badge';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const inStock = product.stock > 0;
  
  return (
    <article className="group">
      <Link 
        href={`/products/${product.slug}`}
        className="block focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded-lg"
      >
        <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {!inStock && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
              <Badge variant="secondary">Out of Stock</Badge>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <div>
            <h3 className="font-medium text-gray-900 group-hover:text-green-800 transition-colors">
              {product.name}
            </h3>
            {product.latinName && (
              <p className="text-sm text-gray-500 italic">{product.latinName}</p>
            )}
          </div>
          
          <p className="text-sm text-gray-600 line-clamp-2">
            {product.shortDescription}
          </p>
          
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-gray-900">
              {formatPrice(product.price)}
            </p>
            
            {product.difficulty && (
              <Badge variant="secondary">{product.difficulty}</Badge>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
