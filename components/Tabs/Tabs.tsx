/**
 * Tabs Nation Design System
 *
 * แท็บสลับเนื้อหาภายในหน้าเดียว ตรงกับ component set ในไฟล์ออกแบบหน้า 18 Tabs
 * (`segmented-tab` 160 แบบ · `underline-tab` 160 แบบ · กล่องครอบอีกทรงละ 15 แบบ)
 *
 * ⚠️ ตัวเดียวทำได้ทั้งสองทรง เลือกด้วย `shape` ค่าเริ่มต้นคือ `underline`
 *      shape="underline"   ขีดเส้นใต้ ใช้กับการสลับเนื้อหาหลักของหน้า
 *      shape="segmented"   กล่องติดกันเป็นแถบ ใช้กับชุดตัวเลือกสั้นในกล่องหรือแผงตั้งค่า
 *    ฝั่งไฟล์ออกแบบแยกเป็นสองชุดเพราะแผง Assets เห็นแค่ชื่อ แต่โครงเหมือนกันทุกอย่าง
 *
 * ⚠️ `current` คนละเรื่องกับ `state`
 *    แท็บปัจจุบันคือแท็บที่ `value` ชี้อยู่ ประกาศด้วย `aria-selected`
 *    ส่วนโฟกัสคือจุดที่แป้นพิมพ์อยู่ ณ ขณะนั้น สองอย่างซ้อนกันได้ ห้ามใช้แทนกัน
 *
 * ⚠️ manual activation ลูกศรย้ายโฟกัสอย่างเดียว ต้องกด Enter หรือ Space จึงสลับเนื้อหา
 *    ตั้งค่านี้เพราะแท็บเว็บข่าวดึงข้อมูลชุดใหม่ทุกครั้งที่สลับ ถ้าสลับอัตโนมัติ
 *    การเดินลูกศรผ่าน 10 หมวดจะยิง 10 คำขอ
 *
 * ⚠️ แท็บเดียวที่อยู่ในลำดับ Tab ของหน้าคือแท็บปัจจุบัน แท็บอื่น tabindex="-1"
 *    (roving tabindex) ไม่งั้นผู้ใช้แป้นพิมพ์ต้องกด Tab ผ่านทุกแท็บกว่าจะถึงเนื้อหา
 *
 * ⚠️ ความกว้างมาจากเนื้อหา ไม่มี prop ความกว้างโดยตั้งใจ และห้ามทำตัวอักษรหนาขึ้น
 *    ตอนเป็นแท็บปัจจุบัน เพราะความกว้างจะขยับแล้วแท็บทั้งแถวเลื่อน
 *
 * ค่าทั้งหมดมาจาก design tokens ผ่าน CSS variables ไม่มีค่า hard-code
 */
import React, { useId, useRef } from 'react';
import { Icon, type IconName } from '../Icon';
import styles from './Tabs.module.css';

export type TabsShape = 'segmented' | 'underline';
export type TabsSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** ชนิดของไอคอนในแท็บ ตรงกับแกน `icon` ของ component set */
export type TabIconKind = 'none' | 'leading' | 'unread' | 'only';

