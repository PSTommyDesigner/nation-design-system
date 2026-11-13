import type { Meta, StoryObj } from '@storybook/react-vite'
import { PieChart, type PieChartDatum } from './PieChart'

// หน้า Docs จัดกลุ่ม story ตาม parameters.docs.section ดูกติกาที่ .storybook/CustomDocsPage.tsx
// ไฟล์ออกแบบหน้า 29 Chart มีชุด pie-chart (12008:1686) แกน size xs ถึง xl
// กับชิ้นส่วนแถวคำอธิบายสี _pie-chart-legend-item (12007:1482)
// property ของ pie-chart คือ show-tooltip show-legend total total-label
// show-tooltip เป็นภาพตัวอย่างสถานะ hover ในไฟล์ออกแบบ ฝั่งโค้ดชี้หรือโฟกัสชิ้นแล้วโผล่เอง ไม่มี prop
//
// ข้อมูลตัวอย่างตามไฟล์ออกแบบ ข่าวทั้งหมด 1,240 ข่าว เศรษฐกิจ 30% การเมือง 22% ธุรกิจ 16%
// เทคโนโลยี 12% ไลฟ์สไตล์ 8% อื่น ๆ 12% (กีฬากับบันเทิง)
const NEWS: PieChartDatum[] = [
  { label: 'เศรษฐกิจ', value: 372 },
  { label: 'การเมือง', value: 273 },
  { label: 'ธุรกิจ', value: 198 },
  { label: 'เทคโนโลยี', value: 149 },
  { label: 'ไลฟ์สไตล์', value: 99 },
  { label: 'กีฬา', value: 89 },
  { label: 'บันเทิง', value: 60 },
]

// 9 หมวด ให้เห็นชิ้น อื่น ๆ รวม 4 หมวด
const NINE: PieChartDatum[] = [
  ...NEWS,
  { label: 'ต่างประเทศ', value: 52 },
  { label: 'สุขภาพ', value: 31 },
]

// ยอดวิวของหมวดเดียวกัน ลำดับมากไปน้อยต่างจากจำนวนข่าว
const VIEWS: PieChartDatum[] = [
  { label: 'เศรษฐกิจ', value: 182400 },
  { label: 'การเมือง', value: 264100 },
  { label: 'ธุรกิจ', value: 75300 },
  { label: 'เทคโนโลยี', value: 58900 },
  { label: 'ไลฟ์สไตล์', value: 120700 },
  { label: 'กีฬา', value: 143200 },
  { label: 'บันเทิง', value: 98600 },
]

const SUMMARY = 'สัดส่วนข่าวตามหมวด 1,240 ข่าว เศรษฐกิจมากที่สุด 30% รองลงมาการเมือง 22%'

const meta: Meta<typeof PieChart> = {
  title: 'Organisms (Component)/29 Chart/PieChart Component',
  component: PieChart,
  tags: ['autodocs'],
  args: {
    summary: SUMMARY,
    data: NEWS,
    size: 'md',
    totalLabel: 'ข่าวทั้งหมด',
    unit: 'ข่าว',
    maxSlices: 5,
    showLegend: true,
    showTableToggle: true,
  },
}
export default meta

type Story = StoryObj<typeof PieChart>

const controls = {
  controls: { include: ['summary', 'size', 'maxSlices', 'otherLabel', 'total', 'totalLabel', 'unit', 'showLegend', 'showTableToggle'] },
}

export const Default: Story = {
  name: 'Pie-chart',
  parameters: {
    ...controls,
    docs: { description: { story: 'ขนาด md 7 หมวด แสดงชื่อ 5 หมวดที่มากที่สุด กีฬากับบันเทิงรวมเป็น อื่น ๆ สีเทาท้ายวง ชี้หรือกด Tab เข้าวงแล้วใช้ลูกศร ชิ้นนั้นสีเต็ม ชิ้นอื่นจาง และคำใบ้บอกจำนวนกับสัดส่วน' } },
  },
}

