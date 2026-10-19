/**
 * Badge Nation Design System
 *
 * ป้ายบอกสถานะของสิ่งที่มันเกาะอยู่ ค่าถูกกำหนดโดยระบบ ผู้ใช้กดไม่ได้
 * ตรงกับ component set ใน Figma หน้า 22 Badge (11 ตระกูล 55 ชุด 715 แบบ)
 *
 * ⚠️ ป้ายเป็นของนิ่ง ไม่มี hover focus หรือ disabled โดยตั้งใจ
 *    เกณฑ์ตัดสินคือถามว่าใครเป็นคนเปลี่ยนค่า
 *    ถ้าระบบเป็นคนเปลี่ยนให้ใช้ Badge ถ้าผู้ใช้เป็นคนเปลี่ยนให้ใช้ Tag
 *    เหตุผลเต็มอยู่ที่ docs/research/badge-component.md
 *
 * ค่าทั้งหมดมาจาก design tokens ผ่าน CSS variables ไม่มีค่า hard-code
 */
import React from 'react';
import { Icon, type IconName } from '../Icon';
import styles from './Badge.module.css';

/** ตระกูลสี 11 ตระกูล ตรงกับเฟรมในหน้า Figma 22 Badge */
export type BadgeFamily =
  | 'brand' | 'neutral' | 'red' | 'green' | 'yellow'
  | 'cyan' | 'blue' | 'purple' | 'pink' | 'bamboo' | 'brown';

/**
 * ระดับความเด่น ตรงกับแกน `hierarchy` ใน Figma
 * primary พื้นทึบ · secondary พื้นอ่อน · tertiary มีขอบ
 *
 * ⚠️ `quaternary` เป็นของเก่า ไฟล์ออกแบบแยกแบบข้อความล้วนออกไปเป็นชุด link-badge แล้วเมื่อ 2026-09-22
 *    ของใหม่ให้ใช้ `shape="link"` แทน ซึ่งใช้สีขั้น 400 ตรงกับไฟล์ออกแบบ
 *    ส่วน `quaternary` ยังใช้สีขั้น 600 ตามของเดิม เก็บไว้ไม่ให้ของที่เขียนไปแล้วพัง
 *
 * ⚠️ ชื่อระดับของป้ายกับของแท็กหมายถึงคนละหน้าตา
 *    แท็กมี 3 ระดับ `secondary` ของแท็กคือมีขอบ เพราะแท็กไม่มีสไตล์พื้นอ่อน
 */
export type BadgeHierarchy = 'primary' | 'secondary' | 'tertiary' | 'quaternary';
export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * ทรงของป้าย
 * `semi-rounded` มุมมน ใช้ได้ทั้งแบบมีข้อความและไอคอนล้วน
 * `pill` แคปซูล ใช้กับแบบมีข้อความ
 * `circular` วงกลม ใช้กับแบบไอคอนล้วนเท่านั้น
 * `link` ข้อความล้วน ไม่มีพื้นไม่มีขอบ ระยะขอบเป็นศูนย์ทุกด้าน
 *
 * ⚠️ ทรง `link` ไม่สนแกน `hierarchy` เพราะชุด link-badge ในไฟล์ออกแบบไม่มีแกนนี้
 *    สีตัวอักษรใช้ขั้น 400 ของตระกูล ซึ่งเป็นคนละขั้นกับอีกสามทรงที่ใช้ 600
 */
export type BadgeShape = 'semi-rounded' | 'pill' | 'circular' | 'link';

export interface BadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** ข้อความในป้าย ถ้าไม่ส่งและส่ง `icon` มาแทน จะเป็นป้ายไอคอนล้วน */
  children?: React.ReactNode;
  family?: BadgeFamily;
  hierarchy?: BadgeHierarchy;
  size?: BadgeSize;
  shape?: BadgeShape;
  /** ไอคอนท้ายข้อความ ใช้กับแบบมีข้อความ */
  trailingIcon?: IconName;
  /** ไอคอนของป้ายไอคอนล้วน ใช้ตอนไม่ส่ง children */
  icon?: IconName;
  /**
   * คำอธิบายสำหรับโปรแกรมอ่านหน้าจอ
   * **บังคับเมื่อเป็นป้ายไอคอนล้วน** เพราะไม่มีข้อความให้อ่าน
   */
  label?: string;
}

const SIZE_CLASS: Record<BadgeSize, string> = {
  xs: styles.xs, sm: styles.sm, md: styles.md, lg: styles.lg, xl: styles.xl,
};
const SHAPE_CLASS: Record<BadgeShape, string> = {
  'semi-rounded': styles.semiRounded, pill: styles.pill, circular: styles.circular, link: styles.link,
};

/**
 * @example
 * <Badge family="red" hierarchy="primary" size="sm">ด่วน</Badge>
 * <Badge family="green" hierarchy="secondary" shape="pill">เผยแพร่แล้ว</Badge>
 * <Badge family="brand" icon="check" shape="circular" label="ยืนยันแล้ว" />
 * <Badge family="blue" shape="link" trailingIcon="chevron-right">อ่านต่อ</Badge>
 */
export function Badge({
  children,
  family = 'neutral',
  hierarchy = 'secondary',
  size = 'md',
  shape = 'semi-rounded',
  trailingIcon,
  icon,
  label,
  className,
  ...rest
}: BadgeProps) {
  const iconOnly = children === undefined && icon !== undefined;

  if (process.env.NODE_ENV !== 'production') {
    if (iconOnly && !label) {
      console.warn('Badge: ป้ายไอคอนล้วนต้องส่ง label เพื่อให้โปรแกรมอ่านหน้าจออ่านได้');
    }
    if (shape === 'circular' && !iconOnly) {
      console.warn('Badge: ทรง circular ใช้ได้เฉพาะป้ายไอคอนล้วน');
    }
    if (shape === 'link' && iconOnly) {
      console.warn('Badge: ทรง link ใช้กับแบบมีข้อความเท่านั้น ไฟล์ออกแบบไม่มีชุดไอคอนล้วนของทรงนี้');
    }
  }

  const classes = [
    styles.root,
    SIZE_CLASS[size],
    SHAPE_CLASS[shape],
    styles[family],
    styles[hierarchy],
    iconOnly ? styles.iconOnly : undefined,
    className,
  ].filter(Boolean).join(' ');

  return (
    <span className={classes} aria-label={iconOnly ? label : undefined} {...rest}>
      {iconOnly ? (
        <span className={styles.icon} aria-hidden="true"><Icon name={icon!} /></span>
      ) : (
        <>
          <span className={styles.title}>{children}</span>
          {trailingIcon ? (
            <span className={styles.icon} aria-hidden="true"><Icon name={trailingIcon} /></span>
          ) : null}
        </>
      )}
    </span>
  );
}

export default Badge;
