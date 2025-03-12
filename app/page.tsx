import { Suspense, lazy } from "react";
import Header from "@/components/layout/Header";

// Lazy load components for better performance
const HeroTop = lazy(() => import("@/components/site/HeroTop"));

// Loading fallback components
const HeroTopSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-[70vh] w-full bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
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
    </div>
  );
}
