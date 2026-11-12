# One CMS

## Context
- One CMS is the back office of the Nation Group news websites (brand codes in `../../../docs/brand-codes.md`)
- It is used to create and manage news, articles, PR, videos and galleries
- It sets how the websites look (home page, menus, banners) and manages ads
- It tracks results on a Dashboard: page views, number of news items, and reporter statistics
- Design file: Figma `kMw46mRQEaL2s1ofpnSDgh` (CMS), starting frame node `13476-40325`. This is a project file, not the design system file `QgmoT5Uuvv3elB96F4nsTq`
- Requirements from the first round of meetings with 8 BU, Smart ONE CMS (Meet 1) (problems, features by module, AI along the news path, proposed features, things to improve), are summed up in `smart-one-cms-meet-1.md`, from the Google Sheet the user shared on 2026-11-12. Read it before building or changing a page. It is background, not approved work: the team has not agreed on which features to build (set by the user 2026-11-12), so MUST NOT change prototype UI from it until the user says so
- Prototype pages live in `../../../prototype/one-cms/`, with the Storybook title `Page (Prototype)/One CMS/<Page>`
- The Dashboard follows frame `Dashboard / Home` (`13060:8732`) in the Dashboard v1 section (`13060:8503`). The user approved the page on 2026-10-28 from an earlier frame (`Dashboard / Home D`), which the user later moved to this frame (checked 2026-11-11)
- The prototype uses Krungthep Turakij (`bkk`) as its default brand: headlines and reporter names are sample data for `bkk`. Most sample data in the design file is from Tnews, and the design file stays Tnews (set by the user 2026-10-28). Colors stay on the core `ntg` tokens until the multi-brand theme layer exists
- One prototype MUST serve every BU in presentations (set by the user 2026-11-11): the BU menu on the Storybook toolbar (`globalTypes.brand` in `.storybook/preview.tsx`, list in `prototype/one-cms/brands.ts`) switches the logo on Login and Dashboard for all 12 brands in `docs/brand-codes.md`. Sample headlines and colors stay the same for every BU. A link with `&globals=brand:<code>` opens with that BU
- NEEDS CLARIFICATION: which roles use One CMS (editor, reporter, admin, ad team) and what each role may see and do
- NEEDS CLARIFICATION: is it one CMS for every brand with a brand switch, or one CMS per brand

## Rules

### AI assistant น้องเนเน่
- Every One CMS page except Login MUST show the AI assistant น้องเนเน่ floating over the page, as in the old system, following frame `Ai` (`15669:14538`): the mascot image 80 x 80 with a `pill-tag` md neutral primary under it (set by the user 2026-11-12, replacing the xs brand in the design). Built in `prototype/one-cms/AiAssistant.tsx`
- The tag MUST type its text one character at a time like a typewriter, 0.09 seconds per character, without a caret (set by the user 2026-11-12), in this order: "สวัสดีครับ!!" held 3 seconds after it is fully typed, "มีอะไรให้น้องเนเน่ช่วยไหมครับ" held 3 seconds, then "น้องเนเน่" held 3 minutes before it starts again from "สวัสดีครับ!!" (set by the user 2026-11-12). Thai vowels above and below and tone marks are typed together with their consonant. With reduced motion each text shows whole at once
- น้องเนเน่ MUST start at the top right under the CMS header bar, 24 from the header and from the right edge for the longest greeting (`size-space-s2-lg`), and MUST be draggable anywhere while the mascot and the tag stay inside the screen. The position is not remembered: a reload puts it back. Arrow keys move it 16 at a time (`size-space-s2-sm`) for people who can't drag (WCAG 2.5.7). It is one button named "น้องเนเน่ ผู้ช่วย AI ลากหรือกดลูกศรเพื่อย้ายตำแหน่ง", on `layer-floating` so it sits above the header and under a Modal
- The mascot is a raster image from the design file (1024 x 1024), saved as a 160 x 160 PNG inside `assets/nation-ai.svg`, whose `width` and `height` set 80 because the system has no image size token
- NEEDS CLARIFICATION: what a click does. The team has not agreed on the AI features (see `smart-one-cms-meet-1.md`), so the button does nothing yet

