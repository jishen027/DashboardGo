import { type NextRequest, NextResponse } from 'next/server';

/**
 * Edge-layer fast-path guard.
 *
 * This middleware does a lightweight cookie-presence check and redirects
 * unauthenticated requests at the CDN/Edge layer — before the request ever
 * reaches the Node.js runtime.  This eliminates the round-trip cost of
 * spinning up a Server Component only to discover there is no session.
 *
 * The cryptographic verification of the session (signature + expiry) is
 * performed by requireAuth() inside the Server Component layout, which runs
 * in the full Node.js runtime and has access to @logto/next/server-actions.
 *
 * @logto/next stores the session in a cookie named `logto_${appId}`.
 * If you change your LOGTO_APP_ID you must restart the dev server so the
 * env var is re-read at startup.
 */

const LOGTO_APP_ID = process.env.LOGTO_APP_ID ?? '';
const SESSION_COOKIE = `logto_${LOGTO_APP_ID}`;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Always let the Logto auth routes through — they set/clear the session.
  if (pathname.startsWith('/api/logto/')) {
    return NextResponse.next();
  }

  const hasSession = Boolean(request.cookies.get(SESSION_COOKIE)?.value);

  if (!hasSession) {
    const signInUrl = new URL('/api/logto/sign-in', request.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Run on all paths except Next.js internals and static assets.
    '/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
