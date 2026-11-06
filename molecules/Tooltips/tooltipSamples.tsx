import { Tooltip, type TooltipPlacement, type TooltipSize } from '../../components/Tooltip'
import type { SampleRenderer } from '../../foundations/shared/AtomDoc'
import styles from './tooltipSamples.module.css'

// ตารางแปลงชุด tooltip ในไฟล์ออกแบบ (หน้า 20 Tooltips) เป็น component จริงในโค้ด
// ค่าที่รับมาคือคุณสมบัติของชิ้นงานใน Figma แกน supporting-text placement size
// ⚠️ ตัวอย่างเปิดค้างด้วย prop open ซึ่งมีไว้สำหรับหน้าเอกสารเท่านั้น (ผู้ใช้อนุมัติ 2026-11-06)
//    ตัวกระตุ้นเป็น span ว่าง และกล่องวางในสายเนื้อหาด้วยคลาส still ดูเหตุผลใน tooltipSamples.module.css
// ⚠️ ชุดใน Figma ไม่มีคุณสมบัติข้อความ ข้อความด้านล่างคัดลอกจากชิ้นงานต้นแบบ (tooltip 11210:334) ถ้าแก้ใน Figma ต้องแก้ที่นี่ด้วย
// ⚠️ tooltip-arrow ไม่มี component เดี่ยวในโค้ด ลูกศรวาดอยู่ข้างใน Tooltip จึงไม่ใส่ในตาราง หน้าเอกสารจะขึ้นข้อความแทน

type P = Parameters<SampleRenderer>[0]
const str = (v: unknown) => (typeof v === 'string' ? v : undefined)

const tooltip: SampleRenderer = (p: P) => (
  <Tooltip
    title="นี่คือคำใบ้"
    description={p['supporting-text'] === 'true' ? 'คำใบ้ใช้อธิบายว่าของชิ้นนี้คืออะไรหรือทำอะไร ไม่ใส่ของที่กดได้' : undefined}
    relationship="inaccessible"
    size={str(p.size) as TooltipSize}
    placement={str(p.placement) as TooltipPlacement}
    open
    className={styles.still}
  >
    <span />
  </Tooltip>
)

export const tooltipSamples: Record<string, SampleRenderer> = { tooltip }
