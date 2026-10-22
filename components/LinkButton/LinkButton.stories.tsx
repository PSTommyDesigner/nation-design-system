import type { Meta, StoryObj } from '@storybook/react-vite'
import { LinkButton, type LinkButtonFamily } from './LinkButton'
import type { ButtonSize } from '../Button'
import { Preview, Labeled, DoDont, Do, Dont } from '../../.storybook/docs-blocks'

// หน้า Docs จัดกลุ่ม story ตาม parameters.docs.section (ส่วนประกอบ · ชุด · ขนาด · สถานะ · ควรไม่ควร)
// ดูกติกาที่ .storybook/CustomDocsPage.tsx · โครงเดียวกับ Button
// sidebar เหลือเฉพาะชื่อชุดจริงในไฟล์ออกแบบ (link-button กับ link-icon-button)
const meta: Meta<typeof LinkButton> = {
  title: 'Components/LinkButton',
  component: LinkButton,
  tags: ['autodocs'],
  args: { children: 'อ่านข่าวทั้งหมด', family: 'brand', size: 'md' },
}
export default meta

type Story = StoryObj<typeof LinkButton>

// แผง Controls ของ story แต่ละชนิดให้เหลือเฉพาะ prop ที่ชนิดนั้นมีจริงในไฟล์ออกแบบ
// (หัวหน้าทัก 2026-10-22 ว่า Semi-rounded-tag มี checked ของชนิด checkbox ติดมาด้วย)
// prop ที่กำหนดชนิด (shape / leading / iconOnly) ไม่โชว์ เพราะ story คือชนิดนั้นอยู่แล้ว
const controls = (include: string[]) => ({ controls: { include } })

const LINK_BUTTON = ['children', 'family', 'size', 'defaultGray', 'leftIcon', 'rightIcon', 'href', 'disabled']
const LINK_ICON_BUTTON = ['leftIcon', 'label', 'family', 'size', 'defaultGray', 'href', 'disabled']

// Default = ชุด link-button ในไฟล์ออกแบบ (render เป็น button เมื่อไม่ส่ง href)
export const Default: Story = { name: 'Link-button', parameters: controls(LINK_BUTTON) }

// ── ส่วนประกอบ ──────────────────────────────────────────────
export const Anatomy: Story = {
  tags: ['!dev'],
  name: 'ส่วนประกอบทั้งหมด',
  args: { leftIcon: 'arrow-left', rightIcon: 'arrow-right' },
  parameters: {
    docs: {
      section: 'ส่วนประกอบ',
      description: { story: 'ปุ่มแบบลิงก์ไม่มีพื้นไม่มีขอบ มีข้อความ (children) ไอคอนซ้าย (leftIcon) และไอคอนขวา (rightIcon) ถ้าไม่ส่งข้อความจะกลายเป็นชุด link-icon-button ซึ่งต้องส่ง label แทน' },
    },
  },
}
export const IconOnly: Story = {
  tags: ['!dev'],
  name: 'ไอคอนล้วน',
  args: { children: undefined, leftIcon: 'close', label: 'ปิด' },
  parameters: { docs: { section: 'ส่วนประกอบ' } },
}

// ── ชุด ─────────────────────────────────────────────────────
const FAMILIES: LinkButtonFamily[] = ['brand', 'neutral', 'error']

export const AllFamilies: Story = {
  tags: ['!dev'],
  name: 'ตระกูลสี 3 ตระกูล',
  parameters: {
    docs: {
      section: 'ชุด',
      description: { story: 'brand neutral error ตรงกับ 3 ตระกูลที่มีชุดปุ่มลิงก์ในไฟล์ออกแบบ ตระกูล alpha ไม่มีปุ่มลิงก์' },
    },
  },
  render: () => (
    <Preview>
      {FAMILIES.map((family) => (
        <Labeled key={family} label={family}>
          <LinkButton family={family} rightIcon="arrow-right">อ่านข่าวทั้งหมด</LinkButton>
        </Labeled>
      ))}
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
      description: { story: 'ความสูงของปุ่มลิงก์มาจากความสูงบรรทัดของ text style ไม่ใช่สูตร เพราะไม่มีพื้นไม่มีขอบ ไอคอนใช้บันไดเดียวกับปุ่มข้อความ' },
    },
  },
  render: () => (
    <Preview>
      {SIZES.map((size) => (
        <Labeled key={size} label={size}>
          <LinkButton size={size} rightIcon="arrow-right">อ่านข่าวทั้งหมด</LinkButton>
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
      description: { story: 'hover กับ focused มาจาก pseudo-class ของ CSS ชี้เมาส์หรือกด Tab ที่ตัวอย่างเพื่อดู disabled ใช้ได้เฉพาะตอน render เป็น button เพราะ a ไม่มี attribute นี้' },
    },
  },
  render: () => (
    <Preview>
      <Labeled label="default"><LinkButton>อ่านข่าวทั้งหมด</LinkButton></Labeled>
      <Labeled label="disabled"><LinkButton disabled>อ่านข่าวทั้งหมด</LinkButton></Labeled>
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
      <Labeled label="brand"><LinkButton family="brand" defaultGray>อ่านข่าวทั้งหมด</LinkButton></Labeled>
      <Labeled label="error"><LinkButton family="error" defaultGray>ลบรายการ</LinkButton></Labeled>
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
      <Do text="การกระทำรองใช้ปุ่มลิงก์ เพื่อลดการแย่งสายตาจากปุ่มเด่น">
        <LinkButton rightIcon="arrow-right">อ่านข่าวทั้งหมด</LinkButton>
      </Do>
      <Dont text="อย่าใช้ปุ่มลิงก์หลายปุ่มสีต่างกันเรียงติดกันจนไม่รู้ว่าอันไหนสำคัญ">
        <LinkButton family="brand">บันทึก</LinkButton>
        <LinkButton family="error">ลบ</LinkButton>
        <LinkButton family="neutral">ยกเลิก</LinkButton>
      </Dont>
      <Do text="ใช้ตระกูล error กับการกระทำที่ทำลาย เช่น ลบ">
        <LinkButton family="error" leftIcon="delete">ลบรายการ</LinkButton>
      </Do>
      <Dont text="อย่าใช้ตระกูลแบรนด์กับการลบ ผู้ใช้แยกอันตรายไม่ออก">
        <LinkButton family="brand" leftIcon="delete">ลบรายการ</LinkButton>
      </Dont>
    </DoDont>
  ),
}

// ── ตัวอย่างเพิ่มเติม ─────────────────────────────────────────
export const AsAnchor: Story = {
  tags: ['!dev'],
  name: 'render เป็นลิงก์จริง',
  args: { href: '#' },
  parameters: { docs: { description: { story: 'ส่ง href แล้วจะ render เป็น a ให้อัตโนมัติ ใช้ตอนพาไปหน้าอื่น ไม่ส่งก็เป็น button สำหรับการกระทำในหน้าเดียวกัน' } } },
}

// ── 2 ชนิดจริงจากไฟล์ออกแบบ (เมนู sidebar สำหรับลองเล่นแต่ละชนิด) ──────────
// link-button ไม่ต้องมีตรงนี้ เพราะ Default ด้านบนทำหน้าที่แทนอยู่แล้ว
export const LinkIconButton: Story = { tags: ['!autodocs'], name: 'Link-icon-button', args: { children: undefined, leftIcon: 'close', label: 'ปิด' }, parameters: controls(LINK_ICON_BUTTON) }
