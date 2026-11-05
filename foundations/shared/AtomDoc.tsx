import { type CSSProperties, type ReactNode, Fragment, createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Table, type TableColumn } from '../../components/Table'
import { Do, Dont, DoDont } from '../../.storybook/docs-blocks'
import styles from './AtomDoc.module.css'

/**
 * เอกสารหนึ่งใบของหน้าชั้น Atoms (Identity) วาดจาก <key>-doc.json ที่ดึงจากไฟล์ออกแบบ
 * (scripts/extract-figma-atom-doc.mjs) ห้ามพิมพ์เนื้อหาหรือสีเพิ่มที่นี่ แก้ที่ Figma แล้วดึงใหม่
 *
 * ⚠️ สีของทุกช่องอ่านจากตัวแปร CSS จริง (--ntg-*) ไม่ใช่รหัสสีที่พิมพ์ลงไป
 *    ช่องโหมดมืดห่อด้วย data-theme="dark" และใช้ darkVar ที่สคริปต์ไล่หาไว้ให้ (ดูเหตุผลที่สคริปต์)
 * ⚠️ หน้า Color palette แสดงตัวแปรชั้น primitive ได้ เพราะหน้านี้มีไว้แสดงแรมป์สีดิบ
 * ⚠️ หน้า Type Scale ตั้งตระกูลฟอนต์ ขนาด ความสูงบรรทัด และความหนาเองจากตัวแปร primitive (ผู้ใช้อนุญาต 2026-10-28)
 *    เพราะหน้านี้แสดงชุดขนาดพื้นฐานที่ไม่มีคลาส .ntg-typography-* ตรงตัว งานจริงยังต้องใช้คลาสเท่านั้น
 * ⚠️ ภาพ grid ตั้งความกว้างแคนวาสตามไฟล์ออกแบบ (ผู้ใช้ตัดสิน 2026-11-02) เพราะมือถือรุ่น 2026 ใช้แคนวาส 360 ซึ่งไม่มี token
 *    คอลัมน์ ร่อง ขอบ และพื้นที่เนื้อหายังอ่านจาก token --ntg-grid-* ทั้งหมด
 *    สามจุดนี้คือข้อยกเว้นเดียวของกฎ ดู foundations/AGENTS.md
 * ⚠️ ภาพหลักการกล่องซ้อน (06 Shape Nested Radius) ใช้มุมโค้งตามตัวเลขในไฟล์ออกแบบ (ผู้ใช้ตัดสิน 2026-11-02)
 *    เพราะเป็นตัวเลขใหญ่ที่ตั้งใจให้เห็นความต่าง ไม่ใช่ค่าจริงของระบบ และไม่มี token สีพื้นยังผูกตัวแปร
 * ⚠️ โลโก้ (08 Logo) เป็นไฟล์ SVG ข้างเอกสาร ขนาดมาจากไฟล์ออกแบบ เพราะความกว้างต่างกันทุกแบรนด์และไม่มี token
 *    สีในไฟล์เป็นค่าดิบโดยตั้งใจ เป็นข้อยกเว้นถาวรของหน้านี้ (ตัดสิน 2026-08-18)
 * ⚠️ ภาพเอฟเฟคผูกตัวแปรเงา เบลอ และวงแหวนโฟกัสจริง วงแหวนโฟกัสวงรอบกล่องตัวอย่าง ไม่ใช่ปุ่ม (ผู้ใช้ตัดสิน 2026-11-02
 *    เพราะ Button ในโค้ดไม่มีตระกูล warning กับ success)
 * ⚠️ ตัวอย่าง component (ชั้น Molecules เช่น 11 Avatar) วาดด้วย component จริงจากโค้ด ผ่านตารางแปลงชื่อชุดที่ story ของหน้านั้นส่งมา
 *    (ผู้ใช้อนุมัติ 2026-11-04) ตำแหน่งของ variant ในชุดมาจากไฟล์ออกแบบ เพื่อวางเรียงเหมือนแบบ ชุดที่ไม่มี component ในโค้ดแสดงข้อความแทน
 */

