import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { use } from 'react';

import { courses } from '@/components/data/course';
import CourseContent from '@/components/course/CourseContent';

interface CoursePageProps {
  params: {
    id: string;
  };
  searchParams: {
    episodeId?: string;
  };
}

export default function CoursePage({ params, searchParams }: CoursePageProps) {
  // Usar React.use para acceder a los parámetros
  const id = use(params).id;
  const episodeId = use(searchParams).episodeId;
  
  // Encontrar el curso por ID
  const course = courses.find(course => course.id === id);
  
  // Si no se encuentra el curso, mostrar la página 404
  if (!course) {
    notFound();
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navegación de migas de pan */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Link href="/courses" className="hover:text-primary">دوره‌ها</Link>
          <ChevronLeft className="h-4 w-4" />
          <span>{course.title}</span>
        </div>
      </div>
      
      {/* Encabezado del curso */}
      <div className="mb-10">
        <h1 className="mb-4 text-3xl font-extrabold">{course.title}</h1>
      </div>
      
      {/* Contenido del curso */}
      <CourseContent course={course} initialEpisodeId={episodeId} />
    </div>
  );
} 