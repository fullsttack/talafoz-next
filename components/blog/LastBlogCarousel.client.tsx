"use client";

import { useRef, useEffect } from "react";
import BlogCard from "@/components/blog/BlogCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Blog } from "@/components/data/blog";

export default function LastBlogCarousel({ blogs }: { blogs: Blog[] }) {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carouselRef.current) {
      const timer = setTimeout(() => {
        if (carouselRef.current) {
          const currentScroll = carouselRef.current.scrollLeft;
          carouselRef.current.scrollLeft = 1;
          carouselRef.current.scrollLeft = currentScroll;
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!blogs || blogs.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        در حال حاضر مقاله‌ای برای نمایش وجود ندارد.
      </div>
    );
  }

  return (
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
          {blogs.map((blog, index) => (
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
  );
} 