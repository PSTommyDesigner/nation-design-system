import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tabs, type TabItem, type TabsSize } from './Tabs'
import { Preview, Labeled, DoDont, Do, Dont } from '../../.storybook/docs-blocks'

const ITEMS: TabItem[] = [
  { id: 'latest', label: 'ล่าสุด' },
  { id: 'popular', label: 'ยอดนิยม' },
  { id: 'saved', label: 'บันทึกไว้', unread: true },
]
const ICON_ITEMS: TabItem[] = [
  { id: 'latest', label: 'ล่าสุด', icon: 'star' },
  { id: 'popular', label: 'ยอดนิยม', icon: 'check' },
  { id: 'saved', label: 'บันทึกไว้', icon: 'link' },
]
const ICON_ONLY: TabItem[] = [
  { id: 'list', icon: 'menu', iconOnly: true, ariaLabel: 'รายการ' },
  { id: 'grid', icon: 'star', iconOnly: true, ariaLabel: 'ตาราง' },
]

// story แต่ละตัวคุมค่าที่เลือกเอง (component เป็น controlled)
const Demo = (props: Omit<React.ComponentProps<typeof Tabs>, 'value'> & { value?: string }) => {
  const [value, setValue] = useState(props.value ?? props.items[0].id)
  return <Tabs {...props} value={value} onValueChange={setValue} />
}

// ชื่อนี้ใช้ในกล่องโค้ดของหน้า Docs (ไม่งั้นโชว์ชื่อที่ถูกย่อตอน build เช่น <B>)
Demo.displayName = 'Tabs'

// หน้า Docs จัดกลุ่ม story ตาม parameters.docs.section ดูกติกาที่ .storybook/CustomDocsPage.tsx
// ชื่อ story ใน sidebar ตรงกับชุดในไฟล์ออกแบบหน้า 18 (segmented-tab-group, underline-tab-group)
const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  args: { items: ITEMS, shape: 'segmented', size: 'md', label: 'หมวดข่าว' },
  render: (args) => <Demo {...args} />,
}
export default meta

type Story = StoryObj<typeof Tabs>

const controls = (include: string[]) => ({ controls: { include } })
const TABS = ['size', 'label']

export const Default: Story = { name: 'Segmented-tab-group', parameters: controls(TABS) }

// ── ส่วนประกอบ ──────────────────────────────────────────────
export const Anatomy: Story = {
  tags: ['!dev'],
  name: 'ส่วนประกอบทั้งหมด',
  args: { items: [{ id: 'a', label: 'ล่าสุด', icon: 'star' }, { id: 'b', label: 'บันทึกไว้', unread: true }, { id: 'c', icon: 'menu', iconOnly: true, ariaLabel: 'รายการ' }] },
  parameters: { docs: { section: 'ส่วนประกอบ', description: { story: 'แท็บหนึ่งใบมีข้อความ (ต้องมีเสมอ ยกเว้นโหมดไอคอนล้วนที่ต้องส่ง ariaLabel) ไอคอนนำหน้า (icon) หรือจุดยังไม่ได้อ่าน (unread) อย่างใดอย่างหนึ่ง แท็บหลายใบเรียงใน tablist' } } },
}
export const IconKinds: Story = {
  tags: ['!dev'],
  name: 'ไอคอน 4 แบบ',
  parameters: { docs: { section: 'ส่วนประกอบ', description: { story: 'ไม่มี นำหน้า จุดยังไม่ได้อ่าน และไอคอนล้วน ตรงกับแกน icon ของไฟล์ออกแบบ' } } },
  render: () => (
    <Preview column>
      <Labeled label="none"><Demo items={ITEMS.slice(0, 2)} shape="underline" label="ไม่มี" /></Labeled>
      <Labeled label="leading"><Demo items={ICON_ITEMS.slice(0, 2)} shape="underline" label="นำหน้า" /></Labeled>
      <Labeled label="unread"><Demo items={[{ id: 'a', label: 'ล่าสุด', unread: true }, { id: 'b', label: 'ยอดนิยม', unread: true }]} shape="underline" label="จุด" /></Labeled>
      <Labeled label="only"><Demo items={ICON_ONLY} shape="underline" label="ไอคอนล้วน" /></Labeled>
    </Preview>
  ),
}

