/**
 * Pagination Nation Design System
 *
 * แถบเลือกหน้าสำหรับรายการที่ยาวเกินหนึ่งหน้า
 * ตรงกับ component set `pagination` ในไฟล์ออกแบบหน้า 24 Pagination
 * สเปคขนาดทั้งหมดอยู่ที่ tokens/scale/pagination.mjs ไม่มีค่าขนาดหรือสีใดอยู่ในไฟล์นี้
 *
 * ⚠️ ใช้กับหลังบ้านและหน้าค้นหา ไม่ใช่หน้าอ่านข่าว
 *    สำรวจเว็บในเครือ 12 หน้าเมื่อ 2026-10-12 แล้วไม่พบเลขหน้าเลยสักที่
 *    หน้าอ่านข่าวใช้ปุ่มโหลดเพิ่ม ซึ่งเป็นชิ้นงานคนละตัวและยังไม่มีในระบบ
 *
 * ⚠️ ต้องเลือกว่าจะเป็นลิงก์หรือปุ่ม ไม่มีค่าเริ่มต้นให้
 *    ส่ง `href` คือได้ `<a href>` ส่ง `onPageChange` อย่างเดียวคือได้ `<button>`
 *    ชนิดของ prop บังคับให้ส่งอย่างน้อยหนึ่งอย่าง เพราะการเงียบ ๆ เลือก `<button>` ให้
 *    จะทำให้เสียความสามารถในการแชร์ที่อยู่เว็บของหน้าที่ N ไปโดยที่คนเขียนโค้ดไม่รู้ตัว
 *    ตัวแบ่งหน้าที่เปลี่ยนที่อยู่เว็บต้องเป็นลิงก์เสมอ ปุ่มใช้ได้เฉพาะที่ไม่มีที่อยู่เว็บจริงให้ชี้
 *
 * ⚠️ ไม่มี prop ความกว้าง และจะไม่มี
 *    แถบยืดเต็มกรอบแม่เสมอ เหมือนแถบความคืบหน้าในหน้า 23
 *    ของเดิมในไฟล์ออกแบบตรึงไว้ที่ 1440 กับ 375 ซึ่งเป็นค่าที่ไม่ได้คุมอะไรจริง
 *    พอวางในคอลัมน์ที่แคบกว่าก็ล้น อยากให้สั้นลงให้ไปจำกัดที่กรอบแม่
 *
 * ⚠️ จำนวนปุ่มเลขเป็นผลของข้อมูล ไม่ใช่แบบของชุด
 *    ของเดิมมีคุณสมบัติ `No.8` `No.9` `No.10` ทั้งที่จำนวนหน้าเปลี่ยนตลอดเวลา
 *    ที่นี่ปรับผ่าน `siblingCount` กับ `boundaryCount` แล้วสูตรคิดให้เอง
 *
 * ⚠️ ปุ่มก่อนหน้าถัดไปไม่ได้ใช้ `Button` ของ DS เพราะ `Button` เป็น `<button>` อย่างเดียว
 *    ตัวแบ่งหน้าต้องเป็นลิงก์จริงที่มีที่อยู่เว็บ เพื่อให้แชร์ได้ กดย้อนกลับได้ และบอตตามเข้าไปได้
 *    `components/Button/Button.tsx` ยังไม่มี prop ให้เปลี่ยนชนิดของ element จึงใช้ไม่ได้ที่นี่
 *    **ไม่ใช่เพราะเรื่องความสูง** ซึ่งเคยเขียนไว้ผิดแล้วแก้เมื่อ 2026-10-12
 *    ความจริงคือ `--ntg-button-size-*` กับ `--ntg-pagination-height-*` เท่ากันทุกขั้น
 *    และ `Button.module.css` ก็ตั้ง `height` จากตัวแปรนั้นตรง ๆ อยู่แล้ว
 *    ที่นี่จึงใช้สไตล์ชุดเดียวกับปุ่มเลข แล้วยืมสีกับขนาดไอคอนจากชุดปุ่มกลางของระบบ
 *    **ถ้าวันหนึ่ง `Button` รองรับการเปลี่ยนชนิด element ได้ ให้กลับมาใช้ของกลางแทน**
 *
 * ค่าทั้งหมดมาจาก design tokens ผ่าน CSS variables ไม่มีค่า hard-code
 */
