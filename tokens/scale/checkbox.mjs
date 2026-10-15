// ─────────────────────────────────────────────────────────────
// CHECKBOX component (ช่องติ๊ก · หน้า 15 Checkbox)
//
// ทำตามแบบของ toggle.mjs ทุกชั้น (ผู้ใช้สั่ง 2026-09-11 "ทำตาม Toggle เลย")
// ค่ากล่องกับมุมโค้งวัดจากไฟล์ออกแบบจริงเมื่อ 2026-09-11 ที่เหลือเป็นผลลัพธ์จากสูตร
//
// ── โครงสองชั้น (เหมือน toggle) ───────────────────────────────
//   ชั้นที่ 1 ภาพช่องติ๊ก  มีสเกลของตัวเอง ไม่ผูก CONTROL_HEIGHT
//   ชั้นที่ 2 แถวที่กดได้   ผูก CONTROL_HEIGHT ตรง ๆ เป็นกล่องครอบที่ให้พื้นที่แตะ
//
//   เหตุผลเดียวกับ toggle ทุกข้อ พื้นที่แตะผ่านเกณฑ์โดยไม่ต้องทำให้ช่องติ๊กที่ตาเห็นอ้วนขึ้น
//   วางเรียงแถวเดียวกับปุ่มและช่องกรอกได้พอดี และข้อความช่วยได้ที่ยึดสำหรับจัดวาง
//
// ⚠️ ห้ามเขียนขนาดกล่องเป็นสูตรอนุพันธ์ของ CONTROL_HEIGHT เด็ดขาด
//    บทเรียนเดียวกับที่ toggle.mjs และ avatar.mjs เขียนกำกับไว้
//    ที่ sm กับ md ระยะห่างบังเอิญเท่ากันที่ 16 ทั้งคู่ (16 ต่อ 32 และ 20 ต่อ 40)
//    แต่พอเปิดครบ 5 ขนาดแล้วไม่คงที่เลย คือ 12, 16, 20, 24, 28
//    เพราะสองสเกลใช้ step ต่างกัน (4 กับ 8)
//
// ⚠️ แต่ ROW_HEIGHT ต้องอ้าง CONTROL_HEIGHT จริง ๆ ห้ามพิมพ์ค่าซ้ำ
//    ถ้าวันหนึ่งความสูงปุ่มขยับ แถวช่องติ๊กต้องขยับตาม
//
// ── สิ่งที่เปลี่ยนจากของเดิมในไฟล์ออกแบบ ─────────────────────
//   1. จาก 2 ขนาด (sm md) เป็น 5 ขนาด (ผู้ใช้ตัดสิน 2026-09-11 ให้เท่ากับ toggle และปุ่ม)
//      ขนาด sm กับ md คงค่าเดิมทุกค่า instance ที่ใช้อยู่ 368 จุดจึงไม่ขยับ
//   2. ระยะห่างระหว่างกล่องกับข้อความ จากเดิม sm 8 md 10 เป็น 8 คงที่ทุกขนาด
//      ทำแบบเดียวกับ toggle ที่ใช้ค่าเดียวทุกขนาด ของเดิมที่ไล่ตามขนาดเป็นอาการของการพิมพ์มือ
//   3. ระยะเยื้องของข้อความช่วยมาจากสูตร ของเดิมพิมพ์มือแล้วขนาด md ผิดไป 2px
//      (พิมพ์ 32 ค่าที่ถูกตามของเดิมคือ 30) ทำให้ข้อความช่วยไม่ตรงแนวกับหัวข้อ
//      อาการเดียวกับที่เจอในสวิตช์และช่องกรอก
//   4. มุมโค้งกับขนาดกล่องเคยเป็นค่าดิบไม่ผูกตัวแปร ตอนนี้เป็น token แล้ว
//
// ⚠️ มุมโค้งเปลี่ยนเป็น 2 · 3 · 4 · 5 · 6 เมื่อ 2026-09-14 จากเดิม 0 · 2 · 4 · 6 · 8
//    เกณฑ์คือสัดส่วนมุมโค้งต่อขนาดกล่องต้องนิ่ง ไม่ใช่การคงค่าเดิมไว้
//    สูตรใหม่ให้สัดส่วน 16.7 ถึง 21.4 เปอร์เซ็นต์ ห่างกันแค่ 4.8 จุด ส่วนของเดิมห่าง 28.6 จุด
//    เหตุผลเต็มพร้อมตัวเลขเทียบสามทางอยู่ที่ RADIUS_FORMULA.checkbox ใน global-scale.config.mjs
//
// ⚠️ เครื่องหมายถูกกับขีดกึ่งเลือกเต็มกล่องพอดี ไม่มีระยะขอบใน (วัดของจริงแล้ว)
//    จึงไม่มี token ระยะขอบในของกล่อง ถ้าวันหนึ่งอยากให้เครื่องหมายเล็กกว่ากล่อง
//    ต้องเพิ่ม token ใหม่ ห้ามไปบีบขนาดเครื่องหมายมือ
// ─────────────────────────────────────────────────────────────
import { SIZES, RADIUS_FORMULA, CONTROL_HEIGHT } from './global-scale.config.mjs';

