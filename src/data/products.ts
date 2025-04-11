
import { Product } from '../contexts/CartContext';

export const products: Product[] = [
  {
    id: '1',
    name: 'Ultra HD Smart TV',
    price: 899.99,
    description: '65-inch 4K Ultra HD Smart LED TV with HDR and Alexa compatibility.',
    image: '/placeholder.svg',
    category: 'TVs',
    brand: 'Samsung',
    featured: true,
    rentalAvailable: true,
    rentalPrice: 49.99
  },
  {
    id: '2',
    name: 'Professional Laptop',
    price: 1299.99,
    description: '15.6-inch, 16GB RAM, 512GB SSD, Intel i7 processor, Windows 11.',
    image: '/placeholder.svg',
    category: 'Laptops',
    brand: 'Dell',
    featured: true,
    rentalAvailable: true,
    rentalPrice: 69.99
  },
  {
    id: '3',
    name: 'Wireless Noise-Cancelling Headphones',
    price: 249.99,
    description: 'Premium wireless over-ear headphones with active noise cancellation.',
    image: '/placeholder.svg',
    category: 'Audio',
    brand: 'Sony',
    featured: true,
    rentalAvailable: true,
    rentalPrice: 19.99
  },
  {
    id: '4',
    name: 'Smart Home Hub',
    price: 129.99,
    description: 'Control all your smart home devices from one central hub.',
    image: '/placeholder.svg',
    category: 'Smart Home',
    brand: 'Google',
    featured: false,
    rentalAvailable: false
  },
  {
    id: '5',
    name: 'Gaming Console',
    price: 499.99,
    description: 'Next-gen gaming console with 1TB storage and 4K gaming capability.',
    image: '/placeholder.svg',
    category: 'Gaming',
    brand: 'Sony',
    featured: true,
    rentalAvailable: true,
    rentalPrice: 39.99
  },
  {
    id: '6',
    name: 'Smartphone',
    price: 799.99,
    description: '6.5-inch OLED display, 128GB storage, dual camera system.',
    image: '/placeholder.svg',
    category: 'Phones',
    brand: 'Apple',
    featured: false,
    rentalAvailable: false
  },
  {
    id: '7',
    name: 'Wireless Earbuds',
    price: 149.99,
    description: 'True wireless earbuds with noise isolation and 24-hour battery life.',
    image: '/placeholder.svg',
    category: 'Audio',
    brand: 'Bose',
    featured: false,
    rentalAvailable: true,
    rentalPrice: 12.99
  },
  {
    id: '8',
    name: 'Smart Watch',
    price: 299.99,
    description: 'Fitness tracking, heart rate monitoring, notifications, and more.',
    image: '/placeholder.svg',
    category: 'Wearables',
    brand: 'Apple',
    featured: true,
    rentalAvailable: true,
    rentalPrice: 24.99
  },
  {
    id: '9',
    name: 'Gaming Laptop',
    price: 1799.99,
    description: '17-inch, 32GB RAM, 1TB SSD, RTX 4070, RGB keyboard.',
    image: '/placeholder.svg',
    category: 'Laptops',
    brand: 'Asus',
    featured: false,
    rentalAvailable: true,
    rentalPrice: 89.99
  },
  {
    id: '10',
    name: 'Smart TV',
    price: 599.99,
    description: '55-inch 4K Smart OLED TV with Dolby Vision and webOS.',
    image: '/placeholder.svg',
    category: 'TVs',
    brand: 'LG',
    featured: false,
    rentalAvailable: true,
    rentalPrice: 39.99
  },
  {
    id: '11',
    name: 'Noise-Cancelling Earbuds',
    price: 199.99,
    description: 'True wireless earbuds with active noise cancellation and spatial audio.',
    image: '/placeholder.svg',
    category: 'Audio',
    brand: 'Sennheiser',
    featured: false,
    rentalAvailable: true,
    rentalPrice: 14.99
  },
  {
    id: '12',
    name: 'Budget Smartphone',
    price: 349.99,
    description: '6.4-inch display, 128GB storage, quad-camera system, 5000mAh battery.',
    image: '/placeholder.svg',
    category: 'Phones',
    brand: 'Xiaomi',
    featured: false,
    rentalAvailable: false
  }
];

export const categories = [
  'All',
  'TVs',
  'Laptops',
  'Audio',
  'Smart Home',
  'Gaming',
  'Phones',
  'Wearables'
];
