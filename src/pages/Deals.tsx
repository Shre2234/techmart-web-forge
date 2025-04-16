import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Tag, Timer, Check } from 'lucide-react';
import { formatToINR } from '@/lib/utils';

const Deals = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    toast({
      title: "Hot Deals",
      description: "Limited time offers on premium tech products!",
      duration: 3000,
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Banner */}
        <div className="bg-techmart-purple text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Special Offers & Deals</h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Exclusive discounts on the latest tech products. Limited time offers, don't miss out!
            </p>
          </div>
        </div>
        
        {/* Featured Deals */}
        <section className="py-12 container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">Featured Deals</h2>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Deal 1 */}
            <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="relative">
                <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 font-bold">
                  -30%
                </div>
                <img 
                  src="/placeholder.svg" 
                  alt="Laptop deal" 
                  className="w-full h-48 object-cover" 
                />
              </div>
              <div className="p-5">
                <div className="flex items-center text-xs text-gray-500 mb-3">
                  <Timer size={14} className="mr-1" />
                  <span>Ends in 2 days</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Ultra Thin Laptop Pro</h3>
                <p className="text-gray-600 mb-4">16GB RAM, 512GB SSD, Latest Gen Processor</p>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-gray-500 line-through">{formatToINR(1299)}</span>
                    <span className="text-2xl font-bold text-techmart-purple ml-2">{formatToINR(909)}</span>
                  </div>
                  <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                    <Check size={12} className="mr-1" />
                    <span>In Stock</span>
                  </div>
                </div>
                <Button className="w-full bg-techmart-purple hover:bg-techmart-purple/90">View Deal</Button>
              </div>
            </div>
            
            {/* Deal 2 */}
            <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="relative">
                <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 font-bold">
                  -25%
                </div>
                <img 
                  src="/placeholder.svg" 
                  alt="Headphones deal" 
                  className="w-full h-48 object-cover" 
                />
              </div>
              <div className="p-5">
                <div className="flex items-center text-xs text-gray-500 mb-3">
                  <Timer size={14} className="mr-1" />
                  <span>Ends in 5 days</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Noise Cancelling Headphones</h3>
                <p className="text-gray-600 mb-4">Wireless, 30h Battery Life, Premium Sound</p>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-gray-500 line-through">{formatToINR(299)}</span>
                    <span className="text-2xl font-bold text-techmart-purple ml-2">{formatToINR(224)}</span>
                  </div>
                  <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                    <Check size={12} className="mr-1" />
                    <span>In Stock</span>
                  </div>
                </div>
                <Button className="w-full bg-techmart-purple hover:bg-techmart-purple/90">View Deal</Button>
              </div>
            </div>
            
            {/* Deal 3 */}
            <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="relative">
                <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 font-bold">
                  -40%
                </div>
                <img 
                  src="/placeholder.svg" 
                  alt="Smartwatch deal" 
                  className="w-full h-48 object-cover" 
                />
              </div>
              <div className="p-5">
                <div className="flex items-center text-xs text-gray-500 mb-3">
                  <Timer size={14} className="mr-1" />
                  <span>Ends in 1 day</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Smart Fitness Watch</h3>
                <p className="text-gray-600 mb-4">Heart Rate Monitor, GPS, 7 Day Battery Life</p>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-gray-500 line-through">{formatToINR(199)}</span>
                    <span className="text-2xl font-bold text-techmart-purple ml-2">{formatToINR(119)}</span>
                  </div>
                  <div className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full flex items-center">
                    <Tag size={12} className="mr-1" />
                    <span>Few Left</span>
                  </div>
                </div>
                <Button className="w-full bg-techmart-purple hover:bg-techmart-purple/90">View Deal</Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Deal Categories Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-10 text-center">Shop Deals By Category</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <a href="#" className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-techmart-purple/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-techmart-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">Laptops</h3>
                <p className="text-sm text-gray-500">Up to 30% off</p>
              </a>
              
              <a href="#" className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-techmart-purple/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-techmart-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 110 4v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">Smartphones</h3>
                <p className="text-sm text-gray-500">Up to 25% off</p>
              </a>
              
              <a href="#" className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-techmart-purple/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-techmart-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">Accessories</h3>
                <p className="text-sm text-gray-500">Up to 50% off</p>
              </a>
              
              <a href="#" className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-techmart-purple/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-techmart-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">Gaming</h3>
                <p className="text-sm text-gray-500">Up to 35% off</p>
              </a>
            </div>
          </div>
        </section>
        
        {/* Newsletter Section */}
        <section className="py-16 bg-techmart-purple text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Get the Latest Deals</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and be the first to know about new deals and special offers.
            </p>
            <div className="max-w-md mx-auto flex">
              <input 
                type="email"
                placeholder="Your email address"
                className="flex-grow py-3 px-4 rounded-l-lg text-gray-700 focus:outline-none"
              />
              <Button className="bg-white text-techmart-purple hover:bg-gray-200 rounded-l-none py-6">
                Subscribe
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Deals;
