// one-cms-obsidian.mjs สำเนากฎโปรเจกต์และงานรายวันของ One CMS ไปที่ Obsidian vault ของโปรเจกต์นี้
// ใช้: npm run one-cms:obsidian                       เขียนลง vault
//      npm run one-cms:obsidian -- --dry              ดูว่าจะเขียนหรือลบไฟล์ไหนโดยไม่ทำจริง
//      npm run one-cms:obsidian -- --vault "<path>"   ใช้ vault อื่น
//
// กติกา (user สั่ง 2026-10-28) ใช้กติกาเดียวกับ worklog-obsidian.mjs
//   ต้นทางอยู่ใน repo ที่เดียว vault เป็นสำเนาไว้อ่าน สร้างใหม่ทั้งชุดทุกครั้ง เขียนเฉพาะไฟล์ที่เนื้อหาเปลี่ยน
//   ลบได้เฉพาะไฟล์ที่สคริปต์นี้เคยสร้าง (มีข้อความ BANNER) ไฟล์ที่ user เขียนเองใน vault ไม่แตะเด็ดขาด
//   worklog vault เดิมยังมีงานครบทุกงาน vault นี้ดึงเฉพาะงานของ One CMS
//
// โครงใน vault
//   หน้าหลัก.md                                  สารบัญ งานค้างล่าสุด และรายการวัน
//   Rules/กฎโปรเจกต์.md                           จาก context/features/one-cms/AGENTS.md
//   Rules/<path เดิม>.md                          ไฟล์ .md อื่นในโฟลเดอร์นั้น เช่น pages/ flows/ decisions/
//   Worklog 2026/10 October/Oct Week4 Wed28.md      เฉพาะรายการที่พูดถึง One CMS ชื่อปีเดือนวันแบบเดียวกับ worklog vault
//
// รายการไหนเป็นของ One CMS: รายการระดับบนสุดที่มีคำว่า One CMS หรือ one-cms รายการย่อยใต้รายการนั้นติดไปด้วย
// วันที่ไม่มีรายการของ One CMS เลยจะไม่มีโน้ต
//
// vault ที่ใช้: --vault <path> ก่อน แล้ว ONE_CMS_VAULT ใน .env แล้วค่อย ~/Documents/One CMS
import { readFileSync, existsSync, readdirSync, unlinkSync, rmdirSync } from 'node:fs'
import { join, resolve, relative } from 'node:path'
import { homedir } from 'node:os'
import { fileURLToPath } from 'node:url'
import { collectDays, envValue, expandHome, parts, dayLabel, monthName, noteName, isNone, put, walk } from './worklog-obsidian.mjs'

const SOURCE = 'context/features/one-cms'
const MATCH = /One CMS|one-cms/i
const SECTIONS = ['งานค้าง', 'งานที่ทำวันนี้', 'ผลลัพธ์', 'ติดปัญหา']
const INDEX = 'หน้าหลัก'
const RULES = 'Rules'
// โฟลเดอร์ที่สคริปต์นี้เป็นเจ้าของ เก็บกวาดได้เฉพาะในนี้ (หน้าหลักอยู่ที่ราก vault สคริปต์เขียนทับทุกรอบ ไม่ต้องเก็บกวาด)
const OWNED_ROOT = /^(Rules|Worklog \d{4})$/
// ⚠️ ห้ามเปลี่ยนข้อความ BANNER สคริปต์ใช้ข้อความนี้แยกไฟล์ที่ตัวเองสร้างออกจากไฟล์ที่ user เขียนเอง ก่อนลบ
const BANNER = 'สร้างอัตโนมัติจาก repo nation-design-system สำหรับโปรเจกต์ One CMS'
const HOWTO = 'แก้ที่ไฟล์ต้นทางใน repo แล้วรัน `npm run one-cms:obsidian` (รันเองตอน 16:30 พร้อมการส่ง Asana) ถ้าแก้ในนี้จะถูกเขียนทับรอบถัดไป'
const q = (s) => JSON.stringify(s)

