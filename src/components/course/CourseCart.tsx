"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import dynamic from "next/dynamic";
import Image from "next/image";

// Client-side only component to prevent hydration mismatch
const DynamicMagicCard = dynamic(
  () => import("@/components/magicui/magic-card").then((mod) => mod.MagicCard),
  { ssr: false }
);

// Define the course type for better type safety
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
}

interface CourseCartProps {
  course: CourseType;
  gradientColor: string;
  showLikeButton?: boolean;
}

export default function CourseCart({ course, gradientColor }: CourseCartProps) {
  return (
    <Card
      className="group overflow-hidden border-0 shadow-md hover:shadow-cyan-500/50 hover:shadow-lg transition-all duration-300"
    >
      <DynamicMagicCard
        gradientColor={gradientColor}
        gradientFrom={course.gradientFrom}
        gradientTo={course.gradientTo}
      >
        <div className="relative">
          {course.discount > 0 && (
            <div className="absolute top-4 left-4 z-10">
              <Badge className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-full text-foreground">
                تخفیف ویژه
              </Badge>
            </div>
          )}

          <div className="aspect-video relative w-full overflow-hidden p-4">
            <div className="relative h-full w-full rounded-lg overflow-hidden bg-muted/20">
              <Image
                src={course.image}
                alt={course.title}
                fill
                className="object-cover transition-transform group-hover:scale-105 duration-300"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>

        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-1 text-amber-500">
              <span className="text-sm font-medium">{course.rating}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="none"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <span className="text-xs text-muted-foreground">
                ({course.students})
              </span>
            </div>
            
            
          </div>
          <CardTitle className="text-right mt-3 text-xl">
            {course.title}
          </CardTitle>
          <CardDescription className="text-right text-sm py-2">
            {course.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="pb-2">
          <div className="flex justify-between">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M18 20a6 6 0 0 0-12 0" />
                  <circle cx="12" cy="10" r="4" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </div>
              <span className="text-sm">{course.instructor}</span>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm">10 جلسه</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-muted/50 rounded-lg p-2 text-center">
              <div className="flex justify-center items-center gap-1 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>{course.duration}</span>
              </div>
            </div>
            <div className="bg-muted/50 rounded-lg p-2 text-center">
              <div className="flex justify-center items-center gap-1 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M2 12a5 5 0 0 0 5 5 8 8 0 0 1 5 2 8 8 0 0 1 5-2 5 5 0 0 0 5-5V7h-5a8 8 0 0 0-5 2 8 8 0 0 0-5-2H2Z" />
                  <path d="M6 11H8" />
                  <path d="M16 11h2" />
                </svg>
                <span>{course.level}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-1 flex-wrap mb-4 justify-end">
            {course.tags.map((tag, index) => (
              <Badge
                key={index}
                variant="outline"
                className="rounded-full text-xs"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className="pt-2 flex justify-between items-center">
          <div className="text-primary font-bold text-lg">
            {course.price}
          </div>
          <Button variant="default" size="sm" className="rounded-lg px-5">
            مشاهده دوره
          </Button>
        </CardFooter>
      </DynamicMagicCard>
    </Card>
  );
}
