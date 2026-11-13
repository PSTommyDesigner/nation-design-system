/**
 * PieChart Nation Design System
 *
 * กราฟวงกลมแบบโดนัท มียอดรวมกลางวงและคำอธิบายสีใต้วง ตรงกับ component `pie-chart` ในไฟล์ออกแบบหน้า 29 Chart
 * (node 12008:1686) และชิ้นส่วนแถวคำอธิบายสี `_pie-chart-legend-item` (node 12007:1482)
 * ที่มาของทุกการตัดสินใจ docs/research/pie-chart.md หัวข้อ 10.1
 *
 * ⚠️ รูปชิ้นคำนวณเองด้วย SVG path ไม่เพิ่มไลบรารี (ผู้ใช้ตัดสิน 2026-11-13)
 *    SVG ใช้ viewBox แบบหน่วยสัมพัทธ์ 0 0 100 100 รัศมีนอก 50 แล้วยืดเต็มกล่องที่กว้างเท่า
 *    --ntg-chart-pie-diameter-<size> JS จึงไม่ต้องรู้ค่าพิกเซลของ token เลย
 *    แต่ละชิ้นวาดเป็นลิ่มเต็มจากจุดศูนย์กลางถึงขอบนอก แล้ววางแผ่นกลมสีพื้นทับตรงกลางเป็นรูของโดนัท
 *    แผ่นกลางกว้าง diameter ลบ thickness สองเท่า (ค่าจาก token ใน CSS) รูจึงเปลี่ยนตาม token เองทุกขนาด
 *
 * ⚠️ ช่องคั่นระหว่างชิ้นทำแบบเดียวกับไฟล์ออกแบบ คือเส้นขอบรอบชิ้นแบบกลางเส้น สี --ntg-color-background-general-primary
 *    หนา --ntg-chart-slice-gap (2) ชิ้นข้างกันต่างวาดขอบ 1 ทับกัน จึงได้ช่อง 2 พอดี
 *    เส้นขอบตั้ง vector-effect non-scaling-stroke ความหนาจึงเป็นพิกเซลจริง ไม่ถูกยืดตาม viewBox
 *    ขอบนอกของวงถูกขอบทับเข้ามา 1 ฝั่งในแผ่นกลางกว้างขึ้นอีก gap เพื่อกินขอบใน 1 ให้เท่ากัน วงจึงดูบางลง 2 เหมือนในไฟล์ออกแบบ
 *    ช่องคั่นกับรูกลางเป็นสีพื้นหลักของหน้า วางกราฟบนพื้นสีอื่นแล้วจะเห็นเป็นสีพื้นหลัก
 *
 * ⚠️ เริ่ม 12 นาฬิกา เดินตามเข็ม ชิ้นไม่มีมุมโค้ง ชิ้น "อื่น ๆ" อยู่ท้ายวงเสมอ
 *    ไม่ส่ง `categories` เรียงตามค่ามากไปน้อย มีหมวดไม่เกิน maxSlices + 1 แสดงครบ
 *    เกินกว่านั้นเก็บ maxSlices หมวดแรก ที่เหลือรวมเป็น "อื่น ๆ"
 *    ส่ง `categories` แสดงชื่อเฉพาะหมวดในรายการ ตามลำดับรายการ หมวดนอกรายการรวมเป็น "อื่น ๆ"
 *    สองวงที่วางคู่กันจึงส่งรายการเดียวกัน แล้วได้ชิ้นและสีชุดเดียวกัน
 *
 * ⚠️ สีตามลำดับชิ้น chart/color/category-1 ถึง 8 เกิน 8 วนกลับไป 1 ชิ้น "อื่น ๆ" ใช้ category-other
 *    ระบุสีเองได้ด้วย field `color` เป็นเลขลำดับ 1 ถึง 8 หรือ 'other' ไม่รับค่าสีดิบ
 *    ระบุเองแล้วสีที่อยู่ข้างกันอาจใกล้กันจนแยกยาก ลำดับตั้งต้นเรียงมาให้สีข้างกันต่างกันแล้ว
 *
 * ⚠️ ชี้หรือโฟกัสชิ้น (หรือชี้แถวคำอธิบายสี) ชิ้นนั้นสีเต็ม ชิ้นอื่นมีชั้นทับสี --ntg-chart-color-dim
 *    ชั้นทับเป็น path ซ้ำของชิ้นนั้น วาดต่อจากชิ้นจริง ไม่ใช้ opacity เพราะระบบไม่มี token ความโปร่ง
 *    รอบแรกไม่มีการกดชิ้น
 *
 * ⚠️ การเข้าถึง (แบบเดียวกับ BarChart)
 *    <figure> ได้ชื่อจาก `summary` ผ่าน figcaption ที่ซ่อนจากสายตา
 *    SVG เป็น role="group" จุดหยุด Tab จุดเดียว (roving tabindex) ลูกศรขวาหรือลงไปชิ้นถัดไป ซ้ายหรือขึ้นย้อนกลับ
 *    Home กับ End ไปชิ้นแรกกับชิ้นสุดท้าย Escape ปิดคำใบ้ แต่ละชิ้นเป็น role="img" มีชื่อที่บอกข้อมูลครบ
 *    เช่น "เศรษฐกิจ 372 ข่าว 30%" คำใบ้จึงตั้ง relationship="inaccessible" ไม่ให้ได้ฟังซ้ำ
 *    ชิ้นที่โฟกัสด้วยคีย์บอร์ดมีวงแหวนโฟกัส --ntg-focused-ring-brand รอบวงโดนัท และชิ้นอื่นจางลง
 *    ข้าง ๆ มี <table> จริงที่ซ่อนจากสายตา แสดงครบทุกหมวด (ไม่รวมเป็น "อื่น ๆ")
 *    และมีปุ่ม "ดูเป็นตาราง" ที่สลับกราฟเป็นตาราง Table ของระบบ
 *
 * ⚠️ ข้อยกเว้นจากสเปค Tooltip ที่ห้ามใส่ข้อมูลจำเป็นในคำใบ้ เหมือน BarChart
 *    ตัวเลขเต็มในคำใบ้อ่านได้ครบจากตารางที่สลับด้วยปุ่มและจากตารางที่ซ่อนไว้
 *
 * ⚠️ ต้อง render บนเซิร์ฟเวอร์ได้ (Next 12/14 SSR) ไม่มีการวัดขนาด ไม่แตะ window หรือ document ระหว่าง render
 *
 * ค่าสี ระยะ ขนาด และตัวอักษรทั้งหมดมาจาก design tokens ผ่าน CSS variables ไม่มีค่า hard-code
 */
