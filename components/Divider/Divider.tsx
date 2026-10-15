/**
 * Divider Nation Design System
 *
 * เส้นคั่นระหว่างกลุ่มเนื้อหา ตรงกับ component set ใน Figma หน้า 28 Dividers
 * สองชุดคือ horizontal-divider และ vertical-divider ชุดละ 2 แบบ (type=solid กับ type=dash)
 *
 * ⚠️ ห้ามตรึงความยาวเส้น (ข้อห้ามในเอกสาร docs/28-dividers.md หัวข้อ 5)
 *    เส้นต้องยืดเต็มกรอบแม่เสมอ ความยาวจึงเป็นค่าของ layout ไม่ใช่ token
 *
 * ⚠️ เส้นคั่นเป็นของตกแต่ง ต้องซ่อนจากโปรแกรมอ่านหน้าจอเสมอ
 *    ถ้าการแบ่งมีความหมายจริง ให้ใช้โครงหัวข้อของกลุ่มเป็นตัวบอก ไม่ใช่ให้เส้นเป็นตัวบอก
 *
 * ค่าทั้งหมดมาจาก design tokens ผ่าน CSS variables ไม่มีค่า hard-code
 */
import React from 'react';
import styles from './Divider.module.css';

/** แนวของเส้น ตรงกับชื่อชุดใน Figma คือ horizontal-divider และ vertical-divider */
export type DividerOrientation = 'horizontal' | 'vertical';

/** ชนิดของเส้น ตรงกับแกน `type` ของทั้งสองชุด */
export type DividerType = 'solid' | 'dash';

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * เลือกจากทิศทางที่เนื้อหาเรียงอยู่
   * เรียงบนลงล่างใช้ `horizontal` เรียงซ้ายไปขวาใช้ `vertical`
   */
  orientation?: DividerOrientation;
  /**
   * `solid` คือค่าเริ่มต้น ใช้เมื่อสองฝั่งเป็นเนื้อหาระดับเดียวกัน
   * `dash` ใช้เมื่อการแบ่งเป็นเรื่องชั่วคราวหรือยังไม่แน่นอน
   */
  type?: DividerType;
}

const ORIENTATION_CLASS: Record<DividerOrientation, string> = {
  horizontal: styles.horizontal,
  vertical: styles.vertical,
};

const TYPE_CLASS: Record<DividerType, string> = {
  solid: styles.solid,
  dash: styles.dash,
};

/**
 * @example
 * <Divider />
 * <Divider type="dash" />
 * <Divider orientation="vertical" />
 */
export function Divider({
  orientation = 'horizontal',
  type = 'solid',
  className,
  ...rest
}: DividerProps) {
  const classes = [
    styles.root,
    ORIENTATION_CLASS[orientation],
    TYPE_CLASS[type],
    className,
  ].filter(Boolean).join(' ');

  // role="presentation" คู่กับ aria-hidden เพื่อให้โปรแกรมอ่านหน้าจอข้ามไปเลย
  // วางไว้หลัง rest เพราะเป็นข้อบังคับของเอกสาร ผู้เรียกใช้ทับไม่ได้
  return <div className={classes} {...rest} role="presentation" aria-hidden="true" />;
}

export default Divider;
