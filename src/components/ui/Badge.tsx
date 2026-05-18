type BadgeVariant = 'stone' | 'blue' | 'active' | 'success' | 'warning' | 'danger';

interface BadgeProps {
  variant?: BadgeVariant;
  dot?: boolean;
  size?: 'sm' | 'md';
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  stone:   'bg-stone-100 text-stone-700 border border-stone-200 dark:bg-stone-800/60 dark:text-stone-300 dark:border-stone-700',
  blue:    'bg-blue-50 text-blue-700 border border-blue-100 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900',
  active:  'bg-blue-500 text-white border border-blue-600',
  success: 'bg-emerald-50 text-emerald-700 border border-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900',
  warning: 'bg-amber-50 text-amber-700 border border-amber-100 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900',
  danger:  'bg-red-50 text-red-700 border border-red-100 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900',
};

const sizeClasses = { sm: 'px-1.5 py-0.5 text-[10px]', md: 'px-2 py-1 text-xs' };

const dotClasses: Record<BadgeVariant, string> = {
  stone:   'bg-stone-400',
  blue:    'bg-blue-500',
  active:  'bg-white',
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  danger:  'bg-red-500',
};

export function Badge({ variant = 'stone', dot = false, size = 'sm', children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center font-mono font-semibold uppercase rounded tracking-wider ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${dotClasses[variant]}`} />}
      {children}
    </span>
  );
}
