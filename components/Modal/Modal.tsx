/**
 * Modal Nation Design System
 *
 * กล่องโต้ตอบกลางจอที่เปิดทับทั้งหน้า ให้ผู้ใช้ดูหรือตัดสินใจเรื่องเดียวให้จบก่อนกลับไปทำต่อ
 * มีฉากหลังมืดกั้น หน้าข้างหลังกดไม่ได้จนกว่าจะปิด
 * ตรงกับ component set `modal` ในไฟล์ออกแบบหน้า 30 Modal (แกน size กับ header)
 * สเปคขนาดทั้งหมดอยู่ที่ tokens/scale/modal.mjs ไม่มีค่าขนาดใดอยู่ในไฟล์นี้
 * งานวิจัย docs/research/modal-component.md
 *
 * ⚠️ ควบคุมจากข้างนอกเท่านั้น (controlled) ส่ง `open` กับ `onClose` เสมอ
 *    Esc คลิกฉากหลัง และปุ่มปิด เรียก `onClose` อย่างเดียว ไม่ปิดเอง
 *    คนเรียกเป็นคนตั้ง `open` เป็น false แล้วกล่องจึงเล่นภาพขาออกและปิดจริง
 *
 * ⚠️ ใช้ <dialog> ของเบราว์เซอร์ เปิดด้วย showModal()
 *    จึงได้ top layer, inert ของหน้าข้างหลัง, กักโฟกัส และ aria-modal มาฟรี ไม่ต้องเขียนเอง
 *    Esc จับที่เหตุการณ์ cancel แล้ว preventDefault เพื่อให้ภาพขาออกได้เล่น
 *    ถ้าเบราว์เซอร์ปิดกล่องเองโดยไม่ผ่านเรา (Chrome ยอมให้กด Esc ซ้ำแล้วปิดทันที) เหตุการณ์ close จะเรียก onClose ให้
 *
 * ⚠️ ชื่อของกล่องต้องมีเสมอ บังคับด้วยชนิดข้อมูล
 *    header เปิด (ค่าเริ่มต้น) ต้องมี `title` แล้ว aria-labelledby ชี้ไปที่หัวข้อ
 *    header={false} (โหมด bare) ไม่มีหัวข้อให้ชี้ ต้องส่ง `aria-label` แทน
 *    `description` ผูกด้วย aria-describedby และแสดงเฉพาะเมื่อมี header
 *
 * ⚠️ ล็อกการเลื่อนหน้าด้วยวิธีที่ iOS ไม่หลุด คือตั้ง body เป็น position fixed กับ top ติดลบเท่าระยะที่เลื่อนไว้
 *    แล้วคืนตำแหน่งตอนปิด นับจำนวนกล่องที่เปิดอยู่ จึงซ้อนกันได้โดยไม่ปลดล็อกก่อนเวลา
 *
 * ⚠️ ซ้อนได้แค่ชั้นเดียว คือกล่องยืนยันขนาด sm หนึ่งใบบนกล่องที่เปิดอยู่ ห้ามซ้อนมากกว่านั้น
 *    โค้ดไม่ได้กันไว้ เป็นกติกาการใช้งาน
 *
 * ⚠️ โฟกัส ตอนเปิดไปที่ `initialFocusRef` ถ้ามี ไม่มีก็ไปที่ของชิ้นแรกที่โฟกัสได้ ตอนปิดคืนไปที่ของที่โฟกัสอยู่ก่อนเปิด
 *
 * ⚠️ ขาออกใช้ data-closing แล้วรอ animationend ก่อนเรียก close() (ดูข้อ 6 ใน Modal.base.css ว่าทำไมไม่ใช้ @starting-style)
 *    ถ้าผู้ใช้ตั้ง prefers-reduced-motion ไม่มีภาพเคลื่อนไหว ปิดทันที
 *
 * ⚠️ ปุ่มปิด header เปิดเป็น IconButton neutral tertiary md semi-rounded
 *    โหมด bare เป็น IconButton alpha circular sm ลอยมุมบนขวา ห่างจากขอบใน 8 (s1-lg) ให้ทับรูปเต็มความกว้างที่หัว body ได้
 */
import React, { useCallback, useEffect, useId, useRef } from 'react';
import { IconButton } from '../IconButton';
import { MODAL_OPEN_EVENT } from '../Toast/Toast';
import styles from './Modal.module.css';

