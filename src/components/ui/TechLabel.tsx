interface TechLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function TechLabel({ children, className = '' }: TechLabelProps) {
  return (
    <span
      className={`block font-mono text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400 font-semibold mb-1 ${className}`}
    >
      {children}
    </span>
  );
}
