import type React from 'react'
import { BarChart, type BarChartSeries } from '../../components/BarChart'
import type { SampleRenderer } from '../../foundations/shared/AtomDoc'

// ตารางแปลงชุดในไฟล์ออกแบบ (หน้า 29 Chart) เป็น BarChart จริงในโค้ด ค่าที่รับมาคือค่าของชิ้นงานใน Figma
// ⚠️ แปลงเฉพาะ bar-chart ส่วน _bar-chart-bar, _bar-chart-legend-item และ _bar-chart-point เป็นชิ้นส่วนข้างใน BarChart
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

export const chartSamples: Record<string, SampleRenderer> = {
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
