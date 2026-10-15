/**
 * Checkbox Nation Design System
 *
 * ช่องติ๊ก ตรงกับ component set ใน Figma หน้า 15 Checkbox (ชุด checkbox และ text-checkbox ชุดละ 60 แบบ)
 * โครงสองชั้นแบบเดียวกับสวิตช์ คือภาพกล่องติ๊กมีสเกลของตัวเอง
 * ส่วนแถวที่กดได้อ้างสเกลความสูงกลางของระบบ จึงวางเรียงแถวเดียวกับปุ่มและช่องกรอกได้พอดี
 *
 * ⚠️ ช่องติ๊กคือตัวควบคุมที่ยังไม่มีผลจนกว่าจะกดบันทึก (เอกสารหน้า 15 ข้อ 1)
 *    ถ้าการเปลี่ยนค่ามีผลทันทีให้ใช้ Toggle จากหน้า 14 Toggles แทน
 *
 * ⚠️ สถานะกึ่งเลือกเป็นผลลัพธ์ของลูกในกลุ่ม ไม่ใช่ตัวเลือกที่ผู้ใช้กดวนได้เอง (เอกสารหน้า 15 ข้อ 2)
 *    และต้องตั้งผ่าน property `indeterminate` ในจาวาสคริปต์เท่านั้น เอชทีเอ็มแอลไม่มีแอตทริบิวต์นี้
 *
 * ค่าทั้งหมดมาจาก design tokens ผ่าน CSS variables ไม่มีค่า hard-code
 */
import React, { useEffect, useId, useRef } from 'react';
import { Icon } from '../Icon';
import styles from './Checkbox.module.css';

export type CheckboxSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** ข้อความข้างกล่องติ๊ก ตรงกับคุณสมบัติ `title-value` ในไฟล์ออกแบบ */
  label?: React.ReactNode;
  /** ข้อความอธิบายใต้แถว ตรงกับคุณสมบัติ `supporting-text` */
  supportingText?: React.ReactNode;
  size?: CheckboxSize;
  /**
   * สถานะกึ่งเลือก ใช้กับช่องติ๊กหัวกลุ่มที่ลูกถูกเลือกบางส่วน
   * ตั้งผ่าน ref จริงเพราะเอชทีเอ็มแอลไม่มีแอตทริบิวต์นี้ และคู่กับ `aria-checked="mixed"`
   */
  indeterminate?: boolean;
  /**
   * บังคับความสูงแถวให้ถึงพื้นที่แตะขั้นต่ำ ใช้กับจอสัมผัส
   * อ้าง `--ntg-checkbox-row-height-touch` ไม่ใช่ขนาดภาพกล่องติ๊ก
   */
  touchTarget?: boolean;
}

const SIZE_CLASS: Record<CheckboxSize, string> = {
  xs: styles.xs, sm: styles.sm, md: styles.md, lg: styles.lg, xl: styles.xl,
};

/**
 * @example
 * <Checkbox label="ยอมรับเงื่อนไข" checked={ok} onChange={e => setOk(e.target.checked)} />
 * <Checkbox size="lg" label="เลือกทั้งหมด" indeterminate={some} supportingText="เลือกไว้บางรายการ" />
 */
export function Checkbox({
  label,
  supportingText,
  size = 'md',
  indeterminate = false,
  touchTarget = false,
  checked,
  defaultChecked,
  disabled = false,
  className,
  id,
  ...rest
}: CheckboxProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const describedBy = supportingText ? `${inputId}-supporting` : undefined;
  // อ่านสถานะได้ทั้งแบบคุมเองและแบบปล่อยให้ DOM คุม
  const isChecked = checked ?? defaultChecked ?? false;

  // สถานะกึ่งเลือกตั้งได้ทาง property เท่านั้น จึงต้องผ่าน ref จริง
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  const classes = [
    styles.root,
    SIZE_CLASS[size],
    touchTarget ? styles.touchTarget : undefined,
    className,
  ].filter(Boolean).join(' ');

  return (
    <span
      className={classes}
      data-checked={isChecked ? 'true' : 'false'}
      data-indeterminate={indeterminate ? 'true' : undefined}
      data-disabled={disabled ? 'true' : undefined}
    >
      <label className={styles.row} htmlFor={inputId}>
        <input
          ref={inputRef}
          id={inputId}
          type="checkbox"
          className={styles.input}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          aria-checked={indeterminate ? 'mixed' : undefined}
          aria-describedby={describedBy}
          {...rest}
        />
        <span className={styles.box} aria-hidden="true">
          {/* เครื่องหมายมาจากเซ็ต Nation UI Icons เท่านั้น (เอกสารหน้า 15 ข้อ 11)
              ติ๊กแล้วใช้ check ส่วนกึ่งเลือกใช้ remove */}
          <span className={styles.mark}>
            <Icon name={indeterminate ? 'remove' : 'check'} />
          </span>
        </span>
        {label ? <span className={styles.title}>{label}</span> : null}
      </label>
      {supportingText ? (
        <span className={styles.supporting} id={describedBy}>{supportingText}</span>
      ) : null}
    </span>
  );
}

export default Checkbox;