export interface TabItem {
  /** คีย์ของแท็บ ใช้เทียบกับ `value` และใช้ประกอบ id ของแท็บกับแผงเนื้อหา */
  id: string;
  /** ข้อความบนแท็บ ตรงกับคุณสมบัติ `text` ในไฟล์ออกแบบ */
  label?: React.ReactNode;
  /** ไอคอนนำหน้า ใช้ชุดไอคอนของ DS ไม่รับ element ที่วาดเอง */
  icon?: IconName;
  /**
   * จุดแจ้งเตือนนำหน้า บอกว่ามีของใหม่ยังไม่ได้อ่าน ไม่ใช่จุดบอกสถานะ
   * ⚠️ ห้ามให้จุดนี้สื่อความหมายด้วยสีอย่างเดียว ต้องมีข้อความกำกับด้วยเสมอ (WCAG 1.4.1)
   */
  unread?: boolean;
  /** ไอคอนอย่างเดียว ไม่มีข้อความ ต้องส่ง `ariaLabel` คู่กันเสมอ */
  iconOnly?: boolean;
  /** ชื่อที่โปรแกรมอ่านหน้าจอจะอ่าน จำเป็นเมื่อ `iconOnly` */
  ariaLabel?: string;
  /** ปิดใช้งาน ประกาศด้วย `aria-disabled` และข้ามตอนเดินลูกศร */
  disabled?: boolean;
  /** เนื้อหาของแผงที่แท็บนี้คุม ไม่ส่งก็ได้ถ้าแผงอยู่ที่อื่น */
  panel?: React.ReactNode;
}

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items: readonly TabItem[];
  /** คีย์ของแท็บปัจจุบัน แกน `current` ของไฟล์ออกแบบ */
  value: string;
  onValueChange?: (id: string) => void;
  /** ทรงของแท็บ ค่าเริ่มต้นคือขีดเส้นใต้ */
  shape?: TabsShape;
  /** ⚠️ `xs` ใช้เฉพาะแผงตั้งค่าที่หนาแน่นบนเดสก์ท็อป ห้ามใช้บนมือถือ */
  size?: TabsSize;
  /** ชื่อของแถบแท็บที่โปรแกรมอ่านหน้าจอจะอ่าน */
  label?: string;
  /** id ของหัวข้อที่ทำหน้าที่เป็นชื่อแถบแท็บ ใช้แทน `label` ได้ */
  labelledBy?: string;
}

const SIZE_CLASS: Record<TabsSize, string> = {
  xs: styles.xs, sm: styles.sm, md: styles.md, lg: styles.lg, xl: styles.xl,
};

const SHAPE_CLASS: Record<TabsShape, string> = {
  segmented: styles.segmented, underline: styles.underline,
};

/** ชนิดไอคอนของแท็บหนึ่งอัน ตรงกับแกน `icon` คือ false · leading · unread · only */
export function tabIconKind(item: TabItem): TabIconKind {
  if (item.iconOnly && item.icon) return 'only';
  if (item.unread) return 'unread';
  if (item.icon) return 'leading';
  return 'none';
}

/** เตือนตอนพัฒนาเมื่อแท็บไอคอนอย่างเดียวไม่มีชื่อให้โปรแกรมอ่านหน้าจออ่าน */
function warnMissingLabel(item: TabItem, kind: TabIconKind): void {
  if (process.env.NODE_ENV === 'production') return;
  if (kind === 'only' && !item.ariaLabel) {
    console.warn(
      `Tabs: แท็บ "${item.id}" เป็นแบบไอคอนอย่างเดียวแต่ไม่มี ariaLabel ` +
        'ไอคอนลอยเดาความหมายไม่ออก ต้องส่งชื่อให้โปรแกรมอ่านหน้าจออ่านเสมอ',
    );
  }
  if (item.iconOnly && !item.icon) {
    console.warn(`Tabs: แท็บ "${item.id}" ตั้ง iconOnly แต่ไม่ได้ส่ง icon จึงไม่มีอะไรให้แสดง`);
  }
}

/**
 * @example
 * <Tabs
 *   label="หมวดข่าว"
 *   value={tab}
 *   onValueChange={setTab}
 *   items={[
 *     { id: 'latest', label: 'ล่าสุด', panel: <LatestNews /> },
 *     { id: 'popular', label: 'ยอดนิยม', icon: 'trending-up', panel: <PopularNews /> },
 *     { id: 'saved', label: 'ที่บันทึกไว้', unread: true, panel: <SavedNews /> },
 *   ]}
 * />
 *
 * <Tabs shape="segmented" size="sm" label="มุมมอง" value={view} onValueChange={setView}
 *   items={[
 *     { id: 'grid', icon: 'grid-view', iconOnly: true, ariaLabel: 'มุมมองตาราง' },
 *     { id: 'list', icon: 'list-view', iconOnly: true, ariaLabel: 'มุมมองรายการ' },
 *   ]} />
 */
