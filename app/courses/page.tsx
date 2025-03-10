'use client';

import { useState } from 'react';
import CourseGrid from '@/components/course/CourseGrid';
import { courses } from '@/components/data/course';

export default function CoursesPage() {
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  
  const featuredCourses = courses.filter(course => course.isFeatured);
  const freeCourses = courses.filter(course => course.isFree);
  const premiumFreeCourses = courses.filter(course => course.isFreePremium);
  
  const togglePremiumStatus = () => {
    setIsPremiumUser(prev => !prev);
  };
  
  return (
    <div className="container mx-auto px-4">
      <div className="py-10">
        <h1 className="mb-2 text-center text-4xl font-extrabold">دوره‌های آموزشی</h1>
        <p className="mx-auto mb-6 max-w-2xl text-center text-gray-600 dark:text-gray-400">
          مجموعه کاملی از دوره‌های آموزشی مرتبط با برنامه‌نویسی و طراحی وب با بهترین کیفیت و قیمت مناسب
        </p>
        
        <div className="mb-10 flex items-center justify-center">
          <button
            onClick={togglePremiumStatus}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              isPremiumUser 
                ? 'bg-amber-500 text-white hover:bg-amber-600' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            <span className="relative flex h-3 w-3">
              <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${isPremiumUser ? 'bg-white/75' : 'bg-amber-400/75'} opacity-75`}></span>
              <span className={`relative inline-flex h-3 w-3 rounded-full ${isPremiumUser ? 'bg-white' : 'bg-amber-500'}`}></span>
            </span>
            <span>
              {isPremiumUser ? 'شما عضو ویژه هستید' : 'ارتقا به عضویت ویژه'}
            </span>
          </button>
        </div>
      </div>

      {freeCourses.length > 0 && (
        <CourseGrid 
          title="دوره‌های رایگان" 
          description="دوره‌های آموزشی رایگان برای همه کاربران"
          courses={freeCourses}
          isPremiumUser={isPremiumUser}
        />
      )}
      
      {isPremiumUser && premiumFreeCourses.length > 0 && (
        <CourseGrid 
          title="دوره‌های ویژه رایگان برای شما" 
          description="به عنوان عضو ویژه، به این دوره‌ها به صورت رایگان دسترسی دارید"
          courses={premiumFreeCourses}
          isPremiumUser={isPremiumUser}
        />
      )}
      
      <CourseGrid 
        title="دوره‌های ویژه" 
        description="دوره‌های منتخب و پرطرفدار با تخفیف ویژه"
        courses={featuredCourses}
        isPremiumUser={isPremiumUser}
      />
      
      <CourseGrid 
        title="همه دوره‌ها"
        courses={courses}
        isPremiumUser={isPremiumUser}
      />
    </div>
  );
} 