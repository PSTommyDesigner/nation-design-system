import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card, type CardSize } from './Card'
import { Preview, Labeled, DoDont, Do, Dont } from '../../.storybook/docs-blocks'

const IMG = 'https://picsum.photos/seed/nation/640/360'

// หน้า Docs จัดกลุ่ม story ตาม parameters.docs.section ดูกติกาที่ .storybook/CustomDocsPage.tsx
// ชื่อ story ใน sidebar ตรงกับชุดในไฟล์ออกแบบหน้า 27 ที่มีโค้ด (vertical-news-card, horizontal-news-card, news-list-card)
const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  args: {
    variant: 'vertical',
    size: 'md',
    src: IMG,
    alt: '',
    category: 'การเมือง',
    title: 'พาดหัวข่าวตัวอย่างสำหรับทดสอบการ์ด',
    lead: 'ความนำสั้น ๆ อธิบายเนื้อหาข่าวเพิ่มเติมอีกหนึ่งถึงสองบรรทัด',
    meta: '5 นาทีที่แล้ว',
  },
}
export default meta

type Story = StoryObj<typeof Card>

const controls = (include: string[]) => ({ controls: { include } })
const NEWS_CARD = ['size', 'category', 'title', 'lead', 'meta', 'src', 'href', 'titleLines', 'leadLines', 'responsive']
const LIST_CARD = ['category', 'title', 'lead', 'meta', 'src', 'href', 'imageTrailing']

export const Default: Story = { name: 'Vertical-news-card', parameters: controls(NEWS_CARD) }

// ── ส่วนประกอบ ──────────────────────────────────────────────
export const Anatomy: Story = {
  tags: ['!dev'],
  name: 'ส่วนประกอบทั้งหมด',
  args: { tag: <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: 999, background: 'var(--ntg-color-background-general-primary)', color: 'var(--ntg-color-text-brand-primary)', boxShadow: 'inset 0 0 0 1px var(--ntg-color-border-brand-primary)', font: '500 12px/18px Prompt' }}>MD</span> },
  parameters: { docs: { section: 'ส่วนประกอบ', description: { story: 'การ์ดข่าวประกอบด้วย รูป (16 ต่อ 9) กับป้ายบนรูป (tag) ชื่อหมวด (category) พาดหัว (title ต้องมีเสมอ) ความนำ (lead) และบรรทัดเวลา (meta)' } } },
}

// ── ชุด ─────────────────────────────────────────────────────
export const AllTypes: Story = {
  tags: ['!dev'],
  name: '3 ชุดที่มีโค้ด',
  parameters: { docs: { section: 'ชุด', description: { story: 'vertical-news-card รูปอยู่บน horizontal-news-card รูปอยู่ซ้าย (สลับขวาได้ด้วย imageTrailing) news-list-card เป็นกล่องมีขอบและเงาพร้อมรูปจัตุรัส 112 ส่วน video-list-card ใช้ชุดเดียวกับรายการข่าวบวกไอคอนเล่น ไฟล์ออกแบบยังมีการ์ดอีก 6 ชุดที่ยังไม่มีโค้ด' } } },
  render: () => (
    <Preview column>
      <Labeled label="vertical-news-card"><Card variant="vertical" size="sm" src={IMG} alt="" category="การเมือง" title="พาดหัวข่าวตัวอย่าง" lead="ความนำสั้น ๆ" meta="5 นาทีที่แล้ว" /></Labeled>
      <Labeled label="horizontal-news-card"><Card variant="horizontal" size="sm" src={IMG} alt="" category="การเมือง" title="พาดหัวข่าวตัวอย่าง" lead="ความนำสั้น ๆ" meta="5 นาทีที่แล้ว" /></Labeled>
      <Labeled label="news-list-card"><div style={{ width: 345 }}><Card variant="list" src={IMG} alt="" title="พาดหัวข่าวตัวอย่างสำหรับทดสอบการ์ด" meta="1 ม.ค. 2568 00:00" /></div></Labeled>
    </Preview>
  ),
}

