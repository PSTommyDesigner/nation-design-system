/**
 * Toast Nation Design System
 *
 * ข้อความแจ้งลอยที่ทับเนื้อหา บอกผลของสิ่งที่เพิ่งเกิดขึ้น แล้วหายไปเอง
 * ตรงกับ component set ในไฟล์ออกแบบหน้า 19 Toasts and Banners
 * สเปคขนาดทั้งหมดอยู่ที่ tokens/scale/toast.mjs ไม่มีค่าใดอยู่ในไฟล์นี้
 *
 * ⚠️ ต่างจาก Banner ที่จุดเดียวที่สำคัญ คือ Toast ลอยทับเนื้อหาและหายเอง
 *    ส่วน Banner อยู่ในสายเนื้อหาและคาอยู่จนกว่าจะกดปิด
 *    ของที่เป็นผลของการกดปุ่มเมื่อครู่ใช้ Toast ของที่เป็นสถานะค้างของหน้าใช้ Banner
 *
 * ⚠️ ชนิด error ไม่หายเอง ต้องกดปิด
 *    ข้อนี้แตกจากเสียงข้างมากของตลาดโดยตั้งใจ เหตุผลคือ WCAG 2.2.1 Timing Adjustable ระดับ A
 *    หน้า Understanding ของข้อนั้นยอมให้ตั้งเวลาได้ถ้าข้อมูลเดียวกันหาได้จากที่อื่น
 *    แต่ข้อความแจ้งความผิดพลาดมักเป็นที่เดียวที่ข้อมูลอยู่ ถ้าหายไปผู้ใช้เอากลับมาไม่ได้
 *    จึงตกข้อ 2.2.1 ระดับ A ทันที ดู docs/research/toast-banner-component.md หัวข้อ 8.3
 *
 * ⚠️ live region แยกออกจากกล่องที่มองเห็น ห้ามรวมกัน
 *    ถ้าใส่ aria-live หรือ role ลงบนกล่องที่มองเห็น โปรแกรมอ่านหน้าจอจะอ่านสองรอบ
 *    รอบแรกตอน live region เปลี่ยน รอบสองตอนผู้ใช้เลื่อนไปเจอกล่องนั้น
 *    Base Web เขียนเหตุผลนี้ไว้ในโค้ด และ Fluent 2 กับ Radix แยกออกมาแบบเดียวกัน
 *    ระดับเสียง default กับ brand ใช้ polite ส่วน error warning success ใช้ assertive
 *
 * ⚠️ ห้ามย้ายโฟกัสมาที่ตัวใบตอนมันโผล่ เป็นข้อกำหนดของ W3C
 *    ของที่โผล่มาเองโดยผู้ใช้ไม่ได้สั่ง ถ้าแย่งโฟกัสจะทำให้คนที่กำลังพิมพ์อยู่หลุดจากที่เดิม
 *
 * ⚠️ นาฬิกาหยุดนับ 3 กรณี คือเมาส์ชี้ โฟกัสเข้าไปข้างใน และผู้ใช้เปิด prefers-reduced-motion
 *    และตอนนับต่อจะนับจากเวลาที่เหลือ ไม่ใช่เริ่มใหม่จากเต็ม
 *    ถ้าเริ่มใหม่ทุกครั้ง ใบนั้นจะไม่มีวันหายเมื่อเมาส์ผ่านไปผ่านมา (กับดักที่ Polaris และ Radix เขียนไว้)
 *
 * ⚠️ ไม่มีสถานะ disabled ที่ตัวกล่อง สถานะอยู่ที่ปุ่มข้างในเท่านั้น
 *
 * ⚠️ ปุ่มกระทำคือ `LinkButton` ตระกูล neutral เท่านั้น ห้ามเปลี่ยนไปใช้ปุ่มชนิดอื่น
 *    เพราะในไฟล์ออกแบบหน้า 19 ปุ่มกระทำของทุกแบบเป็น instance ของชุด `link-button`
 *    ตระกูล Neutral Button (node 7226:11764) ถ้าโค้ดใช้ปุ่มชนิดอื่นสองฝั่งจะอ้างคนละชิ้นงาน
 *
 * TODO ยังไม่มีปุ่มลัดกระโดดไปที่กองข้อความแจ้ง (ตลาดใช้ F6 หรือ F8 หรือ Alt+T)
 *      ผู้ใช้สั่งให้พักไว้ก่อน เพราะต้องเช็คว่าชนกับปุ่มลัดของ CMS หรือไม่
 *
 * ค่าทั้งหมดมาจาก design tokens ผ่าน CSS variables ไม่มีค่า hard-code
 */
