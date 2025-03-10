"use client";

import { useState, useEffect } from "react";
import HeroJson1 from "@/components/tools/HeroJson1";
import Link from "next/link";
import { ChevronLeft, BadgeCheck, ArrowRight, User } from "lucide-react";

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

              

              {/* CTA Buttons with enhanced design */}
              <div className="w-full flex gap-3 sm:gap-4 mt-6 sm:mt-8">
                <Link
                  href="/courses"
                  className="w-full md:w-auto px-6 sm:px-8 py-3 bg-gradient-to-r from-green to-green-500 hover:from-green-600 hover:to-green-500 text-white rounded-xl shadow-lg shadow-green/20 transition-all duration-300 hover:shadow-xl hover:shadow-green/30 hover:-translate-y-0.5 text-sm sm:text-base font-medium flex items-center justify-center gap-2 relative overflow-hidden group"
                >
                  <span className="relative z-10">شروع یادگیری</span>
                  <ArrowRight className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                  <span className="absolute right-0 top-0 h-full w-0 bg-white/10 transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link
                  href="/roadmap"
                  className="w-full md:w-auto px-6 sm:px-8 py-3 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 hover:border-green dark:hover:border-green text-gray-700 dark:text-gray-200 hover:text-green dark:hover:text-green rounded-xl shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 text-sm sm:text-base font-medium flex items-center justify-center gap-2"
                >
                  <ChevronLeft className="h-5 w-5" />
                  <span>مسیر آموزشی</span>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4 sm:pt-6">
                <div className="flex items-center gap-2 bg-white dark:bg-gray-800/80 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm px-3 py-2 relative">
                  <div className="absolute -left-1 -top-1">
                    <div className="h-5 w-5 rounded-full bg-green flex items-center justify-center ring-2 ring-white dark:ring-gray-800">
                      <BadgeCheck className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 pl-2">
                    مورد اعتماد بیش از <span className="text-green font-bold">۱۰۰,۰۰۰</span> دانشجو
                  </p>
                </div>
                <div className="flex items-center gap-4 xs:gap-6">
                  {/* Chart indicator - custom designed to match previous look but using Lucide */}
                  <div className="h-6 sm:h-8 bg-gray-100/50 dark:bg-gray-800/30 rounded-lg px-1.5 py-1 flex items-center">
                    <div className="flex items-end h-full gap-0.5">
                      <div className="w-1 h-[30%] bg-green/60 rounded-sm"></div>
                      <div className="w-1 h-[60%] bg-green/70 rounded-sm"></div>
                      <div className="w-1 h-[40%] bg-green/60 rounded-sm"></div>
                      <div className="w-1 h-[80%] bg-green rounded-sm"></div>
                      <div className="w-1 h-[45%] bg-green/70 rounded-sm"></div>
                      <div className="w-1 h-[65%] bg-green/80 rounded-sm"></div>
                      <div className="w-1 h-[35%] bg-green/60 rounded-sm"></div>
                    </div>
                  </div>

                  {/* Modernized user avatars */}
                  <div className="flex -space-x-2 rtl:space-x-reverse">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white shadow-sm bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center overflow-hidden transition-transform hover:scale-105 hover:z-10"
                      >
                        <User 
                          className="h-[60%] w-[60%] text-gray-500 dark:text-gray-300" 
                          strokeWidth={1.5}
                        />
                      </div>
                    ))}
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white dark:border-gray-700 shadow-sm bg-gradient-to-br from-green/20 to-green/40 dark:from-green/40 dark:to-green/60 flex items-center justify-center text-xs font-bold text-green dark:text-green-300 transition-transform hover:scale-105">
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
