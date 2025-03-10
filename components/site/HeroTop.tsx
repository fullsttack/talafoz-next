"use client";

import { useState, useEffect } from "react";
import HeroJson1 from "@/components/tools/HeroJson1";
import Link from "next/link";

export default function HeroTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden w-full">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-[10%] w-64 h-64 rounded-full bg-green/5 blur-3xl"></div>
        <div className="absolute bottom-10 left-[5%] w-72 h-72 rounded-full bg-indigo-500/5 blur-3xl"></div>
        <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-yellow-500/5 blur-3xl"></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-center opacity-[0.015]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 lg:gap-16">
          {/* Content Side */}
          <div
            className={`w-full lg:w-1/2 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            } transition-all duration-700 ease-out`}
            dir="rtl"
          >
            <div className="space-y-4 sm:space-y-6 md:space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-green/10 to-green/5 border border-green/20">
                <span className="w-2 h-2 rounded-full bg-green ml-2"></span>
                <span className="text-xs sm:text-sm font-medium text-green">
                  پلتفرم تخصصی آموزش تلفظ
                </span>
              </div>

              {/* Main heading */}
              <h1 className="text-xl sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight">
                تسلط بر{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-green">
                    مهارت‌های دیجیتال
                  </span>
                  <span className="absolute -bottom-2 left-0 right-0 h-3 bg-green/10 rounded-lg"></span>
                </span>{" "}
                با آموزش‌های کاربردی
              </h1>
            </div>

            {/* Animation in mobile view - appears after h1 */}
            <div className="block lg:hidden mt-8 mb-8">
              <HeroJson1 />
            </div>

            <div className="space-y-4 sm:space-y-6 md:space-y-8 mt-6">
              {/* Description with enhanced typography */}
              <p className="text-sm sm:text-xs md:text-sm text-gray-500 dark:text-gray-300 leading-relaxed">
                دوره‌های جامع و پیشرفته در زمینه‌های برنامه‌نویسی وب، موبایل،
                هوش مصنوعی و فناوری‌های نوین. با متدهای آموزشی منحصربفرد، بیش از
                ۵۰ دوره تخصصی و پشتیبانی ۲۴/۷ از متخصصین، مسیر شغلی خود را متحول
                کنید.
              </p>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green/10 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-green"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-300">
                    بیش از ۵۰ دوره تخصصی
                  </span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green/10 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-green"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-300">
                    گواهینامه معتبر بین‌المللی
                  </span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green/10 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-green"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-300">
                    پشتیبانی ۲۴/۷
                  </span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green/10 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-green"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-300">
                    پروژه‌های عملی و واقعی
                  </span>
                </div>
              </div>

              {/* CTA Buttons with enhanced design */}
              <div className="w-full flex gap-3 sm:gap-4 mt-6 sm:mt-8">
                <Link
                  href="/courses"
                  className="w-full md:w-auto px-6 sm:px-8 py-2.5 border border-green rounded-lg shadow-lg shadow-green/20 transition-all hover:shadow-xl hover:shadow-green/30 hover:-translate-y-0.5 text-sm sm:text-base flex items-center justify-center gap-2"
                >
                  <span>شروع یادگیری</span>
                </Link>
                <Link
                  href="/roadmap"
                  className="w-full md:w-auto px-6 sm:px-8 py-2.5 border-b border-green rounded-lg transition-all text-sm sm:text-base flex items-center justify-center gap-2"
                >
                  <span>مسیر آموزشی</span>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex pt-4 sm:pt-6">
                <p className="text-xs sm:text-sm dark:text-gray-300 text-gray-500 mb-2 sm:mb-3">
                  مورد اعتماد بیش از ۱۰۰,۰۰۰ دانشجو
                </p>
                <div className="flex items-center gap-4 xs:gap-6">
                  <div className="h-6 sm:h-8 w-auto opacity-70">
                    <svg
                      width="100"
                      height="30"
                      viewBox="0 0 100 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        width="100"
                        height="30"
                        rx="4"
                        fill="currentColor"
                        fillOpacity="0.1"
                        className="text-gray-800"
                      />
                      <path
                        d="M20 15L22.5 20L27.5 10L32.5 20L37.5 5L42.5 25L47.5 15L50 18.5L57.5 8.5L65 15L70 12.5L80 17.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-green"
                      />
                    </svg>
                  </div>
                  <div className="flex -space-x-2 rtl:space-x-reverse">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white shadow-sm bg-gray-200 flex items-center justify-center overflow-hidden"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-full w-full text-gray-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    ))}
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white shadow-sm bg-green/10 flex items-center justify-center text-xs font-bold text-green">
                      +99
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Animation Side - Only on desktop */}
          <div className="hidden lg:block lg:w-1/2">
            <HeroJson1 />
          </div>
        </div>
      </div>
    </section>
  );
}
