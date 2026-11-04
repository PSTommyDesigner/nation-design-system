// worklog-task.mjs · สร้างไฟล์บันทึกของงานใหม่ แทนการสร้างการ์ดใน Asana (user สั่ง 2026-11-03)
// ใช้: npm run worklog:task -- "[DS]-[Button] Update รัศมีปุ่ม Primary Button"
//
// ไฟล์อยู่ที่ docs/daily-log/tasks/<ชื่องานที่ตัดวงเล็บเหลี่ยม>.md สคริปต์ Obsidian สำเนาไป Worklog <ปี>/Tasks/
// ชื่องานตั้งตาม docs/rules/task-naming.md รายละเอียดงานใช้แม่แบบ 5 หัวข้อ วิธีเขียนบันทึกอยู่ที่ docs/rules/worklog.md §3
// ตั้งเป็นงานปัจจุบันใน scripts/worklog-current-task.json ด้วย บรรทัด Task ของ worklog รายวันจะได้ชื่องานนี้
import { writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { todayISO } from './worklog-path.mjs'

const name = process.argv.slice(2).join(' ').trim()
if (!name) { console.error('ใช้: npm run worklog:task -- "<ชื่องาน>"'); process.exit(2) }
// วงเล็บเหลี่ยมทำให้ลิงก์ใน Obsidian ขาด และอักขระพวกนี้ใช้ในชื่อไฟล์ไม่ได้
const clean = name.replace(/\[([^\]]+)\]/g, '$1').replace(/[\\/:*?"<>|#^\[\]]/g, ' ').replace(/\s+/g, ' ').trim()
// ชื่อไฟล์บน Linux ยาวได้ไม่เกิน 255 ไบต์ ตัวอักษรไทยใช้ 3 ไบต์ต่อตัว ชื่อที่ยาวเกินทำให้ GitHub เช็กเอาท์ไม่ได้
// และ Deploy Storybook ล้มทั้งรอบ (เกิดจริง 2026-11-03 ถึง 04) ตัดที่ MAX_BYTES โดยไม่ตัดกลางตัวอักษร
// แล้วถอยไปที่ช่องว่างสุดท้ายถ้ามี ชื่อเต็มยังอยู่ในช่อง name ของ frontmatter
const MAX_BYTES = 180
function fitBytes(s, max = MAX_BYTES) {
  const enc = new TextEncoder()
  if (enc.encode(s).length <= max) return s
  let out = ''
  for (const ch of s) { if (enc.encode(out + ch).length > max) break; out += ch }
  const cut = out.lastIndexOf(' ')
  return (cut > out.length / 2 ? out.slice(0, cut) : out).trim()
}
const file = fitBytes(clean)
const dir = 'docs/daily-log/tasks'
const path = join(dir, `${file}.md`)
if (existsSync(path)) { console.error(`✗ มีไฟล์งานนี้แล้ว: ${path}`); process.exit(1) }
const today = todayISO()
mkdirSync(dir, { recursive: true })
writeFileSync(path, `---
name: ${JSON.stringify(name)}
status: "In Progress"
project: "Design System"
assign_date: "${today}"
start: "${today}"
due: ""
created: "${today}"
---
# ${name}

## รายละเอียดงาน

**Problem ปัญหาคืออะไร ? :**

**Goal เป้าหมาย :**

**Requirements :**
1.

**Figma File :**

**Reference :**

## บันทึกงาน

- ยังไม่มีบันทึก
`)
writeFileSync('scripts/worklog-current-task.json', JSON.stringify({ name, file: path, project: 'Design System' }, null, 2) + '\n')
console.log(`✓ สร้างไฟล์งาน ${path} และตั้งเป็นงานปัจจุบัน`)
