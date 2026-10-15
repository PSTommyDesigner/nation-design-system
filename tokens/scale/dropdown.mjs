// ─────────────────────────────────────────────────────────────
// DROPDOWN component (รายการแบบเลื่อนลง · หน้า 25 Dropdowns)
//
// ค่าทุกตัวมาจากการวัดไฟล์ออกแบบจริง 2026-10-12 บวกงานวิจัยเทียบ 10 เจ้า
// (ดู docs/research/dropdown-component.md) และคำตัดสินของผู้ใช้วันเดียวกัน
//
// ── ของกลางที่ยืมมาใช้ ห้ามตั้งใหม่ ───────────────────────────
//   ช่องของ dropdown คือช่องกรอกที่กดแล้วเปิดแผง จึงเป็นของชนิดเดียวกับหน้า 13 Input
//   ยืมมาทั้ง ความสูง ระยะขอบซ้ายขวา ช่องไฟ ขนาดไอคอน และมุมโค้ง
//   มีด่านตรวจใน build() เทียบกับ input.mjs ตรง ๆ ถ้าใครแก้ข้างใดข้างหนึ่งจะหยุดทันที
//   (บทเรียนจากหน้า 23 ที่ตั้งสูตรเองแล้วไปชนกับรางของ slider)
//
// ── ทำไมเปิดแค่ sm md lg ─────────────────────────────────────
//   เหตุผลเดียวกับช่องกรอกทุกข้อ ไม่เปิด xs เพราะ 24 เป็นเส้นขั้นต่ำพอดีของเกณฑ์ 2.5.8
//   และไม่เปิด xl เพราะไม่มีเจ้าไหนในตลาดใช้ช่องสูงเกิน 48 บนเดสก์ท็อป
//
// ⚠️ ความสูงเดิมคือ 44 ซึ่งไม่ตรงกับใครเลย
//    ไม่อยู่ในสเกลของระบบ (24 32 40 48) และไม่ตรงกับเจ้าไหนในตลาดทั้ง 10 เจ้า
//    ที่ใกล้ที่สุดคือ Untitled UI 44 แต่ของเขาเป็นผลลัพธ์ของระยะขอบ ไม่ใช่ค่าที่ประกาศ
//    5 ใน 10 เจ้าใช้ชุด 24 32 40 48 ซึ่งตรงกับสูตรความสูงกลางของเราพอดี
//
// ⚠️ ระยะจากช่องถึงแผง 4 (ผู้ใช้ตัดสิน 2026-10-12)
//    ของเดิมคือ 8 ซึ่งอยู่ในช่วงที่ตลาดใช้ แต่ 4 เป็นเสียงส่วนใหญ่ (Carbon Ant Primer Untitled UI)
//    แผงที่ติดกับช่องมากขึ้นสื่อว่าเป็นของชิ้นเดียวกัน ไม่ใช่กล่องลอยคนละชิ้น
//
// ⚠️ ความสูงสูงสุดของแผง คิดจากความสูงแถวคูณ 5.5 (ผู้ใช้ตัดสิน 2026-10-12)
//    เป็นสูตรของ Carbon ซึ่งเจตนาให้ขอบแถวที่หกโผล่ครึ่งหนึ่ง
//    เป็นสัญญาณบอกผู้ใช้ว่ายังเลื่อนดูต่อได้ โดยไม่ต้องพึ่งแถบเลื่อนอย่างเดียว
//    ของเดิมตรึงไว้ที่ 320 ค่าเดียวทุกขนาด ซึ่งไม่ผูกกับอะไรเลย
//
// ⚠️ ไม่มี component แถบเลื่อน โดยตั้งใจ
//    ของเดิมมีชุด _Scroll bar วาดเอง 3 แบบ (25% 50% 75%)
//    แต่ 8 ใน 10 เจ้าใช้แถบเลื่อนของเบราว์เซอร์ ที่เหลือทำ virtual list ซึ่งเป็นเรื่องของโค้ด
//    แถบเลื่อนที่วาดเองไม่ขยับตามเนื้อหาจริง จึงเป็นภาพลวงในไฟล์ออกแบบ
//
// ⚠️ ความสูงแถว เท่ากับความสูงช่องทุกขนาด
//    Carbon กับ Spectrum ทำแบบนี้ และเป็นวิธีที่ตรวจง่ายที่สุด
//    เพราะแถวกับช่องวางซ้อนแนวเดียวกัน ถ้าสูงไม่เท่ากันจะเห็นทันทีว่าเหลื่อม
// ─────────────────────────────────────────────────────────────
import { SIZES, RADIUS_FORMULA, CONTROL_HEIGHT } from './global-scale.config.mjs';
import { HEIGHT as INPUT_HEIGHT, PADDING_X as INPUT_PADDING_X, GAP as INPUT_GAP,
         ICON as INPUT_ICON, RADIUS as INPUT_RADIUS } from './input.mjs';
