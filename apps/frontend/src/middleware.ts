import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Define protected routes
  const isDashboardRoute = pathname.startsWith('/admin') || pathname.startsWith('/dashboard');
  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/register');

  // Check for the access_token cookie
  const isAuthenticated = request.cookies.has('access_token');

  if (isDashboardRoute && !isAuthenticated) {
    // Redirect to login if trying to access dashboard while unauthenticated
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAuthRoute && isAuthenticated) {
    // Redirect to dashboard if already authenticated
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/dashboard/:path*',
    '/login',
    '/register',
  ],
};
