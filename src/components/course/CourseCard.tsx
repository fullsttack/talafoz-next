import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FileVideo2, Clock } from 'lucide-react';

interface CourseCardProps {
  image: string;
  title: string;
  description: string;
  price: string;
  episodes: number;
  duration: string;
  isFree: boolean;
  isVipFree?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ image, title, description, price, episodes, duration, isFree, isVipFree }) => {
  // For demo, link to /courses (can be changed to course detail page)
  return (
    <Link href="/courses" className="block group">
      <div className="border rounded-2xl shadow-lg overflow-hidden transition-shadow flex flex-col relative  cursor-pointer group-hover:shadow-2xl group-hover:-translate-y-1 duration-200">
        <Image width={320} height={180} src={image} alt={title} className="w-full h-48" />
        <div className="p-4 flex flex-col flex-1">
          <h2 className="text-lg font-bold mb-2">{title}</h2>
          <p className="text-gray-500 text-sm mb-4 flex-1">{description}</p>
          <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
            <span className="flex items-center gap-1"><FileVideo2 size={16} className="ml-1" /> <b>{episodes}</b></span>
            <span className="flex items-center gap-1"><Clock size={16} className="ml-1" /> <b>{duration}</b></span>
          </div>
          <div className="flex flex-col items-center gap-2 min-h-[56px] justify-center">
            {isFree ? (
              <span className="text-blue-700 font-bold text-xl">رایگان</span>
            ) : (
              <>
                {isVipFree && (
                  <span className="text-gray-500 text-xs font-semibold mb-1">رایگان برای اعضا ویژه</span>
                )}
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
