import type { Meta, StoryObj } from '@storybook/react-vite'
import { MockupMedia, type MockupMediaSize, type MockupMediaRatio } from './MockupMedia'
import { Preview, Labeled, DoDont, Do, Dont } from '../../.storybook/docs-blocks'

// หน้า Docs จัดกลุ่ม story ตาม parameters.docs.section ดูกติกาที่ .storybook/CustomDocsPage.tsx
// ไฟล์ออกแบบหน้า 10 Frame มีชุด mockup-media แกน kind (image, video) size (xs ถึง xl) และ ratio (16:9 4:3 1:1 9:16) รวม 40 แบบ
// กล่องยืดเต็มกรอบที่วาง ตัวอย่างจึงห่อด้วยกรอบขนาดตั้งต้นของแต่ละขนาดในไฟล์ออกแบบ (สัดส่วน 16:9)
const BOX: Record<MockupMediaSize, [number, number]> = { xs: [96, 54], sm: [160, 90], md: [224, 126], lg: [320, 180], xl: [448, 252] }
const Box = ({ size, children }: { size: MockupMediaSize; children: React.ReactNode }) => (
  <div style={{ width: BOX[size][0], height: BOX[size][1] }}>{children}</div>
)

const meta: Meta<typeof MockupMedia> = {
  title: 'Molecules (Element)/10 Frame/MockupMedia Component',
  component: MockupMedia,
  tags: ['autodocs'],
  args: { kind: 'image', size: 'xl' },
  render: (args) => <Box size={args.size ?? 'md'}><MockupMedia {...args} /></Box>,
  parameters: {
    docs: {
      sectionNotes: {
        ส่วนประกอบ: 'พื้นสี background/general/secondary ไอคอน image หรือ videocam สี icon/general/disable-subtle และข้อความ body-sm สี text/general/disabled',
        ขนาด: 'ไอคอน 16 20 24 32 40 ตามขนาด xs ถึง xl ยืมจากสเกลไอคอนของระบบ ข้อความแสดงเฉพาะ lg กับ xl กล่องยืดเต็มกรอบที่วาง',
        สถานะ: 'เป็นของตกแต่ง กดไม่ได้ จึงไม่มีสถานะ และซ่อนจากโปรแกรมอ่านหน้าจอ',
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof MockupMedia>

const controls = { controls: { include: ['kind', 'size', 'ratio'] } }
const RATIOS: MockupMediaRatio[] = ['16:9', '4:3', '1:1', '9:16']
const SIZES: MockupMediaSize[] = ['xs', 'sm', 'md', 'lg', 'xl']

export const Default: Story = { name: 'Mockup-media', parameters: controls }

// ── ขนาด ────────────────────────────────────────────────────
export const Sizes: Story = {
  tags: ['!dev'],
  name: '2 ชนิด 5 ขนาด',
  parameters: { docs: { section: 'ขนาด', description: { story: 'เลือกขนาดตามกล่องที่วาง ไอคอนย่อตาม และข้อความขึ้นเฉพาะ lg กับ xl กล่องสูงไม่ถึงราว 120 เช่นช่องภาพของการ์ดในรายการ ใช้ md ลงไป' } } },
  render: () => (
    <Preview>
      {(['image', 'video'] as const).flatMap((kind) =>
        SIZES.map((size) => (
          <Labeled key={`${kind}-${size}`} label={`${kind} ${size}`}><Box size={size}><MockupMedia kind={kind} size={size} /></Box></Labeled>
        )),
      )}
    </Preview>
  ),
}

// ── สัดส่วน ────────────────────────────────────────────────
export const Ratios: Story = {
  tags: ['!dev'],
  name: '4 สัดส่วน',
  parameters: { docs: { section: 'ชุด', description: { story: 'ส่ง ratio แล้วกล่องกว้างเต็มกรอบและสูงตามสัดส่วน ใช้เมื่อกรอบแม่ไม่มีความสูง 16:9 ภาพเปิดข่าว 4:3 ภาพในเนื้อหา 1:1 ภาพในกริด 9:16 คลิปแนวตั้ง ตัวอย่างนี้กว้าง 200 ทุกตัว' } } },
  render: () => (
    <Preview>
      {RATIOS.map((ratio) => (
        <Labeled key={ratio} label={ratio}><div style={{ width: 200 }}><MockupMedia size="md" ratio={ratio} /></div></Labeled>
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
      <Do text="เลือกขนาดให้พอดีกล่อง ช่องภาพเล็กในการ์ดรายการใช้ sm ไอคอนอย่างเดียวก็บอกได้ว่าเป็นรูป">
        <div style={{ width: 165, height: 86 }}><MockupMedia size="sm" /></div>
      </Do>
      <Dont text="ใช้ขนาดใหญ่ในกล่องเล็ก ไอคอนกับข้อความแน่นจนล้นกล่อง">
        <div style={{ width: 165, height: 86 }}><MockupMedia size="xl" /></div>
      </Dont>
    </DoDont>
  ),
}
