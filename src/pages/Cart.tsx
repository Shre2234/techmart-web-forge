
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { formatToINR } from '@/lib/utils';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const { toast } = useToast();
  const [promoCode, setPromoCode] = useState('');
  
  const handleCheckout = () => {
    toast({
      title: "Checkout initiated",
      description: "This would redirect to a payment gateway in a real application.",
    });
  };
  
  const handleApplyPromo = () => {
    toast({
      title: "Promo code applied",
      description: `Promo code "${promoCode}" has been applied to your order.`,
    });
    setPromoCode('');
  };
  
  // Group items by purchase type (rental vs purchase)
  const purchaseItems = items.filter(item => !item.isRental);
  const rentalItems = items.filter(item => item.isRental);
  
  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow container mx-auto px-4 py-16 flex flex-col items-center justify-center">
          <div className="text-center">
            <ShoppingCart size={64} className="mx-auto mb-6 text-gray-400" />
            <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-gray-500 mb-8">Add some products to your cart to continue shopping.</p>
            <Link to="/products">
              <Button className="bg-techmart-purple hover:bg-techmart-purple-dark">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/products" className="flex items-center text-techmart-purple hover:underline">
            <ArrowLeft size={18} className="mr-2" />
            Continue Shopping
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Purchase Items Section */}
            {purchaseItems.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Items to Purchase</h2>
                <div className="bg-white rounded-lg shadow">
                  {purchaseItems.map((item) => (
                    <div key={`purchase-${item.id}`} className="p-4 border-b last:border-b-0">
                      <div className="flex items-center gap-4">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-gray-500 text-sm">{item.category}</p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-3">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center border rounded"
                              >
                                -
                              </button>
                              <span>{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center border rounded"
                              >
                                +
                              </button>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="font-semibold">{formatToINR(item.price * item.quantity)}</span>
                              <button 
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Rental Items Section */}
            {rentalItems.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Items to Rent</h2>
                <div className="bg-white rounded-lg shadow">
                  {rentalItems.map((item) => (
                    <div key={`rental-${item.id}`} className="p-4 border-b last:border-b-0">
                      <div className="flex items-center gap-4">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-gray-500 text-sm">{item.category}</p>
                          <p className="text-sm mt-1">
                            Rental Duration: {item.rentalDuration} day{item.rentalDuration !== 1 ? 's' : ''}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-3">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center border rounded"
                              >
                                -
                              </button>
                              <span>{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center border rounded"
                              >
                                +
                              </button>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="font-semibold">
                                {formatToINR((item.rentalPrice || item.price / 5) * item.quantity * (item.rentalDuration || 1))}
                              </span>
                              <button 
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Promo Code Section */}
            <div className="mt-6 flex gap-2">
              <Input 
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Promo Code"
                className="max-w-xs"
              />
              <Button 
                onClick={handleApplyPromo}
                disabled={!promoCode}
                variant="outline"
              >
                Apply
              </Button>
            </div>

            <div className="mt-6">
              <Button 
                variant="destructive"
                onClick={clearCart}
                className="bg-red-500 hover:bg-red-600"
              >
                Clear Cart
              </Button>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatToINR(getCartTotal())}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>₹0.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>{formatToINR(getCartTotal() * 0.07)}</span>
                </div>
                
                <Separator className="my-2" />
                
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{formatToINR(getCartTotal() * 1.07)}</span>
                </div>
              </div>
              
              <Button 
                onClick={handleCheckout}
                className="w-full mt-6 bg-techmart-purple hover:bg-techmart-purple-dark"
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
