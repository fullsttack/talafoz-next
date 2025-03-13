'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Clock, User, Calendar } from 'lucide-react';

import { Blog } from '@/components/data/blog';

interface BlogCardProps {
  blog: Blog;
  featured?: boolean;
}

export const BlogCard = ({ blog, featured = false }: BlogCardProps) => {
  const {
    id,
    title,
    description,
    author,
    authorImageUrl,
    imageUrl,
    date,
    readTime,
    category
  } = blog;

  // Format description based on whether it's a featured card
  const formattedDescription = featured 
    ? description 
    : description.length > 120 
      ? `${description.substring(0, 120)}...` 
      : description;

  return (
    <div className="group h-full overflow-hidden rounded-2xl border  shadow-md transition-all hover:-translate-y-1 hover:shadow-lg ">
      <Link href={`/blog/${id}`} className="block h-full">
        <div className="flex h-full flex-col">
          {/* Image container */}
          <div className="relative overflow-hidden pt-[56.25%]"> {/* 16:9 aspect ratio */}
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Category badge */}
            <div className="absolute right-3 top-3 rounded-full bg-primary/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              {category}
            </div>
          </div>
          
          {/* Content */}
          <div className="flex flex-1 flex-col p-5">
            {/* Title */}
            <h3 className="mb-2 text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-primary dark:text-white">
              {title}
            </h3>
            
            {/* Description */}
            <p className="mb-4 text-gray-600 line-clamp-2 dark:text-gray-400">
              {formattedDescription}
            </p>
            
            {/* Meta information */}
            <div className="mt-auto border-t border-gray-100 pt-4 dark:border-gray-700">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-gray-600 dark:text-gray-400">
                {/* Author */}
                <div className="flex items-center gap-1.5">
                  {authorImageUrl ? (
                    <Image 
                      src={authorImageUrl} 
                      alt={author} 
                      width={20} 
                      height={20} 
                      className="rounded-full"
                    />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                  <span>{author}</span>
                </div>
                
                {/* Date */}
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <span>{date}</span>
                </div>
                
                {/* Read time */}
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>{readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;
