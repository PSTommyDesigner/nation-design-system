// ตรวจว่าไฟล์ token ในเครื่องกับตัวแปรในไฟล์ออกแบบ (Figma) ยังตรงกันอยู่ไหม
//
// ⚠️ ทำไมต้องมี (ตั้ง 2026-09-23)
//   ก่อนหน้านี้ไม่มีใครบอกได้ว่าไฟล์ออกแบบกับโค้ดหลุดจากกันตรงไหนบ้าง
//   ตอนสำรวจจริงพบว่าไฟล์ออกแบบนำหน้าอยู่ 244 ตัวแปร (state `pressed` ทั้งระบบ)
//   และชื่อกลุ่ม tag กับ badge เป็นคนละระบบกันมานานโดยไม่มีสัญญาณเตือน
//
// วิธีทำงาน
//   ฝั่ง Figma เก็บเป็น "ลายนิ้วมือ" (จำนวน + hash ของรายชื่อที่เรียงแล้ว) รายกลุ่ม
//   ไว้ที่ tokens/figma-fingerprint.json แทนการเก็บรายชื่อทั้ง 3,312 ตัว
//   สคริปต์นี้คำนวณลายนิ้วมือแบบเดียวกันจากไฟล์ token แล้วเทียบทีละกลุ่ม
//
// 🔄 วิธีรีเฟรชลายนิ้วมือของ "ค่า" (groupsValue) เพิ่ม 2026-10-15
//   จัดกลุ่มแบบเดียวกับชื่อ แต่เก็บ `ชื่อ=ค่า` แล้ว hash
//   ทำเฉพาะ collection ที่มี mode เดียว คือ component กับ primitive
//   ค่าต้องไล่ตามลูกโซ่การอ้างอิงให้ถึงค่าจริงก่อน ถ้าโซ่ออกไปนอกสอง collection นั้นให้ใช้ชื่อปลายทาง
//     ตัวเลข  String(Number(ค่า.toFixed(4)))      ปัดทศนิยมกัน float32 ของ Figma
//     สี      #rrggbb และถ้าโปร่งให้ต่อ @ตามด้วยความโปร่งทศนิยม 2 ตำแหน่ง
//   ⚠️ สูตรสองฝั่งต้องตรงกันเป๊ะ ถ้าแก้ที่นี่ต้องแก้ normLeaf กับ resolve ในไฟล์นี้ด้วย
//
// 🔄 วิธีรีเฟรชลายนิ้วมือ (ต้องมีคนหรือ agent ที่ต่อ Figma อยู่)
//   ให้ agent รัน Figma Plugin API ตามนี้ แล้วเขียนผลลงไฟล์ figma-fingerprint.json
//     const cols = await figma.variables.getLocalVariableCollectionsAsync()
//     const vars = await figma.variables.getLocalVariablesAsync()
//     จัดกลุ่มด้วย `<ชื่อ collection>::<ชื่อตัวแปรสองชั้นแรก>` แล้ว hash ด้วย djb2 ด้านล่าง
//   REST /variables/local ใช้ไม่ได้ เพราะเป็นของแพลน Enterprise เท่านั้น (ดู CLAUDE.md)
//
// ⚠️ ด่านนี้เทียบแค่ "ชื่อ" ไม่ได้เทียบ "ค่า" (พบจุดอ่อน 2026-10-15)
//   ลายนิ้วมือเก็บ hash ของรายชื่อที่เรียงแล้ว ถ้าชื่อครบแต่ค่าต่างกัน ด่านนี้จะขึ้นเขียว
//   เคยเกิดจริงตอนเปลี่ยน pill-icon-tag เป็น circular-icon-tag ชื่อตัวแปรย้ายครบ
//   แต่ค่าระยะขอบใน Figma ยังค้างของทรงแคปซูล 6 ถึง 10 ส่วนฝั่งโค้ดเป็น 3 ถึง 7
//   ทำให้ทรงที่ควรเป็นวงกลมกลายเป็นวงรี โดยด่านไม่เตือนสักคำ จับได้ตอนผู้ใช้ทัก
//   ถ้าจะปิดช่องนี้ ต้องเก็บ hash ของค่าลงลายนิ้วมือเพิ่มอีกชั้น ยังไม่ได้ทำ
//
// สิ่งที่รายงานไม่ใช่ error เสมอไป อ่านหมายเหตุท้ายผลลัพธ์ก่อนตัดสิน
import { readFileSync, existsSync } from 'node:fs'

