/**
 * Tooltip Nation Design System
 *
 * กล่องข้อความสั้นที่โผล่เมื่อชี้หรือโฟกัสที่ตัวกระตุ้น อธิบายว่าของชิ้นนั้นคืออะไรหรือทำอะไร
 * แล้วหายไปเมื่อเลื่อนออก ไม่มีการกระทำข้างใน และไม่ขวางการทำงาน
 * ตรงกับ component set ในไฟล์ออกแบบหน้า 20 Tooltips
 * สเปคขนาดทั้งหมดอยู่ที่ tokens/scale/tooltip.mjs ไม่มีค่าขนาดใดอยู่ในไฟล์นี้
 *
 * ⚠️ ใช้ตัวไหน Tooltip หรือ Popover
 *    Tooltip กระตุ้นด้วยการชี้หรือโฟกัส มีแต่ตัวหนังสือ และกดอะไรข้างในไม่ได้
 *    ของที่กระตุ้นด้วยการคลิกและมีลิงก์หรือปุ่มข้างใน เป็นของอีกชิ้นหนึ่งคือ popover
 *    ตลาด 5 เจ้าเขียนห้ามของที่กดได้ใน tooltip ตรง ๆ และ W3C ห้ามด้วย
 *    และ Gestalt เคยทำแล้วประกาศถอนออกเพราะเข้าถึงไม่ได้
 *
 * ⚠️ `title` กับ `description` รับเฉพาะข้อความล้วน ไม่รับ React node โดยตั้งใจ
 *    เป็นการบังคับด้วยชนิดข้อมูลว่าใส่ลิงก์หรือปุ่มข้างในไม่ได้ แบบที่ Carbon เตือนไว้
 *    ถ้าต้องมีของที่กดได้ ให้เปลี่ยนไปใช้ popover ไม่ใช่แก้ชนิดข้อมูลที่นี่
 *
 * ⚠️ `relationship` ไม่มีค่าเริ่มต้น ต้องระบุเสมอ แบบที่ Fluent 2 ทำ
 *    เพราะเลือกผิดแล้วตัวกระตุ้นจะไม่มีชื่อเลย ซึ่งเป็นความผิดพลาดที่มองไม่เห็น
 *    label         ตัวกระตุ้นไม่มีชื่อ เช่นปุ่มไอคอนล้วน คำใบ้คือชื่อของมัน ผูกด้วย aria-labelledby
 *    description   ตัวกระตุ้นมีชื่ออยู่แล้ว คำใบ้มาเติมข้อมูล ผูกด้วย aria-describedby
 *    inaccessible  ไม่ผูกอะไร ใช้เมื่อข้อความซ้ำกับชื่อปุ่มอยู่แล้ว ถ้าผูกจะได้ฟังซ้ำสองรอบ
 *
 * ⚠️ กล่องตั้ง role tooltip และ aria-hidden true พร้อมกัน ไม่ใช่ขัดกันเอง
 *    aria-hidden กันไม่ให้โปรแกรมอ่านหน้าจออ่านกล่องนี้เป็นอีกชิ้นหนึ่ง
 *    ส่วนการคิดชื่อและคำอธิบายจาก aria-labelledby และ aria-describedby
 *    ยังอ่านข้อความในกล่องที่ซ่อนอยู่ได้ตามข้อกำหนด จึงไม่ได้ฟังซ้ำสองรอบ
 *    Carbon และ Primer ตั้งสองค่านี้คู่กันแบบเดียวกัน
 *
 * ⚠️ กล่องอยู่ใน DOM ตลอด ปิดการมองเห็นด้วย CSS ไม่ใช่ถอดออกจาก DOM
 *    เพราะ relationship label ชี้ไปที่ id ของกล่องนี้ ถ้าถอดออกตอนปิด
 *    ตัวกระตุ้นจะไม่มีชื่อในช่วงที่คำใบ้ยังไม่เปิด ซึ่งคือเวลาเกือบทั้งหมด
 *
 * ⚠️ ครบข้อ WCAG 1.4.13 Content on Hover or Focus ทั้ง 3 ข้อย่อย
 *    Dismissible  กด Escape ปิดได้ และเรียก stopPropagation ไม่ให้ไหลไปปิด modal ข้างนอก
 *                 (Carbon กับ Spectrum กับ Fluent ทำเหมือนกันทั้งสามเจ้า)
 *    Hoverable    ย้ายตัวชี้เข้าไปในกล่องได้โดยกล่องไม่หาย ห้ามใช้ pointer-events none
 *                 ตัวกระตุ้นกับกล่องอยู่ในกล่องครอบเดียวกัน บวกสะพานพื้นที่ปลอดภัยใน CSS
 *    Persistent   ไม่มีนาฬิกาหายเอง กล่องอยู่จนกว่าจะเลื่อนออก เลิกโฟกัส หรือกด Escape
 *
 * ⚠️ ซ่อนบนจอสัมผัส 2 ชั้น
 *    ชั้น CSS ซ่อนด้วย (hover: none) และ (pointer: coarse)
 *    ชั้นนี้ไม่รับเหตุการณ์ที่ pointerType เป็น touch แบบที่ Radix และ Zag ทำ
 *    **ห้ามใส่ข้อมูลที่จำเป็นต่อการใช้งานในคำใบ้** เพราะผู้ใช้มือถือจะไม่เห็นเลย
 *    และช่องทางหลักขององค์กรคือมือถือเกิน 70 เปอร์เซ็นต์
 *
 * ⚠️ ช่วงผ่อนผันเป็นสถานะรวมของทั้งหน้า ไม่ใช่ของกล่องใบใด
 *    ถ้ามีคำใบ้ใบไหนเพิ่งปิดไปไม่เกิน TOOLTIP_TIMING.graceMs ใบถัดไปเปิดทันที
 *    และข้ามภาพขาเข้าทิ้งไปด้วย ถ้าไม่ทำ การไล่ตัวชี้ผ่านแถบปุ่มไอคอน 5 ปุ่ม
 *    จะต้องรอ 300 ทุกปุ่มและเห็นกล่องเลือนเข้าเลือนออก 5 รอบ
 *    ตลาด 6 เจ้าทำกลไกนี้ และทุกเจ้าเก็บเป็นสถานะรวมของหน้าเหมือนกัน
 *
 * ⚠️ โฟกัสเปิดทันทีโดยไม่หน่วง ต่างจากการชี้ที่หน่วง 300
 *    เพราะการกด Tab มาที่ปุ่มเป็นการตั้งใจอยู่แล้ว ไม่ใช่ตัวชี้ที่ไหลผ่าน
 *    ซึ่งเป็นสิ่งที่ Spectrum ทำ (หน่วง 1500 ตอนชี้ และ 0 ตอนโฟกัส)
 *
 * ⚠️ เปิดด้วยโฟกัสเฉพาะ :focus-visible เท่านั้น
 *    ถ้าเปิดทุกการโฟกัส การคลิกปุ่มด้วยเมาส์จะทำให้กล่องค้างอยู่หลังคลิก
 *    Spectrum กับ Primer จำกัดไว้แบบเดียวกัน
 *
 * ⚠️ ไม่ใช้ portal และไม่ใช้ไลบรารีจัดตำแหน่ง
 *    กล่องวางตำแหน่งด้วย CSS เทียบกับกล่องครอบ จึงถูก overflow hidden ของบรรพบุรุษตัดได้
 *    กลไกพลิกเมื่อชนขอบจอยังเป็นสเปคใน README ยังไม่ได้ติดตั้ง
 *
 * ค่าทั้งหมดมาจาก design tokens ผ่าน CSS variables ไม่มีค่า hard-code
 */
