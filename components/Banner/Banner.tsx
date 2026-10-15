/**
 * Banner Nation Design System
 *
 * แถบแจ้งที่อยู่ในสายเนื้อหา บอกสถานะที่ยังค้างอยู่ และคาอยู่จนกว่าจะกดปิด
 * หรือจนกว่าเรื่องนั้นจะจบ ตรงกับ component set ในไฟล์ออกแบบหน้า 19 Toasts and Banners
 * สเปคขนาดทั้งหมดอยู่ที่ tokens/scale/banner.mjs ไม่มีค่าใดอยู่ในไฟล์นี้
 *
 * ⚠️ ต่างจาก Toast ที่จุดเดียวที่สำคัญ คือ Banner อยู่ในสายเนื้อหาและไม่หายเอง
 *    ส่วน Toast ลอยทับเนื้อหาและหายเอง
 *    ของที่เป็นสถานะค้างของหน้าใช้ Banner ของที่เป็นผลของการกดปุ่มเมื่อครู่ใช้ Toast
 *
 * ⚠️ ไม่มีเงาเด็ดขาด เงาสื่อว่าของชิ้นนั้นลอยอยู่เหนือหน้า
 *    ซึ่งขัดกับความหมายของแถบที่อยู่ในสายเนื้อหา และไม่มีเจ้าไหนในงานวิจัยใส่เงาให้แถบแบบนี้
 *
 * ⚠️ ความกว้างมาจากกรอบแม่เสมอ ไม่มี prop ความกว้างและไม่มี token ความกว้างโดยตั้งใจ
 *    ถ้ามี จะมีคนเอาไปตรึงความกว้างแล้วข้อความยาวจะล้น
 *
 * ⚠️ 2 ระดับต่างกันที่มุมโค้งอย่างเดียว ไม่ได้ต่างกันที่สี
 *    page    ยืนเต็มความกว้างบนสุดของหน้า มุมโค้ง 0 เพราะชนขอบจอทั้งสองข้าง
 *    section อยู่ในกล่องเนื้อหา กว้างเท่าคอลัมน์ที่มันอยู่ มีมุมโค้งตามขนาด
 *    วิธีแยกด้วยมุมโค้งเป็นของ Fluent 2 และไม่ต้องเพิ่มแกนสี
 *
 * ⚠️ live region แยกออกจากกล่องที่มองเห็น ห้ามรวมกัน
 *    ถ้าใส่ aria-live หรือ role ลงบนกล่องที่มองเห็น โปรแกรมอ่านหน้าจอจะอ่านสองรอบ
 *    รอบแรกตอน live region เปลี่ยน รอบสองตอนผู้ใช้เลื่อนไปเจอแถบนั้น
 *    Base Web เขียนเหตุผลนี้ไว้ในโค้ด และ Fluent 2 กับ Radix แยกออกมาแบบเดียวกัน
 *    ระดับเสียง default กับ brand ใช้ polite ส่วน error warning success ใช้ assertive
 *
 * ⚠️ `announce` ค่าเริ่มต้นเป็น false ต่างจาก Toast โดยตั้งใจ
 *    แถบในสายเนื้อหามักอยู่ที่หน้าตั้งแต่โหลดเสร็จ ไม่ใช่ของที่เพิ่งเกิด
 *    ถ้าประกาศทุกใบตอนโหลด ผู้ใช้จะได้ฟังของที่ไม่ได้เพิ่งเปลี่ยน
 *    เปิดเป็น true เมื่อแถบนั้นโผล่มาจากการกระทำของผู้ใช้ เช่นสรุปข้อผิดพลาดตอนกดส่งฟอร์ม
 *
 * ⚠️ แถบรับโฟกัสจากการสั่งในโค้ดได้ ต่างจาก Toast ที่ห้ามแย่งโฟกัส
 *    เพราะแถบใช้เป็นสรุปข้อผิดพลาดของฟอร์ม ซึ่งต้องย้ายโฟกัสมาเมื่อกดส่ง
 *    Primer ตั้ง tabIndex -1 ที่ section และ Polaris เปิดเมธอด focus() ให้เรียกจากข้างนอก
 *    ที่นี่ส่ง ref ออกไปให้เรียก focus() ได้ และไม่อยู่ในลำดับ Tab ของหน้า
 *
 * ⚠️ ไม่มีสถานะ disabled ที่ตัวแถบ สถานะอยู่ที่ปุ่มข้างในเท่านั้น
 *
 * ⚠️ ปุ่มกระทำคือ `LinkButton` ตระกูล neutral เท่านั้น ห้ามเปลี่ยนไปใช้ปุ่มชนิดอื่น
 *    เพราะในไฟล์ออกแบบหน้า 19 ปุ่มกระทำของทุกแบบเป็น instance ของชุด `link-button`
 *    ตระกูล Neutral Button (node 7226:11764) ถ้าโค้ดใช้ปุ่มชนิดอื่นสองฝั่งจะอ้างคนละชิ้นงาน
 *
 * ค่าทั้งหมดมาจาก design tokens ผ่าน CSS variables ไม่มีค่า hard-code
 */
