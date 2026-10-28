// ─────────────────────────────────────────────────────────────
// MODAL component (กล่องโต้ตอบกลางจอ · หน้า 30 Modal)
//
// แผงที่เปิดทับทั้งหน้าเพื่อให้ผู้ใช้ดูหรือตัดสินใจเรื่องเดียวให้จบก่อนกลับไปทำต่อ
// มีฉากหลังมืดกั้น หน้าข้างหลังกดไม่ได้จนกว่าจะปิด
//
// งานวิจัย docs/research/modal-component.md (เทียบ 11 เจ้า) และคำตัดสินของผู้ใช้ 2026-10-28
//
// ── ทำไมมีแค่ 3 ขนาด ─────────────────────────────────────────
//   ผู้ใช้ตัดสินให้มี sm md lg เท่านั้น ขนาดเล็กกว่า 4 คอลัมน์แคบเกินกว่าจะวางหัวข้อกับปุ่มสองปุ่ม
//   และใหญ่กว่า 8 คอลัมน์ควรเป็นหน้าของตัวเองแทนกล่องโต้ตอบ
//
// ── ความกว้างมาจากกริด ไม่ได้ตั้งเอง ─────────────────────────
//   กริด v2022 เดสก์ท็อป คอลัมน์ 80 ร่อง 24 ความกว้าง n คอลัมน์ = n x 80 + (n - 1) x 24
//   ขั้นละ 2 คอลัมน์ จึงได้ base 184 (2 คอลัมน์) step 208 (2 คอลัมน์บวก 2 ร่อง)
//   sm 392 (4) · md 600 (6) · lg 808 (8) ด่านตรวจข้างล่างเช็กว่ายังตกคอลัมน์พอดี
//
// ⚠️ ระยะขอบ lg เป็น 28 ไม่ใช่ 24 ตามงานวิจัย
//    งานวิจัยเสนอ sm 20 กับ md lg 24 แต่กฎสเกลบังคับเส้นตรง base + i x step
//    ผู้ใช้ตัดสิน 2026-10-28 ให้ใช้ base 16 step 4 ได้ 20 · 24 · 28
//
// ⚠️ ไม่มี token ความสูง โดยตั้งใจ ความสูงหดตามเนื้อหา และชนเพดานที่ความสูงจอลบขอบ
//    ส่วนเนื้อหาเลื่อนข้างในเอง ระยะห่างข้างในใช้สเกลกลาง (size/space/*) ไม่ต้องมีชุดของตัวเอง
//    ระยะขอบจอบนมือถือ 16 ก็ใช้สเกลกลาง s2-sm
//
// มุมโค้ง 12 คงที่ทุกขนาด จากขั้น lg ในสเกลกลาง เท่ากับ info-card
// ─────────────────────────────────────────────────────────────
import { SIZES, RADIUS_SCALE } from './global-scale.config.mjs';

export const name = 'modal';

export const MODAL_SIZES = ['sm', 'md', 'lg'];

export const USAGE = {
  sm: 'ยืนยันหรือแจ้งเรื่องเดียว มีข้อความสั้นกับปุ่มไม่เกินสองปุ่ม',
  md: 'ค่าเริ่มต้น ฟอร์มสั้นหรือรายละเอียดของรายการเดียว เช่นรายละเอียดข่าว',
  lg: 'เนื้อหาที่มีแท็บหรือรายการหลายชิ้น เช่นรายการข่าวของนักข่าวหนึ่งคน',
};

// ── semantic knobs ───────────────────────────────────────────
export const GRID = { column: 80, gutter: 24 };   // กริด v2022 เดสก์ท็อป
export const WIDTH = { base: 184, step: 208 };    // 184 · 392 · 600 · 808 · 1016 (2 · 4 · 6 · 8 · 10 คอลัมน์)
export const PADDING = { base: 16, step: 4 };     // 16 · 20 · 24 · 28 · 32

export const RADIUS = RADIUS_SCALE.lg; // 12px
export const CORNERS = ['top-left', 'top-right', 'bottom-right', 'bottom-left'];

// ── ค่าอนุพันธ์ ห้ามตั้งเอง ───────────────────────────────────
const at = (s) => SIZES.indexOf(s);
const width = (s) => WIDTH.base + at(s) * WIDTH.step;
const padding = (s) => PADDING.base + at(s) * PADDING.step;
const columns = (w) => (w + GRID.gutter) / (GRID.column + GRID.gutter);

// ── build ────────────────────────────────────────────────────
export function build(dim) {
  for (const s of MODAL_SIZES) {
    if (!Number.isInteger(columns(width(s)))) {
      throw new Error(`modal: ขนาด ${s} กว้าง ${width(s)} ไม่ตกคอลัมน์ของกริด v2022 (ได้ ${columns(width(s))} คอลัมน์)`);
    }
  }

  const grow = (fn, note) =>
    Object.fromEntries(MODAL_SIZES.map((s) => [s, { ...dim(fn(s)), $description: note(fn(s), s) }]));

  const component = {
    width: grow(width, (v, s) =>
      `ความกว้างกล่องโต้ตอบขนาด ${s} เท่ากับ ${v}px คือ ${columns(v)} คอลัมน์ของกริด v2022 เดสก์ท็อป ${USAGE[s]} บนจอที่แคบกว่านี้กล่องกว้างเต็มจอลบขอบข้างละ 16`),
    padding: grow(padding, (v, s) =>
      `ระยะขอบกล่องโต้ตอบขนาด ${s} เท่ากับ ${v}px เท่ากันทั้งสี่ด้าน ใช้กับหัว เนื้อหา และท้ายกล่อง บนมือถือลดเหลือ 16 ทุกขนาด`),
  };

  const semantic = {
    width: { base: dim(WIDTH.base), step: dim(WIDTH.step) },
    padding: { base: dim(PADDING.base), step: dim(PADDING.step) },
    // ไม่มีความสูง โดยตั้งใจ ความสูงมาจากเนื้อหา
  };

  const radius = Object.fromEntries(CORNERS.map((c) => [c, dim(RADIUS)]));

  return { name, semantic, component, radius, radiusAppliesTo: ['modal'] };
}
