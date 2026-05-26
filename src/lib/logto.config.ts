import type { LogtoNextConfig } from '@logto/next';

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

/**
 * Shared Logto config consumed by both the edge Route Handler client and the
 * server-actions utilities.  All public-facing URLs are anchored to
 * NEXT_PUBLIC_APP_URL so the reverse-proxy / VPN topology is transparent to
 * the SDK — it never needs to infer the host from an incoming request.
 */
export const logtoConfig: LogtoNextConfig = {
  // Your self-hosted Logto instance, accessed via the Nginx reverse proxy
  endpoint: requireEnv('LOGTO_ENDPOINT'),

  // Application credentials — Logto Admin Console › Applications › <app>
  appId: requireEnv('LOGTO_APP_ID'),
  appSecret: requireEnv('LOGTO_APP_SECRET'),

  // Dashboard's canonical public URL (no trailing slash).
  // The SDK constructs redirect_uri as: baseUrl + /api/logto/sign-in-callback
  baseUrl: requireEnv('NEXT_PUBLIC_APP_URL'),

  // AES-256 key used to encrypt the iron-session cookie.
  // Generate: openssl rand -hex 32
  cookieSecret: requireEnv('LOGTO_COOKIE_SECRET'),

  // Enforce Secure attribute on the session cookie in production.
  cookieSecure: process.env.NODE_ENV === 'production',
};
