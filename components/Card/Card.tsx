/**
 * Card Nation Design System
 *
 * การ์ดข่าว ตรงกับ component set ใน Figma หน้า 27 Card
 * ไฟล์นี้เป็น component เดียวที่คุมด้วย props ไม่ได้แยกเป็นหลาย component ตามชุดในไฟล์ออกแบบ
 * เพราะทั้งสามชุดที่ใช้บ่อยที่สุดใช้โครงเดียวกันคือ รูป บวก กล่องข้อความ ต่างกันแค่ทิศทางกับขนาด
 *
 * ชุดที่ครอบคลุมแล้ว
 *   vertical-news-card    → variant="vertical"  ห้าขนาด xs ถึง xl
 *   horizontal-news-card  → variant="horizontal" ห้าขนาด xs ถึง xl
 *   news-list-card        → variant="list" คู่กับ imageTrailing
 *   video-list-card       → variant="list" คู่กับ overlay (ปุ่มเล่น) และ meta (ปุ่มลิงก์)
 *
 * ชุดที่ยังไม่ครอบคลุม พร้อมเหตุผล
 *   text-on-image-square-card กับ text-on-image-wide-card
 *     วางข้อความทับรูป ต้องมีฉากบังหลังข้อความเพื่อให้อ่านออก ซึ่งระบบยังไม่มี token ฉากบัง
 *     ที่ใกล้ที่สุดคือ overlay-black-5 กับ overlay-black-10 ซึ่งจางเกินกว่าจะใช้รองข้อความได้
 *   ranking-item-card ranking-list-card wide-ranking-image-card portrait-ranking-image-card
 *     ต้องใช้ชิ้นส่วน _ranking-number ซึ่งยังไม่มีฝั่งโค้ด
 *   timeline-image-card
 *     ต้องใช้ _timeline-year-label _timeline-divider _timeline-event-item ซึ่งยังไม่มีฝั่งโค้ด
 *   wide-image-card กับ portrait-image-card
 *     เป็นการ์ดรูปล้วนที่มีสัดส่วนของตัวเอง ไม่ใช่ 16 ต่อ 9 และยังไม่มี token สัดส่วนอื่น
 *   do-info-card dont-info-card how-to-read-info-card
 *     เป็นของระบบเอกสาร ตัดสินแล้วว่าไม่ทำฝั่งโค้ด (ดู NO_CODE ใน scripts/verify-component-coverage.mjs)
 *
 * props ออกแบบให้เติมชุดที่เหลือได้โดยไม่ต้องรื้อ
 *   เพิ่มค่าใหม่ใน CardVariant แล้วเติมคลาสใน CARD_VARIANT_CLASS ส่วนช่องวางของ
 *   (tag overlay meta) กับการจำกัดจำนวนบรรทัดใช้ซ้ำได้ทุกชุด
 *
 * ⚠️ ทั้งใบเป็นลิงก์เดียว ห้ามซ้อนลิงก์ในลิงก์ (เอกสารหน้า 27 ข้อ 5)
 *    ของที่ส่งเข้าช่อง tag overlay meta ต้องไม่ใช่ลิงก์หรือปุ่มเมื่อการ์ดมี href
 *
 * ⚠️ ห้ามตรึงความสูงกล่องข้อความ (เอกสารหน้า 27 ข้อ 5)
 *    ถ้าต้องการให้ทุกใบในแถวเดียวสูงเท่ากัน ให้จำกัดจำนวนบรรทัดด้วย titleLines กับ leadLines
 *
 * ⚠️ แท็กหมวดบนรูปเป็นช่องวางของ ไม่ได้วาดเอง ตรงกับไฟล์ออกแบบที่วาง instance ของป้าย
 *    จากหน้า 20 Badges หรือแท็กจากหน้า 21 Tags ลงไป
 *
 * ค่าทั้งหมดมาจาก design tokens ผ่าน CSS variables ไม่มีค่า hard-code
 */
import React from 'react';
import styles from './Card.module.css';

