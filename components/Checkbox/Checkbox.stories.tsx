import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checkbox, type CheckboxSize } from './Checkbox'
import { Preview, Labeled, DoDont, Do, Dont } from '../../.storybook/docs-blocks'

// หน้า Docs จัดกลุ่ม story ตาม parameters.docs.section (ส่วนประกอบ · ชุด · ขนาด · สถานะ · ควรไม่ควร)
// ดูกติกาที่ .storybook/CustomDocsPage.tsx · ชื่อ story ใน sidebar ตรงกับชุดในไฟล์ออกแบบหน้า 15 (checkbox, text-checkbox)
const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: { label: 'ยอมรับข้อตกลงการใช้งาน', size: 'md' },
}
export default meta

type Story = StoryObj<typeof Checkbox>

const controls = (include: string[]) => ({ controls: { include } })
const TEXT_CHECKBOX = ['label', 'supportingText', 'size', 'defaultChecked', 'indeterminate', 'disabled', 'touchTarget']
const BOX_ONLY = ['size', 'defaultChecked', 'indeterminate', 'disabled', 'touchTarget']

export const Default: Story = { name: 'Text-checkbox', parameters: controls(TEXT_CHECKBOX) }

// ── ส่วนประกอบ ──────────────────────────────────────────────
export const Anatomy: Story = {
  tags: ['!dev'],
  name: 'ส่วนประกอบทั้งหมด',
  args: { supportingText: 'จำเป็นต้องติ๊กก่อนสมัครสมาชิก', defaultChecked: true },
  parameters: {
    docs: {
      section: 'ส่วนประกอบ',
      description: { story: 'ช่องติ๊กประกอบด้วย 3 ส่วน คือ กล่องติ๊ก (ต้องมีเสมอ) ข้อความ (label) และข้อความช่วยใต้แถว (supportingText) กล่องติ๊กเป็น instance ของชุด checkbox ส่วนแถวที่มีข้อความคือชุด text-checkbox ในไฟล์ออกแบบ' },
    },
  },
}
export const BoxOnly: Story = {
  tags: ['!dev'],
  name: 'กล่องติ๊กอย่างเดียว',
  args: { label: undefined, 'aria-label': 'เลือกแถวนี้' },
  parameters: { docs: { section: 'ส่วนประกอบ', description: { story: 'ใช้ในตารางหรือรายการที่หัวคอลัมน์บอกความหมายอยู่แล้ว ต้องส่ง aria-label ให้โปรแกรมอ่านหน้าจอ' } } },
}
export const WithSupporting: Story = {
  tags: ['!dev'],
  name: 'ข้อความช่วย',
  args: { supportingText: 'จำเป็นต้องติ๊กก่อนสมัครสมาชิก' },
  parameters: { docs: { section: 'ส่วนประกอบ' } },
}

// ── ชุด ─────────────────────────────────────────────────────
export const AllTypes: Story = {
  tags: ['!dev'],
  name: '2 ชุด',
  parameters: { docs: { section: 'ชุด', description: { story: 'ไฟล์ออกแบบมี 2 ชุด คือ checkbox (กล่องอย่างเดียว 60 แบบ) และ text-checkbox (กล่องกับข้อความ 60 แบบ) ฝั่งโค้ดเป็น component เดียว ส่ง label หรือไม่ส่งเท่ากับเลือกชุด' } } },
  render: () => (
    <Preview>
      <Labeled label="checkbox"><Checkbox aria-label="เลือก" defaultChecked /></Labeled>
      <Labeled label="text-checkbox"><Checkbox label="ยอมรับข้อตกลง" defaultChecked /></Labeled>
    </Preview>
  ),
}

// ── ขนาด ────────────────────────────────────────────────────
const SIZES: CheckboxSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
export const Sizes: Story = {
  tags: ['!dev'],
  name: 'ขนาด 5 ขั้น',
  parameters: { docs: { section: 'ขนาด', description: { story: 'กล่อง 12 16 20 24 28 ตามสูตรใน tokens/scale/checkbox.mjs ข้อความใช้ preset label/sm ถึง label/xl และข้อความช่วยใช้ body/xs ถึง body/lg' } } },
  render: () => (
    <Preview>
      {SIZES.map((size) => (
        <Labeled key={size} label={size}><Checkbox size={size} label="ยอมรับ" defaultChecked /></Labeled>
      ))}
    </Preview>
  ),
}

// ── สถานะ ───────────────────────────────────────────────────
export const States: Story = {
  tags: ['!dev'],
  name: 'ยังไม่ติ๊ก ติ๊กแล้ว กึ่งเลือก และ disabled',
  parameters: { docs: { section: 'สถานะ', description: { story: 'hover กับ focus เกิดจากการใช้งานจริง ลองเอาเมาส์ชี้หรือกด Tab ที่ตัวอย่าง กึ่งเลือก (indeterminate) ใช้กับช่องหัวกลุ่มที่ลูกถูกเลือกบางส่วน' } } },
  render: () => (
    <Preview>
      <Labeled label="ยังไม่ติ๊ก"><Checkbox label="ยังไม่ติ๊ก" /></Labeled>
      <Labeled label="ติ๊กแล้ว"><Checkbox label="ติ๊กแล้ว" defaultChecked /></Labeled>
      <Labeled label="กึ่งเลือก"><Checkbox label="กึ่งเลือก" indeterminate /></Labeled>
      <Labeled label="disabled"><Checkbox label="disabled" disabled /></Labeled>
      <Labeled label="disabled ติ๊กแล้ว"><Checkbox label="disabled" disabled defaultChecked /></Labeled>
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
      <Do text="ใช้ช่องติ๊กเมื่อเลือกได้หลายข้อ หรือเปิดปิดเงื่อนไขที่ต้องกดยืนยันทีหลัง (เช่น ฟอร์ม)">
        <Checkbox label="รับข่าวทางอีเมล" />
        <Checkbox label="รับข่าวทาง SMS" />
      </Do>
      <Dont text="ใช้ช่องติ๊กกับตัวเลือกที่เลือกได้ข้อเดียว แบบนั้นต้องเป็น Radio">
        <Checkbox label="ชำระด้วยบัตร" />
        <Checkbox label="ชำระด้วยเงินสด" />
      </Dont>
      <Do text="เขียนข้อความเป็นประโยคบอกเล่าที่ติ๊กแล้วเป็นจริง">
        <Checkbox label="จำฉันไว้ในเครื่องนี้" />
      </Do>
      <Dont text="เขียนเป็นคำถามหรือประโยคปฏิเสธ ติ๊กแล้วตีความยาก">
        <Checkbox label="ไม่ต้องการให้จำฉัน?" />
      </Dont>
    </DoDont>
  ),
}

// ── ชุดจริงจากไฟล์ออกแบบ (เมนู sidebar) ────────────────────
export const CheckboxOnly: Story = { tags: ['!autodocs'], name: 'Checkbox', args: { label: undefined, 'aria-label': 'เลือก' }, parameters: controls(BOX_ONLY) }
