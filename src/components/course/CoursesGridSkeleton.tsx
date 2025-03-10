import { CourseCardSkeleton } from './CourseCardSkeleton';

interface CoursesGridSkeletonProps {
  count?: number;
}

export function CoursesGridSkeleton({ count = 6 }: CoursesGridSkeletonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {Array(count)
        .fill(null)
        .map((_, index) => (
          <CourseCardSkeleton key={index} />
        ))}
    </div>
  );
} 