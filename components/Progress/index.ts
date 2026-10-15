/**
 * ชิ้นงานความคืบหน้า Nation Design System หน้า 23 Progress Bars
 *
 * มีสามทรง เลือกตามโจทย์ ไม่ใช่ตามพื้นที่อย่างเดียว
 *   ProgressBar               แถบแนวนอน ตัวเริ่มต้นของระบบ ใช้ได้กับเกือบทุกงาน
 *   CircularProgressBar       วงแหวนเต็มวง ใช้เมื่อพื้นที่แคบจนวางแถบไม่ได้
 *   SemiCircularProgressBar   วงแหวนครึ่งวง เป็นหน้าปัดวัดค่าในแดชบอร์ด ไม่ใช่ตัวบอกการโหลด
 *
 * ค่าเริ่มต้นของโฟลเดอร์นี้คือ ProgressBar เพราะเป็นทรงเริ่มต้นของระบบ
 */
export { ProgressBar, default } from './ProgressBar';
export { CircularProgressBar } from './CircularProgressBar';
export { SemiCircularProgressBar } from './SemiCircularProgressBar';

export type { ProgressBarProps } from './ProgressBar';
export type { CircularProgressBarProps } from './CircularProgressBar';
export type { SemiCircularProgressBarProps } from './SemiCircularProgressBar';

export {
  PROGRESS_MOTION,
  PROGRESS_GEOMETRY,
  PROGRESS_DEFAULT_MAX,
  readProgress,
  progressLabelText,
} from './types';

export type {
  ProgressSize,
  ProgressLabelPosition,
  ProgressCommonProps,
  ProgressReading,
} from './types';