import React from 'react';
import { Icon } from '../Icon';
import styles from './Pagination.module.css';
import {
  DEFAULT_BOUNDARY_COUNT,
  DEFAULT_NEXT_LABEL,
  DEFAULT_PREVIOUS_LABEL,
  DEFAULT_SIBLING_COUNT,
  joinClassNames,
  readPagination,
  warn,
  type PaginationSize,
} from './types';

const SIZE_CLASS: Record<PaginationSize, string> = {
  xs: styles.xs,
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
  xl: styles.xl,
};

/** prop ที่ไม่เกี่ยวกับการเลือกว่าจะเป็นลิงก์หรือปุ่ม */
export interface PaginationBaseProps {
  /** หน้าปัจจุบัน นับจาก 1 **จำเป็นเสมอ** */
  currentPage: number;

  /** จำนวนหน้าทั้งหมด **จำเป็นเสมอ** ต่ำกว่า 1 คือไม่วาดแถบ */
  totalPages: number;

  /**
   * ชื่อของ `<nav>` **จำเป็นเสมอ ไม่มีค่าเริ่มต้น**
   * ไปเป็น `aria-label` ไม่ได้แสดงบนจอ
   * หน้าเดียวมี `<nav>` ได้หลายตัว ทุกตัวต้องมีชื่อที่ไม่ซ้ำกัน
   * ถ้ามีตัวแบ่งหน้าสองชุดในหน้าเดียวต้องตั้งชื่อให้ต่างกัน เช่น ตัวแบ่งหน้าบน และ ตัวแบ่งหน้าล่าง
   */
  label: string;

  /** ขนาด 5 ขั้น ค่าเริ่มต้น `md` ห้ามใช้ `xs` บนหน้าอ่านข่าว ดู README หัวข้อขนาด */
  size?: PaginationSize;

  /** จำนวนหน้าข้างหน้าปัจจุบันต่อข้าง ค่าเริ่มต้น 1 ซึ่งทำให้ได้เจ็ดปุ่ม */
  siblingCount?: number;

  /** จำนวนหน้าที่ตรึงไว้ที่หัวและท้ายแถว ค่าเริ่มต้น 1 ต่ำกว่า 1 ไม่ได้ */
  boundaryCount?: number;

  /** ชื่อปุ่มก่อนหน้า ค่าเริ่มต้น `Previous` ซ่อนข้อความบนจอแคบแต่ชื่อยังอยู่เสมอ */
  previousLabel?: string;

  /** ชื่อปุ่มถัดไป ค่าเริ่มต้น `Next` ซ่อนข้อความบนจอแคบแต่ชื่อยังอยู่เสมอ */
  nextLabel?: string;

  /** คลาสเพิ่มของ `<nav>` ใช้ปรับการจัดวางในกรอบแม่ เช่นชิดซ้ายแทนกึ่งกลาง */
  className?: string;
}

/**
 * ทางเลือกของการเปลี่ยนหน้า ต้องมีอย่างน้อยหนึ่งอย่าง
 * ชนิดข้อมูลเป็นคนบังคับ ไม่ใช่คำเตือนตอนรัน เพราะเป็นเรื่องที่ต้องตัดสินตอนเขียนโค้ด
 */
export type PaginationNavigationProps =
  | {
      /** คืนที่อยู่เว็บของหน้าที่ N ส่งแล้วได้ `<a href>` */
      href: (page: number) => string;
      /** ส่งคู่กับ `href` ได้ คลิกธรรมดาจะเรียกตัวนี้แทนการให้เบราว์เซอร์โหลดหน้าใหม่ */
      onPageChange?: (page: number) => void;
    }
  | {
      href?: undefined;
      /** ไม่ส่ง `href` คือได้ `<button>` แล้วตัวนี้จำเป็น */
      onPageChange: (page: number) => void;
    };

