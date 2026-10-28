# One CMS

## Context
- One CMS is the back office of the Nation Group news websites (brand codes in `../../../docs/brand-codes.md`)
- It is used to create and manage news, articles, PR, videos and galleries
- It sets how the websites look (home page, menus, banners) and manages ads
- It tracks results on a Dashboard: page views, number of news items, and reporter statistics
- Design file: Figma `kMw46mRQEaL2s1ofpnSDgh` (CMS), starting frame node `13476-40325`. This is a project file, not the design system file `QgmoT5Uuvv3elB96F4nsTq`
- Prototype pages live in `../../../prototype/one-cms/`, with the Storybook title `Prototype/One CMS/<Page>`
- The Dashboard follows the Dashboard v2 section of the design file (section node `15508:32517`), not Dashboard v1 (chosen by the user 2026-10-28)
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
- News ranking MUST list 25 news items ranked by views, with the numbers from three sources: Pageviews, GA and Truehits
- News ranking MUST show today and the day before
- NEEDS CLARIFICATION: which of the three sources sets the rank order, or can the user choose the source
- NEEDS CLARIFICATION: are today and the day before two separate lists (a switch), or one list with two columns
- Number of news items created MUST have a filter by day, week, month and year
- Reporter statistics MUST show, per reporter, how many news items they created, how many are published and how many are not published yet
- Reporter statistics MUST have a filter by day, week, month and year
- NEEDS CLARIFICATION: does a week start on Monday, or is it the last 7 days. The same question for month and year
- NEEDS CLARIFICATION: does "not published yet" include drafts, items waiting for review and scheduled items, or only some of them
- NEEDS CLARIFICATION: does the number of news items count only news, or also articles, PR, videos and galleries

## Components
- Chosen with the user page by page, from `../../design-system.dsds.yaml`
- Login: TextField md, Checkbox sm, Button brand primary lg, LinkButton brand lg
- Dashboard: to be chosen before the page is built
- NEEDS CLARIFICATION: the system has no chart component. IF the Dashboard needs a chart THEN it MUST be proposed first, see Ask a person first in `../../../AGENTS.md`

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