import React, { useEffect, useId, useRef, useState } from 'react';
import { Icon, type IconName } from '../Icon';
import { LinkButton } from '../LinkButton';
import styles from './Toast.module.css';

export type ToastType = 'default' | 'brand' | 'error' | 'warning' | 'success';
export type ToastSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** ระดับเสียงของการประกาศ ตรงกับค่าของ aria-live */
export type ToastPoliteness = 'polite' | 'assertive';

/**
 * เวลาหายเองหน่วยมิลลิวินาที
 *
 * ⚠️ เวลาไม่ใช่ขนาด และ Figma ไม่มีที่เก็บหน่วยเวลาในตัวแปร
 *    tokens/scale/toast.mjs จึงเขียนกำกับไว้ว่าไม่มี token ของเรื่องนี้โดยตั้งใจ
 *    ค่าที่ตัดสินแล้วอยู่ที่นี่ที่เดียว
 */
export const TOAST_DURATION = {
  /** ค่าปกติ 5 วินาที */
  default: 5000,
  /** มีปุ่มกระทำ 10 วินาที เพราะผู้ใช้ต้องอ่านแล้วตัดสินใจก่อนกด */
  withAction: 10000,
} as const;

/**
 * เวลาของการเคลื่อนไหวหน่วยมิลลิวินาที
 *
 * ค่าจริงเป็นของ token `--ntg-motion-duration-default` (ขาเข้า) และ
 * `--ntg-motion-duration-fast` (ขาออก) ซึ่ง Toast.module.css อ้างไปใช้โดยตรง
 *
 * ⚠️ ที่นี่เป็นสำเนาของตัวเลขเดียวกัน ไม่ใช่แหล่งความจริง
 *    JavaScript อ่าน custom property ของ CSS ตอน render ไม่ได้ แต่ต้องรู้เวลาขาออก
 *    เพื่อรอภาพเล่นจบก่อนถอดใบออกจากรายการ จึงต้องมีค่าคู่กันสองที่
 *    **ถ้าแก้ `--ntg-motion-duration-fast` หรือ `--ntg-motion-duration-default` ต้องมาแก้ตรงนี้ด้วย**
 *    เป็นกรณีเดียวกับจุดตัดหน้าจอ 768 ที่ `@media` อ่าน custom property ไม่ได้
 */
export const TOAST_MOTION = {
  /** ตรงกับ --ntg-motion-duration-default */
  enterMs: 250,
  /** ตรงกับ --ntg-motion-duration-fast ขาออกเร็วกว่าขาเข้าโดยตั้งใจ */
  leaveMs: 150,
} as const;

/** ปุ่มกระทำในข้อความแจ้ง มีได้ปุ่มเดียวและอยู่ใต้ข้อความเสมอ */
export interface ToastAction {
  label: string;
  onClick: () => void;
  /** ไอคอนนำหน้าข้อความบนปุ่ม ใช้ชุดไอคอนของ DS */
  icon?: IconName;
}

export interface ToastProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'title' | 'children'> {
  /** หัวข้อ บรรทัดแรกของข้อความแจ้ง */
  title: React.ReactNode;
  /** ชนิด 5 ค่า คุมสีพื้น สีไอคอน และระดับเสียงของการประกาศ */
  type?: ToastType;
  /** ⚠️ `xs` ใช้เฉพาะแผงตั้งค่าที่หนาแน่นบนเดสก์ท็อป ห้ามใช้บนมือถือ */
  size?: ToastSize;
  /** ข้อความรอง อยู่ใต้หัวข้อ */
  description?: React.ReactNode;

