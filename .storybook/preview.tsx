import type { Preview } from '@storybook/react-vite'
import { CustomDocsPage } from './CustomDocsPage'

// โหลด design token เป็น CSS variable ส่วนกลาง ทุก component ต้องใช้ตัวแปรชุดนี้
// ไม่ hard-code สี ระยะ หรือมุมโค้งเอง ตามกฎของโปรเจกต์
import '../tokens/output/css/variables.css'

/**
 * ⚠️ 2026-10-19 เคยใส่ธีมสีแบรนด์ (docsTheme) ให้หน้า Docs โดยเฉพาะ
 *    ตอน 2026-10-20 หัวหน้าสั่งถอดออก เพราะทำให้หน้า Docs กับแผง
 *    Controls/Actions/Interactions ตอนดู story เดี่ยว (ซึ่งเป็น default
 *    ของ Storybook ไม่ได้ทาสี) หน้าตาไม่ตรงกัน ตอนนี้ปล่อยทั้งสองจุด
 *    เป็น default ของ Storybook เหมือนกันหมด ไม่แต่งสีเพิ่ม
 *    โครงหน้า Docs (สองคอลัมน์ Controls ติดขวา ตัวอย่างสดไม่ซ้ำ)
 *    ยังคงไว้ตามเดิม ดูที่ CustomDocsPage.tsx
 */
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      // เทมเพลตหน้า Docs แบบกำหนดเอง ให้ตัวอย่างสดเชื่อมกับตาราง Controls จริง
      // ไม่ซ้ำกับภาพนิ่งด้านล่างเหมือนของเริ่มต้น ดูเหตุผลเต็มที่ CustomDocsPage.tsx
      page: CustomDocsPage,
    },
  },
}

export default preview
