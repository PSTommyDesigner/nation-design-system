# Nation UI Icons

151 filled-vector icons across 13 categories, built on a 24dp Material keyline grid (2dp stroke outlined → single fill path). Source of truth: Figma **02 Icon** page, frame `Nation UI Icons` (node `9349:35444`).

## Usage

```tsx
import { Icon } from '@/components/Icon';

<Icon name="search" />                 // default size 'lg' (24px)
<Icon name="menu" size="sm" />         // token size → --ntg-size-icon-sm
<Icon name="favorite-fill" size={20} />// explicit px
<Icon name="settings" title="Settings" /> // accessible (role=img + label)
```

- **Color** inherits via `currentColor` set `color` on the icon or an ancestor, or use foreground tokens.
- **Size** accepts a token (`xs`/`sm`/`md`/`lg`/`xl`/`2xl` → `--ntg-size-icon-*`) or a number / CSS length.
- Decorative by default (`aria-hidden`); pass `title` to make it announced.

## Files
- `icons.ts` registry (`icons`, `iconCategories`, `iconNames`, `IconName`)
- `Icon.tsx` React component
- `svg/` individual `.svg` files (`fill="currentColor"`)

## Categories
- **Navigation & Arrows** (15)
- **Layout & View** (10)
- **Search & Content** (10)
- **Media & Player** (14)
- **Text & Editor** (10)
- **Files & Data** (10)
- **Communication** (10)
- **Social & Brand** (10)
- **Engagement & Reactions** (10)
- **Account & Auth** (11)
- **Status & Feedback** (14)
- **Commerce & Money** (10)
- **Currency** (12)

> Regenerate from Figma after design changes do not hand-edit `icons.ts` / `svg/`.
