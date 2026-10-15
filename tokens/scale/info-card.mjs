// ─────────────────────────────────────────────────────────────
// INFO-CARD component (การ์ดข้อมูลในระบบเอกสาร)
// ใช้ในเอกสารหลายหน้า เช่น how-to-read ในเอกสาร Token · do / don't ในหน้าอื่น
// ต้นฉบับอยู่หน้า 29 Card (node 9670:160)
//
// เป็น component ของ "ระบบเอกสาร" ไม่ใช่ของโปรดักต์ แต่เป็น component จริงที่มี instance
// กระจายหลายหน้า จึงควรมี token ของตัวเอง ไม่ใช่ปล่อยเป็นค่าดิบ
//
// ค่า 12px มาจากของเดิมในไฟล์ (สำรวจ 2026-08-20) ตรงกับขั้น lg พอดี
// ── ไม่ทำฝั่งโค้ดโดยตั้งใจ (ตัดสิน 2026-10-15) ──────────────
//   component ตัวนี้เป็นของ "ระบบเอกสาร" ไม่ใช่ของโปรดักต์
//   ทีมที่หยิบ library ไปใช้ไม่มีวันต้องการมัน ถ้าใส่เข้าไปจะกลายเป็นของที่ไม่มีใครใช้
//   แต่ต้องดูแลตลอด จึง **ไม่ทำ components/ ให้ตัวนี้**
//   token ยังต้องมี เพราะ Figma ใช้จริงและมีสำเนากระจายหลายหน้า
//   หลักการเดียวกับ 21 token ฝั่งโค้ดโดยตั้งใจ แค่กลับทาง
//   ด่านตรวจ scripts/verify-component-coverage.mjs รู้จักข้อยกเว้นนี้แล้ว
// ─────────────────────────────────────────────────────────────
import { RADIUS_SCALE } from './global-scale.config.mjs';

export const name = 'info-card';

export const RADIUS = RADIUS_SCALE.lg; // 12px
export const CORNERS = ['top-left', 'top-right', 'bottom-right', 'bottom-left'];

export function build(dim) {
  const radius = Object.fromEntries(CORNERS.map((c) => [c, dim(RADIUS)]));
  return { name, semantic: null, component: null, radius, radiusAppliesTo: ['info-card'] };
}
