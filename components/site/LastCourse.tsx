'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { courses } from '@/components/data/course';
import CourseCard from '@/components/course/CourseCard';

export default function LastCourse() {
  const [isPremiumUser] = useState(false);

  // Sort courses by createdAt date (newest first) and take the latest 4
  const latestCourses = [...courses]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4);

  return (
    <section className="container mx-auto my-16 px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">آخرین دوره‌های آموزشی</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            جدیدترین دوره‌های طلافز را از اینجا مشاهده کنید
          </p>
        </div>
        <Link 
          href="/courses" 
          className="mt-4 flex items-center gap-2 self-start text-primary hover:text-primary/90 sm:mt-0"
        >
          <span>مشاهده همه دوره‌ها</span>
          <ArrowLeft className="h-4 w-4" />
        </Link>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {latestCourses.map((course) => (
          <CourseCard 
            key={course.id} 
            course={course} 
            isPremiumUser={isPremiumUser} 
          />
        ))}
      </div>
    </section>
  );
}
