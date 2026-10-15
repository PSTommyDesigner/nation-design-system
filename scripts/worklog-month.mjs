// worklog-month.mjs · push worklog รายวันขึ้น subtask สรุปเดือนใน Asana
// ใช้: npm run worklog:month [YYYY-MM-DD] [--dry]
//
// กติกา (user สั่ง 2026-08-27):
//   worklog รายวัน = ภาพรวมทั้งวันข้ามทุกการ์ด → push 16:30 อัตโนมัติ ไม่ต้องขออนุมัติ
//   worklog ของ task = comment บนการ์ดใบนั้น ต้องรอ user คอนเฟิร์ม (สคริปต์นี้ไม่ยุ่ง)
//
// ปลายทาง 2 ที่ คนละกติกากัน (user สั่ง 2026-09-10)
//   subtask '01 งานที่ทำ'  = 1 วัน 1 comment หาใบของวันนั้นแล้วเขียนทับ ไม่เจอค่อยโพสต์ใบใหม่
//   subtask '02 งานค้าง'   = comment ใบเดียวตลอด เขียนทับใบเดิมเสมอ ห้ามโพสต์ใบใหม่
import { readFileSync, existsSync } from 'node:fs'
import { worklogPath, todayISO } from './worklog-path.mjs'

const API = 'https://app.asana.com/api/1.0'
const PROJECT = '1212508564439334'
const TH_MONTH = ['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน',
                  'กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม']

function loadEnv() {
  const o = { ...process.env }
  if (existsSync('.env'))
    for (const l of readFileSync('.env', 'utf8').split('\n')) {
      const m = l.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*?)\s*$/)
      if (m) o[m[1]] = m[2].replace(/^["']|["']$/g, '')
    }
  return o
}
const env = loadEnv()
const TOKEN = env.ASANA_TOKEN
if (!TOKEN) { console.error('✗ ไม่พบ ASANA_TOKEN ใน .env'); process.exit(1) }

const args = process.argv.slice(2)
const dry = args.includes('--dry')
const day = args.find((a) => /^\d{4}-\d{2}-\d{2}$/.test(a)) || todayISO()

