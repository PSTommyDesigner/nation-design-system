import { type CSSProperties, useEffect, useLayoutEffect, useRef, useState } from 'react'
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
 * ⚠️ ภาพเอฟเฟคผูกตัวแปรเงา เบลอ และวงแหวนโฟกัสจริง วงแหวนโฟกัสวงรอบกล่องตัวอย่าง ไม่ใช่ปุ่ม (ผู้ใช้ตัดสิน 2026-11-02
 *    เพราะ Button ในโค้ดไม่มีตระกูล warning กับ success)
 */

type ColorRow = { no: string; name: string; level: string; light: string; dark: string; description: string; cssVar: string; darkVar: string }
type SpaceItem = { name: string; cssVar: string; value: string; usage: string; fill: string | null }
type Block =
  | { type: 'h'; text: string; sub?: string }
  | { type: 'h3' | 'p'; text: string }
  | { type: 'card'; kind: string; title: string; body: string; effects?: EffectItem[] }
  | { type: 'effects'; items: EffectItem[] }
  | { type: 'table'; head: string[]; rows: string[][] }
  | { type: 'ramp'; label: string; path: string; steps: { step: number; cssVar: string }[] }
  | { type: 'colorTable'; rows: ColorRow[] }
  | { type: 'swatches'; items: { label: string; cssVar: string | null }[] }
  | { type: 'specimen'; sample: string; style: string; className: string; meta: string; usage: string }
  | { type: 'scale'; name: string; spec: string; sample: string; family: string; size: string; lineHeight: string }
  | { type: 'fontFamily'; sample: string; family: string; title: string; usage: string; weights: { label: string; weight: string }[] }
  | { type: 'radii'; items: RadiusItem[] }
  | { type: 'nestedPair'; items: NestedItem[] }
  | { type: 'spaces'; items: SpaceItem[] }
  | { type: 'grid'; name: string; canvas: number; stretch: boolean; columns: string; gutter: string; margin: string; container: string | null; columnWidth: string | null }
type RadiusItem = { step: string; label: string; meta: string; corners: (string | null)[]; figma: number[]; fill: string | null; stroke: string | null }
type NestedItem = { kind: 'do' | 'dont'; title: string; caption: string; outer: number; inner: number; outerFill: string | null; innerFill: string | null }
type EffectItem = { kind: 'shadow' | 'blur' | 'ring'; style: string; cssVar: string; label: string }
type Doc = { id: string; name: string; title: string; subtitle: string; blocks: Block[] }
export type AtomDocData = { documents: unknown[] }

// ไฟล์ออกแบบใช้จุดกลาง (U+00B7) คั่นคำ ซึ่งกฎของโปรเจกต์ห้ามใช้นอกรายการ markdown จึงแทนด้วยเว้นวรรคตอนแสดง
// งานแก้ข้อความต้นทางในไฟล์ออกแบบยังค้างอยู่ที่หน้านั้น
const clean = (s: string) => s.replace(/\s*\u00b7\s*/g, ' ').replace(/\u2014/g, ' ')

const Swatch = ({ cssVar, dark }: { cssVar: string | null; dark?: boolean }) => (
  <span className={styles.swatchWrap} data-theme={dark ? 'dark' : undefined}>
    <span className={styles.swatch} style={cssVar ? { background: `var(${cssVar})` } : undefined} />
  </span>
)