export function vaultPath(argv = process.argv.slice(2)) {
  const i = argv.indexOf('--vault')
  if (i >= 0 && argv[i + 1]) return resolve(expandHome(argv[i + 1]))
  const fromEnv = envValue('ONE_CMS_VAULT')
  if (fromEnv) return resolve(expandHome(fromEnv))
  return join(homedir(), 'Documents', 'One CMS')
}

const worklogPath = (iso) => `Worklog ${parts(iso).y}/${monthName(iso)}/${noteName(iso)}`
const ruleName = (rel) => (rel === 'AGENTS.md' ? 'กฎโปรเจกต์.md' : rel)

/** รายการระดับบนสุดที่พูดถึง One CMS พร้อมรายการย่อยของมัน */
function pick(lines) {
  const out = []
  let keep = false
  for (const l of lines) {
    if (/^-\s/.test(l)) keep = MATCH.test(l) && !isNone(l)
    if (keep) out.push(l)
  }
  return out
}

function dailyNote(w, sec) {
  return [
    '---',
    `date: ${w.date}`,
    `day: ${q(dayLabel(w.date))}`,
    'tags:',
    '  - one-cms/worklog',
    `source: ${q(w.path)}`,
    '---',
    `> [!note] ${BANNER}`,
    `> ${HOWTO}`,
    `> ดึงเฉพาะรายการที่พูดถึง One CMS จาก worklog ของวันนี้ บันทึกเต็มอยู่ใน vault ของ worklog`,
    '',
    ...SECTIONS.filter((s) => sec[s].length).flatMap((s) => [`## ${s}`, '', ...sec[s], '']),
  ].join('\n').replace(/\n+$/, '') + '\n'
}

function ruleNote(rel, text) {
  return [
    '---',
    'tags:',
    '  - one-cms/rules',
    `source: ${q(`${SOURCE}/${rel}`)}`,
    '---',
    `> [!note] ${BANNER}`,
    `> ${HOWTO}`,
    '',
    text.replace(/\s+$/, ''),
  ].join('\n') + '\n'
}

function indexNote(rules, days) {
  const last = days[days.length - 1]
  const pending = last ? last.sec['งานค้าง'] : []
  return [
    '---',
    'tags:',
    '  - one-cms',
    ...(last ? [`updated: ${last.w.date}`] : []),
    '---',
    `> [!info] ${BANNER}`,
    `> ${HOWTO}`,
    '',
    '## กฎโปรเจกต์',
    '',
    ...rules.map((r) => `- [[${RULES}/${r.replace(/\.md$/, '')}|${r.replace(/\.md$/, '')}]]`),
    '',
    '## งานค้าง',
    '',
    ...(last ? [`ณ [[${worklogPath(last.w.date)}|${dayLabel(last.w.date)}]] วันล่าสุดที่มีงานของ One CMS`, '', ...(pending.length ? pending : ['- ไม่มีงานค้าง'])] : ['- ยังไม่มีบันทึก']),
    '',
    '## งานรายวัน',
    '',
    ...(days.length ? [...days].reverse().map((d) => `- [[${worklogPath(d.w.date)}|${dayLabel(d.w.date)}]]`) : ['- ยังไม่มีบันทึก']),
  ].join('\n').replace(/\n+$/, '') + '\n'
}

