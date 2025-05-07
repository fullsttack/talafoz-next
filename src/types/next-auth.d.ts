import 'next-auth';

declare module 'next-auth' {
  /**
   * گسترش interface User برای اضافه کردن فیلدهای سفارشی
   */
  interface User {
    accessToken?: string;
    refreshToken?: string;
    username?: string;
    phone_number?: string;
    is_staff?: boolean;
    is_superuser?: boolean;
  }

  /**
   * گسترش interface Session برای اضافه کردن فیلدهای سفارشی
   */
  interface Session {
    user: User & {
      accessToken?: string;
      refreshToken?: string;
      username?: string;
      phone_number?: string;
      is_staff?: boolean;
      is_superuser?: boolean;
    };
    error?: 'RefreshAccessTokenError';
  }
}

declare module 'next-auth/jwt' {
  /**
   * گسترش interface JWT برای اضافه کردن فیلدهای سفارشی
   */
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    username?: string;
    phone_number?: string;
    is_staff?: boolean;
    is_superuser?: boolean;
    accessTokenExpiry?: number;
    error?: 'RefreshAccessTokenError';
  }
} 