import type { Meta, StoryObj } from '@storybook/react-vite'
import '../tokens/output/css/typography.css'
import { Table } from '../components/Table'
import { Badge } from '../components/Badge'
import { LinkButton } from '../components/LinkButton'
import { Banner } from '../components/Banner'

/**
 * ทะเบียน component candidate: ของที่โปรเจกต์ย่อยต้องใช้แต่ระบบยังไม่มี
 *
 * ที่มาของหน้านี้ (ตั้ง 2026-11-26): ก่อนหน้านี้ข้อเสนอกระจายอยู่ในกฎของแต่ละโปรเจกต์
 * (เช่น One CMS เสนอตัวเลือกวันที่กับกล่องแชท AI ไว้ใน context/features/one-cms/AGENTS.md)
 * โปรเจกต์อื่นไม่เห็นกัน จึงเสี่ยงสร้างของเดียวกันซ้ำ หน้านี้รวมทุกข้อเสนอไว้ที่เดียว
 *
 * กติกาเต็มอยู่ที่ docs/rules/component-candidate.md ฉบับสำหรับ AI อยู่ที่ candidates/AGENTS.md
 *
 * วิธีส่ง candidate โดยย่อ
 * 1. คัดลอก candidates/_template.candidate.yaml ไปเป็น candidates/<ชื่อ>/candidate.yaml แล้วกรอกให้ครบ
 * 2. ตัวอย่างที่กดดูได้ (ถ้ามี) เขียนเป็น story ในโฟลเดอร์เดียวกัน สร้างจาก token --ntg- ล้วน
 *    ห้ามวางใน components/ จนกว่าทีม Design System จะรับและสร้างจริงผ่าน Figma
 * 3. npm run verify:candidates ให้ผ่าน แล้วเปิด Pull Request ที่แตะเฉพาะ candidates/
 */

type CandidateRow = {
  id: string
  name: string
  thaiName: string
  requestedBy: string
  status: string
  submitted: string
  expires: string
  problem: string
  triedInstead: string
  figma: string
  pr: string
  notes: string
}

// อ่าน candidate.yaml ทุกไฟล์ตอน build ไฟล์เขียนตามแม่แบบเท่านั้น (key: value บรรทัดเดียว ยกเว้น >- ของ problem)
// จงใจไม่ใช้ตัวอ่าน YAML เต็มรูป เพื่อไม่เพิ่ม dependency ให้ทั้ง repo ด้วยเหตุผลแค่หน้าเดียว
const FILES = import.meta.glob('./*/candidate.yaml', { query: '?raw', import: 'default', eager: true }) as Record<string, string>

const parseCandidate = (id: string, raw: string): CandidateRow => {
  const row: Record<string, string> = {}
  let key = ''
  let folded = false
  for (const line of raw.split('\n')) {
    if (/^\s*#/.test(line) || line.trim() === '') continue
    const m = line.match(/^([a-zA-Z]+):\s*(.*)$/)
    if (m) {
      key = m[1]
      folded = m[2] === '>-'
      row[key] = folded ? '' : m[2]
    } else if (folded && key) {
      row[key] = (row[key] ? `${row[key]} ` : '') + line.trim()
    }
  }
  return {
    id,
    name: row.name ?? id,
    thaiName: row.thaiName ?? '',
    requestedBy: row.requestedBy ?? '',
    status: row.status ?? 'proposed',
    submitted: row.submitted ?? '',
    expires: row.expires ?? '',
    problem: row.problem ?? '',
    triedInstead: row.triedInstead ?? '',
    figma: row.figma ?? '',
    pr: row.pr ?? '',
    notes: row.notes ?? '',
  }
}

const CANDIDATES: CandidateRow[] = Object.entries(FILES)
  .map(([path, raw]) => parseCandidate(path.split('/')[1] ?? path, raw))
  .sort((a, b) => a.submitted.localeCompare(b.submitted))

const STATUS: Record<string, { label: string; family: 'neutral' | 'green' | 'blue' | 'purple' | 'red' }> = {
  proposed: { label: 'รอตัดสิน', family: 'neutral' },
  accepted: { label: 'รับแล้ว รอสร้าง', family: 'green' },
  building: { label: 'กำลังสร้าง', family: 'blue' },
  merged: { label: 'รวมกับตัวเดิม', family: 'purple' },
  rejected: { label: 'ไม่รับ', family: 'red' },
}

const today = () => new Date().toISOString().slice(0, 10)
const isOverdue = (row: CandidateRow) => row.status === 'proposed' && row.expires !== '' && row.expires < today()

const meta: Meta = {
  title: 'Candidates/ทะเบียน Candidate',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'ของที่โปรเจกต์ย่อยต้องใช้แต่ระบบยังไม่มี แต่ละรายการมาจาก candidates/<ชื่อ>/candidate.yaml ' +
          'ส่งข้อเสนอโดยคัดลอก candidates/_template.candidate.yaml แล้วเปิด Pull Request ที่แตะเฉพาะ candidates/ ' +
          'ตัวชั่วคราวในโปรเจกต์ต้องมีวันหมดอายุไม่เกิน 30 วัน รายการที่เลยกำหนดจะขึ้นป้ายแดง ' +
          'ทีม Design System ตัดสินใน Pull Request แล้วแก้ status ในไฟล์ของรายการนั้น กติกาเต็มอยู่ที่ docs/rules/component-candidate.md',
      },
    },
  },
}
export default meta