import React, { useEffect, useId, useRef, useState } from 'react';
import styles from './Tooltip.module.css';

export type TooltipSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** แกนตำแหน่ง ชื่อคือที่ที่กล่องไปอยู่เทียบกับตัวกระตุ้น ไม่ใช่ทิศที่ลูกศรชี้ */
export type TooltipAxis = 'top' | 'bottom' | 'left' | 'right';

/** การชิดขอบบนแกนขวาง ไม่ระบุคือจัดกลาง */
export type TooltipAlign = 'start' | 'end';

/**
 * ตำแหน่ง 12 ค่า ซึ่งเป็นฐานนิยมของตลาด 7 เจ้า
 * ⚠️ ที่วาดไว้ในไฟล์ออกแบบหน้า 20 มี 4 ค่า คือแบบจัดกลางของทั้ง 4 แกน
 *    อีก 8 ค่าเป็นของฝั่งโค้ด ใช้ได้เลย แต่ไม่มีภาพเทียบในไฟล์ออกแบบ
 */
export type TooltipPlacement = TooltipAxis | `${TooltipAxis}-${TooltipAlign}`;

/**
 * วิธีผูกคำใบ้กับตัวกระตุ้น ไม่มีค่าเริ่มต้น ต้องระบุเสมอ
 * ดูคำอธิบายของแต่ละค่าที่หัวไฟล์
 */
