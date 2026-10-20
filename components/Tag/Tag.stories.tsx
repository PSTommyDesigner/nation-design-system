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
// 14 ชนิดจริงของ Tag (ตรวจจากไฟล์ออกแบบ 2026-10-20) หัวข้อ Variants ของหน้า 21 Tags
// เขียนว่า "11 ชนิด" แต่นับไม่ครบ ขาดกลุ่มไอคอนล้วน 3 ชุด (icon-tag, circular-icon-tag,
// link-icon-tag) ค้นข้อความทั้งเอกสารแล้วไม่พบคำว่า icon-tag เลยสักจุด จึงยึดของจริงจาก
// tokens/figma-components.json (figmaSets) แทนตัวเลขในเอกสารที่ยังไม่ได้แก้
// งานแก้ไฟล์ออกแบบเป็นคนละงาน พักไว้คุยทีหลังตามที่หัวหน้าสั่ง
export const AllTypes: Story = {
  name: '14 ชนิด',
  parameters: {
    docs: {
      section: 'ชุด',
      description: {
        story:
          'ข้อความทรงมุมมนและทรงแคปซูลมีส่วนนำหน้าได้ 5 แบบเท่ากัน (เปล่า ตัวเลข รูป checkbox indicator) บวกแท็กแบบลิงก์อีก 1 ชนิด รวมกลุ่มข้อความ 11 ชนิด ส่วนโหมดไอคอนล้วนมี 3 ทรง (มุมมน กลม ลิงก์) ไม่มีทรงแคปซูล รวมทั้งหมด 14 ชนิด',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Labeled label="ทรงมุมมน 5 ชนิด">
        <Preview>
          <Labeled label="เปล่า"><Tag shape="semi-rounded">การเมือง</Tag></Labeled>
          <Labeled label="ตัวเลข"><Tag shape="semi-rounded" leading="number" count={3}>แจ้งเตือน</Tag></Labeled>
          <Labeled label="รูป"><Tag shape="semi-rounded" leading="image" imageSrc="">การเมือง</Tag></Labeled>
          <Labeled label="checkbox"><Tag shape="semi-rounded" leading="checkbox" checked>การเมือง</Tag></Labeled>
          <Labeled label="indicator"><Tag shape="semi-rounded" leading="indicator">การเมือง</Tag></Labeled>
        </Preview>
      </Labeled>
      <Labeled label="ทรงแคปซูล 5 ชนิด">
        <Preview>
          <Labeled label="เปล่า"><Tag shape="pill">การเมือง</Tag></Labeled>
          <Labeled label="ตัวเลข"><Tag shape="pill" leading="number" count={3}>แจ้งเตือน</Tag></Labeled>
          <Labeled label="รูป"><Tag shape="pill" leading="image" imageSrc="">การเมือง</Tag></Labeled>
          <Labeled label="checkbox"><Tag shape="pill" leading="checkbox" checked>การเมือง</Tag></Labeled>
          <Labeled label="indicator"><Tag shape="pill" leading="indicator">การเมือง</Tag></Labeled>
        </Preview>
      </Labeled>
      <Labeled label="ลิงก์ 1 ชนิด">
        <Preview>
          <Labeled label="link"><Tag shape="link">#เศรษฐกิจ</Tag></Labeled>
        </Preview>
      </Labeled>
      <Labeled label="ไอคอนล้วน 3 ชนิด (ไม่มีทรงแคปซูล)">
        <Preview>
          <Labeled label="มุมมน"><Tag shape="semi-rounded" iconOnly icon={<Icon name="star" size="100%" />} label="รายการโปรด">{undefined}</Tag></Labeled>
          <Labeled label="กลม"><Tag shape="circular" iconOnly icon={<Icon name="close" size="100%" />} label="ปิด">{undefined}</Tag></Labeled>
          <Labeled label="ลิงก์"><Tag shape="link" iconOnly icon={<Icon name="close" size="100%" />} label="ปิด">{undefined}</Tag></Labeled>
        </Preview>
      </Labeled>
    </div>
  ),
}

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

export const DefaultGray: Story = {
  name: 'โหมดเทา',
  parameters: {
    docs: {
      section: 'สถานะ',
      description: {
        story:
          'ทุกตระกูลมีโหมดเทา (defaultGray) คือแสดงสีเทาตอนอยู่เฉยแล้วขึ้นสีตระกูลจริงตอนชี้ (ลองเอาเมาส์ชี้ที่ตัวอย่าง) ยกเว้นตระกูล brand กับ neutral ที่ไม่มีโหมดนี้ เพราะ brand เป็นสีหลักต้องเห็นชัดตลอด ส่วน neutral เป็นสีเทาอยู่แล้ว ส่ง defaultGray กับ neutral ได้แต่ไม่มีผล',
      },
    },
  },
  render: () => (
    <Preview>
      <Labeled label="red ปกติ"><Tag family="red">การเมือง</Tag></Labeled>
      <Labeled label="red โหมดเทา"><Tag family="red" defaultGray>การเมือง</Tag></Labeled>
      <Labeled label="blue ปกติ"><Tag family="blue" hierarchy="secondary">การเมือง</Tag></Labeled>
      <Labeled label="blue โหมดเทา"><Tag family="blue" hierarchy="secondary" defaultGray>การเมือง</Tag></Labeled>
    </Preview>
  ),
}

// ── ควรไม่ควร ───────────────────────────────────────────────
export const GoodAndBad: Story = {
  name: 'ควรและไม่ควร',
  // ตัวอย่างในหัวข้อนี้ประกอบจากหลายชิ้นย่อยในบล็อกเดียว ไม่ใช่การพรีวิวการใช้งาน component
  // ตัวเดียวแบบหัวข้ออื่น จึงไม่ต้องมีกล่องโค้ด (หัวหน้าสั่ง 2026-10-20)
  parameters: { docs: { section: 'ควรไม่ควร', hideCode: true } },
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
