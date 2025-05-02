import React from "react";
import { courses } from "../../_data/course";
import CourseCard from "../course/CourseCard";

const BestCourse: React.FC = () => {
  return (
    <div className="w-full flex flex-col container mx-auto px-4 md:px-12 gap-6 pt-24 md:pt-4 py-8">
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            محبوب‌ ترین دوره ‌ها
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400 text-xs">
            محبوب‌ ترین دوره‌ها را از اینجا مشاهده کنید
          </p>
        </div>
       
      </div>
      <div className="w-full  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            image={course.image}
            title={course.title}
            instructor={course.instructor}
            description={course.description}
            price={course.price}
            episodes={course.episodes}
            duration={course.duration}
            isFree={course.isFree}
            isVipFree={course.isVipFree}
          />
        ))}
      </div>
    </div>
  );
};

export default BestCourse;
