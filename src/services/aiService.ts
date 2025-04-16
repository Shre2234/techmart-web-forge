
import { supabase } from "@/integrations/supabase/client";

export interface PricePredictionRequest {
  category: string;
  brand: string | null;
  features: Record<string, any>;
  competitor_prices?: number[];
}

export interface PricePredictionResponse {
  predicted_price: number;
  confidence: number;
  timestamp: string;
}

export interface TransactionData {
  user_id?: string;
  amount: number;
  payment_method: string;
  ip_address?: string;
  shipping_address?: {
    country: string;
    city: string;
    postal_code: string;
  };
  billing_address?: {
    country: string;
    city: string;
    postal_code: string;
  };
  products: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  device_info?: {
    browser?: string;
    os?: string;
    is_mobile?: boolean;
  };
  timestamp?: string;
}

export interface FraudDetectionResponse {
  risk_score: number;
  is_fraudulent: boolean;
  risk_factors: string[];
  timestamp: string;
}

export const predictPrice = async (request: PricePredictionRequest): Promise<PricePredictionResponse> => {
  try {
    const { data, error } = await supabase.functions.invoke('predict-price', {
      body: request
    });
    
    if (error) {
      console.error('Error predicting price:', error);
      throw error;
    }
    
    return data as PricePredictionResponse;
  } catch (error) {
    console.error('Exception in predictPrice:', error);
    throw error;
  }
};

export const detectFraud = async (transaction: TransactionData): Promise<FraudDetectionResponse> => {
  try {
    const { data, error } = await supabase.functions.invoke('detect-fraud', {
      body: transaction
    });
    
    if (error) {
      console.error('Error detecting fraud:', error);
      throw error;
    }
    
    return data as FraudDetectionResponse;
  } catch (error) {
    console.error('Exception in detectFraud:', error);
    throw error;
  }
};

// Method to get user's IP address (using a third-party service)
export const getUserIpAddress = async (): Promise<string | null> => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Error getting IP address:', error);
    return null;
  }
};

// Get device info
export const getDeviceInfo = (): {
  browser: string;
  os: string;
  is_mobile: boolean;
} => {
  const userAgent = navigator.userAgent;
  
  // Simplified browser detection
  let browser = 'Unknown';
  if (userAgent.indexOf('Chrome') > -1) browser = 'Chrome';
  else if (userAgent.indexOf('Safari') > -1) browser = 'Safari';
  else if (userAgent.indexOf('Firefox') > -1) browser = 'Firefox';
  else if (userAgent.indexOf('MSIE') > -1 || userAgent.indexOf('Trident/') > -1) browser = 'Internet Explorer';
  else if (userAgent.indexOf('Edge') > -1) browser = 'Edge';
  
  // Simplified OS detection
  let os = 'Unknown';
  if (userAgent.indexOf('Windows') > -1) os = 'Windows';
  else if (userAgent.indexOf('Mac') > -1) os = 'MacOS';
  else if (userAgent.indexOf('Linux') > -1) os = 'Linux';
  else if (userAgent.indexOf('Android') > -1) os = 'Android';
  else if (userAgent.indexOf('iPhone') > -1 || userAgent.indexOf('iPad') > -1) os = 'iOS';
  
  // Mobile detection
  const is_mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  
  return {
    browser,
    os,
    is_mobile
  };
};
