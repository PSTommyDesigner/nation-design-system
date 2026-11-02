/**
 * BarChart Nation Design System
 *
 * กราฟแท่งแนวตั้งแบบจัดกลุ่ม (grouped) แกน y ได้สองข้าง ผสมเส้นได้หนึ่งชุด ตรงกับ component `bar-chart`
 * ในไฟล์ออกแบบหน้า 29 Chart (node 11797:2) และชิ้นส่วนแท่ง `_bar-chart-bar` (node 11796:5)
 * ที่มาของทุกการตัดสินใจ docs/research/chart-component.md หัวข้อ 9
 *
 * ⚠️ แท่งกับจุดวาดด้วย HTML กับ CSS (flex) เส้นวาดด้วย SVG ไม่ใช้ไลบรารีกราฟ และไม่ยืดด้วย viewBox
 *    ทุกค่าสี ระยะ มุมโค้ง จึงผูกกับ CSS variable ของ token ได้ตรง ๆ แก้ token แล้วกราฟเปลี่ยนตาม
 *    ความสูงของแท่งและจุดเป็นเปอร์เซ็นต์ของพื้นที่กราฟ ซึ่งเป็นข้อมูล ไม่ใช่ค่าออกแบบ จึงอยู่ใน inline style
 *    SVG ของเส้นไม่มี viewBox หน่วยของมันจึงเท่ากับพิกเซลจริง ความหนาเส้นไม่ถูกยืด
 *    พิกัดของเส้นอ่านจากตำแหน่งจริงของจุดหลังจัดผังแล้ว เส้นจึงลากผ่านกลางจุดทุกจุดพอดี
 *
 * ⚠️ ต้อง render บนเซิร์ฟเวอร์ได้ (Next 12/14 SSR)
 *    รอบแรกไม่รู้ความกว้าง จึงแสดงป้ายแกน x ครบทุกตัวและไม่เลื่อน
 *    แท่ง จุด และช่องรับโฟกัสวางด้วย CSS ล้วน จึงออกมาครบตั้งแต่รอบเซิร์ฟเวอร์
 *    เส้นต้องรู้พิกัดเป็นพิกเซล จึงยังไม่วาดในรอบเซิร์ฟเวอร์ และโผล่หลังติดตั้งแล้ววัดตำแหน่งจุดได้
 *    หลังติดตั้งแล้ว ResizeObserver วัดความกว้างจริงของพื้นที่กราฟ แล้วค่อยลดป้ายหรือเปิดการเลื่อน
 *    ห้ามแตะ window หรือ document ระหว่าง render
 *
 * ⚠️ ขีดแกน y 4 ช่อง 5 เส้นเสมอ และเท่ากันทั้งสองแกน เส้นกริดจึงตรงกันทั้งสองข้าง
 *    ขั้นคือ niceCeil(ค่าสูงสุด / 4) จากชุด 1, 1.5, 2, 2.5, 3, 4, 5, 6, 8 คูณสิบยกกำลัง แกนเริ่มที่ 0 เสมอ
 *    ค่าสูงสุดของแกนนับทั้งชุดแท่งและชุดเส้นที่อยู่แกนนั้น
 *
 * ⚠️ ช่องของหนึ่งหมวดกว้าง 28 (--ntg-size-space-s2-xl) แท่งอยู่กลางช่อง
 *    มีชุดแท่งชุดเดียว แท่งกว้าง 12 อยู่กลางช่อง สองชุด แท่ง 12 สองแท่งห่างกัน 4 เต็มช่องพอดี
 *    จุดของเส้นอยู่กลางช่องที่ความสูงของค่าบนแกนของชุดเส้น
 *
 * ⚠️ จอแคบ (ข้อเสนอ 15 ของงานวิจัย) เกณฑ์เป็นพิกเซลต่อช่องของหนึ่งกลุ่ม
 *    ช่องตั้งแต่ 24 ขึ้นไป แสดงป้ายแกน x ทุกตัว
 *    แคบกว่านั้น แสดงเฉพาะลำดับที่ 1, 5, 10, 15, 20, 25, 30 ตัวที่เหลือซ่อนแต่ยังกินที่ เพื่อให้ตรงกับแท่ง
 *    ต่ำกว่า 14 พื้นที่กราฟเลื่อนแนวนอนได้ แกน y สองข้างตรึงอยู่กับที่
 *    กลุ่มแท่งกว้างไม่เกิน 0.7 ของช่อง (ข้อเสนอ 1) แท่งหดตามเมื่อช่องแคบ ระยะระหว่างแท่งในกลุ่มคงเดิม
 *    เกณฑ์ทั้งสามเป็นค่าพฤติกรรม ไม่ใช่ค่าที่วาดลงจอ จึงเป็นค่าคงที่ในไฟล์นี้ ไม่ใช่ token
 *
 * ⚠️ สีมีให้แท่ง 2 ชุด (chart/color/series-1 กับ series-2 ตามลำดับของชุดแท่ง) และเส้น 1 ชุด (chart/color/line)
 *    ส่งชุดแท่งเกิน 2 หรือชุดเส้นเกิน 1 จะเตือนในโหมดพัฒนาและไม่วาดชุดที่เกิน ห้ามเติมสีเอง ให้ขอ token ก่อน
 *
 * ⚠️ การเข้าถึง
 *    role="img" ซ่อนลูกทุกตัวจากโปรแกรมอ่านหน้าจอ รอบนี้มีช่องที่รับโฟกัสได้ จึงเลิกใช้ role img ที่ตัวกราฟ
 *    <figure> ได้ชื่อจาก `summary` ผ่าน aria-labelledby ที่ชี้ไป figcaption ที่ซ่อนจากสายตา
 *    พื้นที่กราฟเป็น role="group" จุดหยุด Tab จุดเดียว (roving tabindex) ลูกศรซ้ายขวาเลื่อนทีละหมวด
 *    Home กับ End ไปหมวดแรกกับหมวดสุดท้าย แต่ละช่องมีชื่อที่บอกข้อมูลครบ เช่น
 *    "วันที่ 10 ข่าวที่สร้าง 28 ข่าว การเข้าชม 126,353 ครั้ง"
 *    คำใบ้จึงตั้ง relationship="inaccessible" ไม่ให้ได้ฟังซ้ำสองรอบ
 *    ข้าง ๆ มี <table> จริงที่ซ่อนจากสายตา และมีปุ่ม "ดูเป็นตาราง" ที่สลับกราฟเป็นตาราง Table ของระบบให้เห็นด้วยตา
 *    ไม่มีแอนิเมชันนอกจากของ Tooltip ซึ่งดูแล prefers-reduced-motion เองแล้ว
 *
 * ⚠️ ข้อยกเว้นจากสเปค Tooltip ที่ห้ามใส่ข้อมูลจำเป็นในคำใบ้ (จอสัมผัสไม่เห็นคำใบ้)
 *    ตัวเลขเต็มในคำใบ้ยังอ่านได้ครบจากตารางที่สลับด้วยปุ่ม และจากตารางที่ซ่อนไว้ คำใบ้จึงเป็นทางลัด ไม่ใช่ทางเดียว
 *
 * ⚠️ ไม่มี prop ความกว้าง กราฟยืดเต็มกรอบแม่เสมอ อยากให้แคบลงให้ไปจำกัดที่กรอบแม่
 *    ความสูงของพื้นที่กราฟเป็นค่าผังของหน้า (เหมือนความยาวของ Divider) จึงเป็น prop `height`
 *    ค่าเริ่มต้น 340 ตามไฟล์ออกแบบ ระบบไม่มี token ความสูงกราฟ
 *
 * ค่าสี ระยะ มุมโค้ง และตัวอักษรทั้งหมดมาจาก design tokens ผ่าน CSS variables ไม่มีค่า hard-code
 */
