// ─────────────────────────────────────────────────────────────
// RADIO component (ปุ่มตัวเลือก · หน้า 16 Radio)
//
// ทำตามแบบของ checkbox.mjs ทุกชั้น (user ตัดสิน 2026-09-18 ให้เท่าช่องติ๊ก)
// เหตุผลคือปุ่มตัวเลือกกับช่องติ๊กต้องสลับกันได้จริงในฟอร์มเดียวกัน
// ถ้าขนาดชื่อเดียวกันแล้วสูงไม่เท่ากัน จะสลับไม่ได้
//
// ── โครงสองชั้น (เหมือน checkbox และ toggle) ──────────────────
//   ชั้นที่ 1 ภาพวงกลม    มีสเกลของตัวเอง ไม่ผูก CONTROL_HEIGHT
//   ชั้นที่ 2 แถวที่กดได้  ผูก CONTROL_HEIGHT ตรง ๆ เป็นกล่องครอบที่ให้พื้นที่แตะ
//
// ⚠️ ห้ามเขียนขนาดวงกลมเป็นสูตรอนุพันธ์ของ CONTROL_HEIGHT เด็ดขาด
//    บทเรียนเดียวกับที่ checkbox.mjs toggle.mjs และ avatar.mjs เขียนกำกับไว้
//    สองสเกลใช้ step ต่างกัน (4 กับ 8) ระยะห่างจึงไม่คงที่เมื่อเปิดครบ 5 ขนาด
//
// ── สิ่งที่เปลี่ยนจากของเดิมในไฟล์ออกแบบ ─────────────────────
//   1. จาก 2 ขนาด (sm md) เป็น 5 ขนาด (user ตัดสิน 2026-09-18)
//      ขนาด sm กับ md คงค่าเดิมทุกค่า ทั้งวงกลมและจุดข้างใน ของเดิมไม่ได้ผิด แค่ทำไม่ครบ
//   2. ระยะห่างระหว่างวงกลมกับข้อความ จากเดิม sm 8 md 10 เป็น 8 คงที่ทุกขนาด
//      ของเดิมที่ไล่ตามขนาดเป็นอาการของการพิมพ์มือ แบบเดียวกับที่เจอในช่องติ๊ก
//   3. ข้อความเดิมไม่ผูก text style เลย และขนาดที่ใช้ไม่ตรงกับ preset ตัวไหน
//      (14px คู่ความสูงบรรทัด 22 และ 16px คู่ 24 ซึ่งระบบไม่มี)
//      เปลี่ยนมาใช้การจับคู่ชุดเดียวกับช่องติ๊ก ผลคือชิ้นงานสูงขึ้น 4px ที่ sm และ md
//   4. มุมโค้งเคยเป็นค่าดิบ 136 จุด ใส่เป็นครึ่งหนึ่งของขนาดเพื่อให้กลม
//      ตอนนี้ใช้ค่าเต็มวงตัวเดียวทุกขนาด (user ตัดสิน 2026-09-18)
//      ดีกว่าค่ารายขนาดตรงที่เปลี่ยนขนาดกี่ครั้งก็ยังกลมสนิท ไม่ต้องตามแก้
//
// ── ⚠️ จุดข้างในไม่ใช่ครึ่งหนึ่งของวงกลม ──────────────────────
//    สัดส่วนจุดต่อวงกลมคือ 33.3 · 37.5 · 40.0 · 41.7 · 42.9 เปอร์เซ็นต์
//    ไล่ขึ้นเล็กน้อยตามขนาดโดยตั้งใจ เพราะวงเล็กต้องเหลือช่องว่างรอบจุดให้เห็นว่าเป็นวงแหวน
//    ค่า sm 6 กับ md 8 มาจากไฟล์ออกแบบจริง ที่เหลือคือสูตรที่ลากผ่านสองจุดนั้น
//
// ── การจับคู่ text preset ต่อขนาด (ชุดเดียวกับช่องติ๊ก) ────────
//    xs  label/sm + body/xs    sm  label/md + body/sm    md  label/lg + body/md
//    lg  label/xl + body/lg    xl  label/xl + body/lg
//    ⚠️ xl ใช้ preset ชุดเดียวกับ lg เพราะบันได preset หมดที่ xl ความสูงรวมจึงเท่ากันที่ 56
// ─────────────────────────────────────────────────────────────
import { SIZES, RADIUS_SCALE, CONTROL_HEIGHT } from './global-scale.config.mjs';

export const name = 'radio';

export const RADIO_SIZES = SIZES;

// ── semantic knobs · ชั้นภาพวงกลม ─────────────────────────────
// base คิดที่ดัชนี xs → sm = base + 1×step · md = base + 2×step
export const BOX = { base: 12, step: 4 }; // 12 · 16 · 20 · 24 · 28 (sm กับ md คงค่าเดิมในไฟล์ออกแบบ)
export const DOT = { base: 4, step: 2 };  //  4 ·  6 ·  8 · 10 · 12 (sm กับ md คงค่าเดิมในไฟล์ออกแบบ)
export const BORDER = 1;                  // ความหนาเส้นขอบ คงที่ทุกขนาด (ค่าเดิมในไฟล์)
export const GAP = 8;                     // ระยะระหว่างวงกลมกับข้อความ คงที่ทุกขนาด (ทำแบบ checkbox)
export const RADIUS = RADIUS_SCALE.full;  // 9999 วงกลมสนิททุกขนาด