const FP = 'tokens/figma-fingerprint.json'
const TOK = 'tokens/tokens.json'

// ไฟล์ token ไหนมาจาก collection ไหนใน Figma
// semantics แยกสองไฟล์ตาม mode แต่เป็น collection เดียวกัน จึงรวมรายชื่อก่อนเทียบ
const FILES = {
  component: ['component.json'],
  primitive: ['primitive.json'],
  semantics: ['semantics-light-mode.json', 'semantics-dark-mode.json'],
  grid: ['grid.json'],
  responsive: ['device.json'],
}

// collection ที่ไฟล์เก็บคนละทรงกับ Figma เพราะมีหลาย mode
// grid กับ responsive ค่าตรงกันอยู่แล้ว แต่โครงชื่อในไฟล์ไม่ตรง จึงข้ามการเทียบชื่อ
const SHAPE_DIFFERS = new Set(['grid', 'responsive'])

// ── collection ที่เทียบ "ค่า" ได้ (เพิ่ม 2026-10-15) ──────────
//   เทียบได้เฉพาะ collection ที่มี mode เดียว เพราะไฟล์ token เก็บค่าต่อ mode คนละไฟล์
//   semantics มี light กับ dark จึงยังเทียบค่าไม่ได้ ต้องทำแยกถ้าจะปิดช่องนั้น
const VALUE_COLLECTIONS = new Set(['component', 'primitive'])

// ── กลุ่มที่ตัดสินแล้วว่าไม่ตรงกันโดยตั้งใจ (ผู้ใช้ตัดสิน 2026-09-23) ──
// ถ้าไม่มีรายการนี้ ผลตรวจจะขึ้นเตือนซ้ำทุกครั้งจนคนอ่านเลิกสนใจ
// เพิ่มรายการใหม่ได้เฉพาะเมื่อผู้ใช้ตัดสินแล้ว พร้อมเขียนเหตุผลกำกับเสมอ
const ACCEPTED = {
  'component::color/background': 'ชื่อชนกับ collection semantics · รูปแบบไฟล์เก็บชื่อ collection ไม่ได้ ค่าอยู่ครบในไฟล์ semantics',
  'component::color/border': 'ชื่อชนกับ collection semantics · เหตุผลเดียวกับ color/background',
  'component::color/foreground': 'ชื่อชนกับ collection semantics · เหตุผลเดียวกับ color/background',
  'component::color/text': 'ชื่อชนกับ collection semantics · เหตุผลเดียวกับ color/background',
  'component::color/utility': 'ชื่อชนกับ collection semantics · เหตุผลเดียวกับ color/background',
  'component::link-button/height': 'ความสูงปุ่มลิงก์เป็นผลลัพธ์จากความสูงบรรทัดของ text style ไม่ใช่ตัวคุม จึงไม่ทำเป็นตัวแปรในไฟล์ออกแบบ',
  'component::toggle/travel': 'ระยะเลื่อนปุ่มกลมเป็นผลลัพธ์จากราง ปุ่มกลม และระยะขอบใน ไม่มีคุณสมบัติใน Figma ให้ผูก',
  'component::semi-rounded-tag/size': 'ฝั่งออกแบบใช้ความสูงแบบ hug ตัวเลขนี้มีไว้ให้ฝั่งโค้ดเท่านั้น',
  'component::pill-tag/size': 'ฝั่งออกแบบใช้ความสูงแบบ hug ตัวเลขนี้มีไว้ให้ฝั่งโค้ดเท่านั้น',
  'component::input/text-area': 'ต่างกันที่ min-lines ซึ่งเป็นจำนวนบรรทัด ไม่ใช่ขนาด ผูกกับอะไรใน Figma ไม่ได้',
  'component::motion/duration': 'เวลาเป็นพฤติกรรม ไม่ใช่ขนาด Figma ไม่มีที่เก็บหน่วยเวลาในตัวแปร จึงมีได้ฝั่งเดียว',
  'component::motion/easing': 'เส้นโค้งการเคลื่อนไหวเก็บเป็นตัวแปรใน Figma ไม่ได้ เหตุผลเดียวกับ motion/duration',
  'component::layer/content': 'ชั้นการวางซ้อนเป็นแนวคิดของ CSS ไม่มีคู่ใน Figma ซึ่งเรียงชั้นจากลำดับใน layer panel',
  'component::layer/sticky': 'เหตุผลเดียวกับ layer/content',
  'component::layer/floating': 'เหตุผลเดียวกับ layer/content',
  'component::layer/overlay': 'เหตุผลเดียวกับ layer/content',
  'component::layer/notification': 'เหตุผลเดียวกับ layer/content',
}

