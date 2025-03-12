import { Suspense, lazy } from "react";
import Header from "@/components/layout/Header";

// Lazy load components for better performance
const HeroTop = lazy(() => import("@/components/site/HeroTop"));
const LastCourse = lazy(() => import("@/components/site/LastCourse"));

// Loading fallback components
const HeroTopSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-[70vh] w-full bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
  </div>
);

const LastCourseSkeleton = () => (
  <div className="container mx-auto my-16 px-4 sm:px-6 lg:px-8 animate-pulse">
    <div className="h-10 w-64 bg-gray-200 dark:bg-gray-800 rounded mb-4"></div>
    <div className="h-5 w-96 bg-gray-200 dark:bg-gray-800 rounded mb-8"></div>
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="h-80 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
      ))}
    </div>
  </div>
);

// Configuration for better performance
export const dynamic = 'force-static';
export const revalidate = 86400; // Cache for 24 hours
export const preferredRegion = 'auto';

export default function Home() {
  return (
    <div className="w-full overflow-hidden px-2 sm:px-0">
      <Header />

      <Suspense fallback={<HeroTopSkeleton />}>
        <HeroTop />
      </Suspense>

      <Suspense fallback={<LastCourseSkeleton />}>
        <LastCourse />
      </Suspense>
      
    </div>
  );
}
