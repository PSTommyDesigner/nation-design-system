/**
 * Avatar Nation Design System
 *
 * อวาตาร์แสดงตัวตนผู้ใช้ ตรงกับ component set ใน Figma หน้า 11 Avatar (7 ชุด 118 แบบ)
 * ไฟล์นี้รวม 3 ชิ้นที่ใช้ร่วมกัน
 *   Avatar       ตรงกับ avatar-image, avatar-icon, avatar-monogram, avatar-number
 *   AvatarGroup  ตรงกับ avatar-group (ซ้อนกันด้วยระยะติดลบ แสดงหน้าคนได้สูงสุด 5 คน)
 *   AvatarLabel  ตรงกับ avatar-label (รูปคู่ชื่อและอีเมล)
 *
 * สูตรขนาดอยู่ที่ tokens/scale/avatar.mjs ห้ามแก้ขนาดที่นี่ และห้ามไปอ้าง button.mjs
 *
 * ⚠️ วงแหวนวาดล้นออกนอกกล่องด้วย box-shadow ไม่ใช่ border ที่กินที่ข้างใน
 *    ถ้าใช้ border รูปจะเล็กกว่าขนาดที่ประกาศ (ข้อห้ามในเอกสาร docs/11-avatar.md หัวข้อ 5)
 *
 * ⚠️ อวาตาร์ไม่มีสถานะโฟกัส เพราะเป็นของที่กดไม่ได้โดยค่าเริ่มต้น
 *    ถ้าทำให้กดได้ ให้วงแหวนโฟกัสอยู่ที่ตัวที่กดได้ที่ครอบข้างนอก ไม่ใช่ที่ตัวอวาตาร์
 *
 * ⚠️ ห้ามใส่ padding ให้อวาตาร์ ระยะเว้นขอบรอบไอคอนเป็นผลลัพธ์จากการจัดกลาง
 *
 * ค่าทั้งหมดมาจาก design tokens ผ่าน CSS variables ไม่มีค่า hard-code
 */
import React from 'react';
import { Icon } from '../Icon';
import styles from './Avatar.module.css';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** สถานะที่ระบบรู้จริงเท่านั้น ถ้าไม่รู้สถานะให้ไม่ส่งค่ามาเลย ห้ามส่ง offline */
export type AvatarStatus = 'online' | 'offline';

/** กลุ่มอวาตาร์มีแค่ 3 ขนาด ตามที่สูตรขนาดกำหนด */
export type AvatarGroupSize = 'xs' | 'sm' | 'md';

/** avatar-label เริ่มที่ sm ไม่มี xs เพราะข้อความ 2 บรรทัดใส่ในอวาตาร์ 24 ไม่ได้ */
export type AvatarLabelSize = 'sm' | 'md' | 'lg' | 'xl';

/** จำนวนหน้าคนสูงสุดก่อนตัดเป็นตัวเลข ตรงกับ GROUP_MAX ใน tokens/scale/avatar.mjs */
export const AVATAR_GROUP_MAX = 5;

const SIZE_CLASS: Record<AvatarSize, string> = {
  xs: styles.xs, sm: styles.sm, md: styles.md, lg: styles.lg, xl: styles.xl,
};

const GROUP_SIZE_CLASS: Record<AvatarGroupSize, string> = {
  xs: styles.groupXs, sm: styles.groupSm, md: styles.groupMd,
};

const LABEL_SIZE_CLASS: Record<AvatarLabelSize, string> = {
  sm: styles.labelSm, md: styles.labelMd, lg: styles.labelLg, xl: styles.labelXl,
};

const STATUS_TEXT: Record<AvatarStatus, string> = {
  online: 'ออนไลน์',
  offline: 'ออฟไลน์',
};

/**
 * ตัวย่อจากชื่อ เอาอักษรแรกของคำไม่เกิน 2 คำ
 *
 * ⚠️ กติกาตัวย่อสำหรับชื่อไทยยังไม่ได้ตัดสิน (ดู docs/11-avatar.md หัวข้อ 5)
 *    ปัญหาคือสระหน้าและวรรณยุกต์ที่หลุดจากตัวอักษร ถ้าเป็นชื่อไทยให้ส่ง `initials` มาเอง
 */