type ColorRow = { no: string; name: string; level: string; gap?: string | null; lineTop?: string | null; lineBottom?: string | null; light: string; dark: string; description: string; cssVar: string; darkVar: string }
type LogoItem = { file: string | null; label: string; width: number; height: number; box?: number; cell?: number; natural?: number; labelBelow?: boolean; gap?: string | null; rowGap?: string | null }
// ค่าของชิ้นงานจาก Figma ชิ้นงานกลุ่ม (เช่น กลุ่มแท็บ) มี children เป็นค่าของชิ้นย่อยแต่ละชิ้น
type SampleProps = { [key: string]: string | boolean | SampleProps[] }
type ComponentItem = { set: string; props: SampleProps; image?: string; label: string; width: number; height: number; cell?: number; group?: { set: string; props: SampleProps; image?: string }[] }
// เซลล์ของตารางที่มีตัวอย่าง (เช่น ตารางสถานะหน้า 14 Toggles) เป็นข้อความหรือตัวอย่าง component อย่างใดอย่างหนึ่ง
type SampleCell = { text: string } | { set: string; props: SampleProps; image?: string; width: number }
type VariantItem = { props: SampleProps; image?: string; x: number; y: number; width: number; height: number }
type SpaceItem = { name: string; cssVar: string; value: string; usage: string; fill: string | null }
type Block =
  | { type: 'h'; text: string; sub?: string }
  | { type: 'h3'; text: string }
  | { type: 'p'; text: string; color?: string; textStyle?: string; stack?: string; stackGap?: string | null }
  | { type: 'card'; kind: string; title: string; body: string; effects?: EffectItem[]; logos?: LogoItem[]; components?: ComponentItem[] }
  | { type: 'effects'; items: EffectItem[] }
  | { type: 'table'; head: string[]; rows: string[][]; hug?: boolean }
  | { type: 'ramp'; label: string; path: string; steps: { step: number; cssVar: string }[] }
  | { type: 'colorTable'; rows: ColorRow[] }
  | { type: 'swatches'; items: { label: string; cssVar: string | null }[] }
  | { type: 'chips'; items: { label: string; cssVar: string | null }[] }
  | { type: 'specimen'; sample: string; style: string; className: string; meta: string; usage: string }
  | { type: 'scale'; name: string; spec: string; sample: string; family: string; size: string; lineHeight: string }
  | { type: 'fontFamily'; sample: string; family: string; title: string; usage: string; weights: { label: string; weight: string }[] }
  | { type: 'radii'; items: RadiusItem[] }
  | { type: 'nestedPair'; items: NestedItem[] }
  | { type: 'spaces'; items: SpaceItem[] }
  | { type: 'logos'; items: LogoItem[] }
  | { type: 'components'; vertical?: boolean; items: ComponentItem[] }
  | { type: 'variantSet'; set: string; caption: string; width: number; height: number; items: VariantItem[] }
  | { type: 'sampleTable'; head: string[]; rows: SampleCell[][] }
  | { type: 'grid'; name: string; canvas: number; height?: number; columnFirst?: boolean; wrap?: { width: number; gap: string | null }; stretch: boolean; columns: string; gutter: string; margin: string; container: string | null; columnWidth: string | null }
type RadiusItem = { step: string; label: string; meta: string; corners: (string | null)[]; figma: number[]; fill: string | null; stroke: string | null }
type NestedItem = { kind: 'do' | 'dont'; title: string; caption: string; outer: number; inner: number; outerFill: string | null; innerFill: string | null }
type EffectItem = { kind: 'shadow' | 'blur' | 'ring'; style: string; cssVar: string; label: string; panel?: boolean }
type Doc = { id: string; name: string; title: string; subtitle: string; blocks: (Block & { section?: boolean })[] }
export type AtomDocData = { documents: unknown[] }

// ไฟล์ออกแบบใช้จุดกลาง (U+00B7) คั่นคำ ซึ่งกฎของโปรเจกต์ห้ามใช้นอกรายการ markdown จึงแทนด้วยเว้นวรรคตอนแสดง
// งานแก้ข้อความต้นทางในไฟล์ออกแบบยังค้างอยู่ที่หน้านั้น
const clean = (s: string) => s.replace(/\s*\u00b7\s*/g, ' ').replace(/\u2014/g, ' ')

const ColorChip = ({ cssVar, label, dark }: { cssVar: string; label: string; dark?: boolean }) => (
  <span className={`${styles.colorBadge} ${dark ? styles.colorBadgeDark : ''}`} data-theme={dark ? 'dark' : undefined}>
    <span className={styles.swatch} style={{ background: `var(${cssVar})` }} />
    <span className={dark ? 'ntg-typography-body-md' : 'ntg-typography-label-lg'}>{label}</span>
  </span>
)

// เซลที่มีข้อความหลายชิ้นในไฟล์ออกแบบ บรรทัดแรกคือค่าหลัก บรรทัดถัดไปคือบรรทัดรองของ text-table-cell เช่น ตาราง Color Token
const cellLines = (text: string) => clean(text).split('\n').filter(l => l.trim())

// รหัสสีที่แสดงใต้แต่ละขั้น อ่านจากค่าที่เบราว์เซอร์คำนวณจริง ไม่ได้เก็บไว้ในไฟล์
const HexOf = ({ cssVar }: { cssVar: string }) => {
  const ref = useRef<HTMLSpanElement>(null)
  const [hex, setHex] = useState('')
  useEffect(() => {
    if (!ref.current) return
    const rgb = getComputedStyle(ref.current).backgroundColor.match(/\d+(\.\d+)?/g)
    if (rgb) setHex('#' + rgb.slice(0, 3).map(n => Number(n).toString(16).padStart(2, '0')).join('').toUpperCase())
  }, [cssVar])
  return (
    <>
      <span ref={ref} className={styles.probe} style={{ background: `var(${cssVar})` }} />
      <span className="ntg-typography-meta-caption">{hex}</span>
    </>
  )
}

// ภาพ grid ตัวเลขใต้ภาพวัดจากของที่เบราว์เซอร์วาดจริง ใช้ยืนยันว่า token ให้ผลเท่าไฟล์ออกแบบ
// ไฟล์โลโก้ส่งมาจาก story ของหน้านั้น หน้าอื่นจะได้ไม่ต้องโหลดโลโก้ 545 ตัวไปด้วย
const LogoUrls = createContext<Record<string, string>>({})
const assetUrl = (urls: Record<string, string>, file: string) => Object.entries(urls).find(([p]) => /\/[^/]+\.(svg|png)$/.test(p) && p.slice(p.lastIndexOf('/') + 1).replace(/\.(svg|png)$/, '') === file)?.[1]

