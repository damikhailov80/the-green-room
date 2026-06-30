import { Suspense } from 'react';
import { Container } from '@/components/Container';
import ShopContent from '@/components/ShopContent';

function ShopFallback() {
  return (
    <div className="py-12">
      <Container>
        <div className="text-center">
          <p className="text-lg text-gray-600">Loading products...</p>
        </div>
      </Container>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<ShopFallback />}>
      <ShopContent />
    </Suspense>
  );
}

