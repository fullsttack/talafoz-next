import Header from "@/components/layouts/Header";  
import Slider from "@/components/layouts/Slider";

import AboutIndex from "@/components/layouts/AboutIndex";
import BlogList from "@/components/layouts/BlogList";
import FaqIndex from "@/components/layouts/FaqIndex";
import Footer from "@/components/layouts/Footer";


export default function Home() {
  return (
   <div className="w-full flex flex-col items-center justify-center gap-12">
    <Header />
    <Slider />

    <AboutIndex />
    <BlogList />
    <FaqIndex />
    <Footer />
   </div>
  );
}
