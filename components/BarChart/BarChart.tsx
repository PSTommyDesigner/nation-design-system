/**
 * BarChart Nation Design System
 *
 * กราฟแท่งแนวตั้งแบบจัดกลุ่ม (grouped) แกน y ได้สองข้าง ตรงกับ component `bar-chart`
 * ในไฟล์ออกแบบหน้า 29 Chart (node 11797:2) และชิ้นส่วนแท่ง `_bar-chart-bar` (node 11796:5)
 * ที่มาของทุกการตัดสินใจ docs/research/chart-component.md หัวข้อ 9
 *
 * ⚠️ วาดเองด้วย HTML กับ CSS (flex) ไม่ใช้ไลบรารีกราฟ และไม่ยืดด้วย viewBox
 *    ทุกค่าสี ระยะ มุมโค้ง จึงผูกกับ CSS variable ของ token ได้ตรง ๆ แก้ token แล้วกราฟเปลี่ยนตาม
 *    ความสูงของแท่งเป็นเปอร์เซ็นต์ของพื้นที่กราฟ ซึ่งเป็นข้อมูล ไม่ใช่ค่าออกแบบ จึงอยู่ใน inline style
 *
 * ⚠️ ต้อง render บนเซิร์ฟเวอร์ได้ (Next 12/14 SSR)
 *    รอบแรกไม่รู้ความกว้าง จึงแสดงป้ายแกน x ครบทุกตัวและไม่เลื่อน
 *    หลังติดตั้งแล้ว ResizeObserver วัดความกว้างจริงของพื้นที่กราฟ แล้วค่อยลดป้ายหรือเปิดการเลื่อน
 *    ห้ามแตะ window หรือ document ระหว่าง render
 *
 * ⚠️ ขีดแกน y 4 ช่อง 5 เส้นเสมอ และเท่ากันทั้งสองแกน เส้นกริดจึงตรงกันทั้งสองข้าง
 *    ขั้นคือ niceCeil(ค่าสูงสุด / 4) จากชุด 1, 1.5, 2, 2.5, 3, 4, 5, 6, 8 คูณสิบยกกำลัง แกนเริ่มที่ 0 เสมอ
 *
 * ⚠️ จอแคบ (ข้อเสนอ 15 ของงานวิจัย) เกณฑ์เป็นพิกเซลต่อช่องของหนึ่งกลุ่ม
 *    ช่องตั้งแต่ 24 ขึ้นไป แสดงป้ายแกน x ทุกตัว
 *    แคบกว่านั้น แสดงเฉพาะลำดับที่ 1, 5, 10, 15, 20, 25, 30 ตัวที่เหลือซ่อนแต่ยังกินที่ เพื่อให้ตรงกับแท่ง
 *    ต่ำกว่า 14 พื้นที่กราฟเลื่อนแนวนอนได้ แกน y สองข้างตรึงอยู่กับที่
 *    กลุ่มแท่งกว้างไม่เกิน 0.7 ของช่อง (ข้อเสนอ 1) แท่งหดตามเมื่อช่องแคบ ระยะระหว่างแท่งในกลุ่มคงเดิม
 *    เกณฑ์ทั้งสามเป็นค่าพฤติกรรม ไม่ใช่ค่าที่วาดลงจอ จึงเป็นค่าคงที่ในไฟล์นี้ ไม่ใช่ token
 *
 * ⚠️ สีมีแค่ 2 ชุด (chart/color/series-1 กับ series-2) ชุดที่ 3 ขึ้นไปยังไม่มีสี
 *    ส่งเกิน 2 ชุดจะเตือนในโหมดพัฒนาและไม่วาดชุดที่เกิน ห้ามเติมสีเอง ให้ขอ token ก่อน
 *
 * ⚠️ การเข้าถึง
 *    ห่อด้วย <figure> ตัวกราฟเป็น role="img" ที่ aria-label มาจาก `summary` (บังคับส่ง)
 *    ข้าง ๆ มี <table> จริงที่ซ่อนจากสายตา ตัวเลขเต็ม (240,000) ไม่ได้อยู่ใน role="img"
 *    เพราะ role img ซ่อนลูกทุกตัวจากโปรแกรมอ่านหน้าจอ แท่งไม่รับโฟกัสในรอบนี้ ไม่มีแอนิเมชัน
 *
 * ⚠️ ไม่มี prop ความกว้าง กราฟยืดเต็มกรอบแม่เสมอ อยากให้แคบลงให้ไปจำกัดที่กรอบแม่
 *    ความสูงของพื้นที่กราฟเป็นค่าผังของหน้า (เหมือนความยาวของ Divider) จึงเป็น prop `height`
 *    ค่าเริ่มต้น 340 ตามไฟล์ออกแบบ ระบบไม่มี token ความสูงกราฟ
 *
 * ค่าสี ระยะ มุมโค้ง และตัวอักษรทั้งหมดมาจาก design tokens ผ่าน CSS variables ไม่มีค่า hard-code
 */