function initialsFromName(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean).slice(0, 2);
  return words.map((w) => Array.from(w)[0] ?? '').join('').toUpperCase();
}

export interface AvatarProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** ที่อยู่รูป ถ้ามีค่าจะได้ชนิด avatar-image */
  src?: string;
  /** ข้อความแทนรูป ใส่เมื่อมี `src` ถ้าไม่ใส่จะใช้ `name` แทน */
  alt?: string;
  /** ชื่อคน ใช้ทำตัวย่อเมื่อไม่มีรูป และใช้เป็นชื่อที่โปรแกรมอ่านหน้าจออ่าน */
  name?: string;
  /** ตัวย่อที่กำหนดเอง ใช้แทนการถอดจาก `name` จำเป็นสำหรับชื่อไทย */
  initials?: string;
  /** จำนวนคนที่เหลือ ทำให้ได้ชนิด avatar-number แสดงเป็น `99+` เหมือนไฟล์ออกแบบ */
  count?: number;
  /** ข้อความที่โปรแกรมอ่านหน้าจออ่านแทนตัวเลข เช่น อีก 99 คน */
  countLabel?: string;
  size?: AvatarSize;
  /** เปิดจุดบอกสถานะเมื่อระบบรู้สถานะจริงเท่านั้น */
  status?: AvatarStatus;
  /** ข้อความสถานะที่กำหนดเอง ค่าเริ่มต้นคือ ออนไลน์ กับ ออฟไลน์ */
  statusLabel?: string;
  /**
   * เปิดสถานะ hover ตามไฟล์ออกแบบ ใช้เมื่ออวาตาร์อยู่ในของที่กดได้
   * ตัวอวาตาร์เองยังไม่รับโฟกัส วงแหวนโฟกัสต้องอยู่ที่ตัวที่กดได้ที่ครอบข้างนอก
   */
  interactive?: boolean;
}

/**
 * ลำดับการเลือกชนิดตามเอกสาร มีรูปใช้รูป ไม่มีรูปแต่รู้ชื่อใช้ตัวย่อ ไม่มีทั้งคู่ใช้ไอคอน
 *
 * @example
 * <Avatar src="/garry.jpg" alt="Garry Gergich" size="md" />
 * <Avatar name="Garry Gergich" size="lg" status="online" />
 * <Avatar size="sm" />
 */
