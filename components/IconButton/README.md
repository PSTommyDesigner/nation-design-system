# IconButton

ปุ่มไอคอนล้วน · ตรงกับ component set `semi-rounded-icon-button` และ `circular-icon-button` ในหน้า Figma **12 Buttons**

## ใช้งาน
```tsx
import { IconButton } from '@/components/IconButton';

<IconButton icon="more-vert" label="ตัวเลือกเพิ่มเติม" family="neutral" hierarchy="tertiary" />
<IconButton icon="close" label="ปิด" shape="circular" family="alpha" />
```

## Props
| Prop | ชนิด | ค่าเริ่มต้น | คำอธิบาย |
|---|---|---|---|
| `icon` | `IconName` | (บังคับ) | ไอคอนจากชุด Nation UI Icons |
| `label` | `string` | (บังคับ) | คำอธิบายสำหรับ screen reader · ใช้เป็น `aria-label` และ `title` |
| `family` | `brand` \| `neutral` \| `error` \| `alpha` | `brand` | ตระกูลสี |
| `defaultGray` | `boolean` | `false` | โหมดสีเทา ใช้ได้เฉพาะ `brand` และ `error` |
| `hierarchy` | `primary` \| `secondary` \| `tertiary` | `primary` | ลำดับความสำคัญ |
| `size` | `xs` \| `sm` \| `md` \| `lg` \| `xl` | `md` | ขนาด ใช้ token `icon-button/size/*` |
| `shape` | `semi-rounded` \| `circular` | `semi-rounded` | ทรงปุ่ม · `circular` ใช้ `icon-button/radius/full` |

## หลักการ
- ขนาดและระยะใช้ token ชุด `icon-button/*` (ต่างจากปุ่มข้อความ) ส่วนสีใช้ `button/color/*` ร่วมกันตามที่ Figma ผูกไว้
- `label` เป็น prop บังคับ เพราะปุ่มไม่มีข้อความให้ screen reader อ่าน
