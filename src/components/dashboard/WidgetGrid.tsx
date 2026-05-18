import { Clock, Globe, Terminal } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { TechLabel } from '@/components/ui/TechLabel';
import { TechValue } from '@/components/ui/TechValue';
import { Badge } from '@/components/ui/Badge';
import type { StatusCounts } from '@/types';

interface WidgetGridProps {
  currentTime: string;
  statusCounts: StatusCounts;
  simSpeed: number;
  simLatency: number;
}

export function WidgetGrid({ currentTime, statusCounts, simSpeed, simLatency }: WidgetGridProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Clock */}
      <Card variant="base" className="flex items-center gap-4 bg-[#F2F2EF]/50 dark:bg-[#1E1E1C]/50 border-stone-200/60 dark:border-stone-800">
        <div className="p-3 rounded-md bg-stone-100 dark:bg-stone-800 text-[#1A1A1A] dark:text-stone-300">
          <Clock className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <TechLabel>Dashboard Clock</TechLabel>
          <TechValue size="2xl">{currentTime || '00:00:00'}</TechValue>
          <p className="text-[10px] text-stone-400 font-mono mt-1">Host Time (GMT / Local)</p>
        </div>
      </Card>

      {/* Health */}
      <Card variant="base" className="flex items-center gap-4 bg-[#F2F2EF]/50 dark:bg-[#1E1E1C]/50 border-stone-200/60 dark:border-stone-800">
        <div className="p-3 rounded-md bg-stone-100 dark:bg-stone-800 text-emerald-600 dark:text-emerald-400">
          <Globe className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <TechLabel>Route Gateway Health</TechLabel>
          <div className="flex items-baseline gap-2">
            <TechValue size="2xl">{statusCounts.online} / {statusCounts.total}</TechValue>
            <span className="text-xs font-mono text-stone-500">Live Routes</span>
          </div>
          <div className="flex gap-2 mt-1">
            <Badge variant="success" size="sm">{statusCounts.online} Active</Badge>
            {statusCounts.offline > 0 && <Badge variant="danger" size="sm">{statusCounts.offline} Dead</Badge>}
            {statusCounts.paused > 0 && <Badge variant="stone" size="sm">{statusCounts.paused} Paused</Badge>}
          </div>
        </div>
      </Card>

      {/* WAN */}
      <Card variant="base" className="flex items-center gap-4 bg-[#F2F2EF]/50 dark:bg-[#1E1E1C]/50 border-stone-200/60 dark:border-stone-800">
        <div className="p-3 rounded-md bg-stone-100 dark:bg-stone-800 text-blue-500">
          <Terminal className="w-6 h-6" />
        </div>
        <div>
          <TechLabel>WAN Connectivity Link</TechLabel>
          <div className="flex items-baseline gap-1.5">
            <TechValue size="xl">{simSpeed} Mbps</TechValue>
            <span className="text-xs text-stone-500 font-mono">Ping: {simLatency}ms</span>
          </div>
          <p className="text-[10px] text-stone-400 font-mono mt-1">Auto-diagnostic stream live</p>
        </div>
      </Card>
    </section>
  );
}
