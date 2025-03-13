'use client'

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight} from 'lucide-react';

export default function BannerDiscount() {
  return (
    <div className="container mx-auto max-w-7xl py-8">
      <div className="relative overflow-hidden rounded-2xl bg-black">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] opacity-90"></div>
        
        {/* Animated grid lines */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMyMzJCM0MiIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNNjAgMEgwdjYwaDYwVjB6TTIgMmg1NnY1NkgyVjJ6IiBmaWxsPSIjMkQzNzQ4Ii8+PC9nPjwvc3ZnPg==')] opacity-25"></div>
        
        {/* Content */}
        <div className="relative px-6 py-16 md:py-20 md:px-12 overflow-hidden">
          {/* Glowing orbs */}
          <div className="absolute top-10 right-10 w-40 h-40 rounded-full bg-blue-500/30 blur-[80px]"></div>
          <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full bg-purple-500/20 blur-[100px]"></div>
          
          <div className="relative mx-auto max-w-5xl">
            {/* Top badge */}
            <div className="inline-flex items-center bg-white/10 backdrop-blur-xs border border-white/10 rounded-full px-4 py-1.5 text-white/80 text-sm mb-8">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2"></span>
              <span>تخفیف‌های شگفت‌انگیز فصل تابستان فعال شد</span>
            </div>
            
            {/* Main headline */}
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight max-w-2xl leading-tight">
              تخفیف‌های 
              <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-cyan-400 ml-2">شگفت‌انگیز</span> 
              دوره‌های برنامه‌نویسی را از دست ندهید
            </h2>
            
            <p className="text-white/70 text-lg max-w-2xl mb-10">
              بهترین فرصت برای سرمایه‌گذاری در مهارت‌های خود با قیمت‌های استثنایی و دسترسی به محتوای آموزشی با کیفیت، فقط برای مدت محدود
            </p>
            

            {/* CTA Section */}
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-linear-to-r from-emerald-500 to-cyan-500 rounded-lg blur-sm opacity-60 group-hover:opacity-80 transition"></div>
                <Button className="relative bg-black hover:bg-black/80 text-white border border-white/10 rounded-lg py-6 px-8 text-base font-semibold">
                  مشاهده دوره‌های تخفیف‌دار
                  <ArrowUpRight className="h-5 w-5 ml-2" />
                </Button>
              </div>
              
              <div className="flex items-center">
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                  تا ۵۰٪ تخفیف ویژه
                </Badge>
                <span className="mx-3 text-white/50">|</span>
                <span className="text-white/70">فقط تا پایان تیرماه</span>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -left-16 top-4 hidden md:block">
              <div className="w-60 h-60 rotate-12 bg-linear-to-br from-emerald-500/20 to-cyan-500/30 rounded-2xl backdrop-blur-md border border-emerald-500/20 p-2">
                <div className="w-full h-full border border-white/20 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-emerald-400 font-bold text-4xl">۲۰+</div>
                    <div className="text-white/70 mt-1">دوره با تخفیف ویژه</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}