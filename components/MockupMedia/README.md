# MockupMedia

ภาพแทนรูปภาพและวีดีโอ วางแทนภาพจริงในการ์ด Modal และหน้าจอตัวอย่าง ระหว่างที่ยังไม่มีภาพ บอกผู้ดูได้ว่าตรงนั้นคือรูปหรือวีดีโอ แทนพื้นเทาเปล่า
ตรงกับชุด `mockup-media` ในไฟล์ออกแบบหน้า 10 Frame (แกน `kind` กับ `size` รวม 10 แบบ) สร้าง 2026-11-11

## การใช้

```tsx
import { MockupMedia } from '@/components/MockupMedia'

// กรอบแม่มีความสูงอยู่แล้ว กล่องยืดเต็มกรอบ
<div style={{ width: 165, height: 86 }}>
  <MockupMedia kind="image" size="sm" />
</div>

// กรอบแม่ไม่มีความสูง ส่งสัดส่วนเอง
<MockupMedia kind="video" size="xl" style={{ aspectRatio: '16 / 9' }} />
```

## Props

| prop | ชนิด | ค่าเริ่มต้น | Figma | คำอธิบาย |
| --- | --- | --- | --- | --- |
| `kind` | `'image' \| 'video'` | `'image'` | แกน `kind` | image แสดงไอคอน `image` กับคำว่า รูปภาพ ส่วน video แสดงไอคอน `videocam` กับคำว่า วีดีโอ |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | แกน `size` | ไอคอน 16 20 24 32 40 ข้อความ body-sm แสดงเฉพาะ lg กับ xl |

รับ prop อื่นของ `div` ได้ทั้งหมด เช่น `className` และ `style`

## ค่าที่ใช้

| ส่วน | token |
| --- | --- |
| พื้น | `--ntg-color-background-general-secondary` |
| ไอคอน | `--ntg-mockup-media-icon-size-{xs..xl}` สี `--ntg-icon-general-disable-subtle` |
| ข้อความ | `.ntg-typography-body-sm` สี `--ntg-color-text-general-disabled` |

## กติกา

- กล่องยืดเต็มกรอบที่วาง ถ้ากรอบแม่ไม่มีความสูง ให้ส่ง `aspect-ratio` เอง
- เลือก size ตามขนาดกล่อง กล่องสูงไม่ถึงราว 120 ใช้ md ลงไป
- มุมโค้งเป็นของกรอบที่วาง กล่องนี้ไม่มีมุมโค้งเอง
- เป็นของตกแต่ง ซ่อนจากโปรแกรมอ่านหน้าจอ (`aria-hidden`)
- ใช้กับ prototype หน้าเอกสาร และสถานะที่ภาพยังไม่มีเท่านั้น ไม่ใช่รูปสำรองตอนภาพโหลดไม่ขึ้นในหน้าจริง
