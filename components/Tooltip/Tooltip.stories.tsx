import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tooltip, type TooltipSize } from './Tooltip'
import { IconButton } from '../IconButton'
import { Button } from '../Button'
import { Preview, Labeled, DoDont, Do, Dont } from '../../.storybook/docs-blocks'

// หน้า Docs จัดกลุ่ม story ตาม parameters.docs.section ดูกติกาที่ .storybook/CustomDocsPage.tsx
// ไฟล์ออกแบบหน้า 20 มีชุด tooltip (40 แบบ) กับลูกศรต้นแบบ tooltip-arrow คำใบ้เปิดเมื่อชี้หรือโฟกัสตัวกระตุ้น
const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  args: { title: 'ตัวหนา', relationship: 'label', size: 'md', placement: 'top', arrow: true },
  render: (args) => (
    <div style={{ padding: '72px 120px' }}>
      <Tooltip {...args}>
        <IconButton icon="check" family="neutral" label="ตัวหนา" />
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      sectionNotes: {
        ชุด: 'ไฟล์ออกแบบมีชุดเดียวคือ tooltip (ข้อความรอง 2 ค่า x ตำแหน่ง 4 ทิศ x 5 ขนาด) ส่วน tooltip-arrow เป็นลูกศรต้นแบบที่ประกอบอยู่ข้างใน ไม่ใช่ชุดให้เลือก',
        สถานะ: 'คำใบ้ไม่มีสถานะของตัวเอง มีแค่เปิดกับปิด ซึ่งเกิดจากการชี้ (หน่วง 300 มิลลิวินาที) หรือโฟกัสตัวกระตุ้น ลองเอาเมาส์ชี้หรือกด Tab ที่ตัวอย่างในหัวข้ออื่นได้เลย',
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof Tooltip>

const controls = (include: string[]) => ({ controls: { include } })
const TOOLTIP = ['title', 'description', 'relationship', 'size', 'placement', 'arrow']

export const Default: Story = { name: 'Tooltip', parameters: controls(TOOLTIP) }

// ── ส่วนประกอบ ──────────────────────────────────────────────
export const Anatomy: Story = {
  tags: ['!dev'],
  name: 'ส่วนประกอบทั้งหมด',
  args: { title: 'เผยแพร่ทันที', description: 'ข่าวจะขึ้นหน้าแรกภายใน 1 นาที และแจ้งผู้ติดตามทุกคน', relationship: 'description' },
  render: (args) => (
    <div style={{ padding: '110px 160px 24px' }}>
      <Tooltip {...args}><Button family="neutral">เผยแพร่</Button></Tooltip>
    </div>
  ),
  parameters: { docs: { section: 'ส่วนประกอบ', description: { story: 'คำใบ้ประกอบด้วย กล่องที่มีหัวข้อ (title ต้องมีเสมอ) ข้อความรอง (description) และลูกศรชี้ตัวกระตุ้น (arrow) เอาเมาส์ชี้ที่ปุ่มเพื่อดู' } } },
}
export const Relationships: Story = {
  tags: ['!dev'],
  name: 'ความสัมพันธ์กับตัวกระตุ้น 3 แบบ',
  parameters: { docs: { section: 'ส่วนประกอบ', description: { story: 'label คือคำใบ้เป็นชื่อของตัวกระตุ้น (ปุ่มไอคอน) description คือข้อมูลเพิ่มจากชื่อที่มีอยู่แล้ว inaccessible คือข้อความซ้ำกับชื่อปุ่ม ไม่ต้องให้โปรแกรมอ่านหน้าจออ่านซ้ำ ต้องระบุเสมอ' } } },
  render: () => (
    <div style={{ padding: '72px 24px 24px' }}>
      <Preview>
        <Labeled label="label"><Tooltip title="ตัวหนา" relationship="label"><IconButton icon="check" family="neutral" label="ตัวหนา" /></Tooltip></Labeled>
        <Labeled label="description"><Tooltip title="เผยแพร่ทันที" description="แจ้งผู้ติดตามทุกคน" relationship="description"><Button family="neutral">เผยแพร่</Button></Tooltip></Labeled>
        <Labeled label="inaccessible"><Tooltip title="บันทึก" relationship="inaccessible"><Button family="neutral">บันทึก</Button></Tooltip></Labeled>
      </Preview>
    </div>
  ),
}
export const Placements: Story = {
  tags: ['!dev'],
  name: 'ตำแหน่ง 4 ทิศ',
  parameters: { docs: { section: 'ส่วนประกอบ', description: { story: 'ชื่อตำแหน่งคือที่ที่กล่องไปอยู่ ไม่ใช่ทิศที่ลูกศรชี้ เพิ่ม -start หรือ -end เพื่อจัดชิดขอบได้' } } },
  render: () => (
    <div style={{ padding: '72px 120px' }}>
      <Preview>
        {(['top', 'bottom', 'left', 'right'] as const).map((placement) => (
          <Labeled key={placement} label={placement}>
            <Tooltip title={`ตำแหน่ง ${placement}`} relationship="label" placement={placement}>
              <IconButton icon="star" family="neutral" label={placement} />
            </Tooltip>
          </Labeled>
        ))}
      </Preview>
    </div>
  ),
}

// ── ขนาด ────────────────────────────────────────────────────
const SIZES: TooltipSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
export const Sizes: Story = {
  tags: ['!dev'],
  name: 'ขนาด 5 ขั้น',
  parameters: { docs: { section: 'ขนาด', description: { story: 'ระยะขอบ 8 ถึง 16 มุมโค้ง 4 ถึง 12 ลูกศรกว้าง 8 ถึง 16 ตามสูตรใน tokens/scale/tooltip.mjs ความหนาแน่นเท่าตลาดคือขั้น sm ส่วน md เป็นค่าเริ่มต้นของระบบ' } } },
  render: () => (
    <div style={{ padding: '72px 24px 24px' }}>
      <Preview>
        {SIZES.map((size) => (
          <Labeled key={size} label={size}>
            <Tooltip title="ตัวหนา" relationship="label" size={size}><IconButton icon="check" family="neutral" label="ตัวหนา" size={size} /></Tooltip>
          </Labeled>
        ))}
      </Preview>
    </div>
  ),
}

// ── ควรไม่ควร ───────────────────────────────────────────────
export const GoodAndBad: Story = {
  tags: ['!dev'],
  name: 'ควรและไม่ควร',
  parameters: { docs: { section: 'ควรไม่ควร', hideCode: true } },
  render: () => (
    <DoDont>
      <Do text="ใช้บอกชื่อปุ่มไอคอนที่ไม่มีข้อความ หรือเสริมข้อมูลสั้น ๆ ที่ไม่จำเป็นต่อการใช้งาน">
        <Tooltip title="ตัวหนา" relationship="label"><IconButton icon="check" family="neutral" label="ตัวหนา" /></Tooltip>
      </Do>
      <Dont text="ซ่อนข้อมูลที่ต้องรู้ไว้ในคำใบ้ ผู้ใช้จอสัมผัสเปิดไม่ได้ และคนที่ไม่ชี้จะไม่เห็น">
        <Tooltip title="ลบแล้วกู้คืนไม่ได้" relationship="description"><Button family="neutral">ลบ</Button></Tooltip>
      </Dont>
      <Do text="ข้อความสั้นไม่เกินสองบรรทัด เป็นข้อความล้วน">
        <Tooltip title="คัดลอกลิงก์" relationship="label"><IconButton icon="link" family="neutral" label="คัดลอกลิงก์" /></Tooltip>
      </Do>
      <Dont text="ใส่ลิงก์หรือปุ่มในคำใบ้ กดไม่ได้เพราะคำใบ้หายเมื่อเลื่อนเมาส์ออก">
        <Tooltip title="ดูรายละเอียดที่หน้าตั้งค่า (กดที่นี่)" relationship="description"><Button family="neutral">ตั้งค่า</Button></Tooltip>
      </Dont>
    </DoDont>
  ),
}
