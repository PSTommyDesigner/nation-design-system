/**
 * แกลเลอรีค้นหาไอคอนสำหรับหน้า Docs ของ Icon กับ NationHouseIcon (หัวหน้าอนุมัติ 2026-10-27)
 * ชุดไอคอนไม่เข้ากรอบ 5 หัวข้อของ component ทั่วไป คนเปิดหน้านี้มาเพื่อหาชื่อไอคอนไปใช้
 * จึงเป็นช่องค้นหาหนึ่งช่อง ตารางไอคอนครบทุกตัวจัดตามหมวด และกดที่ตัวไหนเพื่อคัดลอกชื่อ
 *
 * - ช่องค้นหาใช้ TextField ของระบบ (ไอคอนนำ search) ไม่วาดช่องเอง
 * - หมวดของ Nation UI Icons มาจาก iconCategories ใน components/Icon/icons.ts ที่เดียวกับ context/icons/icon-names.md
 * - Nation House Icons ไม่มีหมวดในต้นทาง จึงส่งมาเป็นหมวดเดียว
 * - คัดลอกด้วย navigator.clipboard ถ้าเบราว์เซอร์ไม่ให้ (เช่น iframe ไม่ปลอดภัย) จะขึ้นข้อความบอกแทน ไม่พัง
 * - สไตล์อยู่ที่ icon-gallery.css ผูก token ทั้งหมด ไม่มีค่าดิบ
 */
import { useMemo, useState, type ReactNode } from 'react'
import { TextField } from '../components/TextField'

export interface IconGalleryProps {
  /** ชื่อไอคอนจัดตามหมวด เรียงตามที่ต้องการให้แสดง */
  groups: Record<string, readonly string[]>
  /** วาดไอคอนหนึ่งตัวจากชื่อ */
  renderIcon: (name: string) => ReactNode
  /** ข้อความใน placeholder ของช่องค้นหา */
  placeholder?: string
}

export const IconGallery = ({ groups, renderIcon, placeholder = 'ค้นหาชื่อไอคอน' }: IconGalleryProps) => {
  const [query, setQuery] = useState('')
  const [copied, setCopied] = useState<string | null>(null)
  const [failed, setFailed] = useState(false)

  const q = query.trim().toLowerCase()
  const filtered = useMemo(
    () => Object.entries(groups)
      .map(([group, names]) => [group, names.filter((n) => n.toLowerCase().includes(q))] as const)
      .filter(([, names]) => names.length > 0),
    [groups, q],
  )
  const total = Object.values(groups).reduce((n, names) => n + names.length, 0)
  const shown = filtered.reduce((n, [, names]) => n + names.length, 0)

  const copy = async (name: string) => {
    try {
      await navigator.clipboard.writeText(name)
      setCopied(name)
      setFailed(false)
    } catch {
      setCopied(name)
      setFailed(true)
    }
  }

  return (
    <div className="ntg-icon-gallery">
      <div className="ntg-icon-gallery-toolbar">
        <TextField
          aria-label="ค้นหาไอคอน"
          placeholder={placeholder}
          leadingIcon="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <span className="ntg-icon-gallery-count" aria-live="polite">
          {copied
            ? failed ? `คัดลอกไม่ได้ พิมพ์ชื่อเอง: ${copied}` : `คัดลอกแล้ว: ${copied}`
            : `${shown} จาก ${total} ตัว`}
        </span>
      </div>
      {filtered.length === 0 && <p className="ntg-icon-gallery-empty">ไม่พบไอคอนที่ชื่อมี &quot;{query}&quot;</p>}
      {filtered.map(([group, names]) => (
        <section key={group} className="ntg-icon-gallery-group">
          <h3 className="ntg-icon-gallery-heading">{group} <span className="ntg-icon-gallery-count">{names.length}</span></h3>
          <div className="ntg-icon-gallery-grid">
            {names.map((name) => (
              <button
                key={name}
                type="button"
                className={`ntg-icon-gallery-item${copied === name ? ' is-copied' : ''}`}
                title={`คัดลอกชื่อ ${name}`}
                onClick={() => copy(name)}
              >
                <span className="ntg-icon-gallery-glyph">{renderIcon(name)}</span>
                <span className="ntg-icon-gallery-name">{name}</span>
              </button>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
