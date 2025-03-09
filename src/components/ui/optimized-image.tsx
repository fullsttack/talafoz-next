import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  loading?: 'lazy' | 'eager';
}

export function OptimizedImage({
  src,
  alt,
  className,
  width = 0,
  height = 0,
  priority = false,
  fill = false,
  sizes = '100vw',
  loading,
  ...props
}: OptimizedImageProps & React.ImgHTMLAttributes<HTMLImageElement>) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Force eager loading for important images that might be LCP
  const shouldPrioritize = priority || (
    typeof window !== 'undefined' && 
    window.innerHeight > 0 && 
    height > 0 && 
    height <= window.innerHeight * 1.2
  );
  
  return (
    <div className={cn(
      'relative overflow-hidden', 
      !isLoaded && 'bg-muted/10 animate-pulse',
      className
    )}>
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        sizes={sizes}
        loading={shouldPrioritize ? 'eager' : loading || 'lazy'}
        priority={shouldPrioritize}
        quality={90}
        onLoad={() => setIsLoaded(true)}
        className={cn(
          'object-cover transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0',
        )}
        {...props}
      />
    </div>
  );
}

// Specially optimized for LCP (Largest Contentful Paint)
export function LCPImage(props: OptimizedImageProps) {
  return <OptimizedImage priority {...props} loading="eager" />;
} 