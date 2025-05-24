"use client";

import React, { useState, useMemo } from "react";
import { courses } from "@/data/course";
import CourseCard from "@/components/course/CourseCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Search, Filter, X, SlidersHorizontal } from "lucide-react";

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedInstructor, setSelectedInstructor] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // استخراج دسته‌بندی‌ها و مدرسان یکتا
  const categories = useMemo(() => {
    const cats = ["all", "React", "Next.js", "Node.js", "Angular", "Vue.js"];
    return cats;
  }, []);

  const instructors = useMemo(() => {
    const uniqueInstructors = ["all", ...new Set(courses.map(course => course.instructor))];
    return uniqueInstructors;
  }, []);

  // فیلتر کردن دوره‌ها
  const filteredCourses = useMemo(() => {
    let filtered = [...courses];

    // جستجو
    if (searchQuery) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // دسته‌بندی
    if (selectedCategory !== "all") {
      filtered = filtered.filter(course =>
        course.title.includes(selectedCategory)
      );
    }

    // مدرس
    if (selectedInstructor !== "all") {
      filtered = filtered.filter(course =>
        course.instructor === selectedInstructor
      );
    }

    // رایگان
    if (showFreeOnly) {
      filtered = filtered.filter(course => course.isFree);
    }

    // قیمت
    filtered = filtered.filter(course => {
      if (course.isFree) return true;
      const price = parseInt(course.price.replace(/[^\d]/g, ""));
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // مرتب‌سازی
    switch (sortBy) {
      case "priceAsc":
        filtered.sort((a, b) => {
          const priceA = a.isFree ? 0 : parseInt(a.price.replace(/[^\d]/g, ""));
          const priceB = b.isFree ? 0 : parseInt(b.price.replace(/[^\d]/g, ""));
          return priceA - priceB;
        });
        break;
      case "priceDesc":
        filtered.sort((a, b) => {
          const priceA = a.isFree ? 0 : parseInt(a.price.replace(/[^\d]/g, ""));
          const priceB = b.isFree ? 0 : parseInt(b.price.replace(/[^\d]/g, ""));
          return priceB - priceA;
        });
        break;
      case "popular":
        // فرض می‌کنیم دوره‌های اول محبوب‌تر هستند
        break;
      case "newest":
      default:
        filtered.reverse();
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedInstructor, showFreeOnly, priceRange, sortBy]);

  // کامپوننت فیلترها
  const FiltersContent = () => (
    <div className="space-y-6">
      {/* دسته‌بندی */}
      <div>
        <Label className="text-base font-semibold mb-3 block">دسته‌بندی</Label>
        <RadioGroup value={selectedCategory} onValueChange={setSelectedCategory}>
          {categories.map(category => (
            <div key={category} className="flex items-center space-x-2 space-x-reverse mb-2">
              <RadioGroupItem value={category} id={`cat-${category}`} />
              <Label
                htmlFor={`cat-${category}`}
                className="font-normal cursor-pointer flex-1"
              >
                {category === "all" ? "همه دسته‌ها" : category}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <Separator />

      {/* مدرس */}
      <div>
        <Label className="text-base font-semibold mb-3 block">مدرس</Label>
        <RadioGroup value={selectedInstructor} onValueChange={setSelectedInstructor}>
          {instructors.map(instructor => (
            <div key={instructor} className="flex items-center space-x-2 space-x-reverse mb-2">
              <RadioGroupItem value={instructor} id={`inst-${instructor}`} />
              <Label
                htmlFor={`inst-${instructor}`}
                className="font-normal cursor-pointer flex-1"
              >
                {instructor === "all" ? "همه مدرسان" : instructor}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <Separator />

      {/* قیمت */}
      <div>
        <Label className="text-base font-semibold mb-3 block">محدوده قیمت</Label>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="free-only"
              checked={showFreeOnly}
              onCheckedChange={(checked) => setShowFreeOnly(checked as boolean)}
            />
            <Label htmlFor="free-only" className="font-normal cursor-pointer">
              فقط دوره‌های رایگان
            </Label>
          </div>
          {!showFreeOnly && (
            <>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                min={0}
                max={1000000}
                step={50000}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{priceRange[0].toLocaleString("fa-IR")} تومان</span>
                <span>{priceRange[1].toLocaleString("fa-IR")} تومان</span>
              </div>
            </>
          )}
        </div>
      </div>

      <Separator />

      {/* دکمه پاک کردن فیلترها */}
      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          setSelectedCategory("all");
          setSelectedInstructor("all");
          setPriceRange([0, 1000000]);
          setShowFreeOnly(false);
        }}
      >
        پاک کردن فیلترها
      </Button>
    </div>
  );

  return (
    <div className="container mx-auto py-8 px-4 md:px-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">دوره‌های آموزشی</h1>
        <p className="text-muted-foreground">
          {filteredCourses.length} دوره از مجموع {courses.length} دوره
        </p>
      </div>

      {/* Search and Sort Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="جستجو در دوره‌ها..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10"
          />
        </div>

        {/* Sort */}
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="مرتب‌سازی" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">جدیدترین</SelectItem>
            <SelectItem value="popular">محبوب‌ترین</SelectItem>
            <SelectItem value="priceAsc">قیمت (کم به زیاد)</SelectItem>
            <SelectItem value="priceDesc">قیمت (زیاد به کم)</SelectItem>
          </SelectContent>
        </Select>

        {/* Filter Button for Mobile */}
        <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="md:hidden">
              <Filter className="h-4 w-4 ml-2" />
              فیلترها
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px]">
            <SheetHeader>
              <SheetTitle>فیلترها</SheetTitle>
              <SheetDescription>
                دوره‌های مورد نظر خود را فیلتر کنید
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6">
              <FiltersContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Active Filters */}
      {(selectedCategory !== "all" || selectedInstructor !== "all" || showFreeOnly || searchQuery) && (
        <div className="flex flex-wrap gap-2 mb-6">
          {searchQuery && (
            <Badge variant="secondary" className="gap-1">
              جستجو: {searchQuery}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => setSearchQuery("")}
              />
            </Badge>
          )}
          {selectedCategory !== "all" && (
            <Badge variant="secondary" className="gap-1">
              دسته: {selectedCategory}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => setSelectedCategory("all")}
              />
            </Badge>
          )}
          {selectedInstructor !== "all" && (
            <Badge variant="secondary" className="gap-1">
              مدرس: {selectedInstructor}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => setSelectedInstructor("all")}
              />
            </Badge>
          )}
          {showFreeOnly && (
            <Badge variant="secondary" className="gap-1">
              فقط رایگان
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => setShowFreeOnly(false)}
              />
            </Badge>
          )}
        </div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Filters Sidebar */}
        <aside className="hidden md:block lg:col-span-1">
          <div className="sticky top-4 bg-card rounded-lg border p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5" />
              فیلترها
            </h2>
            <FiltersContent />
          </div>
        </aside>

        {/* Courses Grid */}
        <div className="lg:col-span-3">
          {filteredCourses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">
                هیچ دوره‌ای با فیلترهای انتخابی یافت نشد
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setSelectedInstructor("all");
                  setPriceRange([0, 1000000]);
                  setShowFreeOnly(false);
                }}
              >
                پاک کردن فیلترها
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} {...course} id={course.id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}