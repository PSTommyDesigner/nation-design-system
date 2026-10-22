/**
 * Tag Nation Design System
 *
 * ป้ายจัดหมวดที่ผู้ใช้แตะได้ กรองได้ เลือกได้ ปิดได้
 * ตรงกับ component set ใน Figma หน้า 21 Tags (121 ชุด 4,095 แบบ)
 *
 * ⚠️ เลือกระหว่าง Tag กับ Badge ด้วยคำถามว่าใครเป็นคนเปลี่ยนค่า
 *    ถ้าผู้ใช้เป็นคนเปลี่ยนให้ใช้ Tag ถ้าระบบเป็นคนเปลี่ยนให้ใช้ Badge
 *    เหตุผลเต็มอยู่ที่ docs/research/badge-component.md
 *
 * ค่าทั้งหมดมาจาก design tokens ผ่าน CSS variables ไม่มีค่า hard-code
 *
 * ⚠️ ชื่อคลาสทุกตัวอ้างผ่าน object ที่ประกาศไว้ด้านล่าง ห้ามประกอบชื่อคลาสหรือ
 *    ชื่อตัวแปร CSS ตอนรัน เพราะชื่อที่ประกอบตอนรันไม่มีเครื่องมือไหนตรวจได้
 *    ว่ามีอยู่จริง ถ้าพิมพ์ผิด CSS จะเงียบแล้วตกไปใช้ค่า default ของเบราว์เซอร์
 */
import React from 'react';
import { Icon } from '../Icon';
import styles from './Tag.module.css';

/** ตระกูลสี 11 ตระกูล ตรงกับเฟรมในหน้า Figma 21 Tags */
export type TagFamily =
  | 'brand' | 'neutral' | 'red' | 'green' | 'yellow'
  | 'cyan' | 'blue' | 'purple' | 'pink' | 'bamboo' | 'brown';

/**
 * ระดับความเด่น ตรงกับแกน `hierarchy` ใน Figma
 * primary พื้นทึบ · secondary มีขอบพื้นโปร่ง
 *
 * ⚠️ เดิมมี `tertiary` ที่เป็นข้อความล้วน ถูกแยกออกไปเป็นชุด `link-tag` ของตัวเอง
 *    เมื่อ 2026-09-18 ฝั่งโค้ดจึงใช้ `shape="link"` แทน ไม่ใช่ระดับความเด่น
 *
 * ⚠️ แท็กมี 2 ระดับ ส่วนป้ายมี 4 ระดับเพราะมีสไตล์พื้นอ่อนเพิ่มมา
 *    `secondary` ของแท็กคือมีขอบ ส่วน `secondary` ของป้ายคือพื้นอ่อน
 */
export type TagHierarchy = 'primary' | 'secondary';
export type TagSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
/** ทรง 3 แบบ `link` คือข้อความล้วน ไม่มีพื้นไม่มีขอบ */
/**
 * ทรงของแท็ก
 * ⚠️ `circular` ใช้ได้เฉพาะโหมดไอคอนล้วน เพราะในไฟล์ออกแบบมีแต่ชุด `circular-icon-tag`
 *    ทรงนี้กว้างเท่าสูงจริง ต่างจาก `pill` ที่เป็นแคปซูลกว้างกว่าสูง
 */
export type TagShape = 'semi-rounded' | 'pill' | 'circular' | 'link';

/**
 * ชิ้นนำหน้าที่ทำให้แท็กเป็นคนละชนิด ตรงกับชุดแยกในไฟล์ออกแบบ
 *
 * ⚠️ ชื่อค่าขึ้นต้นด้วยตำแหน่งจริงที่ตรวจจากลำดับชั้นใน Figma ไม่ใช่สมมติ
 *    หัวหน้าปรับโครงรอบสุดท้าย 2026-10-21 ให้ของนำหน้าทุกชนิดอยู่ซ้ายสุดของแท็ก
 *    ข้อความอยู่กลาง ไอคอนปิดอยู่ขวาสุด (ตรวจแล้วทั้ง 6 ชุด x 11 ตระกูล 1,800 แบบ)
 *      left-indicator  จุดสถานะ (ชั้น indicator มาก่อน tag-title)
 *      left-checkbox   ช่องติ๊ก (ชั้น left-checkbox มาก่อน content)
 *      left-image      ช่องรูปชนขอบซ้าย (ชั้น left-image มาก่อน content)
 *      left-number     ช่องตัวเลขชนขอบซ้าย (ชั้น right-number มาก่อน content ชื่อชั้นในไฟล์ออกแบบยังไม่ได้เปลี่ยน)
 *    ก่อนหน้านั้นในวันเดียวกันเคยเป็น right-* เพราะโครงรุ่นก่อนวางสามชนิดนี้ไว้หลังข้อความ
 *
 * ⚠️ ทรง `link` รองรับเฉพาะ `none` เพราะไฟล์ออกแบบมีแค่ชุดฐาน
 */
