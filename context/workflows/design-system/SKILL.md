---
name: design-system
description: >-
  Picks the Nation Design System context files that match the task. Use when building or editing UI with the
  design system, placing a component, choosing a color, spacing, radius, shadow or text style, adding an icon,
  laying out a page on the grid, writing on-screen copy, or reviewing whether work uses the design system correctly.
---

# Design system router

This skill holds no design system knowledge itself. Its job is to say which files a task needs,
so the AI reads only what's necessary and the context doesn't overflow.

## Steps
1. Read `context/index.md`
2. Find the row (or rows) in the table below that match the task
3. Read that folder's `AGENTS.md`, then open only the files the task needs
4. Do the work, then summarize which components and tokens you used, and which of them are beta or experimental

| Task | Read |
| --- | --- |
| Place or edit a component in a screen | `context/design-system.dsds.yaml`, then `context/components/<id>.dsds.yaml` (Icon is in `context/icons/icon.dsds.yaml`) |
| You only have a Figma name | search `aliases` in `context/design-system.dsds.yaml` and `context/components/` |
| Choose a color, spacing, radius, shadow or text style | `context/tokens/tokens.dsds.yaml`, then search `context/tokens/token-list.md` |
| Lay out a page, use the grid, set z-index or motion | `context/styles/styles.dsds.yaml` |
| Add an icon | `context/icons/icon.dsds.yaml`, then search `context/icons/icon-names.md` |
| Write copy | entry `content` in `context/guidelines/guidelines.dsds.yaml` |
| Build a page or flow for one project | `context/features/<project>/AGENTS.md`, then the patterns it links to. For a prototype page, also `context/workflows/prototype/SKILL.md` |
| Review work | the spec of every component used, `shared-a11y` in `context/guidelines/guidelines.dsds.yaml`, and the forbidden values in the system entry of `context/design-system.dsds.yaml` |

In `.dsds.yaml` files, read the rules in `sections` with `kind: guidelines`, both `for: all` and `for: agent`.
If an item has only `refs` with `rel: same-as`, open the rule it links to.
A comment line starting with `# NEEDS CLARIFICATION:` is an open question. If the task depends on it, ask.

## Don't
- Open every file in `context/` at once
- Read `tokens/tokens.json/component.json` or `tokens/output/css/variables.css` whole. Search them
- Guess a value or a rule you can't find in the files. Say you couldn't find it and ask
