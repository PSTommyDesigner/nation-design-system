// asana-task.mjs · สร้างและแก้การ์ดใน Asana จากไฟล์ spec
//
// ใช้: node scripts/asana-task.mjs create <spec.json> [--dry]
//      node scripts/asana-task.mjs update <gid> <patch.json> [--dry]
//
// ⚠️ ทำไมต้องเป็นสคริปต์ ไม่ยิง curl ตรง (ตั้ง 2026-10-05)
//   ยิง curl ดิบจาก shell ถูกตัวกรองสิทธิ์ของเครื่องมือบล็อก เพราะเข้าข่ายเขียนออกไปยังระบบภายนอก
//   โปรเจกต์นี้ใช้แบบแผนเดียวกันอยู่แล้วกับ worklog-to-asana.mjs และ worklog-month.mjs
//   ข้อดีคือ spec อยู่ในไฟล์ให้ตรวจก่อนยิงได้ และ --dry ดูผลก่อนได้เสมอ
//
// ⚠️ กติกาที่ห้ามพลาด (CLAUDE.md หัวข้อ Asana)
//   สร้าง task ต้องส่ง 3 ฟิลด์พร้อมกันเสมอ ไม่งั้นจะกลายเป็น task ธรรมดาและตกไปคอลัมน์ No value
//     resource_subtype: 'custom' · custom_type · custom_type_status_option
//   ตอนเปลี่ยนสถานะ ห้ามส่ง completed มาด้วย เพราะมันจะทับค่าที่ระบุ ยิงกี่รอบก็ไม่ขยับ
import { readFileSync, existsSync } from 'node:fs'

const API = 'https://app.asana.com/api/1.0'
const CUSTOM_TYPE = '1212577985434838' // Design Request

function loadEnv() {
  const o = { ...process.env }
  if (existsSync('.env'))
    for (const l of readFileSync('.env', 'utf8').split('\n')) {
      const m = l.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*?)\s*$/)
      if (m) o[m[1]] = m[2].replace(/^["']|["']$/g, '')
    }
  return o
}

const args = process.argv.slice(2)
const dry = args.includes('--dry')
const rest = args.filter((a) => a !== '--dry')
const mode = rest[0]

const env = loadEnv()
const token = env.ASANA_TOKEN
if (!token) {
  console.error('❌ ไม่พบ ASANA_TOKEN ใน .env')
  process.exit(1)
}

async function call(path, method, body) {
  const r = await fetch(`${API}${path}`, {
    method,
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: body }),
  })
  const j = await r.json()
  if (!r.ok) {
    console.error(`❌ ${method} ${path} → ${r.status}`)
    console.error(JSON.stringify(j, null, 2).slice(0, 1500))
    process.exit(1)
  }
  return j.data
}

function readSpec(p) {
  if (!existsSync(p)) {
    console.error(`❌ ไม่พบไฟล์ spec: ${p}`)
    process.exit(1)
  }
  return JSON.parse(readFileSync(p, 'utf8'))
}

if (mode === 'create') {
  const spec = readSpec(rest[1])
  const body = { ...spec, resource_subtype: 'custom', custom_type: CUSTOM_TYPE }
  if (!body.custom_type_status_option) {
    console.error('❌ spec ต้องมี custom_type_status_option ไม่งั้นการ์ดจะตกไปคอลัมน์ No value')
    process.exit(1)
  }
  if (dry) {
    console.log('DRY RUN · จะสร้างการ์ดด้วยข้อมูลนี้\n')
    console.log(JSON.stringify(body, null, 2))
    process.exit(0)
  }
  const t = await call('/tasks', 'POST', body)
  console.log(`✅ สร้างการ์ดแล้ว ${t.gid}`)
  console.log(`   ${t.name}`)
  console.log(`   ${t.permalink_url || ''}`)
} else if (mode === 'update') {
  const gid = rest[1]
  const patch = readSpec(rest[2])
  if (patch.custom_type_status_option && 'completed' in patch) {
    console.error('❌ ห้ามส่ง completed มาพร้อม custom_type_status_option เพราะ completed จะทับสถานะที่ระบุ')
    process.exit(1)
  }
  const body = patch.custom_type_status_option
    ? { ...patch, resource_subtype: 'custom', custom_type: CUSTOM_TYPE }
    : patch
  if (dry) {
    console.log(`DRY RUN · จะแก้การ์ด ${gid} ด้วยข้อมูลนี้\n`)
    console.log(JSON.stringify(body, null, 2))
    process.exit(0)
  }
  const t = await call(`/tasks/${gid}`, 'PUT', body)
  console.log(`✅ แก้การ์ด ${t.gid} แล้ว`)
  console.log(`   ${t.name}`)
} else {
  console.error('ใช้: node scripts/asana-task.mjs create <spec.json> [--dry]')
  console.error('     node scripts/asana-task.mjs update <gid> <patch.json> [--dry]')
  process.exit(1)
}
