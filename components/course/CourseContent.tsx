'use client';

import { useState } from 'react';
import type { Course } from '@/components/data/course';
import CoursePlayer from '@/components/course/CoursePlayer';
import CourseInfo from '@/components/course/CourseInfo';
import CourseChapters from '@/components/course/CourseChapters';
import CourseEnrollCard from '@/components/course/CourseEnrollCard';

interface CourseContentProps {
  course: Course;
  initialEpisodeId?: string;
}

export default function CourseContent({ course, initialEpisodeId }: CourseContentProps) {
  const [activeEpisodeId, setActiveEpisodeId] = useState<string | undefined>(initialEpisodeId);
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  
  // مدیریت انتخاب قسمت
  const handleEpisodeSelect = (episodeId: string) => {
    setActiveEpisodeId(episodeId);
    
    // تغییر URL بدون بارگذاری مجدد صفحه
    const url = new URL(window.location.href);
    url.searchParams.set('episodeId', episodeId);
    window.history.pushState({}, '', url.toString());
  };
  
  return (
    <>
      {/* دکمه تغییر وضعیت کاربر (فقط برای تست) */}
      <div className="mb-8 flex justify-center">
        <button
          onClick={() => setIsPremiumUser(prev => !prev)}
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
            {isPremiumUser ? 'شما عضو ویژه هستید' : 'تبدیل به کاربر ویژه برای تست'}
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
              activeEpisode={activeEpisodeId}
              onSelectEpisode={handleEpisodeSelect}
              courseId={course.id}
              useLinks={true}
            />
          </div>
        </div>
        
        {/* سایدبار - کارت ثبت‌نام/خرید */}
        <div className="lg:col-span-1">
          <CourseEnrollCard 
            course={course} 
            isPremiumUser={isPremiumUser} 
          />
        </div>
      </div>
    </>
  );
} 