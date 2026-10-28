# One CMS

## Context
- One CMS is the back office of the Nation Group news websites (brand codes in `../../../docs/brand-codes.md`)
- It is used to create and manage news, articles, PR, videos and galleries
- It sets how the websites look (home page, menus, banners) and manages ads
- It tracks results on a Dashboard: page views, number of news items, and reporter statistics
- Design file: Figma `kMw46mRQEaL2s1ofpnSDgh` (CMS), starting frame node `13476-40325`. This is a project file, not the design system file `QgmoT5Uuvv3elB96F4nsTq`
- Prototype pages live in `../../../prototype/one-cms/`, with the Storybook title `Prototype/One CMS/<Page>`
- NEEDS CLARIFICATION: which roles use One CMS (editor, reporter, admin, ad team) and what each role may see and do
- NEEDS CLARIFICATION: is it one CMS for every brand with a brand switch, or one CMS per brand

## Rules

### Pages in the first round
- The first round MUST cover two pages: Login and Dashboard

### Login
- NEEDS CLARIFICATION: how users sign in (username and password, company SSO, or both), and whether there is a forgot password flow

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
- To be chosen with the user before the first page is built, from `../../design-system.dsds.yaml`
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
