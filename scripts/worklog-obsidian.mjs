// worklog-obsidian.mjs · สำเนา worklog รายวันไปที่ Obsidian vault พร้อมโน้ตสรุปรายเดือน
// ใช้: npm run worklog:obsidian                       เขียนลง vault
//      npm run worklog:obsidian -- --dry              ดูว่าจะเขียนหรือลบไฟล์ไหนโดยไม่ทำจริง
//      npm run worklog:obsidian -- --vault "<path>"   ใช้ vault อื่น
//
// กติกา (user สั่ง 2026-10-27)
//   ต้นทางยังเป็น docs/daily-log ในเครื่องที่เดียว Obsidian เป็นปลายทางไว้อ่านย้อนหลังรายเดือน
//   สร้างใหม่ทั้งชุดจากไฟล์ในเครื่องทุกครั้ง รันซ้ำกี่รอบก็ได้ผลเดิม วันไหนรอบ 16:30 พลาด รอบถัดไปก็ตามทัน
//   เขียนเฉพาะในโฟลเดอร์ Worklog <ปี ค.ศ.>/ ของ vault และเขียนเฉพาะไฟล์ที่เนื้อหาเปลี่ยน
//   ลบได้เฉพาะไฟล์ที่สคริปต์นี้เคยสร้าง (มีข้อความ BANNER) ซึ่งรอบนี้ไม่ได้สร้างแล้ว เช่นหลังเปลี่ยนชื่อไฟล์
//   ไฟล์ที่ user เขียนเองใน vault ไม่แตะเด็ดขาด
//
// โครงใน vault (user กำหนด 2026-10-27)
//   Worklog 2026/หน้าหลัก.md
//   Worklog 2026/10 October/Summarize 10 October.md
//   Worklog 2026/10 October/Oct Week4 Tue27.md
//   ชื่อเดือนและชื่อไฟล์ไม่มีปี (user สั่ง) ปีอยู่ที่โฟลเดอร์บนสุด 1 ปี 1 โฟลเดอร์ ขึ้นปีใหม่สคริปต์สร้างโฟลเดอร์ใหม่เอง
//   ชื่อโน้ตซ้ำกันได้ข้ามเดือนข้ามปี ลิงก์ทุกตัวจึงใส่ path เต็มจากราก vault ไม่ใช้ชื่ออย่างเดียว
//   เลขสัปดาห์มาจาก weekOfMonth() ของ worklog-path.mjs ตรงกับ W ในชื่อไฟล์ของ repo
//   ชื่อไฟล์ใน repo ยังเป็นไปตาม worklog-path.mjs เหมือนเดิม ชื่อในนี้ใช้เฉพาะใน vault
//
// vault ที่ใช้: --vault <path> ก่อน แล้ว OBSIDIAN_VAULT ใน .env แล้วค่อย ~/Documents/Obsidian Vault
//
// tag สำหรับค้นหา (user สั่ง 2026-10-27) ใส่ใน frontmatter ของบันทึกรายวันเท่านั้น
// โน้ตสรุปเดือนกับหน้าหลักไม่ใส่ tag เหล่านี้ ผลค้นหาตาม tag จึงได้แต่วันที่ทำงานนั้นจริง
//   project/    ชื่อโปรเจกต์ Nation-Design-System (ตั้งใหม่ได้ด้วย WORKLOG_PROJECT ใน .env)
//   system/     [System] ในชื่อการ์ด DS, Design System, Global และการ์ดรุ่นเก่าที่ขึ้นต้นด้วยเลขหน้า รวมเป็น Design-System
//               วันที่ไม่มีชื่อการ์ดเลยได้ Design-System เพราะ worklog ชุดนี้อยู่ใน repo ของ Design System
//   feature/    [Feature] ในชื่อการ์ด การ์ดรุ่นเก่า [01 Color]-[Document] ใช้ชื่อหน้า (Color) และหน้าที่พูดถึงแบบ "หน้า 21 Tags"
//               Document เป็น Docs พหูพจน์ของชื่อ component เป็นเอกพจน์ (Tags เป็น Tag)
//   component/  component ที่ถูกพูดถึงในบันทึกวันนั้น จับชื่อโฟลเดอร์ใน components/ แบบ TagField และแบบ tag-field
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, unlinkSync, rmdirSync } from 'node:fs'
import { join, resolve, relative, dirname } from 'node:path'
import { homedir } from 'node:os'
import { fileURLToPath } from 'node:url'
import { ROOT, fileName, weekOfMonth } from './worklog-path.mjs'

