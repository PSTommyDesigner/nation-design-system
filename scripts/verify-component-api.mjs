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
//   แต่ต้องกันสามกรณีที่เคยทำให้อ่านพลาด
//     1. interface ที่มีวงเล็บปีกกาซ้อน จึงนับวงเล็บแทนการหาวงเล็บปิดตัวแรก
//     2. ⚠️ Props ที่ประกาศเป็น type alias ไม่ใช่ interface (เจอ 2026-10-19 ที่ LinkButton กับ Pagination)
//        เช่น `export type PaginationProps = PaginationBaseProps & PaginationNavigationProps`
//        ของเดิมหาเจอแค่ `export interface <ชื่อ>Props` จึงได้ 0 prop แล้วจะฟ้องผิดทั้งตัว
//        ตอนนี้ไล่ตามชื่อที่ alias อ้างถึงต่อไปเรื่อย ๆ และเก็บ object ที่เขียนไว้ตรงนั้นด้วย
//     3. ชนิดข้อมูลที่มี `;` อยู่ข้างใน เช่น `(page: number) => string;` ในบล็อก object
//        จึงหาจุดจบของ type ด้วยการนับวงเล็บ ไม่ใช่ `[^;]+`

/** อ่าน RHS ของ type ไปจนเจอ ; ที่อยู่นอกวงเล็บทุกชั้น (ไม่นับ < > เพราะชนกับ =>) */
const readTypeRhs = (src, from) => {
  let d = 0
  for (let j = from; j < src.length; j++) {
    const ch = src[j]
    if (ch === '{' || ch === '(' || ch === '[') d++
    else if (ch === '}' || ch === ')' || ch === ']') d--
    else if (ch === ';' && d === 0) return src.slice(from, j)
  }
  return src.slice(from)
}

/** ชื่อ prop ที่อยู่ชั้นบนสุดของบล็อก { ... } ไม่เอาชั้นในของ object ซ้อน */
const topLevelProps = (body) => {
  const out = []
  let d = 0
  for (const line of body.split('\n')) {
    const trimmed = line.trim()
    if (d === 0) {
      const m = trimmed.match(/^(\w+)\??\s*:/)
      if (m) out.push(m[1])
    }
    d += (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length
  }
  return out
}

/** เนื้อในของบล็อก { ... } ทุกบล็อกที่อยู่ชั้นนอกสุดของข้อความที่ให้มา */
const outerBlocks = (text) => {
  const out = []
  let d = 0
  let start = -1
  for (let i = 0; i < text.length; i++) {
    if (text[i] === '{') { if (d === 0) start = i + 1; d++ }
    else if (text[i] === '}') { d--; if (d === 0 && start >= 0) { out.push(text.slice(start, i)); start = -1 } }
  }
  return out
}

/**
 * อ่าน props ของ component ตัวหนึ่ง
 * spec.file     ใช้เมื่อ component อยู่ในไฟล์ของตัวอื่น เช่น AvatarGroup อยู่ใน Avatar.tsx
 * spec.propsType ใช้เมื่อชื่อชนิดข้อมูลไม่ใช่ `<ชื่อ>Props`
 */
const parseComponent = (name, spec = {}) => {
  const owner = spec.file || name
  const dir = `${DIR}/${owner}`
  if (!existsSync(`${dir}/${owner}.tsx`)) return null
  // ⚠️ ต้องอ่านทุกไฟล์ในโฟลเดอร์ ไม่ใช่แค่ <ชื่อ>.tsx (เจอ 2026-10-19 ที่ Pagination)
  //    ชนิดข้อมูลแบบ union บางตัวอยู่ในไฟล์ types.ts ข้าง ๆ ถ้าอ่านไฟล์เดียวจะฟ้องว่าหาชนิดไม่เจอ
  //    ทั้งที่โค้ดมีครบ ซึ่งเป็นการฟ้องผิด ไม่ใช่ช่องว่างจริง
  const src = readdirSync(dir)
    .filter((f) => /\.tsx?$/.test(f))
    .sort((a, b) => (a === `${owner}.tsx` ? -1 : b === `${owner}.tsx` ? 1 : a.localeCompare(b)))
    .map((f) => readFileSync(`${dir}/${f}`, 'utf8'))
    .join('\n')

  // เก็บ interface ทุกตัวในไฟล์ (ไม่ใช่เฉพาะตัวที่ชื่อลงท้าย Props)
  const interfaces = {}
  for (const m of src.matchAll(/(?:export\s+)?interface\s+(\w+)[^{]*\{/g)) {
    const open = m.index + m[0].length - 1
    let d = 0
    let end = open
    for (; end < src.length; end++) {
      if (src[end] === '{') d++
      else if (src[end] === '}') { d--; if (d === 0) break }
    }
    interfaces[m[1]] = src.slice(open + 1, end)
  }

  // เก็บ type alias ทุกตัว พร้อม RHS ดิบ
  const aliases = {}
  for (const m of src.matchAll(/(?:export\s+)?type\s+(\w+)\s*=\s*/g)) {
    aliases[m[1]] = readTypeRhs(src, m.index + m[0].length)
  }

  // ไล่หา props ของ <ชื่อ>Props ตามสายที่มันอ้างถึง
  const props = new Set()
  const seen = new Set()
  const collect = (typeName, depth = 0) => {
    if (depth > 8 || seen.has(typeName)) return
    seen.add(typeName)
    if (interfaces[typeName]) for (const p of topLevelProps(interfaces[typeName])) props.add(p)
    const rhs = aliases[typeName]
    if (!rhs) return
    for (const block of outerBlocks(rhs)) for (const p of topLevelProps(block)) props.add(p)
    // ชื่อชนิดข้อมูลอื่นที่ถูกอ้างถึง ตัวที่ไม่มีในไฟล์นี้จะไม่เจอแล้วข้ามไปเอง
    for (const ref of rhs.matchAll(/\b([A-Z]\w*)\b/g)) collect(ref[1], depth + 1)
  }
  collect(spec.propsType || `${name}Props`)

  // union ของค่าที่เป็นไปได้ เช่น export type TagSize = 'xs' | 'sm' ...
  const unions = {}
  for (const [typeName, rhs] of Object.entries(aliases)) {
    const values = [...rhs.matchAll(/'([^']+)'/g)].map((x) => x[1])
    if (values.length) unions[typeName] = values
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
  const code = parseComponent(name, spec)
  if (!code) { rows.push(['ไม่มีโค้ด', name, '', `หาไฟล์ ${spec.file || name}.tsx ไม่เจอ`]); continue }
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
