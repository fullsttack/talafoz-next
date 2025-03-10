'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import CourseCard from '@/components/course/CourseCard';

interface FilteredCourseListProps {
  courses: any[];
  isPremiumUser?: boolean;
}

export default function FilteredCourseList({ courses, isPremiumUser = false }: FilteredCourseListProps) {
  const searchParams = useSearchParams();
  
  // قیلترهای فعلی
  const typeFilter = searchParams.get('type') || '';
  const categoryFilters = searchParams.get('categories')?.split(',').filter(Boolean) || [];
  const searchQuery = searchParams.get('query') || '';
  
  // استفاده از useMemo برای محاسبه دوره‌های فیلتر شده
  const filteredCourses = useMemo(() => {
    let result = [...courses];
    
    // فیلتر بر اساس نوع دوره
    if (typeFilter) {
      if (typeFilter === 'free') {
        result = result.filter(course => course.isFree);
      } else if (typeFilter === 'paid') {
        result = result.filter(course => !course.isFree && course.price > 0);
      } else if (typeFilter === 'premium') {
        result = result.filter(course => course.isFreePremium);
      }
    }
    
    // فیلتر بر اساس دسته‌بندی‌ها
    if (categoryFilters.length > 0) {
      result = result.filter(course => 
        course.categories?.some((category: string) => 
          categoryFilters.includes(category)
        )
      );
    }
    
    // فیلتر بر اساس عبارت جستجو
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(course => 
        course.title.toLowerCase().includes(query) || 
        course.description.toLowerCase().includes(query) ||
        course.categories.some((category: string) => 
          category.toLowerCase().includes(query)
        )
      );
    }
    
    return result;
  }, [courses, typeFilter, categoryFilters, searchQuery]);
  
  if (filteredCourses.length === 0) {
    return (
      <div className="flex w-full flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-8 text-center dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-4 text-5xl">🔍</div>
        <h3 className="mb-2 text-xl font-bold">هیچ دوره‌ای یافت نشد</h3>
        <p className="text-gray-600 dark:text-gray-400">لطفاً فیلترهای دیگری را امتحان کنید یا عبارت جستجوی دیگری وارد کنید.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {filteredCourses.map(course => (
        <CourseCard 
          key={course.id} 
          course={course} 
          isPremiumUser={isPremiumUser}
        />
      ))}
    </div>
  );
} 