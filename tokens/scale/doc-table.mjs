// ─────────────────────────────────────────────────────────────
// DOC-TABLE (กรอบตารางในระบบเอกสาร)
// เฟรมชื่อ token-table ที่อยู่ใน [Template] Token Document และสำเนาทุกหน้า
//
// เป็นของ "ระบบเอกสาร" ไม่ใช่ของโปรดักต์ แต่มีสำเนากระจายหลายหน้า (7 จุด ใน 5 หน้า
// สำรวจ 2026-08-20) จึงควรมี token ของตัวเอง ไม่ใช่ปล่อยเป็นค่าดิบที่แก้ทีละหน้า
//
// ค่า 8px มาจาก template ต้นฉบับ ตรงกับขั้น md พอดี
// ⚠️ แก้ค่านี้ = กระทบทุกหน้าที่มี Token Document ต้องแก้ที่ template ด้วยเสมอ
// ── ไม่ทำฝั่งโค้ดโดยตั้งใจ (ตัดสิน 2026-10-15) ──────────────
//   component ตัวนี้เป็นของ "ระบบเอกสาร" ไม่ใช่ของโปรดักต์
//   ทีมที่หยิบ library ไปใช้ไม่มีวันต้องการมัน ถ้าใส่เข้าไปจะกลายเป็นของที่ไม่มีใครใช้
//   แต่ต้องดูแลตลอด จึง **ไม่ทำ components/ ให้ตัวนี้**
//   token ยังต้องมี เพราะ Figma ใช้จริงและมีสำเนากระจายหลายหน้า
//   หลักการเดียวกับ 21 token ฝั่งโค้ดโดยตั้งใจ แค่กลับทาง
//   ด่านตรวจ scripts/verify-component-coverage.mjs รู้จักข้อยกเว้นนี้แล้ว
// ─────────────────────────────────────────────────────────────
import { RADIUS_SCALE } from './global-scale.config.mjs';

export const name = 'doc-table';

export const RADIUS = RADIUS_SCALE.md; // 8px
export const CORNERS = ['top-left', 'top-right', 'bottom-right', 'bottom-left'];

export function build(dim) {
  const radius = Object.fromEntries(CORNERS.map((c) => [c, dim(RADIUS)]));
  return { name, semantic: null, component: null, radius, radiusAppliesTo: ['doc-table'] };
}
