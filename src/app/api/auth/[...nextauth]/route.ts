import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

// تنظیمات NextAuth
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'otp-credentials',
      name: 'OTP Login',
      credentials: {
        user: { label: 'ایمیل یا شماره تلفن', type: 'text' },
        verification_code: { label: 'کد تایید', type: 'text' }
      },
      // تابع احراز هویت
      async authorize(credentials) {
        try {
          if (!credentials?.user || !credentials?.verification_code) {
            throw new Error('اطلاعات وارد شده ناقص است');
          }

          // ارسال درخواست به API برای بررسی کد OTP
          const response = await fetch(`${API_URL}/auth/users/verify_otp/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              user: credentials.user,
              verification_code: credentials.verification_code,
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || 'خطا در احراز هویت');
          }

          // اگر احراز هویت موفق بود، اطلاعات کاربر را برمی‌گردانیم
          return {
            id: data.user.id.toString(),
            name: data.user.first_name ? `${data.user.first_name} ${data.user.last_name}` : data.user.username,
            email: data.user.email,
            image: null,
            accessToken: data.access,
            refreshToken: data.refresh,
            username: data.user.username,
            phone_number: data.user.phone_number,
            is_staff: data.user.is_staff,
            is_superuser: data.user.is_superuser,
          };
        } catch (error) {
          console.error('OTP verification error:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 5 * 60, // 5 دقیقه
  },
  callbacks: {
    // اضافه کردن توکن‌ها به JWT
    async jwt({ token, user, account }) {
      if (user && account) {
        // وقتی کاربر لاگین می‌کند، توکن‌ها را به JWT اضافه می‌کنیم
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.username = user.username;
        token.phone_number = user.phone_number;
        token.is_staff = user.is_staff;
        token.is_superuser = user.is_superuser;
        token.accessTokenExpiry = Date.now() + 1 * 60 * 1000; // 1 دقیقه
      }

      // بررسی می‌کنیم آیا توکن دسترسی منقضی شده است
      if (token.accessTokenExpiry && Date.now() > token.accessTokenExpiry) {
        return refreshAccessToken(token);
      }

      return token;
    },
    // انتقال داده‌ها از JWT به session
    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;
      session.user.phone_number = token.phone_number;
      session.user.is_staff = token.is_staff;
      session.user.is_superuser = token.is_superuser;
      session.error = token.error;
      
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
  debug: process.env.NODE_ENV === 'development',
};

// تابع تازه کردن توکن دسترسی با استفاده از توکن بازیابی
async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    // API call برای بازیابی توکن
    const response = await fetch(`${API_URL}/auth/jwt/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh: token.refreshToken }),
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    console.log('🔄 [refreshAccessToken] New access token:', refreshedTokens.access);

    return {
      ...token,
      accessToken: refreshedTokens.access,
      accessTokenExpiry: Date.now() + 1 * 60 * 1000, // 1 دقیقه
    };
  } catch (error) {
    console.error('Error refreshing access token', error);
    
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

// Handler برای API route
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 