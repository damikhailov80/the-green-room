'use client';

import { useState } from 'react';
import { Container } from '@/components/Container';
import { Button } from '@/components/Button';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="py-12">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Get In Touch</h1>
          <p className="text-xl text-gray-600 mb-12">
            Have a question about our plants or need care advice? We'd love to hear from you.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="contact-subject"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={6}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  />
                </div>

                <Button type="submit" size="lg" disabled={submitted}>
                  {submitted ? 'Message Sent!' : 'Send Message'}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Other Ways to Reach Us
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Email</h3>
                    <a
                      href="mailto:hello@thegreenroom.com"
                      className="text-green-800 hover:text-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded"
                    >
                      hello@thegreenroom.com
                    </a>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Phone</h3>
                    <a
                      href="tel:+15551234567"
                      className="text-green-800 hover:text-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded"
                    >
                      (555) 123-4567
                    </a>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Visit Us</h3>
                    <address className="text-gray-600 not-italic">
                      123 Green Street
                      <br />
                      Portland, OR 97201
                      <br />
                      United States
                    </address>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Hours</h3>
                    <p className="text-gray-600">
                      Monday - Friday: 9am - 6pm
                      <br />
                      Saturday: 10am - 5pm
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Plant Care Help</h3>
                <p className="text-gray-600 text-sm">
                  Looking for care advice? Each product page includes detailed care 
                  instructions. You can also email us photos of your plant, and our 
                  team will help diagnose any issues.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
