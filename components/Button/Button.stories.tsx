import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button, type ButtonFamily, type ButtonHierarchy, type ButtonSize } from './Button'
import { Preview, Labeled, DoDont, Do, Dont } from '../../.storybook/docs-blocks'

// หน้า Docs จัดกลุ่ม story ตาม parameters.docs.section (ส่วนประกอบ · ชุด · ขนาด · สถานะ · ควรไม่ควร)
// ดูกติกาที่ .storybook/CustomDocsPage.tsx · โครงเดียวกับ Tag และ Badge
// story ภาพรวมติด tag !dev ให้โชว์เฉพาะในหน้า Docs ส่วน sidebar เหลือเฉพาะชื่อชุดจริงในไฟล์ออกแบบ
// (semi-rounded-button กับ pill-button ตาม tokens/figma-components.json → Button.figmaSets)
const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'ยืนยัน', family: 'brand', hierarchy: 'primary', size: 'md' },
}
export default meta

type Story = StoryObj<typeof Button>

// Default = ชุด semi-rounded-button ในไฟล์ออกแบบ (เรนเดอร์เหมือนกันเป๊ะ จึงรวมเป็น story เดียว)
export const Default: Story = { name: 'Semi-rounded-button' }

// ── ส่วนประกอบ ──────────────────────────────────────────────
export const Anatomy: Story = {
  tags: ['!dev'],
  name: 'ส่วนประกอบทั้งหมด',
  args: { leftIcon: 'add', rightIcon: 'chevron-right' },
  parameters: {
    docs: {
      section: 'ส่วนประกอบ',
      description: { story: 'ปุ่มประกอบด้วย กล่องปุ่ม (พื้นหลังและเส้นขอบ) ข้อความ (children) ไอคอนซ้าย (leftIcon) และไอคอนขวา (rightIcon) ไอคอนทั้งสองเป็นส่วนเสริม เส้นขอบมีเฉพาะระดับ secondary' },
    },
  },
}

// ── ชุด ─────────────────────────────────────────────────────
const FAMILIES: ButtonFamily[] = ['brand', 'neutral', 'error', 'alpha']
const HIERARCHIES: ButtonHierarchy[] = ['primary', 'secondary', 'tertiary']

