"use client";
import React, { Suspense, lazy, useEffect, useState } from "react";
// Don't import SparklesCore directly
// import { SparklesCore } from "../ui/sparkles";

// Lazy load SparklesCore
const SparklesCore = lazy(() => import("../ui/sparkles").then(mod => ({ 
  default: mod.SparklesCore 
})));

export function SparklesPreview() {
  const [shouldLoad, setShouldLoad] = useState(false);
  
  useEffect(() => {
    // Defer loading of SparklesCore until after page is interactive
    let timeout: NodeJS.Timeout;
    
    if (typeof window !== "undefined") {
      timeout = setTimeout(() => {
        setShouldLoad(true);
      }, 2000); // Delay loading by 2 seconds
    }
    
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="w-full bg-background flex flex-col items-center justify-center overflow-hidden rounded-md">
      <div className="w-[40rem] relative">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

        {/* Core component - load only after certain delay */}
        {shouldLoad ? (
          <Suspense fallback={
            <div className="w-full h-10 bg-background"></div>
          }>
            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={800} /* Reduced from 1200 */
              className="w-full h-full"
              particleColor="#54b7bc"
            />
          </Suspense>
        ) : (
          <div className="w-full h-10 bg-background"></div>
        )}

        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 w-full h-full bg-background [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
  );
}
