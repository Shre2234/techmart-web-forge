
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { fetchProducts, fetchCategories, Product, Category } from '@/services/productService';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious
} from '@/components/ui/pagination';
import { useToast } from '@/components/ui/use-toast';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || 'all';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const { toast } = useToast();
  
  const productsPerPage = 8;
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch all products
  const { data: products = [], isLoading: productsLoading, error: productsError } = useQuery({
    queryKey: ['products', currentCategory],
    queryFn: () => fetchProducts(currentCategory !== 'all' ? currentCategory : undefined)
  });
  
  // Fetch categories
  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories
  });

  // Process pagination
  useEffect(() => {
    if (products.length) {
      setTotalPages(Math.ceil(products.length / productsPerPage));
      
      // Calculate products for current page
      const startIndex = (currentPage - 1) * productsPerPage;
      const pageProducts = products.slice(startIndex, startIndex + productsPerPage);
      setFilteredProducts(pageProducts);
    } else {
      setFilteredProducts([]);
      setTotalPages(1);
    }
  }, [products, currentPage, productsPerPage]);

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSearchParams({ category, page: '1' });
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setSearchParams({ category: currentCategory, page: page.toString() });
  };

  // Show error if products fail to load
  useEffect(() => {
    if (productsError) {
      toast({
        title: "Error loading products",
        description: "There was a problem loading the products. Please try again later.",
        variant: "destructive"
      });
    }
  }, [productsError, toast]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shop All Products</h1>
        
        {/* Categories filter */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-4 py-2 rounded-full ${
                currentCategory === 'all' 
                  ? 'bg-techmart-purple text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              All Products
            </button>
            
            {categoriesLoading ? (
              <div>Loading categories...</div>
            ) : (
              categories.map((category: Category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.name)}
                  className={`px-4 py-2 rounded-full ${
                    currentCategory === category.name 
                      ? 'bg-techmart-purple text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))
            )}
          </div>
        </div>
        
        {/* Products grid */}
        {productsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-8">
            {[...Array(4)].map((_, index) => (
              <div 
                key={index}
                className="bg-gray-100 animate-pulse rounded-lg h-[350px]"
              />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
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
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <h3 className="text-xl font-medium">No products found</h3>
            <p className="text-gray-500 mt-2">Try selecting a different category</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination className="mt-12">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={currentPage <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'} 
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink 
                    onClick={() => handlePageChange(page)}
                    isActive={page === currentPage}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'} 
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Products;