import { SIZE as AVATAR_SIZE } from './avatar.mjs';
import { BOX as CHECKBOX_BOX } from './checkbox.mjs';

export const name = 'dropdown';

export const DROPDOWN_SIZES = ['sm', 'md', 'lg'];

export const USAGE = {
  sm: 'ในแผงที่มีของเยอะบนจอ หรือในแถวของตาราง',
  md: 'ค่าเริ่มต้นของระบบ ใช้กับฟอร์มทั่วไป',
  lg: 'ฟอร์มบนมือถือ เพราะผ่านทั้งเกณฑ์ของ Android และ Apple',
};

// ── ของกลาง ยืมจากช่องกรอกทั้งก้อน ────────────────────────────
export const HEIGHT = INPUT_HEIGHT;          // 32 · 40 · 48
export const PADDING_X = INPUT_PADDING_X;    // 10 · 12 · 14
export const GAP = INPUT_GAP;                //  4 ·  6 ·  8
export const ICON = INPUT_ICON;              // 18 · 20 · 22
export const RADIUS = RADIUS_FORMULA.dropdown;

// ── semantic knobs เฉพาะของหน้านี้ ───────────────────────────
// ระยะจากขอบล่างของช่อง ถึงขอบบนของแผง เท่ากันทุกขนาดเพราะเป็นระยะแยกกล่องสองใบ
// ไม่ใช่ระยะที่โตตามเนื้อหา
export const PANEL_OFFSET = 4;
// จำนวนแถวที่แผงสูงได้ก่อนเริ่มเลื่อน ครึ่งแถวที่เกินมาคือสัญญาณว่ายังมีต่อ
export const PANEL_ROWS = 5.5;
// ระยะขอบบนล่างในแผง กันไม่ให้แถวแรกกับแถวสุดท้ายชนขอบ
export const PANEL_PADDING_Y = { base: 2, step: 2 };  // sm 4 · md 6 · lg 8

// ── ความสามารถที่ยกมาจากหน้า 27 Lists ตอนยุบหน้านั้น (ผู้ใช้สั่ง 2026-10-12) ──
//   หน้า 27 มีแถวของ dropdown รุ่นเก่าอยู่ 2 ชุด 36 แบบ ซึ่งทำได้มากกว่าชุดใหม่
//   คือมีไอคอนนำหน้า อวาตาร์ ข้อความรอง และช่องติ๊ก จึงยกความสามารถเข้ามาก่อนลบของเก่า
//   จุดสีนำหน้าของเก่า ตัดทิ้ง (ผู้ใช้ตัดสิน 2026-10-12) เพราะสีอย่างเดียวสื่อความหมายไม่ได้

