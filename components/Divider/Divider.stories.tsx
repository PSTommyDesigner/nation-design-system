import type { Meta, StoryObj } from '@storybook/react-vite'
import { Divider } from './Divider'
import { Preview, Labeled, DoDont, Do, Dont } from '../../.storybook/docs-blocks'

// หน้า Docs จัดกลุ่ม story ตาม parameters.docs.section ดูกติกาที่ .storybook/CustomDocsPage.tsx
// ไฟล์ออกแบบหน้า 28 มีชุด horizontal-divider กับ vertical-divider ชุดละ 2 แบบ (solid, dash)
const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  tags: ['autodocs'],
  args: { orientation: 'horizontal', type: 'solid' },
  render: (args) => (
    args.orientation === 'vertical'
      ? <div style={{ display: 'flex', height: 48, alignItems: 'center', gap: 12 }}><span>ซ้าย</span><Divider {...args} /><span>ขวา</span></div>
      : <div style={{ width: 320 }}><Divider {...args} /></div>
  ),
  parameters: {
    docs: {
      sectionNotes: {
        ส่วนประกอบ: 'เส้นคั่นมีชิ้นเดียวคือตัวเส้น ความหนา 1px จากตัวแปร divider/thickness ไม่มีส่วนประกอบย่อย',
        ขนาด: 'เส้นคั่นไม่มีขนาด ความหนาคงที่ 1px ทุกที่ ความยาวยืดเต็มแกนที่วาง',
        สถานะ: 'เส้นคั่นเป็นของตกแต่ง (role=presentation) กดไม่ได้ จึงไม่มีสถานะ',
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof Divider>

const controls = (include: string[]) => ({ controls: { include } })
const DIVIDER = ['orientation', 'type']

export const Default: Story = { name: 'Horizontal-divider', parameters: controls(DIVIDER) }

// ── ชุด ─────────────────────────────────────────────────────
export const AllTypes: Story = {
  tags: ['!dev'],
  name: '2 ชุด 2 แบบเส้น',
  parameters: { docs: { section: 'ชุด', description: { story: 'แนวนอนใช้เมื่อเนื้อหาเรียงบนลงล่าง แนวตั้งใช้เมื่อเรียงซ้ายไปขวา เส้นทึบใช้เมื่อสองฝั่งเป็นเนื้อหาระดับเดียวกัน เส้นประ (ขีด 8 เว้น 8 ตามไฟล์ออกแบบ) ใช้เมื่อการแบ่งเป็นเรื่องชั่วคราวหรือยังไม่แน่นอน' } } },
  render: () => (
    <Preview>
      <Labeled label="horizontal solid"><div style={{ width: 200 }}><Divider /></div></Labeled>
      <Labeled label="horizontal dash"><div style={{ width: 200 }}><Divider type="dash" /></div></Labeled>
      <Labeled label="vertical solid"><div style={{ height: 48, display: 'flex' }}><Divider orientation="vertical" /></div></Labeled>
      <Labeled label="vertical dash"><div style={{ height: 48, display: 'flex' }}><Divider orientation="vertical" type="dash" /></div></Labeled>
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
      <Do text="ใช้คั่นกลุ่มเนื้อหาที่ต่างเรื่องกัน เมื่อช่องว่างอย่างเดียวยังแยกไม่ชัด">
        <div style={{ width: 240 }}><p style={{ margin: '0 0 8px' }}>ข่าวการเมือง</p><Divider /><p style={{ margin: '8px 0 0' }}>ข่าวเศรษฐกิจ</p></div>
      </Do>
      <Dont text="คั่นทุกรายการในรายการเดียวกัน เส้นจะถี่จนหน้ารก ใช้ช่องว่างแทน">
        <div style={{ width: 240 }}><p style={{ margin: 0 }}>ข่าว 1</p><Divider /><p style={{ margin: 0 }}>ข่าว 2</p><Divider /><p style={{ margin: 0 }}>ข่าว 3</p></div>
      </Dont>
    </DoDont>
  ),
}

// ── ชุดจริงจากไฟล์ออกแบบ (เมนู sidebar) ────────────────────
export const VerticalDivider: Story = { tags: ['!autodocs'], name: 'Vertical-divider', args: { orientation: 'vertical' }, parameters: controls(DIVIDER) }
