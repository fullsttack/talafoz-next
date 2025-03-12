'use client';

import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { Check, Lock } from 'lucide-react';
import type { Course } from '@/components/data/course';

// لود با تاخیر کامپوننت‌های سنگین (Lazy Loading)
const CourseEpisodePlayer = lazy(() => import('@/components/course/CourseEpisodePlayer'));
const CourseInfo = lazy(() => import('@/components/course/CourseInfo'));
const CourseChapters = lazy(() => import('@/components/course/CourseChapters'));
const CourseReviews = lazy(() => import('@/components/course/CourseReviews'));
const CourseEnrollCard = lazy(() => import('@/components/course/CourseEnrollCard'));
const CourseInstructorCard = lazy(() => import('@/components/course/CourseInstructorCard'));
const CourseCertificateCard = lazy(() => import('@/components/course/CourseCertificateCard'));

// Fallback components for lazy-loaded components
const PlayerSkeleton = () => (
  <div className="aspect-video relative w-full bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
);

const InfoSkeleton = () => (
  <div className="space-y-4">
    <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded-md w-1/3 animate-pulse"></div>
    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-md w-full animate-pulse"></div>
    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-md w-5/6 animate-pulse"></div>
  </div>
);

const CardSkeleton = () => (
  <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
);

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
    // اگر همان اپیزود فعلی است، کاری انجام نده
    if (episodeId === activeEpisodeId) return;
    
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
  
  // Memoize the toggle functions to prevent re-renders
  const togglePremiumStatus = useRef(() => {
    setIsPremiumUser(prev => {
      const newStatus = !prev;
      if (newStatus) {
        setShowSuccessMessage('عضویت ویژه با موفقیت فعال شد');
      }
      return newStatus;
    });
  }).current;
  
  // Toggle purchase status (without showing success message)
  const togglePurchaseStatus = useRef(() => {
    setHasPurchasedCourse(prev => !prev);
  }).current;

  // مدیریت پیشرفت ویدیو
  const handleVideoProgress = (progressPercent: number, currentTime?: number) => {
    if (!activeEpisode) return;
    
    // ذخیره پیشرفت اپیزود فعلی
    setWatchedProgress(prev => ({
      ...prev,
      [activeEpisode.id]: progressPercent
    }));
    
    // ذخیره موقعیت فعلی ویدیو
    if (currentTime !== undefined) {
      setCurrentPlayerTime(currentTime);
    }
  };
  
  // محاسبه درصد تکمیل دوره
  const calculateCourseCompletionPercentage = () => {
    if (!course.chapters || course.chapters.length === 0) return 0;
    
    const allEpisodes = course.chapters.flatMap(ch => ch.episodes);
    if (allEpisodes.length === 0) return 0;
    
    // شمارش اپیزودهایی که بیش از 90% پیشرفت دارند
    const completedEpisodes = Object.entries(watchedProgress)
      .filter(([_, progress]) => progress >= 90)
      .length;
    
    return Math.round((completedEpisodes / allEpisodes.length) * 100);
  };

  // آیا دوره تکمیل شده است؟
  const isCourseCompleted = () => {
    return calculateCourseCompletionPercentage() >= 90;
  };
  
  // درخواست گواهی
  const handleRequestCertificate = () => {
    setShowSuccessMessage('درخواست گواهی با موفقیت ثبت شد. گواهی به زودی برای شما ارسال خواهد شد.');
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
      
      {/* محتوای اصلی - پخش‌کننده ویدیو، توضیحات و فصل‌ها */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {/* پخش‌کننده ویدیو */}
          <div className="mb-10" ref={playerRef}>
            {activeEpisode ? (
              <div className="space-y-4">
                {/* کامپوننت پخش‌کننده */}
                <div className="aspect-video relative w-full bg-black rounded-lg overflow-hidden">
                  {hasAccess || activeEpisode.isFree || activeEpisode.isPreview ? (
                    <Suspense fallback={<PlayerSkeleton />}>
                      <CourseEpisodePlayer 
                        episode={activeEpisode} 
                        onProgressChange={handleVideoProgress}
                        initialProgress={watchedProgress[activeEpisode.id] || 0}
                        showNavigationControls={false}
                        autoPlay={shouldAutoPlay}
                      />
                    </Suspense>
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
            <Suspense fallback={<InfoSkeleton />}>
              <CourseInfo course={course} />
            </Suspense>
          </div>
          
          {/* فصل‌ها و قسمت‌های دوره */}
          <div className="mb-10">
            <Suspense fallback={<div className="h-40 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>}>
              <CourseChapters 
                chapters={course.chapters || []} 
                isPremiumUser={isPremiumUser}
                hasPurchasedCourse={hasPurchasedCourse}
                activeEpisode={activeEpisodeId}
                onSelectEpisode={handleEpisodeSelect}
                courseId={course.id}
                useLinks={true}
              />
            </Suspense>
          </div>
          
          {/* نظرات و امتیاز‌ها */}
          <div className="mb-10">
            <Suspense fallback={<div className="h-60 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>}>
              <CourseReviews 
                courseId={course.id} 
                courseRating={course.rating}
                reviewsCount={course.studentsCount > 200 ? Math.floor(course.studentsCount * 0.4) : 0}
              />
            </Suspense>
          </div>
        </div>
        
        {/* سایدبار - کارت ثبت‌نام/خرید */}
        <div className="lg:col-span-1">
          <div className="space-y-6">
            <Suspense fallback={<CardSkeleton />}>
              <CourseEnrollCard 
                course={course} 
                isPremiumUser={isPremiumUser}
                hasPurchasedCourse={hasPurchasedCourse}
                onPurchase={togglePurchaseStatus}
              />
            </Suspense>
            
            {/* کارت مشخصات مدرس */}
            <Suspense fallback={<CardSkeleton />}>
              <CourseInstructorCard 
                instructor={course.instructor}
                role="مدرس و متخصص این دوره"
                bio="متخصص و مدرس با تجربه در زمینه آموزش برنامه‌نویسی و توسعه نرم‌افزار با بیش از ۵ سال سابقه تدریس."
                socialLinks={{
                  linkedin: "https://linkedin.com/in/example",
                  twitter: "https://twitter.com/example",
                  instagram: "https://instagram.com/example",
                  github: "https://github.com/example"
                }}
              />
            </Suspense>
            
            {/* کارت گواهی پایان دوره */}
            <Suspense fallback={<CardSkeleton />}>
              <CourseCertificateCard 
                courseCompleted={isCourseCompleted()}
                courseCompletionPercentage={calculateCourseCompletionPercentage()}
                onRequestCertificate={handleRequestCertificate}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
} 