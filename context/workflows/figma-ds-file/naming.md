# Naming in the Figma file

This file is about layers, elements, components and styles. Token naming is a different topic, official in
`docs/rules/token-naming-taxonomy.md`: `nation.category.property.role.prominence.state`, with light and dark mode
kept out of the name, and tiers base, semantic, component. A new token MUST pass the checklist in that file.

## Layers, elements and components
- All lowercase, with `-` instead of spaces (`Section title` becomes `section-title`)
- Don't touch:
  - Top-level Document frames, which keep their names (`01 Color Documentation`, `Icon`, `Text`, `Base Components (internal)`, `Color palette`)
  - TEXT layers, whose name is their content. Renaming them gains nothing and makes a mess

## Component names end with their type (set by the user 2026-09-02)
- For example `-button`, `-tag`. The Assets panel shows only the name, with no parent frame for context, so a lone `number` or `text` can't be told apart
- Shape words in front use the same word on every page: `pill-` for capsule, `circular-` for round, `semi-rounded-` for rounded corners (`filled-tag` and `pill-filled-tag`, `semi-rounded-button` and `pill-button`)
- No color family in the name. The family is the name of the parent frame. The same name repeated across families is correct (`pill-button` appears 4 times, `filled-tag` 10 times)
- After renaming a set, also fix the section frame names, the doc headings, the lines that count variants, and the grouping frame names so they match

## No `/` in COMPONENT and COMPONENT_SET names (set by the user 2026-09-01)
Figma turns `/` into folders in the Assets panel, and the nested folders add nothing.
- Keep every meaningful word and join them with `-` (`avatar/image` becomes `avatar-image`, `Text field / Default` becomes `text-field`, `payment/visa/sm` becomes `visa-sm`). See the done work on page 08 Logo (`bangkokbiznews-fixed-height`) and page 12 Buttons (`circular-icon-button`)
- Drop a word that repeats the page name (`Effect / Focus Ring` on page 05 Effect becomes `focus-ring`). Keep one copy of a word repeated in the same name (`payment/applepay/sm/applepay` becomes `applepay-sm`)
- Base parts use `_name`, not `_family/name` (`_avatar/online-indicator` becomes `_avatar-online-indicator`). The underscore already says it is a base part, so no extra folder

## A leading underscore means not published (set by the user 2026-09-14)
Figma treats a component whose name starts with `_` or `.` as private. It is not published to the library, and other files can't use it.
- Use `_` only for things meant never to be used by other files, such as a part whose meaning exists only inside one set
- Anything other files need MUST NOT start with `_`. Give it a full name ending with its type (`_checkbox-box` had to become `checkbox` on 2026-09-14)
- A part reused in many places is not a base part, it is a full component. Decide by counting how many places use it on its own, not by how small it looks

## Exception: page 02 Icon keeps the category prefix
`action/search` stays. 1,676 icons in 31 categories would make a flat list nobody can scan by eye. The category tells something the page name can't.

## Renaming is safe, with checks
- Renaming doesn't break instances, because Figma links them by id. But MUST compare sizes before and after for every one, and fix the docs that mention the old name, both in Figma and in this repo
- Rename page by page, when that page is being worked on. Don't sweep the whole file at once

## Other names
- Ordinary layers (not components) may keep `/` for grouping. Remove the spaces around `/` (`Table / Cell / Header` becomes `table/cell/header`)
- Variants: lowercase, keep `=` and `, ` (`Type=Primary` becomes `type=primary`, `Checked=False, Size=sm` becomes `checked=false, size=sm`)
- Underscore prefix: keep `_`, then lowercase with `-` (`_Design System Header` becomes `_document-header`, `_Lead` becomes `_lead`)
- Styles (text, effect, layout grid): lowercase with `-`, keep `/` for grouping (`Heading/h1 bold` becomes `heading/h1-bold`, `Shadows/Bottom/xs` becomes `shadows/bottom/xs`). No exceptions. Styles are linked by id, so this is safe

## Status
- Pages 00 to 03 and all styles (63) follow these rules
- Component names flattened on pages 04, 05, 09, 10, 11 (2026-09-01, 288 pieces in total). Page 08 was done before that
- Page 21 Tags follows the end-with-type rule (2026-09-02: 130 sets, 13 names, 10 families each, 580 spots fixed)
- Page 04 Grid has 4 duplicate name pairs because they are different versions of the grid at the same screen size. Fixed by adding the version name to match the grid style (`nation-group-2022-desktop`, `nation-platform-2023-desktop`)
- Other pages follow when each one is redesigned
