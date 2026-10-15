/**
 * ชนิดข้อมูลและค่าคงที่ร่วมของชิ้นงานความคืบหน้า Nation Design System
 *
 * ไฟล์นี้เป็นที่เดียวที่เก็บของที่ทั้งสามทรงใช้ร่วมกัน คือชนิดข้อมูลของ prop
 * ค่าคงที่ของการเคลื่อนไหว ค่าคงที่ของเรขาคณิตเส้นประ และตัวอ่านค่า
 * ตรงกับไฟล์ออกแบบหน้า 23 Progress Bars
 *
 * ⚠️ ไฟล์นี้ไม่มีค่าขนาดและไม่มีสี
 *    ขนาดทุกค่ามาจากสูตรใน tokens/scale/progress.mjs แล้วออกมาเป็น CSS variable
 *    ตัวเลขที่อยู่ในไฟล์นี้มีสองชนิดเท่านั้น คือเวลาของพฤติกรรม กับความยาวเส้นทางที่สมมติขึ้นเอง
 *    ทั้งสองชนิดไม่ใช่ค่าของระบบออกแบบ จึงไม่มี token และไม่ควรมี
 */

/** ขนาด 5 ขั้นของระบบ ตรงกับแกน size ของทั้งสามชุดในไฟล์ออกแบบ */
export type ProgressSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** ตำแหน่งป้ายตัวเลขของแถบแนวนอน ตรงกับแกน label-position ของชุด progress-bar */
export type ProgressLabelPosition = 'right' | 'bottom';

/**
 * เวลาของการเคลื่อนไหวหน่วยมิลลิวินาที
 *
 * ⚠️ tokens/scale/progress.mjs เขียนกำกับไว้ว่าไม่มี token ของเวลาโดยตั้งใจ
 *    เวลาเปลี่ยนค่าของแบบรู้ค่าอ้าง `--ntg-motion-duration-default` ซึ่งเป็น token ของระบบ
 *    ส่วนรอบของแบบไม่รู้ค่ายาวกว่าชั้นเวลาที่ช้าที่สุดของระบบ จึงไม่มีที่ให้อ้าง
 *    ค่าที่ตัดสินแล้วอยู่ที่นี่ที่เดียว และ Progress.module.css เก็บสำเนาไว้ที่ `--progress-loop`
 *    **ถ้าแก้ที่นี่ต้องไปแก้ที่นั่นด้วย** เป็นกรณีเดียวกับ TOOLTIP_MOTION ของหน้า 20
 */
export const PROGRESS_MOTION = {
  /** รอบของแบบไม่รู้ค่า ทั้งแถบที่ไถลและวงแหวนที่หมุน */
  indeterminateLoopMs: 2000,
} as const;

/**
 * ค่าคงที่ของเรขาคณิตเส้นประในวงแหวน
 *
 * ⚠️ ไม่ใช่ขนาด จึงไม่มี token
 *    `<circle>` ตั้ง `pathLength` ได้ แปลว่าเราสมมติความยาวเส้นรอบวงเป็นเท่าไหร่ก็ได้
 *    สมมติเป็น 100 แล้วค่าร้อยละกับความยาวเส้นประจะเป็นตัวเลขเดียวกันพอดี
 *    ทำให้ไม่ต้องรู้รัศมีจริงในฝั่ง JavaScript ซึ่งเป็นค่าที่อยู่ใน CSS variable เท่านั้น
 */
export const PROGRESS_GEOMETRY = {
  /** ความยาวเส้นรอบวงที่สมมติขึ้น เลือก 100 เพื่อให้ตรงกับหน่วยร้อยละ */
  pathLength: 100,
  /** ส่วนของเส้นรอบวงที่วงแหวนครึ่งวงใช้จริง คือครึ่งหนึ่ง */
  semiSweep: 50,
  /** ความยาวของส่วนโค้งที่วิ่งวนตอนไม่รู้ค่า เลือกให้เห็นชัดแต่ไม่เต็มวงจนดูเหมือนรู้ค่า */
  indeterminateSweep: 25,
} as const;

/** ค่าสูงสุดเริ่มต้น เลือก 100 เพราะทำให้ค่าที่ส่งเข้ามาเป็นร้อยละอยู่แล้ว */
export const PROGRESS_DEFAULT_MAX = 100;

/** prop ที่ทั้งสามทรงมีเหมือนกัน */
export interface ProgressCommonProps {
  /**
   * ชื่อที่โปรแกรมอ่านหน้าจออ่าน **จำเป็นเสมอ ไม่มีค่าเริ่มต้น**
   * มาตรฐาน ARIA ระบุว่า role progressbar ต้องมีชื่อ ถ้าไม่มีผู้ใช้จะได้ยินแค่ตัวเลขลอย ๆ
   * ค่านี้ไปเป็น `aria-label` ของกล่อง ไม่ได้แสดงบนจอ
   */
  label: string;

