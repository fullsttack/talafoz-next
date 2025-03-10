"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { CourseType } from "@/types/course";
import { cn } from "@/lib/utils";

interface CourseVideoThumbnailProps {
  course: CourseType;
  onClick?: () => void;
  className?: string;
}

export function CourseVideoThumbnail({
  course,
  onClick,
  className,
}: CourseVideoThumbnailProps) {
  return (
    <div 
      className={cn(
        "relative w-full aspect-video rounded-xl overflow-hidden cursor-pointer group",
        className
      )}
      onClick={onClick}
    >
      {/* تصویر بندانگشتی دوره */}
      <Image
        src={course.image}
        alt={course.title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      
      {/* گرادیان تیره روی تصویر */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
      
      {/* دکمه پخش ویدیو */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white/20 p-5 rounded-full backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
          <Play className="h-10 w-10 text-white fill-white" />
        </div>
      </div>
      
      {/* عنوان دوره در پایین تصویر */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h2 className="text-white text-xl font-bold">{course.title}</h2>
        <p className="text-white/80 text-sm mt-1">برای پخش ویدیوی معرفی دوره کلیک کنید</p>
      </div>
    </div>
  );
} 