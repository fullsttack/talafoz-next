'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Clock, Zap, ChevronLeft,  } from 'lucide-react';
import Link from 'next/link';

export default function BannerDiscount() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 5,
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  // Initialize countdown
  useEffect(() => {
    setMounted(true);
    
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
        } else {
          clearInterval(timer);
          return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Convert to Persian digits
  const toPersian = (num: number | string): string => {
    const persianDigits = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
    return num.toString().replace(/\d/g, d => persianDigits[Number(d)]);
  };
  
  // Format time unit with leading zero
  const formatTime = (value: number): string => {
    return toPersian(value < 10 ? `0${value}` : `${value}`);
  };

  if (!mounted) return null;
  

    
  const secondaryBgClasses = resolvedTheme === 'dark'
    ? 'bg-white-10'
    : 'bg-white-10';
    
  const accentClasses = resolvedTheme === 'dark'
    ? 'text-yellow'
    : 'text-yellow';
    
  const buttonClasses = resolvedTheme === 'dark'
    ? 'bg-green hover:bg-opacity-90'
    : 'bg-green hover:bg-opacity-90';
    
  const countdownBgClasses = resolvedTheme === 'dark'
    ? 'bg-white-10'
    : 'bg-white-10';

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className={`relative overflow-hidden rounded-3xl  border `}>
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute h-96 w-96 -top-10 -right-10 bg-yellow opacity-20 rounded-full blur-3xl"></div>
          <div className="absolute h-96 w-96 -bottom-20 -left-20 bg-green opacity-30 rounded-full blur-3xl"></div>
          <div className="absolute top-1/4 left-1/3 h-96 w-96 rounded-full bg-white opacity-20 blur-3xl"></div>
          
          
        </div>
        
        {/* Content container */}
        <div className="relative py-10 px-6 md:px-10 z-10">
          {/* Main content */}
          <div className="w-full max-w-3xl mx-auto text-center">
            {/* Limited time badge */}
            <div className="inline-flex items-center gap-1 mb-4 px-3 py-1 
                rounded-full text-xs font-medium border
                backdrop-blur-sm  animate-pulse">
              <Clock className="h-3 w-3" />
              <span>پیشنهاد محدود</span>
            </div>
            
            {/* Main heading - large and bold */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tight text-muted-foreground leading-tight">
              <span>جشنواره </span>
              <span className={`${accentClasses}`}>تابستانه </span>
              <span className="relative inline-block">
                تخفیف‌ ها
              </span>
            </h2>
            
            {/* Description */}
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              فرصت استثنایی برای ارتقای مهارت‌های خود با تخفیف ویژه
              <span className={`${accentClasses} font-bold mx-1`}> ۳۰٪ تا ۷۰٪ </span>
              روی همه دوره‌های آموزشی ما
            </p>
            
            {/* CTA button */}
            <Link 
              href="/courses/discounted"
              className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-white
                font-bold shadow-lg transform hover:-translate-y-0.5 transition-all ${buttonClasses}`}>
              <span>مشاهده دوره‌ها</span>
              <ChevronLeft className="h-5 w-5" />
            </Link>
            
            {/* Features strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 text-center text-muted-foreground">
              <div className={`py-3 px-4 rounded-xl ${secondaryBgClasses} backdrop-blur-sm`}>
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Zap className="h-4 w-4 text-yellow" fill="currentColor" />
                  <span className="font-bold">گارانتی بازگشت وجه</span>
                </div>
                <p className="text-xs text-muted-foreground">۷ روز ضمانت برگشت بدون قید و شرط</p>
              </div>
              
              <div className={`py-3 px-4 rounded-xl ${secondaryBgClasses} backdrop-blur-sm`}>
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Zap className="h-4 w-4 text-yellow" fill="currentColor" />
                  <span className="font-bold">دسترسی مادام‌العمر</span>
                </div>
                <p className="text-xs text-muted-foreground">خرید یکبار، استفاده همیشگی</p>
              </div>
              
              <div className={`py-3 px-4 rounded-xl ${secondaryBgClasses} backdrop-blur-sm`}>
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Zap className="h-4 w-4 text-yellow" fill="currentColor" />
                  <span className="font-bold">پشتیبانی حرفه‌ای</span>
                </div>
                <p className="text-xs text-muted-foreground">راهنمایی و پاسخگویی ۲۴/۷</p>
              </div>
            </div>
            
            {/* Countdown timer */}
            <div className="mt-10">
              <div className="inline-flex items-center gap-2 mb-3 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>این پیشنهاد فقط تا پایان مهلت زیر معتبر است:</span>
              </div>
              
              <div dir='ltr' className="flex justify-center gap-3">
                {/* Days */}
                <div className="flex flex-col">
                  <div className={`w-20 h-20 flex items-center justify-center text-3xl font-bold ${countdownBgClasses} text-muted-foreground rounded-2xl backdrop-blur-sm border border-white/20`}>
                    {formatTime(timeLeft.days)}
                  </div>
                  <span className="mt-2 text-sm text-muted-foreground">روز</span>
                </div>
                
                {/* Hours */}
                <div className="flex flex-col">
                  <div className={`w-20 h-20 flex items-center justify-center text-3xl font-bold ${countdownBgClasses} text-muted-foreground rounded-2xl backdrop-blur-sm border border-white/20`}>
                    {formatTime(timeLeft.hours)}
                  </div>
                  <span className="mt-2 text-sm text-muted-foreground">ساعت</span>
                </div>
                
                {/* Minutes */}
                <div className="flex flex-col">
                  <div className={`w-20 h-20 flex items-center justify-center text-3xl font-bold ${countdownBgClasses} text-muted-foreground rounded-2xl backdrop-blur-sm border border-white/20`}>
                    {formatTime(timeLeft.minutes)}
                  </div>
                  <span className="mt-2 text-sm text-muted-foreground">دقیقه</span>
                </div>
                
                {/* Seconds */}
                <div className="flex flex-col">
                  <div className={`w-20 h-20 flex items-center justify-center text-3xl font-bold ${countdownBgClasses} text-muted-foreground rounded-2xl backdrop-blur-sm border border-white/20`}>
                    {formatTime(timeLeft.seconds)}
                  </div>
                  <span className="mt-2 text-sm text-muted-foreground">ثانیه</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}