/**
 * SemiCircularProgressBar Nation Design System
 *
 * วงแหวนครึ่งวง ใช้เป็นหน้าปัดวัดค่าในแดชบอร์ด
 * ตรงกับ component set `semi-circular-progress-bar` ในไฟล์ออกแบบหน้า 23 Progress Bars
 * สเปคขนาดทั้งหมดอยู่ที่ tokens/scale/progress.mjs ไม่มีค่าขนาดใดอยู่ในไฟล์นี้
 *
 * ⚠️ นี่คือหน้าปัด ไม่ใช่ตัวบอกความคืบหน้าของงาน
 *    ใช้กับค่าที่มีเพดานชัดเจนและอยากให้เห็นว่าตอนนี้อยู่ตรงไหนของเพดาน
 *    เช่นยอดขายเทียบเป้า หรือพื้นที่เก็บข้อมูลที่ใช้ไป
 *    **ห้ามใช้กับงานที่ต้องเอาหลายค่ามาเทียบกันเป็นรายการ** เพราะคนตัดสินความยาวได้แม่นกว่าตัดสินมุม
 *    งานแบบนั้นต้องใช้ ProgressBar
 *
 * ⚠️ ไม่มีแบบไม่รู้ค่า `value` จึงเป็น prop ที่ต้องส่งเสมอ
 *    หน้าปัดไม่ใช่ตัวบอกการโหลด (ตัดสินไว้ในไฟล์ออกแบบหน้า 23 และในงานวิจัย 15 เจ้า)
 *    บังคับสองชั้น ชั้นแรกคือชนิดข้อมูล `value` ไม่ใช่ prop ที่ไม่บังคับ TypeScript จึงฟ้องตอน compile
 *    ชั้นที่สองคือเวลาทำงาน ถ้าได้ค่าที่ไม่ใช่จำนวนจริงจะวาดหน้าปัดที่ศูนย์แล้วเตือนที่คอนโซล
 *    **เลือกวาดที่ศูนย์ ไม่เลือกโยน error และไม่เลือก render ว่าง** (ผู้ใช้ตัดสิน 2026-10-09)
 *    โยน error ทำให้แดชบอร์ดทั้งส่วนดับเมื่อข้อมูลจาก API เพี้ยน ซึ่ง TypeScript กันไม่ถึง
 *    ส่วน render ว่างทำให้หน้าปัดหายไปเฉย ๆ ซึ่งทีมพัฒนาเห็นช้ากว่าคำเตือนในคอนโซล
 *    การวาดที่ศูนย์ทำให้คนดูยังเห็นหน้าปัด และนักพัฒนาเห็นคำเตือนทันที
 *
 * ⚠️ ตัวเติมเริ่มที่ 9 นาฬิกาแล้วกวาดตามเข็มขึ้นข้ามยอดไปจบที่ 3 นาฬิกา ครึ่งวงเต็มคือ 180 องศา
 *    `<circle>` เริ่มเส้นทางที่ 3 นาฬิกา จึงหมุน 180 องศาเพื่อย้ายจุดเริ่มไปที่ 9 นาฬิกา
 *    แล้วใช้เส้นประโชว์แค่ครึ่งแรกของเส้นรอบวง ครึ่งล่างของวงกลมอยู่นอกกรอบมองเห็นจึงถูกตัดทิ้งเอง
 *    วิธีนี้ทำให้ไม่ต้องพิมพ์พิกัดของส่วนโค้งเป็นตัวเลขลงไปตรง ๆ ซึ่งอ่านจาก CSS variable ไม่ได้
 *
 * ⚠️ ป้ายตัวเลขอยู่ในกล่อง role progressbar จึงต้องตั้ง aria-hidden
 *    กฎ Children Presentational True ของมาตรฐาน ARIA ทำให้ข้อความข้างในไม่ถูกอ่านอยู่แล้ว
 *    ค่าเดินทางผ่าน `aria-valuenow` ถ้าตัวเลขอย่างเดียวสื่อความไม่ครบให้ส่ง `valueText`
 *    เช่น หน้าปัดยอดขายควรส่ง valueText ว่า 7.4 ล้านบาท จาก 10 ล้านบาท ไม่ใช่ปล่อยให้ได้ยินแค่ 74
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
  warn,
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

export interface SemiCircularProgressBarProps extends Omit<ProgressCommonProps, 'value'> {
  /**
   * ค่าปัจจุบัน **ต้องส่งเสมอ** อยู่ในช่วง 0 ถึง `max`
   * ⚠️ ไม่มีแบบไม่รู้ค่า ดูเหตุผลที่หัวไฟล์
   */
  value: number;

  /** ขนาด 5 ขั้น ค่าเริ่มต้น `md` */
  size?: ProgressSize;
}

