"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import CartBlog from "./CartBlog";

// Fake blog data for the homepage
const fakeBlogPosts = [
  {
    id: 1,
    title: "راهنمای کامل استفاده از دیتابیس MongoDB در پروژه‌های nextjs",

    description:
      "در این دوره آموزشی، از صفر تا صد ری‌اکت را یاد می‌گیرید. از مفاهیم پایه مانند کامپوننت‌ها و هوک‌ها تا مباحث پیشرفته مانند Context API و Redux. با تمرین‌های عملی و پروژه‌های واقعی، مهارت‌های خود را تقویت کنید.",
    category: "فرانت‌اند",
    tags: ["React", "JavaScript", "Frontend", "Redux", "Hooks"],
    readTime: "15 دقیقه",
    date: "12 مرداد 1402",
    viewCount: 1240,
    imageUrl: "/image/vscode.jpg",
    slug: "react-js-tutorial-beginner-to-advanced",
  },
  {
    id: 2,
    title: "راهنمای کامل استفاده از دیتابیس MongoDB در پروژه‌های Node.js",
    description:
      "مونگو دی‌بی یکی از محبوب‌ترین پایگاه‌های داده غیررابطه‌ای است که در توسعه وب مدرن کاربرد فراوانی دارد. در این مقاله، نحوه نصب، راه‌اندازی و استفاده از مونگو دی‌بی در پروژه‌های نود جی‌اس را با مثال‌های کاربردی یاد می‌گیرید.",
    category: "دیتابیس",
    tags: ["MongoDB", "Node.js", "Database", "NoSQL", "Backend"],
    readTime: "12 دقیقه",
    date: "7 شهریور 1402",
    viewCount: 985,
    imageUrl: "/image/vscode.jpg",
    slug: "mongodb-complete-guide-with-nodejs",
  },
  {
    id: 3,
    title: "آشنایی با هوش مصنوعی و یادگیری ماشین برای برنامه‌نویسان",
    description:
      "هوش مصنوعی و یادگیری ماشین به سرعت در حال تغییر دنیای برنامه‌نویسی هستند. در این مقاله با مفاهیم پایه و کاربردهای هوش مصنوعی در توسعه نرم‌افزار آشنا می‌شوید و یاد می‌گیرید چگونه می‌توانید این تکنولوژی‌ها را در پروژه‌های خود به کار ببرید.",
    category: "هوش مصنوعی",
    tags: ["AI", "Machine Learning", "Python", "TensorFlow", "Data Science"],
    readTime: "20 دقیقه",
    date: "23 مهر 1402",
    viewCount: 1520,
    imageUrl: "/image/vscode.jpg",
    slug: "ai-machine-learning-for-programmers",
  },
];

export default function LastBlog() {
  return (
    <section className="">
      {/* Header section with title and view all button */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-bold mb-2">آخرین مقالات</h2>
          <p className="text-muted-foreground max-w-xl">
            جدیدترین و تخصصی ترین مقالات وبسایت تلفظ
          </p>
        </div>

        <Link href="/blog" className="mt-2 md:mt-0">
          <Button variant="outline" className="rounded-full group">
            مشاهده همه
            <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {fakeBlogPosts.map((post) => (
          <CartBlog key={post.id} {...post} />
        ))}
      </div>
    </section>
  );
}
