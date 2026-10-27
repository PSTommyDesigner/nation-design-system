# tokens/

Open this file before editing anything in `tokens/`, or the token scripts in `scripts/`.
To use tokens in a screen or a component, read `context/tokens/AGENTS.md` instead.

## Where the truth lives
| Layer | Where | Owner |
| --- | --- | --- |
| Token values | `tokens/tokens.json/*.json`, one file per Figma collection, W3C DTCG | Figma, exported here |
| Size formulas | `tokens/scale/*.mjs`, registered in `tokens/scale/index.mjs`. Shared scales in `tokens/scale/global-scale.config.mjs` (`RADIUS_SCALE`, `SPACE_GROUPS`) | Code |
| Output | `tokens/output/css/*.css`, `tokens/output/js/*.mjs` | Generated. MUST NOT edit by hand |
| Figma to code maps | `tokens/figma-components.json`, `tokens/figma-color-families.json`, `tokens/figma-layers/*.json` | Code, captured from Figma |

- Token naming is official in `docs/rules/token-naming-taxonomy.md`. A new token MUST pass its checklist in section 6
- Tiers: base (`primitive.json`) to semantic (`semantics-light-mode.json`, `semantics-dark-mode.json`) to component (`component.json`). A component token points at a semantic one, a semantic one at a base one. Never skip a tier
- MUST ask before adding, renaming or deleting a token, a scale step or a text style

## Pipeline
```
Figma variables and styles
  Token Press plugin, export over tokens/tokens.json/*.json   (small edits of 2 or 3 tokens: edit the file directly)
tokens/tokens.json/*.json
  npm run tokens:build   = clean-selfref.mjs, then generate-scale.mjs (formulas and gates), then Style Dictionary
tokens/output/css and tokens/output/js
```
- `npm run tokens:pull` (REST `/variables/local`) is Enterprise only and returns 403 on our plan. Don't use it, but keep `scripts/figma-to-tokens.mjs`: it already writes the right format, for when the plan becomes Enterprise. `tokens:push` has no real script yet
- Ways to sync Figma to code: 1) Token Press plugin, recommended, works on every plan and covers variables and styles 2) edit `tokens/tokens.json/<collection>.json` directly for 2 or 3 tokens 3) the Figma MCP reads the variables and writes the file. Then build. Every way needs a person or an agent in Figma. It can't run headless or in CI until the plan is Enterprise. The token data is the same whichever way you use
- `typography.json` and `shadows.json` come from Figma Styles (text and effect), not from variables
- After every Token Press export, `npm run tokens:build` runs `scripts/clean-selfref.mjs`, which removes tokens that point at themselves. They appear because the `component` and `semantics` collections share 243 names and the file format has nowhere to store the collection name
- A new token file MUST be added to `source` in `tokens/style-dictionary.config.mjs`. It is a list, not a glob
- Renaming layers, changing layout or renumbering pages in Figma doesn't affect code. Sync only the variable and token layer. When a component `.tsx` changes, the designer (`design-system-designer`) updates the Figma annotations
- Scripts that call the Figma REST API need `FIGMA_TOKEN` and `FIGMA_FILE_KEY` in `.env`. Check that they exist. MUST NOT print, copy or paste their values anywhere

## Size scale rules
Set 2026-08-18, after the icon button size tokens turned out not to match the design file at any size, and the scale system had been deleted during a build without anyone noticing.
- A new component with several sizes MUST get its size formula in `tokens/scale/<component>.mjs` at the same time, and be registered in `tokens/scale/index.mjs`. MUST NOT type a fixed value per size into `component.json`
  - Formula: `size[i] = base + i × step`, where xs is 0, sm is 1, md is 2, lg is 3 and xl is 4
  - Each dimension may have its own base and step (button height: base 24, step 8. Icon button padding: base 4, step 3)
  - The component's tokens MUST point at `{space.<component>.*}`, not at raw values
- Every value in a formula MUST be read from the Figma file first. Don't trust a value stored earlier
  - Padding stored in Figma can't be trusted when the frame has a fixed size, because it keeps the value of an older version. Compute it from what you see: `padding = (frame size - child size) / 2`
  - Values MUST add up: for example `padding × 2 + icon = button size`. If they don't, one of them is wrong
- Exception: when a text style sets the height (for example `link-button`, which has no background, so its height is the line height of the preset), MUST NOT make a height formula. Write a `$description` that names the preset instead
- Radius: fixed values MUST come from `RADIUS_SCALE`. Values that come out of a formula don't need to be in the scale. MUST NOT create middle-layer radius variables in Figma. Details in `docs/rules/token-naming-taxonomy.md` section 3.3.1 and `docs/06-shape.md`
- Two token files MUST NOT define the same path (for example a single value `scale` that overwrites the whole `scale.button.*` group). After a build, collisions MUST be 0. A collision warning means something was deleted silently
- `generate-scale.mjs` stops the build when a value can't explain where it came from. The gates are listed in `docs/README.md` section 3

## Gates
| Command | Run it when | Must show |
| --- | --- | --- |
| `npm run tokens:build` | After any token or formula change, and after every Token Press export | Collision 0 |
| `npm run tokens:verify` | After syncing Figma and tokens | "ต้องดู 0 กลุ่ม" (0 groups to review) |
| `npm run verify:coverage` | After adding or removing a formula in `tokens/scale/` or a folder in `components/` | No gaps |
| `npm run verify:api` | After changing component axes or properties in Figma. See `components/AGENTS.md` | No gaps |
| `npm run verify:families` | After changing a Figma page that groups components into color families. See `context/workflows/figma-ds-file/components.md` | No gaps |

`npm run verify:coverage` (set 2026-10-15) compares `tokens/scale/*.mjs` with `components/` and reports what is missing, including empty folders.
- Once a component has a formula, it MUST also have code in `components/`
- MUST NOT count a component as having code from its folder name. Open the folder and check the files are really there. Four empty folders were once counted as code, and a research report drew the wrong conclusion from it
- Anything meant to have no code needs the user's decision first. Then add it to `NO_CODE` in the script with the reason. Today there are 2: `doc-table` and `info-card`, which are components of the documentation system, not of the products. Teams that take the library don't need them
