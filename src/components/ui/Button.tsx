import { RefreshCw } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:   'bg-[#1A1A1A] hover:bg-stone-800 text-white dark:bg-stone-100 dark:hover:bg-stone-200 dark:text-[#1A1A1A]',
  secondary: 'bg-white border border-[#E5E7EB] text-[#1A1A1A] hover:bg-stone-50 dark:bg-[#1C1C1A] dark:border-stone-800 dark:text-stone-200 dark:hover:bg-stone-800/80',
  ghost:     'text-[#1A1A1A] hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800',
  danger:    'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  link:      'text-blue-500 hover:underline px-0 py-0 focus:ring-0 focus:ring-offset-0',
};

const sizeClasses = { sm: 'px-3 py-1.5 text-xs', md: 'px-4 py-3 text-sm', lg: 'px-6 py-4 text-base' };

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  iconLeft,
  iconRight,
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center font-semibold rounded transition-all focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <RefreshCw className="w-4 h-4 animate-spin mr-2" />}
      {!loading && iconLeft && <span className="mr-2">{iconLeft}</span>}
      <span>{children}</span>
      {!loading && iconRight && <span className="ml-2">{iconRight}</span>}
    </button>
  );
}
