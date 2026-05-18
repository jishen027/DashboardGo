import { Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { SearchEngine } from '@/types';

interface SearchBarProps {
  searchQuery: string;
  selectedProvider: string;
  searchEngines: SearchEngine[];
  filteredCount: number;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onQueryChange: (q: string) => void;
  onProviderChange: (p: string) => void;
  onSearch: (e: React.FormEvent) => void;
  onClear: () => void;
}

export function SearchBar({
  searchQuery,
  selectedProvider,
  searchEngines,
  filteredCount,
  inputRef,
  onQueryChange,
  onProviderChange,
  onSearch,
  onClear,
}: SearchBarProps) {

  return (
    <section className="bg-white dark:bg-[#1C1C1A] border border-[#E5E7EB] dark:border-stone-800 rounded-lg p-5 shadow-sm">
      <form onSubmit={onSearch} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="sm:w-48">
            <select
              className="w-full px-3 py-3 text-sm font-mono uppercase bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-stone-800 dark:text-stone-200 font-semibold"
              value={selectedProvider}
              onChange={(e) => onProviderChange(e.target.value)}
            >
              {searchEngines.map((engine) => (
                <option key={engine.value} value={engine.value}>{engine.label}</option>
              ))}
            </select>
          </div>

          <div className="relative flex-1">
            <span className="absolute left-3.5 top-3.5 text-stone-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              ref={inputRef as React.RefObject<HTMLInputElement>}
              type="text"
              placeholder="Press Ctrl+K to focus. Press 'Enter' to query internet, or filter registry below..."
              className="w-full pl-11 pr-4 py-3 text-sm bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-stone-800 dark:text-stone-200 font-mono"
              value={searchQuery}
              onChange={(e) => onQueryChange(e.target.value)}
            />
          </div>

          <Button variant="primary" type="submit" size="md">Web Query</Button>
        </div>

        <div className="flex items-center justify-between text-xs font-mono text-stone-500 dark:text-stone-400 pt-1">
          <span>
            Press <kbd className="px-1 py-0.5 bg-stone-100 dark:bg-stone-800 border rounded">Ctrl</kbd>+<kbd className="px-1 py-0.5 bg-stone-100 dark:bg-stone-800 border rounded">K</kbd> from anywhere to quick-focus this input.
          </span>
          {searchQuery && (
            <button type="button" onClick={onClear} className="text-blue-500 hover:underline">
              Clear Filter [{filteredCount} results]
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
