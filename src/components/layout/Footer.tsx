export function Footer() {
  return (
    <footer className="mt-20 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/20 py-8 transition-colors">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="space-y-1">
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1A1A1A] dark:text-stone-300">
              Hiiragi UI Engine — Dashy Style Portal
            </span>
          </div>
          <p className="text-xs text-stone-400">
            Interactive navigation console for self-hosted network platforms.
          </p>
        </div>
        <div className="text-xs text-stone-500 font-mono">
          Neutral Scale: Stone • Layout Mode: Custom Collapsible Sections
        </div>
      </div>
    </footer>
  );
}
