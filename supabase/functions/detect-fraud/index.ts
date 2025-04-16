
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TransactionData {
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

function detectFraud(transaction: TransactionData): {
  risk_score: number;
  is_fraudulent: boolean;
  risk_factors: string[];
} {
  console.log("Analyzing transaction for fraud:", transaction);
  
  const riskFactors: string[] = [];
  let riskScore = 0;
  
  // Check for high transaction amount
  if (transaction.amount > 1000) {
    riskScore += 20;
    riskFactors.push("High transaction amount");
  }
  
  // Check for mismatched shipping and billing addresses
  if (transaction.shipping_address && transaction.billing_address) {
    if (
      transaction.shipping_address.country !== transaction.billing_address.country ||
      transaction.shipping_address.city !== transaction.billing_address.city
    ) {
      riskScore += 15;
      riskFactors.push("Mismatched shipping and billing addresses");
    }
  }
  
  // Check for unusual product combinations or quantities
  if (transaction.products.length > 5) {
    riskScore += 10;
    riskFactors.push("Large number of different products");
  }
  
  let totalItems = 0;
  transaction.products.forEach(product => {
    totalItems += product.quantity;
    
    // Check for suspiciously high quantities of the same item
    if (product.quantity > 3 && product.price > 200) {
      riskScore += 15;
      riskFactors.push(`High quantity (${product.quantity}) of expensive item: ${product.name}`);
    }
  });
  
  if (totalItems > 10) {
    riskScore += 10;
    riskFactors.push("Large number of items");
  }
  
  // Payment method checks
  if (transaction.payment_method === "gift_card") {
    riskScore += 15;
    riskFactors.push("Gift card payment");
  }
  
  // IP address check (simplified)
  if (transaction.ip_address) {
    // Simulate high-risk IP check (in real world, would check against database)
    if (transaction.ip_address.startsWith("192.168.") || Math.random() < 0.05) {
      riskScore += 25;
      riskFactors.push("Suspicious IP address");
    }
  }
  
  // Device info check
  if (transaction.device_info && transaction.device_info.browser === "Unknown") {
    riskScore += 10;
    riskFactors.push("Unknown browser");
  }
  
  // Add random variation to simulate ML models
  riskScore = Math.min(100, Math.max(0, riskScore + (Math.random() * 10 - 5)));
  
  return {
    risk_score: Math.round(riskScore),
    is_fraudulent: riskScore >= 70,
    risk_factors: riskFactors
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    const transactionData = await req.json();
    console.log("Received fraud detection request:", transactionData);
    
    const fraudAnalysis = detectFraud(transactionData);
    
    console.log("Fraud analysis result:", fraudAnalysis);
    
    return new Response(JSON.stringify({
      ...fraudAnalysis,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in fraud detection function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
