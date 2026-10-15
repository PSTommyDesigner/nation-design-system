// ─────────────────────────────────────────────────────────────
// LINK BUTTON scale (ปุ่มลิงก์ · หน้า 12 Buttons)
// ครอบคลุม 2 ชุด คือ link-button (มีข้อความ) และ link-icon-button (ไอคอนล้วน)
// มี 3 ตระกูล Brand, Neutral, Error ทุกตระกูลใช้ตัวเลขชุดเดียวกัน
//
// ── ต่างจากปุ่มทึบตรงไหน (สำรวจของจริง 2026-09-02) ─────────────
//   ปุ่มลิงก์ไม่มีพื้นหลังและไม่มีขอบ ความสูงจึงไม่ได้มาจาก CONTROL_HEIGHT
//   แต่ยืดตามความสูงบรรทัดของ text style ที่แต่ละขนาดใช้
//   วัดของจริงแล้วกล่องสูงเท่าความสูงข้อความเป๊ะทุกขนาด 22, 24, 26, 28, 30
//
// ⚠️ ความสูงไม่มีสูตร โดยตั้งใจ (ตามกฎใน CLAUDE.md)
//    ห้ามเขียน base/step ให้ความสูง เพราะตัวเลขนั้นจะไม่ได้คุมอะไรจริง
//    ตัวคุมจริงคือ text style ถ้าจะเปลี่ยนความสูงต้องไปเปลี่ยนที่ preset
//    ตัวเลขที่นี่เก็บไว้เพื่อให้ฝั่งโค้ดเรียกใช้ได้ พร้อม $description บอกที่มา
//
// ⚠️ ระยะขอบเป็น 0 ถาวร (ตัดสิน 2026-09-02 user อนุมัติ)
//    เหตุผลที่วัดได้ 2 ข้อ
//      1. ใส่ซ้ายขวาแล้วตัวอักษรตัวแรกเยื้องออกจากขอบเนื้อหาที่ปุ่มวางต่อท้าย
//      2. ใส่บนล่างแล้วกล่องสูงเกินบรรทัด ไปดันบรรทัดอื่นในย่อหน้าเดียวกัน
//    ตัวแปรใน Figma `link-button/padding/*` ถูกล็อกด้วย description ไว้แล้วว่าห้ามเปลี่ยน
//
// ⚠️ ระยะขอบของ link-icon-button คงที่ 3 ทุกขนาด และเป็นค่าที่ derive ได้
//    padding = (ความสูง ลบ ขนาดไอคอน) หารสอง
//    ได้ค่าคงที่เพราะความสูงกับไอคอนก้าวละ 2 เท่ากัน ผลต่างจึงคงที่ 6 ทุกขนาด
//    ตรวจแล้วบวกกลับได้ทุกขนาด เช่น xl คือ 3 + 24 + 3 = 30
//
// ⚠️ ช่องไฟของ link-icon-button เป็น 0 (ตัดสิน 2026-09-02)
//    เพราะมีลูกตัวเดียว ช่องไฟไม่มีผล ค่าเดิม 4, 4, 5, 6, 4 หลอกคนอ่านเปล่า ๆ
//
// ── ของที่รู้แล้วแต่ยังไม่แก้ ────────────────────────────────
//   ขนาด xs สูง 22 ต่ำกว่าเกณฑ์พื้นที่กด 24x24 ของ WCAG 2.2
//   user ตัดสิน 2026-09-02 ว่า xs ใช้เฉพาะจุด จึงคงไว้ ไม่ต้องแก้
//   ถ้าเอา xs ไปใช้เป็นปุ่มเดี่ยว ต้องเพิ่มพื้นที่กดรอบตัวปุ่มที่ฝั่งโค้ด
// ─────────────────────────────────────────────────────────────
import { SIZES } from './global-scale.config.mjs';

export const name = 'link-button';

// ── semantic knobs ───────────────────────────────────────────
// text style ที่แต่ละขนาดใช้ กับความสูงบรรทัดของมัน (ตัวคุมความสูงจริง)
export const TEXT_PRESET = {
  xs: { name: 'meta/overline', line: 22 },
  sm: { name: 'label/md', line: 24 },
  md: { name: 'label/lg', line: 26 },
  lg: { name: 'label/xl', line: 28 },
  xl: { name: 'title/lg', line: 30 },
};

export const ICON = { base: 16, step: 2 }; // 16 · 18 · 20 · 22 · 24 (ชุดเดียวกับปุ่มทึบใน button.mjs)
export const GAP = { base: 3, step: 1 };   // 3 · 4 · 5 · 6 · 7 ช่องไฟระหว่างไอคอนกับข้อความ
export const PADDING = 0;                  // ทุกด้าน ทุกขนาด ห้ามเปลี่ยน
export const ICON_ONLY_GAP = 0;            // link-icon-button มีลูกตัวเดียว

