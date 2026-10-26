import type { Meta, StoryObj } from '@storybook/react-vite'
import { Toggle, type ToggleSize } from './Toggle'
import { Preview, Labeled, DoDont, Do, Dont } from '../../.storybook/docs-blocks'

// หน้า Docs จัดกลุ่ม story ตาม parameters.docs.section ดูกติกาที่ .storybook/CustomDocsPage.tsx
// ไฟล์ออกแบบหน้า 14 มีชุดเดียวคือ toggle (40 แบบ)
const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  args: { label: 'แจ้งเตือนทางอีเมล', size: 'md' },
  parameters: {
    docs: {
      sectionNotes: {
        ชุด: 'ไฟล์ออกแบบมีชุดเดียวคือ toggle (40 แบบ จาก 5 ขนาด x 2 ค่า active x 4 สถานะ) ไม่มีทรงหรือตระกูลให้เลือก',
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof Toggle>

const controls = (include: string[]) => ({ controls: { include } })
const TOGGLE = ['label', 'supportingText', 'size', 'defaultChecked', 'disabled', 'touchTarget']

export const Default: Story = { name: 'Toggle', parameters: controls(TOGGLE) }

// ── ส่วนประกอบ ──────────────────────────────────────────────
export const Anatomy: Story = {
  tags: ['!dev'],
  name: 'ส่วนประกอบทั้งหมด',
  args: { supportingText: 'รับข่าวสารและโปรโมชันทางอีเมล', defaultChecked: true },
  parameters: { docs: { section: 'ส่วนประกอบ', description: { story: 'สวิตช์ประกอบด้วย ราง ปุ่มกลม (ต้องมีเสมอ) ข้อความ (label) และข้อความช่วย (supportingText) ปุ่มกลมอยู่ซ้ายเมื่อปิด ขวาเมื่อเปิด' } } },
}
export const SwitchOnly: Story = {
  tags: ['!dev'],
  name: 'สวิตช์อย่างเดียว',
  args: { label: undefined, 'aria-label': 'เปิดแจ้งเตือน' },
  parameters: { docs: { section: 'ส่วนประกอบ', description: { story: 'ใช้ในแถวตั้งค่าที่มีชื่อรายการอยู่ฝั่งซ้ายแล้ว ต้องส่ง aria-label' } } },
}

// ── ขนาด ────────────────────────────────────────────────────
const SIZES: ToggleSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
export const Sizes: Story = {
  tags: ['!dev'],
  name: 'ขนาด 5 ขั้น',
  parameters: { docs: { section: 'ขนาด', description: { story: 'รางสูง 16 20 24 28 32 กว้างเป็นสองเท่า ปุ่มกลมเล็กกว่ารางข้างละ 2 ตามสูตรใน tokens/scale/toggle.mjs หัวข้อใช้ preset title/xs ถึง title/xl' } } },
  render: () => (
    <Preview>
      {SIZES.map((size) => (
        <Labeled key={size} label={size}><Toggle size={size} label="แจ้งเตือน" defaultChecked /></Labeled>
      ))}
    </Preview>
  ),
}

// ── สถานะ ───────────────────────────────────────────────────
export const States: Story = {
  tags: ['!dev'],
  name: 'ปิด เปิด และ disabled',
  parameters: { docs: { section: 'สถานะ', description: { story: 'hover กับ focus เกิดจากการใช้งานจริง ลองเอาเมาส์ชี้หรือกด Tab ที่ตัวอย่าง วงแหวนโฟกัสตอนเปิดเป็นสีแบรนด์ ตอนปิดเป็นสีเทา' } } },
  render: () => (
    <Preview>
      <Labeled label="ปิด"><Toggle label="ปิด" /></Labeled>
      <Labeled label="เปิด"><Toggle label="เปิด" defaultChecked /></Labeled>
      <Labeled label="disabled"><Toggle label="disabled" disabled /></Labeled>
      <Labeled label="disabled เปิด"><Toggle label="disabled" disabled defaultChecked /></Labeled>
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
      <Do text="ใช้กับการตั้งค่าที่มีผลทันทีเมื่อสับสวิตช์ ไม่ต้องกดบันทึกอีก">
        <Toggle label="โหมดมืด" defaultChecked />
      </Do>
      <Dont text="ใช้กับฟอร์มที่ต้องกดยืนยันทีหลัง แบบนั้นควรเป็น Checkbox">
        <Toggle label="ยอมรับข้อตกลงการใช้งาน" />
      </Dont>
      <Do text="ตั้งชื่อเป็นสิ่งที่เปิด ให้ข้อความคงเดิมทั้งตอนเปิดและปิด">
        <Toggle label="แจ้งเตือนทางอีเมล" />
      </Do>
      <Dont text="เปลี่ยนข้อความตามสถานะ (เปิดอยู่ / ปิดอยู่) ผู้ใช้จะสับสนว่าข้อความคือสถานะหรือคำสั่ง">
        <Toggle label="ปิดอยู่" />
      </Dont>
    </DoDont>
  ),
}
