
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Input } from '@/components/ui/input';

const Navbar = () => {
  const { getCartItemCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-techmart-purple">
            TECHMART
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-techmart-purple">Home</Link>
            <Link to="/products" className="text-gray-700 hover:text-techmart-purple">Products</Link>
            <Link to="/deals" className="text-gray-700 hover:text-techmart-purple">Deals</Link>
            <Link to="/support" className="text-gray-700 hover:text-techmart-purple">Support</Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center relative flex-1 max-w-md mx-4">
            <Input 
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 rounded-full border-gray-300 focus:border-techmart-purple focus:ring-techmart-purple"
            />
            <Search className="absolute left-3 text-gray-400" size={18} />
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <User size={20} className="text-gray-700" />
            </Button>
            <Link to="/cart" className="relative">
              <ShoppingCart size={20} className="text-gray-700" />
              {getCartItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-techmart-purple text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {getCartItemCount()}
                </span>
              )}
            </Link>
            <button className="md:hidden" onClick={toggleMenu}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-100 animate-fade-in">
            <div className="flex items-center relative mb-4">
              <Input 
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 rounded-full border-gray-300"
              />
              <Search className="absolute left-3 text-gray-400" size={18} />
            </div>
            <div className="flex flex-col space-y-3">
              <Link to="/" className="text-gray-700 py-2 hover:text-techmart-purple" onClick={toggleMenu}>Home</Link>
              <Link to="/products" className="text-gray-700 py-2 hover:text-techmart-purple" onClick={toggleMenu}>Products</Link>
              <Link to="/deals" className="text-gray-700 py-2 hover:text-techmart-purple" onClick={toggleMenu}>Deals</Link>
              <Link to="/support" className="text-gray-700 py-2 hover:text-techmart-purple" onClick={toggleMenu}>Support</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
