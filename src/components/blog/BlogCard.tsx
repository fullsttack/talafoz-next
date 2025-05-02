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
    <Link href={`/blog/${id}`} className="block group cursor-pointer">
      <div className="border rounded-2xl shadow-lg overflow-hidden flex flex-col relative transition-shadow group-hover:shadow-2xl group-hover:-translate-y-1 duration-200 cursor-pointer">
        <Image width={320} height={180} src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="p-4 flex flex-col flex-1">
          <h2 className="text-lg font-bold mb-1">{title}</h2>
          <span className="text-xs text-gray-500 mb-2">نویسنده: {author}</span>
          <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-1">{description}</p>
          <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
            <span>{date}</span>
            <span className="flex items-center gap-3">
              <span className="flex items-center gap-1"><Heart size={16} className="" fill="" />{likes}</span>
              <span className="flex items-center gap-1"><MessageCircle size={16} className="text-gray-400" />{comments}</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
