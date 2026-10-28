---
title: "Modal component research"
description: "วิจัย component กล่องโต้ตอบกลางจอ Modal ของ NTGDS เทียบ Material 3, Carbon, Atlassian, Polaris, Spectrum, Fluent 2, Primer, Untitled UI, Radix และ Ark UI กับ Apple HIG และ GOV.UK เรื่องขนาด ช่องใส่เนื้อหา ปุ่มปิด ฉากหลัง ระยะห่าง ความสูงสูงสุดกับการเลื่อน มือถือ การซ้อนกล่อง การเข้าถึงตาม WAI-ARIA APG ข้อควรระวังของ dialog แบบ native และแนวทางเนื้อหา"
research_date: "2026-10-28"
scope: "Material 3 (material-web), IBM Carbon, Atlassian Design System, Shopify Polaris, Adobe Spectrum (React Spectrum และ spectrum-css), Microsoft Fluent 2, GitHub Primer, Untitled UI React, Radix Primitives, Ark UI, Apple HIG, GOV.UK Design System backlog, W3C WAI-ARIA APG, MDN, Chrome for Developers, Deque, Scott O'Hara, Nielsen Norman Group, Google Search Central, caniuse, WebKit Bugzilla"
status: "draft รอตัดสิน"
owner: "ux-researcher"
---

# Research Modal สำหรับ NTGDS

**วันที่วิจัย:** 2026-10-28
**โจทย์:** หาข้อมูลเพื่อออกแบบ component กล่องโต้ตอบกลางจอตัวแรกของระบบ ชื่อ `Modal` ตอบ 4 คำถาม คือ เจ้าใหญ่ทำ modal อย่างไร, การเข้าถึงกับ dialog แบบ native, เมื่อไหร่ควรใช้หรือไม่ควรใช้ และข้อเสนอค่าสำหรับ NTGDS

**ป้ายแหล่ง:** `[ทางการ]` เอกสารหรือไฟล์ต้นทางขององค์กรเอง `[มาตรฐาน]` W3C หรือ WHATWG `[แหล่งรอง]` ผู้เชี่ยวชาญหรือบริษัทภายนอก `[คำนวณ]` ผู้วิจัยคำนวณเอง `[ตีความ]` ความเห็นของผู้วิจัย ไม่ใช่ข้อเท็จจริง `[ของเรา]` ค่าที่อ่านจากไฟล์ในโปรเจกต์นี้ `[ยืนยันไม่ได้]` มาจากความรู้เดิมของผู้วิจัย ดึงหน้าต้นทางไม่ได้ในรอบนี้

> **สิ่งที่ตัดสินแล้ว ไม่เปิดใหม่ในเอกสารนี้** ชื่อ `Modal` เป็นกล่องกลางจอเท่านั้น (Drawer ยังไม่ทำ), ความกว้างตามกริด v2022 (คอลัมน์ 80 ร่อง 24) sm 392 md 600 lg 808, ความสูงพอดีเนื้อหาจนถึงความสูงจอหักขอบแล้วให้ส่วนเนื้อหาเลื่อน, ช่อง header (ชื่อ คำอธิบาย ปุ่มปิด) body footer, โหมด bare ที่ซ่อน header ให้เนื้อหาชนขอบพร้อมปุ่มปิดวงกลมลอยมุมบนขวา, ปุ่มปิดเป็น IconButton semi-rounded neutral tertiary ซ่อนได้, ฉากหลังเป็น token ใหม่ `modal/color/backdrop` ดำ 50 เปอร์เซ็นต์กับ background-blur md, เงา `shadows-bottom-xl`, ชั้น `--ntg-layer-overlay` (300) โดย toast อยู่เหนือที่ 400, โค้ดใช้ `<dialog>` กับ `showModal()` พร้อมล็อกการเลื่อน คืนโฟกัส `aria-labelledby` `aria-describedby` คลิกฉากหลังปิดได้ และ Esc ปิดได้
>
> **ของที่มีอยู่แล้วในเครื่อง** `docs/research/toast-banner-component.md` และ `effect-elevation.md` แตะเรื่องชั้นวางซ้อนกับเงาแล้ว เอกสารนี้ไม่ทวนซ้ำ อ่านค่าจริงจาก `tokens/output/css/variables.css` ในข้อ 2.2
>
> **ข้อจำกัดของแหล่ง** หน้า m3.material.io กับ developer.apple.com เรนเดอร์ด้วยสคริปต์ ดึงเนื้อหาไม่ได้ ค่าของ Material 3 จึงมาจากไฟล์ต้นทาง `material-web` ส่วน Apple HIG ใช้ได้เฉพาะหลักการที่ผู้วิจัยรู้มาก่อนและติดป้าย `[ยืนยันไม่ได้]` หน้าของ Polaris ตัด connection ทุกครั้ง และ GOV.UK ไม่มี component modal (มีแต่ข้อถกเถียงใน backlog ซึ่งมีประโยชน์กว่า) ข้อ 1 จึงใช้ Primer แทน GOV.UK ตามที่บรีฟเปิดทางไว้

---

## 1. สรุปคำตอบ 4 ข้อ (อ่านหน้าเดียวจบ)

