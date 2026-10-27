import type { Meta, StoryObj } from '@storybook/react-vite'
import { Icon } from './Icon'
import { iconCategories, iconNames, type IconSize } from './icons'
import { IconGallery } from '../../.storybook/icon-gallery'
import { Preview, Labeled, DoDont, Do, Dont } from '../../.storybook/docs-blocks'

// หน้า Docs จัดกลุ่ม story ตาม parameters.docs.section ดูกติกาที่ .storybook/CustomDocsPage.tsx
// ชุดไอคอนไม่เข้ากรอบ 5 หัวข้อเต็ม หัวข้อชุดจึงเป็นแกลเลอรีค้นหา (ครบทุกตัว จัดตามหมวดของ icons.ts กดเพื่อคัดลอกชื่อ)
// ต้นฉบับคือ Nation UI Icons ในไฟล์ออกแบบหน้า 02 Icon เฟรม 9349:35444 ที่เดียว
const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
  args: { name: 'search', size: 'md', title: 'ค้นหา' },
  argTypes: { name: { control: 'select', options: iconNames } },
  parameters: {
    docs: {
      sectionNotes: {
        ส่วนประกอบ: 'ไอคอนเป็น svg เส้นทางเดียวเติมสีด้วย currentColor จึงรับสีจากข้อความรอบตัว ไม่มีส่วนประกอบย่อย ใส่ title เมื่อไอคอนสื่อความหมายเอง ไม่ใส่เมื่อมีข้อความข้างกันอยู่แล้ว',
        สถานะ: 'ไอคอนไม่มีสถานะของตัวเอง สี hover หรือ disabled มาจาก component ที่ครอบอยู่ เช่นปุ่มหรือลิงก์',
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof Icon>

const controls = (include: string[]) => ({ controls: { include } })
const ICON = ['name', 'size', 'title']
const SIZES: IconSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl']

export const Default: Story = { name: 'Icon', parameters: controls(ICON) }

// ── ชุด (แกลเลอรีค้นหา) ─────────────────────────────────────
export const Gallery: Story = {
  tags: ['!dev'],
  name: `Nation UI Icons ${iconNames.length} ตัว`,
  parameters: { docs: { section: 'ชุด', hideCode: true, description: { story: 'ไอคอนทุกตัวจัดตามหมวดเดียวกับ context/icons/icon-names.md พิมพ์ค้นหาจากชื่อ แล้วกดที่ไอคอนเพื่อคัดลอกชื่อไปใส่ name เลือกตามความหมาย ไม่ใช่ตามหน้าตา ถ้าไม่มีตัวที่ต้องการ ห้ามวาดเองหรือหยิบจากชุดอื่น ให้เสนอขอเพิ่มในไฟล์ออกแบบก่อน' } } },
  render: () => <IconGallery groups={iconCategories} renderIcon={(name) => <Icon name={name as never} size="md" />} placeholder="ค้นหาชื่อไอคอน เช่น arrow, check" />,
}

// ── ขนาด ────────────────────────────────────────────────────
export const Sizes: Story = {
  tags: ['!dev'],
  name: 'ขนาด 6 ขั้น',
  parameters: { docs: { section: 'ขนาด', description: { story: 'xs 16, sm 20, md 24, lg 32, xl 40, 2xl 48 จาก token --ntg-size-icon-* ค่าเริ่มต้นคือ lg ส่งตัวเลขหรือหน่วย CSS แทนได้เมื่อต้องพอดีกับช่องที่ component กำหนด' } } },
  render: () => (
    <Preview>
      {SIZES.map((size) => <Labeled key={size} label={size}><Icon name="star" size={size} /></Labeled>)}
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
      <Do text="ไอคอนที่สื่อความหมายเองใส่ title ให้โปรแกรมอ่านหน้าจออ่านได้ และเลือกตัวที่ความหมายตรงกับงาน">
        <Preview><Icon name="delete" size="md" title="ลบ" /><Icon name="edit" size="md" title="แก้ไข" /></Preview>
      </Do>
      <Dont text="ใช้ไอคอนตามหน้าตา เช่นเอา close แทนลบ หรือ cancel-circle แทนปิด คนอ่านความหมายผิด">
        <Preview><Icon name="close" size="md" title="ลบ" /><Icon name="cancel-circle" size="md" title="ปิด" /></Preview>
      </Dont>
      <Do text="ไอคอนรับสีจากข้อความรอบตัว (currentColor) จึงตั้งสีที่ตัวครอบหรือผ่าน token เท่านั้น">
        <span style={{ color: 'var(--ntg-color-foreground-system-error-primary)' }}><Icon name="favorite-fill" size="md" title="ชอบ" /></span>
      </Do>
      <Dont text="ใส่ไอคอนตัวใหญ่ข้างข้อความตัวเล็กจนบรรทัดโดด ขนาดไอคอนต้องใกล้เคียงความสูงบรรทัด">
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Icon name="info" size="2xl" /> <span>ข้อความช่วยเหลือ</span></span>
      </Dont>
    </DoDont>
  ),
}
