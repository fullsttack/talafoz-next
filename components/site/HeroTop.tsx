"use client";

import { useState, useEffect } from "react";
import HeroJson1 from "@/components/tools/HeroJson1";

export default function HeroTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative py-20 overflow-hidden ">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-[10%] w-64 h-64 rounded-full bg-green/5 blur-3xl"></div>
        <div className="absolute bottom-10 left-[5%] w-72 h-72 rounded-full bg-indigo-500/5 blur-3xl"></div>
        <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-yellow-500/5 blur-3xl"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-center opacity-[0.015]"></div>
        

      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* Content Side */}
          <div 
            className={`w-full lg:w-1/2 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            } transition-all duration-700 ease-out space-y-8`}
            dir="rtl"
          >
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-green/10 to-green/5 border border-green/20">
              <span className="w-2 h-2 rounded-full bg-green ml-2"></span>
              <span className="text-sm font-medium text-green">وبسایت آموزشی تلفظ</span>
            </div>
            
            {/* Main heading */}
            <h1 className="text-4xl sm:text-2xl lg:text-3xl font-bold leading-tight ">
              یادگیری <span className="relative inline-block">
                <span className="relative z-10 text-green">برنامه‌نویسی حرفه‌ای</span>
                <span className="absolute -bottom-2 left-0 right-0 h-3 bg-green/10 rounded-lg"></span>
              </span> را با ما شروع کنید
            </h1>
            
            {/* Description with enhanced typography */}
            <p className="text-base text-gray-500 leading-relaxed">
              دوره‌های جامع و کاربردی برنامه‌نویسی وب، موبایل، هوش مصنوعی و دیگر تکنولوژی‌های روز دنیا. 
              با تدریس اساتید مجرب و پروژه‌های واقعی، مسیر شغلی خود را متحول کنید.
            </p>
            
            {/* CTA Buttons with enhanced design */}
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-gradient-to-r from-green to-green/90 text-white rounded-lg shadow-lg shadow-green/20 transition-all hover:shadow-xl hover:shadow-green/30 hover:-translate-y-0.5 text-base font-medium flex items-center gap-2">
                <span>مشاهده دوره‌ها</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-lg shadow-sm transition-all hover:shadow-md hover:border-gray-300 hover:-translate-y-0.5 text-base font-medium">
                مسیر یادگیری
              </button>
            </div>
            

            
            {/* Trust indicators */}
            <div className="pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-500 mb-3">مورد اعتماد بیش از ۱۰,۰۰۰ دانشجو</p>
              <div className="flex items-center gap-6">
                <div className="h-8 w-auto opacity-70">
                  <svg width="100" height="30" viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100" height="30" rx="4" fill="currentColor" fillOpacity="0.1" className="text-gray-800" />
                    <path d="M20 15L22.5 20L27.5 10L32.5 20L37.5 5L42.5 25L47.5 15L50 18.5L57.5 8.5L65 15L70 12.5L80 17.5" stroke="currentColor" strokeWidth="2" className="text-green" />
                  </svg>
                </div>
                <div className="flex -space-x-2 rtl:space-x-reverse">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white shadow-sm bg-gray-200 flex items-center justify-center overflow-hidden">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-white shadow-sm bg-green/10 flex items-center justify-center text-xs font-bold text-green">+99</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Animation Side - Professional Design */}
            <div>
                <HeroJson1 />   
            </div>
        </div>
      </div>
    </section>
  );
}



