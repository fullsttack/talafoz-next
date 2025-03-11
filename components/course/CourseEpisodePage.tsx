'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, Lock, Play, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { Course, Episode, Chapter } from '@/components/data/course';
import CourseEpisodePlayer from '@/components/course/CourseEpisodePlayer';
import EpisodeFeaturesTabs from '@/components/episode/EpisodeFeaturesTabs';

interface CourseEpisodePageProps {
  course: Course;
  episode: Episode;
  chapter: Chapter;
}

export default function CourseEpisodePage({ course, episode, chapter }: CourseEpisodePageProps) {
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const [hasPurchasedCourse, setHasPurchasedCourse] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<string | null>(null);
  const [currentPlayerTime, setCurrentPlayerTime] = useState(0);
  
  // مدیریت پیشرفت تماشای اپیزودها
  const [watchedProgress, setWatchedProgress] = useState<Record<string, number>>(() => {
    // ساخت مقادیر تصادفی برای نمایش (در پروژه واقعی از API دریافت می‌شود)
    const progress: Record<string, number> = {};
    if (course.chapters) {
      course.chapters.forEach(chapter => {
        chapter.episodes.forEach((ep, index) => {
          // ایجاد مقادیر تصادفی
          if (index % 4 === 0) progress[ep.id] = 100; // اپیزود کامل شده
          else if (index % 4 === 1) progress[ep.id] = Math.floor(Math.random() * 50 + 30); // بین 30% تا 80%
          else if (index % 4 === 2) progress[ep.id] = Math.floor(Math.random() * 30); // کمتر از 30%
        });
      });
    }
    
    // اپیزود فعلی را به صورت تصادفی تنظیم می‌کنیم اگر قبلاً تنظیم نشده
    if (!progress[episode.id]) {
      progress[episode.id] = Math.floor(Math.random() * 100);
    }
    
    return progress;
  });
  
  // لیست اپیزودهایی که به طور کامل دیده شده‌اند
  const [completedEpisodes, setCompletedEpisodes] = useState<string[]>(() => {
    return Object.entries(watchedProgress)
      .filter(([, progress]) => progress >= 95)
      .map(([episodeId]) => episodeId);
  });
  
  // مدیریت باز و بسته کردن فصل‌ها
  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>(() => {
    // فقط فصل فعلی باز باشد
    const expanded: Record<string, boolean> = {};
    if (course.chapters) {
      course.chapters.forEach(ch => {
        expanded[ch.id] = ch.id === chapter.id;
      });
    }
    return expanded;
  });
  
  // تغییر حالت باز/بسته بودن فصل
  const toggleChapter = (chapterId: string) => {
    setExpandedChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }));
  };
  
  // هنگام تغییر پیشرفت ویدیو
  const handleVideoProgress = (progressPercent: number, currentTime?: number) => {
    setWatchedProgress(prev => {
      // بروزرسانی فقط اگر پیشرفت بیشتر شده باشد
      if (!prev[episode.id] || progressPercent > prev[episode.id]) {
        return { ...prev, [episode.id]: progressPercent };
      }
      return prev;
    });
    
    // اگر به انتهای ویدیو رسیده، به لیست تکمیل شده‌ها اضافه شود
    if (progressPercent >= 95 && !completedEpisodes.includes(episode.id)) {
      setCompletedEpisodes(prev => [...prev, episode.id]);
      setShowSuccessMessage('تبریک! این اپیزود را کامل کردید.');
    }
    
    // Update current player time for the notes tab
    if (currentTime !== undefined) {
      setCurrentPlayerTime(currentTime);
    }
  };
  
  // محاسبه درصد تکمیل یک فصل
  const calculateChapterProgress = (ch: Chapter) => {
    const totalEpisodes = ch.episodes.length;
    if (totalEpisodes === 0) return 0;
    
    const completedInChapter = ch.episodes.filter(ep => 
      completedEpisodes.includes(ep.id) || 
      (watchedProgress[ep.id] && watchedProgress[ep.id] >= 95)
    ).length;
    
    return Math.round((completedInChapter / totalEpisodes) * 100);
  };
  
  // بررسی دسترسی کاربر به اپیزود
  const hasAccess = episode.isFree || hasPurchasedCourse || (isPremiumUser && course.isFreePremium);
  
  // تغییر وضعیت عضویت ویژه (برای نمایش)
  const togglePremiumStatus = () => {
    setIsPremiumUser(!isPremiumUser);
    // نمایش پیام
    setShowSuccessMessage(isPremiumUser 
      ? 'عضویت ویژه غیرفعال شد.' 
      : 'عضویت ویژه فعال شد! حالا می‌توانید به دوره‌های ویژه دسترسی داشته باشید.'
    );
  };
  
  // تغییر وضعیت خرید دوره (برای نمایش)
  const togglePurchaseStatus = () => {
    setHasPurchasedCourse(!hasPurchasedCourse);
    // نمایش پیام
    setShowSuccessMessage(hasPurchasedCourse 
      ? 'وضعیت خرید دوره غیرفعال شد.' 
      : 'تبریک! دوره خریداری شد و اکنون به تمام محتوای آن دسترسی دارید.'
    );
  };
  
  // پیام موفقیت که پس از مدتی ناپدید می‌شود
  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(null);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);
  
  return (
    <>
      {/* پیام موفقیت */}
      {showSuccessMessage && (
        <div className="fixed bottom-4 left-4 right-4 z-50 animate-fade-in-up rounded-lg bg-green-100 p-4 text-center text-green-800 shadow-lg dark:bg-green-900/30 dark:text-green-400 md:left-auto md:right-4 md:w-80">
          {showSuccessMessage}
        </div>
      )}

      <div className="container mx-auto px-4">
        {/* مسیر ناوبری */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/courses" className="hover:text-primary">دوره‌ها</Link>
            <ChevronLeft className="h-4 w-4" />
            <Link href={`/courses/${course.id}`} className="hover:text-primary">{course.title}</Link>
            <ChevronLeft className="h-4 w-4" />
            <span>{episode.title}</span>
          </div>
        </div>

        {/* عنوان و مشخصات اپیزود */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold mb-2">{episode.title}</h1>
          <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
            <span>مدت زمان: {episode.duration}</span>
            {episode.isFree && (
              <span className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 px-2 py-0.5 rounded-full text-xs">
                رایگان
              </span>
            )}
          </div>
        </div>
        
        {/* بخش ویدیو و لیست اپیزودها */}
        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:gap-8 lg:grid-cols-12 mb-8">
          {/* ویدیو پلیر - ستون اصلی */}
          <div className="lg:col-span-8 xl:col-span-9 order-2 lg:order-1">
            <div className="overflow-hidden rounded-xl bg-gray-900">
              {hasAccess ? (
                <CourseEpisodePlayer 
                  episode={episode} 
                  onProgressChange={handleVideoProgress}
                  initialProgress={watchedProgress[episode.id] || 0}
                />
              ) : (
                <div className="flex h-[250px] sm:h-[300px] md:h-[350px] flex-col items-center justify-center p-4 sm:p-6 text-center">
                  <div className="mb-4 rounded-full bg-gray-800 p-4">
                    <Lock className="h-8 w-8 sm:h-10 sm:w-10 text-amber-500" />
                  </div>
                  <h3 className="mb-2 text-lg sm:text-xl font-bold text-white">این محتوا قفل شده است</h3>
                  <p className="mb-4 text-gray-400 text-sm sm:text-base">
                    برای مشاهده این قسمت، باید دوره را خریداری کنید یا عضو ویژه باشید.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <button 
                      onClick={togglePurchaseStatus}
                      className="rounded-md bg-primary px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base text-white hover:bg-primary/90"
                    >
                      خرید دوره
                    </button>
                    {course.isFreePremium && (
                      <button 
                        onClick={togglePremiumStatus}
                        className="rounded-md border border-amber-500 bg-transparent px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base text-amber-500 hover:bg-amber-500/10"
                      >
                        فعال‌سازی عضویت ویژه
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* لیست اپیزودها - ستون کناری */}
          <div className="lg:col-span-4 xl:col-span-3 order-1 lg:order-2">
            <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 lg:sticky lg:top-4">
              <div className="border-b border-gray-200 p-3 sm:p-4 dark:border-gray-800">
                <h2 className="text-base sm:text-lg font-bold">قسمت‌های این دوره</h2>
              </div>
              
              <div className="divide-y divide-gray-200 dark:divide-gray-800 max-h-[50vh] lg:max-h-[calc(100vh-200px)] overflow-y-auto">
                {course.chapters && course.chapters.map(ch => {
                  const chapterProgress = calculateChapterProgress(ch);
                  return (
                    <div key={ch.id} className="border-b border-gray-200 last:border-b-0 dark:border-gray-800">
                      {/* سرفصل */}
                      <button
                        onClick={() => toggleChapter(ch.id)}
                        className="flex w-full items-center justify-between p-3 sm:p-4 text-right hover:bg-gray-50 dark:hover:bg-gray-800/60"
                      >
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-sm sm:text-base">{ch.title}</h3>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {ch.episodes.length} قسمت
                          </span>
                        </div>
                        <div className="flex items-center">
                          {expandedChapters[ch.id] ? 
                            <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5" /> : 
                            <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5" />
                          }
                        </div>
                      </button>
                      
                      {/* اپیزودهای فصل */}
                      {expandedChapters[ch.id] && (
                        <div className="space-y-1.5 sm:space-y-2 border-t border-gray-100 bg-gray-50 p-3 sm:p-4 dark:border-gray-800 dark:bg-gray-900/30">
                          {ch.episodes.map(ep => {
                            // بررسی دسترسی به هر اپیزود
                            const episodeAccess = 
                              ep.isFree || 
                              hasPurchasedCourse || 
                              (isPremiumUser && course.isFreePremium);
                            
                            // آیا اپیزود فعلی است؟
                            const isActive = ep.id === episode.id;
                            const progressPercent = watchedProgress[ep.id] || 0;
                            const isCompleted = completedEpisodes.includes(ep.id) || progressPercent >= 95;
                            
                            return (
                              <Link
                                href={`/courses/${course.id}/episodes/${ep.id}`}
                                key={ep.id}
                                className={`flex flex-col rounded-lg p-2 sm:p-3 transition-colors ${
                                  isActive 
                                    ? 'bg-primary/10 text-primary' 
                                    : episodeAccess
                                      ? 'hover:bg-gray-100 dark:hover:bg-gray-800'
                                      : 'opacity-70'
                                }`}
                              >
                                <div className="flex items-center gap-2 sm:gap-3">
                                  <div className="shrink-0">
                                    {!episodeAccess ? (
                                      <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
                                        <Lock className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 dark:text-gray-400" />
                                      </div>
                                    ) : isCompleted ? (
                                      <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-green-100 dark:bg-green-800/30">
                                        <Check className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 dark:text-green-400" />
                                      </div>
                                    ) : isActive ? (
                                      <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-primary/20">
                                        <Play className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                                      </div>
                                    ) : (
                                      <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
                                        <Play className="h-3 w-3 sm:h-4 sm:w-4 text-gray-700 dark:text-gray-300" />
                                      </div>
                                    )}
                                  </div>
                                  
                                  <div className="min-w-0 flex-1">
                                    <p className={`truncate font-medium text-xs sm:text-sm ${
                                      isActive ? 'text-primary' : ''
                                    }`}>
                                      {ep.title}
                                    </p>
                                    <p className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                      <span>{ep.duration}</span>
                                      {isCompleted && <span className="text-green-600 dark:text-green-400 text-[10px] sm:text-xs">تکمیل شده</span>}
                                    </p>
                                  </div>
                                </div>
                                
                                {/* نوار پیشرفت */}
                                {episodeAccess && progressPercent > 0 && (
                                  <div className="mt-1.5 sm:mt-2 h-1 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                                    <div 
                                      className={`h-full rounded-full ${
                                        isCompleted ? 'bg-green-500' : 'bg-primary'
                                      }`}
                                      style={{ width: `${progressPercent}%` }}
                                    />
                                  </div>
                                )}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        
        {/* توضیحات اپیزود و تب‌های امکانات */}
        <div className="space-y-6 sm:space-y-8">
          {/* توضیحات اپیزود */}
          {episode.description && (
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
              <h3 className="font-bold text-base sm:text-lg mb-2">توضیحات این اپیزود:</h3>
              <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                {episode.description}
              </p>
            </div>
          )}
            
          {/* تب‌های امکانات (یادداشت‌ها، تمرین‌ها، فایل‌های ضمیمه، نظرات) */}
          <EpisodeFeaturesTabs 
            episodeId={episode.id} 
            courseId={course.id}
            currentTime={currentPlayerTime}
          />
        </div>
      </div>
    </>
  );
} 