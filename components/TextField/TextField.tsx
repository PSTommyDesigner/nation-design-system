/**
 * TextField Nation Design System
 *
 * ช่องกรอกข้อความ ตรงกับ component set ใน Figma หน้า 13 Input
 * ครอบคลุมชุด `text-field` และ `text-area` (ส่งพร็อพ multiline)
 *
 * ⚠️ มีแค่ 3 ขนาด คือ sm md lg ต่างจาก component อื่นที่มี 5 ขนาด
 *    เพราะไฟล์ออกแบบใช้จริงแค่ 3 ขนาด
 *
 * ⚠️ ความสูงของช่องผูกกับสเกลความสูงกลาง เพราะช่องกรอกกับปุ่มวางในแถวเดียวกันจริง
 *    ถ้าเปลี่ยนความสูงต้องไปตรวจสเกลกลางที่ tokens/scale/global-scale.config.mjs ด้วย
 *
 * ค่าทั้งหมดมาจาก design tokens ผ่าน CSS variables ไม่มีค่า hard-code
 */
import React, { useId } from 'react';
import { Icon, type IconName } from '../Icon';
import styles from './TextField.module.css';

export type TextFieldSize = 'sm' | 'md' | 'lg';

export interface TextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: React.ReactNode;
  /** ข้อความช่วยใต้ช่อง ถ้าอยู่ในสถานะผิดพลาดจะเปลี่ยนเป็นสีแดง */
  hint?: React.ReactNode;
  size?: TextFieldSize;
  /** สถานะผิดพลาด ตรงกับ state กลุ่ม error ในไฟล์ออกแบบ */
  error?: boolean;
  /** บังคับกรอก แสดงดอกจันท้ายป้ายชื่อ */
  required?: boolean;
  leadingIcon?: IconName;
  trailingIcon?: IconName;
  /** เส้นคั่นระหว่างไอคอนกับข้อความ ตรงกับคุณสมบัติ leading-divider และ trailing-divider */
  leadingDivider?: boolean;
  trailingDivider?: boolean;
  /** ช่องหลายบรรทัด ตรงกับชุด text-area */
  multiline?: boolean;
  rows?: number;
}

const SIZE_CLASS: Record<TextFieldSize, string> = {
  sm: styles.sm, md: styles.md, lg: styles.lg,
};

/**
 * @example
 * <TextField label="หัวข้อข่าว" placeholder="พิมพ์หัวข้อ" required />
 * <TextField label="อีเมล" leadingIcon="mail" error hint="อีเมลไม่ถูกต้อง" />
 * <TextField label="เนื้อหา" multiline rows={5} size="lg" />
 */
export function TextField({
  label,
  hint,
  size = 'md',
  error = false,
  required = false,
  leadingIcon,
  trailingIcon,
  leadingDivider = false,
  trailingDivider = false,
  multiline = false,
  rows = 4,
  disabled = false,
  readOnly = false,
  className,
  id,
  ...rest
}: TextFieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const hintId = hint ? `${inputId}-hint` : undefined;

  const classes = [
    styles.root,
    SIZE_CLASS[size],
    multiline ? styles.multiline : undefined,
    className,
  ].filter(Boolean).join(' ');

  const field = multiline ? (
    <textarea
      id={inputId}
      className={styles.input}
      rows={rows}
      disabled={disabled}
      readOnly={readOnly}
      aria-invalid={error || undefined}
      aria-describedby={hintId}
      {...(rest as unknown as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
    />
  ) : (
    <input
      id={inputId}
      className={styles.input}
      disabled={disabled}
      readOnly={readOnly}
      aria-invalid={error || undefined}
      aria-describedby={hintId}
      {...rest}
    />
  );

  return (
    <div className={classes}>
      {label ? (
        <label className={styles.labelRow} htmlFor={inputId}>
          {label}
          {required ? <span className={styles.required} aria-hidden="true">*</span> : null}
        </label>
      ) : null}

      <div
        className={styles.box}
        data-error={error ? 'true' : undefined}
        data-disabled={disabled ? 'true' : undefined}
        data-readonly={readOnly ? 'true' : undefined}
      >
        {leadingIcon ? <span className={styles.icon} aria-hidden="true"><Icon name={leadingIcon} /></span> : null}
        {leadingDivider ? <span className={styles.divider} aria-hidden="true" /> : null}
        {field}
        {trailingDivider ? <span className={styles.divider} aria-hidden="true" /> : null}
        {trailingIcon ? <span className={styles.icon} aria-hidden="true"><Icon name={trailingIcon} /></span> : null}
      </div>

      {hint ? (
        <span className={styles.hint} id={hintId} data-error={error ? 'true' : undefined}>{hint}</span>
      ) : null}
    </div>
  );
}

export default TextField;
