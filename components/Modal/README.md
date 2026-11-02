# Modal

กล่องโต้ตอบกลางจอ เปิดทับทั้งหน้าพร้อมฉากหลังมืดเบลอ ให้ผู้ใช้ดูหรือตัดสินใจเรื่องเดียวให้จบก่อนกลับไปทำต่อ ตรงกับ component set `modal` ในไฟล์ออกแบบหน้า **30 Modal** (node `11805:182`)

ที่มาของการตัดสินใจอยู่ที่ `docs/research/modal-component.md` สูตรขนาดอยู่ที่ `tokens/scale/modal.mjs`

- ใช้ `<dialog>` ของเบราว์เซอร์ เปิดด้วย `showModal()` จึงได้ top layer, หน้าข้างหลังกดไม่ได้ (inert), กักโฟกัส และ `aria-modal` มาเอง
- ควบคุมจากข้างนอก (controlled) ด้วย `open` กับ `onClose`
- ค่าระยะ สี และขนาด สร้างจากไฟล์ออกแบบเป็น `Modal.module.css` ห้ามแก้ไฟล์นั้นตรง ๆ แก้วิธีวาดที่ `Modal.base.css` แล้วรัน `npm run css:generate -- modal`

## Usage

```tsx
import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button';

const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>แก้ไข</Button>
<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="แก้ไขรายละเอียดข่าว"
  description="การเปลี่ยนแปลงจะมีผลทันทีหลังบันทึก"
  footer={
    <>
      <Button family="neutral" hierarchy="secondary" onClick={() => setOpen(false)}>ยกเลิก</Button>
      <Button onClick={save}>บันทึก</Button>
    </>
  }
>
  ฟอร์มสั้นหรือรายละเอียดของรายการเดียว
</Modal>
```

### กล่องยืนยัน (sm)

การกระทำที่ย้อนกลับไม่ได้ ให้โฟกัสแรกอยู่ที่ปุ่มยกเลิก กัน Enter ลบโดยไม่ตั้งใจ

```tsx
const cancelRef = useRef<HTMLButtonElement>(null);

<Modal open={open} onClose={close} size="sm" title="ลบข่าวนี้" description="ลบแล้วกู้คืนไม่ได้"
  initialFocusRef={cancelRef}
  footer={<>
    <Button ref={cancelRef} family="neutral" hierarchy="secondary" onClick={close}>ยกเลิก</Button>
    <Button family="error" onClick={remove}>ลบ</Button>
  </>}
/>
```

### โหมด bare (ไม่มีหัว)

ใช้เมื่อเนื้อหาเริ่มด้วยรูปเต็มความกว้าง ปุ่มปิดเป็นวงกลม (IconButton alpha ขนาด sm) ลอยมุมบนขวา ห่างจากขอบในของกล่อง 8 (`--ntg-size-space-s1-lg`) **ต้องส่ง `aria-label`** เพราะไม่มีหัวข้อให้เป็นชื่อของกล่อง

```tsx
<Modal open={open} onClose={close} header={false} aria-label="ภาพข่าวและรายละเอียด">
  <img src={cover} alt="" style={{ inlineSize: '100%', aspectRatio: '16 / 9' }} />
  ...
</Modal>
```

## Props

| Prop | ชนิด | ค่าเริ่มต้น | Figma | คำอธิบาย |
| --- | --- | --- | --- | --- |
| `open` | `boolean` | (บังคับ) | | เปิดหรือปิด |
| `onClose` | `() => void` | (บังคับ) | | เรียกเมื่อผู้ใช้ขอปิด (Esc คลิกฉากหลัง ปุ่มปิด) ต้องตั้ง `open` เป็น false เอง |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | แกน `size` | ความกว้างและระยะขอบ |
| `header` | `boolean` | `true` | แกน `header` | มีหัว (หัวข้อ คำอธิบาย ปุ่มปิด) `false` คือโหมด bare |
| `title` | `ReactNode` | | ชั้น title | หัวข้อ บังคับเมื่อมี header เป็นชื่อของกล่องผ่าน `aria-labelledby` |
| `description` | `ReactNode` | | `show-description` | ข้อความรองใต้หัวข้อ มีค่า = เปิด ผูกด้วย `aria-describedby` แสดงเฉพาะเมื่อมี header |
| `showClose` | `boolean` | `true` | `show-close` | แสดงปุ่มปิด |
| `closeLabel` | `string` | `'ปิด'` | | ชื่อปุ่มปิดสำหรับ screen reader |
| `footer` | `ReactNode` | | slot `footer` และ `show-footer` | ส่วนท้าย มักเป็นปุ่มการกระทำ ไม่ส่ง = ไม่มีส่วนท้าย |
| `children` | `ReactNode` | | slot `body` | เนื้อหา ส่วนเดียวที่เลื่อนได้ |
| `closeOnBackdrop` | `boolean` | `true` | | คลิกฉากหลังแล้วเรียก `onClose` |
| `initialFocusRef` | `RefObject<HTMLElement>` | | | ของที่ได้โฟกัสตอนเปิด ไม่ส่งก็ไปที่ของชิ้นแรกที่โฟกัสได้ |
| `aria-label` | `string` | | | ชื่อของกล่อง บังคับเมื่อ `header={false}` |
| `className` | `string` | | | ส่งต่อให้ `<dialog>` ห้ามใช้เปลี่ยนสี ระยะ หรือมุมโค้ง |

ชนิดข้อมูลบังคับว่าต้องมี `title` (เมื่อมี header) หรือ `aria-label` (เมื่อ `header={false}`) อย่างใดอย่างหนึ่ง และเตือนใน console นอก production ถ้าไม่มีชื่อ

