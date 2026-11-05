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
type LogoItem = { file: string | null; label: string; width: number; height: number; box?: number; cell?: number; natural?: number; labelBelow?: boolean }
type SampleProps = Record<string, string | boolean>
type ComponentItem = { set: string; props: SampleProps; image?: string; label: string; width: number; height: number; cell?: number }
type VariantItem = { props: SampleProps; image?: string; x: number; y: number; width: number; height: number }
type SpaceItem = { name: string; cssVar: string; value: string; usage: string; fill: string | null }
type Block =
  | { type: 'h'; text: string; sub?: string }
  | { type: 'h3'; text: string }
  | { type: 'p'; text: string; color?: string }
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
  | { type: 'grid'; name: string; canvas: number; stretch: boolean; columns: string; gutter: string; margin: string; container: string | null; columnWidth: string | null }
type RadiusItem = { step: string; label: string; meta: string; corners: (string | null)[]; figma: number[]; fill: string | null; stroke: string | null }
type NestedItem = { kind: 'do' | 'dont'; title: string; caption: string; outer: number; inner: number; outerFill: string | null; innerFill: string | null }
type EffectItem = { kind: 'shadow' | 'blur' | 'ring'; style: string; cssVar: string; label: string }
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
              <span key={i} className={styles.variantItem} style={{ left: it.x, top: it.y }}>
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

const GridSpecimen = ({ block: b }: { block: Extract<Block, { type: 'grid' }> }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [m, setM] = useState('')
  useLayoutEffect(() => {
    const cols = ref.current?.querySelectorAll<HTMLElement>('[data-col]')
    if (!ref.current || !cols?.length) return
    const box = ref.current.getBoundingClientRect(), a = cols[0].getBoundingClientRect()
    const gap = cols.length > 1 ? cols[1].getBoundingClientRect().left - a.right : 0
    const r = (n: number) => Math.round(n * 100) / 100
    setM(`วัดจริง ${r(box.width)} px, ${cols.length} คอลัมน์, ร่อง ${r(gap)}, ขอบ ${r(a.left - box.left)}, คอลัมน์ ${r(a.width)}`)
  }, [b])
  const vars = { '--grid-cols': `var(${b.columns})`, '--grid-gutter': `var(${b.gutter})`, '--grid-margin': `var(${b.margin})`, '--grid-col': b.columnWidth ? `var(${b.columnWidth})` : '1fr' } as CSSProperties
  return (
    <div className={styles.gridBlock}>
      <span className="ntg-typography-title-xs">{b.name}</span>
      <div className={styles.gridScroll}>
        {/* ความกว้างแคนวาสจากไฟล์ออกแบบ ข้อยกเว้นของภาพ grid ดูหมายเหตุบนสุดของไฟล์ */}
        <div ref={ref} className={`${styles.gridCanvas} ${b.stretch ? styles.gridStretch : ''}`} style={{ ...vars, width: `${b.canvas}px` }}>
          {Array.from({ length: Number.parseInt(getComputedStyle(document.documentElement).getPropertyValue(b.columns)) || 0 }, (_, i) => <span key={i} data-col className={styles.gridCol} />)}
        </div>
      </div>
      <code className={`ntg-typography-body-xs ${styles.muted}`}>{m}</code>
    </div>
  )
}

// ภาพเอฟเฟคหนึ่งตัว ค่าใต้ภาพอ่านจากที่เบราว์เซอร์คำนวณจริง ใช้ยืนยันว่า token ให้ผลเท่าไฟล์ออกแบบ
const EffectSample = ({ item: it }: { item: EffectItem }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [v, setV] = useState('')
  useLayoutEffect(() => {
    if (!ref.current) return
    const cs = getComputedStyle(ref.current)
    setV(it.kind === 'blur' ? cs.backdropFilter : cs.boxShadow)
  }, [it])
  const box = it.kind === 'blur'
    ? <div className={styles.effectBackdrop}><div ref={ref} className={`${styles.effectBox} ${styles.effectBlur}`} style={{ backdropFilter: `blur(var(${it.cssVar}))` }} /></div>
    : <div ref={ref} className={styles.effectBox} style={{ boxShadow: `var(${it.cssVar})` }} />
  return (
    <div className={styles.effectItem}>
      {it.label && <span className={`ntg-typography-body-xs ${styles.muted}`}>{clean(it.label)}</span>}
      {box}
      <code className="ntg-typography-title-xs">{it.style}</code>
      <code className={`ntg-typography-body-xs ${styles.muted}`}>{it.cssVar}</code>
      <code className={`ntg-typography-body-xs ${styles.muted}`}>{v}</code>
    </div>
  )
}

