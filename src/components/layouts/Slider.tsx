import Image from "next/image";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Slider() {
  return (
    <div className="container mx-auto w-full px-4 md:px-12 flex flex-col-reverse md:flex-row justify-between items-center gap-8">
      <div className="w-full md:w-1/2 flex flex-col md:items-start items-center justify-center gap-4 md:gap-6">
        <h1 className="text-lg md:text-3xl font-extrabold text-base-1 mb-4 leading-tight">
          یادگیری خود را با بهره‌گیری از هوش مصنوعی آغاز کنید
        </h1>
        <p className="text-sm md:text-base max-w-xl text-gray-600 dark:text-gray-300 mb-6 text-center md:text-right">
         با استفاده از جدیدترین فناوری‌های هوش مصنوعی و ارائه برترین دوره‌های آموزشی , مسیر پیشرفت و موفقیت شما را هموار می‌سازیم.  همین امروز شروع کنید
        </p>

        <div className="flex items-center gap-4">
          <button className="bg-base-1 hover:bg-base-1/90 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 shadow-md">
            مشاهده دوره‌ ها
          </button>
          <button className="text-muted-foreground border font-bold py-3 px-8 rounded-lg">
            مسیر یادگیری
          </button>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex justify-center">
        <Suspense fallback={<Skeleton className="w-[500px] h-[500px] rounded-xl" />}>
          <Image
            src="/vector/main.svg"
            alt="slider"
            className="w-full h-full"
            width={500}
            height={500}
          />
        </Suspense>
      </div>
    </div>
  );
}
