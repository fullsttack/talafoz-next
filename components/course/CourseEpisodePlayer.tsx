'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import ReactPlayer from 'react-player';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';
import { Episode } from '@/components/data/course';

interface CourseEpisodePlayerProps {
  episode: Episode;
  onProgressChange?: (progressPercent: number, currentTime?: number) => void;
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
  const [showControls, setShowControls] = useState(true);
  
  const playerRef = useRef<ReactPlayer>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const volumeControlTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const progressUpdateTimerRef = useRef<NodeJS.Timeout | null>(null);
  const playerWrapperRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // تنظیم URL ویدیو
  useEffect(() => {
    // در یک پروژه واقعی، URL ویدیو از API دریافت می‌شود
    const defaultVideoUrl = 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
    setVideoUrl(episode.videoUrl || defaultVideoUrl);
  }, [episode]);
  
  // تنظیم موقعیت اولیه ویدیو بر اساس پیشرفت قبلی
  useEffect(() => {
    if (playerRef.current && !hasInitializedProgress && initialProgress > 0 && initialProgress < 95 && duration > 0) {
      const targetTime = (initialProgress / 100) * duration;
      playerRef.current.seekTo(targetTime, 'seconds');
      setHasInitializedProgress(true);
    }
  }, [initialProgress, duration, hasInitializedProgress]);
  
  // Toggle play/pause
  const togglePlay = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);
  
  // Toggle mute/unmute
  const toggleMute = useCallback(() => {
    setIsMuted(!isMuted);
    
    if (!isMuted) {
      setVolume(0);
    } else {
      setVolume(1);
    }
  }, [isMuted]);
  
  // تنظیم حجم صدا
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
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
  const handleProgress = (state: { played: number; playedSeconds: number; loaded: number; loadedSeconds: number }) => {
    if (!playerRef.current) return;
    
    const current = state.playedSeconds;
    setCurrentTime(current);
    
    const progressPercent = state.played * 100;
    setProgress(progressPercent);
    
    // ارسال پیشرفت به کامپوننت والد با محدودیت فراخوانی (throttling)
    if (onProgressChange) {
      // پاکسازی تایمر قبلی
      if (progressUpdateTimerRef.current) {
        clearTimeout(progressUpdateTimerRef.current);
      }
      
      // ایجاد تایمر جدید - ارسال پیشرفت هر 5 ثانیه
      progressUpdateTimerRef.current = setTimeout(() => {
        onProgressChange(progressPercent, current);
      }, 5000);
      
      // ارسال فوری برای نقاط کلیدی (25%، 50%، 75%، 95%، 100%)
      const keyPoints = [25, 50, 75, 95, 100];
      const roundedProgress = Math.round(progressPercent);
      
      if (keyPoints.includes(roundedProgress)) {
        onProgressChange(progressPercent, current);
      }
    }
  };
  
  // مدیریت نمایش/مخفی سازی کنترل‌ها
  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);
      
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      
      if (isPlaying) {
        controlsTimeoutRef.current = setTimeout(() => {
          setShowControls(false);
        }, 3000);
      }
    };
    
    const container = playerWrapperRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseenter', handleMouseMove);
    }
    
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseenter', handleMouseMove);
      }
      
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying]);
  
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
    if (progressRef.current && playerRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      
      playerRef.current.seekTo(pos);
      
      // ارسال پیشرفت پس از تغییر دستی موقعیت
      if (onProgressChange) {
        const progressPercent = pos * 100;
        onProgressChange(progressPercent);
      }
    }
  };
  
  // Toggle fullscreen
  const toggleFullScreen = useCallback(() => {
    if (!playerWrapperRef.current) return;
    
    if (!document.fullscreenElement) {
      playerWrapperRef.current.requestFullscreen().catch(err => {
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
  const handleDuration = (duration: number) => {
    setDuration(duration);
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
  
  // کلیک روی ویدیو برای توگل پخش/توقف
  const handleVideoClick = () => {
    togglePlay();
  };
  
  return (
    <div 
      ref={playerWrapperRef}
      className="w-full h-full relative bg-black flex items-center justify-center"
      dir="ltr"
    >
      {/* ویدیو پلیر */}
      {videoUrl ? (
        <div className="w-full h-full" onClick={handleVideoClick}>
          <ReactPlayer
            ref={playerRef}
            url={videoUrl}
            width="100%"
            height="100%"
            playing={isPlaying}
            volume={volume}
            muted={isMuted}
            progressInterval={200}
            onProgress={handleProgress}
            onDuration={handleDuration}
            onEnded={handleVideoEnded}
            config={{
              file: {
                attributes: {
                  controlsList: 'nodownload',
                  disablePictureInPicture: true,
                },
              },
            }}
          />
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-gray-700 border-t-green-500 rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* لایه کلیک برای پخش/توقف */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center backdrop-blur-sm">
            <Play className="w-10 h-10 text-white" />
          </div>
        </div>
      )}
      
      {/* کنترل‌های پخش */}
      <div 
        className={`absolute left-0 right-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 transition-all ${
          showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* نوار پیشرفت */}
        <div 
          ref={progressRef}
          className="w-full h-2 bg-gray-600/60 rounded cursor-pointer"
          onClick={handleProgressClick}
        >
          <div className="relative h-full">
            <div 
              className="absolute top-0 left-0 h-full bg-green-500 rounded"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-green-500 rounded-full shadow"></div>
            </div>
          </div>
        </div>
        
        {/* کنترل‌های اصلی */}
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center space-x-4">
            {/* دکمه پخش/توقف */}
            <button
              onClick={togglePlay}
              className="text-white hover:text-green-400 focus:outline-none transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-7 h-7" />
              ) : (
                <Play className="w-7 h-7" />
              )}
            </button>
            
            {/* کنترل صدا */}
            <div className="relative">
              <button
                onClick={toggleMute}
                onMouseEnter={toggleVolumeControl}
                className="text-white hover:text-green-400 focus:outline-none transition-colors"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-6 h-6" />
                ) : (
                  <Volume2 className="w-6 h-6" />
                )}
              </button>
              
              {showVolumeControl && (
                <div 
                  className="absolute left-0 bottom-full mb-2 p-2 bg-gray-800/90 backdrop-blur-sm rounded shadow-lg"
                  onMouseLeave={() => setShowVolumeControl(false)}
                >
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-24 accent-green-500"
                  />
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* زمان پخش */}
            <div className="text-white text-sm font-medium">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
            
            {/* دکمه تمام صفحه */}
            <button
              onClick={toggleFullScreen}
              className="text-white hover:text-green-400 focus:outline-none transition-colors"
            >
              {isFullScreen ? (
                <Minimize className="w-5 h-5" />
              ) : (
                <Maximize className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 