### CMS header bar
- The CMS header bar MUST stick to the top, slide up out of view when the page scrolls down, and slide back when it scrolls up (set by the user 2026-11-12). It always shows while the page is within the header's height from the top. It uses `layer-sticky`, `motion-duration-default` with `motion-easing-enter` to show and `motion-easing-exit` to hide, and no slide with reduced motion. Built in `prototype/one-cms/useHideOnScroll.ts` so every page with the header uses the same behavior

### Pages in the first round
- The first round MUST cover two pages: Login and Dashboard

### Login
- Design frame `12967:4778`. The frame was changed on 2026-10-28 to match the 4 decisions below, so Figma and the prototype agree except for the logo
- The fields MUST be the bordered `text-field` md, with the label and placeholder "ชื่อผู้ใช้" and "รหัสผ่าน" and no hint. The underline field set was removed from the system on 2026-09-01
- The heading "เข้าสู่ระบบ" MUST use `page-heading-lg` (32/46 SemiBold). The old design used 30/44 Medium, which has no preset
- The form MUST be 4 columns wide on the v2022 desktop grid (392, columns 5 to 8), centered. The old width 400 is off the grid
- "ลืมรหัสผ่าน ?" MUST be a `link-button` brand lg without an icon, 16 from the sign-in button (`size-space-s2-sm`), because it goes to another page. It is not a tertiary button
- The logo is the brand's fixed-height logo from page 08 Logo of the design system file, shown 80 high as in the design (352 x 80 for `bkk`). There is no logo size token, so the size is set in the SVG file's `width` and `height`. Logos wider than the form (`tnt` 416, `spn` 404) shrink to the form width and keep their ratio
- The page is built for desktop 1440 only. Smaller screens are not done yet
- NEEDS CLARIFICATION: how users sign in (username and password, company SSO, or both), and where the forgot password link leads

### Dashboard
- The Dashboard MUST have three sections, in this order
  1. News ranking
  2. Number of news items created
  3. Reporter statistics