  /**
   * ค่าปัจจุบัน อยู่ในช่วง 0 ถึง `max`
   * ⚠️ ไม่ส่งคือแบบไม่รู้ค่า ซึ่งจะตัด `aria-valuenow` ทิ้งตามมาตรฐาน ไม่ใช่ใส่ศูนย์
   */
  value?: number;

  /** ค่าสูงสุด ค่าเริ่มต้น 100 */
  max?: number;

  /** แสดงป้ายตัวเลขหรือไม่ ค่าเริ่มต้นคือแสดง */
  showLabel?: boolean;

  /**
   * ข้อความแทนตัวเลขสำหรับโปรแกรมอ่านหน้าจอ ไปเป็น `aria-valuetext`
   * ใช้เมื่อตัวเลขอย่างเดียวสื่อความไม่ครบ เช่น ขั้นที่ 3 จาก 7 หรือ เหลืออีก 2 นาที
   * ไม่ส่งคือปล่อยให้โปรแกรมอ่านหน้าจอคิดร้อยละเองจาก valuenow กับ valuemax
   */
  valueText?: string;

  /** id ของกล่อง role progressbar ปกติไม่ต้องส่ง */
  id?: string;

  /** คลาสเพิ่มของกรอบนอกสุด */
  className?: string;
}

/** ผลการอ่านค่าที่ผ่านการตรวจและปัดเศษแล้ว */
export interface ProgressReading {
  /** ไม่รู้ค่าหรือไม่ ถ้าใช่ต้องไม่ใส่ aria-valuenow */
  indeterminate: boolean;
  /** ร้อยละ 0 ถึง 100 เป็นจำนวนเต็ม ใช้ทั้งวาดรูปและทำข้อความบนป้าย */
  percent: number;
  /** ค่าที่ใส่ใน aria-valuenow ปัดเศษแล้วและตัดให้อยู่ในช่วง 0 ถึง max */
  valueNow: number;
  /** ค่าสูงสุดที่ใช้จริง หลังตรวจแล้ว */
  max: number;
}

/** เตือนที่คอนโซลเฉพาะตอนพัฒนา ตัดทิ้งตอน build จริงด้วย dead code elimination */
export function warn(message: string): void {
  if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'production') return;
  // eslint-disable-next-line no-console
  console.warn(`[Progress] ${message}`);
}

/**
 * อ่านค่าที่ส่งเข้ามาแล้วคืนค่าที่พร้อมใช้ ทั้งฝั่งรูปและฝั่งการเข้าถึง
 *
 * ⚠️ ปัดเศษเป็นจำนวนเต็มเสมอ ทั้งร้อยละและ valuenow
 *    เพราะป้ายบนจอกับสิ่งที่โปรแกรมอ่านหน้าจอพูดต้องเป็นตัวเลขเดียวกัน
 *    ถ้าป้ายปัดแต่ valuenow ไม่ปัด ผู้ใช้สองกลุ่มจะได้ยินคนละค่าที่จุดทศนิยม
 *
 * ⚠️ `max` ที่ใช้ไม่ได้จะถอยไปใช้ 100 พร้อมเตือนตอนพัฒนา ไม่ throw
 *    เพราะ max มักมาจากความยาวของรายการ เช่นจำนวนไฟล์ที่กำลังอัปโหลด
 *    ซึ่งเป็นศูนย์ได้จริงในจังหวะแรกของหน้า การ throw จะทำให้ทั้งหน้าดับเพราะกรณีปกติ
 */
export function readProgress(value: number | undefined, max: number | undefined): ProgressReading {
  let safeMax = max ?? PROGRESS_DEFAULT_MAX;
  if (!Number.isFinite(safeMax) || safeMax <= 0) {
    warn(`max ต้องเป็นจำนวนบวก ได้รับ ${String(max)} จึงถอยไปใช้ ${PROGRESS_DEFAULT_MAX}`);
    safeMax = PROGRESS_DEFAULT_MAX;
  }

  if (value === undefined || value === null || !Number.isFinite(value)) {
    return { indeterminate: true, percent: 0, valueNow: 0, max: safeMax };
  }

  const clamped = Math.min(Math.max(value, 0), safeMax);
  return {
    indeterminate: false,
    percent: Math.round((clamped / safeMax) * 100),
    valueNow: Math.round(clamped),
    max: safeMax,
  };
}

/** ข้อความบนป้าย เป็นร้อยละเสมอ ไม่ว่า max จะเป็นเท่าไหร่ */
export function progressLabelText(percent: number): string {
  return `${percent}%`;
}

/** รวมชื่อคลาสโดยทิ้งค่าว่าง วิธีเดียวกับ component อื่นในไลบรารีนี้ */
export function joinClassNames(...parts: Array<string | false | undefined>): string {
  return parts.filter(Boolean).join(' ');
}
