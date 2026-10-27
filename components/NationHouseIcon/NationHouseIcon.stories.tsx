import type { Meta, StoryObj } from '@storybook/react-vite'
import { NationHouseIcon } from './NationHouseIcon'
import { nationHouseIconNames } from './icons'
import { IconGallery } from '../../.storybook/icon-gallery'
import { Preview, Labeled, DoDont, Do, Dont } from '../../.storybook/docs-blocks'

// หน้า Docs จัดกลุ่ม story ตาม parameters.docs.section ดูกติกาที่ .storybook/CustomDocsPage.tsx
// ชุดไอคอนไม่เข้ากรอบ 5 หัวข้อเต็ม หัวข้อชุดจึงเป็นแกลเลอรีค้นหา ชุดนี้ไม่มีหมวดในต้นทาง จึงเป็นหมวดเดียว
// ต้นฉบับคือ Nation House Icons ในไฟล์ออกแบบหน้า 02 Icon กริด 40dp
const meta: Meta<typeof NationHouseIcon> = {
  title: 'Components/NationHouseIcon',
  component: NationHouseIcon,
  tags: ['autodocs'],
  args: { name: 'home', size: 40, filled: false, title: 'หน้าแรก' },
  argTypes: { name: { control: 'select', options: nationHouseIconNames } },
  parameters: {
    docs: {
      sectionNotes: {
        ส่วนประกอบ: 'ไอคอนมี 2 ชั้น ชั้นเส้น (outline สี currentColor) แสดงเสมอ และชั้นทึบสีแบรนด์ (solid ผูก icon/brand/primary) เปิดด้วย filled ต่างจาก Icon ของ Nation UI ที่เป็นเส้นทางเดียว',
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof NationHouseIcon>

const controls = (include: string[]) => ({ controls: { include } })
const ICON = ['name', 'size', 'filled', 'title']
const ALL = { 'Nation House Icons': nationHouseIconNames }

export const Default: Story = { name: 'NationHouseIcon', parameters: controls(ICON) }

// ── ชุด (แกลเลอรีค้นหา) ─────────────────────────────────────
export const Gallery: Story = {
  tags: ['!dev'],
  name: `Nation House Icons ${nationHouseIconNames.length} ตัว`,
  parameters: { docs: { section: 'ชุด', hideCode: true, description: { story: 'ไอคอนทุกตัวของชุด Nation House แสดงแบบ filled เพื่อให้เห็นชั้นสีแบรนด์ พิมพ์ค้นหาจากชื่อ แล้วกดที่ไอคอนเพื่อคัดลอกชื่อไปใส่ name ชุดนี้ใช้กับระบบภายใน (Nation House, HRM) ไม่ใช่ไอคอนในหน้าจอทั่วไป ซึ่งใช้ Icon' } } },
  render: () => <IconGallery groups={ALL} renderIcon={(name) => <NationHouseIcon name={name as never} size={40} filled />} placeholder="ค้นหาชื่อไอคอน เช่น calendar, hr" />,
}

// ── ขนาด ────────────────────────────────────────────────────
export const Sizes: Story = {
  tags: ['!dev'],
  name: 'ขนาดตามกริด 40',
  parameters: { docs: { section: 'ขนาด', description: { story: 'ชุดนี้วาดบนกริด 40dp ค่าเริ่มต้นจึงเป็น 40 ย่อขยายเป็นตัวเลขหรือหน่วย CSS ได้ ถ้าเล็กกว่า 24 รายละเอียดของชั้นทึบจะเริ่มหาย' } } },
  render: () => (
    <Preview>
      {[24, 32, 40, 48, 64].map((size) => <Labeled key={size} label={String(size)}><NationHouseIcon name="calendar" size={size} filled /></Labeled>)}
    </Preview>
  ),
}

// ── สถานะ ───────────────────────────────────────────────────
export const Filled: Story = {
  tags: ['!dev'],
  name: 'เส้นอย่างเดียว กับ filled',
  parameters: { docs: { section: 'สถานะ', description: { story: 'ค่าเริ่มต้นแสดงเฉพาะชั้นเส้น filled เปิดชั้นทึบสีแบรนด์ซ้อนใต้เส้น ใช้ filled กับรายการที่เลือกอยู่หรือจุดเด่นของหน้า ไม่ใช่ทุกตัวพร้อมกัน' } } },
  render: () => (
    <Preview>
      <Labeled label="outline"><NationHouseIcon name="reimbursement" size={40} /></Labeled>
      <Labeled label="filled"><NationHouseIcon name="reimbursement" size={40} filled /></Labeled>
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
      <Do text="ใช้ในเมนูและหน้าแรกของระบบภายใน (Nation House, HRM) ที่ไอคอนเป็นจุดเด่นขนาด 40 ขึ้นไป">
        <Preview><NationHouseIcon name="leave" size={40} filled title="ลางาน" /><NationHouseIcon name="time-attendance" size={40} filled title="ลงเวลา" /></Preview>
      </Do>
      <Dont text="เอาไปใช้แทน Icon ในปุ่ม ช่องกรอก หรือตารางของหน้าจอทั่วไป ชุดนี้ละเอียดเกินสำหรับขนาด 16 ถึง 24">
        <Preview><NationHouseIcon name="search" size={16} /><NationHouseIcon name="bin" size={16} /></Preview>
      </Dont>
    </DoDont>
  ),
}
