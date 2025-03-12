import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { courses } from '@/components/data/course';
import CourseEpisodePage from '@/components/course/CourseEpisodePage';

// اسکلتون لودینگ برای صفحه اپیزود
function EpisodePageSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="mb-6">
        <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-1/3"></div>
      </div>
      
      <div className="mb-6">
        <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
      </div>
      
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Main content */}
        <div className="lg:col-span-3">
          <div className="aspect-video mb-6 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
          <div className="space-y-4">
            <div className="h-7 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6"></div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="h-96 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}

// Style override برای حذف تأثیر container از layout دوره‌ها
const containerOverride = {
  position: 'fixed' as const,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: '100vw',
  height: '100vh',
  maxWidth: 'none',
  padding: 0,
  margin: 0,
  overflow: 'hidden' as const,
  zIndex: 50,
  backgroundColor: '#000'
};

interface EpisodePageProps {
  params: {
    id: string;
    episodeId: string;
  };
}

// Generate static params for all episodes
export async function generateStaticParams() {
  const params = [];
  
  for (const course of courses) {
    if (course.chapters) {
      for (const chapter of course.chapters) {
        for (const episode of chapter.episodes) {
          params.push({
            id: course.id,
            episodeId: episode.id
          });
        }
      }
    }
  }
  
  return params;
}

// Set dynamic mode to force-static for static export
export const dynamic = 'force-static';
export const revalidate = 3600; // Cache for 1 hour
export const preferredRegion = 'auto'; // Performance optimization

// Add metadata for the episode page
export function generateMetadata({ params }: EpisodePageProps) {
  const courseId = params.id;
  const episodeId = params.episodeId;
  
  const course = courses.find(course => course.id === courseId);
  if (!course) return { title: 'اپیزود یافت نشد' };
  
  let episodeTitle = 'اپیزود';
  if (course.chapters) {
    for (const chapter of course.chapters) {
      const episode = chapter.episodes.find(ep => ep.id === episodeId);
      if (episode) {
        episodeTitle = episode.title;
        break;
      }
    }
  }
  
  return {
    title: `${episodeTitle} | ${course.title}`,
    description: `تماشای اپیزود ${episodeTitle} از دوره ${course.title}`
  };
}

export default async function EpisodePage({ params }: EpisodePageProps) {
  // Access params directly
  const courseId = params.id;
  const episodeId = params.episodeId;
  
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
    <div style={containerOverride}>
      <Suspense fallback={<EpisodePageSkeleton />}>
        <CourseEpisodePage 
          course={course} 
          episode={targetEpisode} 
          chapter={targetChapter} 
        />
      </Suspense>
    </div>
  );
} 