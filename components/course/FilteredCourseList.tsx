'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import CourseCard from '@/components/course/CourseCard';

// Course interface for type safety
interface Course {
  id: string;
  title: string;
  instructor: string;
  thumbnail: string;
  price: number;
  discountedPrice?: number;
  rating: number;
  reviewsCount: number;
  studentsCount: number;
  isPremium?: boolean;
  categories?: string[];
  level?: string;
  [key: string]: unknown; // Using unknown instead of any for better type safety
}

interface FilteredCourseListProps {
  courses: Course[];
  isPremiumUser?: boolean;
  typeFilter?: string;
  categoryFilters?: string[];
  searchQuery?: string;
}

export default function FilteredCourseList({ 
  courses, 
  isPremiumUser = false,
  typeFilter = '',
  categoryFilters = [],
  searchQuery = ''
}: FilteredCourseListProps) {
  // استفاده از useMemo برای محاسبه دوره‌های فیلتر شده
  const filteredCourses = useMemo(() => {
    const query = searchQuery.toLowerCase();
    let result = [...courses];
    
    // فیلتر بر اساس نوع (همه/رایگان/ویژه)
    if (typeFilter === 'free') {
      result = result.filter(course => !course.isPremium);
    } else if (typeFilter === 'premium') {
      result = result.filter(course => course.isPremium);
    }
    
    // فیلتر بر اساس دسته‌بندی
    if (categoryFilters.length > 0) {
      result = result.filter(course =>
        course.categories && course.categories.some((category: string) =>
          categoryFilters.includes(category)
        )
      );
    }
    
    // فیلتر بر اساس جستجو
    if (query) {
      result = result.filter(course =>
        course.title.toLowerCase().includes(query) ||
        course.instructor.toLowerCase().includes(query) ||
        course.categories && course.categories.some((category: string) => 
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