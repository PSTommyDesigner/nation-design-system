# Toggle

สวิตช์เปิดปิด ตรงกับ component set ใน Figma หน้า **14 Toggles** (40 แบบ) ใช้ token จาก `tokens/scale/toggle.mjs`

## โครงสองชั้น

ภาพสวิตช์มีสเกลของตัวเอง ส่วนแถวที่กดได้อ้างสเกลความสูงกลางของระบบ ตามแบบ Adobe Spectrum

| ชั้น | token |
|---|---|
| ภาพสวิตช์ | `track-width` `track-height` `knob-size` `travel` `inset` |
| แถวที่กดได้ | `row-height-{size}` `row-height-touch` `gap` `indent` |

## Props

| Prop | ชนิด | ค่าตั้งต้น | คำอธิบาย |
|---|---|---|---|
| `label` | ReactNode | ไม่มี | ข้อความข้างสวิตช์ |
| `supportingText` | ReactNode | ไม่มี | ข้อความอธิบายใต้แถว |
| `size` | `xs` ถึง `xl` | `md` | |
| `touchTarget` | boolean | `false` | บังคับความสูงแถวให้ถึงพื้นที่แตะขั้นต่ำ ใช้กับจอสัมผัส |
| `checked` `defaultChecked` `disabled` `onChange` | เหมือน input | | ส่งต่อไปที่ `<input type="checkbox" role="switch">` |

## ตัวอย่าง

```tsx
<Toggle label="รับการแจ้งเตือน" checked={on} onChange={e => setOn(e.target.checked)} />
<Toggle size="lg" label="โหมดมืด" supportingText="ใช้กับทุกหน้าในเครื่องนี้" />
```

## ข้อควรระวัง

1. **ห้ามให้ปุ่มกลมขยายหรือยืดตอนกดเด็ดขาด** (ตัดสิน 2026-09-04) สถานะกดบอกด้วยสีอย่างเดียว
2. **สถานะปิดกับสถานะปิดใช้งานใช้สีเดียวกัน** เป็นข้อจำกัดที่รู้ตัวและยอมรับแล้ว ตรงกับไฟล์ออกแบบ
3. ช่องติ๊กจริงซ่อนไว้ด้วย `clip-path` ไม่ใช่ `display: none` เพื่อให้ยังรับโฟกัสและโปรแกรมอ่านหน้าจออ่านได้