export const AllFamilies: Story = {
  tags: ['!dev'],
  name: 'ตระกูลสี 4 ตระกูล',
  parameters: {
    docs: {
      section: 'ชุด',
      description: { story: 'brand neutral error alpha ส่วนปุ่มแบบลิงก์แยกเป็น component LinkButton ต่างหาก ไม่ใช่ตระกูล' },
    },
  },
  render: () => (
    <Preview>
      {FAMILIES.map((family) => (
        <Labeled key={family} label={family}>
          <Button family={family}>ยืนยัน</Button>
        </Labeled>
      ))}
    </Preview>
  ),
}
export const Hierarchies: Story = {
  tags: ['!dev'],
  name: 'ลำดับชั้น 3 ขั้น',
  parameters: {
    docs: {
      section: 'ชุด',
      description: { story: 'primary พื้นทึบ secondary พื้นโปร่งมีขอบ tertiary ข้อความล้วน ตระกูล alpha ไม่มีลำดับชั้น' },
    },
  },
  render: () => (
    <Preview>
      {HIERARCHIES.map((hierarchy) => (
        <Labeled key={hierarchy} label={hierarchy}>
          <Button hierarchy={hierarchy}>ยืนยัน</Button>
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
      description: { story: 'semi-rounded มุมโค้งโตตามขนาด pill แคปซูล ตรงกับชุด semi-rounded-button กับ pill-button ในไฟล์ออกแบบ' },
    },
  },
  render: () => (
    <Preview>
      <Labeled label="semi-rounded"><Button shape="semi-rounded">ยืนยัน</Button></Labeled>
      <Labeled label="pill"><Button shape="pill">ยืนยัน</Button></Labeled>
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
      description: { story: 'ขนาดคุมด้วยสูตรใน tokens/scale/button.mjs ความสูง ระยะขอบ และไอคอนไล่ตามขั้นเดียวกันทุกตระกูลและทุกทรง' },
    },
  },
  render: () => (
    <Preview>
      {SIZES.map((size) => (
        <Labeled key={size} label={size}>
          <Button size={size} rightIcon="chevron-right">ยืนยัน</Button>
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
      description: { story: 'ไฟล์ออกแบบมีแกน state คือ default hover focused disabled ฝั่งโค้ด hover กับ focused มาจาก pseudo-class ของ CSS ชี้เมาส์หรือกด Tab ที่ตัวอย่างเพื่อดู ส่วน disabled เป็น attribute มาตรฐานของ button' },
    },
  },
  render: () => (
    <Preview>
      <Labeled label="default"><Button>ยืนยัน</Button></Labeled>
      <Labeled label="disabled"><Button disabled>ยืนยัน</Button></Labeled>
      <Labeled label="secondary disabled"><Button hierarchy="secondary" disabled>ยืนยัน</Button></Labeled>
    </Preview>
  ),
}
export const DefaultGray: Story = {
  tags: ['!dev'],
  name: 'โหมดเทา',
  parameters: {
    docs: {
      section: 'สถานะ',
      description: { story: 'โหมดเทา (defaultGray) เทาตอนอยู่เฉย แล้วขึ้นสีตอนชี้ ตรงกับแกน default-gray ในไฟล์ออกแบบ มีเฉพาะตระกูล brand กับ error' },
    },
  },
  render: () => (
    <Preview>
      <Labeled label="brand"><Button family="brand" defaultGray>ยืนยัน</Button></Labeled>
      <Labeled label="error"><Button family="error" defaultGray>ลบรายการ</Button></Labeled>
    </Preview>
  ),
}

// ── ควรไม่ควร ───────────────────────────────────────────────
// เนื้อหาตามหัวข้อ Usage Do / Don't ในเอกสารหน้า 12 Buttons ของไฟล์ออกแบบ
export const GoodAndBad: Story = {
  tags: ['!dev'],
  name: 'ควรและไม่ควร',
  parameters: { docs: { section: 'ควรไม่ควร', hideCode: true } },
  render: () => (
    <DoDont>
      <Do text="ใช้ปุ่มเด่นปุ่มเดียวต่อกลุ่ม และใช้ปุ่มรองสำหรับการกระทำรอง">
        <Button>บันทึก</Button>
        <Button hierarchy="secondary">ยกเลิก</Button>
      </Do>
      <Dont text="อย่าใช้ปุ่มเด่นหลายปุ่มแข่งความสำคัญกัน">
        <Button>บันทึก</Button>
        <Button>ยกเลิก</Button>
      </Dont>
      <Do text="การกระทำรองใช้ปุ่มรองหรือ tertiary เพื่อลดการแย่งสายตา">
        <Button>ยืนยัน</Button>
        <Button hierarchy="tertiary">ล้างค่า</Button>
      </Do>
      <Dont text="อย่าให้ทุกปุ่มเป็นปุ่มเด่นเต็มสีในหน้าเดียว">
        <Button>ยืนยัน</Button>
        <Button>ล้างค่า</Button>
        <Button>รีเซ็ต</Button>
      </Dont>
      <Do text="ใช้ปุ่มตระกูล error กับการกระทำที่ทำลาย เช่น ลบ">
        <Button family="error" leftIcon="delete">ลบรายการ</Button>
      </Do>
      <Dont text="อย่าใช้ปุ่มแบรนด์กับการลบ ผู้ใช้แยกอันตรายไม่ออก">
        <Button family="brand" leftIcon="delete">ลบรายการ</Button>
      </Dont>
    </DoDont>
  ),
}

// ── ตัวอย่างเพิ่มเติม ─────────────────────────────────────────
export const FullWidth: Story = {
  tags: ['!dev'],
  name: 'ยืดเต็มความกว้าง',
  args: { fullWidth: true },
  parameters: { docs: { description: { story: 'fullWidth ยืดปุ่มเต็มกล่องแม่ ใช้กับฟอร์มบนมือถือ' } } },
}

// ── 2 ชนิดจริงจากไฟล์ออกแบบ (เมนู sidebar สำหรับลองเล่นแต่ละชนิด) ──────────
// semi-rounded-button ไม่ต้องมีตรงนี้ เพราะ Default ด้านบนทำหน้าที่แทนอยู่แล้ว
export const PillButton: Story = { tags: ['!autodocs'], name: 'Pill-button', args: { shape: 'pill' } }
