// ─────────────────────────────────────────────────────────────
// AVATAR component (อวาตาร์แสดงตัวตนผู้ใช้ · หน้า 11 Avatar)
//
// ทุกค่าในไฟล์นี้วัดจากไฟล์ออกแบบจริง 2026-08-27 แล้วปรับตามผลวิจัย DS 12 เจ้า
// (docs/research/avatar-component.md) ตามที่ผู้ใช้ตัดสิน 2026-08-27
//
// ── กายวิภาค (หลังปรับ) ───────────────────────────────────────
//   กล่องอวาตาร์ = ขนาดที่ประกาศ = รูปที่มองเห็นจริง
//   วงแหวนวาดด้วย stroke OUTSIDE ล้นออกนอกกล่อง ไม่กินที่ข้างใน
//   ไอคอนข้างในกำหนดเป็นตารางขนาด แล้วปล่อยให้ระยะเว้นขอบเป็นผลลัพธ์
//     ระยะเว้นขอบ = (ขนาด - ไอคอน) / 2 → 4 · 6 · 8 · 10 · 12
//     จึงไม่มี token padding ของอวาตาร์ (ตั้งค่ากลางด้วย auto-layout แทน)
//
// ⚠️ ของเดิมเป็นแบบตรงข้าม คือเว้น padding 2 ไว้ให้วงแหวนกินที่ข้างใน
//    ทำให้ "ขนาด 56" ได้รูปจริงแค่ 52 และ state focused ที่ไม่มีวงแหวน
//    เหลือที่ว่างเปล่า 4px ผู้ใช้ตัดสินให้ย้ายวงแหวนออกนอกกล่อง (แบบ ก.)
//    ตรงกับที่ทุกเจ้าในตลาดทำ (วาดด้วย box-shadow หรือ border นอกกล่อง)
//
// ⚠️ ขนาดอวาตาร์ (24 32 40 48 56) ตรงกับความสูงปุ่มทุกขนาด
//    ตัดสิน 2026-08-27 ว่า "ไม่รวมสูตรกับปุ่ม" ให้แยกกันไปเลย
//    มีหลักฐานหนุน: 11 ใน 12 เจ้าที่วิจัยก็ไม่ผูกขนาดอวาตาร์กับปุ่ม
//    มีแต่ Ant Design เจ้าเดียวที่ผูกกับ controlHeight และผูกได้เพราะ
//    เขามีแค่ 3 ขนาดที่จบพอดีที่ 40 ส่วนของเราไปถึง 56 ซึ่งพ้นย่านปุ่มแล้ว
//    ถ้าจะแก้ขนาดอวาตาร์ ให้แก้ที่ไฟล์นี้ ห้ามไปอ้าง button.mjs
// ─────────────────────────────────────────────────────────────
import { SIZES, RADIUS_SCALE } from './global-scale.config.mjs';

export const name = 'avatar';

// ── semantic knobs ───────────────────────────────────────────
export const SIZE = { base: 24, step: 8 };  // ขนาดกล่อง → 24·32·40·48·56
export const ICON = { base: 16, step: 4 };  // ไอคอนข้างใน → 16·20·24·28·32
export const RING = 2;                      // วงแหวนรอบอวาตาร์ วาด OUTSIDE ล้นนอกกล่อง
export const INDICATOR_RING = 1;           // วงแหวนรอบจุดบอกสถานะ บางกว่าวงแหวนอวาตาร์ครึ่งหนึ่ง
// ⚠️ แยก token จาก RING เพราะคนละหน้าที่ (ตัดสิน 2026-10-15)
//    RING คือวงแหวนรอบตัวอวาตาร์ ใช้บอกว่าเป็นของใครหรือเน้นตอนชี้
//    INDICATOR_RING คือขอบขาวรอบจุดสถานะ มีไว้ให้จุดอ่านออกเมื่อทับบนรูปที่สีใกล้กัน
//    วัดจากไฟล์ออกแบบจริงได้ 1 จำนวน 38 จุด ก่อนหน้านี้ฝั่งโค้ดยืม RING (2) มาใช้ จึงหนากว่าแบบเท่าตัว
//    หลักการเดียวกับที่ tabs.mjs แยก tab/divider ออกจาก tab/rail และที่ divider.mjs แยกออกมาอีกที

// จุดบอกสถานะออนไลน์ มี 5 ขนาดคู่กับอวาตาร์ 5 ขนาด
// ขนาดที่ 6 (16px) ถูกตัดทิ้ง 2026-08-27 เพราะไม่มีอวาตาร์ขนาดไหนใช้ (instance = 0)
export const INDICATOR = { base: 6, step: 2 }; // → 6·8·10·12·14

// กลุ่มอวาตาร์ซ้อนกัน มีแค่ 3 ขนาด (xs sm md)
// เก็บเป็นค่าติดลบเพราะใช้เป็น gap ของ auto-layout และ margin ติดลบในโค้ดได้ตรง ๆ
// สัดส่วนที่ได้ 17% · 25% · 30% ของขนาดอวาตาร์ อยู่ในกรอบที่ตลาดใช้
// วงแหวนคั่นระหว่างตัวที่ซ้อนกันไม่มี token แยก เพราะใช้ RING ของอวาตาร์เอง
// (ตรวจไฟล์จริง 2026-09-01 อวาตาร์ทุกตัวมีวงแหวน 2px ผูกสีไว้แล้ว ตั้งชื่อซ้ำจะได้ค่าหลุดกัน)
export const GROUP_SIZES = ['xs', 'sm', 'md'];
export const GROUP_OVERLAP = { base: 4, step: 4 }; // → -4·-8·-12
export const GROUP_MAX = 5;    // จำนวนหน้าคนสูงสุดก่อนตัดเป็นตัวเลข ไม่นับช่องตัวเลขและปุ่มเพิ่มคน

