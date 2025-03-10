'use client';

import { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Settings } from 'lucide-react';
import { Episode } from '@/components/data/course';

interface CourseEpisodePlayerProps {
  episode: Episode;
}

export default function CourseEpisodePlayer({ episode }: CourseEpisodePlayerProps) {
  const [videoUrl, setVideoUrl] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [volume, setVolume] = useState(1);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const volumeControlTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // تنظیم URL ویدیو
  useEffect(() => {
    // در یک پروژه واقعی، URL ویدیو از API دریافت می‌شود
    setVideoUrl(episode.videoUrl || 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
  }, [episode]);
  
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
  
  // کلیدهای میانبر
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT') return;
      
      switch (e.key.toLowerCase()) {
        case ' ':
        case 'k':
          e.preventDefault();
          togglePlay();
          break;
        case 'm':
          e.preventDefault();
          toggleMute();
          break;
        case 'f':
          e.preventDefault();
          toggleFullScreen();
          break;
        case 'arrowright':
          e.preventDefault();
          if (videoRef.current) {
            videoRef.current.currentTime += 10;
          }
          break;
        case 'arrowleft':
          e.preventDefault();
          if (videoRef.current) {
            videoRef.current.currentTime -= 10;
          }
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
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
      ref={playerRef}
      className="relative aspect-video overflow-hidden bg-black"
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
              className="text-white opacity-90 transition-opacity hover:opacity-100"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </button>
            
            {/* کنترل صدا */}
            <div className="relative">
              <button 
                onClick={toggleMute}
                onMouseEnter={toggleVolumeControl}
                className="text-white opacity-90 transition-opacity hover:opacity-100"
              >
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </button>
              
              {/* اسلایدر صدا */}
              {showVolumeControl && (
                <div className="absolute bottom-full left-0 mb-2 h-24 w-8 bg-gray-900/90 p-2">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="h-full w-1 cursor-pointer appearance-none rounded-full bg-gray-600 outline-none"
                    style={{
                      writingMode: 'bt-lr',
                      WebkitAppearance: 'slider-vertical',
                      padding: '0 8px'
                    }}
                  />
                </div>
              )}
            </div>
            
            {/* زمان */}
            <div className="text-sm text-white">
              <span>{formatTime(currentTime)}</span>
              {' / '}
              <span>{formatTime(duration)}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* تنظیمات */}
            <button className="text-white opacity-70 hover:opacity-100">
              <Settings className="h-5 w-5" />
            </button>
            
            {/* تمام صفحه */}
            <button onClick={toggleFullScreen} className="text-white opacity-70 hover:opacity-100">
              <Maximize className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 