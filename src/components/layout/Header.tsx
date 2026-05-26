import { Layout, Sliders, Settings, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import { Heading } from '@/components/ui/Heading';
import { Code } from '@/components/ui/Code';
import { UserMenu } from '@/components/layout/UserMenu';
import type { ActiveTab, DashyConfig, UserInfo } from '@/types';

interface HeaderProps {
  config: DashyConfig;
  activeTab: ActiveTab;
  darkMode: boolean;
  user: UserInfo;
  onTabChange: (tab: ActiveTab) => void;
  onToggleDark: () => void;
}

export function Header({ config, activeTab, darkMode, user, onTabChange, onToggleDark }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-[#FBFBF9]/80 dark:bg-[#121211]/80 backdrop-blur border-b border-[#E5E7EB] dark:border-stone-800 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-2">
          {/* Brand */}
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

          {/* Desktop: nav + theme + user */}
          <div className="hidden md:flex items-center gap-2">
            <IconButton onClick={onToggleDark} aria-label="Toggle Theme Mode">
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-stone-600" />}
            </IconButton>
            <Button variant={activeTab === 'dashboard' ? 'primary' : 'ghost'} size="sm" onClick={() => onTabChange('dashboard')} iconLeft={<Sliders className="w-4 h-4" />}>Dashboard</Button>
            <Button variant={activeTab === 'config' ? 'primary' : 'ghost'} size="sm" onClick={() => onTabChange('config')} iconLeft={<Settings className="w-4 h-4" />}>Raw Config</Button>
            <div className="ml-1">
              <UserMenu user={user} />
            </div>
          </div>

          {/* Mobile: theme toggle + user avatar */}
          <div className="flex md:hidden items-center gap-2">
            <IconButton onClick={onToggleDark} aria-label="Toggle Theme Mode">
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-stone-600" />}
            </IconButton>
            <UserMenu user={user} />
          </div>
        </div>

        {/* Mobile nav row */}
        <nav className="flex items-center gap-1 mt-2 md:hidden">
          <Button variant={activeTab === 'dashboard' ? 'primary' : 'ghost'} size="sm" className="flex-1 justify-center" onClick={() => onTabChange('dashboard')} iconLeft={<Sliders className="w-4 h-4" />}>Dashboard</Button>
          <Button variant={activeTab === 'config' ? 'primary' : 'ghost'} size="sm" className="flex-1 justify-center" onClick={() => onTabChange('config')} iconLeft={<Settings className="w-4 h-4" />}>Config</Button>
        </nav>
      </div>
    </header>
  );
}
