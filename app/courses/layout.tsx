'use client';

import Header from "@/components/layout/Header";
import { courses } from '@/components/data/course';
import CourseFilterSidebar from '@/components/course/CourseFilterSidebar';
import { usePathname } from 'next/navigation';

// متادیتا به فایل جداگانه منتقل شده است
// import './metadata'; // Next.js 15 به صورت خودکار آن را پیدا می‌کند

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // چک کردن آیا در صفحه جزئیات دوره هستیم یا خیر با یک الگوی تطبیق دقیق‌تر
  // فقط /courses صفحه اصلی است، هر چیز دیگری صفحه جزئیات است
  const isMainCoursePage = pathname === '/courses' || pathname === '/courses/';
  
  console.log('Current pathname:', pathname);
  console.log('Is main course page:', isMainCoursePage);
  
  return (
    <div>
      <Header />
      <div className="container w-full max-w-7xl mx-auto px-2 py-8">
        {isMainCoursePage ? (
          // صفحه لیست دوره‌ها - با سایدبار
          <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
            {/* Sidebar for filters */}
            <div className="w-full lg:w-72 flex-shrink-0">
              <div className="lg:sticky lg:top-24 lg:h-fit">
                <CourseFilterSidebar courses={courses} />
              </div>
            </div>
            
            {/* Main content */}
            <div className="flex-1">{children}</div>
          </div>
        ) : (
          // صفحه جزئیات دوره - بدون سایدبار
          <div>{children}</div>
        )}
      </div>
    </div>
  );
}
