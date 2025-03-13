import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "مقالات و آموزش‌ها | تالافز",
  description:
    "جدیدترین مقالات، آموزش‌ها و اخبار دنیای برنامه‌نویسی و طراحی وب",
};

export default function BlogLayout({
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