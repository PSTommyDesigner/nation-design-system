// ─────────────────────────────────────────────────────────────
// TAG component (แท็ก · หน้า 21 Tags)
//
// ⚠️ เขียนสูตรใหม่ 2026-09-22 (รอบสาม) หลังอ่านตัวแปรจริงทั้ง 589 ตัวจากไฟล์ออกแบบ
//    รอบสองเขียนไว้ตอนโครงยังมี 10 ชุด ก่อน user ปรับงานออกแบบ 2026-09-18
//    ซึ่งเพิ่ม link-tag เพิ่มตระกูล Brown และแยกมิติของแต่ละชนิดออกจากกันหมด
//
// ── โครง 2 ชั้น ทรง คูณ ชนิด ─────────────────────────────────
//   ทรง  semi-rounded (มุมมน) · pill (แคปซูล) · link (ไม่มีพื้นไม่มีขอบ)
//   ชนิด ชุดฐาน (ไม่มีของนำหน้า) · number-tag · image-tag · checkbox-tag · indicator-tag
//   รวม 11 ชุดชื่อ คูณ 11 ตระกูลสี = 121 ชุดในไฟล์ออกแบบ
//
//   ชื่อและการซ้อนชั้นยึดตามตัวแปรใน Figma ตรงตัว (user สั่ง 2026-09-17)
//     Figma  semi-rounded-tag/padding/left/md            → semi-rounded.padding.left.md
//     Figma  semi-rounded-tag/number-tag/padding/left/md → semi-rounded.number-tag.padding.left.md
//     Figma  link-tag/icon/md                            → link.icon.md
//   ที่ยังต่างคือ prefix space.tag ซึ่งเป็นกติกาของทั้งโปรเจกต์ ไม่ใช่ของแท็กโดยเฉพาะ
//   และคำว่า tag ท้ายชื่อทรง ซึ่งตัดออกเพราะ prefix บอกอยู่แล้วว่าเป็นแท็ก
//
// ── ⚠️ ความสูง คือสิ่งที่ตัดสินสเกลของแท็ก ────────────────────
// user ปรับบันไดเป็น 18 ถึง 34 เมื่อ 2026-09-18 (เดิม 16 ถึง 32)
// วัดจากชิ้นงานจริงในไฟล์ออกแบบ 2026-09-22 ตรงกันทุกชุดทุกตระกูล
export const HEIGHT = { base: 18, step: 4 }; // → 18 · 22 · 26 · 30 · 34
//
// ── ความสูงบรรทัดของ preset ที่แต่ละขนาดใช้จริง ────────────────
//   xs → label/xs (10px)   sm → label/xs (10px)   md → label/sm (12px)
//   lg → label/md (14px)   xl → label/lg (16px)
// ⚠️ sm ใช้ตัวอักษรขนาดเดียวกับ xs โดยตั้งใจ sm จึงเป็น xs ที่สูงขึ้นไม่ใช่ตัวอักษรใหญ่ขึ้น
//    นี่คือเหตุผลเดียวที่ระยะขอบบนล่างไม่เป็นเส้นตรง
// ยืนยันค่าได้จาก link-tag/size ในไฟล์ออกแบบ ซึ่งเท่ากับความสูงบรรทัดตรง ๆ
// เพราะแท็กแบบลิงก์ไม่มีพื้นไม่มีขอบ ระยะขอบจึงเป็นศูนย์ทุกด้าน
export const LABEL_PRESET = { xs: 'label/xs', sm: 'label/xs', md: 'label/sm', lg: 'label/md', xl: 'label/lg' };
export const LINE_HEIGHT = { xs: 16, sm: 16, md: 22, lg: 24, xl: 26 };
//
// ── ระยะขอบบนล่าง = ค่าที่คำนวณได้ ไม่ใช่ค่าที่พิมพ์เอง ─────────
//   padding-y = (ความสูง - ความสูงบรรทัด) / 2   →  1 · 3 · 2 · 3 · 4
// ─────────────────────────────────────────────────────────────
import { SIZES, RADIUS_SCALE, RADIUS_FORMULA } from './global-scale.config.mjs';

export const name = 'tag';

