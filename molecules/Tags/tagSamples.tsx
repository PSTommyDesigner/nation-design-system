import { Tag, type TagFamily, type TagHierarchy, type TagLeading, type TagShape, type TagSize } from '../../components/Tag'
import { Icon, type IconName } from '../../components/Icon'
import type { SampleRenderer } from '../../foundations/shared/AtomDoc'

// ตารางแปลงชุดแท็ก 14 ชุดในไฟล์ออกแบบ (หน้า 21 Tags) เป็น Tag จริงในโค้ด
// ค่าที่รับมาคือคุณสมบัติของชิ้นงานใน Figma ตระกูลสี (family) สคริปต์ใส่ให้จากเอกสารที่ชุดนั้นอยู่
// ⚠️ ชื่อชุดบอกทรงกับของนำหน้า เช่น pill-number-tag คือ shape pill กับ leading left-number
// ⚠️ ตัวเลขนำหน้าเป็น 1 และช่องติ๊กไม่ได้ติ๊ก ตามชิ้นงานต้นแบบใน Figma ซึ่งไม่มีคุณสมบัติให้แก้สองค่านี้
// ⚠️ ใน Figma image-tag แบบ default-gray false ของทุกตระกูลสีมี fill ชนิดรูปแต่ไม่มีรูป (ช่องรูปว่าง) สคริปต์จึงไม่มีรูปให้
//    ตัวอย่างใช้ภาพแทนรูปของหน้านี้แทน ให้กว้างเท่าชิ้นงานใน Figma (ช่องรูปว่างเป็นงานค้างฝั่ง Figma)
// ⚠️ state=hover วาดเป็นภาพนิ่งไม่ได้ แท็กมี hover เฉพาะตอนกดได้ จึงส่ง onSelect ให้ลองวางเมาส์ได้ ส่วน disabled ส่งเป็น disabled จริง

type P = Parameters<SampleRenderer>[0]
// ภาพแทนรูปของหน้านี้ที่สคริปต์ส่งออกไว้ใน assets/ มีรูปเดียว
const fallbackImage = Object.values(import.meta.glob<string>('./assets/*.png', { eager: true, query: '?url', import: 'default' }))[0]
const str = (v: unknown) => (typeof v === 'string' ? v : undefined)
const icon = (name: unknown) => <Icon name={(str(name) ?? 'close') as IconName} size="100%" />

// ชื่อชุดใน Figma ไปเป็นทรง ของนำหน้า และโหมดไอคอนล้วนในโค้ด
const SET: Record<string, { shape: TagShape; leading?: TagLeading; iconOnly?: boolean }> = {
  'semi-rounded-tag': { shape: 'semi-rounded' },
  'pill-tag': { shape: 'pill' },
  'number-tag': { shape: 'semi-rounded', leading: 'left-number' },
  'pill-number-tag': { shape: 'pill', leading: 'left-number' },
  'image-tag': { shape: 'semi-rounded', leading: 'left-image' },
  'pill-image-tag': { shape: 'pill', leading: 'left-image' },
  'checkbox-tag': { shape: 'semi-rounded', leading: 'left-checkbox' },
  'pill-checkbox-tag': { shape: 'pill', leading: 'left-checkbox' },
  'indicator-tag': { shape: 'semi-rounded', leading: 'left-indicator' },
  'pill-indicator-tag': { shape: 'pill', leading: 'left-indicator' },
  'icon-tag': { shape: 'semi-rounded', iconOnly: true },
  'circular-icon-tag': { shape: 'circular', iconOnly: true },
  'link-tag': { shape: 'link' },
  'link-icon-tag': { shape: 'link', iconOnly: true },
}

const render = (set: string): SampleRenderer => (p: P, image?: string) => {
  const s = SET[set]
  const iconOnly = s.iconOnly === true
  return (
    <Tag
      family={(str(p.family) ?? 'brand') as TagFamily}
      hierarchy={str(p.hierarchy) as TagHierarchy | undefined}
      size={str(p.size) as TagSize}
      shape={s.shape}
      leading={s.leading}
      defaultGray={p['default-gray'] === 'true'}
      count={s.leading === 'left-number' ? 1 : undefined}
      imageSrc={s.leading === 'left-image' ? (image ?? fallbackImage) : undefined}
      checked={s.leading === 'left-checkbox' ? false : undefined}
      leftIcon={p['left-icon'] === true ? icon(p['left-icon-swap']) : undefined}
      closable={p['right-icon'] === true}
      closeIcon={p['right-icon'] === true ? icon(p['right-icon-swap']) : undefined}
      iconOnly={iconOnly}
      icon={iconOnly ? icon(p['swap-icon']) : undefined}
      label={iconOnly ? 'แท็กไอคอน' : undefined}
      onSelect={p.state === 'hover' ? () => {} : undefined}
      disabled={p.state === 'disabled'}
    >
      {iconOnly ? undefined : (str(p['tag-title']) ?? '')}
    </Tag>
  )
}

export const tagSamples: Record<string, SampleRenderer> = Object.fromEntries(Object.keys(SET).map(set => [set, render(set)]))
