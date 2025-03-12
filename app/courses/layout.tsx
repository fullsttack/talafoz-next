import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "دوره‌های آموزشی | تالافز",
  description:
    "مجموعه دوره‌های آموزشی برنامه‌نویسی و طراحی وب در زمینه‌های مختلف",
};

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      {children}
    </div>
  );
}
