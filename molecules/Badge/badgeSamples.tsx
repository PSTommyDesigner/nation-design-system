import { Badge, type BadgeFamily, type BadgeHierarchy, type BadgeShape, type BadgeSize } from '../../components/Badge'
import type { IconName } from '../../components/Icon'
import type { SampleRenderer } from '../../foundations/shared/AtomDoc'

// ตารางแปลงชุดป้าย 5 ชุดในไฟล์ออกแบบ (หน้า 22 Badge) เป็น Badge จริงในโค้ด
// ค่าที่รับมาคือคุณสมบัติของชิ้นงานใน Figma ตระกูลสี (family) สคริปต์ใส่ให้จากเอกสารที่ชุดนั้นอยู่
// ⚠️ ไอคอนของป้ายใน Figma คือ priority_high จากชุด Material design(2) ที่เป็นชุดเก่า ในโค้ดไม่มีชื่อนี้
//    จึงแปลงเป็น error ของชุด Nation UI ซึ่งเป็นเครื่องหมายตกใจแบบไม่มีวงกลมเหมือนกัน (ไอคอนชุดเก่าในหน้า 22 เป็นงานค้างฝั่ง Figma)

type P = Parameters<SampleRenderer>[0]
const str = (v: unknown) => (typeof v === 'string' ? v : undefined)
const ICON_ALIAS: Record<string, IconName> = { priority_high: 'error' }
const icon = (v: unknown): IconName => {
  const name = str(v) ?? 'error'
  return ICON_ALIAS[name] ?? (name as IconName)
}

// ชื่อชุดใน Figma ไปเป็นทรงกับโหมดไอคอนล้วนในโค้ด
const SET: Record<string, { shape: BadgeShape; iconOnly?: boolean }> = {
  'semi-rounded-badge': { shape: 'semi-rounded' },
  'pill-badge': { shape: 'pill' },
  'semi-rounded-icon-badge': { shape: 'semi-rounded', iconOnly: true },
  'circular-icon-badge': { shape: 'circular', iconOnly: true },
  'link-badge': { shape: 'link' },
}

const render = (set: string): SampleRenderer => (p: P) => {
  const s = SET[set]
  const common = {
    family: (str(p.family) ?? 'brand') as BadgeFamily,
    hierarchy: str(p.hierarchy) as BadgeHierarchy | undefined,
    size: str(p.size) as BadgeSize,
    shape: s.shape,
  }
  if (s.iconOnly) return <Badge {...common} icon={icon(p['leading-icon-swap'])} label="ป้ายไอคอน" />
  return (
    <Badge {...common} trailingIcon={p['trailing-icon'] === true ? icon(p['trailing-icon-swap']) : undefined}>
      {str(p['badge-title']) ?? ''}
    </Badge>
  )
}

export const badgeSamples: Record<string, SampleRenderer> = Object.fromEntries(Object.keys(SET).map(set => [set, render(set)]))
