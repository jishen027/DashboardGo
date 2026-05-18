type CardVariant = 'base' | 'flush' | 'ghost';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  hoverable?: boolean;
}

const variantClasses: Record<CardVariant, string> = {
  base:  'border-[#E5E7EB] dark:border-stone-800 p-5',
  flush: 'border-[#E5E7EB] dark:border-stone-800 overflow-hidden',
  ghost: 'border-transparent shadow-none p-0',
};

export function Card({ variant = 'base', hoverable = false, className = '', children, ...props }: CardProps) {
  return (
    <div
      className={`border rounded-lg bg-white dark:bg-[#1C1C1A] transition-all duration-300 ease-out animate-fade-in shadow-card ${variantClasses[variant]} ${hoverable ? 'hover:shadow-hover hover:-translate-y-0.5' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardBody({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`space-y-4 ${className}`}>{children}</div>;
}
