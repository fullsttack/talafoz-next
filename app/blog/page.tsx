import { Suspense } from "react";
import { Filter } from "lucide-react";

import { blogs } from "@/components/data/blog";
import BlogList from "@/components/blog/BlogList";
import Header from "@/components/layout/Header";
import CategoryFilter from "@/components/blog/CategoryFilter";
import TagFilter from "@/components/blog/TagFilter";
import YearFilter from "@/components/blog/YearFilter";
import AuthorFilter from "@/components/blog/AuthorFilter";
import ReadTimeVisualization from "@/components/blog/ReadTimeVisualization";
import SearchFilter from "@/components/blog/SearchFilter";

// Helper function to extract unique categories from blogs
function getUniqueCategories(
  blogs: typeof import("@/components/data/blog").blogs
) {
  const categoriesSet = new Set<string>();

  blogs.forEach((blog) => {
    categoriesSet.add(blog.category);
  });

  return Array.from(categoriesSet);
}

// Helper function to extract unique tags from blogs
function getUniqueTags(
  blogs: typeof import("@/components/data/blog").blogs
) {
  const tagsSet = new Set<string>();

  blogs.forEach((blog) => {
    blog.tags.forEach((tag) => {
      tagsSet.add(tag);
    });
  });

  return Array.from(tagsSet);
}

// Helper function to extract years from blog dates
function getUniqueYears(
  blogs: typeof import("@/components/data/blog").blogs
) {
  const yearsSet = new Set<string>();

  blogs.forEach((blog) => {
    const year = blog.date.split('/')[0];
    yearsSet.add(year);
  });

  return Array.from(yearsSet);
}

// تغییر تنظیمات رندرینگ به حالت استاتیک برای سرعت بیشتر
export const dynamic = "force-static";
export const revalidate = 3600; // کش کردن برای یک ساعت
export const preferredRegion = "auto"; // کمک به عملکرد بهتر

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Get search query from URL params directly
  const query = (searchParams.query as string) || "";
  const categoryFilter = (searchParams.category as string) || "";
  const tagFilter = (searchParams.tag as string) || "";
  const yearFilter = (searchParams.year as string) || "";
  const authorFilter = (searchParams.author as string) || "";

  // واکشی داده‌های مورد نیاز برای فیلترها (انجام زودهنگام)
  const categories = getUniqueCategories(blogs);
  const tags = getUniqueTags(blogs);
  const years = getUniqueYears(blogs);
  
  // Extract unique authors
  const authors = [...new Set(blogs.map(blog => blog.author))];

  return (
    <div>
      <Header />
      <div className="container max-w-7xl mx-auto py-8 md:py-16 px-2 flex flex-col md:flex-row gap-8">
        {/* Sidebar - Filters */}
        <aside className="w-full md:w-1/4 md:max-w-xs rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 h-fit sticky top-24">
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Filter className="h-5 w-5" />
              فیلترها
            </h2>

            {/* Search filter */}
            <SearchFilter query={query} />

            {/* Category filter */}
            <CategoryFilter categories={categories} currentFilter={categoryFilter} />

            {/* Tags filter */}
            <TagFilter tags={tags} currentFilter={tagFilter} />

            {/* Year filter */}
            <YearFilter years={years} currentFilter={yearFilter} />

            {/* Author filter */}
            <AuthorFilter authors={authors} currentFilter={authorFilter} />

            {/* Read time visualization */}
            <ReadTimeVisualization />
          </div>
        </aside>

        {/* Main Content */}
        <main className="w-full md:w-3/4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">مقالات و آموزش‌ها</h1>
            <p className="text-gray-600 dark:text-gray-400">
              جدیدترین مقالات، آموزش‌ها و اخبار دنیای برنامه‌نویسی و طراحی وب
            </p>
          </div>

          {/* Blog results area */}
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <Suspense
                fallback={
                  <div className="h-7 w-40 bg-gray-200 dark:bg-gray-800 animate-pulse rounded"></div>
                }
              >
                <BlogCounter
                  blogs={blogs}
                  query={query}
                  categoryFilter={categoryFilter}
                  tagFilter={tagFilter}
                  yearFilter={yearFilter}
                  authorFilter={authorFilter}
                />
              </Suspense>
            </div>

            <Suspense
              fallback={
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="h-72 rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse"></div>
                  <div className="h-72 rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse"></div>
                  <div className="h-72 rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse"></div>
                </div>
              }
            >
              <BlogListWrapper
                query={query}
                categoryFilter={categoryFilter}
                tagFilter={tagFilter}
                yearFilter={yearFilter}
                authorFilter={authorFilter}
              />
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  );
}