import React, { useId, useRef, useState } from 'react';
import { Button } from '../Button';
import { Table, type TableColumn } from '../Table';
import { Tooltip, type TooltipPlacement } from '../Tooltip';
import styles from './PieChart.module.css';

/** ขนาดวงโดนัท ตรงกับแกน size ใน Figma */
export type PieChartSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * สีของหมวด เลขลำดับของ chart/color/category-1 ถึง 8 หรือ 'other' (category-other)
 * ไม่รับค่าสีดิบโดยตั้งใจ
 */
export type PieChartColor = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'other';

export interface PieChartDatum {
  /** ชื่อหมวด แสดงในคำอธิบายสี คำใบ้ และตาราง ใช้จับคู่กับ `categories` ด้วย */
  label: string;
  /** ค่าของหมวด ค่าติดลบหรือไม่ใช่ตัวเลขถูกปัดเป็น 0 */
  value: number;
  /**
   * ระบุสีของหมวดนี้เอง ไม่ส่งคือสีตามลำดับชิ้น
   * ⚠️ ระบุเองแล้วสีข้างกันอาจใกล้กัน ดู README
   * ใช้กับหมวดที่แสดงชื่อเท่านั้น หมวดที่ถูกรวมเป็น "อื่น ๆ" ใช้สีของชิ้น "อื่น ๆ"
   */
  color?: PieChartColor;
}

