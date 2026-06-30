import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Container } from '@/components/Container';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Rating } from '@/components/Rating';
import { Badge } from '@/components/Badge';
import { ProductCard } from '@/components/ProductCard';
import { AddToCartButton } from '@/components/AddToCartButton';
import { getProduct, getRelatedProducts } from '@/lib/api/products';
import { formatPrice } from '@/lib/utils';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.id, 4);
  const inStock = product.stock > 0;

  return (
    <div className="py-8">
      <Container>
        <div className="mb-6">
          <Breadcrumbs
            items={[
              { label: 'Shop', href: '/shop' },
              { label: product.name },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Image */}
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-4">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              {product.latinName && (
                <p className="text-xl text-gray-500 italic">{product.latinName}</p>
              )}
            </div>

            <div className="mb-6">
              <Rating rating={product.rating} />
            </div>

            <p className="text-3xl font-bold text-gray-900 mb-6">
              {formatPrice(product.price)}
            </p>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {product.longDescription}
            </p>

            {inStock ? (
              <div className="mb-8">
                <AddToCartButton product={product} />
                <p className="text-sm text-gray-500 mt-2">
                  {product.stock} in stock
                </p>
              </div>
            ) : (
              <div className="mb-8">
                <Badge variant="secondary">Out of Stock</Badge>
              </div>
            )}

            {/* Care Instructions */}
            {product.height && (
              <div className="border-t border-gray-200 pt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Plant Care
                </h2>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Height</dt>
                    <dd className="text-base text-gray-900">{product.height}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Light Requirements</dt>
                    <dd className="text-base text-gray-900">{product.light}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Watering</dt>
                    <dd className="text-base text-gray-900">{product.watering}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Difficulty</dt>
                    <dd className="text-base text-gray-900">{product.difficulty}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Pet Friendly</dt>
                    <dd className="text-base text-gray-900">
                      {product.petFriendly ? 'Yes' : 'No, toxic to pets'}
                    </dd>
                  </div>
                </dl>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map(relatedProduct => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </div>
  );
}
