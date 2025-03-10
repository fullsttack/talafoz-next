import { Course } from '@/components/data/course';
import CourseCard from '@/components/course/CourseCard';

interface CourseGridProps {
  courses: Course[];
  title?: string;
  description?: string;
  isPremiumUser?: boolean;
}

export const CourseGrid = ({ 
  courses, 
  title, 
  description,
  isPremiumUser = false
}: CourseGridProps) => {
  return (
    <section className="py-10">
      {title && (
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-extrabold">{title}</h2>
          {description && (
            <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {courses.map((course) => (
          <CourseCard 
            key={course.id} 
            course={course} 
            isPremiumUser={isPremiumUser}
          />
        ))}
      </div>
    </section>
  );
};

export default CourseGrid; 