| # | คำถาม | คำตอบสั้น |
|---|---|---|
| 1 | เจ้าใหญ่ทำ modal อย่างไร | **ขนาดแบ่ง 3 ถึง 4 ขั้น ช่วงกลางอยู่ราว 400 ถึง 640** Spectrum 400, 480, 640 ([8]), Primer 296, 320, 480, 640 ([10]), Material 3 กว้าง 280 ถึง 560 ([2]) ส่วน Carbon คิดเป็นเปอร์เซ็นต์ของจอ ([3]) **ทุกเจ้าตรึง header กับ footer แล้วให้ body เลื่อน** (Carbon [4], Atlassian [5], Fluent [7], Primer [11]) **ปุ่มปิดอยู่มุมบนขวาทุกเจ้า** **ปุ่มใน footer ชิดขวา ปุ่มหลักอยู่ขวาสุด** (Atlassian [6], Primer [11]) **การซ้อนกล่อง** Atlassian และ Fluent ห้าม ([6][7]) Primer ยอมได้ 2 ชั้น ([11]) **มือถือ** Primer กับ Untitled UI เปลี่ยนเป็นแผ่นชิดล่าง ([11][13]) Carbon ให้เต็มความกว้าง ([3]) |
| 2 | การเข้าถึงกับ `<dialog>` | `showModal()` ให้ของฟรี 4 อย่าง คือ ชั้นบนสุด (top layer), ทำส่วนอื่นของหน้าเป็น inert, `aria-modal` โดยนัย และ Esc ปิด ([16]) **ที่ต้องทำเอง** คือ ล็อกการเลื่อน (iOS Safari ต้องใช้วิธี body fixed [21][22]), คลิกฉากหลังปิด (`closedby="any"` ยังไม่มีใน Safari [18][19]), คืนโฟกัสให้ปุ่มที่เปิด และตั้งโฟกัสแรกให้ถูกตามชนิดเนื้อหา ([15]) **ความเสี่ยงใหญ่สุดกับสิ่งที่ตัดสินแล้ว** คือ dialog ใน top layer ไม่สนใจ `z-index` toast ที่ `z-index: 400` จะถูกฉากหลังทับ ดู 4.4 |
| 3 | เมื่อไหร่ใช้ เมื่อไหร่ไม่ใช้ | ใช้เมื่อต้องได้คำตอบก่อนไปต่อ ยืนยันการกระทำที่ย้อนไม่ได้ หรืองานสั้นงานเดียวที่ไม่ต้องดูข้อมูลนอกกล่อง ([4][6][23]) **ไม่ใช้** กับข้อความไม่สำคัญ (ใช้ toast หรือ banner), งานหลายขั้นหรือตารางใหญ่, เนื้อหาที่ต้องแชร์ลิงก์ได้ ([4][6][11]) และ **หน้าข่าวต้องระวังป๊อปอัปขายของ** เพราะ Google ระบุว่ากล่องที่บังเนื้อหาอาจทำให้ผลการค้นหาแย่ลง ([24]) |
| 4 | ข้อเสนอค่าสำหรับ NTGDS | padding sm 20, md และ lg 24, มือถือ 16, ช่องระหว่าง header กับ body 16, body กับ footer 24, ชื่อใช้ `title-lg` (20/30) คำอธิบาย `body-sm`, **ไม่มีเส้นคั่นโดยปริยาย** แสดงเส้นคั่นเมื่อ body เลื่อนได้เท่านั้น, ขาเข้า 250 ms จาง+ขยายจาก 0.95 ขาออก 150 ms รายละเอียดข้อ 7 |

---

## 2. บริบทของเรา

### 2.1 ความกว้างตามกริด `[คำนวณ]`

| ขนาด | คอลัมน์ | สูตร | กว้าง | เทียบเจ้าอื่นที่ใกล้ที่สุด |
|---|---|---|---|---|
| sm | 4 | 4 x 80 + 3 x 24 | 392 | Spectrum S 400 ([8]) |
| md | 6 | 6 x 80 + 5 x 24 | 600 | Material 3 สูงสุด 560 ([2]), Spectrum L 640 ([8]) |
| lg | 8 | 8 x 80 + 7 x 24 | 808 | ใหญ่กว่าขั้นใหญ่สุดของ Spectrum และ Primer (640) |

**ข้อสังเกต** `[ตีความ]` lg 808 ใหญ่กว่าเพดานของหลายเจ้า Primer เตือนว่าขนาด xlarge 640 อาจเป็นสัญญาณว่า "content would be more appropriate for a new page" ([10]) ใช้ได้กับเคสข่าวมีภาพ 16:9 แต่ควรเขียนใน doc ว่า lg ไม่ใช่ที่สำหรับฟอร์มยาว

### 2.2 ค่าในโปรเจกต์ที่เกี่ยวข้อง `[ของเรา]`

- **ชั้นวางซ้อน** `--ntg-layer-overlay: 300` คำอธิบายใน token เขียนว่าใช้กับ "กล่องโต้ตอบและฉากหลังมืด" และ `--ntg-layer-notification: 400` เขียนว่าต้องอ่านออก "แม้ขณะที่กล่องโต้ตอบเปิดอยู่"
- **Toast** ใน `components/Toast/Toast.module.css` ใช้ `z-index: var(--ts-layer, var(--ntg-layer-notification))` เป็น `position: fixed` ธรรมดา ไม่ได้อยู่ใน top layer
- **เงา** `--ntg-shadows-bottom-xl: 0px 20px 24px -4px` สีดำ 10 เปอร์เซ็นต์ คำอธิบายใน token ระบุไว้แล้วว่าใช้กับโมดัลและไดอะล็อก
- **ความเบลอ** `--ntg-effect-background-blur-md: 16px` (xs 4, sm 8, lg 24, xl 40)
- **สีฉากหลังที่มีอยู่** `--ntg-color-background-system-overlay` ชี้ gray-light-950 (`#0c111d`) แบบทึบ และในโหมดมืดชี้ gray-dark-800 ส่วนสีดำโปร่งมี primitive `color/base/black-50` (`rgba(0, 0, 0, 0.5)`) อยู่แล้ว token `modal/color/backdrop` ชี้ไปที่ตัวนี้ได้เลย ไม่ต้องสร้าง primitive ใหม่
- **การเคลื่อนไหว** `--ntg-motion-duration-fast` 150ms (ขาออกของของลอย), `-default` 250ms (ขาเข้าของของลอย), `-slow` 400ms (แผงที่เลื่อนจากขอบจอ), `--ntg-motion-easing-enter` และ `-exit` มีครบแล้ว
- **ตัวอักษร** `title-lg` 20/30 น้ำหนัก 500, `title-md` 18/28, `title-sm` 16/26, `body-md` 16/26, `body-sm` 14/24 (`section-heading-sm` กับ `-xs` มีขนาดเท่า `title-lg` กับ `title-md`)
- **ระยะห่าง** `s1-sm` 4, `s1-lg` 8, `s2-xs` 12, `s2-sm` 16, `s2-md` 20, `s2-lg` 24, `s3-xs` 32
- **มุมโค้ง** ยังไม่มี token มุมของ modal ตัวที่ใกล้คือ `--ntg-info-card-radius-*` 12 และ `--ntg-card-radius-*` 4

