'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Lock, Play, AlertTriangle } from 'lucide-react';
import { Course, Episode, Chapter } from '@/components/data/course';
import CourseEpisodePlayer from '@/components/course/CourseEpisodePlayer';

interface CourseEpisodePageProps {
  course: Course;
  episode: Episode;
  chapter: Chapter;
}

export default function CourseEpisodePage({ course, episode, chapter }: CourseEpisodePageProps) {
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const [hasPurchasedCourse, setHasPurchasedCourse] = useState(false);
  
  // بررسی دسترسی کاربر به اپیزود
  const hasAccess = 
    episode.isFree || // اپیزود رایگان است
    hasPurchasedCourse || // کاربر دوره را خریده است
    (isPremiumUser && course.isFreePremium); // کاربر اشتراک ویژه دارد و دوره برای اعضای ویژه رایگان است
  
  return (
    <>
      {/* اطلاعات اپیزود و فصل */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">{episode.title}</h1>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <span>از فصل: {chapter.title}</span>
          <span>•</span>
          <span>مدت زمان: {episode.duration}</span>
        </div>
      </div>
      
      {/* محتوای اصلی */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* ستون اصلی - پخش‌کننده و توضیحات */}
        <div className="lg:col-span-2">
          {/* پخش‌کننده ویدیو */}
          <div className="mb-8 overflow-hidden rounded-xl bg-gray-900">
            {hasAccess ? (
              <CourseEpisodePlayer episode={episode} />
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
                  <Link 
                    href={`/courses/${course.id}`}
                    className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90"
                  >
                    خرید دوره
                  </Link>
                  <Link 
                    href="/membership"
                    className="rounded-md border border-amber-500 bg-transparent px-4 py-2 text-amber-500 hover:bg-amber-500/10"
                  >
                    عضویت ویژه
                  </Link>
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
              {course.chapters && course.chapters.map(chapter => (
                <div key={chapter.id} className="p-4">
                  <h3 className="mb-3 font-bold">{chapter.title}</h3>
                  <div className="space-y-2">
                    {chapter.episodes.map(ep => {
                      // بررسی دسترسی به هر اپیزود
                      const episodeAccess = 
                        ep.isFree || 
                        hasPurchasedCourse || 
                        (isPremiumUser && course.isFreePremium);
                      
                      // آیا اپیزود فعلی است؟
                      const isActive = ep.id === episode.id;
                      
                      return (
                        <Link
                          href={`/courses/${course.id}/episodes/${ep.id}`}
                          key={ep.id}
                          className={`flex items-center gap-3 rounded-lg p-2 transition-colors ${
                            isActive 
                              ? 'bg-primary/10 text-primary' 
                              : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                          }`}
                        >
                          <div className="shrink-0">
                            {episodeAccess ? (
                              <div className={`flex h-9 w-9 items-center justify-center rounded-full ${
                                isActive ? 'bg-primary/20' : 'bg-gray-200 dark:bg-gray-700'
                              }`}>
                                <Play className={`h-4 w-4 ${
                                  isActive ? 'text-primary' : 'text-gray-700 dark:text-gray-300'
                                }`} />
                              </div>
                            ) : (
                              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
                                <Lock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                              </div>
                            )}
                          </div>
                          
                          <div className="min-w-0 flex-1">
                            <p className={`truncate font-medium ${
                              isActive ? 'text-primary' : ''
                            }`}>
                              {ep.title}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {ep.duration}
                              {ep.isFree && <span className="mr-2 text-green-600">• رایگان</span>}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* دکمه‌های کنترل دسترسی (فقط برای نمایش) */}
          <div className="mt-6 space-y-2 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
            <h3 className="mb-3 font-bold">تغییر وضعیت برای تست</h3>
            <button 
              className={`flex w-full items-center justify-between rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 ${isPremiumUser ? 'bg-amber-50 dark:bg-amber-900/10' : ''}`}
              onClick={() => setIsPremiumUser(prev => !prev)}
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
              onClick={() => setHasPurchasedCourse(prev => !prev)}
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