## ขนาด 3 ขั้น

| ขนาด | กว้าง | คอลัมน์กริด v2022 | ระยะขอบ | ใช้เมื่อ |
| --- | --- | --- | --- | --- |
| `sm` | 392 (`--ntg-modal-width-sm`) | 4 | 20 (`--ntg-modal-padding-sm`) | ยืนยันหรือแจ้งเรื่องเดียว ปุ่มไม่เกินสองปุ่ม |
| `md` | 600 (`--ntg-modal-width-md`) | 6 | 24 (`--ntg-modal-padding-md`) | ค่าเริ่มต้น ฟอร์มสั้นหรือรายละเอียดของรายการเดียว |
| `lg` | 808 (`--ntg-modal-width-lg`) | 8 | 28 (`--ntg-modal-padding-lg`) | เนื้อหามีแท็บหรือรายการหลายชิ้น |

มุมโค้ง 12 ทุกขนาด (`--ntg-modal-radius-*`) เงา `--ntg-shadows-bottom-xl`

## ความสูงและการเลื่อน

- ความสูงหดตามเนื้อหา และชนเพดานที่ความสูงจอลบขอบบนล่าง (`100dvh` ลบ 32 ข้างละ บนจอแคบลบ 16 ข้างละ)
- หัวกับท้ายอยู่กับที่ เฉพาะ body เลื่อน (`overflow: auto`)
- ห้ามตั้งความสูงเอง

## จอแคบกว่า 768

ต่ำกว่า `--ntg-grid-breakpoint-tablet-v` กล่องกว้างเต็มจอลบขอบข้างละ 16 (`--ntg-size-space-s2-sm`) และระยะขอบเหลือ 16 ทุกขนาด ตัวแปร CSS ใช้ใน media query ไม่ได้ จึงเขียน `767.98px` แบบเดียวกับ Pagination

## ฉากหลัง

`::backdrop` สี `--ntg-modal-color-backdrop` (ดำโปร่ง 50 เปอร์เซ็นต์) เบลอ `--ntg-effect-background-blur-md` ค่าสีอ่านจาก `--md-backdrop` ที่สืบทอดจาก `<dialog>` และมีค่าสำรองเป็น token ตรง ๆ สำหรับเบราว์เซอร์ที่ `::backdrop` ยังไม่สืบทอดค่า

## การเคลื่อนไหว

- เปิด จางเข้าและขยายจาก 0.95 ใน `--ntg-motion-duration-default` (250ms) เส้นโค้ง `--ntg-motion-easing-enter`
- ปิด จางออกใน `--ntg-motion-duration-fast` (150ms) เส้นโค้ง `--ntg-motion-easing-exit`
- ขาออกใช้ `data-closing` กับ `@keyframes` แล้วรอ `animationend` ก่อนเรียก `close()` ไม่ใช้ `@starting-style` กับ `allow-discrete` เพราะ Firefox ยังเปลี่ยนค่า `overlay` ไม่ได้ ขาออกจะหายวับ
- `prefers-reduced-motion` ปิดภาพเคลื่อนไหวทั้งหมด และปิดทันที

## การเข้าถึง

- `aria-labelledby` ชี้ที่หัวข้อ (h2) เมื่อมี header ส่วนโหมด bare ใช้ `aria-label`
- `aria-describedby` ชี้ที่คำอธิบายเมื่อมี
- ตอนเปิด โฟกัสไปที่ `initialFocusRef` หรือของชิ้นแรกที่โฟกัสได้ (ปกติคือปุ่มปิด) ตอนปิดคืนไปที่ของที่โฟกัสอยู่ก่อนเปิด
- Esc จับที่เหตุการณ์ `cancel` แล้ว `preventDefault` เพื่อเล่นขาออก ถ้าเบราว์เซอร์ปิดกล่องเองโดยไม่ผ่านเรา (Chrome ยอมให้กด Esc ซ้ำแล้วปิดทันที) เหตุการณ์ `close` จะเรียก `onClose` ให้
- คลิกฉากหลังตรวจใน JS เป้าหมายต้องเป็น `<dialog>` เอง และจุดคลิกอยู่นอกกรอบกล่อง ทั้งตอนกดลงและตอนปล่อย กันการลากเลือกข้อความจากในกล่องแล้วปล่อยข้างนอก ไม่ใช้ `closedby`

## ล็อกการเลื่อนหน้า

ใช้วิธีที่ iOS ไม่หลุด คือตั้ง `body` เป็น `position: fixed` กับ `top` ติดลบเท่าระยะที่เลื่อนไว้ แล้วคืนตำแหน่งตอนปิด ชดเชยความกว้างแถบเลื่อนด้วย `padding-right` นับจำนวนกล่องที่เปิดอยู่ จึงซ้อนกันได้โดยไม่ปลดล็อกก่อนเวลา

## ข้อควรระวัง

- ซ้อนได้แค่ชั้นเดียว คือกล่องยืนยันขนาด sm หนึ่งใบบนกล่องที่เปิดอยู่ โค้ดไม่ได้กันไว้ เป็นกติกาการใช้งาน
- ไม่ส่ง `children` = ไม่มีชั้น body (เช่นกล่องยืนยันที่มีแค่หัวข้อกับคำอธิบาย) ไฟล์ออกแบบมี slot body เสมอ
- ห้ามซ่อนปุ่มปิด (`showClose={false}`) ถ้าส่วนท้ายไม่มีปุ่มที่ปิดกล่องได้
- ไม่ใช้กับข้อความแจ้งที่ไม่ต้องตอบ ใช้ Toast แทน
