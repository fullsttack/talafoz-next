"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";

// Dynamically import the LottieReact component with SSR disabled and a loading placeholder
const LottieReact = dynamic(() => import("lottie-react"), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-video flex items-center justify-center">
      <Skeleton className="w-full h-full" />
    </div>
  )
});

export default function HeroVideo() {
  const [animationData, setAnimationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Add a small delay before loading animation to prioritize critical content
    const timer = setTimeout(() => {
      // Cache control with version parameter to help with cache busting when needed
      fetch("/json/hero-2.json?v=1")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to load animation");
          }
          return response.json();
        })
        .then((data) => {
          setAnimationData(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error loading Lottie animation:", error);
          setIsLoading(false);
          setHasError(true);
        });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="w-full aspect-video flex items-center justify-center">
        <Skeleton className="w-full h-full" />
      </div>
    );
  }

  if (hasError || !animationData) {
    return (
      <div className="w-full aspect-video flex items-center justify-center bg-gray-100 dark:bg-gray-800">
        <span className="text-gray-500">تصویر در دسترس نیست</span>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto flex items-center justify-center">
      <div className="relative w-full">
        <LottieReact
          animationData={animationData}
          loop={true}
          autoplay={true}
          rendererSettings={{
            preserveAspectRatio: "xMidYMid slice",
            progressiveLoad: true,
          }}
        />
      </div>
    </div>
  );
}
