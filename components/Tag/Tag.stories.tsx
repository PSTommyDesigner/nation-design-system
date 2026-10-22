import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tag, type TagFamily, type TagSize } from './Tag'
import { Icon } from '../Icon'
import { Preview, Labeled, DoDont, Do, Dont } from '../../.storybook/docs-blocks'

// placeholder สาธิตกล่องรูปของ leading="left-image" เท่านั้น ไม่ใช่ asset จริงของ DS
// (imageSrc เป็น string ว่างจะทำให้ Tag.tsx ไม่วาดกล่องรูปเลย ตามเงื่อนไข effectiveLeading === 'left-image' && imageSrc)
const PLACEHOLDER_IMAGE_SRC =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"><rect width="26" height="26" fill="#C4C4C4"/></svg>')

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

// Default กับ semi-rounded-tag เรนเดอร์เหมือนกันเป๊ะ (shape เริ่มต้นของ Tag คือ semi-rounded
// อยู่แล้ว) เลยรวมเป็น story เดียว ใช้ชื่อ semi-rounded-tag ตรงกับ 13 ชนิดที่เหลือ แต่ยังทำ
// หน้าที่ primary/hero ของหน้า Docs เหมือนเดิม (หัวหน้าทัก 2026-10-21 ว่า Default ซ้ำกับ
// semi-rounded-tag ใน sidebar)
export const Default: Story = { name: 'Semi-rounded-tag' }

// ── ส่วนประกอบ ──────────────────────────────────────────────
export const Anatomy: Story = {
  tags: ['!dev'],
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
  tags: ['!dev'],
  name: 'ไอคอนนำหน้า',
  args: { leftIcon: <Icon name="star" size="100%" /> },
  parameters: { docs: { section: 'ส่วนประกอบ' } },
}
export const Closable: Story = {
  tags: ['!dev'],
  name: 'ปุ่มปิด',
  args: { closable: true },
  parameters: { docs: { section: 'ส่วนประกอบ' } },
}
export const WithNumber: Story = {
  tags: ['!dev'],
  name: 'ตัวเลขนำหน้า',
  args: { leading: 'left-number', count: 12, children: 'แจ้งเตือน' },
  parameters: { docs: { section: 'ส่วนประกอบ' } },
}
export const IconOnly: Story = {
  tags: ['!dev'],
  name: 'ไอคอนล้วน',
  args: { children: undefined, iconOnly: true, icon: <Icon name="close" size="100%" />, label: 'ปิด' },
  parameters: { docs: { section: 'ส่วนประกอบ' } },
}

// ── ชุด ─────────────────────────────────────────────────────
const FAMILIES: TagFamily[] = [
  'brand', 'neutral', 'red', 'green', 'yellow', 'cyan', 'blue', 'purple', 'pink', 'bamboo', 'brown',
]

