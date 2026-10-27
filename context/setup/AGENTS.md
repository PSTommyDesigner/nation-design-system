# setup/

Open this folder when starting a project that uses the design system, or when setting the theme.

- [getting-started.dsds.yaml](getting-started.dsds.yaml): what to load, in `steps`, and starter code in `freeform`

## Rules
- MUST load `tokens/output/css/variables.css` before any component renders
- MUST NOT edit the generated CSS in `tokens/output/`. Adjust through tokens instead
- The way product repos get the library is not decided yet (`NEEDS CLARIFICATION` in the file). Ask before copying files into a product repo
