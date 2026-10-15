// ประกาศชนิดข้อมูลของสิ่งที่ไม่ได้มาจากโค้ดเรา ใช้ตอน npm run typecheck เท่านั้น

/**
 * CSS Module
 * component ทุกตัวนำเข้าไฟล์ .module.css แล้วอ่านชื่อคลาสจากอ็อบเจกต์ที่ได้
 * ตัวรวมโค้ดของโปรเจกต์ปลายทางเป็นคนแปลงไฟล์นี้ ที่นี่บอกแค่ว่าหน้าตาเป็นอย่างไร
 */
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

/**
 * process.env.NODE_ENV
 * ใช้เฉพาะเพื่อซ่อนคำเตือนตอน production (เช่น เตือนเมื่อเรียกชื่อไอคอนที่ไม่มีอยู่)
 *
 * ⚠️ ตั้งใจประกาศแคบ ๆ แทนการติดตั้ง @types/node ทั้งก้อน
 *    เพราะชุดนี้เป็น component สำหรับเบราว์เซอร์ ถ้าดึง @types/node เข้ามา
 *    ของฝั่ง Node อย่าง require หรือ Buffer จะกลายเป็นของที่เรียกใช้ได้โดยตัวตรวจไม่ทักท้วง
 */
declare const process: {
  readonly env: {
    readonly NODE_ENV?: string;
    readonly [key: string]: string | undefined;
  };
};
