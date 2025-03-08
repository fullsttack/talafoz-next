"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";

// Dynamically import non-critical components
const BorderMagic = dynamic(
  () => import("../magicui/BorderMagic").then(mod => mod.BorderMagic),
  { ssr: true, loading: () => <Skeleton className="w-32 h-9 rounded-xl" /> }
);

const HeroVideo = dynamic(
  () => import("./HeroVideo"),
  { ssr: false, loading: () => <Skeleton className="w-full h-full" /> }
);

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

  useEffect(() => {
    let idleCallbackId: number | NodeJS.Timeout;

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      idleCallbackId = window.requestIdleCallback(() => setIsLoading(false));
    } else {
      idleCallbackId = setTimeout(() => setIsLoading(false), 1000);
    }
    
    return () => {
      if (typeof window !== 'undefined' && 'cancelIdleCallback' in window && 'requestIdleCallback' in window) {
        window.cancelIdleCallback(idleCallbackId as number);
      } else {
        clearTimeout(idleCallbackId as NodeJS.Timeout);
      }
    };
  }, []);

  return (
    <div className="mt-12 md:mt-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center w-full gap-8">
          {/* Priority content for LCP */}
          <div className="w-full flex flex-col gap-4 mt-8 md:mt-0">
            <p className="text-xl md:text-3xl font-bold">
              زمان و دانش بزرگ ترین سرمایه هر انسان است ...
            </p>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
              استفاده از طراحان گرافیک است.
            </p>

            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 mt-6 md:mt-12">
              <Link
                href="/"
                className="w-32 text-center border bg-emerald-700 text-white px-2 py-1.5 rounded-xl"
              >
                مشاهده دوره ها
              </Link>
              {!isLoading && <Link href="/"><BorderMagic /></Link>}
            </div>
          </div>

          <div
            dir="ltr"
            className="w-full max-w-full md:max-w-[50%] flex justify-center md:justify-end"
          >
            <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden rounded-lg">
              {isLoading ? (
                <Skeleton className="w-full h-full" />
              ) : (
                <HeroVideo />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