  /* ── 4 ส่วนที่เปิดปิดได้ เป็น boolean ไม่ใช่ variant ──────────── */
  /** แสดงไอคอนบอกชนิด ค่าเริ่มต้นคือแสดง */
  showIcon?: boolean;
  /** แสดงข้อความรอง ค่าเริ่มต้นคือแสดงเมื่อส่ง `description` มา */
  showDescription?: boolean;
  /** แสดงปุ่มกระทำ ค่าเริ่มต้นคือแสดงเมื่อส่ง `action` มา */
  showAction?: boolean;
  /** แสดงปุ่มปิด ค่าเริ่มต้นคือแสดง */
  showClose?: boolean;

  /** ไอคอนที่ใช้แทนไอคอนประจำชนิด ใช้ชุดไอคอนของ DS ไม่รับ element ที่วาดเอง */
  icon?: IconName;
  /** ปุ่มกระทำ มีได้ปุ่มเดียว */
  action?: ToastAction;
  /** เรียกเมื่อกดปุ่มปิด หรือเมื่อนาฬิกาหายเองหมดเวลา */
  onClose?: () => void;
  /** ชื่อปุ่มปิดที่โปรแกรมอ่านหน้าจอจะอ่าน */
  closeLabel?: string;

  /**
   * เวลาหายเองหน่วยมิลลิวินาที ใช้ทับค่าที่ระบบคิดให้
   * `null` คือไม่หายเอง ต้องกดปิด ซึ่งเป็นค่าของชนิด `error` อยู่แล้ว
   */
  duration?: number | null;

  /**
   * ประกาศข้อความให้โปรแกรมอ่านหน้าจอ ค่าเริ่มต้นคือประกาศ
   * ⚠️ `ToastStack` ส่งค่านี้เป็น `false` เพราะกองเป็นคนประกาศแทนทั้งกอง
   *    ถ้าทั้งกองและทุกใบประกาศพร้อมกัน ผู้ใช้จะได้ฟังซ้ำเท่าจำนวนใบ
   */
  announce?: boolean;
  /** ข้อความที่จะให้ประกาศ ใช้เมื่อหัวข้อหรือข้อความรองไม่ใช่ข้อความล้วน */
  announcement?: string;

  /** แท็กของกล่องนอก `li` เมื่ออยู่ใน `ToastStack` ส่วนเดี่ยว ๆ เป็น `div` */
  as?: 'div' | 'li';
  /** กำลังเล่นภาพขาออก `ToastStack` เป็นคนตั้งให้ ไม่ควรส่งเอง */
  leaving?: boolean;
}

const SIZE_CLASS: Record<ToastSize, string> = {
  xs: styles.xs, sm: styles.sm, md: styles.md, lg: styles.lg, xl: styles.xl,
};

const TYPE_CLASS: Record<ToastType, string> = {
  default: styles.typeDefault,
  brand: styles.typeBrand,
  error: styles.typeError,
  warning: styles.typeWarning,
  success: styles.typeSuccess,
};

/** ไอคอนประจำชนิด ทับได้ด้วย prop `icon` */
const TYPE_ICON: Record<ToastType, IconName> = {
  default: 'info-circle',
  brand: 'info-circle',
  error: 'error-circle',
  warning: 'warning',
  success: 'check-circle',
};

/**
 * ระดับเสียงของการประกาศต่อชนิด
 * default กับ brand เป็นข้อมูลที่รอได้ ส่วน error warning success ต้องแทรกทันที
 */
export const TOAST_POLITENESS: Record<ToastType, ToastPoliteness> = {
  default: 'polite',
  brand: 'polite',
  error: 'assertive',
  warning: 'assertive',
  success: 'assertive',
};

/** เวลาหายเองที่ระบบคิดให้ `null` คือไม่หายเอง */
export function resolveToastDuration(
  type: ToastType,
  hasAction: boolean,
  override?: number | null,
): number | null {
  if (override !== undefined) return override;
  // ชนิด error ไม่หายเอง ดูเหตุผล WCAG 2.2.1 ที่หัวไฟล์
  if (type === 'error') return null;
  return hasAction ? TOAST_DURATION.withAction : TOAST_DURATION.default;
}

