import { useState } from 'react'
import { Slider, type SliderSize, type SliderValue } from '../../components/Slider'
import type { SampleRenderer } from '../../foundations/shared/AtomDoc'

// ตารางแปลงชุดแถบเลื่อนในไฟล์ออกแบบ (หน้า 17 Sliders) เป็น component จริงในโค้ด ค่าที่รับมาคือค่าของชิ้นงานใน Figma
// value min max สคริปต์คำนวณจากรูปทรงของชิ้นงาน (ความยาวส่วนที่เติมสีเทียบกับราง) เพราะใน Figma ไม่มีค่าเป็นตัวเลข (ผู้ใช้อนุมัติ 2026-11-05)
// ⚠️ ตัวอย่างลากได้ ค่าเก็บไว้ในตัวอย่างเอง ไม่ได้บันทึกไว้ที่ไหน
// ⚠️ slider-handle ไม่มี component เดี่ยวในโค้ด หัวจับวาดอยู่ข้างใน Slider จึงไม่ใส่ในตาราง หน้าเอกสารจะขึ้นข้อความแทน (ผู้ใช้อนุมัติ 2026-11-05)

type P = Parameters<SampleRenderer>[0]
const on = (v: P[string] | undefined) => v === true || v === 'true'
const str = (v: P[string] | undefined) => (typeof v === 'string' ? v : undefined)
const num = (v: P[string] | undefined, d: number) => { const n = Number.parseFloat(String(v ?? '')); return Number.isFinite(n) ? n : d }

function Live({ p, range }: { p: P; range: boolean }) {
  const min = num(p.min, 0)
  const max = num(p.max, 100)
  const parts = String(p.value ?? '').split(',').map(x => num(x, min))
  const [value, setValue] = useState<SliderValue>(range ? [parts[0] ?? min, parts[1] ?? max] : parts[0] ?? min)
  return (
    <div style={{ width: '100%' }}>
      <Slider
        value={value}
        onValueChange={setValue}
        min={min}
        max={max}
        size={str(p.size) as SliderSize}
        disabled={on(p.disabled)}
        showValueTooltip={on(p['value-tooltip'])}
        showMinMaxLabel={on(p['min-max-label'])}
        label={range ? undefined : 'แถบเลื่อนตัวอย่าง'}
        rangeLabels={range ? ['ค่าต่ำสุดของช่วง', 'ค่าสูงสุดของช่วง'] : undefined}
      />
    </div>
  )
}

export const sliderSamples: Record<string, SampleRenderer> = {
  slider: p => <Live p={p} range={false} />,
  'range-slider': p => <Live p={p} range />,
}