// ความสูงกล่อง = ความสูงบรรทัดของ preset (ไม่ใช่สูตร)
export const HEIGHT = Object.fromEntries(SIZES.map((s) => [s, TEXT_PRESET[s].line]));

// ระยะขอบของไอคอนล้วน = (ความสูง ลบ ไอคอน) หารสอง → คงที่ 3
export const ICON_ONLY_PADDING = Object.fromEntries(
  SIZES.map((s, i) => [s, (HEIGHT[s] - (ICON.base + i * ICON.step)) / 2]),
);

// ── build ────────────────────────────────────────────────────
export function build(dim) {
  const grow = (base, step, note) =>
    Object.fromEntries(SIZES.map((s, i) => {
      const v = base + i * step;
      return [s, { ...dim(v), $description: note(v, s) }];
    }));

  const คงที่ = (v, note) =>
    Object.fromEntries(SIZES.map((s) => [s, { ...dim(v), $description: note(s) }]));

  const component = {
    height: Object.fromEntries(SIZES.map((s) => [s, {
      ...dim(HEIGHT[s]),
      $description: `ความสูงปุ่มลิงก์ขนาด ${s} เท่ากับ ${HEIGHT[s]}px ค่านี้เป็นผลลัพธ์ ไม่ใช่ตัวคุม ของจริงมาจากความสูงบรรทัดของ text style ${TEXT_PRESET[s].name} เพราะปุ่มลิงก์ไม่มีพื้นหลัง ความสูงจึงยืดตามข้อความ ห้ามแก้ตัวเลขนี้เพื่อเปลี่ยนขนาดปุ่ม ถ้าจะเปลี่ยนต้องเปลี่ยนที่ text style`,
    }])),
    padding: {
      t: คงที่(PADDING, (s) => `ระยะขอบบนของปุ่มลิงก์ขนาด ${s} เป็น 0 เสมอ ถ้าใส่ค่าอื่นกล่องจะสูงเกินบรรทัดแล้วไปดันบรรทัดอื่นในย่อหน้าเดียวกัน`),
      b: คงที่(PADDING, (s) => `ระยะขอบล่างของปุ่มลิงก์ขนาด ${s} เป็น 0 เสมอ ด้วยเหตุผลเดียวกับขอบบน`),
      l: คงที่(PADDING, (s) => `ระยะขอบซ้ายของปุ่มลิงก์ขนาด ${s} เป็น 0 เสมอ ถ้าใส่ค่าอื่นตัวอักษรตัวแรกจะเยื้องออกจากขอบเนื้อหาที่ปุ่มวางต่อท้าย`),
      r: คงที่(PADDING, (s) => `ระยะขอบขวาของปุ่มลิงก์ขนาด ${s} เป็น 0 เสมอ ด้วยเหตุผลเดียวกับขอบซ้าย`),
      'icon-only': Object.fromEntries(SIZES.map((s, i) => [s, {
        ...dim(ICON_ONLY_PADDING[s]),
        $description: `ระยะขอบของ link-icon-button ขนาด ${s} เท่ากับ ${ICON_ONLY_PADDING[s]}px คิดจาก (ความสูง ${HEIGHT[s]} ลบ ไอคอน ${ICON.base + i * ICON.step}) หารสอง บวกกลับต้องได้ ${HEIGHT[s]} เสมอ`,
      }])),
    },
    gap: grow(GAP.base, GAP.step, (v, s) => `ช่องไฟระหว่างไอคอนกับข้อความของปุ่มลิงก์ขนาด ${s} เท่ากับ ${v}px ใช้เฉพาะ link-button ส่วน link-icon-button เป็น 0 เพราะมีลูกตัวเดียว`),
    icon: grow(ICON.base, ICON.step, (v, s) => `ขนาดไอคอนในปุ่มลิงก์ขนาด ${s} เท่ากับ ${v}px กรอบไอคอนใน Figma ล็อกสัดส่วน 1 ต่อ 1 และผูกเฉพาะความสูง ความกว้างวิ่งตามเอง`),
  };

  const semantic = {
    icon: { base: dim(ICON.base), step: dim(ICON.step) },
    gap: { base: dim(GAP.base), step: dim(GAP.step) },
    padding: { base: dim(PADDING) },
    'icon-only': { base: dim(ICON_ONLY_PADDING[SIZES[0]]), step: dim(0) },
    // height ไม่มี base/step โดยตั้งใจ เพราะตัวคุมคือ text style ไม่ใช่ตัวเลขในไฟล์นี้
  };

  // ปุ่มลิงก์ไม่มีพื้นหลังและไม่มีขอบ จึงไม่มีมุมโค้ง ไม่ต้องคืน radius
  return { name, semantic, component };
}
