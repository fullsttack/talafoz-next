"use client"
import { useRef, useEffect, Suspense } from "react";
import CourseCard from "../course/CourseCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../ui/carousel";
import { courses } from "../../data/course";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

const CourseList: React.FC = () => {
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

  if (!courses || courses.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        در حال حاضر دوره‌ای برای نمایش وجود ندارد.
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col container mx-auto px-4 md:px-12 gap-6 pt-24 md:pt-36 py-8">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">
            جدید ترین دوره ‌ها
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400 text-xs">
            جدیدترین دوره‌ها را از اینجا مشاهده کنید
          </p>
        </div>
        <Link href="/courses" className="text-sm text-gray-600 dark:text-gray-400">
          مشاهده همه
        </Link>
      </div>
      <div className="relative" dir="rtl">
        <Suspense
          fallback={
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-80 w-full rounded-2xl" />
              ))}
            </div>
          }
        >
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
                  className="basis-[80%] md:basis-1/3 lg:basis-1/4 xl:basis-[22%]"
                >
                  <CourseCard {...course} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </Suspense>
      </div>
    </div>
  );
};

export default CourseList;