// โฟลเดอร์ที่สคริปต์นี้เป็นเจ้าของ: 'Worklog <ปี ค.ศ.>' ทุกปี และ 'Worklog' ชื่อเก่าที่ต้องเก็บกวาด
const OWNED_ROOT = /^Worklog( \d{4})?$/
const INDEX = 'หน้าหลัก'
const TH_MONTH = ['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน',
                  'กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม']
const TH_DAY = ['อาทิตย์','จันทร์','อังคาร','พุธ','พฤหัสบดี','ศุกร์','เสาร์']
const EN_MONTH = ['January','February','March','April','May','June','July','August','September','October','November','December']
const EN_DAY = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
// ⚠️ ห้ามเปลี่ยนข้อความ BANNER สคริปต์ใช้ข้อความนี้แยกไฟล์ที่ตัวเองสร้างออกจากไฟล์ที่ user เขียนเอง ก่อนลบ
const BANNER = 'สร้างอัตโนมัติจาก worklog รายวันใน repo nation-design-system'
const HOWTO = 'แก้ที่ไฟล์ต้นทางใน repo แล้วรัน `npm run worklog:obsidian` (รันเองตอน 16:30 พร้อมการส่ง Asana) ถ้าแก้ในนี้จะถูกเขียนทับรอบถัดไป'

export const expandHome = (p) => p.replace(/^~(?=\/|$)/, homedir())
const q = (s) => JSON.stringify(s)   // ค่า string ใน frontmatter (JSON string เป็น YAML ที่ถูกต้อง)
const p2 = (n) => String(n).padStart(2, '0')

export function envValue(key) {
  if (process.env[key]) return process.env[key]
  if (!existsSync('.env')) return ''
  for (const l of readFileSync('.env', 'utf8').split('\n')) {
    const m = l.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*?)\s*$/)
    if (m && m[1] === key) return m[2].replace(/^["']|["']$/g, '')
  }
  return ''
}

export function vaultPath(argv = process.argv.slice(2)) {
  const i = argv.indexOf('--vault')
  if (i >= 0 && argv[i + 1]) return resolve(expandHome(argv[i + 1]))
  const fromEnv = envValue('OBSIDIAN_VAULT')
  if (fromEnv) return resolve(expandHome(fromEnv))
  return join(homedir(), 'Documents', 'Obsidian Vault')
}

export function parts(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  return { y, m, d, dow: new Date(Date.UTC(y, m - 1, d, 12)).getUTCDay() }
}
/** 'อังคาร 27 ตุลาคม 2569' */
export const dayLabel = (iso) => { const { y, m, d, dow } = parts(iso); return `${TH_DAY[dow]} ${d} ${TH_MONTH[m - 1]} ${y + 543}` }
/** โฟลเดอร์เดือน '10 October' */
export const monthName = (iso) => { const { m } = parts(iso); return `${p2(m)} ${EN_MONTH[m - 1]}` }
/** โฟลเดอร์ปี 'Worklog 2026' */
const yearRoot = (iso) => `Worklog ${parts(iso).y}`
/** โฟลเดอร์เดือนจากราก vault 'Worklog 2026/10 October' */
const monthDir = (iso) => `${yearRoot(iso)}/${monthName(iso)}`
/** 'Summarize 10 October' */
const summaryName = (iso) => `Summarize ${monthName(iso)}`
/** บันทึกรายวัน 'Oct Week4 Tue27' ชื่อย่อเดือนนำหน้า (user สั่ง 2026-10-28) */
export const noteName = (iso) => { const { m, d, dow } = parts(iso); return `${EN_MONTH[m - 1].slice(0, 3)} Week${weekOfMonth(iso)} ${EN_DAY[dow]}${d}` }
/** path ของโน้ตจากราก vault ไม่มี .md ใช้ในลิงก์ */
const notePath = (iso) => `${monthDir(iso)}/${noteName(iso)}`
const summaryPath = (iso) => `${monthDir(iso)}/${summaryName(iso)}`
const indexPath = (iso) => `${yearRoot(iso)}/${INDEX}`
const link = (iso, label) => `[[${notePath(iso)}|${label}]]`
export const isNone = (line) => /^\s*-\s+(ไม่มี|-)\s*$/.test(line)

