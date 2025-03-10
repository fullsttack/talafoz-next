import { notFound } from 'next/navigation';
import { use } from 'react';

import { courses } from '@/components/data/course';
import CourseEpisodePage from '@/components/course/CourseEpisodePage';

interface EpisodePageProps {
  params: {
    id: string;
    episodeId: string;
  };
}

export default function EpisodePage({ params }: EpisodePageProps) {
  // استفاده از React.use برای دسترسی به پارامترها
  const courseId = use(params).id;
  const episodeId = use(params).episodeId;
  
  // پیدا کردن دوره بر اساس ID
  const course = courses.find(course => course.id === courseId);
  
  // اگر دوره پیدا نشد، صفحه 404 نمایش داده می‌شود
  if (!course) {
    notFound();
  }
  
  // پیدا کردن اپیزود و فصل مربوطه
  let targetEpisode = null;
  let targetChapter = null;
  
  if (course.chapters && course.chapters.length > 0) {
    for (const chapter of course.chapters) {
      const episode = chapter.episodes.find(ep => ep.id === episodeId);
      if (episode) {
        targetEpisode = episode;
        targetChapter = chapter;
        break;
      }
    }
  }
  
  // اگر اپیزود پیدا نشد، صفحه 404 نمایش داده می‌شود
  if (!targetEpisode || !targetChapter) {
    notFound();
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* مسیر ناوبری و محتوای اصلی توسط کامپوننت کلاینت مدیریت می‌شود */}
      <CourseEpisodePage 
        course={course} 
        episode={targetEpisode} 
        chapter={targetChapter} 
      />
    </div>
  );
} 