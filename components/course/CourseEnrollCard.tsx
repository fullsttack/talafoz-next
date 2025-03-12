'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CheckCircle, UserPlus, Gift, Crown, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Course } from '@/components/data/course';

interface CourseEnrollCardProps {
  course: Course;
  isPremiumUser?: boolean;
  hasPurchasedCourse?: boolean;
  onPurchase?: () => void;
}

export default function CourseEnrollCard({ 
  course, 
  isPremiumUser = false, 
  hasPurchasedCourse = false,
  onPurchase 
}: CourseEnrollCardProps) {
  const router = useRouter();
  const [isEnrolled, setIsEnrolled] = useState(hasPurchasedCourse);
  const [isLoading, setIsLoading] = useState(false);
  
  // به‌روزرسانی وضعیت ثبت‌نام با تغییر prop
  useEffect(() => {
    if (!isLoading) {
      setIsEnrolled(hasPurchasedCourse);
    }
  }, [hasPurchasedCourse, isLoading]);
  
  const {
    id,
    price,
    discountPrice,
    isFree,
    isFreePremium,
    studentsCount,
    categories,
    rating,
    imageUrl,
    title
  } = course;
  
  // آیا دوره برای کاربر رایگان است؟
  const isFreeForUser = isFree || (isPremiumUser && isFreePremium);
  
  // آیا دوره برای کاربر دارای اشتراک ویژه رایگان است؟
  const isPremiumFreeCourse = isPremiumUser && isFreePremium && !isFree;
  
  // محاسبه قیمت نهایی
  const finalPrice = isFreeForUser ? 0 : (discountPrice || price);
  
  // فرمت قیمت
  const formattedPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price);
  };
  
  // محاسبه درصد تخفیف
  const discountPercentage = discountPrice ? Math.round(((price - discountPrice) / price) * 100) : 0;
  
  // عملیات ثبت‌نام/خرید
  const handleEnroll = () => {
    if (isLoading) return; // جلوگیری از کلیک‌های مکرر

    // نمایش حالت لودینگ
    setIsLoading(true);
    
    // شبیه‌سازی ارسال درخواست به سرور
    setTimeout(() => {
      // تغییر وضعیت به ثبت‌نام شده
      setIsEnrolled(true);
      
      // فراخوانی callback پس از انجام عملیات
      onPurchase?.();
      
      // هدایت به صفحه اپیزودها بعد از کمی تأخیر
      if (id) {
        // پیدا کردن اولین اپیزود رایگان برای نمایش
        let firstEpisodeId = '';
        
        if (course.chapters && course.chapters.length > 0) {
          // ابتدا دنبال اپیزود رایگان می‌گردیم
          for (const chapter of course.chapters) {
            const freeEpisode = chapter.episodes.find(ep => ep.isFree);
            if (freeEpisode) {
              firstEpisodeId = freeEpisode.id;
              break;
            }
          }
          
          // اگر اپیزود رایگان پیدا نشد، اولین اپیزود را انتخاب می‌کنیم
          if (!firstEpisodeId && course.chapters[0]?.episodes.length > 0) {
            firstEpisodeId = course.chapters[0].episodes[0].id;
          }
        }
        
        // هدایت با کمی تأخیر
        setTimeout(() => {
          if (firstEpisodeId) {
            router.push(`/courses/${id}/episodes/${firstEpisodeId}`);
          } else {
            router.push(`/courses/${id}`);
          }
        }, 500);
      }
    }, 1000); // شبیه‌سازی زمان پاسخ سرور
  };
  
  // آیا باید دکمه ثبت‌نام را نمایش دهیم؟
  const shouldShowEnrollButton = !isEnrolled && !hasPurchasedCourse;
  
  return (
    <div className="sticky top-6 rounded-xl border p-6 shadow-md">
      {/* تصویر دوره */}
      <div className="mb-6 overflow-hidden rounded-lg">
        <Image
          src={imageUrl}
          alt={title}
          width={800}
          height={450}
          className="aspect-video w-full object-cover transition-transform hover:scale-105"
        />
      </div>
      
      {/* قیمت و تخفیف */}
      <div className="mb-6 text-center">
        {isFree ? (
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
              <Gift className="h-5 w-5" />
              <span className="text-2xl font-bold">رایگان</span>
            </div>
          </div>
        ) : isPremiumFreeCourse ? (
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
              <Crown className="h-5 w-5" />
              <span className="text-2xl font-bold">شما عضو ویژه هستید</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold ">
                {formattedPrice(finalPrice)} تومان
              </span>
              
              {discountPrice && (
                <span className="rounded-md bg-red-100 px-2 py-1 text-xs font-bold text-red-600 dark:bg-red-900/30 dark:text-red-400">
                  {discountPercentage}% تخفیف
                </span>
              )}
            </div>
            
            {discountPrice && (
              <span className="mt-1 text-sm text-gray-500 line-through">
                {formattedPrice(price)} تومان
              </span>
            )}
            
            {isFreePremium && !isPremiumUser && (
              <div className="mt-3 flex items-center gap-1 text-sm text-amber-600 dark:text-amber-400">
                <Crown className="h-4 w-4" />
                <span>رایگان برای اعضای ویژه</span>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* دکمه ثبت‌نام/خرید */}
      <div className="mb-6">
        {isLoading ? (
          <Button 
            className="w-full" 
            disabled
          >
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span>در حال ثبت‌نام...</span>
          </Button>
        ) : shouldShowEnrollButton ? (
          <Button 
            className="w-full" 
            onClick={handleEnroll}
          >
            <UserPlus className="mr-1 h-5 w-5" />
            <span>ثبت‌نام در دوره</span>
          </Button>
        ) : (
          <Button className="w-full bg-green-600 hover:bg-green-700" disabled>
            <CheckCircle className="mr-1 h-5 w-5" />
            <span>شما در این دوره ثبت‌نام کرده‌اید</span>
          </Button>
        )}
      </div>
      
      {/* آمار دوره */}
      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        <div className="flex justify-between py-3">
          <span className="text-sm text-gray-600 dark:text-gray-400">تعداد دانشجویان</span>
          <span className="">{studentsCount.toLocaleString()}</span>
        </div>
        
        <div className="flex justify-between py-3">
          <span className="text-sm text-gray-600 dark:text-gray-400">سطح دوره</span>
          <span className="">
            {course.level === 'beginner' ? 'مبتدی' : 
             course.level === 'intermediate' ? 'متوسط' : 'پیشرفته'}
          </span>
        </div>
        
        <div className="flex justify-between py-3">
          <span className="text-sm text-gray-600 dark:text-gray-400">مدت زمان</span>
          <span className="">{course.duration}</span>
        </div>
        
        <div className="flex justify-between py-3">
          <span className="text-sm text-gray-600 dark:text-gray-400">امتیاز</span>
          <div className="flex items-center gap-1">
            <span className="">{rating}</span>
            <span className="text-yellow-400">★</span>
          </div>
        </div>
      </div>
      
      {/* دسته‌بندی‌ها */}
      {categories.length > 0 && (
        <div className="mt-6">
          <p className="mb-2 text-sm  text-gray-700 dark:text-gray-300">دسته‌بندی‌ها:</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <span 
                key={index}
                className="rounded-full  px-3 py-1 text-xs  border"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 