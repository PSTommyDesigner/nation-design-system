import type { Meta, StoryObj } from '@storybook/react-vite'
import { Radio, RadioGroup, type RadioSize } from './Radio'
import { Preview, Labeled, DoDont, Do, Dont } from '../../.storybook/docs-blocks'

// หน้า Docs จัดกลุ่ม story ตาม parameters.docs.section ดูกติกาที่ .storybook/CustomDocsPage.tsx
// ชื่อ story ใน sidebar ตรงกับชุดในไฟล์ออกแบบหน้า 16 (radio, text-radio) ส่วน RadioGroup เป็นการประกอบฝั่งเว็บ
const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
  args: { label: 'บัตรเครดิต', size: 'md' },
}
export default meta

type Story = StoryObj<typeof Radio>

const controls = (include: string[]) => ({ controls: { include } })
const TEXT_RADIO = ['label', 'supportingText', 'size', 'defaultChecked', 'disabled', 'touchTarget']
const CIRCLE_ONLY = ['size', 'defaultChecked', 'disabled', 'touchTarget']

export const Default: Story = { name: 'Text-radio', parameters: controls(TEXT_RADIO) }

// ── ส่วนประกอบ ──────────────────────────────────────────────
export const Anatomy: Story = {
  tags: ['!dev'],
  name: 'ส่วนประกอบทั้งหมด',
  args: { supportingText: 'ชำระผ่านบัตรเครดิตหรือเดบิต', defaultChecked: true },
  parameters: { docs: { section: 'ส่วนประกอบ', description: { story: 'ปุ่มตัวเลือกประกอบด้วย วงกลมกับจุดตรงกลาง (ต้องมีเสมอ) ข้อความ (label) และข้อความช่วย (supportingText) ชุด radio คือวงกลมอย่างเดียว ชุด text-radio คือแถวที่มีข้อความ' } } },
}
export const CircleOnly: Story = {
  tags: ['!dev'],
  name: 'วงกลมอย่างเดียว',
  args: { label: undefined, 'aria-label': 'เลือกแถวนี้' },
  parameters: { docs: { section: 'ส่วนประกอบ' } },
}
export const GroupExample: Story = {
  tags: ['!dev'],
  name: 'กลุ่มตัวเลือก (RadioGroup)',
  parameters: { docs: { section: 'ส่วนประกอบ', description: { story: 'ตัวเลือกต้องอยู่ในกลุ่มเสมอ RadioGroup ประกาศชื่อกลุ่มครั้งเดียว ส่ง name ลงไปให้ทุกตัว และคุมค่าที่เลือกแทน' } } },
  render: () => (
    <RadioGroup label="วิธีชำระเงิน" name="payment" defaultValue="credit" size="md">
      <Radio value="credit" label="บัตรเครดิต" />
      <Radio value="transfer" label="โอนเงิน" />
      <Radio value="cod" label="เก็บเงินปลายทาง" />
    </RadioGroup>
  ),
}

// ── ชุด ─────────────────────────────────────────────────────
export const AllTypes: Story = {
  tags: ['!dev'],
  name: '2 ชุด',
  parameters: { docs: { section: 'ชุด', description: { story: 'ไฟล์ออกแบบมี radio (40 แบบ) และ text-radio (40 แบบ) ฝั่งโค้ดเป็น component เดียว ส่ง label หรือไม่ส่งเท่ากับเลือกชุด ไม่มีสถานะกึ่งเลือกเพราะตัวเลือกหนึ่งตัวเป็นได้แค่เลือกหรือไม่เลือก' } } },
  render: () => (
    <Preview>
      <Labeled label="radio"><Radio aria-label="เลือก" defaultChecked /></Labeled>
      <Labeled label="text-radio"><Radio label="บัตรเครดิต" defaultChecked /></Labeled>
    </Preview>
  ),
}

