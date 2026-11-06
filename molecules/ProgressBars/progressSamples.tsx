import { CircularProgressBar, ProgressBar, SemiCircularProgressBar, type ProgressLabelPosition, type ProgressSize } from '../../components/Progress'
import type { SampleRenderer } from '../../foundations/shared/AtomDoc'

// ตารางแปลงชุดความคืบหน้า 3 ชุดในไฟล์ออกแบบ (หน้า 23 Progress Bars) เป็น component จริงในโค้ด
// ค่าที่รับมาคือคุณสมบัติของชิ้นงานใน Figma แกน size label-position กับ boolean show-label indeterminate
// ⚠️ ค่าความคืบหน้าไม่ใช่คุณสมบัติของชุดใน Figma ทุกชิ้นงานมีป้าย 50% จึงส่ง value 50 ทุกตัว
//    แถบแนวนอนใน Figma เติม 120 จากราง 279 (ราว 43%) ไม่ตรงกับป้าย ในโค้ดแถบจึงยาวกว่าเล็กน้อย (เป็นงานค้างฝั่ง Figma)
// ⚠️ แบบไม่รู้ค่า (indeterminate) ไม่ส่ง value ตามสเปคของ component ภาพจะเคลื่อนไหววนอยู่

type P = Parameters<SampleRenderer>[0]
const str = (v: unknown) => (typeof v === 'string' ? v : undefined)
const VALUE = 50

const common = (p: P) => ({
  label: 'ความคืบหน้าตัวอย่าง',
  size: str(p.size) as ProgressSize,
  showLabel: p['show-label'] !== false,
  value: p.indeterminate === true ? undefined : VALUE,
})

export const progressSamples: Record<string, SampleRenderer> = {
  'progress-bar': p => <ProgressBar {...common(p)} labelPosition={str(p['label-position']) as ProgressLabelPosition} />,
  'circular-progress-bar': p => <CircularProgressBar {...common(p)} />,
  'semi-circular-progress-bar': p => <SemiCircularProgressBar {...common(p)} value={VALUE} />,
}
