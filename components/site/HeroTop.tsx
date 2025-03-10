"use client";

import { useState, useEffect } from "react";
import HeroJson1 from "@/components/tools/HeroJson1";

export default function HeroTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
          {/* Content Side */}
          <div 
            className={`w-full lg:w-1/2 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            } transition-all duration-700 ease-out`}
            dir="rtl"
          >
            <span className="inline-block px-4 py-1 mb-6 border border-indigo-100 rounded-full text-green text-sm font-medium">
              وبسایت آموزشی تلفظ
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-foreground">
              یادگیری <span className="text-green">برنامه‌نویسی حرفه‌ای</span> را با ما شروع کنید
            </h1>
            <p className="text-lg text-gray-400 mb-10 leading-relaxed">
              دوره‌های جامع و کاربردی برنامه‌نویسی وب، موبایل، هوش مصنوعی و دیگر تکنولوژی‌های روز دنیا. 
              با تدریس اساتید مجرب و پروژه‌های واقعی، مسیر شغلی خود را متحول کنید.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-12">
              <button className="px-8 py-4 bg-green  text-white rounded-md transition-colors text-base font-medium">
                مشاهده دوره‌ها
              </button>
              <button className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-md transition-colors text-base font-medium">
                مشاوره رایگان
              </button>
            </div>
            
            <div className="flex flex-wrap gap-6 text-gray-500">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>بیش از ۱۰۰ دوره مختلف</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>پروژه‌های عملی</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>گواهینامه معتبر</span>
              </div>
            </div>
          </div>
          
          {/* Animation Side - New Design */}
          <div 
            className={`w-full lg:w-1/2 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            } transition-all duration-700 ease-out delay-200`}
          >
            <div className="relative">
              {/* Background elements */}
              <div className="absolute -right-6 -top-6 w-32 h-32 bg-indigo-50 rounded-full opacity-60"></div>
              <div className="absolute -left-6 -bottom-6 w-24 h-24 bg-indigo-50 rounded-full opacity-60"></div>
              
              {/* Main content */}
              <div className="relative">
                {/* App mockup frame */}
                <div className="relative shadow-xl rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-indigo-50 p-8">
                  {/* Decorative code snippets in background */}
                  <div className="absolute top-3 left-2 opacity-10 text-xs">
                    <div>&lt;div className={`app`}&gt;</div>
                    <div>  &lt;Header /&gt;</div>
                    <div>  &lt;Main /&gt;</div>
                    <div>&lt;/div&gt;</div>
                  </div>
                  
                  <div className="absolute bottom-3 right-2 opacity-10 text-xs">
                    <div>const App = () =&gt; {`{`}</div>
                    <div>  return &lt;Dashboard /&gt;</div>
                    <div>{`}`}</div>
                  </div>

                  {/* Card 1 - First element */}
                  <div className="mb-6 p-4 bg-white rounded-xl shadow-md transform -rotate-2">
                    <div className="flex items-center space-x-3 space-x-reverse mb-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                      <h3 className="font-semibold text-gray-800">مسیر یادگیری</h3>
                    </div>
                    <div className="h-2 bg-indigo-100 rounded-full w-1/2 mb-2"></div>
                    <div className="h-2 bg-indigo-100 rounded-full w-3/4"></div>
                  </div>

                  {/* Animation container */}
                  <div className="relative bg-white rounded-xl shadow-md p-4 mb-6 transform rotate-1 border border-indigo-100">
                    <div className="flex justify-between items-center mb-4">
                      <div className="h-3 w-3 rounded-full bg-indigo-500"></div>
                      <div className="text-xs font-medium text-gray-500">مدیریت برنامه‌ها</div>
                    </div>
                    
                    {/* HeroJson1 animation */}
                    <div className="bg-gradient-to-br from-gray-50 to-white p-2 rounded-lg">
                      <HeroJson1 />
                    </div>
                  </div>

                  {/* Card 3 - Progress */}
                  <div className="p-4 bg-white rounded-xl shadow-md transform rotate-2">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-gray-800">پیشرفت دوره‌ها</span>
                      <span className="text-xs text-indigo-600 font-medium">85%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full w-full">
                      <div className="h-2 bg-indigo-600 rounded-full w-10/12"></div>
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div className="flex -space-x-2 rtl:space-x-reverse">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className={`w-6 h-6 rounded-full border-2 border-white bg-indigo-${i*100 + 200}`}></div>
                        ))}
                      </div>
                      <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="text-xs text-gray-500">فعال</span>
                      </div>
                    </div>
                  </div>

                  {/* Decorative dots */}
                  <div className="absolute top-1/2 right-0 w-3 h-12 flex flex-col justify-between">
                    <div className="w-2 h-2 rounded-full bg-indigo-200"></div>
                    <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
                    <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                  </div>
                  
                  <div className="absolute top-1/4 left-0 w-3 h-12 flex flex-col justify-between">
                    <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                    <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
                    <div className="w-2 h-2 rounded-full bg-indigo-200"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



