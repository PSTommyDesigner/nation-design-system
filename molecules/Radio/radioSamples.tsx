import { Radio, type RadioSize } from '../../components/Radio'
import type { SampleRenderer } from '../../foundations/shared/AtomDoc'

// ตารางแปลงชุดปุ่มเลือกในไฟล์ออกแบบ (หน้า 16 Radio) เป็น component จริงในโค้ด ค่าที่รับมาคือค่าของชิ้นงานใน Figma
// radio คือปุ่มเลือกล้วน text-radio คือปุ่มเลือกพร้อมป้ายชื่อและคำอธิบาย ในโค้ดเป็น Radio ตัวเดียวกัน
// ⚠️ state=hover กับ focused วาดเป็นภาพนิ่งไม่ได้ ปุ่มเลือกใช้ :hover กับ :focus-visible ของเบราว์เซอร์ จึงดูเหมือน default จนกว่าจะวางเมาส์หรือกด Tab
//    state=disabled ส่งเป็น disabled จริง จึงตรงแบบ
// ⚠️ ตัวอย่างแต่ละตัวเป็นปุ่มเดี่ยว ไม่ได้อยู่ในกลุ่มเดียวกัน (ไม่ส่ง name) เพราะในไฟล์ออกแบบวางเป็นตัวอย่างเดี่ยว ๆ

type P = Parameters<SampleRenderer>[0]
const on = (v: P[string] | undefined) => v === true || v === 'true'
const str = (v: P[string] | undefined) => (typeof v === 'string' ? v : undefined)

const common = (p: P) => ({
  size: str(p.size) as RadioSize,
  defaultChecked: on(p.checked),
  disabled: p.state === 'disabled',
})

export const radioSamples: Record<string, SampleRenderer> = {
  radio: p => <Radio {...common(p)} aria-label="ปุ่มเลือกตัวอย่าง" />,
  'text-radio': p => (
    <Radio
      {...common(p)}
      label={on(p.title) ? str(p['title-value']) : undefined}
      supportingText={on(p['supporting-text']) ? str(p['supporting-text-value']) : undefined}
      aria-label={on(p.title) ? undefined : 'ปุ่มเลือกตัวอย่าง'}
    />
  ),
}
