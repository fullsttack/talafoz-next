"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { Course } from "@/components/data/course";

interface CourseInfoProps {
  course: Course;
}

export default function CourseInfo({ course }: CourseInfoProps) {
  const [activeTab, setActiveTab] = useState<
    "description" | "prerequisites" | "goals"
  >("description");

  const { description, prerequisites = [], goals = [] } = course;



  return (
    <div className="space-y-6">
      {/* تب‌ها */}
      <div className="border-b border-gray-200 dark:border-gray-800">
        <nav className="-mb-px flex space-x-4 space-x-reverse">
          <button
            onClick={() => setActiveTab("description")}
            className={`flex space-x-reverse gap-1.5 px-4 py-2 text-sm font-medium ${
              activeTab === "description"
                ? "border-b-2 border-primary text-primary"
                : "border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-gray-300"
            }`}
          >
            <span>توضیحات دوره</span>
          </button>

          <button
            onClick={() => setActiveTab("prerequisites")}
            className={`flex space-x-reverse gap-1.5 px-4 py-2 text-sm font-medium ${
              activeTab === "prerequisites"
                ? "border-b-2 border-primary text-primary"
                : "border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-gray-300"
            }`}
          >
            <span>پیش‌نیازها</span>
          </button>

          <button
            onClick={() => setActiveTab("goals")}
            className={`flex space-x-reverse gap-1.5 px-4 py-2 text-sm font-medium ${
              activeTab === "goals"
                ? "border-b-2 border-primary text-primary"
                : "border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-gray-300"
            }`}
          >
            <span>اهداف دوره</span>
          </button>
        </nav>
      </div>

      {/* محتوای تب */}
      <div className="rounded-lg border p-6 ">
        {/* توضیحات دوره */}
        {activeTab === "description" && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">توضیحات دوره :</h3>

            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="leading-7 text-gray-700 dark:text-gray-300">
                {description}
              </p>
            </div>
          </div>
        )}

        {/* پیش‌نیازها */}
        {activeTab === "prerequisites" && (
          <div className="space-y-4">
            {prerequisites.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">
                این دوره پیش‌نیاز خاصی ندارد.
              </p>
            ) : (
              <ul className="space-y-2">
                {prerequisites.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* اهداف دوره */}
        {activeTab === "goals" && (
          <div className="space-y-4">
            {goals.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">
                اهداف دوره هنوز مشخص نشده‌اند.
              </p>
            ) : (
              <ul className="space-y-2">
                {goals.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
