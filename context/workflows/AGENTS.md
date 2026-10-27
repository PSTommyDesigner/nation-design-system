# workflows/

Step-by-step rules for kinds of work that need more than the root rules. Open the one that matches the task, and only that one.
Each folder is written in the Claude skill format (`SKILL.md` with a description, plus reference files), so it can also be copied into `.claude/skills/`.

| Task | Open |
| --- | --- |
| Build or edit UI with the design system, choose a component, token or icon, review UI | [design-system/SKILL.md](design-system/SKILL.md) |
| Any work inside the Figma file: doc pages, components, renaming, cleanup scans, bulk edits | [figma-ds-file/SKILL.md](figma-ds-file/SKILL.md) |
| Asana cards and the worklog | [asana-worklog/SKILL.md](asana-worklog/SKILL.md) |
| Build or change a prototype page for a project, or record a pattern or project rule from one | [prototype/SKILL.md](prototype/SKILL.md) |

## Rules
- MUST read the whole `SKILL.md` before starting, then open only the reference files it points to for the task
- Rule changes go in these files, not back into `CLAUDE.md` or `AGENTS.md`, unless the rule applies to every task
