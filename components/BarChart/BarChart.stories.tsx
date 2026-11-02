import type { Meta, StoryObj } from '@storybook/react-vite'
import { BarChart, type BarChartSeries } from './BarChart'

// หน้า Docs จัดกลุ่ม story ตาม parameters.docs.section ดูกติกาที่ .storybook/CustomDocsPage.tsx
// ไฟล์ออกแบบหน้า 29 Chart มีชุด bar-chart (11797:2) กับชิ้นส่วนแท่ง _bar-chart-bar (11796:5)
// property ของ bar-chart คือ show-legend show-right-axis และ show-tooltip
// show-tooltip เป็นภาพตัวอย่างสถานะ hover ในไฟล์ออกแบบ ฝั่งโค้ดชี้หรือโฟกัสหมวดแล้วโผล่เอง ไม่มี prop
//
// ข้อมูลตัวอย่าง One CMS 31 วัน ถอดจากความสูงแท่งในไฟล์ออกแบบ (จากเต็ม 340)
//   ข่าวที่สร้าง  ความสูง / 340 × 80 ปัดเป็นจำนวนเต็ม  แกนขวา 0 ถึง 80
//   การเข้าชม    ความสูง / 340 × 240,000 ปัดเป็นจำนวนเต็ม แกนซ้าย 0 ถึง 240,000
const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1))
const NEWS = [80, 66, 58, 71, 47, 57, 75, 80, 45, 28, 47, 57, 66, 58, 71, 31, 75, 45, 51, 47, 80, 66, 58, 47, 71, 31, 57, 75, 45, 28, 47]
const VIEWS = [216000, 169412, 139765, 105176, 114353, 155294, 194824, 220941, 127059, 126353, 110824, 157412, 217412, 126353, 180000, 69882, 74118, 93176, 126353, 110824, 228000, 170118, 165176, 110824, 187765, 74824, 163765, 177882, 93176, 72706, 110824]

// One CMS ข่าวที่สร้างเป็นแท่งที่แกนขวา การเข้าชมเป็นเส้นที่แกนซ้าย (ไฟล์ออกแบบหน้า 29 Chart ปรับแล้ว)
const ONE_CMS: BarChartSeries[] = [
  { label: 'ข่าวที่สร้าง', values: NEWS, axis: 'right', unit: 'ข่าว' },
  { label: 'การเข้าชม', values: VIEWS, axis: 'left', type: 'line', unit: 'ครั้ง' },
]
// แบบเดิม แท่งสองชุด
const TWO_BARS: BarChartSeries[] = [
  { label: 'ข่าวที่สร้าง', values: NEWS, axis: 'right', unit: 'ข่าว' },
  { label: 'การเข้าชม', values: VIEWS, axis: 'left', unit: 'ครั้ง' },
]
const SUMMARY = 'ข่าวที่สร้างและการเข้าชมรายวัน 31 วัน ข่าวสูงสุด 80 ข่าวในวันที่ 1, 8 และ 21 การเข้าชมสูงสุด 228,000 ครั้งในวันที่ 21'

const meta: Meta<typeof BarChart> = {
  title: 'Organisms (Component)/29 Chart/BarChart',
  component: BarChart,
  tags: ['autodocs'],
  args: {
    summary: SUMMARY,
    categoryLabel: 'วันที่',
    categories: DAYS,
    series: ONE_CMS,
    showLegend: true,
    showRightAxis: true,
    showTableToggle: true,
    height: 340,
  },
}
export default meta

type Story = StoryObj<typeof BarChart>

const controls = { controls: { include: ['summary', 'showLegend', 'showRightAxis', 'showTableToggle', 'height'] } }

export const Default: Story = {
  name: 'Bar-chart',
  parameters: {
    ...controls,
    docs: { description: { story: 'One CMS 31 วัน แท่ง ข่าวที่สร้าง อ่านค่าที่แกนขวา 0 ถึง 80 เส้นสีส้ม การเข้าชม อ่านค่าที่แกนซ้าย 0 ถึง 240K ชี้หรือกด Tab เข้ากราฟแล้วใช้ลูกศรซ้ายขวา จะเห็นแถบ hover กับคำใบ้ที่บอกตัวเลขเต็มของวันนั้น' } },
  },
}