import React, { useEffect, useRef, useState } from 'react';
import styles from './BarChart.module.css';

/** ข้างของแกน y ที่ชุดข้อมูลอ้างอิง */
export type BarChartAxis = 'left' | 'right';

export interface BarChartSeries {
  /** ชื่อชุดข้อมูล แสดงในคำอธิบายสีและเป็นหัวคอลัมน์ของตารางที่ซ่อนไว้ */
  label: string;
  /** ค่าของแต่ละหมวด เรียงตรงกับ `categories` ค่าติดลบไม่รองรับ จะถูกปัดเป็น 0 */
  values: number[];
  /** แกนที่ใช้วัด ค่าเริ่มต้น `left` */
  axis?: BarChartAxis;
}

export interface BarChartProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  /** ป้ายแกน x หนึ่งป้ายต่อหนึ่งกลุ่มแท่ง เช่น วันที่ 1 ถึง 31 */
  categories: string[];
  /**
   * ชุดข้อมูล ตอนนี้รองรับ 2 ชุด สีตามลำดับ ชุดแรกใช้ series-1 (เข้ม) ชุดที่สองใช้ series-2 (อ่อนมีขอบ)
   * ลำดับแท่งในกลุ่มเรียงตามลำดับใน array นี้
   */
  series: BarChartSeries[];
  /**
   * สรุปใจความของกราฟเป็นประโยค เช่น "ข่าวที่สร้างและการเข้าชมรายวันของเดือนตุลาคม สูงสุดวันที่ 21"
   * ไปเป็น aria-label ของกราฟ และเป็น caption ของตารางที่ซ่อนไว้ บังคับส่ง
   */
  summary: string;
  /** หัวคอลัมน์แรกของตารางที่ซ่อนไว้ (ชื่อของแกน x) ค่าเริ่มต้น "รายการ" */
  categoryLabel?: string;
  /** แสดงคำอธิบายสีด้านบน ตรงกับ property `show-legend` ใน Figma ค่าเริ่มต้น true */
  showLegend?: boolean;
  /**
   * แสดงแกน y ด้านขวา ตรงกับ property `show-right-axis` ใน Figma
   * ค่าเริ่มต้นคือ true เมื่อมีชุดข้อมูลที่ใช้ `axis: 'right'` อย่างน้อยหนึ่งชุด
   */
  showRightAxis?: boolean;
  /**
   * จัดรูปตัวเลขบนแกน y แยกต่อข้าง
   * ค่าเริ่มต้น `Intl.NumberFormat('th-TH', { notation: 'compact' })` เช่น 240K
   * ตารางที่ซ่อนไว้ใช้ตัวเลขเต็ม (240,000) เสมอ
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
/** จำนวนชุดที่มีสีให้ (chart/color/series-1 และ series-2) */
export const BAR_CHART_MAX_SERIES = 2;

const SERIES_CLASS = [styles.series1, styles.series2];
const THINNED_LABELS = new Set([1, 5, 10, 15, 20, 25, 30]);

const isDev = typeof process !== 'undefined' && process.env?.NODE_ENV !== 'production';

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

