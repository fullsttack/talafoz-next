"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { blogs } from "@/components/data/blog";
import BlogCard from "@/components/blog/BlogCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function LastBlog() {
  const [isClient, setIsClient] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Set isClient to true when component mounts (client-side only)
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle initial layout issue with a small delay after render
  useEffect(() => {
    if (isClient && carouselRef.current) {
      // Force a reflow after initial render to fix positioning
      const timer = setTimeout(() => {
        if (carouselRef.current) {
          // This forces a reflow of the carousel container
          const currentScroll = carouselRef.current.scrollLeft;
          carouselRef.current.scrollLeft = 1;
          carouselRef.current.scrollLeft = currentScroll;
        }
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [isClient]);

  // Sort blogs by date (newest first) and take the latest 8
  const latestBlogs = [...blogs]
    .sort(
      (a, b) => {
        // Convert Persian dates (1403/04/15) to numbers for comparison
        const [aYear, aMonth, aDay] = a.date.split('/').map(Number);
        const [bYear, bMonth, bDay] = b.date.split('/').map(Number);
        
        if (aYear !== bYear) return bYear - aYear; 
        if (aMonth !== bMonth) return bMonth - aMonth;
        return bDay - aDay;
      }
    )
    .slice(0, 8);

  return (
    <section className="container mx-auto max-w-7xl my-16 px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            آخرین مقالات
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            جدیدترین مقالات و آموزش‌ها را از اینجا مشاهده کنید
          </p>
        </div>
        <div>
          <Link
            href="/blog"
            className="mt-4 flex items-center gap-2 self-start text-primary hover:text-primary/90 sm:mt-4"
          >
            <span>مشاهده همه مقالات</span>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Blog Layout */}
      {!isClient ? (
        // Simple placeholder while client-side code is initializing
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latestBlogs.slice(0, 3).map((blog, index) => (
            <BlogCard 
              key={blog.id} 
              blog={blog} 
              featured={index === 0}
            />
          ))}
        </div>
      ) : latestBlogs.length > 0 ? (
        <div className="relative" dir="rtl">
          <Carousel
            opts={{
              align: "start",
              loop: true,
              containScroll: "keepSnaps",
              dragFree: true,
              direction: "rtl",
            }}
            className="w-full overflow-visible"
            dir="rtl"
          >
            <CarouselContent className="gap-4" ref={carouselRef}>
              {latestBlogs.map((blog, index) => (
                <CarouselItem
                  key={blog.id}
                  className="basis-[85%] sm:basis-[45%] md:basis-[45%] lg:basis-[30%]"
                >
                  <BlogCard blog={blog} featured={index === 0} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      ) : (
        // No blogs available
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          در حال حاضر مقاله‌ای برای نمایش وجود ندارد.
        </div>
      )}
    </section>
  );
}
