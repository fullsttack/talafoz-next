'use client';

import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import type { Course } from '@/components/data/course';
import CoursePlayer from '@/components/course/CoursePlayer';
import CourseInfo from '@/components/course/CourseInfo';
import CourseChapters from '@/components/course/CourseChapters';
import CourseEnrollCard from '@/components/course/CourseEnrollCard';
import CourseReviews from '@/components/course/CourseReviews';

interface CourseContentProps {
  course: Course;
  initialEpisodeId?: string;
}

export default function CourseContent({ course, initialEpisodeId }: CourseContentProps) {
  const [activeEpisodeId, setActiveEpisodeId] = useState<string | undefined>(initialEpisodeId);
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const [hasPurchasedCourse, setHasPurchasedCourse] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<string | null>(null);
  
  // مدیریت انتخاب قسمت
  const handleEpisodeSelect = (episodeId: string) => {
    setActiveEpisodeId(episodeId);
    
    // تغییر URL بدون بارگذاری مجدد صفحه
    const url = new URL(window.location.href);
    url.searchParams.set('episodeId', episodeId);
    window.history.pushState({}, '', url.toString());
  };
  
  // نمایش پیام موفقیت و حذف آن پس از چند ثانیه
  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(null);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);
  
  // تغییر وضعیت کاربر به عضو ویژه
  const togglePremiumStatus = () => {
    setIsPremiumUser(prev => {
      const newStatus = !prev;
      if (newStatus) {
        setShowSuccessMessage('عضویت ویژه با موفقیت فعال شد');
      }
      return newStatus;
    });
  };
  
  // تغییر وضعیت خرید دوره (بدون نمایش پیام موفقیت)
  const togglePurchaseStatus = () => {
    setHasPurchasedCourse(prev => !prev);
  };
  
  return (
    <>
      {/* پیام موفقیت */}
      {showSuccessMessage && (
        <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 transform rounded-lg bg-green-600 px-6 py-3 text-white shadow-lg">
          <div className="flex items-center gap-2">
            <Check className="h-5 w-5" />
            <span>{showSuccessMessage}</span>
          </div>
        </div>
      )}
      
      {/* دکمه‌های تغییر وضعیت کاربر */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <button
          onClick={togglePremiumStatus}
          className={`flex items-center justify-between rounded-lg border p-3 transition-colors ${
            isPremiumUser 
              ? 'border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-800/50 dark:bg-amber-900/20 dark:text-amber-400' 
              : 'border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'
          }`}
        >
          <span className="flex items-center gap-2 font-medium">
            <span className="relative flex h-3 w-3">
              <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${isPremiumUser ? 'bg-amber-400/75' : 'bg-gray-400/30'} opacity-75`}></span>
              <span className={`relative inline-flex h-3 w-3 rounded-full ${isPremiumUser ? 'bg-amber-500' : 'bg-gray-500/50'}`}></span>
            </span>
            <span>عضویت ویژه</span>
          </span>
          <span className={`rounded-full px-2 py-1 text-xs font-medium ${
            isPremiumUser 
              ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300' 
              : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
          }`}>
            {isPremiumUser ? 'فعال' : 'غیرفعال'}
          </span>
        </button>
        
        <button
          onClick={togglePurchaseStatus}
          className={`flex items-center justify-between rounded-lg border p-3 transition-colors ${
            hasPurchasedCourse 
              ? 'border-green-200 bg-green-50 text-green-800 dark:border-green-800/50 dark:bg-green-900/20 dark:text-green-400' 
              : 'border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'
          }`}
        >
          <span className="flex items-center gap-2 font-medium">
            <span className="relative flex h-3 w-3">
              <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${hasPurchasedCourse ? 'bg-green-400/75' : 'bg-gray-400/30'} opacity-75`}></span>
              <span className={`relative inline-flex h-3 w-3 rounded-full ${hasPurchasedCourse ? 'bg-green-500' : 'bg-gray-500/50'}`}></span>
            </span>
            <span>خرید دوره</span>
          </span>
          <span className={`rounded-full px-2 py-1 text-xs font-medium ${
            hasPurchasedCourse 
              ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' 
              : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
          }`}>
            {hasPurchasedCourse ? 'خریداری شده' : 'خریداری نشده'}
          </span>
        </button>
      </div>
      
      {/* محتوای اصلی - پخش‌کننده ویدیو، توضیحات و فصل‌ها */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {/* پخش‌کننده ویدیو */}
          <div className="mb-10">
            <CoursePlayer 
              course={course} 
              activeEpisodeId={activeEpisodeId} 
              isPremiumUser={isPremiumUser}
              hasPurchasedCourse={hasPurchasedCourse}
            />
          </div>
          
          {/* اطلاعات دوره - توضیحات، پیش‌نیازها و اهداف */}
          <div className="mb-10">
            <CourseInfo course={course} />
          </div>
          
          {/* فصل‌ها و قسمت‌های دوره */}
          <div className="mb-10">
            <CourseChapters 
              chapters={course.chapters || []} 
              isPremiumUser={isPremiumUser}
              hasPurchasedCourse={hasPurchasedCourse}
              activeEpisode={activeEpisodeId}
              onSelectEpisode={handleEpisodeSelect}
              courseId={course.id}
              useLinks={true}
            />
          </div>
          
          {/* نظرات و امتیاز‌ها */}
          <div className="mb-10">
            <CourseReviews 
              courseId={course.id} 
              courseRating={course.rating}
              reviewsCount={course.studentsCount > 200 ? Math.floor(course.studentsCount * 0.4) : 0}
            />
          </div>
        </div>
        
        {/* سایدبار - کارت ثبت‌نام/خرید */}
        <div className="lg:col-span-1">
          <CourseEnrollCard 
            course={course} 
            isPremiumUser={isPremiumUser}
            hasPurchasedCourse={hasPurchasedCourse}
            onPurchase={togglePurchaseStatus}
          />
        </div>
      </div>
    </>
  );
} 