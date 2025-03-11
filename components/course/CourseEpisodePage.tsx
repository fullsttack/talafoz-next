'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Lock, Play, AlertTriangle, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { Course, Episode, Chapter } from '@/components/data/course';
import CourseEpisodePlayer from '@/components/course/CourseEpisodePlayer';

interface CourseEpisodePageProps {
  course: Course;
  episode: Episode;
  chapter: Chapter;
}

export default function CourseEpisodePage({ course, episode, chapter }: CourseEpisodePageProps) {
  const router = useRouter();
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const [hasPurchasedCourse, setHasPurchasedCourse] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<string | null>(null);
  
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
      .filter(([_, progress]) => progress >= 95)
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
  const handleVideoProgress = (progressPercent: number) => {
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
  const hasAccess = 
    episode.isFree || // اپیزود رایگان است
    hasPurchasedCourse || // کاربر دوره را خریده است
    (isPremiumUser && course.isFreePremium); // کاربر اشتراک ویژه دارد و دوره برای اعضای ویژه رایگان است
  
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
  
  // تغییر وضعیت خرید دوره
  const togglePurchaseStatus = () => {
    setHasPurchasedCourse(prev => {
      const newStatus = !prev;
      if (newStatus) {
        setShowSuccessMessage('دوره با موفقیت خریداری شد');
      }
      return newStatus;
    });
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
      
      {/* اطلاعات اپیزود و فصل */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">{episode.title}</h1>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <span>از فصل: {chapter.title}</span>
          <span>•</span>
          <span>مدت زمان: {episode.duration}</span>
          {watchedProgress[episode.id] > 0 && watchedProgress[episode.id] < 95 && (
            <>
              <span>•</span>
              <span className="flex items-center gap-1 text-primary">
                <span>{Math.round(watchedProgress[episode.id])}%</span>
                <span>تماشا شده</span>
              </span>
            </>
          )}
          {completedEpisodes.includes(episode.id) && (
            <>
              <span>•</span>
              <span className="flex items-center gap-1 text-green-600">
                <Check className="h-3 w-3" />
                <span>تکمیل شده</span>
              </span>
            </>
          )}
        </div>
      </div>
      
      {/* محتوای اصلی */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* ستون اصلی - پخش‌کننده و توضیحات */}
        <div className="lg:col-span-2">
          {/* پخش‌کننده ویدیو */}
          <div className="mb-8 overflow-hidden rounded-xl bg-gray-900">
            {hasAccess ? (
              <CourseEpisodePlayer 
                episode={episode} 
                onProgressChange={handleVideoProgress}
                initialProgress={watchedProgress[episode.id] || 0}
              />
            ) : (
              <div className="flex h-[300px] flex-col items-center justify-center p-6 text-center">
                <div className="mb-4 rounded-full bg-gray-800 p-4">
                  <Lock className="h-10 w-10 text-amber-500" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">این محتوا قفل شده است</h3>
                <p className="mb-4 text-gray-400">
                  برای مشاهده این قسمت، باید دوره را خریداری کنید یا عضو ویژه باشید.
                </p>
                <div className="flex gap-2">
                  <button 
                    onClick={togglePurchaseStatus}
                    className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90"
                  >
                    خرید دوره (آزمایشی)
                  </button>
                  {course.isFreePremium && (
                    <button 
                      onClick={togglePremiumStatus}
                      className="rounded-md border border-amber-500 bg-transparent px-4 py-2 text-amber-500 hover:bg-amber-500/10"
                    >
                      فعال‌سازی عضویت ویژه (آزمایشی)
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {/* توضیحات اپیزود */}
          {episode.description && (
            <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <h2 className="mb-4 text-xl font-bold">درباره این قسمت</h2>
              <p className="text-gray-700 dark:text-gray-300">{episode.description}</p>
            </div>
          )}
          
          {/* دکمه‌های کنترل */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                {/* دکمه‌های ناوبری بین اپیزودها */}
                <div className="flex gap-2">
                  <Link 
                    href={`/courses/${course.id}`}
                    className="flex items-center gap-1 rounded-md bg-gray-100 px-4 py-2 text-sm font-medium hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>همه قسمت‌ها</span>
                  </Link>
                </div>
              </div>
              
              {!hasAccess && (
                <div className="flex items-center gap-1 text-sm text-amber-600 dark:text-amber-500">
                  <AlertTriangle className="h-4 w-4" />
                  <span>دسترسی محدود</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* ستون کناری - اپیزودهای دوره */}
        <div className="lg:col-span-1">
          <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
            <div className="border-b border-gray-200 p-4 dark:border-gray-800">
              <h2 className="text-lg font-bold">قسمت‌های این دوره</h2>
            </div>
            
            <div className="divide-y divide-gray-200 dark:divide-gray-800">
              {course.chapters && course.chapters.map(ch => {
                const chapterProgress = calculateChapterProgress(ch);
                return (
                  <div key={ch.id} className="border-b border-gray-200 last:border-b-0 dark:border-gray-800">
                    {/* سرفصل */}
                    <button
                      onClick={() => toggleChapter(ch.id)}
                      className="flex w-full items-center justify-between p-4 text-right hover:bg-gray-50 dark:hover:bg-gray-800/60"
                    >
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{ch.title}</h3>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {ch.episodes.length} قسمت
                        </span>
                      </div>
                      <div className="flex items-center">
                        {expandedChapters[ch.id] ? 
                          <ChevronUp className="h-5 w-5" /> : 
                          <ChevronDown className="h-5 w-5" />
                        }
                      </div>
                    </button>
                    
                    {/* اپیزودهای فصل */}
                    {expandedChapters[ch.id] && (
                      <div className="space-y-2 border-t border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900/30">
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
                              className={`flex flex-col rounded-lg p-3 transition-colors ${
                                isActive 
                                  ? 'bg-primary/10 text-primary' 
                                  : episodeAccess
                                    ? 'hover:bg-gray-100 dark:hover:bg-gray-800'
                                    : 'opacity-70'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className="shrink-0">
                                  {!episodeAccess ? (
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
                                      <Lock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                    </div>
                                  ) : isCompleted ? (
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 dark:bg-green-800/30">
                                      <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                                    </div>
                                  ) : isActive ? (
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20">
                                      <Play className="h-4 w-4 text-primary" />
                                    </div>
                                  ) : (
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
                                      <Play className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                                    </div>
                                  )}
                                </div>
                                
                                <div className="min-w-0 flex-1">
                                  <p className={`truncate font-medium ${
                                    isActive ? 'text-primary' : ''
                                  }`}>
                                    {ep.title}
                                  </p>
                                  <p className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                    <span>{ep.duration}</span>
                                    {isCompleted && <span className="text-green-600 dark:text-green-400">تکمیل شده</span>}
                                  </p>
                                </div>
                              </div>
                              
                              {/* نوار پیشرفت */}
                              {episodeAccess && progressPercent > 0 && (
                                <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
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
          
          {/* دکمه‌های کنترل دسترسی (فقط برای نمایش) */}
          <div className="mt-6 space-y-2 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
            <h3 className="mb-3 font-bold">وضعیت دسترسی</h3>
            <button 
              className={`flex w-full items-center justify-between rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 ${isPremiumUser ? 'bg-amber-50 dark:bg-amber-900/10' : ''}`}
              onClick={togglePremiumStatus}
            >
              <span>عضویت ویژه</span>
              {isPremiumUser ? (
                <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-500">
                  فعال
                </span>
              ) : (
                <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-500">
                  غیرفعال
                </span>
              )}
            </button>
            
            <button 
              className={`flex w-full items-center justify-between rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 ${hasPurchasedCourse ? 'bg-green-50 dark:bg-green-900/10' : ''}`}
              onClick={togglePurchaseStatus}
            >
              <span>خرید دوره</span>
              {hasPurchasedCourse ? (
                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-500">
                  خریداری شده
                </span>
              ) : (
                <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-500">
                  خریداری نشده
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
} 