"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { courses } from "@/components/data/course";

import BestCourseCarousel from '../blog/BestCourseCarousel.client';

export default function BestCourse() {
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

  // Sort courses by rating (highest first) and take the top 10
  const bestCourses = [...courses]
    .sort((a, b) => b.rating - a.rating || b.studentsCount - a.studentsCount)
    .slice(0, 10);

  return (
    <section className="container mx-auto max-w-7xl my-16 px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            محبوب‌ترین دوره‌ها
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            پرطرفدارترین دوره‌های آموزشی را از اینجا مشاهده کنید
          </p>
        </div>
        <div>
          <Link
            href="/courses"
            className="mt-4 flex items-center gap-2 self-start text-primary hover:text-primary/90 sm:mt-4"
          >
            <span>مشاهده همه دوره‌ها</span>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <BestCourseCarousel courses={bestCourses} />
    </section>
  );
} 