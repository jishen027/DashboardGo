import { Search, X } from 'lucide-react';
import { TechLabel } from '@/components/ui/TechLabel';

export type StatusFilter = 'all' | 'online' | 'offline' | 'paused';

interface FilterBarProps {
  searchQuery: string;
  statusFilter: StatusFilter;
  totalVisible: number;
  totalNodes: number;
  onSearchChange: (q: string) => void;
  onStatusChange: (s: StatusFilter) => void;
}

const STATUS_OPTIONS: { label: string; value: StatusFilter; dot: string }[] = [
  { label: 'All',     value: 'all',     dot: 'bg-stone-400' },
  { label: 'Online',  value: 'online',  dot: 'bg-emerald-500' },
  { label: 'Offline', value: 'offline', dot: 'bg-red-500' },
  { label: 'Paused',  value: 'paused',  dot: 'bg-amber-400' },
];

export function FilterBar({
  searchQuery, statusFilter, totalVisible, totalNodes,
  onSearchChange, onStatusChange,
}: FilterBarProps) {
  const isFiltering = searchQuery.trim() !== '' || statusFilter !== 'all';

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 py-2 border-b border-stone-200/60 dark:border-stone-800/60">
      {/* Search input */}
      <div className="relative flex-1 max-w-xs">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Search nodes…"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-8 pr-7 py-1.5 text-xs bg-white dark:bg-[#1C1C1A] border border-stone-200 dark:border-stone-800 rounded focus:outline-none focus:ring-1 focus:ring-stone-400 dark:focus:ring-stone-600 text-[#1A1A1A] dark:text-stone-100 placeholder-stone-400"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
            aria-label="Clear search"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Status filter buttons */}
      <div className="flex items-center gap-2">
        <TechLabel className="mb-0 shrink-0">Status:</TechLabel>
        <div className="inline-flex rounded border border-stone-200 dark:border-stone-800 overflow-hidden">
          {STATUS_OPTIONS.map((opt, i) => (
            <button
              key={opt.value}
              onClick={() => onStatusChange(opt.value)}
              className={`flex items-center gap-1.5 px-2.5 py-1 font-mono text-[10px] uppercase font-bold tracking-wider
                ${i > 0 ? 'border-l border-stone-200 dark:border-stone-800' : ''}
                ${statusFilter === opt.value
                  ? 'bg-[#1A1A1A] text-white dark:bg-stone-100 dark:text-[#1A1A1A]'
                  : 'bg-white dark:bg-[#1C1C1A] text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${statusFilter === opt.value ? 'bg-white dark:bg-[#1A1A1A]' : opt.dot}`} />
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Result count */}
      {isFiltering && (
        <span className="font-mono text-[10px] text-stone-400 dark:text-stone-500 uppercase tracking-wider shrink-0">
          {totalVisible} / {totalNodes} nodes
        </span>
      )}
    </div>
  );
}