// ── semantic knobs ───────────────────────────────────────────
// ระยะขอบซ้ายขวาของกล่อง แยก base ตามทรง เพราะทรงแคปซูลต้องกันมุมโค้งมากกว่า
export const PADDING_X = {
  'semi-rounded': { base: 4, step: 1 },  // 4 · 5 · 6 · 7 · 8
  pill: { base: 6, step: 1 },            // 6 · 7 · 8 · 9 · 10
};
// ⚠️ ชนิดชนขอบ (number image) หัวหน้าปรับโครง 2026-10-21 ให้ช่องตัวเลขหรือช่องรูปอยู่ซ้ายสุดชนขอบ
//    ข้อความอยู่กลางในชั้น content และไอคอนปิดอยู่ขวาสุดในชั้น content เดียวกัน
//    ระยะขอบซ้ายของ content จึงเป็น "ช่องว่างหลังช่องตัวเลข" (เล็ก โตทีละ 1)
//    ส่วนระยะขอบขวาของ content เป็น "ขอบกล่องด้านไอคอนปิด" (โตทีละ 2 แยก base ตามทรง เหมือน PADDING_X)
//    ค่าอ่านจากไฟล์ออกแบบหลังหัวหน้าแก้เสร็จ 2026-10-21 ตรงกันทั้ง 4 ชุด (number image คูณสองทรง)
//    เดิม (ก่อน 2026-10-21) ช่องตัวเลขอยู่ขวาและซ้ายกว้างกว่าขวา กลับด้านแล้วเพราะโครงใหม่กลับด้านทั้งแถว
export const PADDING_X_FLUSH = {
  left: { base: 5, step: 1 },                                   // 5 · 6 · 7 · 8 · 9  ทั้งสองทรง
  right: { 'semi-rounded': { base: 6, step: 2 }, pill: { base: 7, step: 2 } }, // 6..14 · 7..15 แคปซูลเผื่อขอบมากกว่า 1px
};
export const PADDING_NO = 0;                          // ชนขอบ
export const TITLE_PADDING = { base: 1, step: 1 };    // 1 · 2 · 3 · 4 · 5
export const GAP = 2;          // ช่องไฟระหว่างข้อความกับไอคอนปิด
export const GAP_FLUSH = 0;    // ชนิดที่ของนำหน้าชนขอบ ไม่มีช่องไฟ
export const ICON = { base: 10, step: 2 };          // 10 · 12 · 14 · 16 · 18  ไอคอนปิดของชุดฐาน
export const ICON_LEADING = { base: 12, step: 2 };  // 12 · 14 · 16 · 18 · 20  ชนิดที่มีของนำหน้า
export const CHECKBOX = { base: 10, step: 2 };      // 10 · 12 · 14 · 16 · 18
// มุมโค้งช่องติ๊กในแท็ก (หัวหน้าตัดสิน 2026-10-26 ยึดตาม Brand checkbox-tag)
//   ช่องติ๊กในแท็กเล็กกว่า component ช่องติ๊กจริง (12..28) จึงยืม variant xs ที่ xs/sm และ sm ที่ md ขึ้นไป
//   แล้วประกาศเป็นตัวแปรของแท็กเองแทนการอ้างมุมโค้งของ component ช่องติ๊ก
export const CHECKBOX_RADIUS = { xs: 2, sm: 2, md: 3, lg: 3, xl: 3 };
export const INDICATOR_PADDING = 2;                  // ระยะขอบรอบจุดสถานะ เท่ากันทุกขนาด
// มุมโค้งทรงมุมมนโตตามขนาด สูตรอยู่ที่ global-scale.config.mjs เพราะมุมโค้งเป็นบุคลิกของแบรนด์
export const RADIUS_CORNER = RADIUS_FORMULA.tag;     // 3 · 3.5 · 4 · 4.5 · 5
export const RADIUS_FULL = RADIUS_SCALE.full;        // 9999px ทรงแคปซูล
export const CORNERS = ['top-left', 'top-right', 'bottom-right', 'bottom-left'];
export const radiusAt = (s) => RADIUS_CORNER.base + SIZES.indexOf(s) * RADIUS_CORNER.step;

// ⚠️ ค่าที่ไม่เป็นเส้นตรง ประกาศเป็นตารางเพราะไม่มีสูตรไหนให้ผลชุดนี้
//    จุดสถานะโตช้ากว่าขนาดแท็กที่สองขนาดเล็ก เพื่อไม่ให้จุดกินพื้นที่ข้อความ
export const DOT = { xs: 6, sm: 6, md: 8, lg: 10, xl: 12 };
//    ระยะขอบข้างของช่องตัวเลขและช่องรูป ตันที่ 10 ตั้งแต่ lg เพราะกว้างกว่านั้นจะดูเป็นกล่องเปล่า
export const LEADING_PADDING_X = { xs: 7, sm: 8, md: 9, lg: 10, xl: 10 };

export const SHAPES = ['semi-rounded', 'pill'];
export const TYPES = ['number-tag', 'image-tag', 'checkbox-tag', 'indicator-tag'];

