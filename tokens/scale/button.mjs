// ─────────────────────────────────────────────────────────────
// BUTTON scale semantic knobs (base + scale) → สูตรคำนวณ size
// แก้ค่าที่นี่ที่เดียว (semantic tier) · generate-scale คำนวณ component tier ให้
//
// สูตร:  size[i] = base + i × step      (i: xs=0 sm=1 md=2 lg=3 xl=4)
//   • spacing ภายใน (padding l/r · gap · icon-only) ใช้ step ร่วม = SCALE
//   • height = มิติภายนอกปุ่ม → base/step ของตัวเอง
//   • padding t/b = 0 คงที่ (height-based ความสูงคุมแทน)
// ─────────────────────────────────────────────────────────────
import { SIZES, RADIUS_FORMULA, RADIUS_SCALE, CONTROL_HEIGHT } from './global-scale.config.mjs';

export const name = 'button';

// ── semantic knobs ───────────────────────────────────────────
// ทุกค่าตรวจกับไฟล์ออกแบบแล้ว (หน้า 12 Buttons · Brand Button) 2026-08-18
export const SCALE = 2;               // step ร่วมของ spacing ภายใน
export const BASE = {
  'padding-x': 8,                     // padding l & r  → 8·10·12·14·16
  gap: 2,                             //                → 2·4·6·8·10
};
export const PADDING_Y = 0;           // padding t & b  → 0 คงที่

// ── ระยะขอบของกรอบข้อความ (ชั้นในสุด) ──────────────────────────
// ⚠️ ค่านี้มีอยู่จริงในไฟล์ออกแบบมาตลอด (ตัวแปร button/title-padding 20 ตัว)
//    แต่ไม่เคยอยู่ในไฟล์สูตร ทำให้ไม่มีใครดูแล เพิ่มเข้ามา 2026-09-14
//
// ทำไมต้องมีระยะขอบอีกชั้น ทั้งที่ตัวปุ่มมีระยะขอบอยู่แล้ว (user ตอบ 2026-09-14):
//   เพื่อ **ถ่วงสายตาเวลาเปิดปิดไอคอน** ให้ปุ่มดูสมดุลเสมอ
//   ถ้าไม่มีชั้นนี้ ตอนเปิดไอคอนข้างเดียว ข้อความจะดูชิดไอคอนมากกว่าชิดขอบอีกด้าน
//   ชั้นนี้ดันข้อความออกจากไอคอนเท่า ๆ กันทุกด้าน ภาพรวมจึงนิ่งไม่ว่าจะเปิดหรือปิดไอคอน
//
// ⚠️ ห้ามยุบรวมกับระยะขอบของปุ่มเด็ดขาด
//    เคยเสนอให้ยุบเมื่อ 2026-09-14 เพราะคิดว่าเป็นระยะขอบสองชั้นที่ซ้ำซ้อน
//    แต่ยุบแล้วจะเสียการถ่วงสายตาตอนเปิดไอคอน ซึ่งเป็นเหตุผลทั้งหมดที่มันมีอยู่
//    ต่างจากกรณีช่องกรอกที่ยุบได้ เพราะช่องกรอกไม่มีไอคอนสองข้างให้ต้องถ่วง
//
// ค่าคงที่ทุกขนาด อ่านจากไฟล์ออกแบบจริง 2026-09-14
export const TITLE_PADDING_X = 4;     // ซ้ายขวาของกรอบข้อความ
export const TITLE_PADDING_Y = 0;     // บนล่าง คงที่ 0 ความสูงคุมด้วยความสูงปุ่ม
export const TITLE_GAP = 0;           // ช่องไฟในกรอบข้อความ ไม่มี เพราะมีลูกชิ้นเดียว
// ความสูงมาจากสเกลกลางร่วมกับช่องกรอก (ตัดสิน 2026-09-01) ห้ามพิมพ์ base/step เองที่นี่
// ปุ่มเปิดใช้ครบทั้ง 5 ขนาด ส่วนช่องกรอกเปิดแค่ sm md lg
export const HEIGHT = CONTROL_HEIGHT; // → 24·32·40·48·56
// ปุ่มไอคอนล้วน: padding = (ความสูง - ขนาดไอคอน) / 2 ต้องได้ค่าที่ทำให้ 3 อย่างนี้สอดคล้องกันเสมอ
//   padding × 2 + icon = height   เช่น xs: 4 + 16 + 4 = 24 ✓
// (ค่า padding ที่เก็บใน Figma เป็น 6/9/12/15/18 ซึ่งตกค้างจากสมัยปุ่มสูง 28/36/44/52/60 ใช้ไม่ได้)
export const ICON_ONLY = { base: 4, step: 3 }; // → 4·7·10·13·16
export const ICON = { base: 16, step: 2 };     // ขนาดไอคอนในปุ่ม → 16·18·20·22·24
// มุมโค้งผันตามขนาดปุ่ม (size-responsive radius) → 6·7·8·9·10
// ค่าอยู่ที่ global (RADIUS_FORMULA.button) เพราะเป็นบุคลิกของแบรนด์ ไม่ใช่กายวิภาคของปุ่ม
// ไฟล์นี้ถือแค่ "ตรรกะว่าเอาค่าไปใช้ยังไง" · แบรนด์สลับค่าที่ global ปุ่มขยับตามทันที
export const RADIUS = RADIUS_FORMULA.button;
export const RADIUS_FULL = RADIUS_SCALE.full;  // ทรงแคปซูล (Figma เดิมเป็น 1e9 ปรับให้ตรงโค้ด)
export const CORNERS = ['top-left', 'top-right', 'bottom-right', 'bottom-left'];

