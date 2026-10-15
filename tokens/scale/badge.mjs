// ─────────────────────────────────────────────────────────────
// BADGE component (ป้ายสถานะ · หน้า 22 Badge)
//
// ⚠️ เขียนใหม่ 2026-09-22 หลัง user สั่งให้ป้ายตามแท็กทุกมิติ
//    เดิมป้ายใช้ค่าร่วมกับแท็ก "เกือบทั้งหมด" แต่พอแท็กปรับบันไดความสูง
//    และแยกตัวแปรตามทรงเมื่อ 2026-09-18 ป้ายก็หลุดจากแท็กไปทุกมิติ
//
// ── Badge ต่างจาก Tag ตรงไหน (ตัดสิน 2026-09-10) ──────────────
//   Badge เป็นของที่ระบบพูดกับผู้ใช้ Tag เป็นของที่ผู้ใช้พูดกับระบบ
//   Badge จึงเป็นของนิ่งถาวร **ไม่มีแกน state ไม่มี hover ไม่มี disabled**
//   ถ้าที่ไหนต้องการของกดได้ ให้ใช้ Tag ไม่ใช่ Badge
//   เหตุผลเต็มอยู่ที่ docs/research/badge-component.md
//
// ── 5 ชุดต่อตระกูล ─────────────────────────────────────────────
//   semi-rounded-badge · pill-badge · semi-rounded-icon-badge
//   circular-icon-badge · link-badge
//   สไตล์อยู่ในแกน hierarchy 3 ระดับ
//     primary พื้นทึบ · secondary พื้นอ่อน · tertiary มีขอบ
//
// ⚠️ ระดับล่างสุดแยกออกเป็นชุดของตัวเองแล้ว (user สั่ง 2026-09-22)
//    เดิม quaternary คือข้อความล้วน ตอนนี้เป็นชุด link-badge
//    ทำตามที่แท็กแยก tertiary ออกเป็น link-tag เมื่อ 2026-09-18
//
// ⚠️ ชื่อระดับของป้ายกับของแท็กหมายถึงคนละหน้าตา รู้ตัวและยอมรับแล้ว
//    ป้าย secondary คือพื้นอ่อน tertiary คือมีขอบ
//    ส่วนแท็กไม่มีพื้นอ่อน secondary ของแท็กจึงคือมีขอบ
//
// ── โครงชื่อ ยึดตามชื่อชุดในไฟล์ออกแบบตรงตัว ──────────────────
//   Figma  semi-rounded-badge/padding/left/md      → semi-rounded.padding.left.md
//   Figma  semi-rounded-badge/icon-badge/padding/md → semi-rounded.icon-badge.padding.md
//   Figma  circular-icon-badge/padding/md           → circular.padding.md
//   Figma  link-badge/title-padding/left/md         → link.title-padding.left.md
//   ทรง circular มีเฉพาะป้ายไอคอนล้วน จึงไม่มีชั้นชนิดซ้อนอีก
// ─────────────────────────────────────────────────────────────
import { SIZES, RADIUS_SCALE, RADIUS_FORMULA } from './global-scale.config.mjs';

export const name = 'badge';

// ── ความสูง ยกบันไดมาจากแท็กทั้งชุด ──────────────────────────
export const HEIGHT = { base: 18, step: 4 };   // 18 · 22 · 26 · 30 · 34

// preset ที่แต่ละขนาดใช้ กับความสูงบรรทัดของมัน (ชุดเดียวกับแท็ก)
// ตระกูล label เป็น Prompt น้ำหนัก 500 ซึ่งเป็นบทบาท UI ตรงตามกฎฟอนต์
// ⚠️ sm ใช้ตัวอักษรขนาดเดียวกับ xs โดยตั้งใจ sm จึงเป็น xs ที่สูงขึ้น
export const TEXT_PRESET = {
  xs: { name: 'label/xs', size: 10, line: 16 },
  sm: { name: 'label/xs', size: 10, line: 16 },
  md: { name: 'label/sm', size: 12, line: 22 },
  lg: { name: 'label/md', size: 14, line: 24 },
  xl: { name: 'label/lg', size: 16, line: 26 },
};

