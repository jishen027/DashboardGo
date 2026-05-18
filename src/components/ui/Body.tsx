interface BodyProps {
  size?: 'xs' | 'sm' | 'md';
  muted?: boolean;
  children: React.ReactNode;
  className?: string;
}

const sizeClasses = {
  xs: 'text-xs leading-relaxed',
  sm: 'text-sm leading-relaxed',
  md: 'text-base leading-relaxed',
};

export function Body({ size = 'md', muted = false, children, className = '' }: BodyProps) {
  const baseClass = muted
    ? 'text-stone-400 dark:text-stone-500'
    : 'text-stone-800 dark:text-stone-300';
  return (
    <p className={`${sizeClasses[size]} ${baseClass} ${className}`}>{children}</p>
  );
}
