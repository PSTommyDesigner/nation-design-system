# One CMS

## Context
- One CMS is the back office of the Nation Group news websites (brand codes in `../../../docs/brand-codes.md`)
- It is used to create and manage news, articles, PR, videos and galleries
- It sets how the websites look (home page, menus, banners) and manages ads
- It tracks results on a Dashboard: page views, number of news items, and reporter statistics
- Design file: Figma `kMw46mRQEaL2s1ofpnSDgh` (CMS), starting frame node `13476-40325`. This is a project file, not the design system file `QgmoT5Uuvv3elB96F4nsTq`
- Prototype pages live in `../../../prototype/one-cms/`, with the Storybook title `Prototype/One CMS/<Page>`
- The Dashboard follows frame `Dashboard / Home D` (`15626:38637`) in the Dashboard v2 section (`15508:32517`). The user moved from frame C to D and approved the page on 2026-10-28
- The prototype uses Krungthep Turakij (`bkk`) as its example brand: logo, headlines and reporter names. Most sample data in the design file is from Tnews, and the design file stays Tnews (set by the user 2026-10-28). Colors stay on the core `ntg` tokens until the multi-brand theme layer exists
- NEEDS CLARIFICATION: which roles use One CMS (editor, reporter, admin, ad team) and what each role may see and do
- NEEDS CLARIFICATION: is it one CMS for every brand with a brand switch, or one CMS per brand

## Rules

### Pages in the first round
- The first round MUST cover two pages: Login and Dashboard

### Login
- Design frame `12967:4778`. The frame was changed on 2026-10-28 to match the 4 decisions below, so Figma and the prototype agree except for the logo
- The fields MUST be the bordered `text-field` md, with the label and placeholder "ชื่อผู้ใช้" and "รหัสผ่าน" and no hint. The underline field set was removed from the system on 2026-09-01
- The heading "เข้าสู่ระบบ" MUST use `page-heading-lg` (32/46 SemiBold). The old design used 30/44 Medium, which has no preset
- The form MUST be 4 columns wide on the v2022 desktop grid (392, columns 5 to 8), centered. The old width 400 is off the grid
- "ลืมรหัสผ่าน ?" MUST be a `link-button` brand lg without an icon, 16 from the sign-in button (`size-space-s2-sm`), because it goes to another page. It is not a tertiary button
- The logo is the brand's fixed-height logo from page 08 Logo of the design system file, shown 80 high as in the design (352 x 80 for `bkk`). There is no logo size token, so the size is set in the SVG file's `width` and `height`
- The page is built for desktop 1440 only. Smaller screens are not done yet
- NEEDS CLARIFICATION: how users sign in (username and password, company SSO, or both), and where the forgot password link leads

### Dashboard
- The Dashboard MUST have three sections, in this order
  1. News ranking
  2. Number of news items created
  3. Reporter statistics
- The page has the CMS header bar, then the page title "แดชบอร์ด" (`page-heading-lg`) with a line under it, then the three sections stacked at full width (padding 40 top and bottom, 24 at the sides)
- News ranking MUST list 40 news items ranked by views, in 4 columns of 10 (ranks 1 to 10, 11 to 20, 21 to 30, 31 to 40). The numbers in the design that restart at 1 in every column are wrong (set by the user 2026-10-28)
- Each item MUST show the rank in a circle, the headline on one line cut off with an ellipsis, and the views from three sources as gray `link-button` xs: PV (Pageviews), GA and TH (Truehits)
- The subtitle MUST say that PV is counted by the site itself, so it won't match GA and Truehits
- News ranking MUST have a search field (headline, category), a date range field, and a row of category tags (`pill-tag` lg, neutral). The chosen tag is primary, the others secondary. "ทั้งหมด" comes first and is chosen by default
- NEEDS CLARIFICATION: which of the three sources sets the rank order, or can the user choose the source
- NEEDS CLARIFICATION: the earlier rule asked for today and the day before. The approved design shows one date chosen in the date range field. Is that enough, or is a quick switch to the day before still needed
- Number of news items created MUST have a month filter and a chart type filter by day, week, month and year (bordered `Dropdown` md, not the underline field in the design), and two number cards: news created and views
- Number of news items created MUST have a bar chart at full width: news created and views per day of the month, with two y axes. The chart is a new ntgds component, built in its own session since 2026-10-28. Until it exists, the page shows a dashed placeholder box of the same width
- Reporter statistics MUST be a `Table` with these columns: number, reporter (name and desk), total, published, not published yet, last update. Every column except number sorts. Columns follow the Table alignment rule: the number column ("ที่") uses variant index (centered), and total, published and not published yet are counts, not money, so they use variant number (aligned to the start)
- Column headers MUST be in Thai (see Content). The design has them in English
- Reporter statistics MUST show, per reporter, how many news items they created, how many are published and how many are not published yet
- Reporter statistics MUST have a filter by day, week, month and year (`Tabs` segmented sm at the right of the section heading). Frame D has no filter, but this rule keeps it
- Reporter statistics MUST use the ntgds `pagination` below the table, full width with the numbers centered. The design used `Button Pagination` from an old library, and frame D was changed to the ntgds one on 2026-10-28
- The page is built for desktop 1440 only. Smaller screens are not done yet
- NEEDS CLARIFICATION: does a week start on Monday, or is it the last 7 days. The same question for month and year
- NEEDS CLARIFICATION: does "not published yet" include drafts, items waiting for review and scheduled items, or only some of them
- NEEDS CLARIFICATION: does the number of news items count only news, or also articles, PR, videos and galleries

## Components
- Chosen with the user page by page, from `../../design-system.dsds.yaml`
- Login: TextField md, Checkbox sm, Button brand primary lg, LinkButton brand lg
- Dashboard: Button pill sm (header menu, brand primary for the current page, neutral tertiary for the rest), Avatar md, TextField md, Tag pill lg neutral, LinkButton brand gray xs, Dropdown md, Table, Tabs segmented sm, Pagination md
- Built inside the story from tokens because the system doesn't have them: the rank number in a circle (32, the size of Avatar sm) and the number card (border, dot and number)
- NEEDS CLARIFICATION: should the rank number and the number card become ntgds components
- Chart: decided 2026-10-28 that it is a new ntgds component, not a one-off. It is being built in its own session. The dot colors on the number cards (`color-foreground-brand-primary` and `color-utility-u-blue-200`, as bound in the design) move to the chart's tokens once it exists

## Content
- Thai copy, with Buddhist Era years in dates
- Source names are written as they are: Pageviews, GA, Truehits

## Edge cases
- No data: no news yet on the chosen day, or a reporter with no news
- Error: a view source (Pageviews, GA or Truehits) fails to load while the others load
- Loading: each Dashboard section loads on its own
- Too long: long news titles in the ranking, long reporter names, large view numbers
- No permission: a user whose role may not see the Dashboard or another reporter's statistics

## Files
- `flows/` one file per flow
- `pages/` one spec per page
- `decisions/` one decision per file, such as `0001-<topic>.md`
