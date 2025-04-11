
import { Badge } from '@/components/ui/badge';

interface ActiveFiltersProps {
  currentCategory: string;
  currentBrand: string;
  onCategoryChange: (category: string) => void;
  onBrandChange: (brand: string) => void;
  onClearAllFilters: () => void;
}

const ActiveFilters = ({ 
  currentCategory, 
  currentBrand, 
  onCategoryChange, 
  onBrandChange,
  onClearAllFilters
}: ActiveFiltersProps) => {
  if (currentCategory === 'all' && currentBrand === 'all') return null;
  
  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium mb-2">Active Filters:</h3>
      <div className="flex flex-wrap gap-2">
        {currentCategory !== 'all' && (
          <Badge variant="secondary" className="flex items-center gap-1">
            Category: {currentCategory}
            <button 
              className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
              onClick={() => onCategoryChange('all')}
            >
              ×
            </button>
          </Badge>
        )}
        
        {currentBrand !== 'all' && (
          <Badge variant="secondary" className="flex items-center gap-1">
            Brand: {currentBrand}
            <button 
              className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
              onClick={() => onBrandChange('all')}
            >
              ×
            </button>
          </Badge>
        )}
        
        {(currentCategory !== 'all' || currentBrand !== 'all') && (
          <button 
            className="text-sm text-gray-500 hover:text-gray-700 underline"
            onClick={onClearAllFilters}
          >
            Clear all filters
          </button>
        )}
      </div>
    </div>
  );
};

export default ActiveFilters;
