import { Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { TechLabel } from '@/components/ui/TechLabel';
import type { LayoutDensity } from '@/types';

interface DensityControlsProps {
  density: LayoutDensity;
  editMode: boolean;
  onDensityChange: (d: LayoutDensity) => void;
  onToggleEditMode: () => void;
}

const DENSITIES: LayoutDensity[] = ['compact', 'medium', 'comfortable'];

export function DensityControls({ density, editMode, onDensityChange, onToggleEditMode }: DensityControlsProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2 border-b border-stone-200/60 dark:border-stone-800/60">
      <div className="flex items-center gap-3">
        <TechLabel className="mb-0">Density view:</TechLabel>
        <div className="inline-flex rounded border border-stone-200 dark:border-stone-800 overflow-hidden">
          {DENSITIES.map((d, i) => (
            <button
              key={d}
              onClick={() => onDensityChange(d)}
              className={`px-3 py-1 font-mono text-[10px] uppercase font-bold tracking-wider
                ${i === 1 ? 'border-x border-stone-200 dark:border-stone-800' : ''}
                ${density === d
                  ? 'bg-[#1A1A1A] text-white dark:bg-stone-100 dark:text-[#1A1A1A]'
                  : 'bg-white dark:bg-[#1C1C1A] text-stone-500 hover:text-stone-800'}`}
            >
              {d.charAt(0).toUpperCase() + d.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <Button
        variant={editMode ? 'primary' : 'secondary'}
        size="sm"
        onClick={onToggleEditMode}
        iconLeft={<Edit3 className="w-3.5 h-3.5" />}
      >
        {editMode ? 'Lock Layout & Save' : 'Enable Edit Mode'}
      </Button>
    </div>
  );
}
