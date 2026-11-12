// worklog-auto.mjs · เขียน worklog ของวันนี้อัตโนมัติ ถ้าวันนี้มีเซสชันการทำงานแต่ยังไม่มีไฟล์
// ใช้: npm run worklog:auto        (เรียกจากรอบ 15:30 ใน worklog-month.mjs ก่อนสำเนาไป Obsidian)
//      npm run worklog:auto -- --dry            ดูว่าจะเขียนไหม และข้อมูลที่จะส่งให้ Claude โดยไม่เรียก Claude
//      npm run worklog:auto -- --date 2026-11-03 เขียนย้อนหลังของวันนั้น
//
// ผู้ใช้สั่ง 2026-11-04 หลังวันที่ 3 ไม่มี worklog เพราะงานจบที่ commit แล้วไม่มีใครเขียนต่อ
// ขั้นตอน
//   1. มีไฟล์ของวันนั้นแล้ว → ข้าม (ไม่เขียนทับของที่คนเขียน)
//   2. หาเซสชันของวันนั้น: ข้อความของผู้ใช้ในบันทึกเซสชัน Claude ของโปรเจกต์นี้ (รวม worktree) และ commit ของวันนั้น
//      ไม่มีทั้งสองอย่าง → ข้าม
//   3. ส่งข้อความ สรุปท้ายรอบ (wrap_up) และ commit ให้ `claude -p` ร่าง worklog ตามกฎ
//      Claude ได้แค่เครื่องมือ Read ส่วนการเขียนไฟล์ สคริปต์นี้ทำเองหลังตรวจหัวข้อครบ
import { existsSync, readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { homedir } from 'node:os'
import { spawnSync, execFileSync } from 'node:child_process'
import { pathToFileURL } from 'node:url'
import { ROOT, worklogPath, todayISO } from './worklog-path.mjs'

const CLAUDE = process.env.CLAUDE_BIN || join(homedir(), '.local/bin/claude')
const PROJECTS = join(homedir(), '.claude/projects')
const PROJECT_PREFIX = '-Users-pitsanuwat-som-nation-design-system'
const HEADINGS = ['## งานค้าง', '## งานที่ทำวันนี้', '## ผลลัพธ์', '## ติดปัญหา']
const MAX_CHARS = 60000

const bkkDate = (ts) => new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Bangkok' }).format(new Date(ts))
const bkkTime = (ts) => new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Bangkok', hour: '2-digit', minute: '2-digit' }).format(new Date(ts))

function textOf(content) {
  if (typeof content === 'string') return content
  if (Array.isArray(content)) return content.filter((c) => c?.type === 'text').map((c) => c.text).join('\n')
  return ''
}

/** ข้อความของผู้ใช้และสรุปท้ายรอบของวันนั้น จากบันทึกเซสชันทุกไฟล์ของโปรเจกต์ */
export function sessionActivity(date) {
  const out = []
  if (!existsSync(PROJECTS)) return out
  for (const dir of readdirSync(PROJECTS)) {
    if (!dir.startsWith(PROJECT_PREFIX)) continue
    for (const f of readdirSync(join(PROJECTS, dir))) {
      if (!f.endsWith('.jsonl')) continue
      const lines = readFileSync(join(PROJECTS, dir, f), 'utf8').split('\n')
      for (const line of lines) {
        if (!line.includes(date.slice(0, 7))) continue
        let o
        try { o = JSON.parse(line) } catch { continue }
        if (!o.timestamp || o.isSidechain || bkkDate(o.timestamp) !== date) continue
        if (o.type === 'user' && o.origin?.kind === 'human') {
          const t = textOf(o.message?.content).trim()
          if (t && !t.startsWith('<')) out.push({ ts: o.timestamp, kind: 'ผู้ใช้', text: t })
        } else if (o.type === 'assistant' && Array.isArray(o.message?.content)) {
          for (const c of o.message.content) {
            if (c?.type === 'tool_use' && c.name === 'mcp__ccd_turn__wrap_up' && c.input?.recap) {
              out.push({ ts: o.timestamp, kind: 'สรุปท้ายรอบ', text: c.input.recap })
            }
          }
        }
      }
    }
  }
  return out.sort((a, b) => a.ts.localeCompare(b.ts))
}

/** commit ของวันนั้นตามเวลาไทย */
export function commitsOf(date) {
  try {
    const raw = execFileSync('git', ['log', '--all', '--since', `${date}T00:00:00+07:00`, '--until', `${date}T23:59:59+07:00`,
      '--pretty=format:%h %s'], { encoding: 'utf8' })
    return raw.split('\n').filter(Boolean)
  } catch { return [] }
}

/** worklog วันล่าสุดก่อนวันนั้น (เพื่อยกงานค้าง) */
export function previousWorklog(date) {
  const base = join(ROOT, 'daily')
  let best = null
  for (const m of readdirSync(base)) {
    const dir = join(base, m)
    let files
    try { files = readdirSync(dir) } catch { continue }
    for (const f of files) {
      const mm = f.match(/^W\d+-\w+-(\d{2})-(\d{2})-(\d{4})\.md$/)
      if (!mm) continue
      const iso = `${Number(mm[3]) - 543}-${mm[2]}-${mm[1]}`
      if (iso < date && (!best || iso > best.iso)) best = { iso, path: join(dir, f) }
    }
  }
  return best
}

function buildPrompt(date, prev, activity, commits) {
  let log = activity.map((a) => `[${a.kind} ${bkkTime(a.ts)}] ${a.text}`).join('\n\n')
  if (log.length > MAX_CHARS) log = '(ตัดส่วนต้นออกเพราะยาวเกิน)\n' + log.slice(-MAX_CHARS)
  return `งานนี้เป็นรอบอัตโนมัติ 15:30 ที่ผู้ใช้สั่งไว้เมื่อ 2026-11-04 ไม่มีคนรอคำตอบ ห้ามถามกลับ ห้ามขออนุมัติ
ให้ร่าง worklog ของวันที่ ${date} แล้วตอบกลับเป็นเนื้อหา markdown ของไฟล์อย่างเดียว ไม่มีคำนำ ไม่มีคำอธิบาย ไม่ครอบด้วย code fence

อ่านก่อนเขียน (ใช้เครื่องมือ Read):
- docs/rules/worklog.md  กฎการเขียน
- ${ROOT}/_template.md  แม่แบบ (ไม่ต้องใส่ส่วนคอมเมนต์ท้ายแม่แบบ)
- ${prev ? prev.path + '  worklog วันก่อน ยกงานค้างมา แล้วลบข้อที่วันนี้ทำเสร็จ' : '(ไม่มี worklog วันก่อน)'}
- ไฟล์ใน ${ROOT}/tasks/ ถ้าต้องการชื่องานที่ตรงกับงานวันนี้

ข้อกำหนด:
- บรรทัดแรก "# Worklog ${date}" ตามด้วย "> Task: <ชื่องานหลักของวัน>"
- ต่อด้วยบรรทัด "> หมายเหตุ: เขียนอัตโนมัติจากรอบ 15:30 ตรวจและแก้ได้"
- มีครบ 4 หัวข้อตามลำดับ ${HEADINGS.join(' ')} ทุกข้อขึ้นต้นด้วย "- "
- เขียนเฉพาะสิ่งที่มีหลักฐานในข้อมูลด้านล่าง ห้ามเดา ถ้าหัวข้อไหนไม่มีข้อมูลให้ใส่ "- ไม่มี"
- ห้ามใช้ขีดยาว (U+2014) และห้ามใช้จุดกลางในย่อหน้า

commit ของวันนี้:
${commits.length ? commits.map((c) => '- ' + c).join('\n') : '- ไม่มี'}

ข้อความของผู้ใช้และสรุปท้ายรอบในเซสชันวันนี้:
${log || '(ไม่มี)'}
`
}

/** ตรวจผลจาก Claude ก่อนเขียนไฟล์ คืนข้อความผิดพลาด หรือ null ถ้าผ่าน */
export function validate(md, date) {
  if (!md.startsWith(`# Worklog ${date}`)) return 'บรรทัดแรกไม่ใช่หัว worklog ของวันนั้น'
  let last = -1
  for (const h of HEADINGS) {
    const i = md.indexOf(`\n${h}\n`)
    if (i < 0) return `ไม่มีหัวข้อ ${h}`
    if (i < last) return `หัวข้อ ${h} ผิดลำดับ`
    last = i
  }
  if (md.includes('\u2014')) return 'มีขีดยาว'
  return null
}

/** launchd ให้ PATH สั้นมาก claude ต้องมี USER เพื่ออ่านการล็อกอินจาก keychain และ hook บางตัวต้องหา node เจอ */
function claudeEnv() {
  const user = process.env.USER || process.env.LOGNAME || homedir().split('/').pop()
  return { ...process.env, USER: user, LOGNAME: user, PATH: `${dirname(process.execPath)}:${process.env.PATH || '/usr/bin:/bin'}` }
}

export function runAuto({ date = todayISO(), dry = false } = {}) {
  const path = worklogPath(date)
  if (existsSync(path)) return { status: 'skip', reason: 'มี worklog ของวันนี้แล้ว', path }
  const activity = sessionActivity(date)
  const commits = commitsOf(date)
  const human = activity.filter((a) => a.kind === 'ผู้ใช้').length
  if (!human && !commits.length) return { status: 'skip', reason: 'วันนี้ไม่มีเซสชันการทำงาน', path }

  const prompt = buildPrompt(date, previousWorklog(date), activity, commits)
  if (dry) return { status: 'dry', path, human, commits: commits.length, promptChars: prompt.length, prompt }

  const r = spawnSync(CLAUDE, ['-p', '--tools', 'Read', '--allowedTools', 'Read', '--permission-mode', 'dontAsk',
    '--output-format', 'text', '--no-session-persistence'],
  { input: prompt, encoding: 'utf8', timeout: 15 * 60 * 1000, maxBuffer: 10 * 1024 * 1024, env: claudeEnv() })
  if (r.error) throw new Error(`เรียก claude ไม่ได้: ${r.error.message}`)
  if (r.status !== 0) throw new Error(`claude จบด้วยรหัส ${r.status}: ${(r.stderr || r.stdout || '').trim().slice(0, 300)}`)

  const md = r.stdout.trim().replace(/^```(?:markdown|md)?\n/, '').replace(/\n```$/, '') + '\n'
  const bad = validate(md, date)
  if (bad) throw new Error(`ร่างจาก claude ไม่ผ่านการตรวจ (${bad}) จึงไม่เขียนไฟล์`)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, md)
  return { status: 'written', path, human, commits: commits.length }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = process.argv.slice(2)
  const dry = args.includes('--dry')
  const di = args.indexOf('--date')
  const date = di >= 0 ? args[di + 1] : todayISO()
  try {
    const r = runAuto({ date, dry })
    if (r.status === 'skip') console.log(`📝 worklog อัตโนมัติ ${date}: ข้าม (${r.reason})`)
    else if (r.status === 'dry') {
      console.log(`📝 worklog อัตโนมัติ ${date}: จะเขียน ${r.path}`)
      console.log(`   ข้อความผู้ใช้ ${r.human} ข้อ commit ${r.commits} ตัว prompt ${r.promptChars} ตัวอักษร`)
      if (args.includes('--show')) console.log('\n' + r.prompt)
    } else console.log(`📝 worklog อัตโนมัติ ${date}: เขียนแล้ว ${r.path} (ข้อความผู้ใช้ ${r.human} ข้อ commit ${r.commits} ตัว)`)
  } catch (e) {
    console.error(`✗ worklog อัตโนมัติ ${date} ไม่สำเร็จ: ${e.message}`)
    process.exit(1)
  }
}
