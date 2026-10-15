// ตรวจว่า component ฝั่งโค้ด "ทำอะไรได้" ครบตามแกนและคุณสมบัติในไฟล์ออกแบบไหม
//
// ⚠️ ทำไมต้องมี (ตั้ง 2026-10-15)
//   ด่านที่มีอยู่เดิมตรวจได้แค่ว่า "มีโฟลเดอร์ไหม" กับ "ชื่อ token ที่เรียกมีจริงไหม"
//   แต่ไม่รู้ว่า component ฝั่งโค้ดรองรับแกนครบตามไฟล์ออกแบบหรือเปล่า
//   เคยเกิดจริง ไฟล์ออกแบบเพิ่ม left-icon 3,465 แบบ และชุด icon-tag อีก 1,575 แบบ
//   แต่ components/Tag ไม่มีอะไรรองรับเลยสักอย่าง และไม่มีด่านไหนเตือน
//
// วิธีทำงาน
//   ฝั่งไฟล์ออกแบบเก็บเป็นไฟล์ tokens/figma-components.json (แกน + คุณสมบัติ ต่อ component)
//   ฝั่งโค้ดอ่าน components/<ชื่อ>/<ชื่อ>.tsx แล้วถอด props กับชนิดข้อมูลแบบ union ออกมา
//   แล้วเทียบตามตารางจับคู่ที่เขียนไว้ในไฟล์เก็บข้อมูลนั้น
//
// 🔄 วิธีเก็บข้อมูลจากไฟล์ออกแบบ (ต้องมีคนหรือ agent ที่ต่อ Figma อยู่)
//   สำหรับแต่ละหน้าที่มี component ให้รวบรวมจากทุก COMPONENT_SET ในหน้านั้น
//     axes        รวม variantGroupProperties ของทุกชุด แล้วรวมค่าที่เป็นไปได้ทั้งหมด
//     properties  รวมชื่อ componentPropertyDefinitions โดยตัดส่วนหลัง # ทิ้ง
//   แล้วเขียนลง tokens/figma-components.json พร้อมตารางจับคู่กับชื่อ prop ฝั่งโค้ด
//
// ⚠️ ตารางจับคู่ต้องเขียนด้วยมือ เพราะชื่อสองฝั่งไม่เหมือนกันโดยตั้งใจ
//    เช่น default-gray ในไฟล์ออกแบบ คู่กับ defaultGray ในโค้ด
//    และบางแกนไม่มีคู่เลยโดยตั้งใจ เช่น state ที่โค้ดใช้ pseudo-class ของ CSS แทน
//    ของแบบนั้นให้ใส่ไว้ใน accepted พร้อมเหตุผล ไม่ใช่ปล่อยให้ฟ้องซ้ำทุกครั้ง
//
// ใช้: npm run verify:api
import { readFileSync, existsSync, readdirSync } from 'node:fs'

const MANIFEST = 'tokens/figma-components.json'
const DIR = 'components'

if (!existsSync(MANIFEST)) {
  console.error(`\n❌ ไม่พบ ${MANIFEST}`)
  console.error('   ต้องให้ agent ที่ต่อ Figma อยู่เก็บแกนกับคุณสมบัติมาก่อน (ดูวิธีในหัวไฟล์นี้)\n')
  process.exit(1)
}
const manifest = JSON.parse(readFileSync(MANIFEST, 'utf8'))

