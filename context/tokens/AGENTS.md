# tokens/

Open this folder when choosing a color, spacing, radius, shadow, text style, layer or motion value.

- [tokens.dsds.yaml](tokens.dsds.yaml): what each token group is for, what it isn't for (`alternatives` names what to use instead), and the light and dark themes. Read this before choosing
- [token-list.md](token-list.md): every token a screen may use, with the CSS variable name, what it points to and its Figma description. Also the typography presets, the shadows, the tokens owned by one component, and the primitives you must never use. Generated
- [semantic-tokens.md](semantic-tokens.md): semantic colors. Open it only when token-list.md has nothing for the job. Generated

The real values are in `../../tokens/tokens.json/*.json`. Don't open those files to pick a token. Search `../../tokens/output/css/variables.css` if you need to confirm a name.

## Rules
- MUST use a token from token-list.md first. MAY use one from semantic-tokens.md in code when token-list.md has nothing for the job
- MUST NOT use a primitive, such as `--ntg-color-brand-500`. A token is allowed only if it is in one of the two lists
- MUST NOT use a component's own tokens (`--ntg-button-*`, `--ntg-input-*` and the like) outside that component
- MUST use a `.ntg-typography-*` class for text. Never set font properties one by one
- IF no token fits THEN MUST ask. Never invent a value, and never fall back to a raw value
- MUST NOT edit the token files or the generated lists yourself. Changes go through the Design System team (see `../../tokens/AGENTS.md`)