/**
 * @example
 * <BarChart
 *   summary="ข่าวที่สร้างและการเข้าชมรายวัน"
 *   categories={['1', '2', '3']}
 *   series={[
 *     { label: 'ข่าวที่สร้าง', values: [80, 66, 58], axis: 'right' },
 *     { label: 'การเข้าชม', values: [216000, 169412, 139765], axis: 'left' },
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
  formatValue,
  height = BAR_CHART_DEFAULT_HEIGHT,
  className,
  style,
  ...rest
}: BarChartProps) {
  if (isDev && seriesProp.length > BAR_CHART_MAX_SERIES) {
    console.warn(
      `[BarChart] ส่งมา ${seriesProp.length} ชุด แต่มีสีให้แค่ ${BAR_CHART_MAX_SERIES} ชุด ชุดที่เกินจะไม่ถูกวาด`,
    );
  }
  const series = seriesProp.slice(0, BAR_CHART_MAX_SERIES).map((s) => ({ ...s, axis: s.axis ?? 'left' }));
  const hasRightSeries = series.some((s) => s.axis === 'right');
  const rightAxisOn = showRightAxis ?? hasRightSeries;
  if (isDev && !rightAxisOn && hasRightSeries) {
    console.warn('[BarChart] ปิดแกนขวาแต่ยังมีชุดที่ใช้ axis right แท่งชุดนั้นจะไม่มีแกนให้อ่านค่า');
  }

  // ขีดของแต่ละแกน ใช้ค่าสูงสุดของชุดที่อยู่แกนนั้น
  const axisMax = (axis: BarChartAxis) =>
    Math.max(0, ...series.filter((s) => s.axis === axis).flatMap((s) => s.values.map(clampValue)));
  const ticks: Record<BarChartAxis, number[]> = {
    left: barChartTicks(axisMax('left')),
    right: barChartTicks(axisMax('right')),
  };
  const axisHasSeries = (axis: BarChartAxis) => series.some((s) => s.axis === axis);
  const fmt = (axis: BarChartAxis) => formatValue?.[axis] ?? defaultFormat;

  // ── วัดความกว้างจริงหลังติดตั้ง (รอบ SSR ไม่มีค่านี้) ──
  const scrollRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);
  const [measure, setMeasure] = useState<Measure | null>(null);
  const count = categories.length;

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
  }, [count]);

  const scrolling = measure !== null && measure.slot < BAR_CHART_SCROLL_MIN_SLOT;
  const effectiveSlot = measure ? Math.max(measure.slot, BAR_CHART_SCROLL_MIN_SLOT) : null;
  const thinLabels = effectiveSlot !== null && effectiveSlot < BAR_CHART_ALL_LABELS_MIN_SLOT;

  // ค่าที่มาจากข้อมูลหรือการวัด ส่งเข้า CSS เป็นตัวแปร ไม่ใช่ค่าออกแบบ
  const vars: Record<string, string | number> = {
    '--bc-plot-h': `${height}px`,
    '--bc-series-count': series.length,
  };
  if (effectiveSlot !== null) vars['--bc-group-max'] = `${effectiveSlot * BAR_CHART_GROUP_RATIO}px`;
  const innerStyle: React.CSSProperties | undefined =
    scrolling && measure ? { minWidth: `${count * BAR_CHART_SCROLL_MIN_SLOT + measure.padX}px` } : undefined;

  const legendFor = (axis: BarChartAxis) =>
    series
      .map((s, i) => ({ s, i }))
      .filter(({ s }) => s.axis === axis)
      .map(({ s, i }) => (
        <span key={i} className={styles.legendItem}>
          <span className={`${styles.dot} ${SERIES_CLASS[i]}`} aria-hidden="true" />
          {s.label}
        </span>
      ));

  const yAxis = (axis: BarChartAxis) => (
    <div className={`${styles.yAxis} ${axis === 'left' ? styles.yAxisLeft : styles.yAxisRight}`}>
      {axisHasSeries(axis) &&
        [...ticks[axis]].reverse().map((t) => (
          <span key={t} className={styles.yLabel}>
            {fmt(axis)(t)}
          </span>
        ))}
    </div>
  );

  const classes = [styles.root, className].filter(Boolean).join(' ');

  return (
    <figure className={classes} style={{ ...vars, ...style } as React.CSSProperties} {...rest}>
      <div role="img" aria-label={summary} className={styles.graphic}>
        {showLegend && (
          <div className={styles.legend}>
            <span className={styles.legendGroup}>{legendFor('left')}</span>
            {rightAxisOn && <span className={styles.legendGroup}>{legendFor('right')}</span>}
          </div>
        )}

        <div className={`${styles.body} ${rightAxisOn ? styles.withRight : ''}`}>
          {yAxis('left')}

          <div ref={scrollRef} className={`${styles.scroll} ${scrolling ? styles.scrolling : ''}`}>
            <div className={styles.scrollInner} style={innerStyle}>
              <div className={styles.plot}>
                <div className={styles.grid}>
                  {ticks.left.map((t) => (
                    <span key={t} className={styles.gridLine} />
                  ))}
                </div>
                <div ref={barsRef} className={styles.bars}>
                  {categories.map((c, ci) => (
                    <div key={`${c}-${ci}`} className={styles.group}>
                      {series.map((s, si) => {
                        const v = clampValue(s.values[ci] ?? 0);
                        const max = ticks[s.axis][BAR_CHART_TICK_INTERVALS] || 1;
                        const pct = Math.min(100, (v / max) * 100);
                        return (
                          <span
                            key={si}
                            className={`${styles.bar} ${SERIES_CLASS[si]} ${v === 0 ? styles.empty : ''}`}
                            style={{ height: `${pct}%` }}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.xAxis}>
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
      </div>

      <table className={styles.srOnly}>
        <caption>{summary}</caption>
        <thead>
          <tr>
            <th scope="col">{categoryLabel}</th>
            {series.map((s, i) => (
              <th key={i} scope="col">
                {s.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {categories.map((c, ci) => (
            <tr key={`${c}-${ci}`}>
              <th scope="row">{c}</th>
              {series.map((s, si) => (
                <td key={si}>{fullFormat.format(s.values[ci] ?? 0)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}

export default BarChart;
