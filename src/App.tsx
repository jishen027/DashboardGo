'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toast } from '@/components/layout/Toast';
import { DashboardTab } from '@/tabs/DashboardTab';
import { ConfigTab } from '@/tabs/ConfigTab';
import { DeployTab } from '@/tabs/DeployTab';
import { useToast } from '@/hooks/useToast';
import { useLiveClock } from '@/hooks/useLiveClock';
import { useSimulatedMetrics } from '@/hooks/useSimulatedMetrics';
import { useDashyConfig } from '@/hooks/useDashyConfig';
import type { ActiveTab } from '@/types';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [darkMode, setDarkMode] = useState(false);

  const { toast, showToast } = useToast();
  const currentTime = useLiveClock();
  const { simSpeed, simLatency } = useSimulatedMetrics();

  const {
    config,
    rawJsonText,
    jsonError,
    pingingId,
    syncStatus,
    statusCounts,
    filteredSections,
    pingItem,
    pingSectionAll,
    moveSectionUp,
    moveSectionDown,
    moveItemUp,
    moveItemDown,
    deleteItem,
    handleAddSection,
    handleAddHost,
    handleJsonChange,
    handleDownloadConfig,
  } = useDashyConfig(showToast);

  return (
    <div className={`min-h-screen transition-colors duration-300 bg-[#FBFBF9] dark:bg-[#121211] ${darkMode ? 'dark' : ''}`}>
      <div className="absolute inset-0 bg-grid-pattern opacity-10 dark:opacity-5 pointer-events-none" />

      <Header
        config={config}
        activeTab={activeTab}
        darkMode={darkMode}
        onTabChange={(tab) => {
          setActiveTab(tab);
        }}
        onToggleDark={() => setDarkMode((v) => !v)}
      />

      <main className="max-w-6xl mx-auto px-3 sm:px-6 py-6 sm:py-8 relative space-y-8">
        {toast && <Toast toast={toast} />}

        {activeTab === 'dashboard' && (
          <DashboardTab
            config={config}
            filteredSections={filteredSections}
            statusCounts={statusCounts}
            pingingId={pingingId}
            currentTime={currentTime}
            simSpeed={simSpeed}
            simLatency={simLatency}
            onPingItem={pingItem}
            onPingSectionAll={pingSectionAll}
            onMoveSectionUp={moveSectionUp}
            onMoveSectionDown={moveSectionDown}
            onMoveItemUp={moveItemUp}
            onMoveItemDown={moveItemDown}
            onDeleteItem={deleteItem}
            onAddSection={handleAddSection}
            onAddHost={handleAddHost}
          />
        )}

        {activeTab === 'config' && (
          <ConfigTab
            rawJsonText={rawJsonText}
            jsonError={jsonError}
            syncStatus={syncStatus}
            darkMode={darkMode}
            onJsonChange={handleJsonChange}
            onDownload={handleDownloadConfig}
          />
        )}

        {activeTab === 'github' && <DeployTab />}
      </main>

      <Footer />
    </div>
  );
}
