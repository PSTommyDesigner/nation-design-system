import { Toggle, type ToggleSize } from '../../components/Toggle'
import type { SampleRenderer } from '../../foundations/shared/AtomDoc'

// ตารางแปลงชุดสวิตช์ในไฟล์ออกแบบ (หน้า 14 Toggles) เป็น component จริงในโค้ด ค่าที่รับมาคือค่าของชิ้นงานใน Figma
// ⚠️ state=hover กับ focused วาดเป็นภาพนิ่งไม่ได้ สวิตช์ใช้ :hover กับ :focus-visible ของเบราว์เซอร์ จึงดูเหมือน default จนกว่าจะวางเมาส์หรือกด Tab
//    state=disabled ส่งเป็น disabled จริง จึงตรงแบบ
// ⚠️ ตัวอย่างในหน้าเอกสารกดสลับได้ (defaultChecked) แต่ไม่ได้บันทึกค่าไว้ที่ไหน

type P = Parameters<SampleRenderer>[0]
const on = (v: P[string] | undefined) => v === true || v === 'true'
const str = (v: P[string] | undefined) => (typeof v === 'string' ? v : undefined)

export const toggleSamples: Record<string, SampleRenderer> = {
  toggle: p => (
    <Toggle
      size={str(p.size) as ToggleSize}
      defaultChecked={on(p.active)}
      disabled={p.state === 'disabled'}
      label={on(p.title) ? str(p['title-value']) : undefined}
      supportingText={on(p['supporting-text']) ? str(p['supporting-text-value']) : undefined}
      aria-label={on(p.title) ? undefined : 'สวิตช์ตัวอย่าง'}
    />
  ),
}
