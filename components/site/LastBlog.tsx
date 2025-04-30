import LastBlogCarousel from '../blog/LastBlogCarousel.client';
import { blogs } from '@/components/data/blog';
import Link from "next/link";

export default function LastBlog() {
  // Sort blogs by date (newest first) and take the latest 8
  const latestBlogs = [...blogs]
    .sort((a, b) => {
      const [aYear, aMonth, aDay] = a.date.split('/').map(Number);
      const [bYear, bMonth, bDay] = b.date.split('/').map(Number);
      if (aYear !== bYear) return bYear - aYear;
      if (aMonth !== bMonth) return bMonth - aMonth;
      return bDay - aDay;
    })
    .slice(0, 8);

  return (
    <section className="container mx-auto max-w-7xl my-16 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            آخرین مقالات
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            جدیدترین مقالات و آموزش‌ها را از اینجا مشاهده کنید
          </p>
        </div>
        <div>
          <Link href="/blog" className="mt-4 flex items-center gap-2 self-start text-primary hover:text-primary/90 sm:mt-4">
            <span>مشاهده همه مقالات</span>
            {/* آیکون ArrowLeft را اینجا اضافه کنید */}
          </Link>
        </div>
      </div>
      <LastBlogCarousel blogs={latestBlogs} />
    </section>
  );
}
