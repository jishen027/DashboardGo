/**
 * Catch-all Logto authentication Route Handler.
 *
 * Handles three actions:
 *   GET /api/logto/sign-in          → redirects to Logto hosted sign-in UI
 *   GET /api/logto/sign-in-callback → exchanges OIDC code, writes session cookie
 *   GET /api/logto/sign-out         → clears session, redirects to Logto logout
 *
 * Uses @logto/next/edge so the handler works in both Node.js (default) and
 * Edge runtimes.  The edge client replaces the incoming request's domain with
 * config.baseUrl when building the callback URL, making the reverse-proxy /
 * VPN topology fully transparent.
 */
import LogtoClient from '@logto/next/edge';
import { logtoConfig } from '@/lib/logto.config';
import { type NextRequest } from 'next/server';

const client = new LogtoClient(logtoConfig);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ action: string }> },
) {
  const { action } = await params;

  switch (action) {
    case 'sign-in':
      // interactionMode: 'signIn' suppresses the "Create account" link for this
      // app without touching global Logto sign-in experience settings.
      return client.handleSignIn({
        redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/api/logto/sign-in-callback`,
        interactionMode: 'signIn',
      })(request);

    case 'sign-in-callback':
      // Exchanges auth code for tokens, writes encrypted session cookie,
      // then redirects the browser back to baseUrl (the dashboard root).
      return client.handleSignInCallback()(request);

    case 'sign-out':
      // Clears the local session cookie and redirects to Logto's end_session
      // endpoint, which in turn redirects back to baseUrl.
      return client.handleSignOut()(request);

    default:
      return new Response('Not Found', { status: 404 });
  }
}
