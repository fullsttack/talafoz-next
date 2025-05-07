'use client';

import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const user = session?.user;
  const isLoading = status === 'loading';
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      toast.success('خروج با موفقیت انجام شد');
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('خطا در خروج از حساب کاربری');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] container mx-auto py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-8">
        <h1 className="text-2xl font-bold mb-6">پروفایل کاربری</h1>
        
        {user ? (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="w-20 h-20 bg-primary-100 text-primary-800 rounded-full flex items-center justify-center text-2xl font-bold">
                {typeof user.name === 'string' && user.name.charAt(0).toUpperCase() || 
                 typeof user.username === 'string' && user.username.charAt(0).toUpperCase() || 
                 typeof user.email === 'string' && user.email.charAt(0).toUpperCase() || '?'}
              </div>
              <div>
                <h2 className="text-xl font-semibold">
                  {user.name || user.username || user.email}
                </h2>
                <p className="text-gray-500 dark:text-gray-400">{user.email || 'ایمیل ثبت نشده'}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">اطلاعات شخصی</h3>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex">
                    <span className="font-medium ml-2">نام کاربری:</span>
                    <span>{user.username || 'ثبت نشده'}</span>
                  </div>
                  <div className="flex">
                    <span className="font-medium ml-2">ایمیل:</span>
                    <span>{user.email || 'ثبت نشده'}</span>
                  </div>
                  <div className="flex">
                    <span className="font-medium ml-2">شماره تلفن:</span>
                    <span dir="ltr">{user.phone_number || 'ثبت نشده'}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">دسترسی ها</h3>
                <div className="grid grid-cols-1 gap-2">
                  {user.is_staff && (
                    <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full inline-flex items-center w-fit">
                      <span>کارمند</span>
                    </div>
                  )}
                  {user.is_superuser && (
                    <div className="px-3 py-1 bg-red-100 text-red-800 rounded-full inline-flex items-center w-fit">
                      <span>مدیر</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                خروج از حساب کاربری
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl">شما وارد حساب کاربری خود نشده‌اید</p>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              برای مشاهده اطلاعات پروفایل، لطفا وارد شوید
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 