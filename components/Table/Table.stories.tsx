import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Table, type TableColumn, type TableSort } from './Table'
import { Badge } from '../Badge'
import { Tag } from '../Tag'
import { Avatar, AvatarGroup, AvatarLabel } from '../Avatar'
import { ProgressBar } from '../Progress'
import { Icon } from '../Icon'
import { IconButton } from '../IconButton'
import { LinkButton } from '../LinkButton'
import { Preview, Labeled, DoDont, Do, Dont } from '../../.storybook/docs-blocks'

// หน้า Docs จัดกลุ่ม story ตาม parameters.docs.section ดูกติกาที่ .storybook/CustomDocsPage.tsx
// ไฟล์ออกแบบหน้า 26 Table ไม่มีชุดตาราง มีแต่เซล 15 ชนิด (ลงท้ายด้วย -table-cell) ที่ประกอบเป็นตาราง
// ตัวอย่างตารางอ้างอิงในไฟล์คือเฟรม Team members (เลือก ผู้ใช้ ข้อความ ป้าย วันที่)
// เซลผสม (badge tag user avatar-group progress-bar star action) ใช้ render แล้วประกอบจาก component ของระบบ ห้ามวาดเอง

interface Row {
  id: string
  name: string
  position: string
  role: string
  team: string
  status: 'active' | 'invited' | 'suspended'
  joined: string
  views: number
  progress: number
  rating: number
  avatar: number
}

const IMG = (n: number) => `https://i.pravatar.cc/150?img=${n}`

const ROWS: Row[] = [
  { id: '1', name: 'สมชาย ใจดี', position: 'บรรณาธิการข่าว', role: 'ผู้ดูแล', team: 'เศรษฐกิจ', status: 'active', joined: '12/01/2569', views: 12480, progress: 82, rating: 5, avatar: 8 },
  { id: '2', name: 'วิภา ศรีสุข', position: 'นักข่าวภาคสนาม', role: 'ผู้เขียน', team: 'การเมือง', status: 'invited', joined: '03/03/2569', views: 8450, progress: 46, rating: 4, avatar: 5 },
  { id: '3', name: 'ปรีชา วงศ์ดี', position: 'ช่างภาพ', role: 'ผู้เขียน', team: 'กีฬา', status: 'suspended', joined: '28/06/2569', views: 430, progress: 12, rating: 3, avatar: 12 },
]

const STATUS: Record<Row['status'], { label: string; family: 'green' | 'blue' | 'red' }> = {
  active: { label: 'ใช้งานอยู่', family: 'green' },
  invited: { label: 'รอตอบรับ', family: 'blue' },
  suspended: { label: 'ระงับ', family: 'red' },
}

// คอลัมน์พื้นฐาน 4 ชนิดที่ไม่ต้อง render เอง
const BASIC: TableColumn<Row>[] = [
  { id: 'name', header: 'ชื่อ', accessor: (r) => r.name, supporting: (r) => r.position, rowHeader: true, sortable: true },
  { id: 'team', header: 'โต๊ะข่าว', accessor: (r) => r.team, sortable: true },
  { id: 'views', header: 'ยอดดู', accessor: (r) => r.views.toLocaleString('th-TH'), variant: 'number', sortable: true },
  { id: 'joined', header: 'เข้าร่วม', accessor: (r) => r.joined, variant: 'date' },
]

// คอลัมน์ลำดับแถวกับเงิน ใช้ในตัวอย่างการจัดชิด (กฎตัดสิน 2026-10-28)
const INDEX_COL: TableColumn<Row> = { id: 'no', header: 'ที่', accessor: (_r, i) => i + 1, variant: 'index' }
const CURRENCY_COL: TableColumn<Row> = { id: 'revenue', header: 'รายได้โฆษณา', accessor: (r) => (r.views * 0.35).toLocaleString('th-TH', { style: 'currency', currency: 'THB' }), variant: 'currency', sortable: true }

