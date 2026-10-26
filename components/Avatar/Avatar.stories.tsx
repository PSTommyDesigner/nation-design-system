import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar, AvatarGroup, AvatarLabel, type AvatarSize } from './Avatar'
import { Preview, Labeled, DoDont, Do, Dont } from '../../.storybook/docs-blocks'

const IMG = (n: number) => `https://i.pravatar.cc/150?img=${n}`

// หน้า Docs จัดกลุ่ม story ตาม parameters.docs.section ดูกติกาที่ .storybook/CustomDocsPage.tsx
// ชื่อ story ใน sidebar ตรงกับชุดในไฟล์ออกแบบหน้า 11 (avatar-image, avatar-icon, avatar-monogram, avatar-number, avatar-label, avatar-group)
const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  args: { src: IMG(12), alt: 'รูปโปรไฟล์ของผู้ใช้', size: 'md' },
}
export default meta

type Story = StoryObj<typeof Avatar>

const controls = (include: string[]) => ({ controls: { include } })
const IMAGE = ['src', 'alt', 'size', 'status', 'statusLabel', 'interactive']
const ICON = ['size', 'status', 'statusLabel', 'interactive']
const MONOGRAM = ['name', 'initials', 'size', 'status', 'statusLabel', 'interactive']
const NUMBER = ['count', 'countLabel', 'size', 'status', 'statusLabel', 'interactive']

export const Default: Story = { name: 'Avatar-image', parameters: controls(IMAGE) }

// ── ส่วนประกอบ ──────────────────────────────────────────────
export const Anatomy: Story = {
  tags: ['!dev'],
  name: 'ส่วนประกอบทั้งหมด',
  args: { status: 'online', statusLabel: 'ออนไลน์อยู่' },
  parameters: { docs: { section: 'ส่วนประกอบ', description: { story: 'อวาตาร์ประกอบด้วย วงกลมที่มีวงแหวนรอบ (ต้องมีเสมอ) เนื้อใน (รูป ไอคอน อักษรย่อ หรือตัวเลข) และจุดสถานะมุมล่างขวา (status) ที่มีขอบของตัวเอง' } } },
}
export const LabelExample: Story = {
  tags: ['!dev'],
  name: 'ป้ายชื่อ (AvatarLabel)',
  parameters: { docs: { section: 'ส่วนประกอบ', description: { story: 'วางอวาตาร์คู่กับชื่อและข้อความรอง (เช่น อีเมล) ตรงกับชุด avatar-label' } } },
  render: () => <AvatarLabel size="md" avatar={<Avatar src={IMG(8)} alt="ผู้เขียนข่าว" status="online" statusLabel="ออนไลน์อยู่" />} title="สมชาย ใจดี" supportingText="somchai@nationgroup.com" />,
}
export const GroupExample: Story = {
  tags: ['!dev'],
  name: 'กลุ่ม (AvatarGroup)',
  parameters: { docs: { section: 'ส่วนประกอบ', description: { story: 'เรียงอวาตาร์ซ้อนกัน แสดงไม่เกิน max แล้วยุบที่เหลือเป็นตัวเลข ตรงกับชุด avatar-group ซึ่งมี 3 ขนาด xs sm md' } } },
  render: () => (
    <AvatarGroup size="md" max={4}>
      <Avatar src={IMG(1)} alt="ผู้ใช้ 1" />
      <Avatar src={IMG(2)} alt="ผู้ใช้ 2" />
      <Avatar src={IMG(3)} alt="ผู้ใช้ 3" />
      <Avatar name="กข" />
      <Avatar name="คง" />
    </AvatarGroup>
  ),
}

// ── ชุด ─────────────────────────────────────────────────────
export const AllTypes: Story = {
  tags: ['!dev'],
  name: '4 แบบ',
  parameters: { docs: { section: 'ชุด', description: { story: 'image เมื่อมีรูป icon เมื่อไม่มีข้อมูล monogram ใช้อักษรย่อจากชื่อ number ใช้บอกจำนวนที่เหลือในกลุ่ม ทั้งสี่แบบใช้วงแหวนและจุดสถานะเดียวกัน' } } },
  render: () => (
    <Preview>
      <Labeled label="avatar-image"><Avatar src={IMG(12)} alt="รูปโปรไฟล์" /></Labeled>
      <Labeled label="avatar-icon"><Avatar alt="ผู้ใช้" /></Labeled>
      <Labeled label="avatar-monogram"><Avatar name="ทอมมี่ ดีไซเนอร์" /></Labeled>
      <Labeled label="avatar-number"><Avatar count={9} countLabel="อีก 9 คน" /></Labeled>
    </Preview>
  ),
}