---

## 3. คำถามข้อ 1 เจ้าใหญ่ทำ modal อย่างไร

### 3.1 ตารางเทียบ

| เจ้า | ขนาด | ช่อง | ปุ่มปิด | ฉากหลัง | การเลื่อน | มือถือ | ซ้อนกล่อง |
|---|---|---|---|---|---|---|---|
| Material 3 | กว้าง 280 ถึง 560 สูงไม่เกิน 560 หรือจอลบ 48 ([2]) | headline, content, actions ([1]) | ไม่มีในกล่องพื้นฐาน ปิดด้วยปุ่ม action | scrim ทึบ 32 เปอร์เซ็นต์ ([2]) | content เลื่อน มีระยะเพิ่มเมื่อเลื่อนได้ ([2]) | มีแบบเต็มจอแยก `[ยืนยันไม่ได้]` | ไม่พบ |
| Carbon | xs sm md lg เป็นเปอร์เซ็นต์ เช่น md 48 เปอร์เซ็นต์ที่ 1584 สูงสุด 84 เปอร์เซ็นต์ ([3]) | header (label+title), body, footer เต็มขอบ ([3][4]) | มุมบนขวา 48 x 48 ไอคอน 16 ([3][4]) | token `$overlay` ไม่บอกค่าในหน้า ([3]) | body เลื่อน มีเงาจางท้าย ห้ามเลื่อนแนวนอน ([4]) | 100 เปอร์เซ็นต์ เต็มจอหรือชิดล่าง ([3]) | ไม่พบ |
| Atlassian | small medium large x-large ไม่บอกพิกเซลในหน้า ([5]) | header, body, footer ([5]) | ต้องมีใน header เสมอ เว้นแต่ทีม a11y อนุมัติ ([6]) | blanket ([6]) | body เลื่อน header footer ตรึง ([5]) | ไม่พบ | **ห้าม** "Use one at a time" ([6]) |
| Spectrum | S 400, M 480, L 640 ต่ำสุด 288 ([8]) | hero image, heading, header, divider, content, footer, buttonGroup ([9]) | มุมบนขวาเมื่อ `isDismissable` แทนกลุ่มปุ่ม ([9]) | ไม่พบค่า | ไม่พบค่า | ขนาดถูกล็อกตามจอ ใช้ tray ได้ ([9]) | ไม่พบ |
| Fluent 2 | ไม่บอกในหน้า ([7]) | header (title+dismiss), body, footer ไม่เกิน 3 ปุ่ม ([7]) | มุมบนขวาเมื่อไม่มีปุ่ม Cancel ([7]) | ทำให้หน้าหลังมืดหรือบัง ([7]) | header footer ตรึง body เลื่อน ([7]) | ไม่พบ | **ห้าม** ([7]) |
| Primer | 296, 320, 480, 640 ([10]) | header (title, คำอธิบาย, ปุ่มปิด), subheader, body, footer ([11]) | ต้องมี ห้ามซ่อน ห่างขอบ 8 ([11]) | ทำให้มืด คลิกแล้วปิด ยกเว้นฟอร์มที่แก้ค้าง ([11]) | body เลื่อน ต้องมีเส้นคั่นเหนือ footer เมื่อเลื่อนได้ ([11]) | แผ่นชิดล่าง หรือเต็มจอถ้ามีช่องกรอก ([11]) | ได้ 2 ชั้น ([11]) |
| Untitled UI | ไม่กำหนดความกว้างใน overlay ([13]) | ประกอบเอง | ใส่ `CloseButton` เอง ([12]) | สี overlay 70 เปอร์เซ็นต์ เบลอ 6 ([13]) | สูงไม่เกินจอลบขอบ ([13]) | ชิดล่างเมื่อจอเล็กกว่า sm ([12]) | ไม่พบ |
| Radix | ไม่กำหนดหน้าตา | Overlay, Content, Title, Description, Close ([14]) | ประกอบเอง | ประกอบเอง | ไม่พบในหน้า | ไม่พบ | ยอมให้ซ้อน ([14]) |
| Ark UI | ไม่กำหนดหน้าตา | Backdrop, Positioner, Content, Title, Description, CloseTrigger ([25]) | ประกอบเอง | ประกอบเอง | `preventScroll` เปิดโดยปริยาย ([25]) | ไม่พบ | รองรับ มี `--nested-layer-count` ([25]) |
| Apple HIG | sheet ของ iPad เป็นการ์ดกลางจอ `[ยืนยันไม่ได้]` | alert สั้น, sheet ยาวกว่า | Cancel ซ้ายบน Done ขวาบน `[ยืนยันไม่ได้]` | ทำให้มืด | ไม่พบ | sheet ปัดลงเพื่อปิด | ไม่แนะนำ sheet ซ้อน sheet `[ยืนยันไม่ได้]` |
| GOV.UK | **ไม่มี component** ([26]) | | | | | | |

### 3.2 ระยะภายในที่วัดได้

- **Material 3** `[ทางการ]` headline 24 24 0, content 24, actions 16 24 24 ช่องระหว่างปุ่ม 8 ([2])
- **Carbon** `[ทางการ]` header บนและซ้าย 16 เว้นใต้ header 16, label ห่าง title 4, body ขวาเว้น 20 เปอร์เซ็นต์เพื่อคุมความยาวบรรทัด และเว้นเหนือ footer 48 ([3])
- **Primer** `[ทางการ]` ข้อความต้องอยู่ในพื้นที่ปลอดภัย 16 จากขอบ ปุ่มปิดห่างขอบ 8 ([11])
- **Fluent 2** `[ทางการ]` ถ้าไม่มี footer ให้เติม padding ล่าง 24 ([7])
- **Spectrum** `[ทางการ]` เส้นคั่นห่างหัวข้อด้วย `spacing-200` และห่างเนื้อหาด้วย `spacing-300` ส่วน footer เว้นบน `spacing-600` ([8])
- **Untitled UI** `[ทางการ]` ขอบรอบกล่องกับจอ แนวนอน 16 บนมือถือ 32 บนจอใหญ่ แนวตั้ง 16 ถึง `clamp(16px, 8vh, 64px)` บนมือถือ และ 32 บนจอใหญ่ ([13])

