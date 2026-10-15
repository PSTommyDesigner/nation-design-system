// สร้าง token 2 tier จาก tokens/scale/* (per-component base+scale → สูตร)
//   • semantic tier → tokens/tokens.json/scale.json  ({ scale.<comp>.* } = base/step knob)
//   • component tier → tokens/tokens.json/component.json ({ <comp>.* } ชื่อเดียวกับไฟล์ออกแบบ)
// สูตรอยู่ที่นี่ (ตัวเลือก ก): size[i] = base + i × step  (คำนวณใน component .mjs build())
// รันก่อน tokens:build → build ได้ค่า resolved แล้ว
import { readFileSync, writeFileSync } from 'node:fs'
import { COMPONENTS } from '../tokens/scale/index.mjs'
import { SIZES, RADIUS_SCALE, RADIUS_FORMULA, SPACE_SCALE, SPACE_GROUPS, SPACE_GROUP_BAND } from '../tokens/scale/global-scale.config.mjs'

const dim = (v) => ({ '$type': 'dimension', '$value': `${v}px` })

// ── ด่านตรวจ radius (ตั้ง 2026-08-24) ──────────────────────────
// กติกา: ค่ามุมโค้งทุกค่าต้องมาจาก RADIUS_SCALE หรือเป็นผลจาก RADIUS_FORMULA เท่านั้น
// ถ้าใครพิมพ์ตัวเลขเองลงไฟล์ component build จะไม่ผ่าน
// เหตุผลเต็ม: docs/rules/token-naming-taxonomy.md §3.3.1 · docs/06-shape.md ข้อ 6
// ค่าที่ทุก component หยิบได้ = ขั้นในสเกลกลาง
const scaleValues = new Map(Object.entries(RADIUS_SCALE).map(([step, v]) => [v, `RADIUS_SCALE.${step}`]))
// ค่าที่มาจากสูตร อนุญาตเฉพาะ component ที่เป็นเจ้าของสูตรนั้นเท่านั้น
const formulaValues = (compName) => {
  const f = RADIUS_FORMULA[compName]
  if (!f) return new Map()
  return new Map(SIZES.map((s, i) => [f.base + i * f.step, `RADIUS_FORMULA.${compName} (${s})`]))
}
const radiusErrors = []
const checkRadius = (compName, path, node, allowed) => {
  if (node && typeof node === 'object' && '$value' in node) {
    const px = Number(String(node.$value).replace('px', ''))
    if (!allowed.has(px)) radiusErrors.push(`${compName}.${path} = ${px}px`)
    return
  }
  if (node && typeof node === 'object') for (const [k, v] of Object.entries(node)) checkRadius(compName, path ? `${path}.${k}` : k, v, allowed)
}

// รวมผลจากทุก component ใน registry
const semantic = {}   // → scale.json  { scale: {...} }
const componentSpace = {}
const checksByComp = {}     // สมการปิดที่ component ประกาศเอง (ดูด่านตรวจ spacing)
const allowNegByComp = {}   // path ที่อนุญาตให้ติดลบได้ เช่นระยะซ้อนของกลุ่มอวาตาร์
const componentRadius = {}  // → component.json  { <comp>.radius.* } (ไม่อยู่ใต้ space)
const done = []
for (const c of COMPONENTS) {
  const built = c.build?.(dim)
  if (!built) continue
  // component ที่นิยามเฉพาะ radius (ยังไม่มี spacing spec) จะคืน semantic/component เป็น null
  if (built.semantic) semantic[built.name] = built.semantic
  if (built.component) componentSpace[built.name] = built.component
  if (built.radius) {
    const allowed = new Map([...scaleValues, ...formulaValues(built.name)])
    checkRadius(built.name, 'radius', built.radius, allowed)
    for (const target of built.radiusAppliesTo || [built.name]) componentRadius[target] = built.radius
  }
  if (built.checks) checksByComp[built.name] = built.checks
  if (built.allowNegative) allowNegByComp[built.name] = built.allowNegative
  done.push(built.name)
}

