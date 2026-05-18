interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg';
  'aria-label': string;
}

const sizeClasses = { sm: 'p-1.5', md: 'p-3', lg: 'p-4' };

export function IconButton({ size = 'md', children, className = '', ...props }: IconButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md text-stone-500 hover:text-[#1A1A1A] hover:bg-stone-100 dark:hover:bg-stone-800 dark:hover:text-stone-100 transition-all focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
