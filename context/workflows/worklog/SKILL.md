---
name: worklog
description: >-
  Write the daily worklog, create or update a task file in docs/daily-log/tasks, record task work, close a task,
  or sync the worklog to the Obsidian vaults. Use for any worklog or task-record work.
---

# Worklog and task records

Asana is not used anymore (set by the user 2026-11-03). Never create Asana cards or post Asana comments.
The old Asana rules are kept for history in `docs/legacy/worklog-asana.2026-11-03.md`.

Official rule files (Thai), read the one the task needs:
- Worklog: where it lives, how to write it, task files, dates, scripts, the Obsidian copy: `docs/rules/worklog.md`. Change worklog rules in that file
- Task names and the 5-part description template: `docs/rules/task-naming.md`

## Where things live
| What | Source in this repo | Copy in Obsidian (`obsidian/UXUI Worklog`) |
| --- | --- | --- |
| Daily worklog | `docs/daily-log/daily/<Thai month> <Buddhist year>/W{week}-{Day}-{DD}-{MM}-{year}.md` | one daily note |
| Work done per month | the `งานที่ทำวันนี้` section of each daily file | `01 งานที่ทำ <month>`, one heading per day |
| Pending per month | the `งานค้าง` section of the latest daily file | `02 งานค้าง <month>`, one list, carried to the next month |
| Task record | `docs/daily-log/tasks/<task name without brackets>.md` | `Worklog <year>/Tasks/` |

- The vault is a generated read-only copy. MUST NOT edit notes there. Edit the repo file and rerun the script
- Notes the user writes in the vault are never touched by the scripts

## Ask first
- Writing a task record (the `worklog` entry before closing a task, or any other entry): wait for the user's confirmation first, every time
- The daily worklog and the 16:00 Obsidian copy need no approval. Just report what was written

## Creating a task
- `npm run worklog:task -- "<task name>"` creates the file from the template and sets it as the current task
- Name it by `docs/rules/task-naming.md`, for example `[DS]-[Button] Update รัศมีปุ่ม Primary Button`. No em dash
- Fill the 5-part description: `Problem`, `Goal`, `Requirements`, `Figma File`, `Reference`

## Task dates and status (frontmatter)
- Before closing a task, go through `docs/rules/task-done-checklist.md`
- `assign_date` when the file is created, `start` when work starts with `status: "In Progress"`, `due` when the work is done
- Closing a task: write the `worklog` entry, wait for confirmation, set `due` and `status: "Internal Review"`. `Done` only after a stakeholder really passed it
- Then run `npm run worklog:obsidian` and check the task note in the vault

## Task record format
- Each entry is `### <date> <type> <number>`. Types: `worklog`, `แก้คำรายงานผิด`, `เพิ่มขอบเขต`, `ยกเลิกขอบเขต`. The number counts entries in that task
- A `#### ผลตรวจ` section with real numbers, and `#### ที่ไม่ได้ทำตามที่เขียนไว้` when a requirement was not met
- Only that task's work. Never mix in other tasks

## Daily worklog
- 4 sections in this order: `งานค้าง`, `งานที่ทำวันนี้`, `ผลลัพธ์`, `ติดปัญหา`. The scripts read these headings exactly
- Remove finished items from `งานค้าง`. Unfinished items stay and carry over to the next month by themselves
- The 16:00 run (`com.nation.worklog-month`, `npm run worklog:month`) writes the day's file automatically through `scripts/worklog-auto.mjs`, then copies everything to both vaults (set by the user 2026-11-04, `docs/rules/worklog.md` section 3.3)
- MUST NOT create or write the day's file before 16:00. `worklog-auto.mjs` skips a day whose file already exists, so a file written early hides every task done later that day (happened 2026-11-05: written at 11:19, the afternoon was lost)
- Work done after 16:00: add it to the file the 16:00 run wrote, then run `npm run worklog:obsidian` yourself, no approval needed
- One CMS has its own vault (`obsidian/One CMS`). Every worklog item about One CMS MUST contain the words `One CMS`. After 16:00, run `npm run one-cms:obsidian` yourself. See `docs/rules/worklog.md` section 8
