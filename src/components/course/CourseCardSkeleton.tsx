import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export function CourseCardSkeleton() {
  return (
    <Card className="overflow-hidden border-0 shadow-md">
      {/* Image skeleton */}
      <div className="relative p-4">
        <div className="aspect-video relative w-full overflow-hidden rounded-lg">
          <Skeleton className="absolute inset-0 h-full w-full" />
        </div>
      </div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Skeleton className="h-4 w-20" />
        </div>
        {/* Title skeleton */}
        <Skeleton className="h-6 w-full mt-3" />
        {/* Description skeleton */}
        <div className="space-y-2 py-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </CardHeader>

      <CardContent className="pb-2">
        <div className="flex justify-between">
          {/* Instructor skeleton */}
          <div className="flex items-center gap-2 mb-4">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>

          {/* Session count skeleton */}
          <div className="flex items-center gap-2 mb-4">
            <Skeleton className="h-4 w-16" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          {/* Duration skeleton */}
          <Skeleton className="h-10 w-full rounded-lg" />
          {/* Level skeleton */}
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>

        {/* Tags skeleton */}
        <div className="flex flex-wrap gap-2 mb-4 justify-end">
          <Skeleton className="h-6 w-12 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-14 rounded-full" />
        </div>
      </CardContent>

      <CardFooter className="pt-2 flex justify-between items-center">
        {/* Price skeleton */}
        <Skeleton className="h-6 w-24" />
        {/* Button skeleton */}
        <Skeleton className="h-9 w-28 rounded-lg" />
      </CardFooter>
    </Card>
  );
} 