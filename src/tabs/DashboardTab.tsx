import { useState, useMemo, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { WidgetGrid } from '@/components/dashboard/WidgetGrid';
import { DensityControls } from '@/components/dashboard/DensityControls';
import { EditModeForms } from '@/components/dashboard/EditModeForms';
import { ServiceSection } from '@/components/dashboard/ServiceSection';
import { FilterBar } from '@/components/dashboard/FilterBar';
import { Heading } from '@/components/ui/Heading';
import { Body } from '@/components/ui/Body';
import type { DashyConfig, LayoutDensity, NewHostForm, StatusCounts, ServiceItem } from '@/types';
import type { StatusFilter } from '@/components/dashboard/FilterBar';

interface DashboardTabProps {
  config: DashyConfig;
  filteredSections: DashyConfig['sections'];
  statusCounts: StatusCounts;
  pingingId: string | null;
  currentTime: string;
  simSpeed: number;
  simLatency: number;
  onPingItem: (sectionId: string, itemId: string) => void;
  onPingSectionAll: (sectionId: string) => void;
  onMoveSectionUp: (idx: number) => void;
  onMoveSectionDown: (idx: number) => void;
  onMoveItemUp: (sectionId: string, itemIdx: number) => void;
  onMoveItemDown: (sectionId: string, itemIdx: number, total: number) => void;
  onDeleteItem: (sectionId: string, itemId: string, itemName: string) => void;
  onAddSection: (title: string) => void;
  onAddHost: (form: NewHostForm) => void;
}

function matchesStatus(item: ServiceItem, statusFilter: StatusFilter): boolean {
  if (statusFilter === 'all') return true;
  if (statusFilter === 'online') return item.status === 'correct' || item.status === 'completed';
  if (statusFilter === 'paused') return item.status === 'skipped';
  return item.status !== 'correct' && item.status !== 'completed' && item.status !== 'skipped';
}

function matchesSearch(item: ServiceItem, query: string): boolean {
  if (!query) return true;
  const q = query.toLowerCase();
  return (
    item.name.toLowerCase().includes(q) ||
    item.description.toLowerCase().includes(q) ||
    item.url.toLowerCase().includes(q) ||
    item.tags.some((t) => t.toLowerCase().includes(q))
  );
}

export function DashboardTab({
  config, filteredSections, statusCounts, pingingId,
  currentTime, simSpeed, simLatency,
  onPingItem, onPingSectionAll, onMoveSectionUp, onMoveSectionDown,
  onMoveItemUp, onMoveItemDown, onDeleteItem, onAddSection, onAddHost,
}: DashboardTabProps) {
  const [density, setDensity] = useState<LayoutDensity>(config.layoutDensity);
  const [editMode, setEditMode] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.select();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleCollapse = (id: string) =>
    setCollapsedSections((prev) => ({ ...prev, [id]: !prev[id] }));

  const displayedSections = useMemo(() => {
    return filteredSections
      .map((sec) => ({
        ...sec,
        items: sec.items.filter(
          (item) => matchesStatus(item, statusFilter) && matchesSearch(item, searchQuery)
        ),
      }))
      .filter((sec) => sec.items.length > 0);
  }, [filteredSections, searchQuery, statusFilter]);

  const totalNodes = filteredSections.reduce((sum, s) => sum + s.items.length, 0);
  const totalVisible = displayedSections.reduce((sum, s) => sum + s.items.length, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <WidgetGrid
        currentTime={currentTime}
        statusCounts={statusCounts}
        simSpeed={simSpeed}
        simLatency={simLatency}
      />

      <DensityControls
        density={density}
        editMode={editMode}
        onDensityChange={setDensity}
        onToggleEditMode={() => setEditMode((v) => !v)}
      />

      <FilterBar
        searchQuery={searchQuery}
        statusFilter={statusFilter}
        totalVisible={totalVisible}
        totalNodes={totalNodes}
        onSearchChange={setSearchQuery}
        onStatusChange={setStatusFilter}
        inputRef={searchInputRef}
      />

      {editMode && (
        <EditModeForms
          sections={config.sections}
          onAddSection={onAddSection}
          onAddHost={onAddHost}
        />
      )}

      <div className="space-y-6">
        {displayedSections.map((section, secIdx) => (
          <ServiceSection
            key={section.id}
            section={section}
            sectionIdx={secIdx}
            totalSections={config.sections.length}
            isCollapsed={!!collapsedSections[section.id]}
            editMode={editMode}
            density={density}
            pingingId={pingingId}
            onToggleCollapse={() => toggleCollapse(section.id)}
            onMoveSectionUp={() => onMoveSectionUp(secIdx)}
            onMoveSectionDown={() => onMoveSectionDown(secIdx)}
            onPingSectionAll={() => onPingSectionAll(section.id)}
            onPingItem={(itemId) => onPingItem(section.id, itemId)}
            onDeleteItem={(itemId, itemName) => onDeleteItem(section.id, itemId, itemName)}
            onMoveItemUp={(itemIdx) => onMoveItemUp(section.id, itemIdx)}
            onMoveItemDown={(itemIdx) => onMoveItemDown(section.id, itemIdx, section.items.length)}
          />
        ))}

        {displayedSections.length === 0 && (
          <div className="text-center py-16 bg-stone-50 dark:bg-stone-900/40 border border-dashed rounded-lg border-stone-200 dark:border-stone-800">
            <Search className="w-8 h-8 mx-auto text-stone-400 mb-2" />
            <Heading level={3}>No Matching Nodes</Heading>
            <Body size="sm" muted>We couldn't find any configured services matching your search.</Body>
          </div>
        )}
      </div>
    </div>
  );
}
