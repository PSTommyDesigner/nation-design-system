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
 * ⚠️ แผง Controls แบบติดขอบขวาเต็มจอ (ตั้ง 2026-10-20 หัวหน้าสั่ง)
 *    หัวหน้าอยากให้แผง Controls ในหน้า Docs หน้าตาและตำแหน่งเหมือนแผง Controls
 *    ตอนดู story เดี่ยว คือชิดขอบขวาสุด สูงเต็มจอ กว้าง 400px (อ่านค่าจาก
 *    --right-panel-width ของ Storybook เองใน DevTools) และเหลือแค่คอลัมน์
 *    Name กับ Control
 *    - แผงใช้ position fixed ภายใน iframe ของหน้าพรีวิว จึงชิดขอบขวาของพื้นที่พรีวิว
 *      เหมือนแผง addon ของ Storybook พอดี
 *    - กันพื้นที่ด้านขวาของ .sbdocs-wrapper (คลาสมาตรฐานของ Storybook ไม่ใช่ชื่อสุ่ม)
 *      ไม่ให้เนื้อหาไปอยู่ใต้แผง ส่วนการจัดกึ่งกลางเนื้อหาใช้ของ .sbdocs-content เดิม
 *    - สีพื้นกับเส้นขอบของแผงผูก token จริงได้ เพราะ variables.css โหลดอยู่ใน iframe นี้
 *    - บล็อก <Controls /> ไม่เปิด prop ให้เลือกคอลัมน์ (มีแค่ include/exclude/sort/of)
 *      จึงซ่อนคอลัมน์ Description กับ Default ด้วย CSS ตามตำแหน่ง ไม่ได้ลบข้อมูลจริง
 *    ⚠️ ยังไม่ได้เปิดดูด้วยตาจริงในเบราว์เซอร์ เครื่องมือไม่มี browser automation
 *
 * โครง:
 *   เนื้อหา (กึ่งกลางพื้นที่ที่เหลือ)  Title / Subtitle / Description / Canvas / Stories
 *   แผงขวา (fixed เต็มสูง 400px)       Controls ของ story เดียวกับ Canvas (แชร์ args กัน)
 *   Stories ตั้ง includePrimary เป็น false ไม่ให้แสดงตัวแรกซ้ำกับที่อยู่ใน Canvas แล้ว
 */
import { Title, Subtitle, Description, Canvas, Controls, Stories } from '@storybook/addon-docs/blocks'

// กว้างเท่าแผง addon ของ Storybook (--right-panel-width: 400px) ไม่มี token อ้างอิง
// เพราะเป็นผังของเครื่องมือ ไม่ใช่ชิ้นงานในไฟล์ออกแบบ
const PANEL_WIDTH = 400
const PANEL_PADDING = 16
const CONTENT_GAP = 32

const LAYOUT_CSS = `
  .sbdocs-wrapper {
    padding-right: ${PANEL_WIDTH + CONTENT_GAP}px;
  }
  .docs-side-controls {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: ${PANEL_WIDTH}px;
    box-sizing: border-box;
    padding: ${PANEL_PADDING}px;
    overflow-y: auto;
    background: var(--ntg-color-background-general-primary);
    border-left: 1px solid var(--ntg-color-border-general-primary);
  }
  .docs-side-controls table thead th:nth-child(2),
  .docs-side-controls table thead th:nth-child(3),
  .docs-side-controls table tbody td:nth-child(2),
  .docs-side-controls table tbody td:nth-child(3) {
    display: none;
  }
`

export const CustomDocsPage = () => (
  <>
    <style>{LAYOUT_CSS}</style>
    <Title />
    <Subtitle />
    <Description />
    <Canvas />
    <Stories includePrimary={false} />
    <aside className="docs-side-controls" aria-label="Controls">
      <Controls />
    </aside>
  </>
)

export default CustomDocsPage
