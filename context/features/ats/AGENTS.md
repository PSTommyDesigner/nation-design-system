# AI Adoption Tracker System (ATS)

## Context
- ATS shows executives how many apps employees have built with the Project Runbook, against a target of 2 apps per division per month, and which Runbook step each app is stuck on. Nobody types in data: every number comes from what the Runbook already produces in GitLab and the IT app register
- It replaces the old AI Adoption Tracker web page, which someone had to update by hand
- Users: executives, who see every company and only read. One admin role manages ATS user roles (ROLE-4 of base-instruction, because ATS has a database that the infra team runs)
- Design board: FigJam `cmFKQOIuV6Rpn1qdPbQcyS` (ATS - UX/UI Design), Double Diamond. Wireframes are in section 4 of the Solution Space page (frame `9:238`), the link map in section 5 (`26:151`)
- The prototype lives in its own repo `ats-prototype` (GitHub `PSTommyDesigner/ats-prototype`, on the user's machine at `~/ats-prototype`), moved out of ntgds on 2026-11-25 (set by the user). It installs ntgds from GitHub as the package `nation-design-system` at a pinned commit and imports `nation-design-system/components/<Name>`. The rules for ATS stay here in ntgds. Storybook title `Page (Prototype)/AI Adoption Tracker System/<page>`. The full name is used in Storybook, the short name ATS on the page (set by the user 2026-11-24)
- Every number in the prototype is sample data from `src/data.ts` in `ats-prototype`. The company and division list is the real Nation House chart of 23 Nov 2569 (6 companies, 40 divisions)
- ATS follows the Project Runbook of the base-instruction repo and MUST NOT change or add Runbook steps

## Rules

### Counting
- An app counts once, in the month it first reaches production (end of Runbook step 20). A new version of the same app does not count again
- A division is one of the 40 divisions on the Nation House chart. Each has a target of 2 apps a month, 80 for the group
- Months are counted on their own: nothing carries over to the next month
- Apps that reached production before ATS existed count in the month they really did (counted backwards), so users MUST be able to pick past months
- A division at risk is one that has not reached its target this month and has no app in Phase 4 ใช้งานจริง (steps 16 to 20)
- Phases MUST follow the Project Runbook board as of 2026-11-26, 5 phases (set by the user, who merged the old Phase 2 ขอโปรเจกต์ and Phase 3 สร้างและทดสอบบนเครื่อง because both are development): Phase 1 ออกแบบ, Phase 2 พัฒนา (steps 1 to 7), Phase 3 ทดสอบ (steps 8 to 15, the Merge Request check), Phase 4 ใช้งานจริง (steps 16 to 20, staging then production), Phase 5 ดูแลหลังขึ้นแอป. Step numbers 1 to 20 are the same as in base-instruction. Lines in this file written on 2026-11-24 and 2026-11-25 that say P4, P5 or P6 use the old 6-phase numbers: read them one lower
- ATS MUST NOT have any field where a person types or changes an app's status
- NEEDS CLARIFICATION: Phase 1 ออกแบบ has no repo yet, so where does ATS read it from

### Every page
- ATS is a web application that MUST work on desktop and mobile (set by the user 2026-11-25, after a mobile-first round on 2026-11-24). The layout switches on the width of the app frame with a container query: desktop from 1024 (`--ntg-grid-breakpoint-tablet-h`, written as a number because a query can't read a variable), mobile below. The page fills the full width of its frame with no 1440 limit (set by the user 2026-11-26), and the mobile frame is at most `--ntg-grid-breakpoint-mobile` (375) wide, centered on the same white background. In the prototype app the only thing outside the app is a full-width control bar at the top (screen, role, and the sample data badge, which moved there from the app header)
- On desktop: the month field and the company filter share one row, the number boxes sit on one row with the overview box twice as wide, a chart and a list sit side by side in two equal columns, and form pages (page 5, เพิ่มผู้ใช้, the error page) are at most `--ntg-grid-breakpoint-tablet-v` (768) wide. On mobile everything stacks in one column with number boxes two to a row
- NEEDS CLARIFICATION: the desktop layout came from the mobile wireframes, there is no desktop wireframe on the board yet
- Every page has the ATS header from the pattern `app-header`: the logo at the start, which goes back to page 1 ภาพรวม (set by the user 2026-11-24), and at the end the sample data badge and, for the admin role only, the "จัดการ role" button that opens page 5
- Every page except page 1 MUST show a breadcrumb under the header that starts with "ภาพรวม", so users know where they are (set by the user 2026-11-24). On page 4 the breadcrumb follows the way the user came: ภาพรวม › รายการแอป › <app>, or ภาพรวม › <division> › <app>
- Every page ends with the version and commit line (UI-8)
- The page background MUST be `color-background-general-primary`, as are boxes that hold a chart or a list, and boxes stand out from the page with the shadow `shadows-center-sm` (set by the user 2026-11-25, after trying `shadows-center-md` and a `color-background-general-secondary` page)
- A number box MUST take its background from what its data means (set by the user 2026-11-25): positive is green (`color-utility-u-green-50`), negative is red (`color-utility-u-red-50`), in between is yellow (`color-utility-u-yellow-50`), and an overview number is blue (`color-utility-u-brand-50`). These are step 50, lowered from step 100 by the user on 2026-11-26, and a box that can be pressed goes to step 100 on hover. On page 1: the production box is blue, มีครบ 2 แอปหรือมากกว่า green, มีไม่ครบ yellow, ยังไม่มีแอปเลย and ฝ่ายที่เสี่ยงไม่ถึงเป้า red. On page 2 this month's result follows the division's status and the two count boxes are blue. On page 4 the current step is green once the app is in production, else blue. Boxes that hold a chart or a list stay `color-background-general-primary`. Color MUST repeat what the words in the box already say, never carry the meaning alone
- A box whose background is not white MUST use the shadow `shadows-center-xs`. White boxes keep `shadows-center-sm` (set by the user 2026-11-25)
- A part that sits inside another box MUST NOT have its own border, background, padding or shadow, so boxes don't nest (set by the user 2026-11-25). Where such a part can be pressed to filter, its label and number turn `color-text-brand-primary` while it is chosen, in place of the brand border a standalone box uses
- The logo follows page 08 Logo: `ats-fixed-height.svg` 40 high for the header, `ats-1-1.svg` 40 x 40, and `ats.svg` 48 x 48 as the favicon. The design system team MUST be told before it is added to page 08
- The user sent the square logo `ats-1-1.svg` (40 x 40, `src/assets/` in `ats-prototype`) on 2026-11-24 and replaced it with a new design on 2026-11-25. Its blue is the same as `--ntg-color-brand-600`. Until `ats-fixed-height.svg` arrives the header shows the square logo at 32 with the word ATS in `title-xl` beside it, after trying 40 and 24 (set by the user 2026-11-25). The file stays 40 x 40 as page 08 Logo says, and the header borrows the space token `size-space-s3-xs` (32) for its size because the system has no logo size token
- NEEDS CLARIFICATION: should the system have a logo size token, or a header-sized logo kind
- NEEDS CLARIFICATION: `ats-fixed-height.svg` and the 48 x 48 favicon `ats.svg` are not made yet

### Page 1 ภาพรวม (approved by the user 2026-11-24)
- Page 1 is the whole group at once, with a company filter in the page (set by the user 2026-11-24)
- Order: updated time, month, company filter, the production box, the two boxes มีครบ 2 แอปหรือมากกว่า and มีไม่ครบ on one row, the two boxes ยังไม่มีแอปเลย and ฝ่ายที่เสี่ยงไม่ถึงเป้า on one row, apps by Runbook Phase, the division list, then "ดูทั้ง <n> ฝ่าย"
- The production box MUST show "ขึ้น production ครั้งแรก เดือนนี้" as "<n> / 80 แอป" with a `ProgressBar`. "มีครบ 2 แอปหรือมากกว่า" and "มีไม่ครบ" are boxes of their own under it, each with the number of divisions and of apps (moved out of the production box by the user 2026-11-25)
- A click on "<n> / 80 แอป" opens page 3 filtered to apps first in production this month. A click on any of the four division boxes filters the division list to that group, and a second click shows every division again
- Apps by Runbook Phase MUST use the `BarChart` and list P1 to P6 under it with each Phase's name instead of a short code (set by the user 2026-11-24). `BarChart` bars can't be pressed, so the P1 to P6 rows under the chart are what opens page 3 filtered to that Phase
- The division list replaces a table on mobile. It is sorted from most at risk, shows the first 5, and each row opens page 2 for that division
- The company filter is a row of `Tag` sm pill brand, one choice at a time. The chosen tag is primary, the others secondary with default gray
- NEEDS CLARIFICATION: `Tag` has no selected state for a single choice. Primary on the chosen tag is a stand-in

### Navigation in the prototype
- Every page is one story in `src/` of `ats-prototype`, and all of them run the same `AtsApp` (`shell.tsx`), so a click moves between pages inside one story as the link map on the board says. Each story only sets the page it opens on
- The Storybook control `role` switches between admin (ผู้ดูแล) and executive (ผู้บริหาร)
- Pages 2 to 5 and the error page were approved by the user on 2026-11-25

### Page 2 รายฝ่าย
- Opens from a division row on page 1. Breadcrumb: ภาพรวม › <division>
- Order: the division name with "ฝ่ายใน <company code> <company name>" under it, month, this month's result, two boxes, the result of the last 6 months, the division's apps
- This month's result MUST show "<n> / 2 แอป" with a `ProgressBar` and the same status `Badge` as the division row on page 1
- The two boxes "แอปใน P5 ขึ้นระบบ" and "แอปทั้งหมดของฝ่าย" only show numbers and can't be pressed
- The last 6 months MUST be counted backwards from the apps' first production month. The chart is the `BarChart` with the apps as bars and the target of 2 as a line
- NEEDS CLARIFICATION: the wireframe marks a month that reached the target with a darker bar. `BarChart` can't color one bar, so the target line stands in
- The app list MUST put apps first in production this month first, then apps not in production yet from the Phase closest to production, then apps from earlier months, newest first. Each row shows the current step or the production date, and opens page 4

### Page 3 รายการแอป
- Opens from "<n> / 80 แอป" on page 1 (filtered to apps first in production this month) or from a P1 to P6 row (filtered to that Phase). The line under the title says which one it came from. Breadcrumb: ภาพรวม › รายการแอป
- Filters: Phase as a row of `Tag` (ทุก Phase, P1 to P6, one at a time, as on page 1), then company and division as `Dropdown` md side by side. The division list follows the chosen company
- The filter "first in production this month" shows as a closable `Tag` brand primary, so users can see it and take it off
- Phase is the app's status now and doesn't depend on the month
- A line above the list says how many apps match and in which Phase, and is announced when it changes (`aria-live` polite)
- The list is sorted by Phase, then by step, closest to production first. It shows 5 apps, then "ดูอีก" adds 10 at a time
- IF no app matches THEN show a `Banner` type warning, level section, size md, without a close button, titled "ไม่มีแอปตามตัวกรองนี้", with the action "ล้างตัวกรองทั้งหมด" that clears every filter, in place of the list box and with announce on (UI-1, set by the user 2026-11-25)

### Page 4 รายละเอียดแอป
- Opens from an app row on page 2 or page 3. The breadcrumb follows the way the user came, and every earlier part goes back to that page with its filters as they were
- Order: the app name with division and company under it, a `Badge` with the Phase and its name, the current step, the app creator, the path through the Runbook
- The current step MUST say the step number and name, what it is waiting for and who does it, as the Runbook names them (for example "รอ: IT ลงทะเบียนแอปและใส่ค่า (ขั้น 13)"), and since when it has been on that step. For P6 it says when the app reached production, for P1 that it has no repo yet
- The app creator shows the name from the employee system and the employee ID. ATS keeps only the ID (DATA-1)
- The path through the Runbook lists P1 to P6. Done Phases show their step range and the date they ended, the current Phase opens into its steps (P4 lists steps 8 to 15), and later Phases are grey
- Page 4 MUST NOT have any button that changes an app's status. A line under the path says the status follows GitLab
- NEEDS CLARIFICATION: the names of steps 1, 2, 4, 5, 7 and 17 to 20 are not in the prototype yet. They MUST come from the Project Runbook before the real app is built

### Page 5 จัดการ role (admin only)
- Opens from the "จัดการ role" button in the header. Breadcrumb: ภาพรวม › จัดการ role
- Order: title with the number of users and admins, the search field (`TextField` md with the search icon, label "ค้นหาผู้ใช้"), the "เพิ่มผู้ใช้" button (`Button` brand primary md with the person-add icon), the user list, the rule line
- Each user row shows the name, the employee ID and a role `Dropdown` sm with ผู้บริหาร and ผู้ดูแล. A change shows a success `Toast` through `ToastStack`
- Users MUST NOT change their own role, and the last admin MUST NOT be lowered (ROLE-4). The role field of those rows is disabled, with a line under the name saying why
- Search MUST send its value in the request body, never in the URL (DATA-4)
- IF an executive opens page 5 THEN show that the page is for admins only, with a button back to page 1

### Page 5 เพิ่มผู้ใช้
- Breadcrumb: ภาพรวม › จัดการ role › เพิ่มผู้ใช้
- Fields: employee ID (`TextField` md, required, numbers only) and role (`RadioGroup` md, ผู้บริหาร "ดูอย่างเดียว" first and chosen by default, ผู้ดูแล "จัดการ role ได้"). Buttons ยกเลิก (neutral secondary) and เพิ่มผู้ใช้ (brand primary), side by side at full width
- Errors show under the field and say what is wrong and how to fix it (UI-5): an empty field, an ID that is not 5 digits, an ID not in the employee system, or a person who is already an ATS user
- After adding, go back to page 5 with a success `Toast`

### Error page (UI-3)
- Shown when a whole page can't load, from any page, never a blank page. No breadcrumb
- It says "โหลดข้อมูลไม่สำเร็จ", that ATS can't read GitLab for now, and the time of the last data it read. No technical words and no error code for executives
- Two buttons at full width: ลองใหม่ (brand primary lg with the refresh icon) loads the same page again, กลับหน้าแรก (neutral secondary lg with the home icon) goes to page 1
- NEEDS CLARIFICATION: ntgds has no illustration for an error page. The prototype shows the error-circle `Icon` at size 2xl

## Components
- Page 1: Badge pill sm (status and sample data), Button neutral secondary xs (จัดการ role), Dropdown md (month), Tag pill sm brand (company filter), ProgressBar sm and xs, BarChart, LinkButton neutral md (ดูทั้ง)
- Page 2: Dropdown md, Badge pill sm, ProgressBar sm, BarChart (bars and a line)
- Page 3: Tag pill sm brand (Phase filter, and the closable this-month filter), Dropdown md (company, division), LinkButton (ดูอีก), Banner warning md (no app matches)
- Page 4: Badge pill md, Icon (check in the path)
- Page 5: TextField md, Button brand primary md, Dropdown sm, Toast through ToastStack, TextField md with error, RadioGroup md, Button neutral secondary and brand primary md full width
- Error page: Icon 2xl, Button brand primary and neutral secondary lg full width
- Built inside the story from tokens because the system doesn't have them (candidate components, NEEDS CLARIFICATION for the design system team), all in `src/ats.module.css` of `ats-prototype`:
  - the number box that filters the list when pressed (`button.tile`)
  - the division row: name and company, the result with a small `ProgressBar`, and a status `Badge`
  - the app row: name, division and company, the step line, and a Phase `Badge`
  - the breadcrumb, put together from `LinkButton` neutral sm and the chevron-right `Icon`
  - the path through the Runbook (a vertical stepper with done, current and later states)
  - the user row: name, ID and a role `Dropdown`
- The header is recorded as the pattern `app-header` (`../../patterns/app-header.dsds.yaml`)

## Content
- Thai copy, with Buddhist Era years in dates
- Words: ขึ้นแอป means first reaching production. ฝ่าย is the division in the 2-app target. Phase means a Project Runbook Phase
- On screen write "Instruction", not "Runbook", and "Base Instruction" for the whole set of rules, because the Runbook sits inside Base Instruction (set by the user 2026-11-26): "แอปทั้งหมดตาม Phase ของ Instruction", "เส้นทางตาม Instruction". This file still says Runbook where it means the Project Runbook board
- Write "production" and "staging" as they are. Write "role", not สิทธิ์, for the two ATS roles ผู้บริหาร and ผู้ดูแล
- Status labels in the division list: เสี่ยง, ยังไม่มี, ขาด 1, ถึงเป้า

## Edge cases
- No data: a filter with no division or no app shows a short line in place of the list (UI-1)
- Error: when a whole page can't load, show the error page, never a blank page (UI-3)
- Too long: long division and app names wrap, the numbers stay on one line
- No permission: the "จัดการ role" button is not shown to executives, and page 5 is for admins only

## Files
- `flows/` one file per flow
- `pages/` one spec per page
- `decisions/` one decision per file, such as `0001-<topic>.md`