/** ลบไฟล์ที่สคริปต์เคยสร้างแต่รอบนี้ไม่ได้สร้าง แล้วลบโฟลเดอร์ที่ว่าง เฉพาะในโฟลเดอร์ที่เป็นเจ้าของ */
function prune(vault, dry, stat) {
  for (const e of readdirSync(vault, { withFileTypes: true })) {
    if (!e.isDirectory() || !OWNED_ROOT.test(e.name)) continue
    const out = join(vault, e.name)
    for (const p of walk(out)) {
      if (!p.endsWith('.md') || stat.keep.has(p)) continue
      let text = ''
      try { text = readFileSync(p, 'utf8') } catch { continue }
      if (!text.includes(BANNER)) continue   // ไฟล์ที่ user เขียนเอง ไม่แตะ
      if (!dry) {
        try { unlinkSync(p) } catch (err) { stat.warnings.push(`ลบไฟล์เก่า ${relative(vault, p)} ไม่ได้ (${err.code || err.message})`); continue }
      }
      stat.removed.push(p)
    }
    if (dry) continue
    const sweep = (d) => {
      for (const x of readdirSync(d, { withFileTypes: true })) if (x.isDirectory()) sweep(join(d, x.name))
      const rest = readdirSync(d)
      if (!rest.every((n) => n === '.DS_Store')) return
      try { for (const n of rest) unlinkSync(join(d, n)); rmdirSync(d) }
      catch (err) { stat.warnings.push(`ลบโฟลเดอร์ว่าง ${relative(vault, d)} ไม่ได้ (${err.code || err.message})`) }
    }
    sweep(out)
  }
}

/** สร้างโน้ตทั้งชุดใน vault ของ One CMS คืนค่าสรุปว่าเขียนและลบอะไรไปบ้าง */
export function syncOneCms({ vault = vaultPath(), dry = false } = {}) {
  if (!existsSync(join(vault, '.obsidian')))
    throw new Error(`ไม่พบ vault ที่ ${vault} (ต้องมีโฟลเดอร์ .obsidian) ตั้ง ONE_CMS_VAULT ใน .env หรือส่ง --vault`)
  const { days: all, warnings } = collectDays()
  const stat = { keep: new Set(), written: [], removed: [], unchanged: 0, warnings }

  const rules = walk(SOURCE).filter((p) => p.endsWith('.md')).map((p) => relative(SOURCE, p)).sort()
  for (const rel of rules) put(join(vault, RULES, ruleName(rel)), ruleNote(rel, readFileSync(join(SOURCE, rel), 'utf8')), dry, stat)

  const days = []
  for (const w of all) {
    const sec = Object.fromEntries(SECTIONS.map((s) => [s, pick(w.sec[s] || [])]))
    // งานค้างอย่างเดียวไม่นับเป็นวันที่ทำงาน เพราะรายการค้างถูกยกต่อทุกวัน
    if (!['งานที่ทำวันนี้', 'ผลลัพธ์', 'ติดปัญหา'].some((s) => sec[s].length)) continue
    days.push({ w, sec })
    put(join(vault, `${worklogPath(w.date)}.md`), dailyNote(w, sec), dry, stat)
  }
  put(join(vault, `${INDEX}.md`), indexNote(rules.map(ruleName), days), dry, stat)
  prune(vault, dry, stat)
  return {
    vault, rules: rules.length, days: days.length,
    written: stat.written.map((p) => relative(vault, p)), removed: stat.removed.map((p) => relative(vault, p)),
    unchanged: stat.unchanged, warnings: stat.warnings,
  }
}

const isMain = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)
if (isMain) {
  const dry = process.argv.includes('--dry')
  try {
    const r = syncOneCms({ dry })
    for (const w of r.warnings) console.warn('⚠️ ' + w)
    console.log(`${dry ? 'DRY RUN ' : ''}📓 One CMS ${r.vault}`)
    console.log(`   กฎ ${r.rules} ไฟล์ งานรายวัน ${r.days} วัน ${dry ? 'จะเขียน' : 'เขียน'} ${r.written.length} ไฟล์ ${dry ? 'จะลบ' : 'ลบ'} ${r.removed.length} ไฟล์ เหมือนเดิม ${r.unchanged} ไฟล์`)
    if (dry) { for (const p of r.written) console.log('   + ' + p); for (const p of r.removed) console.log('   - ' + p) }
  } catch (e) {
    console.error('✗ ' + e.message)
    process.exit(1)
  }
}