export const name = 'checkbox';

// ── ขนาดที่ช่องติ๊กเปิดใช้ (ครบทุกขั้นเท่า toggle และปุ่ม) ─────
export const CHECKBOX_SIZES = SIZES;

// ── semantic knobs · ชั้นภาพช่องติ๊ก ──────────────────────────
// base คิดที่ดัชนี xs → sm = base + 1×step · md = base + 2×step
export const BOX = { base: 12, step: 4 }; // 12 · 16 · 20 · 24 · 28 (sm กับ md คงค่าเดิมในไฟล์ออกแบบ)
export const BORDER = 1;                  // ความหนาเส้นขอบ คงที่ทุกขนาด (ค่าเดิมในไฟล์)
export const GAP = 8;                     // ระยะระหว่างกล่องกับข้อความ คงที่ทุกขนาด (ทำแบบ toggle)
export const RADIUS = RADIUS_FORMULA.checkbox; // 2 · 3 · 4 · 5 · 6

// ── semantic knobs · ชั้นแถวที่กดได้ ──────────────────────────
export const ROW_HEIGHT = CONTROL_HEIGHT;  // 24 · 32 · 40 · 48 · 56 (อ้างสเกลกลาง ห้ามพิมพ์ค่าซ้ำ)
// บนอุปกรณ์สัมผัสยกแถวเป็นค่าเดียวทุกขนาด ผ่านทั้ง 48dp ของ Android และ 44pt ของ Apple
export const ROW_HEIGHT_TOUCH = 48;

