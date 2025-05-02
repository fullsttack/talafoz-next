import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, MessageCircle } from 'lucide-react';

interface BlogCardProps {
  image: string;
  title: string;
  author: string;
  description: string;
  date: string;
  id: number;
  likes: number;
  comments: number;
}

const BlogCard: React.FC<BlogCardProps> = ({ image, title, author, description, date, id, likes, comments }) => {
  return (
    <Link href={`/blog/${id}`} className="block group cursor-pointer" aria-labelledby={`blog-title-${id}`}>
      <div className="border rounded-2xl shadow-lg overflow-hidden flex flex-col relative transition-shadow group-hover:shadow-2xl group-hover:-translate-y-1 duration-200">
        <Image 
          width={320} 
          height={180} 
          src={image} 
          alt={`تصویر مقاله: ${title}`} 
          className="w-full h-48 object-cover" 
        />
        <div className="p-4 flex flex-col flex-1">
          <h2 id={`blog-title-${id}`} className="text-lg font-bold mb-1 text-gray-900 dark:text-gray-50">{title}</h2>
          <span className="text-xs text-gray-700 dark:text-gray-300 mb-2">نویسنده: {author}</span>
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-2 flex-1">{description}</p>
          <div className="flex items-center justify-between text-xs text-gray-700 dark:text-gray-300 mb-2">
            <span className="bg-primary/10 text-primary font-medium px-2 py-1 rounded-md">{date}</span>
            <span className="flex items-center gap-3">
              <span className="flex items-center gap-1" aria-label={`${likes} لایک`}>
                <Heart size={16} className="text-primary" />
                <span>{likes}</span>
              </span>
              <span className="flex items-center gap-1" aria-label={`${comments} نظر`}>
                <MessageCircle size={16} className="text-primary" />
                <span>{comments}</span>
              </span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;