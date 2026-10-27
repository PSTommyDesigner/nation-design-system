# patterns/

Open this folder when building a page section or a page layout that several features reuse.
A pattern is a decision the team already made: which components go together, and where they sit.
In DSDS a pattern is `kind: entry`.

The Figma file keeps only atoms and molecules as components. Organisms and templates are not components there,
on purpose (decided 2026-10-12, see `../../docs/rules/layer-scope.md`). They are meant to ship as documentation plus
code examples, which is what a pattern file is.

- No pattern is written yet. Patterns are recorded one at a time as prototype pages are approved, following `../workflows/prototype/SKILL.md`. A pattern's example page (`rel: demo`) is its prototype story in `prototype/`
- [_template.dsds.yaml](_template.dsds.yaml): template for a new pattern

## Candidates the team already named in Figma
- Organisms (page Organisms, document Organism Examples): table toolbar, site header, filter bar, select that opens a panel, login box, tab bar with counters, page-wide alert bar, progress bar, settings bar with switches, slider bar
- Templates (page Template, document Template Examples): news list page, home page, article page, category page, search results page, form page, dashboard page, page with an announcement, video page, tag page
- Where to draw the line between organism and template is in `../../docs/rules/layer-scope.md` section 6.2

## Rules
- MUST point to components by id in `uses`, never by typing their name in prose
- IF the page matches a pattern THEN MUST follow that pattern first, then adapt it to the feature
- SHOULD open the example page that `refs` with `rel: demo` points to before starting
- IF no pattern exists for the page THEN build it from components only, and say in your summary which layout decisions you made, so the team can turn them into a pattern
