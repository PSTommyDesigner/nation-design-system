import type React from 'react'
import { TextField, type TextFieldSize } from '../../components/TextField'
import { TagField, type TagFieldSize } from '../../components/TagField'
import type { SampleRenderer } from '../../foundations/shared/AtomDoc'

// ตารางแปลงชุดช่องกรอกในไฟล์ออกแบบ (หน้า 13 Input) เป็น component จริงในโค้ด ค่าที่รับมาคือค่าของชิ้นงานใน Figma
// text-area ในโค้ดคือ TextField แบบ multiline
// ⚠️ state=hover focused error-hover error-focused วาดเป็นภาพนิ่งไม่ได้ ช่องกรอกใช้ :hover กับ :focus ของเบราว์เซอร์
//    error-hover กับ error-focused จึงแสดงเป็น error ส่วน disabled read-only และ error ส่งเป็น prop จริง จึงตรงแบบ
// ⚠️ ข้อความในแท็กไม่ใช่ property ของชุด tag-field ใน Figma เป็นข้อความตั้งต้นของชิ้นแท็กข้างในว่า Tag จึงใช้คำเดียวกัน
// ⚠️ ไอคอนหน้าและท้ายของ text-field ไม่มีตัวอย่างไหนในหน้านี้เปิดใช้ จึงยังไม่แปลง

type P = Parameters<SampleRenderer>[0]
// ช่องกรอกยืดเต็มกรอบที่วาง หน้าเอกสารให้กรอบกว้างเท่าชิ้นงานใน Figma จึงห่อให้เต็มกรอบนั้น
const Fill = ({ children }: { children: React.ReactNode }) => <div style={{ width: '100%' }}>{children}</div>
const on = (v: P[string] | undefined) => v === true || v === 'true'
const str = (v: P[string] | undefined) => (typeof v === 'string' ? v : undefined)

const field = (p: P) => {
  const state = str(p.state) ?? 'default'
  return {
    label: on(p['show-label']) ? str(p.label) : undefined,
    hint: on(p['show-hint']) ? str(p.hint) : undefined,
    placeholder: str(p.placeholder),
    required: on(p.required),
    error: state.startsWith('error'),
    disabled: state === 'disabled',
    readOnly: state === 'read-only',
  }
}

export const inputSamples: Record<string, SampleRenderer> = {
  'text-field': p => <Fill><TextField {...field(p)} size={str(p.size) as TextFieldSize} /></Fill>,
  'text-area': p => <Fill><TextField {...field(p)} size={str(p.size) as TextFieldSize} multiline /></Fill>,
  'tag-field': p => {
    const tags = [1, 2, 3, 4, 5].filter(i => on(p[`tag-${i}`])).map(() => 'Tag')
    const f = field(p)
    return <Fill><TagField {...f} placeholder={on(p['show-input-text']) ? f.placeholder : ''} size={str(p.size) as TagFieldSize} defaultTags={tags} /></Fill>
  },
}