/** ดึงข้อความล้วนออกจาก node เพื่อใช้ประกาศ รับเฉพาะข้อความและตัวเลข */
function plainText(node: React.ReactNode): string {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  return '';
}

/** ข้อความที่จะประกาศของใบหนึ่ง */
export function toastAnnouncement(
  input: Pick<ToastProps, 'title' | 'description' | 'announcement'>,
): string {
  if (input.announcement !== undefined) return input.announcement;
  return [plainText(input.title), plainText(input.description)]
    .filter((part) => part.length > 0)
    .join(' ');
}

/** ผู้ใช้ขอให้ลดการเคลื่อนไหวหรือไม่ ใช้หยุดนาฬิกาหายเองด้วย ไม่ใช่แค่หยุดภาพ */
function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

/** เตือนตอนพัฒนาเมื่อข้อความที่จะประกาศว่างเปล่า */
function warnMissingAnnouncement(text: string, announce: boolean): void {
  if (process.env.NODE_ENV === 'production') return;
  if (announce && text.length === 0) {
    console.warn(
      'Toast: ไม่มีข้อความให้โปรแกรมอ่านหน้าจอประกาศ ' +
        'เพราะหัวข้อและข้อความรองไม่ใช่ข้อความล้วน ให้ส่ง announcement มาด้วย',
    );
  }
}

/**
 * @example
 * <Toast
 *   type="success"
 *   title="บันทึกข่าวแล้ว"
 *   description="ข่าวนี้อยู่ในรายการที่บันทึกไว้"
 *   onClose={() => setOpen(false)}
 * />
 *
 * <Toast
 *   type="error"
 *   title="ส่งข่าวไม่สำเร็จ"
 *   description="เครือข่ายขัดข้อง ลองอีกครั้งได้"
 *   action={{ label: 'ลองอีกครั้ง', onClick: retry }}
 *   onClose={() => setOpen(false)}
 * />
 */