// ด่านตรวจ: ถ้ามีค่ามุมโค้งที่ไม่ได้มาจากสเกลกลาง ให้ build ไม่ผ่าน
if (radiusErrors.length) {
  console.error('\n❌ generate-scale: พบค่ามุมโค้งที่ไม่ได้มาจากสเกลกลาง ' + radiusErrors.length + ' จุด\n')
  for (const e of radiusErrors) console.error('   ' + e)
  console.error('\n   ขั้นในสเกลกลางที่หยิบได้: ' + [...scaleValues.entries()].sort((a, b) => a[0] - b[0]).map(([v, src]) => `${v} (${src})`).join(' · '))
  console.error('   ค่าจากสูตรใช้ได้เฉพาะ component ที่เป็นเจ้าของสูตรเท่านั้น: ' + Object.keys(RADIUS_FORMULA).join(', '))
  console.error('   แก้โดยหยิบขั้นจาก RADIUS_SCALE ใน tokens/scale/global-scale.config.mjs')
  console.error('   ถ้าจำเป็นต้องใช้ค่าใหม่จริง ต้องขออนุมัติก่อนเพิ่มขั้นเข้าสเกล (กฎ ask-first)\n')
  process.exit(1)
}

// ── ด่านตรวจ spacing (ตั้ง 2026-09-11) ─────────────────────────
// คู่กับด่านตรวจมุมโค้งด้านบน แต่ตรรกะคนละแบบโดยตั้งใจ
//
// ทำไมลอกตรรกะของมุมโค้งมาไม่ได้:
//   มุมโค้งมีสเกลกลางที่ทุกคนต้องหยิบ ส่วนระยะห่างภายในชิ้นงานเป็นของชิ้นงานนั้นเอง
//   (ขอบเขตที่ตัดสิน 2026-08-26 ดูคอมเมนต์ของ SPACE_SCALE) ถ้าบังคับให้ค่าต้องอยู่ในสเกลกลาง
//   จะ build ไม่ผ่านทันทีทั้ง badge tag input ซึ่งค่าถูกต้องอยู่แล้ว
//   และห้ามบังคับให้เป็นเส้นตรงด้วย เพราะระยะขอบของแท็กกับป้าย (5 5 6 7 8) เป็นผลลัพธ์จาก
//   ความสูงบรรทัดของ preset ซึ่งไม่ได้เรียงเป็นขั้นเท่ากัน มีคอมเมนต์ห้ามยัดเป็นสูตรไว้แล้ว
//
// สิ่งที่ด่านนี้จับจริง คือ "ตัวเลขที่โผล่มาโดยไม่มีใครอธิบายได้ว่ามาจากไหน"
//   กฎ 1  ชุด 5 ขนาดต้องเป็นเส้นตรง (มาจากสูตร) หรือมี $description ครบทุกขั้น (เป็นตารางค่าที่ตั้งใจ)
//   กฎ 2  ค่าเดี่ยวที่ไม่มีขนาดต้องมี $description เสมอ
//   กฎ 3  ค่าต้องเป็นจำนวนเต็มและไม่ติดลบ เว้นแต่ component ประกาศ allowNegative
//   กฎ 4  component ที่ประกาศ checks ต้องบวกกลับได้ทุกขนาด (กฎ "ค่าต้องสอดคล้องกันเอง" ใน CLAUDE.md)
// ─────────────────────────────────────────────────────────────
const spaceErrors = []
const flatSpace = (node, path = '', out = []) => {
  if (node && typeof node === 'object' && '$value' in node) {
    out.push({ path, px: Number(String(node.$value).replace('px', '')), described: Boolean(node.$description) })
    return out
  }
  if (node && typeof node === 'object') for (const [k, v] of Object.entries(node)) flatSpace(v, path ? `${path}.${k}` : k, out)
  return out
}

