'use client';

import { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward } from 'lucide-react';
import { Course, Episode, Chapter } from '@/components/data/course';

interface CoursePlayerProps {
  course: Course;
  activeEpisodeId?: string;
}

export default function CoursePlayer({ course, activeEpisodeId }: CoursePlayerProps) {
  const [videoUrl, setVideoUrl] = useState('');
  const [activeEpisode, setActiveEpisode] = useState<Episode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  
  // دریافت قسمت فعال بر اساس ID
  useEffect(() => {
    if (!course.chapters || course.chapters.length === 0) {
      // برای دوره‌های بدون فصل یا ویدیو، یک URL پیش‌فرض نمایش داده می‌شود
      setVideoUrl('https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4');
      setActiveEpisode({
        id: 'demo',
        title: 'پیش‌نمایش دوره',
        duration: '۱۰:۰۰',
        isFree: true,
        description: 'این ویدیو پیش‌نمایش دوره است. به زودی محتوای دوره بارگذاری خواهد شد.'
      });
      return;
    }
    
    // پیدا کردن قسمت فعال
    let episode: Episode | null = null;
    
    if (activeEpisodeId) {
      // جستجو بر اساس ID
      for (const chapter of course.chapters) {
        const found = chapter.episodes.find(ep => ep.id === activeEpisodeId);
        if (found) {
          episode = found;
          break;
        }
      }
    } else {
      // پیش‌فرض: اولین قسمت رایگان
      for (const chapter of course.chapters) {
        const freeEpisode = chapter.episodes.find(ep => ep.isFree);
        if (freeEpisode) {
          episode = freeEpisode;
          break;
        }
      }
      
      // اگر قسمت رایگان پیدا نشد، اولین قسمت را انتخاب کن
      if (!episode && course.chapters[0]?.episodes[0]) {
        episode = course.chapters[0].episodes[0];
      }
    }
    
    if (episode) {
      setActiveEpisode(episode);
      // در یک پروژه واقعی، URL ویدیو از API بدست می‌آید
      setVideoUrl(episode.videoUrl || 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
    }
  }, [course, activeEpisodeId]);
  
  // کنترل پخش ویدیو
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  // کنترل صدا
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  // تنظیم پیشرفت ویدیو
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      
      if (duration > 0) {
        setCurrentTime(current);
        setProgress((current / duration) * 100);
      }
    }
  };
  
  // تغییر موقعیت پخش با کلیک روی نوار پیشرفت
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current && videoRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = pos * videoRef.current.duration;
    }
  };
  
  // حالت تمام صفحه
  const toggleFullScreen = () => {
    if (playerRef.current) {
      if (!isFullScreen) {
        if (playerRef.current.requestFullscreen) {
          playerRef.current.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
      setIsFullScreen(!isFullScreen);
    }
  };
  
  // تبدیل ثانیه به فرمت mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // رویداد لود ویدیو
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };
  
  // دریافت عنوان قسمت قبلی و بعدی
  const getAdjacentEpisodes = (): { prev: Episode | null; next: Episode | null } => {
    if (!course.chapters || course.chapters.length === 0 || !activeEpisode) {
      return { prev: null, next: null };
    }
    
    let allEpisodes: Episode[] = [];
    
    // تبدیل تمام فصل‌ها و قسمت‌ها به یک آرایه یکپارچه
    course.chapters.forEach(chapter => {
      allEpisodes = [...allEpisodes, ...chapter.episodes];
    });
    
    const currentIndex = allEpisodes.findIndex(ep => ep.id === activeEpisode.id);
    
    if (currentIndex === -1) {
      return { prev: null, next: null };
    }
    
    const prev = currentIndex > 0 ? allEpisodes[currentIndex - 1] : null;
    const next = currentIndex < allEpisodes.length - 1 ? allEpisodes[currentIndex + 1] : null;
    
    return { prev, next };
  };
  
  const { prev, next } = getAdjacentEpisodes();
  
  // اگر قسمتی انتخاب نشده است
  if (!activeEpisode) {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-100 p-12 text-center dark:border-gray-800 dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-400">لطفاً یک قسمت را برای پخش انتخاب کنید.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {/* عنوان قسمت فعال */}
      <h2 className="text-xl font-bold">{activeEpisode.title}</h2>
      
      {/* پخش‌کننده ویدیو */}
      <div 
        ref={playerRef}
        className="relative aspect-video overflow-hidden rounded-lg bg-black"
      >
        {/* ویدیو */}
        <video
          ref={videoRef}
          src={videoUrl}
          className="h-full w-full"
          onClick={togglePlay}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        />
        
        {/* کنترل‌های پخش */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          {/* نوار پیشرفت */}
          <div 
            ref={progressRef}
            className="mb-2 h-1 cursor-pointer rounded-full bg-gray-600"
            onClick={handleProgressClick}
          >
            <div 
              className="h-full rounded-full bg-primary"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* قسمت قبلی */}
              <button 
                onClick={() => prev && setActiveEpisode(prev)}
                disabled={!prev}
                className="text-white opacity-70 transition-opacity hover:opacity-100 disabled:opacity-30"
              >
                <SkipBack className="h-5 w-5" />
              </button>
              
              {/* پخش/توقف */}
              <button 
                onClick={togglePlay}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </button>
              
              {/* قسمت بعدی */}
              <button 
                onClick={() => next && setActiveEpisode(next)}
                disabled={!next}
                className="text-white opacity-70 transition-opacity hover:opacity-100 disabled:opacity-30"
              >
                <SkipForward className="h-5 w-5" />
              </button>
              
              {/* زمان */}
              <div className="text-sm text-white">
                <span>{formatTime(currentTime)}</span>
                {' / '}
                <span>{formatTime(duration)}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* صدا */}
              <button onClick={toggleMute} className="text-white opacity-70 hover:opacity-100">
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </button>
              
              {/* تمام صفحه */}
              <button onClick={toggleFullScreen} className="text-white opacity-70 hover:opacity-100">
                <Maximize className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        
        {/* دکمه مرکزی پخش/توقف (نمایش هنگام توقف ویدیو) */}
        {!isPlaying && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
            <button 
              onClick={togglePlay}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-white bg-opacity-80 text-black transition-transform hover:scale-110"
            >
              <Play className="h-8 w-8" />
            </button>
          </div>
        )}
      </div>
      
      {/* اطلاعات اضافی قسمت */}
      {activeEpisode.description && (
        <div className="prose max-w-none dark:prose-invert">
          <p className="text-gray-700 dark:text-gray-300">{activeEpisode.description}</p>
        </div>
      )}
    </div>
  );
} 