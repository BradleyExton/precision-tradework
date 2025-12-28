import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get the response
  const response = NextResponse.next();

  // Security Headers
  // Prevent clickjacking
  response.headers.set("X-Frame-Options", "DENY");

  // Prevent MIME type sniffing
  response.headers.set("X-Content-Type-Options", "nosniff");

  // Enable XSS filter in older browsers
  response.headers.set("X-XSS-Protection", "1; mode=block");

  // Referrer policy
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // Permissions policy (formerly Feature-Policy)
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );

  // Content Security Policy
  // Allows scripts from self, Google Analytics, and Mapbox
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://api.mapbox.com",
    "style-src 'self' 'unsafe-inline' https://api.mapbox.com",
    "img-src 'self' data: blob: https://api.mapbox.com https://*.mapbox.com https://www.google-analytics.com",
    "font-src 'self'",
    "connect-src 'self' https://www.google-analytics.com https://api.mapbox.com https://*.mapbox.com https://*.tiles.mapbox.com https://events.mapbox.com",
    "worker-src 'self' blob:",
    "child-src 'self' blob:",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; ");

  response.headers.set("Content-Security-Policy", csp);

  return response;
}

// Only run middleware on specific paths (exclude static files, api routes handled separately)
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
