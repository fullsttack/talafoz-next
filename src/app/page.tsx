import Hero from "@/components/site/Hero";
import { Header } from "@/components/layout/Header";
import { LastCourse } from "@/components/course/LastCourse";
import BannerDiscount from "@/components/site/BannerDiscount";
import OfferCourse from "@/components/course/OfferCourse";
import SubCart from "@/components/subscription/SubCart";
import LastBlog from "@/components/blog/LastBlog";
import TechBanner from "@/components/site/TechBanner";
export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Header />
      <div className="w-full flex flex-col gap-44 max-w-7xl mx-auto">
        <Hero />
        <LastCourse />
        <BannerDiscount />
        <OfferCourse />
        <SubCart />
        <LastBlog />
        <TechBanner />
      </div>
    </div>
  );
}
