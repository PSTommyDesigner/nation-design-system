# molecules/

Open this file before editing anything in `molecules/`.

This folder holds the Storybook doc pages of the Molecules (Element) layer: one folder per Figma page (`Frame/` for 10 Frame, and so on).
They are documentation pages, not components. No project imports them. The component stories of this layer stay next to their code in `components/`.
Every page draws its documents with `../foundations/shared/AtomDoc.tsx`, the same renderer as the Atoms pages (decided by the user 2026-11-04).

## Rules
- Every rule in `../foundations/AGENTS.md` applies here too. Read it first
- The title is `Molecules (Element)/<NN> <Page>`. Each page mirrors the documents on its Figma page, in the same order, one story per document
- Content comes from `scripts/extract-figma-atom-doc.mjs`. A page here sets `root: 'molecules'` in `PAGES`, so `npm run figma:atom-doc -- frame` writes `Frame/frame-doc.json`. MUST NOT edit that JSON by hand
- Frames (10 Frame) are PNG files in `Frame/assets/`, exported by the script for this doc page only, the same way as the logos. They are PNG, not SVG, because an SVG export of a video frame comes out empty (`format: 'png'` in `PAGES`). The 8 frames in the design file are checkerboard image fills and there is no Frame component in the code yet, and their sizes (width 288) come from the design file because no size token exists for them (decided by the user 2026-11-04). MUST NOT edit the files by hand. When a Frame component exists in the code, the page should use it instead
- Pages whose components exist in the code (11 Avatar and on) draw their samples with the real components, not images (decided by the user 2026-11-04). The script reads each sample (an instance, or every variant of a set) with its Figma properties into `components` and `variantSet` blocks, and lists the sets to read in `components` in `PAGES`. The page's story passes a map from Figma set name to a renderer (`<Folder>/<name>Samples.tsx`) as `samples`. A set with no renderer shows a notice instead. Variant positions inside a set come from the design file, because they are the layout of the design, not system spacing. Placeholder photos are the image fills of the design file, exported to `assets/` by the script
- `state=hover` can't be drawn still: the components change only under the mouse, so hover samples turn on `interactive` and look like default until hovered
