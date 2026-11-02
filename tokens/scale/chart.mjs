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
// ── เส้นและจุดของชุดข้อมูลแบบเส้น (ผู้ใช้ตัดสิน 2026-10-28) ──────
//   กราฟแท่งรวมเส้น ชุดการเข้าชมเปลี่ยนจากแท่งเป็นจุดต่อด้วยเส้น
//   เส้นหนา 2 จุดกว้าง 8 ค่าคงที่ เพราะกราฟไม่มีหลายขนาด
//   จุดต้องใหญ่กว่าเส้นอย่างน้อยเท่าตัว ไม่งั้นมองไม่เห็นว่าเป็นจุด และต้องไม่กว้างเกินแท่ง (12)
//   ไม่ยืมสูตร stroke ของ progress เพราะคนละชนิด ตัวนั้นเป็นวงแหวนหลายขนาด
//
// ── สีไม่ได้อยู่ในนี้ ─────────────────────────────────────────
//   chart/color/* เขียนตรงใน tokens/tokens.json/component.json เพราะเป็นสีที่ชี้ไป semantic
//   ไม่ใช่ค่าที่มาจากสูตร
// ─────────────────────────────────────────────────────────────
import { RADIUS_SCALE } from './global-scale.config.mjs';

export const name = 'chart';

export const BAR_RADIUS = RADIUS_SCALE.xs; // 2px
export const CORNERS = ['top-left', 'top-right'];
export const LINE_WIDTH = 2;
export const POINT_SIZE = 8;
export const BAR_WIDTH = 12; // ผูก size/space/s2/xs ในไฟล์ออกแบบ ใช้ตรวจว่าจุดไม่กว้างเกินแท่ง

export function build(dim) {
  const radius = Object.fromEntries(CORNERS.map((c) => [c, dim(BAR_RADIUS)]));
  if (POINT_SIZE < LINE_WIDTH * 2) {
    throw new Error(`chart: จุด ${POINT_SIZE} ต้องกว้างอย่างน้อยสองเท่าของเส้น ${LINE_WIDTH} ไม่งั้นมองไม่เห็นว่าเป็นจุด`);
  }
  if (POINT_SIZE > BAR_WIDTH) {
    throw new Error(`chart: จุด ${POINT_SIZE} กว้างเกินแท่ง ${BAR_WIDTH} จะทับแท่งของวันข้าง ๆ`);
  }
  const component = {
    'line-width': {
      ...dim(LINE_WIDTH),
      $description: `ความหนาเส้นของชุดข้อมูลแบบเส้น ${LINE_WIDTH}px คงที่ เพราะกราฟไม่มีหลายขนาด`,
    },
    'point-size': {
      ...dim(POINT_SIZE),
      $description: `ความกว้างจุดบนเส้น ${POINT_SIZE}px วงกลม พื้น chart/color/point-fill ขอบ chart/color/line ใหญ่กว่าเส้นอย่างน้อยเท่าตัวและไม่เกินความกว้างแท่ง ${BAR_WIDTH}`,
    },
  };
  return { name, semantic: null, component, radius, radiusAppliesTo: ['chart'] };
}