export type ModalSize = 'sm' | 'md' | 'lg';

interface ModalBaseProps
  extends Omit<
    React.DialogHTMLAttributes<HTMLDialogElement>,
    'title' | 'open' | 'onClose' | 'onCancel' | 'children' | 'aria-label'
  > {
  /** เปิดหรือปิด (controlled) */
  open: boolean;
  /** เรียกเมื่อผู้ใช้ขอปิด (Esc คลิกฉากหลัง หรือปุ่มปิด) คนเรียกต้องตั้ง open เป็น false เอง */
  onClose: () => void;
  /** ขนาด ตรงกับแกน size ใน Figma ค่าเริ่มต้น md */
  size?: ModalSize;
  /** ข้อความรองใต้หัวข้อ มีค่า = เปิด show-description ใน Figma แสดงเฉพาะเมื่อมี header */
  description?: React.ReactNode;
  /** แสดงปุ่มปิด ตรงกับ show-close ใน Figma ค่าเริ่มต้น true */
  showClose?: boolean;
  /** ชื่อปุ่มปิดสำหรับ screen reader ค่าเริ่มต้น "ปิด" */
  closeLabel?: string;
  /** ส่วนท้าย มักเป็นปุ่มการกระทำ มีค่า = เปิด show-footer ใน Figma (slot footer) */
  footer?: React.ReactNode;
  /** เนื้อหา (slot body) ส่วนเดียวที่เลื่อนได้เมื่อสูงเกินจอ */
  children?: React.ReactNode;
  /** คลิกฉากหลังแล้วปิด ค่าเริ่มต้น true */
  closeOnBackdrop?: boolean;
  /** ของที่ได้โฟกัสตอนเปิด ไม่ส่งก็ไปที่ของชิ้นแรกที่โฟกัสได้ */
  initialFocusRef?: React.RefObject<HTMLElement | null>;
  /**
   * วาดกล่องค้างไว้ในหน้าตรงที่วาง ไม่มีฉากหลัง ไม่ล็อกการเลื่อน ไม่ย้ายโฟกัส และไม่มีภาพเคลื่อนไหว
   * ใช้กับหน้าเอกสารหรือภาพตัวอย่างเท่านั้น ห้ามใช้ในหน้าจริง เพราะไม่กั้นหน้าข้างหลังและไม่กักโฟกัส ค่าเริ่มต้น false
   */
  still?: boolean;
}

interface ModalWithHeader {
  /** มีหัว (หัวข้อ คำอธิบาย ปุ่มปิด) ตรงกับแกน header ใน Figma ค่าเริ่มต้น true */
  header?: true;
  /** หัวข้อ บังคับเมื่อมี header ใช้เป็นชื่อของกล่องผ่าน aria-labelledby */
  title: React.ReactNode;
  /** ชื่อของกล่องสำหรับ screen reader ไม่ต้องส่งเมื่อมี title */
  'aria-label'?: string;
}

interface ModalBare {
  /** โหมด bare ไม่มีหัว ปุ่มปิดวงกลมลอยมุมบนขวา */
  header: false;
  /** โหมด bare ไม่มีหัวข้อ */
  title?: never;
  /** โหมด bare ไม่แสดงคำอธิบาย */
  description?: never;
  /** บังคับในโหมด bare เพราะไม่มีหัวข้อให้ชี้ */
  'aria-label': string;
}

export type ModalProps = ModalBaseProps & (ModalWithHeader | ModalBare);

// ── ล็อกการเลื่อนแบบนับจำนวน (ซ้อนกล่องได้) ─────────────────────────────
let lockCount = 0;
let saved: { y: number; style: Partial<CSSStyleDeclaration> } | null = null;

function lockScroll() {
  if (typeof document === 'undefined') return;
  lockCount += 1;
  if (lockCount > 1) return;
  const b = document.body.style;
  const y = window.scrollY;
  const scrollbar = window.innerWidth - document.documentElement.clientWidth;
  saved = {
    y,
    style: { position: b.position, top: b.top, left: b.left, right: b.right, overflow: b.overflow, paddingRight: b.paddingRight },
  };
  b.position = 'fixed';
  b.top = `-${y}px`;
  b.left = '0';
  b.right = '0';
  b.overflow = 'hidden';
  // แถบเลื่อนหายตอนล็อก ชดเชยความกว้างไว้ไม่ให้หน้าข้างหลังขยับ
  if (scrollbar > 0) b.paddingRight = `${scrollbar}px`;
}