// avatar-label เริ่มที่ sm ไม่มี xs (ข้อความ 2 บรรทัดใส่ในอวาตาร์ 24 ไม่ได้)
// ⚠️ ความสูงของ label คุมด้วย line-height ของ text style preset ห้ามทำสูตรความสูงให้
export const LABEL_SIZES = ['sm', 'md', 'lg', 'xl'];
export const LABEL_GAP = { base: 8, step: 4 }; // → 8·12·16·20

export const RADIUS_FULL = RADIUS_SCALE.full; // 9999px ทรงวงกลม

// ── build: คืน semantic (knob) + component (resolved sizes) ───
// dim = helper จาก generate-scale (v → {$type:dimension,$value:'<v>px'})
export function build(dim) {
  const grow = (sizes, base, step, note) =>
    Object.fromEntries(
      sizes.map((s, i) => [s, { ...dim(base + i * step), $description: note(base + i * step, s) }]),
    );

  const size = grow(SIZES, SIZE.base, SIZE.step, (v) => `กล่องอวาตาร์ ${v}px เท่ากับรูปที่มองเห็นจริง วงแหวนวาดล้นออกนอกกล่อง`);
  const icon = grow(SIZES, ICON.base, ICON.step, (v, s) => {
    const box = SIZE.base + SIZES.indexOf(s) * SIZE.step;
    return `ไอคอนใน avatar-icon ${v}px ได้ระยะเว้นขอบ ${(box - v) / 2}px จากการจัดกลางใน ${box}px`;
  });

  if (!Number.isInteger(INDICATOR_RING) || INDICATOR_RING < 1) {
    throw new Error(`avatar: วงแหวนจุดสถานะต้องเป็นจำนวนเต็มอย่างน้อย 1 (ได้ ${INDICATOR_RING})`);
  }
  if (INDICATOR_RING > RING) {
    throw new Error(`avatar: วงแหวนจุดสถานะ (${INDICATOR_RING}) ต้องไม่หนากว่าวงแหวนอวาตาร์ (${RING}) ไม่งั้นจุดจะเด่นกว่าตัวอวาตาร์`);
  }
  const component = {
    size,
    icon,
    ring: { ...dim(RING), $description: `วงแหวนรอบอวาตาร์ ${RING}px วาด stroke OUTSIDE ล้นนอกกล่อง ไม่ลดขนาดรูป` },
    'indicator-ring': { ...dim(INDICATOR_RING), $description:
      `วงแหวนรอบจุดบอกสถานะ ${INDICATOR_RING}px มีไว้ให้จุดอ่านออกเมื่อทับบนรูปที่สีใกล้กัน `
      + `แยก token จาก avatar/ring เพราะคนละหน้าที่ ตัวนั้นคือวงแหวนรอบตัวอวาตาร์` },
    indicator: grow(SIZES, INDICATOR.base, INDICATOR.step, (v, s) => `จุดบอกสถานะของอวาตาร์ขนาด ${s} เท่ากับ ${v}px`),
    group: {
      overlap: Object.fromEntries(
        GROUP_SIZES.map((s, i) => {
          const v = -(GROUP_OVERLAP.base + i * GROUP_OVERLAP.step);
          const box = SIZE.base + SIZES.indexOf(s) * SIZE.step;
          return [s, { ...dim(v), $description: `ระยะซ้อนของกลุ่มขนาด ${s} เท่ากับ ${v}px คิดเป็น ${Math.round((-v / box) * 100)} เปอร์เซ็นต์ของขนาดอวาตาร์` }];
        }),
      ),
    },
    label: {
      gap: grow(LABEL_SIZES, LABEL_GAP.base, LABEL_GAP.step, (v, s) => `ระยะระหว่างรูปกับข้อความใน avatar-label ขนาด ${s} เท่ากับ ${v}px`),
    },
  };

  const semantic = {
    size: { base: dim(SIZE.base), step: dim(SIZE.step) },
    icon: { base: dim(ICON.base), step: dim(ICON.step) },
    ring: dim(RING),
    indicator: { base: dim(INDICATOR.base), step: dim(INDICATOR.step) },
    group: {
      overlap: { base: dim(-GROUP_OVERLAP.base), step: dim(-GROUP_OVERLAP.step) },
    },
    label: { gap: { base: dim(LABEL_GAP.base), step: dim(LABEL_GAP.step) } },
  };

  // อวาตาร์เป็นวงกลมล้วน ไม่มีทรงเหลี่ยม จึงมีแค่ค่าเต็มวง ไม่ต้องแตกราย 4 มุม
  const radius = { full: dim(RADIUS_FULL) };

  // ระยะซ้อนของกลุ่มติดลบโดยตั้งใจ เพราะเป็น gap ติดลบที่ดึงอวาตาร์ตัวถัดไปให้เกยกัน
  // ประกาศไว้ให้ด่านตรวจ spacing ใน scripts/generate-scale.mjs ปล่อยผ่าน
  return { name, semantic, component, radius, radiusAppliesTo: ['avatar'], allowNegative: ['group.overlap'] };
}
