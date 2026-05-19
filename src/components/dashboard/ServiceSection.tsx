import { ChevronDown, ChevronUp, ArrowUp, ArrowDown, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Body } from '@/components/ui/Body';
import { Heading } from '@/components/ui/Heading';
import { IconButton } from '@/components/ui/IconButton';
import { Button } from '@/components/ui/Button';
import { ServiceCard } from './ServiceCard';
import type { ServiceSection as ServiceSectionType, LayoutDensity } from '@/types';

interface ServiceSectionProps {
  section: ServiceSectionType;
  sectionIdx: number;
  totalSections: number;
  isCollapsed: boolean;
  editMode: boolean;
  density: LayoutDensity;
  pingingId: string | null;
  onToggleCollapse: () => void;
  onMoveSectionUp: () => void;
  onMoveSectionDown: () => void;
  onPingSectionAll: () => void;
  onPingItem: (itemId: string) => void;
  onDeleteItem: (itemId: string, itemName: string) => void;
  onMoveItemUp: (itemIdx: number) => void;
  onMoveItemDown: (itemIdx: number) => void;
}

const gridClass: Record<LayoutDensity, string> = {
  compact:     'grid-cols-1 md:grid-cols-3 lg:grid-cols-4',
  medium:      'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  comfortable: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
};

export function ServiceSection({
  section, sectionIdx, totalSections, isCollapsed, editMode, density, pingingId,
  onToggleCollapse, onMoveSectionUp, onMoveSectionDown, onPingSectionAll,
  onPingItem, onDeleteItem, onMoveItemUp, onMoveItemDown,
}: ServiceSectionProps) {
  return (
    <div className="space-y-3">
      {/* Section header */}
      <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-1.5 gap-2">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            onClick={onToggleCollapse}
            className="p-1 rounded text-stone-500 hover:text-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 shrink-0"
          >
            {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
          <div className="min-w-0">
            <Heading level={2} className="text-base sm:text-lg md:text-xl flex items-center gap-2 flex-wrap">
              <span className="truncate">{section.name}</span>
              <Badge variant="stone" size="sm" className="font-mono text-[10px] shrink-0">
                {section.items.length} nodes
              </Badge>
            </Heading>
            <Body size="xs" muted className="truncate">{section.description}</Body>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {editMode && (
            <div className="flex items-center gap-1 border-r border-stone-200 dark:border-stone-800 pr-2 mr-1">
              <IconButton size="sm" onClick={onMoveSectionUp} disabled={sectionIdx === 0} aria-label="Move Section Up">
                <ArrowUp className="w-3.5 h-3.5" />
              </IconButton>
              <IconButton size="sm" onClick={onMoveSectionDown} disabled={sectionIdx === totalSections - 1} aria-label="Move Section Down">
                <ArrowDown className="w-3.5 h-3.5" />
              </IconButton>
            </div>
          )}
          <Button
            variant="secondary"
            size="sm"
            className="py-1 px-2.5 text-[11px]"
            onClick={onPingSectionAll}
            iconLeft={<RefreshCw className="w-3 h-3" />}
          >
            <span className="hidden sm:inline">Diag Group</span>
          </Button>
        </div>
      </div>

      {/* Items */}
      {!isCollapsed && (
        <div>
          {section.items.length === 0 ? (
            <div className="py-6 text-center border border-dashed border-stone-200 dark:border-stone-800 rounded">
              <Body size="xs" muted>This container group is currently empty. Enable Edit Mode to add host addresses.</Body>
            </div>
          ) : (
            <div className={`grid gap-3 ${gridClass[density]}`}>
              {section.items.map((item, itemIdx) => (
                <ServiceCard
                  key={item.id}
                  item={item}
                  itemIdx={itemIdx}
                  totalItems={section.items.length}
                  density={density}
                  sectionId={section.id}
                  editMode={editMode}
                  isPinging={pingingId === item.id}
                  onPing={() => onPingItem(item.id)}
                  onDelete={() => onDeleteItem(item.id, item.name)}
                  onMoveUp={() => onMoveItemUp(itemIdx)}
                  onMoveDown={() => onMoveItemDown(itemIdx)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