// ── ขนาด ────────────────────────────────────────────────────
const SIZES: CardSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
export const Sizes: Story = {
  tags: ['!dev'],
  name: 'ขนาด 5 ขั้น',
  parameters: { docs: { section: 'ขนาด', description: { story: 'รูปกว้าง 184 ถึง 600 สูง 104 ถึง 336 (16 ต่อ 9) พาดหัวใช้ title/xs ถึง title/xl ตามไฟล์ออกแบบ การ์ดรายการมีขนาดเดียว' } } },
  render: () => (
    <Preview column>
      {SIZES.map((size) => (
        <Labeled key={size} label={size}><Card variant="horizontal" size={size} src={IMG} alt="" category="การเมือง" title="พาดหัวข่าวตัวอย่าง" lead={size === 'xs' ? undefined : 'ความนำสั้น ๆ อธิบายเนื้อหาข่าว'} meta="5 นาทีที่แล้ว" /></Labeled>
      ))}
    </Preview>
  ),
}

// ── สถานะ ───────────────────────────────────────────────────
export const States: Story = {
  tags: ['!dev'],
  name: 'การ์ดรายการที่เป็นลิงก์',
  parameters: { docs: { section: 'สถานะ', description: { story: 'การ์ดข่าวไม่มีสถานะ (เนื้อหาข้างในเป็นลิงก์เอง) การ์ดรายการที่ส่ง href จะมี hover (พื้นกับขอบเข้มขึ้น) และโฟกัส ลองเอาเมาส์ชี้ที่ตัวอย่าง' } } },
  render: () => (
    <Preview column>
      <Labeled label="ปกติ"><div style={{ width: 345 }}><Card variant="list" src={IMG} alt="" title="พาดหัวข่าวตัวอย่าง" meta="1 ม.ค. 2568 00:00" /></div></Labeled>
      <Labeled label="ลิงก์ (ชี้ / Tab)"><div style={{ width: 345 }}><Card variant="list" href="#" src={IMG} alt="" title="พาดหัวข่าวตัวอย่าง" meta="1 ม.ค. 2568 00:00" /></div></Labeled>
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
      <Do text="จำกัดบรรทัดพาดหัวกับความนำให้เท่ากันทั้งกริด การ์ดจะสูงเท่ากัน">
        <Card variant="vertical" size="xs" src={IMG} alt="" category="การเมือง" title="พาดหัวข่าวยาวมากที่ควรถูกตัดให้เหลือสองบรรทัดเพื่อให้กริดเท่ากัน" titleLines={2} meta="5 นาทีที่แล้ว" />
      </Do>
      <Dont text="ใส่รูปสัดส่วนอื่นในกรอบ 16 ต่อ 9 รูปจะถูกครอป หรือปล่อยพาดหัวยาวไม่จำกัด">
        <Card variant="vertical" size="xs" src="https://picsum.photos/seed/tall/360/640" alt="" category="การเมือง" title="พาดหัวข่าวยาวมากที่ไม่ถูกตัดเลยทำให้การ์ดสูงไม่เท่ากันในกริดเดียวกัน" meta="5 นาทีที่แล้ว" />
      </Dont>
    </DoDont>
  ),
}

// ── ชุดจริงจากไฟล์ออกแบบ (เมนู sidebar) ────────────────────
export const HorizontalNewsCard: Story = { tags: ['!autodocs'], name: 'Horizontal-news-card', args: { variant: 'horizontal' }, parameters: controls(NEWS_CARD) }
export const NewsListCard: Story = { tags: ['!autodocs'], name: 'News-list-card', args: { variant: 'list', lead: undefined, category: undefined, meta: '1 ม.ค. 2568 00:00' }, parameters: controls(LIST_CARD), render: (args) => <div style={{ width: 345 }}><Card {...args} /></div> }