export interface PieChartProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  /** ข้อมูลทุกหมวด ลำดับใน array ไม่มีผล (เรียงตามค่า หรือตาม `categories`) */
  data: PieChartDatum[];
  /**
   * สรุปใจความของกราฟเป็นประโยค เช่น "สัดส่วนข่าวตามหมวด เศรษฐกิจมากที่สุด 30%"
   * เป็นชื่อของกราฟ (figcaption ที่ซ่อนไว้) และเป็น caption ของตาราง บังคับส่ง
   */
  summary: string;
  /** ขนาดวงโดนัท ตรงกับแกน `size` ใน Figma ค่าเริ่มต้น `md` (160) */
  size?: PieChartSize;
  /**
   * จำนวนหมวดที่แสดงชื่อเมื่อไม่ส่ง `categories` ค่าเริ่มต้น 5
   * มีหมวดไม่เกิน maxSlices + 1 แสดงครบ เกินกว่านั้นที่เหลือรวมเป็น "อื่น ๆ"
   */
  maxSlices?: number;
  /**
   * รายการชื่อหมวดที่จะแสดงชื่อ เรียงตามลำดับนี้ หมวดนอกรายการรวมเป็น "อื่น ๆ"
   * ส่งแล้วไม่ใช้ `maxSlices` สองวงที่วางคู่กันให้ส่งรายการเดียวกัน
   * หมวดในรายการที่ไม่มีในข้อมูลยังแสดงในคำอธิบายสีเป็น 0% แต่ไม่มีชิ้น
   */
  categories?: string[];
  /** ชื่อของชิ้นที่รวมหมวดที่เหลือ ค่าเริ่มต้น "อื่น ๆ" */
  otherLabel?: string;
  /**
   * ยอดกลางวง ตรงกับ property `total` ใน Figma ค่าเริ่มต้นคือผลรวมของ `data`
   * ตัวเลขจัดรูปด้วย Intl ภาษาไทย ข้อความแสดงตามที่ส่ง สัดส่วน % คิดจากผลรวมของ `data` เสมอ
   */
  total?: number | string;
  /** ป้ายใต้ยอดกลางวง เช่น "ข่าวทั้งหมด" ตรงกับ property `total-label` ใน Figma ไม่ส่งคือไม่มีป้าย */
  totalLabel?: string;
  /** หน่วยต่อท้ายตัวเลขในคำใบ้ ชื่อของชิ้น และหัวคอลัมน์ของตาราง เช่น `ข่าว` `ครั้ง` */
  unit?: string;
  /** หัวคอลัมน์ชื่อหมวดของตาราง ค่าเริ่มต้น "หมวด" */
  categoryLabel?: string;
  /** หัวคอลัมน์ค่าของตาราง ค่าเริ่มต้น "จำนวน" (ต่อท้ายด้วยหน่วยในวงเล็บถ้ามี `unit`) */
  valueLabel?: string;
  /** แสดงคำอธิบายสีใต้วง ตรงกับ property `show-legend` ใน Figma ค่าเริ่มต้น true */
  showLegend?: boolean;
  /** แสดงปุ่ม "ดูเป็นตาราง" ใต้กราฟ กดแล้วกราฟถูกแทนด้วยตาราง Table ของระบบ ค่าเริ่มต้น true */
  showTableToggle?: boolean;
}

/** จำนวนหมวดที่แสดงชื่อตั้งต้น (ข้อตัดสิน 10.1) */
export const PIE_CHART_DEFAULT_MAX_SLICES = 5;
/** จำนวนสีหมวด chart/color/category-1 ถึง 8 เกินนี้วนกลับ */
export const PIE_CHART_CATEGORY_COLORS = 8;

const COLOR_CLASS: Record<string, string> = {
  1: styles.c1,
  2: styles.c2,
  3: styles.c3,
  4: styles.c4,
  5: styles.c5,
  6: styles.c6,
  7: styles.c7,
  8: styles.c8,
  other: styles.cOther,
};

const SIZE_CLASS: Record<PieChartSize, string> = {
  xs: styles.xs,
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
  xl: styles.xl,
};

