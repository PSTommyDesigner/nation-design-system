// worklog-repo.mjs · สำเนา worklog ฉบับ ntgds จากต้นทางบนเครื่อง (WORKLOG_ROOT) ไปที่ ~/Obsidian/Nation Design System (NTGDS_WORKLOG ใน .env)
// user สั่ง 2026-11-26: worklog ทุกโปรเจกต์อยู่ใน ~/Obsidian ที่เดียว ไม่เก็บใน repo และไม่ขึ้น git (docs/daily-log/ อยู่ใน .gitignore เหลือแค่ .schedule.log)
// และสำเนากฎ worklog จาก vault เข้า repo (ดู RULES)
// ใช้: npm run worklog:repo            (รอบ 17:30 เรียกเองหลังสำเนาไป Obsidian)
//      npm run worklog:repo -- --dry   ดูว่าจะเขียนไฟล์ไหน
//
// user สั่ง 2026-11-24: repo ของแต่ละโปรเจกต์เก็บแค่ worklog ของโปรเจกต์นั้น ต้นทางที่รวมทุกโปรเจกต์อยู่บนเครื่อง
// กติกา
//   - รายการ (บรรทัดขึ้นต้นด้วย "- ") ที่มีชื่อใน OTHER_PROJECTS ถูกตัดทิ้ง รายการที่ไม่มีชื่อโปรเจกต์ใดนับเป็นงาน ntgds
//   - หัวข้อที่ไม่เหลือรายการ ใส่ "- ไม่มี" และบรรทัด "> Task:" ที่มีชื่อโปรเจกต์อื่นถูกตัดทิ้ง
//   - วันที่มีแต่รายการของโปรเจกต์อื่นไม่สำเนา บันทึกของงานที่เป็นโปรเจกต์อื่น (ชื่องานหรือ project) ไม่สำเนา
//   - เขียนเฉพาะไฟล์ที่เนื้อหาเปลี่ยน ไม่ลบไฟล์ใน repo เอง ไฟล์ใน repo ที่ไม่ควรอยู่จะรายงานไว้ให้ลบ
//   - โปรเจกต์ใหม่ที่ใช้ worklog ชุดนี้ ให้เพิ่มชื่อใน OTHER_PROJECTS และเขียนชื่อนั้นในทุกรายการของโปรเจกต์
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs'
import { join, resolve, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { ROOT, REPO_DIR, REPO_ROOT } from './worklog-path.mjs'
import { homedir } from 'node:os'
import { vaultPath, envValue, expandHome } from './worklog-obsidian.mjs'

/** ที่เก็บ worklog ฉบับ ntgds: NTGDS_WORKLOG ใน .env ไม่ได้ตั้งใช้ ~/Obsidian/Nation Design System */
export function ntgdsDir() {
  const v = envValue('NTGDS_WORKLOG')
  return resolve(v ? expandHome(v) : join(homedir(), 'Obsidian', 'Nation Design System'))
}

// user สั่ง 2026-11-26: ต้นฉบับกฎ worklog ทั้งหมดอยู่ใน vault ที่ <OBSIDIAN_VAULT>/กฎของ worklog/ ไฟล์ใน repo เป็นสำเนา เขียนทับทุกรอบ
export const RULES_DIR = 'กฎของ worklog'
export const RULES = [
  ['กฎ worklog.md', 'docs/rules/worklog.md'],
  ['กฎการตั้งชื่องาน.md', 'docs/rules/task-naming.md'],
  ['ขั้นตอน worklog สำหรับ AI.md', 'context/workflows/worklog/SKILL.md'],
]
/** ใส่บรรทัดบอกว่าเป็นสำเนา ต่อจาก frontmatter (ถ้ามี) */
function markCopy(md, name) {
  const note = `> สำเนาอัตโนมัติจาก \`~/Obsidian/Tommy Worklog/${RULES_DIR}/${name}\` ห้ามแก้ไฟล์นี้ แก้ที่ต้นฉบับ รอบ 17:30 เขียนทับ\n\n`
  const m = md.match(/^---\n[\s\S]*?\n---\n\n?/)
  return m ? md.slice(0, m[0].length) + note + md.slice(m[0].length) : note + md
}
/** สำเนากฎ worklog จาก vault เข้า repo คืนจำนวนไฟล์ที่สำเนา หรือข้อความถ้าข้าม */
export function syncRules({ dry = false, stat } = {}) {
  let vault
  try { vault = vaultPath([]) } catch { return 'หา vault ไม่เจอ' }
  const dir = join(vault, RULES_DIR)
  if (!existsSync(dir)) return `ไม่พบ ${dir}`
  let n = 0
  for (const [name, dest] of RULES) {
    const src = join(dir, name)
    if (!existsSync(src)) { stat.warnings = [...(stat.warnings || []), `ไม่พบกฎ ${name}`]; continue }
    put(join(REPO_DIR, dest), markCopy(readFileSync(src, 'utf8'), name), dry, stat)
    n++
  }
  return n
}

export const OTHER_PROJECTS = ['One CMS', 'AI Adoption Tracker']
const isOther = (s) => OTHER_PROJECTS.some((p) => s.includes(p))
const isItem = (l) => /^- /.test(l)
const isNone = (l) => /^- ไม่มี\s*$/.test(l)

/** ตัดรายการของโปรเจกต์อื่นออกจาก worklog 1 วัน คืนเนื้อหาใหม่ จำนวนรายการ ntgds ที่เหลือ และจำนวนที่ตัดทิ้ง
 *  worklog แบบเก่าที่เป็นย่อหน้า ไม่มีรายการ จะได้ kept 0 dropped 0 และยังสำเนาตามเดิม */
export function filterDay(md) {
  const out = []
  let kept = 0
  let dropped = 0
  let section = null   // { start: index ของหัวข้อใน out, items: จำนวนรายการที่เหลือ }
  const close = () => {
    if (!section || section.items || !section.dropped) return   // ใส่ ไม่มี เฉพาะหัวข้อที่ถูกตัดจนว่าง
    let i = out.length
    while (i > section.start + 1 && out[i - 1].trim() === '') i--
    out.splice(i, 0, '- ไม่มี')
  }
  for (const line of md.split('\n')) {
    if (line.startsWith('## ')) { close(); section = { start: out.length, items: 0, dropped: 0 }; out.push(line); continue }
    if (!section && line.startsWith('> Task:') && isOther(line)) continue
    if (section && isItem(line)) {
      if (isOther(line)) { dropped++; section.dropped++; continue }
      section.items++
      if (!isNone(line)) kept++
    }
    out.push(line)
  }
  close()
  return { md: out.join('\n'), kept, dropped }
}

function walkMd(dir) {
  const res = []
  if (!existsSync(dir)) return res
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) res.push(...walkMd(p))
    else if (e.name.endsWith('.md')) res.push(p)
  }
  return res
}