export type PaginationProps = PaginationBaseProps & PaginationNavigationProps;

/** คลิกที่ควรปล่อยให้เบราว์เซอร์จัดการเอง เช่นเปิดแท็บใหม่หรือเปิดหน้าต่างใหม่ */
function isBrowserOwnedClick(event: React.MouseEvent<HTMLAnchorElement>): boolean {
  if (event.defaultPrevented) return true;
  if (event.button !== 0) return true;
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
}

/**
 * @example
 * // หลังบ้านที่สถานะอยู่บนที่อยู่เว็บ เป็นลิงก์จริง แชร์และเปิดแท็บใหม่ได้
 * <Pagination
 *   label="ตัวแบ่งหน้ารายการข่าว"
 *   currentPage={3}
 *   totalPages={48}
 *   href={(page) => `/admin/news?page=${page}`}
 * />
 *
 * @example
 * // แดชบอร์ดที่สถานะอยู่ในหน่วยความจำของแอป ไม่มีที่อยู่เว็บจริงให้ชี้
 * <Pagination
 *   label="ตัวแบ่งหน้าตารางยอดขาย"
 *   currentPage={page}
 *   totalPages={totalPages}
 *   size="sm"
 *   onPageChange={setPage}
 * />
 *
 * @example
 * // ลิงก์จริงบวกการเปลี่ยนหน้าแบบไม่โหลดหน้าใหม่ ได้ทั้งการแชร์และความลื่น
 * <Pagination
 *   label="ตัวแบ่งหน้าผลการค้นหา"
 *   currentPage={page}
 *   totalPages={totalPages}
 *   href={(target) => `/search?q=${query}&page=${target}`}
 *   onPageChange={(target) => {
 *     router.push(`/search?q=${query}&page=${target}`);
 *     focusResultsHeading(headingRef.current);
 *   }}
 * />
 */
