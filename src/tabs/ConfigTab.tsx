import { useCallback } from 'react';
import type { SyncStatus } from '@/hooks/useDashyConfig';
import dynamic from 'next/dynamic';
import { json } from '@codemirror/lang-json';
import { vscodeDark, vscodeLight } from '@uiw/codemirror-theme-vscode';

const CodeMirror = dynamic(() => import('@uiw/react-codemirror'), {
  ssr: false,
  loading: () => (
    <div className="h-[550px] bg-stone-50 dark:bg-stone-900 animate-pulse rounded" />
  ),
});
import { Download } from 'lucide-react';
import { Heading } from '@/components/ui/Heading';
import { Body } from '@/components/ui/Body';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Code } from '@/components/ui/Code';
import { Button } from '@/components/ui/Button';
import { TechLabel } from '@/components/ui/TechLabel';

interface ConfigTabProps {
  rawJsonText: string;
  jsonError: string | null;
  syncStatus: SyncStatus;
  darkMode: boolean;
  onJsonChange: (value: string) => void;
  onDownload: () => void;
}

export function ConfigTab({ rawJsonText, jsonError, syncStatus, darkMode, onJsonChange, onDownload }: ConfigTabProps) {
  const handleChange = useCallback((value: string) => onJsonChange(value), [onJsonChange]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Heading level={2}>Dashy Style Config Workspace</Heading>
          <Body size="sm" muted>Modify raw configuration mappings. Changes are immediately updated locally.</Body>
        </div>
        <Button variant="secondary" size="sm" onClick={onDownload} iconLeft={<Download className="w-4 h-4" />}>
          Export dashy-config.json
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Editor */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <TechLabel>schema parameters payload</TechLabel>
            {jsonError ? (
              <Badge variant="danger" dot>Malformed JSON</Badge>
            ) : syncStatus === 'saving' ? (
              <Badge variant="stone" dot>Syncing to server…</Badge>
            ) : syncStatus === 'error' ? (
              <Badge variant="warning" dot>Sync failed</Badge>
            ) : (
              <Badge variant="success" dot>Synchronized</Badge>
            )}
          </div>

          <div className={`rounded border shadow-card overflow-hidden ${jsonError ? 'border-red-400 dark:border-red-700' : 'border-stone-200 dark:border-stone-800'}`}>
            <CodeMirror
              value={rawJsonText}
              height="550px"
              theme={darkMode ? vscodeDark : vscodeLight}
              extensions={[json()]}
              onChange={handleChange}
              basicSetup={{
                lineNumbers: true,
                foldGutter: true,
                bracketMatching: true,
                autocompletion: true,
                indentOnInput: true,
                highlightActiveLine: true,
                highlightSelectionMatches: true,
              }}
              style={{ fontSize: '12px' }}
            />
          </div>

          {jsonError && (
            <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded">
              <Heading level={4} className="text-red-700 dark:text-red-400 mb-1">Configuration validation failed</Heading>
              <p className="font-mono text-xs text-red-600 dark:text-red-400">{jsonError}</p>
            </div>
          )}
        </div>

        {/* Sidebar guide */}
        <div className="space-y-4">
          <Heading level={3}>How to Customise</Heading>
          <Card variant="base">
            <div className="space-y-4 text-xs leading-relaxed text-stone-600 dark:text-stone-400">
              <div>
                <Heading level={4}>1. Structure Hierarchy</Heading>
                <p className="mt-1">Configure sections array block. Each section requires a unique <Code>id</Code>, <Code>name</Code>, and a children list called <Code>items</Code>.</p>
              </div>
              <div>
                <Heading level={4}>2. Custom Redirection Links</Heading>
                <p className="mt-1">Ensure every service contains valid HTTP strings inside the <Code>url</Code> property, matching port forwarding specifications of your server.</p>
              </div>
              <div>
                <Heading level={4}>3. Theme & Density</Heading>
                <p className="mt-1">Specify <Code>layoutDensity: "compact" | "medium" | "comfortable"</Code> to control the starting layout.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
