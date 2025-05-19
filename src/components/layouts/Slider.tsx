import Image from "next/image";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  ArrowRight, 
  ChevronRight, 
  CheckCircle2, 

} from "lucide-react";

export default function Slider() {
  return (
    <div className="w-full py-12 md:py-2 relative">
      <div className="container mx-auto relative w-full px-4 md:px-12 flex flex-col-reverse md:flex-row justify-between items-center gap-8 z-10">
        <div className="w-full md:w-1/2 flex flex-col md:items-start items-center justify-center gap-4 md:gap-8">
         
          
          {/* Title with decorative elements */}
          <div className="relative">
            <h1 className="text-2xl md:text-4xl font-extrabold text-gray-800 dark:text-white mb-2 leading-tight">
              یادگیری خود را با
              <div className="relative inline-block mx-2">
                <span className="relative z-10 text-base-1">هوش مصنوعی</span>
                <svg className="absolute -bottom-1 left-0 w-full h-3 text-base-1/10" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path fill="currentColor" d="M0,0 Q50,20 100,0 V20 H0 Z"></path>
                </svg>
              </div>
              آغاز کنید
            </h1>
            
          </div>
          
          {/* Text with icon-based bullet points */}
          <div className="space-y-3">
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-2 text-center max-w-xl md:text-right leading-relaxed">
              با استفاده از جدیدترین فناوری‌های هوش مصنوعی و ارائه برترین دوره‌های آموزشی، مسیر پیشرفت و موفقیت شما را هموار می‌سازیم.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 mt-0.5 text-sky-500/40 flex-shrink-0">
                  <CheckCircle2 className="w-full h-full" />
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">دوره‌های تخصصی و به‌روز</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 mt-0.5 text-sky-500/40 flex-shrink-0">
                  <CheckCircle2 className="w-full h-full" />
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">پشتیبانی ۲۴ ساعته</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 mt-0.5 text-sky-500/40 flex-shrink-0">
                  <CheckCircle2 className="w-full h-full" />
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">استاد‌های مجرب</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 mt-0.5 text-sky-500/40 flex-shrink-0">
                  <CheckCircle2 className="w-full h-full" />
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">دسترسی مادام‌العمر</span>
              </div>
            </div>
          </div>

          {/* CTA buttons with animated elements */}
          <div className="flex items-center gap-4 flex-wrap md:flex-nowrap mt-4">
            <button className="group relative bg-base-1 text-white font-bold py-3.5 px-8 rounded-lg overflow-hidden transition-all duration-300">
              <span className="relative z-10 flex items-center gap-2">
                <span>مشاهده دوره‌ ها</span>
                <ArrowRight className="w-5 h-5 rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </span>
              <span className="absolute inset-0 w-full h-full bg-base-1/80 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rtl:origin-right duration-300"></span>
            </button>
            
            <button className="group relative text-gray-700 dark:text-gray-200 border-2 border-gray-200 dark:border-gray-700 font-bold py-3.5 px-8 rounded-lg transition-all duration-300">
              <span className="relative z-10 flex items-center gap-2">
                <span>مسیر یادگیری</span>
                <ChevronRight className="w-5 h-5 rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </span>
              <span className="absolute inset-0 w-full h-full bg-gray-100 dark:bg-gray-800 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rtl:origin-right duration-300"></span>
            </button>
          </div>
          

        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <div className="w-full h-full">
            
            <Suspense fallback={<Skeleton className="w-[500px] h-[500px] rounded-xl" />}>
              <Image
                src="/vector/main.svg"
                alt="آموزش برنامه‌نویسی با هوش مصنوعی"
                className="w-full "
                width={1200}
                height={1200}
                priority
              />
            </Suspense>

          </div>
        </div>
      </div>
    </div>
  );
}
