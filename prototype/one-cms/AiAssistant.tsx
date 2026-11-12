// ปุ่มผู้ช่วย AI "น้องเนเน่" ลอยบนหน้าจอ แบบระบบเดิม ตามเฟรม `Ai` (15669:14538) ในไฟล์ออกแบบ CMS
// ผู้ใช้สั่ง 2026-11-12
// - แสดงทุกหน้าของ One CMS ยกเว้น Login กดแล้วยังไม่เกิดอะไร เพราะทีมยังไม่ได้ข้อสรุปฟีเจอร์ AI
// - เปิดหน้ามาอยู่มุมขวาบนใต้แถบหัว CMS ลากไปวางตรงไหนก็ได้แต่อยู่ในขอบจอเสมอ ไม่จำตำแหน่ง โหลดหน้าใหม่กลับที่เดิม
// - pill-tag md neutral primary พิมพ์ข้อความทีละตัวแบบเครื่องพิมพ์ดีด เรียง สวัสดีครับ!! (3 วินาที) มีอะไรให้น้องเนเน่ช่วยไหมครับ (3 วินาที)
//   แล้วค้างที่ น้องเนเน่ 3 นาที ก่อนวนกลับ
// รูปมาสคอตเป็น PNG 160 x 160 (คมบนจอความละเอียดสูง) ห่อใน SVG ที่ตั้ง width height 80 ไว้ในไฟล์ แสดง 80 x 80 ตามแบบ
// ระบบไม่มี token ขนาดรูป จึงตั้งขนาดในไฟล์เหมือนโลโก้
// ตำแหน่งที่ลากเป็นข้อมูลระหว่างใช้งาน (เหมือนความสูงแท่งกราฟ) จึงอยู่ใน inline style ระยะห่างจากขอบอ่านจาก token
import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from 'react'
import { Tag } from '../../components/Tag'
import mascot from './assets/nation-ai.svg'
import styles from './AiAssistant.module.css'

/** ข้อความกับเวลาที่ค้างไว้หลังพิมพ์ครบ เป็นค่าพฤติกรรม ไม่ใช่ค่าที่วาดลงจอ */
const MESSAGES = [
  { text: 'สวัสดีครับ!!', holdMs: 3000 },
  { text: 'มีอะไรให้น้องเนเน่ช่วยไหมครับ', holdMs: 3000 },
  { text: 'น้องเนเน่', holdMs: 180000 },
]
const LONGEST = MESSAGES.map((m) => m.text).reduce((a, b) => (b.length > a.length ? b : a))
/** เวลาต่อหนึ่งตัวอักษรตอนพิมพ์ 0.1 วินาที (ผู้ใช้สั่ง 2026-11-12) */
const TYPE_MS = 100
// ตัดเป็นตัวอักษรที่เห็นบนจอ ให้สระบนล่างและวรรณยุกต์ไทย (ไม้หันอากาศ สระอิ ถึงพินทุ ไม้ไต่คู้ ถึงยามักการ) ติดไปกับตัวหน้า
// จะได้ขึ้นพร้อมพยัญชนะ ไม่ลอยมาทีหลัง (ใช้ regex เพราะ tsconfig ยังไม่รู้จัก Intl.Segmenter)
const CLUSTER = /[^\u0E31\u0E34-\u0E3A\u0E47-\u0E4E][\u0E31\u0E34-\u0E3A\u0E47-\u0E4E]*/gu
const GRAPHEMES = MESSAGES.map((m) => m.text.match(CLUSTER) ?? [])
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
/** ลากเกินระยะนี้ถึงนับว่าลาก ไม่ใช่กด */
const DRAG_THRESHOLD = 4

type Point = { x: number; y: number }

// อ่านค่า token เป็นพิกเซล
const tokenPx = (name: string) => parseFloat(getComputedStyle(document.documentElement).getPropertyValue(name)) || 0

