"use client";

import { useState, useEffect, memo } from "react";
import HeroJson2 from "@/components/tools/HeroJson2";

// Componente optimizado con memo para evitar re-renders innecesarios
const FeatureItem = memo(
  ({
    icon,
    title,
    description,
  }: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }) => (
    <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 border-b border-gray-100 dark:border-gray-800">
      <div className="flex-shrink-0">
        <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center text-green">
          {icon}
        </div>
      </div>
      <div>
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>
    </div>
  )
);

// Optimizando el nombre del componente para evitar cambios de referencia
FeatureItem.displayName = "FeatureItem";

export default function HeroTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative py-8 sm:py-10 md:py-16 overflow-hidden w-full">
      {/* Subtle background element */}
      <div className="absolute top-0 right-0 -z-10 w-56 sm:w-72 h-56 sm:h-72 bg-green/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-10">
          {/* Content Side */}
          <div
            className={`w-full lg:w-1/2 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            } transition-all duration-500 ease-out`}
            dir="rtl"
          >
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center py-1 px-2 sm:px-3 bg-green/10 rounded-full">
                <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-green ml-1.5 sm:ml-2"></span>
                <span className="text-xs sm:text-sm font-medium text-green">
                  فضای تمرین و پیشرفت تخصصی
                </span>
              </div>

              {/* Main heading */}
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                رشد با{" "}
                <span className="text-green">
                  تمرین‌های هدفمند
                </span>{" "}
                و پیگیری پیشرفت خود
              </h1>
            </div>

            {/* Animation in mobile view */}
            <div className="block lg:hidden mt-6 sm:mt-8 mb-6 sm:mb-8 max-w-xs sm:max-w-sm mx-auto">
              <HeroJson2 />
            </div>

            <div className="space-y-4 sm:space-y-6 mt-4 sm:mt-6">
              {/* Description with clean typography */}
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                با تمرین‌های متنوع و چالش‌های متناسب با سطح خود، مهارت‌های خود
                را تقویت کنید. سیستم پیشرفته‌ی پیگیری عملکرد، نقاط قوت و ضعف شما
                را شناسایی کرده و مسیر یادگیری را بر اساس نیازهای شما شخصی‌سازی
                می‌کند. با تمرین روزانه و مداوم، پیشرفت مشهودی را تجربه کنید.
              </p>


            </div>
          </div>

          {/* Animation Side - Only on desktop */}
          <div className="hidden lg:block lg:w-1/2">
            <div className="mx-auto">
              <HeroJson2 />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
