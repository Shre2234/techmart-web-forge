
import { supabase } from "@/integrations/supabase/client";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  brand?: string | null;  // Make brand optional to match database schema
  featured: boolean;
  rental_available: boolean;
  rental_price: number | null;
}

export interface Category {
  id: string;
  name: string;
}

export interface Brand {
  id: string;
  name: string;
  category: string;
}

// Brand-specific price multipliers
const brandPriceFactors: Record<string, number> = {
  'Samsung': 1.2,
  'LG': 1.0,
  'Sony': 1.5,
  'Xiaomi': 0.8,
  'OnePlus': 1.1,
  'Dell': 1.3,
  'HP': 1.1,
  'Lenovo': 1.0,
  'Apple': 1.8,
  'Asus': 1.2,
  'JBL': 1.0,
  'Bose': 1.4,
  'Sennheiser': 1.3,
  'Boat': 0.7,
  'Google': 1.4,
  'Amazon': 1.0,
  'Philips': 0.9,
  'TP-Link': 0.8,
  'Microsoft': 1.3,
  'Nintendo': 1.2,
  'MSI': 1.25,
  'Fitbit': 1.1,
  'Garmin': 1.2
};

// Function to adjust product price based on brand
const adjustPriceByBrand = (product: Product): Product => {
  if (product.brand && brandPriceFactors[product.brand]) {
    // Apply brand price factor to base price
    const basePrice = product.price / (brandPriceFactors[product.brand] || 1);
    const adjustedPrice = basePrice * (brandPriceFactors[product.brand] || 1);
    
    // Update the rental price as well if available
    let adjustedRentalPrice = product.rental_price;
    if (product.rental_price !== null) {
      const baseRentalPrice = product.rental_price / (brandPriceFactors[product.brand] || 1);
      adjustedRentalPrice = baseRentalPrice * (brandPriceFactors[product.brand] || 1);
    }
    
    return {
      ...product,
      price: Math.round(adjustedPrice * 100) / 100, // Round to 2 decimal places
      rental_price: adjustedRentalPrice !== null ? Math.round(adjustedRentalPrice * 100) / 100 : null
    };
  }
  return product;
};

export const fetchProducts = async (category?: string, brand?: string): Promise<Product[]> => {
  try {
    let query = supabase.from('products').select('*');
    
    if (category && category !== 'all') {
      query = query.eq('category', category);
    }
    
    // Check for UPPERCASE/lowercase inconsistencies in category names
    if (category && category !== 'all' && category.toLowerCase() !== category) {
      console.log(`Trying capital case for category: ${category}`);
      query = supabase.from('products').select('*').eq('category', category.charAt(0).toUpperCase() + category.slice(1));
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
    
    if (!data || data.length === 0) {
      console.log(`No products found for category: ${category}`);
      return [];
    }
    
    // Process products to add brand and apply price adjustments
    const productsWithBrands = data.map(item => {
      // Explicitly create a Product object with a brand property
      // Note: We're not trying to access item.brand directly, but assigning it
      const product: Product = {
        id: item.id,
        name: item.name,
        price: item.price,
        description: item.description || "",
        image: item.image || "/placeholder.svg",
        category: item.category || "",
        brand: getBrandForCategory(item.category), // No longer trying to access item.brand
        featured: item.featured || false,
        rental_available: item.rental_available || false,
        rental_price: item.rental_price
      };
      
      // Apply brand-specific price adjustment
      return adjustPriceByBrand(product);
    });
    
    // Filter by brand if specified (client-side filtering since brand is added dynamically)
    const filteredProducts = brand && brand !== 'all' 
      ? productsWithBrands.filter(p => p.brand === brand)
      : productsWithBrands;
      
    return filteredProducts;
  } catch (error) {
    console.error('Error in fetchProducts:', error);
    return [];
  }
};

// Helper function to get a random brand for a category
const getBrandForCategory = (category?: string): string => {
  if (!category) return 'Unknown';
  
  // Import the brandsByCategory directly from utils
  const { brandsByCategory } = require('@/lib/utils');
  
  const brandsForCategory = brandsByCategory[category] || [];
  if (brandsForCategory.length === 0) return 'Unknown';
  
  // Get a random brand from the available ones
  return brandsForCategory[Math.floor(Math.random() * brandsForCategory.length)];
};

export const fetchBrandsByCategory = async (category?: string): Promise<string[]> => {
  try {
    // Since the brand column doesn't exist in the database,
    // we'll fall back to the hardcoded brands in utils.ts
    const { brandsByCategory } = require('@/lib/utils');
    
    return category && category !== 'all' 
      ? brandsByCategory[category] || []
      : Object.values(brandsByCategory).flat().filter((v: string, i: number, a: string[]) => a.indexOf(v) === i);
  } catch (error) {
    console.error('Error in fetchBrandsByCategory:', error);
    return [];
  }
};

export const fetchFeaturedProducts = async (): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('featured', true);
    
    if (error) {
      console.error('Error fetching featured products:', error);
      throw error;
    }
    
    // Process products to add brand and apply price adjustments
    return data?.map(item => {
      // Explicitly create a Product object with a brand property
      const product: Product = {
        id: item.id,
        name: item.name,
        price: item.price,
        description: item.description || "",
        image: item.image || "/placeholder.svg",
        category: item.category || "",
        brand: getBrandForCategory(item.category), // No longer trying to access item.brand
        featured: item.featured || false,
        rental_available: item.rental_available || false,
        rental_price: item.rental_price
      };
      
      return adjustPriceByBrand(product);
    }) || [];
  } catch (error) {
    console.error('Error in fetchFeaturedProducts:', error);
    return [];
  }
};

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error in fetchCategories:', error);
    return [];
  }
};
