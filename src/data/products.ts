
import { Product } from '../contexts/CartContext';

export const products: Product[] = [
  {
    id: '1',
    name: 'Ultra HD Smart TV',
    price: 899.99,
    description: '65-inch 4K Ultra HD Smart LED TV with HDR and Alexa compatibility.',
    image: '/placeholder.svg',
    category: 'TVs',
    featured: true
  },
  {
    id: '2',
    name: 'Professional Laptop',
    price: 1299.99,
    description: '15.6-inch, 16GB RAM, 512GB SSD, Intel i7 processor, Windows 11.',
    image: '/placeholder.svg',
    category: 'Laptops',
    featured: true
  },
  {
    id: '3',
    name: 'Wireless Noise-Cancelling Headphones',
    price: 249.99,
    description: 'Premium wireless over-ear headphones with active noise cancellation.',
    image: '/placeholder.svg',
    category: 'Audio',
    featured: true
  },
  {
    id: '4',
    name: 'Smart Home Hub',
    price: 129.99,
    description: 'Control all your smart home devices from one central hub.',
    image: '/placeholder.svg',
    category: 'Smart Home',
    featured: false
  },
  {
    id: '5',
    name: 'Gaming Console',
    price: 499.99,
    description: 'Next-gen gaming console with 1TB storage and 4K gaming capability.',
    image: '/placeholder.svg',
    category: 'Gaming',
    featured: true
  },
  {
    id: '6',
    name: 'Smartphone',
    price: 799.99,
    description: '6.5-inch OLED display, 128GB storage, dual camera system.',
    image: '/placeholder.svg',
    category: 'Phones',
    featured: false
  },
  {
    id: '7',
    name: 'Wireless Earbuds',
    price: 149.99,
    description: 'True wireless earbuds with noise isolation and 24-hour battery life.',
    image: '/placeholder.svg',
    category: 'Audio',
    featured: false
  },
  {
    id: '8',
    name: 'Smart Watch',
    price: 299.99,
    description: 'Fitness tracking, heart rate monitoring, notifications, and more.',
    image: '/placeholder.svg',
    category: 'Wearables',
    featured: true
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