export type TooltipRelationship = 'label' | 'description' | 'inaccessible';

/** สถานะการมองเห็นของกล่อง */
type TooltipState = 'closed' | 'open' | 'exiting';

/**
 * จังหวะเวลาหน่วยมิลลิวินาที
 *
 * ⚠️ เวลาไม่ใช่ขนาด และ Figma ไม่มีที่เก็บหน่วยเวลาในตัวแปร
 *    tokens/scale/tooltip.mjs เขียนกำกับไว้ว่าไม่มี token ของเรื่องนี้โดยตั้งใจ
 *    ค่าที่ตัดสินแล้วอยู่ที่นี่ที่เดียว
 */
export const TOOLTIP_TIMING = {
  /** หน่วงก่อนโผล่เมื่อชี้ด้วยตัวชี้ ตรงกับค่าของ Atlassian และ Untitled UI */
  openDelayMs: 300,
  /** หน่วงก่อนหาย มีไว้กันการกระพริบตอนย้ายตัวชี้ข้ามรอยต่อ ตรงกับมัธยฐานของตลาด */
  closeDelayMs: 150,
  /** ช่วงผ่อนผัน ถ้าเพิ่งปิดไปไม่เกินค่านี้ ใบถัดไปเปิดทันที ตรงกับ skipDelayDuration ของ Radix */
  graceMs: 300,
} as const;

/**
 * เวลาของการเคลื่อนไหวหน่วยมิลลิวินาที
 *
 * ค่าจริงเป็นของ token `--ntg-motion-duration-fast` ซึ่ง Tooltip.module.css อ้างไปใช้โดยตรง
 *
 * ⚠️ ที่นี่เป็นสำเนาของตัวเลขเดียวกัน ไม่ใช่แหล่งความจริง
 *    JavaScript อ่าน custom property ของ CSS ตอน render ไม่ได้ แต่ต้องรู้เวลาขาออก
 *    เพื่อรอภาพเล่นจบก่อนซ่อนกล่อง
 *    **ถ้าแก้ `--ntg-motion-duration-fast` ต้องมาแก้ตรงนี้ด้วย**
 *    เป็นกรณีเดียวกับจุดตัดหน้าจอ 768 ที่ `@media` อ่าน custom property ไม่ได้
 */
export const TOOLTIP_MOTION = {
  /** ตรงกับ --ntg-motion-duration-fast */
  enterMs: 150,
  /** ตรงกับ --ntg-motion-duration-fast ขาออกใช้ชั้นเวลาเดียวกับขาเข้า */
  exitMs: 150,
} as const;

