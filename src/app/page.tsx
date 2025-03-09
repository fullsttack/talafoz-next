import Hero from "@/components/site/Hero";
import { Header } from "@/components/layout/Header";
import { LastCourse } from "@/components/course/LastCourse";
import BannerDiscount from "@/components/site/BannerDiscount";
import OfferCourse from "@/components/course/OfferCourse";
import SubCart from "@/components/subscription/SubCart";
import LastBlog from "@/components/blog/LastBlog";
import TechBanner from "@/components/site/TechBanner";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="overflow-x-hidden flex flex-col min-h-screen">
      <Header />
      <div className="w-full flex flex-col gap-32 max-w-7xl mx-auto mb-32">
        <Hero />
        <LastCourse />
        <BannerDiscount />
        <OfferCourse />
        <SubCart />
        <LastBlog />
        <TechBanner />
      </div>
      <Footer />
    </div>
  );
}
