'use client';

import { Calendar } from "lucide-react";
import Form from "next/form";

interface YearFilterProps {
  years: string[];
  currentFilter: string;
}

export default function YearFilter({ years, currentFilter }: YearFilterProps) {
  return (
    <div className="mb-6">
      <h3 className="font-semibold mb-3 flex items-center gap-2">
        <Calendar className="h-4 w-4" />
        سال انتشار
      </h3>
      <Form action="/blog" className="space-y-2">
        <div className="flex items-center mb-2">
          <input
            type="radio"
            id="all-years"
            name="year"
            value=""
            defaultChecked={!currentFilter}
            className="h-4 w-4 text-primary"
            onChange={(e) => e.currentTarget.form?.submit()}
          />
          <label htmlFor="all-years" className="mr-2 text-sm">
            همه سال‌ها
          </label>
        </div>

        {years.map((year, idx) => (
          <div key={idx} className="flex items-center mb-2">
            <input
              type="radio"
              id={`year-${idx}`}
              name="year"
              value={year}
              defaultChecked={year === currentFilter}
              className="h-4 w-4 text-primary"
              onChange={(e) => e.currentTarget.form?.submit()}
            />
            <label htmlFor={`year-${idx}`} className="mr-2 text-sm">
              {year}
            </label>
          </div>
        ))}
      </Form>
    </div>
  );
} 