import React, { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { Button } from '../Button';
import { Table, type TableColumn } from '../Table';
import { Tooltip, type TooltipPlacement } from '../Tooltip';
import styles from './BarChart.module.css';

/** ข้างของแกน y ที่ชุดข้อมูลอ้างอิง */
export type BarChartAxis = 'left' | 'right';

/** รูปแบบการวาดชุดข้อมูล */
export type BarChartSeriesType = 'bar' | 'line';

export interface BarChartSeries {
  /** ชื่อชุดข้อมูล แสดงในคำอธิบายสี คำใบ้ และเป็นหัวคอลัมน์ของตาราง */
  label: string;
  /** ค่าของแต่ละหมวด เรียงตรงกับ `categories` ค่าติดลบไม่รองรับ จะถูกปัดเป็น 0 */
  values: number[];
  /** แกนที่ใช้วัด ค่าเริ่มต้น `left` ชุดเส้นก็ใช้แกนของตัวเอง */
  axis?: BarChartAxis;
  /**
   * วาดเป็นแท่งหรือเส้น ค่าเริ่มต้น `bar`
   * ชุดแท่งเท่านั้นที่กินที่ในช่อง ชุดเส้นวาดทับด้านบน รองรับชุดเส้นชุดเดียวในรอบนี้
   */
  type?: BarChartSeriesType;
  /** หน่วยต่อท้ายตัวเลขในคำใบ้และในหัวคอลัมน์ของตาราง เช่น `ข่าว` `ครั้ง` */
  unit?: string;
}

export interface BarChartProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  /** ป้ายแกน x หนึ่งป้ายต่อหนึ่งหมวด เช่น วันที่ 1 ถึง 31 */
  categories: string[];
  /**
   * ชุดข้อมูล รองรับชุดแท่ง 2 ชุดกับชุดเส้น 1 ชุด
   * ชุดแท่งใช้สีตามลำดับของชุดแท่ง ชุดแรก series-1 (เข้ม) ชุดที่สอง series-2 (อ่อนมีขอบ)
   * ชุดเส้นใช้สี chart/color/line ลำดับในคำใบ้และตารางเรียงตามลำดับใน array นี้
   */
  series: BarChartSeries[];
  /**
   * สรุปใจความของกราฟเป็นประโยค เช่น "ข่าวที่สร้างและการเข้าชมรายวันของเดือนตุลาคม สูงสุดวันที่ 21"
   * เป็นชื่อของกราฟ (figcaption ที่ซ่อนไว้) และเป็น caption ของตาราง บังคับส่ง
   */
  summary: string;
  /** ชื่อของแกน x นำหน้าป้ายในคำใบ้และชื่อช่อง และเป็นหัวคอลัมน์แรกของตาราง ค่าเริ่มต้น "รายการ" */
  categoryLabel?: string;
  /** แสดงคำอธิบายสีด้านบน ตรงกับ property `show-legend` ใน Figma ค่าเริ่มต้น true */
  showLegend?: boolean;
  /**
   * แสดงแกน y ด้านขวา ตรงกับ property `show-right-axis` ใน Figma
   * ค่าเริ่มต้นคือ true เมื่อมีชุดข้อมูลที่ใช้ `axis: 'right'` อย่างน้อยหนึ่งชุด
   */
  showRightAxis?: boolean;
  /**
   * แสดงปุ่ม "ดูเป็นตาราง" ท้ายแถวคำอธิบายสี (หรือเป็นแถวของตัวเองเมื่อปิดคำอธิบายสี)
   * กดแล้วกราฟถูกแทนด้วยตาราง Table ของระบบที่แสดงตัวเลขเต็ม ค่าเริ่มต้น true
   */
  showTableToggle?: boolean;
  /**
   * จัดรูปตัวเลขบนแกน y แยกต่อข้าง
   * ค่าเริ่มต้น `Intl.NumberFormat('th-TH', { notation: 'compact' })` เช่น 240K
   * คำใบ้และตารางใช้ตัวเลขเต็ม (240,000) เสมอ
   */
  formatValue?: Partial<Record<BarChartAxis, (value: number) => string>>;
  /** ความสูงของพื้นที่กราฟเป็นพิกเซล (ไม่นับคำอธิบายสีและแกน x) ค่าเริ่มต้น 340 ตามไฟล์ออกแบบ */
  height?: number;
}

