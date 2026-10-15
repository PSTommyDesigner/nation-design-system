// ─────────────────────────────────────────────────────────────
// CARD scale ตอนนี้นิยามเฉพาะมุมโค้ง
//
// การ์ดไม่มีหลายขนาด (ไม่มี xs..xl) มุมโค้งจึงเป็นค่าคงที่ ไม่ต้องมีสูตร
// เลือก 1 ขั้นจากสเกลกลาง ห้ามพิมพ์ตัวเลขเอง
//
// ค่ามาจากของจริงในไฟล์ Figma หน้า 29 Card (สำรวจ 2026-08-20)
//   การ์ด 21 จุดใช้ 4px · อีก 12 จุดใช้ 5px ซึ่งหลุดสเกล ตัดสินให้ปรับเข้า 4 ทั้งหมด
//
// ── ขนาดรูปในการ์ดข่าว (เพิ่ม 2026-10-14 ตอนยกเครื่องหน้า 27) ──
//   วัดจากไฟล์ออกแบบจริงหลังยุบสเกลจาก 7 ขั้นเหลือ 5 (ผู้ใช้ตัดสิน 2026-10-14 ตัดสองขั้นใหญ่สุด)
//   พบว่าทั้งความกว้างและความสูงเป็นลำดับเลขคณิตที่ลงตัวทั้ง 5 ขั้น ไม่ใช่ค่าที่สุ่มมา
//     กว้าง 184 288 392 496 600 → base 184 step 104
//     สูง   104 162 220 278 336 → base 104 step  58
//   สัดส่วนที่ได้อยู่ราว 16 ต่อ 9 ทุกขั้น (คลาด 0.5 เปอร์เซ็นต์) แต่ของจริงเป็นลำดับเลขคณิต
//   ไม่ใช่การคูณสัดส่วน จึงนิยามเป็น base กับ step ตามที่วัดได้ แล้วมีด่านตรวจคุมสัดส่วนไว้
//
// ⚠️ ช่องไฟในการ์ดไม่ทำเป็น token ของการ์ด (ตัดสิน 2026-10-14)
//   ช่องไฟระหว่างรูปกับข้อความต่างกันตามทิศทางการวาง แนวตั้งใช้ 8 8 10 12 14 แนวนอนใช้ 16 16 24 24 24
//   ซึ่งเป็นค่าของ layout ไม่ใช่ของชิ้นงาน และทุกค่ามีอยู่ในสเกลระยะห่างกลางแล้ว
//   จึงให้ผูกกับ size/space/* ตรง ๆ แทนการสร้าง token ซ้ำของการ์ดเอง
// ─────────────────────────────────────────────────────────────
import { RADIUS_SCALE, SIZES } from './global-scale.config.mjs';

export const name = 'card';

export const RADIUS = RADIUS_SCALE.sm;        // 4px
export const RADIUS_FULL = RADIUS_SCALE.full; // 9999px สำหรับ badge และ time count ที่อยู่ในการ์ด
export const CORNERS = ['top-left', 'top-right', 'bottom-right', 'bottom-left'];

export const IMAGE_WIDTH = { base: 184, step: 104 };
export const IMAGE_HEIGHT = { base: 104, step: 58 };

// ── รูปของการ์ดรายการ ค่าเดียวไม่ใช่สูตร ──────────────────
//   การ์ดรายการ (news-list-card · video-list-card) ใช้รูปจัตุรัส 112 คูณ 112 เท่ากันทุกแบบ
//   วัดจากไฟล์ออกแบบจริงทั้ง 8 แบบ ได้ 112 ทุกตัว จึงไม่มีสูตร base กับ step
//   ⚠️ ไม่ใช่ 16 ต่อ 9 เหมือนรูปของการ์ดข่าว จึงต้องแยก token ไม่ใช้ image-width หรือ image-height
//   ⚠️ ก่อนหน้านี้ฝั่งโค้ดยืมขั้น s5-xs ของสเกลระยะห่างกลางมาใช้ เพราะค่าบังเอิญเป็น 112 เท่ากัน
//      ซึ่งอันตราย เพราะ token ตัวนั้นมีหน้าที่เป็นระยะเปิดหน้าขนาดใหญ่ ถ้าใครแก้สเกลระยะห่าง
//      รูปการ์ดรายการจะเพี้ยนตามโดยไม่มีใครรู้ แก้เป็น token ของตัวเองเมื่อ 2026-10-15
export const LIST_IMAGE = 112;

