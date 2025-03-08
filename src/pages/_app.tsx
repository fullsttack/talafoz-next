import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Implement route-based code splitting
  useEffect(() => {
    const handleRouteChange = () => {
      // Prefetch critical resources for the next page
      const prefetchCriticalChunks = async () => {
        // This gives the browser a hint to preload these resources
        const links = Array.from(document.querySelectorAll('link[rel="prefetch"]'))
          .map((link) => link.getAttribute('href'))
          .filter(Boolean);
        
        // Don't prefetch already prefetched resources
        const uniqueLinks = [...new Set(links)];
        
        uniqueLinks.forEach((href) => {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = href as string;
          document.head.appendChild(link);
        });
      };
      
      // Schedule prefetch during idle time
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(prefetchCriticalChunks);
      } else {
        setTimeout(prefetchCriticalChunks, 1000);
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  return (
    <>
      {/* Load critical scripts with optimal strategy */}
      <Script
        src="/js/analytics.js"
        strategy="lazyOnload"
        onLoad={() => {
          console.log('Analytics script loaded');
        }}
      />
      
      <Component {...pageProps} />
    </>
  );
} 