/** ตัววาดตัวอย่างของชุดหนึ่ง รับค่าของชิ้นจากไฟล์ออกแบบ และที่อยู่ภาพแทนรูปถ้ามี */
export type SampleRenderer = (props: SampleProps, image?: string) => ReactNode
// ตารางแปลงชื่อชุดเป็น component ส่งมาจาก story ของหน้านั้น หน้าอื่นจะได้ไม่ต้องโหลด component ที่ไม่ใช้
const Samples = createContext<Record<string, SampleRenderer>>({})
const Sample = ({ set, props, image }: { set: string; props: SampleProps; image?: string }) => {
  const render = useContext(Samples)[set]
  const urls = useContext(LogoUrls)
  if (!render) return <span className={`ntg-typography-meta-caption ${styles.warn}`}>ยังไม่มี component ในโค้ดของชุด {set}</span>
  return <>{render(props, image ? assetUrl(urls, image) : undefined)}</>
}
// ตัวอย่างที่ตั้งใจยืดผิดสัดส่วน (natural) ต้องยืดด้วย transform เพราะ SVG ใน <img> รักษาสัดส่วนเองเสมอ
const LogoImage = ({ item }: { item: LogoItem }) => {
  const urls = useContext(LogoUrls)
  const src = item.file ? assetUrl(urls, item.file) : undefined
  const img = <img src={src} loading="lazy" alt={item.label || item.file || ''} style={{ width: item.natural ?? item.width, height: item.height, ...(item.natural ? { transform: `scaleX(${item.width / item.natural})` } : {}) }} className={item.natural ? styles.logoStretched : undefined} />
  return item.natural ? <span className={styles.logoStretchBox} style={{ width: item.width }}>{img}</span> : img
}

// ชุด variant ทั้งชุด ถ้าชุดนั้นไม่มี component ในโค้ด แสดงข้อความครั้งเดียวแทนการขึ้นข้อความทุก variant
const VariantSetView = ({ block: b }: { block: Extract<Block, { type: 'variantSet' }> }) => {
  const known = Boolean(useContext(Samples)[b.set])
  return (
    <div className={styles.sampleItem}>
      {known
        ? (
          <div className={styles.variantSet} style={{ width: b.width, height: b.height }}>
            {b.items.map((it, i) => (
              <span key={i} className={styles.variantItem} style={{ left: it.x, top: it.y, width: it.width }}>
                <Sample set={b.set} props={it.props} image={it.image} />
              </span>
            ))}
          </div>
        )
        : <Sample set={b.set} props={{}} />}
      {b.caption && <span className={`ntg-typography-meta-caption ${styles.logoLabel}`}>{clean(b.caption)}</span>}
    </div>
  )
}

// เส้นวัดหนึ่งช่วง ตัวเลขอยู่เหนือเส้น ปลายสองข้างมีขีดตั้ง ตาม Redlines ในภาพ grid ของไฟล์ออกแบบ
const Measure = ({ x, w }: { x: number; w: number }) => (
  <span className={styles.measure} style={{ left: `${x}px`, width: `${w}px` }}>
    <span className={`ntg-typography-meta-caption ${styles.measureValue}`}>{Math.round(w)}px</span>
    <span className={styles.measureLine} />
  </span>
)

// ภาพ grid หนึ่งขนาดจอ ตามชิ้นงาน nation-*-* ในไฟล์ออกแบบ กรอบขาวขนาดเท่าจอ (สัดส่วนจากไฟล์ออกแบบ) พร้อมเส้นวัดสี error
// ความกว้างทั้งจอ container ขอบ ร่อง และคอลัมน์ ค่าตัวเลขวัดจากคอลัมน์ที่เบราว์เซอร์วาดจริงจาก token --ntg-grid-*
// จอที่กว้างกว่าพื้นที่เนื้อหาย่อทั้งภาพให้พอดี (ผู้ใช้ตัดสิน 2026-11-05) จอเล็กแสดงขนาดจริง
const GridSpecimen = ({ block: b, fit = true }: { block: Extract<Block, { type: 'grid' }>; fit?: boolean }) => {
  const wrap = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [cols, setCols] = useState<{ x: number; w: number }[]>([])
  useLayoutEffect(() => {
    if (!wrap.current || !fit) return
    const update = () => setScale(Math.min(1, (wrap.current?.clientWidth ?? b.canvas) / b.canvas))
    update()
    const ro = new ResizeObserver(update)
    ro.observe(wrap.current)
    return () => ro.disconnect()
  }, [b.canvas, fit])
  useLayoutEffect(() => {
    const els = canvas.current?.querySelectorAll<HTMLElement>('[data-col]')
    setCols(els ? Array.from(els, e => ({ x: e.offsetLeft, w: e.offsetWidth })) : [])
  }, [b])
  const vars = { '--grid-cols': `var(${b.columns})`, '--grid-gutter': `var(${b.gutter})`, '--grid-margin': `var(${b.margin})`, '--grid-col': b.columnWidth ? `var(${b.columnWidth})` : '1fr' } as CSSProperties
  const ratio = b.height ? b.canvas / b.height : 16 / 9
  const first = cols[0], last = cols[cols.length - 1]
  const gutters = cols.slice(1).map((c, i) => ({ x: cols[i].x + cols[i].w, w: c.x - (cols[i].x + cols[i].w) }))
  const rowGutter = <div className={styles.measureRow}>{gutters.map((g, i) => <Measure key={i} {...g} />)}</div>
  const rowColumn = <div className={styles.measureRow}>{cols.map((c, i) => <Measure key={i} {...c} />)}</div>
  return (
    <div ref={wrap} className={styles.gridWrap} style={{ height: `${(b.canvas / ratio) * scale}px`, ...(fit ? {} : { width: `${b.canvas}px` }) }}>
      {/* ความกว้างแคนวาสจากไฟล์ออกแบบ ข้อยกเว้นของภาพ grid ดูหมายเหตุบนสุดของไฟล์ */}
      <div
        ref={canvas}
        title={b.name}
        className={`${styles.gridCanvas} ${b.stretch ? styles.gridStretch : ''} ${b.canvas < 768 ? styles.gridNarrow : ''}`}
        style={{ ...vars, width: `${b.canvas}px`, aspectRatio: String(ratio), transform: scale < 1 ? `scale(${scale})` : undefined }}
      >
        {Array.from({ length: Number.parseInt(getComputedStyle(document.documentElement).getPropertyValue(b.columns)) || 0 }, (_, i) => <span key={i} data-col className={styles.gridCol} />)}
        {first && last && (
          <div className={styles.measures}>
            <div className={styles.measureRow}><Measure x={0} w={b.canvas} /></div>
            <div className={styles.measureRow}><Measure x={first.x} w={last.x + last.w - first.x} /></div>
            <div className={styles.measureRow}><Measure x={0} w={first.x} /><Measure x={last.x + last.w} w={b.canvas - last.x - last.w} /></div>
            {b.columnFirst ? <>{rowColumn}{rowGutter}</> : <>{rowGutter}{rowColumn}</>}
          </div>
        )}
      </div>
    </div>
  )
}