export function Avatar({
  src,
  alt,
  name,
  initials,
  count,
  countLabel,
  size = 'md',
  status,
  statusLabel,
  interactive = false,
  className,
  ...rest
}: AvatarProps) {
  const label = alt ?? name;
  const monogram = initials ?? (name ? initialsFromName(name) : '');
  const hasCount = typeof count === 'number';

  let variant: 'image' | 'number' | 'monogram' | 'icon';
  if (src) variant = 'image';
  else if (hasCount) variant = 'number';
  else if (monogram) variant = 'monogram';
  else variant = 'icon';

  // ข้อความที่โปรแกรมอ่านหน้าจออ่าน เมื่อภาพที่เห็นเป็นตัวย่อหรือไอคอนซึ่งอ่านเองไม่ได้
  const srText = variant === 'number' ? countLabel : label;
  const statusText = status ? (statusLabel ?? STATUS_TEXT[status]) : undefined;

  // ไม่มีชื่อและไม่มีสถานะ แปลว่าเป็นของตกแต่งล้วน ซ่อนจากโปรแกรมอ่านหน้าจอไปเลย
  const decorative = variant !== 'number' && !label && !statusText;

  // ชนิดของอวาตาร์คุมด้วย data-variant ไม่ใช่คลาส เพราะชื่อคลาส .icon ถูกใช้กับตัวไอคอนข้างในแล้ว
  const classes = [
    styles.root,
    SIZE_CLASS[size],
    className,
  ].filter(Boolean).join(' ');

  return (
    <span
      className={classes}
      data-variant={variant}
      data-status={status}
      data-interactive={interactive ? 'true' : undefined}
      aria-hidden={decorative ? true : undefined}
      {...rest}
    >
      {variant === 'image' ? (
        <img className={styles.image} src={src} alt={label ?? ''} />
      ) : null}

      {variant === 'number' ? (
        <span className={styles.text} aria-hidden={countLabel ? true : undefined}>{count}+</span>
      ) : null}

      {variant === 'monogram' ? (
        <span className={styles.text} aria-hidden="true">{monogram}</span>
      ) : null}

      {variant === 'icon' ? (
        <Icon name="person" className={styles.icon} />
      ) : null}

      {status ? <span className={styles.indicator} aria-hidden="true" /> : null}

      {variant !== 'image' && srText ? <span className={styles.srOnly}>{srText}</span> : null}
      {statusText ? <span className={styles.srOnly}>{statusText}</span> : null}
    </span>
  );
}

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: AvatarGroupSize;
  /**
   * จำนวนหน้าคนสูงสุดก่อนตัดเป็นตัวเลข ค่าเริ่มต้น 5 ตามไฟล์ออกแบบ
   * ช่องตัวเลขที่เหลือกับปุ่มเพิ่มคนไม่นับรวมในเพดานนี้
   */
  max?: number;
  /**
   * ปุ่มเพิ่มคน ส่ง `circular-icon-button` ตระกูล Neutral ระดับ Tertiary จากหน้า 12 Buttons เข้ามา
   * ห้ามสร้างปุ่มเฉพาะกิจของอวาตาร์ขึ้นมาใหม่
   */
  action?: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * กลุ่มอวาตาร์ซ้อนกัน เกินเพดานแล้วเปิดช่องตัวเลขที่เหลือ ไม่ใช่เพิ่มคนเข้าไป
 *
 * @example
 * <AvatarGroup size="md" aria-label="ผู้ร่วมงาน 8 คน">
 *   <Avatar name="Garry Gergich" />
 *   <Avatar src="/leslie.jpg" alt="Leslie Knope" />
 * </AvatarGroup>
 */
export function AvatarGroup({
  size = 'md',
  max = AVATAR_GROUP_MAX,
  action,
  children,
  className,
  ...rest
}: AvatarGroupProps) {
  const people = React.Children.toArray(children);
  const shown = people.slice(0, max);
  const overflow = people.length - shown.length;

  const classes = [styles.group, GROUP_SIZE_CLASS[size], className].filter(Boolean).join(' ');

  return (
    <div className={classes} role="group" {...rest}>
      {shown}
      {overflow > 0 ? <Avatar size={size} count={overflow} countLabel={`อีก ${overflow} คน`} /> : null}
      {action}
    </div>
  );
}

// ตัด title ของ HTML ออก เพราะชื่อซ้ำกับคุณสมบัติ title ที่เป็นชื่อคนในไฟล์ออกแบบ
export interface AvatarLabelProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'title'> {
  size?: AvatarLabelSize;
  /** อวาตาร์ที่จะวางหน้าข้อความ ส่ง `<Avatar />` เข้ามา */
  avatar: React.ReactNode;
  /** ชื่อคน */
  title: React.ReactNode;
  /** บรรทัดรอง เช่นอีเมล */
  supportingText?: React.ReactNode;
}

/**
 * รูปคู่ชื่อ
 *
 * ⚠️ ห้ามคำนวณความสูงเอง ความสูงมาจากความสูงบรรทัดของชุดตัวอักษร
 *    จึงไม่มี token ความสูงให้ และไฟล์นี้ไม่ตั้งความสูงให้เช่นกัน
 *
 * @example
 * <AvatarLabel size="md" avatar={<Avatar name="Garry Gergich" size="md" />}
 *   title="Garry Gergich" supportingText="garry@nationgroup.com" />
 */
export function AvatarLabel({
  size = 'md',
  avatar,
  title,
  supportingText,
  className,
  ...rest
}: AvatarLabelProps) {
  const classes = [styles.label, LABEL_SIZE_CLASS[size], className].filter(Boolean).join(' ');

  return (
    <div className={classes} {...rest}>
      {avatar}
      <div className={styles.labelText}>
        <span className={styles.labelTitle}>{title}</span>
        {supportingText ? <span className={styles.labelSupporting}>{supportingText}</span> : null}
      </div>
    </div>
  );
}

export default Avatar;
