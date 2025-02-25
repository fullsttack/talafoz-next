'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { type User, type VerifyOTPResponse } from '@/types/auth'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export async function sendOTP(formData: FormData) {
  const phone_number = formData.get('phone_number') as string

  try {
    const res = await fetch(`${API_URL}/api/users/send_otp/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone_number }),
    })

    const data = await res.json()

    if (!res.ok) {
      return {
        success: false,
        message: data.detail || 'خطای سرور'
      }
    }

    return { 
      success: true,
      message: 'کد تایید ارسال شد'
    }

  } catch {
    return {
      success: false,
      message: 'خطا در ارتباط با سرور'
    }
  }
}

export async function verifyOTP(formData: FormData) {
  const phone_number = formData.get('phone_number') as string
  const otp = formData.get('otp') as string

  try {
    const res = await fetch(`${API_URL}/api/users/verify_otp/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone_number, otp }),
    })

    const data = await res.json() as VerifyOTPResponse

    if (!res.ok) {
      return {
        success: false,
        message: data.detail || 'خطای سرور'
      }
    }

    const cookieStore = await cookies()
    
    await cookieStore.set('access_token', data.tokens.access, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 5,
      path: '/'
    })
    
    await cookieStore.set('refresh_token', data.tokens.refresh, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60,
      path: '/'
    })

    revalidatePath('/')
    return {
      success: true,
      message: 'ورود موفقیت‌آمیز',
      data: {
        user: data.user
      }
    }

  } catch {
    return {
      success: false,
      message: 'خطا در ارتباط با سرور'
    }
  }
}

export async function getUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('access_token')
    const refreshTokenExists = cookieStore.get('refresh_token')

    console.log('Current tokens status:', {
      hasAccessToken: !!token,
      hasRefreshToken: !!refreshTokenExists
    })

    if (!token) {
      console.log('No access token, trying to refresh')
      const refreshed = await refreshToken()
      console.log('Refresh attempt result:', refreshed)
      if (!refreshed) return null
      return getUser()
    }

    const res = await fetch(`${API_URL}/api/users/me/`, {
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    })

    if (!res.ok) {
      console.log('Failed to get user:', res.status)
      if (res.status === 401) {
        const refreshed = await refreshToken()
        if (refreshed) {
          return getUser()
        }
      }
      return null
    }

    const data = await res.json()
    return data as User
  } catch (error) {
    console.log('Error getting user:', error)
    return null
  }
}

export async function refreshToken() {
  try {
    const cookieStore = await cookies()
    const refreshToken = cookieStore.get('refresh_token')

    if (!refreshToken) {
      console.log('No refresh token found')
      return false
    }

    console.log('Attempting to refresh with token:', refreshToken.value.slice(-10))

    const res = await fetch(`${API_URL}/api/auth/jwt/refresh`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        refresh: refreshToken.value 
      }),
      cache: 'no-store'
    })

    const data = await res.json()
    console.log('Refresh token response:', {
      status: res.status,
      data: data
    })

    if (!res.ok) {
      console.log('Failed to refresh token:', res.status, data)
      if (res.status === 401 || res.status === 403) {
        await cookieStore.delete('access_token')
        await cookieStore.delete('refresh_token')
      }
      return false
    }

    console.log('Setting new access token, expires in:', 60 * 5, 'seconds')
    
    await cookieStore.set('access_token', data.access, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 5,
      path: '/'
    })

    if (data.refresh) {
      console.log('Setting new refresh token')
      await cookieStore.set('refresh_token', data.refresh, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60,
        path: '/'
      })
    }

    return true
  } catch (error) {
    console.log('Error refreshing token:', error)
    return false
  }
}

export async function logout() {
  const cookieStore = await cookies()
  await cookieStore.delete('access_token')
  await cookieStore.delete('refresh_token')
  revalidatePath('/')
} 