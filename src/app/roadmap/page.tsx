"use client";

import React from "react";
import Image from "next/image";
export default function RoadmapPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-gray-600 dark:text-gray-300">
      <Image src="/vector/roadmap.svg" alt="roadmap" className="" width={500} height={500} />
      <h2 className="mt-6 font-medium text-xl">مسیر آموزشی</h2>
      <p className="mt-2 text-gray-500 dark:text-gray-600">مسیر آموزشی ما را با خیال راحت مشاهده کنید</p>
    </div>
  );
}
