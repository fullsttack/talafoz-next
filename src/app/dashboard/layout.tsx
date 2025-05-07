'use client';

import { ReactNode } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { redirect } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { user, isLoading } = useAuth();

  // اگر کاربر لاگین نشده باشد، به صفحه لاگین ریدایرکت می‌شود
  if (!isLoading && !user) {
    redirect('/login?callbackUrl=/dashboard');
  }

  // نمایش حالت لودینگ
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* سایدبار */}
      <Sidebar />
      
      {/* محتوای اصلی */}
      <div className="flex-1 overflow-y-auto bg-background p-6">
        <main>{children}</main>
      </div>
    </div>
  );
}
