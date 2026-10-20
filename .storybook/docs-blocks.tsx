/**
 * บล็อกประกอบเอกสารหน้า Docs ให้ stories ของทุก component หยิบไปใช้
 * เทียบกับบล็อกในไฟล์ออกแบบ (ตั้ง 2026-10-20 หัวหน้าอนุมัติแผน)
 *
 *   Preview  = บล็อก `preview` ในไฟล์ออกแบบ วาง instance จริงเรียงแนวนอน ช่องไฟ 16
 *   Labeled  = ชิ้นงานหนึ่งชิ้นพร้อมป้ายกำกับใต้ชิ้น ใช้ในหัวข้อขนาดกับสถานะ
 *   DoDont   = บล็อก `do-dont` ประกอบจาก Do กับ Dont คู่กัน เทียบ info-card / do กับ don't
 *
 * สไตล์อยู่ที่ docs-blocks.css (โหลด global ใน preview.tsx) ผูก token ทั้งหมด ไม่มีค่าดิบ
 * ไอคอนในป้าย ควร/ไม่ควร ใช้ Icon ของ DS ไม่วาดเอง
 */
import type { ReactNode } from 'react'
import { Icon } from '../components/Icon'

export const Preview = ({ children, column = false }: { children: ReactNode; column?: boolean }) => (
  <div className={`ntg-docs-preview${column ? ' is-column' : ''}`}>{children}</div>
)

export const Labeled = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="ntg-docs-labeled">
    {children}
    <span className="ntg-docs-labeled-text">{label}</span>
  </div>
)

export const DoDont = ({ children }: { children: ReactNode }) => (
  <div className="ntg-docs-do-dont">{children}</div>
)

type CardProps = { text: string; children?: ReactNode }

const Card = ({ kind, text, children }: CardProps & { kind: 'do' | 'dont' }) => (
  <div className={`ntg-docs-card is-${kind}`}>
    <span className="ntg-docs-card-label">
      <Icon name={kind === 'do' ? 'check' : 'close'} size="100%" />
      {kind === 'do' ? 'ควร' : 'ไม่ควร'}
    </span>
    {children && <div className="ntg-docs-card-body">{children}</div>}
    <p className="ntg-docs-card-text">{text}</p>
  </div>
)

export const Do = (p: CardProps) => <Card kind="do" {...p} />
export const Dont = (p: CardProps) => <Card kind="dont" {...p} />