for (const [compName, component] of Object.entries(componentSpace)) {
  const rows = flatSpace(component)
  const allowNeg = new Set(allowNegByComp[compName] || [])
  const groups = {}
  for (const r of rows) {
    const m = r.path.match(/^(.*)\.(xs|sm|md|lg|xl)$/)
    if (m) (groups[m[1]] ||= {})[m[2]] = r
    // กฎ 2 · ค่าเดี่ยวต้องมีคำอธิบาย
    else if (!r.described) spaceErrors.push(`${compName}.${r.path} = ${r.px} เป็นค่าเดี่ยวที่ไม่มี $description`)
    // กฎ 3 · ค่าต้องเป็นจำนวนเต็มและไม่ติดลบ
    if (!Number.isInteger(r.px)) spaceErrors.push(`${compName}.${r.path} = ${r.px} ไม่ใช่จำนวนเต็ม`)
    if (r.px < 0 && !allowNeg.has(r.path.replace(/\.(xs|sm|md|lg|xl)$/, ''))) {
      spaceErrors.push(`${compName}.${r.path} = ${r.px} ติดลบ ถ้าตั้งใจให้ประกาศ allowNegative ในไฟล์สูตรของ component`)
    }
  }
  // กฎ 1 · ชุดขนาดต้องเป็นเส้นตรง หรือมีคำอธิบายครบ
  for (const [g, bySize] of Object.entries(groups)) {
    const seq = SIZES.filter((s) => bySize[s]).map((s) => bySize[s])
    const steps = seq.slice(1).map((r, i) => r.px - seq[i].px)
    const linear = new Set(steps).size <= 1
    const allDescribed = seq.every((r) => r.described)
    if (!linear && !allDescribed) {
      const missing = seq.filter((r) => !r.described).map((r) => r.path).join(', ')
      spaceErrors.push(`${compName}.${g} = ${seq.map((r) => r.px).join(' ')} ไม่เป็นเส้นตรง (ขั้นห่าง ${steps.join(', ')}) และขาด $description ที่ ${missing}`)
    }
  }
  // กฎ 4 · สมการปิดที่ component ประกาศเอง
  for (const chk of checksByComp[compName] || []) {
    const at = (path, size) => {
      const r = rows.find((x) => x.path === `${path}.${size}`)
      return r ? r.px : undefined
    }
    for (const s of SIZES) {
      const pair = chk.eq(at, s)
      if (!pair || pair.some((v) => v === undefined || Number.isNaN(v))) continue // ขนาดที่ component นี้ไม่ได้เปิดใช้
      const [lhs, rhs] = pair
      if (lhs !== rhs) spaceErrors.push(`${compName} ขนาด ${s} ไม่ผ่าน "${chk.label}" (${lhs} ไม่เท่ากับ ${rhs})`)
    }
  }
}

if (spaceErrors.length) {
  console.error('\n❌ generate-scale: พบค่าระยะห่างที่อธิบายที่มาไม่ได้ ' + spaceErrors.length + ' จุด\n')
  for (const e of spaceErrors) console.error('   ' + e)
  console.error('\n   ค่าที่เป็นชุดขนาดต้องมาจากสูตร size[i] = base + i × step')
  console.error('   ถ้าเป็นตารางค่าที่ตั้งใจ (เช่นระยะขอบที่คิดจากความสูงบรรทัดของ preset)')
  console.error('   ให้ใส่ $description ทุกขั้นว่าค่ามาจากไหน แล้วด่านนี้จะปล่อยผ่าน')
  console.error('   ห้ามพิมพ์ตัวเลขลอยโดยไม่บอกที่มา เป็นสภาพเดียวกับสีดิบที่ห้ามไว้\n')
  process.exit(1)
}

// 1) semantic tier → scale.json (namespace รูท "scale")
writeFileSync('tokens/tokens.json/scale.json', JSON.stringify({ scale: semantic }, null, 2) + '\n')

