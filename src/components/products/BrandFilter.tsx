
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

interface BrandFilterProps {
  availableBrands: string[];
  currentBrand: string;
  onBrandChange: (brand: string) => void;
}

const BrandFilter = ({ 
  availableBrands, 
  currentBrand, 
  onBrandChange 
}: BrandFilterProps) => {
  if (availableBrands.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Brands</h2>
      
      <div className="block md:hidden mb-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full flex justify-between items-center">
              {currentBrand === 'all' ? 'All Brands' : currentBrand}
              <ChevronDown size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[200px]">
            <DropdownMenuItem 
              onClick={() => onBrandChange('all')}
            >
              All Brands
            </DropdownMenuItem>
            
            {availableBrands.map((brand) => (
              <DropdownMenuItem 
                key={brand} 
                onClick={() => onBrandChange(brand)}
              >
                {brand}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="hidden md:flex flex-wrap gap-2">
        <button
          onClick={() => onBrandChange('all')}
          className={`px-4 py-2 rounded-full ${
            currentBrand === 'all' 
              ? 'bg-techmart-purple text-white' 
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          All Brands
        </button>
        
        {availableBrands.map((brand) => (
          <button
            key={brand}
            onClick={() => onBrandChange(brand)}
            className={`px-4 py-2 rounded-full ${
              currentBrand === brand 
                ? 'bg-techmart-purple text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {brand}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BrandFilter;
