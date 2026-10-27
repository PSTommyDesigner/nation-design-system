# Components, effects and color families in Figma

Read this before building or editing a component, a variant, an effect style or a color family page in Figma.
Code-side rules for the same component are in `components/AGENTS.md`, and size formula rules are in `tokens/AGENTS.md`.

## Component standard
- Auto layout, and every color bound to a variable. No raw hex
- The description says what it is used for and which effect it uses
- MUST NOT draw an element yourself when the library has a component, icon or style for it

## Effects: shadow, blur, focus ring (set 2026-08-14 after research, see `docs/research/effect-elevation.md`)
- Effect style names follow size (`shadows/{bottom|top|center}/{xs..xl}`), not purpose. The system mixes both kinds of use, by size (buttons) and by purpose (tooltip, modal). Figma has no alias for effect styles, so a second set of names would let values drift apart
- Every effect style MUST have a description that says which components use it. Update the description whenever you edit or add one
- A new component MUST be given an effect (the user's instruction, 2026-08-14):
  1. Check whether a fitting style exists, by reading the descriptions
  2. If one fits, use it and add the component's name to the end of that style's description
  3. If none really fits, ask before creating a new style. Then sync it into `tokens/tokens.json/shadows.json` and build
- MUST NOT use raw shadows (values not bound to an effect style), same as raw colors. Scan before you say done
- Dark mode has no effect plan yet (decided 2026-08-14). Don't propose one until asked
- Two-layer shadows (key plus ambient) and inset shadows are not done (decided 2026-08-14 against two-layer shadows)
- About 56 spots still use old remote styles locked inside instances from another library file. They can't be fixed from this file (`docs/05-effect.md` section 5)

## Size values from Figma
- Every value in a size formula MUST be read from the real Figma frame. Padding stored on a fixed-size frame can be stale: compute `padding = (frame size - child size) / 2`
- Check that values add up, for example `padding × 2 + icon = button size`
- Full rules: "Size scale rules" in `tokens/AGENTS.md`

## Axes and properties
- After changing a component's axes or properties, MUST update `tokens/figma-components.json` and run `npm run verify:api`. See `components/AGENTS.md`

## Color families (set 2026-10-19)
A page that groups components into color families MUST update `tokens/figma-color-families.json` and run `npm run verify:families`.
- The gate checks 2 things. One: an icon's color MUST match the text color of the reference set in the same family, for each value on the axis. Two: a variable named `u-<family>-<step>` MUST stay inside its own family
- Gray is the only exception: the `default-gray=true` axis is meant to be used by every family, but only inside that axis. Gray outside that axis means a set forgot its family color
- Why it exists: the other 4 gates can't catch this, because every spot is bound correctly by the rules (not raw, not a missing name, not a drifted value), just bound to the wrong family. On 2026-10-19 the Brown sets `icon-tag`, `circular-icon-tag` and `link-icon-tag` were cloned from Blue and the icon colors were left blue in 45 spots. Fill and border were brown, so it looked right at a glance, until the team lead noticed
- Cloning a set to another family MUST repaint every layer, not only the fill and the border
- When binding, take the variable id straight from a reference node in the same family. MUST NOT search by name: 243 names repeat across collections, a name search can return the wrong collection, and neither the raw color scan nor `tokens:verify` will catch it
