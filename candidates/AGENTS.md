# candidates/

Proposals for components the system doesn't have yet, raised by the projects that need them.
Nothing here is part of the design system. The full rules in Thai are `../docs/rules/component-candidate.md`.

- `candidates/<name>/candidate.yaml` is the proposal. Copy `_template.candidate.yaml` and fill every field.
  The registry page reads these files, so keep to `key: value` on one line, with `>-` for a folded `problem`
- `candidates/<name>/<Name>.stories.tsx` is an optional example, built from `--ntg-` tokens only, so the team
  can look at the thing before deciding. Its Storybook title starts with `Candidates/`
- MUST NOT put a candidate in `components/`, import one from a prototype, or ship one in a product.
  A candidate becomes real only after the team accepts it and it is built through the Figma flow in `../components/AGENTS.md`
- MUST open a Pull Request that touches `candidates/` and nothing else, so a proposal never rides along with other work
- MUST give every proposal an `expires` date, at most 30 days after `submitted`. The stand-in in the asking project
  dies on that date. The weekly job opens an issue for anything still `proposed` past it
- `npm run verify:candidates` checks the files against the template. `npm run verify:candidates-expired` adds the expiry check
- Only the Design System team changes `status`, and only in the Pull Request that decides the proposal
