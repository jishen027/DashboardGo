import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import type { DashyConfig, NewHostForm, StatusCounts, ToastType } from '@/types';
import { DEFAULT_DASHY_CONFIG } from '@/data/defaultConfig';

type ShowToast = (message: string, type?: ToastType) => void;
export type SyncStatus = 'idle' | 'saving' | 'saved' | 'error';

export function useDashyConfig(showToast: ShowToast) {
  const [config, setConfig] = useState<DashyConfig>(DEFAULT_DASHY_CONFIG);
  const [rawJsonText, setRawJsonText] = useState(
    JSON.stringify(DEFAULT_DASHY_CONFIG, null, 2)
  );
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [pingingId, setPingingId] = useState<string | null>(null);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle');

  const hasLoaded = useRef(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // ── Initial load from server ───────────────────────────────────────────────
  useEffect(() => {
    fetch('/api/config')
      .then((r) => {
        if (!r.ok) throw new Error('fetch failed');
        return r.json() as Promise<DashyConfig>;
      })
      .then((data) => {
        setConfig(data);
        setRawJsonText(JSON.stringify(data, null, 2));
        hasLoaded.current = true;
      })
      .catch(() => {
        hasLoaded.current = true;
      });
  }, []);

  // ── Auto-save whenever config changes (after initial load) ────────────────
  useEffect(() => {
    if (!hasLoaded.current) return;
    clearTimeout(saveTimer.current);
    setSyncStatus('saving');
    saveTimer.current = setTimeout(() => {
      fetch('/api/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      })
        .then((r) => {
          setSyncStatus(r.ok ? 'saved' : 'error');
        })
        .catch(() => setSyncStatus('error'));
    }, 800);
  }, [config]);

  const syncConfig = useCallback((next: DashyConfig) => {
    setConfig(next);
    setRawJsonText(JSON.stringify(next, null, 2));
  }, []);

  // ── Status aggregation ─────────────────────────────────────────────────────
  const statusCounts = useMemo<StatusCounts>(() => {
    let online = 0, offline = 0, paused = 0, total = 0;
    config.sections.forEach((sec) => {
      sec.items.forEach((item) => {
        total++;
        if (item.status === 'correct' || item.status === 'completed') online++;
        else if (item.status === 'skipped') paused++;
        else offline++;
      });
    });
    return { online, offline, paused, total };
  }, [config.sections]);

  const filteredSections = config.sections;

  // ── Ping ───────────────────────────────────────────────────────────────────
  const pingItem = useCallback(
    (sectionId: string, itemId: string) => {
      setPingingId(itemId);
      setTimeout(() => {
        setConfig((prev) => {
          const next: DashyConfig = {
            ...prev,
            sections: prev.sections.map((sec) => {
              if (sec.id !== sectionId) return sec;
              return {
                ...sec,
                items: sec.items.map((item) => {
                  if (item.id !== itemId) return item;
                  const isOnline = Math.random() > 0.12;
                  return {
                    ...item,
                    status: isOnline ? 'correct' : 'wrong',
                    latency: isOnline
                      ? `${Math.floor(Math.random() * 25) + 3}ms`
                      : '—',
                  };
                }),
              };
            }),
          };
          setRawJsonText(JSON.stringify(next, null, 2));
          return next;
        });
        setPingingId(null);
        showToast('Node address routing check finished.', 'success');
      }, 1000);
    },
    [showToast]
  );

  const pingSectionAll = useCallback(
    (sectionId: string) => {
      showToast('Diagnosing all hosts in category group...', 'stone');
      const target = config.sections.find((s) => s.id === sectionId);
      target?.items.forEach((item) => pingItem(sectionId, item.id));
    },
    [config.sections, pingItem, showToast]
  );

  // ── Section reorder ────────────────────────────────────────────────────────
  const moveSectionUp = useCallback(
    (idx: number) => {
      if (idx === 0) return;
      const next = [...config.sections];
      [next[idx], next[idx - 1]] = [next[idx - 1], next[idx]];
      syncConfig({ ...config, sections: next });
      showToast('Section layout order changed.', 'stone');
    },
    [config, syncConfig, showToast]
  );

  const moveSectionDown = useCallback(
    (idx: number) => {
      if (idx === config.sections.length - 1) return;
      const next = [...config.sections];
      [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
      syncConfig({ ...config, sections: next });
      showToast('Section layout order changed.', 'stone');
    },
    [config, syncConfig, showToast]
  );

  // ── Item reorder ───────────────────────────────────────────────────────────
  const moveItemUp = useCallback(
    (sectionId: string, itemIdx: number) => {
      if (itemIdx === 0) return;
      syncConfig({
        ...config,
        sections: config.sections.map((sec) => {
          if (sec.id !== sectionId) return sec;
          const items = [...sec.items];
          [items[itemIdx], items[itemIdx - 1]] = [items[itemIdx - 1], items[itemIdx]];
          return { ...sec, items };
        }),
      });
    },
    [config, syncConfig]
  );

  const moveItemDown = useCallback(
    (sectionId: string, itemIdx: number, total: number) => {
      if (itemIdx === total - 1) return;
      syncConfig({
        ...config,
        sections: config.sections.map((sec) => {
          if (sec.id !== sectionId) return sec;
          const items = [...sec.items];
          [items[itemIdx], items[itemIdx + 1]] = [items[itemIdx + 1], items[itemIdx]];
          return { ...sec, items };
        }),
      });
    },
    [config, syncConfig]
  );

  // ── Delete item ────────────────────────────────────────────────────────────
  const deleteItem = useCallback(
    (sectionId: string, itemId: string, itemName: string) => {
      syncConfig({
        ...config,
        sections: config.sections.map((sec) => {
          if (sec.id !== sectionId) return sec;
          return { ...sec, items: sec.items.filter((it) => it.id !== itemId) };
        }),
      });
      showToast(`Removed "${itemName}" successfully.`, 'warning');
    },
    [config, syncConfig, showToast]
  );

  // ── Add section ────────────────────────────────────────────────────────────
  const handleAddSection = useCallback(
    (title: string) => {
      if (!title) return;
      const secId = title.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (config.sections.some((s) => s.id === secId)) {
        showToast('Group section id already exists.', 'danger');
        return;
      }
      syncConfig({
        ...config,
        sections: [
          ...config.sections,
          { id: secId, name: title, description: 'Custom user service group', isOpen: true, items: [] },
        ],
      });
      showToast(`Category "${title}" registered!`, 'success');
    },
    [config, syncConfig, showToast]
  );

  // ── Add host ───────────────────────────────────────────────────────────────
  const handleAddHost = useCallback(
    (form: NewHostForm) => {
      if (!form.name || !form.url) {
        showToast('Host target name and Redirect URL are required.', 'danger');
        return;
      }
      const prepared = {
        id: form.name.toLowerCase().replace(/[^a-z0-9]/g, ''),
        name: form.name,
        url: form.url,
        icon: form.icon || '🔗',
        description: form.description || 'Custom provisioned host.',
        port: Number(form.port) || 80,
        status: 'correct' as const,
        latency: '3ms',
        tags: form.tags ? form.tags.split(',').map((t) => t.trim()) : [],
      };
      syncConfig({
        ...config,
        sections: config.sections.map((sec) => {
          if (sec.id !== form.sectionId) return sec;
          return { ...sec, items: [...sec.items, prepared] };
        }),
      });
      showToast(`Provisioned route: ${prepared.name}`, 'success');
    },
    [config, syncConfig, showToast]
  );

  // ── JSON editor ────────────────────────────────────────────────────────────
  const handleJsonChange = useCallback((value: string) => {
    setRawJsonText(value);
    try {
      const parsed = JSON.parse(value) as DashyConfig;
      if (!parsed.sections || !Array.isArray(parsed.sections)) {
        throw new Error("Missing array configuration: 'sections'");
      }
      setConfig(parsed);
      setJsonError(null);
    } catch (err) {
      setJsonError((err as Error).message);
    }
  }, []);

  // ── Download ───────────────────────────────────────────────────────────────
  const handleDownloadConfig = useCallback(() => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(config, null, 2));
    const a = document.createElement('a');
    a.setAttribute('href', dataStr);
    a.setAttribute('download', 'dashy-config.json');
    document.body.appendChild(a);
    a.click();
    a.remove();
    showToast('Downloaded dashy-config.json bundle file.', 'success');
  }, [config, showToast]);

  return {
    config,
    rawJsonText,
    jsonError,
    pingingId,
    syncStatus,
    statusCounts,
    filteredSections,
    syncConfig,
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
  };
}
