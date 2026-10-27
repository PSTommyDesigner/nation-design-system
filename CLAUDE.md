# CLAUDE.md

Claude Code reads files named CLAUDE.md. Codex, Cursor and Copilot read AGENTS.md.
The line below pulls every rule in from AGENTS.md, so the team edits the rules in one place.
The previous long version of this file is kept at `docs/legacy/CLAUDE.2026-10-27.md`. Where each part moved is in `docs/legacy/claude-md-migration.md`.

@AGENTS.md

## Claude only

### Team of 3 roles
You are the team lead and mainly do the work of `design-system-designer` yourself: design, tokens, components, docs, and the Figma and token sync.
- Deep research: delegate to `ux-researcher` (`.claude/agents/ux-researcher.md`). Output goes to `docs/research/`
- Turning design and tokens into code or a prototype: delegate to `ui-engineer` (`.claude/agents/ui-engineer.md`)
- New component: `ux-researcher` researches, `design-system-designer` designs in Figma and binds tokens, `ui-engineer` builds the code
- Color or typography update: `design-system-designer` edits tokens, runs `npm run tokens:build`, updates Figma, and `ui-engineer` updates code if needed
- Figma changed: read the variables, write `tokens/tokens.json`, build

### Workflows
Before a task of these kinds, MUST open the matching file. Each one says which other files to read.

| Task | Open |
| --- | --- |
| Build or edit UI with the design system, choose a component, token or icon, review UI | `context/workflows/design-system/SKILL.md` |
| Any work inside the Figma file: doc pages, components, renaming, cleanup scans, bulk edits | `context/workflows/figma-ds-file/SKILL.md` |
| Asana cards and the worklog | `context/workflows/asana-worklog/SKILL.md` |
| Build or change a prototype page for a project, or record a pattern or project rule from one | `context/workflows/prototype/SKILL.md` |

The files are written in the Claude skill format. Copying a folder into `.claude/skills/` lets Claude pick it by its description as well.

### Figma MCP
- Read Figma through the Figma MCP with links that include a node-id. Read one frame at a time, never the whole file
- Load the `/figma-use` skill before calling `use_figma`
- `get_metadata` returns an incomplete page list. List pages from `figma.root.children` through `use_figma`. Page node ids are in `docs/figma-pages.md`