- The CMS header bar MUST show only the brand logo `Logo Fixed Height 40` from page 08 Logo of the design system file, at its own size (40 high, `<slug>-logo-40.svg`), with the brand name as its alt text and no brand name text beside it (set by the user 2026-11-12, replacing the square logo with the name)
- The page has the CMS header bar, then the three sections stacked at full width (padding 40 top and bottom, 24 at the sides)
- The Dashboard MUST NOT have a page header (`_Header / Page`) under the CMS header bar (set by the user 2026-11-11). The user removed it from the design file the same day, so Figma and the prototype agree
- News ranking MUST show the top 15 news items ranked by views, in 3 columns, ordered left to right and then top to bottom, following frame `Dashboard / Home` (`13060:8732`): cards 448 wide, 24 between columns, 16 between rows (set by the user 2026-11-11, replacing 40 items in 4 columns because the old list was hard on the eyes). The sample data keeps 40 items per category and shows the first 15
- Each item MUST follow the card `card / pin` (`15658:20767`), 92 high (updated by the user 2026-11-12): an image area at the start, full height, ratio 92:48, with the rank in a box 32 x 22 at the top left corner and the views in a box 22 high at the top right corner (both `label-sm`); then the headline (`title-xs`) at the top left of a box 2 lines high, cut off with an ellipsis, so a one-line headline doesn't float to the middle (set by the user 2026-11-12); then, 6 below, one row with the category at the start and "เก็บไว้เขียนข่าวใหม่" at the end
- On hover the card MUST follow `hover=true` of `card / pin` (updated by the user 2026-11-12): the background `color-background-general-primary-hover`, the shadow `shadows-bottom-md`, the border `color-border-general-primary-hover` on the card, the image area and both boxes, and the headline darker, from `color-text-general-section-heading` to `color-text-general-heading`. The rank box turns to `color-background-brand-solid` with `color-text-general-const-white`. The views box turns to `color-background-general-primary-hover` and keeps `color-text-general-section-heading`. At rest both boxes use `color-background-general-primary` (the design has raw white) with the border `color-border-general-primary`. Brand colors are no longer used on the card border or the headline
- The views MUST be PV (Pageviews) only, in the box at the top right of the image: the `visibility` icon 12 (the design uses the old `remove_red_eye`), 4 before the number, 8 padding at the sides. GA and Truehits are not shown anywhere on the Dashboard (set by the user 2026-11-12). The category MUST be `semi-rounded-tag` sm neutral secondary
- "เก็บไว้เขียนข่าวใหม่" MUST be `pill-tag` sm neutral with the `edit` icon. It replaces the basket button and collects news so AI can draft a story on the Article page (the design said "ปักหมุด" for a while). A click keeps the news and turns the tag primary, another click removes it, in the card and in the news detail `Modal` alike (set by the user 2026-11-12). The tag reports its state with `aria-pressed`
- A click anywhere on the card MUST open the news detail `Modal`, except "เก็บไว้เขียนข่าวใหม่", which works on its own (set by the user 2026-11-11). The headline is the button and its click area covers the card, so the keyboard reaches it
- The prototype has no news images: the image area of the card MUST be `MockupMedia` kind image size sm, and the 16:9 image in the news detail `Modal` MUST be `MockupMedia` kind image size xl ratio 16:9 (set by the user 2026-11-12, replacing the plain gray fill; the ratio prop replaced a hand-written aspect ratio the same day). The parent box owns the border and corners, and in the card also the 92:48 ratio, which the ratio prop doesn't offer. Corners use the card radius (4): the design has 8 and 6 as raw values, and the system has no token for them
- NEEDS CLARIFICATION: where the kept news go and how the Article page uses them (the button's own click does nothing else yet), and whether the kept list lasts after a reload (the prototype forgets it)
- The subtitle MUST read "ข้อมูลปัจจุบัน และข้อมูลย้อนหลัง 24 ชั่วโมง" and still say that PV is counted by the site itself, so it won't match GA and Truehits (set by the user 2026-11-11)
- News ranking MUST NOT have a search field (removed by the user 2026-11-12). The filter row has the date range field (`TextField` md with the `calendar` icon, first of 4 columns) and next to it the kept news button, then the row of category tags (`pill-tag` lg, neutral). The chosen tag is primary, the others secondary. "ทั้งหมด" comes first and is chosen by default
- The date range field MUST open a calendar to pick one day, a range of days, or a whole month (set by the user 2026-11-12). ntgds has no date picker, so it was proposed to the ntgds session the same day as a new component. Until it exists the field only shows the calendar icon and does nothing
- The kept news button MUST be `Button` neutral secondary semi-rounded md with the `close` icon at the right, titled "ข่าวที่เก็บไว้เขียนข่าวใหม่" with the count in brackets first when news are kept, such as "(2) ข่าวที่เก็บไว้เขียนข่าวใหม่", and disabled when none are kept (set by the user 2026-11-12). It lines up with the bottom of the date range box. A click opens a confirm `Modal` sm titled "ยกเลิกข่าวที่เก็บไว้ทั้งหมด" with the count in the description and two buttons, "ไม่ยกเลิก" (neutral secondary) and "ยกเลิกทั้งหมด" (error primary), which clears every kept news item
- Choosing a category tag MUST change the ranked items to that category (set by the user 2026-11-11). The prototype has sample data for "ทั้งหมด", "เศรษฐกิจ" and "การเงิน" only: a category list starts with its items from "ทั้งหมด" at the same views, then more sample items. The other categories show a `Banner` type warning, level section, size md, without a close button, titled "ยังไม่มีข่าวในหมวด<name>", in place of the cards, with announce on because it appears after the user picks a category (set by the user 2026-11-12). Toast is not used: its spec says must-not for anything the user must still see
- NEEDS CLARIFICATION: which of the three sources sets the rank order, or can the user choose the source
- NEEDS CLARIFICATION: the earlier rule asked for today and the day before. The approved design shows one date chosen in the date range field. Is that enough, or is a quick switch to the day before still needed
- Number of news items created MUST have a month filter and a chart type filter by day, week, month and year (bordered `Dropdown` md, not the underline field in the design), and two number cards: news created and views
- Number of news items created MUST have the ntgds `BarChart` at full width: news created and views per day of the month, with two y axes. News created is the bars on the right axis and views is the line on the left axis
- Reporter statistics MUST be a `Table` with these columns: number, reporter (name and desk), total, published, not published yet, last update. Every column except number sorts. Columns follow the Table alignment rule: the number column ("ที่") uses variant index (centered), and total, published and not published yet are counts, not money, so they use variant number (aligned to the start)
- Column headers MUST be in Thai (see Content). The design has them in English
- Reporter statistics MUST show, per reporter, how many news items they created, how many are published and how many are not published yet
- Reporter statistics MUST have a filter by day, week, month and year (`Tabs` segmented sm at the right of the section heading). The design frame has no filter, but this rule keeps it
- Reporter statistics MUST use the ntgds `pagination` below the table, full width with the numbers centered. The design used `Button Pagination` from an old library, and the design frame was changed to the ntgds one on 2026-10-28
- Clicking a ranked headline MUST open the news detail `Modal` (md, no header, set by the user 2026-10-28) following frame `Modal / Dashboard v2` (`15626:38085`): a 16:9 image with the circular close button over its top right and the rank in the same box as the card (32 x 22, `label-sm`) at its top left corner, in the card's rest colors; a row with Pageviews only as a `pill-tag` sm neutral with the `visibility` icon (GA and Truehits removed by the user 2026-11-12) and the news ID with a copy button at the end; the headline (`title-lg`); the news excerpt (`body-md`, `color-text-general-supporting-text`, not cut off; sample excerpts per headline in `prototype/one-cms/excerpts.ts`); the created, edited and published lines with date, time and author; then, last, the same row as the card: the category `semi-rounded-tag` sm at the start and "เก็บไว้เขียนข่าวใหม่" `pill-tag` sm with the `edit` icon at the end (rank box, view tag, excerpt and the last row set by the user 2026-11-12, not in the Figma frame yet)
- Clicking a reporter's name in the table MUST open the reporter news `Modal` (lg, decided with the user 2026-10-28, no Figma frame yet): the header is `AvatarLabel` lg with the name and desk, the description is the total count, and the body is `Tabs` with published and not published yet, each listing news as `Card` variant list
- NEEDS CLARIFICATION: should a click anywhere on a reporter row open the modal. The Table has no row click yet, so only the name opens it
- The page is built for desktop 1440 only. Smaller screens are not done yet
- NEEDS CLARIFICATION: does a week start on Monday, or is it the last 7 days. The same question for month and year
- NEEDS CLARIFICATION: does "not published yet" include drafts, items waiting for review and scheduled items, or only some of them
- NEEDS CLARIFICATION: does the number of news items count only news, or also articles, PR, videos and galleries

## Components
- Chosen with the user page by page, from `../../design-system.dsds.yaml`
- Login: TextField md, Checkbox sm, Button brand primary lg, LinkButton brand lg
- Every page except Login: Tag pill md neutral primary (AI assistant น้องเนเน่)
- Dashboard: Banner warning md (beta, empty category), Button neutral secondary semi-rounded md (kept news), Button neutral secondary and error primary (confirm Modal sm), Button pill sm (header menu, brand primary for the current page, neutral tertiary for the rest), Avatar md, TextField md, Tag pill lg neutral (category filter), semi-rounded sm neutral and pill sm neutral (rank card and news detail Modal), Dropdown md, Table, Tabs segmented sm, Pagination md, BarChart, Modal md and lg (beta), MockupMedia image sm and xl (beta), IconButton neutral tertiary xs, AvatarLabel lg, Tabs underline md, Card list
- Built inside the story from tokens because the system doesn't have them: the rank card `card / pin` (image area, rank box, border and hover, with the system `Tag` inside) and the number card (border, dot and number)
- NEEDS CLARIFICATION: should the rank card and the number card become ntgds components
- Chart: the ntgds `BarChart` from page 29 Chart (decided 2026-10-28 to be a system component, not a one-off). The dots on the number cards use the chart's tokens (`chart-color-series-1` for news created, `chart-color-line` with `chart-color-point-fill` for views) so they match the chart. The design file still binds `color-foreground-brand-primary` and `color-utility-u-blue-200`

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
- `smart-one-cms-meet-1.md` Smart ONE CMS (Meet 1), summary of the 8 BU requirement sheet
- `flows/` one file per flow
- `pages/` one spec per page
- `decisions/` one decision per file, such as `0001-<topic>.md`