export type TagLeading = 'none' | 'left-indicator' | 'left-checkbox' | 'left-image' | 'left-number';

export interface TagProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children' | 'onSelect'> {
  children: React.ReactNode;
  family?: TagFamily;
  hierarchy?: TagHierarchy;
  size?: TagSize;
  shape?: TagShape;
  /**
   * โหมดเทา เทาตอนอยู่เฉย แล้วขึ้นสีตอนชี้ ตรงกับแกน `default-gray`
   * ⚠️ ไม่มีผลกับ `family="neutral"` เพราะตระกูลนั้นเป็นสีเทาอยู่แล้ว
   */
  defaultGray?: boolean;
  /** ชนิดของชิ้นประกอบ ตรงกับชุดแยกในไฟล์ออกแบบ ชื่อค่าบอกตำแหน่งจริง (left-/right-) */
  leading?: TagLeading;
  /** ตัวเลขนำหน้า ใช้เมื่อ `leading` เป็น `left-number` */
  count?: number;
  /** ที่อยู่รูป ใช้เมื่อ `leading` เป็น `left-image` */
  imageSrc?: string;
  /** สถานะติ๊ก ใช้เมื่อ `leading` เป็น `left-checkbox` */
  checked?: boolean;
  /**
   * ไอคอนด้านซ้ายของข้อความ ตรงกับคุณสมบัติ `left-icon` กับ `left-icon-swap` ในไฟล์ออกแบบ
   * ส่งไอคอนเข้ามาเท่ากับเปิด ไม่ส่งเท่ากับปิด จึงไม่ต้องมีตัวเปิดปิดแยก
   * ⚠️ มีเฉพาะชุดฐาน (`leading="none"`) ชนิดที่มีของนำหน้าทุกชนิดไม่มีไอคอนซ้าย
   *    เพราะช่องซ้ายเป็นของของนำหน้าแล้ว (หัวหน้าปรับ 2026-10-21 ชุด number image checkbox
   *    เปลี่ยนคุณสมบัติจาก left-icon เป็น right-icon ซึ่งคือไอคอนปิดตัวเดียวกับชุดฐาน)
   * ⚠️ ช่องที่วางไอคอนนี้ถูกกำหนดขนาดด้วย CSS (`--tag-icon`) อยู่แล้วตามขนาดของแท็ก
   *    ต้องส่ง `<Icon name="..." size="100%" />` ไม่ใช่ `<Icon name="..." />` เฉย ๆ
   *    ไม่งั้นไอคอนจะใช้ขนาดเริ่มต้นของตัวเอง (24px) ไม่ตรงกับช่องที่เตรียมไว้
   *    (เคยพลาดตอนเขียนตัวอย่างใน Tag.stories.tsx เมื่อ 2026-10-19)
   */
  leftIcon?: React.ReactNode;
  /**
   * แสดงปุ่มปิด ค่าตั้งต้นปิด ตรงกับคุณสมบัติ `right-icon` ในไฟล์ออกแบบ
   * (เปลี่ยนชื่อจาก `icon` เป็น `right-icon` เมื่อ 2026-10-15 ตอนเพิ่มไอคอนซ้าย)
   */
  closable?: boolean;
  /** ไอคอนของปุ่มปิด ตรงกับ `right-icon-swap` ค่าตั้งต้นเป็นกากบาท ส่งเองต้องใส่ `size="100%"` เหมือน `leftIcon` */
  closeIcon?: React.ReactNode;
  /**
   * โหมดไอคอนล้วน ตรงกับชุด `icon-tag` `circular-icon-tag` `link-icon-tag` ในไฟล์ออกแบบ
   * ⚠️ โหมดนี้ไม่มีข้อความ ต้องส่ง `label` เสมอเพื่อให้โปรแกรมอ่านหน้าจออ่านออก
   */
  iconOnly?: boolean;
  /** ไอคอนของโหมดไอคอนล้วน ตรงกับ `swap-icon` ส่งเองต้องใส่ `size="100%"` เหมือน `leftIcon` */
  icon?: React.ReactNode;
  /** คำอ่านของโหมดไอคอนล้วน จำเป็นเมื่อ `iconOnly` เป็นจริง */
  label?: string;
  /** เรียกเมื่อกดปุ่มปิด */
  onClose?: () => void;
  /** เรียกเมื่อกดตัวแท็ก ถ้าส่งมาแท็กจะรับโฟกัสและกดด้วยแป้นพิมพ์ได้ */
  onSelect?: () => void;
  disabled?: boolean;
  /** คำอธิบายปุ่มปิดสำหรับโปรแกรมอ่านหน้าจอ */
  closeLabel?: string;
}