// สร้างครั้งเดียว ใช้ซ้ำทุก render
const fullFormat = new Intl.NumberFormat('th-TH');
const percentFormat = new Intl.NumberFormat('th-TH', { style: 'percent', maximumFractionDigits: 1 });

const clampValue = (v: number) => (Number.isFinite(v) && v > 0 ? v : 0);
const roundFloat = (n: number) => Number(n.toPrecision(12));

/** "372 ข่าว" หรือ "372" เมื่อไม่มีหน่วย */
const withUnit = (value: number, unit?: string) =>
  unit ? `${fullFormat.format(value)} ${unit}` : fullFormat.format(value);

/** หนึ่งชิ้นของวงหลังจัดกลุ่มแล้ว */
export interface PieChartSlice {
  label: string;
  value: number;
  /** สัดส่วน 0 ถึง 1 ของผลรวม */
  share: number;
  color: PieChartColor;
  /** เป็นชิ้น "อื่น ๆ" หรือไม่ */
  isOther: boolean;
  /** หมวดที่ถูกรวมในชิ้น "อื่น ๆ" เรียงมากไปน้อย (ชิ้นปกติเป็น array ว่าง) */
  members: { label: string; value: number }[];
}

/**
 * จัดข้อมูลเป็นชิ้นของวง ตามกติกาเลือกและเรียงหมวดของข้อตัดสิน 10.1
 * แยกออกมาเป็นฟังก์ชันล้วน ทดสอบได้โดยไม่ต้อง render
 */
export function pieChartSlices(
  data: PieChartDatum[],
  { maxSlices = PIE_CHART_DEFAULT_MAX_SLICES, categories, otherLabel = 'อื่น ๆ' }: {
    maxSlices?: number;
    categories?: string[];
    otherLabel?: string;
  } = {},
): { slices: PieChartSlice[]; sum: number; rows: { label: string; value: number }[] } {
  // รวมค่าของชื่อซ้ำ เก็บสีที่ระบุไว้ตัวแรก
  const byLabel = new Map<string, { label: string; value: number; color?: PieChartColor }>();
  for (const d of data) {
    const prev = byLabel.get(d.label);
    if (prev) {
      prev.value += clampValue(d.value);
      prev.color ??= d.color;
    } else byLabel.set(d.label, { label: d.label, value: clampValue(d.value), color: d.color });
  }
  const all = Array.from(byLabel.values());
  const sum = all.reduce((s, d) => s + d.value, 0);
  const byValue = (a: { value: number }, b: { value: number }) => b.value - a.value;

  let named: { label: string; value: number; color?: PieChartColor }[];
  let rest: { label: string; value: number }[];
  if (categories) {
    const listed = new Set(categories);
    named = categories.map((c) => byLabel.get(c) ?? { label: c, value: 0 });
    rest = all.filter((d) => !listed.has(d.label));
  } else {
    // ค่า 0 ไม่มีชิ้นและไม่นับเป็นหมวด (ยังอยู่ในตาราง)
    const sorted = all.filter((d) => d.value > 0).sort(byValue);
    const max = Math.max(0, Math.floor(maxSlices));
    const keep = sorted.length <= max + 1 ? sorted.length : max;
    named = sorted.slice(0, keep);
    rest = sorted.slice(keep);
  }

  const share = (v: number) => (sum > 0 ? v / sum : 0);
  const slices: PieChartSlice[] = named.map((d, i) => ({
    label: d.label,
    value: d.value,
    share: share(d.value),
    color: d.color ?? (((i % PIE_CHART_CATEGORY_COLORS) + 1) as PieChartColor),
    isOther: false,
    members: [],
  }));
  const members = rest.filter((d) => d.value > 0).sort(byValue);
  const otherValue = members.reduce((s, d) => s + d.value, 0);
  if (otherValue > 0) {
    slices.push({
      label: otherLabel,
      value: otherValue,
      share: share(otherValue),
      color: 'other',
      isOther: true,
      members: members.map(({ label, value }) => ({ label, value })),
    });
  }
  // แถวของตาราง ครบทุกหมวด หมวดที่แสดงชื่อตามลำดับชิ้น ตามด้วยหมวดที่ถูกรวมเป็น "อื่น ๆ" แล้วหมวดที่มีค่า 0
  const rows = slices.flatMap((s) => (s.isOther ? s.members : [{ label: s.label, value: s.value }]));
  const seen = new Set(rows.map((r) => r.label));
  for (const d of all) if (!seen.has(d.label)) rows.push({ label: d.label, value: d.value });
  return { slices, sum, rows };
}

