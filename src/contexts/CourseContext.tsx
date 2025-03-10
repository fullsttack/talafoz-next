"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { 
  CourseType, 
  ChapterType, 
  LessonType, 
  CourseProgressType 
} from "@/types/course";

interface CourseContextType {
  activeCourse: CourseType | null;
  courseChapters: ChapterType[];
  courseProgress: CourseProgressType | null;
  setActiveCourse: (course: CourseType) => void;
  updateProgress: (lessonId: number) => void;
  loading: boolean;
  getNextLesson: () => { 
    lesson: LessonType; 
    chapter: ChapterType;
  } | null;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export function CourseProvider({ children }: { children: ReactNode }) {
  const [activeCourse, setActiveCourse] = useState<CourseType | null>(null);
  const [courseChapters, setCourseChapters] = useState<ChapterType[]>([]);
  const [courseProgress, setCourseProgress] = useState<CourseProgressType | null>(null);
  const [loading, setLoading] = useState(true);

  // Load course data when activeCourse changes
  useEffect(() => {
    if (activeCourse) {
      setLoading(true);
      
      // In a real app, this would be an API call
      const fetchCourseDetails = async () => {
        try {
          // Simulating API call to get chapters
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Mock data for demonstration
          const mockChapters: ChapterType[] = [
            {
              id: 1,
              title: "مقدمه",
              description: "آشنایی با دوره و مفاهیم پایه",
              lessons: [
                {
                  id: 1,
                  title: "معرفی دوره و نحوه یادگیری",
                  duration: "۰۵:۲۰",
                  completed: true
                },
                {
                  id: 2,
                  title: "نصب و راه‌اندازی ابزارهای مورد نیاز",
                  duration: "۱۲:۴۵",
                  completed: true
                }
              ]
            },
            {
              id: 2,
              title: "اصول اولیه",
              description: "یادگیری مفاهیم پایه",
              lessons: [
                {
                  id: 3,
                  title: "مفهوم اول",
                  duration: "۱۵:۳۰",
                  completed: true
                },
                {
                  id: 4,
                  title: "مفهوم دوم",
                  duration: "۲۰:۱۵",
                  completed: false
                },
                {
                  id: 5,
                  title: "تمرین عملی",
                  duration: "۲۵:۰۰",
                  completed: false
                }
              ]
            }
          ];
          
          // Mock progress data
          const mockProgress: CourseProgressType = {
            courseId: activeCourse.id,
            progress: 60,
            completed: false,
            lastAccessedLesson: {
              chapterId: 2,
              lessonId: 3
            },
            completedLessons: [1, 2, 3]
          };
          
          setCourseChapters(mockChapters);
          setCourseProgress(mockProgress);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching course details:", error);
          setLoading(false);
        }
      };
      
      fetchCourseDetails();
    }
  }, [activeCourse]);

  // Get the next lesson to continue
  const getNextLesson = () => {
    if (!courseProgress || !courseChapters.length) return null;
    
    const { lastAccessedLesson } = courseProgress;
    
    // Find the current chapter
    const currentChapter = courseChapters.find(
      chapter => chapter.id === lastAccessedLesson.chapterId
    );
    
    if (!currentChapter) return null;
    
    // Find current lesson
    const currentLessonIndex = currentChapter.lessons.findIndex(
      lesson => lesson.id === lastAccessedLesson.lessonId
    );
    
    // Check if there are more lessons in the current chapter
    if (currentLessonIndex < currentChapter.lessons.length - 1) {
      const nextLesson = currentChapter.lessons[currentLessonIndex + 1];
      return {
        lesson: nextLesson,
        chapter: currentChapter
      };
    }
    
    // Find the next chapter
    const currentChapterIndex = courseChapters.findIndex(
      chapter => chapter.id === currentChapter.id
    );
    
    if (currentChapterIndex < courseChapters.length - 1) {
      const nextChapter = courseChapters[currentChapterIndex + 1];
      if (nextChapter.lessons.length > 0) {
        return {
          lesson: nextChapter.lessons[0],
          chapter: nextChapter
        };
      }
    }
    
    return null;
  };

  // Update progress when a lesson is completed
  const updateProgress = (lessonId: number) => {
    if (!courseProgress) return;
    
    // Check if lesson is already completed
    if (courseProgress.completedLessons.includes(lessonId)) return;
    
    // Calculate total lessons count
    const totalLessons = courseChapters.reduce(
      (total, chapter) => total + chapter.lessons.length, 0
    );
    
    // Add lesson to completed lessons
    const updatedCompletedLessons = [...courseProgress.completedLessons, lessonId];
    
    // Calculate new progress percentage
    const newProgress = Math.round(
      (updatedCompletedLessons.length / totalLessons) * 100
    );
    
    // Update progress state
    setCourseProgress({
      ...courseProgress,
      progress: newProgress,
      completed: newProgress === 100,
      completedLessons: updatedCompletedLessons
    });
  };

  return (
    <CourseContext.Provider
      value={{
        activeCourse,
        courseChapters,
        courseProgress,
        setActiveCourse,
        updateProgress,
        loading,
        getNextLesson
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}

export const useCourse = () => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error("useCourse must be used within a CourseProvider");
  }
  return context;
}; 