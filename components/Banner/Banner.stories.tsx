import type { Meta, StoryObj } from '@storybook/react-vite'
import { Banner, type BannerSize, type BannerType } from './Banner'
import { Preview, Labeled, DoDont, Do, Dont } from '../../.storybook/docs-blocks'

// หน้า Docs จัดกลุ่ม story ตาม parameters.docs.section ดูกติกาที่ .storybook/CustomDocsPage.tsx
// ไฟล์ออกแบบหน้า 19 มีชุดเดียวคือ banner (2 ระดับ x 5 ชนิด x 5 ขนาด)
const meta: Meta<typeof Banner> = {
  title: 'Components/Banner',
  component: Banner,
  tags: ['autodocs'],
  args: {
    title: 'ปรับปรุงระบบชั่วคราว',
    description: 'ระบบจะปิดปรับปรุงวันนี้เวลา 22:00 ถึง 23:00 น.',
    type: 'warning',
    level: 'page',
    size: 'md',
    showIcon: true,
    showDescription: true,
  },
  parameters: {
    docs: {
      sectionNotes: {
        สถานะ: 'แถบแจ้งไม่มีสถานะ hover หรือ disabled ของตัวเอง เพราะเป็นข้อความคงอยู่ในหน้า ปุ่มปิดกับปุ่มกระทำข้างในมีสถานะของตัวเอง',
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof Banner>

const controls = (include: string[]) => ({ controls: { include } })
const BANNER = ['title', 'description', 'type', 'level', 'size', 'showIcon', 'showDescription', 'showAction', 'showClose', 'icon', 'closeLabel']

export const Default: Story = { name: 'Banner', parameters: controls(BANNER) }

// ── ส่วนประกอบ ──────────────────────────────────────────────
export const Anatomy: Story = {
  tags: ['!dev'],
  name: 'ส่วนประกอบทั้งหมด',
  args: { showAction: true, showClose: true, action: { label: 'ดูรายละเอียด', onClick: () => {} }, onClose: () => {} },
  parameters: { docs: { section: 'ส่วนประกอบ', description: { story: 'แถบแจ้งประกอบด้วย ไอคอนบอกชนิด หัวข้อ (ต้องมีเสมอ) ข้อความรอง ปุ่มกระทำ (LinkButton) และปุ่มปิด โครงเดียวกับ Toast แต่กว้างเต็มแถวและไม่มีเงา' } } },
}

// ── ชุด ─────────────────────────────────────────────────────
const TYPES: BannerType[] = ['default', 'brand', 'error', 'warning', 'success']
export const AllTypes: Story = {
  tags: ['!dev'],
  name: '5 ชนิด',
  parameters: { docs: { section: 'ชุด' } },
  render: () => (
    <Preview column>
      {TYPES.map((type) => (
        <Labeled key={type} label={type}><Banner type={type} title="หัวข้อแถบแจ้ง" description="คำอธิบายเพิ่มเติมของแถบแจ้งในหน้า" /></Labeled>
      ))}
    </Preview>
  ),
}
export const Levels: Story = {
  tags: ['!dev'],
  name: 'ระดับ page กับ section',
  parameters: { docs: { section: 'ชุด', description: { story: 'page วางเต็มความกว้างของหน้า ไม่มีมุมโค้ง section วางในกล่องเนื้อหา มีมุมโค้งตามขนาด' } } },
  render: () => (
    <Preview column>
      <Labeled label="page"><Banner level="page" type="brand" title="ฟีเจอร์ใหม่พร้อมใช้งาน" description="คำอธิบายเพิ่มเติมของแถบแจ้งในหน้า" /></Labeled>
      <Labeled label="section"><Banner level="section" type="brand" title="ฟีเจอร์ใหม่พร้อมใช้งาน" description="คำอธิบายเพิ่มเติมของแถบแจ้งในหน้า" /></Labeled>
    </Preview>
  ),
}

// ── ขนาด ────────────────────────────────────────────────────
const SIZES: BannerSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
export const Sizes: Story = {
  tags: ['!dev'],
  name: 'ขนาด 5 ขั้น',
  parameters: { docs: { section: 'ขนาด', description: { story: 'ระยะขอบ 8 ถึง 24 ไอคอน 20 ถึง 28 ตามสูตรใน tokens/scale/banner.mjs ชุดเดียวกับ Toast' } } },
  render: () => (
    <Preview column>
      {SIZES.map((size) => (
        <Labeled key={size} label={size}><Banner size={size} level="section" type="warning" title="ปรับปรุงระบบชั่วคราว" description="ระบบจะปิดปรับปรุงวันนี้เวลา 22:00 ถึง 23:00 น." /></Labeled>
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
      <Do text="ใช้กับข้อมูลที่ต้องคงอยู่จนกว่าจะแก้หรือหมดเหตุ เช่น ระบบจะปิดปรับปรุง">
        <Banner level="section" type="warning" title="ปรับปรุงระบบชั่วคราว" description="ระบบจะปิดปรับปรุงวันนี้เวลา 22:00 ถึง 23:00 น." />
      </Do>
      <Dont text="ใช้ยืนยันสิ่งที่เพิ่งทำเสร็จ แบบนั้นควรเป็น Toast ที่หายเอง">
        <Banner level="section" type="success" title="บันทึกข้อมูลสำเร็จ" showDescription={false} />
      </Dont>
      <Do text="แถบระดับ page มีได้ครั้งละหนึ่งแถบ อยู่บนสุดของหน้า">
        <Banner level="page" type="brand" title="ฟีเจอร์ใหม่พร้อมใช้งาน" showDescription={false} />
      </Do>
      <Dont text="วางแถบซ้อนกันหลายแถบ ผู้ใช้จะไม่รู้ว่าอันไหนสำคัญ">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}>
          <Banner level="page" type="error" title="เกิดข้อผิดพลาด" showDescription={false} />
          <Banner level="page" type="warning" title="ปรับปรุงระบบ" showDescription={false} />
          <Banner level="page" type="brand" title="ฟีเจอร์ใหม่" showDescription={false} />
        </div>
      </Dont>
    </DoDont>
  ),
}
