# DashboardGo

A self-hosted home lab dashboard for navigating internal network services. Built with Next.js and deployable as a single Docker container.

## Features

- **Service grid** — organise links into collapsible sections with emoji icons, port numbers, latency, tags, and live status indicators
- **Three density modes** — Compact (icon + name row), Medium (card with port), Comfortable (full card with description and tags)
- **Edit mode** — add/remove services and sections, reorder them via arrow controls, all persisted instantly to disk
- **Raw config editor** — built-in JSON editor (CodeMirror) with syntax highlighting and auto-save
- **Dark mode** — class-based toggle, no flash on load
- **Connectivity ping** — simulated per-service and per-section diagnostics that update status and latency in real time
- **Status overview** — header widgets showing live clock, online/offline route counts, and simulated WAN metrics

## Getting Started

### Local development

```bash
npm install
npm run dev        # http://localhost:3000
```

On first run the app reads `config/dashy-config.json`. If that file is missing it falls back to the built-in defaults.

### Docker (recommended for production)

```bash
# Build the image
docker build -t dashboardgo .

# Run with a named volume so edits survive restarts
docker compose up -d
```

The compose file mounts a named volume at `/app/config`. Docker seeds it from the image's `dashy-config.example.json` on first creation; all subsequent config saves go there.

## Configuration

All settings live in a single JSON file. When running locally, place it at `config/dashy-config.json` (create the `config/` directory if it doesn't exist). In Docker the volume handles this automatically.

Use the in-app **Raw Config** tab to edit and download the file, or edit it directly on disk and restart the container.

### Schema

```jsonc
{
  "serverName": "My Home Lab",       // displayed in the header
  "serverIp": "192.168.1.100",       // displayed below the server name
  "uptime": "12d 4h",                // freeform uptime string
  "layoutDensity": "medium",         // "compact" | "medium" | "comfortable"
  "sections": [
    {
      "id": "media",                 // unique slug, no spaces
      "name": "Media & Streaming",
      "description": "Short label shown under the section heading",
      "isOpen": true,
      "items": [
        {
          "id": "jellyfin",
          "name": "Jellyfin Home",
          "url": "http://192.168.1.100:8096",
          "icon": "🍿",              // emoji used as the service icon
          "description": "FOSS streaming stack.",
          "port": 8096,
          "status": "correct",       // "correct" | "wrong" | "skipped" | …
          "latency": "25ms",
          "tags": ["internal", "foss"]
        }
      ]
    }
  ]
}
```

`dashy-config.example.json` at the repo root contains a fully populated example with Media, Network, Automation, and Infrastructure sections.

## Deployment

A GitHub Actions workflow (`.github/workflows/deploy.yml`) runs on every push to `main` against a **self-hosted runner** on your home server. It:

1. Checks out the repo
2. Builds the Docker image via Buildx (layer cache persisted between runs in `/tmp/.buildx-cache`)
3. Brings the old container down and starts the new one with `docker compose`
4. Prunes dangling images

To use it, register a self-hosted runner on the machine running your stack and push to `main`.

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, standalone output) |
| Styling | Tailwind CSS v3 (class-based dark mode) |
| Config editor | CodeMirror 6 via `@uiw/react-codemirror` |
| Icons | Lucide React |
| Language | TypeScript (strict) |
| Container | Node 20 Alpine, multi-stage build |
