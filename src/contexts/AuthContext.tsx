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

  const handleLogout = async () => {
    try {
      const refreshToken = session?.user?.refreshToken;
      if (refreshToken) {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'}/auth/users/logout/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refresh: refreshToken }),
          credentials: 'include',
        });
      }
      await signOut({ redirect: false });
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Error during logout', error);
    }
  };

  // Log auth state changes for debugging
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('Auth status:', status, 'User:', user);
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