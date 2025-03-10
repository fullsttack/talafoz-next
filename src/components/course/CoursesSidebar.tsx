"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";


interface CoursesSidebarProps {
  searchQuery: string;
  filterLevel: string[];
  selectedTags: string[];
  showDiscount: boolean;
  sortBy: string;
  allTags: string[];
  onSearchChange: (value: string) => void;
  onLevelToggle: (level: string) => void;
  onTagToggle: (tag: string) => void;
  onDiscountChange: (checked: boolean) => void;
  onSortChange: (value: string) => void;
  onResetFilters: () => void;
}

export function CoursesSidebar({
  searchQuery,
  filterLevel,
  selectedTags,
  sortBy,
  allTags,
  onSearchChange,
  onLevelToggle,
  onTagToggle,
  onSortChange,
  onResetFilters,
}: CoursesSidebarProps) {
  return (
    <div className="bg-card rounded-xl p-6 shadow-sm">
      {/* Search input */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">جستجو</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="جستجوی دوره..." 
            className="pr-4 pl-10 w-full"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
      
      {/* Level filter */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">سطح دوره</h3>
        <div className="space-y-2">
          {["سطح مبتدی", "سطح متوسط", "سطح پیشرفته", "همه سطوح"].map((level) => (
            <div key={level} className="flex items-center">
              <Checkbox 
                id={`level-${level}`} 
                checked={filterLevel.includes(level)}
                onCheckedChange={() => onLevelToggle(level)}
              />
              <Label 
                htmlFor={`level-${level}`}
                className="mr-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {level}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      
      
      {/* Sort options */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">مرتب‌سازی بر اساس</h3>
        <RadioGroup value={sortBy} onValueChange={onSortChange}>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="newest" id="newest" />
            <Label htmlFor="newest">جدیدترین</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="popular" id="popular" />
            <Label htmlFor="popular">محبوب‌ترین</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="rating" id="rating" />
            <Label htmlFor="rating">بیشترین امتیاز</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="price-low" id="price-low" />
            <Label htmlFor="price-low">ارزان‌ترین</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="price-high" id="price-high" />
            <Label htmlFor="price-high">گران‌ترین</Label>
          </div>
        </RadioGroup>
      </div>
      
      {/* Tags filter */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">دسته‌بندی‌ها</h3>
        <div className="flex flex-wrap gap-2">
          {allTags.map(tag => (
            <Badge 
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => onTagToggle(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      
      {/* Reset filters button */}
      <Button 
        variant="outline" 
        className="w-full"
        onClick={onResetFilters}
      >
        پاک کردن فیلترها
      </Button>
    </div>
  );
} 