// ── ขนาด ────────────────────────────────────────────────────
const SIZES: AvatarSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
export const Sizes: Story = {
  tags: ['!dev'],
  name: 'ขนาด 5 ขั้น',
  parameters: { docs: { section: 'ขนาด', description: { story: 'วงกลม 24 32 40 48 56 ตามสูตรใน tokens/scale/avatar.mjs อักษรย่อใช้ preset section-heading ตัวเลขใช้ title ของขั้นที่ตรงกัน' } } },
  render: () => (
    <Preview>
      {SIZES.map((size) => (
        <Labeled key={size} label={size}><Avatar name="Nation" size={size} status="online" statusLabel="ออนไลน์" /></Labeled>
      ))}
    </Preview>
  ),
}

// ── สถานะ ───────────────────────────────────────────────────
export const States: Story = {
  tags: ['!dev'],
  name: 'จุดสถานะ และกดได้',
  parameters: { docs: { section: 'สถานะ', description: { story: 'จุดสถานะมี online (เขียว) กับ offline (เทา) hover ใช้กับอวาตาร์ที่กดได้เท่านั้น (interactive) ลองเอาเมาส์ชี้ที่ตัวอย่างขวาสุด อวาตาร์เปล่า ๆ ไม่เปลี่ยนหน้าตา' } } },
  render: () => (
    <Preview>
      <Labeled label="online"><Avatar src={IMG(5)} alt="ผู้ใช้" status="online" statusLabel="ออนไลน์" /></Labeled>
      <Labeled label="offline"><Avatar src={IMG(6)} alt="ผู้ใช้" status="offline" statusLabel="ออฟไลน์" /></Labeled>
      <Labeled label="กดได้ (ชี้)"><Avatar name="ทอมมี่" interactive /></Labeled>
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
      <Do text="ส่ง alt ที่บอกว่าเป็นใคร เมื่อรูปคือข้อมูล และส่ง name ให้ระบบตัดอักษรย่อเอง">
        <Avatar src={IMG(12)} alt="สมชาย ใจดี" />
        <Avatar name="สมชาย ใจดี" />
      </Do>
      <Dont text="พิมพ์อักษรย่อเองเกิน 2 ตัว หรือใส่รูปที่ไม่ใช่คน เช่น โลโก้ ในอวาตาร์">
        <Avatar initials="สมชาย" />
      </Dont>
      <Do text="กลุ่มแสดงไม่เกิน 5 คน ที่เหลือยุบเป็นตัวเลข">
        <AvatarGroup size="sm" max={3}><Avatar src={IMG(1)} alt="1" /><Avatar src={IMG(2)} alt="2" /><Avatar src={IMG(3)} alt="3" /><Avatar name="กข" /><Avatar name="คง" /></AvatarGroup>
      </Do>
      <Dont text="ใช้จุดสถานะกับคนที่ไม่มีสถานะออนไลน์จริง เช่น ผู้เขียนข่าว">
        <Avatar src={IMG(8)} alt="ผู้เขียน" status="offline" statusLabel="ออฟไลน์" />
      </Dont>
    </DoDont>
  ),
}

// ── ชุดจริงจากไฟล์ออกแบบ (เมนู sidebar) ────────────────────
export const AvatarIcon: Story = { tags: ['!autodocs'], name: 'Avatar-icon', args: { src: undefined, alt: 'ผู้ใช้' }, parameters: controls(ICON) }
export const AvatarMonogram: Story = { tags: ['!autodocs'], name: 'Avatar-monogram', args: { src: undefined, name: 'ทอมมี่ ดีไซเนอร์' }, parameters: controls(MONOGRAM) }
export const AvatarNumber: Story = { tags: ['!autodocs'], name: 'Avatar-number', args: { src: undefined, count: 9, countLabel: 'อีก 9 คน' }, parameters: controls(NUMBER) }
export const AvatarLabelStory: Story = {
  tags: ['!autodocs'],
  name: 'Avatar-label',
  render: () => <AvatarLabel size="md" avatar={<Avatar src={IMG(8)} alt="ผู้เขียนข่าว" />} title="สมชาย ใจดี" supportingText="somchai@nationgroup.com" />,
}
export const AvatarGroupStory: Story = {
  tags: ['!autodocs'],
  name: 'Avatar-group',
  render: () => (
    <AvatarGroup size="md" max={4}>
      <Avatar src={IMG(1)} alt="ผู้ใช้ 1" /><Avatar src={IMG(2)} alt="ผู้ใช้ 2" /><Avatar src={IMG(3)} alt="ผู้ใช้ 3" /><Avatar name="กข" /><Avatar name="คง" />
    </AvatarGroup>
  ),
}
