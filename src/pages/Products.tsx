
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { 
  fetchProducts, 
  fetchCategories, 
  fetchBrandsByCategory,
  Product, 
  Category 
} from '@/services/productService';
import { brandsByCategory } from '@/lib/utils';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious
} from '@/components/ui/pagination';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || 'all';
  const currentBrand = searchParams.get('brand') || 'all';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const { toast } = useToast();
  
  const productsPerPage = 8;
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [availableBrands, setAvailableBrands] = useState<string[]>([]);

  // Fetch all products
  const { data: products = [], isLoading: productsLoading, error: productsError } = useQuery({
    queryKey: ['products', currentCategory, currentBrand],
    queryFn: () => fetchProducts(
      currentCategory !== 'all' ? currentCategory : undefined,
      currentBrand !== 'all' ? currentBrand : undefined
    )
  });
  
  // Fetch categories
  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories
  });

  // Get available brands for current category
  useEffect(() => {
    // Fallback to hardcoded brands if fetching fails
    const fetchBrands = async () => {
      try {
        // First try to fetch from database
        const brands = await fetchBrandsByCategory(
          currentCategory !== 'all' ? currentCategory : undefined
        );
        if (brands && brands.length > 0) {
          setAvailableBrands(brands);
        } else {
          // Fallback to hardcoded brands
          setAvailableBrands(
            currentCategory !== 'all' 
              ? brandsByCategory[currentCategory] || []
              : Object.values(brandsByCategory).flat().filter((v, i, a) => a.indexOf(v) === i)
          );
        }
      } catch (error) {
        // Fallback to hardcoded brands on error
        setAvailableBrands(
          currentCategory !== 'all' 
            ? brandsByCategory[currentCategory] || []
            : Object.values(brandsByCategory).flat().filter((v, i, a) => a.indexOf(v) === i)
        );
      }
    };

    fetchBrands();
  }, [currentCategory]);

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
    setSearchParams({ category, brand: 'all', page: '1' });
  };

  // Handle brand change
  const handleBrandChange = (brand: string) => {
    setSearchParams({ category: currentCategory, brand, page: '1' });
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setSearchParams({ 
      category: currentCategory, 
      brand: currentBrand, 
      page: page.toString() 
    });
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

  // Clear brand filter when changing to a category that doesn't have that brand
  useEffect(() => {
    if (currentBrand !== 'all' && currentCategory !== 'all') {
      const categoryBrands = brandsByCategory[currentCategory] || [];
      if (!categoryBrands.includes(currentBrand)) {
        setSearchParams({ category: currentCategory, brand: 'all', page: '1' });
      }
    }
  }, [currentCategory, currentBrand, setSearchParams]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shop All Products</h1>
        
        {/* Categories filter */}
        <div className="mb-6">
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
        
        {/* Brands filter */}
        {availableBrands.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Brands</h2>
            
            {/* Mobile dropdown for brands */}
            <div className="block md:hidden mb-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full flex justify-between items-center">
                    {currentBrand === 'all' ? 'All Brands' : currentBrand}
                    <ChevronDown size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                  <DropdownMenuItem 
                    onClick={() => handleBrandChange('all')}
                    className={currentBrand === 'all' ? 'bg-accent' : ''}
                  >
                    All Brands
                  </DropdownMenuItem>
                  
                  {availableBrands.map((brand) => (
                    <DropdownMenuItem 
                      key={brand} 
                      onClick={() => handleBrandChange(brand)}
                      className={currentBrand === brand ? 'bg-accent' : ''}
                    >
                      {brand}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            {/* Desktop view for brands */}
            <div className="hidden md:flex flex-wrap gap-2">
              <button
                onClick={() => handleBrandChange('all')}
                className={`px-4 py-2 rounded-full ${
                  currentBrand === 'all' 
                    ? 'bg-techmart-purple text-white' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                All Brands
              </button>
              
              {availableBrands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => handleBrandChange(brand)}
                  className={`px-4 py-2 rounded-full ${
                    currentBrand === brand 
                      ? 'bg-techmart-purple text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Active filters */}
        {(currentCategory !== 'all' || currentBrand !== 'all') && (
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Active Filters:</h3>
            <div className="flex flex-wrap gap-2">
              {currentCategory !== 'all' && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Category: {currentCategory}
                  <button 
                    className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                    onClick={() => handleCategoryChange('all')}
                  >
                    ×
                  </button>
                </Badge>
              )}
              
              {currentBrand !== 'all' && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Brand: {currentBrand}
                  <button 
                    className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                    onClick={() => handleBrandChange('all')}
                  >
                    ×
                  </button>
                </Badge>
              )}
              
              {(currentCategory !== 'all' || currentBrand !== 'all') && (
                <button 
                  className="text-sm text-gray-500 hover:text-gray-700 underline"
                  onClick={() => setSearchParams({ category: 'all', brand: 'all', page: '1' })}
                >
                  Clear all filters
                </button>
              )}
            </div>
          </div>
        )}
        
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
                  brand: product.brand || undefined,
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
            <p className="text-gray-500 mt-2">Try adjusting your filters</p>
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