// ── ค่าพฤติกรรม (ไม่ใช่ค่าที่วาดลงจอ) ที่มา docs/research/chart-component.md หัวข้อ 9 ──
/** ขีดแกน y 4 ช่อง 5 เส้น (ข้อเสนอ 6) */
export const BAR_CHART_TICK_INTERVALS = 4;
/** ตัวคูณขั้นที่ "สวย" (ข้อเสนอ 6) */
export const BAR_CHART_NICE_STEPS = [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8] as const;
/** ช่องตั้งแต่เท่านี้ แสดงป้ายแกน x ครบ (ข้อเสนอ 15) */
export const BAR_CHART_ALL_LABELS_MIN_SLOT = 24;
/** ช่องต่ำกว่านี้ เปิดการเลื่อนแนวนอน (ข้อเสนอ 15) */
export const BAR_CHART_SCROLL_MIN_SLOT = 14;
/** กลุ่มกินไม่เกินสัดส่วนนี้ของช่อง (ข้อเสนอ 1) */
export const BAR_CHART_GROUP_RATIO = 0.7;
/** ความสูงพื้นที่กราฟในไฟล์ออกแบบ */
export const BAR_CHART_DEFAULT_HEIGHT = 340;
/** จำนวนชุดแท่งที่มีสีให้ (chart/color/series-1 และ series-2) */
export const BAR_CHART_MAX_SERIES = 2;
/** จำนวนชุดเส้นที่มีสีให้ (chart/color/line) */
export const BAR_CHART_MAX_LINE_SERIES = 1;

