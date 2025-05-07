import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Paths that require authentication
const protectedPaths = [
  '/profile',
  '/courses/my-courses',
];

// Paths that should not be accessed when authenticated
const authPaths = [
  '/login',
  '/register',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the current path is protected
  const isProtectedPath = protectedPaths.some(path => 
    pathname === path || pathname.startsWith(`${path}/`)
  );
  
  // Check if the current path is an auth path
  const isAuthPath = authPaths.some(path => 
    pathname === path || pathname.startsWith(`${path}/`)
  );
  
  // Get the authentication tokens from next-auth
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  
  // User is considered authenticated if they have a token
  const isAuthenticated = !!token;

  // Redirect based on authentication status and requested path
  if (isProtectedPath && !isAuthenticated) {
    // Redirect to login if trying to access protected route while not authenticated
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', encodeURI(pathname));
    return NextResponse.redirect(url);
  }
  
  if (isAuthPath && isAuthenticated) {
    // Redirect to home if trying to access auth routes while authenticated
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return NextResponse.next();
}

// Configure which paths this middleware is active on
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images|static|vector).*)',
  ],
}; 