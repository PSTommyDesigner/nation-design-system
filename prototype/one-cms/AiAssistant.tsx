// ปุ่มผู้ช่วย AI "น้องเนเน่" ลอยมุมขวาล่าง แบบระบบเดิม ตามเฟรม `Ai` (15669:14538) ในไฟล์ออกแบบ CMS
// ผู้ใช้สั่ง 2026-11-12: แสดงทุกหน้าของ One CMS ยกเว้น Login กดแล้วยังไม่เกิดอะไร เพราะทีมยังไม่ได้ข้อสรุปฟีเจอร์ AI
// รูปมาสคอตเป็น PNG 160 x 160 (คมบนจอความละเอียดสูง) ห่อใน SVG ที่ตั้ง width height 80 ไว้ในไฟล์ แสดง 80 x 80 ตามแบบ
// ระบบไม่มี token ขนาดรูป จึงตั้งขนาดในไฟล์เหมือนโลโก้
import { Tag } from '../../components/Tag'
import mascot from './assets/nation-ai.svg'
import styles from './AiAssistant.module.css'

export function AiAssistant() {
  return (
    <button type="button" className={styles.root} aria-label="น้องเนเน่ ผู้ช่วย AI">
      <img className={styles.mascot} src={mascot} alt="" />
      <Tag family="brand" shape="pill" size="xs" hierarchy="primary">เนเน่</Tag>
    </button>
  )
}
