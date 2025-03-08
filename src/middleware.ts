import { NextRequest, NextResponse } from 'next/server'

// Static assets cache configuration
const STATIC_ASSET_REGEX = /\.(jpe?g|png|webp|avif|gif|svg|css|js|woff2?|ttf|otf|eot)$/i;

// List of critical resources to preload/prefetch
const CRITICAL_RESOURCES = [
  { path: '/_next/static/css/', as: 'style' },
  { path: '/_next/static/chunks/pages/_app', as: 'script' },
  { path: '/_next/static/chunks/framework', as: 'script' },
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('access_token')?.value
  const response = NextResponse.next()

  // Add server timing headers for performance monitoring
  response.headers.set('Server-Timing', 'edge;dur=0');

  // Handle static asset caching
  if (STATIC_ASSET_REGEX.test(pathname)) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=31536000, immutable'
    );
    return response;
  }

  // Skip API routes for some optimizations
  if (pathname.startsWith('/api/')) {
    response.headers.set(
      'Cache-Control',
      'no-cache, no-store, max-age=0, must-revalidate'
    );
    return response;
  }

  // For HTML pages (non-static assets)
  if (!pathname.includes('.')) {
    // Generate preload/prefetch headers for critical resources
    const preloadHeaders = CRITICAL_RESOURCES.map(({ path, as }) => {
      return `<${path}>; rel=preload; as=${as}`;
    }).join(', ');

    if (preloadHeaders) {
      response.headers.set('Link', preloadHeaders);
    }

    // Set caching for HTML pages
    response.headers.set(
      'Cache-Control',
      'public, max-age=60, s-maxage=3600, stale-while-revalidate=86400'
    );

    // Enable compression
    response.headers.set('Accept-Encoding', 'gzip, deflate, br');
  }

  if (pathname.startsWith('/dashboard') && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)',
    // Also explicitly match api routes for specific headers
    '/api/:path*',
  ]
} 