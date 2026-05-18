# Hiiragi Design System — AI Agent Design Reference

This document is the authoritative reference for AI agents building UI in any project that consumes the Hiiragi Design System. Read it before writing any component, layout, or Tailwind class. Every decision in here is a constraint, not a suggestion.

---

## System Identity

**Aesthetic:** Tech Minimalist — warm off-white surfaces, near-black text, blue accents, monospace labeling.  
**Neutral scale:** `stone` exclusively. Never use `gray-*` or `zinc-*`.  
**Primary font:** Inter (sans). Monospace: `ui-monospace / SF Mono / Menlo`.  
**Dark mode:** Supported via `darkMode: "class"`. Always add `dark:` variants to new components.

---

## Setup Checklist (consuming project)

```ts
// tailwind.config.ts
import hiiragiPreset from './HiirSystemDesign/foundations/tailwind-preset'
export default {
  presets: [hiiragiPreset],
  content: ['./src/**/*.{ts,tsx}'],
}
```

```ts
// All imports from the root barrel
import { Button, Badge, TextInput, Card, CardBody, ProgressBar, Heading, Body } from '@/HiirSystemDesign'
```

Never import directly from atom files — always use the root `index.ts` barrel.

---

## Color Tokens

Use token class names, never hardcode hex values.

| Token class | Hex | Use for |
|---|---|---|
| `bg-brand-primary` / `text-brand-primary` | `#1A1A1A` | Body text, headings, primary button fill, active nav |
| `text-brand-accent` / `bg-brand-accent` | `#3B82F6` | Focus rings, links, active badge fill, interactive CTAs |
| `bg-surface-bg` | `#FBFBF9` | Page background — never `bg-white` for the page root |
| `bg-surface-base` | `#FFFFFF` | Cards, inputs, modals, popovers |
| `bg-semantic-success` / `text-semantic-success` | `#10B981` | Correct, passing (≥ 72%), completed |
| `bg-semantic-warning` / `text-semantic-warning` | `#D97706` | Caution (50–71%), expiring, near-threshold |
| `bg-semantic-danger` / `text-semantic-danger` | `#DC2626` | Wrong, failing (< 50%), errors, destructive |
| `text-text-secondary` | `#8E918F` | Supporting body copy inside cards |
| `text-text-muted` | `#A8A29E` | Timestamps, breadcrumbs, placeholders |
| `border-border-default` | `#E5E7EB` | Card borders, input outlines, dividers |
| `border-border-subtle` | `#F3F4F6` | Very light internal dividers |

### Score / status color rule
```
score ≥ 72%  → semantic-success  (variant: "success")
score 50–71% → semantic-warning  (variant: "warning")
score < 50%  → semantic-danger   (variant: "danger")
neutral/loading → brand-accent   (variant: "accent")
```

---

## Typography

**Rule:** Never use raw `<p className="text-xs ...">`. Always use a Typography atom.

### Component selection

| Component | Tag | Use for |
|---|---|---|
| `<Heading level={1}>` | `h1` | Page hero — one per page, large black weight |
| `<Heading level={2}>` | `h2` | Section heading |
| `<Heading level={3}>` | `h3` | Card or sub-section title |
| `<Heading level={4}>` | `h4` | Group label within a card |
| `<Body>` | `p` | Prose content, option descriptions, explanations |
| `<Body size="sm">` | `p` | Table cells, supporting detail |
| `<Body size="xs" muted>` | `p` | Timestamps, footnotes, tertiary context |
| `<TechLabel>` | `span` | Monospace uppercase caption above a stat block or field group |
| `<TechValue size="4xl">` | `span` | Score, percentage, large numeric display |
| `<Code>` | `code` | Inline CLI flags, env var names, token strings |

### Heading classes (exact Tailwind, for reference)

| Level | Classes |
|---|---|
| 1 | `text-4xl font-black tracking-tight text-[#1A1A1A] leading-none` |
| 2 | `text-2xl font-bold tracking-tight text-[#1A1A1A] leading-snug` |
| 3 | `text-lg font-semibold text-[#1A1A1A] leading-snug` |
| 4 | `text-sm font-semibold text-[#1A1A1A] leading-normal` |

### TechLabel / TechValue pattern (stat block)
```tsx
<div>
  <TechLabel>Score</TechLabel>
  <TechValue size="4xl">87%</TechValue>
</div>
```

---

## Spacing System

All spacing on the Tailwind 4px grid. No arbitrary pixel values.

