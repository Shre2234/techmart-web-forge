
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown, Tag } from 'lucide-react';

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

  // Sort brands alphabetically
  const sortedBrands = [...availableBrands].sort((a, b) => a.localeCompare(b));

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Tag size={18} className="text-techmart-purple" />
        Brands
      </h2>
      
      <div className="block md:hidden mb-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full flex justify-between items-center">
              <span className="truncate">
                {currentBrand === 'all' ? 'All Brands' : currentBrand}
              </span>
              <ChevronDown size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[200px] max-h-[300px] overflow-y-auto">
            <DropdownMenuItem 
              onClick={() => onBrandChange('all')}
              className={currentBrand === 'all' ? 'bg-muted font-medium' : ''}
            >
              All Brands
            </DropdownMenuItem>
            
            {sortedBrands.map((brand) => (
              <DropdownMenuItem 
                key={brand} 
                onClick={() => onBrandChange(brand)}
                className={currentBrand === brand ? 'bg-muted font-medium' : ''}
              >
                {brand}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-2">
        <button
          onClick={() => onBrandChange('all')}
          className={`px-4 py-2 rounded-full transition-all ${
            currentBrand === 'all' 
              ? 'bg-techmart-purple text-white shadow-md' 
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          All Brands
        </button>
        
        {sortedBrands.map((brand) => (
          <button
            key={brand}
            onClick={() => onBrandChange(brand)}
            className={`px-4 py-2 rounded-full truncate transition-all ${
              currentBrand === brand 
                ? 'bg-techmart-purple text-white shadow-md' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
            title={brand}
          >
            {brand}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BrandFilter;
