
import ProductCard from '@/components/ProductCard';
import { Product } from '@/services/productService';
import { Skeleton } from '@/components/ui/skeleton';

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
}

const ProductGrid = ({ products, isLoading }: ProductGridProps) => {
  // Handle loading state
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-8">
        {[...Array(4)].map((_, index) => (
          <Skeleton 
            key={index}
            className="h-[350px] w-full"
          />
        ))}
      </div>
    );
  }
  
  // Handle empty state
  if (!products || products.length === 0) {
    return (
      <div className="py-20 text-center">
        <h3 className="text-xl font-medium">No products found</h3>
        <p className="text-gray-500 mt-2">Try adjusting your filters</p>
      </div>
    );
  }
  
  // Render products grid
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={{
            id: product.id,
            name: product.name,
            price: product.price,
            description: product.description,
            image: product.image,
            category: product.category,
            brand: product.brand,
            featured: product.featured,
            rentalAvailable: product.rental_available,
            rentalPrice: product.rental_price || undefined
          }} 
        />
      ))}
    </div>
  );
};

export default ProductGrid;