async function api(method, path, body) {
  const r = await fetch(API + path, {
    method,
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!r.ok) throw new Error(`${method} ${path} → ${r.status} ${await r.text()}`)
  return (await r.json()).data
}

// ── อ่าน worklog ของวันนั้น ──
const file = worklogPath(day)
if (!existsSync(file)) { console.error(`✗ ไม่พบ worklog: ${file}`); process.exit(1) }
const md = readFileSync(file, 'utf8')

/** ดึง bullet ใต้หัวข้อที่ระบุ */
function section(name) {
  const lines = md.split('\n')
  const out = []
  let on = false
  for (const l of lines) {
    if (l.startsWith('## ')) { on = l.trim() === `## ${name}`; continue }
    if (on && /^\s*[-*]\s+/.test(l)) out.push(l.replace(/^\s*[-*]\s+/, '').trim())
  }
  return out
}
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const fmt = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
const li = (arr) => arr.length ? '<ul>' + arr.map((x) => `<li>${fmt(x)}</li>`).join('') + '</ul>' : ''

const TH_DAY = ['อาทิตย์','จันทร์','อังคาร','พุธ','พฤหัสบดี','ศุกร์','เสาร์']
const [y, m, d] = day.split('-').map(Number)
const dayLabel = `${TH_DAY[new Date(y, m - 1, d).getDay()]} ${d} ${TH_MONTH[m - 1]} ${y + 543}`
const thaiToday = `${d} ${TH_MONTH[m - 1].slice(0, 3)}. ${y + 543}`

// ── หา subtask ปลายทาง ──
const tasks = await api('GET', `/projects/${PROJECT}/tasks?opt_fields=name&limit=100`)
const monthCard = tasks.find((t) => t.name.includes('[สรุปงาน]') && t.name.includes(TH_MONTH[m - 1]))
if (!monthCard) { console.error(`✗ ไม่พบการ์ดสรุปเดือน ${TH_MONTH[m - 1]} ในโปรเจกต์`); process.exit(1) }
const subs = await api('GET', `/tasks/${monthCard.gid}/subtasks?opt_fields=name`)
const findSub = (kw) => subs.find((s) => s.name.includes(kw))
const subDone = findSub('งานที่ทำ')
const subPending = findSub('งานค้าง')
if (!subDone || !subPending) { console.error('✗ ไม่พบ subtask 01 งานที่ทำ หรือ 02 งานค้าง'); process.exit(1) }

async function comments(gid) {
  const st = await api('GET', `/tasks/${gid}/stories?opt_fields=gid,resource_subtype,text&limit=100`)
  return st.filter((s) => s.resource_subtype === 'comment_added')
}

// ── 1) 01 งานที่ทำ : 1 วัน 1 comment ──
const dayHtml =
  `<body><h2><strong>${dayLabel}</strong></h2>` +
  li(section('งานที่ทำวันนี้')) +
  (section('ผลลัพธ์').length ? `<strong>ผลลัพธ์</strong>${li(section('ผลลัพธ์'))}` : '') +
  '</body>'

// ── 2) 02 งานค้าง : comment ใบเดียว เขียนทับใบเดิม ──
const pendingHtml =
  `<body><h2><strong>📌 งานค้างที่ต้องทำต่อ</strong></h2>` +
  `อัปเดตล่าสุด ${thaiToday} ตอนปิดงาน ของที่เสร็จแล้วหรือตัดสินแล้วตัดออกจากลิสต์ ` +
  `แก้คอมเมนต์ใบนี้ใบเดียว ห้ามโพสต์ใบใหม่` +
  li(section('งานค้าง')) + '</body>'

if (dry) {
  console.log('DRY RUN')
  console.log('การ์ดเดือน:', monthCard.name)
  console.log('01 งานที่ทำ:', subDone.gid, '| หัวข้อวัน:', dayLabel, '| ยาว', dayHtml.length)
  console.log(dayHtml.slice(0, 400))
  console.log('\n02 งานค้าง:', subPending.gid, '| ยาว', pendingHtml.length)
  process.exit(0)
}

/** หาคอมเมนต์ของวันนั้น ถ้ามีให้เขียนทับ ไม่มีให้โพสต์ใบใหม่ */
async function upsertDay(gid, label, html) {
  const cm = await comments(gid)
  const hit = cm.find((s) => (s.text || '').trim().startsWith(label))
  if (hit) { await api('PUT', `/stories/${hit.gid}`, { data: { html_text: html } }); return 'แก้คอมเมนต์ของวันนี้' }
  await api('POST', `/tasks/${gid}/stories`, { data: { html_text: html } }); return 'สร้างคอมเมนต์ของวันนี้'
}

/** subtask ที่ต้องมีคอมเมนต์ใบเดียว เขียนทับใบแรกเสมอ */
async function upsertSingle(gid, html) {
  const cm = await comments(gid)
  if (cm.length > 1) console.warn(`⚠️ subtask ${gid} มี ${cm.length} คอมเมนต์ ทั้งที่กติกาให้มีใบเดียว เขียนทับใบแรก`)
  if (cm.length) { await api('PUT', `/stories/${cm[0].gid}`, { data: { html_text: html } }); return 'แก้คอมเมนต์เดิม' }
  await api('POST', `/tasks/${gid}/stories`, { data: { html_text: html } }); return 'สร้างคอมเมนต์ใหม่'
}

const r1 = await upsertDay(subDone.gid, dayLabel, dayHtml)
const r2 = await upsertSingle(subPending.gid, pendingHtml)
console.log(`✅ push worklog ${day} ขึ้นการ์ด ${monthCard.name}`)
console.log(`   01 งานที่ทำ  ${r1}  (${section('งานที่ทำวันนี้').length} รายการ)`)
console.log(`   02 งานค้าง   ${r2}  (${section('งานค้าง').length} รายการ)`)
