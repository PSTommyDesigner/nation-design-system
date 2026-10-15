# Tag

ป้ายจัดหมวดที่ **ผู้ใช้แตะได้ กรองได้ เลือกได้ ปิดได้**

ตรงกับ component set ใน Figma หน้า **21 Tags** (121 ชุด 4,095 แบบ) และใช้ token จาก `tokens/scale/tag.mjs`

## เลือกระหว่าง Tag กับ Badge

ถามว่า **ใครเป็นคนเปลี่ยนค่า**

| คำตอบ | ใช้ |
|---|---|
| ผู้ใช้เป็นคนเปลี่ยน | `Tag` |
| ระบบเป็นคนเปลี่ยน | `Badge` |

## Props

| Prop | ชนิด | ค่าตั้งต้น | คำอธิบาย |
|---|---|---|---|
| `children` | ReactNode | บังคับ | ข้อความในแท็ก |
| `family` | 11 ตระกูลสี | `neutral` | brand neutral red green yellow cyan blue purple pink bamboo brown |
| `hierarchy` | `primary` `secondary` | `secondary` | ระดับความเด่น ไม่มีผลเมื่อ `shape="link"` |
| `size` | `xs` ถึง `xl` | `md` | ความสูง 16 20 24 28 32 เท่ากับ Badge |
| `shape` | `semi-rounded` `pill` `link` | `semi-rounded` | ทรง `link` คือข้อความล้วน ไม่มีพื้นไม่มีขอบ รองรับเฉพาะ `leading="none"` |
| `defaultGray` | boolean | `false` | เทาตอนอยู่เฉย แล้วขึ้นสีตอนชี้ |
| `leading` | `none` `number` `image` `checkbox` `indicator` | `none` | ชนิดของชิ้นประกอบ |
| `count` | number | ไม่มี | ใช้กับ `leading="number"` |
| `imageSrc` | string | ไม่มี | ใช้กับ `leading="image"` |
| `checked` | boolean | ไม่มี | ใช้กับ `leading="checkbox"` |
| `leftIcon` | ReactNode | | ไอคอนด้านซ้าย ตรงกับ `left-icon` กับ `left-icon-swap` ส่งไอคอนเข้ามาเท่ากับเปิด ไม่ส่งเท่ากับปิด |
| `closable` | boolean | `false` | แสดงปุ่มปิด ค่าตั้งต้นปิดตรงกับไฟล์ออกแบบ ตรงกับ `right-icon` |
| `closeIcon` | ReactNode | กากบาท | ไอคอนของปุ่มปิด ตรงกับ `right-icon-swap` |
| `iconOnly` | boolean | `false` | โหมดไอคอนล้วน ตรงกับชุด `icon-tag` `circular-icon-tag` `link-icon-tag` |
| `icon` | ReactNode | กากบาท | ไอคอนของโหมดไอคอนล้วน ตรงกับ `swap-icon` |
| `label` | string | | คำอ่านของโหมดไอคอนล้วน **จำเป็น** เพราะโหมดนี้ไม่มีข้อความบนจอ |
| `onClose` | function | ไม่มี | เรียกเมื่อกดปุ่มปิด |
| `onSelect` | function | ไม่มี | ถ้าส่งมา แท็กจะรับโฟกัสและกดด้วยแป้นพิมพ์ได้ |
| `disabled` | boolean | `false` | ปิดใช้งาน |

## ตัวอย่าง

```tsx
<Tag family="blue">การเมือง</Tag>
<Tag family="brand" hierarchy="primary" closable onClose={remove}>กรุงเทพ</Tag>
<Tag family="green" leading="number" count={12}>ข่าวใหม่</Tag>
<Tag family="neutral" leading="checkbox" checked onSelect={toggle}>เลือกไว้</Tag>
```

## ข้อควรระวัง

1. **แท็กมี 3 ระดับ ส่วนป้ายมี 4 ระดับ** `secondary` ของแท็กคือมีขอบ ส่วนของป้ายคือพื้นอ่อน เพราะแท็กไม่มีสไตล์พื้นอ่อน
2. **แท็กตัวเลขและแท็กรูปให้ของข้างในชนขอบ** ระยะขอบบนล่างของกล่องจึงใช้ `{ทรง}-tag/{ชนิด}/padding/no` เท่ากับ 0 ตัวที่คุมความสูงคือ `title-padding` ของกรอบข้อความ ส่วนทรง `link` เป็น 0 ทุกด้านเพราะไม่มีพื้นและไม่มีขอบ
3. **ปุ่มปิดปิดอยู่เป็นค่าตั้งต้น** ตรงกับไฟล์ออกแบบ ต้องส่ง `closable` เองเมื่อต้องการ
4. **ทรง `circular` ใช้ได้เฉพาะโหมดไอคอนล้วน** เพราะไฟล์ออกแบบมีแต่ชุด `circular-icon-tag` ส่งทรงนี้มาจะเข้าโหมดไอคอนล้วนให้เอง ทรงนี้กว้างเท่าสูงจริง ต่างจาก `pill` ที่เป็นแคปซูล
5. **โหมดไอคอนล้วนต้องส่ง `label` เสมอ** เพราะไม่มีข้อความบนจอ ถ้าไม่ส่งผู้ใช้โปรแกรมอ่านหน้าจอจะไม่รู้ว่าแท็กนี้คืออะไร
6. **ชนิด `indicator` ไม่มีไอคอนซ้าย** เพราะช่องซ้ายเป็นของจุดสถานะแล้ว ตรงกับที่ไฟล์ออกแบบยกเว้นชุด `indicator-tag` กับ `pill-indicator-tag` ไว้
4. **ความสูงเท่ากับ Badge ทุกขนาด** วางคู่กันในแถวเดียวได้ไม่เหลื่อม
5. **ความสูงแท็กเชื่อมกับหน้า 13 Input** ถ้าเปลี่ยนความสูงต้องไปตรวจ `tokens/scale/input.mjs` ด้วย

## ⚠️ ชื่อตัวแปรเปลี่ยนทั้งชุด (2026-09-18)

ตัวแปรระยะของแท็ก **แยกตามทรงและตามชนิดหมดแล้ว** ไม่มีชื่อกลางที่ใช้ได้ทุกทรง

```
--ntg-{ทรง}-tag-{ชนิด}-{มิติ}-{ขนาด}
  ทรง   semi-rounded · pill · link
  ชนิด  เว้นว่างคือชุดฐาน · number-tag · image-tag · checkbox-tag · indicator-tag
```

ชื่อชุดเก่าอย่าง `--ntg-space-tag-padding-l-md` ถูกลบไปแล้ว (ชื่อปัจจุบันคือ `--ntg-semi-rounded-tag-padding-left-md` ตามไฟล์ออกแบบ) ถ้าเขียนชื่อที่ไม่มีอยู่จริง `var()`
จะคืนค่าว่างแล้ว property ตกไปใช้ค่า default ของเบราว์เซอร์เงียบ ๆ ไม่มี error

**ขั้นสีของแต่ละตระกูลไม่เท่ากัน** พื้นทึบใช้ขั้น 600 ที่ red green yellow purple
แต่ใช้ 400 ที่ cyan blue bamboo pink brown ส่วนขั้นตอนชี้ยิ่งไม่เป็นสูตร
blue กับ brown ใช้ 500 ส่วน cyan bamboo pink ใช้ 600 ห้ามเขียนเป็นสูตร
ให้อ่านจากไฟล์ออกแบบทีละตระกูลเสมอ
