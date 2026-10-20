/**
 * เทมเพลตหน้า Docs แบบกำหนดเอง ใช้แทนของเริ่มต้นของ Storybook กับทุก component
 * (ตั้งใจให้เป็นเทมเพลตกลางตัวเดียว ไม่เขียน MDX แยกทีละ component)
 *
 * ⚠️ ทำไมต้องมี (ตั้ง 2026-10-19 หัวหน้าสั่ง)
 *    ของเดิม (autodocs ค่าเริ่มต้น) วางตัวอย่างซ้ำกันสองชุด คือ Primary ที่เชื่อมกับ
 *    ตาราง Controls ด้านบนจริง กับ Stories ที่แสดงทุกตัวอย่างอีกชุดนับรวม primary ซ้ำ
 *    ทำให้หัวหน้าลองเปลี่ยนค่าที่ตัวอย่างในหัวข้อ STORIES (ชุดที่สอง เป็นภาพนิ่ง)
 *    แล้วงงว่าทำไมไม่ขยับ ทั้งที่ของจริงที่ขยับได้อยู่คนละจุด
 *
 * ⚠️ โครงสองคอลัมน์ (ตั้ง 2026-10-20 หัวหน้าสั่ง) เนื้อหาอยู่กึ่งกลางหน้า
 *    ตาราง Controls ย้ายไปด้านขวาแทนที่จะเรียงต่อใต้ตัวอย่างสด ติดอยู่กับที่ขณะเลื่อนดู
 *    ความกว้างคอลัมน์ขวา 360px กับระยะห่าง 32px เป็นค่าที่ตั้งเอง ไม่มี token อ้างอิง
 *    เพราะเป็นเรื่องผังของเครื่องมือ Storybook เอง ไม่ใช่ชิ้นงานในไฟล์ออกแบบ
 *
 * ⚠️ ซ่อนคอลัมน์ Description กับ Default (ตั้ง 2026-10-20 หัวหน้าสั่ง)
 *    หัวหน้าอยากให้ตาราง Controls ในหน้า Docs หน้าตาใกล้เคียงกับแผง
 *    Controls ตอนดู story เดี่ยว (ซึ่งมีแค่คอลัมน์ Name กับ Control เท่านั้น)
 *    บล็อก <Controls /> ของ Storybook ไม่เปิด prop ให้เลือกคอลัมน์ที่จะโชว์
 *    (เช็คจาก blocks.d.ts แล้ว มีแค่ include/exclude/sort/of) จึงใช้ CSS
 *    ซ่อนตามตำแหน่งคอลัมน์แทน (คอลัมน์ 2 กับ 3 ของแถวหัวตารางและแถวข้อมูล)
 *    ไม่ได้ลบข้อมูลออกจริง แค่ซ่อนด้วยสายตา ยังอยู่ใน DOM เหมือนเดิม
 *    ⚠️ ยังไม่ได้เปิดดูด้วยตาจริงในเบราว์เซอร์ เพราะเครื่องมือไม่มี
 *    browser automation ถ้าตำแหน่งคอลัมน์ไม่ตรงที่คาดไว้ ให้แจ้งกลับ
 *
 * โครง:
 *   ซ้าย (เนื้อหา)   Title / Subtitle / Description / Canvas / Stories
 *   ขวา (ติดด้านข้าง) Controls ของ story เดียวกับ Canvas (ใช้ of ค่าเริ่มต้นร่วมกัน จึงแชร์ args)
 *   Stories ตั้ง includePrimary เป็น false ไม่ให้แสดงตัวแรกซ้ำกับที่อยู่ใน Canvas แล้ว
 */
import { Title, Subtitle, Description, Canvas, Controls, Stories } from '@storybook/addon-docs/blocks'

const PAGE_MAX_WIDTH = 1200
const SIDEBAR_WIDTH = 360
const COLUMN_GAP = 32

// ซ่อนคอลัมน์ที่ 2 (Description) กับ 3 (Default) ของตาราง Controls
// คง 1 (Name) กับคอลัมน์สุดท้าย (Control) ไว้ ใช้ nth-child แทนชื่อคลาส
// เพราะ Storybook ใช้ CSS-in-JS สร้างชื่อคลาสแบบสุ่ม อ้างอิงไม่ได้
const COMPACT_CONTROLS_CSS = `
  .docs-compact-controls table thead th:nth-child(2),
  .docs-compact-controls table thead th:nth-child(3),
  .docs-compact-controls table tbody td:nth-child(2),
  .docs-compact-controls table tbody td:nth-child(3) {
    display: none;
  }
`

export const CustomDocsPage = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: `minmax(0, 1fr) ${SIDEBAR_WIDTH}px`,
      gap: COLUMN_GAP,
      maxWidth: PAGE_MAX_WIDTH,
      margin: '0 auto',
      alignItems: 'start',
    }}
  >
    <div>
      <Title />
      <Subtitle />
      <Description />
      <Canvas />
      <Stories includePrimary={false} />
    </div>
    <div className="docs-compact-controls" style={{ position: 'sticky', top: 16 }}>
      <style>{COMPACT_CONTROLS_CSS}</style>
      <Controls />
    </div>
  </div>
)

export default CustomDocsPage
