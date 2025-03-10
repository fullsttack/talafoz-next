"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import CourseCart from "@/components/course/CourseCart";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CoursesGridSkeleton } from "@/components/course/CoursesGridSkeleton";
import { ALL_COURSES } from "@/data/courses";
import { Filter, Grid, List, Search, Tag, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
export default function CoursesPage() {
  const { theme } = useTheme();
  const gradientColor = theme === "dark" ? "#262626" : "#D9D9D955";
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLevel, setFilterLevel] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showDiscount, setShowDiscount] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
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
    }, 1000);
    
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
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
      course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
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
        return parseFloat(a.price.replace(/,/g, '')) - parseFloat(b.price.replace(/,/g, ''));
      case "price-high":
        return parseFloat(b.price.replace(/,/g, '')) - parseFloat(a.price.replace(/,/g, ''));
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

  // Check if any filter is active
  const isAnyFilterActive = searchQuery !== "" || filterLevel.length > 0 || selectedTags.length > 0 || showDiscount;

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
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [searchQuery, filterLevel, selectedTags, showDiscount, sortBy, isLoading]);

  // Filters sidebar content
  const FiltersSidebar = () => (
    <div className="space-y-6">
      {/* Search input */}
      <div>
        <h3 className="text-lg font-medium mb-3">جستجو</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="جستجوی دوره..." 
            className="pr-4 pl-10 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <Separator />
      
      {/* Level filter */}
      <div>
        <h3 className="text-lg font-medium mb-3">سطح دوره</h3>
        <div className="flex flex-wrap gap-2">
          {["سطح مبتدی", "سطح متوسط", "سطح پیشرفته", "همه سطوح"].map((level) => (
            <Badge 
              key={level}
              variant={filterLevel.includes(level) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleLevel(level)}
            >
              {level}
            </Badge>
          ))}
        </div>
      </div>
      
      <Separator />
      
      {/* Tags filter */}
      <div>
        <h3 className="text-lg font-medium mb-3">دسته‌بندی‌ها</h3>
        <div className="flex flex-wrap gap-2">
          {allTags.map(tag => (
            <Badge 
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      
      <Separator />
      
      {/* Price filter */}
      <div>
        <h3 className="text-lg font-medium mb-3">قیمت</h3>
        <Badge 
          variant={showDiscount ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => setShowDiscount(!showDiscount)}
        >
          فقط تخفیف‌دار
        </Badge>
      </div>
      
      <Separator />
      
      {/* Reset filters button */}
      <Button 
        variant="outline" 
        className="w-full"
        onClick={resetFilters}
        disabled={!isAnyFilterActive}
      >
        پاک کردن فیلترها
      </Button>
    </div>
  );

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop Sidebar for filters - hidden on mobile */}
        <div className="lg:block hidden lg:w-1/4 h-fit">
          <div className="bg-card rounded-xl p-6 shadow-sm sticky top-24">
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">جستجو</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  placeholder="جستجوی دوره..." 
                  className="pr-4 pl-10 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <Separator className="mb-6" />
            <FiltersSidebar />
          </div>
        </div>
        
        {/* Main content area */}
        <div className="lg:w-3/4 w-full">
          {/* Toolbar with sorting, filters, and view toggle */}
          <div className="bg-card rounded-xl p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
            {/* Mobile filter button */}
            <Dialog open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden gap-2">
                  <Filter className="h-4 w-4" />
                  فیلترها
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogTitle className="mb-2 text-lg font-semibold">فیلترها</DialogTitle>
                <p className="text-sm text-muted-foreground mb-4">
                  دوره‌ها را بر اساس معیارهای مختلف فیلتر کنید
                </p>
                <div className="mb-6">
                  <h3 className="text-base font-medium mb-3">جستجو</h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input 
                      placeholder="جستجوی دوره..." 
                      className="pr-4 pl-10 w-full"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <Separator className="mb-4" />
                <ScrollArea className="h-[60vh] pr-4">
                  <FiltersSidebar />
                </ScrollArea>
              </DialogContent>
            </Dialog>

            {/* Count results */}
            <div className="text-sm text-muted-foreground">
              {isLoading ? (
                <div className="h-4 w-24 bg-muted animate-pulse rounded"></div>
              ) : (
                <span>{sortedCourses.length} دوره یافت شد</span>
              )}
            </div>
            
            {/* View mode and sort options */}
            <div className="flex items-center gap-2">
              {/* Sort dropdown */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] text-sm h-9">
                  <SelectValue placeholder="مرتب‌سازی" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">جدیدترین</SelectItem>
                  <SelectItem value="popular">محبوب‌ترین</SelectItem>
                  <SelectItem value="rating">بیشترین امتیاز</SelectItem>
                  <SelectItem value="price-low">ارزان‌ترین</SelectItem>
                  <SelectItem value="price-high">گران‌ترین</SelectItem>
                </SelectContent>
              </Select>
              
              {/* View mode toggle */}
              <div className="rounded-md border p-1 flex">
                <Button 
                  variant={viewMode === "grid" ? "default" : "ghost"} 
                  size="sm" 
                  className="h-7 w-7 p-0"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button 
                  variant={viewMode === "list" ? "default" : "ghost"} 
                  size="sm" 
                  className="h-7 w-7 p-0"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Active filters */}
          {isAnyFilterActive && !isLoading && (
            <div className="mb-6 flex items-center flex-wrap gap-2">
              <span className="text-sm text-muted-foreground ml-2 flex items-center gap-1">
                <Tag className="h-4 w-4" />
                فیلترهای فعال:
              </span>
              
              {searchQuery && (
                <Badge variant="secondary" className="px-3 py-1">
                  جستجو: {searchQuery}
                  <button 
                    className="mr-2 text-muted-foreground hover:text-foreground"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              
              {filterLevel.map(level => (
                <Badge key={level} variant="secondary" className="px-3 py-1">
                  {level}
                  <button 
                    className="mr-2 text-muted-foreground hover:text-foreground"
                    onClick={() => toggleLevel(level)}
                  >
                    <X className="h-3 w-3" />
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
                    <X className="h-3 w-3" />
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
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              
              {isAnyFilterActive && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs h-7"
                  onClick={resetFilters}
                >
                  پاک کردن همه
                </Button>
              )}
            </div>
          )}
          
          {/* Courses grid with loading skeleton */}
          {isLoading ? (
            <CoursesGridSkeleton count={9} />
          ) : (
            <>
              {viewMode === "grid" ? (
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
                      <Button 
                        variant="outline" 
                        className="mt-4"
                        onClick={resetFilters}
                      >
                        پاک کردن فیلترها
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {sortedCourses.length > 0 ? (
                    sortedCourses.map((course) => (
                      <div key={course.id} className="flex flex-col md:flex-row gap-4 p-4 border rounded-xl hover:shadow-md transition-all">
                        <div className="md:w-1/4 aspect-video md:aspect-square relative rounded-lg overflow-hidden">
                          <Image 
                            src={course.image} 
                            alt={course.title}
                            fill
                            className="object-cover w-full h-full"
                          />
                          {course.discount > 0 && (
                            <div className="absolute top-2 left-2">
                              <Badge className="bg-red-500">{course.discount}%</Badge>
                            </div>
                          )}
                        </div>
                        <div className="md:w-3/4 flex flex-col justify-between">
                          <div>
                            <div className="flex flex-wrap gap-1 mb-2">
                              {course.tags.slice(0, 3).map(tag => (
                                <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                              ))}
                            </div>
                            <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                            <p className="text-muted-foreground mb-4 line-clamp-2">{course.description}</p>
                            <div className="flex flex-wrap gap-4 mb-2">
                              <div className="flex items-center gap-1 text-sm">
                                <span>مدرس:</span>
                                <span className="font-medium">{course.instructor}</span>
                              </div>
                              <div className="flex items-center gap-1 text-sm">
                                <span>سطح:</span>
                                <span className="font-medium">{course.level}</span>
                              </div>
                              <div className="flex items-center gap-1 text-sm">
                                <span>مدت زمان:</span>
                                <span className="font-medium">{course.duration}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center">
                              <div className="flex items-center gap-1 text-amber-500">
                                <span className="font-medium">{course.rating}</span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  stroke="none"
                                >
                                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                </svg>
                                <span className="text-xs text-muted-foreground">({course.students})</span>
                              </div>
                            </div>
                            <div className="text-left">
                              {course.discount > 0 ? (
                                <div>
                                  <span className="text-muted-foreground line-through text-sm ml-2">{course.price} تومان</span>
                                  <span className="text-primary font-bold">{parseInt(course.price) * (1 - course.discount / 100)} تومان</span>
                                </div>
                              ) : (
                                <span className="text-primary font-bold">{course.price} تومان</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-20 text-center">
                      <h3 className="text-xl font-medium mb-2">هیچ دوره‌ای یافت نشد!</h3>
                      <p className="text-muted-foreground">لطفاً معیارهای جستجوی خود را تغییر دهید.</p>
                      <Button 
                        variant="outline" 
                        className="mt-4"
                        onClick={resetFilters}
                      >
                        پاک کردن فیلترها
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* Pagination */}
              {sortedCourses.length > 12 && (
                <div className="flex justify-center mt-16">
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(pageNum => (
                      <Button
                        key={pageNum}
                        variant={pageNum === 1 ? "default" : "outline"}
                        size="icon"
                        className="w-10 h-10"
                      >
                        {pageNum}
                      </Button>
                    ))}
                    <Button variant="outline" size="icon" className="w-10 h-10">
                      ...
                    </Button>
                    <Button variant="outline" size="icon" className="w-10 h-10">
                      10
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
