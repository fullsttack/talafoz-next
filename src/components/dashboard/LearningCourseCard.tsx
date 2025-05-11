'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FileVideo2, Clock } from 'lucide-react';

interface LearningCourseCardProps {
  id: number;
  image: string;
  title: string;
  instructor: string;
  progress: number;
  episodes: number;
  duration: string;
  lastActivity?: string;
}

const LearningCourseCard: React.FC<LearningCourseCardProps> = ({
  id,
  image,
  title,
  instructor,
  progress,
  episodes,
  duration,
  lastActivity
}) => {
  return (
    <Link href={`/courses/${id}`} className="block group">
      <div className="border rounded-2xl shadow-lg overflow-hidden flex flex-col relative transition-shadow group-hover:shadow-2xl group-hover:-translate-y-1 duration-200">
        <div className="relative">
          <Image width={320} height={180} src={image} alt={title} className="w-full h-48 object-cover" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-white font-medium">ادامه دوره</span>
          </div>
        </div>
        
        <div className="p-4 flex flex-col flex-1">
          <h2 className="text-lg font-bold mb-1">{title}</h2>
          <span className="text-xs text-gray-500 mb-2">مدرس: {instructor}</span>
          
          <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
            <span className="flex items-center gap-1"><FileVideo2 size={16} className="ml-1" /> <b>{episodes} جلسه</b></span>
            <span className="flex items-center gap-1"><Clock size={16} className="ml-1" /> <b>{duration}</b></span>
          </div>
          
          <div className="mt-2 mb-3">
            <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="mt-1 flex items-center justify-between">
              <span className="text-xs text-gray-500">پیشرفت</span>
              <span className="text-xs font-medium">{progress}%</span>
            </div>
          </div>
          
          {lastActivity && (
            <div className="text-xs text-gray-500 mt-auto">
              آخرین فعالیت: {lastActivity}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default LearningCourseCard; 