import type React from 'react'
import { Button } from '../../components/Button'
import { IconButton } from '../../components/IconButton'
import type { IconName } from '../../components/Icon'
import { Modal, type ModalSize } from '../../components/Modal'
import type { SampleRenderer } from '../../foundations/shared/AtomDoc'

// ตารางแปลงชุด modal ในไฟล์ออกแบบ (หน้า 30 Modal) เป็น Modal จริงในโค้ด ค่าที่รับมาคือค่าของชิ้นงานใน Figma
// ⚠️ ใช้ prop still ให้กล่องวาดค้างในกรอบตัวอย่าง ไม่เปิดด้วย showModal() ทับทั้งจอ (ผู้ใช้อนุมัติ 2026-11-10)
// ⚠️ body กับ footer เป็นช่องใส่เนื้อหา (slot) สคริปต์เก็บเนื้อหาไม่ได้ จึงใส่ตามที่วางไว้ในไฟล์ออกแบบ
//    มีหัว: ข้อความ "พื้นที่เนื้อหา ..." ไม่มีหัว: กรอบภาพ 16:9 พื้น quaternary มุมโค้งของการ์ด
//    ส่วนท้าย: ปุ่ม ยกเลิก (secondary) กับ ยืนยัน (primary) ขนาด md
// ⚠️ ข้อความหัวข้อกับคำอธิบายเป็นข้อความตั้งต้นของชุดใน Figma ไม่ใช่ property ของชุด

type P = Parameters<SampleRenderer>[0]
const on = (v: P[string] | undefined) => v === true || v === 'true'
const str = (v: P[string] | undefined) => (typeof v === 'string' ? v : undefined)
const noop = () => {}

const image: React.CSSProperties = {
  aspectRatio: '16 / 9',
  background: 'var(--ntg-color-background-general-quaternary)',
  borderRadius: 'var(--ntg-card-radius-top-left) var(--ntg-card-radius-top-right) var(--ntg-card-radius-bottom-right) var(--ntg-card-radius-bottom-left)',
}

const actions = (
  <>
    <Button family="neutral" hierarchy="secondary">ยกเลิก</Button>
    <Button family="brand">ยืนยัน</Button>
  </>
)

// ปุ่มปิดสองแบบในหัวข้อของที่เกี่ยวข้อง ตั้งค่าเดียวกับที่ Modal ใช้จริง (ดู Modal.tsx)
// มีหัว: neutral tertiary md semi-rounded ไม่มีหัว: alpha sm circular
// ไม่ยืม buttonSamples ของหน้า 12 เพราะตระกูลสีที่นั่นอ่านจากกรอบตระกูลในหน้า 12 หน้านี้ไม่มี
const closeButton = (shape: 'semi-rounded' | 'circular'): SampleRenderer => p => (
  <IconButton
    icon={(str(p['swap-icon']) ?? 'close') as IconName}
    label="ปิด"
    shape={shape}
    family={shape === 'circular' ? 'alpha' : 'neutral'}
    hierarchy={shape === 'circular' ? undefined : 'tertiary'}
    size={shape === 'circular' ? 'sm' : 'md'}
  />
)

export const modalSamples: Record<string, SampleRenderer> = {
  'semi-rounded-icon-button': closeButton('semi-rounded'),
  'circular-icon-button': closeButton('circular'),
  modal: p => {
    const size = (str(p.size) ?? 'md') as ModalSize
    const footer = on(p['show-footer']) ? actions : undefined
    const showClose = p['show-close'] === undefined ? true : on(p['show-close'])
    if (str(p.header) === 'false') {
      return (
        <Modal still open onClose={noop} size={size} header={false} aria-label="ตัวอย่างกล่องโต้ตอบแบบไม่มีหัว" showClose={showClose} footer={footer}>
          <div style={image} />
        </Modal>
      )
    }
    return (
      <Modal
        still
        open
        onClose={noop}
        size={size}
        title="หัวข้อกล่องโต้ตอบ"
        description={on(p['show-description']) ? 'คำอธิบายสั้น ๆ ว่ากล่องนี้ให้ทำอะไร' : undefined}
        showClose={showClose}
        footer={footer}
      >
        พื้นที่เนื้อหา วางเนื้อหาของกล่องโต้ตอบที่นี่
      </Modal>
    )
  },
}