export function Pagination({
  currentPage,
  totalPages,
  label,
  size = 'md',
  siblingCount = DEFAULT_SIBLING_COUNT,
  boundaryCount = DEFAULT_BOUNDARY_COUNT,
  previousLabel = DEFAULT_PREVIOUS_LABEL,
  nextLabel = DEFAULT_NEXT_LABEL,
  className,
  href,
  onPageChange,
}: PaginationProps) {
  const reading = readPagination({ currentPage, totalPages, siblingCount, boundaryCount });

  if (!href && !onPageChange) {
    warn('ต้องส่ง href หรือ onPageChange อย่างน้อยหนึ่งอย่าง ไม่งั้นแถบแบ่งหน้าจะกดไม่ได้');
  }

  if (!reading.usable) return null;

  /**
   * ของที่กดได้หนึ่งชิ้น เป็น `<a href>` เมื่อส่ง `href` และเป็น `<button>` เมื่อไม่ส่ง
   * ชิ้นที่ปิดใช้งานไม่รับโฟกัสทั้งสองแบบ เพื่อให้พฤติกรรมของลิงก์กับปุ่มตรงกัน
   */
  const renderControl = (options: {
    page: number;
    children: React.ReactNode;
    className: string;
    /** หน้าปัจจุบัน มีได้ชิ้นเดียวต่อชุด และสไตล์ผูกกับ `[aria-current="page"]` */
    current?: boolean;
    /** สุดทางแล้ว ปิดใช้งาน ไม่ใช่ซ่อน */
    disabled?: boolean;
    /** ความสัมพันธ์ของลิงก์ ใช้กับปุ่มก่อนหน้าและถัดไปตามแนวทาง GOV.UK */
    rel?: 'prev' | 'next';
  }): React.ReactElement => {
    const { page, children, className: itemClassName, current, disabled, rel } = options;

    if (href) {
      if (disabled) {
        /*
         * ลิงก์ที่ปิดใช้งานต้องไม่มี href เพราะลิงก์ที่ไม่มีปลายทางคือลิงก์ที่หลอกผู้ใช้
         * ยังคง role link ไว้เพื่อให้โปรแกรมอ่านหน้าจอยังบอกว่าเป็นลิงก์ที่ใช้ไม่ได้
         * และถอดออกจากลำดับ tab ให้ตรงกับ `<button disabled>` ของโหมดปุ่ม
         */
        return (
          <a className={itemClassName} role="link" aria-disabled="true" tabIndex={-1} rel={rel}>
            {children}
          </a>
        );
      }
      return (
        <a
          className={itemClassName}
          href={href(page)}
          aria-current={current ? 'page' : undefined}
          rel={rel}
          onClick={(event) => {
            // หน้าปัจจุบันไม่ต้องเปลี่ยนไปไหน ปล่อยให้ลิงก์ทำงานตามปกติถ้าผู้ใช้ยังกด
            if (current || !onPageChange) return;
            if (isBrowserOwnedClick(event)) return;
            event.preventDefault();
            onPageChange(page);
          }}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        type="button"
        className={itemClassName}
        disabled={disabled}
        aria-current={current ? 'page' : undefined}
        onClick={current ? undefined : () => onPageChange?.(page)}
      >
        {children}
      </button>
    );
  };

  return (
    <nav
      className={joinClassNames(styles.root, SIZE_CLASS[size], className)}
      aria-label={label}
    >
      <ul className={styles.list}>
        <li className={joinClassNames(styles.item, styles.previous)}>
          {renderControl({
            page: reading.currentPage - 1,
            className: joinClassNames(styles.control, styles.arrow),
            disabled: !reading.hasPrevious,
            rel: 'prev',
            children: (
              <>
                <Icon name="chevron-left" size="100%" className={styles.icon} />
                {/* ข้อความเป็นที่มาของชื่อ ซ่อนด้วยสูตรที่ยังอยู่ในต้นไม้การเข้าถึง ชื่อจึงไม่หายบนจอแคบ */}
                <span className={styles.arrowText}>{previousLabel}</span>
              </>
            ),
          })}
        </li>

        {reading.items.map((item) =>
          item.kind === 'ellipsis' ? (
            /*
             * จุดไข่ปลาไม่ใช่ปลายทาง ไม่พาผู้ใช้ไปไหน การอ่านว่า จุด จุด จุด คือเสียงรบกวนล้วน
             * ตั้ง aria-hidden ที่ `<li>` เพื่อให้จำนวนรายการที่โปรแกรมอ่านหน้าจอนับได้ตรงกับของที่กดได้จริง
             * ข้อมูลที่จุดไข่ปลาสื่อด้วยตาเดินทางผ่านชื่อของ `<nav>` กับข้อความบอกตำแหน่งแทน
             */
            <li
              key={`ellipsis-${item.side}`}
              className={joinClassNames(styles.item, styles.ellipsisItem)}
              aria-hidden="true"
            >
              <span className={styles.ellipsis}>…</span>
            </li>
          ) : (
            <li key={`page-${item.page}`} className={styles.item}>
              {renderControl({
                page: item.page,
                className: joinClassNames(styles.control, styles.number),
                current: item.page === reading.currentPage,
                children: item.page.toLocaleString('th-TH'),
              })}
            </li>
          ),
        )}

        <li className={joinClassNames(styles.item, styles.next)}>
          {renderControl({
            page: reading.currentPage + 1,
            className: joinClassNames(styles.control, styles.arrow),
            disabled: !reading.hasNext,
            rel: 'next',
            children: (
              <>
                <span className={styles.arrowText}>{nextLabel}</span>
                <Icon name="chevron-right" size="100%" className={styles.icon} />
              </>
            ),
          })}
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
