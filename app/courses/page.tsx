'use client';

import { useState, Suspense } from 'react';
import { courses } from '@/components/data/course';
import FilteredCourseList from '@/components/course/FilteredCourseList';
import CourseSearch from '@/components/course/CourseSearch';
import CourseFilterSidebar from '@/components/course/CourseFilterSidebar';
import { useSearchParams } from 'next/navigation';

// Definimos los cursos aquí como una constante para evitar recreaciones
const COURSES = courses;

export default function CoursesPage() {
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const searchParams = useSearchParams();
  
  // پارامترهای جستجو و فیلتر فعلی
  const typeFilter = searchParams.get('type') || '';
  const categoryFilters = searchParams.get('categories')?.split(',').filter(Boolean) || [];
  const searchQuery = searchParams.get('query') || '';
  
  // عنوان صفحه را بر اساس فیلترها و جستجو تنظیم می‌کنیم
  const getPageTitle = () => {
    if (searchQuery) {
      return `نتایج جستجو برای "${searchQuery}"`;
    }
    
    if (typeFilter === 'free') {
      return 'دوره‌های رایگان';
    } else if (typeFilter === 'paid') {
      return 'دوره‌های نقدی';
    } else if (typeFilter === 'premium') {
      return 'دوره‌های ویژه اعضا';
    }
    
    return 'همه دوره‌ها';
  };
  
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
      {/* سایدبار فیلتر - در موبایل، بالای محتوا قرار می‌گیرد */}
      <div className="lg:sticky lg:top-24 lg:h-fit lg:w-64 lg:shrink-0">
        <Suspense fallback={<div className="h-60 w-full animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800"></div>}>
          <CourseFilterSidebar courses={COURSES} />
        </Suspense>
      </div>
      
      {/* محتوای اصلی */}
      <div className="flex-1">
        {/* جستجو */}
        <div className="mb-6">
          <CourseSearch />
        </div>
        
        {/* عنوان صفحه */}
        <div className="mb-6">
          <h2 className="text-xl font-bold">{getPageTitle()}</h2>
          {/* نمایش تعداد نتایج در صورت وجود فیلتر یا جستجو */}
          {(typeFilter || categoryFilters.length > 0 || searchQuery) && (
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              برای دیدن همه دوره‌ها، فیلترها را حذف کنید
            </p>
          )}
        </div>
        
        {/* لیست دوره‌های فیلتر شده */}
        <FilteredCourseList courses={COURSES} isPremiumUser={isPremiumUser} />
      </div>
    </div>
  );
} 