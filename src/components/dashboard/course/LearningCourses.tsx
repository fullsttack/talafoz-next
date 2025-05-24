'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import LearningCourseCard from './LearningCourseCard';
import { courses } from '@/data/course';
import {
  Carousel,
  CarouselContent,
  CarouselItem,

} from "@/components/ui/carousel";
import { Suspense } from 'react';
import { Skeleton } from "@/components/ui/skeleton";

interface LearningCourse {
  id: number;
  image: string;
  title: string;
  instructor: string;
  progress: number;
  episodes: number;
  duration: string;
  lastActivity?: string;
}

const LearningCourses: React.FC = () => {
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

  // get courses from api
  const inProgressCourses: LearningCourse[] = courses.slice(0, 10).map((course, index) => ({
    id: course.id,
    image: course.image,
    title: course.title,
    instructor: course.instructor,
    progress: index % 3 === 0 ? 65 : index % 3 === 1 ? 30 : 15, // random progress
    episodes: course.episodes,
    duration: course.duration,
    lastActivity: index % 3 === 0 ? 'دیروز' : index % 3 === 1 ? '۳ روز پیش' : '۱ هفته پیش'
  }));

  return (
    <div className="flex flex-col gap-4 mt-12">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-bold">دوره‌های در حال یادگیری</h2>
        <Link
          href="/courses/in-progress"
          className="flex items-center gap-2 text-sm text-primary"
        >
          مشاهده همه
          <ChevronLeft size={16} />
        </Link>
      </div>

      <div className="relative ">
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
              {inProgressCourses.map((course) => (
                <CarouselItem
                  key={course.id}
                  className="basis-[80%] md:basis-1/3 lg:basis-1/4 xl:basis-[22%]"
                >
                  <LearningCourseCard
                    id={course.id}
                    title={course.title}
                    instructor={course.instructor}
                    progress={course.progress}
                    image={course.image}
                    episodes={course.episodes}
                    duration={course.duration}
                    lastActivity={course.lastActivity}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </Suspense>
      </div>
    </div>
  );
};

export default LearningCourses; 