/*
 * สถานะความอุ่นของทั้งหน้า ไม่ใช่ของกล่องใบใด ดูคำอธิบายที่หัวไฟล์
 * เก็บเป็นตัวแปรระดับโมดูล เพราะต้องแชร์กันข้าม component ทุกใบในหน้า
 * ซึ่งเป็นวิธีเดียวกับ globalWarmedUp ของ Spectrum และ tooltip-manager ของ Atlassian
 */
const warmth = { openCount: 0, lastClosedAt: 0 };

/** มีคำใบ้เปิดอยู่ หรือเพิ่งปิดไปไม่เกินช่วงผ่อนผันหรือไม่ */
export function isTooltipWarm(now: number = Date.now()): boolean {
  if (warmth.openCount > 0) return true;
  if (warmth.lastClosedAt === 0) return false;
  return now - warmth.lastClosedAt <= TOOLTIP_TIMING.graceMs;
}

/** ล้างสถานะความอุ่น มีไว้ให้ชุดทดสอบเรียกระหว่างเคส */
export function resetTooltipWarmth(): void {
  warmth.openCount = 0;
  warmth.lastClosedAt = 0;
}

const SIZE_CLASS: Record<TooltipSize, string> = {
  xs: styles.xs, sm: styles.sm, md: styles.md, lg: styles.lg, xl: styles.xl,
};

const AXIS_CLASS: Record<TooltipAxis, string> = {
  top: styles.axisTop,
  bottom: styles.axisBottom,
  left: styles.axisLeft,
  right: styles.axisRight,
};

const ALIGN_CLASS: Record<'center' | TooltipAlign, string> = {
  center: styles.alignCenter,
  start: styles.alignStart,
  end: styles.alignEnd,
};

/** แยกตำแหน่งออกเป็นแกนกับการชิดขอบ ไม่ระบุการชิดขอบคือจัดกลาง */
export function splitTooltipPlacement(
  placement: TooltipPlacement,
): { axis: TooltipAxis; align: 'center' | TooltipAlign } {
  const dash = placement.indexOf('-');
  if (dash === -1) return { axis: placement as TooltipAxis, align: 'center' };
  return {
    axis: placement.slice(0, dash) as TooltipAxis,
    align: placement.slice(dash + 1) as TooltipAlign,
  };
}

export interface TooltipProps {
  /**
   * ข้อความของคำใบ้ รับเฉพาะข้อความล้วน
   * ⚠️ ไม่รับ React node โดยตั้งใจ ดูคำอธิบายที่หัวไฟล์
   */
  title: string;

  /**
   * วิธีผูกคำใบ้กับตัวกระตุ้น **ต้องระบุเสมอ ไม่มีค่าเริ่มต้น**
   * ดูคำอธิบายของแต่ละค่าที่หัวไฟล์
   */
  relationship: TooltipRelationship;

  /** ตัวกระตุ้น เป็น element เดียว คำใบ้จะเติม aria ให้ตัวนี้ */
  children: React.ReactElement;

  /** ข้อความรอง อยู่ใต้ข้อความหลัก ต่างกันที่น้ำหนักอย่างเดียว */
  description?: string;

  /**
   * ขนาด 5 ขั้น ค่าเริ่มต้น `md`
   * ⚠️ ถ้าต้องการความหนาแน่นเท่าที่ DS เจ้าอื่นใช้ ให้เลือก `sm` ไม่ใช่ `md`
   *    เหตุผลอยู่ที่หัวไฟล์ tokens/scale/tooltip.mjs
   */
  size?: TooltipSize;

  /** ตำแหน่ง ค่าเริ่มต้น `top` ชื่อคือที่ที่กล่องไปอยู่ ไม่ใช่ทิศที่ลูกศรชี้ */
  placement?: TooltipPlacement;

  /** แสดงลูกศรหรือไม่ ค่าเริ่มต้นคือแสดง เป็นสวิตช์แยกจากตำแหน่ง */
  arrow?: boolean;

  /** id ของกล่องคำใบ้ ปกติไม่ต้องส่ง ระบบคิดให้เอง */
  id?: string;