const SIZE_CLASS: Record<TagSize, string> = {
  xs: styles.xs, sm: styles.sm, md: styles.md, lg: styles.lg, xl: styles.xl,
};
const SHAPE_CLASS: Record<TagShape, string> = {
  'semi-rounded': styles.semiRounded, pill: styles.pill, circular: styles.circular, link: styles.link,
};
const LEADING_CLASS: Record<TagLeading, string> = {
  none: styles.leadNone,
  'left-number': styles.leadNumber,
  'left-image': styles.leadImage,
  'left-checkbox': styles.leadCheckbox,
  'left-indicator': styles.leadIndicator,
};
const FAMILY_CLASS: Record<TagFamily, string> = {
  brand: styles.brand, neutral: styles.neutral, red: styles.red, green: styles.green,
  yellow: styles.yellow, cyan: styles.cyan, blue: styles.blue, purple: styles.purple,
  pink: styles.pink, bamboo: styles.bamboo, brown: styles.brown,
};
const HIERARCHY_CLASS: Record<TagHierarchy, string> = {
  primary: styles.primary, secondary: styles.secondary,
};

/**
 * @example
 * <Tag family="blue">การเมือง</Tag>
 * <Tag family="brand" hierarchy="primary" closable onClose={remove}>กรุงเทพ</Tag>
 * <Tag family="green" leading="left-number" count={12}>ข่าวใหม่</Tag>
 * <Tag family="neutral" leading="left-checkbox" checked onSelect={toggle}>เลือกไว้</Tag>
 * <Tag family="red" shape="link">อ่านต่อ</Tag>
 */