**ข้อสรุป** `[ตีความ]` padding ของกล่องจับกลุ่มอยู่สองค่าย คือ 16 (Carbon, Primer) กับ 24 (Material 3, Fluent) ระบบที่ตัวหนังสือใหญ่และต้องการความโปร่งเลือก 24

### 3.3 ปุ่มปิด เส้นคั่น และ footer

- ทุกเจ้าที่มีปุ่มปิดวางมุมบนขวา Fluent ยอมให้ไม่มีปุ่มปิดเมื่อ footer มีปุ่ม Cancel ([7]) แต่ Atlassian กับ Primer บังคับให้มีเสมอ ([6][11])
- **เส้นคั่น** Spectrum ใส่ Divider ใต้หัวข้อเป็นตัวเลือก ([9]) Carbon ใส่เส้นขอบบน footer ([3]) Primer บังคับเส้นเหนือ footer เฉพาะเมื่อ body เลื่อน ([11]) Material 3 ไม่มีเส้น แต่เพิ่ม padding เมื่อเลื่อนได้ ([2])
- **ลำดับปุ่ม** Atlassian ชิดขวา ปุ่มหลักอยู่ขวาของปุ่มรอง และชื่อปุ่มหลักควรตรงกับหัวข้อ เช่น "Select a template" คู่กับ "Select" ([6]) Carbon แบ่งปุ่มครึ่งความกว้างเต็มขอบ เป็นสไตล์เฉพาะของ Carbon ([4])

### 3.4 การซ้อนกล่อง

- **ห้าม** Atlassian ([6]) Fluent ([7])
- **ยอมจำกัด** Primer ไม่เกิน 2 ชั้น Esc ปิดเฉพาะชั้นบนสุด และคืนโฟกัสให้ปุ่มในกล่องแม่ ([11])
- **รองรับทางเทคนิค** Radix ([14]) Ark UI ([25]) และ `<dialog>` เอง เมื่อมีหลายกล่อง Esc ปิดเฉพาะกล่องที่เปิดล่าสุด ([16])

---

## 4. คำถามข้อ 2 การเข้าถึงกับ `<dialog>`

### 4.1 รูปแบบตาม WAI-ARIA APG `[มาตรฐาน]`

- Tab กับ Shift+Tab วนอยู่ในกล่อง Esc ปิด ([15])
- **โฟกัสแรก** โดยปริยายคือของที่โฟกัสได้ตัวแรก แต่ถ้าเนื้อหามีรายการ ตาราง หรือหลายย่อหน้า ให้โฟกัสองค์ประกอบนิ่งที่หัวเนื้อหาด้วย `tabindex="-1"`, ถ้าเนื้อหายาวให้โฟกัสหัวข้อเพื่อไม่ให้ต้นเนื้อหาเลื่อนหาย และถ้าเป็นการกระทำที่ย้อนไม่ได้ให้โฟกัสปุ่มที่ทำลายน้อยที่สุด ([15])
- **คืนโฟกัส** ไปที่ปุ่มที่เปิด ถ้าปุ่มนั้นหายไปแล้วให้ไปที่ของที่เหมาะกับขั้นต่อไป ([15])
- ต้องมีชื่อด้วย `aria-labelledby` หรือ `aria-label` ส่วน **`aria-describedby` ใช้เมื่อคำอธิบายอ่านต่อกันเป็นประโยคเดียวรู้เรื่อง ถ้าเนื้อหามีรายการ ตาราง หรือหลายย่อหน้า ให้ละไว้** ([15])

### 4.2 สิ่งที่ `showModal()` ทำให้ และไม่ทำให้ `[ทางการ]`

| ทำให้ ([16]) | ต้องทำเอง |
|---|---|
| ย้ายเข้า top layer เหนือทุกอย่าง | ล็อกการเลื่อนหน้าหลัง (MDN ไม่ได้กล่าวถึงเลย) |
| ทำส่วนอื่นของหน้าเป็น inert | คลิกฉากหลังเพื่อปิดใน Safari |
| `aria-modal="true"` โดยนัย | คืนโฟกัสให้ปุ่มที่เปิดอย่างแน่นอน (ดู 4.3) |
| Esc ส่งเหตุการณ์ `cancel` แล้วปิด | ตั้งโฟกัสแรกตามชนิดเนื้อหาด้วย `autofocus` |
| `::backdrop` ให้แต่งสีและเบลอได้ | แอนิเมชันขาออก (ต้องใช้ `overlay` กับ `allow-discrete` [20]) |

MDN แนะนำให้ใส่ `autofocus` บนของที่ผู้ใช้ควรใช้ก่อน ถ้าไม่ชัดให้ใส่ที่ปุ่มปิด และ **ห้ามใส่ `tabindex` บน `<dialog>`** ([16])

### 4.3 ข้อควรระวังที่พบ

