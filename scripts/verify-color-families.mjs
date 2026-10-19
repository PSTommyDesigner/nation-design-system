// ตรวจว่าสีที่แต่ละตระกูลใช้ในไฟล์ออกแบบ เป็นสีของตระกูลตัวเองจริงไหม
//
// ⚠️ ทำไมต้องมี (ตั้ง 2026-10-19)
//   ด่านที่มีอยู่เดิมทั้งสี่ตัวจับเรื่องนี้ไม่ได้เลย เพราะทุกจุด "ผูกตัวแปรถูกต้องตามกฎ"
//   ไม่ใช่สีดิบ ไม่ใช่ชื่อ token ที่ไม่มีจริง ไม่ใช่ค่าที่หลุดจากกัน แค่ "ผูกผิดตระกูล"
//   เคยเกิดจริง ชุด icon-tag กับ circular-icon-tag กับ link-icon-tag ของตระกูล Brown
//   ถูกโคลนมาจากตระกูล Blue แล้วลืมเปลี่ยนสีไอคอน ค้างเป็นสีน้ำเงิน 45 จุด
//   กล่องกับขอบเปลี่ยนเป็นน้ำตาลครบแล้ว เลยดูผ่าน ๆ เหมือนถูก และอยู่แบบนั้นจนหัวหน้าทักเอง
//
// ตรวจ 2 ข้อ
//   1. สีไอคอนต้องตรงกับสีตัวอักษรของชุดอ้างอิงในตระกูลเดียวกัน ทีละค่าของแกน
//      (ชุดอ้างอิงคือชุดที่มีข้อความ ซึ่งทาสีถูกอยู่แล้ว ดู references ในไฟล์เก็บข้อมูล)
//   2. ตัวแปรชื่อ u-<ตระกูล>-<ขั้น> ต้องอยู่ในตระกูลของตัวเองเท่านั้น
//      ยกเว้นสีเทา ที่แกน default-gray=true ตั้งใจให้ทุกตระกูลใช้ แต่ต้องอยู่ในแกนนั้นเท่านั้น
//      ถ้าสีเทาโผล่นอกแกนนั้น แปลว่ามีตัวที่ลืมทาสีประจำตระกูล
//
// 🔄 วิธีเก็บข้อมูลจากไฟล์ออกแบบ (ต้องมีคนหรือ agent ที่ต่อ Figma อยู่)
//   สำหรับหน้าที่จัดชิ้นงานเป็นตระกูลสี ให้ไล่ทุกเฟรมตระกูลในหน้านั้น แล้วเก็บ
//     text   ต่อชุดอ้างอิง  คือสีของโหนด TEXT แรกที่มี fill ในแต่ละ variant จัดกลุ่มตามค่าของแกน
//     icon   ต่อชุดเป้าหมาย คือสีของโหนด VECTOR ในแต่ละ variant จัดกลุ่มแบบเดียวกัน
//     usage  คือทุกตัวแปรสีที่ใช้ในตระกูลนั้น นับแยกเป็น [อยู่ในแกนสีเทา, อยู่นอกแกนสีเทา]
//   ชื่อสีกับค่าของแกนเก็บเป็นดัชนีของ colors กับ keys เพื่อให้ไฟล์ไม่บวม
//   แล้วเขียนลง tokens/figma-color-families.json
//
// ⚠️ colorToken ต้องเขียนด้วยมือเมื่อชื่อเฟรมไม่ตรงกับคำในชื่อตัวแปร
//    เช่นเฟรมชื่อ "Neutral Tags" แต่ตัวแปรใช้คำว่า gray
//
// ใช้: npm run verify:families
import { readFileSync, existsSync } from 'node:fs'

const FILE = 'tokens/figma-color-families.json'

if (!existsSync(FILE)) {
  console.error(`\n❌ ไม่พบ ${FILE}`)
  console.error('   ต้องให้ agent ที่ต่อ Figma อยู่เก็บข้อมูลมาก่อน (ดูวิธีในหัวไฟล์นี้)\n')
  process.exit(1)
}
const data = JSON.parse(readFileSync(FILE, 'utf8'))
const neutral = new Set(data.neutralColorTokens || [])

const rows = []
let okIcon = 0
let okColor = 0
let families = 0

for (const [pageName, page] of Object.entries(data.pages || {})) {
  const colorName = (i) => page.colors[i] ?? `(ดัชนี ${i} ไม่มีในตาราง)`
  const keyName = (i) => page.keys[i] ?? `(ดัชนี ${i} ไม่มีในตาราง)`

  for (const [famName, fam] of Object.entries(page.families || {})) {
    families++

    // ── ข้อ 1 สีไอคอนเทียบกับสีตัวอักษรของชุดอ้างอิง ──
    for (const [target, ref] of Object.entries(page.references || {})) {
      const want = fam.text?.[ref]
      const got = fam.icon?.[target]
      if (!want) { rows.push([pageName, famName, target, `ไม่มีชุดอ้างอิง ${ref} ให้เทียบ`]); continue }
      if (!got) { rows.push([pageName, famName, target, 'ไม่มีชุดนี้ในตระกูล']); continue }
      for (const [k, wantIdx] of Object.entries(want)) {
        if (!(k in got)) { rows.push([pageName, famName, target, `แกน ${keyName(k)} ไม่มีในชุดนี้`]); continue }
        if (got[k] !== wantIdx) {
          rows.push([pageName, famName, target,
            `แกน ${keyName(k)} ไอคอนเป็น ${colorName(got[k])} แต่ข้อความของ ${ref} เป็น ${colorName(wantIdx)}`])
          continue
        }
        okIcon++
      }
    }

    // ── ข้อ 2 ตัวแปรข้ามตระกูล ──
    const mine = fam.colorToken
    for (const [idx, counts] of Object.entries(fam.usage || {})) {
      const name = colorName(idx)
      const m = name.match(/u-([a-z]+)-\d+/)
      if (!m) { okColor++; continue } // สีกลางของระบบ ไม่ผูกกับตระกูล
      const owner = m[1]
      const [inGrayAxis, outsideGrayAxis] = counts
      if (owner === mine) { okColor++; continue }
      if (neutral.has(owner)) {
        if (outsideGrayAxis > 0) {
          rows.push([pageName, famName, name,
            `สีเทาโผล่นอกแกน default-gray ${outsideGrayAxis} จุด น่าจะมีตัวที่ลืมทาสีประจำตระกูล`])
          continue
        }
        okColor++
        continue
      }
      rows.push([pageName, famName, name,
        `เป็นสีของตระกูล ${owner} แต่อยู่ในตระกูล ${mine} รวม ${inGrayAxis + outsideGrayAxis} จุด`])
    }
  }
}

const pad = (s, n) => String(s).padEnd(n)
console.log('')
console.log(`เก็บข้อมูลเมื่อ ${data.capturedAt} · ตระกูล ${families} · เทียบสีไอคอน ${okIcon} · เทียบตัวแปร ${okColor} · ต้องดู ${rows.length}`)
console.log('')
for (const [page, fam, what, why] of rows) {
  console.log(`  ❌ ${pad(page, 10)} ${pad(fam, 14)} ${pad(what, 20)} ${why}`)
}
if (!rows.length) console.log('  ✅ ทุกตระกูลใช้สีของตัวเอง และสีไอคอนตรงกับชุดอ้างอิงครบทุกค่าของแกน')
console.log('')
console.log(`  หมายเหตุ ${data.neutralReason}`)
console.log('')

process.exitCode = rows.length ? 1 : 0