export function Tabs({
  items,
  value,
  onValueChange,
  shape = 'underline',
  size = 'md',
  label,
  labelledBy,
  className,
  ...rest
}: TabsProps) {
  const autoId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const tabId = (id: string) => `${autoId}-tab-${id}`;
  const panelId = (id: string) => `${autoId}-panel-${id}`;

  // ลูกศรข้ามแท็บที่ปิดใช้งาน แท็บที่กดไม่ได้ไม่ควรกินจังหวะการเดิน
  const reachable = items.reduce<number[]>((acc, item, i) => {
    if (!item.disabled) acc.push(i);
    return acc;
  }, []);

  const currentIndex = items.findIndex((item) => item.id === value);
  // ถ้า value ไม่ตรงแท็บไหน ให้แท็บแรกที่กดได้เป็นตัวที่อยู่ในลำดับ Tab ของหน้า
  const rovingIndex = currentIndex >= 0 ? currentIndex : (reachable[0] ?? 0);

  const focusAt = (index: number) => {
    const el = tabRefs.current[index];
    if (!el) return;
    el.focus();
    // แถบแท็บเลื่อนแนวนอนได้ แท็บที่โฟกัสต้องถูกเลื่อนเข้ามาให้เห็น
    el.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  };

  /** ย้ายโฟกัสทีละแท็บและวนรอบ ไม่สลับเนื้อหา (manual activation) */
  const step = (from: number, dir: 1 | -1) => {
    if (reachable.length === 0) return;
    const at = reachable.indexOf(from);
    const base = at >= 0 ? at : 0;
    const next = (base + dir + reachable.length) % reachable.length;
    focusAt(reachable[next]);
  };

  const activate = (item: TabItem) => {
    if (item.disabled || item.id === value) return;
    onValueChange?.(item.id);
  };

  // แป้นพิมพ์ตามมาตรฐาน WAI-ARIA Authoring Practices แบบ manual activation
  const onKeyDown = (index: number, item: TabItem) => (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowRight': step(index, 1); break;
      case 'ArrowLeft': step(index, -1); break;
      case 'Home': if (reachable.length) focusAt(reachable[0]); break;
      case 'End': if (reachable.length) focusAt(reachable[reachable.length - 1]); break;
      case 'Enter': case ' ': activate(item); break;
      default: return;
    }
    // กันหน้าเลื่อนตอนกด Space และกันการเลื่อนแถบตอนกดลูกศร
    e.preventDefault();
  };

  const classes = [styles.root, SHAPE_CLASS[shape], SIZE_CLASS[size], className]
    .filter(Boolean)
    .join(' ');

  const hasPanel = items.some((item) => item.panel !== undefined);

  return (
    <div className={classes} {...rest}>
      <div
        className={styles.tablist}
        role="tablist"
        aria-label={labelledBy ? undefined : label}
        aria-labelledby={labelledBy}
      >
        {items.map((item, index) => {
          const kind = tabIconKind(item);
          warnMissingLabel(item, kind);
          const selected = item.id === value;
          return (
            <button
              key={item.id}
              ref={(el) => { tabRefs.current[index] = el; }}
              type="button"
              id={tabId(item.id)}
              className={[styles.tab, kind === 'only' ? styles.iconOnly : undefined]
                .filter(Boolean)
                .join(' ')}
              role="tab"
              aria-selected={selected}
              aria-controls={item.panel !== undefined ? panelId(item.id) : undefined}
              aria-disabled={item.disabled || undefined}
              aria-label={item.ariaLabel}
              tabIndex={index === rovingIndex ? 0 : -1}
              data-icon={kind}
              onClick={() => activate(item)}
              onKeyDown={onKeyDown(index, item)}
            >
              {kind === 'unread' && <span className={styles.unread} aria-hidden="true" />}
              {(kind === 'leading' || kind === 'only') && item.icon && (
                <Icon name={item.icon} size="100%" className={styles.icon} />
              )}
              {kind !== 'only' && item.label !== undefined && (
                <span className={styles.label}>{item.label}</span>
              )}
            </button>
          );
        })}
      </div>

      {hasPanel &&
        items.map((item) =>
          item.panel === undefined ? null : (
            <div
              key={item.id}
              id={panelId(item.id)}
              className={styles.panel}
              role="tabpanel"
              aria-labelledby={tabId(item.id)}
              hidden={item.id !== value}
              // APG ให้แผงเนื้อหารับโฟกัสได้ เพื่อให้กด Tab จากแท็บแล้วถึงเนื้อหาทันที
              tabIndex={0}
            >
              {item.panel}
            </div>
          ),
        )}
    </div>
  );
}

export default Tabs;
