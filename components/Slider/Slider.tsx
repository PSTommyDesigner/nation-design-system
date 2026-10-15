/**
 * Slider Nation Design System
 *
 * แถบเลื่อนเลือกค่าตัวเลข ตรงกับ component set ในไฟล์ออกแบบหน้า 17 Sliders
 * (`slider` 10 แบบ · `range-slider` 10 แบบ · `slider-handle` 25 แบบ)
 *
 * ⚠️ ตัวเดียวทำได้ทั้งสองแบบ ดูจากรูปของค่าแบบ Polaris (ตัดสิน 2026-09-24)
 *      value={40}        → แบบค่าเดียว มีปุ่มจับหนึ่งอัน
 *      value={[20, 60]}  → แบบช่วง มีปุ่มจับสองอัน
 *    ฝั่งไฟล์ออกแบบแยกเป็นสองชุดเพราะแผง Assets เห็นแค่ชื่อ แต่กลไกเหมือนกันทุกอย่าง
 *
 * ⚠️ โครงสองชั้นแบบเดียวกับสวิตช์และช่องติ๊ก
 *      ชั้นภาพ  ราง กับ ปุ่มจับ มีสเกลของตัวเอง
 *      ชั้นแถว  อ้างสเกลความสูงตัวควบคุมกลาง เป็นพื้นที่แตะจริง
 *    เกณฑ์ WCAG 2.5.8 นับแถบเลื่อนทั้งตัวเป็นเป้าเดียว และ 2.5.7 ต้องแตะที่รางได้
 *
 * ⚠️ สถานะกดบอกด้วยสีอย่างเดียว ห้ามขยายหรือหดปุ่มจับ (ตรงกับที่ตัดสินไว้กับสวิตช์)
 *
 * ค่าทั้งหมดมาจาก design tokens ผ่าน CSS variables ไม่มีค่า hard-code
 */
import React, { useId, useRef } from 'react';
import styles from './Slider.module.css';

export type SliderSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** ค่าเดียวหรือคู่ต่ำสุดสูงสุด รูปของค่าเป็นตัวบอกว่าเป็นแถบเลื่อนชนิดไหน */
export type SliderValue = number | readonly [number, number];

export interface SliderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
  /** ค่าปัจจุบัน ตัวเลขเดี่ยวคือแบบค่าเดียว คู่ตัวเลขคือแบบช่วง */
  value: SliderValue;
  onValueChange?: (value: SliderValue) => void;
  min?: number;
  max?: number;
  /** ก้าวเล็ก ใช้กับลูกศรซ้ายขวาขึ้นลง */
  step?: number;
  /** ก้าวใหญ่ ใช้กับ Page Up และ Page Down ค่าเริ่มต้นคือสิบขั้น */
  largeStep?: number;
  size?: SliderSize;
  disabled?: boolean;
  /** ชื่อที่โปรแกรมอ่านหน้าจอจะอ่าน จำเป็นเมื่อไม่มีป้ายกำกับที่มองเห็น */
  label?: string;
  /** ชื่อของปุ่มจับแต่ละอันในแบบช่วง เช่น ['ราคาต่ำสุด', 'ราคาสูงสุด'] */
  rangeLabels?: readonly [string, string];
  /** ข้อความที่อ่านแทนตัวเลขเปล่า เช่น '1,200 บาท' */
  formatValue?: (value: number) => string;
  /** ป้ายค่าเหนือปุ่มจับ ตรงกับคุณสมบัติ `value-tooltip` ในไฟล์ออกแบบ */
  showValueTooltip?: boolean;
  /** ป้ายค่าต่ำสุดสูงสุดใต้ราง ตรงกับคุณสมบัติ `min-max-label` */
  showMinMaxLabel?: boolean;
  /**
   * บังคับความสูงแถวให้ถึงพื้นที่แตะขั้นต่ำ ใช้กับจอสัมผัส
   * อ้าง `--ntg-slider-row-height-touch-*` ไม่ใช่ขนาดภาพ
   */
  touchTarget?: boolean;
}

const SIZE_CLASS: Record<SliderSize, string> = {
  xs: styles.xs, sm: styles.sm, md: styles.md, lg: styles.lg, xl: styles.xl,
};

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const pct = (v: number, min: number, max: number) =>
  max === min ? 0 : ((clamp(v, min, max) - min) / (max - min)) * 100;

/**
 * @example
 * <Slider label="ความดัง" value={v} onValueChange={setV} />
 * <Slider label="ช่วงราคา" value={[lo, hi]} onValueChange={setRange} showValueTooltip showMinMaxLabel />
 * <Slider label="ระยะทาง" value={v} size="lg" formatValue={n => `${n} กม.`} />
 */
