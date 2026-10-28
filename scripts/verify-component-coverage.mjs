// ตรวจว่าของที่ออกแบบเสร็จแล้ว (มีสูตรขนาดใน tokens/scale) มีโค้ดใน components/ ครบไหม
//
// ⚠️ ทำไมต้องมี (ตั้ง 2026-10-15)
//   ก่อนหน้านี้ไม่มีใครบอกได้ว่าไฟล์ออกแบบกับโค้ดหลุดจากกันกี่ตัว ตอนสำรวจจริงพบว่า
//   มีสูตรขนาดแล้ว 22 ตัว แต่มีโค้ดจริงแค่ 13 ตัว และมีโฟลเดอร์เปล่า 4 ตัวที่ถูกนับว่าเป็นโค้ด
//   มาตลอดเพราะไม่มีใครเปิดดูข้างใน จนงานวิจัยหนึ่งใบสรุปผิดตามไปด้วย
//
//   tokens:verify ตรวจแค่ชื่อตัวแปร ไม่รู้เรื่องโค้ด ด่านนี้จึงมาเติมช่องที่ขาด
//
// ใช้: npm run verify:coverage
import { readdirSync, existsSync, statSync } from 'node:fs'
import { join } from 'node:path'

const SCALE = 'tokens/scale'
const COMPONENTS = 'components'

// ── ของที่ตัดสินแล้วว่าไม่ทำฝั่งโค้ดโดยตั้งใจ ──
// เพิ่มรายการใหม่ได้เฉพาะเมื่อผู้ใช้ตัดสินแล้ว พร้อมเขียนเหตุผลกำกับเสมอ
const NO_CODE = {
  'doc-table': 'component ของระบบเอกสาร ไม่ใช่ของโปรดักต์ ทีมที่ใช้ library ไม่ต้องการ (ตัดสิน 2026-10-15)',
  'info-card': 'component ของระบบเอกสาร ไม่ใช่ของโปรดักต์ ทีมที่ใช้ library ไม่ต้องการ (ตัดสิน 2026-10-15)',
}

// ชื่อสูตรขนาด → ชื่อโฟลเดอร์โค้ด เมื่อสองฝั่งตั้งชื่อไม่เหมือนกัน
const ALIAS = {
  input: 'TextField',
  progress: 'Progress',
  tabs: 'Tabs',
  chart: 'BarChart',
}

const pascal = (s) => s.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join('')

const specs = readdirSync(SCALE)
  .filter((f) => f.endsWith('.mjs') && f !== 'index.mjs' && !f.includes('global-scale'))
  .map((f) => f.replace(/\.mjs$/, ''))
  .sort()

// โฟลเดอร์ที่มีไฟล์จริงเท่านั้นถึงจะนับว่าเป็นโค้ด โฟลเดอร์เปล่าไม่นับ
const hasCode = (dir) => {
  const p = join(COMPONENTS, dir)
  if (!existsSync(p) || !statSync(p).isDirectory()) return false
  return readdirSync(p).length > 0
}

const done = [], missing = [], accepted = [], empty = []

for (const name of specs) {
  if (NO_CODE[name]) { accepted.push(name); continue }
  const dir = ALIAS[name] || pascal(name)
  if (hasCode(dir)) done.push(`${name} → ${dir}`)
  else missing.push(`${name} → คาดว่าเป็น ${COMPONENTS}/${dir}`)
}

// โฟลเดอร์เปล่าใน components/ คือซาก ต้องไม่มี
for (const dir of readdirSync(COMPONENTS)) {
  const p = join(COMPONENTS, dir)
  if (statSync(p).isDirectory() && readdirSync(p).length === 0) empty.push(dir)
}

const line = (s) => console.log(s)
line('')
line(`ของที่ออกแบบเสร็จแล้ว ${specs.length} ตัว`)
line(`  มีโค้ดแล้ว      ${done.length} ตัว`)
line(`  ไม่ทำโดยตั้งใจ  ${accepted.length} ตัว`)
line(`  ยังไม่มีโค้ด    ${missing.length} ตัว`)
line('')