// ── มิติที่ยกมาจากแท็กทั้งหมด (user สั่ง 2026-09-22) ───────────
// ระยะขอบซ้ายขวาแยกตามทรง เพราะทรงแคปซูลต้องกันมุมโค้งมากกว่า
export const PADDING_X = {
  'semi-rounded': { base: 4, step: 1 },  // 4 · 5 · 6 · 7 · 8
  pill: { base: 6, step: 1 },            // 6 · 7 · 8 · 9 · 10
};
export const PADDING_NO = 0;
export const TITLE_PADDING = { base: 1, step: 1 }; // 1 · 2 · 3 · 4 · 5
export const GAP = 2;
export const ICON = { base: 10, step: 2 };         // 10 · 12 · 14 · 16 · 18
export const RADIUS_CORNER = RADIUS_FORMULA.badge; // 3 · 3.5 · 4 · 4.5 · 5
export const RADIUS_FULL = RADIUS_SCALE.full;      // 9999px ทรงแคปซูลและทรงกลม
export const CORNERS = ['top-left', 'top-right', 'bottom-right', 'bottom-left'];

const at = (s) => SIZES.indexOf(s);
export const heightAt = (s) => HEIGHT.base + at(s) * HEIGHT.step;
export const iconAt = (s) => ICON.base + at(s) * ICON.step;
export const radiusAt = (s) => RADIUS_CORNER.base + at(s) * RADIUS_CORNER.step;

// ระยะขอบบนล่างของกล่อง = (ความสูง ลบ ความสูงบรรทัด) หารสอง → 1 · 3 · 2 · 3 · 4
export const PADDING_Y = Object.fromEntries(
  SIZES.map((s) => [s, (heightAt(s) - TEXT_PRESET[s].line) / 2]),
);
// ระยะขอบของป้ายไอคอนล้วน = (ความสูง ลบ ขนาดไอคอน) หารสอง → 4 · 5 · 6 · 7 · 8
// ⚠️ เป็นผลลัพธ์ ไม่ใช่ค่าตั้ง ถ้าความสูงหรือไอคอนขยับ ค่านี้ต้องขยับตาม
export const ICON_PADDING = Object.fromEntries(
  SIZES.map((s) => [s, (heightAt(s) - iconAt(s)) / 2]),
);

// ── ด่านตรวจ ต้องผ่านก่อนสร้างไฟล์ ────────────────────────────
for (const s of SIZES) {
  const h = heightAt(s);
  if (PADDING_Y[s] * 2 + TEXT_PRESET[s].line !== h)
    throw new Error(`badge: ขนาด ${s} ระยะขอบบนล่าง ${PADDING_Y[s]} คูณสอง บวกความสูงบรรทัด ${TEXT_PRESET[s].line} ไม่เท่ากับความสูง ${h}`);
  if (ICON_PADDING[s] * 2 + iconAt(s) !== h)
    throw new Error(`badge: ขนาด ${s} ระยะขอบไอคอน ${ICON_PADDING[s]} คูณสอง บวกขนาดไอคอน ${iconAt(s)} ไม่เท่ากับความสูง ${h}`);
  for (const [k, v] of [['ระยะขอบบนล่าง', PADDING_Y[s]], ['ระยะขอบไอคอน', ICON_PADDING[s]]])
    if (!Number.isInteger(v) || v < 0)
      throw new Error(`badge: ขนาด ${s} ${k} เป็น ${v} ซึ่งไม่ใช่จำนวนเต็มบวก แปลว่า preset กับความสูงไม่เข้ากัน`);
  if (iconAt(s) > h) throw new Error(`badge: ขนาด ${s} ไอคอน ${iconAt(s)} ใหญ่กว่าความสูง ${h}`);
  for (const shape of ['semi-rounded', 'pill']) {
    const px = PADDING_X[shape].base + at(s) * PADDING_X[shape].step;
    const tp = TITLE_PADDING.base + at(s) * TITLE_PADDING.step;
    if (tp >= px) throw new Error(`badge: ทรง ${shape} ขนาด ${s} ระยะขอบกรอบข้อความ ${tp} ไม่ควรมากกว่าหรือเท่าระยะขอบกล่อง ${px}`);
  }
}