export const AllFamilies: Story = {
  tags: ['!dev'],
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
  tags: ['!dev'],
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
  tags: ['!dev'],
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
          <Labeled label="ตัวเลข"><Tag shape="semi-rounded" leading="left-number" count={3}>แจ้งเตือน</Tag></Labeled>
          <Labeled label="รูป"><Tag shape="semi-rounded" leading="left-image" imageSrc={PLACEHOLDER_IMAGE_SRC}>การเมือง</Tag></Labeled>
          <Labeled label="checkbox"><Tag shape="semi-rounded" leading="left-checkbox">การเมือง</Tag></Labeled>
          <Labeled label="indicator"><Tag shape="semi-rounded" leading="left-indicator">การเมือง</Tag></Labeled>
        </Preview>
      </Labeled>
      <Labeled label="ทรงแคปซูล 5 ชนิด">
        <Preview>
          <Labeled label="เปล่า"><Tag shape="pill">การเมือง</Tag></Labeled>
          <Labeled label="ตัวเลข"><Tag shape="pill" leading="left-number" count={3}>แจ้งเตือน</Tag></Labeled>
          <Labeled label="รูป"><Tag shape="pill" leading="left-image" imageSrc={PLACEHOLDER_IMAGE_SRC}>การเมือง</Tag></Labeled>
          <Labeled label="checkbox"><Tag shape="pill" leading="left-checkbox">การเมือง</Tag></Labeled>
          <Labeled label="indicator"><Tag shape="pill" leading="left-indicator">การเมือง</Tag></Labeled>
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
  tags: ['!dev'],
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
  tags: ['!dev'],
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
  tags: ['!dev'],
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
  tags: ['!dev'],
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

// ── 14 ชนิดจริงจากไฟล์ออกแบบ (เมนู sidebar สำหรับลองเล่นแต่ละชนิด) ──────────
// หัวหน้าสั่ง 2026-10-21 ให้เก็บเฉพาะ 14 ชื่อนี้ไว้ใน sidebar ตั้งชื่อตรงกับชุดจริงในไฟล์
// ออกแบบ (tokens/figma-components.json → figmaSets) ตัด tag autodocs ออกเพื่อไม่ให้ไป
// ซ้ำกับหัวข้อ "14 ชนิด" (AllTypes) ที่โชว์ทั้งหมดในหน้า Docs อยู่แล้ว เปิดจาก sidebar
// แต่ละอันจะได้แผง Controls ที่ผูกกับตัวอย่างนั้นตรงๆ ลองเปลี่ยนค่าได้จริง
// semi-rounded-tag ไม่ต้องมีตรงนี้แล้ว เพราะ Default ด้านบนทำหน้าที่แทนอยู่แล้ว (เรนเดอร์
// เหมือนกันเป๊ะ รวมเป็น story เดียว หัวหน้าทัก 2026-10-21)
export const PillTag: Story = { tags: ['!autodocs'], name: 'Pill-tag', args: { shape: 'pill' } }
export const NumberTag: Story = { tags: ['!autodocs'], name: 'Number-tag', args: { shape: 'semi-rounded', leading: 'left-number', count: 3, children: 'แจ้งเตือน' } }
export const PillNumberTag: Story = { tags: ['!autodocs'], name: 'Pill-number-tag', args: { shape: 'pill', leading: 'left-number', count: 3, children: 'แจ้งเตือน' } }
export const ImageTag: Story = { tags: ['!autodocs'], name: 'Image-tag', args: { shape: 'semi-rounded', leading: 'left-image', imageSrc: PLACEHOLDER_IMAGE_SRC } }
export const PillImageTag: Story = { tags: ['!autodocs'], name: 'Pill-image-tag', args: { shape: 'pill', leading: 'left-image', imageSrc: PLACEHOLDER_IMAGE_SRC } }
export const CheckboxTag: Story = { tags: ['!autodocs'], name: 'Checkbox-tag', args: { shape: 'semi-rounded', leading: 'left-checkbox', checked: false } }
export const PillCheckboxTag: Story = { tags: ['!autodocs'], name: 'Pill-checkbox-tag', args: { shape: 'pill', leading: 'left-checkbox', checked: false } }
export const IndicatorTag: Story = { tags: ['!autodocs'], name: 'Indicator-tag', args: { shape: 'semi-rounded', leading: 'left-indicator' } }
export const PillIndicatorTag: Story = { tags: ['!autodocs'], name: 'Pill-indicator-tag', args: { shape: 'pill', leading: 'left-indicator' } }

export const IconTag: Story = {
  tags: ['!autodocs'],
  name: 'Icon-tag',
  args: { shape: 'semi-rounded', iconOnly: true, icon: <Icon name="star" size="100%" />, label: 'รายการโปรด', children: undefined },
}
export const CircularIconTag: Story = {
  tags: ['!autodocs'],
  name: 'Circular-icon-tag',
  args: { shape: 'circular', iconOnly: true, icon: <Icon name="close" size="100%" />, label: 'ปิด', children: undefined },
}
export const LinkTag: Story = {
  tags: ['!autodocs'],
  name: 'Link-tag',
  args: { shape: 'link', children: '#เศรษฐกิจ' },
}
export const LinkIconTag: Story = {
  tags: ['!autodocs'],
  name: 'Link-icon-tag',
  args: { shape: 'link', iconOnly: true, icon: <Icon name="close" size="100%" />, label: 'ปิด', children: undefined },
}