// ── แท็กไอคอนล้วน (เพิ่ม 2026-10-15 ผู้ใช้สั่ง) ────────────────
//   มีแค่ไอคอนตัวเดียว ไม่มีข้อความ จึงไม่มี tag-title และไม่มีไอคอนปิด
//   คุณสมบัติที่เปิดให้ปรับมีแค่ขนาดกับการสลับไอคอน ตามที่ผู้ใช้ตัดสิน
//
//   ความสูงใช้บันไดเดียวกับแท็กทั่วไป (18 · 22 · 26 · 30 · 34)
//   ไอคอนใช้บันได ICON_LEADING เพราะไอคอนเป็นเนื้อหาหลักของแท็กชนิดนี้
//   ไม่ใช่ ICON ซึ่งเป็นบันไดของไอคอนปิดที่เป็นของประกอบ
//
//   ⚠️ ทรงลิงก์เป็นจัตุรัส กว้างเท่าสูง ต่างจากอีกสองทรงที่กว้างตามระยะขอบ
//      ระยะขอบของทรงลิงก์จึงคำนวณจาก (ด้านกล่อง ลบ ไอคอน) หารสอง ไม่ใช่บันได PADDING_X
// ⚠️ ทรงกลมใช้ชื่อ circular ไม่ใช่ pill (ผู้ใช้สั่ง 2026-10-15)
//   แท็กไอคอนล้วนกว้างเท่าสูง ใส่มุมโค้งเต็มแล้วได้วงกลม ไม่ใช่แคปซูล
//   ตรงกับแบบแผนที่ระบบมีอยู่แล้วที่ circular-icon-badge ซึ่งเป็นวงกลมจริงและด้านเท่ากัน
//   ชื่อ token จึงเป็น circular-tag/* ไม่มีชั้นชนิดซ้อน เหมือนที่ badge ใช้ circular-badge/*
export const ICON_TAG_SHAPES = ['semi-rounded', 'circular', 'link'];
export const iconTagIconAt = (s) => ICON_LEADING.base + SIZES.indexOf(s) * ICON_LEADING.step;
// ชนิดที่ของนำหน้าเต็มความสูงชนขอบกล่อง กรอบข้อความจึงเป็นตัวคุมความสูงแทนกล่องนอก
const FLUSH_TYPES = ['number-tag', 'image-tag'];
// ชื่อของนำหน้าในแต่ละชนิด ใช้ตั้งชื่อตัวแปรขนาดและระยะขอบของมัน
const LEADING = { 'number-tag': 'number', 'image-tag': 'image' };
// ชนิดที่ไฟล์ออกแบบห่อไอคอนซ้ายกับกรอบข้อความไว้ในชั้น content (หัวหน้าปรับโครง 2026-10-21)
//   ชั้นนี้มีช่องไฟของตัวเอง content-gap คั่นระหว่างไอคอนซ้ายกับข้อความ
//   ส่วน gap ของกล่องนอกยังคั่นระหว่างชั้น content กับของต่อท้าย (ช่องตัวเลข ช่องรูป ช่องติ๊ก)
//   indicator-tag ไม่อยู่ในกลุ่มนี้ เพราะไฟล์ออกแบบไม่ได้ปรับโครงชุดนั้น
const CONTENT_TYPES = ['number-tag', 'image-tag', 'checkbox-tag'];

const at = (s) => SIZES.indexOf(s);
export const heightAt = (s) => HEIGHT.base + at(s) * HEIGHT.step;
export const paddingYAt = (s) => (heightAt(s) - LINE_HEIGHT[s]) / 2;

