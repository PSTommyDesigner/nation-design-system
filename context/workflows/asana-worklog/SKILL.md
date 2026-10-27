---
name: asana-worklog
description: >-
  Create, update, move or close Asana cards in the Design Process 2026 project, name a task, set its dates
  or custom fields, and write or push the daily, task or monthly worklog. Use for any Asana API call or worklog task.
---

# Asana cards and the worklog

Official rule files (Thai), read the one the task needs:
- Task names and the 5-part description template: `docs/rules/asana-task-naming.md`
- Worklog: where it lives, how to write it, how it goes to Asana, the date cycle, the scripts: `docs/rules/worklog.md`. Change worklog rules in that file

IDs, statuses and fields are in [reference.md](reference.md). The token is `ASANA_TOKEN` in `.env`. MUST NOT print or paste it.

## Ask first
- Creating, editing or deleting a task in Asana: ask first, every time
- Push timing has 2 kinds, set by the user 2026-08-27. Don't mix them up
- Daily worklog (the whole day): push to the subtasks `01 งานที่ทำ` and `02 งานค้าง` of the month's summary card at 16:30, automatically. No approval needed and don't ask again. Just report that it was pushed
- Task worklog (one card only): update it before closing the card, but always wait for the user's confirmation first

## Creating a task
- The board columns are not sections. They are the statuses of the custom task type `Design Request`. The project has one section, `No value`, which holds every task. MUST NOT create a section
- MUST send these 3 fields, or the task becomes a plain task and lands in the `No value` column (a mistake made on 2026-08-05): `resource_subtype: "custom"`, `custom_type: "1212577985434838"`, `custom_type_status_option: "<status gid>"`
- A task already created as a plain task can be converted with `PUT /tasks/{gid}` sending all 3 fields together. Sent one by one they fail with `custom_types_require_custom_resource_types`
- A new task normally starts at `Incoming Brief / Backlog`
- Set every custom field listed in [reference.md](reference.md)
- The description MUST use the 5-part template (`Problem`, `Goal`, `Requirements`, `Figma File`, `Reference`) sent as `html_notes`. Never a loose paragraph (a mistake made on 2026-08-26, because nobody had written the template down). The full template is in `docs/rules/asana-task-naming.md`, section "Description ของ Task"
- Name: `[System]-[Feature] + Action + Page Name / UI Name + (Context)`, for example `[Script Pro]-[List] Design หน้า Script List (TV View)`
  - The `-` is used in one place only, between `[System]` and `[Feature]`. Action, Page and Context use spaces. This applies to Asana task names only, not to layers, components, styles or tokens
  - Project-wide work: `[Project]-[Action] Detail + (Context)`, for example `[Nation House]-[Research] Research ข้อมูลเทรนด์ดีไซน์ใหม่`
  - Design system work uses System `[DS]` or `[Global]`, for example `[DS]-[Button] Update รัศมีปุ่ม Primary Button`
  - Action is a short English verb (Design, Update, Fix, Research, Revamp). Feature is 1 or 2 short words. A very broad feature uses `[Core]` or `[Main]`
  - No em dash. Go through the checklist at the end of the naming file before naming
- Hierarchy: Project is a custom field, System is the first bracket, Feature the second bracket, Page is the main task name, Module is a subtask or the description, Component is a subtask checklist

## The 3 dates of a card (set by the user 2026-08-18)
They do different jobs. Don't mix them up.
1. Card created: custom field Assign Date, set when the card is created
2. Work started: Start date (`start_on`), set when work starts, together with moving the status to `In Progress (Design Phase)`
3. Work done: Due date (`due_on`), set after the worklog is pushed as a comment, then close the card
- Not filled in backwards: start and due dates are recorded only for cards picked up after 2026-08-18
- A card with no due date sinks to the bottom of the board and gets lost (happened on 2026-08-18)

## Closing a card
- Closing means the card waits at `Internal Review / Feedback` for a stakeholder to check it again, not `Complete / Done` (confirmed by the user 2026-08-24). `Complete / Done` is only for work that really passed review
- Sending `completed: true` is enough. Asana maps it to the mirror status of the current one in the complete set, which matches the process (closing from In Progress goes to Internal Review in the complete set)
- To set a status yourself, send `resource_subtype: custom`, `custom_type` and `custom_type_status_option` without `completed`. If `completed` is also sent, it overrides the status you set, however many times you retry
- Check the result before saying done: the status MUST be the one you meant, not just `completed: true`

## Worklog structure (set by the user 2026-08-18)
Kept in separate places. Never post everything as one block like before.

| Where | What |
| --- | --- |
| This repo: `docs/daily-log/daily/<Thai month> <Buddhist year>/W{week}-{Day}-{DD}-{MM}-{Buddhist year}.md` | The full daily summary across all cards. The only source, no `.txt` copies anymore |
| Obsidian vault, one folder per year `Worklog <year>/` | A generated read-only copy: daily notes, a summary note per month (pending, done, problems) and an index per year. MUST NOT edit notes there, edit the repo file and rerun the script |
| Each task card | A comment about that card's work only. Never mix in work from other cards |
| Subtask "สรุปงานที่ทำ เดือน<month>" | One comment per day, a daily timeline across all cards |
| Subtask "สรุปงานค้าง เดือน<month>" | The pending list, kept current. Remove items once done |

- Each new month: create the month's summary card and its 2 subtasks the same way (August 2026 IDs are in [reference.md](reference.md))
- Creating a subtask: `POST /tasks/{parent}/subtasks` with `name` first, then `PUT` the `html_notes`. MUST NOT use `<p>`: it returns 400 `XML is invalid`
- Scripts: `npm run worklog:new`, `npm run worklog:asana`, `npm run worklog:month`, `npm run worklog:obsidian` (see `docs/rules/worklog.md` sections 5 and 7)
- The 16:30 run copies every worklog to Obsidian before it pushes to Asana. When you write or fix a worklog after 16:30, run `npm run worklog:obsidian` yourself. No approval needed: it only writes inside the vault's `Worklog <year>/` folders
