'use client';

import React from 'react';
import { Course } from '@/components/data/course';
import CourseCard from './CourseCard';

export default function CourseList({ 
  courses, 
  isPremiumUser = false 
}: { 
  courses: Course[],
  isPremiumUser?: boolean
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} isPremiumUser={isPremiumUser} />
      ))}
    </div>
  );
} 