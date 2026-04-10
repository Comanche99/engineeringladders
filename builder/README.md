# Framework Builder

A visual, interactive tool for creating career frameworks without writing code. Users can define role levels, dimensions, and behavioral expectations—and see the framework visualized in real-time with a radar chart.

## Features

✨ **Interactive Framework Design**
- Define role levels (e.g., L1 Junior, L2 Engineer, L3 Senior)
- Create dimensions (e.g., Technology, People, Process)
- Set behavioral expectations at the intersection of role × dimension
- Real-time radar chart visualization

💾 **Persistence & Export**
- Auto-save to browser localStorage
- Export framework as JSON for backup/sharing
- Export as Markdown for documentation
- Import frameworks from JSON files

📊 **Visual Editing**
- Left panel: Manage roles, dimensions, and their scale points
- Center panel: Grid-based expectation editor
- Right panel: Live radar chart + validation checklist
- Example Developer framework included

## Development

### Prerequisites
- Node.js 16+
- npm

### Setup

```bash
cd builder
npm install
```

### Development Server

```bash
npm run dev
```

Open http://localhost:3000/assets/builder/ in your browser.

### Build for Production

```bash
npm run build
```

Output: `/assets/builder/main.js` and `/assets/builder/main.css`

## Project Structure

```
builder/
├── src/
│   ├── types/
│   │   └── index.ts              # TypeScript interfaces (Framework, RoleLevel, etc.)
│   ├── hooks/
│   │   └── useFrameworkStorage.ts # localStorage persistence
│   ├── utils/
│   │   ├── framework.ts          # Utilities for creating frameworks
│   │   ├── templates.ts          # Example frameworks
│   │   └── export.ts             # Export/import functions
│   ├── components/
│   │   ├── App.tsx               # Root component
│   │   ├── FrameworkEditor.tsx   # Main layout (3-panel)
│   │   ├── RoleListPanel.tsx     # Left panel: roles
│   │   ├── DimensionPanel.tsx    # Left panel: dimensions
│   │   ├── ExpectationEditor.tsx # Center panel: grid editor
│   │   ├── RadarVisualization.tsx # Right panel: chart
│   │   └── FrameworkControls.tsx # Right panel: controls
│   ├── App.tsx
│   ├── App.css
│   └── main.tsx
├── package.json
├── tsconfig.json
├── vite.config.ts
└── public/index.html
```

## Data Model

```typescript
Framework {
  id: string
  name: string
  description?: string
  roleLevels: RoleLevel[]    // e.g., ["L1 Junior", "L2 Engineer"]
  dimensions: Dimension[]     // e.g., ["Technology", "People"]
  expectations: Expectation[] // role × dimension → scale point
}

RoleLevel {
  id: string
  name: string
  order: number
}

Dimension {
  id: string
  name: string
  scalePoints: ScalePoint[]  // e.g., ["Adopts", "Applies", ...]
  order: number
}

Expectation {
  roleLevelId: string
  dimensionId: string
  scalePointIndex: number    // 0-4 mapped to scale points
}
```

## Scale Points

Default scale points (customizable per dimension):
1. **Adopts** — Learning to use the skill
2. **Applies** — Can apply skill independently
3. **Specializes** — Deepening expertise in this area
4. **Evangelizes** — Teaching and spreading knowledge
5. **Masters** — Expert, creating new knowledge

## Browser Storage

Framework state is automatically saved to `localStorage['engineering-framework-builder-state']`.

- Auto-save after every change (500ms debounce)
- Manual reset with "Unsaved" indicator in header

## Integration with Jekyll

The built app is served at `/builder/` via Jekyll. The file `/builder.md` includes:

```yaml
---
layout: default
title: Framework Builder
permalink: /builder/
---
<div id="root"></div>
<script src="/assets/builder/main.js"></script>
<link rel="stylesheet" href="/assets/builder/main.css">
```

To rebuild the app for production:
```bash
cd builder && npm run build
```

This outputs to `/assets/builder/main.js` and `/assets/builder/main.css`, which Jekyll will serve.

## Testing

### Manual QA Checklist

- [ ] Create a new framework from scratch
  - [ ] Add 2-3 role levels
  - [ ] Add 2-3 dimensions
  - [ ] Set expectations for a few cells
  - [ ] Verify radar chart updates in real-time
- [ ] Load the Developer example
  - [ ] Verify all roles and dimensions load
  - [ ] Edit a few expectations
  - [ ] Verify chart reflects changes
- [ ] Export & Import
  - [ ] Export as JSON
  - [ ] Export as Markdown
  - [ ] Import a JSON file and verify data loads
- [ ] Persistence
  - [ ] Close browser tab
  - [ ] Open again
  - [ ] Verify framework state persists
- [ ] Validation
  - [ ] Verify checklist shows "✓" when framework is valid
  - [ ] Verify it only allows export when valid

### Unit Tests (Configured, Not Written)

```bash
npm run test
```

Vitest is configured but test files are not yet written. Good areas to test:

- `useFrameworkStorage` persistence and debouncing
- Framework creation and ID generation
- Export/import round-trip (data integrity)
- Role/dimension/expectation updates propagate to state

## Future Enhancements (Out of Scope for MVP)

- [ ] Server-side persistence with user accounts
- [ ] Framework versioning and branching
- [ ] Collaborative editing
- [ ] Import from existing frameworks (auto-parse markdown)
- [ ] Framework templates marketplace
- [ ] Scoring engine and progress tracking
- [ ] Mobile app optimizations
- [ ] Accessibility improvements (WCAG AA)
- [ ] Dark mode

## License

Same as the main repository.
