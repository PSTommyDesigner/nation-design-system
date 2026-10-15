/**
 * Toggle Nation Design System
 *
 * สวิตช์เปิดปิด ตรงกับ component set ใน Figma หน้า 14 Toggles (40 แบบ)
 * โครงสองชั้นแบบ Adobe Spectrum คือภาพสวิตช์มีสเกลของตัวเอง
 * ส่วนแถวที่กดได้อ้างสเกลความสูงกลางของระบบ
 *
 * ⚠️ ห้ามให้ปุ่มกลมขยายหรือยืดตอนกดเด็ดขาด (ตัดสิน 2026-09-04 ผู้ใช้สั่ง)
 *    สถานะกดบอกด้วยสีอย่างเดียว ห้ามเพิ่ม token ความกว้างปุ่มกลมตอนกดกลับเข้ามา
 *
 * ค่าทั้งหมดมาจาก design tokens ผ่าน CSS variables ไม่มีค่า hard-code
 */
import React, { useId } from 'react';
import styles from './Toggle.module.css';

export type ToggleSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** ข้อความข้างสวิตช์ ตรงกับคุณสมบัติ `title` ในไฟล์ออกแบบ */
  label?: React.ReactNode;
  /** ข้อความอธิบายใต้แถว ตรงกับคุณสมบัติ `supporting-text` */
  supportingText?: React.ReactNode;
  size?: ToggleSize;
  /**
   * บังคับความสูงแถวให้ถึงพื้นที่แตะขั้นต่ำ ใช้กับจอสัมผัส
   * อ้าง `--ntg-toggle-row-height-touch` ไม่ใช่ขนาดภาพสวิตช์
   */
  touchTarget?: boolean;
}

const SIZE_CLASS: Record<ToggleSize, string> = {
  xs: styles.xs, sm: styles.sm, md: styles.md, lg: styles.lg, xl: styles.xl,
};

/**
 * @example
 * <Toggle label="รับการแจ้งเตือน" checked={on} onChange={e => setOn(e.target.checked)} />
 * <Toggle size="lg" label="โหมดมืด" supportingText="ใช้กับทุกหน้าในเครื่องนี้" />
 */
export function Toggle({
  label,
  supportingText,
  size = 'md',
  touchTarget = false,
  checked,
  defaultChecked,
  disabled = false,
  className,
  id,
  ...rest
}: ToggleProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const describedBy = supportingText ? `${inputId}-supporting` : undefined;
  // อ่านสถานะได้ทั้งแบบคุมเองและแบบปล่อยให้ DOM คุม
  const isChecked = checked ?? defaultChecked ?? false;

  const classes = [
    styles.root,
    SIZE_CLASS[size],
    touchTarget ? styles.touchTarget : undefined,
    className,
  ].filter(Boolean).join(' ');

  return (
    <span className={classes} data-checked={isChecked ? 'true' : 'false'} data-disabled={disabled ? 'true' : undefined}>
      <label className={styles.row} htmlFor={inputId}>
        <input
          id={inputId}
          type="checkbox"
          role="switch"
          className={styles.input}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          aria-describedby={describedBy}
          {...rest}
        />
        <span className={styles.track} aria-hidden="true">
          <span className={styles.knob} />
        </span>
        {label ? <span className={styles.title}>{label}</span> : null}
      </label>
      {supportingText ? (
        <span className={styles.supporting} id={describedBy}>{supportingText}</span>
      ) : null}
    </span>
  );
}

export default Toggle;