/** ทิศทางการวาง ตรงกับสามชุดที่ใช้บ่อยที่สุดในไฟล์ออกแบบ */
export type CardVariant = 'vertical' | 'horizontal' | 'list';

/** ขนาดของการ์ดข่าว ตรงกับแกน Size ในไฟล์ออกแบบ ใช้กับ vertical และ horizontal เท่านั้น */
export type CardSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const CARD_VARIANT_CLASS: Record<CardVariant, string> = {
  vertical: styles.vertical,
  horizontal: styles.horizontal,
  list: styles.list,
};

const CARD_SIZE_CLASS: Record<CardSize, string> = {
  xs: styles.xs, sm: styles.sm, md: styles.md, lg: styles.lg, xl: styles.xl,
};

export interface CardProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  variant?: CardVariant;
  /**
   * ขนาดของการ์ดข่าว ไม่มีผลกับ `variant="list"` เพราะชุดนั้นมีขนาดเดียวในไฟล์ออกแบบ
   * ความกว้างและความสูงของรูปมาจาก `--ntg-card-image-{width|height}-*` ตามสูตรที่ tokens/scale/card.mjs
   */
  size?: CardSize;
  /** ที่อยู่รูป ไม่ส่งมาก็ได้ จะเห็นพื้นที่วางรูปที่ผูกกับ color/background/general/quaternary แทน */
  src?: string;
  /** ข้อความแทนรูป ปล่อยว่างเมื่อรูปเป็นของตกแต่งที่พาดหัวบอกความหมายอยู่แล้ว */
  alt?: string;
  /**
   * ป้ายหรือแท็กหมวดที่วางทับมุมบนซ้ายของรูป ส่ง instance จากหน้า 20 Badges หรือ 21 Tags เข้ามา
   * ห้ามสร้างป้ายเฉพาะกิจของการ์ดขึ้นมาใหม่
   */
  tag?: React.ReactNode;
  /**
   * ของที่วางทับกลางรูป เช่นปุ่มเล่นของการ์ดรายการวิดีโอ
   * เป็นของตกแต่ง ซ่อนจากโปรแกรมอ่านหน้าจอให้แล้ว เพราะพาดหัวบอกอยู่แล้วว่าเป็นวิดีโอ
   */
  overlay?: React.ReactNode;
  /** ชื่อหมวดเล็กเหนือพาดหัว ตรงกับชั้น Subheading ในไฟล์ออกแบบ */
  category?: React.ReactNode;
  /** พาดหัว ตรงกับชั้น Heading ในไฟล์ออกแบบ */
  title: React.ReactNode;
  /** ความนำ ตรงกับชั้น Supporting Text ในไฟล์ออกแบบ */
  lead?: React.ReactNode;
  /**
   * แถวล่างสุด สำหรับเวลา ชื่อผู้เขียน หรือปุ่มลิงก์ของการ์ดรายการวิดีโอ
   * ⚠️ ถ้าการ์ดมี `href` แล้ว ของในแถวนี้ต้องไม่ใช่ลิงก์หรือปุ่ม
   */
  meta?: React.ReactNode;
  /** ที่อยู่ปลายทาง ใส่แล้วทั้งใบกลายเป็นลิงก์เดียวที่กดได้และเดินด้วยแป้นพิมพ์ได้ */
  href?: string;
  /** ค่า target ของลิงก์ ใส่แล้วเติม rel ให้อัตโนมัติเมื่อเปิดแท็บใหม่ */
  target?: React.HTMLAttributeAnchorTarget;
  /** สลับรูปไปอยู่ขวา ตรงกับแกน Image Trailing ของชุด news-list-card */
  imageTrailing?: boolean;
  /** จำนวนบรรทัดสูงสุดของพาดหัว ใช้แทนการตรึงความสูงการ์ด */
  titleLines?: number;
  /** จำนวนบรรทัดสูงสุดของความนำ */
  leadLines?: number;
  /**
   * ให้การ์ดกว้างเต็มที่วางและให้รูปคงสัดส่วน 16 ต่อ 9 แทนการใช้ความกว้างตายตัวจาก token
   * และให้การ์ดแนวนอนพับเป็นแนวตั้งบนจอแคบ
   *
   * ⚠️ เป็นพฤติกรรมฝั่งโค้ด ไฟล์ออกแบบไม่มีแกนนี้ เพราะไฟล์ออกแบบวางที่ความกว้างตายตัว
   */
  responsive?: boolean;
}

