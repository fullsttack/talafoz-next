'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import ReactPlayer from 'react-player';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, SkipForward, SkipBack, Settings } from 'lucide-react';
import { Episode } from '@/components/data/course';

interface CourseEpisodePlayerProps {
  episode: Episode;
  onProgressChange?: (progressPercent: number, currentTime?: number) => void;
  initialProgress?: number;
  isPremiumUser?: boolean;
  hasPurchased?: boolean;
}

export default function CourseEpisodePlayer({ 
  episode, 
  onProgressChange,
  initialProgress = 0,
  isPremiumUser = false,
  hasPurchased = false
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
  const [loadedProgress, setLoadedProgress] = useState(0);
  const [timeTooltip, setTimeTooltip] = useState<{ visible: boolean; time: number; position: number }>({
    visible: false,
    time: 0,
    position: 0
  });
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  
  const playerRef = useRef<ReactPlayer>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressContainerRef = useRef<HTMLDivElement>(null);
  const volumeControlTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const progressUpdateTimerRef = useRef<NodeJS.Timeout | null>(null);
  const playerWrapperRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const settingsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
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
    
    // ذخیره اطلاعات بافر
    setLoadedProgress(state.loaded * 100);
    
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
          // مخفی کردن منوی تنظیمات هنگام مخفی شدن کنترل‌ها
          setShowSettings(false);
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
      if (settingsTimeoutRef.current) {
        clearTimeout(settingsTimeoutRef.current);
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
  
  // پرش به جلو
  const handleSkipForward = () => {
    if (playerRef.current) {
      const newTime = Math.min(currentTime + 10, duration);
      playerRef.current.seekTo(newTime / duration);
    }
  };
  
  // پرش به عقب
  const handleSkipBackward = () => {
    if (playerRef.current) {
      const newTime = Math.max(currentTime - 10, 0);
      playerRef.current.seekTo(newTime / duration);
    }
  };
  
  // نمایش tooltip زمان هنگام حرکت موس روی نوار پیشرفت
  const handleProgressMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current && duration) {
      const rect = progressRef.current.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      const time = pos * duration;
      
      setTimeTooltip({
        visible: true,
        time,
        position: pos * 100
      });
    }
  };
  
  // مخفی کردن tooltip زمان هنگام خروج موس از نوار پیشرفت
  const handleProgressMouseLeave = () => {
    setTimeTooltip({ ...timeTooltip, visible: false });
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
  
  // تغییر سرعت پخش
  const changePlaybackRate = (rate: number) => {
    setPlaybackRate(rate);
    setShowSettings(false);
  };
  
  // توگل منوی تنظیمات
  const toggleSettings = () => {
    setShowSettings(prev => !prev);
    
    // پنهان کردن منوی تنظیمات پس از مدتی
    if (settingsTimeoutRef.current) {
      clearTimeout(settingsTimeoutRef.current);
    }
    
    if (!showSettings) {
      settingsTimeoutRef.current = setTimeout(() => {
        setShowSettings(false);
      }, 5000);
    }
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
        case 'ArrowRight':
          handleSkipForward();
          break;
        case 'ArrowLeft':
          handleSkipBackward();
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [togglePlay, toggleMute, toggleFullScreen, handleSkipForward, handleSkipBackward]);
  
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
      className="w-full h-full relative bg-black flex items-center justify-center select-none"
      dir="ltr"
    >
      {/* نوار اطلاع‌رسانی برای محتوای ویژه - فقط برای کاربرانی که دوره را نخریده‌اند */}
      {!hasPurchased && (
        <div className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-black/90 to-black/70 backdrop-blur-md px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-amber-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div className="text-white">
              <h3 className="font-bold text-sm sm:text-base">این یک محتوای ویژه است</h3>
              <p className="text-xs sm:text-sm text-gray-300 mt-0.5">برای دسترسی به این ویدیو، لطفاً دوره را خریداری کنید</p>
            </div>
          </div>
          <a 
            href={`/courses/${episode.courseId}/checkout`} 
            className="hidden sm:flex items-center justify-center bg-green-500 hover:bg-green-600 text-black font-medium rounded-lg px-4 py-2 text-sm transition-colors whitespace-nowrap"
          >
            خرید دوره
          </a>
        </div>
      )}
      
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
            playbackRate={playbackRate}
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
      
      {/* لایه کلیک برای پخش/توقف - نمایش فقط در حالت توقف */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="w-20 h-20 rounded-full bg-green-500/30 flex items-center justify-center backdrop-blur-md shadow-lg">
            <Play className="w-10 h-10 text-white" fill="white" />
          </div>
        </div>
      )}
      
      {/* کنترل‌های پخش */}
      <div 
        className={`absolute left-0 right-0 bottom-0 transition-opacity duration-300 z-20 ${
          showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* پس‌زمینه تیره برای کنترل‌ها */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none"></div>
        
        <div className="relative p-4 space-y-3">
          {/* نوار پیشرفت و tooltip */}
          <div 
            ref={progressContainerRef}
            className="relative px-1 group"
            onMouseMove={handleProgressMouseMove}
            onMouseLeave={handleProgressMouseLeave}
          >
            {/* tooltip زمان */}
            {timeTooltip.visible && (
              <div 
                className="absolute bottom-full mb-2.5 bg-black/90 text-white text-xs py-1 px-2 rounded transform -translate-x-1/2 pointer-events-none"
                style={{ left: `${timeTooltip.position}%` }}
              >
                {formatTime(timeTooltip.time)}
              </div>
            )}
            
            <div 
              ref={progressRef}
              className="w-full h-1.5 bg-gray-600/40 rounded-full cursor-pointer overflow-hidden group-hover:h-2.5 transition-all"
              onClick={handleProgressClick}
            >
              {/* بخش بارگذاری شده */}
              <div 
                className="absolute top-0 left-0 h-full bg-gray-500/50 rounded-full"
                style={{ width: `${loadedProgress}%` }}
              ></div>
              
              {/* بخش پخش شده */}
              <div 
                className="absolute top-0 left-0 h-full bg-green-500 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            
            {/* دکمه کشیدن - نمایش فقط در هاور */}
            <div 
              className="absolute top-1/2 opacity-0 group-hover:opacity-100 transition-opacity -translate-y-1/2 w-4 h-4 bg-green-500 rounded-full shadow-sm border-2 border-white"
              style={{ left: `${progress}%`, transform: 'translate(-50%, -50%)' }}
            ></div>
          </div>
          
          {/* کنترل‌های اصلی */}
          <div className="flex items-center justify-between">
            {/* دکمه‌های سمت چپ */}
            <div className="flex items-center space-x-3">
              {/* پخش/توقف */}
              <button
                onClick={togglePlay}
                className="text-white hover:text-green-400 focus:outline-none transition-colors group"
              >
                <div className="bg-white/10 rounded-full p-2 group-hover:bg-white/20 transition-colors">
                  {isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5 ml-0.5" />
                  )}
                </div>
              </button>
              
              {/* پرش به عقب */}
              <button
                onClick={handleSkipBackward}
                className="text-white hover:text-green-400 focus:outline-none transition-colors"
              >
                <div className="bg-white/10 rounded-full p-2 hover:bg-white/20 transition-colors">
                  <SkipBack className="w-4 h-4" />
                </div>
              </button>
              
              {/* پرش به جلو */}
              <button
                onClick={handleSkipForward}
                className="text-white hover:text-green-400 focus:outline-none transition-colors"
              >
                <div className="bg-white/10 rounded-full p-2 hover:bg-white/20 transition-colors">
                  <SkipForward className="w-4 h-4" />
                </div>
              </button>
              
              {/* کنترل صدا */}
              <div className="relative flex items-center">
                <button
                  onClick={toggleMute}
                  onMouseEnter={toggleVolumeControl}
                  className="text-white hover:text-green-400 focus:outline-none transition-colors"
                >
                  <div className="bg-white/10 rounded-full p-2 hover:bg-white/20 transition-colors">
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-5 h-5" />
                    ) : (
                      <Volume2 className="w-5 h-5" />
                    )}
                  </div>
                </button>
                
                {showVolumeControl && (
                  <div 
                    className="absolute left-0 bottom-full mb-3 bg-gray-800/90 backdrop-blur-md rounded shadow-lg py-2 px-3"
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
              
              {/* زمان پخش - کوچک */}
              <div className="text-white/90 text-xs font-medium tracking-wide hidden sm:block">
                {formatTime(currentTime)} <span className="text-gray-400 mx-0.5">/</span> {formatTime(duration)}
              </div>
            </div>
            
            {/* زمان پخش - موبایل */}
            <div className="text-white/90 text-xs font-medium sm:hidden">
              {formatTime(currentTime)} <span className="text-gray-400 mx-0.5">/</span> {formatTime(duration)}
            </div>
            
            {/* دکمه‌های سمت راست */}
            <div className="flex items-center space-x-3">
              {/* تنظیمات سرعت پخش */}
              <div className="relative">
                <button
                  onClick={toggleSettings}
                  className="flex items-center justify-center bg-white/10 rounded-full p-2 hover:bg-white/20 text-white hover:text-green-400 focus:outline-none transition-colors"
                >
                  <Settings size={16} />
                </button>
                
                {/* نمایش سرعت پخش کنار آیکون تنظیمات */}
                {playbackRate !== 1 && (
                  <div className="absolute -top-1 -right-1 text-xs font-bold bg-green-500 text-black px-1 rounded-md">
                    {playbackRate}x
                  </div>
                )}
                
                {/* منوی تنظیمات */}
                {showSettings && (
                  <div className="absolute bottom-full right-0 mb-2 bg-black/90 backdrop-blur-md rounded shadow-lg overflow-hidden min-w-[100px]">
                    <div className="py-1">
                      {[0.5, 0.75, 1, 1.25, 1.5, 2].map(rate => (
                        <button
                          key={rate}
                          onClick={() => changePlaybackRate(rate)}
                          className={`flex items-center justify-between w-full px-4 py-1.5 text-sm hover:bg-white/10 ${
                            playbackRate === rate ? 'text-green-400' : 'text-white'
                          }`}
                        >
                          <span>{rate === 1 ? 'Normal' : `${rate}x`}</span>
                          {playbackRate === rate && (
                            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* تمام صفحه */}
              <button
                onClick={toggleFullScreen}
                className="flex items-center justify-center bg-white/10 rounded-full p-2 hover:bg-white/20 text-white hover:text-green-400 focus:outline-none transition-colors"
              >
                {isFullScreen ? (
                  <Minimize size={16} />
                ) : (
                  <Maximize size={16} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 