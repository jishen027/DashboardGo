import { Layout, Sliders, Settings, Github, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import { Heading } from '@/components/ui/Heading';
import { Code } from '@/components/ui/Code';
import type { ActiveTab, DashyConfig } from '@/types';

interface HeaderProps {
  config: DashyConfig;
  activeTab: ActiveTab;
  darkMode: boolean;
  onTabChange: (tab: ActiveTab) => void;
  onToggleDark: () => void;
}

export function Header({ config, activeTab, darkMode, onTabChange, onToggleDark }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-[#FBFBF9]/80 dark:bg-[#121211]/80 backdrop-blur border-b border-[#E5E7EB] dark:border-stone-800 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="bg-[#1A1A1A] text-white dark:bg-stone-100 dark:text-[#1A1A1A] p-1.5 sm:p-2 rounded shrink-0">
              <Layout className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <Heading level={2} className="text-base sm:text-xl md:text-2xl truncate">{config.serverName}</Heading>
              <div className="hidden sm:flex items-center gap-2">
                <Code className="text-stone-500 dark:text-stone-400 font-mono text-xs">{config.serverIp}</Code>
                <span className="text-xs text-stone-400">•</span>
                <span className="text-xs text-stone-500 dark:text-stone-400 font-mono">Uptime: {config.uptime}</span>
              </div>
            </div>
          </div>

          {/* Desktop nav + theme toggle */}
          <div className="hidden md:flex items-center gap-2">
            <IconButton onClick={onToggleDark} aria-label="Toggle Theme Mode">
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-stone-600" />}
            </IconButton>
            <Button variant={activeTab === 'dashboard' ? 'primary' : 'ghost'} size="sm" onClick={() => onTabChange('dashboard')} iconLeft={<Sliders className="w-4 h-4" />}>Dashboard</Button>
            <Button variant={activeTab === 'config' ? 'primary' : 'ghost'} size="sm" onClick={() => onTabChange('config')} iconLeft={<Settings className="w-4 h-4" />}>Raw Config</Button>
            <Button variant={activeTab === 'github' ? 'primary' : 'ghost'} size="sm" onClick={() => onTabChange('github')} iconLeft={<Github className="w-4 h-4" />}>Deploy Docs</Button>
          </div>

          {/* Mobile theme toggle */}
          <IconButton onClick={onToggleDark} aria-label="Toggle Theme Mode" className="md:hidden">
            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-stone-600" />}
          </IconButton>
        </div>

        {/* Mobile nav row */}
        <nav className="flex items-center gap-1 mt-2 md:hidden">
          <Button variant={activeTab === 'dashboard' ? 'primary' : 'ghost'} size="sm" className="flex-1 justify-center" onClick={() => onTabChange('dashboard')} iconLeft={<Sliders className="w-4 h-4" />}>Dashboard</Button>
          <Button variant={activeTab === 'config' ? 'primary' : 'ghost'} size="sm" className="flex-1 justify-center" onClick={() => onTabChange('config')} iconLeft={<Settings className="w-4 h-4" />}>Config</Button>
          <Button variant={activeTab === 'github' ? 'primary' : 'ghost'} size="sm" className="flex-1 justify-center" onClick={() => onTabChange('github')} iconLeft={<Github className="w-4 h-4" />}>Deploy</Button>
        </nav>
      </div>
    </header>
  );
}
