"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BorderMagic } from "../magicui/BorderMagic";
import HeroVideo from "./HeroVideo";
import { Skeleton } from "@/components/ui/skeleton";

export default function Hero() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate content loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mt-12 md:mt-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center w-full gap-8">
          {isLoading ? (
            // Skeleton loader
            <div className="w-full flex flex-col gap-4 mt-8 md:mt-0">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-20 w-full" />
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 mt-6 md:mt-12">
                <Skeleton className="w-32 h-9 rounded-xl" />
                <Skeleton className="w-32 h-9 rounded-xl" />
              </div>
            </div>
          ) : (
            // Actual content
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
                  className="w-32 text-center border  bg-green text-foreground px-2 py-1.5 rounded-xl"
                >
                  مشاهده دوره ها
                </Link>
                <Link href="/" className="">
                  <BorderMagic />
                </Link>
              </div>
            </div>
          )}

          <div
            dir="ltr"
            className="w-full max-w-full md:max-w-[50%] flex justify-center md:justify-end"
          >
            <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden rounded-lg">
              {isLoading ? (
                // Video skeleton loader
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
