/**
 * MockupMedia Nation Design System
 *
 * ภาพแทนรูปภาพและวีดีโอ วางแทนภาพจริงในการ์ด Modal และหน้าจอตัวอย่าง ระหว่างที่ยังไม่มีภาพ
 * บอกผู้ดูได้ว่าตรงนั้นคือรูปหรือวีดีโอ แทนพื้นเทาเปล่า
 * ตรงกับ component set `mockup-media` ในไฟล์ออกแบบหน้า 10 Frame (แกน kind กับ size) สร้าง 2026-11-11
 *
 * ⚠️ กล่องยืดเต็มกรอบที่วาง (กว้างและสูง 100%)
 *    ถ้ากรอบแม่ไม่มีความสูงของตัวเอง ให้ส่ง ratio แล้วกล่องจะสูงตามสัดส่วน (แกน ratio เพิ่ม 2026-11-12)
 *    มุมโค้งเป็นของกรอบที่วาง ไม่ใช่ของกล่องนี้
 *
 * ⚠️ เลือก size ตามขนาดกล่องที่วาง ไอคอนย่อตาม (16 20 24 32 40) และข้อความแสดงเฉพาะ lg กับ xl
 *    กล่องสูงไม่ถึงราว 120 (เช่นช่องภาพของการ์ดในรายการ) ใช้ md ลงไป
 *
 * ⚠️ เป็นของตกแต่ง ไม่ใช่เนื้อหา ไอคอนกับข้อความจึงซ่อนจากโปรแกรมอ่านหน้าจอ
 *    ถ้าภาพจริงมีความหมาย ให้ใส่ alt ที่ภาพจริงตอนมีภาพแล้ว ไม่ใช่ที่กล่องนี้
 *
 * ⚠️ ห้ามใช้ในหน้าจริงที่ผู้ใช้ปลายทางเห็น ใช้กับ prototype หน้าเอกสาร และสถานะที่ภาพยังไม่มีเท่านั้น
 *    ถ้าภาพโหลดไม่ขึ้นในหน้าจริง ให้ใช้รูปสำรองของแบรนด์แทน
 *
 * ค่าทั้งหมดมาจาก design tokens ผ่าน CSS variables ไม่มีค่า hard-code
 */
import React from 'react';
import { Icon, type IconName } from '../Icon';
import styles from './MockupMedia.module.css';

/** ชนิดของภาพ ตรงกับแกน kind ในไฟล์ออกแบบ */
export type MockupMediaKind = 'image' | 'video';
/** ขนาด ตรงกับแกน size ในไฟล์ออกแบบ เลือกตามขนาดกล่องที่วาง */
export type MockupMediaSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
/** สัดส่วน ตรงกับแกน ratio ในไฟล์ออกแบบ แทนกรอบสัดส่วนเดิมของหน้า 10 */
export type MockupMediaRatio = '16:9' | '4:3' | '1:1' | '9:16';

export interface MockupMediaProps extends React.HTMLAttributes<HTMLDivElement> {
  /** `image` แสดงไอคอนรูปภาพกับคำว่า รูปภาพ ส่วน `video` แสดงไอคอนกล้องกับคำว่า วีดีโอ ค่าเริ่มต้น image */
  kind?: MockupMediaKind;
  /** xs ถึง md มีแต่ไอคอน ส่วน lg กับ xl มีข้อความใต้ไอคอนด้วย ค่าเริ่มต้น md */
  size?: MockupMediaSize;
  /**
   * สัดส่วนของกล่อง ส่งแล้วกล่องกว้างเต็มกรอบและสูงตามสัดส่วน ใช้เมื่อกรอบแม่ไม่มีความสูงของตัวเอง
   * ไม่ส่งก็ยืดเต็มกรอบทั้งกว้างและสูง 16:9 ภาพเปิดข่าว 4:3 ภาพในเนื้อหา 1:1 ภาพในกริด 9:16 คลิปแนวตั้ง
   */
  ratio?: MockupMediaRatio;
}

const ICON: Record<MockupMediaKind, IconName> = { image: 'image', video: 'videocam' };
const LABEL: Record<MockupMediaKind, string> = { image: 'รูปภาพ', video: 'วีดีโอ' };

/**
 * @example
 * <MockupMedia kind="image" size="xl" ratio="16:9" />
 * <div style={{ width: 165, height: 86 }}><MockupMedia size="sm" /></div>
 */
export function MockupMedia({ kind = 'image', size = 'md', ratio, className, ...rest }: MockupMediaProps) {
  const classes = [styles.root, styles[size], className].filter(Boolean).join(' ');
  return (
    <div className={classes} data-kind={kind} data-ratio={ratio} aria-hidden="true" {...rest}>
      <span className={styles.icon}>
        <Icon name={ICON[kind]} size="100%" />
      </span>
      <span className={styles.label}>{LABEL[kind]}</span>
    </div>
  );
}

export default MockupMedia;
