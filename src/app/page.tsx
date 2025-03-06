import Hero from "@/components/site/Hero";
import { Header } from "@/components/layout/Header";
import { LastCourse } from "@/components/course/LastCourse";
export default function Home() {
  return (
    <div className="">
      <Header />
      <div className="w-full flex flex-col gap-32 max-w-7xl mx-auto">
        <Hero />
        <LastCourse />
      </div>
    </div>
  );
}
