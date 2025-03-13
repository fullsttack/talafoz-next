'use client';

import { Search } from "lucide-react";
import Form from "next/form";

interface SearchFilterProps {
  query: string;
}

export default function SearchFilter({ query }: SearchFilterProps) {
  return (
    <Form action="/blog" className="mb-6">
      <div className="relative">
        <input
          name="query"
          defaultValue={query}
          placeholder="جستجوی مقاله..."
          className="w-full p-3 pl-10 rounded-xl border border-gray-200 dark:border-gray-700 text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      </div>
    </Form>
  );
} 