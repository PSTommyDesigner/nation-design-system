import type React from 'react'
import { Dropdown, type DropdownSize } from '../../components/Dropdown'
import type { SampleRenderer } from '../../foundations/shared/AtomDoc'

// ตารางแปลงชุดในไฟล์ออกแบบ (หน้า 27 Dropdowns) เป็น Dropdown จริงในโค้ด ค่าที่รับมาคือค่าของชิ้นงานใน Figma
// ⚠️ แปลงเฉพาะชุด dropdown (ตัวช่อง) ส่วน dropdown-menu, _dropdown-option และ _dropdown-group-header
//    เป็นแผงและแถวที่อยู่ข้างใน Dropdown โค้ดไม่มี component แยกให้วางเดี่ยว ๆ หน้าเอกสารจึงขึ้นข้อความแทน
// ⚠️ state=hover focused open error-hover error-focused วาดเป็นภาพนิ่งไม่ได้ เพราะช่องใช้ :hover :focus-visible ของเบราว์เซอร์
//    และเปิดแผงเมื่อกดเท่านั้น จึงแสดงเป็น default หรือ error ส่วน disabled read-only และ error ส่งเป็น prop จริง จึงตรงแบบ
// ⚠️ ข้อความในช่อง "เลือกตัวเลือก" เป็นข้อความตั้งต้นของชุดใน Figma ไม่ใช่ property ของชุด

type P = Parameters<SampleRenderer>[0]
// ช่องยืดเต็มกรอบที่วาง หน้าเอกสารให้กรอบกว้างเท่าชิ้นงานใน Figma จึงห่อให้เต็มกรอบนั้น
const Fill = ({ children }: { children: React.ReactNode }) => <div style={{ width: '100%' }}>{children}</div>
const str = (v: P[string] | undefined) => (typeof v === 'string' ? v : undefined)

const OPTIONS = [
  { value: '1', label: 'ตัวเลือก 1' },
  { value: '2', label: 'ตัวเลือก 2' },
  { value: '3', label: 'ตัวเลือก 3' },
]

export const dropdownSamples: Record<string, SampleRenderer> = {
  dropdown: p => {
    const state = str(p.state) ?? 'default'
    return (
      <Fill>
        <Dropdown
          options={OPTIONS}
          placeholder="เลือกตัวเลือก"
          size={str(p.size) as DropdownSize}
          error={state.startsWith('error')}
          disabled={state === 'disabled'}
          readOnly={state === 'read-only'}
          aria-label="ตัวอย่าง Dropdown"
        />
      </Fill>
    )
  },
}
