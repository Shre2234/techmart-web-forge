import { supabase } from "@/integrations/supabase/client";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  brand: string | null;
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

const adjustPriceByBrand = (product: Product): Product => {
  if (product.brand && brandPriceFactors[product.brand]) {
    const basePrice = product.price / (brandPriceFactors[product.brand] || 1);
    const adjustedPrice = basePrice * (brandPriceFactors[product.brand] || 1);
    
    let adjustedRentalPrice = product.rental_price;
    if (product.rental_price !== null) {
      const baseRentalPrice = product.rental_price / (brandPriceFactors[product.brand] || 1);
      adjustedRentalPrice = baseRentalPrice * (brandPriceFactors[product.brand] || 1);
    }
    
    return {
      ...product,
      price: Math.round(adjustedPrice * 100) / 100,
      rental_price: adjustedRentalPrice !== null ? Math.round(adjustedRentalPrice * 100) / 100 : null
    };
  }
  return product;
};

const ensureNewProductsExist = async () => {
  try {
    const { data: iphone } = await supabase
      .from('products')
      .select('*')
      .eq('name', 'iPhone 15 Pro')
      .single();
    
    const { data: samsung } = await supabase
      .from('products')
      .select('*')
      .eq('name', 'Samsung Galaxy S24 Ultra')
      .single();
    
    if (!iphone) {
      await supabase.from('products').insert({
        name: 'iPhone 15 Pro',
        price: 1099.99,
        description: '6.1-inch Super Retina XDR display, A17 Pro chip, 48MP camera system, titanium design.',
        image: '/placeholder.svg',
        category: 'Phones',
        brand: 'Apple',
        featured: true,
        rental_available: true,
        rental_price: 59.99
      });
      console.log('Added iPhone 15 Pro to database');
    }
    
    if (!samsung) {
      await supabase.from('products').insert({
        name: 'Samsung Galaxy S24 Ultra',
        price: 1299.99,
        description: '6.8-inch Dynamic AMOLED display, Snapdragon 8 Gen 3, 200MP camera, S Pen included.',
        image: '/placeholder.svg',
        category: 'Phones',
        brand: 'Samsung',
        featured: true,
        rental_available: true,
        rental_price: 69.99
      });
      console.log('Added Samsung Galaxy S24 Ultra to database');
    }
  } catch (error) {
    console.error('Error ensuring new products exist:', error);
  }
};

ensureNewProductsExist();

export const fetchProducts = async (category?: string): Promise<Product[]> => {
  try {
    let query = supabase.from('products').select('*');
    
    if (category && category !== 'all') {
      query = query.eq('category', category);
    }
    
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
    
    const processedProducts = data.map(item => {
      const product: Product = {
        id: item.id,
        name: item.name,
        price: item.price,
        description: item.description || "",
        image: item.image || "/placeholder.svg",
        category: item.category || "",
        brand: item.brand,
        featured: item.featured || false,
        rental_available: item.rental_available || false,
        rental_price: item.rental_price
      };
      
      return adjustPriceByBrand(product);
    });
    
    return processedProducts;
  } catch (error) {
    console.error('Error in fetchProducts:', error);
    return [];
  }
};

export const fetchBrandsByCategory = async (category?: string): Promise<string[]> => {
  try {
    let query = supabase.from('products')
      .select('brand')
      .not('brand', 'is', null);
    
    if (category && category !== 'all') {
      query = query.eq('category', category);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching brands:', error);
      throw error;
    }
    
    const brands = [...new Set(data.map(item => item.brand).filter(Boolean))];
    return brands as string[];
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
    
    return data?.map(item => {
      const product: Product = {
        id: item.id,
        name: item.name,
        price: item.price,
        description: item.description || "",
        image: item.image || "/placeholder.svg",
        category: item.category || "",
        brand: item.brand,
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