// กล่องมุมโค้งหนึ่งขั้น มุมทั้งสี่ผูกตัวแปรของ component ที่ใช้ขั้นนั้นจริง ค่าใต้กล่องอ่านจากที่เบราว์เซอร์คำนวณ
// ขั้นที่ไม่มี token (none) หรือผูกตัวแปรที่ไม่มีในโค้ดเป็นมุมฉาก และขึ้นเตือนใต้กล่อง
const RadiusSample = ({ item: it }: { item: RadiusItem }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [v, setV] = useState('')
  useLayoutEffect(() => { if (ref.current) setV(getComputedStyle(ref.current).borderRadius) }, [it])
  const r = it.corners.map(c => (c ? `var(${c})` : '0'))
  const unbound = it.figma.some((f, i) => f !== 0 && !it.corners[i])
  return (
    <div className={styles.radiusItem}>
      <div
        ref={ref}
        className={styles.radiusBox}
        style={{
          borderRadius: r.join(' '),
          background: it.fill ? `var(${it.fill})` : undefined,
          borderColor: it.stroke ? `var(${it.stroke})` : undefined,
        }}
      />
      <code className="ntg-typography-title-xs">{it.label}</code>
      <span className={`ntg-typography-body-xs ${styles.muted}`}>{clean(it.meta)}</span>
      {it.corners[0] && <code className={`ntg-typography-body-xs ${styles.muted}`}>{it.corners[0].replace(/-top-left/, '-*')}</code>}
      <code className={`ntg-typography-body-xs ${styles.muted}`}>border-radius: {v}</code>
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
  <div className={styles.effectRow}>{items.map((it, i) => <EffectSample key={i} item={it} />)}</div>
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
          {block.sub && clean(block.sub).split('\n').map((l, i) => <p key={i} className={`ntg-typography-body-xl ${styles.muted}`}>{l}</p>)}
        </div>
      )
    case 'h3':
      return <h3 className={`ntg-typography-title-md ${styles.heading}`}>{clean(block.text)}</h3>
    case 'p':
      // ข้อความสั้นคำเดียวก่อนตาราง คือชื่อตระกูลสี เช่น Gray Bamboo ในหน้า Utility Color
      return /^[A-Za-z]{2,12}$/.test(block.text.trim())
        ? <h3 className={`ntg-typography-section-heading-sm ${styles.heading}`}>{block.text}</h3>
        : <p className={`ntg-typography-body-xl ${styles.paragraph}`} style={block.color ? { color: `var(${block.color})` } : undefined}>{clean(block.text)}</p>
    case 'card':
      if (block.kind === 'do') return <Do text={clean(block.body)}>{block.effects?.length ? <EffectRow items={block.effects} /> : null}{block.logos?.map((it, i) => <LogoImage key={i} item={it} />)}{block.components?.map((it, i) => <Sample key={i} set={it.set} props={it.props} image={it.image} />)}</Do>
      if (block.kind === 'dont') return <Dont text={clean(block.body)}>{block.effects?.length ? <EffectRow items={block.effects} /> : null}{block.logos?.map((it, i) => <LogoImage key={i} item={it} />)}{block.components?.map((it, i) => <Sample key={i} set={it.set} props={it.props} image={it.image} />)}</Dont>
      return (
        <div className="ntg-docs-card">
          <span className="ntg-typography-title-sm">{clean(block.title)}</span>
          <p className="ntg-typography-body-sm">{clean(block.body)}</p>
        </div>
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
    case 'logos':
      return (
        <div className={styles.logoGrid}>
          {block.items.map((it, i) => (
            it.box
              ? (
                <div key={i} className={styles.logoCell} style={{ width: it.cell }}>
                  <span className={styles.logoBox} style={{ width: it.box }}><LogoImage item={it} /></span>
                  <span className={`ntg-typography-meta-caption ${styles.logoLabel}`}>{clean(it.label)}</span>
                </div>
              )
              : (
                <div key={i} className={styles.logoItem}>
                  {!it.labelBelow && <span className={`ntg-typography-meta-caption ${styles.logoLabel}`}>{clean(it.label)}</span>}
                  {it.file && <LogoImage item={it} />}
                  {it.labelBelow && <span className={`ntg-typography-meta-caption ${styles.logoLabel}`}>{clean(it.label)}</span>}
                </div>
              )
          ))}
        </div>
      )
    case 'components':
      return (
        <div className={block.vertical ? styles.sampleColumn : styles.sampleRow}>
          {block.items.map((it, i) => (
            <div key={i} className={styles.sampleItem} style={it.cell ? { width: it.cell } : undefined}>
              {it.label && <span className={`ntg-typography-meta-caption ${styles.logoLabel}`}>{clean(it.label)}</span>}
              <Sample set={it.set} props={it.props} image={it.image} />
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
      return (
        <DoDont>
          {block.items.map((it, i) => {
            const Card = it.kind === 'do' ? Do : Dont
            return <Card key={i} text={`${clean(it.title)} ${clean(it.caption)}`}><NestedSample item={it} /></Card>
          })}
        </DoDont>
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
  // ชื่อแถวที่ตามด้วยแถวป้ายสีคือกลุ่มเดียวกันในไฟล์ออกแบบ (ห่าง 12 แต่ละกลุ่มห่าง 32) เช่น ตัวอย่างจริงในหน้า Interaction States
  const swatchGroups = new Set<number>()
  for (const [bi, b] of d.blocks.entries()) {
    const last = items[items.length - 1]
    if (b.type === 'swatches' && d.blocks[bi - 1]?.type === 'p' && !b.section && !Array.isArray(last) && last) {
      items[items.length - 1] = [last, b]
      swatchGroups.add(items.length - 1)
      continue
    }
    // แถวขนาดตัวอักษร แถวสไตล์ (Text Roles) และการ์ดฟอนต์ที่อยู่ติดกันรวมเป็นกลุ่มเดียว ระยะและกรอบเป็นของกลุ่มตามไฟล์ออกแบบ
    const group = b.type === 'card' || b.type === 'variantSet' || b.type === 'scale' || b.type === 'specimen' || b.type === 'fontFamily'
    if (group && Array.isArray(last) && last[0].type === b.type && !b.section) last.push(b)
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
        const view = swatchGroups.has(i) && Array.isArray(it)
          ? <div className={styles.swatchGroup}>{it.map((b, j) => <BlockView key={j} block={b} index={i * 100 + j} />)}</div>
          : Array.isArray(it)
          ? it[0].type === 'card'
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