export function build(dim) {
  const grow = (k, note) =>
    Object.fromEntries(SIZES.map((s) => {
      const v = k.base + at(s) * k.step;
      return [s, { ...dim(v), $description: note(v, s) }];
    }));
  const table = (t, note) =>
    Object.fromEntries(SIZES.map((s) => [s, { ...dim(t[s]), $description: note(t[s], s) }]));
  const flat = (v, note) =>
    Object.fromEntries(SIZES.map((s) => [s, { ...dim(v), $description: note(v, s) }]));

  // ── ด่านตรวจในไฟล์ · ต้องสอดคล้องกันเองทุกขนาดก่อนปล่อยค่าออกไป ──
  for (const s of SIZES) {
    const h = heightAt(s);
    const py = paddingYAt(s);
    if (!Number.isInteger(py) || py < 0) {
      throw new Error(`tag: ขนาด ${s} ระยะขอบบนล่างคำนวณได้ ${py} ซึ่งไม่ใช่จำนวนเต็มบวก แปลว่าความสูง ${h} กับความสูงบรรทัด ${LINE_HEIGHT[s]} ของ preset ${LABEL_PRESET[s]} เข้ากันไม่ได้`);
    }
    for (const shape of SHAPES) {
      const px = PADDING_X[shape].base + at(s) * PADDING_X[shape].step;
      const tp = TITLE_PADDING.base + at(s) * TITLE_PADDING.step;
      if (tp >= px) throw new Error(`tag: ทรง ${shape} ขนาด ${s} ระยะขอบกรอบข้อความ ${tp} ไม่ควรมากกว่าหรือเท่าระยะขอบกล่อง ${px} เพราะกรอบข้อความอยู่ข้างในกล่อง`);
    }
    const icon = ICON_LEADING.base + at(s) * ICON_LEADING.step;
    if (icon > h) throw new Error(`tag: ขนาด ${s} ไอคอน ${icon} ล้นความสูงแท็ก ${h}`);
    if (DOT[s] > h) throw new Error(`tag: ขนาด ${s} จุดสถานะ ${DOT[s]} ล้นความสูงแท็ก ${h}`);
  }

  // ── ⚠️ ความสูงไม่มีคู่ในไฟล์ออกแบบ (ยกเว้น link) ──────────────
  // ตัวแท็กใน Figma ใช้ความสูงแบบ hug ความสูงจึงงอกจากระยะขอบบวกความสูงบรรทัด
  // ตัวแปรชุดนี้มีเฉพาะฝั่งโค้ด ไว้ประกาศบันไดให้เรียกใช้ตรง ๆ ได้
  // ของที่คุมความสูงจริงคือระยะขอบ ถ้าจะขยับบันได ให้ขยับ HEIGHT แล้วระยะขอบคำนวณตามเอง
  const size = Object.fromEntries(SIZES.map((s) => [s, {
    ...dim(heightAt(s)),
    $description: `ความสูงแท็กขนาด ${s} เท่ากับ ${heightAt(s)}px จากสูตร base ${HEIGHT.base} step ${HEIGHT.step} มีเฉพาะฝั่งโค้ด ฝั่งออกแบบใช้ความสูงแบบ hug`,
  }]));

  const paddingY = (side, of = 'กล่องแท็ก') => Object.fromEntries(SIZES.map((s) => [s, {
    ...dim(paddingYAt(s)),
    $description: `ระยะขอบ${side}ของ${of}ขนาด ${s} เท่ากับ ${paddingYAt(s)}px คำนวณจาก (ความสูง ${heightAt(s)} ลบความสูงบรรทัด ${LINE_HEIGHT[s]} ของ preset ${LABEL_PRESET[s]}) หารสอง`,
  }]));

  // ระยะขอบของกล่องนอก · type = null คือชุดฐาน
  // ชนิดชนขอบ ค่านี้คือระยะขอบของชั้น content (กล่องนอกเป็นศูนย์ทุกด้าน)
  const padding = (shape, type) => {
    const flush = FLUSH_TYPES.includes(type);
    const of = type ? `กล่องแท็กชนิด ${type} ` : 'กล่องแท็ก';
    const o = flush ? {
      left: grow(PADDING_X_FLUSH.left, (v, s) => `ระยะขอบซ้ายของชั้น content ใน${of}ขนาด ${s} เท่ากับ ${v}px คือช่องว่างถัดจากช่องตัวเลขหรือช่องรูปที่ชนขอบซ้าย`),
      right: grow(PADDING_X_FLUSH.right[shape], (v, s) => `ระยะขอบขวาของชั้น content ใน${of}ทรง ${shape} ขนาด ${s} เท่ากับ ${v}px คือขอบกล่องด้านไอคอนปิด${shape === 'pill' ? ' กว้างกว่าทรงมุมมน 1px เพราะแคปซูลมนกว่าจึงต้องเผื่อขอบมากกว่า' : ''}`),
    } : {
      left: grow(PADDING_X[shape], (v, s) => `ระยะขอบซ้ายของ${of}ขนาด ${s} เท่ากับ ${v}px`),
      right: grow(PADDING_X[shape], (v, s) => `ระยะขอบขวาของ${of}ขนาด ${s} เท่ากับ ${v}px`),
    };
    o.no = { ...dim(PADDING_NO), $description: `ระยะขอบแบบชนขอบเท่ากับ ${PADDING_NO}px ใช้กับด้านที่ของนำหน้าเต็มความสูงชนขอบกล่อง` };
    // ⚠️ ชนิดที่ของนำหน้าเต็มความสูง กล่องนอกไม่มีระยะขอบบนล่าง ใช้ padding/no เท่ากับ 0 แทน
    //    ตัวคุมความสูงคือ title-padding ของกรอบข้อความ ไม่ใช่ที่นี่
    //    เคยประกาศไว้ทั้งสองฝั่งแล้วค้างค่าเก่าจนไม่มีใครใช้ ลบทิ้งทั้งคู่ 2026-09-22
    if (!flush) {
      o.top = paddingY('บน', of);
      o.bottom = paddingY('ล่าง', of);
    }
    return o;
  };

  const titlePadding = (shape, type) => {
    const flush = FLUSH_TYPES.includes(type);
    // ⚠️ ระยะขอบซ้ายขวาของกรอบข้อความมีทุกชนิด (กลับมาใส่ให้ชนิดชนขอบ 2026-10-21)
    //    เคยถอดออกจากชนิดชนขอบเมื่อ 2026-10-08 เพราะตอนนั้นลูกตัวแรกเป็นตัวให้ขอบของกล่อง
    //    หัวหน้าปรับโครงไฟล์ออกแบบ 2026-10-21 ห่อไอคอนซ้ายกับกรอบข้อความไว้ในชั้น content
    //    ขอบของกล่องย้ายไปอยู่ที่ชั้น content (ใช้ padding ของชนิดนั้น) กรอบข้อความจึงกลับมามี
    //    ระยะขอบซ้ายขวาของตัวเองเหมือนชนิดอื่น ส่วนบนล่างยังเป็นตัวคุมความสูงของชนิดชนขอบ
    const o = {
      left: grow(TITLE_PADDING, (v, s) => `ระยะขอบซ้ายของกรอบข้อความในแท็กขนาด ${s} เท่ากับ ${v}px`),
      right: grow(TITLE_PADDING, (v, s) => `ระยะขอบขวาของกรอบข้อความในแท็กขนาด ${s} เท่ากับ ${v}px`),
    };
    if (flush) {
      o.top = paddingY('บน', 'กรอบข้อความ');
      o.bottom = paddingY('ล่าง', 'กรอบข้อความ');
    }
    return o;
  };

  const component = {};
  const radius = {};
  for (const shape of SHAPES) {
    // ชุดฐาน อยู่ใต้ทรงตรง ๆ ไม่มีชั้นชื่อชนิด ตรงกับ Figma
    component[shape] = {
      size,
      padding: padding(shape, null),
      'title-padding': titlePadding(shape, null),
      gap: flat(GAP, (v, s) => `ช่องไฟระหว่างข้อความกับไอคอนปิดของแท็กขนาด ${s} เท่ากับ ${v}px`),
      icon: grow(ICON, (v, s) => `ไอคอนปิดของแท็กขนาด ${s} เท่ากับ ${v}px`),
    };

    for (const type of TYPES) {
      const node = {
        padding: padding(shape, type),
        'title-padding': titlePadding(shape, type),
      };
      if (CONTENT_TYPES.includes(type)) {
        node['content-gap'] = flat(GAP, (v, s) => `ช่องไฟระหว่างไอคอนซ้ายกับข้อความในชั้น content ของชนิด ${type} ขนาด ${s} เท่ากับ ${v}px`);
      }
      if (FLUSH_TYPES.includes(type)) {
        const lead = LEADING[type];
        node.gap = flat(GAP_FLUSH, (v, s) => `ช่องไฟของชนิด ${type} ขนาด ${s} เท่ากับ ${v}px เพราะของนำหน้าชนขอบกล่อง`);
        node[lead] = Object.fromEntries(SIZES.map((s) => [s, {
          ...dim(heightAt(s)),
          $description: `ขนาดของ${lead === 'number' ? 'ช่องตัวเลข' : 'ช่องรูป'}ในแท็กขนาด ${s} เท่ากับ ${heightAt(s)}px เต็มความสูงแท็กพอดี`,
        }]));
        node[`${lead}-padding`] = {
          left: table(LEADING_PADDING_X, (v, s) => `ระยะขอบซ้ายใน${lead === 'number' ? 'ช่องตัวเลข' : 'ช่องรูป'}ขนาด ${s} เท่ากับ ${v}px`),
          right: table(LEADING_PADDING_X, (v, s) => `ระยะขอบขวาใน${lead === 'number' ? 'ช่องตัวเลข' : 'ช่องรูป'}ขนาด ${s} เท่ากับ ${v}px`),
        };
        // ⚠️ เพิ่ม 2026-10-15 ตอนทำไอคอนด้านซ้าย สองชนิดนี้เดิมไม่มี token ขนาดไอคอนเลย
        //    เพราะไม่เคยมีไอคอนมาก่อน ของนำหน้าเป็นช่องตัวเลขหรือช่องรูปแทน
        //    ใช้บันได ICON_LEADING ให้เท่ากับชนิดอื่นที่มีไอคอน เช่น checkbox-tag
        node.icon = grow(ICON_LEADING, (v, s) => `ไอคอนด้านซ้ายของชนิด ${type} ขนาด ${s} เท่ากับ ${v}px`);
      } else {
        node.gap = flat(GAP, (v, s) => `ช่องไฟระหว่างของนำหน้ากับข้อความของชนิด ${type} ขนาด ${s} เท่ากับ ${v}px`);
        node.icon = grow(ICON_LEADING, (v, s) => `ไอคอนปิดของชนิด ${type} ขนาด ${s} เท่ากับ ${v}px`);
      }
      if (type === 'checkbox-tag') {
        node.checkbox = grow(CHECKBOX, (v, s) => `ช่องติ๊กในแท็กขนาด ${s} เท่ากับ ${v}px`);
        node.radius = table(CHECKBOX_RADIUS, (v, s) => `มุมโค้งช่องติ๊กในแท็กขนาด ${s} เท่ากับ ${v}px ตาม Brand checkbox-tag`);
      }
      if (type === 'indicator-tag') {
        node.dot = table(DOT, (v, s) => `จุดสถานะในแท็กขนาด ${s} เท่ากับ ${v}px`);
        node['indicator-padding'] = {
          left: flat(INDICATOR_PADDING, (v, s) => `ระยะขอบซ้ายรอบจุดสถานะขนาด ${s} เท่ากับ ${v}px`),
          right: flat(INDICATOR_PADDING, (v, s) => `ระยะขอบขวารอบจุดสถานะขนาด ${s} เท่ากับ ${v}px`),
        };
      }
      component[shape][type] = node;
    }

    // ทรงแคปซูลมีค่าเดียว ส่วนทรงมุมมนแยกรายขนาดคูณสี่มุม ตรงกับโครงใน Figma
    radius[shape] = shape === 'pill'
      ? { full: dim(RADIUS_FULL) }
      : Object.fromEntries(SIZES.map((s) => [s,
          Object.fromEntries(CORNERS.map((c) => [c, {
            ...dim(radiusAt(s)),
            $description: `มุมโค้ง ${c} ของแท็กทรงมุมมนขนาด ${s} เท่ากับ ${radiusAt(s)}px จากสูตร base ${RADIUS_CORNER.base} step ${RADIUS_CORNER.step}`,
          }])),
        ]));
  }

  // ── แท็กแบบลิงก์ ─────────────────────────────────────────────
  // ไม่มีพื้นไม่มีขอบ ระยะขอบกล่องจึงเป็นศูนย์ทุกด้าน
  // ความสูงเท่ากับความสูงบรรทัดของ preset ตรง ๆ ไม่ได้มาจากสูตรความสูงของแท็กทั่วไป
  // ตรงกับกฎใน CLAUDE.md ว่าของที่ความสูงคุมด้วย text style ห้ามทำสูตรความสูงให้
  component.link = {
    size: Object.fromEntries(SIZES.map((s) => [s, {
      ...dim(LINE_HEIGHT[s]),
      $description: `ความสูงแท็กแบบลิงก์ขนาด ${s} เท่ากับ ${LINE_HEIGHT[s]}px มาจากความสูงบรรทัดของ preset ${LABEL_PRESET[s]} ตรง ๆ เพราะระยะขอบเป็นศูนย์`,
    }])),
    padding: { no: { ...dim(PADDING_NO), $description: `ระยะขอบของแท็กแบบลิงก์เท่ากับ ${PADDING_NO}px ทุกด้าน เพราะไม่มีพื้นและไม่มีขอบ` } },
    'title-padding': {
      left: grow(TITLE_PADDING, (v, s) => `ระยะขอบซ้ายของกรอบข้อความในแท็กแบบลิงก์ขนาด ${s} เท่ากับ ${v}px`),
      right: grow(TITLE_PADDING, (v, s) => `ระยะขอบขวาของกรอบข้อความในแท็กแบบลิงก์ขนาด ${s} เท่ากับ ${v}px`),
    },
    gap: flat(GAP_FLUSH, (v, s) => `ช่องไฟของแท็กแบบลิงก์ขนาด ${s} เท่ากับ ${v}px`),
    icon: grow(ICON, (v, s) => `ไอคอนปิดของแท็กแบบลิงก์ขนาด ${s} เท่ากับ ${v}px`),
  };

  // ── แท็กไอคอนล้วน ทั้งสามทรง ────────────────────────────────
  //   ทรงมุมมนกับแคปซูลใช้ระยะขอบซ้ายขวาชุดเดียวกับแท็กทั่วไปของทรงนั้น
  //   ทรงลิงก์เป็นจัตุรัส ระยะขอบจึงมาจาก (ด้านกล่อง ลบ ไอคอน) หารสอง
  const iconTag = (shape) => {
    // ทรงกลมกับทรงลิงก์กว้างเท่าสูง ระยะขอบจึงมาจาก (ด้านกล่อง ลบ ไอคอน) หารสอง
    const square = shape === 'link' || shape === 'circular';
    const padX = (sz) => square
      ? (heightAt(sz) - iconTagIconAt(sz)) / 2
      : PADDING_X[shape].base + at(sz) * PADDING_X[shape].step;
    const padY = (sz) => (heightAt(sz) - iconTagIconAt(sz)) / 2;

    for (const sz of SIZES) {
      const py = padY(sz), px = padX(sz);
      if (!Number.isInteger(py) || py < 0) {
        throw new Error(`tag: icon-tag ทรง ${shape} ขนาด ${sz} ระยะขอบบนล่างได้ ${py} ซึ่งไม่ใช่จำนวนเต็มบวก แปลว่าความสูง ${heightAt(sz)} กับไอคอน ${iconTagIconAt(sz)} เข้ากันไม่ได้`);
      }
      if (!Number.isInteger(px) || px < 0) {
        throw new Error(`tag: icon-tag ทรง ${shape} ขนาด ${sz} ระยะขอบซ้ายขวาได้ ${px} ซึ่งไม่ใช่จำนวนเต็มบวก`);
      }
      if (iconTagIconAt(sz) > heightAt(sz)) {
        throw new Error(`tag: icon-tag ขนาด ${sz} ไอคอน ${iconTagIconAt(sz)} ล้นความสูง ${heightAt(sz)}`);
      }
    }

    const side = (dir) => Object.fromEntries(SIZES.map((sz) => [sz, {
      ...dim(padX(sz)),
      $description: square
        ? `ระยะขอบ${dir}ของแท็กไอคอนล้วนทรง ${shape} ขนาด ${sz} เท่ากับ ${padX(sz)}px คำนวณจาก (ด้านกล่อง ${heightAt(sz)} ลบไอคอน ${iconTagIconAt(sz)}) หารสอง เพราะทรงนี้กว้างเท่าสูง`
        : `ระยะขอบ${dir}ของแท็กไอคอนล้วนทรง ${shape} ขนาด ${sz} เท่ากับ ${padX(sz)}px ใช้บันไดเดียวกับแท็กทั่วไปของทรงนี้`,
    }]));

    return {
      size: Object.fromEntries(SIZES.map((sz) => [sz, {
        ...dim(heightAt(sz)),
        $description: square
          ? `ด้านของแท็กไอคอนล้วนทรง ${shape} ขนาด ${sz} เท่ากับ ${heightAt(sz)}px กว้างเท่าสูง`
          : `ความสูงแท็กไอคอนล้วนทรง ${shape} ขนาด ${sz} เท่ากับ ${heightAt(sz)}px ใช้บันไดเดียวกับแท็กทั่วไป`,
      }])),
      icon: Object.fromEntries(SIZES.map((sz) => [sz, {
        ...dim(iconTagIconAt(sz)),
        $description: `ไอคอนของแท็กไอคอนล้วนขนาด ${sz} เท่ากับ ${iconTagIconAt(sz)}px ใช้บันได icon-leading เพราะไอคอนเป็นเนื้อหาหลัก ไม่ใช่ของประกอบ`,
      }])),
      padding: {
        left: side('ซ้าย'),
        right: side('ขวา'),
        top: Object.fromEntries(SIZES.map((sz) => [sz, {
          ...dim(padY(sz)),
          $description: `ระยะขอบบนของแท็กไอคอนล้วนทรง ${shape} ขนาด ${sz} เท่ากับ ${padY(sz)}px คำนวณจาก (ความสูง ${heightAt(sz)} ลบไอคอน ${iconTagIconAt(sz)}) หารสอง`,
        }])),
        bottom: Object.fromEntries(SIZES.map((sz) => [sz, {
          ...dim(padY(sz)),
          $description: `ระยะขอบล่างของแท็กไอคอนล้วนทรง ${shape} ขนาด ${sz} เท่ากับ ${padY(sz)}px คำนวณจาก (ความสูง ${heightAt(sz)} ลบไอคอน ${iconTagIconAt(sz)}) หารสอง`,
        }])),
      },
    };
  };
  component['semi-rounded']['icon-tag'] = iconTag('semi-rounded');
  component.link['icon-tag'] = iconTag('link');
  // ทรงกลมไม่มีชั้นชนิดซ้อน เพราะมีแต่แบบไอคอนล้วน เหมือน circular-badge
  component.circular = iconTag('circular');

  // ── สมการปิด ให้ด่านตรวจ spacing บวกกลับทุกขนาดตอน build ──────
  //   ชุดฐาน checkbox indicator  กล่องนอกคุม  → padding บน+ล่าง
  //   number image               กรอบข้อความคุม → title-padding บน+ล่าง
  const closes = [];
  for (const shape of SHAPES) {
    closes.push({ at: `${shape}.padding`, label: `${shape} ชุดฐาน` });
    for (const t of ['checkbox-tag', 'indicator-tag']) closes.push({ at: `${shape}.${t}.padding`, label: `${shape} ${t}` });
    for (const t of FLUSH_TYPES) closes.push({ at: `${shape}.${t}.title-padding`, label: `${shape} ${t} (กรอบข้อความคุมความสูง)` });
  }
  const checks = closes.map(({ at: path, label }) => ({
    label: `${label} ระยะขอบบน + ความสูงบรรทัด + ระยะขอบล่าง = ความสูงแท็ก`,
    eq: (get, s) => {
      const top = get(`${path}.top`, s);
      const bottom = get(`${path}.bottom`, s);
      const h = get(`${path.split('.')[0]}.size`, s);
      if ([top, bottom, h].some((v) => v === undefined)) return null;
      return [top + LINE_HEIGHT[s] + bottom, h];
    },
  }));

  const semantic = {
    height: { base: dim(HEIGHT.base), step: dim(HEIGHT.step) },
    padding: {
      x: {
        'semi-rounded': { base: dim(PADDING_X['semi-rounded'].base), step: dim(PADDING_X['semi-rounded'].step) },
        pill: { base: dim(PADDING_X.pill.base), step: dim(PADDING_X.pill.step) },
        'flush-left': { base: dim(PADDING_X_FLUSH.left.base), step: dim(PADDING_X_FLUSH.left.step) },
        'flush-right': {
          'semi-rounded': { base: dim(PADDING_X_FLUSH.right['semi-rounded'].base), step: dim(PADDING_X_FLUSH.right['semi-rounded'].step) },
          pill: { base: dim(PADDING_X_FLUSH.right.pill.base), step: dim(PADDING_X_FLUSH.right.pill.step) },
        },
      },
      no: dim(PADDING_NO),
    },
    'title-padding': { base: dim(TITLE_PADDING.base), step: dim(TITLE_PADDING.step) },
    gap: dim(GAP),
    icon: { base: dim(ICON.base), step: dim(ICON.step) },
    'icon-leading': { base: dim(ICON_LEADING.base), step: dim(ICON_LEADING.step) },
    checkbox: { base: dim(CHECKBOX.base), step: dim(CHECKBOX.step) },
  };

  return { name, semantic, component, radius, radiusAppliesTo: ['tag'], checks };
}

