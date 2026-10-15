// worklog-task.mjs · โพสต์คอมเมนต์ลงการ์ดงานใน Asana พร้อมด่านตรวจรูปแบบ
//
// ใช้:
//   npm run worklog:task -- --new <taskGid>        สร้างไฟล์โครงให้เติม
//   npm run worklog:task -- <taskGid> <file.md>    ตรวจแล้วโพสต์
//   npm run worklog:task -- <taskGid> <file.md> --dry   ตรวจอย่างเดียว ไม่โพสต์
//
// ทำไมต้องมีสคริปต์นี้ (user สั่ง 2026-09-14):
//   กติการูปแบบคอมเมนต์เขียนไว้ครบใน docs/rules/worklog.md §3.2 แต่ยังพลาดซ้ำ 4 ใบรวด
//   เพราะเป็นกติกาที่อาศัยความจำล้วน ต่างจากกติกามุมโค้งกับระยะห่างที่มีด่านตรวจแล้วไม่เคยพลาด
//   สคริปต์นี้ย้ายกติกาจาก "สิ่งที่ต้องจำ" มาเป็น "สิ่งที่โปรแกรมบังคับ"
//
// ⚠️ ห้ามโพสต์คอมเมนต์ลงการ์ดด้วยการยิง API ตรง ให้ผ่านสคริปต์นี้เท่านั้น
//    ถ้ายิงตรงได้ ด่านก็ถูกข้ามได้ และกติกาจะกลับไปเป็นเรื่องของความจำอีก
import { readFileSync, existsSync, writeFileSync } from 'node:fs'

const API = 'https://app.asana.com/api/1.0'
const TYPES = ['worklog', 'แก้คำรายงานผิด', 'เพิ่มขอบเขต', 'ยกเลิกขอบเขต']
const RESULT_HEAD = 'ผลตรวจ'
const OPTIONAL_HEADS = ['ที่ไม่ได้ทำตามที่เขียนไว้']

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

async function api(method, path, body) {
  const r = await fetch(API + path, {
    method,
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify({ data: body }) : undefined,
  })
  const j = await r.json()
  if (!r.ok) throw new Error(`${r.status} ${JSON.stringify(j.errors || j).slice(0, 400)}`)
  return j.data
}

