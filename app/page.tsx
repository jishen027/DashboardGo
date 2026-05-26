import App from '@/App';
import { requireAuth } from '@/lib/auth';
import type { UserInfo } from '@/types';

export default async function Page() {
  // requireAuth() is also called in layout.tsx, so by the time we reach here
  // the user is guaranteed to be authenticated. This call is cheap (cookie read)
  // and gives us strongly-typed claims.
  const ctx = await requireAuth();

  const user: UserInfo = {
    sub: ctx.claims?.sub ?? '',
    name: ctx.claims?.name ?? undefined,
    email: ctx.claims?.email ?? undefined,
    picture: ctx.claims?.picture ?? undefined,
  };

  return <App user={user} />;
}
