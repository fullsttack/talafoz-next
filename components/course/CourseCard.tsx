'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, Clock, Play, Crown, Gift, BookOpen } from 'lucide-react';

import { Course } from '@/components/data/course';

interface CourseCardProps {
  course: Course;
  isPremiumUser?: boolean;
}

export const CourseCard = ({ course, isPremiumUser = false }: CourseCardProps) => {
  const {
    id,
    title,
    description,
    price,
    discountPrice,
    duration,
    imageUrl,
    rating,
    categories,
    isFree,
    isFreePremium,
    sessionsCount = 0,
  } = course;

  // Format price for display
  const formattedPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price);
  };

  // Check if course is free for the current user
  const isFreeForUser = isFree || (isPremiumUser && isFreePremium);

  return (
    <div className="group relative h-full overflow-hidden rounded-2xl shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl">
      {/* Free course badge */}
      {isFree && (
        <div className="absolute left-4 top-4 z-20 flex items-center gap-1 rounded-full bg-green-500 px-3 py-1 text-xs font-bold text-white shadow-md">
          <Gift className="h-3.5 w-3.5" />
          <span>رایگان</span>
        </div>
      )}
      
      {/* Premium free course badge */}
      {!isFree && isFreePremium && (
        <div className="absolute left-4 top-4 z-20 flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 px-3 py-1 text-xs font-bold text-white shadow-md">
          <Crown className="h-3.5 w-3.5" />
          <span>رایگان برای اعضای ویژه</span>
        </div>
      )}
      
      {/* Main card container */}
      <Link href={`/courses/${id}`} className="block h-full">
        <div className="relative flex h-full flex-col bg-white dark:bg-gray-900">
          {/* Image section */}
          <div className="relative w-full overflow-hidden pt-[56.25%]"> {/* 16:9 aspect ratio */}
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/50 backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                <Play fill="white" className="h-7 w-7 text-white" />
              </div>
            </div>
          </div>
          
          {/* Course information */}
          <div className="flex flex-1 flex-col p-5">
            {/* Course title */}
            <h3 className="mb-3 line-clamp-2 min-h-[3rem] text-xl font-bold leading-tight transition-colors group-hover:text-primary">
              {title}
            </h3>
            
            {/* Short description */}
            <p className="mb-4 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
              {description}
            </p>
            
            {/* Price - Moved to middle of card */}
            <div className="mb-4 flex items-center justify-center">
              <div className="flex flex-col items-center">
                {isFreeForUser ? (
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-green-600 dark:text-green-400">
                      رایگان
                    </span>
                    {isPremiumUser && isFreePremium && !isFree && (
                      <div className="flex items-center gap-1 rounded-md bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/40 dark:text-amber-400">
                        <Crown className="h-3 w-3" />
                        <span>عضو ویژه</span>
                      </div>
                    )}
                  </div>
                ) : discountPrice ? (
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      {formattedPrice(discountPrice)} تومان
                    </span>
                    <span className="text-xs line-through text-gray-500">
                      {formattedPrice(price)} تومان
                    </span>
                    <span className="rounded-md bg-red-100 px-1.5 py-0.5 text-xs font-medium text-red-700 dark:bg-red-900/40 dark:text-red-400">
                      {Math.round(((price - discountPrice) / price) * 100)}%
                    </span>
                  </div>
                ) : (
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    {formattedPrice(price)} تومان
                  </span>
                )}
                
                {/* Premium badge for non-premium users */}
                {!isPremiumUser && isFreePremium && !isFree && (
                  <div className="mt-1 flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400">
                    <Crown className="h-3 w-3" />
                    <span>رایگان برای اعضای ویژه</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Categories */}
            <div className="mb-4 flex flex-wrap justify-center gap-1.5">
              {categories.map((category, index) => (
                <span 
                  key={index}
                  className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                >
                  {category}
                </span>
              ))}
            </div>
            
            {/* Course details - Duration and Sessions Count */}
            <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
              <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                <Clock className="h-4 w-4" /> 
                <span>{duration}</span>
              </div>
              
              <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                <BookOpen className="h-4 w-4" /> 
                <span>{sessionsCount} جلسه</span>
              </div>
              
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{rating}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;
