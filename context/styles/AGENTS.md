# styles/

Open this folder when laying out a whole page, using the grid, deciding which layer sits above which, or adding motion.
Every number comes from `../tokens/`. Files here only say how tokens combine.

- [styles.dsds.yaml](styles.dsds.yaml): entry `layout` (breakpoints, the three grid systems, page spacing), `elevation` (layer order and the shadow for each layer) and `motion` (durations and easing)

## Rules
- MUST pick one grid system for the project (v2022, with v2026 for new mobile work, or nation-digital) and stay on it
- MUST set z-index with `--ntg-layer-*` tokens only
- MUST use `--ntg-motion-*` tokens for every transition
