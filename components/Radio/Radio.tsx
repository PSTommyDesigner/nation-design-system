/**
 * Radio Nation Design System
 *
 * ปุ่มตัวเลือก ตรงกับ component set ใน Figma หน้า 16 Radio (ชุด radio และ text-radio ชุดละ 40 แบบ)
 * โครงสองชั้นแบบเดียวกับช่องติ๊กและสวิตช์ คือภาพวงกลมมีสเกลของตัวเอง
 * ส่วนแถวที่กดได้อ้างสเกลความสูงกลางของระบบ ขนาดทุกขั้นจึงตรงกับช่องติ๊กพอดี สลับกันในฟอร์มเดียวกันได้
 *
 * ⚠️ เลือกได้ทีละหนึ่งเท่านั้น ถ้าเลือกได้หลายอย่างให้ใช้ Checkbox จากหน้า 15 Checkbox แทน
 *    ถ้าการเปลี่ยนค่ามีผลทันทีให้ใช้ Toggle จากหน้า 14 Toggles แทน
 *
 * ⚠️ ไม่มีสถานะกึ่งเลือก ต่างจากช่องติ๊ก เพราะตัวเลือกหนึ่งตัวเป็นได้แค่เลือกหรือไม่เลือก
 *
 * ⚠️ ต้องจัดกลุ่มด้วย RadioGroup เสมอ (เอกสารหน้า 16 คู่มือนักพัฒนาข้อ 3 และ 4)
 *    กลุ่มประกาศด้วย role="radiogroup" พร้อมชื่อกำกับกลุ่ม ไม่ใช่ประกาศทีละตัว
 *    การเลื่อนด้วยปุ่มลูกศรเป็นพฤติกรรมของเบราว์เซอร์เองเมื่อใช้ input จริงที่ name ตรงกัน
 *
 * ค่าทั้งหมดมาจาก design tokens ผ่าน CSS variables ไม่มีค่า hard-code
 */
import React, { createContext, useContext, useId, useState } from 'react';
import styles from './Radio.module.css';

export type RadioSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface RadioGroupContextValue {
  name: string;
  value?: string;
  select: (next: string) => void;
  size: RadioSize;
  disabled: boolean;
  touchTarget: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** ข้อความข้างวงกลม ตรงกับคุณสมบัติ `Title Value` ในไฟล์ออกแบบ */
  label?: React.ReactNode;
  /** ข้อความอธิบายใต้แถว ตรงกับคุณสมบัติ `Supporting text` */
  supportingText?: React.ReactNode;
  size?: RadioSize;
  /**
   * บังคับความสูงแถวให้ถึงพื้นที่แตะขั้นต่ำ ใช้กับจอสัมผัส
   * อ้าง `--ntg-radio-row-height-touch` ไม่ใช่ขนาดภาพวงกลม
   */
  touchTarget?: boolean;
}

const SIZE_CLASS: Record<RadioSize, string> = {
  xs: styles.xs, sm: styles.sm, md: styles.md, lg: styles.lg, xl: styles.xl,
};

/**
 * ชื่อกำกับกลุ่มมีชุด class แยกของตัวเอง ห้ามเอา SIZE_CLASS ไปใส่ที่กล่องกลุ่ม
 * เพราะลูกแต่ละตัวมี class ขนาดของตัวเองอยู่แล้ว ถ้าซ้อนกันสองชั้นจะได้ตัวอักษรของกลุ่มทับของลูก
 */
const GROUP_SIZE_CLASS: Record<RadioSize, string> = {
  xs: styles.groupXs, sm: styles.groupSm, md: styles.groupMd, lg: styles.groupLg, xl: styles.groupXl,
};

/**
 * @example
 * <RadioGroup label="ช่องทางติดต่อ" value={ch} onValueChange={setCh}>
 *   <Radio value="email" label="อีเมล" />
 *   <Radio value="sms" label="ข้อความสั้น" supportingText="คิดค่าบริการตามผู้ให้บริการ" />
 * </RadioGroup>
 */
