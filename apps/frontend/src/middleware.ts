import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Define protected routes
  const isDashboardRoute = pathname.startsWith('/admin') || pathname.startsWith('/dashboard');
  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/register');

  // For now, we'll just use a placeholder for authentication check
  // In a real app, you'd check for a session cookie or JWT
  const isAuthenticated = request.cookies.has('session');

  if (isDashboardRoute && !isAuthenticated) {
    // Redirect to login if trying to access dashboard while unauthenticated
    // return NextResponse.redirect(new URL('/login', request.url));
    // Commented out to avoid locking out during development if no cookie exists
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
