import { Container } from '@/components/Container';

export default function AboutPage() {
  return (
    <div className="py-12">
      <Container>
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            About The Green Room
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              We believe that everyone deserves to experience the joy and tranquility 
              that plants bring to a space. Founded in 2020, The Green Room started as 
              a small passion project and has grown into a thriving community of plant lovers.
            </p>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                Our mission is simple: to make it easy for everyone to bring nature indoors. 
                We carefully curate each plant in our collection, ensuring quality and providing 
                the guidance you need to help your green friends thrive. Whether you're a 
                seasoned plant parent or just starting your journey, we're here to support you 
                every step of the way.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Quality Promise</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Every plant that leaves our greenhouse is healthy, pest-free, and ready to 
                thrive in its new home. We partner with ethical growers who share our 
                commitment to sustainable practices. Each plant comes with detailed care 
                instructions, and our team is always available to answer your questions.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Sustainability</h2>
              <p className="text-gray-600 leading-relaxed">
                We take our environmental responsibility seriously. Our packaging is 100% 
                recyclable, and we work exclusively with growers who use sustainable farming 
                practices. We offset the carbon footprint of every delivery and donate a 
                portion of our profits to reforestation projects around the world.
              </p>
            </section>

            <section className="bg-green-50 rounded-lg p-8 mt-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Community</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Plants bring people together. Follow us on social media to share your plant 
                journey, get care tips, and connect with fellow plant enthusiasts. We love 
                seeing your green spaces flourish!
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-green-800 hover:text-green-900 font-medium focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded"
                >
                  Instagram
                </a>
                <a
                  href="#"
                  className="text-green-800 hover:text-green-900 font-medium focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded"
                >
                  Facebook
                </a>
                <a
                  href="#"
                  className="text-green-800 hover:text-green-900 font-medium focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded"
                >
                  Pinterest
                </a>
              </div>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
