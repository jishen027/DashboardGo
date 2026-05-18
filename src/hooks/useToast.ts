import { useState } from 'react';
import type { ToastMessage, ToastType } from '@/types';

export function useToast() {
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const showToast = (message: string, type: ToastType = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return { toast, showToast };
}
