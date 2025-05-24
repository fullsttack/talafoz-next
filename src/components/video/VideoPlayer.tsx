'use client';

import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Loader2,
  ChevronLeft,
  ChevronRight,
  IterationCw,
  IterationCcw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

// Dynamic import for ReactPlayer to avoid SSR issues
const ReactPlayer = dynamic(() => import('react-player'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-black flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-white" />
    </div>
  ),
});

// Player Progress interface
interface PlayerProgress {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
}

interface VideoPlayerProps {
  url: string;
  onProgress?: (progress: PlayerProgress) => void;
  onDuration?: (duration: number) => void;
  onEnded?: () => void;
  onPreviousEpisode?: () => void;
  onNextEpisode?: () => void;
  hasPreviousEpisode?: boolean;
  hasNextEpisode?: boolean;
  className?: string;
}

export default function VideoPlayer({
  url,
  onProgress,
  onDuration,
  onEnded,
  onPreviousEpisode,
  onNextEpisode,
  hasPreviousEpisode = false,
  hasNextEpisode = false,
  className = "",
}: VideoPlayerProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>(null);
  
  // Player states
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [seeking, setSeeking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Hide controls after 3 seconds of inactivity (only when not hovering)
  useEffect(() => {
    if (!isPlaying || isHovering) return;
    
    const timer = setTimeout(() => {
      setShowControls(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isPlaying, isHovering]);

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  // Player handlers
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    setShowControls(true);
  };

  const handleProgress = (state: PlayerProgress) => {
    if (!seeking) {
      setPlayed(state.played);
      onProgress?.(state);
    }
  };

  const handleSeekChange = (value: number[]) => {
    setSeeking(true);
    setPlayed(value[0] / 100);
  };

  const handleSeekMouseUp = () => {
    setSeeking(false);
    if (playerRef.current) {
      playerRef.current.seekTo(played);
    }
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
    onDuration?.(duration);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0] / 100);
    setIsMuted(value[0] === 0);
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
  };

  const handlePlaybackRateChange = (rate: number) => {
    setPlaybackRate(rate);
  };

  const handleSkip = (seconds: number) => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      playerRef.current.seekTo(currentTime + seconds);
    }
  };

  const handleFullscreen = () => {
    if (isFullscreen) {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } else if ((document as any).webkitExitFullscreen) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (document as any).webkitExitFullscreen();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } else if ((document as any).mozCancelFullScreen) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (document as any).mozCancelFullScreen();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } else if ((document as any).msExitFullscreen) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (document as any).msExitFullscreen();
      }
    } else {
      // Enter fullscreen
      const playerContainer = document.querySelector('.react-player-wrapper');
      if (playerContainer) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const container = playerContainer as any;
        if (container.requestFullscreen) {
          container.requestFullscreen();
        } else if (container.webkitRequestFullscreen) {
          container.webkitRequestFullscreen();
        } else if (container.mozRequestFullScreen) {
          container.mozRequestFullScreen();
        } else if (container.msRequestFullscreen) {
          container.msRequestFullscreen();
        }
      }
    }
  };

  const formatTime = (seconds: number) => {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, '0');
    if (hh) {
      return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
    }
    return `${mm}:${ss}`;
  };

  return (
    <TooltipProvider>
      <div 
        className={`relative aspect-video bg-black rounded-lg overflow-hidden group react-player-wrapper ${className}`}
        onMouseEnter={() => {
          setShowControls(true);
          setIsHovering(true);
        }}
        onMouseLeave={() => {
          setIsHovering(false);
          setShowControls(isPlaying ? false : true);
        }}
      >
      {/* ReactPlayer */}
      <ReactPlayer
        ref={playerRef}
        url={url}
        width="100%"
        height="100%"
        playing={isPlaying}
        muted={isMuted}
        volume={volume}
        playbackRate={playbackRate}
        onProgress={handleProgress}
        onDuration={handleDuration}
        onEnded={onEnded}
        onReady={() => setIsLoading(false)}
        onBuffer={() => setIsLoading(true)}
        onBufferEnd={() => setIsLoading(false)}
        controls={false}
        config={{
          youtube: {
            playerVars: { showinfo: 1 }
          }
        }}
      />
      
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
        </div>
      )}
      
      {/* Custom Controls */}
      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-300 z-50 ${showControls ? 'opacity-100' : 'opacity-0'} ${isFullscreen ? 'fixed' : ''}`}>
        {/* Progress Bar */}
        <div className="px-4 pt-2">
          <Slider
            value={[played * 100]}
            onValueChange={handleSeekChange}
            onValueCommit={handleSeekMouseUp}
            max={100}
            step={0.1}
            className="w-full [&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary"
          />
        </div>
        
        {/* Control Buttons */}
        <div className="flex items-center justify-between p-4 flex-wrap gap-2">
          {/* Secondary Controls (Left in RTL): Speed, Settings, Fullscreen */}
          <div className="flex items-center gap-2">
            {/* Playback Speed */}
            <Tooltip>
              <TooltipTrigger asChild>
                <select
                  value={playbackRate}
                  onChange={(e) => handlePlaybackRateChange(Number(e.target.value))}
                  className="text-white px-2 py-1 text-sm cursor-pointer min-w-[20px] bg-black/50 border border-white/20 rounded hover:bg-black/70"
                >
                  <option value={0.5}>0.5x</option>
                  <option value={0.75}>0.75x</option>
                  <option value={1}>1x</option>
                  <option value={1.25}>1.25x</option>
                  <option value={1.5}>1.5x</option>
                  <option value={2}>2x</option>
                </select>
              </TooltipTrigger>
              <TooltipContent>
                <p>سرعت پخش</p>
              </TooltipContent>
            </Tooltip>
            
            {/* Fullscreen */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleFullscreen}
                  className="text-white hover:bg-white/20 h-8 w-8"
                >
                  {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isFullscreen ? 'خروج از تمام صفحه' : 'تمام صفحه'}</p>
              </TooltipContent>
            </Tooltip>
          </div>
          
          {/* Primary Controls (Right in RTL): Episode Navigation, Skip Back, Play/Pause, Skip Forward, Volume, Time */}
          <div className="flex flex-row-reverse items-center gap-1">
            {/* Previous Episode */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={onPreviousEpisode}
                  disabled={!hasPreviousEpisode}
                  className="text-white hover:bg-white/20 h-8 w-8 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>قسمت قبل</p>
              </TooltipContent>
            </Tooltip>

            {/* Skip Back */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleSkip(-15)}
                  className="text-white hover:bg-white/20 h-8 w-8 relative"
                >
                  <IterationCw className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>عقب رفتن ۱۵ ثانیه</p>
              </TooltipContent>
            </Tooltip>
            
            {/* Play/Pause */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handlePlayPause}
                  className="text-white hover:bg-white/20 h-10 w-10"
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isPlaying ? 'توقف' : 'پخش'}</p>
              </TooltipContent>
            </Tooltip>
            
            {/* Skip Forward */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleSkip(15)}
                  className="text-white hover:bg-white/20 h-8 w-8 relative"
                >
                  <IterationCcw className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>جلو رفتن ۱۵ ثانیه</p>
              </TooltipContent>
            </Tooltip>

            {/* Next Episode */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={onNextEpisode}
                  disabled={!hasNextEpisode}
                  className="text-white hover:bg-white/20 h-8 w-8 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>قسمت بعد</p>
              </TooltipContent>
            </Tooltip>
            
            {/* Volume */}
            <div className="flex items-center gap-2 mr-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleMute}
                    className="text-white hover:bg-white/20 h-8 w-8"
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isMuted ? 'روشن کردن صدا' : 'بی‌صدا کردن'}</p>
                </TooltipContent>
              </Tooltip>
              <div className="w-24 hidden sm:block">
                <Slider
                  value={[isMuted ? 0 : volume * 100]}
                  onValueChange={handleVolumeChange}
                  max={100}
                  step={1}
                  className="w-full [&_[role=slider]]:bg-white [&_[role=slider]]:border-white"
                />
              </div>
            </div>
            
            {/* Time Display */}
            <div className="text-white text-sm font-mono hidden sm:block">
              <span>{formatTime(played * duration)}</span>
              <span className="mx-1 opacity-60">/</span>
              <span className="opacity-80">{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Center Play Button */}
      {!isPlaying && showControls && (
        <div 
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          onClick={handlePlayPause}
        >
          <div className="bg-black/50 rounded-full p-4 hover:bg-black/70 transition-colors">
            <Play className="h-12 w-12 text-white" />
          </div>
        </div>
      )}
      </div>
    </TooltipProvider>
  );
} 