
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// USD to INR conversion rate (approximate)
export const USD_TO_INR_RATE = 75;

// Format price to Indian Rupees
export function formatToINR(priceInUSD: number): string {
  const priceInINR = priceInUSD * USD_TO_INR_RATE;
  return `₹${priceInINR.toFixed(2)}`;
}

// List of brands by category
export const brandsByCategory: Record<string, string[]> = {
  'TVs': ['Samsung', 'LG', 'Sony', 'Xiaomi', 'OnePlus'],
  'Laptops': ['Dell', 'HP', 'Lenovo', 'Apple', 'Asus'],
  'Audio': ['JBL', 'Sony', 'Bose', 'Sennheiser', 'Boat'],
  'Smart Home': ['Google', 'Amazon', 'Philips', 'Xiaomi', 'TP-Link'],
  'Gaming': ['Sony', 'Microsoft', 'Nintendo', 'Asus', 'MSI'],
  'Phones': ['Apple', 'Samsung', 'Xiaomi', 'OnePlus', 'Google'],
  'Wearables': ['Apple', 'Samsung', 'Fitbit', 'Garmin', 'Xiaomi'],
  'All': [] // Special case for all products
};
