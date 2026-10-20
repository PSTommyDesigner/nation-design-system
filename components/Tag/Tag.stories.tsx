import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tag, type TagFamily, type TagSize } from './Tag'
import { Icon } from '../Icon'
import { Preview, Labeled, DoDont, Do, Dont } from '../../.storybook/docs-blocks'

// หน้า Docs จัดกลุ่ม story ตาม parameters.docs.section (ส่วนประกอบ · ชุด · ขนาด · สถานะ · ควรไม่ควร)
// ดูกติกาที่ .storybook/CustomDocsPage.tsx
const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  tags: ['autodocs'],
  args: { children: 'การเมือง', family: 'brand', hierarchy: 'primary', size: 'md' },
}
export default meta

type Story = StoryObj<typeof Tag>

export const Default: Story = {}

// ── ส่วนประกอบ ──────────────────────────────────────────────
export const Anatomy: Story = {
  name: 'ส่วนประกอบทั้งหมด',
  args: { leftIcon: <Icon name="star" size="100%" />, closable: true },
  parameters: {
    docs: {
      section: 'ส่วนประกอบ',
      description: { story: 'แท็กประกอบด้วย 3 ส่วน คือ ไอคอนนำหน้า (leftIcon) ข้อความ (children) และปุ่มปิด (closable) ไอคอนกับปุ่มปิดเป็นส่วนเสริม ใส่หรือไม่ใส่ก็ได้ ข้อความเป็นส่วนที่ต้องมีเสมอ ยกเว้นโหมดไอคอนล้วน' },
    },
  },
}
export const WithLeftIcon: Story = {
  name: 'ไอคอนนำหน้า',
  args: { leftIcon: <Icon name="star" size="100%" /> },
  parameters: { docs: { section: 'ส่วนประกอบ' } },
}
export const Closable: Story = {
  name: 'ปุ่มปิด',
  args: { closable: true },
  parameters: { docs: { section: 'ส่วนประกอบ' } },
}
export const WithNumber: Story = {
  name: 'ตัวเลขนำหน้า',
  args: { leading: 'number', count: 12, children: 'แจ้งเตือน' },
  parameters: { docs: { section: 'ส่วนประกอบ' } },
}
export const IconOnly: Story = {
  name: 'ไอคอนล้วน',
  args: { children: undefined, iconOnly: true, icon: <Icon name="close" size="100%" />, label: 'ปิด' },
  parameters: { docs: { section: 'ส่วนประกอบ' } },
}

// ── ชุด ─────────────────────────────────────────────────────
const FAMILIES: TagFamily[] = [
  'brand', 'neutral', 'red', 'green', 'yellow', 'cyan', 'blue', 'purple', 'pink', 'bamboo', 'brown',
]

export const AllFamilies: Story = {
  name: 'ตระกูลสี 11 ตระกูล',
  parameters: { docs: { section: 'ชุด' } },
  render: () => (
    <Preview>
      {FAMILIES.map((family) => (
        <Tag key={family} family={family}>
          {family}
        </Tag>
      ))}
    </Preview>
  ),
}
export const Hierarchies: Story = {
  name: 'ลำดับชั้น primary กับ secondary',
  parameters: {
    docs: {
      section: 'ชุด',
      description: { story: 'primary พื้นทึบใช้เมื่อแท็กเป็นจุดเด่นของบรรทัด secondary พื้นโปร่งมีขอบ ใช้เมื่อมีแท็กหลายใบอยู่ด้วยกัน' },
    },
  },
  render: () => (
    <Preview>
      <Labeled label="primary"><Tag hierarchy="primary">การเมือง</Tag></Labeled>
      <Labeled label="secondary"><Tag hierarchy="secondary">การเมือง</Tag></Labeled>
    </Preview>
  ),
}
export const Shapes: Story = {
  name: 'ทรง 4 แบบ',
  parameters: { docs: { section: 'ชุด' } },
  render: () => (
    <Preview>
      <Labeled label="semi-rounded"><Tag shape="semi-rounded">การเมือง</Tag></Labeled>
      <Labeled label="pill"><Tag shape="pill">การเมือง</Tag></Labeled>
      <Labeled label="circular"><Tag shape="circular" iconOnly icon={<Icon name="close" size="100%" />} label="ปิด">ปิด</Tag></Labeled>
      <Labeled label="link"><Tag shape="link">#เศรษฐกิจ</Tag></Labeled>
    </Preview>
  ),
}
export const Secondary: Story = { args: { hierarchy: 'secondary' }, parameters: { docs: { section: 'ชุด' } } }
export const Pill: Story = { args: { shape: 'pill' }, parameters: { docs: { section: 'ชุด' } } }
export const LinkStyle: Story = { args: { shape: 'link', children: '#เศรษฐกิจ' }, parameters: { docs: { section: 'ชุด' } } }

