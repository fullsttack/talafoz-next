export const experimental_ppr = true;
import { Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PracticeBox from "@/components/site/PracticeBox";
import HeroTop from "@/components/site/HeroTop";
import LastCourse from "@/components/site/LastCourse";
import BestCourse from "@/components/site/BestCourse";
import LastBlog from "@/components/site/LastBlog";

// Configuration for better performance
export const dynamic = "force-static";
export const revalidate = 86400; // Cache for 24 hours
export const preferredRegion = "auto";

export default function Home() {
  return (
    <div className="w-full overflow-hidden px-2 sm:px-0">
      <Suspense fallback={<div>در حال بارگذاری هدر...</div>}>
        <Header />
      </Suspense>

      <div className="flex flex-col gap-24">
        <Suspense fallback={<div>در حال بارگذاری بنر بالا...</div>}>
          <HeroTop />
        </Suspense>

        <Suspense fallback={<div>در حال بارگذاری آخرین دوره‌ها...</div>}>
          <LastCourse />
        </Suspense>


        <Suspense fallback={<div>در حال بارگذاری بهترین دوره‌ها...</div>}>
          <BestCourse />
        </Suspense>

        <Suspense fallback={<div>در حال بارگذاری باکس تمرین...</div>}>
          <PracticeBox />
        </Suspense>

        <Suspense fallback={<div>در حال بارگذاری آخرین مقالات...</div>}>
          <LastBlog />
        </Suspense>
      </div>

      <Suspense fallback={<div>در حال بارگذاری فوتر...</div>}>
        <Footer />
      </Suspense>
    </div>
  );
}
