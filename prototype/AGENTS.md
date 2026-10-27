# prototype/

Page prototypes built from the Nation Design System: one folder per project, one Storybook story per page.
Before working here, read `../context/workflows/prototype/SKILL.md`. It also says how to record the patterns and rules each page produces.

- `prototype/<project>/<page>.stories.tsx` holds one page. The Storybook title is `Prototype/<Project>/<Page>`
- MUST import components from `components/`, for example `import { Button } from '../../components/Button'`. MUST NOT copy a component's markup or CSS into a prototype
- Every color, spacing, radius, size and text style comes from `--ntg-` tokens or a typography preset. No raw values
- Rules for one project live in `../context/features/<project>/AGENTS.md`
- Storybook finds these stories through `stories` in `.storybook/main.ts`, and `npm run typecheck` covers them through `include` in `tsconfig.json`
