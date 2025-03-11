'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, Lock, Play, Check, ChevronDown, ChevronUp, Clock, BookOpen, Award, ArrowLeft } from 'lucide-react';
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
  
  // مدیریت پیشرفت تماشای اپیزودها - با مقادیر ثابت به جای تصادفی
  const [watchedProgress, setWatchedProgress] = useState<Record<string, number>>(() => {
    // ساخت مقادیر ثابت برای نمایش (در پروژه واقعی از API دریافت می‌شود)
    const progress: Record<string, number> = {};
    if (course.chapters) {
      course.chapters.forEach(chapter => {
        chapter.episodes.forEach((ep, index) => {
          // ایجاد مقادیر ثابت بر اساس شماره ایندکس
          if (index % 4 === 0) progress[ep.id] = 100; // اپیزود کامل شده
          else if (index % 4 === 1) progress[ep.id] = 65; // پیشرفت متوسط
          else if (index % 4 === 2) progress[ep.id] = 25; // پیشرفت کم
          else progress[ep.id] = 0; // بدون پیشرفت
        });
      });
    }
    
    // اپیزود فعلی را به صورت ثابت تنظیم می‌کنیم
    if (!progress[episode.id]) {
      // اگر اپیزود فعلی قبلاً تنظیم نشده باشد، مقدار ثابت 40% می‌گذاریم
      progress[episode.id] = 40;
    }
    
    return progress;
  });
  
  // لیست اپیزودهایی که به طور کامل دیده شده‌اند
  const [completedEpisodes, setCompletedEpisodes] = useState<string[]>(() => {
    const completed: string[] = [];
    // اپیزودهایی که پیشرفت 95% یا بیشتر دارند را به عنوان تکمیل شده علامت‌گذاری می‌کنیم
    Object.entries(watchedProgress).forEach(([episodeId, progress]) => {
      if (progress >= 95) {
        completed.push(episodeId);
      }
    });
    return completed;
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
  
  // محاسبه درصد تکمیل کل دوره
  const calculateCourseProgress = () => {
    let totalEpisodes = 0;
    let completedCount = 0;
    
    if (course.chapters) {
      course.chapters.forEach(ch => {
        totalEpisodes += ch.episodes.length;
        completedCount += ch.episodes.filter(ep => 
          completedEpisodes.includes(ep.id) || 
          (watchedProgress[ep.id] && watchedProgress[ep.id] >= 95)
        ).length;
      });
    }
    
    return totalEpisodes > 0 ? Math.round((completedCount / totalEpisodes) * 100) : 0;
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

  // محاسبه پیشرفت کل دوره
  const courseProgress = calculateCourseProgress();
  
  return (
    <>
      {/* پیام موفقیت */}
      {showSuccessMessage && (
        <div className="fixed bottom-4 left-4 right-4 z-50 animate-fade-in-up rounded-lg bg-green-100 p-4 text-center text-green-800 shadow-lg dark:bg-green-900/30 dark:text-green-400 md:left-auto md:right-4 md:w-80">
          {showSuccessMessage}
        </div>
      )}

      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        {/* هدر دوره */}
        <div className="bg-gradient-to-r from-primary/90 to-primary text-white">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-white/80 mb-2">
                  <Link href="/courses" className="hover:text-white flex items-center gap-1">
                    <ArrowLeft className="h-4 w-4" />
                    <span>دوره‌ها</span>
                  </Link>
                  <span>/</span>
                  <Link href={`/courses/${course.id}`} className="hover:text-white">{course.title}</Link>
                </div>
                <h1 className="text-xl md:text-2xl font-bold">{episode.title}</h1>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1 text-white/90">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{episode.duration}</span>
                  </div>
                  {episode.isFree && (
                    <span className="bg-green-500/20 text-white px-2 py-0.5 rounded-full text-xs">
                      رایگان
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm text-white/90">پیشرفت دوره:</span>
                  <span className="font-bold">{courseProgress}%</span>
                </div>
                <div className="w-full md:w-48 h-2 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white rounded-full"
                    style={{ width: `${courseProgress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* ستون اصلی - ویدیو و محتوا */}
            <div className="w-full lg:w-3/4 space-y-6">
              {/* ویدیو پلیر */}
              <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg">
                {hasAccess ? (
                  <CourseEpisodePlayer 
                    episode={episode} 
                    onProgressChange={handleVideoProgress}
                    initialProgress={watchedProgress[episode.id] || 0}
                  />
                ) : (
                  <div className="flex h-[250px] sm:h-[300px] md:h-[400px] flex-col items-center justify-center p-6 text-center">
                    <div className="mb-4 rounded-full bg-gray-800 p-4">
                      <Lock className="h-10 w-10 text-amber-500" />
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
              
              {/* کارت اطلاعات اپیزود */}
              {episode.description && (
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
                  <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    توضیحات این اپیزود
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {episode.description}
                  </p>
                </div>
              )}
              
              {/* تب‌های امکانات */}
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
                <EpisodeFeaturesTabs 
                  episodeId={episode.id} 
                  courseId={course.id}
                  currentTime={currentPlayerTime}
                />
              </div>
            </div>
            
            {/* ستون کناری - لیست اپیزودها */}
            <div className="w-full lg:w-1/4">
              <div className="sticky top-6">
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="font-bold text-lg flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      محتوای دوره
                    </h2>
                  </div>
                  
                  <div className="divide-y divide-gray-200 dark:divide-gray-800 max-h-[calc(100vh-200px)] overflow-y-auto">
                    {course.chapters && course.chapters.map(ch => {
                      const chapterProgress = calculateChapterProgress(ch);
                      return (
                        <div key={ch.id} className="border-b border-gray-200 last:border-b-0 dark:border-gray-800">
                          {/* سرفصل */}
                          <button
                            onClick={() => toggleChapter(ch.id)}
                            className="flex w-full items-center justify-between p-4 text-right hover:bg-gray-50 dark:hover:bg-gray-800/60"
                          >
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h3 className="font-bold">{ch.title}</h3>
                                <div className="flex items-center">
                                  {expandedChapters[ch.id] ? 
                                    <ChevronUp className="h-5 w-5" /> : 
                                    <ChevronDown className="h-5 w-5" />
                                  }
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                <span>{ch.episodes.length} قسمت</span>
                                <span>{chapterProgress}% تکمیل شده</span>
                              </div>
                              
                              {/* نوار پیشرفت فصل */}
                              <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                                <div 
                                  className="h-full rounded-full bg-primary"
                                  style={{ width: `${chapterProgress}%` }}
                                />
                              </div>
                            </div>
                          </button>
                          
                          {/* اپیزودهای فصل */}
                          {expandedChapters[ch.id] && (
                            <div className="border-t border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/30">
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
                                    className={`flex items-start gap-3 p-3 border-b border-gray-100 dark:border-gray-800/50 last:border-b-0 transition-colors ${
                                      isActive 
                                        ? 'bg-primary/5 dark:bg-primary/10' 
                                        : episodeAccess
                                          ? 'hover:bg-gray-100 dark:hover:bg-gray-800/60'
                                          : 'opacity-70'
                                    }`}
                                  >
                                    <div className="shrink-0 mt-0.5">
                                      {!episodeAccess ? (
                                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
                                          <Lock className="h-3 w-3 text-gray-500 dark:text-gray-400" />
                                        </div>
                                      ) : isCompleted ? (
                                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 dark:bg-green-800/30">
                                          <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                                        </div>
                                      ) : isActive ? (
                                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                                          <Play className="h-3 w-3 text-primary" />
                                        </div>
                                      ) : (
                                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
                                          <Play className="h-3 w-3 text-gray-700 dark:text-gray-300" />
                                        </div>
                                      )}
                                    </div>
                                    
                                    <div className="min-w-0 flex-1">
                                      <p className={`truncate font-medium text-sm ${
                                        isActive ? 'text-primary' : ''
                                      }`}>
                                        {ep.title}
                                      </p>
                                      
                                      <div className="flex items-center justify-between mt-1">
                                        <span className="text-xs text-gray-500 dark:text-gray-400">{ep.duration}</span>
                                        {isCompleted && (
                                          <span className="text-xs text-green-600 dark:text-green-400">تکمیل شده</span>
                                        )}
                                      </div>
                                      
                                      {/* نوار پیشرفت - با مقدار ثابت برای پیشگیری از خطای hydration */}
                                      {episodeAccess && progressPercent > 0 && !isCompleted && (
                                        <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                                          <div 
                                            className="h-full rounded-full bg-primary"
                                            style={{ width: `${progressPercent}%` }}
                                          />
                                        </div>
                                      )}
                                    </div>
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
                
                {/* دکمه‌های دسترسی */}
                {!hasAccess && (
                  <div className="mt-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 shadow-sm">
                    <div className="flex flex-col gap-2">
                      <button 
                        onClick={togglePurchaseStatus}
                        className="w-full rounded-md bg-primary px-4 py-2.5 text-white hover:bg-primary/90 transition-colors"
                      >
                        خرید دوره
                      </button>
                      {course.isFreePremium && (
                        <button 
                          onClick={togglePremiumStatus}
                          className="w-full rounded-md border border-amber-500 bg-transparent px-4 py-2.5 text-amber-500 hover:bg-amber-500/10 transition-colors"
                        >
                          فعال‌سازی عضویت ویژه
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 