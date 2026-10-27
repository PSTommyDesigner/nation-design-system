---
name: figma-ds-file
description: >-
  Rules for working inside the Nation Design System Figma file (QgmoT5Uuvv3elB96F4nsTq). Use before any
  use_figma call that changes the file: writing or fixing a page's documentation, building or editing
  components or variants, renaming layers or components, binding variables, effects or radius,
  cleanup scans for raw colors, and bulk moves, replaces or deletes.
---

# Working in the Figma design system file

This skill holds the rules for changing the Figma file. The rules for every task (ask first, no raw values,
preset typography, page by page) are in `AGENTS.md` and still apply.

## Steps
1. Say which page you are working on. Work on that page only (see "Work page by page" in `AGENTS.md`)
2. Open the reference file that matches the task, and only that one
3. Do the work one step at a time, with a confirmation per step
4. Before you say done, go through the done checklist below, item by item

| Task | Read |
| --- | --- |
| Write or fix any documentation on a page | [doc-pages.md](doc-pages.md) |
| Build or edit a component, variant, effect or color family | [components.md](components.md) |
| Rename a layer, component, set, variant or style | [naming.md](naming.md) |
| Look up a page's node id | `docs/figma-pages.md` |

## Done checklist for the Figma file
Go through every item on the page you worked on, like a scan that must reach 0. A memory of the rules is not enough.
1. Separators: 0 em dash characters (U+2014) in content and in names. 0 middle dots in any text in the Figma file (in markdown docs the middle dot is allowed in list lines only, decided 2026-08-26). Use a space instead, and commas between numbers. Titles use a space or a single word
2. Raw colors: 0 fills or strokes that aren't bound to a variable, bound from the `component` collection
   - Scan the whole page with `page.findAll()`. Never scan only the doc frames you touched, because component set boxes sit outside them. The 27 Card page was once reported as 0 while 11 raw fills were left on its component set boxes
   - Most raw colors are the background of a component set box (COMPONENT_SET) or of a SECTION. Bind them to `color/background/general/*`, as page 05 Effect did for 77 spots
   - Three pages are exempt for good. Don't bind them and don't ask again, and leave them out of whole-file totals:
     - 08 Logo: brand identity colors must stay fixed. Binding them would let someone change a shared value and shift the logos (decided 2026-08-18)
     - 04 Grid: the red `#FF0000` guide lines are for designers only, not a system color, and end users never see them (decided 2026-08-18)
     - 09 Third-party Logos: 505 logos of other companies. Same reason as 08 Logo: the colors belong to those brands and we have no right to change them (decided 2026-10-14)
   - Known state as of 2026-10-14: 09 Third-party Logos 5,707 spots (exempt). 27 Card still has 11 spots, all on component set boxes. Also `Work in Progress` 54, the `Cover` frames of 5 divider pages 15, and `Thumnail` 2
3. Use design system parts, never draw your own: data tables use instances of the sets ending in `-table-cell` from page 26 Table (for example `header-table-cell`, `text-table-cell`). Icons, components and styles are instances from the library
4. Document heading: set the real name. Never leave the default "Design system header"
5. Real values: read the resolved value, don't guess from a token name. Verify with a screenshot and the values
6. Typography: presets only, no overrides
7. Ask first: anything new, or any change or deletion of something that exists
8. Documentation types: see the checks at the end of [doc-pages.md](doc-pages.md)
9. Never resize a source COMPONENT. In a bulk loop (moving, arranging layout), MUST check `node.type` first. Setting `layoutSizing*` to `FILL` or calling `resize()` on a COMPONENT breaks the source and every instance in the library. On 2026-08-06, 18 grid components were stretched to 4240x1 and had to be restored one by one. A COMPONENT inside auto layout MUST be `FIXED`. After arranging a set, compare every component's size before and after: it MUST not change
10. Before deleting or replacing things in bulk: inspect what each one holds first. Something that looks like a card may hold a component or a preview, such as a sample button in a usage example. Replacing the whole card loses what is inside. This happened once when usage cards were replaced with `info-card` and the sample buttons disappeared
11. Before deleting a page or a set, scan who uses it, and report what is inside before deleting, even after you were told to delete. Layer names don't tell the truth: the old Header page held `_document-header`, used in 198 spots. See `docs/rules/layer-scope.md` section 4