// ── build: คืน semantic (knob) + component (resolved sizes) ───
export function build(dim) {
  const at = (s) => SIZES.indexOf(s);

  // ค่าตั้งต้นค่าเดียวของทั้งไฟล์ ที่เหลือเป็นผลลัพธ์ทั้งหมด
  const box = (s) => BOX.base + at(s) * BOX.step;
  const icon = (s) => box(s);                 // เครื่องหมายเต็มกล่องพอดี
  const indent = (s) => box(s) + GAP;
  const rowH = (s) => ROW_HEIGHT.base + at(s) * ROW_HEIGHT.step;
  const radius = (s) => RADIUS.base + at(s) * RADIUS.step;

  // ── ด่านตรวจ ต้องสอดคล้องกันเองทุกขนาด ─────────────────────
  for (const s of CHECKBOX_SIZES) {
    if (indent(s) !== box(s) + GAP) {
      throw new Error(`checkbox: ขนาด ${s} ไม่ผ่านด่านตรวจ ระยะเยื้อง = กล่อง + ระยะห่าง (${indent(s)} ≠ ${box(s)} + ${GAP})`);
    }
    if (rowH(s) < box(s)) {
      throw new Error(`checkbox: ขนาด ${s} แถวเตี้ยกว่ากล่อง (${rowH(s)} < ${box(s)})`);
    }
    if (radius(s) * 2 > box(s)) {
      throw new Error(`checkbox: ขนาด ${s} มุมโค้ง ${radius(s)} เกินครึ่งกล่อง ${box(s)} จะกลายเป็นวงกลม`);
    }
    if (BORDER * 2 >= box(s)) {
      throw new Error(`checkbox: ขนาด ${s} เส้นขอบหนาจนไม่เหลือพื้นที่ในกล่อง`);
    }
  }

  const grow = (fn, note) =>
    Object.fromEntries(CHECKBOX_SIZES.map((s) => [s, { ...dim(fn(s)), $description: note(fn(s), s) }]));

  const component = {
    size: grow(box, (v, s) =>
      `ขนาดกล่องติ๊กของช่องติ๊กขนาด ${s} เท่ากับ ${v}px เป็นค่าตั้งต้นของทั้ง component เลือกอิสระ ไม่ได้ผูกกับความสูงปุ่ม`),
    icon: grow(icon, (v, s) =>
      `เครื่องหมายถูกและขีดกึ่งเลือกของช่องติ๊กขนาด ${s} เท่ากับ ${v}px เต็มกล่องพอดี ไม่มีระยะขอบใน`),
    border: {
      ...dim(BORDER),
      $description: `ความหนาเส้นขอบของกล่องติ๊กเท่ากับ ${BORDER}px คงที่ทุกขนาด วาดแบบ INSIDE จึงไม่กินพื้นที่นอกกล่อง`,
    },
    gap: {
      ...dim(GAP),
      $description: `ระยะระหว่างกล่องติ๊กกับข้อความเท่ากับ ${GAP}px คงที่ทุกขนาด ตรงกับสวิตช์`,
    },
    indent: grow(indent, (v, s) =>
      `ระยะเยื้องของข้อความช่วยในช่องติ๊กขนาด ${s} เท่ากับ ${v}px มาจาก ขนาดกล่อง ${box(s)} บวก ระยะห่าง ${GAP} ห้ามพิมพ์มือ`),
    row: {
      height: grow(rowH, (v, s) =>
        `ความสูงแถวที่กดได้ของช่องติ๊กขนาด ${s} เท่ากับ ${v}px อ้างสเกลความสูงตัวควบคุมกลาง ทำให้วางแถวเดียวกับปุ่มและช่องกรอกได้พอดี กล่องติ๊กสูง ${box(s)}px จัดกึ่งกลาง เหลือช่องบนล่างข้างละ ${(v - box(s)) / 2}px`),
      'height-touch': {
        ...dim(ROW_HEIGHT_TOUCH),
        $description: `ความสูงแถวบนอุปกรณ์สัมผัสเท่ากับ ${ROW_HEIGHT_TOUCH}px ทุกขนาด ผ่านทั้งเกณฑ์ 48dp ของ Android และ 44pt ของ Apple พร้อมกัน`,
      },
    },
  };

  const semantic = {
    size: { base: dim(BOX.base), step: dim(BOX.step) },
    border: dim(BORDER),
    gap: dim(GAP),
    // แถวอ้างสเกลกลาง ค่าที่เห็นตรงนี้จึงเท่ากับ CONTROL_HEIGHT เสมอ ไม่ได้พิมพ์ซ้ำ
    row: { base: dim(ROW_HEIGHT.base), step: dim(ROW_HEIGHT.step), touch: dim(ROW_HEIGHT_TOUCH) },
    radius: { base: dim(RADIUS.base), step: dim(RADIUS.step) },
  };

  // มุมโค้งผันตามขนาด จึงต้องแตกรายมุม แบบเดียวกับปุ่มและช่องกรอก
  const CORNERS = ['top-left', 'top-right', 'bottom-right', 'bottom-left'];
  const radiusOut = Object.fromEntries(
    CORNERS.map((c) => [c, Object.fromEntries(CHECKBOX_SIZES.map((s) => [s, dim(radius(s))]))]),
  );

  // สมการปิด ให้ด่านตรวจ spacing บวกกลับทุกขนาดตอน build
  const checks = [{
    label: 'ระยะเยื้องข้อความช่วย ต้องเท่ากับ ขนาดกล่อง บวก ระยะห่าง',
    eq: (at2, s) => [at2('indent', s), at2('size', s) + GAP],
  }];

  return { name, semantic, component, radius: radiusOut, radiusAppliesTo: ['checkbox'], checks };
}
