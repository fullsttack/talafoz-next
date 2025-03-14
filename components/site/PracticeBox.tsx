"use client";

import { useState, useEffect } from "react";
import HeroJson2 from "@/components/tools/HeroJson2";
import { 
  BookOpen, 
  ArrowRight, 
  Stars, 
  Brain,
  Target
} from "lucide-react";

export default function HeroTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Hero section */}
        <div className={`mb-20 ${isVisible ? "opacity-100" : "opacity-0"} transition-opacity duration-700`}>
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2" dir="rtl">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                روشی <span className="text-green">ساده</span> برای <br />یادگیری عمیق
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                سیستم هوشمند ما با استفاده از الگوریتم‌های پیشرفته، مسیر یادگیری را برای شما بهینه‌سازی می‌کند.
              </p>
              <button className="bg-green hover:bg-green-600 text-white rounded-lg px-8 py-3 text-base font-medium transition-colors">
                شروع یادگیری
              </button>
            </div>
            
            <div className="md:w-1/2 border border-gray-100 rounded-2xl p-6 shadow-sm bg-gray-50">
              <HeroJson2 />
            </div>
          </div>
        </div>
        
        {/* Content cards */}
        <div dir="rtl">
          <div className={`mb-16 text-center ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} transition-all duration-700 delay-300`}>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">ویژگی‌های برتر</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">روش‌های هوشمند یادگیری که به شما کمک می‌کند سریع‌تر و مؤثرتر مهارت‌های جدید را فرا بگیرید</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "تمرین هوشمند",
                description: "سیستم هوشمند ما تمرین‌ها را بر اساس نقاط ضعف و قوت شما تنظیم می‌کند",
                icon: <Target className="w-6 h-6" />,
                delay: "300"
              },
              {
                title: "آموزش شخصی‌سازی شده",
                description: "هر فرد روش یادگیری منحصر به فردی دارد. ما روش شما را کشف و تقویت می‌کنیم",
                icon: <Brain className="w-6 h-6" />,
                delay: "400"
              },
              {
                title: "محتوای استاندارد",
                description: "همه محتوای آموزشی توسط متخصصان باتجربه تهیه و استانداردسازی شده است",
                icon: <BookOpen className="w-6 h-6" />,
                delay: "500"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className={`bg-white p-8 rounded-xl border border-gray-100 hover:border-green/20 hover:shadow-md transition-all ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${feature.delay}ms`, transitionDuration: "700ms" }}
              >
                <div className="bg-green/5 rounded-full w-12 h-12 flex items-center justify-center mb-6 text-green">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <a href="#" className="text-green flex items-center font-medium">
                  بیشتر بدانید
                  <ArrowRight className="mr-2 w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
        
        {/* Testimonial section */}
        <div 
          className={`bg-gray-50 rounded-2xl p-10 mb-16 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          } transition-all duration-700 delay-700`}
          dir="rtl"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">تجربه دانش‌آموزان ما</h2>
              <blockquote className="text-lg text-gray-600 mb-6 italic">
                &ldquo;استفاده از این سیستم آموزشی تغییر بزرگی در روند یادگیری من ایجاد کرد. در مدت کوتاهی توانستم پیشرفت قابل توجهی داشته باشم.&rdquo;
              </blockquote>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green/20 rounded-full mr-3"></div>
                <div>
                  <p className="font-semibold">سارا محمدی</p>
                  <p className="text-sm text-gray-500">دانشجوی مهندسی کامپیوتر</p>
                </div>
              </div>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="flex flex-col items-center">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div key={star} className="text-yellow-400">
                      <Stars className="w-6 h-6" />
                    </div>
                  ))}
                </div>
                <p className="text-3xl font-bold">۴.۸ / ۵</p>
                <p className="text-sm text-gray-500">میانگین امتیاز کاربران</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to action */}
        <div 
          className={`text-center ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          } transition-all duration-700 delay-1000`}
          dir="rtl"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">آماده شروع یادگیری هستید؟</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            همین امروز اولین قدم را برای یادگیری هوشمند و مؤثر بردارید
          </p>
          <button className="bg-green hover:bg-green-600 text-white rounded-lg px-8 py-3 text-base font-medium transition-colors">
            ثبت‌نام رایگان
          </button>
        </div>
      </div>
    </section>
  );
}
