
import { supabase } from "@/integrations/supabase/client";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  brand: string | null;  // Change from required to nullable to match database structure
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

export const fetchProducts = async (category?: string, brand?: string): Promise<Product[]> => {
  let query = supabase.from('products').select('*');
  
  if (category && category !== 'all') {
    query = query.eq('category', category);
  }
  
  if (brand && brand !== 'all') {
    query = query.eq('brand', brand);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
  
  return data as Product[] || [];
};

export const fetchBrandsByCategory = async (category?: string): Promise<string[]> => {
  try {
    let query = supabase.from('products').select('brand');
    
    if (category && category !== 'all') {
      query = query.eq('category', category);
    }
    
    const { data, error } = await query.not('brand', 'is', null);
    
    if (error) {
      console.error('Error fetching brands:', error);
      throw error;
    }
    
    // Extract unique brands
    const uniqueBrands = [...new Set(data.map(item => item.brand))].filter(Boolean);
    return uniqueBrands as string[];
  } catch (error) {
    console.error('Error in fetchBrandsByCategory:', error);
    return [];
  }
};

export const fetchFeaturedProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('featured', true);
  
  if (error) {
    console.error('Error fetching featured products:', error);
    throw error;
  }
  
  return data as Product[] || [];
};

export const fetchCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');
  
  if (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
  
  return data || [];
};
