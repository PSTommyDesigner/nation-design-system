# foundations/

Open this file before editing anything in `foundations/`.

This folder holds the Storybook pages of the Atoms (Identity) layer: one folder per Figma page (`Color/` for 01 Color, `Typography/` for 03 Typography, `Grid/` for 04 Grid, and so on).
They are documentation pages, not components. No project imports them. Every page draws its documents with `shared/AtomDoc.tsx`.

## Rules
- Each page mirrors the documents on its Figma page, in the same order, one story per document. The title is `Atoms (Identity)/<NN> <Page>`
- Content comes from the design file, not from typing. `scripts/extract-figma-atom-doc.mjs` reads the Figma page and writes a JSON file next to the page (`npm run figma:atom-doc -- color` writes `Color/color-doc.json`). A new page MUST be added to `PAGES` in that script. MUST NOT edit that JSON by hand. Fix the design file, then run the script again
- Every color, space and text style MUST come from a token or a `.ntg-typography-*` class, as in the rest of the repo
- Three things break the token rules on purpose, because showing the raw layer is their job. These are the only exceptions in the repo. Real screens still MUST NOT do any of them
  - Color palette (01 Color) shows primitive color tokens such as `--ntg-color-brand-500`
  - Type Scale (03 Typography) sets font family, size, line height and weight from primitive typography tokens, because the base sizes (h1 to text-3xs, read-*) have no `.ntg-typography-*` class (allowed by the user 2026-10-28)
  - Grid specimens (04 Grid) take the canvas width from the design file, because the v2026 mobile canvas is 360 and has no token (decided by the user 2026-11-02). Columns, gutter, margin and container still come from `--ntg-grid-*`
- A swatch in a dark-mode column sits inside `data-theme="dark"`. Component tokens are computed once at `:root`, so the script resolves each one to the semantic token the dark block overrides (`darkVar`). Use `darkVar`, never `cssVar`, in a dark column
- Labels such as `brand-600` are read from the real variables, not from the text typed in the Figma tables. When they differ, the script lists the row in `staleLabels`, which is pending work on that Figma page
