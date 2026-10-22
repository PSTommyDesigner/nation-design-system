import type { Meta, StoryObj } from '@storybook/react-vite'
import { IconButton } from './IconButton'
import type { ButtonFamily, ButtonHierarchy, ButtonSize } from '../Button'
import { Preview, Labeled, DoDont, Do, Dont } from '../../.storybook/docs-blocks'

// หน้า Docs จัดกลุ่ม story ตาม parameters.docs.section (ส่วนประกอบ · ชุด · ขนาด · สถานะ · ควรไม่ควร)
// ดูกติกาที่ .storybook/CustomDocsPage.tsx · โครงเดียวกับ Button
// sidebar เหลือเฉพาะชื่อชุดจริงในไฟล์ออกแบบ (semi-rounded-icon-button กับ circular-icon-button)
const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  args: { icon: 'close', label: 'ปิด', family: 'brand', hierarchy: 'primary', size: 'md' },
}
export default meta

type Story = StoryObj<typeof IconButton>

// Default = ชุด semi-rounded-icon-button ในไฟล์ออกแบบ
export const Default: Story = { name: 'Semi-rounded-icon-button' }

// ── ส่วนประกอบ ──────────────────────────────────────────────
export const Anatomy: Story = {
  tags: ['!dev'],
  name: 'ส่วนประกอบทั้งหมด',
  parameters: {
    docs: {
      section: 'ส่วนประกอบ',
      description: { story: 'ปุ่มไอคอนล้วนมี 2 ส่วน คือ กล่องปุ่ม กับไอคอน (icon) ไม่มีข้อความ จึงต้องส่ง label เสมอเพื่อให้โปรแกรมอ่านหน้าจออ่านออก ตรงกับคุณสมบัติ swap-icon ในไฟล์ออกแบบ' },
    },
  },
}

// ── ชุด ─────────────────────────────────────────────────────
const FAMILIES: ButtonFamily[] = ['brand', 'neutral', 'error', 'alpha']
const HIERARCHIES: ButtonHierarchy[] = ['primary', 'secondary', 'tertiary']

export const AllFamilies: Story = {
  tags: ['!dev'],
  name: 'ตระกูลสี 4 ตระกูล',
  parameters: { docs: { section: 'ชุด' } },
  render: () => (
    <Preview>
      {FAMILIES.map((family) => (
        <Labeled key={family} label={family}>
          <IconButton family={family} icon="close" label={`ปิด ${family}`} />
        </Labeled>
      ))}
    </Preview>
  ),
}
export const Hierarchies: Story = {
  tags: ['!dev'],
  name: 'ลำดับชั้น 3 ขั้น',
  parameters: { docs: { section: 'ชุด' } },
  render: () => (
    <Preview>
      {HIERARCHIES.map((hierarchy) => (
        <Labeled key={hierarchy} label={hierarchy}>
          <IconButton hierarchy={hierarchy} icon="close" label={`ปิด ${hierarchy}`} />
        </Labeled>
      ))}
    </Preview>
  ),
}
export const Shapes: Story = {
  tags: ['!dev'],
  name: 'ทรง 2 แบบ',
  parameters: {
    docs: {
      section: 'ชุด',
      description: { story: 'semi-rounded มุมโค้งโตตามขนาด circular วงกลม ตรงกับชุด semi-rounded-icon-button กับ circular-icon-button ในไฟล์ออกแบบ' },
    },
  },
  render: () => (
    <Preview>
      <Labeled label="semi-rounded"><IconButton shape="semi-rounded" icon="close" label="ปิด" /></Labeled>
      <Labeled label="circular"><IconButton shape="circular" icon="close" label="ปิด" /></Labeled>
    </Preview>
  ),
}

// ── ขนาด ────────────────────────────────────────────────────
const SIZES: ButtonSize[] = ['xs', 'sm', 'md', 'lg', 'xl']

