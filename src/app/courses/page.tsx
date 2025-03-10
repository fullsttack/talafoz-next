"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import CourseCart, { CourseType } from "@/components/course/CourseCart";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CoursesSidebar } from "@/components/course/CoursesSidebar";
import { CoursesGridSkeleton } from "@/components/course/CoursesGridSkeleton";

// Extended course data for the courses page
const ALL_COURSES: CourseType[] = [
  {
    id: 1,
    title: "مبانی توسعه وب",
    description:
      "ساخت اپلیکیشن‌های مدرن با ری‌اکت ساخت اپلیکیشن‌های مدرن با ری‌اکت ساخت اپلیکیشن‌های مدرن با ری‌اکت",
    image: "/image/next.jpg",
    duration: "۸ هفته",
    level: "سطح مبتدی",
    price: "۱,۵۰۰,۰۰۰ تومان",
    instructor: "علی محمدی",
    rating: 4.8,
    students: 1240,
    tags: ["HTML", "CSS", "JavaScript"],
    discount: 20,
    isTrending: true,
    gradientFrom: "#4F46E5",
    gradientTo: "#14B8A6",
    slug: "web-development-basics",
  },
  {
    id: 2,
    title: "دوره جامع ری‌اکت و نکست‌جی‌اس",
    description:
      "ساخت اپلیکیشن‌های مدرن با ری‌اکت ساخت اپلیکیشن‌های مدرن با ری‌اکت ساخت اپلیکیشن‌های مدرن با ری‌اکت",
    image: "/image/next.jpg",
    duration: "۱۰ هفته",
    level: "سطح متوسط",
    price: "۲,۸۰۰,۰۰۰ تومان",
    instructor: "مهدی حسینی",
    rating: 4.9,
    students: 850,
    tags: ["React", "Next.js", "TypeScript"],
    discount: 15,
    isTrending: false,
    gradientFrom: "#4F46E5",
    gradientTo: "#14B8A6",
    slug: "react-nextjs-masterclass",
  },
  {
    id: 3,
    title: "اصول طراحی رابط کاربری",
    description:
      "ساخت اپلیکیشن‌های مدرن با ری‌اکت ساخت اپلیکیشن‌های مدرن با ری‌اکت ساخت اپلیکیشن‌های مدرن با ری‌اکت",
    image: "/image/next.jpg",
    duration: "۶ هفته",
    level: "همه سطوح",
    price: "۱,۹۵۰,۰۰۰ تومان",
    instructor: "سارا اکبری",
    rating: 4.7,
    students: 920,
    tags: ["UI", "UX", "Figma"],
    discount: 30,
    isTrending: true,
    gradientFrom: "#7E22CE",
    gradientTo: "#2DD4BF",
    slug: "ui-design-principles",
  },
  {
    id: 4,
    title: "برنامه‌نویسی پایتون پیشرفته",
    description:
      "یادگیری قدم به قدم پایتون از صفر تا صد برای کاربردهای پیشرفته توسعه نرم‌افزار و هوش مصنوعی",
    image: "/image/next.jpg",
    duration: "۱۲ هفته",
    level: "سطح پیشرفته",
    price: "۳,۲۰۰,۰۰۰ تومان",
    instructor: "رضا کریمی",
    rating: 4.9,
    students: 1120,
    tags: ["Python", "Machine Learning", "Data Science"],
    discount: 10,
    isTrending: true,
    gradientFrom: "#0EA5E9",
    gradientTo: "#8B5CF6",
    slug: "advanced-python-programming",
  },
  {
    id: 5,
    title: "توسعه اپلیکیشن موبایل با فلاتر",
    description:
      "ساخت اپلیکیشن‌های چندسکویی برای اندروید و iOS با استفاده از فریمورک فلاتر و زبان Dart",
    image: "/image/next.jpg",
    duration: "۱۰ هفته",
    level: "سطح متوسط",
    price: "۲,۷۰۰,۰۰۰ تومان",
    instructor: "نیما رضایی",
    rating: 4.6,
    students: 780,
    tags: ["Flutter", "Dart", "Mobile"],
    discount: 25,
    isTrending: false,
    gradientFrom: "#0FCFF6",
    gradientTo: "#45A6FF",
    slug: "flutter-mobile-app-development",
  },
  {
    id: 6,
    title: "امنیت شبکه و اطلاعات",
    description:
      "اصول امنیت شبکه، تکنیک‌های هک اخلاقی و روش‌های محافظت از سیستم‌ها و داده‌ها",
    image: "/image/next.jpg",
    duration: "۸ هفته",
    level: "سطح پیشرفته",
    price: "۳,۸۰۰,۰۰۰ تومان",
    instructor: "محمد سلیمی",
    rating: 4.8,
    students: 650,
    tags: ["Network Security", "Ethical Hacking", "Cybersecurity"],
    discount: 0,
    isTrending: false,
    gradientFrom: "#EF4444",
    gradientTo: "#F97316",
    slug: "network-information-security",
  },
  {
    id: 7,
    title: "میکروسرویس‌ها با Docker و Kubernetes",
    description:
      "طراحی، پیاده‌سازی و مدیریت معماری میکروسرویس با استفاده از تکنولوژی‌های کانتینری",
    image: "/image/next.jpg",
    duration: "۹ هفته",
    level: "سطح پیشرفته",
    price: "۴,۲۰۰,۰۰۰ تومان",
    instructor: "امیر محمدی",
    rating: 4.9,
    students: 410,
    tags: ["Docker", "Kubernetes", "Microservices"],
    discount: 5,
    isTrending: true,
    gradientFrom: "#2563EB",
    gradientTo: "#7C3AED",
    slug: "microservices-docker-kubernetes",
  },
  {
    id: 8,
    title: "جاوااسکریپت پیشرفته و الگوهای طراحی",
    description:
      "آموزش مفاهیم پیشرفته جاوااسکریپت و الگوهای طراحی برای توسعه اپلیکیشن‌های مدرن",
    image: "/image/next.jpg",
    duration: "۷ هفته",
    level: "سطح متوسط",
    price: "۲,۵۰۰,۰۰۰ تومان",
    instructor: "سعید احمدی",
    rating: 4.7,
    students: 895,
    tags: ["JavaScript", "Design Patterns", "ES6+"],
    discount: 15,
    isTrending: false,
    gradientFrom: "#FBBF24",
    gradientTo: "#EA580C",
    slug: "advanced-javascript-design-patterns",
  },
  {
    id: 9,
    title: "تحلیل داده با پایتون",
    description:
      "آموزش تحلیل داده‌ها با پایتون و کتابخانه‌های pandas، NumPy و Matplotlib",
    image: "/image/next.jpg",
    duration: "۸ هفته",
    level: "سطح متوسط",
    price: "۲,۹۰۰,۰۰۰ تومان",
    instructor: "مریم کمالی",
    rating: 4.8,
    students: 760,
    tags: ["Python", "Data Analysis", "Pandas"],
    discount: 20,
    isTrending: true,
    gradientFrom: "#0D9488",
    gradientTo: "#6366F1",
    slug: "data-analysis-with-python",
  },
  {
    id: 10,
    title: "آموزش گیت و گیت‌هاب",
    description:
      "مدیریت نسخه‌های کد با Git و GitHub برای همکاری در پروژه‌های تیمی",
    image: "/image/next.jpg",
    duration: "۴ هفته",
    level: "سطح مبتدی",
    price: "۱,۲۰۰,۰۰۰ تومان",
    instructor: "حسن قاسمی",
    rating: 4.5,
    students: 1350,
    tags: ["Git", "GitHub", "Version Control"],
    discount: 0,
    isTrending: false,
    gradientFrom: "#374151",
    gradientTo: "#6B7280",
    slug: "git-github-tutorial",
  },
  {
    id: 11,
    title: "هوش مصنوعی و یادگیری عمیق",
    description:
      "آموزش مفاهیم هوش مصنوعی و یادگیری عمیق با استفاده از TensorFlow و PyTorch",
    image: "/image/next.jpg",
    duration: "۱۶ هفته",
    level: "سطح پیشرفته",
    price: "۵,۵۰۰,۰۰۰ تومان",
    instructor: "فرهاد نوری",
    rating: 4.9,
    students: 520,
    tags: ["AI", "Deep Learning", "TensorFlow"],
    discount: 10,
    isTrending: true,
    gradientFrom: "#8B5CF6",
    gradientTo: "#EC4899",
    slug: "ai-deep-learning",
  },
  {
    id: 12,
    title: "مبانی بلاکچین و ارزهای دیجیتال",
    description:
      "آشنایی با فناوری بلاکچین، ارزهای دیجیتال و کاربردهای آن در صنایع مختلف",
    image: "/image/next.jpg",
    duration: "۶ هفته",
    level: "سطح مبتدی",
    price: "۲,۲۰۰,۰۰۰ تومان",
    instructor: "بهرام صادقی",
    rating: 4.6,
    students: 830,
    tags: ["Blockchain", "Cryptocurrency", "Smart Contracts"],
    discount: 0,
    isTrending: false,
    gradientFrom: "#F59E0B",
    gradientTo: "#DC2626",
    slug: "blockchain-cryptocurrency-basics",
  },
];