  /** คลาสเพิ่มของกล่องคำใบ้ ไม่ใช่ของกล่องครอบตัวกระตุ้น */
  className?: string;

  /** คลาสเพิ่มของกล่องครอบตัวกระตุ้น ใช้เมื่อต้องจัดผังของตัวกระตุ้น */
  wrapperClassName?: string;
}

/** รวม id ที่มีอยู่แล้วกับ id ของคำใบ้ ไม่ทับของเดิม */
function mergeIds(existing: unknown, added: string): string {
  if (typeof existing !== 'string' || existing.length === 0) return added;
  if (existing.split(' ').includes(added)) return existing;
  return `${existing} ${added}`;
}

/** หยุดนาฬิกาที่ค้างอยู่ใน ref แล้วล้างค่า */
function clearTimer(ref: React.RefObject<number | null>): void {
  if (ref.current === null) return;
  window.clearTimeout(ref.current);
  ref.current = null;
}

/** ผู้ใช้ขอให้ลดการเคลื่อนไหวหรือไม่ ใช้ตัดเวลารอภาพขาออกเป็นศูนย์ */
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

/**
 * @example
 * // ปุ่มไอคอนล้วน คำใบ้คือชื่อของปุ่ม
 * <Tooltip title="ตัวหนา" relationship="label">
 *   <IconButton icon="bold" family="neutral" />
 * </Tooltip>
 *
 * @example
 * // ปุ่มที่มีชื่ออยู่แล้ว คำใบ้มาเติมข้อมูล
 * <Tooltip
 *   title="เผยแพร่ทันที"
 *   description="ข่าวจะขึ้นหน้าแรกภายใน 1 นาที และแจ้งผู้ติดตามทุกคน"
 *   relationship="description"
 *   placement="bottom"
 * >
 *   <Button family="brand">เผยแพร่</Button>
 * </Tooltip>
 *
 * @example
 * // ข้อความซ้ำกับชื่อปุ่มอยู่แล้ว ไม่ต้องผูกอะไร
 * <Tooltip title="บันทึก" relationship="inaccessible">
 *   <Button family="neutral">บันทึก</Button>
 * </Tooltip>
 */
