import { Suspense } from "react";
import {
  Filter,
  Sliders,
  Search,
  BookOpen,
  ChevronDown,
  GraduationCap,
  Clock,
  CheckCircle,
  Crown,
} from "lucide-react";

import { courses } from "@/components/data/course";
import CourseList from "@/components/course/CourseList";
import Form from "next/form";
import Header from "@/components/layout/Header";

// Helper function to extract unique categories from courses
function getUniqueCategories(
  courses: typeof import("@/components/data/course").courses
) {
  const categoriesSet = new Set<string>();

  courses.forEach((course) => {
    course.categories.forEach((category) => {
      categoriesSet.add(category);
    });
  });

  return Array.from(categoriesSet);
}

// Helper function to extract unique levels from courses
function getUniqueLevels(
  courses: typeof import("@/components/data/course").courses
) {
  const levelsSet = new Set<string>();

  courses.forEach((course) => {
    levelsSet.add(course.level);
  });

  return Array.from(levelsSet);
}

// تغییر تنظیمات رندرینگ به حالت استاتیک برای سرعت بیشت
export const dynamic = "force-static";
export const revalidate = 3600; // کش کردن برای یک ساعت
export const preferredRegion = "auto"; // کمک به عملکرد بهتر

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Get search query from URL params directly
  const query = (searchParams.query as string) || "";
  const categoryFilter = (searchParams.category as string) || "";
  const levelFilter = (searchParams.level as string) || "";
  const isPremiumFilter = searchParams.premium === "true";
  const isFreeFilter = searchParams.free === "true";
  

  // واکشی داده‌های مورد نیاز برای فیلترها (انجام زودهنگام)
  const categories = getUniqueCategories(courses);
  const levels = getUniqueLevels(courses);

  return (
    <div>
      <Header />
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar - Filters */}
        <aside className="w-full md:w-1/4 md:max-w-xs  rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 h-fit sticky top-24">
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Filter className="h-5 w-5" />
              فیلترها
            </h2>

            {/* Search form using new Form component */}
            <Form action="/courses" className="mb-6">
              <div className="relative">
                <input
                  name="query"
                  defaultValue={query}
                  placeholder="جستجوی دوره..."
                  className="w-full p-3 pl-10 rounded-xl border border-gray-200 dark:border-gray-700  text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
            </Form>

            {/* Category filter */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                دسته‌بندی
              </h3>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                <Form action="/courses" className="space-y-2">
                  <div className="flex items-center mb-2">
                    <input
                      type="radio"
                      id="all-categories"
                      name="category"
                      value=""
                      defaultChecked={!categoryFilter}
                      className="h-4 w-4 text-primary"
                    />
                    <label htmlFor="all-categories" className="mr-2 text-sm">
                      همه دسته‌ها
                    </label>
                  </div>

                  {categories.map((category, idx) => (
                    <div key={idx} className="flex items-center mb-2">
                      <input
                        type="radio"
                        id={`category-${idx}`}
                        name="category"
                        value={category}
                        defaultChecked={category === categoryFilter}
                        className="h-4 w-4 text-primary"
                      />
                      <label
                        htmlFor={`category-${idx}`}
                        className="mr-2 text-sm"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                  <button
                    type="submit"
                    className="mt-2 px-4 py-1 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full text-sm text-white hover:from-teal-600 hover:to-emerald-600 transition-colors w-full"
                  >
                    اعمال فیلتر
                  </button>
                </Form>
              </div>
            </div>

            {/* Level filter */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                سطح دوره
              </h3>
              <Form action="/courses" className="space-y-2">
                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    id="all-levels"
                    name="level"
                    value=""
                    defaultChecked={!levelFilter}
                    className="h-4 w-4 text-primary"
                  />
                  <label htmlFor="all-levels" className="mr-2 text-sm">
                    همه سطوح
                  </label>
                </div>

                {levels.map((level, idx) => (
                  <div key={idx} className="flex items-center mb-2">
                    <input
                      type="radio"
                      id={`level-${idx}`}
                      name="level"
                      value={level}
                      defaultChecked={level === levelFilter}
                      className="h-4 w-4 text-primary"
                    />
                    <label htmlFor={`level-${idx}`} className="mr-2 text-sm">
                      {level === "beginner" && "مقدماتی"}
                      {level === "intermediate" && "متوسط"}
                      {level === "advanced" && "پیشرفته"}
                    </label>
                  </div>
                ))}
                <button
                  type="submit"
                  className="mt-2 px-4 py-1 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full text-sm text-white hover:from-teal-600 hover:to-emerald-600 transition-colors w-full"
                >
                  اعمال فیلتر
                </button>
              </Form>
            </div>

            {/* Special filters */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                ویژگی‌های خاص
              </h3>
              <Form action="/courses" className="space-y-2">
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id="premium-filter"
                    name="premium"
                    value="true"
                    defaultChecked={isPremiumFilter}
                    className="h-4 w-4 text-primary"
                  />
                  <label
                    htmlFor="premium-filter"
                    className="mr-2 text-sm flex items-center gap-1"
                  >
                    <Crown className="h-3.5 w-3.5 text-amber-500" />
                    ویژه اعضای پریمیوم
                  </label>
                </div>

                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id="free-filter"
                    name="free"
                    value="true"
                    defaultChecked={isFreeFilter}
                    className="h-4 w-4 text-primary"
                  />
                  <label htmlFor="free-filter" className="mr-2 text-sm">
                    دوره‌های رایگان
                  </label>
                </div>

                <button
                  type="submit"
                  className="mt-2 px-4 py-1 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full text-sm text-white hover:from-teal-600 hover:to-emerald-600 transition-colors w-full"
                >
                  اعمال فیلتر
                </button>
              </Form>
            </div>

            {/* Duration filter */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                مدت زمان
              </h3>
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <span className="text-xs text-gray-500">کمتر از ۱۰ ساعت</span>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 w-3/4 rounded-full"></div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-xs text-gray-500">۱۰ تا ۲۰ ساعت</span>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 w-1/2 rounded-full"></div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-xs text-gray-500">
                    بیشتر از ۲۰ ساعت
                  </span>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 w-1/4 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content - Course List */}
        <main className="flex-1">
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h1 className="text-2xl md:text-3xl font-bold">
                دوره‌های آموزشی
              </h1>

              <div className="flex items-center gap-2 text-sm">
                <Suspense fallback={<span>درحال بارگیری...</span>}>
                  <CourseCounter
                    courses={courses}
                    query={query}
                    categoryFilter={categoryFilter}
                    levelFilter={levelFilter}
                    isPremiumFilter={isPremiumFilter}
                    isFreeFilter={isFreeFilter}
                  />
                </Suspense>

                <button className="flex items-center gap-1 border rounded-lg px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <Sliders className="h-4 w-4" />
                  <span>جدیدترین</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Dynamic status message based on filters */}
            <Suspense fallback={null}>
              <FilterStatusMessage
                query={query}
                categoryFilter={categoryFilter}
                levelFilter={levelFilter}
                isPremiumFilter={isPremiumFilter}
                isFreeFilter={isFreeFilter}
              />
            </Suspense>

            {/* Course grid with streaming */}
            <Suspense
              fallback={
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="h-72 rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse"></div>
                  <div className="h-72 rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse"></div>
                  <div className="h-72 rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse"></div>
                </div>
              }
            >
              <CourseListWrapper
                query={query}
                categoryFilter={categoryFilter}
                levelFilter={levelFilter}
                isPremiumFilter={isPremiumFilter}
                isFreeFilter={isFreeFilter}
              />
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  );
}

// کامپوننت برای نمایش تعداد دوره‌ها - جلوگیری از محاسبات زیاد در کامپوننت اصلی
async function CourseCounter({
  courses,
  query,
  categoryFilter,
  levelFilter,
  isPremiumFilter,
  isFreeFilter,
}: {
  courses: typeof import("@/components/data/course").courses;
  query: string;
  categoryFilter: string;
  levelFilter: string;
  isPremiumFilter: boolean;
  isFreeFilter: boolean;
}) {
  // فیلتر دوره‌ها
  const filteredCourses = courses.filter((course) => {
    // Filter by search query
    if (
      query &&
      !course.title.toLowerCase().includes(query.toLowerCase()) &&
      !course.description.toLowerCase().includes(query.toLowerCase())
    ) {
      return false;
    }

    // Filter by category
    if (categoryFilter && !course.categories.includes(categoryFilter)) {
      return false;
    }

    // Filter by level
    if (levelFilter && course.level !== levelFilter) {
      return false;
    }

    // Filter by premium status
    if (isPremiumFilter && !course.isFreePremium) {
      return false;
    }

    // Filter by free status
    if (isFreeFilter && !course.isFree) {
      return false;
    }

    return true;
  });

  return <span>نمایش {filteredCourses.length} دوره</span>;
}

// کامپوننت برای نمایش پیام وضعیت فیلتر
async function FilterStatusMessage({
  query,
  categoryFilter,
  levelFilter,
  isPremiumFilter,
  isFreeFilter,
}: {
  query: string;
  categoryFilter: string;
  levelFilter: string;
  isPremiumFilter: boolean;
  isFreeFilter: boolean;
}) {
  // فیلتر دوره‌ها
  const filteredCourses = courses.filter((course) => {
    // Filter by search query
    if (
      query &&
      !course.title.toLowerCase().includes(query.toLowerCase()) &&
      !course.description.toLowerCase().includes(query.toLowerCase())
    ) {
      return false;
    }

    // Filter by category
    if (categoryFilter && !course.categories.includes(categoryFilter)) {
      return false;
    }

    // Filter by level
    if (levelFilter && course.level !== levelFilter) {
      return false;
    }

    // Filter by premium status
    if (isPremiumFilter && !course.isFreePremium) {
      return false;
    }

    // Filter by free status
    if (isFreeFilter && !course.isFree) {
      return false;
    }

    return true;
  });

  if (
    !(query || categoryFilter || levelFilter || isPremiumFilter || isFreeFilter)
  ) {
    return null;
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
      <p className="text-sm">
        {filteredCourses.length > 0 ? (
          <span>
            {filteredCourses.length} دوره بر اساس فیلترهای انتخاب شده پیدا شد.
          </span>
        ) : (
          <span className="text-red-500">
            دوره‌ای با فیلترهای انتخاب شده یافت نشد. لطفاً فیلترهای خود را تغییر
            دهید.
          </span>
        )}
      </p>
    </div>
  );
}

// کامپوننت برای نمایش لیست دوره‌ها
async function CourseListWrapper({
  query,
  categoryFilter,
  levelFilter,
  isPremiumFilter,
  isFreeFilter,
}: {
  query: string;
  categoryFilter: string;
  levelFilter: string;
  isPremiumFilter: boolean;
  isFreeFilter: boolean;
}) {
  // فیلتر دوره‌ها
  const filteredCourses = courses.filter((course) => {
    // Filter by search query
    if (
      query &&
      !course.title.toLowerCase().includes(query.toLowerCase()) &&
      !course.description.toLowerCase().includes(query.toLowerCase())
    ) {
      return false;
    }

    // Filter by category
    if (categoryFilter && !course.categories.includes(categoryFilter)) {
      return false;
    }

    // Filter by level
    if (levelFilter && course.level !== levelFilter) {
      return false;
    }

    // Filter by premium status
    if (isPremiumFilter && !course.isFreePremium) {
      return false;
    }

    // Filter by free status
    if (isFreeFilter && !course.isFree) {
      return false;
    }

    return true;
  });

  if (filteredCourses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <BookOpen className="h-16 w-16 text-gray-400 mb-4" />
        <h3 className="text-xl font-bold mb-2">دوره‌ای یافت نشد</h3>
        <p className="text-gray-500 max-w-md mb-6">
          متأسفانه دوره‌ای با فیلترهای انتخاب شده پیدا نشد. لطفاً فیلترهای خود
          را تغییر دهید یا بعداً دوباره بررسی کنید.
        </p>
        <Form action="/courses">
          <button
            type="submit"
            className="px-6 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full text-white hover:from-teal-600 hover:to-emerald-600 transition-colors"
          >
            نمایش همه دوره‌ها
          </button>
        </Form>
      </div>
    );
  }

  return <CourseList courses={filteredCourses} isPremiumUser={false} />;
}