// ความสูงบรรทัดของ preset ที่แถวใช้ อ่านจาก typography.json ไม่ใช่ค่าที่ตั้งเอง
//   ข้อความหลัก sm body/sm (24) · md body/md (26) · lg body/lg (28)
//   ข้อความรอง เล็กกว่าหนึ่งขั้นเสมอ sm body/xs (22) · md body/sm (24) · lg body/md (26)
//   หัวกลุ่ม เล็กกว่าหนึ่งขั้นเสมอ sm label/sm (22) · md label/md (24) · lg label/lg (26)
export const OPTION_LINE = { sm: 24, md: 26, lg: 28 };
export const SUPPORTING_LINE = { sm: 22, md: 24, lg: 26 };
export const GROUP_HEADER_LINE = { sm: 22, md: 24, lg: 26 };

// ระยะที่อวาตาร์เว้นจากขอบแถวบนล่างรวมกัน เป็นตัวกำหนดว่าขั้นไหนใส่อวาตาร์ได้
//   sm คำนวณได้ 16 ซึ่งเล็กกว่าอวาตาร์ขั้นเล็กสุด (24) จึงไม่รองรับอวาตาร์ (ผู้ใช้ตัดสิน 2026-10-12)
export const LEADING_AVATAR_INSET = 16;
export const AVATAR_SIZES = ['md', 'lg'];

// ── ค่าอนุพันธ์ ห้ามตั้งเอง ───────────────────────────────────
const at = (s) => SIZES.indexOf(s);
const height = (s) => HEIGHT.base + at(s) * HEIGHT.step;
const paddingX = (s) => PADDING_X.base + at(s) * PADDING_X.step;
const gap = (s) => GAP.base + at(s) * GAP.step;
const icon = (s) => ICON.base + at(s) * ICON.step;
const radius = (s) => RADIUS.base + at(s) * RADIUS.step;
const panelPaddingY = (s) => PANEL_PADDING_Y.base + at(s) * PANEL_PADDING_Y.step;
// แถวสูงเท่าช่องเสมอ
const rowHeight = (s) => height(s);
// ความสูงสูงสุดของแผง คิดจากแถวคูณ 5.5 บวกระยะขอบบนล่าง
const panelMaxHeight = (s) => rowHeight(s) * PANEL_ROWS + panelPaddingY(s) * 2;
// แถวที่เปิดข้อความรอง สูงขึ้นเท่าความสูงบรรทัดของข้อความรอง ระยะขอบบนล่างจึงเท่าเดิมเป๊ะ
const rowHeightSupporting = (s) => rowHeight(s) + SUPPORTING_LINE[s];
const panelMaxHeightSupporting = (s) => rowHeightSupporting(s) * PANEL_ROWS + panelPaddingY(s) * 2;
// หัวกลุ่มใช้ระยะขอบบนล่างเท่าแถว แต่ข้อความเล็กกว่าหนึ่งขั้น จึงเตี้ยกว่าแถว 2px เสมอ
const groupHeaderHeight = (s) => rowHeight(s) - (OPTION_LINE[s] - GROUP_HEADER_LINE[s]);
const leadingAvatar = (s) => height(s) - LEADING_AVATAR_INSET;
// ระยะขอบบนล่างของแถว เป็นตัวคุมความสูงจริงในไฟล์ออกแบบ เพราะแถวหุ้มเนื้อหา ไม่ได้ตรึงความสูง
//   เปิดข้อความรองแล้วแถวจึงสูงขึ้นเอง ไม่ต้องมีแกนแบบเพิ่ม และไม่มีเนื้อหาล้นกรอบ
//   หัวกลุ่มใช้ระยะขอบชุดเดียวกัน ความสูงหัวกลุ่มจึงเป็นผลลัพธ์ของระยะขอบชุดนี้บวกบรรทัด label
const rowPaddingY = (s) => (height(s) - OPTION_LINE[s]) / 2;

