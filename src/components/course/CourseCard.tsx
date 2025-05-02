import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FileVideo2, Clock, Star } from 'lucide-react';

interface CourseCardProps {
  image: string;
  title: string;
  instructor: string;
  description: string;
  price: string;
  episodes: number;
  duration: string;
  isFree: boolean;
  isVipFree?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ image, title, instructor, description, price, episodes, duration, isFree, isVipFree }) => {
  // For demo, link to /courses (can be changed to course detail page)
  return (
    <Link href="/courses" className="block group">
      <div className="border rounded-2xl shadow-lg overflow-hidden flex flex-col relative transition-shadow group-hover:shadow-2xl group-hover:-translate-y-1 duration-200">
        {/* نشان اعضای ویژه */}
        {isVipFree && !isFree && (
          <span className="absolute top-3 left-3 flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold z-10 border border-yellow-300 shadow">
            <Star size={16} className="text-yellow-500" fill="#facc15" />
            رایگان برای اعضا ویژه
          </span>
        )}
        <Image width={320} height={180} src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="p-4 flex flex-col flex-1">
          <h2 className="text-lg font-bold mb-1">{title}</h2>
          <span className="text-xs text-gray-500 mb-2">مدرس: {instructor}</span>
          <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-1">{description}</p>
          <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
            <span className="flex items-center gap-1"><FileVideo2 size={16} className="ml-1" /> <b>{episodes} جلسه</b></span>
            <span className="flex items-center gap-1"><Clock size={16} className="ml-1" /> <b>{duration}</b></span>
          </div>
          <div className="flex flex-col items-center gap-2 min-h-[40px] justify-center">
            {isFree ? (
              <span className="text-blue-700 font-bold text-xl">رایگان</span>
            ) : (
              <>
                <span className="text-blue-700 font-bold text-xl">{price}</span>
              </>
            )}
          </div>
         
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
