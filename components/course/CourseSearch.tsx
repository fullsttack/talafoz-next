'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function CourseSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // گرفتن عبارت جستجوی فعلی از URL
  const currentQuery = searchParams.get('query') || '';
  const [searchQuery, setSearchQuery] = useState(currentQuery);
  
  // آپدیت URL با عبارت جستجوی جدید
  const handleSearch = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (searchQuery) {
      params.set('query', searchQuery);
    } else {
      params.delete('query');
    }
    
    router.push(`${pathname}?${params.toString()}`);
  }, [searchQuery, router, pathname, searchParams]);
  
  // آپدیت URL هنگام تغییر عبارت جستجو با تاخیر
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery !== currentQuery) {
        handleSearch();
      }
    }, 500); // تاخیر 500 میلی‌ثانیه برای جلوگیری از درخواست‌های مکرر
    
    return () => clearTimeout(timer);
  }, [searchQuery, currentQuery, handleSearch]);
  
  // اجرای جستجو با فشار دادن Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  // پاک کردن عبارت جستجو
  const clearSearch = () => {
    setSearchQuery('');
    const params = new URLSearchParams(searchParams.toString());
    params.delete('query');
    router.push(`${pathname}?${params.toString()}`);
  };
  
  return (
    <div className="relative w-full">
      <div className="relative flex items-center">
        <Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="h-10 w-full rounded-lg border border-gray-300 bg-white py-2 pr-10 pl-10 text-right text-gray-900 placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-400"
          placeholder="جستجو در دوره‌ها..."
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="پاک کردن جستجو"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
} 