import type { Meta, StoryObj } from '@storybook/react-vite'
import { ProgressBar } from './ProgressBar'
import { CircularProgressBar } from './CircularProgressBar'
import { SemiCircularProgressBar } from './SemiCircularProgressBar'
import type { ProgressSize } from './types'
import { Preview, Labeled, DoDont, Do, Dont } from '../../.storybook/docs-blocks'

// หน้า Docs จัดกลุ่ม story ตาม parameters.docs.section ดูกติกาที่ .storybook/CustomDocsPage.tsx
// ไฟล์ออกแบบหน้า 23 Progress Bars มี 3 ชุด progress-bar, circular-progress-bar, semi-circular-progress-bar
// ทั้งสามชุดใช้แกน size 5 ขั้นเท่ากัน ชุดแถบมีแกน label-position เพิ่ม สูตรขนาดอยู่ที่ tokens/scale/progress.mjs
const meta: Meta<typeof ProgressBar> = {
  title: 'Components/Progress',
  component: ProgressBar,
  tags: ['autodocs'],
  args: { label: 'ความคืบหน้าการอัปโหลด', value: 65, max: 100, size: 'md', showLabel: true, labelPosition: 'right' },
  render: (args) => <div style={{ width: 320 }}><ProgressBar {...args} /></div>,
}
export default meta

type Story = StoryObj<typeof ProgressBar>

const controls = (include: string[]) => ({ controls: { include } })
const BAR = ['label', 'value', 'max', 'size', 'showLabel', 'labelPosition', 'valueText']
const RING = ['label', 'value', 'max', 'size', 'showLabel', 'valueText']
const SIZES: ProgressSize[] = ['xs', 'sm', 'md', 'lg', 'xl']

export const Default: Story = { name: 'Progress-bar', parameters: controls(BAR) }

// ── ส่วนประกอบ ──────────────────────────────────────────────
export const Anatomy: Story = {
  tags: ['!dev'],
  name: 'ส่วนประกอบทั้งหมด',
  parameters: { docs: { section: 'ส่วนประกอบ', description: { story: 'ทุกทรงมี 3 ส่วน คือ ราง (track) ส่วนที่เติม (fill สีแบรนด์เสมอ ไม่มีแกนสี) และป้ายตัวเลข (showLabel) แถบวางป้ายไว้ขวาหรือล่าง วงแหวนวางไว้กลางวง ชื่องาน (label) ไม่แสดงบนจอ ไปเป็น aria-label ให้โปรแกรมอ่านหน้าจอ' } } },
  render: () => (
    <Preview>
      <Labeled label="track + fill + label"><div style={{ width: 320 }}><ProgressBar label="ความคืบหน้า" value={65} /></div></Labeled>
      <Labeled label="ring"><CircularProgressBar label="ความคืบหน้า" value={65} /></Labeled>
    </Preview>
  ),
}

// ── ชุด ─────────────────────────────────────────────────────
export const AllTypes: Story = {
  tags: ['!dev'],
  name: '3 ชุด',
  parameters: { docs: { section: 'ชุด', description: { story: 'progress-bar เป็นตัวเริ่มต้นของระบบ ใช้ได้เกือบทุกงาน circular-progress-bar ใช้เมื่อพื้นที่แนวนอนแคบจนวางแถบไม่ได้ semi-circular-progress-bar เป็นหน้าปัดวัดค่าในแดชบอร์ด ไม่ใช่ตัวบอกการโหลด และบังคับส่ง value เสมอ' } } },
  render: () => (
    <Preview>
      <Labeled label="progress-bar"><div style={{ width: 320 }}><ProgressBar label="ความคืบหน้าการอัปโหลด" value={65} /></div></Labeled>
      <Labeled label="circular-progress-bar"><CircularProgressBar label="ความคืบหน้าการซิงก์" value={65} /></Labeled>
      <Labeled label="semi-circular-progress-bar"><SemiCircularProgressBar label="ยอดขายเทียบเป้า" value={65} /></Labeled>
    </Preview>
  ),
}

// ── ขนาด ────────────────────────────────────────────────────
export const Sizes: Story = {
  tags: ['!dev'],
  name: 'ขนาด 5 ขั้น',
  parameters: { docs: { section: 'ขนาด', description: { story: 'แถบหนา 4 ถึง 12 วงแหวนกว้าง 40 ถึง 104 เส้นวงหนาเท่าแถบ ป้ายใช้ preset label/xs ถึง label/xl ตามสูตรใน tokens/scale/progress.mjs ไม่มี 2xl เพราะขัดกับสเกล 5 ขั้นของระบบ' } } },
  render: () => (
    <Preview column>
      <Labeled label="progress-bar xs ถึง xl">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
          {SIZES.map((size) => <ProgressBar key={size} label={`ความคืบหน้า ${size}`} value={65} size={size} />)}
        </div>
      </Labeled>
      <Labeled label="circular-progress-bar xs ถึง xl">
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end' }}>
          {SIZES.map((size) => <CircularProgressBar key={size} label={`ความคืบหน้า ${size}`} value={65} size={size} />)}
        </div>
      </Labeled>
      <Labeled label="semi-circular-progress-bar xs ถึง xl">
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end' }}>
          {SIZES.map((size) => <SemiCircularProgressBar key={size} label={`ยอดขาย ${size}`} value={65} size={size} />)}
        </div>
      </Labeled>
    </Preview>
  ),
}