| Context | Classes |
|---|---|
| Card inner padding | `p-6` |
| Input / tight component padding | `px-4 py-3` |
| Form field stack | `space-y-4` |
| Grid card gap | `gap-4` |
| Inline cluster (icon + text, badge row) | `gap-2` |
| Page-level section separation | `mb-12` |

---

## Component Reference

### Button

```tsx
<Button variant="primary" size="md" loading={false}>Label</Button>
<IconButton size="md" aria-label="Close"><XIcon /></IconButton>
```

**Variant decision tree:**
- Main action for a view → `primary` (one per section, never two)
- Alternative alongside a primary → `secondary`
- Toolbar, icon-only, low-emphasis nav → `ghost`
- Irreversible destructive action → `danger` (must be ≥ 12px away from `primary`)
- Inline text navigation → `link`

**Size decision tree:**
- Compact row / table / card header → `sm`
- Default form submit, dialog confirm → `md`
- Hero CTA, onboarding screen → `lg`

**Rules:**
- Async operations: pass `loading={true}`, never disable + manually change text
- Icon-only: always use `<IconButton>` with `aria-label`, not `<Button>`
- `iconLeft` / `iconRight` props for icons within a `<Button>`

---

### Input

```tsx
<TextInput label="Email" hint="We'll never share this" id="email" />
<TextInput label="API Key" mono id="key" />
<TextInput label="Username" error="Already taken" id="user" />
<Textarea  label="Notes" rows={6} id="notes" />
<Select    label="Domain" options={[{ value: 'net', label: 'Networking' }]} id="domain" />
```

**Component decision tree:**
- Single-line free text → `TextInput`
- Multi-line text → `Textarea`
- Fixed bounded list → `Select`

**Rules:**
- Always pass `label` — unlabeled inputs fail accessibility
- Validation failure → pass `error` string (auto turns field red)
- Helper copy (≤ 1 sentence) → pass `hint` string
- Machine-readable values (API keys, codes, IDs) → pass `mono` prop

**States (auto-derived from props):**
```
error prop present  → "error"  state (red border, red hint text)
state="success"     → "success" state (green border)
disabled prop       → 50% opacity, not-allowed cursor
```

---

### Badge

```tsx
<Badge variant="stone">Networking</Badge>
<Badge variant="success" dot>Correct</Badge>
<Badge variant="warning" size="md">Expires Soon</Badge>
<StatusBadge status="correct" />
<StatusBadge status="inProgress" />
```

**Variant decision tree:**
- No semantic meaning (domain tag, filter chip) → `stone`
- Informational, non-critical ("New", category) → `blue`
- Currently selected filter / active state → `active`
- Correct answer / passing / completed → `success`
- Caution / near-threshold / due-soon → `warning`
- Wrong / failing / error → `danger`

**StatusBadge pre-wired values:** `correct` | `wrong` | `skipped` | `inProgress` | `completed` | `expired` | `error`

**Rules:**
- Use `<StatusBadge>` for all standard app statuses — never re-implement with a raw `<Badge>`
- Add `dot={true}` when color alone may be ambiguous (colorblind accessibility)
- Badges are display-only. Never wrap in `<button>` — use `<Button>` for interactive chips
- Text ≤ 20 characters
- Never put badges inside buttons or buttons inside badges

---

### Card

```tsx
<Card variant="base" hoverable>
  <CardHeader>
    <Heading level={3}>Title</Heading>
    <IconButton aria-label="Options"><DotsIcon /></IconButton>
  </CardHeader>
  <CardBody>
    {/* main content */}
  </CardBody>
  <CardFooter>
    <Button variant="secondary" size="sm">Cancel</Button>
    <Button variant="primary"   size="sm">Save</Button>
  </CardFooter>
</Card>
```

**Variant decision tree:**
- Default content container → `base`
- Content that must touch card edges (images, tables, code blocks) → `flush`
- Layout grouping with no visual boundary → `ghost`

**Rules:**
- `hoverable={true}` only when the whole card is a navigation target (selection grid)
- `CardHeader` / `CardFooter` are optional — omit when the card has only body content
- `CardFooter` right-aligns actions by default (`flex justify-end gap-3`)
- Place at most one `primary` button in a `CardFooter`

---

### ProgressBar

```tsx
<ProgressBar value={87} variant="success" animated showValue label="Overall Score" />
<ProgressBar value={62} variant="warning" animated showValue label="Domain: Security" />
<ProgressBar value={35} variant="danger"  animated showValue label="Domain: Protocols" />
<ProgressBar value={40} variant="accent"  animated label="Loading" />
```

