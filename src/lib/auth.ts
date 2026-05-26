import { getLogtoContext } from '@logto/next/server-actions';
import { redirect } from 'next/navigation';
import { logtoConfig } from './logto.config';

// Re-export so callers can type-annotate without reaching into @logto internals.
export type { LogtoContext } from '@logto/next/server-actions';

/**
 * Call in any Server Component or async layout to enforce authentication.
 *
 * If the session cookie is absent or invalid, the user is redirected server-side
 * to the Logto sign-in page before a single byte of HTML is sent to the browser —
 * eliminating any possibility of a layout flash.
 *
 * Route Handlers (app/api/**) are NOT wrapped by layouts and are therefore
 * unaffected by this call; the Logto auth routes (/api/logto/*) work normally.
 *
 * Usage:
 *   const ctx = await requireAuth();
 *   // ctx.claims.sub — user ID
 *   // ctx.claims.email — user e-mail (if email scope was requested)
 */
export async function requireAuth() {
  const ctx = await getLogtoContext(logtoConfig);

  if (!ctx.isAuthenticated) {
    // redirect() throws a Next.js-internal error (return type: never),
    // so execution stops here for unauthenticated requests.
    redirect('/api/logto/sign-in');
  }

  return ctx;
}

/**
 * Non-throwing variant — returns the context regardless of auth state.
 * Use in layouts / pages that should render differently for guests vs. users
 * without hard-gating access.
 */
export async function getOptionalUser() {
  return getLogtoContext(logtoConfig);
}