1. **`closedby` ยังใช้ไม่ได้ทุกที่** Chrome รองรับตั้งแต่ 134 ([19]) caniuse ระบุว่า Safari บน iOS ถึง 26.4 ยังไม่รองรับ และ bug ของ WebKit ยังเปิดอยู่ ([18]) Firefox เปิดใน Nightly 140 ยังยืนยันรุ่นเสถียรไม่ได้ `[แหล่งรอง]` **ต้องเขียนคลิกฉากหลังด้วย JavaScript** (ตรวจว่าจุดที่คลิกอยู่นอกกรอบของกล่อง) แล้วค่อยใช้ `closedby` เมื่อทุกเบราว์เซอร์รองรับ
2. **ล็อกการเลื่อนบน iOS Safari** `overflow: hidden` บน body ไม่ได้ผลเต็มที่ ลากนิ้วแล้วหน้าหลังยังเด้งได้ และ bug ของ WebKit ยังเปิดอยู่ ([21]) วิธีที่หลายแหล่งแนะนำคือ ตั้ง body เป็น `position: fixed` พร้อมจำตำแหน่งเลื่อนแล้วคืนค่าตอนปิด บวก `overscroll-behavior: contain` ที่ body ของกล่อง ([22]) `[แหล่งรอง]` และต้องชดเชยความกว้างของแถบเลื่อนที่หายไปไม่ให้หน้าขยับ (`scrollbar-gutter: stable` หรือ padding-right)
3. **`::backdrop` กับ CSS variable** MDN เขียนว่า `::backdrop` "neither inherits from nor is inherited by any other elements" ([17]) แต่ CSSWG แก้ spec ให้รับค่าจากองค์ประกอบต้นทาง และ Chrome เปลี่ยนตามใน 122 ([27]) รุ่นของ Safari กับ Firefox ยืนยันไม่ได้ **ทางปลอดภัยคือประกาศค่า token บน `::backdrop` ตรง ๆ** เช่น `dialog::backdrop { background: var(--ntg-modal-color-backdrop) }` ซึ่งอ้าง `:root` และเช็กในเบราว์เซอร์จริง
4. **ความสูงบน iOS** ใช้ `dvh` ไม่ใช่ `vh` เพราะแถบเครื่องมือของ Safari ยืดหดได้ Untitled UI ใช้ตัวแปรความสูง visual viewport ด้วยเหตุนี้ ([13]) `[ตีความ]`
5. **`aria-modal` บนมือถือ** ใน backlog ของ GOV.UK มีรายงานปี 2023 ว่า VoiceOver iOS กับ TalkBack ไม่รองรับ `aria-modal` จึงหลุดไปอ่านหน้าหลังได้ ([26]) `[แหล่งรอง]` `showModal()` แก้ข้อนี้ได้เพราะทำหน้าหลังเป็น inert จริง ไม่ได้พึ่ง `aria-modal` นี่เป็นเหตุผลที่ดีที่สุดที่เลือก `<dialog>` `[ตีความ]` ซึ่งตรงกับที่ Scott O'Hara แนะนำให้ใช้ `<dialog>` แทนกล่องที่เขียนเองในกรณีส่วนใหญ่ ([31])

### 4.4 ความเสี่ยงกับสิ่งที่ตัดสินแล้ว เรื่องชั้นของ toast `[ตีความ]`

- กล่องที่เปิดด้วย `showModal()` อยู่ใน top layer ซึ่งอยู่ "on top of all other layers" ([28]) `z-index` ของของในหน้าปกติจึงแซงไม่ได้ **toast ที่ใช้ `z-index: 400` แบบ fixed จะอยู่ใต้ฉากหลังของ modal** ค่า `--ntg-layer-overlay` 300 บนตัวกล่องก็ไม่มีผลเช่นกัน
- นอกจากมองไม่เห็นแล้ว toast ยังอยู่ในส่วนที่ inert ปุ่มปิดของ toast กดไม่ได้ และประกาศ `aria-live` ในส่วนที่ inert อาจไม่ถูกอ่าน ต้องทดสอบกับโปรแกรมอ่านหน้าจอจริง
- **ทางแก้ที่เป็นไปได้** (ต้องให้ ui-engineer ทดสอบก่อนเลือก) ก) ให้ toast เปิดเป็น `popover="manual"` และเรียก `showPopover()` ใหม่เมื่อมี modal เปิด เพราะของใน top layer เรียงตามลำดับที่เข้า ข) ให้ region ของ toast ย้ายเข้าไปอยู่ใน `<dialog>` ที่เปิดอยู่ชั่วคราว ค) ยอมรับว่าระหว่างเปิด modal ไม่แสดง toast และเลื่อนไปแสดงหลังปิด
- token `--ntg-layer-overlay` ยังมีประโยชน์กับ fallback หรือกรณีที่ไม่ใช้ `<dialog>` แต่ควรเขียนใน doc ว่าค่าตัวเลขไม่ได้คุมลำดับเมื่อใช้ `showModal()`

### 4.5 โปรแกรมอ่านหน้าจอประกาศอะไร

- เมื่อโฟกัสเข้าไปในกล่อง โปรแกรมอ่านหน้าจอควรอ่าน **บทบาท (dialog), ชื่อ และคำอธิบายถ้ามี** แล้วตามด้วยของที่ถูกโฟกัส ([29][30]) `[แหล่งรอง]`
- Deque แนะนำให้โฟกัสของที่โฟกัสได้ตัวแรกในกล่อง เพราะได้ผลกับ VoiceOver ดีกว่า และเตือนว่า NVDA จะเข้า Forms Mode ทันที ทำให้ผู้ใช้ต้องกด Tab ไปมา ([29])
- รายงานเก่าบางชิ้นพบว่า VoiceOver ไม่อ่าน `aria-describedby` อัตโนมัติ ผลขึ้นกับรุ่นและของที่ถูกโฟกัส ([29]) **ข้อมูลสำคัญจึงไม่ควรอยู่ใน description อย่างเดียว**
- **โหมด bare ไม่มีหัวข้อที่มองเห็น** ต้องมีชื่อเสมอ ทำได้สองทาง คือ ใส่ `aria-label` หรือชี้ `aria-labelledby` ไปที่หัวข่าวใน body (Primer ก็บังคับให้มีชื่อแม้ซ่อนจากสายตา [11]) `[ตีความ]` ควรทำให้ prop ชื่อเป็นค่าบังคับใน TypeScript

---

## 5. คำถามข้อ 3 เมื่อไหร่ใช้ เมื่อไหร่ไม่ใช้

### 5.1 ใช้เมื่อ