// ── สถานะ ───────────────────────────────────────────────────
export const States: Story = {
  tags: ['!dev'],
  name: 'รู้ค่า ไม่รู้ค่า ตำแหน่งป้าย',
  parameters: { docs: { section: 'สถานะ', description: { story: 'ไม่ส่ง value คือแบบไม่รู้ค่า ส่วนที่เติมไถลวนและป้ายหายไป (aria-valuenow ถูกตัด ไม่ใช่ใส่ศูนย์) แถบวางป้ายได้ขวาหรือล่าง (labelPosition) ปิดป้ายด้วย showLabel เมื่อตัวเลขไม่ครบความหมายให้ส่ง valueText ไปเป็น aria-valuetext ไม่มีสถานะ hover focus หรือ disabled เพราะกดไม่ได้' } } },
  render: () => (
    <Preview column>
      <Labeled label="รู้ค่า ป้ายขวา (ค่าเริ่มต้น)"><div style={{ width: 320 }}><ProgressBar label="ความคืบหน้าการอัปโหลด" value={65} /></div></Labeled>
      <Labeled label="รู้ค่า ป้ายล่าง"><div style={{ width: 320 }}><ProgressBar label="ความคืบหน้าการอัปโหลด" value={65} labelPosition="bottom" /></div></Labeled>
      <Labeled label="ไม่มีป้าย"><div style={{ width: 320 }}><ProgressBar label="ความคืบหน้าการอัปโหลด" value={65} showLabel={false} /></div></Labeled>
      <Labeled label="นับเป็นขั้นตอน (valueText)"><div style={{ width: 320 }}><ProgressBar label="ขั้นตอนการตั้งค่า" value={3} max={7} valueText="ขั้นที่ 3 จาก 7" labelPosition="bottom" /></div></Labeled>
      <Labeled label="ไม่รู้ค่า แถบ"><div style={{ width: 320 }}><ProgressBar label="กำลังประมวลผล" /></div></Labeled>
      <Labeled label="ไม่รู้ค่า วงแหวน"><CircularProgressBar label="กำลังโหลดข้อมูล" /></Labeled>
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
      <Do text="ค่าที่ต้องเทียบกันเป็นรายการใช้แถบทุกแถว คนตัดสินความยาวได้แม่นกว่าตัดสินมุม">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 240 }}>
          <ProgressBar label="บทความ ก" value={72} size="sm" />
          <ProgressBar label="บทความ ข" value={67} size="sm" />
          <ProgressBar label="บทความ ค" value={40} size="sm" />
        </div>
      </Do>
      <Dont text="เอาวงแหวนมาเรียงเป็นรายการ ค่าที่ต่างกัน 5 เปอร์เซ็นต์แยกด้วยตาแทบไม่ออก">
        <div style={{ display: 'flex', gap: 12 }}>
          <CircularProgressBar label="บทความ ก" value={72} size="sm" />
          <CircularProgressBar label="บทความ ข" value={67} size="sm" />
          <CircularProgressBar label="บทความ ค" value={40} size="sm" />
        </div>
      </Dont>
      <Do text="ใช้ครึ่งวงเป็นหน้าปัดวัดค่าที่มีเพดานชัด เช่นยอดขายเทียบเป้า และส่ง valueText บอกหน่วยจริง">
        <SemiCircularProgressBar label="ยอดขายเทียบเป้าประจำเดือน" value={7.4} max={10} valueText="7.4 ล้านบาท จากเป้า 10 ล้านบาท" size="lg" />
      </Do>
      <Dont text="ใช้ครึ่งวงบอกการโหลด หน้าปัดสื่อว่าเป็นค่าที่วัด ณ ตอนนี้ ไม่ใช่งานที่กำลังเดินไปจนจบ">
        <SemiCircularProgressBar label="กำลังอัปโหลด" value={30} size="lg" />
      </Dont>
    </DoDont>
  ),
}

// ── ชุดจริงจากไฟล์ออกแบบ (เมนู sidebar) ────────────────────
export const Circular: StoryObj<typeof CircularProgressBar> = {
  tags: ['!autodocs'],
  name: 'Circular-progress-bar',
  args: { label: 'ความคืบหน้าการซิงก์', value: 40, max: 100, size: 'md', showLabel: true },
  parameters: controls(RING),
  render: (args) => <CircularProgressBar {...args} />,
}

export const SemiCircular: StoryObj<typeof SemiCircularProgressBar> = {
  tags: ['!autodocs'],
  name: 'Semi-circular-progress-bar',
  args: { label: 'คะแนนความพึงพอใจ', value: 72, max: 100, size: 'md', showLabel: true },
  parameters: controls(RING),
  render: (args) => <SemiCircularProgressBar {...args} />,
}
