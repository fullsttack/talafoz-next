'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronDown, Lock, Play, CheckCircle } from 'lucide-react';
import { Chapter, Episode } from '@/components/data/course';

interface CourseChaptersProps {
  chapters: Chapter[];
  isPremiumUser?: boolean;
  hasPurchasedCourse?: boolean;
  activeEpisode?: string;
  onSelectEpisode?: (episodeId: string) => void;
  courseId?: string;
  useLinks?: boolean;
}

export default function CourseChapters({ 
  chapters = [],
  isPremiumUser = false,
  hasPurchasedCourse = false,
  activeEpisode,
  onSelectEpisode,
  courseId,
  useLinks = false
}: CourseChaptersProps) {
  const router = useRouter();
  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>(
    // همه فصل‌ها به صورت پیش‌فرض بسته هستند (به جز فصل اول که باز است)
    chapters.reduce((acc, chapter, index) => {
      acc[chapter.id] = index === 0; // فقط فصل اول باز باشد
      return acc;
    }, {} as Record<string, boolean>)
  );
  
  // محاسبه کل مدت زمان دوره
  const calculateTotalDuration = () => {
    let totalMinutes = 0;
    
    chapters.forEach(chapter => {
      chapter.episodes.forEach(episode => {
        const durationParts = episode.duration.split(':');
        if (durationParts.length === 2) {
          const [minutes, seconds] = durationParts;
          totalMinutes += parseInt(minutes) + parseInt(seconds) / 60;
        } else if (durationParts.length === 3) {
          const [hours, minutes, seconds] = durationParts;
          totalMinutes += parseInt(hours) * 60 + parseInt(minutes) + parseInt(seconds) / 60;
        }
      });
    });
    
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.floor(totalMinutes % 60);
    
    return `${hours} ساعت و ${minutes} دقیقه`;
  };
  
  // باز/بسته کردن فصل
  const toggleChapter = (chapterId: string) => {
    setExpandedChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }));
  };
  
  // بررسی آیا قسمت قابل مشاهده است یا خیر
  const isEpisodeAccessible = (episode: Episode) => {
    return episode.isFree || hasPurchasedCourse || isPremiumUser;
  };
  
  // آیا اپیزود فقط قابل مشاهده در همین صفحه است (رایگان)
  const isInlineViewableEpisode = (episode: Episode) => {
    return episode.isFree;
  };
  
  // آیا اپیزود نیاز به رفتن به صفحه جداگانه دارد (خریداری شده)
  const needsNavigationToEpisode = (episode: Episode) => {
    return !episode.isFree && (hasPurchasedCourse || isPremiumUser);
  };
  
  // کلیک روی قسمت
  const handleEpisodeClick = (episode: Episode) => {
    if (!isEpisodeAccessible(episode)) return;
    
    if (isInlineViewableEpisode(episode)) {
      // اپیزود رایگان - پخش در همین صفحه
      onSelectEpisode?.(episode.id);
    } else if (needsNavigationToEpisode(episode)) {
      // اپیزود خریداری شده - رفتن به صفحه اپیزود
      if (useLinks && courseId) {
        router.push(`/courses/${courseId}/episodes/${episode.id}`);
      }
    }
  };
  
  // رندر هر قسمت
  const renderEpisode = (episode: Episode, episodeIndex: number) => {
    const isAccessible = isEpisodeAccessible(episode);
    const isActive = activeEpisode === episode.id;
    const isInlinePlayable = isInlineViewableEpisode(episode);
    const isNavigable = needsNavigationToEpisode(episode);
    
    const episodeContent = (
      <>
        <div className="flex flex-1 items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
            {!isAccessible ? (
              <Lock className="h-4 w-4 text-gray-400" />
            ) : isActive ? (
              <CheckCircle className="h-4 w-4 text-primary" />
            ) : (
              <Play className="h-4 w-4 text-gray-700 dark:text-gray-300" />
            )}
          </div>
          
          <div className="flex-1">
            <h4 className={`text-sm font-medium group-hover:text-primary ${isActive ? 'text-primary' : ''}`}>
              {episodeIndex + 1}. {episode.title}
            </h4>
            {episode.description && (
              <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{episode.description}</p>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {episode.isFree && (
            <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
              رایگان
            </span>
          )}
          <span className="text-xs text-gray-500 dark:text-gray-400">{episode.duration}</span>
        </div>
      </>
    );
    
    // تعیین کلاس‌های CSS مناسب
    const className = `group flex items-center justify-between border-b border-gray-100 px-6 py-3 last:border-b-0 dark:border-gray-800 ${
      !isAccessible ? 'cursor-not-allowed bg-gray-50 opacity-70 dark:bg-gray-800/10' :
      isActive ? 'bg-primary/5 dark:bg-primary/10' : 'hover:bg-gray-100 dark:hover:bg-gray-800/20'
    }`;
    
    // شرط اینکه از لینک استفاده کنیم یا از onClick
    if (isNavigable && useLinks && courseId) {
      return (
        <Link 
          href={`/courses/${courseId}/episodes/${episode.id}`}
          key={episode.id}
          className={className}
        >
          {episodeContent}
        </Link>
      );
    }
    
    return (
      <div 
        key={episode.id}
        onClick={() => handleEpisodeClick(episode)}
        className={`${className} ${isInlinePlayable || isNavigable ? 'cursor-pointer' : ''}`}
      >
        {episodeContent}
      </div>
    );
  };
  
  if (chapters.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-6 text-center dark:border-gray-800 dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-400">فصل‌های این دوره هنوز آماده نشده‌اند.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-bold">فهرست دوره</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {chapters.length} فصل • {chapters.reduce((acc, chapter) => acc + chapter.episodes.length, 0)} قسمت • {calculateTotalDuration()}
          </p>
        </div>
        
        {/* دکمه باز/بسته کردن همه فصل‌ها */}
        <button
          onClick={() => {
            const allExpanded = Object.values(expandedChapters).every(expanded => expanded);
            const newValue = !allExpanded;
            
            const newExpandedChapters: Record<string, boolean> = {};
            chapters.forEach(chapter => {
              newExpandedChapters[chapter.id] = newValue;
            });
            
            setExpandedChapters(newExpandedChapters);
          }}
          className="rounded-full border border-gray-300 px-4 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          {Object.values(expandedChapters).every(expanded => expanded) ? 'بستن همه فصل‌ها' : 'باز کردن همه فصل‌ها'}
        </button>
      </div>
      
      {/* لیست فصل‌ها */}
      <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        {chapters.map((chapter, chapterIndex) => (
          <div key={chapter.id} className="border-b border-gray-200 last:border-b-0 dark:border-gray-800">
            {/* سر فصل */}
            <button
              onClick={() => toggleChapter(chapter.id)}
              className="flex w-full cursor-pointer items-center justify-between p-4 text-right hover:bg-gray-50 dark:hover:bg-gray-800/60"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                  {chapterIndex + 1}
                </span>
                <h3 className="font-medium">{chapter.title}</h3>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {chapter.episodes.length} قسمت
                </span>
              </div>
              <ChevronDown className={`h-5 w-5 transition-transform ${expandedChapters[chapter.id] ? 'rotate-180' : ''}`} />
            </button>
            
            {/* قسمت‌های فصل */}
            {expandedChapters[chapter.id] && (
              <div className="border-t border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/40">
                {chapter.episodes.map((episode, episodeIndex) => 
                  renderEpisode(episode, episodeIndex)
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 