export function Toast({
  title,
  type = 'default',
  size = 'md',
  description,
  showIcon = true,
  showDescription,
  showAction,
  showClose = true,
  icon,
  action,
  onClose,
  closeLabel = 'ปิดข้อความแจ้ง',
  duration,
  announce = true,
  announcement,
  as = 'div',
  leaving = false,
  className,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...rest
}: ToastProps) {
  const autoId = useId();
  const reducedMotion = usePrefersReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const withDescription = (showDescription ?? description !== undefined) && description !== undefined;
  const withAction = (showAction ?? action !== undefined) && action !== undefined;

  const resolvedDuration = resolveToastDuration(type, withAction, duration);
  const announceText = toastAnnouncement({ title, description, announcement });
  warnMissingAnnouncement(announceText, announce);

  // onClose เก็บใน ref เพื่อไม่ให้นาฬิกาเริ่มใหม่ทุกครั้งที่กล่องแม่ render
  const onCloseRef = useRef(onClose);
  useEffect(() => { onCloseRef.current = onClose; });

  // เวลาที่เหลือ นับต่อจากที่ค้างไว้ ไม่ใช่เริ่มใหม่จากเต็ม
  const remainingRef = useRef<number>(resolvedDuration ?? 0);
  useEffect(() => { remainingRef.current = resolvedDuration ?? 0; }, [resolvedDuration]);

  // นาฬิกาเดินเมื่อมีเวลา และไม่ถูกหยุดด้วย 3 เงื่อนไขที่หัวไฟล์
  const ticking = resolvedDuration !== null && !hovered && !focused && !reducedMotion && !leaving;

  useEffect(() => {
    if (!ticking) return;
    const startedAt = Date.now();
    const timer = window.setTimeout(() => onCloseRef.current?.(), remainingRef.current);
    return () => {
      window.clearTimeout(timer);
      remainingRef.current = Math.max(0, remainingRef.current - (Date.now() - startedAt));
    };
  }, [ticking]);

  const classes = [styles.root, TYPE_CLASS[type], SIZE_CLASS[size], leaving ? styles.leaving : undefined, className]
    .filter(Boolean)
    .join(' ');

  const titleId = `${autoId}-title`;

  /*
   * ตัวจับเหตุการณ์ของเราต้องทำงานเสมอ เพราะนาฬิกาหายเองพึ่งมันอยู่
   * จึงเรียกของผู้ใช้ต่อท้าย ไม่ใช่ปล่อยให้ของผู้ใช้ทับของเราผ่าน spread
   */
  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    setHovered(true);
    onMouseEnter?.(event);
  };
  const handleMouseLeave = (event: React.MouseEvent<HTMLElement>) => {
    setHovered(false);
    onMouseLeave?.(event);
  };
  // React ส่งต่อ focus และ blur ขึ้นมาถึงกล่องนอก จึงจับโฟกัสที่เข้าไปข้างในได้ที่นี่
  const handleFocus = (event: React.FocusEvent<HTMLElement>) => {
    setFocused(true);
    onFocus?.(event);
  };
  const handleBlur = (event: React.FocusEvent<HTMLElement>) => {
    setFocused(false);
    onBlur?.(event);
  };

  return React.createElement(
    as,
    {
      ...rest,
      className: classes,
      'data-type': type,
      'data-size': size,
      // ห้ามใส่ aria-live หรือ role ที่นี่ ดูคำอธิบายที่หัวไฟล์
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onFocus: handleFocus,
      onBlur: handleBlur,
    },
    <React.Fragment key="content">
      {announce && (
        <span className={styles.liveRegion} aria-live={TOAST_POLITENESS[type]} aria-atomic="true">
          {announceText}
        </span>
      )}

      <div className={styles.row}>
        {showIcon && (
          <span className={styles.iconSlot}>
            <Icon name={icon ?? TYPE_ICON[type]} size="100%" />
          </span>
        )}

        <div className={styles.body}>
          <p className={styles.title} id={titleId}>{title}</p>
          {withDescription && <p className={styles.description}>{description}</p>}
          {withAction && action && (
            <div className={styles.actionRow}>
              {/*
                ปุ่มกระทำใช้ตระกูล neutral ทุกชนิด ไม่ได้ไล่สีตามชนิดของกล่อง
                เหตุผล 1 ไอคอนกับพื้นหลังบอกชนิดอยู่แล้ว ปุ่มไม่ต้องย้ำอีกชั้น
                เหตุผล 2 ตระกูลสีของปุ่มไม่มี warning และ success ให้จับคู่
                ถ้าไล่สีตามชนิดจะต้อง fallback 2 ใน 5 ชนิด ซึ่งไม่สม่ำเสมอ
              */}
              <LinkButton family="neutral" size={size} leftIcon={action.icon} onClick={action.onClick}>
                {action.label}
              </LinkButton>
            </div>
          )}
        </div>

        {/* ปุ่มปิดเป็นพี่น้องของกลุ่มข้อความ ไม่ใช่ลูกของมัน ดูคำอธิบายในไฟล์ CSS */}
        {showClose && (
          <button type="button" className={styles.close} aria-label={closeLabel} onClick={onClose}>
            <Icon name="close" size="100%" />
          </button>
        )}
      </div>
    </React.Fragment>,
  );
}

/* ═══ กองข้อความแจ้ง ═══════════════════════════════════════════════ */

/** หนึ่งใบในกอง `id` ใช้แยกใบและใช้บอกว่าใบไหนใหม่ */
export interface ToastStackItem extends Omit<ToastProps, 'as' | 'announce' | 'leaving' | 'onClose'> {
  id: string;
}

export interface ToastStackProps {
  /** เรียงจากเก่าไปใหม่ ใบใหม่อยู่ท้ายรายการและโผล่ด้านล่างของกอง */
  items: readonly ToastStackItem[];
  /** เรียกเมื่อใบนั้นควรถูกถอดออกจากรายการ เรียกหลังภาพขาออกเล่นจบแล้ว */
  onDismiss: (id: string) => void;
  /** จำนวนใบที่ซ้อนได้ ค่าเริ่มต้น 3 ใบที่เกินจะยังไม่แสดงจนกว่าใบเก่าจะหาย */
  max?: number;
  /** ชื่อของกองที่โปรแกรมอ่านหน้าจอจะอ่าน */
  label?: string;
  className?: string;
}