// ── build ────────────────────────────────────────────────────
export function build(dim) {
  const each = (fn, note) =>
    Object.fromEntries(SIZES.map((s) => [s, { ...dim(fn(s)), $description: note(fn(s), s) }]));
  const grow = (k, note) => each((s) => k.base + at(s) * k.step, note);
  const flat = (v, note) => each(() => v, note);

  const size = each(heightAt, (v, s) =>
    `ความสูงป้ายขนาด ${s} เท่ากับ ${v}px คิดจากระยะขอบ ${PADDING_Y[s]} คูณสอง บวกความสูงบรรทัด ${TEXT_PRESET[s].line} ของ ${TEXT_PRESET[s].name} บันไดเดียวกับแท็ก`);

  const paddingY = (side) => each((s) => PADDING_Y[s], (v, s) =>
    `ระยะขอบ${side}ของป้ายขนาด ${s} เท่ากับ ${v}px เป็นผลลัพธ์จาก (ความสูง ${heightAt(s)} ลบความสูงบรรทัด ${TEXT_PRESET[s].line} ของ ${TEXT_PRESET[s].name}) หารสอง ไม่ใช่สูตร`);

  const textShape = (shape) => ({
    size,
    padding: {
      top: paddingY('บน'),
      bottom: paddingY('ล่าง'),
      left: grow(PADDING_X[shape], (v, s) => `ระยะขอบซ้ายของกล่องป้ายทรง ${shape} ขนาด ${s} เท่ากับ ${v}px`),
      right: grow(PADDING_X[shape], (v, s) => `ระยะขอบขวาของกล่องป้ายทรง ${shape} ขนาด ${s} เท่ากับ ${v}px`),
      no: { ...dim(PADDING_NO), $description: `ระยะขอบแบบชนขอบเท่ากับ ${PADDING_NO}px` },
    },
    'title-padding': {
      left: grow(TITLE_PADDING, (v, s) => `ระยะขอบซ้ายของกรอบข้อความในป้ายขนาด ${s} เท่ากับ ${v}px`),
      right: grow(TITLE_PADDING, (v, s) => `ระยะขอบขวาของกรอบข้อความในป้ายขนาด ${s} เท่ากับ ${v}px`),
    },
    gap: flat(GAP, (v, s) => `ช่องไฟระหว่างข้อความกับไอคอนของป้ายขนาด ${s} เท่ากับ ${v}px`),
    icon: grow(ICON, (v, s) => `ไอคอนของป้ายขนาด ${s} เท่ากับ ${v}px`),
  });

  // ป้ายไอคอนล้วน ระยะขอบเท่ากันทั้งสี่ด้าน เพราะไอคอนเป็นสี่เหลี่ยมจัตุรัส
  const iconOnly = () => ({
    size,
    padding: each((s) => ICON_PADDING[s], (v, s) =>
      `ระยะขอบทั้งสี่ด้านของป้ายไอคอนล้วนขนาด ${s} เท่ากับ ${v}px เป็นผลลัพธ์จาก (ความสูง ${heightAt(s)} ลบไอคอน ${iconAt(s)}) หารสอง`),
    icon: each(iconAt, (v, s) => `ไอคอนของป้ายไอคอนล้วนขนาด ${s} เท่ากับ ${v}px`),
    // ป้ายไอคอนล้วนมีลูกชิ้นเดียว ช่องไฟจึงไม่มีผลต่อหน้าตา
    // แต่ประกาศไว้เพื่อให้ทุกชุดผูกตัวแปรได้ครบ ไม่ต้องเหลือค่าดิบ
    gap: flat(GAP, (v, s) => `ช่องไฟของป้ายไอคอนล้วนขนาด ${s} เท่ากับ ${v}px ไม่มีผลเพราะมีลูกชิ้นเดียว`),
  });

  const component = {
    'semi-rounded': { ...textShape('semi-rounded'), 'icon-badge': iconOnly() },
    pill: textShape('pill'),
    circular: iconOnly(),
    // ป้ายแบบลิงก์ ไม่มีพื้นไม่มีขอบ ระยะขอบเป็นศูนย์ทุกด้าน
    // ความสูงเท่าความสูงบรรทัดของ preset ตรง ๆ ตามกฎว่าของที่ text style คุมความสูง
    // ห้ามทำสูตรความสูงให้
    link: {
      size: each((s) => TEXT_PRESET[s].line, (v, s) =>
        `ความสูงป้ายแบบลิงก์ขนาด ${s} เท่ากับ ${v}px มาจากความสูงบรรทัดของ ${TEXT_PRESET[s].name} ตรง ๆ เพราะระยะขอบเป็นศูนย์`),
      padding: { no: { ...dim(PADDING_NO), $description: `ระยะขอบของป้ายแบบลิงก์เท่ากับ ${PADDING_NO}px ทุกด้าน เพราะไม่มีพื้นและไม่มีขอบ` } },
      'title-padding': {
        left: grow(TITLE_PADDING, (v, s) => `ระยะขอบซ้ายของกรอบข้อความในป้ายแบบลิงก์ขนาด ${s} เท่ากับ ${v}px`),
        right: grow(TITLE_PADDING, (v, s) => `ระยะขอบขวาของกรอบข้อความในป้ายแบบลิงก์ขนาด ${s} เท่ากับ ${v}px`),
      },
      gap: flat(GAP, (v, s) => `ช่องไฟของป้ายแบบลิงก์ขนาด ${s} เท่ากับ ${v}px`),
      icon: grow(ICON, (v, s) => `ไอคอนของป้ายแบบลิงก์ขนาด ${s} เท่ากับ ${v}px`),
    },
  };

  const semantic = {
    height: { base: dim(HEIGHT.base), step: dim(HEIGHT.step) },
    icon: { base: dim(ICON.base), step: dim(ICON.step) },
    padding: {
      x: {
        'semi-rounded': { base: dim(PADDING_X['semi-rounded'].base), step: dim(PADDING_X['semi-rounded'].step) },
        pill: { base: dim(PADDING_X.pill.base), step: dim(PADDING_X.pill.step) },
      },
      no: dim(PADDING_NO),
    },
    'title-padding': { base: dim(TITLE_PADDING.base), step: dim(TITLE_PADDING.step) },
    gap: dim(GAP),
    // ระยะขอบบนล่างกับระยะขอบไอคอนไม่มี base/step เพราะเป็นผลลัพธ์
  };

  const radius = {
    'semi-rounded': Object.fromEntries(SIZES.map((s) => [s,
      Object.fromEntries(CORNERS.map((c) => [c, {
        ...dim(radiusAt(s)),
        $description: `มุมโค้ง ${c} ของป้ายทรงมุมมนขนาด ${s} เท่ากับ ${radiusAt(s)}px จากสูตร base ${RADIUS_CORNER.base} step ${RADIUS_CORNER.step}`,
      }])),
    ])),
    pill: { full: dim(RADIUS_FULL) },
    circular: { full: dim(RADIUS_FULL) },
  };

  // สมการปิด ให้ด่านตรวจ spacing บวกกลับทุกขนาดตอน build
  const checks = ['semi-rounded', 'pill'].map((shape) => ({
    label: `${shape} ระยะขอบบน + ความสูงบรรทัด + ระยะขอบล่าง = ความสูงป้าย`,
    eq: (get, s) => {
      const top = get(`${shape}.padding.top`, s);
      const bottom = get(`${shape}.padding.bottom`, s);
      const h = get(`${shape}.size`, s);
      if ([top, bottom, h].some((v) => v === undefined)) return null;
      return [top + TEXT_PRESET[s].line + bottom, h];
    },
  }));

  return { name, semantic, component, radius, radiusAppliesTo: ['badge'], checks };
}

