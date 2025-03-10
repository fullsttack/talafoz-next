'use client';

import { useState, useMemo, useCallback } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// دریافت همه دسته‌بندی‌های منحصر به فرد از دوره‌ها
export const getUniqueCategories = (courses: any[]) => {
  const categoriesSet = new Set<string>();
  
  courses.forEach(course => {
    if (course.categories && Array.isArray(course.categories)) {
      course.categories.forEach((category: string) => {
        categoriesSet.add(category);
      });
    }
  });
  
  return Array.from(categoriesSet).sort();
};

interface CourseFilterSidebarProps {
  courses: any[];
}

export default function CourseFilterSidebar({ courses }: CourseFilterSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [showTypeFilter, setShowTypeFilter] = useState(true);
  const [showCategoriesFilter, setShowCategoriesFilter] = useState(true);
  
  // محاسبه دسته‌بندی‌های منحصر به فرد با useMemo
  const uniqueCategories = useMemo(() => getUniqueCategories(courses), [courses]);
  
  // دریافت فیلترهای فعلی از URL
  const currentTypeFilter = searchParams.get('type') || '';
  const currentCategoryFilters = useMemo(() => {
    return searchParams.get('categories')?.split(',').filter(Boolean) || [];
  }, [searchParams]);
  
  // اعمال فیلترهای جدید به URL با useCallback برای ثبات رفرنس
  const applyFilters = useCallback((type: string, categories: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (type) {
      params.set('type', type);
    } else {
      params.delete('type');
    }
    
    if (categories.length > 0) {
      params.set('categories', categories.join(','));
    } else {
      params.delete('categories');
    }
    
    router.push(`${pathname}?${params.toString()}`);
  }, [router, pathname, searchParams]);
  
  // تغییر فیلتر نوع دوره با useCallback
  const handleTypeFilterChange = useCallback((type: string) => {
    applyFilters(
      currentTypeFilter === type ? '' : type,
      currentCategoryFilters
    );
  }, [applyFilters, currentTypeFilter, currentCategoryFilters]);
  
  // تغییر فیلتر دسته‌بندی با useCallback
  const handleCategoryFilterChange = useCallback((category: string) => {
    const newCategories = currentCategoryFilters.includes(category)
      ? currentCategoryFilters.filter(c => c !== category)
      : [...currentCategoryFilters, category];
    
    applyFilters(currentTypeFilter, newCategories);
  }, [applyFilters, currentTypeFilter, currentCategoryFilters]);
  
  return (
    <aside className="w-full rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 lg:w-64">
      <h2 className="mb-4 text-lg font-bold">فیلتر دوره‌ها</h2>
      
      {/* فیلتر نوع دوره */}
      <div className="mb-6 border-b border-gray-200 pb-4 dark:border-gray-800">
        <button
          onClick={() => setShowTypeFilter(!showTypeFilter)}
          className="mb-2 flex w-full items-center justify-between font-medium"
        >
          <span>نوع دوره</span>
          <ChevronDown className={`h-5 w-5 transition-transform ${showTypeFilter ? 'rotate-180' : ''}`} />
        </button>
        
        {showTypeFilter && (
          <div className="space-y-2 pt-2">
            <label className="flex cursor-pointer items-center gap-2">
              <div className={`flex h-5 w-5 items-center justify-center rounded border ${currentTypeFilter === 'free' ? 'border-primary bg-primary text-white' : 'border-gray-300 dark:border-gray-600'}`}>
                {currentTypeFilter === 'free' && <Check className="h-3.5 w-3.5" />}
              </div>
              <input
                type="checkbox"
                className="sr-only"
                checked={currentTypeFilter === 'free'}
                onChange={() => handleTypeFilterChange('free')}
              />
              <span>دوره‌های رایگان</span>
            </label>
            
            <label className="flex cursor-pointer items-center gap-2">
              <div className={`flex h-5 w-5 items-center justify-center rounded border ${currentTypeFilter === 'paid' ? 'border-primary bg-primary text-white' : 'border-gray-300 dark:border-gray-600'}`}>
                {currentTypeFilter === 'paid' && <Check className="h-3.5 w-3.5" />}
              </div>
              <input
                type="checkbox"
                className="sr-only"
                checked={currentTypeFilter === 'paid'}
                onChange={() => handleTypeFilterChange('paid')}
              />
              <span>دوره‌های نقدی</span>
            </label>
            
            <label className="flex cursor-pointer items-center gap-2">
              <div className={`flex h-5 w-5 items-center justify-center rounded border ${currentTypeFilter === 'premium' ? 'border-primary bg-primary text-white' : 'border-gray-300 dark:border-gray-600'}`}>
                {currentTypeFilter === 'premium' && <Check className="h-3.5 w-3.5" />}
              </div>
              <input
                type="checkbox"
                className="sr-only"
                checked={currentTypeFilter === 'premium'}
                onChange={() => handleTypeFilterChange('premium')}
              />
              <span>رایگان برای اعضای ویژه</span>
            </label>
          </div>
        )}
      </div>
      
      {/* فیلتر دسته‌بندی‌ها */}
      <div className="mb-6">
        <button
          onClick={() => setShowCategoriesFilter(!showCategoriesFilter)}
          className="mb-2 flex w-full items-center justify-between font-medium"
        >
          <span>دسته‌بندی‌ها</span>
          <ChevronDown className={`h-5 w-5 transition-transform ${showCategoriesFilter ? 'rotate-180' : ''}`} />
        </button>
        
        {showCategoriesFilter && (
          <div className="max-h-60 space-y-2 overflow-y-auto pt-2">
            {uniqueCategories.map((category) => (
              <label key={category} className="flex cursor-pointer items-center gap-2">
                <div className={`flex h-5 w-5 items-center justify-center rounded border ${currentCategoryFilters.includes(category) ? 'border-primary bg-primary text-white' : 'border-gray-300 dark:border-gray-600'}`}>
                  {currentCategoryFilters.includes(category) && <Check className="h-3.5 w-3.5" />}
                </div>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={currentCategoryFilters.includes(category)}
                  onChange={() => handleCategoryFilterChange(category)}
                />
                <span>{category}</span>
              </label>
            ))}
          </div>
        )}
      </div>
      
      {/* دکمه ریست فیلترها */}
      {(currentTypeFilter || currentCategoryFilters.length > 0) && (
        <button
          onClick={() => applyFilters('', [])}
          className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          حذف فیلترها
        </button>
      )}
    </aside>
  );
} 