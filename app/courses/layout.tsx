import { Suspense } from 'react';
import { courses } from '@/components/data/course';
import CourseFilterSidebar from '@/components/course/CourseFilterSidebar';

// Definir los cursos como constante para evitar recreación
const COURSES = courses;

export const metadata = {
  title: 'دوره‌های آموزشی',
  description: 'مشاهده و جستجوی دوره‌های آموزشی در دسته‌بندی‌های مختلف'
};

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-3xl font-extrabold md:text-4xl">دوره‌های آموزشی</h1>
      
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
        {/* محتوای اصلی */}
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
} 