import { Checkbox, type CheckboxSize } from '../../components/Checkbox'
import type { SampleRenderer } from '../../foundations/shared/AtomDoc'

// ตารางแปลงชุดช่องติ๊กในไฟล์ออกแบบ (หน้า 15 Checkbox) เป็น component จริงในโค้ด ค่าที่รับมาคือค่าของชิ้นงานใน Figma
// checkbox คือช่องติ๊กล้วน text-checkbox คือช่องติ๊กพร้อมป้ายชื่อและคำอธิบาย ในโค้ดเป็น Checkbox ตัวเดียวกัน
// ⚠️ state=hover กับ focused วาดเป็นภาพนิ่งไม่ได้ ช่องติ๊กใช้ :hover กับ :focus-visible ของเบราว์เซอร์ จึงดูเหมือน default จนกว่าจะวางเมาส์หรือกด Tab
//    state=disabled ส่งเป็น disabled จริง จึงตรงแบบ
// ⚠️ ตัวอย่างในหน้าเอกสารกดสลับได้ (defaultChecked) แต่ไม่ได้บันทึกค่าไว้ที่ไหน

type P = Parameters<SampleRenderer>[0]
const on = (v: P[string] | undefined) => v === true || v === 'true'
const str = (v: P[string] | undefined) => (typeof v === 'string' ? v : undefined)

const common = (p: P) => ({
  size: str(p.size) as CheckboxSize,
  defaultChecked: p.checked === 'true',
  indeterminate: p.checked === 'indeterminate',
  disabled: p.state === 'disabled',
})

export const checkboxSamples: Record<string, SampleRenderer> = {
  checkbox: p => <Checkbox {...common(p)} aria-label="ช่องติ๊กตัวอย่าง" />,
  'text-checkbox': p => (
    <Checkbox
      {...common(p)}
      label={str(p['title-value'])}
      supportingText={on(p['supporting-text']) ? str(p['supporting-text-value']) : undefined}
    />
  ),
}
