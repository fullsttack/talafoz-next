import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';


const protectedRoots = [
  '/dashboard',
  '/profile',
  '/settings',
  '/wallet',
  '/tickets',
  '/courses/my-courses',
];


const authPaths: string[] = [];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // check if the current path is a protected path
  const isProtectedPath = protectedRoots.some(root => 
    pathname === root || pathname.startsWith(`${root}/`)
  );
  
  // check if the current path is an auth path
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
    // redirect to the home page instead of the login page
    const url = new URL('/', request.url);
    // add the showLogin parameter to display the login dialog on the home page
    url.searchParams.set('showLogin', 'true');
    url.searchParams.set('callbackUrl', encodeURI(pathname));
    return NextResponse.redirect(url);
  }
  
  if (isAuthPath && isAuthenticated) {
    // redirect to the home page if the user is authenticated and tries to access the auth pages
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