import { Pagination, type PaginationSize } from '../../components/Pagination'
import type { SampleRenderer } from '../../foundations/shared/AtomDoc'

// ตารางแปลงชุด pagination ในไฟล์ออกแบบ (หน้า 24 Pagination) เป็น component จริงในโค้ด
// ค่าที่รับมาคือคุณสมบัติของชิ้นงานใน Figma แกน size
// ⚠️ ชิ้นงานใน Figma อยู่หน้าแรกจาก 10 หน้า แสดง 1 2 3 … 8 9 10 แต่สูตรในโค้ด (ค่าเริ่มต้นของ siblingCount กับ boundaryCount) ได้ 1 2 3 4 5 … 10
//    จำนวนปุ่มเท่ากันคือ 7 ปุ่ม ความกว้างจึงเท่ากัน ต่างแค่เลขบนปุ่ม
// ⚠️ _pagination-number-button กับ _pagination-ellipsis ไม่มี component เดี่ยวในโค้ด เป็นชิ้นที่วาดอยู่ข้างใน Pagination
//    จึงไม่ใส่ในตาราง หน้าเอกสารจะขึ้นข้อความแทน

type P = Parameters<SampleRenderer>[0]
const str = (v: unknown) => (typeof v === 'string' ? v : undefined)

export const paginationSamples: Record<string, SampleRenderer> = {
  pagination: (p: P) => (
    <Pagination label="ตัวแบ่งหน้าตัวอย่าง" currentPage={1} totalPages={10} size={str(p.size) as PaginationSize} onPageChange={() => {}} />
  ),
}
