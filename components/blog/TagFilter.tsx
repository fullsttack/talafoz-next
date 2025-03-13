'use client';

import { Tag } from "lucide-react";
import Form from "next/form";

interface TagFilterProps {
  tags: string[];
  currentFilter: string;
}

export default function TagFilter({ tags, currentFilter }: TagFilterProps) {
  return (
    <div className="mb-6">
      <h3 className="font-semibold mb-3 flex items-center gap-2">
        <Tag className="h-4 w-4" />
        برچسب‌ها
      </h3>
      <div className="space-y-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
        <Form action="/blog" className="space-y-2">
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="all-tags"
              name="tag"
              value=""
              defaultChecked={!currentFilter}
              className="h-4 w-4 text-primary"
              onChange={(e) => e.currentTarget.form?.submit()}
            />
            <label htmlFor="all-tags" className="mr-2 text-sm">
              همه برچسب‌ها
            </label>
          </div>

          {tags.map((tag, idx) => (
            <div key={idx} className="flex items-center mb-2">
              <input
                type="radio"
                id={`tag-${idx}`}
                name="tag"
                value={tag}
                defaultChecked={tag === currentFilter}
                className="h-4 w-4 text-primary"
                onChange={(e) => e.currentTarget.form?.submit()}
              />
              <label
                htmlFor={`tag-${idx}`}
                className="mr-2 text-sm"
              >
                {tag}
              </label>
            </div>
          ))}
        </Form>
      </div>
    </div>
  );
} 