export function Tag({
  children,
  family = 'neutral',
  hierarchy = 'secondary',
  size = 'md',
  shape = 'semi-rounded',
  defaultGray = false,
  leading = 'none',
  count,
  imageSrc,
  checked,
  leftIcon,
  closable = false,
  closeIcon,
  iconOnly = false,
  icon,
  label,
  onClose,
  onSelect,
  disabled = false,
  closeLabel = 'ลบแท็ก',
  className,
  ...rest
}: TagProps) {
  const interactive = Boolean(onSelect) && !disabled;
  // ทรงกลมมีแต่ชุดไอคอนล้วนในไฟล์ออกแบบ จึงบังคับเข้าโหมดนั้นเสมอ
  const onlyIcon = iconOnly || shape === 'circular';
  // ทรง link มีแค่ชุดฐานในไฟล์ออกแบบ ชนิดอื่นจึงถูกบังคับกลับเป็น none
  // โหมดไอคอนล้วนก็ไม่มีของนำหน้า เพราะไม่มีข้อความให้นำหน้า
  const effectiveLeading: TagLeading = shape === 'link' || onlyIcon ? 'none' : leading;
  // ไอคอนซ้ายมีเฉพาะชุดฐาน ชนิดที่มีของนำหน้าใช้ช่องซ้ายไปแล้ว
  const showLeftIcon = Boolean(leftIcon) && !onlyIcon && effectiveLeading === 'none';
  // ⚠️ ชุด number image checkbox indicator ในไฟล์ออกแบบไม่มีแกน hierarchy (30 แบบ = default-gray x size x state)
  //    มีหน้าตาเดียวคือพื้นขาวมีขอบ แบบเดียวกับ secondary ของชุดฐาน จึงบังคับระดับความเด่นเป็น secondary
  //    ไม่ให้โค้ดเรนเดอร์แบบที่ไฟล์ออกแบบไม่มี (หัวหน้าทัก 2026-10-22 ว่า Storybook ไม่ตรงไฟล์ออกแบบ)
  const FIXED_SECONDARY: TagLeading[] = ['left-number', 'left-image', 'left-checkbox', 'left-indicator'];
  const effectiveHierarchy: TagHierarchy = FIXED_SECONDARY.includes(effectiveLeading) ? 'secondary' : hierarchy;

  const classes = [
    styles.root,
    SIZE_CLASS[size],
    SHAPE_CLASS[shape],
    LEADING_CLASS[effectiveLeading],
    onlyIcon ? styles.iconOnly : undefined,
    FAMILY_CLASS[family],
    // ทรง link คุมสีเองทั้งหมด ไม่ใช้คลาสระดับความเด่น
    shape === 'link' ? undefined : HIERARCHY_CLASS[effectiveHierarchy],
    defaultGray && family !== 'neutral' ? styles.defaultGray : undefined,
    interactive ? styles.interactive : undefined,
    className,
  ].filter(Boolean).join(' ');

  return (
    <span
      className={classes}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-disabled={disabled || undefined}
      aria-pressed={effectiveLeading === 'left-checkbox' ? Boolean(checked) : undefined}
      onClick={interactive ? onSelect : undefined}
      onKeyDown={interactive ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect?.(); }
      } : undefined}
      {...rest}
    >
      {onlyIcon ? (
        <>
          <span className={styles.icon} aria-hidden="true">{icon ?? <Icon name="close" size="100%" />}</span>
          <span className={styles.srOnly}>{label}</span>
        </>
      ) : null}

      {/* ของนำหน้าทุกชนิดอยู่ซ้ายสุด ตรวจลำดับชั้นจริงใน Figma แล้ว (2026-10-21) มาก่อน content ทั้งหมด */}
      {effectiveLeading === 'left-indicator' ? <span className={styles.dot} aria-hidden="true" /> : null}
      {effectiveLeading === 'left-checkbox' ? (
        <span className={styles.checkbox} data-checked={checked ? 'true' : undefined} aria-hidden="true">
          {checked ? <Icon name="check" size="100%" /> : null}
        </span>
      ) : null}
      {effectiveLeading === 'left-image' && imageSrc ? (
        <span className={`${styles.leading} ${styles.leadingImage}`}><img src={imageSrc} alt="" /></span>
      ) : null}
      {effectiveLeading === 'left-number' ? (
        <span className={`${styles.leading} ${styles.leadingNumber}`}>{count}</span>
      ) : null}

      {/* ชั้น content ห่อไอคอนซ้าย ข้อความ และไอคอนปิด ตรงกับชั้น `content` ในไฟล์ออกแบบ (หัวหน้าปรับโครง 2026-10-21)
          ในไฟล์ออกแบบชั้นนี้มีเฉพาะ 6 ชุดที่มีของนำหน้า (number image checkbox ทั้งสองทรง) และมีไอคอนปิดอยู่ข้างใน
          ฝั่งโค้ดใช้ชั้นเดียวกันกับทุกชนิดเพื่อไม่ให้มีสองโครง ชนิดที่ไฟล์ออกแบบไม่มีชั้นนี้
          จะไม่ตั้งตัวแปร --tag-content-* ชั้นจึงไม่มีระยะขอบและใช้ช่องไฟเดียวกับกล่องนอก ผลเท่ากับไม่มีชั้น */}
      {onlyIcon ? null : (
        <span className={styles.content}>
          {showLeftIcon ? <span className={styles.icon} aria-hidden="true">{leftIcon}</span> : null}
          <span className={styles.title}>{children}</span>
          {closable && !disabled ? (
            <button
              type="button"
              className={styles.close}
              aria-label={closeLabel}
              onClick={(e) => { e.stopPropagation(); onClose?.(); }}
            >
              {closeIcon ?? <Icon name="close" size="100%" />}
            </button>
          ) : null}
        </span>
      )}
    </span>
  );
}

export default Tag;