import React, { useId } from 'react';
import { Icon, type IconName } from '../Icon';
import { LinkButton } from '../LinkButton';
import styles from './Banner.module.css';

export type BannerType = 'default' | 'brand' | 'error' | 'warning' | 'success';
export type BannerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** ระดับของแถบ ต่างกันที่มุมโค้งอย่างเดียว */
export type BannerLevel = 'page' | 'section';

/** ระดับเสียงของการประกาศ ตรงกับค่าของ aria-live */
export type BannerPoliteness = 'polite' | 'assertive';

/** ปุ่มกระทำในแถบ มีได้ปุ่มเดียวและอยู่ใต้ข้อความเสมอ */
export interface BannerAction {
  label: string;
  onClick: () => void;
  /** ไอคอนนำหน้าข้อความบนปุ่ม ใช้ชุดไอคอนของ DS */
  icon?: IconName;
}

export interface BannerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'children'> {
  /** หัวข้อ บรรทัดแรกของแถบ */
  title: React.ReactNode;
  /** ชนิด 5 ค่า คุมสีพื้น สีไอคอน และระดับเสียงของการประกาศ */
  type?: BannerType;
  /** ⚠️ `xs` ใช้เฉพาะแผงตั้งค่าหรือการ์ดเล็กที่พื้นที่แนวตั้งมีจำกัด */
  size?: BannerSize;
  /** ระดับ ค่าเริ่มต้นคือ `section` ซึ่งอยู่ในกล่องเนื้อหา */
  level?: BannerLevel;
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
  action?: BannerAction;
  /** เรียกเมื่อกดปุ่มปิด แถบไม่หายเอง ต้องกดปิดเท่านั้น */
  onClose?: () => void;
  /** ชื่อปุ่มปิดที่โปรแกรมอ่านหน้าจอจะอ่าน */
  closeLabel?: string;

  /** ประกาศข้อความให้โปรแกรมอ่านหน้าจอ ค่าเริ่มต้นคือไม่ประกาศ ดูเหตุผลที่หัวไฟล์ */
  announce?: boolean;
  /** ข้อความที่จะให้ประกาศ ใช้เมื่อหัวข้อหรือข้อความรองไม่ใช่ข้อความล้วน */
  announcement?: string;
}

const SIZE_CLASS: Record<BannerSize, string> = {
  xs: styles.xs, sm: styles.sm, md: styles.md, lg: styles.lg, xl: styles.xl,
};

const LEVEL_CLASS: Record<BannerLevel, string> = {
  page: styles.levelPage,
  section: styles.levelSection,
};

const TYPE_CLASS: Record<BannerType, string> = {
  default: styles.typeDefault,
  brand: styles.typeBrand,
  error: styles.typeError,
  warning: styles.typeWarning,
  success: styles.typeSuccess,
};

/** ไอคอนประจำชนิด ทับได้ด้วย prop `icon` ชุดเดียวกับ Toast */
const TYPE_ICON: Record<BannerType, IconName> = {
  default: 'info-circle',
  brand: 'info-circle',
  error: 'error-circle',
  warning: 'warning',
  success: 'check-circle',
};

