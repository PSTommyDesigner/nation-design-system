import type { Meta, StoryObj } from '@storybook/react-vite'
import { Toast, type ToastSize, type ToastType } from './Toast'
import { Preview, Labeled, DoDont, Do, Dont } from '../../.storybook/docs-blocks'

// หน้า Docs จัดกลุ่ม story ตาม parameters.docs.section ดูกติกาที่ .storybook/CustomDocsPage.tsx
// ไฟล์ออกแบบหน้า 19 มีชุดเดียวคือ toast (5 ชนิด x 5 ขนาด)
const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  args: {
    title: 'บันทึกข้อมูลสำเร็จ',
    description: 'ระบบบันทึกการเปลี่ยนแปลงของคุณแล้ว',
    type: 'success',
    size: 'md',
    showIcon: true,
    showDescription: true,
    showClose: true,
    duration: null,
  },
  parameters: {
    docs: {
      sectionNotes: {
        สถานะ: 'ข้อความแจ้งไม่มีสถานะ hover หรือ disabled ของตัวเอง มีแค่โผล่กับหาย (ปิดเองตามเวลา หรือกดปุ่มปิด) ปุ่มปิดกับปุ่มกระทำข้างในเป็น IconButton กับ LinkButton ที่มีสถานะของตัวเอง',
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof Toast>

const controls = (include: string[]) => ({ controls: { include } })
const TOAST = ['title', 'description', 'type', 'size', 'showIcon', 'showDescription', 'showAction', 'showClose', 'icon', 'closeLabel']

export const Default: Story = { name: 'Toast', parameters: controls(TOAST) }

// ── ส่วนประกอบ ──────────────────────────────────────────────
export const Anatomy: Story = {
  tags: ['!dev'],
  name: 'ส่วนประกอบทั้งหมด',
  args: { showAction: true, action: { label: 'เลิกทำ', onClick: () => {} } },
  parameters: { docs: { section: 'ส่วนประกอบ', description: { story: 'ข้อความแจ้งประกอบด้วย ไอคอนบอกชนิด หัวข้อ (ต้องมีเสมอ) ข้อความรอง ปุ่มกระทำ (LinkButton) และปุ่มปิด ทุกอย่างยกเว้นหัวข้อเปิดปิดได้ด้วย show*' } } },
}
export const TitleOnly: Story = {
  tags: ['!dev'],
  name: 'หัวข้ออย่างเดียว',
  args: { showDescription: false, showClose: false, showIcon: false },
  parameters: { docs: { section: 'ส่วนประกอบ' } },
}

// ── ชุด ─────────────────────────────────────────────────────
const TYPES: ToastType[] = ['default', 'brand', 'error', 'warning', 'success']
export const AllTypes: Story = {
  tags: ['!dev'],
  name: '5 ชนิด',
  parameters: { docs: { section: 'ชุด', description: { story: 'ชนิดกำหนดสีพื้นกับไอคอน error warning success ประกาศแบบ assertive ให้โปรแกรมอ่านหน้าจออ่านทันที ส่วน default กับ brand ประกาศแบบ polite' } } },
  render: () => (
    <Preview column>
      {TYPES.map((type) => (
        <Labeled key={type} label={type}><Toast type={type} title="หัวข้อข้อความแจ้ง" description="คำอธิบายเพิ่มเติมของข้อความแจ้ง" duration={null} /></Labeled>
      ))}
    </Preview>
  ),
}

// ── ขนาด ────────────────────────────────────────────────────
const SIZES: ToastSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
export const Sizes: Story = {
  tags: ['!dev'],
  name: 'ขนาด 5 ขั้น',
  parameters: { docs: { section: 'ขนาด', description: { story: 'กว้าง 280 ถึง 440 ระยะขอบ 8 ถึง 24 มุมโค้ง 8 ถึง 24 ตามสูตรใน tokens/scale/toast.mjs หัวข้อใช้ label/sm ถึง label/xl' } } },
  render: () => (
    <Preview column>
      {SIZES.map((size) => (
        <Labeled key={size} label={size}><Toast size={size} type="success" title="บันทึกข้อมูลสำเร็จ" description="ระบบบันทึกการเปลี่ยนแปลงของคุณแล้ว" duration={null} /></Labeled>
      ))}
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
      <Do text="ใช้ยืนยันผลของสิ่งที่ผู้ใช้เพิ่งทำ แล้วหายเองใน 5 วินาที">
        <Toast type="success" title="บันทึกแล้ว" showDescription={false} duration={null} />
      </Do>
      <Dont text="ใช้กับข้อผิดพลาดที่ผู้ใช้ต้องแก้ ข้อความจะหายก่อนอ่านจบ แบบนั้นใช้ Banner หรือข้อความในฟอร์ม">
        <Toast type="error" title="กรอกอีเมลไม่ถูกต้อง" description="กรุณาแก้ไขช่องอีเมลแล้วส่งใหม่" duration={null} />
      </Dont>
      <Do text="ใส่ปุ่มกระทำเฉพาะการย้อนกลับที่ทำได้ทันที เช่น เลิกทำ">
        <Toast type="default" title="ลบข่าวแล้ว" showDescription={false} showAction action={{ label: 'เลิกทำ', onClick: () => {} }} duration={null} />
      </Do>
      <Dont text="ใส่ปุ่มหลายปุ่มหรือพาไปหน้าอื่น ข้อความแจ้งไม่ใช่กล่องโต้ตอบ">
        <Toast type="brand" title="มีฟีเจอร์ใหม่" description="ไปดูที่หน้าตั้งค่า แล้วเปิดใช้งาน" showAction action={{ label: 'ไปหน้าตั้งค่า', onClick: () => {} }} duration={null} />
      </Dont>
    </DoDont>
  ),
}