// ── สถานะการ sync กับไฟล์ออกแบบ (2026-09-22) ─────────────────
// ไฟล์นี้เขียนตามที่ user สั่งให้ป้ายตามแท็กทุกมิติ ค่าที่เปลี่ยนจากของเดิม
//   ความสูง          16 20 24 28 32  →  18 22 26 30 34
//   ระยะขอบบนล่าง     0 2 1 2 3       →  1 3 2 3 4
//   ระยะขอบซ้ายขวา    5 5 6 7 8       →  มุมมน 4 5 6 7 8 · แคปซูล 6 7 8 9 10
//   ระยะขอบกรอบข้อความ 2 2 2 3 4       →  1 2 3 4 5
//   ขนาดไอคอน        12 14 16 18 20  →  10 12 14 16 18
//   ระยะขอบไอคอนล้วน  2 3 4 5 6       →  4 5 6 7 8
//   ช่องไฟ            0               →  2
//   มุมโค้ง           4 คงที่          →  3 3.5 4 4.5 5 รายขนาด
// ⚠️ ไอคอนเล็กลง 2px แต่กล่องโตขึ้น 2px ป้ายไอคอนล้วนจึงดูโปร่งกว่าเดิมชัดเจน
//    สัดส่วนไอคอนต่อกล่องลดจาก 67% เหลือ 56% user ดูแล้วตัดสินคงไว้ 2026-09-22
//    ห้ามย้อน ICON กลับเป็น base 12 เพราะจะหลุดจากแท็กอีก