export const TwoBars: Story = {
  name: 'แท่งสองชุด',
  args: { series: TWO_BARS },
  parameters: {
    ...controls,
    docs: { section: 'ชุด', description: { story: 'ชุดแท่งสองชุดในช่องเดียว แท่ง 12 สองแท่งห่างกัน 4 ชุดแรกสีเข้ม ชุดที่สองสีอ่อนมีขอบ' } },
  },
}

export const TableView: Story = {
  name: 'ดูเป็นตาราง',
  args: { categories: DAYS.slice(0, 7), series: ONE_CMS.map((s) => ({ ...s, values: s.values.slice(0, 7) })), summary: 'ข่าวที่สร้างและการเข้าชมรายวัน 7 วันแรก' },
  play: async ({ canvasElement }) => {
    const button = Array.from(canvasElement.querySelectorAll('button')).find((b) => b.textContent === 'ดูเป็นตาราง')
    button?.click()
  },
  parameters: {
    ...controls,
    docs: { section: 'ชุด', story: { autoplay: true }, description: { story: 'กดปุ่ม ดูเป็นตาราง แล้วกราฟถูกแทนด้วยตาราง Table ของระบบ ตัวเลขเต็มพร้อมหน่วยที่หัวคอลัมน์ กดอีกครั้งกลับเป็นกราฟ' } },
  },
}

// ── ชุด (property ของ bar-chart) ─────────────────────────────
export const SingleAxis: Story = {
  name: 'แกนเดียว (show-right-axis ปิด)',
  args: {
    showRightAxis: false,
    series: [
      { label: 'ข่าวที่สร้าง', values: NEWS, axis: 'left' },
      { label: 'ข่าวที่เผยแพร่', values: NEWS.map((n) => Math.round(n * 0.8)), axis: 'left' },
    ],
    summary: 'ข่าวที่สร้างและข่าวที่เผยแพร่รายวัน 31 วัน',
  },
  parameters: {
    ...controls,
    docs: { section: 'ชุด', description: { story: 'สองชุดหน่วยเดียวกันใช้แกนซ้ายแกนเดียว ซ่อนป้ายแกนขวา ช่องว่างขวา และชื่อแกนขวา ถ้าสองชุดคนละหน่วยให้เปิดแกนขวา' } },
  },
}

export const NoLegend: Story = {
  name: 'ไม่มีคำอธิบายสี (show-legend ปิด)',
  args: { showLegend: false },
  parameters: {
    ...controls,
    docs: { section: 'ชุด', description: { story: 'ปิดคำอธิบายสีเมื่อหัวการ์ดหรือข้อความรอบกราฟบอกแล้วว่าแท่งแต่ละสีคืออะไร ถ้ามีสองแกนควรเปิดไว้ เพราะคำอธิบายสีคือชื่อแกน' } },
  },
}

// ── ขนาด (ความกว้างของกรอบแม่) ───────────────────────────────
export const Narrow: Story = {
  name: 'จอแคบ ลดป้ายแกน x',
  render: (args) => <div style={{ width: 640 }}><BarChart {...args} /></div>,
  parameters: {
    ...controls,
    docs: { section: 'ขนาด', description: { story: 'ช่องต่อกลุ่มแคบกว่า 24 พิกเซล ป้ายแกน x เหลือ 1, 5, 10, 15, 20, 25, 30 กลุ่มแท่งหดเหลือไม่เกิน 0.7 ของช่อง แถบ hover ยังกว้าง 40 จึงคร่อมช่องข้างเคียงได้' } },
  },
}

export const NarrowScroll: Story = {
  name: 'จอมือถือ เลื่อนแนวนอน',
  render: (args) => <div style={{ width: 360 }}><BarChart {...args} /></div>,
  parameters: {
    ...controls,
    docs: { section: 'ขนาด', description: { story: 'ช่องต่อกลุ่มต่ำกว่า 14 พิกเซล พื้นที่กราฟกับแกน x เลื่อนแนวนอนได้ แกน y สองข้างตรึงอยู่กับที่' } },
  },
}
