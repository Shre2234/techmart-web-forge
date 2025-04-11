
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
