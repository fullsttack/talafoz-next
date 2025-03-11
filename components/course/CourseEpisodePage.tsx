'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, Lock, Play, Check, ChevronDown, ChevronUp, Clock, BookOpen, Award, ArrowLeft, FileText, Paperclip, MessageSquare, PenLine, ChevronRight } from 'lucide-react';
import { Course, Episode, Chapter } from '@/components/data/course';
import CourseEpisodePlayer from '@/components/course/CourseEpisodePlayer';
import EpisodeFeaturesTabs from '@/components/episode/EpisodeFeaturesTabs';
import EpisodeNotes from '@/components/episode/EpisodeNotes';
import EpisodeAssignments from '@/components/episode/EpisodeAssignments';
import EpisodeAttachments from '@/components/episode/EpisodeAttachments';
import EpisodeComments from '@/components/episode/EpisodeComments';
import { useRouter } from 'next/navigation';

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
  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<'chapters' | 'notes' | 'assignments' | 'attachments' | 'comments'>('chapters');
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);
  const [completionTimerProgress, setCompletionTimerProgress] = useState(0);
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const [showEarnedPoints, setShowEarnedPoints] = useState(false);
  
  const router = useRouter();
  const completionTimerRef = useRef<NodeJS.Timeout | null>(null);
  
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
    Object.entries(watchedProgress).forEach(([epId, progress]) => {
      if (progress >= 95) {
        completed.push(epId);
      }
    });
    return completed;
  });
  
  // توسعه/بستن فصل‌ها
  const toggleChapter = (chapterId: string) => {
    setExpandedChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }));
  };
  
  // مدیریت پیشرفت ویدیو
  const handleVideoProgress = (progressPercent: number, currentTime?: number) => {
    setWatchedProgress(prev => ({
      ...prev,
      [episode.id]: progressPercent
    }));
    
    // ذخیره موقعیت فعلی ویدیو
    if (currentTime !== undefined) {
      setCurrentPlayerTime(currentTime);
    }
    
    // تغییر وضعیت تکمیل اپیزود
    if (progressPercent >= 95) {
      setCompletedEpisodes(prev => {
        if (!prev.includes(episode.id)) {
          return [...prev, episode.id];
        }
        return prev;
      });
      
      // نمایش دیالوگ اتمام ویدیو (فقط اگر ویدیو به پایان رسیده باشد)
      if (progressPercent >= 99.5 && !isVideoEnded) {
        setIsVideoEnded(true);
        setShowCompletionDialog(true);
        startCompletionTimer();
      }
    }
  };
  
  // شروع تایمر برای رفتن به قسمت بعدی
  const startCompletionTimer = () => {
    // پاکسازی تایمر قبلی
    if (completionTimerRef.current) {
      clearInterval(completionTimerRef.current);
    }
    
    setCompletionTimerProgress(0);
    // نمایش امتیاز با تاخیر برای ایجاد افکت
    setTimeout(() => {
      setShowEarnedPoints(true);
    }, 1000);
    
    const startTime = Date.now();
    const duration = 10000; // 10 ثانیه
    
    completionTimerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / duration) * 100, 100);
      setCompletionTimerProgress(progress);
      
      if (progress >= 100) {
        clearInterval(completionTimerRef.current!);
        navigateToNextEpisode();
      }
    }, 50);
  };
  
  // لغو تایمر انتقال به قسمت بعد
  const cancelCompletionTimer = () => {
    if (completionTimerRef.current) {
      clearInterval(completionTimerRef.current);
      completionTimerRef.current = null;
    }
    setShowCompletionDialog(false);
    setShowEarnedPoints(false);
  };
  
  // پیدا کردن و انتقال به قسمت بعدی
  const navigateToNextEpisode = () => {
    const currentEpisodeIndex = chapter.episodes.findIndex(ep => ep.id === episode.id);
    
    // اگر اپیزود بعدی در این فصل وجود داشت
    if (currentEpisodeIndex < chapter.episodes.length - 1) {
      const nextEpisode = chapter.episodes[currentEpisodeIndex + 1];
      router.push(`/courses/${course.id}/episodes/${nextEpisode.id}`);
      return;
    }
    
    // اگر فصل بعدی وجود داشت
    const currentChapterIndex = course.chapters.findIndex(ch => ch.id === chapter.id);
    if (currentChapterIndex < course.chapters.length - 1) {
      const nextChapter = course.chapters[currentChapterIndex + 1];
      if (nextChapter.episodes && nextChapter.episodes.length > 0) {
        router.push(`/courses/${course.id}/episodes/${nextChapter.episodes[0].id}`);
        return;
      }
    }
    
    // اگر اپیزود بعدی وجود نداشت
    setShowSuccessMessage("شما به پایان دوره رسیدید!");
    setShowCompletionDialog(false);
  };
  
  // پاکسازی تایمر هنگام خروج از کامپوننت
  useEffect(() => {
    return () => {
      if (completionTimerRef.current) {
        clearInterval(completionTimerRef.current);
      }
    };
  }, []);
  
  // محاسبه پیشرفت فصل
  const calculateChapterProgress = (ch: Chapter) => {
    if (!ch.episodes || ch.episodes.length === 0) return 0;
    
    let totalProgress = 0;
    ch.episodes.forEach(ep => {
      // اپیزودهای تکمیل شده 100%، بقیه بر اساس پیشرفت
      if (completedEpisodes.includes(ep.id)) {
        totalProgress += 100;
      } else {
        totalProgress += watchedProgress[ep.id] || 0;
      }
    });
    
    return Math.round(totalProgress / ch.episodes.length);
  };
  
  // محاسبه پیشرفت کل دوره
  const calculateCourseProgress = () => {
    if (!course.chapters || course.chapters.length === 0) return 0;
    
    let totalEpisodes = 0;
    let totalProgress = 0;
    
    course.chapters.forEach(ch => {
      if (ch.episodes && ch.episodes.length > 0) {
        ch.episodes.forEach(ep => {
          totalEpisodes++;
          // اپیزودهای تکمیل شده 100%، بقیه بر اساس پیشرفت
          if (completedEpisodes.includes(ep.id)) {
            totalProgress += 100;
          } else {
            totalProgress += watchedProgress[ep.id] || 0;
          }
        });
      }
    });
    
    return totalEpisodes > 0 ? Math.round(totalProgress / totalEpisodes) : 0;
  };
  
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
  
  // بررسی دسترسی کاربر به محتوا
  const hasAccess = episode.isFree || hasPurchasedCourse || (isPremiumUser && course.isFreePremium);
  
  // نمایش فصل فعلی به صورت باز
  useEffect(() => {
    if (chapter) {
      setExpandedChapters(prev => ({
        ...prev,
        [chapter.id]: true
      }));
    }
  }, [chapter]);
  
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
  
  // آرایه تب‌ها برای نمایش در ساید‌بار
  const tabs = [
    { id: 'chapters', label: 'فصل‌ها', icon: <BookOpen className="h-5 w-5" /> },
    { id: 'notes', label: 'یادداشت‌ها', icon: <PenLine className="h-5 w-5" /> },
    { id: 'assignments', label: 'تمرین‌ها', icon: <FileText className="h-5 w-5" /> },
    { id: 'attachments', label: 'ضمیمه', icon: <Paperclip className="h-5 w-5" /> },
    { id: 'comments', label: 'نظرات', icon: <MessageSquare className="h-5 w-5" /> },
  ];

  return (
    <>
      {/* پیام موفقیت */}
      {showSuccessMessage && (
        <div className="fixed bottom-4 left-4 right-4 z-50 animate-fade-in-up rounded-lg bg-green-100 p-4 text-center text-green-800 shadow-lg dark:bg-green-900/30 dark:text-green-400 md:left-auto md:right-4 md:w-80">
          {showSuccessMessage}
        </div>
      )}

      {/* لینک بازگشت به صفحه دوره در موبایل */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Link
          href={`/courses/${course.id}`}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-black/30"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
      </div>

      <div className="h-screen w-full flex overflow-hidden bg-gray-900">
        {/* بخش ویدیو پلیر - سمت راست */}
        <div className="flex-1 h-full overflow-hidden flex flex-col">
          {/* هدر کوچک در بالای ویدیو پلیر - فقط در نمایش دسکتاپ */}
          <div className="hidden md:flex items-center justify-between py-2 px-4 bg-gray-900 border-b border-gray-700 text-white">
            {/* بخش سمت راست - بازگشت، عنوان و اطلاعات اپیزود */}
            <div className="flex items-center gap-3">
              <Link 
                href={`/courses/${course.id}`} 
                className="flex items-center gap-2 text-white bg-green-600 hover:bg-green-700 px-3 py-1.5 rounded-lg transition-all shadow-sm"
                title="بازگشت به صفحه دوره"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm font-medium">بازگشت به دوره</span>
              </Link>
              
              <div className="h-4 w-px bg-gray-700"></div>
              
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-medium line-clamp-1 text-white max-w-[300px]">{episode.title}</h2>
                <div className="flex items-center text-gray-400 gap-1 text-xs">
                  <Clock className="h-3 w-3" />
                  <span>{episode.duration || '۲۵:۳۰'}</span>
                </div>
              </div>
              
              <div className="hidden lg:flex items-center gap-2 text-xs text-gray-400">
                <div className="h-4 w-px bg-gray-700 mx-1"></div>
                <span>فصل {chapter.index}</span>
                <span>•</span>
                <span>قسمت {episode.index}/{chapter.episodes.length}</span>
              </div>
            </div>
            
            {/* بخش سمت چپ - وضعیت دسترسی و پیشرفت */}
            <div className="flex items-center gap-4">
              {/* پیشرفت اپیزود فعلی - طرح ساده و گویا */}
              <div 
                className="flex items-center gap-2 px-2 py-1 bg-gray-800/50 rounded-lg border border-gray-700" 
                title="پیشرفت پخش اپیزود فعلی"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-green-500">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${watchedProgress[episode.id] || 0}%` }}
                  />
                </div>
                <span className="text-xs text-green-400">{Math.round(watchedProgress[episode.id] || 0)}%</span>
              </div>
              
              {/* وضعیت دسترسی */}
              {hasAccess ? (
                <div className="flex items-center justify-center h-8 w-8 text-green-400 rounded-full" title="دسترسی فعال">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
              ) : (
                <Link 
                  href={`/courses/${course.id}/checkout`}
                  className="flex items-center justify-center h-8 w-8 text-amber-400 rounded-full hover:bg-gray-800/70 transition-colors"
                  title="قفل شده - خرید دوره"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 9.9-1" />
                  </svg>
                </Link>
              )}
            </div>
          </div>
          
          {/* ویدیو پلیر */}
          <div className="flex-1 flex bg-black overflow-hidden relative">
            {hasAccess ? (
              <>
                <CourseEpisodePlayer 
                  episode={episode} 
                  onProgressChange={handleVideoProgress}
                  initialProgress={watchedProgress[episode.id] || 0}
                />
                
                {/* دیالوگ اتمام ویدیو */}
                {showCompletionDialog && (
                  <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-30 backdrop-blur-sm">
                    <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-2xl max-w-md text-center shadow-2xl border border-gray-700 animate-fade-in relative overflow-hidden">
                      {/* خط تزئینی بالا */}
                      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-green-400 via-green-500 to-green-400"></div>
                      
                      {/* ایکون دایره ای */}
                      <div className="relative mx-auto">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-green-600 animate-pulse opacity-30 w-28 h-28 mx-auto"></div>
                        <div className="w-28 h-28 mx-auto mb-6 relative">
                          <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 100 100">
                            <circle 
                              cx="50" cy="50" r="45" 
                              className="stroke-gray-700 fill-none" 
                              strokeWidth="8"
                            />
                            <circle 
                              cx="50" cy="50" r="45" 
                              className="stroke-green-500 fill-none" 
                              strokeWidth="8"
                              strokeDasharray="283"
                              strokeDashoffset={283 - (283 * completionTimerProgress / 100)}
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-3xl font-bold text-white">{Math.ceil(10 - (completionTimerProgress / 10))}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center gap-2 mb-5">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center">
                          <Check className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">تبریک!</h3>
                      </div>
                      
                      <p className="text-gray-200 mb-5 text-lg">شما با موفقیت این قسمت را به پایان رساندید.</p>
                      
                      {/* نمایش امتیاز */}
                      <div className={`mb-6 transform transition-all duration-700 ${showEarnedPoints ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'}`}>
                        <div className="relative py-6">
                          {/* خطوط تزئینی */}
                          <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent"></div>
                          
                          {/* کارت امتیاز */}
                          <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 border border-green-500/30 shadow-[0_0_15px_rgba(74,222,128,0.15)] overflow-hidden">
                            {/* افکت نور */}
                            <div className="absolute -top-10 -right-10 w-20 h-20 bg-green-500/20 blur-2xl rounded-full"></div>
                            <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-green-500/20 blur-2xl rounded-full"></div>
                            
                            {/* محتوای اصلی */}
                            <div className="flex items-center gap-5">
                              {/* دایره امتیاز */}
                              <div className="relative flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-b from-green-500/20 to-green-600/10 flex items-center justify-center border border-green-500/50 shadow-[0_0_10px_rgba(74,222,128,0.3)]">
                                <span className="text-2xl font-bold text-white">+۱۰</span>
                                <div className="absolute inset-0 rounded-full border border-green-400/20 animate-ping"></div>
                              </div>
                              
                              {/* متن امتیاز */}
                              <div className="flex-1 text-right">
                                <div className="flex items-center gap-2 mb-1">
                                  <div className="flex space-x-1 rtl:space-x-reverse">
                                    {[0, 1, 2, 3, 4].map((star) => (
                                      <svg key={star} className="w-4 h-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                      </svg>
                                    ))}
                                  </div>
                                  <h4 className="text-xl font-bold text-green-400">امتیاز دریافت شد!</h4>
                                </div>
                                <p className="text-sm text-gray-300">تبریک! با تکمیل این درس <span className="text-green-400 font-bold">۱۰ امتیاز</span> به مجموع امتیازات شما اضافه شد.</p>
                              </div>
                            </div>
                            
                            {/* نوار پیشرفت کلی */}
                            <div className="mt-4 pt-3 border-t border-gray-700">
                              <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                                <span>پیشرفت امتیازات شما</span>
                                <span className="text-green-400">۱۲۰ / ۵۰۰</span>
                              </div>
                              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full w-[24%]"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                          onClick={navigateToNextEpisode}
                          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-lg hover:shadow-xl font-medium"
                        >
                          <span>رفتن به قسمت بعدی</span>
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={cancelCompletionTimer}
                          className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-lg transition-colors border border-gray-600 hover:border-gray-500"
                        >
                          ادامه همین قسمت
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
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
        
        {/* سایدبار - سمت چپ */}
        <div className="w-full md:w-[380px] lg:w-[400px] xl:w-[450px] h-screen flex flex-col bg-gray-800 border-r border-gray-700 overflow-hidden">
          {/* نام دوره و عنوان اپیزود در موبایل */}
          <div className="md:hidden p-4 border-b border-gray-700 bg-gray-800 text-white">
            <h2 className="font-bold text-lg mb-1">{course.title}</h2>
            <h3 className="text-sm text-gray-300">{episode.title}</h3>
          </div>
          
          {/* تب‌های سایدبار */}
          <div className="bg-gray-900/40 border-b border-gray-700">
            <div className="flex justify-between overflow-x-auto px-0.5 pt-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex flex-1 flex-col items-center gap-1 px-1.5 py-2 text-sm font-medium transition-all rounded-t-lg relative ${
                    activeTab === tab.id
                      ? 'bg-gray-800 text-green-400 shadow-sm'
                      : 'text-gray-400 hover:bg-gray-700/40 hover:text-gray-200'
                  }`}
                >
                  <div className={`${activeTab === tab.id ? 'text-green-400' : 'text-gray-400'}`}>
                    {tab.icon}
                  </div>
                  <span className="text-xs font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* محتوای تب‌ها */}
          <div className="flex-1 overflow-y-auto py-5 px-4 bg-gray-800">
            {/* تب فصل‌ها */}
            {activeTab === 'chapters' && (
              <div className="divide-y divide-gray-700">
                {course.chapters && course.chapters.map(ch => {
                  const chapterProgress = calculateChapterProgress(ch);
                  return (
                    <div key={ch.id} className="border-b border-gray-700 last:border-b-0">
                      {/* سرفصل */}
                      <button
                        onClick={() => toggleChapter(ch.id)}
                        className="flex w-full items-center justify-between p-4 text-right hover:bg-gray-700/60"
                      >
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-bold text-white">{ch.title}</h3>
                            <div className="flex items-center">
                              {expandedChapters[ch.id] ? 
                                <ChevronUp className="h-5 w-5 text-gray-400" /> : 
                                <ChevronDown className="h-5 w-5 text-gray-400" />
                              }
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between text-xs text-gray-400">
                            <span>{ch.episodes.length} قسمت</span>
                            <span>{chapterProgress}% تکمیل شده</span>
                          </div>
                          
                          {/* نوار پیشرفت فصل */}
                          <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-gray-700">
                            <div 
                              className="h-full rounded-full bg-primary"
                              style={{ width: `${chapterProgress}%` }}
                            />
                          </div>
                        </div>
                      </button>
                      
                      {/* اپیزودهای فصل */}
                      {expandedChapters[ch.id] && (
                        <div className="border-t border-gray-700 bg-gray-800/50">
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
                                className={`flex items-start gap-3 p-3 border-b border-gray-700 last:border-b-0 transition-colors ${
                                  isActive 
                                    ? 'bg-primary/20' 
                                    : episodeAccess
                                      ? 'hover:bg-gray-700/40'
                                      : 'opacity-70'
                                }`}
                              >
                                <div className="shrink-0 mt-0.5">
                                  {!episodeAccess ? (
                                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-700">
                                      <Lock className="h-4 w-4 text-amber-400" />
                                    </div>
                                  ) : isCompleted ? (
                                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-800/30">
                                      <Check className="h-4 w-4 text-green-400" />
                                    </div>
                                  ) : isActive ? (
                                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/30">
                                      <Play className="h-4 w-4 text-primary" />
                                    </div>
                                  ) : (
                                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-700">
                                      <Play className="h-4 w-4 text-gray-300" />
                                    </div>
                                  )}
                                </div>
                                
                                <div className="min-w-0 flex-1">
                                  <p className={`truncate font-medium text-sm ${
                                    isActive ? 'text-primary' : 'text-gray-200'
                                  }`}>
                                    {ep.title}
                                  </p>
                                  
                                  <div className="flex items-center justify-between mt-1">
                                    <span className="text-xs text-gray-400">{ep.duration}</span>
                                    {isCompleted && (
                                      <span className="text-xs text-green-400">تکمیل شده</span>
                                    )}
                                  </div>
                                  
                                  {/* نوار پیشرفت */}
                                  {episodeAccess && progressPercent > 0 && !isCompleted && (
                                    <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-gray-700">
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
            )}
            
            {/* تب یادداشت‌ها */}
            {activeTab === 'notes' && hasAccess && (
              <div className="p-3 bg-gray-900/60 rounded-lg">
                <EpisodeNotes 
                  episodeId={episode.id} 
                  courseId={course.id} 
                  currentTime={currentPlayerTime} 
                />
              </div>
            )}
            
            {/* تب تمرین‌ها */}
            {activeTab === 'assignments' && hasAccess && (
              <div className="p-3 bg-gray-900/60 rounded-lg">
                <EpisodeAssignments 
                  episodeId={episode.id} 
                  courseId={course.id} 
                />
              </div>
            )}
            
            {/* تب فایل‌های ضمیمه */}
            {activeTab === 'attachments' && hasAccess && (
              <div className="p-3 bg-gray-900/60 rounded-lg">
                <EpisodeAttachments 
                  episodeId={episode.id} 
                  courseId={course.id} 
                />
              </div>
            )}
            
            {/* تب نظرات */}
            {activeTab === 'comments' && hasAccess && (
              <div className="p-3 bg-gray-900/60 rounded-lg">
                <EpisodeComments 
                  episodeId={episode.id} 
                  courseId={course.id} 
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
} 