// djb2 · ต้องใช้สูตรเดียวกับฝั่งที่สร้างลายนิ้วมือ ห้ามเปลี่ยน
const djb2 = (s) => {
  let h = 5381
  for (let i = 0; i < s.length; i++) h = ((h * 33) ^ s.charCodeAt(i)) >>> 0
  return h.toString(36)
}

const leaves = (node, path = '', out = []) => {
  if (node && typeof node === 'object') {
    if ('$value' in node) { out.push([path, node]); return out }
    for (const [k, v] of Object.entries(node)) leaves(v, path ? `${path}/${k}` : k, out)
  }
  return out
}

// ── ทำค่าให้อยู่ในรูปเดียวกับที่ฝั่ง Figma คำนวณ ──────────────
//   เทียบ "ค่าสุดท้าย" ไม่ใช่ "รูปแบบที่เขียน" เพราะสองฝั่งเขียนคนละแบบได้โดยค่าเท่ากัน
//   เช่น ฝั่งโค้ดเขียน icon-button/size/xs ว่า {button.size.xs} ส่วน Figma เก็บเลข 24 ตรง ๆ
//   ถ้าเทียบรูปแบบจะฟ้องว่าไม่ตรงทั้งที่ค่าเท่ากัน จึงต้องไล่ตามลูกโซ่การอ้างอิงให้ถึงค่าจริงก่อน
//
//   ⚠️ ไล่ได้เฉพาะในขอบเขตที่มี mode เดียว ถ้าโซ่วิ่งข้ามไป semantics ซึ่งมีสองโหมด
//      ให้หยุดแล้วใช้ "ชื่อปลายทาง" เป็นตัวเทียบแทน เพราะค่าจริงขึ้นกับโหมด
//
//   ⚠️ ตัวเลขต้องปัดทศนิยม เพราะ Figma เก็บเป็น float32 ค่า 0.2 อ่านออกมาได้ 0.20000000298023224
const ROUND = 4
const numStr = (n) => String(Number(Number(n).toFixed(ROUND)))

const rgbToHex = (v) => {
  const m = v.match(/^rgba?\(\s*([0-9.]+)[,\s]+([0-9.]+)[,\s]+([0-9.]+)\s*(?:[,/]\s*([0-9.%]+)\s*)?\)$/i)
  if (!m) return null
  const h = (n) => Math.round(Number(n)).toString(16).padStart(2, '0')
  let out = '#' + h(m[1]) + h(m[2]) + h(m[3])
  if (m[4] !== undefined) {
    const a = m[4].endsWith('%') ? Number(m[4].slice(0, -1)) / 100 : Number(m[4])
    // ⚠️ ห้ามแปลงความโปร่งเป็นไบต์ของ hex (เคยพลาด 2026-10-15)
    //    Figma เก็บเป็น float32 ค่า 0.7 อ่านออกมาได้ 0.699999988 พอคูณ 255 ได้ 178.4999 ปัดลงเป็น 178
    //    ส่วนฝั่งโค้ดเป็น 0.7 เป๊ะ คูณ 255 ได้ 178.5 ปัดขึ้นเป็น 179 ต่างกัน 1 ทั้งที่สีเดียวกัน
    //    จึงเทียบความโปร่งเป็นตัวเลขทศนิยม 2 ตำแหน่งแทน ซึ่งทนความคลาดเคลื่อนของ float32
    if (Number(a.toFixed(2)) !== 1) out += '@' + Number(a.toFixed(2))
  }
  return out
}