// ── tag ──
const TAG_KINDS = ['project', 'system', 'feature', 'component']
const TAG_TITLE = { project: 'โปรเจกต์', system: 'ระบบ', feature: 'ฟีเจอร์', component: 'component' }
const SYSTEM_ALIAS = /^(DS|Design System|Global)$/i
const FEATURE_ALIAS = { Document: 'Docs', Documents: 'Docs' }
const slug = (s) => s.trim().replace(/\s+/g, '-').replace(/[^\p{L}\p{M}\p{N}_-]/gu, '')
const kebab = (s) => s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()

/** ชื่อ component จากโฟลเดอร์ใน components/ (อ่านทุกครั้ง component ใหม่จึงได้ tag เอง) */
function componentNames() {
  if (!existsSync('components')) return []
  return readdirSync('components', { withFileTypes: true })
    .filter((d) => d.isDirectory() && /^[A-Z]/.test(d.name)).map((d) => d.name)
}

/** tag 4 หมวดของบันทึกหนึ่งวัน */
function tagsOf(w, comps) {
  const t = { project: new Set([slug(envValue('WORKLOG_PROJECT') || 'Nation Design System')]), system: new Set(), feature: new Set(), component: new Set() }
  const feature = (raw) => {
    let f = raw.trim()
    f = FEATURE_ALIAS[f] || f
    if (!comps.includes(f) && f.endsWith('s') && comps.includes(f.slice(0, -1))) f = f.slice(0, -1)
    t.feature.add(slug(f))
  }
  // การ์ดแบบ [System]-[Feature] ทั้งในบรรทัด Task และในเนื้อหา
  for (const [, sys, feat] of w.md.matchAll(/\[([^\[\]\n]{1,40})\]-\[([^\[\]\n]{1,40})\]/g)) {
    if (sys.includes('สรุปงาน')) continue   // การ์ดสรุปประจำเดือน ไม่ใช่งาน
    const page = sys.trim().match(/^\d{2}\s+(.+)$/)
    if (page) { t.system.add('Design-System'); feature(page[1]); continue }
    t.system.add(SYSTEM_ALIAS.test(sys.trim()) ? 'Design-System' : slug(sys))
    feature(feat)
  }
  // การ์ดรุ่นเก่าแบบวงเล็บเดียว เช่น [11 Button]
  for (const [, name] of w.md.matchAll(/\[\d{2}\s+([A-Za-z][A-Za-z ]*)\](?!-\[)/g)) { t.system.add('Design-System'); feature(name) }
  // หน้าในไฟล์ออกแบบที่ถูกพูดถึง เช่น "หน้า 21 Tags" นับเป็นฟีเจอร์ด้วย วันที่ไม่ได้เขียนชื่อการ์ดจะได้มี tag
  for (const [, name] of w.md.matchAll(/หน้า \d{2} ([A-Z][A-Za-z]+(?:-[A-Za-z]+)*)(?![A-Za-z])/g)) feature(name)
  // worklog ชุดนี้อยู่ใน repo ของ Design System วันที่ไม่มีชื่อการ์ดเลยจึงเป็นระบบนี้
  if (!t.system.size) t.system.add('Design-System')
  for (const c of comps) {
    const names = kebab(c).includes('-') ? `${c}|${kebab(c)}` : c   // ชื่อคำเดียวตัวเล็กอย่าง button กว้างเกิน ไม่จับ
    if (new RegExp(`(?<![A-Za-z-])(?:${names})(?![A-Za-z-])`).test(w.md)) t.component.add(c)
  }
  return Object.fromEntries(TAG_KINDS.map((k) => [k, [...t[k]].sort((a, b) => a.localeCompare(b))]))
}
const tagLines = (tags) => TAG_KINDS.flatMap((k) => tags[k].map((v) => `  - ${k}/${v}`))

// ── อ่าน worklog ──
/** รหัสสีอย่าง #fee4e2 Obsidian อ่านเป็น tag ทำให้มี tag ขยะ ครอบด้วย ` ให้เป็นโค้ด (พบ 2026-10-27) */
const codeHex = (md) => md.replace(/(^|[^A-Za-z0-9_`\/&#])#([0-9A-Fa-f]{8}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})(?![A-Za-z0-9_\/-])/gm, '$1`#$2`')

/** วันที่จากชื่อไฟล์ใน repo ให้ fileName() ของ worklog-path ยืนยันว่าชื่อถูกกติกา ไม่คำนวณกติกาเอง */
function dateFromName(f) {
  const m = f.match(/-(\d{2})-(\d{2})-(\d{4})\.md$/)
  if (!m) return null
  const iso = `${Number(m[3]) - 543}-${m[2]}-${m[1]}`
  return fileName(iso) === f ? iso : null
}

/** อ่าน worklog หนึ่งไฟล์ เก็บรายการใต้แต่ละหัวข้อโดยคงการย่อหน้าของรายการย่อย */
function parseWorklog(path) {
  const md = codeHex(readFileSync(path, 'utf8').replace(/<!--[\s\S]*?-->/g, '').replace(/\s+$/, '')) + '\n'
  const date = (md.match(/^#\s+Worklog\s+(\d{4}-\d{2}-\d{2})\s*$/m) || [])[1]
  const task = ((md.match(/^>\s*Task:\s*(.+)$/m) || [])[1] || '').trim()
  const sec = {}
  let cur = null
  for (const l of md.split('\n')) {
    if (/^##\s/.test(l)) { cur = l.replace(/^##\s+/, '').trim(); sec[cur] = []; continue }
    if (/^#\s/.test(l)) { cur = null; continue }
    if (cur && /^\s*[-*]\s+\S/.test(l)) sec[cur].push(l.replace(/^(\s*)\*(\s+)/, '$1-$2').replace(/\s+$/, ''))
  }
  return { path, md, date, task, sec }
}

/** worklog ทุกวันในเครื่อง เรียงตามวันที่ */
export function collectDays(root = ROOT) {
  const base = join(root, 'daily')
  const days = [], warnings = []
  if (!existsSync(base)) return { days, warnings: [`ไม่พบโฟลเดอร์ ${base}`] }
  for (const month of readdirSync(base, { withFileTypes: true })) {
    if (!month.isDirectory()) continue
    for (const f of readdirSync(join(base, month.name)).sort()) {
      if (!f.endsWith('.md')) continue
      const w = parseWorklog(join(base, month.name, f))
      // หัวไฟล์รูปแบบ "# Worklog YYYY-MM-DD" ใช้เป็นหลักตั้งแต่กลางเดือนตุลาคม 2569 ไฟล์เก่าบางวันหัวเป็นภาษาไทย จึงอ่านวันที่จากชื่อไฟล์แทน
      const byName = dateFromName(f)
      if (w.date && byName && w.date !== byName) warnings.push(`${f} หัวไฟล์เป็นวันที่ ${w.date} ไม่ตรงกับชื่อไฟล์ ใช้วันที่จากหัวไฟล์`)
      w.date = w.date || byName
      if (!w.date) { warnings.push(`ข้าม ${f} เพราะอ่านวันที่ไม่ได้ทั้งจากหัวไฟล์และชื่อไฟล์`); continue }
      days.push(w)
    }
  }
  days.sort((a, b) => a.date.localeCompare(b.date))
  for (let i = 1; i < days.length; i++)
    if (days[i].date === days[i - 1].date) warnings.push(`วันที่ ${days[i].date} มี 2 ไฟล์ ใน vault จะเหลือไฟล์หลัง (${days[i].path})`)
  return { days, warnings }
}

// ── สร้างโน้ต ──
function dailyNote(w) {
  // ชื่อโน้ตบอกวันที่อยู่แล้ว ตัดหัวข้อใหญ่บรรทัดแรกของต้นฉบับออก ไม่ให้ชื่อขึ้นซ้ำสองครั้ง
  const body = w.md.trimStart().replace(/^#\s+.*\n+/, '')
  return [
    '---',
    `date: ${w.date}`,
    `day: ${q(dayLabel(w.date))}`,
    ...(w.task ? [`task: ${q(w.task)}`] : []),
    `month: ${q(`[[${summaryPath(w.date)}|${summaryName(w.date)}]]`)}`,
    'tags:',
    '  - worklog',
    ...tagLines(w.tags),
    `source: ${q(w.path)}`,
    '---',
    `> [!note] ${BANNER}`,
    `> ${HOWTO}`,
    '',
    body,
  ].join('\n')
}

function monthNote(list) {
  const first = list[0].date
  const last = list[list.length - 1]
  const pending = last.sec['งานค้าง'] || []
  const out = [
    '---',
    `month: ${first.slice(0, 7)}`,
    'tags:',
    '  - worklog',
    '  - worklog/month',
    ...[...new Set(list.flatMap((w) => w.tags.project))].map((v) => `  - project/${v}`),
    `days: ${list.length}`,
    `updated: ${last.date}`,
    '---',
    `> [!info] ${BANNER}`,
    `> ${HOWTO}`,
    '',
    '## งานค้าง',
    '',
    `ณ ${link(last.date, dayLabel(last.date))} ซึ่งเป็นวันล่าสุดของเดือนที่มีบันทึก`,
    '',
    ...(pending.length ? pending : ['- ไม่มีงานค้าง']),
    '',
    '## งานที่ทำ',
    '',
  ]
  for (const w of list) {
    const done = w.sec['งานที่ทำวันนี้'] || []
    const result = w.sec['ผลลัพธ์'] || []
    out.push(`### ${dayLabel(w.date)}`, '')
    out.push(`${link(w.date, 'เปิดบันทึกเต็มของวันนี้')}${w.task ? ` การ์ด ${w.task}` : ''}`, '')
    const meta = [
      w.tags.feature.length ? `ฟีเจอร์: ${w.tags.feature.join(', ')}` : '',
      w.tags.component.length ? `component: ${w.tags.component.join(', ')}` : '',
    ].filter(Boolean)
    if (meta.length) out.push(meta.join('\n'), '')
    out.push(...(done.length ? done : ['- วันนี้ไม่ได้เขียนใต้หัวข้อ "งานที่ทำวันนี้" ดูในบันทึกเต็ม']), '')
    if (result.length) out.push('**ผลลัพธ์**', '', ...result, '')
  }
  out.push('## ติดปัญหา', '')
  const problems = list.filter((w) => (w.sec['ติดปัญหา'] || []).some((l) => !isNone(l)))
  if (!problems.length) out.push('- ไม่มี', '')
  for (const w of problems) {
    out.push(`- ${link(w.date, dayLabel(w.date))}`)
    out.push(...w.sec['ติดปัญหา'].filter((l) => !isNone(l)).map((l) => '    ' + l))
  }
  return out.join('\n').replace(/\n+$/, '') + '\n'
}

/** หน้าหลักของปีหนึ่ง days และ byMonth เป็นของปีนั้น years คือทุกปีที่มีบันทึก */
function indexNote(days, byMonth, years) {
  const last = days[days.length - 1]
  const months = [...byMonth.values()].reverse()
  const others = years.filter((y) => y !== parts(last.date).y).sort((a, b) => b - a)
  return [
    '---',
    'tags:',
    '  - worklog',
    `updated: ${last.date}`,
    '---',
    `> [!info] ${BANNER}`,
    `> ${HOWTO}`,
    '',
    `บันทึกล่าสุดของปี ${link(last.date, dayLabel(last.date))} งานค้างล่าสุดอยู่ที่ [[${summaryPath(last.date)}#งานค้าง|งานค้าง ${monthName(last.date)}]]`,
    '',
    '## รายเดือน',
    '',
    ...months.map((l) => `- [[${summaryPath(l[0].date)}|${summaryName(l[0].date)}]] บันทึก ${l.length} วัน`),
    '',
    ...(others.length ? ['## ปีอื่น', '', ...others.map((y) => `- [[Worklog ${y}/${INDEX}|Worklog ${y}]]`), ''] : []),
    '## ค้นหาตาม tag',
    '',
    'จำนวนวันข้างล่างนับเฉพาะปีนี้ คัดลอก tag ไปวางในช่องค้นหาแบบ `tag:#component/TagField` หรือกด Cmd+P พิมพ์ Show tags เพื่อเปิดแผงรายชื่อ tag แล้วคลิก ผลจะได้เฉพาะบันทึกรายวันที่ทำงานนั้น',
    '',
    ...TAG_KINDS.flatMap((k) => {
      const count = new Map()
      for (const w of days) for (const v of w.tags[k]) count.set(v, (count.get(v) || 0) + 1)
      const rows = [...count].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      return [`### ${TAG_TITLE[k]}`, '', ...(rows.length ? rows.map(([v, n]) => `- \`#${k}/${v}\` ${n} วัน`) : ['- ยังไม่มี']), '']
    }),
  ].join('\n').replace(/\n+$/, '') + '\n'
}

// ── เขียนและเก็บกวาด ──
export function put(path, content, dry, stat) {
  stat.keep.add(path)
  if (existsSync(path) && readFileSync(path, 'utf8') === content) { stat.unchanged++; return }
  if (!dry) { mkdirSync(dirname(path), { recursive: true }); writeFileSync(path, content) }
  stat.written.push(path)
}

export function walk(dir) {
  if (!existsSync(dir)) return []
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)])
}

/** ลบไฟล์ที่สคริปต์เคยสร้าง (มี BANNER) แต่รอบนี้ไม่ได้สร้าง แล้วลบโฟลเดอร์ที่ว่าง ในโฟลเดอร์ที่เป็นเจ้าของทุกตัว */
function prune(vault, dry, stat) {
  for (const e of readdirSync(vault, { withFileTypes: true }))
    if (e.isDirectory() && OWNED_ROOT.test(e.name)) pruneRoot(vault, join(vault, e.name), dry, stat)
}

function pruneRoot(vault, out, dry, stat) {
  for (const p of walk(out)) {
    if (!p.endsWith('.md') || stat.keep.has(p)) continue
    let text = ''
    try { text = readFileSync(p, 'utf8') } catch { continue }
    if (!text.includes(BANNER)) continue   // ไฟล์ที่ user เขียนเอง ไม่แตะ
    if (!dry) {
      try { unlinkSync(p) } catch (e) { stat.warnings.push(`ลบไฟล์เก่า ${relative(vault, p)} ไม่ได้ (${e.code || e.message})`); continue }
    }
    stat.removed.push(p)
  }
  if (dry || !existsSync(out)) return
  // ลบโฟลเดอร์ที่ว่างจากชั้นในสุดขึ้นมา เหลือแต่ไฟล์ที่ Finder สร้าง (.DS_Store) ถือว่าว่าง
  // ปีที่ยังมีบันทึกจะไม่ว่างจึงไม่ถูกลบ ส่วนโฟลเดอร์ชื่อเก่าที่ไม่เหลืออะไรแล้วถูกลบทั้งโฟลเดอร์
  const sweep = (d) => {
    for (const e of readdirSync(d, { withFileTypes: true })) if (e.isDirectory()) sweep(join(d, e.name))
    const rest = readdirSync(d)
    if (!rest.every((n) => n === '.DS_Store')) return
    try { for (const n of rest) unlinkSync(join(d, n)); rmdirSync(d) }
    catch (err) { stat.warnings.push(`ลบโฟลเดอร์ว่าง ${relative(vault, d)} ไม่ได้ (${err.code || err.message})`) }
  }
  sweep(out)
}

/** สร้างโน้ตทั้งชุดใน vault คืนค่าสรุปว่าเขียนและลบอะไรไปบ้าง */
export function syncObsidian({ vault = vaultPath(), dry = false } = {}) {
  if (!existsSync(join(vault, '.obsidian')))
    throw new Error(`ไม่พบ vault ที่ ${vault} (ต้องมีโฟลเดอร์ .obsidian) ตั้ง OBSIDIAN_VAULT ใน .env หรือส่ง --vault`)
  const { days, warnings } = collectDays()
  const comps = componentNames()
  for (const w of days) w.tags = tagsOf(w, comps)
  const seen = new Map()
  for (const w of days) {
    const k = notePath(w.date)
    if (seen.has(k)) throw new Error(`${seen.get(k)} กับ ${w.date} ได้ชื่อโน้ตเดียวกัน ${k} ต้องแก้กติกาชื่อในสคริปต์`)
    seen.set(k, w.date)
  }
  const stat = { keep: new Set(), written: [], removed: [], unchanged: 0, warnings }
  const byMonth = new Map()
  for (const w of days) {
    const k = w.date.slice(0, 7)
    if (!byMonth.has(k)) byMonth.set(k, [])
    byMonth.get(k).push(w)
  }
  const years = [...new Set(days.map((w) => parts(w.date).y))]
  for (const w of days) put(join(vault, `${notePath(w.date)}.md`), dailyNote(w), dry, stat)
  for (const list of byMonth.values()) put(join(vault, `${summaryPath(list[0].date)}.md`), monthNote(list), dry, stat)
  for (const y of years) {
    const ofYear = days.filter((w) => parts(w.date).y === y)
    const monthsOfYear = new Map([...byMonth].filter(([k]) => Number(k.slice(0, 4)) === y))
    put(join(vault, `${indexPath(ofYear[0].date)}.md`), indexNote(ofYear, monthsOfYear, years), dry, stat)
  }
  prune(vault, dry, stat)
  return {
    vault, days: days.length, months: byMonth.size, years,
    written: stat.written.map((p) => relative(vault, p)), removed: stat.removed.map((p) => relative(vault, p)),
    unchanged: stat.unchanged, warnings: stat.warnings,
  }
}

const isMain = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)
if (isMain) {
  const dry = process.argv.includes('--dry')
  try {
    const r = syncObsidian({ dry })
    for (const w of r.warnings) console.warn('⚠️ ' + w)
    console.log(`${dry ? 'DRY RUN ' : ''}📓 Obsidian ${r.vault}`)
    console.log(`   ${r.days} วัน ${r.months} เดือน ${dry ? 'จะเขียน' : 'เขียน'} ${r.written.length} ไฟล์ ${dry ? 'จะลบ' : 'ลบ'} ${r.removed.length} ไฟล์ เหมือนเดิม ${r.unchanged} ไฟล์`)
    if (dry) { for (const p of r.written) console.log('   + ' + p); for (const p of r.removed) console.log('   - ' + p) }
  } catch (e) {
    console.error('✗ ' + e.message)
    process.exit(1)
  }
}
