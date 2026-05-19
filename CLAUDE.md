# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # start dev server (Turbopack)
npm run build        # production build
npm run lint         # ESLint via Next.js
npm run type-check   # tsc --noEmit (no test suite exists)
```

Docker:
```bash
docker build -t dashboardgo .
docker compose up -d
```

## Architecture

This is a **Next.js 16 standalone app** (output: `'standalone'`) that acts as a self-hosted service dashboard.

### Directory split

`app/` is thin — only `layout.tsx`, `page.tsx` (which renders `<App />`), and the config API route. All product logic lives under `src/`.

### Data flow

`useDashyConfig` (`src/hooks/useDashyConfig.ts`) is the single source of truth. It:
- Fetches config from `GET /api/config` on mount
- Auto-saves to `PUT /api/config` 800 ms after any mutation (debounced)
- Exposes all mutators (ping, reorder, add, delete) as stable callbacks

The API route (`app/api/config/route.ts`) reads and writes `config/dashy-config.json` on disk. The fallback when the file is missing is `src/data/defaultConfig.ts`. In Docker, `config/` is a named volume so edits survive redeploys.

### Tab structure

Three tabs rendered by `src/App.tsx`:
- **dashboard** — widget summary + density-controlled service grid (`src/tabs/DashboardTab.tsx`)
- **config** — raw JSON editor via CodeMirror (`src/tabs/ConfigTab.tsx`)
- **github** — static deploy docs (`src/tabs/DeployTab.tsx`)

### Service rendering

`ServiceCard` (`src/components/dashboard/ServiceCard.tsx`) renders one of three completely different layouts based on the `density` prop (`compact` | `medium` | `comfortable`). The grid column counts are controlled by `gridClass` in `ServiceSection.tsx`.

### UI primitives

`src/components/ui/` contains the design-system atoms (`Button`, `Card`, `Badge`, `IconButton`, `Heading`, `Body`, etc.). These accept `className` for overrides. Dark mode is **class-based** (`darkMode: 'class'` in Tailwind config) — the `dark` class is toggled on the root `<div>` in `App.tsx`.

### Path alias

`@/` maps to `src/`. TypeScript strict mode is on, including `noUnusedLocals` and `noUnusedParameters`.

### Config schema

`DashyConfig` (defined in `src/types/index.ts`) is the shape for both the on-disk JSON and all runtime state. `dashy-config.example.json` at the repo root is the seed baked into the Docker image.
