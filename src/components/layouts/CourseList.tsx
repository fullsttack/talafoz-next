"use client"

import { useRef, useEffect } from "react";
import CourseCard from "../course/CourseCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../ui/carousel";
import { Course } from "../../_data/course";

interface CourseListProps {
  courses: Course[];
}

const CourseList: React.FC<CourseListProps> = ({ courses }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  // اگر نیاز به تعیین نوع کاربر داری، اینجا مقداردهی کن
  // const isPremiumUser = false;

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
    <div className="w-full flex flex-col container mx-auto px-4 md:px-12 gap-6 pt-24 md:pt-4 py-4">
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
            آخرین دوره‌ های آموزشی
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400 text-xs">
            جدیدترین دوره‌ها را از اینجا مشاهده کنید
          </p>
        </div>
      </div>
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
                className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-[22%]"
              >
                <CourseCard {...course} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default CourseList;