function put(path, content, dry, stat) {
  if (existsSync(path) && readFileSync(path, 'utf8') === content) { stat.unchanged++; return }
  if (!dry) { mkdirSync(dirname(path), { recursive: true }); writeFileSync(path, content) }
  stat.written.push(path)
}

export function syncRepo({ dry = false } = {}) {
  const src = resolve(ROOT)
  const dest = ntgdsDir()
  if (src === dest || src === resolve(REPO_DIR, REPO_ROOT)) return { skipped: 'ยังไม่ได้ตั้ง WORKLOG_ROOT ต้นทางกับปลายทางเป็นที่เดียวกัน' }
  if (!existsSync(src)) throw new Error(`ไม่พบต้นทาง ${src}`)
  const stat = { dest, days: 0, noNtgds: [], tasks: 0, otherTasks: [], unchanged: 0, written: [], removeFromRepo: [] }

  for (const f of walkMd(join(src, 'daily'))) {
    const rel = relative(src, f)
    const { md, kept, dropped } = filterDay(readFileSync(f, 'utf8'))
    if (!kept && dropped) { stat.noNtgds.push(rel); if (existsSync(join(dest, rel))) stat.removeFromRepo.push(rel); continue }
    stat.days++
    put(join(dest, rel), md, dry, stat)
  }
  for (const f of walkMd(join(src, 'tasks'))) {
    const rel = relative(src, f)
    const body = readFileSync(f, 'utf8')
    const head = (body.match(/^---\n([\s\S]*?)\n---/) || [])[1] || ''
    const meta = head.split('\n').filter((l) => /^(name|project):/.test(l)).join('\n')
    if (isOther(meta) || isOther(rel)) { stat.otherTasks.push(rel); if (existsSync(join(dest, rel))) stat.removeFromRepo.push(rel); continue }
    stat.tasks++
    put(join(dest, rel), body, dry, stat)
  }
  const tpl = join(src, '_template.md')
  if (existsSync(tpl)) put(join(dest, '_template.md'), readFileSync(tpl, 'utf8'), dry, stat)
  stat.rules = syncRules({ dry, stat })
  return stat
}

const isMain = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)
if (isMain) {
  const dry = process.argv.includes('--dry')
  try {
    const r = syncRepo({ dry })
    if (r.skipped) { console.log(`📁 worklog ntgds: ข้าม (${r.skipped})`); process.exit(0) }
    console.log(`📁 worklog ntgds ไป ${r.dest}${dry ? ' (ลองดู)' : ''}: ${r.days} วัน บันทึกงาน ${r.tasks} ไฟล์ ${dry ? 'จะเขียน' : 'เขียน'} ${r.written.length} ไฟล์ เหมือนเดิม ${r.unchanged} ไฟล์`)
    console.log(`   กฎ worklog จาก vault: ${typeof r.rules === 'number' ? `${r.rules} ไฟล์` : `ข้าม (${r.rules})`}`)
    for (const w of r.warnings || []) console.warn(`   ⚠️ ${w}`)
    console.log(`   ไม่สำเนา: วันที่ไม่มีงาน ntgds ${r.noNtgds.length} วัน บันทึกงานโปรเจกต์อื่น ${r.otherTasks.length} ไฟล์`)
    if (r.removeFromRepo.length) {
      console.warn(`⚠️ ไฟล์ใน ${r.dest} ที่มีแต่งานโปรเจกต์อื่น ควรลบ ${r.removeFromRepo.length} ไฟล์:`)
      for (const p of r.removeFromRepo) console.warn(`   ${p}`)
    }
  } catch (e) {
    console.error(`✗ สำเนา worklog ntgds ไม่สำเร็จ: ${e.message}`)
    process.exit(1)
  }
}