const SERIES_CLASS = [styles.series1, styles.series2];
const THINNED_LABELS = new Set([1, 5, 10, 15, 20, 25, 30]);

const isDev = typeof process !== 'undefined' && process.env?.NODE_ENV !== 'production';

/** useLayoutEffect บนเบราว์เซอร์ useEffect บนเซิร์ฟเวอร์ กันคำเตือนตอน SSR */
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const roundFloat = (n: number) => Number(n.toPrecision(12));

/** ขั้นที่ปัดขึ้นเป็นค่าสวย เช่น 57,000 ได้ 60,000 และ 20 ได้ 20 */
export function niceCeil(raw: number): number {
  if (!(raw > 0) || !Number.isFinite(raw)) return 1;
  const power = 10 ** Math.floor(Math.log10(raw));
  const n = raw / power;
  const m = BAR_CHART_NICE_STEPS.find((s) => s >= n - 1e-9) ?? 10;
  return roundFloat(m * power);
}

/** ขีดแกน y 5 ค่าจาก 0 ถึงค่าสูงสุดที่ปัดแล้ว */
export function barChartTicks(maxValue: number): number[] {
  const step = niceCeil(maxValue / BAR_CHART_TICK_INTERVALS);
  return Array.from({ length: BAR_CHART_TICK_INTERVALS + 1 }, (_, i) => roundFloat(step * i));
}

// สร้างครั้งเดียว ใช้ซ้ำทุก render
const compactFormat = new Intl.NumberFormat('th-TH', { notation: 'compact' });
const fullFormat = new Intl.NumberFormat('th-TH');
const defaultFormat = (v: number) => compactFormat.format(v);

const clampValue = (v: number) => (Number.isFinite(v) && v > 0 ? v : 0);

interface Measure {
  /** ความกว้างของช่องหนึ่งกลุ่มเป็นพิกเซล */
  slot: number;
  /** padding ซ้ายบวกขวาของแถวแท่ง อ่านจาก CSS จริง (มาจาก token) */
  padX: number;
}

interface ResolvedSeries extends BarChartSeries {
  axis: BarChartAxis;
  type: BarChartSeriesType;
  /** ลำดับในกลุ่มชุดแท่ง ใช้เลือกสี (เฉพาะชุดแท่ง) */
  barIndex: number;
}

/** "28 ข่าว" หรือ "28" เมื่อไม่มีหน่วย */
const withUnit = (value: number, unit?: string) =>
  unit ? `${fullFormat.format(value)} ${unit}` : fullFormat.format(value);

/** หัวคอลัมน์ของตาราง "ข่าวที่สร้าง (ข่าว)" */
const columnHeader = (s: BarChartSeries) => (s.unit ? `${s.label} (${s.unit})` : s.label);

