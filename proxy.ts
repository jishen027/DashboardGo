import { type NextRequest, NextResponse } from 'next/server';

/**
 * Edge-layer fast-path guard (Next.js 16 "proxy" convention).
 *
 * Lightweight cookie-presence check that redirects unauthenticated requests
 * at the edge before the Node.js runtime is invoked.  Full cryptographic
 * verification happens in requireAuth() inside the Server Component layout.
 *
 * @logto/next stores the session cookie as `logto_${appId}`.
 */
export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Logto auth routes must never be gated.
  if (pathname.startsWith('/api/logto/')) {
    return NextResponse.next();
  }

  // Read LOGTO_APP_ID at request time so the edge runtime always sees the
  // real value (module-level reads are fine here since the proxy file is
  // never executed during `next build` page-data collection).
  const sessionCookie = `logto_${process.env.LOGTO_APP_ID ?? ''}`;
  const hasSession = Boolean(request.cookies.get(sessionCookie)?.value);

  if (!hasSession) {
    return NextResponse.redirect(new URL('/api/logto/sign-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
