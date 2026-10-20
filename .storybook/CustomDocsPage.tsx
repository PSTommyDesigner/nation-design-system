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
 * โครง:
 *   ซ้าย (เนื้อหา)   Title / Subtitle / Description / Canvas / Stories
 *   ขวา (ติดด้านข้าง) Controls ของ story เดียวกับ Canvas (ใช้ of ค่าเริ่มต้นร่วมกัน จึงแชร์ args)
 *   Stories ตั้ง includePrimary เป็น false ไม่ให้แสดงตัวแรกซ้ำกับที่อยู่ใน Canvas แล้ว
 */
import { Title, Subtitle, Description, Canvas, Controls, Stories } from '@storybook/addon-docs/blocks'

const PAGE_MAX_WIDTH = 1200
const SIDEBAR_WIDTH = 360
const COLUMN_GAP = 32

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
    <div style={{ position: 'sticky', top: 16 }}>
      <Controls />
    </div>
  </div>
)

export default CustomDocsPage
