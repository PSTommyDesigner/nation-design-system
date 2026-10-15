# Nation House Icons

150 brand icons on a 40dp grid. Source of truth: Figma **02 Icon** page, frame `Nation House Icons (document)` (node `8932:60`).

Different from [`Icon`](../Icon/README.md) (Nation UI Icons), which is a single filled path on a 24dp grid. The two sets are not interchangeable, and should not be mixed in the same row of UI.

## Two layers

Each icon keeps the same two layers as the Figma component.

| Layer | Drawn by default | Colour | Figma binding |
|---|---|---|---|
| `outline` | yes | `currentColor` | `icon/general/primary` |
| `solid` | only with `filled` | `var(--ntg-icon-brand-primary)` | `icon/brand/primary` |

In Figma the solid layer is switched off on all 150 components and turned on per instance. `filled` is the same switch.

## Usage

```tsx
import { NationHouseIcon } from '@/components/NationHouseIcon';

<NationHouseIcon name="customer-analysis" />            // 40px outline
<NationHouseIcon name="alarm" size={24} />              // any size
<NationHouseIcon name="wallet" filled />                // + brand solid layer
<NationHouseIcon name="admin" title="ผู้ดูแลระบบ" />      // accessible label
```

Colour follows the surrounding text colour, so set it on a parent or on the icon itself:

```tsx
<span style={{ color: 'var(--ntg-icon-brand-primary)' }}>
  <NationHouseIcon name="aoe" />
</span>
```

## Files

| File | What it holds |
|---|---|
| `NationHouseIcon.tsx` | React component (`name` / `size` / `filled` / `title`) |
| `icons.ts` | registry: `nationHouseIcons`, `nationHouseIconNames`, type `NationHouseIconName` |
| `svg/*.svg` | 150 standalone files, outline layer only, `stroke="currentColor"` |

## Keeping it in sync

Geometry comes from the Figma REST API with `geometry=paths`, reading each layer's `vectorNetwork` and converting it to a path.

⚠️ **Do not use Figma's own SVG export for this set.** It converts every centre-aligned stroke into a filled outline, which turns one icon into roughly 150 KB, bakes the colour in as a raw hex, and throws away the stroke so width and colour can no longer be changed. Reading `vectorNetwork` keeps each icon at about 1 KB and keeps the strokes as strokes.
