import { useState } from 'react'
import { Tabs, type TabItem, type TabsShape, type TabsSize } from '../../components/Tabs'
import type { IconName } from '../../components/Icon'
import type { SampleRenderer } from '../../foundations/shared/AtomDoc'

// ตารางแปลงชุดแท็บในไฟล์ออกแบบ (หน้า 18 Tabs) เป็น component จริงในโค้ด ค่าที่รับมาคือค่าของชิ้นงานใน Figma
// ⚠️ ในโค้ดไม่มีแท็บเดี่ยว แท็บเดี่ยว (segmented-tab underline-tab) จึงวาดเป็น Tabs ที่มีแท็บเดียว (ผู้ใช้อนุมัติ 2026-11-05)
//    ทรง segmented จึงมีพื้นรางของกลุ่มรอบแท็บ ซึ่งชุดแท็บเดี่ยวใน Figma ไม่มี
// ⚠️ กลุ่มแท็บรับรายการแท็บจาก children ที่สคริปต์อ่านจากแท็บข้างในกลุ่ม ชื่อไอคอนอ่านจากชิ้นงานไอคอนข้างในแท็บ (iconName)
// ⚠️ state=hover กับ focused วาดเป็นภาพนิ่งไม่ได้ ส่วน disabled ส่งเป็น disabled ของแท็บนั้นจริง
// ⚠️ กลุ่มแท็บกดเปลี่ยนแท็บได้ ค่าเก็บไว้ในตัวอย่างเอง

type P = Parameters<SampleRenderer>[0]
const str = (v: unknown) => (typeof v === 'string' ? v : undefined)

// แท็บหนึ่งแท็บจากค่าใน Figma แกน icon คือ false leading unread only
function itemOf(p: P, i: number): TabItem {
  const kind = str(p.icon) ?? 'false'
  const icon = str(p.iconName) as IconName | undefined
  const label = str(p.text) ?? ''
  return {
    id: `tab-${i}`,
    label,
    icon: kind === 'leading' || kind === 'only' ? icon : undefined,
    iconOnly: kind === 'only',
    unread: kind === 'unread',
    ariaLabel: kind === 'only' ? (icon ?? label) : undefined,
    disabled: p.state === 'disabled',
  }
}

function Group({ items, shape, size, current }: { items: TabItem[]; shape: TabsShape; size?: TabsSize; current: string }) {
  const [value, setValue] = useState(current)
  return <Tabs items={items} value={value} onValueChange={setValue} shape={shape} size={size} label="แท็บตัวอย่าง" />
}

const single = (shape: TabsShape): SampleRenderer => p => {
  const item = itemOf(p, 0)
  // แท็บที่ไม่ได้เลือก ส่ง value ที่ไม่ตรงกับแท็บใด จึงไม่มีแท็บไหนอยู่ในสถานะเลือก
  return <Tabs items={[item]} value={p.current === 'true' ? item.id : ''} shape={shape} size={str(p.size) as TabsSize} label="แท็บตัวอย่าง" />
}

const group = (shape: TabsShape): SampleRenderer => p => {
  const kids = Array.isArray(p.children) ? p.children : []
  const items = kids.map((k, i) => itemOf(k, i))
  const current = kids.findIndex(k => k.current === 'true')
  return <Group items={items} shape={shape} size={str(p.size) as TabsSize} current={current >= 0 ? `tab-${current}` : ''} />
}

export const tabSamples: Record<string, SampleRenderer> = {
  'segmented-tab': single('segmented'),
  'underline-tab': single('underline'),
  'segmented-tab-group': group('segmented'),
  'underline-tab-group': group('underline'),
}
