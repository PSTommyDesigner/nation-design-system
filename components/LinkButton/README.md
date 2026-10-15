# LinkButton

ปุ่มแบบลิงก์ ไม่มีพื้นหลังและเส้นขอบ · ตรงกับ component set `link-button` และ `link-icon-button` ในหน้า Figma **12 Buttons**

## ใช้งาน
```tsx
import { LinkButton } from '@/components/LinkButton';

<LinkButton family="brand" rightIcon="arrow-outward">อ่านต่อ</LinkButton>
<LinkButton href="/news" family="neutral" leftIcon="arrow-left">ย้อนกลับ</LinkButton>
<LinkButton leftIcon="close" label="ปิด" />
```

ถ้าส่ง `href` จะ render เป็น `<a>` ให้อัตโนมัติ ไม่ส่งก็เป็น `<button>`

## Props
| Prop | ชนิด | ค่าเริ่มต้น | คำอธิบาย |
|---|---|---|---|
| `family` | `brand` \| `neutral` \| `error` | `brand` | ตระกูลสี · `neutral` ผูกกับ token `button/color/link/gray/*` |
| `defaultGray` | `boolean` | `false` | โหมดสีเทา ใช้ได้เฉพาะ `brand` และ `error` |
| `size` | `xs` \| `sm` \| `md` \| `lg` \| `xl` | `md` | ขนาด ใช้ token `link-button/size/*` |
| `leftIcon` / `rightIcon` | `IconName` | | ไอคอนประกอบ |
| `label` | `string` | | ใช้เมื่อเป็นไอคอนล้วน (ไม่มี children) เพื่อการเข้าถึง |
| `href` | `string` | | ถ้ามี จะ render เป็น `<a>` |

## หลักการ
- ไม่มีข้อความ (ไม่ส่ง children) = โหมดไอคอนล้วน ใช้ระยะจาก token ชุด `link-icon-button/icon-only-padding/*`
- ตระกูลสีของปุ่มลิงก์ไม่มีชั้น hierarchy ต่างจากปุ่มข้อความ
- ตระกูลมี 3 ชุด (Brand · Neutral · Error) ส่วนสีเทาเป็นโหมด `defaultGray` ของ Brand และ Error ไม่ใช่ตระกูลแยก