const at = (s) => SIZES.indexOf(s);
const imageWidth = (s) => IMAGE_WIDTH.base + at(s) * IMAGE_WIDTH.step;
const imageHeight = (s) => IMAGE_HEIGHT.base + at(s) * IMAGE_HEIGHT.step;

export function build(dim) {
  // แตกราย 4 มุมเหมือนปุ่ม เพราะ Figma ผูก variable แยกทีละมุม
  const radius = Object.fromEntries([
    ...CORNERS.map((c) => [c, dim(RADIUS)]),
    ['full', dim(RADIUS_FULL)],
  ]);

  for (const s of SIZES) {
    const w = imageWidth(s), h = imageHeight(s);
    // สัดส่วนต้องอยู่ราว 16 ต่อ 9 ถ้าหลุดเกินนี้แปลว่ามีขั้นใดขั้นหนึ่งถูกแก้โดยไม่ได้ตั้งใจ
    const ratio = w / h;
    if (Math.abs(ratio - 16 / 9) > 0.03) {
      throw new Error(
        `card: ขนาด ${s} รูป ${w}x${h} ได้สัดส่วน ${ratio.toFixed(3)} ซึ่งหลุดจาก 16 ต่อ 9 เกินที่ยอมรับ`
      );
    }
    if (!Number.isInteger(w) || !Number.isInteger(h)) {
      throw new Error(`card: ขนาด ${s} รูป ${w}x${h} ไม่ลงตัวเป็นจำนวนเต็ม`);
    }
  }

  if (!Number.isInteger(LIST_IMAGE) || LIST_IMAGE < 1) {
    throw new Error(`card: ขนาดรูปการ์ดรายการต้องเป็นจำนวนเต็มอย่างน้อย 1 (ได้ ${LIST_IMAGE})`);
  }
  const component = {
    'list-image': {
      ...dim(LIST_IMAGE),
      $description:
        `ขนาดรูปในการ์ดรายการ ${LIST_IMAGE}px เท่ากันทั้งกว้างและสูง เพราะเป็นจัตุรัส `
        + `ค่าเดียวทุกแบบ วัดจากไฟล์ออกแบบจริงทั้ง 8 แบบ ไม่ใช่สัดส่วน 16 ต่อ 9 เหมือนรูปการ์ดข่าว`,
    },
    'image-width': Object.fromEntries(SIZES.map((s) => [s, {
      ...dim(imageWidth(s)),
      $description: `ความกว้างรูปในการ์ดข่าวขนาด ${s} เท่ากับ ${imageWidth(s)}px มาจากสูตร ${IMAGE_WIDTH.base} บวก ลำดับขั้น คูณ ${IMAGE_WIDTH.step} วัดจากไฟล์ออกแบบจริง ไม่ใช่ค่าที่ตั้งเอง`,
    }])),
    'image-height': Object.fromEntries(SIZES.map((s) => [s, {
      ...dim(imageHeight(s)),
      $description: `ความสูงรูปในการ์ดข่าวขนาด ${s} เท่ากับ ${imageHeight(s)}px มาจากสูตร ${IMAGE_HEIGHT.base} บวก ลำดับขั้น คูณ ${IMAGE_HEIGHT.step} ได้สัดส่วนราว 16 ต่อ 9 ทุกขั้น มีด่านตรวจคุมไว้`,
    }])),
  };

  const semantic = {
    'image-width': { base: dim(IMAGE_WIDTH.base), step: dim(IMAGE_WIDTH.step) },
    'image-height': { base: dim(IMAGE_HEIGHT.base), step: dim(IMAGE_HEIGHT.step) },
  };

  const checks = [
    {
      label: 'ความกว้างรูป ต้องเท่ากับ ค่าตั้งต้น บวก ลำดับขั้น คูณ ค่าที่เพิ่มต่อขั้น',
      eq: (a, s) => [a('image-width', s), IMAGE_WIDTH.base + at(s) * IMAGE_WIDTH.step],
    },
    {
      label: 'ความสูงรูป ต้องเท่ากับ ค่าตั้งต้น บวก ลำดับขั้น คูณ ค่าที่เพิ่มต่อขั้น',
      eq: (a, s) => [a('image-height', s), IMAGE_HEIGHT.base + at(s) * IMAGE_HEIGHT.step],
    },
  ];

  return { name, semantic, component, radius, radiusAppliesTo: ['card'], checks, sizes: SIZES };
}
