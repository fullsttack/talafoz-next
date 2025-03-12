import Header from "@/components/layout/Header";
import HeroTop from "@/components/site/HeroTop";
import LastCourse from "@/components/site/LastCourse";

// Loading fallback components

// Configuration for better performance
export const dynamic = "force-static";
export const revalidate = 86400; // Cache for 24 hours
export const preferredRegion = "auto";

export default function Home() {
  return (
    <div className="w-full overflow-hidden px-2 sm:px-0">
      <Header />
      <HeroTop />
      <LastCourse />
    </div>
  );
}
