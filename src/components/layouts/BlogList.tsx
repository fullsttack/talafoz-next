import React, { Suspense } from "react";
import { blogs } from "../../data/blog";
import BlogCard from "../blog/BlogCard";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

const BlogList: React.FC = () => {
  return (
    <section className="w-full flex flex-col container mx-auto px-4 md:px-12 gap-6 py-4" aria-labelledby="blog-heading">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 id="blog-heading" className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">
            آخرین مطالب وبلاگ
          </h2>
          <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm">
            جدیدترین مقالات و مطالب آموزشی را اینجا بخوانید
          </p>
        </div>
        <Link href="/blogs" className="text-sm text-gray-600 dark:text-gray-400">
          مشاهده همه
        </Link>
      </div>
      <Suspense
        fallback={
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8" aria-label="در حال بارگذاری مقالات">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-80 w-full rounded-2xl" aria-hidden="true" />
            ))}
          </div>
        }
      >
        <div 
          className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          aria-label="لیست مقالات وبلاگ"
        >
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              image={blog.image}
              title={blog.title}
              author={blog.author}
              description={blog.description}
              date={blog.date}
              likes={blog.likes}
              comments={blog.comments}
            />
          ))}
        </div>
      </Suspense>
    </section>
  );
};

export default BlogList;