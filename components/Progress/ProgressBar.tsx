/**
 * ProgressBar Nation Design System
 *
 * แถบแนวนอนบอกความคืบหน้าของงานที่กำลังทำอยู่
 * ตรงกับ component set `progress-bar` ในไฟล์ออกแบบหน้า 23 Progress Bars
 * สเปคขนาดทั้งหมดอยู่ที่ tokens/scale/progress.mjs ไม่มีค่าขนาดใดอยู่ในไฟล์นี้
 *
 * ⚠️ ใช้ทรงไหน
 *    แถบแนวนอนเป็นตัวเริ่มต้นของระบบ ใช้ได้กับเกือบทุกงาน
 *    วงแหวนเต็มวงใช้เมื่อพื้นที่แคบจนวางแถบไม่ได้
 *    วงแหวนครึ่งวงเป็นหน้าปัดวัดค่าในแดชบอร์ด ไม่ใช่ตัวบอกความคืบหน้าของงาน
 *    เกณฑ์คือคนตัดสินความยาวได้แม่นกว่าตัดสินมุม ค่าที่ต้องเอามาเทียบกันเป็นรายการจึงควรเป็นแถบเสมอ
 *
 * ⚠️ ไม่มี prop ความกว้าง และจะไม่มีด้วย
 *    แถบยืดเต็มกรอบแม่เสมอ (ผู้ใช้ตัดสิน 2026-10-08) ของเดิมในไฟล์ออกแบบตรึงไว้ที่ 320
 *    ซึ่งเป็นค่าที่ไม่ได้คุมอะไรจริง แล้วคนเอาไปตรึงตาม พอวางในคอลัมน์ที่แคบกว่าก็ล้น
 *    อยากให้สั้นลงให้ไปจำกัดที่กรอบแม่
 *
 * ⚠️ ไม่ส่ง `value` คือแบบไม่รู้ค่า แล้ว `aria-valuenow` จะถูกตัดทิ้ง ไม่ใช่ใส่ศูนย์
 *    ศูนย์แปลว่ารู้ว่ายังไม่คืบเลย ซึ่งคนละความหมายกับไม่รู้ว่าคืบไปเท่าไหร่
 *    เป็นข้อที่พลาดกันมากที่สุดในการติดตั้ง role progressbar
 *
 * ⚠️ ป้ายตัวเลขตั้ง aria-hidden ค่าเดินทางผ่าน aria-valuenow เท่านั้น
 *    role progressbar มีกฎ Children Presentational True ในมาตรฐาน ARIA
 *    แปลว่าข้อความที่อยู่ในกล่องนั้นโปรแกรมอ่านหน้าจอจะไม่อ่าน
 *    ที่นี่วางป้ายไว้นอกกล่องอยู่แล้ว แต่ยังตั้ง aria-hidden เพื่อไม่ให้ได้ยินเลขซ้ำสองรอบ
 *    ถ้าตัวเลขอย่างเดียวสื่อความไม่ครบ ให้ส่ง `valueText` ไม่ใช่เอา aria-hidden ออก
 *
 * ⚠️ ไม่มีแกนสี และจะไม่มี
 *    ไฟล์ออกแบบหน้า 23 ใช้ชุดสีเดียวทั้งสามทรง ตัวเติมเป็นสีแบรนด์เสมอ
 *    สีที่บอกสถานะ เช่นแดงว่าล้มเหลว เป็นเรื่องของข้อความข้าง ๆ ไม่ใช่ของแถบ
 *
 * ค่าทั้งหมดมาจาก design tokens ผ่าน CSS variables ไม่มีค่า hard-code
 */
import React from 'react';
import styles from './Progress.module.css';
import {
  joinClassNames,
  progressLabelText,
  readProgress,
  type ProgressCommonProps,
  type ProgressLabelPosition,
  type ProgressSize,
} from './types';

const SIZE_CLASS: Record<ProgressSize, string> = {
  xs: styles.xs,
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
  xl: styles.xl,
};

const POSITION_CLASS: Record<ProgressLabelPosition, string> = {
  right: styles.barRight,
  bottom: styles.barBottom,
};

export interface ProgressBarProps extends ProgressCommonProps {
  /** ขนาด 5 ขั้น ค่าเริ่มต้น `md` */
  size?: ProgressSize;

  /**
   * ตำแหน่งป้ายตัวเลข ค่าเริ่มต้น `right`
   * `right` ป้ายอยู่ขวาของแถบ แถบกินพื้นที่ที่เหลือ
   * `bottom` ป้ายอยู่ใต้แถบชิดขวา ใช้เมื่อพื้นที่แนวนอนแคบจนแถบสั้นเกินไป
   */
  labelPosition?: ProgressLabelPosition;
}

/**
 * @example
 * // ความคืบหน้าของการอัปโหลด
 * <ProgressBar label="ความคืบหน้าการอัปโหลด" value={62} />
 *
 * @example
 * // ไม่รู้ว่าจะเสร็จเมื่อไหร่ ไม่ส่ง value
 * <ProgressBar label="กำลังประมวลผล" />
 *
 * @example
 * // นับเป็นขั้นตอน ใช้ valueText บอกความหมายที่ตัวเลขร้อยละไม่ได้บอก
 * <ProgressBar
 *   label="ขั้นตอนการตั้งค่า"
 *   value={3}
 *   max={7}
 *   valueText="ขั้นที่ 3 จาก 7"
 *   labelPosition="bottom"
 * />
 */
export function ProgressBar({
  label,
  value,
  max,
  size = 'md',
  showLabel = true,
  labelPosition = 'right',
  valueText,
  id,
  className,
}: ProgressBarProps) {
  const reading = readProgress(value, max);
  const { indeterminate, percent, valueNow } = reading;

  return (
    <div
      className={joinClassNames(
        styles.bar,
        SIZE_CLASS[size],
        POSITION_CLASS[labelPosition],
        className,
      )}
    >
      <div
        id={id}
        role="progressbar"
        className={styles.track}
        aria-label={label}
        aria-valuemin={indeterminate ? undefined : 0}
        aria-valuemax={indeterminate ? undefined : reading.max}
        aria-valuenow={indeterminate ? undefined : valueNow}
        aria-valuetext={indeterminate ? undefined : valueText}
      >
        <div
          className={joinClassNames(styles.fill, indeterminate && styles.fillIndeterminate)}
          /*
           * ร้อยละของค่าเป็นข้อมูลที่เปลี่ยนตลอดเวลา ไม่ใช่ขนาดของระบบออกแบบ
           * จึงไม่มี token และต้องมาทาง inline style ตอน render
           */
          style={indeterminate ? undefined : { width: `${percent}%` }}
        />
      </div>

      {showLabel && !indeterminate ? (
        <span className={styles.label} aria-hidden="true">
          {progressLabelText(percent)}
        </span>
      ) : null}
    </div>
  );
}

export default ProgressBar;