/** จุดบนขอบนอก (รัศมี 50 ใน viewBox 100) ของมุมเป็นรอบ เริ่ม 12 นาฬิกา ตามเข็ม */
const pointAt = (turn: number, r = 50) => {
  const a = turn * 2 * Math.PI;
  return { x: roundFloat(50 + r * Math.sin(a)), y: roundFloat(50 - r * Math.cos(a)) };
};

/** path ลิ่มจากจุดศูนย์กลางถึงขอบนอก จากมุม a0 ถึง a1 (เป็นรอบ) ชิ้นเต็มวงวาดเป็นวงกลมไม่มีเส้นรัศมี */
const wedgePath = (a0: number, a1: number) => {
  if (a1 - a0 >= 1 - 1e-9) return 'M 50 0 A 50 50 0 1 1 50 100 A 50 50 0 1 1 50 0 Z';
  const p0 = pointAt(a0);
  const p1 = pointAt(a1);
  const large = a1 - a0 > 0.5 ? 1 : 0;
  return `M 50 50 L ${p0.x} ${p0.y} A 50 50 0 ${large} 1 ${p1.x} ${p1.y} Z`;
};

/** ทิศของคำใบ้ ชี้ออกจากวงตามมุมกลางของชิ้น จึงไม่บังวง */
const placementAt = (turn: number): TooltipPlacement => {
  const t = ((turn % 1) + 1) % 1;
  if (t < 0.125 || t >= 0.875) return 'top';
  if (t < 0.375) return 'right';
  if (t < 0.625) return 'bottom';
  return 'left';
};

/**
 * @example
 * <PieChart
 *   summary="สัดส่วนข่าวตามหมวด เศรษฐกิจมากที่สุด 30%"
 *   totalLabel="ข่าวทั้งหมด"
 *   unit="ข่าว"
 *   data={[
 *     { label: 'เศรษฐกิจ', value: 372 },
 *     { label: 'การเมือง', value: 273 },
 *   ]}
 * />
 */