// ── อ่านไฟล์เป็นบล็อก หัวข้อ + รายการ ──────────────────────────
function parse(md) {
  const blocks = []
  let cur = null
  for (const raw of md.split('\n')) {
    const line = raw.trimEnd()
    const h = line.match(/^##\s+(.*)$/)
    if (h) { cur = { head: h[1].trim(), items: [] }; blocks.push(cur); continue }
    const b = line.match(/^[-*]\s+(.*)$/)
    if (b && cur) { const t = b[1].trim(); if (t) cur.items.push(t) }
  }
  return blocks
}

// ── ด่านตรวจ ทุกข้อผิด = ไม่โพสต์ ──────────────────────────────
function check(blocks, md) {
  const err = []
  if (!blocks.length) err.push('ไม่พบหัวข้อเลย ต้องขึ้นต้นบรรทัดด้วย ## ตามด้วยชื่อหัวข้อ')

  const first = blocks[0]
  if (first && !TYPES.includes(first.head))
    err.push(`หัวข้อแรกต้องเป็นชนิดที่ประกาศไว้ คือ ${TYPES.join(' / ')} แต่เจอ "${first.head}"`)
  if (first && /\d\s*$/.test(first.head))
    err.push('ห้ามใส่เลขลำดับเอง สคริปต์นับคอมเมนต์ในการ์ดแล้วเติมให้')

  const result = blocks.find((b) => b.head === RESULT_HEAD)
  if (!result) err.push(`ต้องมีหัวข้อ ${RESULT_HEAD}`)
  else if (!result.items.length) err.push(`หัวข้อ ${RESULT_HEAD} ว่าง ต้องมีอย่างน้อยหนึ่งรายการ`)
  else if (!result.items.some((i) => /\d/.test(i)))
    err.push(`หัวข้อ ${RESULT_HEAD} ต้องมีตัวเลข ห้ามเขียนว่าตรวจแล้วเรียบร้อยเฉย ๆ`)

  for (const b of blocks) {
    if (b !== first && b.head !== RESULT_HEAD && !OPTIONAL_HEADS.includes(b.head))
      err.push(`หัวข้อ "${b.head}" ไม่อยู่ในรายการที่อนุญาต ใช้ได้แค่ ${RESULT_HEAD} และ ${OPTIONAL_HEADS.join(' / ')}`)
    if (!b.items.length && b === first) err.push(`หัวข้อ "${b.head}" ไม่มีรายการ`)
  }

  if (md.includes('—')) err.push('พบขีดยาว ห้ามใช้ ให้ใช้เว้นวรรคแทน')
  if (/<p[\s>]/i.test(md)) err.push('พบแท็ก p ซึ่ง Asana ไม่รับ')

  // จุดคั่นกลางใช้ได้เฉพาะบรรทัดที่เป็นรายการ
  md.split('\n').forEach((l, i) => {
    if (l.includes('·') && !/^\s*[-*]\s+/.test(l))
      err.push(`บรรทัด ${i + 1} ใช้จุดคั่นกลางนอกบรรทัดรายการ ให้ใช้เว้นวรรคแทน`)
  })
  return err
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const toHtml = (blocks, n) => {
  let h = '<body>'
  blocks.forEach((b, i) => {
    h += `<h2><strong>${esc(i === 0 ? `${b.head} ${n}` : b.head)}</strong></h2>`
    h += '<ul>' + b.items.map((x) => `<li>${esc(x)}</li>`).join('') + '</ul>'
  })
  return h + '</body>'
}

const args = process.argv.slice(2)
const dry = args.includes('--dry')
const isNew = args.includes('--new')
const rest = args.filter((a) => !a.startsWith('--'))
const gid = rest[0]
if (!gid) { console.error('✗ ต้องระบุรหัสการ์ด'); process.exit(1) }

const task = await api('GET', `/tasks/${gid}?opt_fields=name`)
const stories = await api('GET', `/tasks/${gid}/stories?opt_fields=resource_subtype`)
const count = stories.filter((s) => s.resource_subtype === 'comment_added').length

if (isNew) {
  const path = rest[1] || `worklog-${gid}.md`
  writeFileSync(path, `## worklog\n- \n\n## ${RESULT_HEAD}\n- \n`)
  console.log(`✓ สร้างไฟล์โครง ${path}`)
  console.log(`  การ์ด: ${task.name}`)
  console.log(`  คอมเมนต์ที่มีอยู่ ${count} ใบ สคริปต์จะเติมเลข ${count + 1} ให้ตอนโพสต์`)
  console.log(`  หัวข้อที่ใช้ได้: ${TYPES.join(' / ')} และหัวข้อรอง ${RESULT_HEAD} / ${OPTIONAL_HEADS.join(' / ')}`)
  process.exit(0)
}

const file = rest[1]
if (!file || !existsSync(file)) { console.error('✗ ไม่พบไฟล์เนื้อหา'); process.exit(1) }
const md = readFileSync(file, 'utf8')
const blocks = parse(md)
const errors = check(blocks, md)

if (errors.length) {
  console.error(`\n❌ ไม่ผ่านด่านตรวจ ${errors.length} ข้อ ไม่โพสต์\n`)
  for (const e of errors) console.error('   ' + e)
  console.error(`\n   กติกาเต็มอยู่ที่ docs/rules/worklog.md §3.2`)
  console.error(`   สร้างไฟล์โครงใหม่ได้ด้วย npm run worklog:task -- --new ${gid}\n`)
  process.exit(1)
}

const html = toHtml(blocks, count + 1)
console.log(`การ์ด: ${task.name}`)
console.log(`คอมเมนต์ที่มีอยู่ ${count} ใบ หัวข้อจะเป็น "${blocks[0].head} ${count + 1}"`)
console.log(`หัวข้อ: ${blocks.map((b) => b.head).join(' / ')}`)
console.log(`รายการรวม ${blocks.reduce((a, b) => a + b.items.length, 0)} ข้อ`)
if (dry) { console.log('\nDRY RUN ไม่โพสต์'); process.exit(0) }
await api('POST', `/tasks/${gid}/stories`, { html_text: html })
console.log('✅ โพสต์แล้ว')
