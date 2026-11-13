import type React from 'react'
import { BarChart, type BarChartSeries } from '../../components/BarChart'
import { PieChart, type PieChartSize } from '../../components/PieChart'
import type { SampleRenderer } from '../../foundations/shared/AtomDoc'

// ตารางแปลงชุดในไฟล์ออกแบบ (หน้า 29 Chart) เป็น BarChart จริงในโค้ด ค่าที่รับมาคือค่าของชิ้นงานใน Figma
// ⚠️ แปลงเฉพาะ bar-chart กับ pie-chart ส่วน _bar-chart-bar, _bar-chart-legend-item, _bar-chart-point และ _pie-chart-legend-item เป็นชิ้นส่วนข้างในกราฟ
//    โค้ดไม่มี component แยกให้วางเดี่ยว ๆ หน้าเอกสารจึงขึ้นข้อความแทน
// ⚠️ ปิดปุ่ม "ดูเป็นตาราง" เพราะชิ้นงานในไฟล์ออกแบบไม่มีปุ่มนี้ ความสูงจึงตรงแบบ (ปุ่มเป็นการตัดสินใจฝั่งโค้ดเพื่อการเข้าถึง)
// ⚠️ show-tooltip เป็นภาพนิ่งของสถานะ hover ในไฟล์ออกแบบ ฝั่งโค้ดคำใบ้โผล่เมื่อชี้หรือโฟกัสหมวดเท่านั้น จึงไม่มี prop ให้เปิด
// ข้อมูลตัวอย่าง One CMS 31 วัน ชุดเดียวกับ story ของ component (components/BarChart/BarChart.stories.tsx)
// ซึ่งถอดจากความสูงแท่งในไฟล์ออกแบบ แก้ที่หนึ่งต้องแก้อีกที่ให้ตรงกัน

type P = Parameters<SampleRenderer>[0]
const Fill = ({ children }: { children: React.ReactNode }) => <div style={{ width: '100%' }}>{children}</div>
const on = (v: P[string] | undefined) => v === true || v === 'true'

const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1))
const NEWS = [80, 66, 58, 71, 47, 57, 75, 80, 45, 28, 47, 57, 66, 58, 71, 31, 75, 45, 51, 47, 80, 66, 58, 47, 71, 31, 57, 75, 45, 28, 47]
const VIEWS = [216000, 169412, 139765, 105176, 114353, 155294, 194824, 220941, 127059, 126353, 110824, 157412, 217412, 126353, 180000, 69882, 74118, 93176, 126353, 110824, 228000, 170118, 165176, 110824, 187765, 74824, 163765, 177882, 93176, 72706, 110824]
const SERIES: BarChartSeries[] = [
  { label: 'ข่าวที่สร้าง', values: NEWS, axis: 'right', unit: 'ข่าว' },
  { label: 'การเข้าชม', values: VIEWS, axis: 'left', type: 'line', unit: 'ครั้ง' },
]
const SUMMARY = 'ข่าวที่สร้างและการเข้าชมรายวัน 31 วัน ข่าวสูงสุด 80 ข่าวในวันที่ 1, 8 และ 21 การเข้าชมสูงสุด 228,000 ครั้งในวันที่ 21'

// ข้อมูลตัวอย่างกราฟวงกลมตรงกับชุด pie-chart ในไฟล์ออกแบบ รวม 1,240 ข่าว 30 22 16 12 8 และ อื่น ๆ 12 เปอร์เซ็นต์
// หมวดที่ 6 กับ 7 รวมกันเป็นชิ้น อื่น ๆ 149 ข่าว เพราะค่าตั้งต้นแสดงชื่อ 5 หมวด
const PIE = [
  { label: 'เศรษฐกิจ', value: 372 },
  { label: 'การเมือง', value: 273 },
  { label: 'ธุรกิจ', value: 198 },
  { label: 'เทคโนโลยี', value: 149 },
  { label: 'ไลฟ์สไตล์', value: 99 },
  { label: 'กีฬา', value: 80 },
  { label: 'บันเทิง', value: 69 },
]
const PIE_SIZES: PieChartSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
const str = (v: P[string] | undefined) => (typeof v === 'string' ? v : undefined)

export const chartSamples: Record<string, SampleRenderer> = {
  // show-tooltip เป็นภาพนิ่งของไฟล์ออกแบบ ฝั่งโค้ดคำใบ้โผล่เมื่อชี้หรือโฟกัสชิ้น ไม่มี prop ให้เปิด
  'pie-chart': p => {
    const size = str(p.size) as PieChartSize | undefined
    return (
      <PieChart
        summary="สัดส่วนข่าวที่สร้างตามหมวด 1,240 ข่าว เศรษฐกิจมากที่สุด 30%"
        data={PIE}
        size={size && PIE_SIZES.includes(size) ? size : 'md'}
        unit="ข่าว"
        total={str(p.total)}
        totalLabel={str(p['total-label']) ?? 'ข่าวทั้งหมด'}
        showLegend={p['show-legend'] === undefined ? true : on(p['show-legend'])}
        legendPlacement={str(p['legend-placement']) === 'end' ? 'end' : 'bottom'}
        showTableToggle={false}
      />
    )
  },
  // ชิ้นงานต้นฉบับในใบ Component Previews ไม่มีค่า property ที่อ่านได้ ใช้ค่าตั้งต้นของชุดคือเปิดคำอธิบายสีและแกนขวา
  'bar-chart': p => (
    <Fill>
      <BarChart
        summary={SUMMARY}
        categoryLabel="วันที่"
        categories={DAYS}
        series={SERIES}
        showLegend={p['show-legend'] === undefined ? true : on(p['show-legend'])}
        showRightAxis={p['show-right-axis'] === undefined ? true : on(p['show-right-axis'])}
        showTableToggle={false}
      />
    </Fill>
  ),
}