// ── ถอด props กับชนิดข้อมูลแบบ union ออกจากไฟล์ tsx ──────────
//   ไม่ได้ใช้ตัวแปลภาษาเต็มรูป เพราะโครงไฟล์ในโปรเจกต์นี้สม่ำเสมอพอ
//   แต่ต้องกันกรณี interface ซ้อนวงเล็บปีกกา จึงนับวงเล็บแทนการหาวงเล็บปิดตัวแรก
const parseComponent = (name) => {
  const file = `${DIR}/${name}/${name}.tsx`
  if (!existsSync(file)) return null
  const src = readFileSync(file, 'utf8')

  const props = new Set()
  const start = src.search(new RegExp(`export interface ${name}Props[^{]*\\{`))
  if (start >= 0) {
    let i = src.indexOf('{', start)
    let depth = 0
    let end = i
    for (; end < src.length; end++) {
      if (src[end] === '{') depth++
      else if (src[end] === '}') { depth--; if (depth === 0) break }
    }
    const body = src.slice(i + 1, end)
    // เอาเฉพาะบรรทัดที่อยู่ชั้นบนสุดของ interface ไม่ใช่ชั้นในของ object ซ้อน
    let d = 0
    for (const line of body.split('\n')) {
      const trimmed = line.trim()
      if (d === 0) {
        const m = trimmed.match(/^(\w+)\??\s*:/)
        if (m) props.add(m[1])
      }
      d += (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length
    }
  }

  // union ของค่าที่เป็นไปได้ เช่น export type TagSize = 'xs' | 'sm' ...
  const unions = {}
  for (const m of src.matchAll(/export type (\w+)\s*=\s*([^;]+);/g)) {
    const values = [...m[2].matchAll(/'([^']+)'/g)].map((x) => x[1])
    if (values.length) unions[m[1]] = values
  }
  return { props, unions }
}

const rows = []
const accepted = []
let okAxes = 0
let okProps = 0
const notCaptured = []

for (const dir of readdirSync(DIR)) {
  if (!existsSync(`${DIR}/${dir}/${dir}.tsx`)) continue
  if (!manifest.components?.[dir]) { notCaptured.push(dir); continue }
}

for (const [name, spec] of Object.entries(manifest.components || {})) {
  const code = parseComponent(name)
  if (!code) { rows.push(['ไม่มีโค้ด', name, '', 'หาไฟล์ tsx ไม่เจอ']); continue }
  const map = spec.map || {}
  const acc = spec.accepted || {}

  for (const [axis, figmaValues] of Object.entries(spec.axes || {})) {
    if (acc[axis]) { accepted.push([`${name} · แกน ${axis}`, acc[axis]]); continue }
    const target = map.axes?.[axis]
    if (!target) { rows.push(['ไม่มีคู่', name, `แกน ${axis}`, 'ยังไม่ได้เขียนว่าคู่กับ prop ไหน']); continue }
    const prop = typeof target === 'string' ? target : target.prop
    if (!code.props.has(prop)) { rows.push(['ขาด prop', name, `แกน ${axis}`, `ต้องมี prop ${prop}`]); continue }
    const typeName = typeof target === 'object' ? target.type : null
    if (typeName) {
      const have = code.unions[typeName]
      if (!have) { rows.push(['ไม่เจอชนิด', name, `แกน ${axis}`, `หา export type ${typeName} ไม่เจอ`]); continue }
      const missing = figmaValues.filter((v) => !have.includes(v))
      if (missing.length) { rows.push(['ค่าไม่ครบ', name, `แกน ${axis}`, `${typeName} ขาด ${missing.join(' ')}`]); continue }
    }
    okAxes++
  }

  for (const figmaProp of spec.properties || []) {
    if (acc[figmaProp]) { accepted.push([`${name} · ${figmaProp}`, acc[figmaProp]]); continue }
    const prop = map.properties?.[figmaProp]
    if (!prop) { rows.push(['ไม่มีคู่', name, figmaProp, 'ยังไม่ได้เขียนว่าคู่กับ prop ไหน']); continue }
    if (!code.props.has(prop)) { rows.push(['ขาด prop', name, figmaProp, `ต้องมี prop ${prop}`]); continue }
    okProps++
  }
}

console.log('')
console.log(`เทียบแกน ${okAxes} ตัว · เทียบคุณสมบัติ ${okProps} ตัว · ยอมรับแล้ว ${accepted.length} · ต้องดู ${rows.length}`)
console.log('')
for (const [kind, name, what, why] of rows) {
  console.log(`  ❌ ${kind.padEnd(10)} ${name.padEnd(12)} ${String(what).padEnd(20)} ${why}`)
}
if (!rows.length) console.log('  ✅ โค้ดรองรับครบทุกแกนและทุกคุณสมบัติที่เก็บไว้')
console.log('')

if (accepted.length) {
  console.log('ที่ตัดสินแล้วว่าไม่ต้องมีคู่ในโค้ด')
  for (const [key, why] of accepted) console.log(`  ${key.padEnd(30)} ${why}`)
  console.log('')
}

if (notCaptured.length) {
  console.log(`⚠️  ยังไม่ได้เก็บแกนจากไฟล์ออกแบบ ${notCaptured.length} ตัว จึงยังตรวจไม่ได้`)
  console.log(`   ${notCaptured.join(' · ')}`)
  console.log('   เก็บเพิ่มได้ตามวิธีในหัวไฟล์ scripts/verify-component-api.mjs')
  console.log('')
}

process.exitCode = rows.length ? 1 : 0
