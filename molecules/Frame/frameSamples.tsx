import { MockupMedia, type MockupMediaKind, type MockupMediaSize } from '../../components/MockupMedia'
import type { SampleRenderer } from '../../foundations/shared/AtomDoc'

// ตารางแปลงชุดในไฟล์ออกแบบ (หน้า 10 Frame) เป็น component จริงในโค้ด เฉพาะชุด mockup-media (เพิ่ม 2026-11-12)
// กรอบสัดส่วน 8 ตัวเดิมไม่มี component ในโค้ด ยังเป็นภาพ PNG ใน assets/ เหมือนเดิม
// ⚠️ MockupMedia ยืดเต็มกรอบที่วาง ส่วนกรอบตัวอย่างไม่มีความสูงของตัวเอง
//    จึงห่อด้วยกล่องที่สูงเท่าชิ้นงานใน Figma ผ่านตัวแปร --sample-h ที่ AtomDoc ส่งมาให้ (แบบเดียวกับ Divider แนวตั้ง)

type P = Parameters<SampleRenderer>[0]
const str = (v: P[string] | undefined) => (typeof v === 'string' ? v : undefined)

export const frameSamples: Record<string, SampleRenderer> = {
  'mockup-media': (p: P) => (
    <div style={{ width: '100%', height: 'var(--sample-h)' }}>
      <MockupMedia kind={(str(p.kind) ?? 'image') as MockupMediaKind} size={(str(p.size) ?? 'md') as MockupMediaSize} />
    </div>
  ),
}
