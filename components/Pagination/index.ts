/**
 * แถบแบ่งหน้า Nation Design System หน้า 24 Pagination
 *
 * มีชิ้นงานตัวเดียว คือ `Pagination` ซึ่งเป็นแถบเลขหน้าประกอบเสร็จ
 * เลือกตามขนาดอย่างเดียว ส่วนจำนวนปุ่มเลขเป็นผลของข้อมูล ไม่ใช่แบบของชุด
 *
 * ใช้กับหลังบ้านและหน้าค้นหา หน้าอ่านข่าวใช้ปุ่มโหลดเพิ่ม ซึ่งเป็นชิ้นงานคนละตัวและยังไม่มีในระบบ
 *
 * ตัวช่วยสองตัวท้ายเป็นงานที่ฝั่งผู้ใช้ต้องทำเองหลังเปลี่ยนหน้า ดู README หัวข้อการเข้าถึง
 *   focusResultsHeading  ย้ายโฟกัสไปหัวข้อผลลัพธ์
 *   pageStatusText       ข้อความสำหรับพื้นที่ประกาศแบบ polite
 */
export { Pagination, default } from './Pagination';

export type {
  PaginationProps,
  PaginationBaseProps,
  PaginationNavigationProps,
} from './Pagination';

export {
  buildPageItems,
  readPagination,
  focusResultsHeading,
  pageStatusText,
  DEFAULT_SIBLING_COUNT,
  DEFAULT_BOUNDARY_COUNT,
  DEFAULT_PREVIOUS_LABEL,
  DEFAULT_NEXT_LABEL,
} from './types';

export type {
  PaginationSize,
  PaginationItem,
  PaginationReading,
  PageListInput,
  PageStatusInput,
} from './types';
