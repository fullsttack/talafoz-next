import { lazy } from "react";
import Header from "@/components/layout/Header";
import BannerDiscount from "@/components/site/BannerDiscount";
import Footer from "@/components/layout/Footer";
import PracticeBox from "@/components/site/PracticeBox";
// Lazy load components for better performance
const HeroTop = lazy(() => import("@/components/site/HeroTop"));
const LastCourse = lazy(() => import("@/components/site/LastCourse"));
const BestCourse = lazy(() => import("@/components/site/BestCourse"));
const LastBlog = lazy(() => import("@/components/site/LastBlog"));

// Configuration for better performance
export const dynamic = "force-static";
export const revalidate = 86400; // Cache for 24 hours
export const preferredRegion = "auto";

export default function Home() {
  return (
    <div className="w-full overflow-hidden px-2 sm:px-0">
      <Header />

      <div className="flex flex-col gap-24">
        <HeroTop />

        <LastCourse />

        <BannerDiscount />

        <BestCourse />

        <PracticeBox />

        <LastBlog />
      </div>

      <Footer />
    </div>
  );
}