export const Sizes: Story = {
  tags: ['!dev'],
  name: 'ขนาด 5 ขั้น',
  parameters: {
    docs: {
      section: 'ขนาด',
      description: { story: 'ขนาดใช้บันไดเดียวกับปุ่มข้อความ ความกว้างเท่าความสูง ไอคอนโตตามขั้น สูตรอยู่ที่ tokens/scale/button.mjs' },
    },
  },
  render: () => (
    <Preview>
      {SIZES.map((size) => (
        <Labeled key={size} label={size}>
          <IconButton size={size} icon="search" label={`ค้นหา ${size}`} />
        </Labeled>
      ))}
    </Preview>
  ),
}

// ── สถานะ ───────────────────────────────────────────────────
export const States: Story = {
  tags: ['!dev'],
  name: 'ปกติ กดได้ และ disabled',
  parameters: {
    docs: {
      section: 'สถานะ',
      description: { story: 'hover กับ focused มาจาก pseudo-class ของ CSS ชี้เมาส์หรือกด Tab ที่ตัวอย่างเพื่อดู ส่วน disabled เป็น attribute มาตรฐานของ button' },
    },
  },
  render: () => (
    <Preview>
      <Labeled label="default"><IconButton icon="close" label="ปิด" /></Labeled>
      <Labeled label="disabled"><IconButton icon="close" label="ปิด" disabled /></Labeled>
    </Preview>
  ),
}
export const DefaultGray: Story = {
  tags: ['!dev'],
  name: 'โหมดเทา',
  parameters: {
    docs: {
      section: 'สถานะ',
      description: { story: 'โหมดเทา (defaultGray) เทาตอนอยู่เฉย แล้วขึ้นสีตอนชี้ มีเฉพาะตระกูล brand กับ error' },
    },
  },
  render: () => (
    <Preview>
      <Labeled label="brand"><IconButton family="brand" defaultGray icon="close" label="ปิด" /></Labeled>
      <Labeled label="error"><IconButton family="error" defaultGray icon="delete" label="ลบ" /></Labeled>
    </Preview>
  ),
}

// ── ควรไม่ควร ───────────────────────────────────────────────
// เนื้อหาตามหัวข้อ Usage Do / Don't ในเอกสารหน้า 12 Buttons ของไฟล์ออกแบบ (ใช้ร่วมกับปุ่มข้อความ)
export const GoodAndBad: Story = {
  tags: ['!dev'],
  name: 'ควรและไม่ควร',
  parameters: { docs: { section: 'ควรไม่ควร', hideCode: true } },
  render: () => (
    <DoDont>
      <Do text="การกระทำรองใช้ปุ่มรองหรือ tertiary เพื่อลดการแย่งสายตา">
        <IconButton icon="add" label="เพิ่ม" />
        <IconButton icon="close" label="ปิด" hierarchy="tertiary" />
      </Do>
      <Dont text="อย่าให้ทุกปุ่มเป็นปุ่มเด่นเต็มสีในหน้าเดียว">
        <IconButton icon="add" label="เพิ่ม" />
        <IconButton icon="close" label="ปิด" />
        <IconButton icon="search" label="ค้นหา" />
      </Dont>
      <Do text="ใช้ปุ่มตระกูล error กับการกระทำที่ทำลาย เช่น ลบ">
        <IconButton family="error" icon="delete" label="ลบ" />
      </Do>
      <Dont text="อย่าใช้ปุ่มแบรนด์กับการลบ ผู้ใช้แยกอันตรายไม่ออก">
        <IconButton family="brand" icon="delete" label="ลบ" />
      </Dont>
    </DoDont>
  ),
}

// ── 2 ชนิดจริงจากไฟล์ออกแบบ (เมนู sidebar สำหรับลองเล่นแต่ละชนิด) ──────────
// semi-rounded-icon-button ไม่ต้องมีตรงนี้ เพราะ Default ด้านบนทำหน้าที่แทนอยู่แล้ว
export const CircularIconButton: Story = { tags: ['!autodocs'], name: 'Circular-icon-button', args: { shape: 'circular' } }
