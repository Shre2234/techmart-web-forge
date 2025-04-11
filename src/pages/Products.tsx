
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  fetchProducts, 
  fetchCategories, 
  Product
} from '@/services/productService';
import { brandsByCategory } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import CategoryFilter from '@/components/products/CategoryFilter';
import BrandFilter from '@/components/products/BrandFilter';
import ActiveFilters from '@/components/products/ActiveFilters';
import ProductGrid from '@/components/products/ProductGrid';
import ProductPagination from '@/components/products/ProductPagination';

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

  const { data: products = [], isLoading: productsLoading, error: productsError } = useQuery({
    queryKey: ['products', currentCategory, currentBrand],
    queryFn: () => fetchProducts(
      currentCategory !== 'all' ? currentCategory : undefined,
      currentBrand !== 'all' ? currentBrand : undefined
    )
  });
  
  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories
  });

  useEffect(() => {
    setAvailableBrands(
      currentCategory !== 'all' 
        ? brandsByCategory[currentCategory] || []
        : Object.values(brandsByCategory).flat().filter((v, i, a) => a.indexOf(v) === i)
    );
  }, [currentCategory]);

  useEffect(() => {
    if (products.length) {
      setTotalPages(Math.ceil(products.length / productsPerPage));
      
      const startIndex = (currentPage - 1) * productsPerPage;
      const pageProducts = products.slice(startIndex, startIndex + productsPerPage);
      setFilteredProducts(pageProducts);
    } else {
      setFilteredProducts([]);
      setTotalPages(1);
    }
  }, [products, currentPage, productsPerPage]);

  const handleCategoryChange = (category: string) => {
    setSearchParams({ category, brand: 'all', page: '1' });
  };

  const handleBrandChange = (brand: string) => {
    setSearchParams({ category: currentCategory, brand, page: '1' });
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setSearchParams({ 
      category: currentCategory, 
      brand: currentBrand, 
      page: page.toString() 
    });
  };

  const handleClearAllFilters = () => {
    setSearchParams({ category: 'all', brand: 'all', page: '1' });
  };

  useEffect(() => {
    if (productsError) {
      toast({
        title: "Error loading products",
        description: "There was a problem loading the products. Please try again later.",
        variant: "destructive"
      });
    }
  }, [productsError, toast]);

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
        
        <CategoryFilter 
          categories={categories} 
          currentCategory={currentCategory}
          onCategoryChange={handleCategoryChange}
          isLoading={categoriesLoading}
        />
        
        <BrandFilter 
          availableBrands={availableBrands}
          currentBrand={currentBrand}
          onBrandChange={handleBrandChange}
        />
        
        <ActiveFilters 
          currentCategory={currentCategory}
          currentBrand={currentBrand}
          onCategoryChange={handleCategoryChange}
          onBrandChange={handleBrandChange}
          onClearAllFilters={handleClearAllFilters}
        />
        
        <ProductGrid 
          products={filteredProducts}
          isLoading={productsLoading}
        />

        <ProductPagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>

      <Footer />
    </div>
  );
};

export default Products;
