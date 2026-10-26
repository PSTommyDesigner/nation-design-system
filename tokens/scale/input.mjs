// ─────────────────────────────────────────────────────────────
// INPUT component (ช่องกรอก · text field และ text area · หน้า 13 Input)
//
// ⚠️ ค่าชุดนี้ไม่ได้อ่านจากไฟล์ออกแบบ แต่เป็นค่าใหม่ที่ตัดสินแล้วให้ไฟล์ออกแบบเดินตาม
//    (ตัดสิน 2026-09-01 หลังวิจัย 13 เจ้า ดู docs/research/input-component.md)
//    ของเดิมในไฟล์คือความสูง 42 ระยะขอบ 8 บน 10 ซ้ายขวา มุมโค้ง 8 และมีขนาดเดียว
//    ซึ่ง 42 ไม่ปรากฏในระบบไหนเลยในตลาด และไม่ตรงกับความสูงปุ่มของเราเองสักขนาด
//
// ── สิ่งที่เปลี่ยนจากของเดิม ─────────────────────────────────
//   1. จากขนาดเดียว เป็น 3 ขนาด sm 32 · md 40 · lg 48
//   2. ความสูงมาจาก CONTROL_HEIGHT ร่วมกับปุ่ม ไม่ใช่ตัวเลขของตัวเอง
//   3. ระยะขอบซ้ายขวาที่ได้จริงเดิมคือ 14 (ประกาศ 10 แต่มีกรอบซ้อนอีกชั้นใส่ 4)
//      ของใหม่ประกาศค่าเดียวบนกล่องเดียว และ **ต้องลบกรอบซ้อนออกจากไฟล์ออกแบบ**
//   4. ที่ md ค่าอื่นไม่เปลี่ยน มุมโค้งยังเป็น 8 ตัวอักษรยังเป็น 16 กับ 14
//      จึงย้ายได้โดยภาพที่ขนาดเริ่มต้นแทบไม่ขยับ (ความสูง 42 เป็น 40)
//
// ── ทำไมเปิดแค่ sm md lg ─────────────────────────────────────
//   ไม่เปิด xs (24) เพราะเป็นเส้นขั้นต่ำพอดีของ WCAG 2.2 SC 2.5.8 ไม่มีที่ให้พลาด
//     และเจ้าที่มี 24 ทุกเจ้าใช้กับหน้าจอเครื่องมือหนาแน่นบนเดสก์ท็อป ไม่ใช่มือถือ
//   ไม่เปิด xl (56) เพราะไม่มีเจ้าไหนใช้ช่องกรอกสูงเกิน 48 บนเดสก์ท็อป
//     และ Carbon ที่ใช้สเกลร่วมกับปุ่มก็ปิดเพดานช่องกรอกไว้ที่ 48 เหมือนกัน
//   ถ้าวันหนึ่งจำเป็นจริง เปิดเพิ่มได้ทันทีเพราะสูตรรองรับอยู่แล้ว
//
// ── ฟอร์มบนมือถือ ────────────────────────────────────────────
//   ให้ใช้ lg 48 เป็นค่าเริ่มต้น เพราะผ่านทั้ง 48dp ของ Android และ 44pt ของ Apple
//   ส่วน md 40 ผ่านเกณฑ์ AA ของ WCAG แต่ไม่ถึง 44
// ─────────────────────────────────────────────────────────────
import { SIZES, RADIUS_FORMULA, CONTROL_HEIGHT } from './global-scale.config.mjs';
import { heightAt as tagHeightAt } from './tag.mjs';

export const name = 'input';

// ── ขนาดที่ช่องกรอกเปิดใช้ (เป็นชุดย่อยของ SIZES) ─────────────
export const INPUT_SIZES = ['sm', 'md', 'lg'];

// ── semantic knobs ───────────────────────────────────────────
// ค่าที่ใช้สูตรร่วมกับปุ่ม เขียนไว้ตรงนี้เพื่อให้อ่านไฟล์เดียวจบว่าช่องกรอกใช้อะไรบ้าง
export const HEIGHT = CONTROL_HEIGHT;              // 32 · 40 · 48
export const PADDING_X = { base: 8, step: 2 };     // 10 · 12 · 14
export const GAP = { base: 2, step: 2 };           //  4 ·  6 ·  8
export const ICON = { base: 16, step: 2 };         // 18 · 20 · 22
export const RADIUS = RADIUS_FORMULA.input;        //  7 ·  8 ·  9
export const BORDER = 1;                           // เส้นขอบ 1px คงที่ (ค่าเดิมในไฟล์)