/**
 * @example
 * <BarChart
 *   summary="ข่าวที่สร้างและการเข้าชมรายวัน"
 *   categoryLabel="วันที่"
 *   categories={['1', '2', '3']}
 *   series={[
 *     { label: 'ข่าวที่สร้าง', values: [80, 66, 58], axis: 'right', unit: 'ข่าว' },
 *     { label: 'การเข้าชม', values: [216000, 169412, 139765], axis: 'left', type: 'line', unit: 'ครั้ง' },
 *   ]}
 * />
 */
export function BarChart({
  categories,
  series: seriesProp,
  summary,
  categoryLabel = 'รายการ',
  showLegend = true,
  showRightAxis,
  showTableToggle = true,
  formatValue,
  height = BAR_CHART_DEFAULT_HEIGHT,
  className,
  style,
  ...rest
}: BarChartProps) {
  // ── แยกชุดแท่งกับชุดเส้น ตัดชุดที่ไม่มีสี ──
  const barCount = seriesProp.filter((s) => (s.type ?? 'bar') === 'bar').length;
  const lineCount = seriesProp.length - barCount;
  if (isDev && barCount > BAR_CHART_MAX_SERIES) {
    console.warn(
      `[BarChart] ส่งชุดแท่งมา ${barCount} ชุด แต่มีสีให้แค่ ${BAR_CHART_MAX_SERIES} ชุด ชุดที่เกินจะไม่ถูกวาด`,
    );
  }
  if (isDev && lineCount > BAR_CHART_MAX_LINE_SERIES) {
    console.warn(
      `[BarChart] ส่งชุดเส้นมา ${lineCount} ชุด แต่รองรับแค่ ${BAR_CHART_MAX_LINE_SERIES} ชุด ชุดที่เกินจะไม่ถูกวาด`,
    );
  }
  const series: ResolvedSeries[] = [];
  {
    let bars = 0;
    let lines = 0;
    for (const s of seriesProp) {
      const type = s.type ?? 'bar';
      if (type === 'bar' && bars >= BAR_CHART_MAX_SERIES) continue;
      if (type === 'line' && lines >= BAR_CHART_MAX_LINE_SERIES) continue;
      series.push({ ...s, axis: s.axis ?? 'left', type, barIndex: type === 'bar' ? bars : -1 });
      if (type === 'bar') bars += 1;
      else lines += 1;
    }
  }
  const barSeries = series.filter((s) => s.type === 'bar');
  const lineSeries = series.find((s) => s.type === 'line');

  const hasRightSeries = series.some((s) => s.axis === 'right');
  const rightAxisOn = showRightAxis ?? hasRightSeries;
  if (isDev && !rightAxisOn && hasRightSeries) {
    console.warn('[BarChart] ปิดแกนขวาแต่ยังมีชุดที่ใช้ axis right ชุดนั้นจะไม่มีแกนให้อ่านค่า');
  }

  // ขีดของแต่ละแกน ใช้ค่าสูงสุดของชุดที่อยู่แกนนั้น ทั้งแท่งและเส้น
  const axisMax = (axis: BarChartAxis) =>
    Math.max(0, ...series.filter((s) => s.axis === axis).flatMap((s) => s.values.map(clampValue)));
  const ticks: Record<BarChartAxis, number[]> = {
    left: barChartTicks(axisMax('left')),
    right: barChartTicks(axisMax('right')),
  };
  const axisHasSeries = (axis: BarChartAxis) => series.some((s) => s.axis === axis);
  const fmt = (axis: BarChartAxis) => formatValue?.[axis] ?? defaultFormat;
  /** ความสูงเป็นเปอร์เซ็นต์ของพื้นที่กราฟ (หลังหักขอบบนล่าง) */
  const pctOf = (s: ResolvedSeries, ci: number) => {
    const v = clampValue(s.values[ci] ?? 0);
    const max = ticks[s.axis][BAR_CHART_TICK_INTERVALS] || 1;
    return Math.min(100, (v / max) * 100);
  };

  // ── สถานะ ──
  const baseId = useId();
  const captionId = `${baseId}-caption`;
  const [tableView, setTableView] = useState(false);
  /** ช่องที่ถือจุดหยุด Tab (roving tabindex) */
  const [activeIndex, setActiveIndex] = useState(0);
  const count = categories.length;
  const active = Math.min(activeIndex, Math.max(0, count - 1));
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);

  // ── วัดความกว้างจริงหลังติดตั้ง (รอบ SSR ไม่มีค่านี้) ──
  const scrollRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);
  const plotRef = useRef<HTMLDivElement>(null);
  const pointsRef = useRef<HTMLDivElement>(null);
  const [measure, setMeasure] = useState<Measure | null>(null);
  /** พิกัดของเส้นเป็นพิกเซล "x,y x,y ..." อ่านจากตำแหน่งจริงของจุด */
  const [linePoints, setLinePoints] = useState<string | null>(null);
  /** หมวดที่อยู่ชิดขอบกราฟจนคำใบ้ที่จัดกลางจะล้นออกนอกกราฟ s ชิดซ้าย e ชิดขวา ว่างคือจัดกลาง */
  const [edgeAlign, setEdgeAlign] = useState('');
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    const bars = barsRef.current;
    if (!el || !bars || typeof ResizeObserver === 'undefined' || count === 0) return;
    const update = () => {
      const cs = getComputedStyle(bars);
      const padX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
      const slot = (el.clientWidth - padX) / count;
      setMeasure((prev) => (prev && prev.slot === slot && prev.padX === padX ? prev : { slot, padX }));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [count, tableView]);

  // อ่านตำแหน่งกลางของจุดทุกจุดหลังจัดผัง ทำทุก render แต่ตั้งค่าเฉพาะเมื่อเปลี่ยน จึงไม่วนไม่จบ
  useIsoLayoutEffect(() => {
    // คำใบ้ของหมวดที่ชิดขอบ ถ้าจัดกลางจะล้นออกนอกกราฟ จึงชิดขอบแทน (Tooltip ยังไม่มีกลไกพลิกเมื่อชนขอบ)
    // ครึ่งความกว้างสูงสุดของคำใบ้อ่านจาก token --ntg-tooltip-max-width-sm ไม่ได้พิมพ์ค่าเอง
    const root = rootRef.current;
    if (root) {
      const box = root.getBoundingClientRect();
      const half = parseFloat(getComputedStyle(root).getPropertyValue('--ntg-tooltip-max-width-sm')) / 2 || 0;
      const next = slotRefs.current
        .slice(0, count)
        .map((el) => {
          if (!el || !half) return '';
          const r = el.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          if (cx - box.left < half) return 's';
          if (box.right - cx < half) return 'e';
          return '';
        })
        .join(',');
      setEdgeAlign((prev) => (prev === next ? prev : next));
    }
    const plot = plotRef.current;
    const layer = pointsRef.current;
    if (!plot || !layer || !lineSeries) {
      setLinePoints((prev) => (prev === null ? prev : null));
      return;
    }
    const origin = plot.getBoundingClientRect();
    const coords = Array.from(layer.querySelectorAll<HTMLElement>('[data-point]')).map((p) => {
      const r = p.getBoundingClientRect();
      const x = roundFloat(r.left + r.width / 2 - origin.left);
      const y = roundFloat(r.top + r.height / 2 - origin.top);
      return `${x},${y}`;
    });
    const next = coords.join(' ');
    setLinePoints((prev) => (prev === next ? prev : next));
  });

  const scrolling = measure !== null && measure.slot < BAR_CHART_SCROLL_MIN_SLOT;
  const effectiveSlot = measure ? Math.max(measure.slot, BAR_CHART_SCROLL_MIN_SLOT) : null;
  const thinLabels = effectiveSlot !== null && effectiveSlot < BAR_CHART_ALL_LABELS_MIN_SLOT;

  // ค่าที่มาจากข้อมูลหรือการวัด ส่งเข้า CSS เป็นตัวแปร ไม่ใช่ค่าออกแบบ
  const vars: Record<string, string | number> = {
    '--bc-plot-h': `${height}px`,
    '--bc-steps': Math.max(count - 1, 1),
  };
  if (effectiveSlot !== null) vars['--bc-group-max'] = `${effectiveSlot * BAR_CHART_GROUP_RATIO}px`;
  const innerStyle: React.CSSProperties | undefined =
    scrolling && measure ? { minWidth: `${count * BAR_CHART_SCROLL_MIN_SLOT + measure.padX}px` } : undefined;

  // ── ข้อความของแต่ละหมวด ──
  const categoryTitle = (ci: number) => `${categoryLabel} ${categories[ci]}`;
  const edges = edgeAlign.split(',');
  const placementOf = (ci: number): TooltipPlacement =>
    edges[ci] === 's' ? 'top-start' : edges[ci] === 'e' ? 'top-end' : 'top';
  const seriesLines = (ci: number) =>
    series.map((s) => `${s.label} ${withUnit(clampValue(s.values[ci] ?? 0), s.unit)}`);

  // ── คีย์บอร์ด: จุดหยุดเดียว ลูกศรซ้ายขวา Home End ──
  const moveTo = (i: number) => {
    const next = Math.max(0, Math.min(count - 1, i));
    setActiveIndex(next);
    slotRefs.current[next]?.focus();
  };
  const onPlotKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (count === 0) return;
    let target: number | null = null;
    if (e.key === 'ArrowRight') target = active + 1;
    else if (e.key === 'ArrowLeft') target = active - 1;
    else if (e.key === 'Home') target = 0;
    else if (e.key === 'End') target = count - 1;
    if (target === null) return;
    e.preventDefault();
    moveTo(target);
  };

  const swatch = (s: ResolvedSeries) =>
    s.type === 'line' ? (
      <span className={styles.lineSwatch} aria-hidden="true">
        <span className={styles.lineSwatchStroke} />
        <span className={styles.lineSwatchPoint} />
        <span className={styles.lineSwatchStroke} />
      </span>
    ) : (
      <span className={`${styles.dot} ${SERIES_CLASS[s.barIndex]}`} aria-hidden="true" />
    );

  const legendFor = (axis: BarChartAxis) =>
    series
      .map((s, i) => ({ s, i }))
      .filter(({ s }) => s.axis === axis)
      .map(({ s, i }) => (
        <span key={i} className={styles.legendItem}>
          {swatch(s)}
          {s.label}
        </span>
      ));

  const yAxis = (axis: BarChartAxis) => (
    <div className={`${styles.yAxis} ${axis === 'left' ? styles.yAxisLeft : styles.yAxisRight}`} aria-hidden="true">
      {axisHasSeries(axis) &&
        [...ticks[axis]].reverse().map((t) => (
          <span key={t} className={styles.yLabel}>
            {fmt(axis)(t)}
          </span>
        ))}
    </div>
  );

  const toggle = showTableToggle && (
    <Button
      family="neutral"
      hierarchy="secondary"
      size="sm"
      aria-pressed={tableView}
      onClick={() => setTableView((v) => !v)}
      className={styles.toggle}
    >
      {tableView ? 'ดูเป็นกราฟ' : 'ดูเป็นตาราง'}
    </Button>
  );

  const legendOn = showLegend && !tableView;
  const headerRow =
    legendOn || toggle ? (
      <div className={styles.legend}>
        {legendOn && (
          <>
            <span className={styles.legendGroup}>{legendFor('left')}</span>
            {rightAxisOn && <span className={styles.legendGroup}>{legendFor('right')}</span>}
          </>
        )}
        {toggle}
      </div>
    ) : null;

  // ── ตารางที่มองเห็นด้วยตา (Table ของระบบ) ──
  const rows = categories.map((_, ci) => ci);
  const tableColumns: TableColumn<number>[] = [
    { id: 'category', header: categoryLabel, rowHeader: true, accessor: (ci) => categories[ci] },
    ...series.map(
      (s, si): TableColumn<number> => ({
        id: `series-${si}`,
        header: columnHeader(s),
        variant: 'number',
        accessor: (ci) => fullFormat.format(clampValue(s.values[ci] ?? 0)),
      }),
    ),
  ];

  const classes = [styles.root, className].filter(Boolean).join(' ');

  return (
    <figure
      ref={rootRef}
      className={classes}
      style={{ ...vars, ...style } as React.CSSProperties}
      aria-labelledby={captionId}
      {...rest}
    >
      <figcaption id={captionId} className={styles.srOnly}>
        {summary}
      </figcaption>

      <div className={styles.graphic}>
        {headerRow}

        {tableView ? (
          <Table
            columns={tableColumns}
            data={rows}
            getRowId={(ci) => String(ci)}
            caption={summary}
            captionHidden
          />
        ) : (
          <div className={`${styles.body} ${rightAxisOn ? styles.withRight : ''}`}>
            {yAxis('left')}

            <div ref={scrollRef} className={`${styles.scroll} ${scrolling ? styles.scrolling : ''}`}>
              <div className={styles.scrollInner} style={innerStyle}>
                <div ref={plotRef} className={styles.plot}>
                  <div className={styles.grid} aria-hidden="true">
                    {ticks.left.map((t) => (
                      <span key={t} className={styles.gridLine} />
                    ))}
                  </div>

                  {/* ชั้นล่างสุดที่รับตัวชี้และโฟกัส แถบ hover อยู่ชั้นนี้ จึงอยู่ใต้แท่งและเส้น */}
                  <div
                    role="group"
                    aria-labelledby={captionId}
                    className={styles.slots}
                    onKeyDown={onPlotKeyDown}
                  >
                    {categories.map((c, ci) => {
                      const barTop = Math.max(0, ...barSeries.map((s) => pctOf(s, ci)));
                      const anchor = lineSeries
                        ? `max(${barTop}%, calc(${pctOf(lineSeries, ci)}% + var(--ntg-chart-point-size) / 2))`
                        : `${barTop}%`;
                      const lines = seriesLines(ci);
                      return (
                        <div
                          key={`${c}-${ci}`}
                          className={styles.slotCell}
                          style={{ '--bc-anchor': anchor } as React.CSSProperties}
                        >
                          <Tooltip
                            title={categoryTitle(ci)}
                            description={lines.join('\n')}
                            size="sm"
                            placement={placementOf(ci)}
                            relationship="inaccessible"
                            wrapperClassName={styles.slotWrap}
                          >
                            <div
                              ref={(el) => {
                                slotRefs.current[ci] = el;
                              }}
                              role="img"
                              aria-label={[categoryTitle(ci), ...lines].join(' ')}
                              tabIndex={ci === active ? 0 : -1}
                              className={styles.slot}
                              onFocus={() => setActiveIndex(ci)}
                            />
                          </Tooltip>
                        </div>
                      );
                    })}
                  </div>

                  <div ref={barsRef} className={styles.bars} aria-hidden="true">
                    {categories.map((c, ci) => (
                      <div key={`${c}-${ci}`} className={styles.group}>
                        {barSeries.map((s) => {
                          const pct = pctOf(s, ci);
                          return (
                            <span
                              key={s.barIndex}
                              className={`${styles.bar} ${SERIES_CLASS[s.barIndex]} ${pct === 0 ? styles.empty : ''}`}
                              style={{ height: `${pct}%` }}
                            />
                          );
                        })}
                      </div>
                    ))}
                  </div>

                  {lineSeries && linePoints !== null && (
                    <svg className={styles.line} aria-hidden="true" focusable="false">
                      <polyline points={linePoints} />
                    </svg>
                  )}

                  {lineSeries && (
                    <div ref={pointsRef} className={styles.points} aria-hidden="true">
                      {categories.map((c, ci) => (
                        <div key={`${c}-${ci}`} className={styles.pointGroup}>
                          <span
                            data-point=""
                            className={styles.point}
                            style={{ bottom: `${pctOf(lineSeries, ci)}%` }}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className={styles.xAxis} aria-hidden="true">
                  {categories.map((c, ci) => (
                    <span
                      key={`${c}-${ci}`}
                      className={`${styles.xLabel} ${thinLabels && !THINNED_LABELS.has(ci + 1) ? styles.xLabelHidden : ''}`}
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {rightAxisOn && yAxis('right')}
          </div>
        )}
      </div>

      {!tableView && (
        <table className={styles.srOnly}>
          <caption>{summary}</caption>
          <thead>
            <tr>
              <th scope="col">{categoryLabel}</th>
              {series.map((s, i) => (
                <th key={i} scope="col">
                  {columnHeader(s)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categories.map((c, ci) => (
              <tr key={`${c}-${ci}`}>
                <th scope="row">{c}</th>
                {series.map((s, si) => (
                  <td key={si}>{fullFormat.format(clampValue(s.values[ci] ?? 0))}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </figure>
  );
}

export default BarChart;
