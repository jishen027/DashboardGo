import { AlertTriangle, Check, Info } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Heading } from '@/components/ui/Heading';
import { Body } from '@/components/ui/Body';
import type { ToastMessage } from '@/types';

interface ToastProps {
  toast: ToastMessage;
}

export function Toast({ toast }: ToastProps) {
  const borderColor =
    toast.type === 'danger' ? 'border-red-600' :
    toast.type === 'warning' ? 'border-amber-500' : 'border-emerald-500';

  const title =
    toast.type === 'danger' ? 'System Warning Exception' :
    toast.type === 'warning' ? 'Registry Notice' : 'Operation Success';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-zoom-in max-w-sm">
      <Card variant="base" className={`border-l-4 shadow-overlay bg-white dark:bg-[#1C1C1A] ${borderColor}`}>
        <div className="flex items-start gap-3">
          <div className="mt-0.5">
            {toast.type === 'danger'  && <AlertTriangle className="w-5 h-5 text-red-600" />}
            {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-500" />}
            {toast.type === 'success' && <Check className="w-5 h-5 text-emerald-500" />}
            {toast.type === 'stone'   && <Info className="w-5 h-5 text-stone-500" />}
          </div>
          <div>
            <Heading level={4} className="mb-0.5">{title}</Heading>
            <Body size="sm" className="text-stone-600 dark:text-stone-300">{toast.message}</Body>
          </div>
        </div>
      </Card>
    </div>
  );
}
