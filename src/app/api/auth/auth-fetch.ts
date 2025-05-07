'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from './[...nextauth]/route';

/**
 * Fetch utility for authenticated requests - server side
 * @param endpoint the API endpoint (without the base address)
 * @param options fetch options
 */
export async function fetchWithAuth(
  endpoint: string,
  options: RequestInit = {}
) {
  // get the session from the server
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.accessToken) {
    throw new Error('عدم دسترسی: شما وارد حساب کاربری نشده‌اید');
  }
  
  // set the headers
  const headers = new Headers(options.headers || {});
  headers.set('Authorization', `Bearer ${session.user.accessToken}`);
  
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  
  // full API address
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
  const url = `${apiUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  // make the request
  const response = await fetch(url, {
    ...options,
    headers,
    cache: options.cache || 'no-store',
  });
  
  // check the response
  if (!response.ok) {
    // 401 means the session has expired
    if (response.status === 401) {
      throw new Error('جلسه شما منقضی شده است. لطفاً دوباره وارد شوید');
    }
    
    // other errors
    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData?.detail || errorData?.error || `Error ${response.status}: ${response.statusText}`
    );
  }
  
  return response;
}

/**
 * Check the user's authentication status
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getServerSession(authOptions);
  return !!session?.user;
}

/**
 * Get the current user from the session
 */
export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  return session?.user || null;
} 