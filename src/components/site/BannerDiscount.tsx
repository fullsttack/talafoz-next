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
      {/* Modern glass-morphism banner with vibrant gradients */}
      <div className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-700">
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        {/* Glass overlay */}
        <div className="relative backdrop-blur-sm bg-white/10 border border-white/20 shadow-xl">
          {/* Main Content */}
          <div className="p-8 pt-14 md:p-12">
            {/* Top floating badge */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 -translate-y-1/3">
              <div className="relative">
                <div className="relative bg-gradient-to-r from-pink-500 to-indigo-600 rounded-full py-2 px-6 text-xs font-bold text-white shadow-lg">
                  پیشنهاد ویژه محدود
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Left side content */}
              <div className="md:col-span-7 text-right">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                  <span className="relative inline-block">
                    <span className="relative">تخفیف ویژه</span>
                    <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-full"></span>
                  </span>{" "}
                  دوره‌های آموزشی دیجیتال
                </h2>
                
                <p className="text-white/80 mb-6">
                  فرصتی استثنایی برای ارتقای مهارت‌های دیجیتال خود با کمترین هزینه. این پیشنهاد محدود شامل دوره‌های پیشرفته برنامه‌نویسی، طراحی و دیجیتال مارکتینگ می‌شود.
                </p>
                
                {/* Highlights */}
                <div className="flex flex-wrap gap-6 mb-8">
                  <div className="flex items-center gap-3 text-white text-sm">
                    <span className="flex-none w-6 h-6 rounded-full bg-gradient-to-r from-pink-500 to-indigo-500 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span>دسترسی نامحدود</span>
                  </div>
                  <div className="flex items-center gap-3 text-white text-sm">
                    <span className="flex-none w-6 h-6 rounded-full bg-gradient-to-r from-pink-500 to-indigo-500 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span>پشتیبانی ۲۴/۷</span>
                  </div>
                  <div className="flex items-center gap-3 text-white text-sm">
                    <span className="flex-none w-6 h-6 rounded-full bg-gradient-to-r from-pink-500 to-indigo-500 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span>گواهی معتبر</span>
                  </div>
                </div>
                
                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4">
                  <button className="px-8 py-3 bg-gradient-to-r from-pink-500 to-indigo-600 text-white rounded-full font-medium shadow-lg hover:shadow-pink-500/25 hover:from-pink-600 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-1">
                    مشاهده دوره ها
                  </button>
                  <button className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-full font-medium hover:bg-white/20 transition-all duration-300">
                    اطلاعات بیشتر
                  </button>
                </div>
              </div>
              
              {/* Right side - Discount circle and timer */}
              <div className="md:col-span-5">
                <div className="flex flex-col items-center gap-8">
                  {/* Discount Circle */}
                  <div className="relative">
                    <div className="absolute -inset-4 rounded-full blur-xl bg-gradient-to-r from-pink-500 to-indigo-500 opacity-70 animate-pulse-slow"></div>
                    <div className="relative w-40 h-40 rounded-full bg-gradient-to-br from-pink-500/80 to-indigo-600/80 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-2xl">
                      <div className="absolute inset-1 rounded-full bg-gradient-to-br from-pink-500/20 to-indigo-600/20 backdrop-blur-md border border-white/20"></div>
                      <div className="text-center z-10">
                        <div className="text-6xl font-extrabold text-white">50٪</div>
                        <div className="text-sm text-white/80 font-medium mt-1">تخفیف</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Timer */}
                  <div dir='ltr' className="w-full backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl">
                    <div className="text-center mb-4">
                      <h3 className="text-white font-medium">زمان باقیمانده:</h3>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-3">
                      {[
                        { value: timeLeft.days, label: 'روز' },
                        { value: timeLeft.hours, label: 'ساعت' },
                        { value: timeLeft.minutes, label: 'دقیقه' },
                        { value: timeLeft.seconds, label: 'ثانیه' }
                      ].map((item, index) => (
                        <div key={index} className="relative">
                          <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-lg p-3">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-white">
                                {String(item.value).padStart(2, '0')}
                              </div>
                              <div className="text-xs text-white/70">
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
          0%, 100% { opacity: 0.7; }
          50% { opacity: 0.9; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}