**Variant decision tree (score-based):**
```
value ≥ 72  → variant="success"
value 50-71 → variant="warning"
value < 50  → variant="danger"
neutral/loading → variant="accent"
```

**Rules:**
- Value changes on mount (score reveal, loading) → always `animated={true}`
- Metric display (domain breakdown) → pair `showValue={true}` with `label`
- `value` is 0–100 by default; pass `max` to use a different scale
- Do not use for discrete step indicators (use a Stepper component instead)

---

### Card + ProgressBar pattern (domain score card)
```tsx
<Card>
  <CardBody>
    <div className="space-y-4">
      <div>
        <TechLabel>Domain Score</TechLabel>
        <TechValue size="4xl">87%</TechValue>
      </div>
      <ProgressBar value={87} variant="success" animated showValue label="Overall" />
      <ProgressBar value={62} variant="warning" animated showValue label="Security" />
      <ProgressBar value={35} variant="danger"  animated showValue label="Protocols" />
    </div>
  </CardBody>
</Card>
```

---

## Shadows

Use semantic shadow utilities, not raw `shadow-*` values.

| Class | Use for |
|---|---|
| `shadow-card` | Default card resting state |
| `shadow-hover` | Card hover state (`hover:shadow-hover`) |
| `shadow-overlay` | Modals, dropdowns, floating panels |

---

## Animations

| Class | Use for |
|---|---|
| `animate-fade-in` | Page section entrance |
| `animate-slide-in` | Card / panel entrance (slides up from below) |
| `animate-zoom-in` | Modal / dropdown entrance |
| `animate-blob` | Decorative background blobs |

All entrance animations are `0.5s ease-out forwards`. Apply via `className` on mount, not toggled via `opacity-0/100`.

---

## CSS Utility Classes (globals.css only)

These cannot be replicated with Tailwind alone:

| Class | Use for |
|---|---|
| `.tech-badge` | Badge-like element built outside the `<Badge>` component |
| `.tech-label` | Monospace uppercase label outside a React context |
| `.tech-value` | Display numeric outside a React context |
| `.bg-grid-pattern` | Decorative grid overlay on hero backgrounds |
| `.bg-dot-pattern` | Decorative dot overlay on landing sections |

---

## Accessibility Requirements

Every interactive element must have:
- `focus:ring-2 focus:ring-blue-500 focus:ring-offset-2` (already built into `Button` and `Input`)
- `aria-label` on every `<IconButton>` — no visible text means screen readers need it
- `label` on every `Input` — pass the `label` prop, never use unlabeled inputs
- `role="progressbar"` with `aria-valuenow/min/max` — already built into `<ProgressBar>`

---

## Layout Patterns

### Page root
```tsx
<div className="min-h-screen bg-surface-bg">
  <main className="max-w-5xl mx-auto px-6 py-12">
    {/* page content */}
  </main>
</div>
```

### Section with heading + content
```tsx
<section className="mb-12">
  <Heading level={2} className="mb-4">Section Title</Heading>
  {/* content */}
</section>
```

### Card grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <Card hoverable>...</Card>
</div>
```

### Form layout
```tsx
<form className="space-y-4">
  <TextInput label="Name"  id="name" />
  <TextInput label="Email" id="email" type="email" />
  <Select    label="Role"  id="role" options={roleOptions} />
  <div className="flex justify-end gap-3 pt-2">
    <Button variant="secondary">Cancel</Button>
    <Button variant="primary" type="submit">Save</Button>
  </div>
</form>
```

---

## Hard Rules (Non-Negotiable)

1. **Never** hardcode hex colors in components — always use Tailwind token classes.
2. **Never** use `text-gray-*` — this system uses the `stone` neutral scale.
3. **Never** place two `primary` buttons in the same visual group.
4. **Never** use `opacity-0/100` to show/hide — use `hidden` or conditional rendering.
5. **Never** put badges inside buttons or buttons inside badges.
6. **Never** import atoms from their source files — always import from root `index.ts`.
7. **Never** use arbitrary `px-[17px]` spacing — stay on the Tailwind 4px grid.
8. **Always** use `<StatusBadge>` for standard statuses (`correct`, `wrong`, `inProgress`, etc.).
9. **Always** add `dark:` variants when writing new components.
10. **Always** pass `animated={true}` to `<ProgressBar>` when the value changes on mount.
