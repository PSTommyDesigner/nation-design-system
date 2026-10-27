# Nation Design System

This file holds the main rules for every AI tool (Claude, Codex, Cursor, Copilot) working in this repo.
It is read at the start of every task, so it holds only what applies to every task. Everything else lives in `context/`,
in a folder's own `AGENTS.md`, or in a workflow file under `context/workflows/`.

The key words MUST, MUST NOT, SHOULD, SHOULD NOT and MAY in every context file are to be interpreted as described in RFC 2119,
only when they appear in capitals. In YAML files these words sit in the `level` field.
If you don't follow a SHOULD or SHOULD NOT rule, say why in your task summary.

## What this project is
- The shared design system of Nation Group (Thailand): the Figma file `QgmoT5Uuvv3elB96F4nsTq` (pages 00 to 28), design tokens, React + TypeScript components with CSS Modules in `components/`, and page prototypes built from the system in `prototype/<project>/`, one Storybook story per page (see `prototype/AGENTS.md`)
- Used by the group's news websites (brand codes in `docs/brand-codes.md`) and internal systems (HRM, Nation News Center, Nation House, AMS). Those projects run Next.js 12 or 14, React, TypeScript and styled-components or Emotion
- Tokens live in `tokens/tokens.json/*.json` (W3C DTCG, one file per Figma collection) and build with Style Dictionary to CSS variables with the prefix `--ntg-`
- Docs for AI follow DSDS 0.23 (`.dsds.yaml` files) in `context/`. The list of everything is `context/design-system.dsds.yaml`
- Docs for people are in Thai in `docs/`, starting at `docs/README.md`. Official rule files are in `docs/rules/`

## At the start of every task
1. MUST open `context/index.md` first to see which files this task needs
2. MUST read a folder's `AGENTS.md` before editing or using anything in that folder (`context/*/`, `tokens/`, `components/`)
3. SHOULD NOT open files the task doesn't need. MUST NOT read `tokens/tokens.json/component.json` or `tokens/output/css/variables.css` whole. Search them

## Ask a person first
- MUST list what you are about to do and wait for confirmation before starting. Work one step at a time, with one confirmation per step. Never chain several steps on your own
- MUST ask before creating anything that doesn't exist yet: a component, variable, token, text style, effect style, icon or file
- MUST ask before using, referencing, changing, moving or deleting anything that already exists
- IF no component, icon or style fits the task THEN MUST NOT draw or build your own. Propose it first
- IF a spec doesn't state a business rule, or says `NEEDS CLARIFICATION`, THEN MUST ask instead of guessing
- MUST ask before creating a repo, changing its visibility or force pushing. See `docs/rules/git-github.md`

## Rules to follow every time
- MUST NOT use raw values: no hex or rgb colors, no typed shadows, no typed px for spacing, radius or size. Bind a variable or use a token
- In Figma, MUST bind variables from the `component` collection only (general backgrounds and text are there). You MAY search every collection to understand, but IF you find a match in another collection THEN use its pair in `component`. In code, SHOULD use component tokens and MAY fall back to semantic tokens when the component collection has none for the job
- IF the variable or token you need isn't found THEN search every collection, then ask before creating one. MUST NOT fall back to a raw value, even when you searched the wrong collection
- MUST NOT use primitive tokens, such as `--ntg-color-brand-500` or `--ntg-color-gray-light-300`
- Typography is preset only. MUST use a text style in Figma or a `.ntg-typography-*` class in code. MUST NOT combine font family, size, weight, line height or letter spacing yourself
- MUST use an existing component, icon or style first. See `context/design-system.dsds.yaml`
- MUST NOT use anything whose status is `deprecated`. Use what its `replacedBy` names
- Work page by page (set by the user 2026-09-11, because the same question was asked again and again and the answer never changed). When you work on one Figma page or its doc, check and fix only that page. This covers every whole-file sweep: outdated docs, old page numbers in descriptions, names that break the rules, raw colors, unbound radius or spacing, raw shadows. Things you see on other pages: don't fix them, don't ask for approval, log them as pending work in the daily worklog and fix them when that page is picked up. The one exception is something broken until it can't be used, such as a source component so broken that its instances break across the library: report it at once

## Check before you hand off
- Zero em dash characters (U+2014) anywhere, in content and in names. The middle dot `·` is allowed only in list lines of markdown docs, never in paragraphs, tables, headings, quotes or any text in the Figma file. Use a space instead, and commas between numbers. Titles have no special separators
- Zero raw colors and zero raw shadows. In Figma, scan the whole page with `page.findAll()`, not only the frames you touched (see `context/workflows/figma-ds-file/SKILL.md` for the exempt pages)
- Values were read from the real source, not guessed from a token name, and checked with a screenshot
- Code edits: `npm run typecheck` shows 0 errors, and the gates in `components/AGENTS.md` or `tokens/AGENTS.md` pass
- `.dsds.yaml` edits: `node scripts/check-dsds.mjs` passes
- End with a summary: what you did, files changed, components and tokens used (say which are beta), and the sync step still needed
