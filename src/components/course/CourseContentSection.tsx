"use client";

import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Lock, Play } from "lucide-react";
import { ChapterType, LessonType } from "@/types/course";
import { useCourse } from "@/contexts/CourseContext";

interface CourseContentSectionProps {
  isPurchased?: boolean;
}

export default function CourseContentSection({ isPurchased = false }: CourseContentSectionProps) {
  const { courseChapters, courseProgress, loading, updateProgress } = useCourse();
  const [expandedChapter, setExpandedChapter] = useState<string | null>("chapter-0");
  
  // Calculate total duration and lessons
  const totalLessons = courseChapters.reduce((total, chapter) => 
    total + chapter.lessons.length, 0
  );
  
  const totalDuration = courseChapters.reduce((total, chapter) => {
    return total + chapter.lessons.reduce((chapterTotal, lesson) => {
      // Extract duration in minutes (assuming format like "۱۰:۳۰")
      const durationParts = lesson.duration.split(":");
      let minutes = 0;
      
      // Handle different time formats
      if (durationParts.length === 2) {
        const hours = parseInt(durationParts[0].replace(/[^\d]/g, '') || "0");
        const mins = parseInt(durationParts[1].replace(/[^\d]/g, '') || "0");
        minutes = hours * 60 + mins;
      }
      
      return chapterTotal + minutes;
    }, 0);
  }, 0);
  
  // Format total duration as hours and minutes
  const formatTotalDuration = () => {
    const hours = Math.floor(totalDuration / 60);
    const minutes = totalDuration % 60;
    
    if (hours === 0) {
      return `${minutes} دقیقه`;
    }
    
    return `${hours} ساعت و ${minutes} دقیقه`;
  };
  
  const isLessonCompleted = (lessonId: number) => {
    if (!courseProgress || !courseProgress.completedLessons) return false;
    return courseProgress.completedLessons.includes(lessonId);
  };
  
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>سرفصل‌های دوره</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex flex-col space-y-2">
                  <div className="h-10 bg-muted rounded"></div>
                  <div className="h-24 bg-muted/50 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader className="border-b">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <CardTitle>سرفصل‌های دوره</CardTitle>
          <div className="flex gap-4 items-center text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{formatTotalDuration()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Play className="w-4 h-4" />
              <span>{totalLessons} درس</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Accordion
          type="single"
          collapsible
          defaultValue="chapter-0"
          value={expandedChapter || undefined}
          onValueChange={(value) => setExpandedChapter(value)}
          className="w-full"
        >
          {courseChapters.map((chapter, index) => (
            <AccordionItem key={chapter.id} value={`chapter-${index}`} className="border-0 border-b">
              <AccordionTrigger className="p-4 hover:no-underline hover:bg-muted/50">
                <div className="flex justify-between items-center w-full">
                  <div className="flex flex-col text-right">
                    <span className="font-bold">{chapter.title}</span>
                    <span className="text-sm text-muted-foreground">
                      {chapter.lessons.length} درس
                    </span>
                  </div>
                  <div className="md:flex items-center gap-2 hidden">
                    {chapter.lessons.every(lesson => 
                      courseProgress?.completedLessons.includes(lesson.id)
                    ) && (
                      <Badge variant="success" className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                        تکمیل شده
                      </Badge>
                    )}
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-0">
                <div className="flex flex-col divide-y border-t">
                  {chapter.lessons.map((lesson) => (
                    <LessonItem 
                      key={lesson.id}
                      lesson={lesson}
                      isPurchased={isPurchased}
                      isCompleted={isLessonCompleted(lesson.id)}
                      onComplete={() => updateProgress(lesson.id)}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}

interface LessonItemProps {
  lesson: LessonType;
  isPurchased: boolean;
  isCompleted: boolean;
  onComplete: () => void;
}

function LessonItem({ lesson, isPurchased, isCompleted, onComplete }: LessonItemProps) {
  return (
    <div className="flex justify-between items-center p-4 hover:bg-muted/30 transition-colors">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">
          {isCompleted ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : isPurchased ? (
            <Play className="w-5 h-5 text-blue-500" />
          ) : (
            <Lock className="w-5 h-5 text-muted-foreground" />
          )}
        </div>
        <div className="text-right">
          <h4 className="font-medium">{lesson.title}</h4>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{lesson.duration}</span>
          </div>
        </div>
      </div>
      
      <div>
        {isPurchased && !isCompleted && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={(e) => {
              e.stopPropagation();
              onComplete();
            }}
          >
            علامت تکمیل
          </Button>
        )}
        
        {!isPurchased && (
          <Badge variant="outline" className="bg-muted">قفل شده</Badge>
        )}
      </div>
    </div>
  );
} 