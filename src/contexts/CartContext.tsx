
import { createContext, useState, useContext, ReactNode } from 'react';
import { useToast } from '@/components/ui/use-toast';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  featured?: boolean;
  rentalAvailable?: boolean;
  rentalPrice?: number;
}

interface CartItem extends Product {
  quantity: number;
  isRental?: boolean;
  rentalDuration?: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, isRental?: boolean, rentalDuration?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const addToCart = (product: Product, isRental: boolean = false, rentalDuration: number = 1) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.id === product.id && item.isRental === isRental
      );
      
      if (existingItem) {
        toast({
          title: 'Product quantity updated',
          description: `${product.name} quantity increased to ${existingItem.quantity + 1}`,
        });
        
        return prevItems.map((item) =>
          item.id === product.id && item.isRental === isRental
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        const message = isRental 
          ? `${product.name} has been added to your rental cart for ${rentalDuration} day(s)`
          : `${product.name} has been added to your cart`;

        toast({
          title: isRental ? 'Product added to rentals' : 'Product added to cart',
          description: message,
        });
        
        return [...prevItems, { 
          ...product, 
          quantity: 1, 
          isRental, 
          rentalDuration: isRental ? rentalDuration : undefined 
        }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((prevItems) => {
      const itemToRemove = prevItems.find((item) => item.id === productId);
      if (itemToRemove) {
        toast({
          title: 'Product removed',
          description: `${itemToRemove.name} has been removed from your cart`,
        });
      }
      return prevItems.filter((item) => item.id !== productId);
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast({
      title: 'Cart cleared',
      description: 'All items have been removed from your cart',
    });
  };

  const getCartTotal = () => {
    return items.reduce((total, item) => {
      const price = item.isRental 
        ? (item.rentalPrice || item.price / 5) * item.rentalDuration!
        : item.price;
      return total + price * item.quantity;
    }, 0);
  };

  const getCartItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