- ระบบต้องได้คำตอบก่อนงานที่ผู้ใช้เริ่มเองจะไปต่อได้ หรือต้องยืนยันการกระทำ ([4]) `[ทางการ]`
- เตือนข้อผิดพลาดร้ายแรงหรือการกระทำที่ย้อนไม่ได้ เช่น งานที่ยังไม่บันทึก ([23]) `[แหล่งรอง]`
- งานสั้นงานเดียวที่จบในบริบทเดียว เช่น ยืนยัน เลือก ([11]) `[ทางการ]`

### 5.2 ไม่ใช้เมื่อ

- ข้อความไม่สำคัญ ให้ใช้ toast หรือการแจ้งในหน้า ([4]) `[ทางการ]`
- งานหลายขั้นที่ต้องเดินไปมาในกล่อง ตารางใหญ่ หรือการตัดสินใจที่ต้องดูข้อมูลนอกกล่อง ([6][23])
- งานที่ต้องมีเมนูข้างหรือหลายบริบท และเนื้อหาที่ผู้ใช้อาจต้องการลิงก์ตรง ([11]) **ข้อนี้เกี่ยวกับเคสข่าวโดยตรง** `[ตีความ]` ถ้าเปิดรายละเอียดข่าวใน modal ต้องเปลี่ยน URL ให้แชร์บน LINE หรือ Facebook ได้ หรือมีปุ่มไปหน้าข่าวเต็ม
- ป๊อปอัปสมัครรับข่าวหรือขายของที่ไม่เกี่ยวกับเป้าหมายผู้ใช้ ([23]) Google ระบุว่ากล่องที่บังเนื้อหาเพื่อโปรโมต "may lead to poor search performance" ([24]) `[ทางการ]`

### 5.3 เนื้อหาที่แนะนำ

| หัวข้อ | แนวทาง | แหล่ง |
|---|---|---|
| ชื่อ | วลีกริยาสั้น ตรงกับปุ่มที่เปิด ถ้าข้อความสั้นมากให้ชื่อบอกทั้งหมดแล้วไม่ต้องมี body | Carbon [4] |
| ปุ่มหลัก | ชื่อปุ่มตรงกับชื่อกล่อง ใช้กริยาเฉพาะ ไม่ใช่ "ตกลง" ลอย ๆ | Atlassian [6], Apple `[ยืนยันไม่ได้]` |
| จำนวนปุ่ม | ไม่เกิน 3 ปุ่มหลักอยู่ขวาสุด | Fluent [7], Carbon [4], Atlassian [6] |
| ความยาว body | สั้นและตรง ถ้าต้องเลื่อนมากให้ขยายขนาด ถ้า lg ยังไม่พอให้เป็นหน้าใหม่ | NN/g [23], Carbon [4] |
| ห้ามเลื่อนแนวนอน | ถ้าเนื้อหากว้างเกินให้ใช้ขนาดใหญ่ขึ้น | Carbon [4] |

**ข้อเสนอเชิงตัวเลข** `[ตีความ]` ชื่อไม่เกินสองบรรทัดที่ขนาด sm, body ของกล่องยืนยันไม่เกิน 3 ประโยค, body ของ md และ lg ไม่ควรสูงเกินจอสองหน้าจอ ถ้าเกินควรเป็นหน้าเต็ม

---

## 6. ข้อสังเกตเรื่องฉากหลัง

| เจ้า | สี | ความทึบ | เบลอ |
|---|---|---|---|
| Material 3 | scrim | 32 เปอร์เซ็นต์ ([2]) | ไม่มี |
| Untitled UI | overlay | 70 เปอร์เซ็นต์ ([13]) | 6 ([13]) |
| Carbon | `$overlay` | ไม่บอกในหน้า ([3]) | ไม่มี |
| NTGDS (ตัดสินแล้ว) | ดำ | 50 เปอร์เซ็นต์ | 16 (md) |

- ค่า 50 เปอร์เซ็นต์อยู่กลางช่วง 32 ถึง 70 ของตลาด ไม่มีปัญหา `[ตีความ]`
- **ความเบลอ 16 สูงกว่าเจ้าเดียวที่พบว่าใช้เบลอ (6) เกือบสามเท่า** `[คำนวณ]` `backdrop-filter` บนพื้นที่เต็มจอกินแรงประมวลผล บนมือถือ Android ราคาถูกอาจกระตุกตอนเปิด และยิ่งหนักถ้าหน้าหลังมีวิดีโอหรือโฆษณาเคลื่อนไหว `[ตีความ]` แนะนำให้ทดสอบบนเครื่องจริง และเตรียมลดเป็น sm (8) หรือปิดเบลอเมื่อ `prefers-reduced-transparency` ถ้าพบปัญหา
- ฉากหลังดำล้วนในโหมดมืดอาจกลืนกับพื้นมืด จึงต้องพึ่งเงาและสีพื้นของกล่องให้ต่างจากหน้าหลัง ควรเช็กตอนทำโหมดมืด

---

## 7. คำถามข้อ 4 ข้อเสนอสำหรับ NTGDS

