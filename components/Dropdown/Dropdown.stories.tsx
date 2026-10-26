import type { Meta, StoryObj } from '@storybook/react-vite'
import { Dropdown, type DropdownOption, type DropdownSize } from './Dropdown'
import { Preview, Labeled, DoDont, Do, Dont } from '../../.storybook/docs-blocks'

const OPTIONS: DropdownOption[] = [
  { value: 'bkk', label: 'กรุงเทพมหานคร' },
  { value: 'cnx', label: 'เชียงใหม่' },
  { value: 'hdy', label: 'หาดใหญ่' },
  { value: 'kkn', label: 'ขอนแก่น', disabled: true },
]
const RICH_OPTIONS: DropdownOption[] = [
  { value: 'news', label: 'ข่าว', supportingText: 'บทความและรายงาน', leadingIcon: 'star', group: 'เนื้อหา' },
  { value: 'video', label: 'วิดีโอ', supportingText: 'คลิปและไลฟ์', leadingIcon: 'play', group: 'เนื้อหา' },
  { value: 'admin', label: 'ผู้ดูแล', supportingText: 'ตั้งค่าระบบ', leadingIcon: 'person', group: 'ระบบ' },
]

// หน้า Docs จัดกลุ่ม story ตาม parameters.docs.section ดูกติกาที่ .storybook/CustomDocsPage.tsx
// ไฟล์ออกแบบหน้า 25 มีชุด dropdown (ช่อง) dropdown-menu (แผง) และชุดฐาน _dropdown-option กับ _dropdown-group-header
const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  args: { options: OPTIONS, label: 'จังหวัด', placeholder: 'เลือกจังหวัด', size: 'md' },
  parameters: {
    docs: {
      sectionNotes: {
        ชุด: 'ไฟล์ออกแบบแยกเป็นช่อง (dropdown) กับแผง (dropdown-menu) ที่ประกอบจากแถว _dropdown-option และหัวกลุ่ม _dropdown-group-header ฝั่งโค้ดเป็น component เดียว แผงเปิดเมื่อกดช่อง จึงไม่มีชุดให้เลือก',
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof Dropdown>

const controls = (include: string[]) => ({ controls: { include } })
const DROPDOWN = ['label', 'hint', 'placeholder', 'size', 'required', 'error', 'disabled', 'readOnly', 'emptyText']

export const Default: Story = { name: 'Dropdown', parameters: controls(DROPDOWN) }

// ── ส่วนประกอบ ──────────────────────────────────────────────
export const Anatomy: Story = {
  tags: ['!dev'],
  name: 'ส่วนประกอบทั้งหมด',
  args: { required: true, hint: 'เลือกจังหวัดที่ต้องการแสดงข่าว' },
  parameters: { docs: { section: 'ส่วนประกอบ', description: { story: 'ช่องเลือกประกอบด้วย ป้ายชื่อ (label) กับดอกจัน (required) ช่องที่มีข้อความและลูกศร แผงตัวเลือกที่เปิดเมื่อกด และข้อความช่วย (hint) กดที่ช่องเพื่อดูแผง' } } },
}
export const RichOptions: Story = {
  tags: ['!dev'],
  name: 'แถวที่มีไอคอน ข้อความรอง และหัวกลุ่ม',
  args: { options: RICH_OPTIONS, label: 'ประเภท', placeholder: 'เลือกประเภท' },
  parameters: { docs: { section: 'ส่วนประกอบ', description: { story: 'แถวตัวเลือกรับไอคอนนำหน้า (leadingIcon) อวาตาร์ (avatarSrc ขนาด md ขึ้นไป) ข้อความรอง (supportingText) และจัดกลุ่มด้วย group ซึ่งจะได้หัวกลุ่มและเส้นคั่นให้' } } },
}

// ── ขนาด ────────────────────────────────────────────────────
const SIZES: DropdownSize[] = ['sm', 'md', 'lg']
export const Sizes: Story = {
  tags: ['!dev'],
  name: 'ขนาด 3 ขั้น',
  parameters: { docs: { section: 'ขนาด', description: { story: 'ช่องสูง 32 40 48 เท่าช่องกรอก ตามสูตรใน tokens/scale/dropdown.mjs แถวในแผงไล่ตามขนาดเดียวกัน' } } },
  render: () => (
    <Preview>
      {SIZES.map((size) => (
        <Labeled key={size} label={size}><Dropdown size={size} options={OPTIONS} label="จังหวัด" placeholder="เลือกจังหวัด" /></Labeled>
      ))}
    </Preview>
  ),
}

// ── สถานะ ───────────────────────────────────────────────────
export const States: Story = {
  tags: ['!dev'],
  name: 'ปกติ ผิดพลาด อ่านอย่างเดียว และ disabled',
  parameters: { docs: { section: 'สถานะ', description: { story: 'ไฟล์ออกแบบมี 9 สถานะ hover focused open error-hover error-focused เกิดจากการใช้งานจริง ลองเอาเมาส์ชี้หรือกดที่ตัวอย่าง' } } },
  render: () => (
    <Preview>
      <Labeled label="ปกติ"><Dropdown options={OPTIONS} label="จังหวัด" placeholder="เลือกจังหวัด" /></Labeled>
      <Labeled label="ผิดพลาด"><Dropdown options={OPTIONS} label="จังหวัด" placeholder="เลือกจังหวัด" error hint="กรุณาเลือกจังหวัด" /></Labeled>
      <Labeled label="อ่านอย่างเดียว"><Dropdown options={OPTIONS} label="จังหวัด" defaultValue="bkk" readOnly /></Labeled>
      <Labeled label="disabled"><Dropdown options={OPTIONS} label="จังหวัด" placeholder="เลือกจังหวัด" disabled /></Labeled>
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
      <Do text="ใช้เมื่อตัวเลือกมีมากกว่า 5 ข้อ หรือพื้นที่ไม่พอวาง Radio ทั้งหมด">
        <Dropdown options={OPTIONS} label="จังหวัด" placeholder="เลือกจังหวัด" />
      </Do>
      <Dont text="ใช้กับตัวเลือก 2 ข้อ แบบนั้นควรเป็น Radio หรือ Toggle">
        <Dropdown options={[{ value: 'on', label: 'เปิด' }, { value: 'off', label: 'ปิด' }]} label="การแจ้งเตือน" placeholder="เลือก" />
      </Dont>
      <Do text="placeholder เป็นคำกริยา เช่น เลือกจังหวัด เพื่อบอกว่าต้องทำอะไร">
        <Dropdown options={OPTIONS} label="จังหวัด" placeholder="เลือกจังหวัด" />
      </Do>
      <Dont text="ใส่ค่าแรกเป็นค่าเริ่มต้นโดยผู้ใช้ไม่ได้เลือก ระบบจะส่งค่าที่ผู้ใช้ไม่รู้ตัว">
        <Dropdown options={OPTIONS} label="จังหวัด" defaultValue="bkk" />
      </Dont>
    </DoDont>
  ),
}