// ── build: คืน semantic (knob) + component (resolved sizes) ───
// dim = helper จาก generate-scale (v → {$type:dimension,$value:'<v>px'})
export function build(dim) {
  const grow = (base, step) => Object.fromEntries(SIZES.map((s, i) => [s, dim(base + i * step)]));

  const component = {
    height: grow(HEIGHT.base, HEIGHT.step),
    padding: {
      l: grow(BASE['padding-x'], SCALE),
      r: grow(BASE['padding-x'], SCALE),
      t: grow(PADDING_Y, 0),
      b: grow(PADDING_Y, 0),
      'icon-only': grow(ICON_ONLY.base, ICON_ONLY.step),
    },
    gap: grow(BASE.gap, SCALE),
    icon: grow(ICON.base, ICON.step),
    'title-padding': {
      l: grow(TITLE_PADDING_X, 0),
      r: grow(TITLE_PADDING_X, 0),
      t: grow(TITLE_PADDING_Y, 0),
      b: grow(TITLE_PADDING_Y, 0),
    },
    'title-gap': grow(TITLE_GAP, 0),
  };

  const semantic = {
    step: dim(SCALE),
    height: { base: dim(HEIGHT.base), step: dim(HEIGHT.step) },
    padding: { base: dim(BASE['padding-x']) },
    gap: { base: dim(BASE.gap) },
    'icon-only': { base: dim(ICON_ONLY.base), step: dim(ICON_ONLY.step) },
    icon: { base: dim(ICON.base), step: dim(ICON.step) },
    radius: { base: dim(RADIUS.base), step: dim(RADIUS.step) },
    'title-padding': { base: dim(TITLE_PADDING_X) },
  };

  // radius แยกออกมา เพราะไม่ได้อยู่ใต้ space.<comp> แต่อยู่ที่ <comp>.radius.<corner>.<size>
  // ใช้กับทั้ง button และ icon-button (ค่าเท่ากัน ยืนยันจาก variable จริงใน Figma)
  const radius = Object.fromEntries([
    ...CORNERS.map((c) => [c, grow(RADIUS.base, RADIUS.step)]),
    ['full', dim(RADIUS_FULL)],
  ]);

  // สมการปิดของปุ่ม ให้ด่านตรวจ spacing บวกกลับทุกขนาดตอน build
  // ตรงกับกฎ "ค่าต้องสอดคล้องกันเอง" ใน CLAUDE.md และคอมเมนต์ของ ICON_ONLY ด้านบน
  const checks = [{
    label: 'ปุ่มไอคอนล้วน ระยะขอบสองข้าง บวก ขนาดไอคอน ต้องเท่าความสูงปุ่ม',
    eq: (at, s) => [at('padding.icon-only', s) * 2 + at('icon', s), at('height', s)],
  }];

  return { name, semantic, component, radius, radiusAppliesTo: ['button', 'icon-button'], checks };
}
