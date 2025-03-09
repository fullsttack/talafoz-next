'use client'

import { 
  createContext, 
  useContext, 
  useEffect,
  startTransition, 
  useCallback, 
  useRef,
  useMemo
} from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { getUser, logout } from '@/app/actions/auth'
import { useState } from 'react'
import { toast } from 'sonner'
import type { User } from '@/types/auth'

interface UserContextType {
  user: User | null
  setUser: (user: User | null) => void
  logout: () => Promise<void>
  isLoading: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const mounted = useRef(false)
  const checkUserSessionRef = useRef<() => Promise<void>>(async () => {})

  const checkUserSession = useCallback(async () => {
    if (!mounted.current) return

    try {
      setIsLoading(true)
      const userData = await getUser()
      
      startTransition(() => {
        if (!userData && user) {
          toast.error('نشست شما منقضی شده است. لطفا دوباره وارد شوید.')
          setUser(null)
          sessionStorage.removeItem('isLoggedIn')
          router.push('/')
        } else if (userData) {
          setUser(userData)
          const isLoggedIn = sessionStorage.getItem('isLoggedIn')
          if (!isLoggedIn) {
            toast.success('ورود موفقیت‌آمیز')
            sessionStorage.setItem('isLoggedIn', 'true')
          }
        }
      })
    } catch (error) {
      console.error('Error checking session:', error)
    } finally {
      if (mounted.current) {
        setIsLoading(false)
      }
    }
  }, [pathname, router, user])

  // به‌روزرسانی ref با آخرین نسخه تابع
  useEffect(() => {
    checkUserSessionRef.current = checkUserSession
  }, [checkUserSession])

  // اولین چک
  useEffect(() => {
    mounted.current = true
    checkUserSessionRef.current()

    return () => {
      mounted.current = false
    }
  }, [])

  // چک کردن دوره‌ای
  useEffect(() => {
    if (!mounted.current || !pathname || pathname.includes('/login')) return

    const interval = setInterval(() => {
      checkUserSessionRef.current()
    }, 4 * 60 * 1000)

    return () => clearInterval(interval)
  }, [pathname])

  const handleLogout = useCallback(async () => {
    try {
      await logout()
      startTransition(() => {
        setUser(null)
        sessionStorage.removeItem('isLoggedIn')
        router.push('/')
      })
      toast.success('با موفقیت از حساب کاربری خارج شدید')
    } catch {
      toast.error('خطا در خروج از حساب کاربری')
    }
  }, [router])

  const handleSetUser = useCallback((newUser: User | null) => {
    startTransition(() => setUser(newUser))
  }, [])

  const contextValue = useMemo(() => ({
    user,
    setUser: handleSetUser,
    logout: handleLogout,
    isLoading
  }), [user, isLoading, handleLogout, handleSetUser])

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within UserProvider')
  }
  return context
} 