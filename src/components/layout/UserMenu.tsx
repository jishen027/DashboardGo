'use client';

import { useState, useEffect, useRef } from 'react';
import { LogOut } from 'lucide-react';
import type { UserInfo } from '@/types';

interface UserMenuProps {
  user: UserInfo;
}

function getInitials(name?: string, email?: string): string {
  if (name?.trim()) {
    return name.trim().split(/\s+/).map(n => n[0]).slice(0, 2).join('').toUpperCase();
  }
  if (email) return email[0].toUpperCase();
  return 'U';
}

function Avatar({ user, size = 'sm' }: { user: UserInfo; size?: 'sm' | 'md' }) {
  const initials = getInitials(user.name, user.email);
  const dim = size === 'md' ? 'w-9 h-9' : 'w-8 h-8';
  return user.picture ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={user.picture} alt={user.name ?? 'avatar'} className={`${dim} rounded-full object-cover`} />
  ) : (
    <span className={`${dim} rounded-full bg-[#1A1A1A] dark:bg-stone-100 text-white dark:text-[#1A1A1A] text-xs font-semibold flex items-center justify-center select-none`}>
      {initials}
    </span>
  );
}

export function UserMenu({ user }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, []);

  const displayName = user.name ?? user.email ?? 'Account';

  return (
    <div ref={rootRef} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        aria-label="Open user menu"
        aria-expanded={open}
        className="flex items-center justify-center rounded-full ring-2 ring-transparent hover:ring-stone-300 dark:hover:ring-stone-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      >
        <Avatar user={user} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#1C1C1A] border border-[#E5E7EB] dark:border-stone-800 rounded-lg shadow-lg z-50 overflow-hidden">
          {/* Identity block */}
          <div className="px-4 py-3 border-b border-[#E5E7EB] dark:border-stone-800">
            <div className="flex items-center gap-3">
              <Avatar user={user} size="md" />
              <div className="min-w-0">
                {user.name && (
                  <p className="text-sm font-semibold text-[#1A1A1A] dark:text-stone-100 truncate">{user.name}</p>
                )}
                {user.email && (
                  <p className="text-xs text-stone-500 dark:text-stone-400 truncate">{user.email}</p>
                )}
                {!user.name && !user.email && (
                  <p className="text-sm font-semibold text-[#1A1A1A] dark:text-stone-100">{displayName}</p>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="p-1">
            <a
              href="/api/logto/sign-out"
              className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-[#1A1A1A] dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded transition-colors"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              Sign Out
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