// ── semantic knobs · ชั้นแถวที่กดได้ ──────────────────────────
export const ROW_HEIGHT = CONTROL_HEIGHT;  // 24 · 32 · 40 · 48 · 56 (อ้างสเกลกลาง ห้ามพิมพ์ค่าซ้ำ)
// บนอุปกรณ์สัมผัสยกแถวเป็นค่าเดียวทุกขนาด ผ่านทั้ง 48dp ของ Android และ 44pt ของ Apple
export const ROW_HEIGHT_TOUCH = 48;

export function build(dim) {
  const at = (s) => SIZES.indexOf(s);

  const box = (s) => BOX.base + at(s) * BOX.step;
  const dot = (s) => DOT.base + at(s) * DOT.step;
  const indent = (s) => box(s) + GAP;
  const rowH = (s) => ROW_HEIGHT.base + at(s) * ROW_HEIGHT.step;

  // ── ด่านตรวจ ต้องสอดคล้องกันเองทุกขนาด ─────────────────────
  for (const s of RADIO_SIZES) {
    if (indent(s) !== box(s) + GAP) {
      throw new Error(`radio: ขนาด ${s} ไม่ผ่านด่านตรวจ ระยะเยื้อง = วงกลม + ระยะห่าง (${indent(s)} ≠ ${box(s)} + ${GAP})`);
    }
    if (rowH(s) < box(s)) {
      throw new Error(`radio: ขนาด ${s} แถวเตี้ยกว่าวงกลม (${rowH(s)} < ${box(s)})`);
    }
    if (dot(s) >= box(s) - BORDER * 2) {
      throw new Error(`radio: ขนาด ${s} จุด ${dot(s)} ใหญ่จนชนเส้นขอบ วงกลม ${box(s)} หักเส้นขอบสองด้านเหลือ ${box(s) - BORDER * 2}`);
    }
    if (BORDER * 2 >= box(s)) {
      throw new Error(`radio: ขนาด ${s} เส้นขอบหนาจนไม่เหลือพื้นที่ในวงกลม`);
    }
  }

  const grow = (fn, note) =>
    Object.fromEntries(RADIO_SIZES.map((s) => [s, { ...dim(fn(s)), $description: note(fn(s), s) }]));

  const component = {
    size: grow(box, (v, s) =>
      `ขนาดวงกลมของปุ่มตัวเลือกขนาด ${s} เท่ากับ ${v}px เป็นค่าตั้งต้นของทั้ง component เลือกอิสระ ไม่ได้ผูกกับความสูงปุ่ม`),
    dot: grow(dot, (v, s) =>
      `จุดตรงกลางที่แสดงว่าเลือกแล้วของปุ่มตัวเลือกขนาด ${s} เท่ากับ ${v}px คิดเป็น ${Math.round((v / box(s)) * 1000) / 10} เปอร์เซ็นต์ของวงกลม เหลือช่องว่างรอบจุดให้เห็นว่าเป็นวงแหวน`),
    border: {
      ...dim(BORDER),
      $description: `ความหนาเส้นขอบของวงกลมเท่ากับ ${BORDER}px คงที่ทุกขนาด วาดแบบ INSIDE จึงไม่กินพื้นที่นอกวงกลม`,
    },
    gap: {
      ...dim(GAP),
      $description: `ระยะระหว่างวงกลมกับข้อความเท่ากับ ${GAP}px คงที่ทุกขนาด ตรงกับช่องติ๊กและสวิตช์`,
    },
    indent: grow(indent, (v, s) =>
      `ระยะเยื้องของข้อความช่วยในปุ่มตัวเลือกขนาด ${s} เท่ากับ ${v}px มาจาก ขนาดวงกลม ${box(s)} บวก ระยะห่าง ${GAP} ห้ามพิมพ์มือ`),
    row: {
      height: grow(rowH, (v, s) =>
        `ความสูงแถวที่กดได้ของปุ่มตัวเลือกขนาด ${s} เท่ากับ ${v}px อ้างสเกลความสูงตัวควบคุมกลาง ทำให้วางแถวเดียวกับปุ่มและช่องกรอกได้พอดี วงกลมสูง ${box(s)}px จัดกึ่งกลาง เหลือช่องบนล่างข้างละ ${(v - box(s)) / 2}px`),
      'height-touch': {
        ...dim(ROW_HEIGHT_TOUCH),
        $description: `ความสูงแถวบนอุปกรณ์สัมผัสเท่ากับ ${ROW_HEIGHT_TOUCH}px ทุกขนาด ผ่านทั้งเกณฑ์ 48dp ของ Android และ 44pt ของ Apple พร้อมกัน`,
      },
    },
  };

  const semantic = {
    size: { base: dim(BOX.base), step: dim(BOX.step) },
    dot: { base: dim(DOT.base), step: dim(DOT.step) },
    border: dim(BORDER),
    gap: dim(GAP),
    row: { base: dim(ROW_HEIGHT.base), step: dim(ROW_HEIGHT.step), touch: dim(ROW_HEIGHT_TOUCH) },
  };

  // มุมโค้งไม่ผันตามขนาด จึงมีค่าเดียว ไม่ต้องแตกรายมุม ต่างจากช่องติ๊กที่มุมโค้งไล่ตามขนาด
  const radius = { full: dim(RADIUS) };

  const checks = [{
    label: 'ระยะเยื้องข้อความช่วย ต้องเท่ากับ ขนาดวงกลม บวก ระยะห่าง',
    eq: (get, s) => [get('indent', s), get('size', s) + GAP],
  }];

  return { name, semantic, component, radius, radiusAppliesTo: ['radio'], checks };
}
