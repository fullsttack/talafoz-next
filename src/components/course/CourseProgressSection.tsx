"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play } from "lucide-react";

interface CourseProgressSectionProps {
  progress: number;
  nextLesson: {
    lesson: {
      id: number;
      title: string;
      duration: string;
    };
    chapter: {
      id: number;
      title: string;
    };
  } | null;
}

export default function CourseProgressSection({ progress, nextLesson }: CourseProgressSectionProps) {
  if (!nextLesson) {
    return (
      <Card className="border rounded-xl bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-right">
              <h3 className="text-xl font-bold mb-2">تبریک! شما همه درس‌های این دوره را به پایان رسانده‌اید!</h3>
              <p className="text-muted-foreground">می‌توانید برای مرور دوباره، به سرفصل‌های دوره مراجعه کنید.</p>
            </div>
            
            <div className="relative w-20 h-20">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  className="stroke-current text-green-100 dark:text-green-900"
                  fill="none"
                  strokeWidth="3"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="stroke-current text-green-500"
                  fill="none"
                  strokeWidth="3"
                  strokeDasharray="100, 100"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text x="18" y="21" className="text-xl font-semibold" textAnchor="middle" fill="currentColor">
                  100%
                </text>
              </svg>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border rounded-xl bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-900">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-right">
            <h3 className="text-xl font-bold mb-2">ادامه یادگیری</h3>
            <p className="text-muted-foreground mb-4">درس بعدی: {nextLesson.lesson.title}</p>
            
            <Button className="gap-2">
              <Play className="w-4 h-4" />
              <span>ادامه دوره</span>
            </Button>
          </div>
          
          <div>
            <div className="flex items-center mb-2">
              <span className="text-sm font-medium text-muted-foreground ml-2">پیشرفت شما:</span>
              <span className="font-bold">{progress}%</span>
            </div>
            <div className="w-full md:w-64 h-3 bg-blue-100 dark:bg-blue-900/50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-1 text-xs text-muted-foreground">
              <span>فصل {nextLesson.chapter.id}: {nextLesson.chapter.title}</span>
              <span>درس {nextLesson.lesson.id}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 