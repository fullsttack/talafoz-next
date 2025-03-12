import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Suspense } from "react";

import { courses } from "@/components/data/course";
import CourseContent from "@/components/course/CourseContent";
import Header from "@/components/layout/Header";
interface CoursePageProps {
  params: {
    id: string;
  };
}

// Generate static params for all courses
export async function generateStaticParams() {
  return courses.map((course) => ({
    id: course.id,
  }));
}

// Set dynamic mode to force-static for static export and improved performance
export const dynamic = "force-static";
export const revalidate = 3600; // Cache for 1 hour
export const preferredRegion = "auto"; // Performance optimization

export default async function CoursePage({ params }: CoursePageProps) {
  // Access params directly
  const id = params.id;

  // Find course by ID
  const course = courses.find((course) => course.id === id);

  // If course not found, show 404 page
  if (!course) {
    notFound();
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Breadcrumb navigation */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/courses" className="hover:text-primary">
              دوره‌ها
            </Link>
            <ChevronLeft className="h-4 w-4" />
            <span>{course.title}</span>
          </div>
        </div>

        {/* Course header */}
        <div className="mb-10">
          <h1 className="mb-4 text-xl md:text-3xl font-extrabold text-center md:text-right mt-12">{course.title}</h1>
        </div>

        {/* Course content with Suspense for improved loading */}
        <Suspense
          fallback={
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                {/* Video player skeleton */}
                <div className="mb-10">
                  <div className="aspect-video w-full bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
                </div>

                {/* Course info skeleton */}
                <div className="mb-10 space-y-4">
                  <div className="h-7 bg-gray-200 dark:bg-gray-800 rounded-md w-1/3 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-md w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-md w-5/6 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-md w-4/6 animate-pulse"></div>
                </div>

                {/* Chapters skeleton */}
                <div className="mb-10 space-y-4">
                  <div className="h-7 bg-gray-200 dark:bg-gray-800 rounded-md w-1/4 animate-pulse"></div>
                  <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded-md w-full animate-pulse"></div>
                  <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded-md w-full animate-pulse"></div>
                  <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded-md w-full animate-pulse"></div>
                </div>
              </div>

              {/* Sidebar skeleton */}
              <div className="lg:col-span-1">
                <div className="h-80 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
              </div>
            </div>
          }
        >
          <CourseContent course={course} initialEpisodeId={undefined} />
        </Suspense>
      </div>
    </div>
  );
}