/** จำนวนใบที่ซ้อนได้ ตัดสินแล้วว่า 3 ใบ */
export const TOAST_STACK_MAX = 3;

/**
 * กองข้อความแจ้งลอย ยึดล่างขวาบนเดสก์ท็อป และล่างกลางบนมือถือ
 *
 * ⚠️ กองเป็นคนประกาศแทนทั้งกอง ตัวใบจึงได้ announce={false}
 *    มี 2 ช่องแยกกันตามระดับเสียง เพราะสลับ aria-live ของช่องเดียวกลางทาง
 *    โปรแกรมอ่านหน้าจอบางตัวจะไม่ประกาศรอบนั้น (วิธีเดียวกับ AriaLive ของ Fluent 2)
 *
 * ⚠️ ข้อความเดิมซ้ำสองรอบติดกันจะไม่ถูกประกาศรอบที่สอง เป็นพฤติกรรมของ live region เอง
 *    ยังไม่ทำกลไกบังคับประกาศซ้ำแบบที่ Material ทำ เพราะต้องหน่วงถึง 1 วินาที
 *
 * @example
 * const [toasts, setToasts] = useState<ToastStackItem[]>([]);
 * <ToastStack
 *   label="ข้อความแจ้งของระบบ"
 *   items={toasts}
 *   onDismiss={(id) => setToasts((list) => list.filter((t) => t.id !== id))}
 * />
 */
export function ToastStack({
  items,
  onDismiss,
  max = TOAST_STACK_MAX,
  label = 'ข้อความแจ้งของระบบ',
  className,
}: ToastStackProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [leaving, setLeaving] = useState<readonly string[]>([]);
  const [politeText, setPoliteText] = useState('');
  const [assertiveText, setAssertiveText] = useState('');

  // ใบที่ประกาศไปแล้ว กันการประกาศซ้ำตอนกล่องแม่ render ใหม่
  const announcedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const ids = new Set(items.map((item) => item.id));
    for (const item of items) {
      if (announcedRef.current.has(item.id)) continue;
      announcedRef.current.add(item.id);
      const text = toastAnnouncement(item);
      if (text.length === 0) continue;
      if (TOAST_POLITENESS[item.type ?? 'default'] === 'assertive') setAssertiveText(text);
      else setPoliteText(text);
    }
    // ใบที่หายไปแล้วถอดออกจากชุด เพื่อให้ id เดิมที่ถูกใช้ซ้ำยังประกาศได้
    for (const id of announcedRef.current) {
      if (!ids.has(id)) announcedRef.current.delete(id);
    }
  }, [items]);

  const onDismissRef = useRef(onDismiss);
  useEffect(() => { onDismissRef.current = onDismiss; });

  const requestClose = (id: string) => {
    if (leaving.includes(id)) return;
    if (reducedMotion) {
      // ไม่มีภาพขาออกให้รอ ถอดออกทันที
      onDismissRef.current(id);
      return;
    }
    setLeaving((list) => [...list, id]);
    window.setTimeout(() => {
      setLeaving((list) => list.filter((one) => one !== id));
      onDismissRef.current(id);
    }, TOAST_MOTION.leaveMs);
  };

  // ใบใหม่เข้าด้านล่าง จึงหยิบท้ายรายการมาแสดง ใบที่เกินรออยู่จนกว่าใบเก่าจะหาย
  const visible = items.slice(-Math.max(1, max));

  return (
    <div className={[styles.viewport, className].filter(Boolean).join(' ')}>
      {/* 2 ช่องแยกตามระดับเสียง อยู่นอกตัวใบที่มองเห็น ดูคำอธิบายด้านบน */}
      <span className={styles.liveRegion} aria-live="polite" aria-atomic="true">{politeText}</span>
      <span className={styles.liveRegion} aria-live="assertive" aria-atomic="true">{assertiveText}</span>

      <ol className={styles.list} aria-label={label}>
        {visible.map(({ id, ...item }) => (
          <Toast
            key={id}
            as="li"
            announce={false}
            leaving={leaving.includes(id)}
            onClose={() => requestClose(id)}
            {...item}
          />
        ))}
      </ol>
    </div>
  );
}

export default Toast;