// ดัชนีรวมของทุก token ที่ไล่ตามอ้างอิงได้ (เฉพาะไฟล์ที่มี mode เดียว)
const resolvable = new Map()

const normLeaf = (leaf) => {
  const v = leaf.$value
  if (typeof v !== 'string') return numStr(v)
  const px = v.match(/^(-?[0-9.]+)px$/)
  if (px) return numStr(px[1])
  if (leaf.$type === 'color') {
    const hex = rgbToHex(v)
    if (hex) return hex
    return v.toLowerCase()
  }
  return v
}

const resolve = (leaf, depth = 0) => {
  const v = leaf.$value
  if (typeof v === 'string') {
    const ref = v.match(/^\{(.+)\}$/)
    if (ref) {
      const path = ref[1].replace(/\./g, '/')
      const target = resolvable.get(path)
      // โซ่ยาวเกินไปแปลว่ามีวงวน หยุดแล้วใช้ชื่อแทน กันสคริปต์ค้าง
      if (target && depth < 12) return resolve(target, depth + 1)
      return path   // ออกนอกขอบเขตที่ไล่ได้ ใช้ชื่อปลายทางเป็นตัวเทียบ
    }
  }
  return normLeaf(leaf)
}

if (!existsSync(FP)) {
  console.error(`\n❌ ไม่พบ ${FP}`)
  console.error('   ต้องให้ agent ที่ต่อ Figma อยู่ดึงลายนิ้วมือมาเก็บก่อน (ดูวิธีในหัวไฟล์นี้)\n')
  process.exit(1)
}
const fpFile = JSON.parse(readFileSync(FP, 'utf8'))
const figma = fpFile.groups
const figmaValue = fpFile.groupsValue || null

const local = {}
const localValue = {}
const pending = []
for (const [collection, files] of Object.entries(FILES)) {
  const seen = new Map()
  for (const f of files) {
    if (!existsSync(`${TOK}/${f}`)) continue
    for (const [n, leaf] of leaves(JSON.parse(readFileSync(`${TOK}/${f}`, 'utf8')))) seen.set(n, leaf)
  }
  for (const [n, leaf] of seen) {
    const key = `${collection}::${n.split('/').slice(0, 2).join('/')}`
    ;(local[key] ||= new Set()).add(n)
    if (VALUE_COLLECTIONS.has(collection)) {
      pending.push([key, n, leaf])
      resolvable.set(n, leaf)
    }
  }
}
// ไล่ค่าหลังสร้างดัชนีครบแล้ว ไม่งั้นตัวที่อ้างถึงกันจะหาปลายทางไม่เจอ
for (const [key, n, leaf] of pending) (localValue[key] ||= new Set()).add(`${n}=${resolve(leaf)}`)

// ── semantics เทียบค่าแยกรายโหมด (เพิ่ม 2026-10-15) ──────────
//   collection นี้มีสองโหมด ไฟล์ token จึงเก็บคนละไฟล์ เทียบรวมทีเดียวไม่ได้
//   ⚠️ ไฟล์โหมดมืดเก็บเฉพาะตัวที่ค่าต่างจากโหมดสว่าง ตัวที่ไม่มีให้สืบค่าจากโหมดสว่าง
//      ตอนสำรวจ 2026-10-15 มี 240 ตัวที่มีแต่ในโหมดสว่าง ทั้งหมดเป็นชุดตัวอักษร
//      ซึ่งไม่เปลี่ยนตามโหมดอยู่แล้ว จึงสืบค่าได้ถูกต้อง
const readFile = (f) => {
  if (!existsSync(`${TOK}/${f}`)) return new Map()
  return new Map(leaves(JSON.parse(readFileSync(`${TOK}/${f}`, 'utf8'))))
}
const semLight = readFile('semantics-light-mode.json')
const semDark = readFile('semantics-dark-mode.json')
for (const [modeName, own] of [['light-mode', semLight], ['dark-mode', new Map([...semLight, ...semDark])]]) {
  const saved = new Map(resolvable)
  for (const [n, leaf] of own) resolvable.set(n, leaf)
  for (const [n, leaf] of own) {
    const key = `semantics@${modeName}::${n.split('/').slice(0, 2).join('/')}`
    ;(localValue[key] ||= new Set()).add(`${n}=${resolve(leaf)}`)
  }
  resolvable.clear()
  for (const [k, v] of saved) resolvable.set(k, v)
}

