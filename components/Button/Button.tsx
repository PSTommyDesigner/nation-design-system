/**
 * Button Nation Design System
 *
 * ปุ่มข้อความ ครอบคลุมทรง semi-rounded และ pill ตาม component set ใน Figma
 * (หน้า 12 Buttons · ตระกูล Brand / Neutral / Error / Alpha)
 *
 * ค่าทั้งหมดมาจาก design tokens ผ่าน CSS variables ไม่มีค่า hard-code
 * สถานะ hover / focus / disabled จัดการด้วย CSS pseudo-class ไม่ต้องส่ง prop
 */
import React from 'react';
import { Icon, type IconName } from '../Icon';
import styles from './Button.module.css';

/**
 * ตระกูลสีของปุ่ม ตรงกับเอกสาร 4 ชุดในหน้า Figma 11 Buttons
 * (Brand · Neutral · Error · Alpha)
 */
export type ButtonFamily = 'brand' | 'neutral' | 'error' | 'alpha';
/** ลำดับความสำคัญ (alpha ไม่มีชั้นนี้) */
export type ButtonHierarchy = 'primary' | 'secondary' | 'tertiary';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
/** ทรงปุ่ม: semi-rounded = มุมโค้งตามขนาด · pill = แคปซูล */
export type ButtonShape = 'semi-rounded' | 'pill';

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children: React.ReactNode;
  family?: ButtonFamily;
  hierarchy?: ButtonHierarchy;
  size?: ButtonSize;
  shape?: ButtonShape;
  /**
   * โหมดสีเทา (ตรงกับ variant `Default Gray` ใน Figma)
   * ใช้ได้เฉพาะตระกูล `brand` และ `error` · ตระกูลอื่นไม่มีโหมดนี้
   */
  defaultGray?: boolean;
  /** ไอคอนด้านซ้ายของข้อความ */
  leftIcon?: IconName;
  /** ไอคอนด้านขวาของข้อความ */
  rightIcon?: IconName;
  /** ยืดเต็มความกว้างของกล่องแม่ */
  fullWidth?: boolean;
}

/** ตระกูลที่รองรับโหมด Default Gray (ตรงกับ variant ใน Figma) */
const GRAY_CAPABLE: ButtonFamily[] = ['brand', 'error'];

function familyClass(family: ButtonFamily, defaultGray: boolean): string {
  const gray = defaultGray && GRAY_CAPABLE.includes(family);
  if (family === 'brand') return gray ? styles.brandGray : styles.brand;
  if (family === 'error') return gray ? styles.errorGray : styles.error;
  if (family === 'neutral') return styles.neutral;
  return styles.alpha;
}

/**
 * @example
 * <Button family="brand" hierarchy="primary" size="md">บันทึก</Button>
 * <Button family="error" hierarchy="secondary" leftIcon="delete">ลบรายการ</Button>
 * <Button family="brand" shape="pill" rightIcon="chevron-down">ตัวเลือก</Button>
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    family = 'brand',
    hierarchy = 'primary',
    size = 'md',
    shape = 'semi-rounded',
    defaultGray = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    disabled,
    className,
    type = 'button',
    ...rest
  },
  ref,
) {
  const classes = [
    styles.root,
    styles[size],
    familyClass(family, defaultGray),
    family !== 'alpha' ? styles[hierarchy] : undefined,
    shape === 'pill' ? styles.pill : undefined,
    fullWidth ? styles.fullWidth : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      ref={ref}
      type={type}
      className={classes}
      disabled={disabled}
      {...rest}
    >
        <span className={styles.content}>
          {leftIcon && <Icon name={leftIcon} size="100%" className={styles.icon} />}
          <span className={styles.label}>{children}</span>
          {rightIcon && <Icon name={rightIcon} size="100%" className={styles.icon} />}
        </span>
    </button>
  );
});

export default Button;