// ── สถานะการ sync กับไฟล์ออกแบบ (2026-10-21) ─────────────────
// หัวหน้าปรับโครง 6 ชุดที่มีของนำหน้า (number image checkbox ทั้งสองทรง) รอบสุดท้ายด้วยมือที่ตระกูล Neutral
// ของนำหน้า (ช่องตัวเลข ช่องรูป ช่องติ๊ก) อยู่ซ้ายสุด ข้อความกับไอคอนปิดอยู่ในชั้น content ทางขวา
// คุณสมบัติ left-icon ของ 6 ชุดนี้เปลี่ยนเป็น right-icon (ไอคอนปิดตัวเดียวกับชุดฐาน) ค่าเริ่มต้นเปิด
// ตัวแปรที่เพิ่มคือ content-gap ของ 6 ชุด และ title-padding ซ้ายขวาของชนิดชนขอบ 4 ชุด
// ไอคอนซ้ายของทรงแคปซูลย้ายไปใช้ pill-tag/icon (บันได ICON ของชุดฐาน) ตามต้นแบบ
// ส่วนทรงมุมมนยังใช้บันได ICON_LEADING ของชนิดตัวเอง ตามที่หัวหน้าตัดสินให้แตะน้อยที่สุด
//
// ── สถานะการ sync กับไฟล์ออกแบบ (2026-09-22) ─────────────────
// ค่าทุกตัวในไฟล์นี้อ่านจากตัวแปรจริงใน Figma collection component 589 ตัว
// และวัดความสูงจากชิ้นงานจริงซ้ำอีกรอบ ตรงกันหมด
//
// ⚠️ 2 เรื่องที่เคยไม่ตรงกัน
//   ปิดทั้งสองเรื่องแล้ว 2026-09-22 ตามที่ user ตัดสิน
//   1. มุมโค้งทรงมุมมน ใช้สูตร RADIUS_FORMULA.tag base 3 step 0.5 ทั้งสองฝั่ง
//      ได้ 3 · 3.5 · 4 · 4.5 · 5 แทนของเดิมที่ไฟล์ออกแบบเก็บไว้ 3 · 4 · 4 · 4 · 5
//   2. ตัวแปรระยะขอบบนล่างของกล่องนอกชนิด number กับ image 40 ตัวที่ค้างค่าเก่า
//      (0 · 2 · 1 · 2 · 3 จากบันไดความสูงชุดเก่า 16 ถึง 32) ลบออกจากไฟล์ออกแบบแล้ว