// ระยะห่างแนวตั้งของกองป้ายกำกับ ช่องกรอก และข้อความช่วย
// ค่าเดิมในไฟล์คือ 4 ทุกที่ คงไว้เพราะไม่ผูกกับขนาดช่อง
export const STACK_GAP = 4;
export const LABEL_GAP = 2;                        // ช่องไฟระหว่างป้ายชื่อกับดอกจันบังคับกรอก (ค่าเดิมในไฟล์ ตัดสิน 2026-10-26)

// ── text area ────────────────────────────────────────────────
// ระยะขอบซ้ายขวาเท่ากับช่องบรรทัดเดียวทุกขนาด (ตลาดทำแบบนี้ทุกเจ้า ต่างกันมากสุด 1px)
// ของเดิมช่องหลายบรรทัดใช้ 16 เทียบช่องปกติ 10 ต่างกัน 6 ซึ่งมากกว่าทุกเจ้าในตลาด
// ระยะขอบบนล่างต้องมีจริง เพราะช่องหลายบรรทัดไม่มีความสูงคงที่มาคุมแทน
// ⚠️ base คิดที่ดัชนี xs เสมอ (เหมือน component อื่น) แม้ช่องกรอกจะไม่เปิดใช้ xs
//    ดังนั้น base 4 step 2 จะได้ sm 6 · md 8 · lg 10 ตามที่ตั้งใจ
export const TEXTAREA_PADDING_Y = { base: 4, step: 2 }; // sm 6 · md 8 · lg 10
// ความสูงต่ำสุดคิดเป็นจำนวนบรรทัด ไม่ใช่ตัวเลขลอย (Base Web 3 · Carbon 4 · Atlassian 2)
export const TEXTAREA_MIN_LINES = 3;

// ── tag field ────────────────────────────────────────────────
// ช่องแท็กสูงตามจำนวนแท็ก จึงตรึงความสูงไม่ได้ ใช้ความสูงต่ำสุดเท่าช่องปกติแทน
//
// ⚠️ เขียนใหม่ 2026-09-22 หลัง user แก้ไฟล์ออกแบบ
//    1. แท็กที่ใส่ใช้ขนาดชื่อเดียวกับช่อง (sm ใส่ sm) เดิมใส่ใหญ่กว่าหนึ่งขั้น
//    2. ระยะขอบเท่ากันทั้ง 4 ด้าน และกลายเป็นสูตร (ความสูงช่อง ลบความสูงแท็ก) หารสอง
//       เดิมบนล่างเป็น 0 แล้วจัดกึ่งกลาง ส่วนซ้ายขวาเป็นตารางที่ตัดสินเอง 6 · 8 · 12
//    3. ช่องไฟในกล่องเท่ากับระยะขอบ ส่วนช่องไฟระหว่างแท็กเป็นตารางตามไฟล์ออกแบบ
//
// ⚠️ ช่องแท็กใช้ตัวแปรคนละชุดกับช่องกรอกข้อความ (user ยืนยัน 2026-09-22)
//    ห้ามเอาระยะขอบหรือช่องไฟของช่องกรอกข้อความมาใช้แทน แม้ค่าจะบังเอิญเท่ากัน
//
// ⚠️ ความสูงแท็กดึงจากไฟล์สูตรของแท็กตรง ๆ ไม่จดตัวเลขซ้ำไว้ที่นี่
//    ถ้าแท็กขยับบันไดความสูง ระยะขอบของช่องแท็กจะคำนวณตามเอง
//    และด่านตรวจด้านล่างจะไม่ยอมให้ build ถ้าหารสองแล้วไม่ลงตัว
export const TAG_SIZE_MAP = { sm: 'sm', md: 'md', lg: 'lg' };
export const TAG_HEIGHT = Object.fromEntries(INPUT_SIZES.map((z) => [z, tagHeightAt(TAG_SIZE_MAP[z])])); // 22 · 26 · 30
// ช่องไฟระหว่างแท็ก อ่านจากไฟล์ออกแบบ ไม่ใช่สูตร
export const TAG_TAG_GAP = { sm: 4, md: 8, lg: 8 };

