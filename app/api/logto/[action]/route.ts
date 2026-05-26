/**
 * Catch-all Logto authentication Route Handler.
 *
 * Handles three actions:
 *   GET /api/logto/sign-in          → redirects to Logto hosted sign-in UI
 *   GET /api/logto/sign-in-callback → exchanges OIDC code, writes session cookie
 *   GET /api/logto/sign-out         → clears session, redirects to Logto logout
 *
 * force-dynamic prevents Next.js from attempting to statically analyse this
 * route at build time (which would fail because env vars are absent during
 * `docker build`).  The LogtoClient is instantiated per-request for the same
 * reason — no module-level code touches process.env.
 */
import LogtoClient from '@logto/next/edge';
import { getLogtoConfig } from '@/lib/logto.config';
import { type NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ action: string }> },
) {
  const { action } = await params;
  // Resolve config once per request. baseUrl comes from requireEnv() which uses
  // bracket notation (process.env[name]) and is NOT inlined by Turbopack at
  // build time — unlike a direct process.env.NEXT_PUBLIC_* template literal.
  const config = getLogtoConfig();
  const client = new LogtoClient(config);

  switch (action) {
    case 'sign-in':
      return client.handleSignIn({
        redirectUri: `${config.baseUrl}/api/logto/sign-in-callback`,
        interactionMode: 'signIn',
      })(request);

    case 'sign-in-callback':
      return client.handleSignInCallback()(request);

    case 'sign-out':
      return client.handleSignOut()(request);

    default:
      return new Response('Not Found', { status: 404 });
  }
}
