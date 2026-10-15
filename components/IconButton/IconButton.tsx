/**
 * IconButton Nation Design System
 *
 * ปุ่มไอคอนล้วน ครอบคลุมทรง semi-rounded และ circular ตาม component set ใน Figma
 * (หน้า 12 Buttons · semi-rounded-icon-button / circular-icon-button)
 *
 * ต้องระบุ `label` เสมอเพื่อการเข้าถึง เพราะปุ่มไม่มีข้อความให้อ่าน
 */
import React from 'react';
import { Icon, type IconName } from '../Icon';
import styles from './IconButton.module.css';
import type { ButtonFamily, ButtonHierarchy, ButtonSize } from '../Button';

/** ทรงปุ่ม: semi-rounded = มุมโค้งตามขนาด · circular = วงกลม */
export type IconButtonShape = 'semi-rounded' | 'circular';

export interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** ไอคอนจากชุด Nation UI Icons */
  icon: IconName;
  /** คำอธิบายปุ่มสำหรับ screen reader (บังคับ) */
  label: string;
  family?: ButtonFamily;
  hierarchy?: ButtonHierarchy;
  size?: ButtonSize;
  shape?: IconButtonShape;
  /**
   * โหมดสีเทา (ตรงกับ variant `Default Gray` ใน Figma)
   * ใช้ได้เฉพาะตระกูล `brand` และ `error`
   */
  defaultGray?: boolean;
}

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
 * <IconButton icon="more-vert" label="ตัวเลือกเพิ่มเติม" family="neutral" hierarchy="tertiary" />
 * <IconButton icon="close" label="ปิด" shape="circular" family="alpha" />
 */
export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  {
    icon,
    label,
    family = 'brand',
    hierarchy = 'primary',
    size = 'md',
    shape = 'semi-rounded',
    defaultGray = false,
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
    shape === 'circular' ? styles.circular : undefined,
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
      aria-label={label}
      title={label}
      {...rest}
    >
      <Icon name={icon} size="100%" className={styles.icon} />
    </button>
  );
});

export default IconButton;
