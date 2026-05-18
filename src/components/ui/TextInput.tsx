interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  mono?: boolean;
}

export function TextInput({ label, hint, id, error, mono = false, className = '', ...props }: TextInputProps) {
  return (
    <div className="flex flex-col space-y-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-[#1A1A1A] dark:text-stone-300">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full px-4 py-2.5 text-sm bg-white dark:bg-[#1C1C1A] border rounded transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          ${error ? 'border-red-500 dark:border-red-900 focus:ring-red-500' : 'border-[#E5E7EB] dark:border-stone-800'}
          ${mono ? 'font-mono' : ''}
          text-[#1A1A1A] dark:text-stone-100 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-600 dark:text-red-400 font-semibold">{error}</span>}
      {!error && hint && <span className="text-xs text-stone-400 dark:text-stone-500">{hint}</span>}
    </div>
  );
}