/** ระดับเสียงของการประกาศต่อชนิด ชุดเดียวกับ Toast */
export const BANNER_POLITENESS: Record<BannerType, BannerPoliteness> = {
  default: 'polite',
  brand: 'polite',
  error: 'assertive',
  warning: 'assertive',
  success: 'assertive',
};

/** ดึงข้อความล้วนออกจาก node เพื่อใช้ประกาศ รับเฉพาะข้อความและตัวเลข */
function plainText(node: React.ReactNode): string {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  return '';
}

/** ข้อความที่จะประกาศของแถบหนึ่ง */
export function bannerAnnouncement(
  input: Pick<BannerProps, 'title' | 'description' | 'announcement'>,
): string {
  if (input.announcement !== undefined) return input.announcement;
  return [plainText(input.title), plainText(input.description)]
    .filter((part) => part.length > 0)
    .join(' ');
}

/** เตือนตอนพัฒนาเมื่อข้อความที่จะประกาศว่างเปล่า */
function warnMissingAnnouncement(text: string, announce: boolean): void {
  if (process.env.NODE_ENV === 'production') return;
  if (announce && text.length === 0) {
    console.warn(
      'Banner: ไม่มีข้อความให้โปรแกรมอ่านหน้าจอประกาศ ' +
        'เพราะหัวข้อและข้อความรองไม่ใช่ข้อความล้วน ให้ส่ง announcement มาด้วย',
    );
  }
}

/**
 * @example
 * <Banner
 *   level="page"
 *   type="warning"
 *   title="ระบบจะปิดปรับปรุงคืนนี้"
 *   description="ตั้งแต่ 23:00 ถึง 01:00 จะบันทึกข่าวไม่ได้ชั่วคราว"
 *   onClose={() => setShown(false)}
 * />
 *
 * <Banner
 *   type="error"
 *   title="กรอกข้อมูลไม่ครบ"
 *   description="ยังขาดหัวข้อข่าวและหมวด"
 *   announce
 *   action={{ label: 'ไปที่ช่องแรกที่ขาด', onClick: focusFirstError }}
 *   showClose={false}
 * />
 */
export const Banner = React.forwardRef<HTMLDivElement, BannerProps>(function Banner(
  {
    title,
    type = 'default',
    size = 'md',
    level = 'section',
    description,
    showIcon = true,
    showDescription,
    showAction,
    showClose = true,
    icon,
    action,
    onClose,
    closeLabel = 'ปิดแถบแจ้ง',
    announce = false,
    announcement,
    className,
    ...rest
  },
  ref,
) {
  const autoId = useId();
  const titleId = `${autoId}-title`;

  const withDescription =
    (showDescription ?? description !== undefined) && description !== undefined;
  const withAction = (showAction ?? action !== undefined) && action !== undefined;

  const announceText = bannerAnnouncement({ title, description, announcement });
  warnMissingAnnouncement(announceText, announce);

  const classes = [styles.root, LEVEL_CLASS[level], TYPE_CLASS[type], SIZE_CLASS[size], className]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={ref}
      className={classes}
      data-type={type}
      data-size={size}
      data-level={level}
      /*
       * role="group" พร้อม aria-labelledby ตามที่ Fluent 2 ทำกับ MessageBar
       * ห้ามใส่ aria-live หรือ role="alert" ที่นี่ ดูคำอธิบายที่หัวไฟล์
       */
      role="group"
      aria-labelledby={titleId}
      // รับโฟกัสจากการสั่งในโค้ดได้ แต่ไม่อยู่ในลำดับ Tab ของหน้า
      tabIndex={-1}
      {...rest}
    >
      {announce && (
        <span className={styles.liveRegion} aria-live={BANNER_POLITENESS[type]} aria-atomic="true">
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
                ปุ่มกระทำใช้ตระกูล neutral ทุกชนิด ไม่ได้ไล่สีตามชนิดของแถบ
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
    </div>
  );
});

export default Banner;
