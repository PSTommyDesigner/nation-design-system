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
 * โครงใหม่:
 *   Title / Subtitle / Description   คำอธิบาย component (ดึงจาก JSDoc อัตโนมัติ)
 *   Canvas + Controls                ตัวอย่างสด "ชุดเดียว" ที่แก้ค่าแล้วเห็นผลทันที
 *                                    (ใช้ of ตัวเดียวกันทั้งคู่ จึงแชร์ค่า args กัน)
 *   Stories (includePrimary=false)   ตัวอย่างอื่นที่ตั้งใจให้ดูเป็นภาพนิ่งอ้างอิง
 *                                    ไม่รวมตัวแรกซ้ำ เพราะโชว์ไปแล้วในบล็อก Canvas ด้านบน
 */
import { Title, Subtitle, Description, Canvas, Controls, Stories } from '@storybook/addon-docs/blocks'

export const CustomDocsPage = () => (
  <>
    <Title />
    <Subtitle />
    <Description />
    <Canvas />
    <Controls />
    <Stories includePrimary={false} />
  </>
)

export default CustomDocsPage
