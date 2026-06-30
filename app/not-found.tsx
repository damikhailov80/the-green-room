import Link from 'next/link';
import { Container } from '@/components/Container';
import { Button } from '@/components/Button';

export default function NotFound() {
  return (
    <div className="py-20">
      <Container>
        <div className="max-w-md mx-auto text-center">
          <div className="text-8xl font-bold text-green-100 mb-4" aria-hidden="true">
            404
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Oops! The page you're looking for seems to have wandered off. 
            Let's get you back on track.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button as={Link} href="/">
              Back to Home
            </Button>
            <Button as={Link} href="/shop" variant="secondary">
              Browse Plants
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