const ColorChip = ({ cssVar, label, dark }: { cssVar: string; label: string; dark?: boolean }) => (
  <span className={`${styles.chip} ${dark ? styles.chipDark : ''}`} data-theme={dark ? 'dark' : undefined}>
    <span className={styles.swatch} style={{ background: `var(${cssVar})` }} />
    <span className="ntg-typography-label-sm">{label}</span>
  </span>
)

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
    render: r => (
      <span className={`${styles.nameCell} ${r.level !== 'primary' ? styles.nested : ''}`}>
        <span className={`ntg-typography-label-sm ${styles.muted}`}>{r.no}</span>
        <code className="ntg-typography-body-sm">{r.name}</code>
      </span>
    ),
  },
  { id: 'light', header: 'โหมดสว่าง', render: r => <ColorChip cssVar={r.cssVar} label={r.light} /> },
  { id: 'dark', header: 'โหมดมืด', render: r => <ColorChip cssVar={r.darkVar} label={r.dark} dark /> },
  { id: 'description', header: 'รายละเอียด', render: r => <span className="ntg-typography-body-sm">{clean(r.description)}</span> },
  { id: 'css', header: 'ตัวแปร CSS', render: r => <code className="ntg-typography-body-xs">{r.cssVar}</code> },
]

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
        ? <h3 className={`ntg-typography-title-lg ${styles.heading}`}>{block.text}</h3>
        : <div className={`ntg-typography-body-lg ${styles.body}`}>{clean(block.text).split('\n').map((l, i) => <p key={i}>{l}</p>)}</div>
    case 'card':
      if (block.kind === 'do') return <Do text={clean(block.body)}>{block.effects?.length ? <EffectRow items={block.effects} /> : null}</Do>
      if (block.kind === 'dont') return <Dont text={clean(block.body)}>{block.effects?.length ? <EffectRow items={block.effects} /> : null}</Dont>
      return (
        <div className="ntg-docs-card">
          <span className="ntg-typography-title-sm">{clean(block.title)}</span>
          <p className="ntg-typography-body-sm">{clean(block.body)}</p>
        </div>
      )
    case 'table':
      return (
        <Table
          columns={block.head.map((h, i) => ({ id: String(i), header: clean(h), accessor: (r: string[]) => clean(r[i] ?? '') }))}
          data={block.rows}
          getRowId={(_, i) => `${index}-${i}`}
        />
      )
    case 'ramp':
      return <Ramp {...block} />
    case 'colorTable':
      return <Table columns={colorColumns} data={block.rows} getRowId={r => r.cssVar ?? r.name} />
    case 'specimen':
      return (
        <div className={styles.specimen}>
          <p className={`${block.className} ${styles.heading}`}>{block.sample}</p>
          <div className={styles.specimenInfo}>
            <code className="ntg-typography-title-xs">{block.style}</code>
            <span className={`ntg-typography-body-xs ${styles.muted}`}>{block.meta}</span>
            <span className="ntg-typography-body-xs">{clean(block.usage)}</span>
            <code className={`ntg-typography-body-xs ${styles.muted}`}>.{block.className}</code>
          </div>
        </div>
      )
    case 'scale':
      return (
        <div className={styles.scale}>
          <span className={`ntg-typography-meta-caption ${styles.muted}`}>{block.name} {block.spec}</span>
          {/* ข้อยกเว้นของหน้า Type Scale ดูหมายเหตุบนสุดของไฟล์ */}
          <p className={styles.heading} style={{ fontFamily: `var(${block.family})`, fontSize: `var(${block.size})`, lineHeight: `var(${block.lineHeight})`, fontWeight: 'var(--ntg-typography-font-weight-regular)' }}>{block.sample}</p>
        </div>
      )
    case 'fontFamily':
      return (
        <div className={styles.family}>
          <p className={`ntg-typography-display-md ${styles.heading}`} style={{ fontFamily: `var(${block.family})` }}>{block.sample}</p>
          <span className="ntg-typography-title-sm">{clean(block.title)}</span>
          <span className={`ntg-typography-body-sm ${styles.muted}`}>{clean(block.usage)}</span>
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
    case 'swatches':
      return (
        <div className={styles.swatchRow}>
          {block.items.map((it, i) => (
            <span key={i} className={styles.chip}>
              <Swatch cssVar={it.cssVar} />
              <span className="ntg-typography-label-sm">{it.label}</span>
            </span>
          ))}
        </div>
      )
  }
}

export const AtomDoc = ({ data, name }: { data: AtomDocData; name: string }) => {
  const d = (data.documents as Doc[]).find(x => x.name === name)
  if (!d) return <p className="ntg-typography-body-md">ไม่พบเอกสาร {name}</p>
  // การ์ด do กับ don't ที่อยู่ติดกันวางคู่กันเหมือนในไฟล์ออกแบบ
  const items: (Block | Block[])[] = []
  for (const b of d.blocks) {
    const last = items[items.length - 1]
    if (b.type === 'card' && Array.isArray(last)) last.push(b)
    else items.push(b.type === 'card' ? [b] : b)
  }
  return (
    <article className={styles.page}>
      <header className={styles.header}>
        <h1 className={`ntg-typography-display-xl ${styles.heading}`}>{clean(d.title)}</h1>
        {d.subtitle && <p className={`ntg-typography-body-xl ${styles.muted}`}>{clean(d.subtitle)}</p>}
      </header>
      {items.map((it, i) =>
        Array.isArray(it)
          ? <DoDont key={i}>{it.map((b, j) => <BlockView key={j} block={b} index={i * 100 + j} />)}</DoDont>
          : <BlockView key={i} block={it} index={i} />,
      )}
    </article>
  )
}