| # | หัวข้อ | ข้อเสนอ | เหตุผลและแหล่ง |
|---|---|---|---|
| 1 | padding กล่อง | sm 20 (`s2-md`), md และ lg 24 (`s2-lg`), จอแคบกว่า 600 ใช้ 16 (`s2-sm`) | ค่าย 24 ของ Material 3 [2] และ Fluent [7], ค่าย 16 ของ Carbon [3] และ Primer [11] ใช้กับจอเล็ก |
| 2 | ขอบกล่องกับจอ | บนล่างซ้ายขวา 32 (`s3-xs`) บนจอใหญ่ 16 บนมือถือ ความสูงสูงสุด `calc(100dvh - 2 x ขอบ)` | Untitled UI [13] |
| 3 | ชื่อกับคำอธิบาย | ช่อง 4 (`s1-sm`) | Carbon label กับ title 4 [3] |
| 4 | header กับ body | ช่อง 16 (`s2-sm`) | Carbon 16 [3] |
| 5 | body กับ footer | ช่อง 24 (`s2-lg`) | Material 3 เว้นรวมราว 24 [2] Carbon ใช้ 48 ซึ่งมากไปสำหรับกล่องเล็ก |
| 6 | ระหว่างปุ่มใน footer | 12 (`s2-xs`) ชิดขวา ปุ่มหลักขวาสุด | Atlassian [6], Primer [11] |
| 7 | ปุ่มปิดใน header | ชิดขอบบนขวาของ header จัดกลางแนวตั้งกับบรรทัดแรกของชื่อ ข้อความชื่อต้องเว้นที่ให้ปุ่มไม่ทับ | Primer ห่างขอบ 8 [11] Carbon มุมบนขวา [4] |
| 8 | ชื่อ | `.ntg-typography-title-lg` (20/30) ทุกขนาด, คำอธิบาย `.ntg-typography-body-sm` (14/24) สีระดับ caption, body ใช้ `body-md` | ระดับหัวข้อของกล่องควรเด่นกว่าเนื้อหาสองขั้น `[ตีความ]` ถ้าเห็นว่า sm ดูใหญ่ไป ใช้ `title-md` (18/28) |
| 9 | เส้นคั่น | **ไม่มีโดยปริยาย** แสดงเส้นใต้ header และเหนือ footer เฉพาะเมื่อ body เลื่อนได้และไม่ได้อยู่บนสุดหรือล่างสุด ใช้ component `Divider` ที่มีอยู่ | Primer บังคับเมื่อเลื่อน [11], Material 3 ไม่มีเส้น [2] |
| 10 | มุมโค้ง | ขอ token ใหม่ `modal/radius` เสนอ 12 ให้เท่า info-card | ยังไม่มี token สำหรับกล่องลอย (ข้อ 2.2) |
| 11 | ขาเข้า | ฉากหลังจางเข้า กล่องจาง+ขยายจาก 0.95 เป็น 1 ด้วย `--ntg-motion-duration-default` (250ms) กับ `easing-enter` | Untitled UI ขยายจาก 95 เปอร์เซ็นต์ [13], token ของเรากำหนดไว้แล้วว่าขาเข้าของลอยใช้ 250 |
| 12 | ขาออก | ย้อนกลับด้วย `duration-fast` (150ms) กับ `easing-exit` ต้อง transition `display` และ `overlay` แบบ `allow-discrete` ไม่อย่างนั้นกล่องหลุดจาก top layer ก่อนจางเสร็จ | Chrome for Developers [20], Untitled UI ขาออกสั้นกว่าขาเข้า [13] |
| 13 | ลดการเคลื่อนไหว | ใต้ `prefers-reduced-motion: reduce` เหลือจางอย่างเดียว ไม่ขยาย | หลักเดียวกับ BarChart |
| 14 | โฟกัสแรก | ค่าเริ่มต้นคือปุ่มปิด, prop `initialFocus` ให้เลือกช่องกรอกแรก หัวข้อ หรือปุ่มที่ปลอดภัยที่สุด, กล่องยืนยันลบโฟกัสปุ่มยกเลิก | APG [15], MDN [16] |
| 15 | คลิกฉากหลัง | ปิดได้เป็นค่าเริ่มต้น ปิดสวิตช์ได้ และ **ไม่ปิดเมื่อฟอร์มมีข้อมูลที่ยังไม่บันทึก** | Primer [11], Carbon ปิดได้เฉพาะกล่องแสดงข้อมูล [4] |
| 16 | ซ้อนกล่อง | ห้ามโดยหลัก ยกเว้นกล่องยืนยันหนึ่งชั้นบน modal ที่มีฟอร์ม (เช่น "ทิ้งการแก้ไข?") | Atlassian [6], Fluent [7], Primer ยอม 2 ชั้น [11] |
| 17 | มือถือ | ทุกขนาดกว้างเต็มจอลบขอบ 16 ยังอยู่กลางจอตามที่ตัดสิน, footer เรียงปุ่มเต็มความกว้างซ้อนกันเมื่อแคบกว่า 480 โดยปุ่มหลักอยู่บน | Carbon 100 เปอร์เซ็นต์ [3] `[ตีความ]` เรื่องปุ่มซ้อน |
| 18 | โหมด bare | ปุ่มปิดวงกลมต้องมีพื้นทึบของตัวเองให้ได้ 3 ต่อ 1 กับภาพทุกแบบ (WCAG 1.4.11), body ต้องมีชื่อด้วย `aria-label` หรือ `aria-labelledby` ชี้หัวข่าว, ภาพ 16:9 ชนขอบบนและข้างโดยมุมบนตามมุมกล่อง | APG [15], Primer [11] |
| 19 | token ใหม่ที่คาดว่าต้องขอ | `modal/color/backdrop` (ตัดสินแล้ว แต่ต้องมี primitive ดำ 50 ก่อน), `modal/color/background`, `modal/radius`, `modal/padding-sm` `-md` `-lg`, `modal/gap-*`, `modal/width-sm` `-md` `-lg` | ข้อ 2.2 ทุกตัวต้องถามก่อนสร้างตาม AGENTS.md |

### 7.1 เรื่องที่ต้องให้คนตัดสินก่อนลงมือ

1. **toast ระหว่างเปิด modal** จะใช้ทางไหนในสามทางของข้อ 4.4 เพราะค่า z-index 400 ไม่ทำให้ toast อยู่เหนือ `<dialog>` ที่เปิดด้วย `showModal()`
2. **มือถือ** ยืนยันว่ารอบแรกเป็นกล่องกลางจอเต็มความกว้างลบขอบ 16 ไม่ใช่แผ่นชิดล่างแบบ Primer และ Untitled UI (แผ่นชิดล่างใกล้กับ Drawer ซึ่งเลื่อนไปรอบหน้า)
3. **โหมด bare บนมือถือ** รายละเอียดข่าวควรเต็มจอหรือไม่ และจะเปลี่ยน URL เพื่อให้แชร์ได้หรือไม่
4. **ขนาดชื่อ** `title-lg` ทุกขนาด หรือ sm ใช้ `title-md`
5. **ความเบลอ** คง md (16) ไว้ หรือทดสอบบนมือถือ Android รุ่นล่างก่อนแล้วค่อยตัดสิน
6. **มุมโค้ง** สร้าง token `modal/radius` 12 หรือค่าอื่น
7. **นโยบายซ้อนกล่อง** ห้ามทั้งหมด หรือยอมกล่องยืนยันหนึ่งชั้น

