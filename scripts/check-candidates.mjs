// ด่านตรวจ candidate: ตรวจ candidates/<ชื่อ>/candidate.yaml ทุกไฟล์ให้ตรงแม่แบบ
//   node scripts/check-candidates.mjs            ตรวจโครงไฟล์ (ใช้ใน Pull Request และตอน push)
//   node scripts/check-candidates.mjs --expired  ตรวจเพิ่มว่ามีตัวที่เลยวันหมดอายุไหม (ใช้ในรอบเตือนรายสัปดาห์)
//
// ตัวแยกค่าอ่านแบบเดียวกับหน้าทะเบียน candidates/Candidates.stories.tsx คือ key: value บรรทัดเดียว
// ยกเว้น >- ที่ต่อหลายบรรทัดได้ ถ้าแก้กติกาการอ่านต้องแก้ทั้งสองที่
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const DIR = path.join(ROOT, 'candidates')
const CHECK_EXPIRED = process.argv.includes('--expired')

const REQUIRED = ['name', 'thaiName', 'requestedBy', 'status', 'submitted', 'expires', 'problem', 'triedInstead']
const STATUSES = ['proposed', 'accepted', 'building', 'merged', 'rejected']
const DATE = /^\d{4}-\d{2}-\d{2}$/
const MAX_DAYS = 30
const EM_DASH = String.fromCharCode(0x2014)

const parse = (raw) => {
  const row = {}
  let key = ''
  let folded = false
  for (const line of raw.split('\n')) {
    if (/^\s*#/.test(line) || line.trim() === '') continue
    const m = line.match(/^([a-zA-Z]+):\s*(.*)$/)
    if (m) {
      key = m[1]
      folded = m[2] === '>-'
      row[key] = folded ? '' : m[2]
    } else if (folded && key) {
      row[key] = (row[key] ? `${row[key]} ` : '') + line.trim()
    }
  }
  return row
}

const errors = []
const expired = []
const today = new Date().toISOString().slice(0, 10)

const folders = fs.readdirSync(DIR, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name)
if (folders.length === 0) errors.push('ไม่พบโฟลเดอร์ candidate ใน candidates/')

for (const folder of folders) {
  const file = path.join(DIR, folder, 'candidate.yaml')
  const label = `candidates/${folder}/candidate.yaml`
  if (!fs.existsSync(file)) {
    errors.push(`${label}: ไม่มีไฟล์ ทุกโฟลเดอร์ใน candidates/ ต้องมี candidate.yaml`)
    continue
  }
  const raw = fs.readFileSync(file, 'utf8')
  // เขียนเป็นรหัสอักขระ ไม่ใช่ตัวอักษรจริง ไฟล์นี้จะได้ไม่มี em dash เสียเอง
  if (raw.includes(EM_DASH)) errors.push(`${label}: มี em dash ใช้เว้นวรรคแทนตามกฎของโปรเจกต์`)
  const row = parse(raw)
  for (const k of REQUIRED) {
    if (!row[k] || row[k].trim() === '') errors.push(`${label}: ช่อง ${k} ว่าง ดูแม่แบบ candidates/_template.candidate.yaml`)
  }
  if (row.name && row.name !== folder) errors.push(`${label}: name เป็น ${row.name} ไม่ตรงชื่อโฟลเดอร์ ${folder}`)
  if (row.status && !STATUSES.includes(row.status)) errors.push(`${label}: status ${row.status} ไม่อยู่ในชุด ${STATUSES.join(' ')}`)
  for (const k of ['submitted', 'expires']) {
    if (row[k] && !DATE.test(row[k])) errors.push(`${label}: ${k} ต้องเป็น YYYY-MM-DD ได้ ${row[k]}`)
  }
  if (DATE.test(row.submitted ?? '') && DATE.test(row.expires ?? '')) {
    const days = (Date.parse(row.expires) - Date.parse(row.submitted)) / 86400000
    if (days <= 0) errors.push(`${label}: expires ต้องอยู่หลัง submitted`)
    else if (days > MAX_DAYS) errors.push(`${label}: expires ห่างจาก submitted ${days} วัน เกินเพดาน ${MAX_DAYS} วัน`)
    if (row.status === 'proposed' && row.expires < today) expired.push(`${folder} (${row.thaiName ?? ''}) หมดอายุ ${row.expires} โปรเจกต์ที่ขอ ${row.requestedBy ?? ''}`)
  }
}

if (errors.length > 0) {
  console.error(`✗ candidate ไม่ผ่าน ${errors.length} ข้อ`)
  for (const e of errors) console.error(`  - ${e}`)
  process.exit(1)
}
console.log(`✓ candidate ${folders.length} ตัวผ่านโครงแม่แบบครบ`)

if (expired.length > 0) {
  const lines = expired.map((e) => `  - ${e}`).join('\n')
  if (CHECK_EXPIRED) {
    console.error(`✗ candidate เลยวันหมดอายุ ${expired.length} ตัว ทีม Design System ต้องตัดสินหรือเลื่อน expires พร้อมเหตุผล`)
    console.error(lines)
    process.exit(1)
  }
  console.warn(`⚠ candidate เลยวันหมดอายุ ${expired.length} ตัว (รอบเตือนรายสัปดาห์จะเปิด issue ให้)`)
  console.warn(lines)
}
