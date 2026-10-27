# Button

ปุ่มข้อความของ Nation Design System · ตรงกับ component set `semi-rounded-button` และ `pill-button` ในหน้า Figma **12 Buttons**

## ใช้งาน
```tsx
import { Button } from '@/components/Button';

<Button family="brand" hierarchy="primary" size="md">บันทึก</Button>
<Button family="error" hierarchy="secondary" leftIcon="delete">ลบรายการ</Button>
<Button family="neutral" hierarchy="tertiary" shape="pill" rightIcon="chevron-down">ตัวเลือก</Button>
<Button family="brand" defaultGray>โหมดสีเทา</Button>
```

## Props
| Prop | ชนิด | ค่าเริ่มต้น | คำอธิบาย |
|---|---|---|---|
| `family` | `brand` \| `neutral` \| `error` \| `alpha` | `brand` | ตระกูลสี ตรงกับเอกสาร 4 ชุดในหน้า Figma 12 Buttons |
| `defaultGray` | `boolean` | `false` | โหมดสีเทา (variant `Default Gray` ใน Figma) ใช้ได้เฉพาะ `brand` และ `error` |
| `hierarchy` | `primary` \| `secondary` \| `tertiary` | `primary` | ลำดับความสำคัญ (ตระกูล `alpha` ไม่ใช้) |
| `size` | `xs` \| `sm` \| `md` \| `lg` \| `xl` | `md` | ขนาด ใช้ token `button/size/*` |
| `shape` | `semi-rounded` \| `pill` | `semi-rounded` | ทรงปุ่ม · `pill` ใช้ `button/radius/full` |
| `leftIcon` / `rightIcon` | `IconName` | | ไอคอนจากชุด Nation UI Icons |
| `fullWidth` | `boolean` | `false` | ยืดเต็มความกว้างกล่องแม่ |

รับ prop ของ `<button>` ทั้งหมด (`onClick`, `disabled`, `form` …) และ forward ref ไปที่ element จริง

## หลักการ
- ทุกค่าสี ระยะ มุมโค้ง มาจาก CSS variable ของ design token ไม่มีค่า hard-code
- สถานะ hover / focus / disabled จัดการด้วย CSS pseudo-class ไม่ต้องส่ง prop

ดูตัวอย่างครบทุกแบบใน Storybook ที่ [Button.stories.tsx](Button.stories.tsx)
