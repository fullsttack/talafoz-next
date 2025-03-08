'use client'

import { Button } from "@/components/ui/button";
import CartBlog from "./CartBlog";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";


const sampleBlogs = [
  {
    id: '1',
    title: 'آموزش اصول طراحی وب‌سایت واکنش‌گرا',
    excerpt: 'در این مقاله به بررسی اصول طراحی واکنش‌گرا و نحوه پیاده‌سازی آن با استفاده از HTML و CSS می‌پردازیم.',
    slug: 'responsive-web-design',
    coverImage: '/image/next.jpg',
    author: {
      name: 'علی محمدی',
      avatar: '/globe.svg'
    },
    category: 'طراحی وب',
    publishDate: '۱۵ خرداد ۱۴۰۳',
    readTime: '۷ دقیقه',
    isFeatured: true
  },
  {
    id: '2',
    title: 'معرفی ۱۰ کتابخانه کاربردی React برای توسعه‌دهندگان',
    excerpt: 'آشنایی با ۱۰ کتابخانه پرکاربرد در React که به شما در افزایش سرعت توسعه و بهبود کیفیت پروژه‌های شما کمک می‌کند.',
    slug: 'top-10-react-libraries',
    coverImage: '/image/next.jpg',
    author: {
      name: 'مریم حسینی',
      avatar: '/globe.svg'
    },
    category: 'فرانت‌اند',
    publishDate: '۸ خرداد ۱۴۰۳',
    readTime: '۹ دقیقه',
    isFeatured: false
  },
  {
    id: '3',
    title: 'آشنایی با پایگاه داده MongoDB و مزایای آن',
    excerpt: 'در این مقاله به بررسی پایگاه داده MongoDB و مزایای استفاده از آن در مقایسه با پایگاه‌های داده رابطه‌ای می‌پردازیم.',
    slug: 'intro-to-mongodb',
    coverImage: '/image/next.jpg',
    author: {
      name: 'حسین رضایی',
      avatar: '/globe.svg'
    },
    category: 'بک‌اند',
    publishDate: '۲ خرداد ۱۴۰۳',
    readTime: '۶ دقیقه',
    isFeatured: false
  }
];

export default function LastBlog() {
  return (
    <section className="py-16 container">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-bold mb-2">آخرین مقالات</h2>
          <p className="text-muted-foreground max-w-xl">
            جدیدترین و کاربردی‌ترین مقالات در حوزه برنامه‌نویسی و طراحی وب
          </p>
        </div>
        
        <Link href="/blog" className="mt-4 md:mt-0">
          <Button variant="outline" className="rounded-full group">
            <span>مشاهده همه مقالات</span>
            <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
          </Button>
        </Link>
      </div>
      
      {/* Featured Blog - First item */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleBlogs.map(blog => (
          <CartBlog 
            key={blog.id}
            title={blog.title}
            excerpt={blog.excerpt}
            slug={blog.slug}
            coverImage={blog.coverImage}
            author={blog.author}
            category={blog.category}
            publishDate={blog.publishDate}
            readTime={blog.readTime}
            isFeatured={blog.isFeatured}
          />
        ))}
      </div>
      
    </section>
  );
}
