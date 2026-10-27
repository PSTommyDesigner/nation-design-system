# components/

Open this folder when placing, choosing or reviewing a component in a screen.
To change a component's own code, read `../../components/AGENTS.md` instead.

1. Check [../design-system.dsds.yaml](../design-system.dsds.yaml) for which components exist and which are deprecated
2. Open only the file of the component you use, such as [button.dsds.yaml](button.dsds.yaml)
3. Every component in code has a file here, and Icon is in `../icons/icon.dsds.yaml`. If you only have a Figma name, search `aliases`. If nothing matches, the system doesn't have it: ask, don't build your own
4. To write a new spec, copy [_template.dsds.yaml](_template.dsds.yaml)

## How to read a spec file (DSDS format)
- `description`: what it is, which Figma sets it matches, and why it exists
- `metadata.status`: stable, beta, experimental or deprecated
- `metadata.aliases`: Figma set names that differ from the code name. Look here when you only have the Figma name
- `sections` with `kind: guidelines`: rules. Each has a `level` (must to must-not) and a `statement`
  - `framing: when-to-use` says whether to use it at all
  - no framing means how to use it
  - `for: agent` marks rules written for AI, as IF / THEN
- A comment line starting with `# NEEDS CLARIFICATION:` is an open question. IF your task depends on it THEN ask, don't guess
- `sections` with `kind: definitions` and `context: anatomy`: the parts, and which `--ntg-` tokens each part uses
- `traits`: variants are props the caller sets, states happen at runtime. In an enum, the first value is the default
- `combos`: traits that must not be used together
- `uses`: what it's built from. `alternatives`: what to use instead
- `refs`: code (`rel: source`), Storybook stories (`rel: demo`), the Thai docs (`rel: relates-to`) and the Figma page (`rel: design`)

## Rules
- MUST use only components whose `status` is `stable`, `beta` or `experimental`, and say in your summary which ones were beta or experimental
- MUST follow every rule at its `level`, both `for: all` and `for: agent`
- MUST NOT use an entry or trait value whose `status` is `deprecated`. Use the one in `replacedBy`
- MUST NOT combine traits that `combos` forbids
- MUST NOT style a component from outside with `className` or `style` to change its colors, spacing or radius. If no prop gives the look you need, ask
- IF an item has `refs` with `rel: same-as` THEN MUST open and read the rule it links to
