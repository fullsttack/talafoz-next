'use client';

import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { User, AuthContextType } from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';
  const user = session?.user as User || null;
  const router = useRouter();

  // Helper function to check if API is available
  const isApiAvailable = async (): Promise<boolean> => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/health-check/`, {
        method: 'HEAD',
        signal: controller.signal,
      }).catch(() => ({ ok: false }));
      
      clearTimeout(timeoutId);
      return response.ok;
    } catch {
      return false;
    }
  };

  const handleLogout = async () => {
    try {
      const refreshToken = session?.user?.refreshToken;
      
      // Check if API is available before attempting to call logout endpoint
      const apiAvailable = refreshToken ? await isApiAvailable().catch(() => false) : false;
      
      if (refreshToken && apiAvailable) {
        try {
          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/users/logout/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh: refreshToken }),
            credentials: 'include',
          });
        } catch (fetchError) {
          // Silently continue if API logout fails
          console.error('API logout failed:', fetchError);
        }
      } else if (refreshToken) {
        console.log('API not available, skipping server logout');
      }
      
      // Always perform client-side logout
      await signOut({ redirect: false });
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Error during logout', error);
      // Fallback: force client-side logout even if something fails
      try {
        await signOut({ redirect: false });
        router.push('/');
      } catch (e) {
        console.error('Final logout attempt failed', e);
      }
    }
  };

  // Log auth state changes for debugging
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      // console.log('Auth status:', status, 'User:', user);
    }
  }, [status, user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 