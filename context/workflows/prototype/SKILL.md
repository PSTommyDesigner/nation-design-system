---
name: prototype
description: >-
  Builds a page prototype for one project from the Nation Design System, one page at a time, and records the
  patterns and rules decided along the way. Use when asked to make, change or review a prototype page in
  prototype/, or to save a pattern or a project rule that came out of one.
---

# Prototype pages, and what they teach the system

Prototypes are built in this repo one page at a time, one project at a time. Each page the user approves holds
decisions the team made. This workflow turns those decisions into patterns and rules, so the next page and the
next project reuse them instead of deciding again.

## Where things go
| What | Where |
| --- | --- |
| A page prototype | `prototype/<project>/<page>.stories.tsx`, a Storybook story that renders real components from `components/`. Folder rules in `prototype/AGENTS.md` |
| Rules that hold for one project only: business rules, flows, words | `context/features/<project>/AGENTS.md`, copied from `context/features/_template/AGENTS.md` |
| A layout or section that pages or projects reuse, or are meant to | `context/patterns/<id>.dsds.yaml`, copied from `context/patterns/_template.dsds.yaml` |
| A decision about how to use one component | that component's spec in `context/components/` |
| A component the system doesn't have | never in `components/`. See the rules below |

## Steps
1. Read `context/index.md`, the project's `context/features/<project>/AGENTS.md` if it exists, and every pattern that matches the page
2. List the plan for the page: components, patterns, tokens, and anything the system doesn't have. Wait for confirmation
3. Build the story in `prototype/<project>/`, with the title `Prototype/<Project>/<Page>`. Import components from `components/`. Every value comes from `--ntg-` tokens or a typography preset
4. Run `npm run typecheck`, then check the page in Storybook (`npm run storybook`, then a screenshot). Don't leave the checking to the user
5. When the user approves the page, list what to record and where, using the table above. Wait for confirmation before writing anything
6. Write the records. Add each new pattern to `context/index.md` and `context/patterns/AGENTS.md`, and each new project folder to `context/features/AGENTS.md`. Then run `node scripts/check-dsds.mjs`

## Rules for recording
- MUST ask before writing a pattern, a project rule or a change to a component spec. The user decides what becomes a rule
- A pattern MUST link the story it came from in `refs` with `rel: demo`
- IF a layout appears on one page only THEN write its rules as should. IF later pages repeat it the same way THEN raise those rules to must. Where pages do it differently, write NEEDS CLARIFICATION and ask
- IF the user answers a NEEDS CLARIFICATION question while building THEN replace that line with a rule that has a level, in the file where the question was
- IF the page needs a component the system doesn't have THEN MUST propose it first (see Ask a person first in `AGENTS.md`). IF the user agrees to build it for the prototype only THEN build that part inside the story from tokens only, never in `components/`, record it with NEEDS CLARIFICATION, and name it as a candidate component in the summary
- Project rules MAY add to the shared rules but MUST NOT contradict them
