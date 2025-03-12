import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { courses } from '@/components/data/course';
import CourseEpisodePage from '@/components/course/CourseEpisodePage';





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
    <div >
      <Suspense>
        <CourseEpisodePage 
          course={course} 
          episode={targetEpisode} 
          chapter={targetChapter} 
        />
      </Suspense>
    </div>
  );
} 