export function AiAssistant({ anchorRef }: { anchorRef: RefObject<HTMLElement | null> }) {
  const rootRef = useRef<HTMLButtonElement>(null)
  // แท็กที่มองไม่เห็น ใส่ข้อความยาวที่สุดไว้วัดความกว้าง ตำแหน่งจะได้ไม่กระโดดตอนข้อความเปลี่ยน
  const measureRef = useRef<HTMLSpanElement>(null)
  const [pos, setPos] = useState<Point | null>(null)
  const [message, setMessage] = useState(0)
  // จำนวนตัวอักษรที่พิมพ์แล้วของข้อความปัจจุบัน
  const [typed, setTyped] = useState(0)
  const drag = useRef<{ start: Point; origin: Point; moved: boolean } | null>(null)

  // ให้ทั้งรูปและแท็ก (ซึ่งกว้างกว่ารูป) อยู่ในจอเสมอ
  const clamp = (p: Point): Point => {
    const root = rootRef.current
    if (!root) return p
    const w = root.offsetWidth
    const h = root.offsetHeight
    const tagW = measureRef.current?.offsetWidth ?? 0
    const overflow = Math.max(0, (tagW - w) / 2)
    const maxX = document.documentElement.clientWidth - w - overflow
    const maxY = window.innerHeight - h
    return { x: Math.min(Math.max(p.x, overflow), maxX), y: Math.min(Math.max(p.y, 0), maxY) }
  }

  // ตำแหน่งเริ่มต้น: มุมขวาบนใต้แถบหัว แท็กข้อความยาวที่สุดห่างขอบขวา 24
  // วางหลังรูปโหลดเสร็จ เพราะก่อนนั้นปุ่มยังไม่มีความกว้าง
  const placeInitial = () => {
    const root = rootRef.current
    if (!root || pos) return
    const gap = tokenPx('--ntg-size-space-s2-lg')
    const w = root.offsetWidth
    const overflow = Math.max(0, ((measureRef.current?.offsetWidth ?? 0) - w) / 2)
    const top = (anchorRef.current?.getBoundingClientRect().bottom ?? 0) + gap
    setPos(clamp({ x: document.documentElement.clientWidth - w - overflow - gap, y: top }))
  }
  const imgRef = useRef<HTMLImageElement>(null)
  useLayoutEffect(() => {
    if (imgRef.current?.complete) placeInitial()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ย่อจอแล้วยังต้องอยู่ในขอบ
  useEffect(() => {
    const onResize = () => setPos((p) => (p ? clamp(p) : p))
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // พิมพ์ทีละตัว พิมพ์ครบแล้วค้างตามเวลาของข้อความนั้น แล้วไปข้อความถัดไป
  // ผู้ใช้ที่ตั้งลดภาพเคลื่อนไหว ข้อความขึ้นครบทันที
  useEffect(() => {
    const total = GRAPHEMES[message].length
    if (typed < total) {
      if (reducedMotion()) { setTyped(total); return }
      const id = window.setTimeout(() => setTyped((t) => t + 1), TYPE_MS)
      return () => window.clearTimeout(id)
    }
    const id = window.setTimeout(() => {
      setMessage((m) => (m + 1) % MESSAGES.length)
      setTyped(0)
    }, MESSAGES[message].holdMs)
    return () => window.clearTimeout(id)
  }, [message, typed])

  const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!pos || e.button !== 0) return
    e.currentTarget.setPointerCapture(e.pointerId)
    drag.current = { start: { x: e.clientX, y: e.clientY }, origin: pos, moved: false }
  }
  const onPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const d = drag.current
    if (!d) return
    const dx = e.clientX - d.start.x
    const dy = e.clientY - d.start.y
    if (!d.moved && Math.hypot(dx, dy) < DRAG_THRESHOLD) return
    d.moved = true
    setPos(clamp({ x: d.origin.x + dx, y: d.origin.y + dy }))
  }
  const onPointerUp = () => { drag.current = null }

  // คนที่ลากไม่ได้ใช้ลูกศรเลื่อนได้ ครั้งละ 16 (WCAG 2.5.7)
  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const step = tokenPx('--ntg-size-space-s2-sm')
    const move: Record<string, Point> = { ArrowLeft: { x: -step, y: 0 }, ArrowRight: { x: step, y: 0 }, ArrowUp: { x: 0, y: -step }, ArrowDown: { x: 0, y: step } }
    const m = move[e.key]
    if (!m || !pos) return
    e.preventDefault()
    setPos(clamp({ x: pos.x + m.x, y: pos.y + m.y }))
  }

  return (
    <button
      ref={rootRef}
      type="button"
      className={`${styles.root} ${pos ? '' : styles.initial}`}
      style={pos ? { left: pos.x, top: pos.y } : undefined}
      aria-label="น้องเนเน่ ผู้ช่วย AI ลากหรือกดลูกศรเพื่อย้ายตำแหน่ง"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onKeyDown={onKeyDown}
    >
      <img ref={imgRef} className={styles.mascot} src={mascot} alt="" draggable={false} onLoad={placeInitial} />
      <span className={styles.tag} aria-hidden="true">
        <Tag family="neutral" shape="pill" size="md" hierarchy="primary">
          <span className={styles.message}>{GRAPHEMES[message].slice(0, typed).join('')}</span>
        </Tag>
      </span>
      <span ref={measureRef} className={styles.measure} aria-hidden="true">
        <Tag family="neutral" shape="pill" size="md" hierarchy="primary">{LONGEST}</Tag>
      </span>
    </button>
  )
}
