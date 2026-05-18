interface CodeProps {
  children: React.ReactNode;
  className?: string;
}

export function Code({ children, className = '' }: CodeProps) {
  return (
    <code
      className={`font-mono text-xs px-1.5 py-0.5 bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 rounded ${className}`}
    >
      {children}
    </code>
  );
}
