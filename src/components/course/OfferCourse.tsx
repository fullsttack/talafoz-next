"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CourseCart, { CourseType } from "./CourseCart";

// Recommended Course data
const RECOMMENDED_COURSES: CourseType[] = [
  {
    id: 4,
    title: "برنامه‌نویسی پایتون پیشرفته",
    description:
      "یادگیری پایتون پیشرفته برای توسعه نرم‌افزار، هوش مصنوعی و تحلیل داده",
    image: "/image/next.jpg",
    duration: "۱۲ هفته",
    level: "سطح پیشرفته",
    price: "۳,۲۰۰,۰۰۰ تومان",
    instructor: "رضا کریمی",
    rating: 4.9,
    students: 780,
    tags: ["Python", "AI", "Data Science"],
    discount: 25,
    isTrending: true,
    gradientFrom: "#8B5CF6",
    gradientTo: "#EC4899",
  },
  {
    id: 5,
    title: "آموزش جامع فلاتر",
    description:
      "ساخت اپلیکیشن‌های موبایل چندسکویی با فلاتر و دارت برای iOS و اندروید",
    image: "/image/next.jpg",
    duration: "۱۰ هفته",
    level: "سطح متوسط",
    price: "۲,۵۰۰,۰۰۰ تومان",
    instructor: "زهرا احمدی",
    rating: 4.7,
    students: 650,
    tags: ["Flutter", "Dart", "Mobile"],
    discount: 15,
    isTrending: true,
    gradientFrom: "#0EA5E9",
    gradientTo: "#10B981",
  },
  {
    id: 6,
    title: "امنیت وب و شبکه",
    description:
      "آموزش اصول امنیت سایبری، تست نفوذ و محافظت از برنامه‌های تحت وب",
    image: "/image/next.jpg",
    duration: "۸ هفته",
    level: "سطح متوسط تا پیشرفته",
    price: "۳,۸۰۰,۰۰۰ تومان",
    instructor: "امیر حسینی",
    rating: 4.8,
    students: 420,
    tags: ["Security", "Ethical Hacking", "Web"],
    discount: 10,
    isTrending: false,
    gradientFrom: "#F43F5E",
    gradientTo: "#8B5CF6",
  },
];

export default function OfferCourse() {
  const { theme } = useTheme();
  const gradientColor = theme === "dark" ? "#262626" : "#D9D9D955";

  return (
    <div>
      {/* Header section with title and view all button */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-bold mb-2">محبوب ترین دوره ها</h2>
          <p className="text-muted-foreground max-w-xl">
            محبوب ترین و تخصصی ترین دوره ها وبسایت تلفظ
          </p>
        </div>
        
        <Link href="/blog" className="mt-2 md:mt-0">
          <Button variant="outline" className="rounded-full group">
            <span>مشاهده همه</span>
            <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {RECOMMENDED_COURSES.map((course) => (
          <CourseCart 
            key={course.id} 
            course={course} 
            gradientColor={gradientColor}
            showLikeButton={true}
          />
        ))}
      </div>
    </div>
  );
} 