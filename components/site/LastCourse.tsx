import LastCourseCarousel from '../blog/LastCourseCarousel.client';
import { courses } from '@/components/data/course';
import Link from "next/link";

export default function LastCourse() {
  // Sort courses by createdAt date (newest first) and take the latest 10
  const latestCourses = [...courses]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 10);

  return (
    <section className="container mx-auto max-w-7xl my-16 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            آخرین دوره‌های آموزشی
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            جدیدترین دوره‌ها را از اینجا مشاهده کنید
          </p>
        </div>
        <div>
          <Link href="/courses" className="mt-4 flex items-center gap-2 self-start text-primary hover:text-primary/90 sm:mt-4">
            <span>مشاهده همه دوره‌ها</span>
            {/* آیکون ArrowLeft را اینجا اضافه کنید */}
          </Link>
        </div>
      </div>
      <LastCourseCarousel courses={latestCourses} />
    </section>
  );
}
