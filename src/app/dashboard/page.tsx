'use client';

import { 
  BookOpen, 
  Clock, 
  Award, 
  Wallet, 
  BarChart3
} from 'lucide-react';
import LearningCourses from '@/components/dashboard/LearningCourses';

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
    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="rounded-full bg-primary/10 p-2 text-primary">
          {icon}
        </div>
      </div>
      <div className="mt-4">
        <p className="text-3xl font-bold">{value}</p>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
        {trend && (
          <div className="mt-2 flex items-center">
            <span
              className={`text-sm ${
                trend.isPositive ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
            </span>
            <span className="mx-1 text-xs text-muted-foreground">
              نسبت به ماه قبل
            </span>
          </div>
        )}
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
      icon: <BookOpen size={18} />,
    },
    {
      title: 'ساعات یادگیری',
      value: '۲۸ ساعت',
      icon: <Clock size={18} />,
      trend: {
        value: 12,
        isPositive: true,
      },
    },
    {
      title: 'گواهینامه‌ها',
      value: 2,
      icon: <Award size={18} />,
    },
    {
      title: 'اعتبار کیف پول',
      value: '۴۵۰,۰۰۰ تومان',
      icon: <Wallet size={18} />,
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
