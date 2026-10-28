# Nation Design System Context

> Table of contents for all AI context. Every line links to a file and says when to open it.
> `.dsds.yaml` files follow Design System Doc Spec (DSDS) 0.23 https://designsystemdocspec.org
> Thai docs for people are in `../docs/`. Rules for changing the system itself are in `../tokens/AGENTS.md`, `../components/AGENTS.md` and the workflow files in [workflows/](workflows/).

## Which file to open, and when

| Task | Open |
| --- | --- |
| Find out what the system has, and what's deprecated | [design-system.dsds.yaml](design-system.dsds.yaml) |
| Load the tokens and fonts, set the theme | [setup/](setup/AGENTS.md) |
| Choose a color, spacing, radius, shadow or text style | [tokens/](tokens/AGENTS.md) |
| Lay out a page, use the grid, stack layers, add motion | [styles/](styles/AGENTS.md) |
| Place or edit a component in a screen | [components/](components/AGENTS.md), then that component's file |
| Build a reusable page section or page layout | [patterns/](patterns/AGENTS.md) |
| Add an icon | [icons/](icons/AGENTS.md) |
| Write copy, check accessibility | [guidelines/](guidelines/AGENTS.md) |
| Build or change a prototype page for a project | [workflows/prototype/SKILL.md](workflows/prototype/SKILL.md) |
| Follow the rules of one project | [features/](features/AGENTS.md) |
| Change tokens, scale formulas or the token build | [../tokens/AGENTS.md](../tokens/AGENTS.md) |
| Change component code | [../components/AGENTS.md](../components/AGENTS.md) |
| Work inside the Figma file | [workflows/figma-ds-file/SKILL.md](workflows/figma-ds-file/SKILL.md) |
| Asana cards and the worklog | [workflows/asana-worklog/SKILL.md](workflows/asana-worklog/SKILL.md) |

## Registry
- [design-system.dsds.yaml](design-system.dsds.yaml): shared rules, a link to the spec of every component, and deprecated items with their replacements

## Setup
- [setup/getting-started.dsds.yaml](setup/getting-started.dsds.yaml): load the token CSS and fonts, set the theme, first component

## Tokens
- [tokens/tokens.dsds.yaml](tokens/tokens.dsds.yaml): themes, and when to use each token group and when not to
- [tokens/token-list.md](tokens/token-list.md): every token a screen may use, typography presets, shadows (generated)
- [tokens/semantic-tokens.md](tokens/semantic-tokens.md): semantic colors, the fallback when token-list has nothing (generated)

## Styles
- [styles/styles.dsds.yaml](styles/styles.dsds.yaml): breakpoints and grids, elevation and layer order, motion

## Components
- [components/avatar.dsds.yaml](components/avatar.dsds.yaml): Avatar (Figma avatar-image, avatar-icon, avatar-monogram, avatar-number)
- [components/avatar-group.dsds.yaml](components/avatar-group.dsds.yaml): AvatarGroup (Figma avatar-group)
- [components/avatar-label.dsds.yaml](components/avatar-label.dsds.yaml): AvatarLabel (Figma avatar-label)
- [components/badge.dsds.yaml](components/badge.dsds.yaml): Badge (Figma semi-rounded-badge, pill-badge, semi-rounded-icon-badge, circular-icon-badge, link-badge)
- [components/banner.dsds.yaml](components/banner.dsds.yaml): Banner (Figma banner)
- [components/button.dsds.yaml](components/button.dsds.yaml): Button (Figma semi-rounded-button, pill-button, Brand Button, Neutral Button, Error Button, Alpha Button)
- [components/card.dsds.yaml](components/card.dsds.yaml): Card (Figma vertical-news-card, horizontal-news-card, news-list-card, video-list-card)
- [components/checkbox.dsds.yaml](components/checkbox.dsds.yaml): Checkbox (Figma checkbox, text-checkbox)
- [components/circular-progress-bar.dsds.yaml](components/circular-progress-bar.dsds.yaml): CircularProgressBar (Figma circular-progress-bar)
- [components/divider.dsds.yaml](components/divider.dsds.yaml): Divider (Figma horizontal-divider, vertical-divider)
- [components/dropdown.dsds.yaml](components/dropdown.dsds.yaml): Dropdown (Figma dropdown-menu, _dropdown-option, _dropdown-group-header, List Item / Dropdown, List Item / Dropdown&Check)
- [components/icon-button.dsds.yaml](components/icon-button.dsds.yaml): IconButton (Figma semi-rounded-icon-button, circular-icon-button)
- [components/link-button.dsds.yaml](components/link-button.dsds.yaml): LinkButton (Figma link-button, link-icon-button)
- [components/nation-house-icon.dsds.yaml](components/nation-house-icon.dsds.yaml): NationHouseIcon (Figma Nation House Icons)
- [components/pagination.dsds.yaml](components/pagination.dsds.yaml): Pagination (Figma pagination, _pagination-number-button, _pagination-ellipsis)
- [components/progress-bar.dsds.yaml](components/progress-bar.dsds.yaml): ProgressBar (Figma progress-bar)
- [components/radio.dsds.yaml](components/radio.dsds.yaml): Radio (Figma radio, text-radio)
- [components/radio-group.dsds.yaml](components/radio-group.dsds.yaml): RadioGroup (no Figma set, built in code)
- [components/semi-circular-progress-bar.dsds.yaml](components/semi-circular-progress-bar.dsds.yaml): SemiCircularProgressBar (Figma semi-circular-progress-bar)
- [components/slider.dsds.yaml](components/slider.dsds.yaml): Slider (Figma slider, range-slider, slider-handle)
- [components/table.dsds.yaml](components/table.dsds.yaml): Table (Figma the 18 *-table-cell components on page 26)
- [components/tabs.dsds.yaml](components/tabs.dsds.yaml): Tabs (Figma segmented-tab, underline-tab, segmented-tab-group, underline-tab-group)
- [components/tag.dsds.yaml](components/tag.dsds.yaml): Tag (Figma the 14 tag sets on page 21)
- [components/tag-field.dsds.yaml](components/tag-field.dsds.yaml): TagField (Figma tag-field), experimental
- [components/text-field.dsds.yaml](components/text-field.dsds.yaml): TextField (Figma text-field, text-area)
- [components/toast.dsds.yaml](components/toast.dsds.yaml): Toast (Figma toast)
- [components/toggle.dsds.yaml](components/toggle.dsds.yaml): Toggle (Figma toggle)
- [components/tooltip.dsds.yaml](components/tooltip.dsds.yaml): Tooltip (Figma tooltip)
- Icon is in [icons/icon.dsds.yaml](icons/icon.dsds.yaml). Deprecated List Item is in [design-system.dsds.yaml](design-system.dsds.yaml)

## Patterns
- No pattern written yet. Patterns are recorded as prototype pages are approved, see [workflows/prototype/SKILL.md](workflows/prototype/SKILL.md). [patterns/_template.dsds.yaml](patterns/_template.dsds.yaml) is the template

## Icons
- [icons/icon.dsds.yaml](icons/icon.dsds.yaml): how to use Icon, sizes
- [icons/icon-names.md](icons/icon-names.md): every icon name by category (generated)

## Guidelines
- [guidelines/guidelines.dsds.yaml](guidelines/guidelines.dsds.yaml): writing rules and the shared accessibility rules

## Features
- [features/one-cms/AGENTS.md](features/one-cms/AGENTS.md): One CMS, the back office of the group's news websites
- Rules for one project are recorded in `features/<project>/` as its prototype pages are built. [features/_template/AGENTS.md](features/_template/AGENTS.md) is the template
