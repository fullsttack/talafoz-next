import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/layout/Header';

export const metadata: Metadata = {
  title: 'دوره‌های آموزشی | تالافز',
  description: 'مجموعه دوره‌های آموزشی برنامه‌نویسی و طراحی وب در زمینه‌های مختلف',
};

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="">
        <Header />  
      <div className="container max-w-7xl mx-auto py-8 md:py-12 px-2">
        {children}
      </div>
    </section>
  );
}