// کامپوننت برای نمایش تعداد نتایج
async function BlogCounter({
  blogs,
  query,
  categoryFilter,
  tagFilter,
  yearFilter,
  authorFilter,
}: {
  blogs: typeof import("@/components/data/blog").blogs;
  query: string;
  categoryFilter: string;
  tagFilter: string;
  yearFilter: string;
  authorFilter: string;
}) {
  // فیلتر مقالات
  const filteredBlogs = blogs.filter((blog) => {
    // Filter by search query
    if (
      query &&
      !blog.title.toLowerCase().includes(query.toLowerCase()) &&
      !blog.description.toLowerCase().includes(query.toLowerCase())
    ) {
      return false;
    }

    // Filter by category
    if (categoryFilter && blog.category !== categoryFilter) {
      return false;
    }

    // Filter by tag
    if (tagFilter && !blog.tags.includes(tagFilter)) {
      return false;
    }

    // Filter by year
    if (yearFilter && !blog.date.startsWith(yearFilter)) {
      return false;
    }

    // Filter by author
    if (authorFilter && blog.author !== authorFilter) {
      return false;
    }

    return true;
  });

  return (
    <div className="text-gray-600 dark:text-gray-400">
      <FilterStatusMessage
        query={query}
        categoryFilter={categoryFilter}
        tagFilter={tagFilter}
        yearFilter={yearFilter}
        authorFilter={authorFilter}
      />
      {filteredBlogs.length} مقاله یافت شد
    </div>
  );
}

// کامپوننت برای نمایش وضعیت فیلترها
async function FilterStatusMessage({
  query,
  categoryFilter,
  tagFilter,
  yearFilter,
  authorFilter,
}: {
  query: string;
  categoryFilter: string;
  tagFilter: string;
  yearFilter: string;
  authorFilter: string;
}) {
  // No filters applied
  if (!query && !categoryFilter && !tagFilter && !yearFilter && !authorFilter) {
    return null;
  }

  let messages = [];

  if (query) {
    messages.push(`جستجو برای: "${query}"`);
  }

  if (categoryFilter) {
    messages.push(`دسته‌بندی: ${categoryFilter}`);
  }

  if (tagFilter) {
    messages.push(`برچسب: ${tagFilter}`);
  }

  if (yearFilter) {
    messages.push(`سال: ${yearFilter}`);
  }

  if (authorFilter) {
    messages.push(`نویسنده: ${authorFilter}`);
  }

  return (
    <div className="text-sm p-2 mb-4 rounded-lg bg-gray-100 dark:bg-gray-800 flex flex-wrap gap-2">
      <span>فیلترهای اعمال شده:</span>
      {messages.map((message, index) => (
        <span
          key={index}
          className="px-2 py-1 bg-white dark:bg-gray-700 rounded-md shadow-sm"
        >
          {message}
        </span>
      ))}
    </div>
  );
}

// کامپوننت برای نمایش لیست مقالات
async function BlogListWrapper({
  query,
  categoryFilter,
  tagFilter,
  yearFilter,
  authorFilter,
}: {
  query: string;
  categoryFilter: string;
  tagFilter: string;
  yearFilter: string;
  authorFilter: string;
}) {
  // فیلتر مقالات
  const filteredBlogs = blogs.filter((blog) => {
    // Filter by search query
    if (
      query &&
      !blog.title.toLowerCase().includes(query.toLowerCase()) &&
      !blog.description.toLowerCase().includes(query.toLowerCase())
    ) {
      return false;
    }

    // Filter by category
    if (categoryFilter && blog.category !== categoryFilter) {
      return false;
    }

    // Filter by tag
    if (tagFilter && !blog.tags.includes(tagFilter)) {
      return false;
    }

    // Filter by year
    if (yearFilter && !blog.date.startsWith(yearFilter)) {
      return false;
    }

    // Filter by author
    if (authorFilter && blog.author !== authorFilter) {
      return false;
    }

    return true;
  });

  // اگر هیچ مقاله‌ای یافت نشد
  if (filteredBlogs.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl">
        <p className="text-xl font-semibold mb-2">هیچ مقاله‌ای یافت نشد</p>
        <p>لطفاً معیارهای جستجو یا فیلترهای خود را تغییر دهید.</p>
      </div>
    );
  }

  return <BlogList blogs={filteredBlogs} />;
} 