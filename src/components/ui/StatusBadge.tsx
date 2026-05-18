import { Badge } from './Badge';
import type { ServiceStatus } from '@/types';

interface StatusBadgeProps {
  status: ServiceStatus;
  className?: string;
}

const statusMap: Record<ServiceStatus, { variant: 'success' | 'danger' | 'warning' | 'stone'; text: string }> = {
  correct:    { variant: 'success', text: 'Online' },
  completed:  { variant: 'success', text: 'Online' },
  wrong:      { variant: 'danger',  text: 'Offline' },
  error:      { variant: 'danger',  text: 'Offline' },
  skipped:    { variant: 'stone',   text: 'Paused' },
  inProgress: { variant: 'warning', text: 'Checking' },
  expired:    { variant: 'danger',  text: 'Timeout' },
};

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const { variant, text } = statusMap[status] ?? { variant: 'stone', text: 'Unknown' };
  return <Badge variant={variant} dot size="sm" className={className}>{text}</Badge>;
}
