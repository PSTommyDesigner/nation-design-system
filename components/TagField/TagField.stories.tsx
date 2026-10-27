import type { Meta, StoryObj } from '@storybook/react-vite'
import { TagField, type TagFieldSize } from './TagField'
import { Preview, Labeled, DoDont, Do, Dont } from '../../.storybook/docs-blocks'

// หน้า Docs จัดกลุ่ม story ตาม parameters.docs.section ดูกติกาที่ .storybook/CustomDocsPage.tsx
// ไฟล์ออกแบบหน้า 13 ชุด tag-field (24 แบบ) แท็กข้างในคือ Tag ตระกูล neutral แบบ secondary ปุ่มเพิ่มคือ LinkButton ไอคอนล้วน
const meta: Meta<typeof TagField> = {
  title: 'Components/TagField',
  component: TagField,
  tags: ['autodocs'],
  args: { label: 'หมวดข่าว', hint: 'พิมพ์แล้วกด Enter หรือปุ่มเพิ่ม', defaultTags: ['การเมือง', 'เศรษฐกิจ'], size: 'md' },
  parameters: {
    docs: {
      sectionNotes: {
        ชุด: 'ไฟล์ออกแบบมีชุดเดียวคือ tag-field (3 ขนาด x 8 สถานะ) ไม่มีทรงหรือตระกูลให้เลือก แท็กข้างในใช้ชุด semi-rounded-tag ตระกูล Neutral เสมอ',
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof TagField>

const controls = (include: string[]) => ({ controls: { include } })
const TAG_FIELD = ['label', 'hint', 'placeholder', 'size', 'required', 'error', 'disabled', 'readOnly', 'maxTags', 'addLabel', 'showAddButton']

export const Default: Story = { name: 'Tag-field', parameters: controls(TAG_FIELD) }

// ── ส่วนประกอบ ──────────────────────────────────────────────
export const Anatomy: Story = {
  tags: ['!dev'],
  name: 'ส่วนประกอบทั้งหมด',
  args: { required: true },
  parameters: { docs: { section: 'ส่วนประกอบ', description: { story: 'ช่องแท็กประกอบด้วย ป้ายชื่อกับดอกจัน กล่องที่มีแท็กที่เลือกไว้ (Tag ปิดได้) ช่องพิมพ์ค่าใหม่ เส้นคั่น ปุ่มเพิ่ม (ไอคอนบวก) และข้อความช่วย กด Enter หรือปุ่มเพิ่มเพื่อเพิ่ม กด Backspace ตอนช่องว่างเพื่อลบแท็กท้าย' } } },
}
export const Empty: Story = {
  tags: ['!dev'],
  name: 'ยังไม่มีแท็ก',
  args: { defaultTags: [] },
  parameters: { docs: { section: 'ส่วนประกอบ', description: { story: 'ช่องว่างแสดง placeholder (เพิ่ม) ความสูงต่ำสุดเท่าช่องกรอกขนาดเดียวกัน' } } },
}
export const Wrapping: Story = {
  tags: ['!dev'],
  name: 'แท็กขึ้นบรรทัดใหม่',
  args: { defaultTags: ['การเมือง', 'เศรษฐกิจ', 'กีฬา', 'บันเทิง', 'ต่างประเทศ', 'เทคโนโลยี'], hint: undefined },
  render: (args) => <div style={{ width: 320 }}><TagField {...args} /></div>,
  parameters: { docs: { section: 'ส่วนประกอบ', description: { story: 'ช่องสูงตามจำนวนแท็ก ความสูงที่ประกาศคือความสูงต่ำสุด (เอกสารหน้า 13 ห้ามตรึงความสูงช่องแท็ก)' } } },
}

// ── ขนาด ────────────────────────────────────────────────────
const SIZES: TagFieldSize[] = ['sm', 'md', 'lg']
export const Sizes: Story = {
  tags: ['!dev'],
  name: 'ขนาด 3 ขั้น',
  parameters: { docs: { section: 'ขนาด', description: { story: 'ระยะขอบ 5 7 9 คำนวณจาก (ความสูงช่อง ลบ ความสูงแท็ก) หารสอง ตามสูตรใน tokens/scale/input.mjs แท็กใช้ขนาดชื่อเดียวกับช่อง ช่องไฟระหว่างแท็ก 4 8 8' } } },
  render: () => (
    <Preview column>
      {SIZES.map((size) => (
        <Labeled key={size} label={size}><div style={{ width: 320 }}><TagField size={size} label="หมวดข่าว" defaultTags={['การเมือง', 'เศรษฐกิจ']} /></div></Labeled>
      ))}
    </Preview>
  ),
}

// ── สถานะ ───────────────────────────────────────────────────
export const States: Story = {
  tags: ['!dev'],
  name: 'ปกติ ผิดพลาด อ่านอย่างเดียว และ disabled',
  parameters: { docs: { section: 'สถานะ', description: { story: 'ไฟล์ออกแบบมี 8 สถานะเหมือนช่องกรอก hover focused error-hover error-focused เกิดจากการใช้งานจริง อ่านอย่างเดียวกับ disabled ซ่อนปุ่มปิดของแท็กและปิดปุ่มเพิ่ม' } } },
  render: () => (
    <Preview column>
      <Labeled label="ปกติ"><div style={{ width: 320 }}><TagField label="หมวดข่าว" defaultTags={['การเมือง']} /></div></Labeled>
      <Labeled label="ผิดพลาด"><div style={{ width: 320 }}><TagField label="หมวดข่าว" defaultTags={['การเมือง']} error hint="เลือกได้ไม่เกิน 3 หมวด" /></div></Labeled>
      <Labeled label="อ่านอย่างเดียว"><div style={{ width: 320 }}><TagField label="หมวดข่าว" defaultTags={['การเมือง']} readOnly /></div></Labeled>
      <Labeled label="disabled"><div style={{ width: 320 }}><TagField label="หมวดข่าว" defaultTags={['การเมือง']} disabled /></div></Labeled>
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
      <Do text="ใช้เมื่อผู้ใช้พิมพ์ค่าอิสระได้หลายค่า เช่น คำค้น หมวดข่าว และบอกขีดจำกัดในข้อความช่วย">
        <div style={{ width: 300 }}><TagField label="คำค้น" defaultTags={['เลือกตั้ง']} hint="ไม่เกิน 5 คำ" maxTags={5} /></div>
      </Do>
      <Dont text="ใช้เมื่อค่าต้องมาจากรายการตายตัว แบบนั้นควรเป็น Dropdown หรือ Checkbox">
        <div style={{ width: 300 }}><TagField label="จังหวัด" defaultTags={['กรุงเทพฯ']} /></div>
      </Dont>
    </DoDont>
  ),
}
