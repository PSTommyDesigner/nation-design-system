import { Divider, type DividerType } from '../../components/Divider'
import type { SampleRenderer } from '../../foundations/shared/AtomDoc'

// ตารางแปลงชุดเส้นแบ่ง 2 ชุดในไฟล์ออกแบบ (หน้า 26 Dividers) เป็น Divider จริงในโค้ด ค่าที่รับมาคือแกน type ของชิ้นงานใน Figma
// ⚠️ Divider แนวตั้งสูง 100% ของกรอบแม่ ส่วนกรอบตัวอย่างไม่มีความสูงของตัวเอง
//    จึงห่อด้วยกล่องที่สูงเท่าชิ้นงานใน Figma ผ่านตัวแปร --sample-h ที่ AtomDoc ส่งมาให้

type P = Parameters<SampleRenderer>[0]
const str = (v: unknown) => (typeof v === 'string' ? v : undefined)

export const dividerSamples: Record<string, SampleRenderer> = {
  'horizontal-divider': (p: P) => <Divider orientation="horizontal" type={str(p.type) as DividerType} />,
  'vertical-divider': (p: P) => (
    <span style={{ display: 'flex', height: 'var(--sample-h)' }}>
      <Divider orientation="vertical" type={str(p.type) as DividerType} />
    </span>
  ),
}