if (accepted.length) {
  line('ไม่ทำฝั่งโค้ดโดยตั้งใจ')
  for (const a of accepted) line(`  ${a.padEnd(14)} ${NO_CODE[a]}`)
  line('')
}

let bad = false
if (missing.length) {
  bad = true
  line('❌ ยังไม่มีโค้ด')
  for (const m of missing) line(`  ${m}`)
  line('')
}
if (empty.length) {
  bad = true
  line('❌ โฟลเดอร์เปล่าใน components/ (ซากที่ต้องลบ)')
  for (const e of empty) line(`  ${e}`)
  line('')
}

if (bad) {
  line('ถ้าตัวไหนตั้งใจไม่ทำโค้ด ให้ผู้ใช้ตัดสินก่อน แล้วเพิ่มลง NO_CODE พร้อมเหตุผลในไฟล์นี้')
  process.exit(1)
}
line('✅ ไม่มีช่องว่างระหว่างไฟล์ออกแบบกับโค้ด')

// ── ด่านที่สอง ชื่อ CSS variable ที่โค้ดเรียกแต่ไม่มีอยู่จริง ──
// ⚠️ ทำไมต้องมี (ตั้ง 2026-10-15)
//   CSS ไม่เตือนเมื่อเรียก var() ที่ไม่มีอยู่ มันเงียบแล้วตกไปใช้ค่า default
//   ตอนตั้งด่านนี้ครั้งแรกจับได้ทันที 40 จุดใน components/Tag ที่ระยะขอบหายไปเงียบ ๆ มานาน
import { readFileSync as rf } from 'node:fs'

const declared = new Set()
for (const f of ['tokens/output/css/variables.css', 'tokens/output/css/typography.css']) {
  if (!existsSync(f)) continue
  for (const m of rf(f, 'utf8').matchAll(/^\s*(--ntg-[A-Za-z0-9_-]+)\s*:/gm)) declared.add(m[1])
}

const ghosts = {}
for (const dir of readdirSync(COMPONENTS)) {
  const p = join(COMPONENTS, dir)
  if (!statSync(p).isDirectory()) continue
  for (const file of readdirSync(p).filter((f) => f.endsWith('.css'))) {
    const src = rf(join(p, file), 'utf8')
    // ตัวแปรที่ไฟล์นั้นประกาศเองไม่นับว่าผี
    const local = new Set([...src.matchAll(/^\s*(--[A-Za-z0-9_-]+)\s*:/gm)].map((m) => m[1]))
    for (const m of src.matchAll(/var\(\s*(--ntg-[A-Za-z0-9_-]+)/g)) {
      if (!declared.has(m[1]) && !local.has(m[1])) {
        ;(ghosts[`${dir}/${file}`] = ghosts[`${dir}/${file}`] || new Set()).add(m[1])
      }
    }
  }
}

const ghostFiles = Object.keys(ghosts)
if (ghostFiles.length) {
  line('')
  line('❌ เรียก var() ที่ไม่มีอยู่จริง CSS จะเงียบแล้วตกไปใช้ค่า default')
  for (const f of ghostFiles) {
    const names = [...ghosts[f]].sort()
    line(`  ${f} ${names.length} ชื่อ`)
    for (const n of names.slice(0, 4)) line(`    ${n}`)
    if (names.length > 4) line(`    และอีก ${names.length - 4} ชื่อ`)
  }
  line('')
  line('แก้ได้ 2 ทาง คือ เพิ่ม token ที่ขาดในไฟล์ออกแบบแล้ว build ใหม่ หรือเลิกใช้ชื่อนั้นในโค้ด')
  process.exit(1)
}
line('✅ ทุกชื่อ var() ที่โค้ดเรียก มีอยู่จริง')
