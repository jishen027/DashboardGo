import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { requireAuth } from '@/lib/auth';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// This layout reads cookies (via requireAuth → next/headers), so it must never
// be statically pre-rendered. force-dynamic propagates to all routes beneath
// it, including the built-in /_not-found page, preventing the build-time crash.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Hiiragi — DashboardGo Portal',
  description: 'Interactive navigation console for self-hosted network platforms.',
};

// RootLayout is a Server Component. requireAuth() runs on the server and calls
// Next.js redirect() before any HTML is streamed — there is no client-side flash.
// Route Handlers (app/api/**) are NOT processed by layouts, so the Logto auth
// routes (/api/logto/*) are never gated by this call.
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  await requireAuth();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
