'use client'

import { MagicCard } from "@/components/magicui/magic-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Code, BarChart, Monitor, ChevronRight } from 'lucide-react';

export default function BannerDiscount() {
  return (
    <div className="container py-12">
      <div className="bg-background rounded-3xl overflow-hidden border shadow-md">
        <MagicCard
          gradientFrom="#10B981"
          gradientTo="#0EA5E9"
          gradientSize={600}
          gradientOpacity={0.07}
          className="h-full"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[300px]">
            {/* Left Section - Details */}
            <div className="col-span-1 lg:col-span-7 p-8 lg:p-12 flex flex-col justify-between">
              {/* Top Heading */}
              <div>
                <Badge variant="outline" className="mb-6 py-1.5 px-4 bg-background border-primary/20 text-primary">
                  <Calendar className="h-3.5 w-3.5 mr-1" />
                  <span>چالش ۱۰۰ روزه</span>
                </Badge>
                
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 tracking-tight">
                  چالش <span className="text-primary">کدنویسی</span> صد روزه
                </h2>
                
                <p className="text-muted-foreground mb-6 max-w-xl">
                  یادگیری کدنویسی را با چالش ۱۰۰ روزه ما شروع کنید. هر روز یک مهارت جدید، 
                  هر هفته یک پروژه و در پایان یک برنامه‌نویس حرفه‌ای شوید.
                </p>
                
                {/* Feature Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  {[
                    { icon: <Code className="h-5 w-5 text-primary" />, title: "پروژه‌های عملی", desc: "۲۰+ پروژه کاربردی" },
                    { icon: <Monitor className="h-5 w-5 text-primary" />, title: "دسترسی آنلاین", desc: "ویدیوهای آموزشی" },
                    { icon: <BarChart className="h-5 w-5 text-primary" />, title: "پیشرفت قابل اندازه‌گیری", desc: "رصد پیشرفت روزانه" },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col">
                      <div className="flex items-center gap-2 mb-1">
                        {item.icon}
                        <h3 className="font-semibold text-base">{item.title}</h3>
                      </div>
                      <p className="text-muted-foreground text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom CTA & Pricing */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                <div className="flex items-baseline gap-2">
                  <div className="text-xl font-bold">۱,۴۹۰,۰۰۰ تومان</div>
                  <div className="text-muted-foreground line-through text-sm">۲,۹۰۰,۰۰۰</div>
                </div>
                
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-6">
                  شروع چالش
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Right Section - Progress Visualization */}
            <div className="col-span-1 lg:col-span-5 bg-muted/50 p-8 lg:p-10 flex items-center justify-center">
              <div className="w-full max-w-sm">
                <div className="flex items-center justify-between mb-8">
                  <Badge variant="secondary" className="rounded-full font-semibold">
                    دوره ۳ ماهه
                  </Badge>
                  <Badge variant="secondary" className="rounded-full font-semibold">
                    گواهینامه معتبر
                  </Badge>
                </div>
                
                {/* Progress Visualization */}
                <div className="space-y-6">
                  {/* Week Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">پیشرفت هفتگی</span>
                      <span className="font-medium">۱۴ هفته</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 w-[35%] rounded-full"></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>هفته ۱</span>
                      <span>هفته ۵</span>
                      <span>هفته ۱۰</span>
                      <span>هفته ۱۴</span>
                    </div>
                  </div>
                  
                  {/* Skills */}
                  <div className="grid grid-cols-5 gap-2">
                    {['HTML', 'CSS', 'JS', 'React', 'Node'].map((skill, i) => (
                      <div key={i} className="text-center">
                        <div className={`h-16 rounded-md flex items-center justify-center ${i <= 2 ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                          <span className="font-mono text-xs">{skill}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Countdown */}
                  <div className="bg-background rounded-lg p-4 text-center">
                    <div className="text-sm text-muted-foreground mb-1">زمان باقیمانده ثبت‌نام:</div>
                    <div className="text-xl font-bold text-primary">۴ روز و ۱۲ ساعت</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MagicCard>
      </div>
    </div>
  );
}