
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { categories } from '@/data/products';
import { useToast } from '@/components/ui/use-toast';
import { useEffect } from 'react';
import { Laptop, Monitor, Headphones, Home, Smartphone, Watch, Gamepad, Speaker } from 'lucide-react';

const categoryIcons = {
  'Laptops': <Laptop size={24} />,
  'TVs': <Monitor size={24} />,
  'Audio': <Headphones size={24} />,
  'Smart Home': <Home size={24} />,
  'Phones': <Smartphone size={24} />,
  'Wearables': <Watch size={24} />,
  'Gaming': <Gamepad size={24} />,
  'All': <Speaker size={24} />
};

const Index = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    toast({
      title: "Welcome to TECHMART",
      description: "Discover the latest technology products and exclusive deals.",
      duration: 5000,
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        
        {/* Categories Section */}
        <section className="py-12 container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Browse Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.filter(cat => cat !== 'All').map((category) => (
              <a 
                key={category}
                href={`/products?category=${category.toLowerCase()}`}
                className="flex flex-col items-center justify-center p-6 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-3 text-techmart-purple">
                  {categoryIcons[category as keyof typeof categoryIcons] || <Speaker size={24} />}
                </div>
                <span className="text-gray-800 font-medium">{category}</span>
              </a>
            ))}
          </div>
        </section>
        
        <FeaturedProducts />
        
        {/* Promotional Banner */}
        <section className="py-16 bg-techmart-purple text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Special Offer</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join our membership program today and get 10% off your first purchase plus exclusive access to limited-time deals!
            </p>
            <Button className="bg-white text-techmart-purple hover:bg-gray-100 px-8 py-6 text-lg">
              Join Now
            </Button>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="mb-4 bg-techmart-purple/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-techmart-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
                <p className="text-gray-600">Get your products delivered to your doorstep within 24 hours.</p>
              </div>
              
              <div className="text-center p-6">
                <div className="mb-4 bg-techmart-purple/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-techmart-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
                <p className="text-gray-600">All transactions are secure and encrypted for your safety.</p>
              </div>
              
              <div className="text-center p-6">
                <div className="mb-4 bg-techmart-purple/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-techmart-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                <p className="text-gray-600">Our customer support team is available around the clock.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
