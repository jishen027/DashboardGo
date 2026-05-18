interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
}

export function Select({ label, options, id, error, className = '', ...props }: SelectProps) {
  return (
    <div className="flex flex-col space-y-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-[#1A1A1A] dark:text-stone-300">
          {label}
        </label>
      )}
      <select
        id={id}
        className={`w-full px-4 py-2.5 text-sm bg-white dark:bg-[#1C1C1A] border rounded transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          ${error ? 'border-red-500 dark:border-red-900' : 'border-[#E5E7EB] dark:border-stone-800'}
          text-[#1A1A1A] dark:text-stone-100 ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}
