import React from "react";
import { blogs } from "../../_data/blog";
import BlogCard from "../blog/BlogCard";
import Link from "next/link";

const BlogList: React.FC = () => {
  return (
    <div className="w-full flex flex-col container mx-auto px-4 md:px-12 gap-6 py-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">
            آخرین مطالب وبلاگ
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400 text-xs">
            جدیدترین مقالات و مطالب آموزشی را اینجا بخوانید
          </p>
        </div>
        <Link href="/courses" className="text-sm text-gray-600 dark:text-gray-400">
          مشاهده همه
        </Link>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ">
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
    </div>
  );
};

export default BlogList;
