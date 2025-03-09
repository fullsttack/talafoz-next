"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CourseCart, { CourseType } from "./CourseCart";

// Course data
const COURSES: CourseType[] = [
  {
    id: 1,
    title: "مبانی توسعه وب",
    description:
      "ساخت اپلیکیشن‌های مدرن با ری‌اکت ساخت اپلیکیشن‌های مدرن با ری‌اکت ساخت اپلیکیشن‌های مدرن با ری‌اکت",

    image: "/image/next.jpg",
    duration: "۸ هفته",
    level: "سطح مبتدی",
    price: "۱,۵۰۰,۰۰۰ تومان",
    instructor: "علی محمدی",
    rating: 4.8,
    students: 1240,
    tags: ["HTML", "CSS", "JavaScript"],
    discount: 20,
    isTrending: true,
    gradientFrom: "#4F46E5",
    gradientTo: "#14B8A6",
  },
  {
    id: 2,
    title: "دوره جامع ری‌اکت و نکست‌جی‌اس",
    description:
      "ساخت اپلیکیشن‌های مدرن با ری‌اکت ساخت اپلیکیشن‌های مدرن با ری‌اکت ساخت اپلیکیشن‌های مدرن با ری‌اکت",
    image: "/image/next.jpg",
    duration: "۱۰ هفته",
    level: "سطح متوسط",
    price: "۲,۸۰۰,۰۰۰ تومان",
    instructor: "مهدی حسینی",
    rating: 4.9,
    students: 850,
    tags: ["React", "Next.js", "TypeScript"],
    discount: 15,
    isTrending: false,
    gradientFrom: "#4F46E5",
    gradientTo: "#14B8A6",
  },
  {
    id: 3,
    title: "اصول طراحی رابط کاربری",
    description:
      "ساخت اپلیکیشن‌های مدرن با ری‌اکت ساخت اپلیکیشن‌های مدرن با ری‌اکت ساخت اپلیکیشن‌های مدرن با ری‌اکت",
    image: "/image/next.jpg",
    duration: "۶ هفته",
    level: "همه سطوح",
    price: "۱,۹۵۰,۰۰۰ تومان",
    instructor: "سارا اکبری",
    rating: 4.7,
    students: 920,
    tags: ["UI", "UX", "Figma"],
    discount: 30,
    isTrending: true,
    gradientFrom: "#7E22CE",
    gradientTo: "#2DD4BF",
  },
];

export function LastCourse() {
  const { theme } = useTheme();
  const gradientColor = theme === "dark" ? "#262626" : "#D9D9D955";

  return (
    <div>
      {/* Header section with title and view all button */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-bold mb-2">آخرین دوره ها</h2>
          <p className="text-muted-foreground max-w-xl">
            جدیدترین و تخصصی ترین دوره ها وبسایت تلفظ
          </p>
        </div>
        
        <Link href="/courses" className="mt-2 md:mt-0">
          <Button variant="outline" className="rounded-full group">
            <span>مشاهده همه</span>
            <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {COURSES.map((course) => (
          <CourseCart 
            key={course.id} 
            course={course} 
            gradientColor={gradientColor}
          />
        ))}
      </div>
    </div>
  );
}
