'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { User, AuthContextType } from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';
  const user = session?.user || null;
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Error during logout', error);
    }
  };

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