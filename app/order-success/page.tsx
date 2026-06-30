import { Suspense } from 'react';
import Link from 'next/link';
import { Container } from '@/components/Container';
import { Button } from '@/components/Button';

function OrderSuccessContent({ searchParams }: { searchParams: { orderNumber?: string } }) {
  const orderNumber = searchParams.orderNumber || 'Unknown';

  return (
    <div className="py-12">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-green-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Order Confirmed!
          </h1>

          <p className="text-lg text-gray-600 mb-2">
            Thank you for your order. We'll send you a confirmation email shortly.
          </p>

          <p className="text-sm text-gray-500 mb-8">
            Order Number: <span className="font-mono font-semibold">{orderNumber}</span>
          </p>

          <div className="bg-green-50 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              What's Next?
            </h2>
            <ul className="text-left text-gray-600 space-y-2">
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-green-800 mr-2 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>You'll receive an order confirmation email</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-green-800 mr-2 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>We'll prepare your plants with care</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-green-800 mr-2 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Your plants will arrive within 3-5 business days</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button as={Link} href="/shop">
              Continue Shopping
            </Button>
            <Button as={Link} href="/" variant="secondary">
              Back to Home
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderNumber?: string }>;
}) {
  const params = await searchParams;
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderSuccessContent searchParams={params} />
    </Suspense>
  );
}