// ── ขนาด ────────────────────────────────────────────────────
const SIZES: RadioSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
export const Sizes: Story = {
  tags: ['!dev'],
  name: 'ขนาด 5 ขั้น',
  parameters: { docs: { section: 'ขนาด', description: { story: 'วงกลม 12 16 20 24 28 จุด 4 6 8 10 12 ตามสูตรใน tokens/scale/radio.mjs ข้อความใช้ชุดเดียวกับช่องติ๊ก' } } },
  render: () => (
    <Preview>
      {SIZES.map((size) => (
        <Labeled key={size} label={size}><Radio size={size} label="บัตรเครดิต" defaultChecked /></Labeled>
      ))}
    </Preview>
  ),
}

// ── สถานะ ───────────────────────────────────────────────────
export const States: Story = {
  tags: ['!dev'],
  name: 'ยังไม่เลือก เลือกแล้ว และ disabled',
  parameters: { docs: { section: 'สถานะ', description: { story: 'hover กับ focus เกิดจากการใช้งานจริง ลองเอาเมาส์ชี้หรือกด Tab ที่ตัวอย่าง' } } },
  render: () => (
    <Preview>
      <Labeled label="ยังไม่เลือก"><Radio label="ยังไม่เลือก" /></Labeled>
      <Labeled label="เลือกแล้ว"><Radio label="เลือกแล้ว" defaultChecked /></Labeled>
      <Labeled label="disabled"><Radio label="disabled" disabled /></Labeled>
      <Labeled label="disabled เลือกแล้ว"><Radio label="disabled" disabled defaultChecked /></Labeled>
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
      <Do text="ใช้เมื่อเลือกได้ข้อเดียวจากตัวเลือก 2 ถึง 5 ข้อ และอยากให้เห็นทุกข้อพร้อมกัน">
        <RadioGroup label="ขนาดตัวอักษร" name="font" defaultValue="md">
          <Radio value="sm" label="เล็ก" />
          <Radio value="md" label="กลาง" />
          <Radio value="lg" label="ใหญ่" />
        </RadioGroup>
      </Do>
      <Dont text="ใช้กับตัวเลือกที่มีมากกว่า 6 ข้อ แบบนั้นควรเป็น Dropdown">
        <RadioGroup label="จังหวัด" name="province">
          <Radio value="bkk" label="กรุงเทพมหานคร" />
          <Radio value="cnx" label="เชียงใหม่" />
          <Radio value="kkn" label="ขอนแก่น" />
          <Radio value="hdy" label="สงขลา" />
          <Radio value="ubn" label="อุบลราชธานี" />
          <Radio value="nst" label="นครศรีธรรมราช" />
          <Radio value="ryg" label="ระยอง" />
        </RadioGroup>
      </Dont>
      <Do text="มีค่าเริ่มต้นที่เลือกไว้แล้วเสมอ ผู้ใช้จะได้ไม่ต้องเดาว่าต้องเลือกไหม">
        <RadioGroup label="การแจ้งเตือน" name="notify" defaultValue="on">
          <Radio value="on" label="เปิด" />
          <Radio value="off" label="ปิด" />
        </RadioGroup>
      </Do>
      <Dont text="ใช้ปุ่มตัวเลือกกับการเปิดปิดค่าเดียว แบบนั้นควรเป็น Toggle">
        <Radio label="เปิดแจ้งเตือน" />
      </Dont>
    </DoDont>
  ),
}

// ── ชุดจริงจากไฟล์ออกแบบ (เมนู sidebar) ────────────────────
export const RadioOnly: Story = { tags: ['!autodocs'], name: 'Radio', args: { label: undefined, 'aria-label': 'เลือก' }, parameters: controls(CIRCLE_ONLY) }
export const Group: Story = {
  tags: ['!autodocs'],
  name: 'RadioGroup',
  render: () => (
    <RadioGroup label="วิธีชำระเงิน" name="payment" defaultValue="credit" size="md">
      <Radio value="credit" label="บัตรเครดิต" />
      <Radio value="transfer" label="โอนเงิน" />
      <Radio value="cod" label="เก็บเงินปลายทาง" />
    </RadioGroup>
  ),
}
