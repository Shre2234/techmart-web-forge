
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useCart, Product } from '@/contexts/CartContext';
import { ShoppingCart, Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

const ProductCard = ({ product, featured }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
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
          <span className="text-sm text-gray-500">{product.category}</span>
          <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
        </div>
        <p className="text-xl font-bold text-techmart-purple">
          ${product.price.toFixed(2)}
        </p>
        <p className="text-gray-600 text-sm mt-2 line-clamp-2">
          {product.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full bg-techmart-purple hover:bg-techmart-purple-dark gap-2" 
          onClick={handleAddToCart}
        >
          <ShoppingCart size={16} />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
