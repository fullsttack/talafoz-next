import { courses } from '@/components/data/course';
import FilteredCourseList from '@/components/course/FilteredCourseList';
import CourseSearch from '@/components/course/CourseSearch';

// Definimos los cursos aquí como una constante para evitar recreaciones
const COURSES = courses;

export default function CoursesPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  // Get current search and filter parameters
  const typeFilter = typeof searchParams.type === 'string' ? searchParams.type : '';
  const categoryFilters = typeof searchParams.categories === 'string' 
    ? searchParams.categories.split(',').filter(Boolean) 
    : [];
  const searchQuery = typeof searchParams.query === 'string' ? searchParams.query : '';
  
  // عنوان صفحه را بر اساس فیلترها و جستجو تنظیم می‌کنیم
  const getPageTitle = () => {
    if (searchQuery) {
      return `نتایج جستجو برای "${searchQuery}"`;
    }
    
    if (typeFilter === 'free') {
      return 'دوره‌های رایگان';
    } else if (typeFilter === 'paid') {
      return 'دوره‌های نقدی';
    } else if (typeFilter === 'premium') {
      return 'دوره‌های ویژه اعضا';
    }
    
    return 'همه دوره‌ها';
  };
  
  return (
    <>
      {/* جستجو */}
      <div className="mb-6">
        <CourseSearch />
      </div>
      
      {/* عنوان صفحه */}
      <div className="mb-6">
        <h2 className="text-xl font-bold">{getPageTitle()}</h2>
        {/* نمایش تعداد نتایج در صورت وجود فیلتر یا جستجو */}
        {(typeFilter || categoryFilters.length > 0 || searchQuery) && (
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            برای دیدن همه دوره‌ها، فیلترها را حذف کنید
          </p>
        )}
      </div>
      
      {/* لیست دوره‌های فیلتر شده */}
      <FilteredCourseList courses={COURSES} isPremiumUser={false} />
    </>
  );
} 