import { useState } from 'react';
import { Search } from 'lucide-react';
import { WidgetGrid } from '@/components/dashboard/WidgetGrid';
import { DensityControls } from '@/components/dashboard/DensityControls';
import { EditModeForms } from '@/components/dashboard/EditModeForms';
import { ServiceSection } from '@/components/dashboard/ServiceSection';
import { Heading } from '@/components/ui/Heading';
import { Body } from '@/components/ui/Body';
import type { DashyConfig, LayoutDensity, NewHostForm, StatusCounts } from '@/types';

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

export function DashboardTab({
  config, filteredSections, statusCounts, pingingId,
  currentTime, simSpeed, simLatency,
  onPingItem, onPingSectionAll, onMoveSectionUp, onMoveSectionDown,
  onMoveItemUp, onMoveItemDown, onDeleteItem, onAddSection, onAddHost,
}: DashboardTabProps) {
  const [density, setDensity] = useState<LayoutDensity>(config.layoutDensity);
  const [editMode, setEditMode] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

  const toggleCollapse = (id: string) =>
    setCollapsedSections((prev) => ({ ...prev, [id]: !prev[id] }));

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

      {editMode && (
        <EditModeForms
          sections={config.sections}
          onAddSection={onAddSection}
          onAddHost={onAddHost}
        />
      )}

      <div className="space-y-6">
        {filteredSections.map((section, secIdx) => (
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

        {filteredSections.length === 0 && (
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
