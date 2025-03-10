export interface CourseType {
  id: number;
  title: string;
  description: string;
  image: string;
  duration: string;
  level: string;
  price: string;
  instructor: string;
  rating: number;
  students: number;
  tags: string[];
  discount: number;
  isTrending?: boolean;
  gradientFrom: string;
  gradientTo: string;
  slug: string;
}

export interface ChapterType {
  id: number;
  title: string;
  description: string;
  lessons: LessonType[];
}

export interface LessonType {
  id: number;
  title: string;
  duration: string;
  description?: string;
  videoUrl?: string;
  completed?: boolean;
}

export interface InstructorType {
  id: number;
  name: string;
  avatar: string;
  bio: string;
  role: string;
  courses: number;
  students: number;
  rating: number;
  socialLinks?: {
    website?: string;
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface CourseProgressType {
  courseId: number;
  progress: number;
  completed: boolean;
  lastAccessedLesson: {
    chapterId: number;
    lessonId: number;
  };
  completedLessons: number[];
} 