export function Tooltip({
  title,
  relationship,
  children,
  description,
  size = 'md',
  placement = 'top',
  arrow = true,
  id,
  className,
  wrapperClassName,
}: TooltipProps) {
  const autoId = useId();
  const tooltipId = id ?? `${autoId}-tooltip`;
  const reducedMotion = usePrefersReducedMotion();

  const [state, setState] = useState<TooltipState>('closed');
  /** ข้ามภาพขาเข้าทิ้งเมื่อเปิดต่อจากใบที่เพิ่งปิดไป */
  const [instant, setInstant] = useState(false);

  const openTimer = useRef<number | null>(null);
  const closeTimer = useRef<number | null>(null);
  const exitTimer = useRef<number | null>(null);
  const surfaceRef = useRef<HTMLDivElement | null>(null);

  /*
   * นับจำนวนใบที่เปิดอยู่ของทั้งหน้า และจดเวลาที่ปิดล่าสุด
   * ใช้ effect เพราะต้องคืนค่าให้ถูกเมื่อ component ถูกถอดออกตอนที่ยังเปิดอยู่
   */
  useEffect(() => {
    if (state !== 'open') return;
    warmth.openCount += 1;
    return () => {
      warmth.openCount = Math.max(0, warmth.openCount - 1);
      warmth.lastClosedAt = Date.now();
    };
  }, [state]);

  /* หยุดนาฬิกาทุกตัวเมื่อถูกถอดออก */
  useEffect(
    () => () => {
      clearTimer(openTimer);
      clearTimer(closeTimer);
      clearTimer(exitTimer);
    },
    [],
  );

  const hideNow = () => {
    clearTimer(openTimer);
    clearTimer(closeTimer);
    if (state === 'closed') return;
    setState('exiting');
    /* ไม่ต้องรอภาพเมื่อผู้ใช้ขอให้ลดการเคลื่อนไหว หรือเมื่อรอบนี้ข้ามภาพอยู่แล้ว */
    const wait = reducedMotion || instant ? 0 : TOOLTIP_MOTION.exitMs;
    clearTimer(exitTimer);
    exitTimer.current = window.setTimeout(() => {
      exitTimer.current = null;
      setState('closed');
    }, wait);
  };

  const show = (immediate: boolean) => {
    clearTimer(closeTimer);
    clearTimer(exitTimer);
    if (state === 'open') return;
    const warm = isTooltipWarm();
    if (immediate || warm) {
      clearTimer(openTimer);
      setInstant(warm);
      setState('open');
      return;
    }
    /* มีนาฬิกาเดินอยู่แล้ว ไม่ต้องเริ่มใหม่ ไม่งั้นการขยับตัวชี้ในปุ่มจะยืดเวลาออกไปเรื่อย */
    if (openTimer.current !== null) return;
    openTimer.current = window.setTimeout(() => {
      openTimer.current = null;
      setInstant(false);
      setState('open');
    }, TOOLTIP_TIMING.openDelayMs);
  };

  const hide = () => {
    clearTimer(openTimer);
    if (state === 'closed') return;
    if (closeTimer.current !== null) return;
    closeTimer.current = window.setTimeout(() => {
      closeTimer.current = null;
      hideNow();
    }, TOOLTIP_TIMING.closeDelayMs);
  };

  /*
   * ปิดด้วย Escape ซึ่งเป็นข้อ Dismissible ของ WCAG 1.4.13
   * ฟังในเฟส capture แล้วเรียก stopPropagation ทันที
   * เพื่อไม่ให้เหตุการณ์ไหลต่อไปปิด modal หรือแผงข้างที่อยู่ข้างนอกด้วย
   * ซึ่งเป็นบั๊กที่เจอบ่อยเมื่อคำใบ้อยู่ในหน้าต่างซ้อน
   */
  useEffect(() => {
    if (state === 'closed') return;
    if (typeof document === 'undefined') return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      event.stopPropagation();
      hideNow();
    };
    document.addEventListener('keydown', onKeyDown, true);
    return () => document.removeEventListener('keydown', onKeyDown, true);
    /*
     * deps ครบแล้ว ทั้งสามตัวคือทุกอย่างที่ hideNow อ่านจากรอบ render นี้
     * ไม่ใส่ hideNow เองเพราะมันถูกสร้างใหม่ทุกรอบ จะทำให้ถอดกับใส่ตัวฟังทุกรอบ
     */
  }, [state, instant, reducedMotion]);

  const childProps = children.props as Record<string, unknown>;
  const childHasAriaLabel = typeof childProps['aria-label'] === 'string';

  /*
   * เตือนตอนพัฒนาเมื่อตั้ง relationship เป็น label แต่ตัวกระตุ้นมี aria-label อยู่แล้ว
   * ชื่อจาก aria-label จะชนะ aria-labelledby ของคำใบ้ แล้วคำใบ้จะไม่ถูกอ่านเลย
   * Primer เตือนข้อนี้ไว้ในโค้ดเหมือนกัน
   */
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') return;
    if (relationship === 'label' && childHasAriaLabel) {
      console.warn(
        'Tooltip: ตัวกระตุ้นมี aria-label อยู่แล้ว แต่ตั้ง relationship เป็น label ' +
          'ชื่อจาก aria-label จะชนะ ทำให้ข้อความในคำใบ้ไม่ถูกอ่าน ' +
          'ให้ถอด aria-label ออกจากตัวกระตุ้น หรือเปลี่ยนเป็น relationship inaccessible',
      );
    }
  }, [relationship, childHasAriaLabel]);

  /*
   * เตือนตอนพัฒนาเมื่อมีของที่รับโฟกัสได้อยู่ในกล่อง
   * ชนิดข้อมูลของ title กับ description กันไว้ชั้นหนึ่งแล้ว
   * ชั้นนี้เป็นตะแกรงที่สอง เผื่อมีคนใส่ของเข้ามาทางอื่น เช่นสั่งแก้ DOM จากข้างนอก
   */
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') return;
    const node = surfaceRef.current;
    if (node === null) return;
    if (node.querySelector('a, button, input, select, textarea, [tabindex]') !== null) {
      console.warn(
        'Tooltip: พบของที่รับโฟกัสได้อยู่ในคำใบ้ ซึ่งผู้ใช้คีย์บอร์ดและจอสัมผัสเข้าถึงไม่ได้ ' +
          'W3C และ DS 5 เจ้าห้ามข้อนี้ ถ้าต้องมีลิงก์หรือปุ่ม ให้เปลี่ยนไปใช้ popover',
      );
    }
  }, [title, description]);

  /* ── เหตุการณ์ของตัวชี้และโฟกัส อยู่ที่กล่องครอบ ครอบทั้งตัวกระตุ้นและกล่องคำใบ้ ── */

  const handlePointerEnter = (event: React.PointerEvent<HTMLSpanElement>) => {
    /* จอสัมผัสไม่แสดงคำใบ้ ดูคำอธิบายที่หัวไฟล์ */
    if (event.pointerType === 'touch') return;
    show(false);
  };

  const handlePointerLeave = (event: React.PointerEvent<HTMLSpanElement>) => {
    if (event.pointerType === 'touch') return;
    hide();
  };

  const handleFocus = (event: React.FocusEvent<HTMLSpanElement>) => {
    const target = event.target;
    /* เปิดเฉพาะโฟกัสที่เบราว์เซอร์ถือว่าควรเห็นวงแหวน ดูคำอธิบายที่หัวไฟล์ */
    if (!(target instanceof Element)) return;
    if (typeof target.matches === 'function' && !target.matches(':focus-visible')) return;
    show(true);
  };

  const handleBlur = () => {
    /* เลิกโฟกัสแล้วปิดทันที ไม่หน่วง แบบที่ Fluent 2 ทำ */
    hideNow();
  };

  /* ── ผูก aria เข้ากับตัวกระตุ้น ต้องอยู่ที่ตัวกระตุ้น ไม่ใช่ที่กล่องครอบ ── */

  const triggerProps: Record<string, unknown> = {};
  if (relationship === 'label') {
    triggerProps['aria-labelledby'] = mergeIds(childProps['aria-labelledby'], tooltipId);
  }
  if (relationship === 'description') {
    triggerProps['aria-describedby'] = mergeIds(childProps['aria-describedby'], tooltipId);
  }
  const trigger = React.cloneElement(
    children as React.ReactElement<Record<string, unknown>>,
    triggerProps,
  );

  const { axis, align } = splitTooltipPlacement(placement);

  const boxClasses = [styles.box, SIZE_CLASS[size], AXIS_CLASS[axis], ALIGN_CLASS[align], className]
    .filter(Boolean)
    .join(' ');

  const withDescription = description !== undefined && description.length > 0;

  return (
    <span
      className={[styles.wrapper, wrapperClassName].filter(Boolean).join(' ')}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {trigger}
      <div
        id={tooltipId}
        /* role กับ aria-hidden ตั้งคู่กันโดยตั้งใจ ดูคำอธิบายที่หัวไฟล์ */
        role="tooltip"
        aria-hidden="true"
        className={boxClasses}
        data-state={state}
        data-instant={instant ? 'true' : 'false'}
        data-size={size}
        data-placement={placement}
      >
        <div className={styles.surface} ref={surfaceRef}>
          <p className={styles.title}>{title}</p>
          {withDescription && <p className={styles.description}>{description}</p>}
          {arrow && <span className={styles.arrow} />}
        </div>
      </div>
    </span>
  );
}

export default Tooltip;
