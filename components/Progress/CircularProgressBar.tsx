/**
 * CircularProgressBar Nation Design System
 *
 * วงแหวนเต็มวงบอกความคืบหน้า ใช้เมื่อพื้นที่แคบจนวางแถบแนวนอนไม่ได้
 * ตรงกับ component set `circular-progress-bar` ในไฟล์ออกแบบหน้า 23 Progress Bars
 * สเปคขนาดทั้งหมดอยู่ที่ tokens/scale/progress.mjs ไม่มีค่าขนาดใดอยู่ในไฟล์นี้
 *
 * ⚠️ ตัวเติมเริ่มที่ 12 นาฬิกาแล้วกวาดตามเข็ม
 *    `<circle>` ของ SVG เริ่มเส้นทางที่ 3 นาฬิกาและวาดตามเข็ม
 *    จึงหมุนทั้งวง -90 องศาเพื่อย้ายจุดเริ่มขึ้นไปที่ 12 นาฬิกา การหมุนไม่เปลี่ยนทิศการวาด
 *
 * ⚠️ รัศมีกับความหนามาจาก CSS ไม่ใช่จากฝั่ง JavaScript
 *    ค่าจริงอยู่ใน CSS variable ซึ่ง JavaScript อ่านตอน render ไม่ได้
 *    ถ้าคำนวณฝั่ง JavaScript จะต้องพิมพ์ตัวเลขขนาดลงโค้ด ซึ่งผิดกฎของระบบ
 *    ไฟล์นี้จึงตั้ง `pathLength` ให้เส้นรอบวงเป็น 100 หน่วยสมมติ
 *    แล้วความยาวเส้นประกับร้อยละก็เป็นตัวเลขเดียวกันพอดี โดยไม่ต้องรู้รัศมีจริง
 *
 * ⚠️ ป้ายตัวเลขอยู่ในกล่อง role progressbar จึงต้องตั้ง aria-hidden
 *    มาตรฐาน ARIA กำหนดกฎ Children Presentational True กับ role นี้
 *    แปลว่าข้อความที่อยู่ข้างในกล่องโปรแกรมอ่านหน้าจอไม่อ่าน ต่อให้ไม่ตั้ง aria-hidden ก็ตาม
 *    ค่าจึงเดินทางผ่าน `aria-valuenow` เท่านั้น ถ้าตัวเลขอย่างเดียวสื่อความไม่ครบให้ส่ง `valueText`
 *    **ห้ามย้ายข้อมูลที่ขาดไม่ได้เข้าไปไว้ในป้าย** เพราะผู้ใช้โปรแกรมอ่านหน้าจอจะไม่ได้ยิน
 *
 * ⚠️ ไม่ส่ง `value` คือแบบไม่รู้ค่า ส่วนโค้งความยาวคงที่จะหมุนวน
 *    และ `aria-valuenow` จะถูกตัดทิ้ง ไม่ใช่ใส่ศูนย์
 *
 * ค่าทั้งหมดมาจาก design tokens ผ่าน CSS variables ไม่มีค่า hard-code
 */
import React from 'react';
import styles from './Progress.module.css';
import {
  PROGRESS_GEOMETRY,
  joinClassNames,
  progressLabelText,
  readProgress,
  type ProgressCommonProps,
  type ProgressSize,
} from './types';

const SIZE_CLASS: Record<ProgressSize, string> = {
  xs: styles.xs,
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
  xl: styles.xl,
};

export interface CircularProgressBarProps extends ProgressCommonProps {
  /** ขนาด 5 ขั้น ค่าเริ่มต้น `md` */
  size?: ProgressSize;
}

/**
 * @example
 * // ความคืบหน้าในการ์ดที่พื้นที่แนวนอนแคบ
 * <CircularProgressBar label="ความคืบหน้าการซิงก์" value={74} />
 *
 * @example
 * // ไม่รู้ว่าจะเสร็จเมื่อไหร่ ส่วนโค้งจะหมุนวน
 * <CircularProgressBar label="กำลังโหลดข้อมูล" size="sm" />
 */
export function CircularProgressBar({
  label,
  value,
  max,
  size = 'md',
  showLabel = true,
  valueText,
  id,
  className,
}: CircularProgressBarProps) {
  const reading = readProgress(value, max);
  const { indeterminate, percent, valueNow } = reading;

  /*
   * ความยาวเส้นประคิดบนเส้นรอบวงสมมติ 100 หน่วย
   * ลวดลายคือ ขีดยาวเต็มวง ตามด้วยช่องว่างเต็มวง แล้วเลื่อนลวดลายถอยหลังเท่ากับส่วนที่ไม่เติม
   * ทำให้เห็นขีดตั้งแต่จุดเริ่มไปจนถึงตำแหน่งของค่าพอดี
   */
  const { pathLength, indeterminateSweep } = PROGRESS_GEOMETRY;
  const dashArray = indeterminate
    ? `${indeterminateSweep} ${pathLength}`
    : `${pathLength} ${pathLength}`;
  const dashOffset = indeterminate ? 0 : pathLength - percent;

  return (
    <div
      id={id}
      role="progressbar"
      className={joinClassNames(styles.circular, SIZE_CLASS[size], className)}
      aria-label={label}
      aria-valuemin={indeterminate ? undefined : 0}
      aria-valuemax={indeterminate ? undefined : reading.max}
      aria-valuenow={indeterminate ? undefined : valueNow}
      aria-valuetext={indeterminate ? undefined : valueText}
    >
      <svg className={styles.circularSvg} aria-hidden="true" focusable="false">
        <circle
          className={joinClassNames(styles.ring, styles.ringTrack, styles.circularRing)}
          pathLength={pathLength}
        />
        <circle
          className={joinClassNames(
            styles.ring,
            styles.ringFill,
            styles.circularRing,
            indeterminate && styles.circularIndeterminate,
            !indeterminate && percent === 0 && styles.ringZero,
          )}
          pathLength={pathLength}
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
        />
      </svg>

      {showLabel && !indeterminate ? (
        <span className={joinClassNames(styles.centerLabel, styles.label)} aria-hidden="true">
          {progressLabelText(percent)}
        </span>
      ) : null}
    </div>
  );
}

export default CircularProgressBar;