export function Slider({
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  largeStep,
  size = 'md',
  disabled = false,
  label,
  rangeLabels,
  formatValue,
  showValueTooltip = false,
  showMinMaxLabel = false,
  touchTarget = false,
  className,
  ...rest
}: SliderProps) {
  const autoId = useId();
  const trackRef = useRef<HTMLSpanElement>(null);
  const isRange = Array.isArray(value);
  const values: number[] = isRange ? [...(value as readonly [number, number])] : [value as number];
  // ก้าวใหญ่ตามค่าที่ Radix ใช้ คือสิบขั้น เมื่อไม่ได้ระบุเอง
  const big = largeStep ?? step * 10;

  const emit = (next: number[]) => {
    if (!onValueChange) return;
    onValueChange(isRange ? ([next[0], next[1]] as const) : next[0]);
  };

  const moveTo = (index: number, raw: number) => {
    if (disabled) return;
    // ปุ่มจับสองอันห้ามสลับข้ามกัน ขอบเขตของแต่ละอันคือปุ่มจับอีกอัน
    const lo = index === 1 ? values[0] : min;
    const hi = index === 0 && isRange ? values[1] : max;
    const snapped = Math.round(raw / step) * step;
    const next = [...values];
    next[index] = clamp(snapped, lo, hi);
    if (next[index] !== values[index]) emit(next);
  };

  // แป้นพิมพ์ตามมาตรฐาน WAI-ARIA Authoring Practices
  const onKeyDown = (index: number) => (e: React.KeyboardEvent) => {
    const current = values[index];
    let next: number | null = null;
    switch (e.key) {
      case 'ArrowRight': case 'ArrowUp': next = current + step; break;
      case 'ArrowLeft': case 'ArrowDown': next = current - step; break;
      case 'PageUp': next = current + big; break;
      case 'PageDown': next = current - big; break;
      case 'Home': next = min; break;
      case 'End': next = max; break;
      default: return;
    }
    e.preventDefault();
    moveTo(index, next);
  };

  // ลากหรือคลิกที่ราง ปุ่มจับที่ใกล้ที่สุดเป็นตัวขยับ
  const onPointerDown = (e: React.PointerEvent) => {
    if (disabled || !trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const toValue = (clientX: number) =>
      min + ((clamp(clientX, rect.left, rect.right) - rect.left) / rect.width) * (max - min);
    const target = toValue(e.clientX);
    const index = isRange
      ? (Math.abs(target - values[0]) <= Math.abs(target - values[1]) ? 0 : 1)
      : 0;
    moveTo(index, target);
    const onMove = (ev: PointerEvent) => moveTo(index, toValue(ev.clientX));
    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  };

  const classes = [
    styles.root,
    SIZE_CLASS[size],
    touchTarget ? styles.touchTarget : undefined,
    className,
  ].filter(Boolean).join(' ');

  const startPct = isRange ? pct(values[0], min, max) : 0;
  const endPct = pct(values[isRange ? 1 : 0], min, max);
  const text = (v: number) => (formatValue ? formatValue(v) : String(v));

  return (
    <div className={classes} data-disabled={disabled ? 'true' : undefined} {...rest}>
      <div className={styles.row}>
        <span
          ref={trackRef}
          className={styles.track}
          onPointerDown={onPointerDown}
        >
          <span
            className={styles.fill}
            style={{ insetInlineStart: `${startPct}%`, width: `${endPct - startPct}%` }}
          />
          {values.map((v, i) => (
            <span
              key={i}
              className={styles.handle}
              style={{ insetInlineStart: `${pct(v, min, max)}%` }}
              role="slider"
              tabIndex={disabled ? -1 : 0}
              aria-label={isRange ? rangeLabels?.[i] ?? label : label}
              aria-valuemin={i === 1 ? values[0] : min}
              aria-valuemax={i === 0 && isRange ? values[1] : max}
              aria-valuenow={v}
              aria-valuetext={formatValue ? formatValue(v) : undefined}
              aria-disabled={disabled || undefined}
              aria-orientation="horizontal"
              onKeyDown={onKeyDown(i)}
              id={`${autoId}-handle-${i}`}
            >
              {showValueTooltip && <span className={styles.tooltip}>{text(v)}</span>}
            </span>
          ))}
        </span>
      </div>
      {showMinMaxLabel && (
        <div className={styles.minMax} aria-hidden="true">
          <span>{text(min)}</span>
          <span>{text(max)}</span>
        </div>
      )}
    </div>
  );
}

export default Slider;
