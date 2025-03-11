'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import { Episode } from '@/components/data/course';

interface CourseEpisodePlayerProps {
  episode: Episode;
  onProgressChange?: (progressPercent: number) => void;
  initialProgress?: number;
}

export default function CourseEpisodePlayer({ 
  episode, 
  onProgressChange,
  initialProgress = 0 
}: CourseEpisodePlayerProps) {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(initialProgress);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [volume, setVolume] = useState(1);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const [hasInitializedProgress, setHasInitializedProgress] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(1);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const volumeControlTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const progressUpdateTimerRef = useRef<NodeJS.Timeout | null>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  
  // تنظیم URL ویدیو
  useEffect(() => {
    // در یک پروژه واقعی، URL ویدیو از API دریافت می‌شود
    const defaultVideoUrl = 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
    setVideoUrl(episode.videoUrl || defaultVideoUrl);
  }, [episode]);
  
  // تنظیم موقعیت اولیه ویدیو بر اساس پیشرفت قبلی
  useEffect(() => {
    if (videoRef.current && !hasInitializedProgress && initialProgress > 0 && initialProgress < 95 && duration > 0) {
      const targetTime = (initialProgress / 100) * duration;
      videoRef.current.currentTime = targetTime;
      setHasInitializedProgress(true);
    }
  }, [initialProgress, duration, hasInitializedProgress]);
  
  // Toggle play/pause
  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, []);
  
  // Toggle mute/unmute
  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;
    
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
    
    if (videoRef.current.muted) {
      setPreviousVolume(volume);
      setVolume(0);
    } else {
      setVolume(previousVolume);
    }
  }, [volume, previousVolume]);
  
  // تنظیم حجم صدا
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };
  
  // نمایش/پنهان‌سازی کنترل حجم صدا
  const toggleVolumeControl = () => {
    setShowVolumeControl(prev => !prev);
    
    // پنهان کردن کنترل حجم صدا پس از چند ثانیه
    if (volumeControlTimeoutRef.current) {
      clearTimeout(volumeControlTimeoutRef.current);
    }
    
    if (!showVolumeControl) {
      volumeControlTimeoutRef.current = setTimeout(() => {
        setShowVolumeControl(false);
      }, 3000);
    }
  };
  
  // تنظیم پیشرفت ویدیو
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const videoDuration = videoRef.current.duration;
      
      if (videoDuration > 0) {
        setCurrentTime(current);
        const progressPercent = (current / videoDuration) * 100;
        setProgress(progressPercent);
        
        // ارسال پیشرفت به کامپوننت والد با محدودیت فراخوانی (throttling)
        if (onProgressChange) {
          // پاکسازی تایمر قبلی
          if (progressUpdateTimerRef.current) {
            clearTimeout(progressUpdateTimerRef.current);
          }
          
          // ایجاد تایمر جدید - ارسال پیشرفت هر 5 ثانیه
          progressUpdateTimerRef.current = setTimeout(() => {
            onProgressChange(progressPercent);
          }, 5000);
          
          // ارسال فوری برای نقاط کلیدی (25%، 50%، 75%، 95%، 100%)
          const keyPoints = [25, 50, 75, 95, 100];
          const roundedProgress = Math.round(progressPercent);
          
          if (keyPoints.includes(roundedProgress)) {
            onProgressChange(progressPercent);
          }
        }
      }
    }
  };
  
  // پاکسازی تایمرها هنگام خروج از کامپوننت
  useEffect(() => {
    return () => {
      if (volumeControlTimeoutRef.current) {
        clearTimeout(volumeControlTimeoutRef.current);
      }
      if (progressUpdateTimerRef.current) {
        clearTimeout(progressUpdateTimerRef.current);
      }
    };
  }, []);
  
  // ارسال پیشرفت هنگام اتمام ویدیو
  const handleVideoEnded = () => {
    setIsPlaying(false);
    if (onProgressChange) {
      onProgressChange(100);
    }
  };
  
  // تغییر موقعیت پخش با کلیک روی نوار پیشرفت
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current && videoRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = pos * videoRef.current.duration;
      
      // ارسال پیشرفت پس از تغییر دستی موقعیت
      if (onProgressChange) {
        const progressPercent = pos * 100;
        onProgressChange(progressPercent);
      }
    }
  };
  
  // Toggle fullscreen
  const toggleFullScreen = useCallback(() => {
    if (!videoContainerRef.current) return;
    
    if (!document.fullscreenElement) {
      videoContainerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  }, []);
  
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
  
  // کلیدهای میانبر
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // جلوگیری از عملکرد کلیدها در صورت وارد کردن اطلاعات در یک input
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          togglePlay();
          break;
        case 'KeyM':
          toggleMute();
          break;
        case 'KeyF':
          toggleFullScreen();
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [togglePlay, toggleMute, toggleFullScreen]);
  
  // رویداد تغییر حالت تمام صفحه
  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);
  
  return (
    <div 
      ref={videoContainerRef}
      className={`relative overflow-hidden rounded-lg bg-black ${isFullScreen ? 'fixed inset-0 z-50' : ''}`}
    >
      {/* ویدیو - فقط زمانی که videoUrl وجود داشته باشد */}
      {videoUrl && (
        <video
          ref={videoRef}
          src={videoUrl}
          className="h-full w-full"
          onClick={togglePlay}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={handleVideoEnded}
        />
      )}
      
      {/* نمایش حالت بارگذاری اگر هنوز URL ویدیو تنظیم نشده باشد */}
      {!videoUrl && (
        <div className="flex h-full w-full items-center justify-center bg-black">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-600 border-t-primary"></div>
        </div>
      )}
      
      {/* اورلی وسط برای پخش/توقف */}
      <div 
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}
        onClick={togglePlay}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-transform hover:scale-110">
          {isPlaying ? (
            <Pause className="h-8 w-8" />
          ) : (
            <Play className="h-8 w-8 translate-x-0.5" />
          )}
        </div>
      </div>
      
      {/* کنترل‌های پخش */}
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}
      >
        {/* نوار پیشرفت */}
        <div 
          ref={progressRef}
          className="mb-2 h-1.5 cursor-pointer rounded-full bg-gray-600"
          onClick={handleProgressClick}
        >
          <div 
            className="h-full rounded-full bg-primary"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* پخش/توقف */}
            <button 
              onClick={togglePlay}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 translate-x-0.5" />}
            </button>
            
            {/* زمان */}
            <div className="text-sm text-white">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* تنظیم صدا */}
            <div className="relative">
              <button 
                onClick={toggleVolumeControl}
                onMouseEnter={() => setShowVolumeControl(true)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
              
              {showVolumeControl && (
                <div 
                  className="absolute bottom-full right-0 mb-2 rounded-lg bg-black/80 p-2 backdrop-blur-sm"
                  onMouseLeave={() => setShowVolumeControl(false)}
                >
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="h-1 w-20 cursor-pointer appearance-none rounded-full bg-gray-600 accent-primary"
                  />
                </div>
              )}
            </div>
            
            {/* تمام صفحه */}
            <button 
              onClick={toggleFullScreen}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <Maximize className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 