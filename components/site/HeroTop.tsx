"use client";

import { useState, useEffect } from "react";
import HeroJson1 from "@/components/tools/HeroJson1";

// مقادیر ثابت برای ذرات تا از خطای هیدراتاسیون جلوگیری شود
const particles = [
  { top: 25, left: 10, width: 4, height: 6, delay: 1, duration: 8 },
  { top: 65, left: 85, width: 5, height: 5, delay: 2, duration: 9 },
  { top: 35, left: 15, width: 6, height: 3, delay: 0.5, duration: 7 },
  { top: 80, left: 70, width: 3, height: 7, delay: 3, duration: 10 },
  { top: 20, left: 45, width: 7, height: 4, delay: 1.5, duration: 11 },
  { top: 40, left: 30, width: 5, height: 5, delay: 2.5, duration: 9 },
  { top: 75, left: 60, width: 4, height: 6, delay: 0.7, duration: 8 },
  { top: 15, left: 90, width: 6, height: 3, delay: 3.2, duration: 12 },
  { top: 50, left: 40, width: 5, height: 5, delay: 1.8, duration: 10 },
  { top: 85, left: 20, width: 3, height: 7, delay: 2.7, duration: 9 },
  { top: 30, left: 75, width: 7, height: 4, delay: 0.3, duration: 11 },
  { top: 60, left: 5, width: 5, height: 5, delay: 2.2, duration: 8 },
  { top: 10, left: 50, width: 4, height: 6, delay: 1.2, duration: 12 },
  { top: 70, left: 25, width: 6, height: 3, delay: 3.5, duration: 9 },
  { top: 45, left: 95, width: 5, height: 5, delay: 0.8, duration: 10 },
  { top: 5, left: 35, width: 3, height: 7, delay: 2.9, duration: 7 },
  { top: 55, left: 80, width: 7, height: 4, delay: 1.6, duration: 11 },
  { top: 90, left: 15, width: 5, height: 5, delay: 0.4, duration: 8 },
  { top: 35, left: 55, width: 4, height: 6, delay: 2.3, duration: 10 },
  { top: 65, left: 65, width: 6, height: 3, delay: 1.9, duration: 9 }
];

