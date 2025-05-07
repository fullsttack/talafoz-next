'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from './[...nextauth]/route';

/**
 * Fetch utility برای درخواست‌های احراز شده - server side
 * @param endpoint نقطه پایانی API (بدون آدرس پایه)
 * @param options آپشن‌های fetch
 */
export async function fetchWithAuth(
  endpoint: string,
  options: RequestInit = {}
) {
  // دریافت session از سرور
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.accessToken) {
    throw new Error('عدم دسترسی: شما وارد حساب کاربری نشده‌اید');
  }
  
  // تنظیم headers
  const headers = new Headers(options.headers || {});
  headers.set('Authorization', `Bearer ${session.user.accessToken}`);
  
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  
  // آدرس کامل API
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
  const url = `${apiUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  // انجام درخواست
  const response = await fetch(url, {
    ...options,
    headers,
    cache: options.cache || 'no-store',
  });
  
  // بررسی پاسخ
  if (!response.ok) {
    // اگر پاسخ 401 (Unauthorized) بود، احتمالاً token منقضی شده است
    if (response.status === 401) {
      throw new Error('جلسه شما منقضی شده است. لطفاً دوباره وارد شوید');
    }
    
    // سایر خطاها
    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData?.detail || errorData?.error || `خطای ${response.status}: ${response.statusText}`
    );
  }
  
  return response;
}

/**
 * وضعیت احراز هویت کاربر را بررسی می‌کند
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getServerSession(authOptions);
  return !!session?.user;
}

/**
 * دریافت کاربر جاری از session
 */
export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  return session?.user || null;
} 