export function Radio({
  label,
  supportingText,
  size,
  touchTarget,
  checked,
  defaultChecked,
  disabled,
  className,
  id,
  name,
  value,
  onChange,
  ...rest
}: RadioProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const describedBy = supportingText ? `${inputId}-supporting` : undefined;
  const group = useContext(RadioGroupContext);

  // ค่าที่ตั้งบนตัวเองชนะค่าที่ได้จากกลุ่มเสมอ กลุ่มเป็นค่าตั้งต้นให้ลูกทุกตัว
  const effectiveSize = size ?? group?.size ?? 'md';
  const effectiveTouch = touchTarget ?? group?.touchTarget ?? false;
  const effectiveDisabled = disabled ?? group?.disabled ?? false;
  const effectiveName = name ?? group?.name;

  // อยู่ในกลุ่มแบบคุมค่า ให้กลุ่มเป็นคนบอกว่าตัวไหนถูกเลือก
  const groupChecked = group && group.value !== undefined && value !== undefined
    ? group.value === String(value)
    : undefined;
  const effectiveChecked = checked ?? groupChecked;
  const isChecked = effectiveChecked ?? defaultChecked ?? false;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
    if (group && !event.defaultPrevented) group.select(event.target.value);
  };

  const classes = [
    styles.root,
    SIZE_CLASS[effectiveSize],
    effectiveTouch ? styles.touchTarget : undefined,
    className,
  ].filter(Boolean).join(' ');

  return (
    <span
      className={classes}
      data-checked={isChecked ? 'true' : 'false'}
      data-disabled={effectiveDisabled ? 'true' : undefined}
    >
      <label className={styles.row} htmlFor={inputId}>
        <input
          id={inputId}
          type="radio"
          className={styles.input}
          name={effectiveName}
          value={value}
          checked={effectiveChecked}
          defaultChecked={defaultChecked}
          disabled={effectiveDisabled}
          aria-describedby={describedBy}
          onChange={handleChange}
          {...rest}
        />
        <span className={styles.circle} aria-hidden="true">
          <span className={styles.dot} />
        </span>
        {label ? <span className={styles.title}>{label}</span> : null}
      </label>
      {supportingText ? (
        <span className={styles.supporting} id={describedBy}>{supportingText}</span>
      ) : null}
    </span>
  );
}

export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** ชื่อกำกับกลุ่ม ประกาศครั้งเดียวต่อกลุ่ม ไม่ใช่ประกาศทีละตัวเลือก */
  label?: React.ReactNode;
  /** ชื่อกลุ่มที่ส่งลงไปให้ input ทุกตัว ถ้าไม่ส่งจะสร้างให้อัตโนมัติ */
  name?: string;
  /** ค่าที่ถูกเลือกแบบคุมเอง */
  value?: string;
  /** ค่าที่ถูกเลือกตั้งต้นแบบปล่อยให้ component คุม */
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  size?: RadioSize;
  disabled?: boolean;
  touchTarget?: boolean;
  children?: React.ReactNode;
}

/**
 * กล่องจัดกลุ่มปุ่มตัวเลือก ประกาศ role="radiogroup" พร้อมชื่อกำกับกลุ่มให้ครบในที่เดียว
 * วางอย่างน้อยสองตัวเลือกเสมอ และเลือกไว้ล่วงหน้าหนึ่งตัว (เอกสารหน้า 16 คู่มือนักออกแบบข้อ 6)
 */
export function RadioGroup({
  label,
  name,
  value,
  defaultValue,
  onValueChange,
  size = 'md',
  disabled = false,
  touchTarget = false,
  className,
  children,
  ...rest
}: RadioGroupProps) {
  const autoId = useId();
  const groupName = name ?? autoId;
  const labelId = label ? `${autoId}-label` : undefined;
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : uncontrolled;

  const select = (next: string) => {
    if (!isControlled) setUncontrolled(next);
    onValueChange?.(next);
  };

  const classes = [styles.group, GROUP_SIZE_CLASS[size], className].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      role="radiogroup"
      aria-labelledby={labelId}
      aria-disabled={disabled || undefined}
      {...rest}
    >
      {label ? <span className={styles.groupLabel} id={labelId}>{label}</span> : null}
      <RadioGroupContext.Provider
        value={{ name: groupName, value: current, select, size, disabled, touchTarget }}
      >
        {children}
      </RadioGroupContext.Provider>
    </div>
  );
}

export default Radio;