/**
 * @example
 * // หน้าปัดยอดขายเทียบเป้า
 * <SemiCircularProgressBar
 *   label="ยอดขายเทียบเป้าประจำเดือน"
 *   value={7.4}
 *   max={10}
 *   valueText="7.4 ล้านบาท จากเป้า 10 ล้านบาท"
 *   size="xl"
 * />
 *
 * @example
 * // หน้าปัดพื้นที่เก็บข้อมูล
 * <SemiCircularProgressBar label="พื้นที่เก็บข้อมูลที่ใช้ไป" value={58} />
 */
export function SemiCircularProgressBar({
  label,
  value,
  max,
  size = 'md',
  showLabel = true,
  valueText,
  id,
  className,
}: SemiCircularProgressBarProps) {
  if (!Number.isFinite(value)) {
    warn(
      `SemiCircularProgressBar ต้องมี value ที่เป็นจำนวนจริงเสมอ เพราะหน้าปัดไม่มีแบบไม่รู้ค่า ` +
        `ได้รับ ${String(value)} จึงวาดหน้าปัดที่ศูนย์ไปก่อน ` +
        `งานที่ยังไม่รู้ค่าให้ใช้ ProgressBar หรือ CircularProgressBar แทน`,
    );
  }

  const reading = readProgress(value, max);
  const { percent, valueNow } = reading;

  /*
   * ครึ่งวงใช้เส้นรอบวงจริงแค่ครึ่งเดียว ค่าร้อยละจึงต้องย่อลงครึ่งหนึ่งก่อนไปเป็นความยาวเส้นประ
   * ลวดลายคือ ขีดยาวครึ่งวง ตามด้วยช่องว่างเต็มวง เพื่อให้ไม่มีขีดโผล่ซ้ำในครึ่งล่าง
   */
  const { pathLength, semiSweep } = PROGRESS_GEOMETRY;
  const dashArray = `${semiSweep} ${pathLength}`;
  const fillLength = (semiSweep * percent) / 100;

  return (
    <div
      id={id}
      role="progressbar"
      className={joinClassNames(styles.semi, SIZE_CLASS[size], className)}
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={reading.max}
      aria-valuenow={valueNow}
      aria-valuetext={valueText}
    >
      <svg className={styles.semiSvg} aria-hidden="true" focusable="false">
        <circle
          className={joinClassNames(styles.ring, styles.ringTrack, styles.semiRing)}
          pathLength={pathLength}
          strokeDasharray={dashArray}
        />
        <circle
          className={joinClassNames(
            styles.ring,
            styles.ringFill,
            styles.semiRing,
            percent === 0 && styles.ringZero,
          )}
          pathLength={pathLength}
          strokeDasharray={dashArray}
          strokeDashoffset={semiSweep - fillLength}
        />
      </svg>

      {showLabel ? (
        <span
          className={joinClassNames(styles.centerLabel, styles.semiLabel, styles.label)}
          aria-hidden="true"
        >
          {progressLabelText(percent)}
        </span>
      ) : null}
    </div>
  );
}

export default SemiCircularProgressBar;