export default function CoursesPage() {
  const { theme } = useTheme();
  const gradientColor = theme === "dark" ? "#262626" : "#D9D9D955";
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLevel, setFilterLevel] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showDiscount, setShowDiscount] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [isLoading, setIsLoading] = useState(true);
  
  // Reference to keep track of filter changes
  const filtersRef = useRef({
    searchQuery,
    filterLevel,
    selectedTags,
    showDiscount,
    sortBy
  });
  
  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Get all unique tags from courses
  const allTags = Array.from(
    new Set(ALL_COURSES.flatMap(course => course.tags))
  ).sort();
  
  // Filter courses based on all filters
  const filteredCourses = ALL_COURSES.filter(course => {
    // Search filter
    const matchesSearch = 
      searchQuery === "" || 
      course.title.includes(searchQuery) || 
      course.description.includes(searchQuery) || 
      course.tags.some(tag => tag.includes(searchQuery));
    
    // Level filter
    const matchesLevel = 
      filterLevel.length === 0 || 
      filterLevel.some(level => course.level.includes(level));
    
    // Tags filter
    const matchesTags = 
      selectedTags.length === 0 || 
      selectedTags.some(tag => course.tags.includes(tag));
    
    // Discount filter
    const matchesDiscount = 
      !showDiscount || course.discount > 0;
    
    return matchesSearch && matchesLevel && matchesTags && matchesDiscount;
  });
  
  // Sort courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return 1; // Placeholder for price comparison
      case "price-high":
        return -1; // Placeholder for price comparison
      case "popular":
        return b.students - a.students;
      case "rating":
        return b.rating - a.rating;
      case "newest":
      default:
        return b.id - a.id;
    }
  });

  // Toggle level filter
  const toggleLevel = (level: string) => {
    setFilterLevel(prev => 
      prev.includes(level) 
        ? prev.filter(l => l !== level) 
        : [...prev, level]
    );
  };
  
  // Toggle tag filter
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setFilterLevel([]);
    setSelectedTags([]);
    setShowDiscount(false);
    setSortBy("newest");
  };

  // Check if filters have changed and trigger loading
  useEffect(() => {
    const currentFilters = {
      searchQuery,
      filterLevel,
      selectedTags,
      showDiscount,
      sortBy
    };
    
    // Deep comparison for arrays
    const levelChanged = 
      filterLevel.length !== filtersRef.current.filterLevel.length ||
      filterLevel.some(level => !filtersRef.current.filterLevel.includes(level));
    
    const tagsChanged = 
      selectedTags.length !== filtersRef.current.selectedTags.length ||
      selectedTags.some(tag => !filtersRef.current.selectedTags.includes(tag));
    
    const filtersChanged = 
      searchQuery !== filtersRef.current.searchQuery ||
      levelChanged ||
      tagsChanged ||
      showDiscount !== filtersRef.current.showDiscount ||
      sortBy !== filtersRef.current.sortBy;
    
    // Update the reference to current filters
    filtersRef.current = currentFilters;
    
    if (filtersChanged && !isLoading) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [searchQuery, filterLevel, selectedTags, showDiscount, sortBy, isLoading]);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar for filters - on mobile it will be at the top */}
      <div className="lg:w-1/4 w-full">
        <CoursesSidebar 
          searchQuery={searchQuery}
          filterLevel={filterLevel}
          selectedTags={selectedTags}
          showDiscount={showDiscount}
          sortBy={sortBy}
          allTags={allTags}
          onSearchChange={setSearchQuery}
          onLevelToggle={toggleLevel}
          onTagToggle={toggleTag}
          onDiscountChange={setShowDiscount}
          onSortChange={setSortBy}
          onResetFilters={resetFilters}
        />
      </div>
      
      {/* Main content area */}
      <div className="lg:w-3/4 w-full">
        {/* Results count and active filters */}
        <div className="mb-6">
          <div className="flex flex-wrap justify-end items-center">
            {/* Active filters */}
            {!isLoading && (filterLevel.length > 0 || selectedTags.length > 0 || showDiscount) && (
              <div className="flex flex-wrap gap-2">
                {filterLevel.map(level => (
                  <Badge key={level} variant="secondary" className="px-3 py-1">
                    {level}
                    <button 
                      className="mr-2 text-muted-foreground hover:text-foreground"
                      onClick={() => toggleLevel(level)}
                    >
                      ×
                    </button>
                  </Badge>
                ))}
                
                {selectedTags.map(tag => (
                  <Badge key={tag} variant="secondary" className="px-3 py-1">
                    {tag}
                    <button 
                      className="mr-2 text-muted-foreground hover:text-foreground"
                      onClick={() => toggleTag(tag)}
                    >
                      ×
                    </button>
                  </Badge>
                ))}
                
                {showDiscount && (
                  <Badge variant="secondary" className="px-3 py-1">
                    تخفیف‌دار
                    <button 
                      className="mr-2 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowDiscount(false)}
                    >
                      ×
                    </button>
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Courses grid with loading skeleton */}
        {isLoading ? (
          <CoursesGridSkeleton count={9} />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {sortedCourses.length > 0 ? (
                sortedCourses.map((course) => (
                  <CourseCart 
                    key={course.id} 
                    course={course} 
                    gradientColor={gradientColor}
                    showLikeButton={true}
                  />
                ))
              ) : (
                <div className="col-span-3 py-20 text-center">
                  <h3 className="text-xl font-medium mb-2">هیچ دوره‌ای یافت نشد!</h3>
                  <p className="text-muted-foreground">لطفاً معیارهای جستجوی خود را تغییر دهید.</p>
                </div>
              )}
            </div>

            {/* Pagination (simple version) */}
            {sortedCourses.length > 0 && (
              <div className="flex justify-center mt-16">
                <div className="flex gap-2">
                  {[1, 2, 3].map(pageNum => (
                    <Button
                      key={pageNum}
                      variant={pageNum === 1 ? "default" : "outline"}
                      className="w-10 h-10 p-0 rounded-md"
                    >
                      {pageNum}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
