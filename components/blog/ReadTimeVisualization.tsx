'use client';

import { Clock } from "lucide-react";

export default function ReadTimeVisualization() {
  return (
    <div className="mb-6">
      <h3 className="font-semibold mb-3 flex items-center gap-2">
        <Clock className="h-4 w-4" />
        زمان مطالعه
      </h3>
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <span className="text-xs text-gray-500">کمتر از ۱۰ دقیقه</span>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 w-3/4 rounded-full"></div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-xs text-gray-500">۱۰ تا ۲۰ دقیقه</span>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 w-1/2 rounded-full"></div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-xs text-gray-500">بیشتر از ۲۰ دقیقه</span>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 w-1/4 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
} 