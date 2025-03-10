"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Settings, 
  SkipBack, 
  SkipForward, 
  FileText,
  Download
} from "lucide-react";
import {
  Slider
} from "@/components/ui/slider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface CourseVideoPlayerProps {
  src: string;
  title?: string;
  poster?: string;
  allowDownload?: boolean;
  nextLessonUrl?: string;
  previousLessonUrl?: string;
  notesUrl?: string;
  onComplete?: () => void;
  className?: string;
}

export function CourseVideoPlayer({
  src,
  title,
  poster,
  allowDownload = false,
  nextLessonUrl,
  previousLessonUrl,
  notesUrl,
  onComplete,
  className,
}: CourseVideoPlayerProps) {
  // State
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const [quality, setQuality] = useState("auto");
  const [isBuffering, setIsBuffering] = useState(false);

  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Format time from seconds to MM:SS
  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Handle play/pause
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

  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  // Toggle mute
  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume;
      } else {
        videoRef.current.volume = 0;
      }
      setIsMuted(!isMuted);
    }
  };

  // Handle seeking
  const handleSeek = (value: number[]) => {
    const newProgress = value[0];
    setProgress(newProgress);
    
    if (videoRef.current && duration) {
      const seekTime = (newProgress / 100) * duration;
      videoRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // Handle playback rate change
  const changePlaybackRate = (rate: number) => {
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
  };

  // Handle time update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentVideoTime = videoRef.current.currentTime;
      const videoDuration = videoRef.current.duration;
      
      if (!isNaN(videoDuration)) {
        const progressPercent = (currentVideoTime / videoDuration) * 100;
        setProgress(progressPercent);
        setCurrentTime(currentVideoTime);
        
        // Check if video is complete (with a small buffer)
        if (currentVideoTime >= videoDuration - 0.5 && onComplete) {
          onComplete();
        }
      }
    }
  };

  // Handle duration change
  const handleDurationChange = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  // Handle video waiting/buffering
  const handleBuffering = () => {
    setIsBuffering(true);
  };

  // Handle playing after buffering
  const handlePlaying = () => {
    setIsBuffering(false);
  };

  // Show/hide controls based on mouse movement
  useEffect(() => {
    const showControls = () => {
      setIsControlsVisible(true);
      
      if (controlsTimerRef.current) {
        clearTimeout(controlsTimerRef.current);
      }
      
      controlsTimerRef.current = setTimeout(() => {
        if (isPlaying) {
          setIsControlsVisible(false);
        }
      }, 3000);
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', showControls);
      container.addEventListener('mouseenter', showControls);
      container.addEventListener('mouseleave', () => {
        if (isPlaying) {
          setIsControlsVisible(false);
        }
      });
    }
    
    return () => {
      if (container) {
        container.removeEventListener('mousemove', showControls);
        container.removeEventListener('mouseenter', showControls);
        container.removeEventListener('mouseleave', () => {});
      }
      
      if (controlsTimerRef.current) {
        clearTimeout(controlsTimerRef.current);
      }
    };
  }, [isPlaying]);

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case ' ':
        case 'k':
          togglePlay();
          break;
        case 'f':
          toggleFullscreen();
          break;
        case 'm':
          toggleMute();
          break;
        case 'arrowright':
          if (videoRef.current) {
            videoRef.current.currentTime += 10;
          }
          break;
        case 'arrowleft':
          if (videoRef.current) {
            videoRef.current.currentTime -= 10;
          }
          break;
        case 'arrowup':
          if (!isMuted) {
            const newVolume = Math.min(1, volume + 0.1);
            setVolume(newVolume);
            if (videoRef.current) {
              videoRef.current.volume = newVolume;
            }
          }
          break;
        case 'arrowdown':
          const newVolume = Math.max(0, volume - 0.1);
          setVolume(newVolume);
          if (videoRef.current) {
            videoRef.current.volume = newVolume;
          }
          if (newVolume === 0) {
            setIsMuted(true);
          }
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPlaying, isMuted, volume]);

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative rounded-xl overflow-hidden bg-black group",
        isFullscreen ? "w-screen h-screen" : "w-full aspect-video",
        className
      )}
      onDoubleClick={toggleFullscreen}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-contain"
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
        onDurationChange={handleDurationChange}
        onWaiting={handleBuffering}
        onPlaying={handlePlaying}
      />
      
      {/* Title Overlay (only when controls visible) */}
      {title && isControlsVisible && (
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/70 to-transparent p-4 text-white transition-opacity duration-300">
          <h3 className="font-bold text-lg">{title}</h3>
        </div>
      )}
      
      {/* Buffering Indicator */}
      {isBuffering && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Play/Pause large center button (visible when paused or on hover) */}
      {(!isPlaying || isControlsVisible) && (
        <button 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-4 transition-opacity duration-300"
          onClick={togglePlay}
        >
          {isPlaying ? (
            <Pause className="h-8 w-8 text-white" />
          ) : (
            <Play className="h-8 w-8 text-white" />
          )}
        </button>
      )}
      
      {/* Controls (visible on hover or when paused) */}
      <div 
        className={cn(
          "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 transition-opacity duration-300",
          isControlsVisible ? "opacity-100" : "opacity-0"
        )}
      >
        {/* Progress bar */}
        <div className="mb-3">
          <Slider
            value={[progress]}
            min={0}
            max={100}
            step={0.1}
            onValueChange={handleSeek}
            className="h-1.5"
          />
        </div>
        
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {/* Play/Pause */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={togglePlay}
              className="h-8 w-8 text-white hover:bg-white/20"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
            
            {/* Skip Back/Forward if enabled */}
            {previousLessonUrl && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => window.location.href = previousLessonUrl}
                className="h-8 w-8 text-white hover:bg-white/20"
              >
                <SkipBack className="h-4 w-4" />
              </Button>
            )}
            
            {nextLessonUrl && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => window.location.href = nextLessonUrl}
                className="h-8 w-8 text-white hover:bg-white/20"
              >
                <SkipForward className="h-4 w-4" />
              </Button>
            )}
            
            {/* Volume */}
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleMute}
                className="h-8 w-8 text-white hover:bg-white/20"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </Button>
              
              <div className="hidden md:block w-20">
                <Slider
                  value={[isMuted ? 0 : volume]}
                  min={0}
                  max={1}
                  step={0.01}
                  onValueChange={handleVolumeChange}
                />
              </div>
            </div>
            
            {/* Time */}
            <div className="text-white text-sm">
              <span>{formatTime(currentTime)}</span>
              <span className="mx-1">/</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            {/* Playback rate */}
            <Badge 
              variant="outline" 
              className="text-white border-white/20 hover:bg-white/10"
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            >
              {playbackRate}x
            </Badge>
            
            {/* Notes button if available */}
            {notesUrl && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => window.open(notesUrl, '_blank')}
                className="h-8 w-8 text-white hover:bg-white/20"
              >
                <FileText className="h-4 w-4" />
              </Button>
            )}
            
            {/* Download button if allowed */}
            {allowDownload && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => {
                  const a = document.createElement('a');
                  a.href = src;
                  a.download = title || 'course-video';
                  a.click();
                }}
                className="h-8 w-8 text-white hover:bg-white/20"
              >
                <Download className="h-4 w-4" />
              </Button>
            )}
            
            {/* Settings */}
            <DropdownMenu open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-white hover:bg-white/20"
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40" align="end">
                <div className="p-2 text-sm font-medium">سرعت پخش</div>
                {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                  <DropdownMenuItem 
                    key={rate} 
                    onClick={() => changePlaybackRate(rate)}
                    className={cn(
                      "cursor-pointer",
                      playbackRate === rate && "bg-primary/10"
                    )}
                  >
                    {rate}x
                  </DropdownMenuItem>
                ))}
                
                <div className="p-2 text-sm font-medium">کیفیت</div>
                {["auto", "1080p", "720p", "480p", "360p"].map((q) => (
                  <DropdownMenuItem 
                    key={q} 
                    onClick={() => setQuality(q)}
                    className={cn(
                      "cursor-pointer",
                      quality === q && "bg-primary/10"
                    )}
                  >
                    {q}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Fullscreen */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleFullscreen}
              className="h-8 w-8 text-white hover:bg-white/20"
            >
              <Maximize className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
