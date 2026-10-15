# Badge

ป้ายบอกสถานะของสิ่งที่มันเกาะอยู่ **ค่าถูกกำหนดโดยระบบ ผู้ใช้กดไม่ได้**

ตรงกับ component set ใน Figma หน้า **22 Badge** (40 ชุด 800 แบบ) และใช้ token จาก `tokens/scale/badge.mjs`

## เลือกระหว่าง Badge กับ Tag

ถามว่า **ใครเป็นคนเปลี่ยนค่า**

| คำตอบ | ใช้ |
|---|---|
| ระบบเป็นคนเปลี่ยน | `Badge` |
| ผู้ใช้เป็นคนเปลี่ยน | `Tag` |

เกณฑ์เต็ม 4 ข้ออยู่ที่ [docs/research/badge-component.md](../../docs/research/badge-component.md)

## Props

| Prop | ชนิด | ค่าตั้งต้น | คำอธิบาย |
|---|---|---|---|
| `children` | ReactNode | ไม่มี | ข้อความในป้าย ถ้าไม่ส่งและส่ง `icon` แทน จะเป็นป้ายไอคอนล้วน |
| `family` | 10 ตระกูลสี | `neutral` | brand neutral red green yellow cyan blue purple pink bamboo |
| `hierarchy` | `primary` `secondary` `tertiary` `quaternary` | `secondary` | ระดับความเด่น |
| `size` | `xs` ถึง `xl` | `md` | ความสูง 16 20 24 28 32 เท่ากับ Tag |
| `shape` | `semi-rounded` `pill` `circular` | `semi-rounded` | `circular` ใช้ได้เฉพาะป้ายไอคอนล้วน |
| `trailingIcon` | IconName | ไม่มี | ไอคอนท้ายข้อความ |
| `icon` | IconName | ไม่มี | ไอคอนของป้ายไอคอนล้วน |
| `label` | string | ไม่มี | **บังคับเมื่อเป็นป้ายไอคอนล้วน** เพื่อให้โปรแกรมอ่านหน้าจออ่านได้ |

## ตัวอย่าง

```tsx
<Badge family="red" hierarchy="primary" size="sm">ด่วน</Badge>
<Badge family="green" hierarchy="secondary" shape="pill">เผยแพร่แล้ว</Badge>
<Badge family="brand" icon="check" shape="circular" label="ยืนยันแล้ว" />
```

## ข้อควรระวัง

1. **ไม่มี hover focus หรือ disabled โดยตั้งใจ** ป้ายเป็นของนิ่ง ถ้าต้องการของกดได้ให้ใช้ `Tag`
2. **ห้ามวางลอย** ป้ายต้องเกาะกับของอื่นเสมอ ถ้าต้องวางลอยแปลว่าที่จริงต้องการ `Tag`
3. **หนึ่งของหนึ่งป้าย** ถ้าต้องติดหลายอันบนของชิ้นเดียว แปลว่าที่จริงต้องการ `Tag`
4. **ห้ามผูก tooltip กับตัวป้าย** ให้ผูกกับตัวแม่แทน
5. **ชื่อระดับของป้ายกับของแท็กหมายถึงคนละหน้าตา** ป้ายมี 4 ระดับเพราะมีพื้นอ่อน ส่วนแท็กมี 3 ระดับ `secondary` ของแท็กคือมีขอบ