// ตารางอ้างอิงตามเฟรม Team members ในไฟล์ออกแบบ (select, user, text, badge, date)
const TEAM: TableColumn<Row>[] = [
  { id: 'user', header: 'ชื่อ', rowHeader: true, sortable: true, render: (r) => <AvatarLabel size="md" avatar={<Avatar src={IMG(r.avatar)} alt="" />} title={r.name} supportingText={r.position} /> },
  { id: 'role', header: 'บทบาท', accessor: (r) => r.role, supporting: (r) => r.team, sortable: true },
  { id: 'status', header: 'สถานะ', sortable: true, render: (r) => <Badge family={STATUS[r.status].family} hierarchy="secondary" size="md">{STATUS[r.status].label}</Badge> },
  { id: 'joined', header: 'เข้าร่วม', accessor: (r) => r.joined, variant: 'date', sortable: true },
]

const RowTable = Table<Row>

const meta: Meta<typeof RowTable> = {
  title: 'Components/Table',
  component: RowTable,
  tags: ['autodocs'],
  args: {
    columns: TEAM,
    data: ROWS,
    getRowId: (r: Row) => r.id,
    caption: 'สมาชิกทีม',
    captionHidden: false,
    zebra: false,
    stickyHeader: false,
    selectable: true,
    selectAllLabel: 'เลือกทุกแถว',
    emptyMessage: 'ยังไม่มีข้อมูล',
  },
  parameters: {
    docs: {
      sectionNotes: {
        ขนาด: 'ตารางไม่มีแกนขนาด เซลทุกชนิดใช้ระยะขอบ 12 และระยะภายใน 8 เท่ากันหมด ความสูงแถวมาจากเนื้อหา (หัวตาราง 48 เนื้อหา 40 ถึง 70) จึงไม่มีสูตรความสูงและห้ามตั้งตายตัว ชุดแน่นกับโปร่งยังไม่มี token รองรับ',
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof RowTable>

const controls = (include: string[]) => ({ controls: { include } })
const TABLE = ['caption', 'captionHidden', 'zebra', 'stickyHeader', 'selectable', 'selectAllLabel', 'emptyMessage']

export const Default: Story = { name: 'Table', parameters: controls(TABLE) }

// ── ส่วนประกอบ ──────────────────────────────────────────────
export const Anatomy: Story = {
  tags: ['!dev'],
  name: 'ส่วนประกอบทั้งหมด',
  parameters: { docs: { section: 'ส่วนประกอบ', description: { story: 'ตารางประกอบจาก คำอธิบายตาราง (caption) แถวหัว (header-table-cell กดเรียงได้เมื่อ sortable) ช่องติ๊กเลือกทั้งหมด (header-select-table-cell) ช่องติ๊กของแถว (select-table-cell ใช้ Checkbox ขนาด sm) และเซลเนื้อหา ตัวตารางเป็น table thead tbody th td จริง คอลัมน์ที่ระบุตัวแถวตั้ง rowHeader ให้เป็น th scope=row' } } },
  render: () => (
    <Table<Row> columns={BASIC} data={ROWS} getRowId={(r) => r.id} caption="รายชื่อนักข่าว" selectable selectAllLabel="เลือกทุกแถว" getRowSelectLabel={(r) => `เลือก ${r.name}`} />
  ),
}

// ── ชุด (ไม่มีชุดตาราง ใช้เซล 15 ชนิดแทน) ──────────────────
export const CellTypes: Story = {
  tags: ['!dev'],
  name: 'เซล 15 ชนิด',
  parameters: { docs: { section: 'ชุด', description: { story: 'ไฟล์ออกแบบไม่มีชุดตาราง มีแต่เซล 17 ชนิดที่ประกอบกันเป็นตาราง เซลพื้นฐาน 6 ชนิดตั้งด้วย variant (text number currency index date link) currency ชิดขวา index จัดกลาง ที่เหลือชิดซ้าย ส่วนเซลผสม (badge tag user avatar-group progress-bar star icon action) ใช้ render แล้วประกอบจาก component ของระบบ ใส่ inline เมื่อเซล custom มีลูกหลายชิ้น เซล header, header-select และ select ตารางสร้างให้เอง' } } },
  render: () => (
    <Table<Row>
      caption="เซลทุกชนิดในตารางเดียว"
      data={ROWS}
      getRowId={(r) => r.id}
      selectable
      selectAllLabel="เลือกทุกแถว"
      columns={[
        { id: 'user', header: 'user', rowHeader: true, render: (r) => <AvatarLabel size="md" avatar={<Avatar src={IMG(r.avatar)} alt="" />} title={r.name} supportingText={r.position} /> },
        { id: 'text', header: 'text', accessor: (r) => r.role, supporting: (r) => r.team },
        { id: 'index', header: 'index', accessor: (_r, i) => i + 1, variant: 'index' },
        { id: 'number', header: 'number', accessor: (r) => r.views.toLocaleString('th-TH'), variant: 'number' },
        { id: 'currency', header: 'currency', accessor: (r) => (r.views * 0.35).toLocaleString('th-TH', { style: 'currency', currency: 'THB' }), variant: 'currency' },
        { id: 'date', header: 'date', accessor: (r) => r.joined, variant: 'date' },
        { id: 'badge', header: 'badge', render: (r) => <Badge family={STATUS[r.status].family} hierarchy="secondary" size="md">{STATUS[r.status].label}</Badge> },
        { id: 'tag', header: 'tag', render: (r) => <Tag family="neutral" hierarchy="secondary" size="md">{r.team}</Tag> },
        { id: 'link', header: 'link', variant: 'link', render: () => <LinkButton size="sm">เปิด</LinkButton> },
        { id: 'group', header: 'avatar-group', inline: true, render: (r) => <><span>{r.rating} คน</span><AvatarGroup size="xs" max={5}>{Array.from({ length: r.rating }, (_, i) => <Avatar key={i} src={IMG(20 + i)} alt="" />)}</AvatarGroup></> },
        { id: 'progress', header: 'progress-bar', width: '200px', render: (r) => <ProgressBar label={`ความคืบหน้าของ ${r.name}`} value={r.progress} size="sm" /> },
        { id: 'star', header: 'star', inline: true, render: (r) => Array.from({ length: 5 }, (_, i) => <Icon key={i} name="star-fill" size="sm" style={{ color: i < r.rating ? 'var(--ntg-color-foreground-system-warning-primary)' : 'var(--ntg-color-foreground-system-disabled)' }} />) },
        { id: 'icon', header: 'icon', variant: 'icon', render: () => <><Icon name="edit" size="sm" title="แก้ไข" /><Icon name="delete" size="sm" title="ลบ" /></> },
        { id: 'action', header: 'action', variant: 'action', render: (r) => <IconButton icon="more-vert" label={`จัดการ ${r.name}`} family="neutral" hierarchy="tertiary" size="sm" /> },
      ]}
    />
  ),
}

// ── สถานะ ───────────────────────────────────────────────────
const StatesDemo = () => {
  const [selected, setSelected] = useState<string[]>(['1'])
  const [sort, setSort] = useState<TableSort | null>({ columnId: 'views', direction: 'desc' })
  const sorted = [...ROWS].sort((a, b) => {
    if (!sort) return 0
    const dir = sort.direction === 'asc' ? 1 : -1
    const key = sort.columnId as keyof Row
    return a[key] > b[key] ? dir : a[key] < b[key] ? -dir : 0
  })
  return (
    <Table<Row>
      columns={BASIC}
      data={sorted}
      getRowId={(r) => r.id}
      caption="แถวถูกเลือก แถวปิดใช้งาน และหัวคอลัมน์ที่กำลังเรียง"
      selectable
      selectAllLabel="เลือกทุกแถว"
      selectedIds={selected}
      onSelectionChange={setSelected}
      isRowDisabled={(r) => r.status === 'suspended'}
      sort={sort}
      onSortChange={setSort}
    />
  )
}
StatesDemo.displayName = 'Table'

export const States: Story = {
  tags: ['!dev'],
  name: 'แถวและหัวตาราง',
  parameters: { docs: { section: 'สถานะ', description: { story: 'แถวมี 4 สถานะ ปกติ ชี้ (พื้น primary-hover) ถูกเลือก (ติ๊กและพื้น brand-primary-alt) และปิดใช้งาน (เลือกไม่ได้ ตัวอักษรจาง) หัวคอลัมน์มี 3 สถานะ ไม่เรียง เรียงขึ้น เรียงลง กดวนตามลำดับนั้น ตัวเลือกเสริมคือแถวสลับสี (zebra) หัวตรึงเมื่อเลื่อน (stickyHeader) และข้อความตอนไม่มีข้อมูล (emptyMessage)' } } },
  render: () => <StatesDemo />,
}

export const Variants: Story = {
  tags: ['!dev'],
  name: 'แถวสลับสี หัวตรึง ไม่มีข้อมูล',
  parameters: { docs: { section: 'สถานะ' } },
  render: () => (
    <Preview column>
      <Labeled label="zebra"><Table<Row> columns={BASIC} data={ROWS} getRowId={(r) => r.id} caption="แถวสลับสี" captionHidden zebra /></Labeled>
      <Labeled label="stickyHeader (เลื่อนในกรอบสูง 160)">
        <div style={{ height: 160, overflow: 'auto', width: '100%' }}>
          <Table<Row> columns={BASIC} data={[...ROWS, ...ROWS].map((r, i) => ({ ...r, id: String(i) }))} getRowId={(r) => r.id} caption="หัวตรึง" captionHidden stickyHeader />
        </div>
      </Labeled>
      <Labeled label="emptyMessage"><Table<Row> columns={BASIC} data={[]} getRowId={(r) => r.id} caption="ไม่มีข้อมูล" captionHidden emptyMessage="ยังไม่มีสมาชิกในทีมนี้" /></Labeled>
    </Preview>
  ),
}

// ── ควรไม่ควร ───────────────────────────────────────────────
export const GoodAndBad: Story = {
  tags: ['!dev'],
  name: 'ควรและไม่ควร',
  parameters: { docs: { section: 'ควรไม่ควร', hideCode: true } },
  render: () => (
    <DoDont>
      <Do text="คอลัมน์เงินใช้ variant currency ชิดขวา ลำดับแถวใช้ index จัดกลาง ตัวเลขทั่วไป ข้อความ และวันที่ชิดซ้าย">
        <Table<Row> columns={[INDEX_COL, BASIC[2], CURRENCY_COL]} data={ROWS} getRowId={(r) => r.id} caption="จัดชิดตามชนิดข้อมูล" captionHidden />
      </Do>
      <Dont text="ตั้ง align ให้ตัวเลขทั่วไปชิดขวาเพื่อให้ดูเหมือนเงิน หรือให้เงินชิดซ้าย ผิดกฎการจัดชิดของตาราง">
        <Table<Row> columns={[{ ...BASIC[2], align: 'end' }, { ...CURRENCY_COL, align: 'start' }]} data={ROWS} getRowId={(r) => r.id} caption="จัดชิดผิดชนิด" captionHidden />
      </Dont>
      <Do text="ใส่ caption บอกว่าตารางนี้คืออะไร ซ่อนด้วย captionHidden ได้ถ้าหัวข้อบนหน้าบอกอยู่แล้ว โปรแกรมอ่านหน้าจอยังอ่าน">
        <Table<Row> columns={[BASIC[0], BASIC[1]]} data={ROWS.slice(0, 2)} getRowId={(r) => r.id} caption="นักข่าวที่เข้าเวรวันนี้" />
      </Do>
      <Dont text="ตั้งความสูงแถวตายตัวหรือใช้ div สวมรอยเป็นตาราง เนื้อหายาวจะถูกตัด และโปรแกรมอ่านหน้าจอบอกตำแหน่งแถวคอลัมน์ไม่ได้">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, width: '100%' }}>
          <div style={{ height: 32, overflow: 'hidden' }}>สมชาย ใจดี บรรณาธิการข่าว โต๊ะเศรษฐกิจ</div>
          <div style={{ height: 32, overflow: 'hidden' }}>12,480</div>
        </div>
      </Dont>
    </DoDont>
  ),
}
