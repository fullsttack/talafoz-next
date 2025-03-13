'use client';

import { User } from "lucide-react";
import Form from "next/form";

interface AuthorFilterProps {
  authors: string[];
  currentFilter: string;
}

export default function AuthorFilter({ authors, currentFilter }: AuthorFilterProps) {
  return (
    <div className="mb-6">
      <h3 className="font-semibold mb-3 flex items-center gap-2">
        <User className="h-4 w-4" />
        نویسنده
      </h3>
      <Form action="/blog" className="space-y-2">
        <div className="flex items-center mb-2">
          <input
            type="radio"
            id="all-authors"
            name="author"
            value=""
            defaultChecked={!currentFilter}
            className="h-4 w-4 text-primary"
            onChange={(e) => e.currentTarget.form?.submit()}
          />
          <label htmlFor="all-authors" className="mr-2 text-sm">
            همه نویسندگان
          </label>
        </div>

        {authors.map((author, idx) => (
          <div key={idx} className="flex items-center mb-2">
            <input
              type="radio"
              id={`author-${idx}`}
              name="author"
              value={author}
              defaultChecked={author === currentFilter}
              className="h-4 w-4 text-primary"
              onChange={(e) => e.currentTarget.form?.submit()}
            />
            <label htmlFor={`author-${idx}`} className="mr-2 text-sm">
              {author}
            </label>
          </div>
        ))}
      </Form>
    </div>
  );
} 