// ── ชุด ─────────────────────────────────────────────────────
export const Shapes: Story = {
  tags: ['!dev'],
  name: '2 ทรง',
  parameters: { docs: { section: 'ชุด', description: { story: 'segmented เป็นกล่องมีกรอบและเส้นคั่น ใช้สลับมุมมองของเนื้อหาเดียวกัน underline มีรางล่างและขีดสีแบรนด์ใต้แท็บปัจจุบัน ใช้แบ่งหมวดเนื้อหา' } } },
  render: () => (
    <Preview column>
      <Labeled label="segmented-tab-group"><Demo items={ITEMS} shape="segmented" label="ทรงกล่อง" /></Labeled>
      <Labeled label="underline-tab-group"><Demo items={ITEMS} shape="underline" label="ทรงขีดเส้นใต้" /></Labeled>
    </Preview>
  ),
}

// ── ขนาด ────────────────────────────────────────────────────
const SIZES: TabsSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
export const Sizes: Story = {
  tags: ['!dev'],
  name: 'ขนาด 5 ขั้น',
  parameters: { docs: { section: 'ขนาด', description: { story: 'ระยะขอบ ช่องไฟ ไอคอน และมุมโค้งกลุ่มไล่ตามสูตรใน tokens/scale/tab.mjs ข้อความใช้ label/xs ถึง label/xl' } } },
  render: () => (
    <Preview column>
      {SIZES.map((size) => (
        <Labeled key={size} label={size}><Demo items={ITEMS} shape="segmented" size={size} label={size} /></Labeled>
      ))}
    </Preview>
  ),
}

// ── สถานะ ───────────────────────────────────────────────────
export const States: Story = {
  tags: ['!dev'],
  name: 'ปัจจุบัน ปกติ และ disabled',
  parameters: { docs: { section: 'สถานะ', description: { story: 'แท็บปัจจุบัน (aria-selected) พื้นเทาในทรงกล่อง ขีดสีแบรนด์ในทรงขีดเส้นใต้ hover กับ focus เกิดจากการใช้งานจริง โฟกัสบอกด้วยพื้นสีแบรนด์อ่อน ไม่ใช่วงแหวน (ตัดสิน 2026-10-02)' } } },
  render: () => (
    <Preview column>
      <Labeled label="segmented"><Demo items={[{ id: 'a', label: 'ปัจจุบัน' }, { id: 'b', label: 'ปกติ' }, { id: 'c', label: 'disabled', disabled: true }]} shape="segmented" label="สถานะ" /></Labeled>
      <Labeled label="underline"><Demo items={[{ id: 'a', label: 'ปัจจุบัน' }, { id: 'b', label: 'ปกติ' }, { id: 'c', label: 'disabled', disabled: true }]} shape="underline" label="สถานะ" /></Labeled>
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
      <Do text="ใช้ 2 ถึง 6 แท็บ ข้อความสั้นหนึ่งถึงสองคำ และมีแท็บปัจจุบันเสมอ">
        <Demo items={ITEMS} shape="underline" label="หมวดข่าว" />
      </Do>
      <Dont text="ใช้แท็บเป็นขั้นตอน (ขั้นที่ 1 2 3) แท็บคือการสลับมุมมอง ไม่ใช่ลำดับงาน">
        <Demo items={[{ id: '1', label: 'ขั้นที่ 1' }, { id: '2', label: 'ขั้นที่ 2' }, { id: '3', label: 'ขั้นที่ 3' }]} shape="segmented" label="ขั้นตอน" />
      </Dont>
    </DoDont>
  ),
}

// ── ชุดจริงจากไฟล์ออกแบบ (เมนู sidebar) ────────────────────
export const UnderlineTabGroup: Story = { tags: ['!autodocs'], name: 'Underline-tab-group', args: { shape: 'underline' }, parameters: controls(TABS) }
