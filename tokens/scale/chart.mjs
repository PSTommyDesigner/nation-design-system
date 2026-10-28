// ─────────────────────────────────────────────────────────────
// CHART กราฟ (หน้า 29 Chart) ตอนนี้นิยามเฉพาะมุมโค้งของแท่ง
//
// กราฟไม่มีหลายขนาด มุมโค้งจึงเป็นค่าคงที่ ไม่ต้องมีสูตร
// เลือก 1 ขั้นจากสเกลกลาง ห้ามพิมพ์ตัวเลขเอง
//
// ── ทำไมโค้งแค่สองมุมบน (ผู้ใช้ตัดสิน 2026-10-28) ──────────────
//   แท่งตั้งอยู่บนเส้นฐาน มุมล่างต้องเหลี่ยมให้ชิดเส้น ถ้าโค้งทั้ง 4 มุม แท่งจะดูลอยจากแกน
//   Polaris กับ Fluent โค้ง 3 ส่วน Chart.js ไม่โค้ง เลือก xs (2) เพราะแท่งกว้างแค่ 12
//   ที่มา docs/research/chart-component.md
//   แตกรายมุมเหมือนการ์ด เพราะ Figma ผูก variable แยกทีละมุม
//
// ── สีไม่ได้อยู่ในนี้ ─────────────────────────────────────────
//   chart/color/* เขียนตรงใน tokens/tokens.json/component.json เพราะเป็นสีที่ชี้ไป semantic
//   ไม่ใช่ค่าที่มาจากสูตร
// ─────────────────────────────────────────────────────────────
import { RADIUS_SCALE } from './global-scale.config.mjs';

export const name = 'chart';

export const BAR_RADIUS = RADIUS_SCALE.xs; // 2px
export const CORNERS = ['top-left', 'top-right'];

export function build(dim) {
  const radius = Object.fromEntries(CORNERS.map((c) => [c, dim(BAR_RADIUS)]));
  return { name, semantic: null, component: null, radius, radiusAppliesTo: ['chart'] };
}
