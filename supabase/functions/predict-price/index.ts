
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PriceRequest {
  category: string;
  brand: string | null;
  features: Record<string, any>;
  competitor_prices?: number[]; // Optional data from competitors
}

// Simple ML-like prediction algorithm
function predictPrice(request: PriceRequest): number {
  console.log("Predicting price for:", request);
  
  // Base price mapping by category
  const basePriceByCategory: Record<string, number> = {
    'TVs': 500,
    'Laptops': 800,
    'Audio': 150,
    'Smart Home': 120,
    'Gaming': 300,
    'Phones': 700,
    'Wearables': 200,
    'default': 300
  };
  
  // Brand multipliers (same as in the main app)
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
  
  // Get base price for category
  const basePrice = basePriceByCategory[request.category] || basePriceByCategory.default;
  
  // Apply brand factor
  let predictedPrice = basePrice;
  if (request.brand && brandPriceFactors[request.brand]) {
    predictedPrice *= brandPriceFactors[request.brand];
  }
  
  // Feature adjustments
  if (request.features) {
    // Premium features increase price
    if (request.features.premium === true) {
      predictedPrice *= 1.3;
    }
    
    // Memory/storage adjustments
    if (request.features.memory) {
      predictedPrice += (request.features.memory / 8) * 100; // Assume 8GB is standard
    }
    
    // Resolution for TVs and monitors
    if (request.features.resolution === '4K') {
      predictedPrice *= 1.4;
    } else if (request.features.resolution === '8K') {
      predictedPrice *= 2.0;
    }
  }
  
  // Consider competitor prices if available
  if (request.competitor_prices && request.competitor_prices.length > 0) {
    const avgCompetitorPrice = request.competitor_prices.reduce((a, b) => a + b, 0) / request.competitor_prices.length;
    // Blend our prediction with market data (70% our model, 30% market)
    predictedPrice = (predictedPrice * 0.7) + (avgCompetitorPrice * 0.3);
  }
  
  // Add small random variation to simulate ML prediction fluctuations
  const variation = (Math.random() * 0.1) - 0.05; // -5% to +5%
  predictedPrice = predictedPrice * (1 + variation);
  
  // Round to 2 decimal places
  return Math.round(predictedPrice * 100) / 100;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    const requestData = await req.json();
    console.log("Received price prediction request:", requestData);
    
    const predictedPrice = predictPrice(requestData);
    
    console.log("Predicted price:", predictedPrice);
    
    return new Response(JSON.stringify({
      predicted_price: predictedPrice,
      confidence: 0.85 + (Math.random() * 0.10), // Simulate confidence score between 85-95%
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in price prediction function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
