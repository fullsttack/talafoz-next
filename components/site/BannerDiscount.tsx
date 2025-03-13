'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sparkles, Clock, Zap, ChevronLeft, Star } from 'lucide-react';
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
      <div className={`relative overflow-hidden rounded-3xl  shadow-xl border border-white/10`}>
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute h-32 w-32 -top-10 -right-10 bg-white opacity-20 rounded-full blur-3xl"></div>
          <div className="absolute h-64 w-64 -bottom-20 -left-20 bg-green opacity-30 rounded-full blur-3xl"></div>
          <div className="absolute top-1/4 left-1/3 h-40 w-40 rounded-full bg-yellow opacity-20 blur-3xl"></div>
          
          {/* Animated stars - small */}
          <div className="absolute top-10 right-[15%] animate-pulse">
            <Star className="h-3 w-3 text-white opacity-70" fill="currentColor" />
          </div>
          <div className="absolute bottom-20 right-20 animate-pulse delay-150">
            <Star className="h-2 w-2 text-white opacity-50" fill="currentColor" />
          </div>
          <div className="absolute top-1/3 left-10 animate-pulse delay-300">
            <Star className="h-2 w-2 text-white opacity-60" fill="currentColor" />
          </div>
          
          {/* Animated sparkles */}
          <div className="absolute top-20 left-[20%] animate-bounce">
            <Sparkles className="h-5 w-5 text-white opacity-70" />
          </div>
          <div className="absolute bottom-10 left-1/4 animate-pulse">
            <Sparkles className="h-4 w-4 text-white opacity-50" />
          </div>
        </div>
        
        {/* Content container */}
        <div className="relative py-10 px-6 md:px-10 z-10">
          {/* Main content */}
          <div className="w-full max-w-3xl mx-auto text-center">
            {/* Limited time badge */}
            <div className="inline-flex items-center gap-1 mb-4 px-3 py-1 
                rounded-full text-xs font-medium border border-white/20 
                backdrop-blur-sm bg-white-10 text-white animate-pulse">
              <Clock className="h-3 w-3" />
              <span>پیشنهاد محدود</span>
            </div>
            
            {/* Main heading - large and bold */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tight text-white leading-tight">
              <span>جشنواره </span>
              <span className={`${accentClasses}`}>تابستانه </span>
              <span className="relative inline-block">
                تخفیف‌ها
                <span className="absolute left-0 right-0 bottom-2 h-3 bg-white-10 -z-10 rounded-full transform -rotate-1"></span>
              </span>
            </h2>
            
            {/* Description */}
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              فرصت استثنایی برای ارتقای مهارت‌های خود با تخفیف ویژه
              <span className={`${accentClasses} font-bold mx-1`}> ۳۰٪ تا ۷۰٪ </span>
              روی همه دوره‌های آموزشی ما
            </p>
            
            {/* CTA button */}
            <Link 
              href="/courses/discounted"
              className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-white
                font-bold shadow-lg transform hover:-translate-y-0.5 transition-all ${buttonClasses}`}>
              <span>مشاهده دوره‌های ویژه</span>
              <ChevronLeft className="h-5 w-5" />
            </Link>
            
            {/* Features strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 text-center text-white">
              <div className={`py-3 px-4 rounded-xl ${secondaryBgClasses} backdrop-blur-sm`}>
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Zap className="h-4 w-4 text-yellow" fill="currentColor" />
                  <span className="font-bold">گارانتی بازگشت وجه</span>
                </div>
                <p className="text-xs text-white/80">۷ روز ضمانت برگشت بدون قید و شرط</p>
              </div>
              
              <div className={`py-3 px-4 rounded-xl ${secondaryBgClasses} backdrop-blur-sm`}>
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Zap className="h-4 w-4 text-yellow" fill="currentColor" />
                  <span className="font-bold">دسترسی مادام‌العمر</span>
                </div>
                <p className="text-xs text-white/80">خرید یکبار، استفاده همیشگی</p>
              </div>
              
              <div className={`py-3 px-4 rounded-xl ${secondaryBgClasses} backdrop-blur-sm`}>
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Zap className="h-4 w-4 text-yellow" fill="currentColor" />
                  <span className="font-bold">پشتیبانی حرفه‌ای</span>
                </div>
                <p className="text-xs text-white/80">راهنمایی و پاسخگویی ۲۴/۷</p>
              </div>
            </div>
            
            {/* Countdown timer */}
            <div className="mt-10">
              <div className="inline-flex items-center gap-2 mb-3 text-white">
                <Clock className="h-4 w-4" />
                <span>این پیشنهاد فقط تا پایان مهلت زیر معتبر است:</span>
              </div>
              
              <div className="flex justify-center gap-3">
                {/* Days */}
                <div className="flex flex-col">
                  <div className={`w-20 h-20 flex items-center justify-center text-3xl font-bold ${countdownBgClasses} text-white rounded-2xl backdrop-blur-sm border border-white/20`}>
                    {formatTime(timeLeft.days)}
                  </div>
                  <span className="mt-2 text-sm text-white">روز</span>
                </div>
                
                {/* Hours */}
                <div className="flex flex-col">
                  <div className={`w-20 h-20 flex items-center justify-center text-3xl font-bold ${countdownBgClasses} text-white rounded-2xl backdrop-blur-sm border border-white/20`}>
                    {formatTime(timeLeft.hours)}
                  </div>
                  <span className="mt-2 text-sm text-white">ساعت</span>
                </div>
                
                {/* Minutes */}
                <div className="flex flex-col">
                  <div className={`w-20 h-20 flex items-center justify-center text-3xl font-bold ${countdownBgClasses} text-white rounded-2xl backdrop-blur-sm border border-white/20`}>
                    {formatTime(timeLeft.minutes)}
                  </div>
                  <span className="mt-2 text-sm text-white">دقیقه</span>
                </div>
                
                {/* Seconds */}
                <div className="flex flex-col">
                  <div className={`w-20 h-20 flex items-center justify-center text-3xl font-bold ${countdownBgClasses} text-white rounded-2xl backdrop-blur-sm border border-white/20`}>
                    {formatTime(timeLeft.seconds)}
                  </div>
                  <span className="mt-2 text-sm text-white">ثانیه</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}