/**
 * @example
 * <Card variant="vertical" size="md" href="/news/1"
 *   src="/cover.jpg" alt=""
 *   category="เศรษฐกิจ" title="หัวข้อข่าว" lead="ความนำของข่าว" titleLines={2} />
 *
 * @example การ์ดรายการพร้อมแท็กหมวดบนรูป
 * <Card variant="list" href="/news/2" src="/cover.jpg"
 *   tag={<Tag size="xs" shape="pill">กีฬา</Tag>}
 *   title="หัวข้อข่าว" lead="1 ม.ค. 2568 00:00" />
 */
export function Card({
  variant = 'vertical',
  size = 'md',
  src,
  alt = '',
  tag,
  overlay,
  category,
  title,
  lead,
  meta,
  href,
  target,
  imageTrailing = false,
  titleLines,
  leadLines,
  responsive = false,
  className,
  style,
  ...rest
}: CardProps) {
  // ขนาดมีผลเฉพาะการ์ดข่าว ส่วนการ์ดรายการมีขนาดเดียวในไฟล์ออกแบบ
  const sizeClass = variant === 'list' ? undefined : CARD_SIZE_CLASS[size];

  const classes = [
    styles.root,
    CARD_VARIANT_CLASS[variant],
    sizeClass,
    responsive ? styles.responsive : undefined,
    imageTrailing ? styles.imageTrailing : undefined,
    className,
  ].filter(Boolean).join(' ');

  // จำนวนบรรทัดส่งผ่านตัวแปร CSS เพราะเป็นจำนวนนับที่มาจากเนื้อหา ไม่ใช่ค่าออกแบบที่ต้องเป็น token
  const clampStyle = {
    ...(typeof titleLines === 'number' ? { '--card-title-lines': String(titleLines) } : null),
    ...(typeof leadLines === 'number' ? { '--card-lead-lines': String(leadLines) } : null),
    ...style,
  } as React.CSSProperties;

  // เปิดแท็บใหม่ต้องกัน tabnabbing เสมอ
  const rel = target === '_blank' ? 'noopener noreferrer' : undefined;

  const media = (
    <span className={styles.media}>
      {src ? <img className={styles.image} src={src} alt={alt} loading="lazy" /> : null}
      {tag ? <span className={styles.tag}>{tag}</span> : null}
      {overlay ? <span className={styles.overlay} aria-hidden="true">{overlay}</span> : null}
    </span>
  );

  const body = (
    <span className={styles.body}>
      {category ? <span className={styles.category}>{category}</span> : null}
      <span className={styles.title}>{title}</span>
      {lead ? <span className={styles.lead}>{lead}</span> : null}
      {meta ? <span className={styles.meta}>{meta}</span> : null}
    </span>
  );

  // รูปอยู่ขวาใช้การสลับลำดับด้วย CSS ไม่ใช่สลับลำดับใน DOM
  // เพราะลำดับการอ่านของโปรแกรมอ่านหน้าจอกับลำดับการเดินด้วยแป้นพิมพ์ต้องเป็นรูปก่อนข้อความเสมอ
  const content = (
    <>
      {media}
      {body}
    </>
  );

  const dataProps = {
    'data-variant': variant,
    'data-title-clamp': typeof titleLines === 'number' ? 'true' : undefined,
    'data-lead-clamp': typeof leadLines === 'number' ? 'true' : undefined,
  };

  if (href) {
    return (
      <a
        className={classes}
        style={clampStyle}
        href={href}
        target={target}
        rel={rel}
        {...dataProps}
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    );
  }

  return (
    <article className={classes} style={clampStyle} {...dataProps} {...rest}>
      {content}
    </article>
  );
}

export default Card;
