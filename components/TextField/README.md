# TextField

ช่องกรอกข้อความ ตรงกับ component set ใน Figma หน้า **13 Input** ครอบคลุมชุด `text-field` และ `text-area`

ใช้ token จาก `tokens/scale/input.mjs`

## Props

| Prop | ชนิด | ค่าตั้งต้น | คำอธิบาย |
|---|---|---|---|
| `label` | ReactNode | ไม่มี | ป้ายชื่อเหนือช่อง |
| `hint` | ReactNode | ไม่มี | ข้อความช่วยใต้ช่อง เปลี่ยนเป็นสีแดงเมื่ออยู่ในสถานะผิดพลาด |
| `size` | `sm` `md` `lg` | `md` | **มีแค่ 3 ขนาด** ต่างจาก component อื่นที่มี 5 |
| `error` | boolean | `false` | สถานะผิดพลาด |
| `required` | boolean | `false` | แสดงดอกจันท้ายป้ายชื่อ |
| `leadingIcon` `trailingIcon` | IconName | ไม่มี | ไอคอนหน้าและหลังข้อความ |
| `leadingDivider` `trailingDivider` | boolean | `false` | เส้นคั่นระหว่างไอคอนกับข้อความ |
| `multiline` | boolean | `false` | ใช้ชุด text-area ความสูงโตตามเนื้อหา |
| `rows` | number | `4` | ใช้กับ `multiline` |

## ตัวอย่าง

```tsx
<TextField label="หัวข้อข่าว" placeholder="พิมพ์หัวข้อ" required />
<TextField label="อีเมล" leadingIcon="mail" error hint="อีเมลไม่ถูกต้อง" />
<TextField label="เนื้อหา" multiline rows={5} size="lg" />
```

## ข้อควรระวัง

1. **ความสูงผูกกับสเกลความสูงกลาง** เพราะช่องกรอกกับปุ่มวางในแถวเดียวกันจริง ถ้าเปลี่ยนต้องไปตรวจ `tokens/scale/global-scale.config.mjs`
2. **ยังไม่มีชุด tag-field ในโค้ด** ไฟล์ออกแบบมี 3 ชุดคือ text-field text-area และ tag-field ตอนนี้โค้ดครอบสองชุดแรก ชุดแท็กต้องประกอบจาก `Tag` เอง
3. ตัวนับตัวอักษร คำนำหน้าที่เป็นข้อความ และสถานะเตือนกับสำเร็จ ยังไม่ทำทั้งในไฟล์ออกแบบและในโค้ด