// ภาพ grid หลายขนาดที่ไฟล์ออกแบบเรียงแถวตัดบรรทัด (Grid Components) วางขนาดจริงในกรอบกว้างเท่าไฟล์ออกแบบ แล้วย่อทั้งกลุ่มให้พอดีหน้า
const GridRows = ({ items }: { items: Extract<Block, { type: 'grid' }>[] }) => {
  const outer = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  const [fit, setFit] = useState({ scale: 1, height: 0 })
  const w = items[0].wrap?.width ?? 0
  useLayoutEffect(() => {
    if (!outer.current || !inner.current) return
    const update = () => {
      const scale = Math.min(1, (outer.current?.clientWidth ?? w) / w)
      setFit({ scale, height: (inner.current?.offsetHeight ?? 0) * scale })
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(outer.current)
    ro.observe(inner.current)
    return () => ro.disconnect()
  }, [w])
  const gap = items[0].wrap?.gap
  return (
    <div ref={outer} className={styles.gridRows} style={{ height: `${fit.height}px` }}>
      <div ref={inner} className={styles.gridRowsInner} style={{ width: `${w}px`, gap: gap ? `var(${gap})` : undefined, transform: `scale(${fit.scale})` }}>
        {items.map((b, i) => <GridSpecimen key={i} block={b} fit={false} />)}
      </div>
    </div>
  )
}

// ภาพเอฟเฟคหนึ่งตัว ตามชิ้นงาน shadow / background-blur / focus-ring ในไฟล์ออกแบบ คำอธิบายเหนือกล่อง ชื่อสไตล์ใต้กล่อง
// ใต้ชื่อมีชื่อตัวแปร CSS ตัวเล็กสีรอง ค่าที่วัดได้เอาออก (ผู้ใช้ตัดสิน 2026-11-05 ค่าดิบดูได้ในเอกสาร Effect Token)
const EffectSample = ({ item: it }: { item: EffectItem }) => {
  const box = it.kind === 'blur'
    ? <div className={styles.effectBackdrop}><div className={`${styles.effectBox} ${styles.effectBlur}`} style={{ backdropFilter: `blur(var(${it.cssVar}))` }} /></div>
    : <div className={styles.effectBox} style={{ boxShadow: `var(${it.cssVar})` }} />
  return (
    <div className={`${styles.effectItem} ${it.label ? styles.effectItemLabeled : ''}`}>
      {it.label && <span className={`ntg-typography-meta-caption ${styles.muted}`}>{clean(it.label)}</span>}
      {box}
      <span className={styles.effectInfo}>
        <span className={`ntg-typography-meta-credit ${styles.heading}`}>{it.style}</span>
        <span className={`ntg-typography-meta-credit ${styles.muted}`}>{it.cssVar}</span>
      </span>
    </div>
  )
}

// กล่องมุมโค้งหนึ่งขั้น มุมทั้งสี่ผูกตัวแปรของ component ที่ใช้ขั้นนั้นจริง ค่าใต้กล่องอ่านจากที่เบราว์เซอร์คำนวณ
// ขั้นที่ไม่มี token (none) หรือผูกตัวแปรที่ไม่มีในโค้ดเป็นมุมฉาก และขึ้นเตือนใต้กล่อง
const RadiusSample = ({ item: it }: { item: RadiusItem }) => {
  const r = it.corners.map(c => (c ? `var(${c})` : '0'))
  const unbound = it.figma.some((f, i) => f !== 0 && !it.corners[i])
  return (
    <div className={styles.radiusItem}>
      <div
        className={styles.radiusBox}
        style={{
          borderRadius: r.join(' '),
          background: it.fill ? `var(${it.fill})` : undefined,
          borderColor: it.stroke ? `var(${it.stroke})` : undefined,
        }}
      />
      {/* ชื่อ label/md สี label คำอธิบาย body/sm สีรอง ตามไฟล์ออกแบบ ต่อด้วยชื่อตัวแปร CSS ค่าที่วัดได้เอาออก (ผู้ใช้ตัดสิน 2026-11-05 หลักเดียวกับการ์ดเอฟเฟค) */}
      <span className={`ntg-typography-label-md ${styles.labelText}`}>{it.label}</span>
      <span className={`ntg-typography-body-sm ${styles.muted}`}>{clean(it.meta)}</span>
      {it.corners[0] && <span className={`ntg-typography-meta-caption ${styles.muted}`}>{it.corners[0].replace(/-top-left/, '-*')}</span>}
      {unbound && <span className={`ntg-typography-body-xs ${styles.warn}`}>ตัวแปรใน Figma ไม่มีในโค้ด ดู radiusMismatch</span>}
    </div>
  )
}

// ภาพหลักการกล่องซ้อน ข้อยกเว้นของกฎ ดูหมายเหตุบนสุดของไฟล์
const NestedSample = ({ item: it }: { item: NestedItem }) => (
  <div className={styles.nestedOuter} style={{ borderRadius: `${it.outer}px`, background: it.outerFill ? `var(${it.outerFill})` : undefined }}>
    <div className={styles.nestedInner} style={{ borderRadius: `${it.inner}px`, background: it.innerFill ? `var(${it.innerFill})` : undefined }} />
  </div>
)

const EffectRow = ({ items }: { items: EffectItem[] }) => (
  <div className={`${styles.effectRow} ${items[0]?.panel ? styles.effectPanel : ''}`}>{items.map((it, i) => <EffectSample key={i} item={it} />)}</div>
)

const Ramp = ({ label, path, steps }: { label: string; path: string; steps: { step: number; cssVar: string }[] }) => (
  <div className={styles.ramp}>
    <p className={`ntg-typography-title-md ${styles.heading}`}>
      {label} <span className={styles.muted}>{path}</span>
    </p>
    <div className={styles.rampSteps}>
      {steps.map(s => (
        <div key={s.step} className={styles.rampStep}>
          <span className={styles.rampColor} style={{ background: `var(${s.cssVar})` }} />
          <span className="ntg-typography-label-sm">{s.step}</span>
          <HexOf cssVar={s.cssVar} />
        </div>
      ))}
    </div>
  </div>
)

const colorColumns: TableColumn<ColorRow>[] = [
  {
    id: 'name',
    header: 'ลำดับ / ชื่อโทเค็น',
    rowHeader: true,
    // ความกว้างคอลัมน์ตามเซลในไฟล์ออกแบบ 400 240 240 จากตาราง 1280 ทุกตารางจึงตรงแนวกัน คอลัมน์ที่เหลือแบ่งพื้นที่ที่เหลือ
    width: '31.25%',
    // ตาม hierarchy-color-cell ในไฟล์ออกแบบ วงกลมเลข กล่องชื่อ และเส้นเชื่อมแนวตั้งเหนือใต้กล่อง ระยะและตำแหน่งเส้นเป็น token ที่สคริปต์อ่านจากเซลจริง
    render: r => (
      <span className={styles.nameCell} style={r.gap ? { gap: `var(${r.gap})` } : undefined}>
        {r.lineTop && <span className={`${styles.hierLine} ${styles.hierLineTop}`} style={{ marginLeft: `var(${r.lineTop})` }} />}
        <span className={`ntg-typography-meta-caption ${styles.hierNo}`}>{r.no}</span>
        <span className={`ntg-typography-body-md ${styles.hierName} ${r.level !== 'primary' ? styles.hierNameNested : ''}`} title={r.name}>{r.name}</span>
        {r.lineBottom && <span className={`${styles.hierLine} ${styles.hierLineBottom}`} style={{ marginLeft: `var(${r.lineBottom})` }} />}
      </span>
    ),
  },
  { id: 'light', header: 'โหมดสว่าง', width: '18.75%', render: r => <ColorChip cssVar={r.cssVar} label={r.light} /> },
  { id: 'dark', header: 'โหมดมืด', width: '18.75%', render: r => <ColorChip cssVar={r.darkVar} label={r.dark} dark /> },
  // ไฟล์ออกแบบมี 4 คอลัมน์ ชื่อตัวแปร CSS จึงเป็นบรรทัดรองตัวเล็กสีรองใต้คำอธิบาย ตารางยังกว้างเท่า Figma (ผู้ใช้ตัดสิน 2026-11-05)
  {
    id: 'description',
    header: 'รายละเอียด',
    render: r => (
      <span className={styles.descCell}>
        {r.description.trim() && <span className="ntg-typography-body-sm">{clean(r.description)}</span>}
        <code className={`ntg-typography-meta-caption ${styles.muted}`}>{r.cssVar}</code>
      </span>
    ),
  },
]

// กลุ่มบล็อกที่ติดกัน ชุด variant เรียงแถวตัดบรรทัด แถวขนาดตัวอักษรห่าง 8 แถวสไตล์อยู่ในกรอบ การ์ดฟอนต์วางคู่ซ้ายขวา
const GROUP_CLASS: Record<string, string> = { variantSet: styles.sampleRow, scale: styles.ladder, specimen: styles.roleTable, fontFamily: styles.families }

const BlockView = ({ block, index }: { block: Block; index: number }) => {
  switch (block.type) {
    case 'h':
      return (
        <div className={styles.sectionHead}>
          <h2 className={`ntg-typography-section-heading-xl ${styles.heading}`}>{clean(block.text)}</h2>
          {/* คำอธิบายใต้หัวข้อเป็นข้อความชิ้นเดียวในไฟล์ออกแบบ บรรทัดชิดกัน ไม่เว้นเพิ่ม */}
          {block.sub && <p className={`ntg-typography-body-xl ${styles.muted} ${styles.paragraph}`}>{clean(block.sub)}</p>}
        </div>
      )
    case 'h3':
      return <h3 className={`ntg-typography-title-md ${styles.heading}`}>{clean(block.text)}</h3>
    case 'p':
      // ข้อความสั้นคำเดียวก่อนตาราง คือชื่อตระกูลสี เช่น Gray Bamboo ในหน้า Utility Color
      return /^[A-Za-z]{2,12}$/.test(block.text.trim())
        ? <h3 className={`ntg-typography-section-heading-sm ${styles.heading}`}>{block.text}</h3>
        : <p className={`ntg-typography-${block.textStyle ?? 'body-xl'} ${styles.paragraph}`} style={block.color ? { color: `var(${block.color})` } : undefined}>{clean(block.text)}</p>
    case 'card':
      if (block.kind === 'do') return <Do text={clean(block.body)}>{block.effects?.length ? <EffectRow items={block.effects} /> : null}{block.logos?.map((it, i) => <LogoImage key={i} item={it} />)}{block.components?.map((it, i) => <span key={i} className={styles.sampleBox} style={{ width: it.width }}><Sample set={it.set} props={it.props} image={it.image} /></span>)}</Do>
      if (block.kind === 'dont') return <Dont text={clean(block.body)}>{block.effects?.length ? <EffectRow items={block.effects} /> : null}{block.logos?.map((it, i) => <LogoImage key={i} item={it} />)}{block.components?.map((it, i) => <span key={i} className={styles.sampleBox} style={{ width: it.width }}><Sample set={it.set} props={it.props} image={it.image} /></span>)}</Dont>
      return (
        <div className="ntg-docs-card">
          <span className="ntg-typography-title-sm">{clean(block.title)}</span>
          <p className={`ntg-typography-body-sm ${styles.paragraph}`}>{clean(block.body)}</p>
        </div>
      )
    case 'sampleTable':
      return (
        <Table
          columns={block.head.map((h, i) => ({ id: String(i), header: clean(h), render: (r: SampleCell[]) => { const c = r[i]; if (!c) return null; return 'text' in c ? clean(c.text) : <Sample set={c.set} props={c.props} image={c.image} /> } }))}
          data={block.rows}
          getRowId={(_, i) => `${index}-${i}`}
        />
      )
    case 'table': {
      const table = (
        <Table
          columns={block.head.map((h, i) => ({ id: String(i), header: clean(h), accessor: (r: string[]) => cellLines(r[i] ?? '')[0] ?? '', supporting: (r: string[]) => cellLines(r[i] ?? '').slice(1).join(' ') }))}
          data={block.rows}
          getRowId={(_, i) => `${index}-${i}`}
        />
      )
      return block.hug ? <div className={styles.tableHug}>{table}</div> : table
    }
    case 'ramp':
      return <Ramp {...block} />
    case 'colorTable':
      // ตารางที่ไม่มีคำอธิบายเลย (เช่น Utility Color) คอลัมน์สุดท้ายเหลือแค่ชื่อตัวแปร CSS
      return (
        <div className={styles.colorTable}>
          <Table columns={block.rows.some(r => r.description.trim()) ? colorColumns : colorColumns.map(c => c.id === 'description' ? { ...c, header: 'ตัวแปร CSS' } : c)} data={block.rows} getRowId={r => r.cssVar ?? r.name} />
        </div>
      )
    case 'specimen':
      return (
        <div className={styles.specimen}>
          <p className={`${block.className} ${styles.heading}`}>{block.sample}</p>
          {/* 3 บรรทัดตามไฟล์ออกแบบ ชื่อคลาสต่อท้ายบรรทัดขนาด (ผู้ใช้ตัดสิน 2026-11-05) */}
          <div className={styles.specimenInfo}>
            <span className={`ntg-typography-label-md ${styles.heading}`}>{block.style}</span>
            <span className={`ntg-typography-meta-caption ${styles.labelText}`}>{block.meta} .{block.className}</span>
            <span className={`ntg-typography-meta-caption ${styles.captionText}`}>{clean(block.usage)}</span>
          </div>
        </div>
      )
    case 'scale':
      return (
        <div className={styles.scale}>
          <span className={`ntg-typography-meta-caption ${styles.labelText}`}>{block.name} {block.spec}</span>
          {/* ข้อยกเว้นของหน้า Type Scale ดูหมายเหตุบนสุดของไฟล์ */}
          <p className={styles.heading} style={{ fontFamily: `var(${block.family})`, fontSize: `var(${block.size})`, lineHeight: `var(${block.lineHeight})`, fontWeight: 'var(--ntg-typography-font-weight-regular)' }}>{block.sample}</p>
        </div>
      )
    case 'fontFamily':
      return (
        <div className={styles.family}>
          <p className={`ntg-typography-display-md ${styles.heading}`} style={{ fontFamily: `var(${block.family})` }}>{block.sample}</p>
          <span className="ntg-typography-title-sm">{clean(block.title)}</span>
          <span className={`ntg-typography-body-sm ${styles.labelText}`}>{clean(block.usage)}</span>
          <div className={styles.weights}>
            {block.weights.map(w => (
              <div key={w.label} className={styles.weight}>
                <span className={`ntg-typography-display-xs ${styles.heading}`} style={{ fontFamily: `var(${block.family})`, fontWeight: `var(${w.weight})` }}>Aa</span>
                <span className={`ntg-typography-meta-caption ${styles.muted}`}>{w.label}</span>
              </div>
            ))}
          </div>
        </div>
      )
    case 'grid':
      return <GridSpecimen block={block} />
    case 'effects':
      return <EffectRow items={block.items} />
    case 'radii':
      return <div className={styles.radiusRow}>{block.items.map((it, i) => <RadiusSample key={i} item={it} />)}</div>
    case 'logos': {
      // ระยะห่างของกริดตามเฟรมในไฟล์ออกแบบ (สคริปต์แปลงเป็น token ระยะ) ไม่มีข้อมูลใช้ 24 เหมือนเดิม
      const g = block.items[0]
      const gridGap = g?.gap ? { gap: `var(${g.rowGap ?? g.gap}) var(${g.gap})` } : undefined
      return (
        <div className={styles.logoGrid} style={gridGap}>
          {block.items.map((it, i) => (
            it.box
              ? (
                <div key={i} className={styles.logoCell} style={{ width: it.cell }}>
                  <span className={styles.logoBox} style={{ width: it.box }}><LogoImage item={it} /></span>
                  <span className={`ntg-typography-meta-caption ${styles.logoLabel}`}>{clean(it.label)}</span>
                </div>
              )
              : (
                <div key={i} className={styles.logoItem} style={it.cell ? { width: it.cell } : undefined}>
                  {!it.labelBelow && <span className={`ntg-typography-meta-caption ${styles.logoLabel}`}>{clean(it.label)}</span>}
                  {it.file && <LogoImage item={it} />}
                  {it.labelBelow && <span className={`ntg-typography-meta-caption ${styles.logoLabel}`}>{clean(it.label)}</span>}
                </div>
              )
          ))}
        </div>
      )
    }
    case 'components':
      return (
        <div className={block.vertical ? styles.sampleColumn : styles.sampleRow}>
          {block.items.map((it, i) => (
            <div key={i} className={styles.sampleItem} style={it.cell ? { width: it.cell } : undefined}>
              {it.label && <span className={`ntg-typography-meta-caption ${styles.logoLabel}`}>{clean(it.label)}</span>}
              {it.group
                ? <span className={styles.sampleGroup}>{it.group.map((g, j) => <Sample key={j} set={g.set} props={g.props} image={g.image} />)}</span>
                : <span className={styles.sampleBox} style={{ width: it.width }}><Sample set={it.set} props={it.props} image={it.image} /></span>}
            </div>
          ))}
        </div>
      )
    case 'variantSet':
      return <VariantSetView block={block} />
    case 'spaces':
      return (
        <div className={styles.spaceList}>
          {block.items.map(it => (
            <div key={it.name} className={styles.spaceRow}>
              <span className={`ntg-typography-label-md ${styles.spaceName}`}>{it.name}</span>
              <span className={`ntg-typography-label-md ${styles.spaceValue}`}>{it.value}</span>
              <span className={styles.spaceTrack}>
                {it.fill && <span className={styles.spaceBar} style={{ width: `var(${it.cssVar})`, background: `var(${it.fill})` }} />}
              </span>
              {it.usage && <span className={`ntg-typography-label-md ${styles.spaceValue}`}>{clean(it.usage)}</span>}
            </div>
          ))}
        </div>
      )
    case 'nestedPair':
      // วางสองคอลัมน์บนพื้นของหน้าแบบไฟล์ออกแบบ ชื่อ ภาพ และคำอธิบาย ไม่ใช้การ์ด Do/Don't
      // เพราะพื้นการ์ด (secondary) ใกล้กับสีกรอบนอก (tertiary) จนมองไม่เห็นกรอบนอก (ผู้ใช้ทัก 2026-11-05)
      return (
        <div className={styles.nestedPair}>
          {block.items.map((it, i) => (
            <div key={i} className={styles.nestedColumn}>
              <span className={`ntg-typography-label-lg ${styles.nestedTitle}`}>{clean(it.title)}</span>
              <NestedSample item={it} />
              <p className={`ntg-typography-body-sm ${styles.nestedCaption}`}>{clean(it.caption)}</p>
            </div>
          ))}
        </div>
      )
    case 'chips':
      // กล่องสีพร้อมชื่อใต้กล่อง ตาม chips ในเอกสาร Usage Detail
      return (
        <div className={styles.chips}>
          {block.items.map((it, i) => (
            <span key={i} className={styles.chipItem}>
              <span className={styles.chipBox} style={it.cssVar ? { background: `var(${it.cssVar})` } : undefined} />
              <span className={`ntg-typography-meta-caption ${styles.muted}`}>{it.label}</span>
            </span>
          ))}
        </div>
      )
    case 'swatches':
      return (
        // แถวป้ายสีแบบไม่มีลำดับ (light-color-cell ในไฟล์ออกแบบ) ป้ายแคปซูลเดียวกับคอลัมน์โหมดสว่าง เซลมีระยะใน 16
        <div className={styles.swatchRow}>
          {block.items.map((it, i) => (
            <span key={i} className={styles.swatchCell}>
              {it.cssVar ? <ColorChip cssVar={it.cssVar} label={it.label} /> : <span className="ntg-typography-label-lg">{it.label}</span>}
            </span>
          ))}
        </div>
      )
  }
}

export const AtomDoc = ({ data, name, logos = {}, samples = {} }: { data: AtomDocData; name: string; logos?: Record<string, string>; samples?: Record<string, SampleRenderer> }) => {
  const d = (data.documents as Doc[]).find(x => x.name === name)
  if (!d) return <p className="ntg-typography-body-md">ไม่พบเอกสาร {name}</p>
  // การ์ด do กับ don't ที่อยู่ติดกันวางคู่กันเหมือนในไฟล์ออกแบบ
  // ชุด variant ที่อยู่ติดกันวางเรียงแถวเดียวกันแล้วตัดบรรทัดเอง เหมือนกริดในไฟล์ออกแบบ
  const items: (Block | Block[])[] = []
  // บล็อกแรกของแต่ละหัวข้อใหญ่ในไฟล์ออกแบบ (section ระยะบนล่าง 80) ห่อด้วย .sectionStart ให้ระยะระหว่างหัวข้อเท่า Figma
  const starts = new Set<number>()
  // ชื่อที่ตามด้วยเนื้อหาของมันคือกลุ่มเดียวกันในไฟล์ออกแบบ ชื่อแถวกับแถวป้ายสี (ห่าง 12 แต่ละกลุ่มห่าง 32 เช่น Interaction States)
  // และชื่อกลุ่มกับแถวสเกลระยะ (ห่าง 8 แต่ละกลุ่มห่าง 24 เช่น Space Scale)
  const pairGroups = new Map<number, string>()
  const PAIRS: [Block['type'], Block['type'], string][] = [['p', 'swatches', styles.swatchGroup], ['h3', 'spaces', styles.spaceGroup]]
  for (const [bi, b] of d.blocks.entries()) {
    const last = items[items.length - 1]
    const pair = PAIRS.find(([a, z]) => b.type === z && d.blocks[bi - 1]?.type === a)
    if (pair && !b.section && last && !Array.isArray(last)) {
      items[items.length - 1] = [last, b]
      pairGroups.set(items.length - 1, pair[2])
      continue
    }
    // ย่อหน้าที่อยู่เฟรมเดียวกันในไฟล์ออกแบบรวมเป็นกลุ่ม ห่างกันตามระยะของเฟรม
    if (b.type === 'p' && b.stack) {
      const prev = d.blocks[bi - 1]
      if (prev?.type === 'p' && prev.stack === b.stack && Array.isArray(last) && pairGroups.has(items.length - 1)) { last.push(b); continue }
      if (b.section) starts.add(items.length)
      items.push([b])
      pairGroups.set(items.length - 1, styles.textStack)
      continue
    }
    // แถวขนาดตัวอักษร แถวสไตล์ (Text Roles) และการ์ดฟอนต์ที่อยู่ติดกันรวมเป็นกลุ่มเดียว ระยะและกรอบเป็นของกลุ่มตามไฟล์ออกแบบ
    const group = b.type === 'card' || b.type === 'variantSet' || b.type === 'scale' || b.type === 'specimen' || b.type === 'fontFamily' || (b.type === 'grid' && !!b.wrap)
    // การ์ดข้อมูล (how-to-read) กับการ์ด do / don't เป็นคนละกลุ่ม แม้อยู่ติดกัน
    const sameKind = (x: Block) => x.type !== 'card' || b.type !== 'card' || (x.kind === 'do' || x.kind === 'dont') === (b.kind === 'do' || b.kind === 'dont')
    if (group && Array.isArray(last) && !pairGroups.has(items.length - 1) && last[0].type === b.type && sameKind(last[0]) && !b.section) last.push(b)
    else {
      if (b.section) starts.add(items.length)
      items.push(group ? [b] : b)
    }
  }
  return (
    <LogoUrls.Provider value={logos}>
    <Samples.Provider value={samples}>
    <article className={styles.page}>
      <header className={styles.header}>
        <h1 className={`ntg-typography-display-xl ${styles.heading}`}>{clean(d.title)}</h1>
        {d.subtitle && <p className={`ntg-typography-body-xl ${styles.muted}`}>{clean(d.subtitle)}</p>}
      </header>
      {items.map((it, i) => {
        const view = pairGroups.has(i) && Array.isArray(it)
          ? <div className={pairGroups.get(i)} style={it[0].type === 'p' && it[0].stackGap ? { gap: `var(${it[0].stackGap})` } : undefined}>{it.map((b, j) => <BlockView key={j} block={b} index={i * 100 + j} />)}</div>
          : Array.isArray(it)
          ? it[0].type === 'grid'
            ? <GridRows items={it as Extract<Block, { type: 'grid' }>[]} />
            : it[0].type === 'card' && it[0].kind !== 'do' && it[0].kind !== 'dont'
            // การ์ดข้อมูลในไฟล์ออกแบบกว้างเท่ากันแถวละไม่เกิน 3 ใบ ห่าง 16 (3 ใบ FILL ในหน้า 03 และ 416 ตัดบรรทัดในหน้า Space Usage)
            ? <div className={styles.infoCards} style={{ '--cards': Math.min(it.length, 3) } as CSSProperties}>{it.map((b, j) => <BlockView key={j} block={b} index={i * 100 + j} />)}</div>
            : it[0].type === 'card'
            ? <DoDont>{it.map((b, j) => <BlockView key={j} block={b} index={i * 100 + j} />)}</DoDont>
            : <div className={GROUP_CLASS[it[0].type]}>{it.map((b, j) => <BlockView key={j} block={b} index={i * 100 + j} />)}</div>
          : <BlockView block={it} index={i} />
        return starts.has(i) ? <div key={i} className={styles.sectionStart}>{view}</div> : <Fragment key={i}>{view}</Fragment>
      })}
    </article>
    </Samples.Provider>
    </LogoUrls.Provider>
  )
}
