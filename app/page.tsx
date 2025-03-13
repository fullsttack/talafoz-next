import { Suspense, lazy } from "react";
import Header from "@/components/layout/Header";
import BannerDiscount from "@/components/site/BannerDiscount";
import Footer from "@/components/layout/Footer";
// Lazy load components for better performance
const HeroTop = lazy(() => import("@/components/site/HeroTop"));
const LastCourse = lazy(() => import("@/components/site/LastCourse"));
const BestCourse = lazy(() => import("@/components/site/BestCourse"));
const LastBlog = lazy(() => import("@/components/site/LastBlog"));

// Loading fallback components
const HeroTopSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-[70vh] w-full bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
  </div>
);

const BannerDiscountSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-[70vh] w-full bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
  </div>
);

const CourseSkeleton = () => (
  <div className="container mx-auto max-w-7xl my-16 px-4 sm:px-6 lg:px-8 animate-pulse">
    {/* Header skeleton */}
    <div className="h-10 w-64 bg-gray-200 dark:bg-gray-800 rounded mb-4"></div>
    <div className="h-5 w-96 bg-gray-200 dark:bg-gray-800 rounded mb-8"></div>

    {/* Course cards skeleton - matches the initial grid layout */}
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="h-80 bg-gray-200 dark:bg-gray-800 rounded-xl"
        ></div>
      ))}
    </div>
  </div>
);

const BlogSkeleton = () => (
  <div className="container mx-auto max-w-7xl my-16 px-4 sm:px-6 lg:px-8 animate-pulse">
    {/* Header skeleton */}
    <div className="h-10 w-64 bg-gray-200 dark:bg-gray-800 rounded mb-4"></div>
    <div className="h-5 w-96 bg-gray-200 dark:bg-gray-800 rounded mb-8"></div>

    {/* Blog layout skeleton */}
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Featured blog skeleton */}
      <div className="lg:col-span-1">
        <div className="h-96 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
      </div>
      
      {/* Regular blogs skeleton */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="h-64 bg-gray-200 dark:bg-gray-800 rounded-xl"
          ></div>
        ))}
      </div>
    </div>
  </div>
);

// Configuration for better performance
export const dynamic = "force-static";
export const revalidate = 86400; // Cache for 24 hours
export const preferredRegion = "auto";

export default function Home() {
  return (
    <div className="w-full overflow-hidden px-2 sm:px-0">
      <Header />

      <div className="flex flex-col gap-24">
        <Suspense fallback={<HeroTopSkeleton />}>
          <HeroTop />
        </Suspense>

        <Suspense fallback={<CourseSkeleton />}>
          <LastCourse />
        </Suspense>

        <Suspense fallback={<BannerDiscountSkeleton />}>
          <BannerDiscount />
        </Suspense>

        <Suspense fallback={<CourseSkeleton />}>
          <BestCourse />
        </Suspense>
        
        <Suspense fallback={<BlogSkeleton />}>
          <LastBlog />
        </Suspense>
      </div>

      <Footer />
    </div>
  );
}
