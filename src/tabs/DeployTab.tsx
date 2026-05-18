import { Heading } from '@/components/ui/Heading';
import { Body } from '@/components/ui/Body';
import { Card } from '@/components/ui/Card';
import { Code } from '@/components/ui/Code';

export function DeployTab() {
  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      <div>
        <Heading level={2}>Production Pipeline Setup & Hosting</Heading>
        <Body size="sm" muted>Deploy your static lab dashboard via GitHub Actions securely.</Body>
      </div>

      <Card variant="base" className="space-y-4">
        <Heading level={3}>1. Local Directory Configuration Blueprint</Heading>
        <p className="text-sm text-stone-600 dark:text-stone-300">
          Put your configuration JSON directly into the production code distribution assets folder so the client application resolves correct routes on mount:
        </p>
        <div className="bg-stone-50 dark:bg-stone-900/60 p-4 rounded border font-mono text-xs text-stone-700 dark:text-stone-300 space-y-1">
          <div>my-dashy-lab/</div>
          <div>├── .github/workflows/</div>
          <div>│   └── <span className="text-emerald-500 font-bold">deploy.yml</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Actions Pipeline YAML script</div>
          <div>├── public/</div>
          <div>│   └── <span className="text-blue-500 font-semibold">config.json</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# The config.json you export from here</div>
          <div>├── src/</div>
          <div>│   └── App.tsx</div>
          <div>└── package.json</div>
        </div>
      </Card>

      <Card variant="base" className="space-y-3">
        <Heading level={3}>2. GitHub Action Build Script</Heading>
        <p className="text-sm text-stone-600 dark:text-stone-300">
          Configure your repository file path <Code>.github/workflows/deploy.yml</Code> with this workflow to trigger compilation on branch update pushes:
        </p>
        <pre className="p-4 bg-stone-950 text-stone-300 rounded font-mono text-xs overflow-x-auto">
{`name: Deploy Lab Dashboard Portal
on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install & Compile
        run: |
          npm ci
          npm run build

      - name: Configure Web Pages Environment
        uses: actions/configure-pages@v4

      - name: Upload dist files
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Publish to Pages
        uses: actions/deploy-pages@v4`}
        </pre>
      </Card>
    </div>
  );
}