// ─────────────────────────────────────────────────────────────
// ชั้นแปลงชื่อให้ตรงกับไฟล์ออกแบบ (ตั้ง 2026-09-23 ผู้ใช้สั่ง "ยึด Figma")
//
// ⚠️ ที่มา: เดิมตัวสร้างสเกลออกชื่อเป็น space.<comp>.* ส่วน Figma ใช้ <comp>/*
//    ผลคือของชิ้นเดียวกันมีตัวแปรสองชื่อ (--ntg-button-padding-top-md กับ
//    --ntg-space-button-padding-t-md) คนเลือกไม่รู้ว่าต้องใช้ตัวไหน
//    และไฟล์ออกแบบกับโค้ดหลุดจากกันเงียบ ๆ เพราะไม่มีใครเทียบชื่อได้
//
// กติกา: **ไฟล์ออกแบบเป็นเจ้าของชื่อ** ตัวสร้างสเกลเป็นเจ้าของ "ค่า"
//    ตรวจว่าชื่อตรงกันจริงด้วย `node scripts/verify-figma-sync.mjs`
// ─────────────────────────────────────────────────────────────
const SIDE = { t: 'top', r: 'right', b: 'bottom', l: 'left' }
// component ที่ชื่อขึ้นต้นด้วยทรง (semi-rounded-tag · pill-badge ...) ตามกฎตั้งชื่อ 2026-09-01
const SHAPED = new Set(['tag', 'badge'])
// ไฟล์สูตรที่ประกาศ component หลายชื่อในไฟล์เดียว คีย์ชั้นบนคือชื่อ component ในไฟล์ออกแบบตรง ๆ
// ใช้เมื่อสามชิ้นงานใช้ตัวเลขชุดเดียวกันจนแยกไฟล์แล้วจะต้องเขียนซ้ำ (ตั้ง 2026-10-08 พร้อมหน้า 23)
const FLAT = new Set(['progress'])
// คีย์ที่ Figma สะกดต่างจากชื่อภายในของไฟล์สูตร
const RENAME = { textarea: 'text-area' }

const isLeaf = (n) => n && typeof n === 'object' && '$value' in n
// เปลี่ยนชื่อคีย์ย่อให้เป็นชื่อเต็มแบบเดียวกับไฟล์ออกแบบ (t → top ฯลฯ)
function expandKeys(node) {
  if (!node || typeof node !== 'object' || isLeaf(node)) return node
  const out = {}
  for (const [k, v] of Object.entries(node)) out[SIDE[k] || RENAME[k] || k] = expandKeys(v)
  return out
}
// ค่าเดียวต่อขนาด → กระจายเป็น 4 ด้าน ตามที่ไฟล์ออกแบบเก็บแยกราย­ด้าน
function spreadToSides(bySize) {
  const out = {}
  for (const side of Object.values(SIDE)) out[side] = { ...bySize }
  return out
}

const figmaTree = {}
const put = (top, sub, value) => {
  figmaTree[top] = figmaTree[top] || {}
  figmaTree[top][sub] = value
}

for (const [compName, tree] of Object.entries(componentSpace)) {
  const t = expandKeys(tree)
  if (FLAT.has(compName)) {
    for (const [figmaName, sub] of Object.entries(t)) {
      for (const [k, v] of Object.entries(sub)) put(figmaName, k, v)
    }
    continue
  }
  if (SHAPED.has(compName)) {
    // tag.semi-rounded.* → semi-rounded-tag.*  (ชื่อเฟรมใน Figma นำทรงมาไว้หน้าชนิด)
    for (const [shape, sub] of Object.entries(t)) {
      for (const [k, v] of Object.entries(sub)) put(`${shape}-${compName}`, k, v)
    }
    continue
  }
  for (const [k, v] of Object.entries(t)) {
    // ปุ่ม: ความสูงของกล่องคือสิ่งเดียวกับ button/size ในไฟล์ออกแบบ
    if (compName === 'button' && k === 'size') continue
    if (compName === 'button' && k === 'height') { put('button', 'size', v); continue }
    // ระยะขอบของปุ่มไอคอนอยู่คนละ component ในไฟล์ออกแบบ
    if (k === 'padding' && v['icon-only']) {
      const { 'icon-only': iconOnly, ...rest } = v
      if (Object.keys(rest).length) put(compName, 'padding', rest)
      if (compName === 'button') put('icon-button', 'padding', spreadToSides(iconOnly))
      else if (compName === 'link-button') put('link-icon-button', 'icon-only-padding', spreadToSides(iconOnly))
      else put(compName, 'icon-only-padding', spreadToSides(iconOnly))
      continue
    }
    put(compName, k, v)
  }
}