export const Sizes: Story = {
  name: 'ขนาด',
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--ntg-size-space-s3-sm)', flexWrap: 'wrap' }}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <PieChart key={size} {...args} size={size} showTableToggle={false} />
      ))}
    </div>
  ),
  parameters: {
    ...controls,
    docs: { section: 'ขนาด', description: { story: 'แกน size ใน Figma xs 96, sm 128, md 160, lg 192, xl 224 ความหนาวง 16 ถึง 24 ยอดรวมใช้ preset title ตามขนาด' } },
  },
}

export const ManyCategories: Story = {
  name: 'หลายหมวด',
  args: { data: NINE, summary: 'สัดส่วนข่าวตามหมวด 9 หมวด เศรษฐกิจมากที่สุด' },
  parameters: {
    ...controls,
    docs: { section: 'ข้อมูล', description: { story: '9 หมวด เกิน maxSlices บวก 1 จึงแสดงชื่อ 5 หมวด อีก 4 หมวดรวมเป็น อื่น ๆ คำใบ้ของชิ้น อื่น ๆ บอกว่ารวมหมวดอะไร ตารางแสดงครบทั้ง 9 หมวด' } },
  },
}

const PAIRED_CATEGORIES = ['เศรษฐกิจ', 'การเมือง', 'ธุรกิจ', 'เทคโนโลยี', 'ไลฟ์สไตล์']

export const Paired: Story = {
  name: 'สองวงคู่กัน',
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--ntg-size-space-s3-sm)', flexWrap: 'wrap' }}>
      <PieChart
        {...args}
        data={NEWS}
        categories={PAIRED_CATEGORIES}
        unit="ข่าว"
        totalLabel="ข่าวทั้งหมด"
        summary="จำนวนข่าวตามหมวด 1,240 ข่าว"
      />
      <PieChart
        {...args}
        data={VIEWS}
        categories={PAIRED_CATEGORIES}
        unit="ครั้ง"
        totalLabel="ยอดวิวทั้งหมด"
        summary="ยอดวิวตามหมวด การเมืองมากที่สุด"
      />
    </div>
  ),
  parameters: {
    ...controls,
    docs: { section: 'ข้อมูล', description: { story: 'จำนวนข่าวกับยอดวิว ส่ง categories รายการเดียวกัน สองวงจึงมีชิ้น ลำดับ และสีของแต่ละหมวดตรงกัน แม้ยอดวิวจะเรียงมากไปน้อยต่างจากจำนวนข่าว หมวดนอกรายการ (กีฬา บันเทิง) รวมเป็น อื่น ๆ ทั้งสองวง' } },
  },
}

export const CustomColors: Story = {
  name: 'ระบุสีเอง',
  args: {
    data: [
      { label: 'เผยแพร่แล้ว', value: 820, color: 8 },
      { label: 'รอตรวจ', value: 260, color: 6 },
      { label: 'ตีกลับ', value: 110, color: 4 },
      { label: 'ฉบับร่าง', value: 50, color: 'other' },
    ],
    summary: 'สถานะข่าว 1,240 ข่าว เผยแพร่แล้ว 66%',
  },
  parameters: {
    ...controls,
    docs: { section: 'ข้อมูล', description: { story: 'ระบุสีของแต่ละหมวดด้วย field color เป็นเลข 1 ถึง 8 หรือ other ไม่รับค่าสีดิบ ระบุเองแล้วสีที่อยู่ข้างกันอาจใกล้กัน ต้องดูภาพก่อนใช้' } },
  },
}

export const TableView: Story = {
  name: 'ดูเป็นตาราง',
  args: { data: NINE, summary: 'สัดส่วนข่าวตามหมวด 9 หมวด' },
  play: async ({ canvasElement }) => {
    const button = Array.from(canvasElement.querySelectorAll('button')).find((b) => b.textContent === 'ดูเป็นตาราง')
    button?.click()
  },
  parameters: {
    ...controls,
    docs: { section: 'ข้อมูล', story: { autoplay: true }, description: { story: 'กดปุ่ม ดูเป็นตาราง แล้วกราฟถูกแทนด้วยตาราง Table ของระบบ แสดงครบทุกหมวด ไม่รวมเป็น อื่น ๆ จำนวนเต็มพร้อมหน่วยที่หัวคอลัมน์และสัดส่วน กดอีกครั้งกลับเป็นกราฟ' } },
  },
}
