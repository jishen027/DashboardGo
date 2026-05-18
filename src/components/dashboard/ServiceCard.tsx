import { RefreshCw, ExternalLink, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Heading } from '@/components/ui/Heading';
import { Body } from '@/components/ui/Body';
import { Code } from '@/components/ui/Code';
import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import type { ServiceItem, LayoutDensity } from '@/types';

interface ServiceCardProps {
  item: ServiceItem;
  itemIdx: number;
  totalItems: number;
  density: LayoutDensity;
  sectionId: string;
  editMode: boolean;
  isPinging: boolean;
  onPing: () => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

function stop(e: React.MouseEvent, fn: () => void) {
  e.preventDefault();
  e.stopPropagation();
  fn();
}

export function ServiceCard({
  item, itemIdx, totalItems, density, editMode, isPinging,
  onPing, onDelete, onMoveUp, onMoveDown,
}: ServiceCardProps) {
  if (density === 'compact') {
    return (
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between p-3 rounded border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1C1C1A] hover:bg-stone-50 dark:hover:bg-stone-800/50 hover:border-blue-300 dark:hover:border-blue-700 group transition-all cursor-pointer"
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-sm">{item.icon}</span>
          <span className="text-xs font-semibold text-stone-800 dark:text-stone-200 group-hover:text-blue-500 truncate">
            {item.name}
          </span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className={`w-1.5 h-1.5 rounded-full ${item.status === 'correct' ? 'bg-emerald-500' : 'bg-red-500'}`} />
          {editMode ? (
            <button onClick={(e) => stop(e, onDelete)} className="text-red-500 hover:text-red-700 p-0.5">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button onClick={(e) => stop(e, onPing)} disabled={isPinging} className="text-stone-400 hover:text-[#1A1A1A] dark:hover:text-stone-100">
              <RefreshCw className={`w-3 h-3 ${isPinging ? 'animate-spin' : ''}`} />
            </button>
          )}
        </div>
      </a>
    );
  }

  if (density === 'medium') {
    return (
      <a href={item.url} target="_blank" rel="noopener noreferrer" className="block group">
        <Card variant="base" className="flex flex-col justify-between hover:shadow-hover hover:border-blue-300 dark:hover:border-blue-700 p-4 transition-all cursor-pointer">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-xl shrink-0">{item.icon}</span>
              <div className="min-w-0">
                <span className="text-sm font-bold text-stone-900 dark:text-stone-100 group-hover:text-blue-500 truncate block">
                  {item.name}
                </span>
                <span className="text-[10px] font-mono text-stone-400">PORT: {item.port}</span>
              </div>
            </div>
            <span
              className={`w-2 h-2 rounded-full shrink-0 mt-1.5 ${item.status === 'correct' ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}
              title={item.status === 'correct' ? 'Online' : 'Connection Issue'}
            />
          </div>
          <div className="flex items-center justify-between mt-3 pt-2 border-t border-stone-100 dark:border-stone-800">
            <span className="text-[10px] font-mono text-stone-400">Ping: {item.latency}</span>
            <div className="flex items-center gap-2">
              {editMode && (
                <div className="flex items-center gap-0.5 mr-2">
                  <IconButton size="sm" onClick={(e) => stop(e, onMoveUp)} disabled={itemIdx === 0} aria-label="Move item up">
                    <ArrowUp className="w-3 h-3" />
                  </IconButton>
                  <IconButton size="sm" onClick={(e) => stop(e, onMoveDown)} disabled={itemIdx === totalItems - 1} aria-label="Move item down">
                    <ArrowDown className="w-3 h-3" />
                  </IconButton>
                </div>
              )}
              {editMode ? (
                <Button variant="ghost" className="text-red-600 p-1" size="sm" onClick={(e) => stop(e, onDelete)}>Delete</Button>
              ) : (
                <IconButton size="sm" onClick={(e) => stop(e, onPing)} disabled={isPinging} aria-label="Ping">
                  <RefreshCw className={`w-3.5 h-3.5 ${isPinging ? 'animate-spin' : ''}`} />
                </IconButton>
              )}
              <span className="p-1 rounded text-stone-400 group-hover:text-blue-500">
                <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </Card>
      </a>
    );
  }

  // comfortable
  return (
    <a href={item.url} target="_blank" rel="noopener noreferrer" className="block group">
      <Card variant="base" className="flex flex-col justify-between hover:shadow-hover hover:border-blue-300 dark:hover:border-blue-700 p-5 border-l-4 border-l-blue-500 cursor-pointer transition-all">
        <div>
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl p-2 bg-stone-50 dark:bg-stone-900 rounded border border-stone-200 dark:border-stone-800">
                {item.icon}
              </span>
              <div>
                <Heading level={3} className="text-base group-hover:text-blue-500 transition-colors">{item.name}</Heading>
                <Code className="text-[10px] text-stone-500">Port {item.port} • latency: {item.latency}</Code>
              </div>
            </div>
            <StatusBadge status={item.status} />
          </div>
          <Body size="xs" muted className="line-clamp-2 min-h-[2.5rem] mb-4">{item.description}</Body>
          <div className="flex flex-wrap gap-1 mb-4">
            {item.tags.map((t) => (
              <Badge key={t} variant="stone" size="sm" className="text-[9px] font-mono lowercase">#{t}</Badge>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-stone-100 dark:border-stone-800">
          <Button
            variant="secondary"
            size="sm"
            className="py-1 text-xs"
            onClick={(e) => stop(e, onPing)}
            disabled={isPinging}
            iconLeft={<RefreshCw className={`w-3 h-3 ${isPinging ? 'animate-spin' : ''}`} />}
          >
            Check Status
          </Button>
          <div className="flex items-center gap-2">
            {editMode && (
              <Button variant="danger" size="sm" className="py-1 px-2.5 text-xs" onClick={(e) => stop(e, onDelete)}>Delete</Button>
            )}
            <span className="p-2 border rounded border-stone-200 dark:border-stone-800 text-stone-400 group-hover:text-blue-500 bg-white dark:bg-[#1C1C1A]">
              <ExternalLink className="w-4 h-4" />
            </span>
          </div>
        </div>
      </Card>
    </a>
  );
}
