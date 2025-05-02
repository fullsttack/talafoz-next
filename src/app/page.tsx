import Header from "@/components/layouts/Header";  
import Slider from "@/components/layouts/Slider";
import CourseList from "@/components/layouts/CourseList";
import BestCourse from "@/components/layouts/BestCourse";
import AboutIndex from "@/components/layouts/AboutIndex";
import BlogList from "@/components/layouts/BlogList";



export default function Home() {
  return (
   <div className="w-full flex flex-col items-center justify-center gap-12">
    <Header />
    <Slider />
    <CourseList/>
    <BestCourse />
    <AboutIndex />
    <BlogList />
   </div>
  );
}
