"use client";

import { useRef, useEffect } from "react";
import CourseCard from "@/components/course/CourseCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Course } from "@/components/data/course";

export default function BestCourseCarousel({ courses }: { courses: Course[] }) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const isPremiumUser = false;

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

  if (!courses || courses.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        در حال حاضر دوره‌ای برای نمایش وجود ندارد.
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
          {courses.map((course) => (
            <CarouselItem
              key={course.id}
              className="basis-[85%] md:basis-[45%] lg:basis-[30%] xl:basis-[30%]"
            >
              <CourseCard course={course} isPremiumUser={isPremiumUser} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
} 