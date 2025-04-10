
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { fetchFeaturedProducts } from '@/services/productService';

const FeaturedProducts = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  
  const { data: featuredProducts = [], isLoading } = useQuery({
    queryKey: ['featuredProducts'],
    queryFn: fetchFeaturedProducts
  });

  const scrollContainer = featuredProducts.length > 3;

  const scroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('featured-products-container');
    if (!container) return;
    
    const scrollAmount = 300;
    const newPosition = direction === 'left' 
      ? Math.max(0, scrollPosition - scrollAmount) 
      : Math.min(container.scrollWidth - container.clientWidth, scrollPosition + scrollAmount);
    
    container.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
    
    setScrollPosition(newPosition);
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <Button 
            variant="ghost" 
            className="text-techmart-purple hover:text-techmart-purple-dark flex items-center gap-2"
            asChild
          >
            <a href="/products">
              View All <ArrowRight size={16} />
            </a>
          </Button>
        </div>
        
        <div className="relative">
          {scrollContainer && (
            <>
              <button 
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-2 hover:bg-gray-100"
                onClick={() => scroll('left')}
                disabled={scrollPosition === 0}
                style={{ opacity: scrollPosition === 0 ? 0.5 : 1 }}
              >
                <ChevronLeft size={24} />
              </button>
              
              <button 
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-2 hover:bg-gray-100"
                onClick={() => scroll('right')}
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
          
          <div 
            id="featured-products-container"
            className="flex overflow-x-auto gap-6 pb-4 scrollbar-none"
            style={{ scrollBehavior: 'smooth' }}
          >
            {isLoading ? (
              // Loading skeletons
              Array(4).fill(0).map((_, index) => (
                <div 
                  key={index}
                  className="min-w-[300px] max-w-[300px] bg-gray-100 animate-pulse rounded h-[400px]"
                />
              ))
            ) : (
              featuredProducts.map(product => (
                <div key={product.id} className="min-w-[300px] max-w-[300px]">
                  <ProductCard 
                    product={{
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      description: product.description,
                      image: product.image,
                      category: product.category,
                      featured: product.featured,
                      rentalAvailable: product.rental_available,
                      rentalPrice: product.rental_price || undefined
                    }} 
                    featured 
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