export function PieChart({
  data,
  summary,
  size = 'md',
  maxSlices = PIE_CHART_DEFAULT_MAX_SLICES,
  categories,
  otherLabel = 'อื่น ๆ',
  total,
  totalLabel,
  unit,
  categoryLabel = 'หมวด',
  valueLabel = 'จำนวน',
  showLegend = true,
  showTableToggle = true,
  className,
  ...rest
}: PieChartProps) {
  const { slices, sum, rows } = pieChartSlices(data, { maxSlices, categories, otherLabel });

  // มุมเริ่มและจบของแต่ละชิ้น ชิ้นค่า 0 ไม่มีมุม ไม่มี path และไม่รับโฟกัส
  const arcs: { index: number; a0: number; a1: number }[] = [];
  {
    let acc = 0;
    slices.forEach((s, index) => {
      if (s.share <= 0) return;
      arcs.push({ index, a0: acc, a1: acc + s.share });
      acc += s.share;
    });
  }

  // ── สถานะ ──
  const baseId = useId();
  const captionId = `${baseId}-caption`;
  const [tableView, setTableView] = useState(false);
  /** ลำดับใน arcs ที่ถือจุดหยุด Tab (roving tabindex) */
  const [activeIndex, setActiveIndex] = useState(0);
  /** ลำดับใน arcs ที่คำใบ้กำลังแสดง ว่างคือไม่แสดง คำใบ้มีใบเดียวทั้งกราฟ */
  const [tipIndex, setTipIndex] = useState<number | null>(null);
  /** ลำดับใน slices ของแถวคำอธิบายสีที่ชี้อยู่ */
  const [legendIndex, setLegendIndex] = useState<number | null>(null);
  /** มีชิ้นที่โฟกัสด้วยคีย์บอร์ดอยู่ ใช้แสดงวงแหวนโฟกัสรอบวง */
  const [focusRing, setFocusRing] = useState(false);
  const count = arcs.length;
  const active = Math.min(activeIndex, Math.max(0, count - 1));
  const sliceRefs = useRef<(SVGPathElement | null)[]>([]);

  /** ชิ้นที่เน้นอยู่ (ลำดับใน slices) ชิ้นอื่นจางลง */
  const highlighted = tipIndex !== null ? (arcs[tipIndex]?.index ?? null) : legendIndex;

  // ── ข้อความของแต่ละชิ้น ──
  const pct = (s: PieChartSlice) => percentFormat.format(s.share);
  const membersText = (s: PieChartSlice) => (s.isOther ? `รวม ${s.members.map((m) => m.label).join(', ')}` : '');
  const sliceName = (s: PieChartSlice) =>
    [s.label, withUnit(s.value, unit), pct(s), membersText(s)].filter(Boolean).join(' ');

  // ── คีย์บอร์ด: จุดหยุดเดียว ลูกศร Home End Escape ──
  const moveTo = (i: number) => {
    const next = Math.max(0, Math.min(count - 1, i));
    setActiveIndex(next);
    sliceRefs.current[next]?.focus();
  };
  const onKeyDown = (e: React.KeyboardEvent<SVGSVGElement>) => {
    if (count === 0) return;
    /* Escape ปิดคำใบ้ (WCAG 1.4.13 Dismissible) หยุดเหตุการณ์ไว้ ไม่ให้ไหลไปปิด modal ที่ครอบกราฟอยู่ */
    if (e.key === 'Escape' && tipIndex !== null) {
      e.stopPropagation();
      setTipIndex(null);
      return;
    }
    let target: number | null = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') target = active + 1;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') target = active - 1;
    else if (e.key === 'Home') target = 0;
    else if (e.key === 'End') target = count - 1;
    if (target === null) return;
    e.preventDefault();
    moveTo(target);
  };

  const toggle = showTableToggle && (
    <Button
      family="neutral"
      hierarchy="secondary"
      size="sm"
      aria-pressed={tableView}
      onClick={() => setTableView((v) => !v)}
    >
      {tableView ? 'ดูเป็นกราฟ' : 'ดูเป็นตาราง'}
    </Button>
  );

  // ── ตาราง แสดงครบทุกหมวด (ลำดับมาจาก pieChartSlices) ──
  const shareText = (v: number) => percentFormat.format(sum > 0 ? v / sum : 0);
  const valueHeader = unit ? `${valueLabel} (${unit})` : valueLabel;
  const tableColumns: TableColumn<{ label: string; value: number }>[] = [
    { id: 'category', header: categoryLabel, rowHeader: true, accessor: (r) => r.label },
    { id: 'value', header: valueHeader, variant: 'number', accessor: (r) => fullFormat.format(r.value) },
    { id: 'share', header: 'สัดส่วน', variant: 'number', accessor: (r) => shareText(r.value) },
  ];

  const totalText =
    total === undefined ? fullFormat.format(sum) : typeof total === 'number' ? fullFormat.format(total) : total;

  const classes = [styles.root, SIZE_CLASS[size], className].filter(Boolean).join(' ');
  const tipArc = tipIndex !== null ? arcs[tipIndex] : undefined;

  return (
    <figure className={classes} aria-labelledby={captionId} {...rest}>
      <figcaption id={captionId} className={styles.srOnly}>
        {summary}
      </figcaption>

      {tableView ? (
        <Table
          columns={tableColumns}
          data={rows}
          getRowId={(r) => r.label}
          caption={summary}
          captionHidden
        />
      ) : (
        <>
          <div className={`${styles.donut} ${focusRing ? styles.focused : ''}`}>
            <svg
              className={styles.svg}
              viewBox="0 0 100 100"
              role="group"
              aria-labelledby={captionId}
              focusable="false"
              onKeyDown={onKeyDown}
            >
              {count === 0 && <circle className={styles.empty} cx="50" cy="50" r="50" />}
              {arcs.map((arc, ai) => {
                const s = slices[arc.index];
                const d = wedgePath(arc.a0, arc.a1);
                const dimmed = highlighted !== null && highlighted !== arc.index;
                return (
                  <g key={`${s.label}-${arc.index}`} className={COLOR_CLASS[String(s.color)]}>
                    <path
                      ref={(el) => {
                        sliceRefs.current[ai] = el;
                      }}
                      d={d}
                      className={styles.slice}
                      role="img"
                      aria-label={sliceName(s)}
                      tabIndex={ai === active ? 0 : -1}
                      onPointerEnter={(e) => {
                        /* จอสัมผัสไม่แสดงคำใบ้ ตามกติกาของ Tooltip */
                        if (e.pointerType !== 'touch') setTipIndex(ai);
                      }}
                      onPointerLeave={() => setTipIndex((t) => (t === ai ? null : t))}
                      onFocus={(e) => {
                        setActiveIndex(ai);
                        /* เปิดเฉพาะโฟกัสจากคีย์บอร์ด เหมือนที่ Tooltip ทำ */
                        if (e.currentTarget.matches(':focus-visible')) {
                          setTipIndex(ai);
                          setFocusRing(true);
                        }
                      }}
                      onBlur={() => {
                        setTipIndex((t) => (t === ai ? null : t));
                        setFocusRing(false);
                      }}
                    />
                    {dimmed && <path d={d} className={styles.dim} aria-hidden="true" />}
                  </g>
                );
              })}
            </svg>

            {/* รูกลางวง แผ่นกลมสีพื้นทับลิ่ม ถือยอดรวมและป้าย และกันตัวชี้ไม่ให้โดนชิ้นตรงกลาง */}
            <div className={styles.hole} aria-hidden="true">
              <span className={styles.total}>{totalText}</span>
              {totalLabel && <span className={styles.totalLabel}>{totalLabel}</span>}
            </div>

            {/* คำใบ้ใบเดียวของกราฟ วางที่ขอบนอกตรงมุมกลางของชิ้นที่ชี้อยู่ ชี้ออกจากวง */}
            {tipArc &&
              (() => {
                const s = slices[tipArc.index];
                const mid = (tipArc.a0 + tipArc.a1) / 2;
                const p = pointAt(mid);
                return (
                  <div className={styles.tipSpot} style={{ left: `${p.x}%`, top: `${p.y}%` }}>
                    <Tooltip
                      open
                      title={s.label}
                      description={[withUnit(s.value, unit), pct(s), membersText(s)].filter(Boolean).join('\n')}
                      size="sm"
                      placement={placementAt(mid)}
                      relationship="inaccessible"
                      wrapperClassName={styles.tipWrap}
                    >
                      <span className={styles.tipAnchor} />
                    </Tooltip>
                  </div>
                );
              })()}
          </div>

          {showLegend && (
            <ul className={styles.legend} aria-hidden="true">
              {slices.map((s, i) => (
                <li
                  key={`${s.label}-${i}`}
                  className={`${styles.legendItem} ${COLOR_CLASS[String(s.color)]}`}
                  onPointerEnter={(e) => {
                    if (e.pointerType !== 'touch' && s.share > 0) setLegendIndex(i);
                  }}
                  onPointerLeave={() => setLegendIndex((l) => (l === i ? null : l))}
                >
                  <span className={styles.dot} />
                  <span>{s.label}</span>
                  <span className={styles.legendValue}>{pct(s)}</span>
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      {toggle}

      {!tableView && (
        <table className={styles.srOnly}>
          <caption>{summary}</caption>
          <thead>
            <tr>
              <th scope="col">{categoryLabel}</th>
              <th scope="col">{valueHeader}</th>
              <th scope="col">สัดส่วน</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label}>
                <th scope="row">{r.label}</th>
                <td>{fullFormat.format(r.value)}</td>
                <td>{shareText(r.value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </figure>
  );
}

export default PieChart;