// ── build ────────────────────────────────────────────────────
// dim = helper จาก generate-scale (v → {$type:dimension,$value:'<v>px'})
export function build(dim) {
  // ช่องกรอกใช้ดัชนีของ SIZES เดิม เพื่อให้ค่าตรงกับปุ่มที่ขนาดชื่อเดียวกันเสมอ
  const at = (s) => SIZES.indexOf(s);
  const grow = (base, step, note) =>
    Object.fromEntries(
      INPUT_SIZES.map((s) => {
        const v = base + at(s) * step;
        return [s, { ...dim(v), $description: note(v, s) }];
      }),
    );

  const h = (s) => HEIGHT.base + at(s) * HEIGHT.step;

  const component = {
    height: grow(HEIGHT.base, HEIGHT.step, (v, s) =>
      `ความสูงช่องกรอกขนาด ${s} เท่ากับ ${v}px ใช้สเกลเดียวกับความสูงปุ่มเพื่อให้วางในแถวเดียวกันได้พอดี`),
    padding: {
      l: grow(PADDING_X.base, PADDING_X.step, (v) => `ระยะขอบซ้าย ${v}px ประกาศค่าเดียวบนกล่องเดียว ห้ามมีกรอบซ้อนใส่ระยะเพิ่ม`),
      r: grow(PADDING_X.base, PADDING_X.step, (v) => `ระยะขอบขวา ${v}px ประกาศค่าเดียวบนกล่องเดียว ห้ามมีกรอบซ้อนใส่ระยะเพิ่ม`),
      // บนล่างเป็น 0 ทุกขนาด เพราะความสูงช่องบรรทัดเดียวถูกตรึงด้วย height แล้วจัดกึ่งกลางแนวตั้ง
      // มีเป็น token เพื่อให้ผูกได้ ไม่ต้องปล่อยเป็นค่าดิบในไฟล์ออกแบบ
      t: Object.fromEntries(INPUT_SIZES.map((s) => [s, { ...dim(0), $description: `ระยะขอบบนของช่องกรอกขนาด ${s} เป็น 0 เพราะความสูงถูกตรึงที่ ${h(s)}px แล้วจัดกึ่งกลางแนวตั้ง ไม่ได้ดันด้วยระยะขอบ` }])),
      b: Object.fromEntries(INPUT_SIZES.map((s) => [s, { ...dim(0), $description: `ระยะขอบล่างของช่องกรอกขนาด ${s} เป็น 0 ด้วยเหตุผลเดียวกับขอบบน` }])),
    },
    gap: grow(GAP.base, GAP.step, (v, s) => `ระยะระหว่างไอคอนกับข้อความในช่องขนาด ${s} เท่ากับ ${v}px`),
    icon: grow(ICON.base, ICON.step, (v, s) =>
      `ไอคอนในช่องกรอกขนาด ${s} เท่ากับ ${v}px ได้ระยะเว้นขอบบนล่าง ${(h(s) - v) / 2}px จากการจัดกลางใน ${h(s)}px`),
    border: { ...dim(BORDER), $description: `เส้นขอบช่องกรอก ${BORDER}px ทุกขนาด` },
    'stack-gap': { ...dim(STACK_GAP), $description: `ระยะแนวตั้งระหว่างป้ายกำกับ ช่องกรอก และข้อความช่วย ${STACK_GAP}px ไม่ผูกกับขนาดช่อง` },
    'label-gap': { ...dim(LABEL_GAP), $description: `ช่องไฟระหว่างป้ายชื่อกับดอกจันบังคับกรอก ${LABEL_GAP}px ทุกขนาด` },
    textarea: {
      padding: {
        t: grow(TEXTAREA_PADDING_Y.base, TEXTAREA_PADDING_Y.step, (v, s) => `ระยะขอบบนของช่องหลายบรรทัดขนาด ${s} เท่ากับ ${v}px`),
        b: grow(TEXTAREA_PADDING_Y.base, TEXTAREA_PADDING_Y.step, (v, s) => `ระยะขอบล่างของช่องหลายบรรทัดขนาด ${s} เท่ากับ ${v}px`),
        // ซ้ายขวาใช้สเกลเดียวกับช่องบรรทัดเดียว ตามที่คอมเมนต์ของ text area อธิบายไว้ด้านบน
        // ต้องประกาศเป็น token ของตัวเอง เพราะไฟล์ออกแบบเก็บแยกไว้ที่ input/text-area/padding/left|right
        l: grow(PADDING_X.base, PADDING_X.step, (v, s) => `ระยะขอบซ้ายของช่องหลายบรรทัดขนาด ${s} เท่ากับ ${v}px เท่ากับช่องบรรทัดเดียว`),
        r: grow(PADDING_X.base, PADDING_X.step, (v, s) => `ระยะขอบขวาของช่องหลายบรรทัดขนาด ${s} เท่ากับ ${v}px เท่ากับช่องบรรทัดเดียว`),
      },
      'min-lines': {
        $type: 'number',
        $value: TEXTAREA_MIN_LINES,
        $description: `ความสูงต่ำสุดของช่องหลายบรรทัดคิดเป็น ${TEXTAREA_MIN_LINES} บรรทัด คำนวณจากความสูงบรรทัดของชุดตัวอักษร ไม่ใช่ตัวเลขตายตัว`,
      },
    },
  };

  // ระยะขอบช่องแท็ก = (ความสูงช่อง ลบความสูงแท็ก) หารสอง ใช้ทั้ง 4 ด้าน → 5 · 7 · 9
  const tagPad = (z) => (h(z) - TAG_HEIGHT[z]) / 2;
  for (const z of INPUT_SIZES) {
    const v = tagPad(z);
    if (!Number.isInteger(v) || v < 0)
      throw new Error(`input: ช่องแท็กขนาด ${z} ระยะขอบคำนวณได้ ${v} ซึ่งไม่ใช่จำนวนเต็มบวก ความสูงช่อง ${h(z)} กับแท็กขนาด ${TAG_SIZE_MAP[z]} สูง ${TAG_HEIGHT[z]} เข้ากันไม่ได้`);
    if (v * 2 + TAG_HEIGHT[z] !== h(z))
      throw new Error(`input: ช่องแท็กขนาด ${z} ระยะขอบ ${v} คูณสอง บวกแท็ก ${TAG_HEIGHT[z]} ไม่เท่ากับความสูงช่อง ${h(z)}`);
  }
  const TH = { top: 'บน', bottom: 'ล่าง', left: 'ซ้าย', right: 'ขวา' };
  const tagPadSide = (side) => Object.fromEntries(
    INPUT_SIZES.map((z) => [z, { ...dim(tagPad(z)), $description:
      `ระยะขอบ${TH[side]}ของกล่องช่องแท็กขนาด ${z} เท่ากับ ${tagPad(z)}px คำนวณจาก (ความสูงช่อง ${h(z)} ลบความสูงแท็กขนาด ${TAG_SIZE_MAP[z]} ${TAG_HEIGHT[z]}) หารสอง ใช้ค่าเดียวกันทั้ง 4 ด้าน` }]),
  );
  // ชื่อมิติใช้คำเต็ม top bottom left right ตรงกับตัวแปรใน Figma
  // ต่างจากช่องกรอกข้อความที่ยังใช้ t b l r เพราะช่องแท็กเป็นตัวแปรคนละชุด
  component.tag = {
    padding: { top: tagPadSide('top'), bottom: tagPadSide('bottom'), left: tagPadSide('left'), right: tagPadSide('right') },
    gap: Object.fromEntries(INPUT_SIZES.map((z) => [z, { ...dim(tagPad(z)), $description:
      `ช่องไฟในกล่องช่องแท็กขนาด ${z} ระหว่างกลุ่มแท็ก เส้นคั่น และปุ่มล้าง เท่ากับ ${tagPad(z)}px เท่าระยะขอบของกล่อง` }])),
    'tag-gap': Object.fromEntries(INPUT_SIZES.map((z) => [z, { ...dim(TAG_TAG_GAP[z]), $description:
      `ช่องไฟระหว่างแท็กในช่องแท็กขนาด ${z} ทั้งแนวนอนและตอนขึ้นบรรทัดใหม่ เท่ากับ ${TAG_TAG_GAP[z]}px` }])),
  };

  const semantic = {
    height: { base: dim(HEIGHT.base), step: dim(HEIGHT.step) },
    // ช่องแท็กไม่มี base/step เพราะระยะขอบเป็นผลลัพธ์จากความสูงแท็กจริง
    padding: { base: dim(PADDING_X.base), step: dim(PADDING_X.step) },
    gap: { base: dim(GAP.base), step: dim(GAP.step) },
    icon: { base: dim(ICON.base), step: dim(ICON.step) },
    radius: { base: dim(RADIUS.base), step: dim(RADIUS.step) },
    border: dim(BORDER),
    'stack-gap': dim(STACK_GAP),
    'label-gap': dim(LABEL_GAP),
    textarea: { padding: { base: dim(TEXTAREA_PADDING_Y.base), step: dim(TEXTAREA_PADDING_Y.step) } },
  };

  // มุมโค้งอยู่ที่ <comp>.radius.<corner>.<size> เพราะ Figma ผูก variable แยกทีละมุม
  const CORNERS = ['top-left', 'top-right', 'bottom-right', 'bottom-left'];
  const radiusBySize = Object.fromEntries(
    INPUT_SIZES.map((s) => [s, dim(RADIUS.base + at(s) * RADIUS.step)]),
  );
  const radius = Object.fromEntries(CORNERS.map((c) => [c, radiusBySize]));

  return { name, semantic, component, radius, radiusAppliesTo: ['input'] };
}
