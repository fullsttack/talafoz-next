'use client'

import { useState, useEffect } from 'react';

export default function BannerDiscount() {
  const [timeLeft, setTimeLeft] = useState({
    days: 5,
    hours: 12,
    minutes: 48,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="my-16">
      {/* New modern design with 3D elements and neomorphism style */}
      <div className="relative rounded-3xl bg-gradient-to-tr from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 shadow-2xl overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-cyan-400/20 dark:bg-cyan-500/10 blur-3xl"></div>
          <div className="absolute -left-24 -bottom-24 w-96 h-96 rounded-full bg-amber-400/20 dark:bg-amber-500/10 blur-3xl"></div>
          <div className="absolute right-1/4 bottom-0 w-64 h-64 rounded-full bg-purple-400/20 dark:bg-purple-500/10 blur-3xl"></div>
        </div>

        {/* Main content container */}
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 lg:p-12">
          {/* Left Section - Content */}
          <div className="flex flex-col justify-center text-right space-y-8">
            {/* Badge */}
            <div className="self-start">
              <div className="inline-flex items-center py-1.5 px-3 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-xs font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
                پیشنهاد محدود
              </div>
            </div>

            {/* Heading */}
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-zinc-800 dark:text-white">
                <span className="block">تخفیف استثنایی</span>
                <span className="bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-500 dark:to-orange-500 bg-clip-text text-transparent">
                  دوره‌های آموزشی دیجیتال
                </span>
              </h2>
              <p className="mt-4 text-zinc-600 dark:text-zinc-300">
                فرصتی طلایی برای ارتقای مهارت‌های دیجیتالی خود با کمترین هزینه. آموزش‌های تخصصی با کیفیت عالی از مدرسین برتر.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: "✓", text: "دسترسی نامحدود به محتوا" },
                { icon: "✓", text: "پشتیبانی آنلاین ۲۴/۷" },
                { icon: "✓", text: "پروژه‌های عملی و کاربردی" },
                { icon: "✓", text: "گواهینامه معتبر بین‌المللی" }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-2 space-x-reverse">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center text-xs">
                    {item.icon}
                  </span>
                  <span className="text-sm text-zinc-700 dark:text-zinc-300">{item.text}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-gradient-to-br from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl font-medium shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all duration-300 transform hover:-translate-y-0.5">
                خرید با ۵۰٪ تخفیف
              </button>
              <button className="px-6 py-3 bg-white/80 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-white hover:dark:bg-zinc-700 rounded-xl font-medium border border-zinc-200 dark:border-zinc-700 transition-all duration-300">
                اطلاعات بیشتر
              </button>
            </div>
          </div>

          {/* Right Section - Discount and Timer */}
          <div className="flex flex-col items-center justify-center space-y-8">
            {/* Discount Card */}
            <div className="relative w-full max-w-sm">
              {/* Card */}
              <div className="relative p-6 bg-white dark:bg-zinc-800 rounded-2xl shadow-lg border border-zinc-100 dark:border-zinc-700 overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-amber-400/20 to-orange-500/20 blur-2xl rounded-full -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-cyan-400/20 to-teal-500/20 blur-2xl rounded-full -ml-20 -mb-20"></div>
                
                {/* Content */}
                <div className="relative flex items-center">
                  {/* Discount Circle */}
                  <div className="flex-shrink-0 w-28 h-28 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
                    <div className="text-center">
                      <span className="block text-4xl font-extrabold text-white">۵۰٪</span>
                      <span className="block text-sm font-medium text-white/90">تخفیف</span>
                    </div>
                  </div>
                  
                  {/* Product Info */}
                  <div className="ml-6 text-right">
                    <div className="flex flex-col">
                      <span className="text-zinc-500 dark:text-zinc-400 text-sm line-through">۱۸۰۰,۰۰۰ تومان</span>
                      <span className="text-2xl font-bold text-zinc-900 dark:text-white mt-1">۹۰۰,۰۰۰ تومان</span>
                      <span className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">شامل تمام دوره‌های آموزشی</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Timer */}
            <div className="w-full max-w-sm">
              <div className="p-5 bg-white/70 dark:bg-zinc-800/70 backdrop-blur-sm rounded-2xl shadow-lg border border-zinc-100 dark:border-zinc-700">
                <h3 className="text-center text-zinc-700 dark:text-zinc-300 font-medium mb-4">فرصت باقیمانده:</h3>
                
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { value: timeLeft.days, label: 'روز' },
                    { value: timeLeft.hours, label: 'ساعت' },
                    { value: timeLeft.minutes, label: 'دقیقه' },
                    { value: timeLeft.seconds, label: 'ثانیه' }
                  ].map((item, index) => (
                    <div key={index} className="relative">
                      <div className="p-2 bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-700 dark:to-zinc-800 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-600">
                        <div className="text-center">
                          <div className="text-xl md:text-2xl font-bold text-zinc-800 dark:text-white">
                            {String(item.value).padStart(2, '0')}
                          </div>
                          <div className="text-xs text-zinc-500 dark:text-zinc-400">
                            {item.label}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}