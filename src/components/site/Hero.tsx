"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import { SparklesPreview } from "@/components/ui/SparklesPreview";
// Preloaded critical text content
const HERO_TITLE = "زمان و دانش بزرگ ترین سرمایه هر انسان است ...";
const HERO_DESCRIPTION =
  "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.";

// Dynamically import non-critical components
const BorderMagic = dynamic(
  () => import("../magicui/BorderMagic").then((mod) => mod.BorderMagic),
  { ssr: true, loading: () => <Skeleton className="w-32 h-9 rounded-xl" /> }
);

const HeroVideo = dynamic(() => import("./HeroVideo"), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-full" />,
});

// TypeScript declaration for requestIdleCallback
declare global {
  interface Window {
    requestIdleCallback: (
      callback: IdleRequestCallback,
      options?: IdleRequestOptions
    ) => number;
    cancelIdleCallback: (handle: number) => void;
  }
}

export default function Hero() {
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  useEffect(() => {
    let idleCallbackId: number | NodeJS.Timeout;

    // Use priority loading for critical content
    setIsLoading(false);

    // Load non-critical components only when browser is idle
    if (typeof window !== "undefined") {
      if ("requestIdleCallback" in window) {
        idleCallbackId = window.requestIdleCallback(
          () => {
            setIsVideoVisible(true);
          },
          { timeout: 2000 }
        );
      } else {
        idleCallbackId = setTimeout(() => {
          setIsVideoVisible(true);
        }, 1000);
      }
    }

    return () => {
      if (typeof window !== "undefined") {
        if ("cancelIdleCallback" in window && "requestIdleCallback" in window) {
          window.cancelIdleCallback(idleCallbackId as number);
        } else {
          clearTimeout(idleCallbackId as NodeJS.Timeout);
        }
      }
    };
  }, []);

  return (
    <div className="mt-12 md:mt-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center w-full gap-8">
          {/* Priority content for LCP - load immediately */}
          <div className="w-full flex flex-col gap-4 mt-8 md:mt-0 text-center md:text-right">
            {/* High priority - LCP element */}
            <p className="text-xl md:text-3xl font-bold">{HERO_TITLE}</p>
            {/* Text content - also high priority */}
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300">
              {HERO_DESCRIPTION}
            </p>

            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 mt-6 md:mt-12">
              {/* Primary CTA - high priority */}
              <Link
                href="/"
                className="w-32 text-center border bg-white-10 text-black px-2 py-1.5 rounded-xl"
                prefetch={false}
              >
                مشاهده دوره ها
              </Link>
              {/* Secondary elements - lower priority */}
              {!isLoading && (
                <Link href="/" prefetch={false}>
                  <BorderMagic />
                </Link>
              )}
            </div>
          </div>

          {/* Video section - lower priority, load after text content */}
          <div
            dir="ltr"
            className="w-full max-w-full md:max-w-[50%] flex justify-center md:justify-end"
          >
            <div className="relative w-full flex items-center justify-center overflow-hidden rounded-lg">
              {!isVideoVisible ? (
                <div className="w-full">
                  <Skeleton className="w-full aspect-video" />
                  {/* Reserve space for SparklesPreview with the proper height */}
                  <div className="h-14 md:h-16 w-full"></div>
                </div>
              ) : (
                <div className="w-full flex flex-col">
                  <div>
                    <HeroVideo />
                  </div>
                  {/* Fixed height container for SparklesPreview without negative margins */}
                  <div className="h-14 md:h-24 -mt-10 overflow-hidden w-full">
                    <SparklesPreview />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
