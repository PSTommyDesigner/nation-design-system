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

export const Default: Story = { name: 'Tag' }

// ── ส่วนประกอบ ──────────────────────────────────────────────
export const Anatomy: Story = {
  name: 'Tag',
  args: { leftIcon: <Icon name="star" size="100%" />, closable: true },
  parameters: {
    docs: {
      title: 'ส่วนประกอบทั้งหมด',
      section: 'ส่วนประกอบ',
      description: { story: 'แท็กประกอบด้วย 3 ส่วน คือ ไอคอนนำหน้า (leftIcon) ข้อความ (children) และปุ่มปิด (closable) ไอคอนกับปุ่มปิดเป็นส่วนเสริม ใส่หรือไม่ใส่ก็ได้ ข้อความเป็นส่วนที่ต้องมีเสมอ ยกเว้นโหมดไอคอนล้วน' },
    },
  },
}
export const WithLeftIcon: Story = {
  name: 'Tag',
  args: { leftIcon: <Icon name="star" size="100%" /> },
  parameters: { docs: { title: 'ไอคอนนำหน้า', section: 'ส่วนประกอบ' } },
}
export const Closable: Story = {
  name: 'Tag',
  args: { closable: true },
  parameters: { docs: { title: 'ปุ่มปิด', section: 'ส่วนประกอบ' } },
}
export const WithNumber: Story = {
  name: 'Tag',
  args: { leading: 'number', count: 12, children: 'แจ้งเตือน' },
  parameters: { docs: { title: 'ตัวเลขนำหน้า', section: 'ส่วนประกอบ' } },
}
export const IconOnly: Story = {
  name: 'Tag',
  args: { children: undefined, iconOnly: true, icon: <Icon name="close" size="100%" />, label: 'ปิด' },
  parameters: { docs: { title: 'ไอคอนล้วน', section: 'ส่วนประกอบ' } },
}

// ── ชุด ─────────────────────────────────────────────────────
const FAMILIES: TagFamily[] = [
  'brand', 'neutral', 'red', 'green', 'yellow', 'cyan', 'blue', 'purple', 'pink', 'bamboo', 'brown',
]

export const AllFamilies: Story = {
  name: 'Tag',
  parameters: { docs: { title: 'ตระกูลสี 11 ตระกูล', section: 'ชุด' } },
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
  name: 'Tag',
  parameters: {
    docs: {
      title: 'ลำดับชั้น primary กับ secondary',
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
  name: 'Tag',
  parameters: { docs: { title: 'ทรง 4 แบบ', section: 'ชุด' } },
  render: () => (
    <Preview>
      <Labeled label="semi-rounded"><Tag shape="semi-rounded">การเมือง</Tag></Labeled>
      <Labeled label="pill"><Tag shape="pill">การเมือง</Tag></Labeled>
      <Labeled label="circular"><Tag shape="circular" iconOnly icon={<Icon name="close" size="100%" />} label="ปิด">ปิด</Tag></Labeled>
      <Labeled label="link"><Tag shape="link">#เศรษฐกิจ</Tag></Labeled>
    </Preview>
  ),
}
export const Secondary: Story = { name: 'Tag', args: { hierarchy: 'secondary' }, parameters: { docs: { title: 'Secondary', section: 'ชุด' } } }
export const Pill: Story = { name: 'Tag', args: { shape: 'pill' }, parameters: { docs: { title: 'Pill', section: 'ชุด' } } }
export const LinkStyle: Story = { name: 'Tag', args: { shape: 'link', children: '#เศรษฐกิจ' }, parameters: { docs: { title: 'Link Style', section: 'ชุด' } } }

// ── ขนาด ────────────────────────────────────────────────────
const SIZES: TagSize[] = ['xs', 'sm', 'md', 'lg', 'xl']

export const Sizes: Story = {
  name: 'Tag',
  parameters: {
    docs: {
      title: 'ขนาด 5 ขั้น',
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
  name: 'Tag',
  parameters: {
    docs: {
      title: 'ปกติ กดได้ และ disabled',
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
  name: 'Tag',
  // ตัวอย่างในหัวข้อนี้ประกอบจากหลายชิ้นย่อยในบล็อกเดียว ไม่ใช่การพรีวิวการใช้งาน component
  // ตัวเดียวแบบหัวข้ออื่น จึงไม่ต้องมีกล่องโค้ด (หัวหน้าสั่ง 2026-10-20)
  parameters: { docs: { title: 'ควรและไม่ควร', section: 'ควรไม่ควร', hideCode: true } },
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