---

## 8. สิ่งที่ยืนยันไม่ได้ในรอบนี้

- **Material 3** หน้า m3.material.io ดึงเนื้อหาไม่ได้ ค่ามาจากไฟล์ต้นทาง `material-web` ([1][2]) ไม่ใช่หน้า guideline รายละเอียดแบบเต็มจอและมุมโค้งจึงไม่มี
- **Apple HIG** หน้า sheets และ alerts ดึงเนื้อหาไม่ได้ทั้งสองหน้า ข้อมูลในตารางติดป้าย `[ยืนยันไม่ได้]` ทั้งหมด
- **Polaris** หน้า modal ตัด connection ทุกครั้ง จึงไม่อยู่ในตาราง ข้อ 3.1
- **พิกเซลของ Atlassian และ Fluent** หน้าเอกสารไม่บอกค่า ไม่ได้อ่านไฟล์ต้นทาง
- **สีฉากหลังของ Carbon และ Fluent** หน้าเอกสารบอกแค่ชื่อ token
- **`closedby` บน Firefox รุ่นเสถียร** และ **`::backdrop` รับค่า CSS variable บน Safari และ Firefox** ยังไม่ได้ทดสอบบนเครื่อง
- **ประกาศ `aria-live` ของ toast ขณะหน้าหลังเป็น inert** เป็นข้อสันนิษฐานที่ต้องทดสอบกับ VoiceOver และ NVDA จริง

---

## 9. แหล่งอ้างอิง

**Google Material 3**
- [1] material-web, Dialog docs: https://github.com/material-components/material-web/blob/main/docs/components/dialog.md
- [2] material-web, `dialog/internal/_dialog.scss` (กว้าง 280 ถึง 560, padding, scrim 32 เปอร์เซ็นต์): https://github.com/material-components/material-web/blob/main/dialog/internal/_dialog.scss

**IBM, Atlassian, Microsoft, Adobe, GitHub**
- [3] Carbon, Modal style: https://carbondesignsystem.com/components/modal/style/
- [4] Carbon, Modal usage: https://carbondesignsystem.com/components/modal/usage/
- [5] Atlassian, Modal dialog examples: https://atlassian.design/components/modal-dialog/examples
- [6] Atlassian, Modal dialog usage: https://atlassian.design/components/modal-dialog/usage
- [7] Fluent 2, Dialog usage: https://fluent2.microsoft.design/components/web/react/core/dialog/usage
- [8] spectrum-css, `components/dialog/index.css` (S 400, M 480, L 640): https://github.com/adobe/spectrum-css/blob/main/components/dialog/index.css
- [9] React Spectrum, Dialog: https://react-spectrum.adobe.com/react-spectrum/Dialog.html
- [10] Primer, Dialog (React): https://primer.style/product/components/dialog/
- [11] Primer, Dialog guidelines: https://primer.style/product/components/dialog/guidelines/

**ไลบรารี**
- [12] Untitled UI React, Modals: https://www.untitledui.com/react/components/modals
- [13] Untitled UI React, `modal.tsx`: https://github.com/untitleduico/react/blob/main/components/application/modals/modal.tsx
- [14] Radix Primitives, Dialog: https://www.radix-ui.com/primitives/docs/components/dialog
- [25] Ark UI, Dialog: https://ark-ui.com/docs/components/dialog

**มาตรฐานและเบราว์เซอร์**
- [15] W3C WAI-ARIA APG, Dialog (Modal) Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
- [16] MDN, `<dialog>`: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog
- [17] MDN, `::backdrop`: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::backdrop
- [18] caniuse, dialog `closedby`: https://caniuse.com/mdn-html_elements_dialog_closedby และ WebKit bug 284592: https://bugs.webkit.org/show_bug.cgi?id=284592
- [19] modern-css.com, Dialog light dismiss (Chrome 134): https://modern-css.com/dialog-light-dismiss-without-click-outside-listeners
- [20] Chrome for Developers, Entry and exit animations: https://developer.chrome.com/blog/entry-exit-animations
- [21] WebKit bug 259568, `overflow: hidden` on body in iOS: https://bugs.webkit.org/show_bug.cgi?id=259568
- [22] OpenReplay, Stop page scrolling when a dialog is open: https://blog.openreplay.com/stop-page-scrolling-dialog-open/ และ Frontend Masters, Scroll-Locked Dialogs: https://frontendmasters.com/blog/scroll-locked-dialogs/
- [27] Chrome for Developers, Changes to CSS `::backdrop` inheritance: https://developer.chrome.com/blog/css-backdrop-inheritance
- [28] MDN, Top layer: https://developer.mozilla.org/en-US/docs/Glossary/Top_layer

**การเข้าถึงและแนวทางเนื้อหา**
- [23] Nielsen Norman Group, Modal and Nonmodal Dialogs: https://www.nngroup.com/articles/modal-nonmodal-dialog/
- [24] Google Search Central, Avoid intrusive interstitials and dialogs: https://developers.google.com/search/docs/appearance/avoid-intrusive-interstitials
- [26] GOV.UK Design System backlog, Modal dialogue: https://github.com/alphagov/govuk-design-system-backlog/issues/30
- [29] Deque, How to Build WAI-ARIA Modal Alert Dialogs: https://www.deque.com/blog/aria-modal-alert-dialogs-a11y-support-series-part-2/
- [30] MDN, ARIA dialog role: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/dialog_role
- [31] Scott O'Hara, Use the dialog element (reasonably): https://www.scottohara.me/blog/2023/01/26/use-the-dialog-element.html