// ── ขนาด ────────────────────────────────────────────────────
const SIZES: TagSize[] = ['xs', 'sm', 'md', 'lg', 'xl']

export const Sizes: Story = {
  name: 'ขนาด 5 ขั้น',
  parameters: {
    docs: {
      section: 'ขนาด',
      description: { story: 'ขนาดคุมด้วยสูตรใน tokens/scale/tag.mjs ความสูงกับช่องไฟไล่ตามขั้นเดียวกันทุกตระกูลและทุกทรง' },
    },
  },
  render: () => (
    <Preview>
      {SIZES.map((size) => (
        <Labeled key={size} label={size}>
          <Tag size={size} leftIcon={<Icon name="star" size="100%" />} closable>การเมือง</Tag>
        </Labeled>
      ))}
    </Preview>
  ),
}

// ── สถานะ ───────────────────────────────────────────────────
export const States: Story = {
  name: 'ปกติ กดได้ และ disabled',
  parameters: {
    docs: {
      section: 'สถานะ',
      description: { story: 'แท็กที่ส่ง onSelect จะรับโฟกัสและกดได้ ลองเอาเมาส์ชี้ (hover) หรือกด Tab (focus) ที่ตัวอย่างได้เลย สถานะเหล่านี้เกิดจากการใช้งานจริง จึงไม่ทำเป็นภาพนิ่ง ส่วน disabled ปิดทั้งการกดและปุ่มปิด' },
    },
  },
  render: () => (
    <Preview>
      <Labeled label="ปกติ"><Tag>การเมือง</Tag></Labeled>
      <Labeled label="กดได้ (ชี้ / Tab)"><Tag onSelect={() => undefined}>การเมือง</Tag></Labeled>
      <Labeled label="disabled"><Tag disabled closable>การเมือง</Tag></Labeled>
    </Preview>
  ),
}

// ── ควรไม่ควร ───────────────────────────────────────────────
export const GoodAndBad: Story = {
  name: 'ควรและไม่ควร',
  parameters: { docs: { section: 'ควรไม่ควร' } },
  render: () => (
    <DoDont>
      <Do text="ใช้คำสั้น 1 ถึง 2 คำ เช่น หมวดข่าวหรือคำค้น ให้กวาดตาอ่านทีละหลายใบได้">
        <Tag>การเมือง</Tag>
        <Tag>เศรษฐกิจ</Tag>
        <Tag>กีฬา</Tag>
      </Do>
      <Dont text="ยัดประโยคยาวลงในแท็ก แท็กไม่ตัดบรรทัด ข้อความจะยืดจนหน้าตาเหมือนปุ่ม">
        <Tag>ข่าวการเมืองประจำวันนี้ทั้งหมดที่ควรอ่าน</Tag>
      </Dont>
      <Do text="ใส่ปุ่มปิดเฉพาะแท็กที่ผู้ใช้เอาออกได้จริง เช่น ตัวกรองที่เลือกไว้">
        <Tag closable>กรุงเทพ</Tag>
        <Tag closable>วันนี้</Tag>
      </Do>
      <Dont text="ใส่ปุ่มปิดกับแท็กที่เป็นแค่ป้ายบอกหมวด ผู้ใช้กดแล้วไม่เกิดอะไรจะงง">
        <Tag closable>การเมือง</Tag>
      </Dont>
      <Do text="ใช้ตระกูลสีเดียวกันทั้งกลุ่มเมื่อแท็กมีความหมายระดับเดียวกัน">
        <Tag hierarchy="secondary">การเมือง</Tag>
        <Tag hierarchy="secondary">เศรษฐกิจ</Tag>
      </Do>
      <Dont text="สลับสีทุกใบโดยไม่มีความหมาย สีจะกลายเป็นของตกแต่งแทนที่จะสื่อหมวด">
        <Tag family="red">การเมือง</Tag>
        <Tag family="yellow">เศรษฐกิจ</Tag>
        <Tag family="purple">กีฬา</Tag>
      </Dont>
    </DoDont>
  ),
}
