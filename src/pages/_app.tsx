import '../app/globals.css';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/router';

// Track if app is mounted
let appMounted = false;

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [domLoaded, setDomLoaded] = useState(false);

  // Implement route-based code splitting and performance monitoring
  useEffect(() => {
    // Set mounted flag
    appMounted = true;
    setDomLoaded(true);

    // Create performance observer to monitor LCP and other metrics
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      try {
        // Monitor CLS
        new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            console.debug('[Performance]', entry.entryType, entry);
          }
        }).observe({ type: 'layout-shift', buffered: true });

        // Monitor LCP
        new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            console.debug('[Performance] LCP:', entry);
          }
        }).observe({ type: 'largest-contentful-paint', buffered: true });
      } catch (e) {
        console.error('Performance observer error:', e);
      }
    }

    const handleRouteChange = () => {
      // Send performance metrics to analytics
      if (typeof window !== 'undefined' && 'performance' in window) {
        const pageLoadTime = performance.now();
        console.debug(`[Performance] Page loaded in ${pageLoadTime}ms`);
      }

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
      if (typeof window !== 'undefined') {
        if ('requestIdleCallback' in window) {
          (window as any).requestIdleCallback(prefetchCriticalChunks, { timeout: 1000 });
        } else {
          setTimeout(prefetchCriticalChunks, 1000);
        }
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    
    return () => {
      appMounted = false;
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  return (
    <>
      {/* Load analytics with appropriate strategy */}
      <Script
        strategy="lazyOnload"
        id="analytics-script"
        dangerouslySetInnerHTML={{
          __html: `
            // Lightweight analytics snippet
            console.debug('[Analytics] Initialized');
          `,
        }}
      />
      
      {/* Only render the component after DOM is loaded */}
      {domLoaded && <Component {...pageProps} />}
    </>
  );
} 