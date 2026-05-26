import type { LogtoNextConfig } from '@logto/next';

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

/**
 * Returns the Logto config, evaluated lazily at request time.
 *
 * Must be a function — not a module-level constant — so that requireEnv()
 * is never called during `next build` when env vars are absent.
 * All public-facing URLs are anchored to NEXT_PUBLIC_APP_URL so the
 * reverse-proxy / VPN topology is transparent to the SDK.
 */
export function getLogtoConfig(): LogtoNextConfig {
  return {
    endpoint: requireEnv('LOGTO_ENDPOINT'),
    appId: requireEnv('LOGTO_APP_ID'),
    appSecret: requireEnv('LOGTO_APP_SECRET'),
    baseUrl: requireEnv('NEXT_PUBLIC_APP_URL'),
    cookieSecret: requireEnv('LOGTO_COOKIE_SECRET'),
    cookieSecure: process.env.NODE_ENV === 'production',
  };
}
