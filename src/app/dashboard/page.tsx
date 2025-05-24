'use client';

import { 
  BookOpen, 
  Clock, 
  Award, 
  Wallet, 
  BarChart3
} from 'lucide-react';
import LearningCourses from '@/components/dashboard/course/LearningCourses';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatCard = ({ title, value, icon, description, trend }: StatCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-border/50 bg-background dark:bg-background/80 shadow-sm hover:shadow-md transition-all duration-300">
      {/* خط نازک بالای کارت */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-foreground/5 dark:bg-foreground/10"></div>
      
      {/* افکت هاور روی کارت */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-foreground/[0.02] to-foreground/[0.01]"></div>
      
      <div className="relative z-10 p-5">
        {/* عنوان و مقدار */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300">{title}</h3>
          <p className="text-2xl font-bold mt-1 transition-all duration-300 group-hover:translate-x-1">{value}</p>
          
          {/* توضیحات اضافی */}
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          {/* آیکون */}
          <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-foreground/[0.03] text-foreground/70 transition-all duration-300 group-hover:scale-110 group-hover:bg-foreground/[0.05]">
            {icon}
          </div>
          
          {/* نمایش روند تغییرات */}
          {trend && (
            <div className="flex items-center bg-foreground/[0.03] px-2 py-1 rounded-md w-fit">
              <span
                className={`text-sm font-medium ${
                  trend.isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                }`}
              >
                {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
              </span>
              <span className="mr-1 text-xs text-muted-foreground">
                نسبت به ماه قبل
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function DashboardPage() {
  // داده‌های نمونه - در پروژه واقعی باید از API دریافت شوند
  const stats = [
    {
      title: 'دوره‌های من',
      value: 5,
      icon: <BookOpen strokeWidth={1.5} />,
      color: 'blue' as const,
    },
    {
      title: 'ساعات یادگیری',
      value: '۲۸ ساعت',
      icon: <Clock strokeWidth={1.5} />,
      trend: {
        value: 12,
        isPositive: true,
      },
      color: 'yellow' as const,
    },
    {
      title: 'گواهینامه‌ها',
      value: 2,
      icon: <Award strokeWidth={1.5} />,
      color: 'green' as const,
    },
    {
      title: 'اعتبار کیف پول',
      value: '۴۵۰,۰۰۰ تومان',
      icon: <Wallet strokeWidth={1.5} />,
      color: 'purple' as const,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">داشبورد</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString('fa-IR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <LearningCourses />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">فعالیت یادگیری</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">۳۰ روز اخیر</span>
              <BarChart3 size={18} className="text-muted-foreground" />
            </div>
          </div>
          <div className="h-64 flex items-center justify-center">
            <p className="text-muted-foreground">نمودار فعالیت یادگیری</p>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-6">دستاوردهای اخیر</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Award size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium">تکمیل دوره React</h3>
                <p className="text-sm text-muted-foreground">۲ روز پیش</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Award size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium">۱۰ ساعت یادگیری</h3>
                <p className="text-sm text-muted-foreground">هفته گذشته</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Award size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium">تکمیل پروژه عملی</h3>
                <p className="text-sm text-muted-foreground">۱ هفته پیش</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
