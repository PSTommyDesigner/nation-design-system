// ─────────────────────────────────────────────────────────────
// MOCKUP-MEDIA ภาพแทนรูปภาพและวีดีโอ (หน้า 10 Frame)
//
// ที่มา (ผู้ใช้อนุมัติ 2026-11-11)
//   session ของ prototype One CMS เสนอให้มีกล่องแทนรูปภาพและวีดีโอที่บอกผู้ดูได้ว่าตรงนั้นคือรูปหรือวีดีโอ
//   แทนพื้นเทาเปล่า แบบต้นทางอยู่ในไฟล์ CMS `kMw46mRQEaL2s1ofpnSDgh` node 15661:14597 และ 15661:14600
//   ผู้ใช้เลือกให้เป็นชุดใหม่ ไม่ใช่แกนเพิ่มของ image-16:9 กับ video-16:9 เดิม เพราะชุดเดิมเป็นไฟล์ภาพและวีดีโอ
//   ที่ผูก token ไม่ได้ ส่วนชุดนี้เป็นพื้นสี ไอคอน และข้อความ ผูก token ได้ทุกส่วน
//
// ── ไอคอนยืมสเกลไอคอนของระบบ ไม่ตั้งค่าเอง ─────────────────
//   ผู้ใช้เลือกให้ไอคอนย่อตามขนาดกล่อง 5 ขั้น xs ถึง xl
//   แต่ละขั้นชี้ไปที่ขั้นของสเกล size/icon ใน primitive.json แล้วอ่านค่าจริงจากไฟล์นั้น
//   ถ้าวันหนึ่งสเกลไอคอนเปลี่ยน ค่าที่นี่จะตามเอง ห้ามพิมพ์เลขไอคอนในไฟล์นี้
//
// ── ข้อความแสดงเฉพาะ lg กับ xl (ผู้ใช้เลือก 2026-11-11) ─────
//   ข้อความใช้ preset body-sm (14/24) แทน 14/22 ในแบบต้นทางซึ่งไม่มี preset ในระบบ
//   กล่องเล็กตั้งแต่ md ลงมามีแต่ไอคอน เพราะไอคอนบวกบรรทัด 24 แน่นเกินในกล่องสูงราว 86
//   ระยะระหว่างไอคอนกับข้อความเป็น 0 ตามแบบต้นทาง บรรทัด 24 ของ body-sm มีที่ว่างบนล่างอยู่แล้ว
//
// ── ไม่มีระยะขอบ ไม่มีความกว้าง ไม่มีมุมโค้ง ─────────────────
//   กล่องยืดเต็มกรอบที่วางและจัดไอคอนกับข้อความไว้กลาง ไม่ใช้ระยะขอบตายตัว
//   เพราะแบบต้นทางที่มีระยะขอบ 64 กับ 40 ทำให้ล้นในกล่องเล็ก
//   มุมโค้งเป็นของกรอบที่วาง (เช่นการ์ด) ไม่ใช่ของภาพแทนรูป
// ─────────────────────────────────────────────────────────────
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { SIZES } from './global-scale.config.mjs';

export const name = 'mockup-media';

// ขนาดของชุด เท่ากับ 5 ขั้นของทั้งระบบ
export const MOCKUP_SIZES = SIZES;
// ขั้นของสเกล size/icon ที่แต่ละขนาดใช้ อ่านค่าจริงจาก primitive.json
export const ICON_STEP = { xs: 'sm', sm: 'md', md: 'lg', lg: 'xl', xl: '2xl' };
// ขนาดที่แสดงข้อความ
export const LABEL_SIZES = ['lg', 'xl'];

const primitive = JSON.parse(
  readFileSync(fileURLToPath(new URL('../tokens.json/primitive.json', import.meta.url)), 'utf8'),
);
const iconScale = primitive?.size?.icon ?? {};
const px = (v) => Number(String(v).replace(/px$/, ''));

export function build(dim) {
  const iconSize = {};
  let prev = 0;
  for (const s of MOCKUP_SIZES) {
    const step = ICON_STEP[s];
    const leaf = iconScale[step];
    if (!leaf) throw new Error(`mockup-media: ไม่พบ size/icon/${step} ใน primitive.json สำหรับขนาด ${s}`);
    const v = px(leaf.$value);
    if (!Number.isInteger(v) || v <= prev) {
      throw new Error(`mockup-media: ขนาดไอคอนของ ${s} (${leaf.$value}) ต้องเป็นจำนวนเต็มและใหญ่กว่าขนาดก่อนหน้า (${prev})`);
    }
    prev = v;
    iconSize[s] = {
      ...dim(v),
      $description:
        `ขนาดไอคอนในภาพแทนรูปขนาด ${s} เท่ากับ ${v}px ยืมจาก size/icon/${step} ของสเกลไอคอน ` +
        (LABEL_SIZES.includes(s) ? 'ขนาดนี้แสดงข้อความ body-sm ใต้ไอคอนด้วย' : 'ขนาดนี้มีแต่ไอคอน ไม่แสดงข้อความ'),
    };
  }

  const component = { 'icon-size': iconSize };
  return { name, semantic: null, component, radius: null, radiusAppliesTo: [] };
}
