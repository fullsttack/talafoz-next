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
    <div className="my-12">
      {/* Neumorphic banner with futuristic design */}
      <div className="relative w-full bg-slate-100 dark:bg-black p-1 overflow-hidden rounded-xl">
        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}></div>

        {/* Inner container with neumorphic effect */}
        <div className="relative rounded-lg overflow-hidden bg-slate-100 dark:bg-black/55 shadow-[inset_0_1px_12px_rgba(148,163,184,0.2)] dark:shadow-[inset_0_1px_12px_rgba(30,41,59,0.7)]">
          {/* Accent border glow */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-500 to-transparent opacity-50"></div>
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>
          
          {/* Main Content */}
          <div className="p-8 pt-12 md:p-12">
            {/* Top floating badge */}
            <div className="absolute left-1/2 -translate-x-1/2 top-1 -translate-y-1/2">
              <div className="relative">
                <div className="absolute -inset-0.5 rounded-full blur-md bg-gradient-to-r from-sky-400 to-purple-500 opacity-75"></div>
                <div className="relative bg-white dark:bg-slate-800 rounded-full py-3 px-6 text-xs font-medium text-slate-800 dark:text-white shadow-md">
                  پیشنهاد ویژه محدود
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Left side content */}
              <div className="md:col-span-7 text-right">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
                  <span className="relative inline-block">
                    <span className="relative">تخفیف ویژه</span>
                  </span>{" "}
                  دوره‌های آموزشی دیجیتال
                </h2>
                
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  فرصتی استثنایی برای ارتقای مهارت‌های دیجیتال خود با کمترین هزینه. این پیشنهاد محدود شامل دوره‌های پیشرفته برنامه‌نویسی، طراحی و دیجیتال مارکتینگ می‌شود.
                </p>
                
                {/* Highlights */}
                <div className="flex flex-wrap gap-4  mb-8">
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 text-sm">
                    <span className="flex-none w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                    <span>دسترسی نامحدود</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 text-sm">
                    <span className="flex-none w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                    <span>پشتیبانی ۲۴/۷</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 text-sm">
                    <span className="flex-none w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                    <span>گواهی معتبر</span>
                  </div>
                </div>
                
                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4 ">
                  <button className="px-8 py-3 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-full font-medium shadow-[4px_4px_10px_rgba(148,163,184,0.5),_-4px_-4px_10px_rgba(255,255,255,0.8)] dark:shadow-[4px_4px_10px_rgba(30,41,59,0.5),_-4px_-4px_10px_rgba(51,65,85,0.2)] hover:shadow-[2px_2px_5px_rgba(148,163,184,0.5),_-2px_-2px_5px_rgba(255,255,255,0.8)] dark:hover:shadow-[2px_2px_5px_rgba(30,41,59,0.5),_-2px_-2px_5px_rgba(51,65,85,0.2)] active:shadow-[inset_2px_2px_5px_rgba(148,163,184,0.5),_inset_-2px_-2px_5px_rgba(255,255,255,0.8)] dark:active:shadow-[inset_2px_2px_5px_rgba(30,41,59,0.5),_inset_-2px_-2px_5px_rgba(51,65,85,0.2)] transition-shadow duration-200">
                    مشاهده دوره ها
                  </button>
                </div>
              </div>
              
              {/* Right side - Discount circle and timer */}
              <div className="md:col-span-5">
                <div className="flex flex-col items-center gap-6">
                  {/* Discount Circle */}
                  <div className="relative">
                    <div className="absolute -inset-4 rounded-full blur-md bg-gradient-to-r from-sky-400 to-purple-500 opacity-30 animate-pulse-slow"></div>
                    <div className="relative w-36 h-36 rounded-full bg-slate-100 dark:bg-slate-800 shadow-[6px_6px_12px_rgba(148,163,184,0.5),_-6px_-6px_12px_rgba(255,255,255,0.8)] dark:shadow-[6px_6px_12px_rgba(30,41,59,0.5),_-6px_-6px_12px_rgba(51,65,85,0.2)] flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-5xl font-bold bg-gradient-to-r from-sky-400 to-purple-500 bg-clip-text text-transparent">50٪</div>
                        <div className="text-sm text-slate-600 dark:text-slate-400 font-medium mt-1">تخفیف</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Timer */}
                  <div dir='ltr' className="w-full bg-slate-100 dark:bg-slate-800 rounded-2xl p-6 shadow-[inset_2px_2px_5px_rgba(148,163,184,0.2),_inset_-2px_-2px_5px_rgba(255,255,255,0.5)] dark:shadow-[inset_2px_2px_5px_rgba(30,41,59,0.5),_inset_-2px_-2px_5px_rgba(51,65,85,0.1)]">
                    <div className="text-center mb-4">
                      <h3 className="text-slate-700 dark:text-slate-300 font-medium">زمان باقیمانده:</h3>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-3">
                      {[
                        { value: timeLeft.days, label: 'روز' },
                        { value: timeLeft.hours, label: 'ساعت' },
                        { value: timeLeft.minutes, label: 'دقیقه' },
                        { value: timeLeft.seconds, label: 'ثانیه' }
                      ].map((item, index) => (
                        <div key={index} className="relative">
                          <div className="bg-white dark:bg-slate-900 rounded-lg shadow-[2px_2px_5px_rgba(148,163,184,0.2),_-2px_-2px_5px_rgba(255,255,255,0.5)] dark:shadow-[2px_2px_5px_rgba(30,41,59,0.3),_-2px_-2px_5px_rgba(51,65,85,0.1)] p-2">
                            <div className="text-center">
                              <div className="text-2xl font-bold bg-gradient-to-r from-sky-500 to-purple-500 bg-clip-text text-transparent">
                                {item.value}
                              </div>
                              <div className="text-xs text-slate-500 dark:text-slate-400">
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
      </div>
      
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}