// 2) component tier → component.json (<comp>.* ตามชื่อในไฟล์ออกแบบ)
const compPath = 'tokens/tokens.json/component.json'
const comp = JSON.parse(readFileSync(compPath, 'utf8'))
// ล้างชื่อรุ่นเก่าออกก่อน ไม่งั้นจะเหลือตัวแปรสองชุดสำหรับของชิ้นเดียวกัน
delete comp.space
for (const oldTop of SHAPED) delete comp[oldTop]
for (const [top, tree] of Object.entries(figmaTree)) comp[top] = { ...(comp[top] || {}), ...tree }
// 2b) radius ต่อ component (คงโครง <comp>.radius.<corner>.<size> เดิมที่ Figma ผูก variable รายมุม)
for (const [target, radius] of Object.entries(componentRadius)) {
  if (SHAPED.has(target)) {
    // radius ของ tag/badge แยกตามทรง จึงไปอยู่กับ component ที่ขึ้นต้นด้วยทรงนั้น
    for (const [shape, r] of Object.entries(radius)) {
      const key = `${shape}-${target}`
      comp[key] = comp[key] || {}
      comp[key].radius = expandKeys(r)
    }
    continue
  }
  if (!comp[target]) comp[target] = {}
  comp[target].radius = expandKeys(radius)
}
// 2c) สเกลระยะห่างกลาง → component.json (size.space.<กลุ่ม>.<ขนาด>)
// ชั้นนี้เป็น variable ใน Figma collection `component` (ต่างจาก radius ที่ชั้นกลางไม่เป็น variable)
// เหตุผลเต็มอยู่ที่คอมเมนต์ของ SPACE_SCALE ใน tokens/scale/global-scale.config.mjs
const spaceScale = { none: { ...dim(SPACE_SCALE.none), '$description': 'ไม่มีระยะห่าง ใช้เมื่อต้องการให้ชิดกันสนิท' } }
for (const g of Object.keys(SPACE_GROUPS)) {
  const { base, step } = SPACE_GROUPS[g]
  spaceScale[g] = Object.fromEntries(
    SIZES.map((s) => [
      s,
      { ...dim(SPACE_SCALE[g][s]), '$description': `${SPACE_SCALE[g][s]}px · ${SPACE_GROUP_BAND[g]} · กลุ่ม ${g} base ${base} step ${step}` },
    ]),
  )
}
// ── ด่านตรวจสเกลกลาง · ชื่อสองชื่อห้ามหมายถึงค่าเดียวกัน ────────
// ถ้าวันหลังมีคนขยับ base หรือ step ของกลุ่มใดกลุ่มหนึ่งจนค่าไปชนกลุ่มอื่น
// คนเลือกจะมีสองทางเลือกที่ให้ผลเหมือนกัน ซึ่งเป็นต้นเหตุที่เจ้าอื่นเคยต้องยกเลิกทั้งตระกูล
// (หลักฐานอยู่ในบันทึกวันที่ 2026-08-26 ตอนหาข้อมูลระบบระยะห่างของ 14 เจ้า)
const seenPx = new Map()
const spaceDup = []
for (const g of Object.keys(SPACE_GROUPS)) {
  for (const s of SIZES) {
    const v = SPACE_SCALE[g][s]
    if (seenPx.has(v)) spaceDup.push(`size/space/${g}/${s} = ${v}px ซ้ำกับ ${seenPx.get(v)}`)
    else seenPx.set(v, `size/space/${g}/${s}`)
  }
}
if (spaceDup.length) {
  console.error('\n❌ generate-scale: สเกลระยะห่างกลางมีค่าซ้ำ ' + spaceDup.length + ' จุด\n')
  for (const e of spaceDup) console.error('   ' + e)
  console.error('\n   แก้ base หรือ step ของกลุ่มที่ชนกันใน SPACE_GROUPS ให้ช่วงไม่ทับกัน\n')
  process.exit(1)
}

comp.size = { ...(comp.size || {}), space: spaceScale }

writeFileSync(compPath, JSON.stringify(comp, null, 2) + '\n')

// 3) ถอด primitive size.space (ย้าย logic ไป per-component semantic tier แล้ว)
const primPath = 'tokens/tokens.json/primitive.json'
const prim = JSON.parse(readFileSync(primPath, 'utf8'))
if (prim.size && prim.size.space) { delete prim.size.space; writeFileSync(primPath, JSON.stringify(prim, null, 2) + '\n') }

console.log(`✅ generate-scale: scale.json (semantic base/step) + component {${Object.keys(figmaTree).sort().join(",")}} (ชื่อตาม Figma) + size.space ${1 + Object.keys(SPACE_GROUPS).length * SIZES.length} ขั้น (สเกลกลาง ${Object.keys(SPACE_GROUPS).length} กลุ่ม)`)
