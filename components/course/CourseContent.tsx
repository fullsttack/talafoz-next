'use client';

import { useState, useEffect, useRef } from 'react';
import { Check, Lock } from 'lucide-react';
import type { Course } from '@/components/data/course';
import CourseEpisodePlayer from '@/components/course/CourseEpisodePlayer';
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
  const [currentPlayerTime, setCurrentPlayerTime] = useState(0);
  const [watchedProgress, setWatchedProgress] = useState<Record<string, number>>({});
  const [activeEpisode, setActiveEpisode] = useState<any>(null);
  const [shouldAutoPlay, setShouldAutoPlay] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);

  // بررسی دسترسی کاربر به محتوا
  const hasAccess = hasPurchasedCourse || (isPremiumUser && course.isFreePremium);
  
  // مدیریت انتخاب قسمت
  const handleEpisodeSelect = (episodeId: string) => {
    setActiveEpisodeId(episodeId);
    
    // تنظیم پخش خودکار برای اپیزود انتخاب شده
    setShouldAutoPlay(true);
    
    // تغییر URL بدون بارگذاری مجدد صفحه
    const url = new URL(window.location.href);
    url.searchParams.set('episodeId', episodeId);
    window.history.pushState({}, '', url.toString());
    
    // اسکرول به سمت پلیر با یک تاخیر کوتاه برای اطمینان از رندر شدن کامپوننت
    setTimeout(() => {
      if (playerRef.current) {
        playerRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      } else {
        // پشتیبانی از مرورگرهای قدیمی‌تر
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }, 100);
  };
  
  // پیدا کردن قسمت فعال بر اساس ID
  useEffect(() => {
    if (!course.chapters || course.chapters.length === 0) {
      // برای دوره‌های بدون فصل یا ویدیو، یک اپیزود پیش‌فرض قرار می‌دهیم
      setActiveEpisode({
        id: 'demo',
        title: 'پیش‌نمایش دوره',
        duration: '۱۰:۰۰',
        isFree: true,
        description: 'این ویدیو پیش‌نمایش دوره است. به زودی محتوای دوره بارگذاری خواهد شد.',
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
      });
      // ریست کردن وضعیت پخش خودکار برای بارگذاری اولیه
      setShouldAutoPlay(false);
      return;
    }
    
    let episode = null;
    
    if (activeEpisodeId) {
      // جستجو بر اساس ID
      for (const chapter of course.chapters) {
        const found = chapter.episodes.find(ep => ep.id === activeEpisodeId);
        if (found) {
          episode = found;
          break;
        }
      }
    }
    
    // اگر هیچ قسمتی انتخاب نشده، اولین قسمت رایگان یا پیش‌نمایش را انتخاب کن
    if (!episode) {
      episode = course.chapters
        .flatMap(ch => ch.episodes)
        .find(ep => ep.isFree || ep.isPreview);
      
      // اگر هیچ قسمت رایگانی پیدا نشد، اولین قسمت را انتخاب کن
      if (!episode && course.chapters[0]?.episodes[0]) {
        episode = course.chapters[0].episodes[0];
      }
      
      // ریست کردن وضعیت پخش خودکار برای بارگذاری اولیه
      setShouldAutoPlay(false);
    }
    
    if (episode) {
      setActiveEpisode(episode);
    }
  }, [course, activeEpisodeId]);
  
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

  // مدیریت پیشرفت ویدیو
  const handleVideoProgress = (progressPercent: number, currentTime?: number) => {
    if (!activeEpisode) return;
    
    setWatchedProgress(prev => ({
      ...prev,
      [activeEpisode.id]: progressPercent
    }));
    
    // ذخیره موقعیت فعلی ویدیو
    if (currentTime !== undefined) {
      setCurrentPlayerTime(currentTime);
    }
  };
  
  return (
    <>
      {/* پیام موفقیت */}
      {showSuccessMessage && (
        <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in rounded-lg p-4 text-center shadow-lg w-[90%] sm:w-[450px] max-w-md
          ${showSuccessMessage.includes('دسترسی') || showSuccessMessage.includes('خریداری کنید') 
            ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800/40' 
            : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800/40'
          }`}>
          
          <div className="flex items-center justify-center gap-2 mb-1">
            {showSuccessMessage.includes('دسترسی') || showSuccessMessage.includes('خریداری کنید') ? (
              <Lock className="h-5 w-5 flex-shrink-0" />
            ) : (
              <Check className="h-5 w-5 flex-shrink-0" />
            )}
            <span className="font-medium">{showSuccessMessage}</span>
          </div>
          
          {/* دکمه‌های خرید فقط برای پیام‌های مربوط به عدم دسترسی */}
          {(showSuccessMessage.includes('دسترسی') || showSuccessMessage.includes('خریداری کنید')) && (
            <div className="flex gap-2 justify-center mt-3">
              <button 
                onClick={togglePurchaseStatus}
                className="bg-amber-600 hover:bg-amber-700 text-white text-xs py-1.5 px-3 rounded transition-colors"
              >
                خرید دوره
              </button>
              {course.isFreePremium && (
                <button 
                  onClick={togglePremiumStatus}
                  className="bg-gray-600 hover:bg-gray-700 text-white text-xs py-1.5 px-3 rounded transition-colors"
                >
                  تهیه اشتراک ویژه
                </button>
              )}
            </div>
          )}
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
          <div className="mb-10" ref={playerRef}>
            {activeEpisode ? (
              <div className="space-y-4">
                {/* عنوان قسمت فعال */}
                <h2 className="text-xl font-bold">{activeEpisode.title}</h2>
                
                {/* کامپوننت پخش‌کننده */}
                <div className="aspect-video relative w-full bg-black rounded-lg overflow-hidden">
                  {hasAccess || activeEpisode.isFree || activeEpisode.isPreview ? (
                    <CourseEpisodePlayer 
                      episode={activeEpisode} 
                      onProgressChange={handleVideoProgress}
                      initialProgress={watchedProgress[activeEpisode.id] || 0}
                      showNavigationControls={false}
                      autoPlay={shouldAutoPlay}
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
                      <div className="mb-4 rounded-full bg-gray-800 p-4">
                        <Lock className="h-10 w-10 text-amber-400" />
                      </div>
                      <h3 className="mb-2 text-xl font-bold text-white">این محتوا قفل شده است</h3>
                      <p className="mb-6 text-gray-400 max-w-md">
                        برای مشاهده این قسمت، باید دوره را خریداری کنید یا عضو ویژه باشید.
                      </p>
                      <div className="flex flex-wrap gap-3 justify-center">
                        <button 
                          onClick={togglePurchaseStatus}
                          className="rounded-md bg-primary px-6 py-2.5 text-white hover:bg-primary/90 transition-colors"
                        >
                          خرید دوره
                        </button>
                        {course.isFreePremium && (
                          <button 
                            onClick={togglePremiumStatus}
                            className="rounded-md border border-amber-500 bg-transparent px-6 py-2.5 text-amber-500 hover:bg-amber-500/10 transition-colors"
                          >
                            فعال‌سازی عضویت ویژه
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="rounded-lg border border-gray-200 bg-gray-100 p-12 text-center dark:border-gray-800 dark:bg-gray-900">
                <p className="text-gray-600 dark:text-gray-400">لطفاً یک قسمت را برای پخش انتخاب کنید.</p>
              </div>
            )}
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