export default function HeroTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-[85vh] py-12 flex items-center overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Particle background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute h-full w-full">
          {particles.map((particle, i) => (
            <div
              key={i}
              className={`absolute rounded-full bg-white/5 animate-pulse-slow`}
              style={{
                top: `${particle.top}%`,
                left: `${particle.left}%`,
                width: `${particle.width}px`,
                height: `${particle.height}px`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
              }}
            />
          ))}
        </div>
        
        {/* Gradient overlays */}
        <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-green/30 to-transparent rounded-full blur-[100px] opacity-30"></div>
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-indigo-500/30 to-transparent rounded-full blur-[100px] opacity-30"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content column */}
          <div 
            className={`order-2 lg:order-1 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            } transition-all duration-1000 ease-out`}
            dir="rtl"
          >
            <div className="relative inline-block mb-6">
              <span className="px-5 py-2 bg-green/10 text-green rounded-xl text-sm font-medium border border-green/20 inline-block">
                وبسایت آموزشی تلفظ
              </span>
              <div className={`absolute -z-10 inset-0 bg-green/5 rounded-xl blur-xl transform ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-150'
              } transition-all duration-1000 delay-300`}></div>
            </div>
            
            <h1 className={`text-4xl lg:text-6xl font-bold mb-8 leading-tight ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
            } transition-all duration-1000 delay-100`}>
              آموزش <span className="bg-clip-text text-transparent bg-gradient-to-l from-green via-green/80 to-teal-400">برنامه‌نویسی</span> و مهندسی نرم‌افزار
            </h1>
            
            <p className={`text-lg text-gray-300 mb-10 leading-relaxed max-w-xl ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
            } transition-all duration-1000 delay-200`}>
              آموزش تخصصی برنامه‌نویسی، هوش مصنوعی، طراحی وب و اپلیکیشن موبایل با جدیدترین تکنولوژی‌های روز دنیا. یادگیری عملی و کاربردی با پروژه‌های واقعی.
            </p>
            
            <div className={`space-y-3 mb-10 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
            } transition-all duration-1000 delay-300`}>
              {[
                { text: "دوره‌های تخصصی با مدرسین برتر صنعت" },
                { text: "پشتیبانی فنی و رفع اشکال نامحدود" },
                { text: "امکان استخدام و کاریابی پس از دوره" }
              ].map((item, i) => (
                <div key={i} className="flex items-center">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green/20 flex items-center justify-center ml-3">
                    <div className="w-2 h-2 rounded-full bg-green"></div>
                  </div>
                  <span className="text-gray-300">{item.text}</span>
                </div>
              ))}
            </div>
            
            <div className={`flex flex-wrap gap-6 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            } transition-all duration-1000 delay-400`}>
              <button className="relative overflow-hidden group px-8 py-4 bg-gradient-to-r from-green to-teal-500 rounded-xl font-medium transform hover:scale-105 transition-all duration-300">
                <span className="relative z-10 flex items-center gap-2">
                  مشاهده دوره‌ها
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </span>
                <div className="absolute inset-0 -z-0 bg-black/20 scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-500"></div>
              </button>
              
              <button className="relative group px-8 py-4 bg-transparent border border-gray-600 text-gray-200 rounded-xl font-medium hover:bg-gray-800/50 transition-all duration-300">
                <span className="flex items-center gap-2">
                  مشاوره رایگان
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green transition-transform group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                </span>
              </button>
            </div>
            
            <div className={`flex items-center gap-6 mt-14 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            } transition-all duration-1000 delay-500`}>
              <div className="flex -space-x-3 rtl:space-x-reverse">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-gray-800 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-gray-500 to-gray-700"></div>
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <div className="text-gray-400">بیش از <span className="text-green font-bold">2500</span> دانشجو</div>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="mr-1 text-gray-400">4.9</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Visual column */}
          <div 
            className={`order-1 lg:order-2 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            } transition-all duration-1000 ease-out delay-200`}
          >
            <div className="relative">
              {/* Main display */}
              <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-2xl border border-gray-700">
                <div className="absolute top-0 right-0 left-0 h-10 bg-gray-800 rounded-t-2xl border-b border-gray-700 flex items-center px-4">
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex-1 text-center text-xs text-gray-400">JSON Viewer - talafoz.io</div>
                </div>
                
                <div className="pt-6">
                  {/* HeroJson1 animation */}
                  <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/50">
                    <HeroJson1 />
                  </div>
                </div>
                
                {/* Floating elements */}
                <div className={`absolute -top-8 -left-8 p-4 bg-gray-800 rounded-xl shadow-xl border border-gray-700 transform rotate-6 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                } transition-all duration-700 delay-500`}>
                  <div className="w-32 space-y-1">
                    <div className="h-2 w-full bg-green/30 rounded-full"></div>
                    <div className="h-2 w-3/4 bg-green/20 rounded-full"></div>
                  </div>
                </div>
                
                <div className={`absolute -bottom-10 -right-10 p-4 bg-gray-800 rounded-xl shadow-xl border border-gray-700 transform -rotate-6 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                } transition-all duration-700 delay-700`}>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <div className="w-6 h-6 rounded-full bg-green/20 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-green"></div>
                    </div>
                    <div className="w-16 h-3 bg-gray-700 rounded-full"></div>
                  </div>
                </div>
              </div>
              
              {/* Code blocks */}
              <div className={`absolute top-1/4 -right-12 max-w-[180px] bg-gray-800 rounded-lg p-3 shadow-xl border border-gray-700 transform rotate-3 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
              } transition-all duration-700 delay-900`}>
                <pre className="text-xs text-gray-300 font-mono">
                  <code>
{`function App() {
  return (
    <div>
      <Header />
      <Main />
    </div>
  );
}`}
                  </code>
                </pre>
              </div>
              
              <div className={`absolute bottom-1/4 -left-12 max-w-[180px] bg-gray-800 rounded-lg p-3 shadow-xl border border-gray-700 transform -rotate-3 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
              } transition-all duration-700 delay-1000`}>
                <pre className="text-xs text-gray-300 font-mono">
                  <code>
{`const data = [
  { id: 1, name: 'React' },
  { id: 2, name: 'Vue' },
  { id: 3, name: 'Angular' }
];`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