// ── build ────────────────────────────────────────────────────
export function build(dim) {
  // ด่านตรวจของกลาง ถ้าหลุดจากช่องกรอกเมื่อไหร่ สองหน้าจะวางคู่กันแล้วไม่ตรงแนว
  const locked = [
    ['ความสูง', HEIGHT, INPUT_HEIGHT],
    ['ระยะขอบซ้ายขวา', PADDING_X, INPUT_PADDING_X],
    ['ช่องไฟ', GAP, INPUT_GAP],
    ['ขนาดไอคอน', ICON, INPUT_ICON],
  ];
  for (const [label, mine, theirs] of locked) {
    if (mine.base !== theirs.base || mine.step !== theirs.step) {
      throw new Error(
        `dropdown: ${label} (base ${mine.base} step ${mine.step}) ไม่ตรงกับช่องกรอก ` +
        `(base ${theirs.base} step ${theirs.step}) สองตัวนี้เป็นของชนิดเดียวกัน ต้องใช้สูตรเดียวกันเสมอ`
      );
    }
  }
  if (HEIGHT.base !== CONTROL_HEIGHT.base || HEIGHT.step !== CONTROL_HEIGHT.step) {
    throw new Error('dropdown: ความสูงไม่ตรงกับความสูงกลางของระบบ');
  }
  if (RADIUS.base !== INPUT_RADIUS.base || RADIUS.step !== INPUT_RADIUS.step) {
    throw new Error(
      `dropdown: มุมโค้ง (base ${RADIUS.base} step ${RADIUS.step}) ไม่ตรงกับช่องกรอก ` +
      `(base ${INPUT_RADIUS.base} step ${INPUT_RADIUS.step}) ช่องสองชนิดนี้ต้องมุมเท่ากัน`
    );
  }
  for (const s of DROPDOWN_SIZES) {
    if (rowHeight(s) !== height(s)) {
      throw new Error(`dropdown: ขนาด ${s} ความสูงแถว ${rowHeight(s)} ไม่เท่าความสูงช่อง ${height(s)}`);
    }
    if (!Number.isInteger(panelMaxHeight(s))) {
      throw new Error(`dropdown: ขนาด ${s} ความสูงสูงสุดของแผงไม่ลงตัว (ได้ ${panelMaxHeight(s)})`);
    }
    if (paddingX(s) * 2 + icon(s) * 2 + gap(s) * 2 >= height(s) * 4) {
      throw new Error(`dropdown: ขนาด ${s} ไอคอนสองข้างกับระยะขอบกินที่จนไม่เหลือที่ให้ข้อความ`);
    }
    // แถวหนึ่งบรรทัดต้องมีระยะขอบบนล่างเท่ากัน ถ้าไม่เท่าแปลว่า preset กับความสูงแถวหลุดจากกัน
    if ((height(s) - OPTION_LINE[s]) % 2 !== 0) {
      throw new Error(`dropdown: ขนาด ${s} ความสูงแถว ${height(s)} ลบความสูงบรรทัด ${OPTION_LINE[s]} แล้วหารสองไม่ลงตัว แปลว่า preset กับความสูงไม่เข้าคู่กัน`);
    }
    // แถวสองบรรทัด ต้องรักษาระยะขอบบนล่างเดิมไว้เป๊ะ
    const padOneLine = rowPaddingY(s);
    // ความสูงแถวต้องบวกกลับได้จากระยะขอบกับบรรทัดเสมอ ไม่งั้นไฟล์ออกแบบกับโค้ดจะหลุดกัน
    if (rowPaddingY(s) * 2 + OPTION_LINE[s] !== height(s)) {
      throw new Error(`dropdown: ขนาด ${s} ระยะขอบบนล่าง ${rowPaddingY(s)} คูณสอง บวกบรรทัด ${OPTION_LINE[s]} แล้วไม่เท่าความสูงแถว ${height(s)}`);
    }
    if (rowPaddingY(s) * 2 + GROUP_HEADER_LINE[s] !== groupHeaderHeight(s)) {
      throw new Error(`dropdown: ขนาด ${s} หัวกลุ่มไม่ได้ใช้ระยะขอบชุดเดียวกับแถว`);
    }
    const padTwoLine = (rowHeightSupporting(s) - OPTION_LINE[s] - SUPPORTING_LINE[s]) / 2;
    if (padOneLine !== padTwoLine) {
      throw new Error(`dropdown: ขนาด ${s} ระยะขอบบนล่างของแถวสองบรรทัด (${padTwoLine}) ไม่เท่าแถวบรรทัดเดียว (${padOneLine})`);
    }
    if (!Number.isInteger(panelMaxHeightSupporting(s))) {
      throw new Error(`dropdown: ขนาด ${s} ความสูงสูงสุดของแผงแบบสองบรรทัดไม่ลงตัว (ได้ ${panelMaxHeightSupporting(s)})`);
    }
    // หัวกลุ่มต้องเตี้ยกว่าแถวเสมอ ไม่งั้นแยกหัวกลุ่มกับตัวเลือกด้วยตาไม่ออก
    if (groupHeaderHeight(s) >= rowHeight(s)) {
      throw new Error(`dropdown: ขนาด ${s} หัวกลุ่มสูง ${groupHeaderHeight(s)} ไม่เตี้ยกว่าแถว ${rowHeight(s)}`);
    }
    // ช่องติ๊กขั้นชื่อเดียวกันต้องใส่ในแถวได้โดยเหลือที่บนล่างอย่างน้อย 4 รวม
    const box = CHECKBOX_BOX.base + SIZES.indexOf(s) * CHECKBOX_BOX.step;
    if (box > height(s) - 8) {
      throw new Error(`dropdown: ขนาด ${s} ช่องติ๊ก ${box} ใหญ่เกินกว่าที่แถวสูง ${height(s)} จะรับได้`);
    }
  }
  // อวาตาร์นำหน้า รองรับเฉพาะขั้นที่คำนวณแล้วได้ขนาดที่มีจริงในชุดอวาตาร์
  for (const s of AVATAR_SIZES) {
    const want = leadingAvatar(s);
    const step = (want - AVATAR_SIZE.base) / AVATAR_SIZE.step;
    if (!Number.isInteger(step) || step < 0) {
      throw new Error(
        `dropdown: ขนาด ${s} อวาตาร์นำหน้าคำนวณได้ ${want} ซึ่งไม่มีในสเกลของอวาตาร์ ` +
        `(ตั้งต้น ${AVATAR_SIZE.base} เพิ่มขั้นละ ${AVATAR_SIZE.step})`
      );
    }
  }
  for (const s of DROPDOWN_SIZES) {
    if (!AVATAR_SIZES.includes(s) && leadingAvatar(s) >= AVATAR_SIZE.base) {
      throw new Error(
        `dropdown: ขนาด ${s} ถูกตัดออกจากขั้นที่รองรับอวาตาร์ แต่คำนวณแล้วใส่ได้จริง (${leadingAvatar(s)}) ให้เพิ่มกลับเข้าไป`
      );
    }
  }

  const grow = (fn, note) =>
    Object.fromEntries(DROPDOWN_SIZES.map((s) => [s, { ...dim(fn(s)), $description: note(fn(s), s) }]));

  const component = {
    height: grow(height, (v, s) =>
      `ความสูงช่องของ dropdown ขนาด ${s} เท่ากับ ${v}px ยืมจากช่องกรอกหน้า 13 ซึ่งอ่านจากความสูงกลางของระบบอีกที ของเดิมคือ 44 ซึ่งไม่ตรงกับสเกลของระบบและไม่ตรงกับเจ้าไหนในตลาดทั้ง 10 เจ้า`),
    'padding-x': grow(paddingX, (v, s) =>
      `ระยะขอบซ้ายขวาในช่องของขนาด ${s} เท่ากับ ${v}px ยืมจากช่องกรอก ไม่มีระยะขอบบนล่างโดยตั้งใจ เพราะความสูงช่องเป็นตัวคุมแล้ว`),
    gap: grow(gap, (v, s) =>
      `ช่องไฟระหว่างไอคอน ข้อความ และลูกศรของขนาด ${s} เท่ากับ ${v}px ยืมจากช่องกรอก`),
    icon: grow(icon, (v, s) =>
      `ขนาดไอคอนในช่องของขนาด ${s} เท่ากับ ${v}px ยืมจากช่องกรอก ใช้ทั้งไอคอนนำหน้าและลูกศรลง`),
    'panel-offset': Object.fromEntries(DROPDOWN_SIZES.map((s) => [s, {
      ...dim(PANEL_OFFSET),
      $description: `ระยะจากขอบล่างของช่องถึงขอบบนของแผงของขนาด ${s} เท่ากับ ${PANEL_OFFSET}px เท่ากันทุกขนาดเพราะเป็นระยะแยกกล่องสองใบ ไม่ใช่ระยะที่โตตามเนื้อหา เป็นค่าที่ Carbon Ant Primer และ Untitled UI ใช้ตรงกัน ของเดิมคือ 8`,
    }])),
    'row-height': grow(rowHeight, (v, s) =>
      `ความสูงแถวในแผงของขนาด ${s} เท่ากับ ${v}px เท่ากับความสูงช่องเสมอ เป็นค่าอนุพันธ์ ห้ามพิมพ์มือ Carbon กับ Spectrum ทำแบบนี้เพราะตรวจง่ายที่สุด`),
    'panel-padding-y': grow(panelPaddingY, (v, s) =>
      `ระยะขอบบนล่างในแผงของขนาด ${s} เท่ากับ ${v}px กันไม่ให้แถวแรกกับแถวสุดท้ายชนขอบแผง`),
    'panel-max-height': grow(panelMaxHeight, (v, s) =>
      `ความสูงสูงสุดของแผงของขนาด ${s} เท่ากับ ${v}px เป็นค่าอนุพันธ์ คิดจาก ความสูงแถว ${rowHeight(s)} คูณ ${PANEL_ROWS} บวกระยะขอบบนล่าง ${panelPaddingY(s)} สองด้าน ห้ามพิมพ์มือ ครึ่งแถวที่เกินมาคือสัญญาณว่ายังเลื่อนดูต่อได้ ของเดิมตรึงไว้ที่ 320 ทุกขนาดซึ่งไม่ผูกกับอะไร`),
    'row-padding-y': grow(rowPaddingY, (v, s) =>
      `ระยะขอบบนล่างของแถวขนาด ${s} เท่ากับ ${v}px เป็นค่าอนุพันธ์ คือความสูงแถวลบความสูงบรรทัด หารสอง ตัวนี้เป็นตัวคุมความสูงจริงในไฟล์ออกแบบ เพราะแถวหุ้มเนื้อหา เปิดข้อความรองแล้วแถวจึงสูงขึ้นเอง หัวกลุ่มใช้ค่าเดียวกันนี้`),
    'row-height-supporting': grow(rowHeightSupporting, (v, s) =>
      `ความสูงแถวที่เปิดข้อความรองของขนาด ${s} เท่ากับ ${v}px เป็นค่าอนุพันธ์ คิดจาก ความสูงแถวปกติ ${rowHeight(s)} บวกความสูงบรรทัดของข้อความรอง ${SUPPORTING_LINE[s]} สูตรนี้รักษาระยะขอบบนล่างเดิมไว้เป๊ะคือ ${(height(s) - OPTION_LINE[s]) / 2}px ความสามารถนี้ยกมาจากหน้า 27 Lists ตอนยุบหน้านั้น`),
    'panel-max-height-supporting': grow(panelMaxHeightSupporting, (v, s) =>
      `ความสูงสูงสุดของแผงเมื่อแถวเปิดข้อความรอง ขนาด ${s} เท่ากับ ${v}px เป็นค่าอนุพันธ์ คิดด้วยสูตรคูณ ${PANEL_ROWS} ตัวเดิม แต่เปลี่ยนความสูงแถวเป็น ${rowHeightSupporting(s)}`),
    'group-header-height': grow(groupHeaderHeight, (v, s) =>
      `ความสูงหัวกลุ่มในแผงของขนาด ${s} เท่ากับ ${v}px เป็นค่าอนุพันธ์ เตี้ยกว่าแถว 2px เพราะข้อความเล็กกว่าหนึ่งขั้น แต่ระยะขอบบนล่างเท่าแถวเป๊ะ ใช้ preset label ขั้นเดียวกับข้อความรอง`),
    'leading-avatar': Object.fromEntries(AVATAR_SIZES.map((s) => [s, {
      ...dim(leadingAvatar(s)),
      $description: `ขนาดอวาตาร์นำหน้าแถวของขนาด ${s} เท่ากับ ${leadingAvatar(s)}px เป็นค่าอนุพันธ์ คือความสูงแถวลบ ${LEADING_AVATAR_INSET} จึงเหลือระยะขอบด้านละ 8 ขนาด sm ไม่รองรับอวาตาร์ เพราะคำนวณได้ 16 ซึ่งเล็กกว่าอวาตาร์ขั้นเล็กสุดของระบบ`,
    }])),
  };

  const semantic = {
    'panel-rows': { base: dim(PANEL_ROWS), step: dim(0) },
    'panel-padding-y': { base: dim(PANEL_PADDING_Y.base), step: dim(PANEL_PADDING_Y.step) },
    // ความสูง ระยะขอบ ช่องไฟ ไอคอน และมุมโค้ง ไม่มี base หรือ step ของตัวเอง เพราะยืมจากช่องกรอก
  };

  const radiusOut = Object.fromEntries(
    DROPDOWN_SIZES.map((s) => [s, {
      ...dim(radius(s)),
      $description: `มุมโค้งของช่องและของแผงขนาด ${s} เท่ากับ ${radius(s)}px ยืมสูตรมุมโค้งช่องกรอก ช่องสองชนิดนี้วางคู่กันในฟอร์มเดียวกันจึงต้องมุมเท่ากัน`,
    }])
  );

  const checks = [
    {
      label: 'ความสูงแถวในแผง ต้องเท่ากับความสูงช่อง',
      eq: (a, s) => [a('row-height', s), a('height', s)],
    },
    {
      label: 'ความสูงสูงสุดของแผง ต้องเท่ากับ ความสูงแถว คูณ 5.5 บวกระยะขอบบนล่างสองด้าน',
      eq: (a, s) => [a('panel-max-height', s) * 2, (a('row-height', s) * 11) + (a('panel-padding-y', s) * 4)],
    },
    {
      label: 'ความสูงสูงสุดของแผงแบบสองบรรทัด ต้องใช้สูตรเดียวกันกับแบบบรรทัดเดียว',
      eq: (a, s) => [a('panel-max-height-supporting', s) * 2, (a('row-height-supporting', s) * 11) + (a('panel-padding-y', s) * 4)],
    },
    {
      label: 'หัวกลุ่ม ต้องเตี้ยกว่าแถว 2px เพราะข้อความเล็กกว่าหนึ่งขั้น',
      eq: (a, s) => [a('group-header-height', s) + 2, a('row-height', s)],
    },
    {
      label: 'ระยะขอบบนล่างสองด้าน บวกความสูงบรรทัด ต้องเท่าความสูงแถวพอดี',
      eq: (a, s) => [a('row-padding-y', s) * 2 + OPTION_LINE[s], a('row-height', s)],
    },
  ];

  return { name, semantic, component, radius: radiusOut, radiusAppliesTo: ['dropdown'], checks, sizes: DROPDOWN_SIZES };
}