export const Registry: StoryObj = {
  name: 'ทะเบียน',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ntg-size-space-s2-sm)' }}>
      <Banner
        type="warning"
        title="ของในหมวดนี้ยังไม่ใช่ component ของระบบ"
        description="ห้ามใช้ในงานจริงจนกว่าสถานะเป็นรับแล้วและตัวจริงออกเป็น beta ตัวอย่างที่กดดูได้สร้างจาก token ล้วนเพื่อประกอบการตัดสินเท่านั้น"
      />
      <Table<CandidateRow>
        caption="ทะเบียน component candidate"
        data={CANDIDATES}
        getRowId={(r) => r.id}
        columns={[
          { id: 'name', header: 'ชื่อ', rowHeader: true, accessor: (r) => r.thaiName || r.name, supporting: (r) => r.name },
          { id: 'requestedBy', header: 'โปรเจกต์ที่ขอ', accessor: (r) => r.requestedBy },
          {
            id: 'status', header: 'สถานะ',
            render: (r) => {
              const s = STATUS[r.status] ?? STATUS.proposed
              return isOverdue(r)
                ? <Badge family="red" hierarchy="secondary" size="md">เลยกำหนด {r.expires}</Badge>
                : <Badge family={s.family} hierarchy="secondary" size="md">{s.label}</Badge>
            },
          },
          { id: 'submitted', header: 'ส่งเมื่อ', accessor: (r) => r.submitted, variant: 'date' },
          { id: 'expires', header: 'หมดอายุ', accessor: (r) => r.expires, variant: 'date' },
          {
            id: 'links', header: 'ลิงก์', variant: 'link', inline: true,
            render: (r) => (
              <>
                {r.pr.startsWith('http') ? <LinkButton size="sm" href={r.pr}>Pull Request</LinkButton> : null}
                {r.figma.startsWith('http') ? <LinkButton size="sm" href={r.figma}>Figma</LinkButton> : null}
              </>
            ),
          },
        ]}
      />
      {CANDIDATES.map((r) => (
        <section key={r.id} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ntg-size-space-s1-sm)' }}>
          <h3 className="ntg-typography-section-heading-sm" style={{ margin: 0, color: 'var(--ntg-color-text-general-heading)' }}>
            {r.thaiName || r.name} ({r.name})
          </h3>
          <p className="ntg-typography-body-md" style={{ margin: 0, color: 'var(--ntg-color-text-general-text)' }}>{r.problem}</p>
          {r.triedInstead ? (
            <p className="ntg-typography-body-sm" style={{ margin: 0, color: 'var(--ntg-color-text-general-text)' }}>ลองแล้วใช้ไม่ได้: {r.triedInstead}</p>
          ) : null}
          {r.notes ? (
            <p className="ntg-typography-body-sm" style={{ margin: 0, color: 'var(--ntg-color-text-general-text)' }}>ข้อสังเกต: {r.notes}</p>
          ) : null}
        </section>
      ))}
    </div>
  ),
}
