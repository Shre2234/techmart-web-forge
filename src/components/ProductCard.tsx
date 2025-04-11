import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useCart, Product } from '@/contexts/CartContext';
import { ShoppingCart, Heart, Clock } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatToINR } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

const ProductCard = ({ product, featured }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [isRentalMode, setIsRentalMode] = useState(false);
  const [rentalDuration, setRentalDuration] = useState(1);

  const handleAddToCart = () => {
    addToCart(product, isRentalMode, rentalDuration);
  };

  return (
    <Card className={`overflow-hidden card-hover ${featured ? 'border-techmart-purple' : ''}`}>
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="h-48 w-full object-cover"
        />
        <Button 
          variant="ghost" 
          size="icon"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full"
        >
          <Heart size={18} className="text-gray-700 hover:text-red-500" />
        </Button>
        {featured && (
          <div className="absolute top-2 left-2 bg-techmart-purple text-white text-xs px-2 py-1 rounded">
            Featured
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="mb-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">{product.category}</span>
            {product.brand && (
              <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                {product.brand}
              </span>
            )}
          </div>
          <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
        </div>
        <div className="flex justify-between mb-2">
          <p className="text-xl font-bold text-techmart-purple">
            {isRentalMode 
              ? formatToINR(product.rentalPrice || product.price / 5) 
              : formatToINR(product.price)}
            {isRentalMode && <span className="text-sm font-normal">/day</span>}
          </p>
          
          {product.rentalAvailable && (
            <Select
              value={isRentalMode ? "rent" : "buy"}
              onValueChange={(value) => setIsRentalMode(value === "rent")}
            >
              <SelectTrigger className="w-[90px]">
                <SelectValue placeholder="Option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="buy">Buy</SelectItem>
                <SelectItem value="rent">Rent</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
        
        {isRentalMode && (
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm">Duration: {rentalDuration} day{rentalDuration > 1 ? 's' : ''}</span>
              <span className="text-sm font-medium">
                {formatToINR((product.rentalPrice || product.price / 5) * rentalDuration)}
              </span>
            </div>
            <Slider 
              min={1}
              max={30}
              step={1}
              value={[rentalDuration]} 
              onValueChange={([value]) => setRentalDuration(value)}
              className="py-2"
            />
          </div>
        )}
        
        <p className="text-gray-600 text-sm mt-2 line-clamp-2">
          {product.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full bg-techmart-purple hover:bg-techmart-purple-dark gap-2" 
          onClick={handleAddToCart}
        >
          {isRentalMode ? <Clock size={16} /> : <ShoppingCart size={16} />}
          {isRentalMode ? 'Rent Now' : 'Add to Cart'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
