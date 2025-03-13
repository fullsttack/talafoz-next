'use client';

import { BookOpen } from "lucide-react";
import Form from "next/form";

interface CategoryFilterProps {
  categories: string[];
  currentFilter: string;
}

export default function CategoryFilter({ categories, currentFilter }: CategoryFilterProps) {
  return (
    <div className="mb-6">
      <h3 className="font-semibold mb-3 flex items-center gap-2">
        <BookOpen className="h-4 w-4" />
        دسته‌بندی
      </h3>
      <div className="space-y-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
        <Form action="/blog" className="space-y-2">
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="all-categories"
              name="category"
              value=""
              defaultChecked={!currentFilter}
              className="h-4 w-4 text-primary"
              onChange={(e) => e.currentTarget.form?.submit()}
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
                defaultChecked={category === currentFilter}
                className="h-4 w-4 text-primary"
                onChange={(e) => e.currentTarget.form?.submit()}
              />
              <label
                htmlFor={`category-${idx}`}
                className="mr-2 text-sm"
              >
                {category}
              </label>
            </div>
          ))}
        </Form>
      </div>
    </div>
  );
} 