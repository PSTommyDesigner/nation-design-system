import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge, type BadgeFamily, type BadgeHierarchy, type BadgeSize } from './Badge'
import { Preview, Labeled, DoDont, Do, Dont } from '../../.storybook/docs-blocks'

// หน้า Docs จัดกลุ่ม story ตาม parameters.docs.section (ส่วนประกอบ · ชุด · ขนาด · สถานะ · ควรไม่ควร)
// ดูกติกาที่ .storybook/CustomDocsPage.tsx
const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: { children: 'ด่วน', family: 'brand', hierarchy: 'primary', size: 'md' },
  // quaternary เป็นค่าเก่าในโค้ด ไฟล์ออกแบบแยกไปเป็นชุด link-badge แล้ว (2026-09-22) จึงไม่โชว์ในแผง Controls
  argTypes: { hierarchy: { options: ['primary', 'secondary', 'tertiary'] } },
  parameters: {
    docs: {
      // ป้ายเป็นของแสดงผลอย่างเดียว ไม่มีของจริงให้โชว์ในหัวข้อสถานะ จึงเขียนเหตุผลแทนตามกฎ 8.5
      sectionNotes: {
        สถานะ: 'ป้ายไม่มีสถานะ เพราะเป็นของแสดงผลอย่างเดียว กดไม่ได้ รับโฟกัสไม่ได้ จึงไม่มี hover focus หรือ disabled ถ้าต้องการชิ้นที่กดได้ให้ใช้ Tag แทน',
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof Badge>

// แผง Controls ของ story แต่ละชนิดให้เหลือเฉพาะ prop ที่ชนิดนั้นมีจริงในไฟล์ออกแบบ
// (หัวหน้าทัก 2026-10-22 ว่า Semi-rounded-tag มี checked ของชนิด checkbox ติดมาด้วย)
// prop ที่กำหนดชนิด (shape / leading / iconOnly) ไม่โชว์ เพราะ story คือชนิดนั้นอยู่แล้ว
const controls = (include: string[]) => ({ controls: { include } })

const TEXT_BADGE = ['children', 'family', 'hierarchy', 'size', 'trailingIcon']
const ICON_BADGE = ['family', 'hierarchy', 'size', 'icon', 'label']
const LINK_BADGE = ['children', 'family', 'size', 'trailingIcon'] // ชุด link-badge ไม่มีแกน hierarchy

// Default = ชุด semi-rounded-badge ในไฟล์ออกแบบ (เรนเดอร์เหมือนกันเป๊ะ จึงรวมเป็น story เดียว แบบเดียวกับ Tag)
export const Default: Story = { name: 'Semi-rounded-badge', parameters: controls(TEXT_BADGE) }

// ── ส่วนประกอบ ──────────────────────────────────────────────
export const Anatomy: Story = {
  tags: ['!dev'],
  name: 'ส่วนประกอบทั้งหมด',
  args: { trailingIcon: 'chevron-right' },
  parameters: {
    docs: {
      section: 'ส่วนประกอบ',
      description: { story: 'ป้ายประกอบด้วย 2 ส่วน คือ ข้อความ (children) กับไอคอนท้ายข้อความ (trailingIcon) ไอคอนเป็นส่วนเสริม ถ้าไม่ส่งข้อความแต่ส่ง icon จะกลายเป็นป้ายไอคอนล้วน' },
    },
  },
}
export const IconOnly: Story = {
  tags: ['!dev'],
  name: 'ไอคอนล้วน',
  args: { children: undefined, icon: 'check', shape: 'circular', family: 'brand', label: 'ยืนยันแล้ว' },
  parameters: { docs: { section: 'ส่วนประกอบ' } },
}

// ── ชุด ─────────────────────────────────────────────────────
const FAMILIES: BadgeFamily[] = [
  'brand', 'neutral', 'red', 'green', 'yellow', 'cyan', 'blue', 'purple', 'pink', 'bamboo', 'brown',
]
const HIERARCHIES: BadgeHierarchy[] = ['primary', 'secondary', 'tertiary', 'quaternary']

export const AllFamilies: Story = {
  tags: ['!dev'],
  name: 'ตระกูลสี 11 ตระกูล',
  parameters: { docs: { section: 'ชุด' } },
  render: () => (
    <Preview>
      {FAMILIES.map((family) => (
        <Badge key={family} family={family} hierarchy="secondary">
          {family}
        </Badge>
      ))}
    </Preview>
  ),
}
export const Hierarchies: Story = {
  tags: ['!dev'],
  name: 'ลำดับชั้น 4 ขั้น',
  parameters: {
    docs: {
      section: 'ชุด',
      description: { story: 'ไล่จากเด่นสุดไปเบาสุด primary พื้นทึบ secondary พื้นอ่อน tertiary พื้นโปร่งมีขอบ quaternary ข้อความล้วน' },
    },
  },
  render: () => (
    <Preview>
      {HIERARCHIES.map((hierarchy) => (
        <Labeled key={hierarchy} label={hierarchy}>
          <Badge hierarchy={hierarchy}>ด่วน</Badge>
        </Labeled>
      ))}
    </Preview>
  ),
}
export const Shapes: Story = {
  tags: ['!dev'],
  name: 'ทรง 4 แบบ',
  parameters: { docs: { section: 'ชุด' } },
  render: () => (
    <Preview>
      <Labeled label="semi-rounded"><Badge shape="semi-rounded">ด่วน</Badge></Labeled>
      <Labeled label="pill"><Badge shape="pill">ด่วน</Badge></Labeled>
      <Labeled label="circular"><Badge shape="circular" icon="check" label="ยืนยันแล้ว" /></Labeled>
      <Labeled label="link"><Badge shape="link" family="blue">อ่านต่อ</Badge></Labeled>
    </Preview>
  ),
}
export const Secondary: Story = { tags: ['!dev'], args: { hierarchy: 'secondary' }, parameters: { docs: { section: 'ชุด' } } }
export const Tertiary: Story = { tags: ['!dev'], args: { hierarchy: 'tertiary' }, parameters: { docs: { section: 'ชุด' } } }
export const Pill: Story = { tags: ['!dev'], args: { shape: 'pill', hierarchy: 'secondary' }, parameters: { docs: { section: 'ชุด' } } }
export const LinkStyle: Story = {
  tags: ['!dev'],
  args: { shape: 'link', children: 'อ่านต่อ' },
  parameters: { docs: { section: 'ชุด' } },
}

// ── ขนาด ────────────────────────────────────────────────────
const SIZES: BadgeSize[] = ['xs', 'sm', 'md', 'lg', 'xl']

export const Sizes: Story = {
  tags: ['!dev'],
  name: 'ขนาด 5 ขั้น',
  parameters: {
    docs: {
      section: 'ขนาด',
      description: { story: 'ขนาดคุมด้วยสูตรใน tokens/scale/badge.mjs ความสูงกับช่องไฟไล่ตามขั้นเดียวกันทุกตระกูลและทุกทรง' },
    },
  },
  render: () => (
    <Preview>
      {SIZES.map((size) => (
        <Labeled key={size} label={size}>
          <Badge size={size} trailingIcon="chevron-right">ด่วน</Badge>
        </Labeled>
      ))}
    </Preview>
  ),
}

// ── ควรไม่ควร ───────────────────────────────────────────────
export const GoodAndBad: Story = {
  tags: ['!dev'],
  name: 'ควรและไม่ควร',
  // ตัวอย่างในหัวข้อนี้ประกอบจากหลายชิ้นย่อยในบล็อกเดียว ไม่ใช่การพรีวิวการใช้งาน component
  // ตัวเดียวแบบหัวข้ออื่น จึงไม่ต้องมีกล่องโค้ด (หัวหน้าสั่ง 2026-10-20)
  parameters: { docs: { section: 'ควรไม่ควร', hideCode: true } },
  render: () => (
    <DoDont>
      <Do text="ใช้ป้ายบอกสถานะหรือความสำคัญของเนื้อหา เช่น ด่วน ใหม่ ไลฟ์ คำเดียวจบ">
        <Badge family="red">ด่วน</Badge>
        <Badge family="green">ใหม่</Badge>
        <Badge family="brand">ไลฟ์</Badge>
      </Do>
      <Dont text="ใช้ป้ายแทนปุ่มหรือแท็กที่กดได้ ป้ายกดไม่ได้ ผู้ใช้จะกดแล้วไม่เกิดอะไร">
        <Badge>ดูทั้งหมด</Badge>
      </Dont>
      <Do text="ผูกสีกับความหมายเดิมทุกที่ เช่น แดงคือด่วน เขียวคือใหม่ ผู้ใช้จะจำได้โดยไม่ต้องอ่าน">
        <Badge family="red">ด่วน</Badge>
        <Badge family="red" hierarchy="secondary">ด่วน</Badge>
      </Do>
      <Dont text="ใช้สีเดียวกันกับความหมายต่างกัน หรือสลับสีของความหมายเดียวกันไปมา">
        <Badge family="red">ด่วน</Badge>
        <Badge family="red">ใหม่</Badge>
        <Badge family="green">ด่วน</Badge>
      </Dont>
    </DoDont>
  ),
}

// ── 5 ชนิดจริงจากไฟล์ออกแบบ (เมนู sidebar สำหรับลองเล่นแต่ละชนิด) ──────────
// แบบเดียวกับ Tag (หัวหน้าสั่ง 2026-10-21) เก็บเฉพาะชื่อชุดจริงใน tokens/figma-components.json
// ไว้ใน sidebar ส่วน story ภาพรวมด้านบนติด tag !dev ให้โชว์เฉพาะในหน้า Docs ไม่ซ้ำกันในเมนู
// semi-rounded-badge ไม่ต้องมีตรงนี้ เพราะ Default ด้านบนทำหน้าที่แทนอยู่แล้ว
export const PillBadge: Story = { tags: ['!autodocs'], name: 'Pill-badge', args: { shape: 'pill' }, parameters: controls(TEXT_BADGE) }
export const SemiRoundedIconBadge: Story = { tags: ['!autodocs'], name: 'Semi-rounded-icon-badge', args: { children: undefined, shape: 'semi-rounded', icon: 'check', label: 'ยืนยันแล้ว' }, parameters: controls(ICON_BADGE) }
export const CircularIconBadge: Story = { tags: ['!autodocs'], name: 'Circular-icon-badge', args: { children: undefined, shape: 'circular', icon: 'check', label: 'ยืนยันแล้ว' }, parameters: controls(ICON_BADGE) }
export const LinkBadge: Story = { tags: ['!autodocs'], name: 'Link-badge', args: { shape: 'link', children: 'อ่านต่อ' }, parameters: controls(LINK_BADGE) }