const fingerprint = (set) => {
  const sorted = [...set].sort()
  return `${sorted.length}:${djb2(sorted.join('\n'))}`
}

const rows = []
const accepted = []
let match = 0
for (const key of [...new Set([...Object.keys(figma), ...Object.keys(local)])].sort()) {
  if (SHAPE_DIFFERS.has(key.split('::')[0])) continue
  const f = figma[key]
  const l = local[key] ? fingerprint(local[key]) : null
  if (f && l && f === l) { match++; continue }
  const kind = f && !l ? 'ขาดในโค้ด' : !f && l ? 'เกินในโค้ด' : 'ไม่ตรงกัน'
  if (ACCEPTED[key]) { accepted.push([key, ACCEPTED[key]]); continue }
  rows.push([kind, key, f || '-', l || '-'])
}

console.log(`\nตรงกัน ${match} กลุ่ม · ยอมรับแล้ว ${accepted.length} กลุ่ม · ต้องดู ${rows.length} กลุ่ม\n`)
for (const [kind, key, f, l] of rows) {
  console.log(`  ${kind.padEnd(12)} ${key.padEnd(46)} figma=${String(f).padEnd(14)} code=${l}`)
}
if (!rows.length) console.log('  ไม่มีกลุ่มที่ต้องดู\n')

// ── ด่านที่สอง เทียบค่า ไม่ใช่แค่ชื่อ ────────────────────────
let valueBad = 0
if (!figmaValue) {
  console.log('⚠️  ลายนิ้วมือยังไม่มีช่อง groupsValue จึงข้ามการเทียบค่า')
  console.log('   ให้ agent ที่ต่อ Figma ดึงมาเก็บก่อน (ดูวิธีในหัวไฟล์นี้)\n')
} else {
  const vrows = []
  for (const key of [...new Set([...Object.keys(figmaValue), ...Object.keys(localValue)])].sort()) {
    if (ACCEPTED[key]) continue
    const f = figmaValue[key]
    const l = localValue[key] ? fingerprint(localValue[key]) : null
    if (f && l && f === l) continue
    if (!f || !l) continue   // ชื่อไม่ครบ ด่านแรกฟ้องไปแล้ว ไม่ต้องฟ้องซ้ำ
    vrows.push([key, f, l])
  }
  valueBad = vrows.length
  console.log(`เทียบค่า ตรงกัน ${Object.keys(figmaValue).filter((k) => !ACCEPTED[k] && localValue[k] && figmaValue[k] === fingerprint(localValue[k])).length} กลุ่ม · ค่าไม่ตรง ${valueBad} กลุ่ม`)
  for (const [key, f, l] of vrows) {
    console.log(`  ❌ ค่าไม่ตรง   ${key.padEnd(46)} figma=${String(f).padEnd(14)} code=${l}`)
  }
  if (!valueBad) console.log('  ไม่มีกลุ่มที่ค่าไม่ตรง')
  console.log('')
}

console.log('กลุ่มที่ตัดสินแล้วว่าต่างกันโดยตั้งใจ')
for (const [key, why] of accepted) console.log(`  ${key.padEnd(46)} ${why}`)
console.log(`
  grid กับ responsive ข้ามการเทียบ เพราะเป็น collection หลาย mode ที่ไฟล์เก็บคนละทรง ค่าตรงกันอยู่แล้ว
  ถ้ามีกลุ่มใหม่ขึ้นในช่อง "ต้องดู" แปลว่าไฟล์ออกแบบกับโค้ดเพิ่งหลุดจากกัน ให้ไล่ดูทันที
`)

process.exitCode = (rows.length || valueBad) ? 1 : 0
