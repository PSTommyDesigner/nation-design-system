// worklog-to-asana.mjs โพสต์ worklog เป็น "comment" (rich text/html) บน task ปัจจุบัน
// ใช้: npm run worklog:asana [YYYY-MM-DD] [--dry]
//   ไม่ใส่วันที่ = วันนี้ (Asia/Bangkok) · --dry = แสดง html ที่จะส่ง ไม่โพสต์จริง
// task ปัจจุบันอ่านจาก scripts/worklog-current-task.json · idempotent (มี comment วันเดียวกัน → แก้)
//
// ── Template comment (ตาม format ที่ user จัดไว้) ──────────────────────────
//   <h2><strong>📅 Worklog <date> : Task: <name></strong></h2>   ← หัวข้อหลัก + ไอคอน
//   <h2><strong>งานค้าง</strong></h2>                               ← 4 หัวข้อ h2 ตัวหนา
//   - bullet ...                                                     ← bullet ธรรมดา
//   (## → h2 · **x** → <strong> · เว้นวรรค & < > " escape ให้อัตโนมัติ)
import { readFileSync, existsSync } from 'node:fs'
import { worklogPath } from './worklog-path.mjs'

const API = 'https://app.asana.com/api/1.0'
const CONFIG = 'scripts/worklog-current-task.json'

function loadEnv() {
  const o = { ...process.env }
  if (existsSync('.env'))
    for (const l of readFileSync('.env', 'utf8').split('\n')) {
      const m = l.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*?)\s*$/)
      if (m) o[m[1]] = m[2].replace(/^["']|["']$/g, '')
    }
  return o
}

// ── args ──
// worklog:asana [YYYY-MM-DD] [--dry] [--task=<gid>] [--name=<ชื่อ>] [--file=<path>]
//   --task/--name : ยิงไปการ์ดอื่นแทนตัวใน config (ใช้ตอนวันเดียวทำหลายการ์ด · worklog แยกตามการ์ด)
//   --file        : ใช้ไฟล์ worklog อื่นแทนไฟล์ของวันนั้น (path เต็ม)
const args = process.argv.slice(2)
const dry = args.includes('--dry')
const optOf = (k) => {
  const a = args.find((x) => x.startsWith(`--${k}=`))
  return a ? a.slice(k.length + 3) : null
}
const taskOverride = optOf('task')
const nameOverride = optOf('name')
const fileOverride = optOf('file')
const dateArg = args.find((a) => /^\d{4}-\d{2}-\d{2}$/.test(a))
const day = dateArg || new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Bangkok' }).format(new Date())

// ── worklog file ──
const file = fileOverride || worklogPath(day)
if (!existsSync(file)) {
  console.error(`✗ ไม่พบ worklog: ${file} รัน "npm run worklog:new" ก่อน`)
  process.exit(1)
}
const md = readFileSync(file, 'utf8')

// ── markdown → Asana html_text (template) ──
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const fmt = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') // **x** → ตัวหนา
function toHtml(src) {
  let task = ''
  const out = []
  for (const raw of src.split('\n')) {
    const line = raw.trim()
    if (!line) continue
    let m
    // หัวข้อไฟล์ทุกแบบ (title ด้านล่างสร้างจากวันที่อยู่แล้ว จึงไม่ต้องพิมพ์ซ้ำ)
    // เดิมข้ามเฉพาะ "# Worklog ..." ทำให้หัวไฟล์ภาษาไทยอย่าง "# W3 พุธ 23 กันยายน 2569"
    // หลุดไปเป็นข้อความดิบพร้อมเครื่องหมาย # ในคอมเมนต์ (พบ 2026-09-24)
    if (/^#\s+/.test(line)) continue
    if ((m = line.match(/^>\s*Task:\s*(.+)$/))) { task = m[1]; continue }
    if ((m = line.match(/^##\s+(.+)$/))) { out.push(`<h2><strong>${fmt(m[1])}</strong></h2>`); continue }
    out.push(fmt(line))
  }
  const title = `📅 Worklog ${day}${task ? ` : Task: ${task}` : ''}`
  const html = `<body><h2><strong>${fmt(title)}</strong></h2>\n${out.join('\n')}</body>`
  // หัวข้อชิดเนื้อหา: ตัด newline หลัง </h2> (ไม่ให้ดูห่างเกินไป)
  return html.replace(/<\/h2>\n/g, '</h2>')
}
const html = toHtml(md)

// ── มีการทำงานจริงไหม? ── ไม่มีงาน (มีแต่โครงเปล่า/bullet ว่าง) = ไม่โพสต์
const worked = md.split('\n').some((raw) => {
  const line = raw.trim()
  if (!line || line === '-') return false // ว่าง หรือ bullet placeholder
  if (/^#\s+Worklog\b/.test(line) || /^>\s*Task:/.test(line) || /^##\s+/.test(line)) return false // หัวข้อ/metadata
  return true // มีเนื้อหางานจริง
})

if (dry) {
  console.log('--- [DRY RUN] html_text ที่จะส่ง (ไม่โพสต์) ---\n')
  console.log(html)
  if (!worked) console.log('\n⚠️  worklog ว่าง (ไม่มีการทำงาน) → ตอนรันจริงจะข้าม ไม่โพสต์')
  process.exit(0)
}

if (!worked) {
  console.log(`⏭  ${day}: ไม่มีการทำงาน (worklog ว่าง) → ไม่บันทึกลง Asana`)
  process.exit(0)
}

// ── โพสต์จริง ──
const TOKEN = loadEnv().ASANA_TOKEN
if (!TOKEN) { console.error('✗ ไม่พบ ASANA_TOKEN ใน .env'); process.exit(1) }
let TASK_GID = taskOverride
let TASK_NAME = nameOverride
if (!TASK_GID) {
  if (!existsSync(CONFIG)) { console.error(`✗ ไม่พบ ${CONFIG}`); process.exit(1) }
  const cfg = JSON.parse(readFileSync(CONFIG, 'utf8'))
  TASK_GID = cfg.gid
  TASK_NAME = TASK_NAME || cfg.name
}

const H = { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' }
async function req(path, opts = {}) {
  const r = await fetch(`${API}${path}`, { ...opts, headers: H })
  const j = await r.json().catch(() => ({}))
  if (!r.ok) { console.error(`✗ Asana API ${r.status}:`, JSON.stringify(j.errors || j)); process.exit(1) }
  return j.data
}

// idempotent: หา comment ของวันนี้ (marker "Worklog <day>" ใน plain text)
// รับรูปแบบเก่าที่มีขีดยาวคั่นด้วย เพื่อไม่ให้ comment ของวันเดิมกลายเป็นใบซ้ำ
const marker = new RegExp(`Worklog\\s*(?:—\\s*)?${day}`)
const stories = await req(`/tasks/${TASK_GID}/stories?opt_fields=text,resource_subtype`)
const todays = (stories || []).find((s) => s.resource_subtype === 'comment_added' && marker.test(s.text || ''))

if (todays) {
  await req(`/stories/${todays.gid}`, { method: 'PUT', body: JSON.stringify({ data: { html_text: html } }) })
  console.log(`✓ อัปเดต comment worklog ${day} บน task: ${TASK_NAME}`)
} else {
  await req(`/tasks/${TASK_GID}/stories`, { method: 'POST', body: JSON.stringify({ data: { html_text: html } }) })
  console.log(`✓ โพสต์ comment worklog ${day} บน task: ${TASK_NAME}`)
}
console.log(`  https://app.asana.com/0/1212508564439334/${TASK_GID}`)
