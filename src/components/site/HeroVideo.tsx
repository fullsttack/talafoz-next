"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";

// Dynamically import the LottieReact component with SSR disabled
const LottieReact = dynamic(() => import("lottie-react"), {
  ssr: false,
});

export default function HeroVideo() {
  const [animationData, setAnimationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load the coding.json file instead of hero.json
    fetch("/json/hero-2.json")
      .then((response) => response.json())
      .then((data) => {
        setAnimationData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error loading Lottie animation:", error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading || !animationData) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Skeleton className="w-full h-full flex items-center justify-center">
          <Skeleton className="w-20 h-20 rounded-full" />
        </Skeleton>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto flex items-center justify-center">
      <div className="relative">
        <LottieReact
          animationData={animationData}
          loop={true}
          autoplay={true}
        />
      </div>
    </div>
  );
}
