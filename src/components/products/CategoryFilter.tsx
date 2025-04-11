
import { Category } from '@/services/productService';

interface CategoryFilterProps {
  categories: Category[];
  currentCategory: string;
  onCategoryChange: (category: string) => void;
  isLoading: boolean;
}

const CategoryFilter = ({ 
  categories, 
  currentCategory, 
  onCategoryChange,
  isLoading 
}: CategoryFilterProps) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">Categories</h2>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange('all')}
          className={`px-4 py-2 rounded-full ${
            currentCategory === 'all' 
              ? 'bg-techmart-purple text-white' 
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          All Products
        </button>
        
        {isLoading ? (
          <div>Loading categories...</div>
        ) : (
          categories.map((category: Category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.name)}
              className={`px-4 py-2 rounded-full ${
                currentCategory === category.name 
                  ? 'bg-techmart-purple text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryFilter;
