type TechValueSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '5xl';

interface TechValueProps {
  size?: TechValueSize;
  children: React.ReactNode;
  className?: string;
}

const sizeClasses: Record<TechValueSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
};

export function TechValue({ size = '4xl', children, className = '' }: TechValueProps) {
  return (
    <span
      className={`font-mono font-black text-[#1A1A1A] dark:text-stone-100 tracking-tight leading-none ${sizeClasses[size]} ${className}`}
    >
      {children}
    </span>
  );
}
