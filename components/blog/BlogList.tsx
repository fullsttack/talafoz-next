'use client';

import React from 'react';
import { Blog } from '@/components/data/blog';
import BlogCard from './BlogCard';

export default function BlogList({ 
  blogs
}: { 
  blogs: Blog[]
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
} 