function unlockScroll() {
  if (typeof document === 'undefined' || lockCount === 0) return;
  lockCount -= 1;
  if (lockCount > 0 || !saved) return;
  Object.assign(document.body.style, saved.style);
  window.scrollTo({ top: saved.y, left: 0, behavior: 'instant' });
  saved = null;
}

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), [contenteditable="true"]';

function cx(...names: Array<string | false | undefined>) {
  return names.filter(Boolean).join(' ');
}

/**
 * @example
 * <Modal open={open} onClose={() => setOpen(false)} title="ลบข่าวนี้" size="sm"
 *   footer={<><Button family="neutral" hierarchy="secondary" onClick={...}>ยกเลิก</Button><Button family="error">ลบ</Button></>}>
 *   ลบแล้วกู้คืนไม่ได้
 * </Modal>
 */
export function Modal(props: ModalProps) {
  const {
    open,
    onClose,
    size = 'md',
    header = true,
    title,
    description,
    showClose = true,
    closeLabel = 'ปิด',
    footer,
    children,
    closeOnBackdrop = true,
    initialFocusRef,
    still = false,
    className,
    'aria-label': ariaLabel,
    ...rest
  } = props;

  const ref = useRef<HTMLDialogElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const lockedRef = useRef(false);
  const closingRef = useRef<{ cancel: () => void } | null>(null);
  const openRef = useRef(open);
  const onCloseRef = useRef(onClose);
  const downOnBackdrop = useRef(false);
  openRef.current = open;
  onCloseRef.current = onClose;

  const autoId = useId();
  const titleId = `${autoId}-title`;
  const descId = `${autoId}-desc`;
  const hasTitle = header && title != null;
  const hasDesc = header && description != null;

  if (process.env.NODE_ENV !== 'production') {
    if (!hasTitle && !ariaLabel) {
      console.warn('Modal: ต้องมี title (เมื่อมี header) หรือ aria-label (เมื่อ header={false}) ไม่งั้นกล่องไม่มีชื่อ');
    }
    if (!header && (title != null || description != null)) {
      console.warn('Modal: header={false} ไม่แสดง title และ description ใช้ aria-label แทน');
    }
  }

  // ปิดจริง: close() ปลดล็อกการเลื่อน คืนโฟกัส ทำซ้ำได้ไม่พัง
  const finishClose = useCallback(() => {
    const dialog = ref.current;
    closingRef.current = null;
    if (dialog) {
      dialog.removeAttribute('data-closing');
      if (dialog.open) dialog.close();
    }
    if (lockedRef.current) {
      lockedRef.current = false;
      unlockScroll();
    }
    const back = restoreRef.current;
    restoreRef.current = null;
    if (back && back.isConnected) back.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    const dialog = ref.current;
    // โหมดวางค้างใช้ attribute open ของ <dialog> ตรง ๆ ไม่เปิดด้วย showModal() จึงไม่ต้องจัดการเปิดปิด
    if (!dialog || still) return;

    if (open) {
      // เปิดซ้ำระหว่างกำลังเล่นขาออก ยกเลิกขาออกแล้วอยู่ต่อ
      if (closingRef.current) {
        closingRef.current.cancel();
        closingRef.current = null;
        dialog.removeAttribute('data-closing');
        return;
      }
      if (dialog.open) return;
      restoreRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      dialog.showModal();
      // ให้ ToastStack ยกตัวขึ้นไปเหนือกล่องนี้ใน top layer ดู MODAL_OPEN_EVENT ใน Toast.tsx
      window.dispatchEvent(new CustomEvent(MODAL_OPEN_EVENT));
      if (!lockedRef.current) {
        lockedRef.current = true;
        lockScroll();
      }
      const target = initialFocusRef?.current ?? dialog.querySelector<HTMLElement>(FOCUSABLE);
      target?.focus();
      return;
    }

    if (!dialog.open || closingRef.current) return;
    dialog.setAttribute('data-closing', '');
    const cs = getComputedStyle(dialog);
    const ms = (parseFloat(cs.animationDuration) || 0) * (cs.animationDuration.endsWith('ms') ? 1 : 1000);
    if (cs.animationName === 'none' || ms === 0) {
      finishClose();
      return;
    }
    const onEnd = (e: AnimationEvent) => {
      if (e.target === dialog) done();
    };
    // กันไว้เผื่อ animationend ไม่มา (แท็บซ่อนอยู่ หรือเบราว์เซอร์ข้ามภาพ)
    const timer = window.setTimeout(() => done(), ms * 2);
    function cancel() {
      window.clearTimeout(timer);
      dialog!.removeEventListener('animationend', onEnd);
    }
    function done() {
      cancel();
      finishClose();
    }
    dialog.addEventListener('animationend', onEnd);
    closingRef.current = { cancel };
  }, [open, finishClose, initialFocusRef, still]);

  // Esc กับการปิดที่ไม่ได้มาจากเรา
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const onCancel = (e: Event) => {
      e.preventDefault();
      onCloseRef.current();
    };
    const onNativeClose = () => {
      // เบราว์เซอร์ปิดเองโดยที่ open ยังเป็น true เก็บกวาดแล้วแจ้งคนเรียก
      if (closingRef.current) return;
      if (lockedRef.current || restoreRef.current) finishClose();
      if (openRef.current) onCloseRef.current();
    };
    dialog.addEventListener('cancel', onCancel);
    dialog.addEventListener('close', onNativeClose);
    return () => {
      dialog.removeEventListener('cancel', onCancel);
      dialog.removeEventListener('close', onNativeClose);
    };
  }, [finishClose]);

  // ถอด component ทิ้งขณะเปิดอยู่ ต้องปลดล็อกการเลื่อนด้วย
  useEffect(
    () => () => {
      closingRef.current?.cancel();
      closingRef.current = null;
      if (lockedRef.current) {
        lockedRef.current = false;
        unlockScroll();
      }
      const dialog = ref.current;
      if (dialog?.open) dialog.close();
    },
    [],
  );

  // คลิกฉากหลัง: เป้าหมายคือ <dialog> เอง และจุดคลิกอยู่นอกกรอบกล่อง
  // ต้องกดลงที่ฉากหลังด้วย กันกรณีลากเลือกข้อความจากในกล่องแล้วปล่อยข้างนอก
  const isOutside = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = ref.current;
    if (!dialog || e.target !== dialog) return false;
    const r = dialog.getBoundingClientRect();
    return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
  };

  return (
    <dialog
      {...rest}
      ref={ref}
      open={still || undefined}
      className={cx(styles.dialog, styles[size], !header && styles.bare, still && styles.still, className)}
      aria-label={ariaLabel}
      aria-labelledby={hasTitle && !ariaLabel ? titleId : undefined}
      aria-describedby={hasDesc ? descId : undefined}
      onPointerDown={(e) => {
        downOnBackdrop.current = isOutside(e);
        rest.onPointerDown?.(e);
      }}
      onClick={(e) => {
        if (closeOnBackdrop && downOnBackdrop.current && isOutside(e)) onClose();
        downOnBackdrop.current = false;
        rest.onClick?.(e);
      }}
    >
      {header ? (
        <div className={styles.header}>
          <div className={styles.titleGroup}>
            <h2 id={titleId} className={cx(styles.title, 'ntg-typography-title-lg')}>
              {title}
            </h2>
            {hasDesc && (
              <p id={descId} className={cx(styles.description, 'ntg-typography-body-md')}>
                {description}
              </p>
            )}
          </div>
          {showClose && (
            <IconButton
              className={styles.close}
              icon="close"
              label={closeLabel}
              family="neutral"
              hierarchy="tertiary"
              size="md"
              shape="semi-rounded"
              onClick={onClose}
            />
          )}
        </div>
      ) : (
        showClose && (
          <IconButton
            className={styles.floatingClose}
            icon="close"
            label={closeLabel}
            family="alpha"
            size="sm"
            shape="circular"
            onClick={onClose}
          />
        )
      )}
      {children != null && <div className={cx(styles.body, 'ntg-typography-body-md')}>{children}</div>}
      {footer != null && <div className={styles.footer}>{footer}</div>}
    </dialog>
  );
}

export default Modal;
