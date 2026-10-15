# วิจัย Pagination (ตัวแบ่งหน้า) สำหรับหน้า 24

> สำรวจ 2026-10-12 อ่านจากโค้ดต้นทางและ CSS ที่แต่ละเจ้าส่งออกจริง ไม่ได้สรุปจากเอกสารการตลาด
> แบ่งเก็บเป็น 4 ส่วนเพราะทำพร้อมกันคนละชุด รายละเอียดรายเจ้าอยู่ในหัวข้อ 4 ถึง 7

## 1. สรุปคำตอบ อ่านหน้าเดียวจบ

| กลุ่ม | คำตอบสั้นจากข้อมูลจริง |
|---|---|
| **ขนาดตลาดจริง** | **มี pagination จริง 12 เจ้า ไม่ใช่ 15** เพราะ **SLDS ไม่มี** (issue ที่ขอไว้ถูกปิดด้วยบอต 2018 และ repo ถูกเก็บถาวร 2026-08-12) **Radix ไม่มี** (ที่คนเข้าใจสลับคือ Zag ซึ่งเป็นฐานของ Ark และ Chakra v3) และ **Gestalt ไม่มี** (ไปทาง Masonry กับเลื่อนไม่สิ้นสุดแทน) |
| **ความสูงปุ่ม** | ช่วง 22 ถึง 44 **Carbon ใช้ 24 / 32 / 40 / 48 ซึ่งตรงกับสูตรความสูงกลางของเรา (base 24 step 8) พอดี** MUI 26 / 32 / 40 · Mantine 22 / 26 / 32 / 38 / 44 · Fluent, Atlassian, Primer 32 ค่าเดียว · Untitled UI 36 ค่าเดียว · BBC 44 |
| **ช่องไฟระหว่างปุ่มเลข** | **ไม่มีฉันทามติ กระจาย 0 ถึง 12** Carbon, Fluent, Atlassian ใช้ **0** แล้วให้ระยะขอบในปุ่มสร้างระยะแทน · Untitled UI 2 · Primer 4 · BBC 4 · MUI 6 (ขั้นเล็ก 2) · Mantine, Chakra 8 · Ant 4 / 8 / 12 ตามขนาด |
| **ปุ่มจัตุรัสตายตัวหรือยืดได้** | **11 ใน 12 ใช้ความกว้างขั้นต่ำเท่าความสูง แล้วปล่อยยืดตามจำนวนหลัก** มีแต่ **Untitled UI ที่ตรึง 36 ตายตัว ทำให้เลข 3 หลักล้นกล่อง** ซึ่งเป็นต้นทางของไฟล์ออกแบบเดิมเรา |
| **จุดไข่ปลา** | **กดไม่ได้ 10 ใน 12** กดได้แค่ Carbon (ทำด้วย `<select>`) กับ Ant (`<li role="button">` กระโดด 5 หน้า) **และทั้ง W3C Design System กับ GOV.UK ไม่ได้ใส่ `aria-hidden` ให้ ซึ่งเป็นช่องว่างที่เราควรปิดให้ดีกว่าต้นแบบ** |
| **สูตรจำนวนเลขที่แสดง** | ตระกูลเดียวกันหมด คือ `siblings` รอบหน้าปัจจุบัน บวก `boundaries` ที่หัวท้าย MUI, Mantine, Untitled UI ใช้ `siblings 1` `boundaries 1` ได้ 7 ปุ่ม · Primer `surroundingPageCount 2` `marginPageCount 1` · Atlassian ตรึงสูงสุด 7 · Fluent 5 · **Zag มีขั้นที่เจ้าอื่นไม่มี คือถ้าจุดไข่ปลาบังหน้าเดียว จะแทนด้วยเลขหน้านั้นเลย** |
| **markup** | **ต้องเป็น `<a href>` ไม่ใช่ `<button>`** ทั้ง W3C Design System และ GOV.UK ใช้ `<a>` เพราะได้ URL ที่แชร์ได้ ปุ่มย้อนกลับทำงาน เปิดแท็บใหม่ได้ และใช้ได้เมื่อจาวาสคริปต์ล่ม **`<button>` ใช้เฉพาะที่ไม่มี URL จริง เช่นแดชบอร์ด** · **APG ไม่มี pattern ของ pagination** (ไล่สารบัญ 33 pattern แล้ว) แหล่งที่ควรยึดคือสองเจ้านี้ |
| **หน้าปัจจุบัน** | `aria-current="page"` ตัวเดียวต่อชุด และผูกสไตล์ด้วย `[aria-current="page"]` **ข้อควรระวัง Untitled UI ทำสถานะนี้ให้ใช้สีเดียวกับตอนชี้ จนแยกด้วยตาไม่ออก** ซึ่งไฟล์เดิมเราลอกมาทั้งข้อบกพร่อง |
| **ขนาดพื้นที่กด** | **ข้อ 2.5.8 ระดับ AA เท่ากับ 24 คูณ 24 และข้อ 2.5.5 ระดับ AAA เท่ากับ 44 คูณ 44** ขนาด 24 จึงผ่าน AA แบบไม่มีระยะเผื่อ และ 32 ผ่าน AA สบายแต่ไม่ผ่าน AAA **BBC เป็นเจ้าเดียวที่ผ่านทั้งสองข้อ** ด้วย 44 คูณ 44 ช่องไฟ 4 |
| **จอแคบ** | **มีแค่ Mantine ที่แก้มาให้** ด้วย container query ที่ 400 แล้วสลับเป็นข้อความ Page X of Y · Untitled UI ซ่อนแถวเลขเหลือลูกศรกับข้อความ |
| **แยกของตารางไหม** | **มีแค่ Polaris ที่แยกจริง** ด้วย prop `type: page หรือ table` ที่เหลือใช้ตัวเดียวกันหมด |
| **เว็บในเครือ** | **สแกน 12 หน้าจริง พบ `aria-current` 0 จุด และลิงก์ที่มีเลขหน้า 0 จุด ทั้งเครือไม่มีตัวแบ่งหน้าแบบเลขหน้าเลย** bangkokbiznews กับ komchadluek ใช้ปุ่มโหลดเพิ่ม อีก 4 เว็บใช้เลื่อนไม่สิ้นสุดโดยไม่มีปุ่มให้กด **และข้อจำกัดอยู่ที่ชั้นหน้าจอ ไม่ใช่ชั้นข้อมูล เพราะ API ส่งจำนวนหน้ามาให้อยู่แล้ว** |

## 2. สถานะของเราก่อนเริ่ม

ของเดิม 3 ชุด 34 แบบ พบปัญหาเชิงโครง 8 เรื่อง

1. แกน `Breakpoint` เอาขนาดจอมาทำเป็นแบบ และตรึงความกว้างไว้ที่ 1440 กับ 375
2. แกน `Type` มี 9 ค่าที่ปนกัน 3 เรื่อง คือ บริบท รูปแบบ และการจัดชิด แล้วเมทริกซ์ยังไม่ครบ มี 22 จาก 36
3. คุณสมบัติ `No.8` `No.9` `No.10` และ `Range of number` เอาข้อมูลมาทำเป็นแบบ
4. ปุ่มเลขหน้าสูง 40 แต่ปุ่มก่อนหน้าถัดไปสูง 38 ทั้งที่อยู่แถวเดียวกัน
5. จุดไข่ปลาใช้ชิ้นเดียวกับปุ่มเลขหน้า จึงดูกดได้ทั้งที่กดไม่ได้
6. ตัวอักษรทั้งหน้า 120 จุดใช้ชุดจากไลบรารีภายนอก ไม่ใช่ preset 48 ตัวของไฟล์นี้
7. ระยะขอบที่เก็บไว้เป็นค่าหลอก เพราะเฟรมตรึงขนาด ค่าจริงคำนวณได้ 9 ไม่ใช่ 12 ที่เขียนไว้
8. มุมโค้งไม่ผูกตัวแปร 289 จุด

## 3. ข้อเสนอและสิ่งที่ตัดสินแล้ว

| เรื่อง | ข้อเสนอ | สถานะ |
|---|---|---|
| ความสูงปุ่ม | ยืมความสูงกลางของระบบ 24 / 32 / 40 / 48 / 56 ซึ่งตรงกับ Carbon | **ทำแล้ว** |
| มุมโค้ง | ยืมสูตรมุมโค้งปุ่มของระบบ 6 / 7 / 8 / 9 / 10 | **ทำแล้ว** |
| ความกว้าง | ใช้ความกว้างขั้นต่ำเท่าความสูง แล้วปล่อยยืดตามจำนวนหลัก ไม่ตรึงจัตุรัส | **ทำแล้ว** |
| ช่องไฟระหว่างเลข | 2 / 3 / 4 / 5 / 6 ซึ่ง md เท่ากับ 4 ตรงกับ Primer และขั้นเล็กของ Ant | **ทำแล้ว** |
| จุดไข่ปลา | แยกเป็นชุดของตัวเอง กดไม่ได้ ไม่มีพื้นหลัง และต้องใส่ `aria-hidden` ในโค้ด | **ทำแล้ว** |
| หน้าปัจจุบัน | เป็นสถานะของตัวเอง แยกจากตอนชี้ให้เห็นชัด ไม่ทำตาม Untitled UI | **ทำแล้ว** |
| ขนาด `xs` ที่ 24 | **คงไว้ แต่ต้องเขียนเตือนในเอกสารว่าผ่าน AA แบบไม่มีระยะเผื่อ ใช้เฉพาะหลังบ้านที่แน่นมาก ห้ามใช้บนหน้าอ่านข่าว** | **ตัดสินแล้ว 2026-10-12** |
| หน้าอ่านข่าว | **ควรใช้ปุ่มโหลดเพิ่ม ไม่ใช่เลขหน้า** เป็นคนละ component | **ตัดสินแล้ว ยกไปเปิดการ์ดใหม่** |
| URL ของหน้าถัดไป | เว็บในเครือไม่มี URL ให้ข่าวชุดที่ 2 ขึ้นไป แชร์และให้บอตเก็บไม่ได้ เป็นเรื่องที่ต้องคุยกับทีมเว็บ | **นอกขอบเขต บันทึกไว้** |

---

## 4. รายละเอียด Material · Spectrum · Carbon · Fluent · Atlassian


**Context** วิจัยตัวแบ่งหน้าจาก 5 design system เจ้าใหญ่ เพื่อเตรียมออกแบบ component pagination ของ NTGDS
**วันที่สำรวจ** 2026-10-12 (อ่านจากโค้ดต้นทาง branch หลัก และแพ็กเกจ npm รุ่นล่าสุด)
**ป้ายที่มา** `[สำรวจ]` อ่านจากโค้ด/CSS จริง `[แหล่งรอง]` เอกสารหรือ issue ทางการ `[ตีความ]` สรุปของผู้วิจัย

เวอร์ชันที่อ่าน

- MUI `material-ui@master` (Pagination, usePagination, TablePagination)
- `@spectrum-css/pagination@10.2.0` + `@spectrum-css/tokens`
- `carbon@main` (packages/styles + packages/react)
- `@fluentui/react-experiments` (lib build)
- `@atlaskit/pagination@17.3.4` + `@atlaskit/button`

---

### 1. ตารางสรุป 5 เจ้า

| หัวข้อ | Material (MUI) | Spectrum (Adobe) | Carbon (IBM) | Fluent (Microsoft) | Atlassian |
|---|---|---|---|---|---|
| มี component จริง | มี `Pagination` | มี แต่เป็น CSS-only ไม่มีเลขหน้า | มี 2 ตัว `Pagination` + `PaginationNav` | ไม่มีใน Fluent 2 / v9, มีใน react-experiments | มี `Pagination` |
| ชนิด | เลขหน้า + ก่อนหน้า/ถัดไป | ก่อนหน้า/ถัดไป + ช่องพิมพ์เลขหน้า | เลขหน้า + ก่อนหน้า/ถัดไป | เลขหน้า หรือ dropdown + ก่อนหน้า/ถัดไป | เลขหน้า + ก่อนหน้า/ถัดไป |
| โหลดเพิ่ม / เลื่อนไม่สิ้นสุด | ไม่มี | ไม่มี (ใช้ async loading ที่ TableView) | ไม่มี | ไม่มี | ไม่มี |
| แยกของตารางออกจากรายการ | แยก `TablePagination` | ไม่แยก | แยกชัด `Pagination` คือของตาราง | ไม่แยก | ไม่แยก |
| จุดไข่ปลากดได้ | กดไม่ได้ (`div`) | ไม่มีจุดไข่ปลา | **กดได้** (เป็น `select`) | ไม่มีจุดไข่ปลา | กดไม่ได้ (`li` + text) |
| prop คุมจำนวนเลข + ค่าเริ่มต้น | `siblingCount` 1, `boundaryCount` 1 | ไม่มี | `itemsShown` 10 | `numberOfPageButton` 5 | `max` 7 |
| ปุ่มไปหน้าแรก/สุดท้าย | มี แต่ปิดอยู่ (`showFirstButton` false) | ไม่มี | ไม่มีปุ่มเฉพาะ | มีทั้งสอง เปิดตลอด | ไม่มีปุ่มเฉพาะ |
| แกนขนาด | 3 ขั้น 26 / 32 / 40 px | ไม่มีแกนของตัวเอง | 4 ขั้น 24 / 32 / 40 / 48 px | ไม่มีแกน (32 px เดียว) | ไม่มีแกน (32 px จาก Button) |
| ช่องไฟระหว่างปุ่มเลข | 6 px (small 2 px) | ไม่เกี่ยว (5 หรือ 6 px รอบ counter) | 0 px | 0 px | 0 px |
| ทรงปุ่ม + มุมโค้ง | วงกลม (ครึ่งความสูง) หรือมุมมน 4 px | ตาม ActionButton | สี่เหลี่ยมมุมฉาก 0 px | ไม่มีพื้น ไม่มีมุมโค้ง | มุมมน 4 px พื้นโปร่ง |
| ปุ่มจัตุรัสเสมอ | ไม่ (min-width = ความสูง แล้วยืดตามหลัก) | ไม่เกี่ยว | ไม่ (min-inline-size = ความสูง แล้วยืด) | ไม่ (min 32 แล้วยืด) | ไม่ (ยืดตามเนื้อหา) |
| `aria-current="page"` | ใช้ | ไม่มีในไลบรารี CSS | ใช้ | ไม่ใช้ (ใช้ `role=radio` + `aria-checked`) | ใช้ |
| ลูกศรตอนสุดทาง | disabled | disabled | disabled (เว้นแต่เปิด `loop`) | disabled | disabled |

---

### 2. รายละเอียดรายเจ้า

### 2.1 Material Design / MUI

1. **ชนิด** `[สำรวจ]` มีแค่เลขหน้า + ก่อนหน้า/ถัดไป (+ หน้าแรก/สุดท้ายแบบเลือกเปิด) ไม่มีโหลดเพิ่ม ไม่มีเลื่อนไม่สิ้นสุด
2. **แยกของตาราง** `[สำรวจ]` แยกเป็น `TablePagination` คนละ component สร้างบน `TableCell` กำหนด `minHeight: 52`
3. **ส่วนประกอบ** `[สำรวจ]` `Pagination` มีลูกศร เลขหน้า จุดไข่ปลา หน้าแรก/สุดท้าย ส่วนตัวเลือกจำนวนต่อหน้า (`rowsPerPageOptions` ค่าเริ่มต้น `[10, 25, 50, 100]`, label `Rows per page:`) และข้อความบอกช่วง (`labelDisplayedRows`) อยู่ที่ `TablePagination` เท่านั้น
4. **จุดไข่ปลา** `[สำรวจ]` กดไม่ได้ `PaginationItemEllipsis` คือ `styled('div')` ไม่ใช่ `ButtonBase`
5. **สูตรจำนวนเลข** `[สำรวจ]` `usePagination` ใช้ `boundaryCount = 1` และ `siblingCount = 1` ได้ช่องเลขรวม 1 + 1 + (2 × siblingCount + 1) + จุดไข่ปลา 2 ช่อง = 7 ช่อง เมื่อหน้าอยู่กลาง
6. **หน้าแรก/สุดท้าย** `[สำรวจ]` `showFirstButton` และ `showLastButton` ค่าเริ่มต้น `false` ใช้ไอคอน FirstPage / LastPage
7. **แกนขนาดและความสูงจริง** `[สำรวจ]`
   - `small` ความสูง 26 px, min-width 26 px, มุมโค้ง 13 px, padding-inline 4 px
   - `medium` (ค่าเริ่มต้น) ความสูง 32 px, min-width 32 px, มุมโค้ง 16 px, padding-inline 6 px
   - `large` ความสูง 40 px, min-width 40 px, มุมโค้ง 20 px, padding-inline 10 px, font-size 15 px
8. **ช่องไฟ** `[สำรวจ]` ใช้ margin ไม่ใช่ gap
   - `medium` และ `large` margin `0 3px` ระยะจริงระหว่างปุ่ม 6 px
   - `small` margin `0 1px` ระยะจริง 2 px
   - ไม่มีช่องไฟพิเศษระหว่างกลุ่ม ลูกศรและจุดไข่ปลาใช้ margin เดียวกับปุ่มเลข
9. **ทรง** `[สำรวจ]` `shape` ค่าเริ่มต้น `circular` (มุมโค้ง = ครึ่งความสูง) หรือ `rounded` ใช้ `theme.shape.borderRadius` 4 px ส่วน `variant` มี `text` (เริ่มต้น) และ `outlined` (เส้น 1 px ความทึบ 0.23)
10. **จัตุรัสหรือไม่** `[สำรวจ]` ไม่จัตุรัสตายตัว ใช้ `minWidth` เท่าความสูง บวก padding-inline เลข 3 หลักขึ้นไปจะกว้างขึ้นเองเป็นแคปซูล
11. **สถานะ** `[สำรวจ]` hover, focusVisible, selected, disabled (ความทึบตาม `action.disabledOpacity`) หน้าปัจจุบันบอกด้วยพื้น `action.selected` + `aria-current="page"`
12. **ลูกศรสุดทาง** `[สำรวจ]` disabled ไม่ซ่อน (ซ่อนได้ด้วย `hidePrevButton` / `hideNextButton`)
13. **markup** `[สำรวจ]` `<nav aria-label="pagination navigation"> > <ul> > <li> > ButtonBase (button)` ใช้ `aria-current="page"` และโฟกัสกลับที่ `[aria-current="page"]` หลังเปลี่ยนหน้า
14. **จอแคบ** `[ตีความ]` ไม่มีกลไกในตัว ต้องลด `siblingCount` หรือสลับ `size` เองด้วย media query

### 2.2 Spectrum (Adobe)

1. **ชนิด** `[สำรวจ]` มี 2 variant คือ `.spectrum-Pagination--explicit` (ลูกศรก่อนหน้า + ช่อง textfield พิมพ์เลขหน้า + ตัวนับ "of N" + ลูกศรถัดไป) และ `.spectrum-Pagination--listing` (ลูกศร 2 ข้าง + ตัวนับ) **ไม่มีปุ่มเลขหน้าเลย** ไม่มีโหลดเพิ่ม ไม่มีเลื่อนไม่สิ้นสุด
2. **แยกของตาราง** `[สำรวจ]` ไม่แยก และ React Spectrum ไม่ได้ publish component Pagination ตารางใช้การโหลดแบบ async แทน `[ตีความ]`
3. **ส่วนประกอบ** `[สำรวจ]` `-prevButton` `-nextButton` `-textfield` `-counter` เท่านั้น ไม่มีเลขหน้า ไม่มีจุดไข่ปลา ไม่มีตัวเลือกจำนวนต่อหน้า
4. **จุดไข่ปลา** `[สำรวจ]` ไม่มี
5. **สูตรจำนวนเลข** `[สำรวจ]` ไม่มี เพราะไม่โชว์เลขหน้า ผู้ใช้พิมพ์เลขหน้าเองในช่อง textfield
6. **หน้าแรก/สุดท้าย** `[สำรวจ]` ไม่มี
7. **แกนขนาดและความสูงจริง** `[สำรวจ]` pagination ไม่มีแกนขนาดของตัวเอง ความสูงมาจาก ActionButton และ TextField ที่เอามาประกอบ มี token ของตัวเอง 2 ตัวและแยกค่าตาม scale
   - scale `medium` (เมาส์) `--spectrum-pagination-item-inline-spacing: 5px`, `--spectrum-pagination-textfield-width: var(--spectrum-spacing-700)` = 48 px
   - scale `large` (ทัช) `--spectrum-pagination-item-inline-spacing: 6px`, `--spectrum-pagination-textfield-width: 60px`
8. **ช่องไฟ** `[สำรวจ]` ไม่มีช่องไฟระหว่างปุ่มเลข เพราะไม่มีปุ่มเลข ที่มีคือระยะรอบตัวนับ ใช้ `margin-inline-start` ของ counter และ nextButton และ `margin-inline-end` ของ prevButton ค่าเท่ากับ item-inline-spacing คือ 5 px (medium) หรือ 6 px (large)
9. **ทรง** `[สำรวจ]` ไม่มี token มุมโค้งของ pagination เอง ยืมทรงจาก ActionButton แบบ quiet
10. **จัตุรัสหรือไม่** ไม่เกี่ยว เพราะไม่มีปุ่มเลข ช่องพิมพ์กว้างตายตัว 48 หรือ 60 px รองรับได้ประมาณ 3 ถึง 4 หลัก `[ตีความ]`
11. **สถานะ** `[สำรวจ]` ไม่มีสถานะของตัวเอง ใช้สถานะของ ActionButton และ TextField หน้าปัจจุบันบอกด้วย "ค่าในช่อง textfield" ไม่ใช่ปุ่มที่ถูกเลือก
12. **ลูกศรสุดทาง** `[ตีความ]` ตัวอย่างใน Storybook ใช้ปุ่ม disabled ไม่ซ่อน
13. **markup** `[สำรวจ]` เป็น CSS-only ไม่บังคับ element ใด ตัวอย่างใช้ `<div class="spectrum-Pagination">` ครอบ ไม่มี `aria-current="page"` ในไลบรารี
14. **จอแคบ** `[สำรวจ]` จัดการด้วยการสลับ scale เป็น `large` (ระยะ 6 px ช่องพิมพ์ 60 px) ไม่มีการยุบตัวเลขเพราะไม่มีตัวเลขอยู่แล้ว

### 2.3 Carbon (IBM)

1. **ชนิด** `[สำรวจ]` มีเลขหน้า + ก่อนหน้า/ถัดไป และโหมดเลือกหน้าแบบ dropdown ไม่มีโหลดเพิ่ม ไม่มีเลื่อนไม่สิ้นสุด
2. **แยกของตาราง** `[สำรวจ]` แยกชัดเจนที่สุดในกลุ่มนี้
   - `Pagination` คือแถบของตาราง มี select จำนวนต่อหน้า + ข้อความช่วง + ช่องเลขหน้า + ลูกศร
   - `PaginationNav` คือแถบเลขหน้าสำหรับเนื้อหาทั่วไป
3. **ส่วนประกอบ** `[สำรวจ]` `Pagination` มี `pageSizes` (select), `itemRangeText` ค่าเริ่มต้น `1–10 of 100 items`, `pageRangeText`, `pageInputDisabled`, ลูกศรพร้อม tooltip ส่วน `PaginationNav` มีลูกศร เลขหน้า และ overflow
4. **จุดไข่ปลา** `[สำรวจ]` **กดได้** `PaginationOverflow` เรนเดอร์เป็น `<select>` ที่มี `<option>` ของทุกหน้าที่ถูกซ่อน ผู้ใช้เลือกหน้าจาก dropdown ได้ตรง ถ้าตั้ง `disableOverflow` จะเหลือ select เปล่าที่ไม่มี option
5. **สูตรจำนวนเลข** `[สำรวจ]` `itemsShown` ค่าเริ่มต้น `10` แต่ถูก clamp ตาม `size`
   - `size="sm"` ใช้ `clamp(itemsShown, 4, 7)`
   - `size="md"` ใช้ 4 ถ้า itemsShown เท่ากับ 4 ไม่ใช่ก็ใช้ 5
   - `size="lg"` (ค่าเริ่มต้น) ใช้ 4
   - ถ้า `itemsShown >= 4` และหน้าจอไม่ใช่ breakpoint sm จะใช้ `itemsShown` ตามที่ส่งมา
   - ฟังก์ชัน `calculateCuts` คำนวณจำนวนหน้าที่ตัดหน้าและหลังเพื่อวางจุดไข่ปลา
6. **หน้าแรก/สุดท้าย** `[สำรวจ]` ไม่มีปุ่มเฉพาะ แต่ `PaginationNav` โชว์เลขหน้าแรกและหน้าสุดท้ายค้างไว้เสมอเมื่อแสดงได้ตั้งแต่ 5 ช่องขึ้นไป และ `Pagination` ของตารางมีช่อง select ไปหน้าใดก็ได้
7. **แกนขนาดและความสูงจริง** `[สำรวจ]` ใช้ layout token `layout.size('height')` ร่วมทั้งระบบ
   - `xs` 24 px (มีเฉพาะ `Pagination` ของตาราง)
   - `sm` 32 px
   - `md` 40 px (ค่าเริ่มต้นของ `Pagination`)
   - `lg` 48 px (ค่าเริ่มต้นของ `PaginationNav`)
   - ปุ่มเลขใน `PaginationNav` คำนวณ padding แนวตั้ง `(height - 0.875rem) / 2` หัก font-size 14 px ออกจากความสูง และตั้ง `min-inline-size` เท่าความสูง
8. **ช่องไฟ** `[สำรวจ]` **0 px** ปุ่มเลขติดกันหมด เพราะ `$item-padding: 0` และ `__list` เป็น flex ที่ไม่มี gap ระหว่างกลุ่มก็ 0 px เช่นกัน ส่วน `Pagination` ของตารางใช้เส้นคั่น `1px solid $border-subtle` แทนช่องไฟ และระยะในกลุ่มใช้ `$spacing-05` = 16 px
9. **ทรง** `[สำรวจ]` สี่เหลี่ยมมุมฉาก `border-radius: 0` (`$border-radius-00`) ไม่มีพื้นในสถานะปกติ
10. **จัตุรัสหรือไม่** `[สำรวจ]` ไม่จัตุรัสตายตัว `min-inline-size` เท่าความสูง บวก `padding-inline: $spacing-02` = 4 px สองข้าง เลขหลายหลักจะกว้างขึ้นเอง
11. **สถานะ** `[สำรวจ]` hover (`$background-hover`), focus (`focus-outline`), active, disabled (`$text-secondary` ความทึบ 0.5 + `pointer-events: none`) หน้าปัจจุบันใช้ `--active` ที่ `font-weight: 600` + เส้นใต้ pseudo-underline + `aria-current="page"` โดย **ไม่เปลี่ยนสีพื้น** (`background-color: initial`)
12. **ลูกศรสุดทาง** `[สำรวจ]` disabled ไม่ซ่อน แต่ถ้าเปิด `loop` จะไม่ disabled และวนกลับไปต้น/ท้าย
13. **markup** `[สำรวจ]` `<nav> > <ul class="--pagination-nav__list"> > <li> > <button type="button" aria-current="page">` มี `__accessibility-label` แบบ visually-hidden และ RTL หมุนไอคอน 0.5turn
14. **จอแคบ** `[สำรวจ]` ใช้ `useMatchMedia` ที่ breakpoint `sm` เมื่อแคบจะลดจำนวนเลขลงเป็น `numberOfPages` ตามตารางข้อ 5

### 2.4 Fluent (Microsoft)

1. **ชนิด** `[แหล่งรอง]` **Fluent 2 Web และ Fluent UI React v9 ไม่มี component pagination** ยังเป็น open issue และ discussion อยู่ (microsoft/fluentui issue 7254, 349, discussion 32967) ของที่มีจริงอยู่ใน `@fluentui/react-experiments` ยุค v8 มี 2 รูปแบบตาม prop `format` คือ `comboBox` (ค่าเริ่มต้น) และ `buttons` ไม่มีโหลดเพิ่ม ไม่มีเลื่อนไม่สิ้นสุด
2. **แยกของตาราง** `[สำรวจ]` ไม่แยก และ DetailsList กับ DataGrid ไม่มี pagination ให้ `[แหล่งรอง]`
3. **ส่วนประกอบ** `[สำรวจ]` ลูกศร 4 ตัวครบ (first, previous, next, last เป็น `IconButton` ไอคอน `Previous` `CaretSolidLeft` `CaretSolidRight` `Next`) เลขหน้า `ComboBox` เลือกหน้า (`maxWidth: 70px`) และ `visibleItemLabel` ที่เขียนช่วงแบบ `x - y of N` ไม่มีตัวเลือกจำนวนต่อหน้า
4. **จุดไข่ปลา** `[สำรวจ]` ไม่มีเลย หน้าต่างเลขเลื่อนไปทั้งก้อนโดยไม่โชว์หน้าแรกหรือสุดท้ายค้างไว้
5. **สูตรจำนวนเลข** `[สำรวจ]` `numberOfPageButton` ค่าเริ่มต้น `5`
   - `leftHalfCount = floor((n - 1) / 2)` และ `rightHalfCount = n - 1 - leftHalfCount`
   - window คือ `[selected - leftHalf, selected + rightHalf]` แล้วชนขอบก็เลื่อนทั้งก้อนให้ครบ n
   - ไม่มีแนวคิด boundary หน้าแรกหน้าสุดท้ายหายได้
6. **หน้าแรก/สุดท้าย** `[สำรวจ]` มีทั้งคู่และเปิดตลอด เป็นปุ่มแยกจากก่อนหน้า/ถัดไป
7. **แกนขนาดและความสูงจริง** `[สำรวจ]` **ไม่มีแกนขนาด** มีค่าเดียวคือปุ่มเลข `minWidth: 32px` และ `minHeight: 32px` ลูกศรเป็น `IconButton` ของ v8 ที่สูง 32 px เช่นกัน `[ตีความ]`
8. **ช่องไฟ** `[สำรวจ]` **0 px** style ของ `pageNumber` ไม่กำหนด margin หรือ gap เลย root ที่ `format === 'buttons'` เป็น flex ทิศ column จัดกลางโดยไม่มี gap และกลุ่มลูกศรกับกลุ่มเลขก็ไม่มีช่องไฟกำหนด
9. **ทรง** `[สำรวจ]` ไม่มีพื้นและไม่มีมุมโค้ง ปุ่มถูก reset เป็น `border: none` + `backgroundColor: transparent` + `cursor: pointer`
10. **จัตุรัสหรือไม่** `[สำรวจ]` ไม่จัตุรัสตายตัว เป็น `minWidth` 32 px แล้วยืดตามจำนวนหลัก
11. **สถานะ** `[สำรวจ]` หน้าปัจจุบันบอกด้วย `aria-selected=true` ที่สี `palette.blue` + ตัวหนา + ขีดเส้นใต้ + `cursor: default` ส่วน hover บนหน้าที่เลือกแล้วถูกตัดเอฟเฟกต์ออก ลูกศร disabled ใช้ `cursor: default` + พื้นโปร่ง
12. **ลูกศรสุดทาง** `[สำรวจ]` disabled ไม่ซ่อน (`disabled={!canFirst}` ไปจนถึง `!canLast`)
13. **markup** `[สำรวจ]` ปุ่มเลขคือ `DefaultButton` ที่ตั้ง `role="radio"` + `aria-checked` **ไม่ได้ใช้ `aria-current="page"`** และ root เป็น `div` ไม่ใช่ `<nav>` ถือเป็นแบบที่ควรเลี่ยง `[ตีความ]`
14. **จอแคบ** `[สำรวจ]` ไม่มีกลไกในตัว แต่โหมด `comboBox` ที่เป็นค่าเริ่มต้นกินพื้นที่น้อยอยู่แล้ว ใช้แทนโหมดเลขบนจอแคบได้ `[ตีความ]`

### 2.5 Atlassian

1. **ชนิด** `[สำรวจ]` มีแบบเดียวคือเลขหน้า + ก่อนหน้า/ถัดไป ไม่มีโหลดเพิ่ม ไม่มีเลื่อนไม่สิ้นสุด
2. **แยกของตาราง** `[สำรวจ]` ไม่แยก `DynamicTable` เรียกใช้ Pagination ตัวเดียวกันนี้ `[ตีความ]`
3. **ส่วนประกอบ** `[สำรวจ]` ลูกศร chevron ซ้ายขวา เลขหน้า และจุดไข่ปลา ไม่มีตัวเลือกจำนวนต่อหน้า ไม่มีข้อความบอกช่วง label ปรับได้ครบ (`label` `previousLabel` `nextLabel` `pageLabel`)
4. **จุดไข่ปลา** `[สำรวจ]` กดไม่ได้ `renderEllipsis` คืน `Box as="li"` ที่มี `Text` อักขระ `…` ไม่มี onClick แต่มีข้อความ visually-hidden ว่า `Skipped pages from {from} to {to}` ซึ่งเป็นดีเทลที่เจ้าอื่นไม่มี
5. **สูตรจำนวนเลข** `[สำรวจ]` `max` ค่าเริ่มต้น `7` ที่ `collapse-range.ts`
   - `needEllipsis = total > max`
   - `hasStartEllipsis = needEllipsis && max - 4 < current`
   - `hasEndEllipsis = needEllipsis && current < total - max + 3`
   - มีจุดไข่ปลาข้างเดียว `pageCount = max - 2` (ค่าเริ่มต้น = 5 เลข + 1 เลขหัวหรือท้าย + 1 จุดไข่ปลา)
   - มีจุดไข่ปลาสองข้าง `pageCount = max - 4` (ค่าเริ่มต้น = 3 เลขกลาง + หน้าแรก + หน้าสุดท้าย + จุดไข่ปลา 2)
   - เลขกลางเริ่มที่ `current - floor(pageCount / 2)`
6. **หน้าแรก/สุดท้าย** `[สำรวจ]` ไม่มีปุ่มเฉพาะ แต่หน้าแรกและหน้าสุดท้ายถูกโชว์เป็นเลขค้างไว้เสมอเมื่อมีจุดไข่ปลา
7. **แกนขนาดและความสูงจริง** `[สำรวจ]` Pagination เองไม่มีแกนขนาด ปุ่มเลขคือ `@atlaskit/button` แบบ `appearance="subtle"` โดยไม่ส่ง `spacing` จึงได้ค่าเริ่มต้น
   - `spacing="default"` ความสูง `2rem` = **32 px** (class `_4t3iviql{height:2rem}`)
   - `spacing="compact"` ความสูง `1.5rem` = **24 px** (class `_4t3i1k8s{height:1.5rem}`) ใช้ไม่ได้จาก Pagination เพราะไม่เปิด prop ให้
   - padding แนวตั้งของปุ่ม `space.075` = 6 px (compact `space.025` = 2 px)
8. **ช่องไฟ** `[สำรวจ]` **0 px ระหว่างปุ่มเลข** `<ul>` เป็น `Inline space="space.0"` และ `<nav>` ที่ครอบทั้งแถบก็ `space="space.0"` ระยะที่เห็นจริงมาจาก padding ภายในปุ่มแต่ละตัว
   - ปุ่มเลข padding-inline `space.075` = 6 px สองข้าง ทำให้ช่องว่างที่ตาเห็นระหว่างตัวเลขประมาณ 12 px
   - จุดไข่ปลา `<li>` padding-inline `space.100` = 8 px สองข้าง
   - กรอบไอคอนของลูกศร `navigatorIconWrapper` padding-inline `space.075` = 6 px
9. **ทรง** `[สำรวจ]` สี่เหลี่ยมมุมมน `--ds-radius-small` = 4 px พื้นโปร่งใสแบบ subtle (มี radius-medium 6 px และ radius-full สำหรับปุ่มทรงอื่นใน Button แต่ pagination ไม่ใช้)
10. **จัตุรัสหรือไม่** `[สำรวจ]` ไม่จัตุรัส ปุ่มกว้างตามจำนวนหลักบวก padding-inline 6 px สองข้าง เลข 3 หลักขึ้นไปปุ่มยาวขึ้นเรื่อย ๆ ไม่มีการหนีบความกว้าง
11. **สถานะ** `[สำรวจ]` ใช้สถานะของ Button subtle ครบชุด default, hover, active, selected, disabled, focus ring หน้าปัจจุบันบอกด้วย `isSelected` (พื้นเข้มขึ้น) ร่วมกับ `aria-current="page"` และ `aria-label` ที่ประกอบจาก `pageLabel` + เลขหน้า
12. **ลูกศรสุดทาง** `[สำรวจ]` disabled ไม่ซ่อน (`isDisabled={isDisabled || selectedIndex === 0}` และ `=== pages.length - 1`)
13. **markup** `[สำรวจ]` `<nav aria-label="pagination"> > Inline > <ul> > <li> > <button>` ใช้ `aria-current="page"` ครบ และจุดไข่ปลาอยู่ใน `<li>` ด้วยเพื่อให้โครงสร้างลิสต์ถูกต้อง
14. **จอแคบ** `[ตีความ]` ไม่มีกลไกในตัว ต้องลด `max` เองตามความกว้าง เอกสารทางการแนะนำให้ปรับจำนวนหน้าที่แสดงตามพื้นที่ `[แหล่งรอง]`

---

### 3. Sources

- MUI `PaginationItem.js`, `usePagination.js`, `Pagination.js`, `TablePagination.js` branch `master` github.com/mui/material-ui
- m2.material.io/components/data-tables (pagination ของ Material Design 2)
- github.com/microsoft/fluentui issue 7254, issue 349, discussion 32967 (สถานะ pagination ใน Fluent)
- `@spectrum-css/pagination@10.2.0` `dist/index.css` + `index.css` และ `@spectrum-css/tokens` `dist/index.css`
- Carbon branch `main` `scss/components/pagination-nav/_pagination-nav.scss`, `scss/components/pagination/_pagination.scss`, `scss/utilities/_layout.scss`, `react/src/components/PaginationNav/PaginationNav.tsx`, `react/src/components/Pagination/Pagination.tsx`
- `@fluentui/react-experiments` `lib/components/Pagination/*` (Pagination.base.js, Pagination.styles.js, PageNumber.js, Pagination.types.d.ts)
- `@atlaskit/pagination@17.3.4` `dist/cjs/pagination.js`, `internal/utils/collapse-range.js`, `internal/components/page.js`, `internal/components/render-ellipsis.js`, `pagination.compiled.css` และ `@atlaskit/button` `new-button/variants/shared/button-base.compiled.css`
- atlassian.design/components/pagination

### 4. Design implications สำหรับ NTGDS

1. **ช่องไฟ** 3 ใน 5 เจ้า (Carbon, Fluent, Atlassian) ใช้ช่องไฟระหว่างปุ่มเลข **0 px** แล้วให้ padding ภายในปุ่มสร้างระยะ มีแต่ MUI ที่ใช้ margin จริง 6 px ถ้า NTGDS จะทำสูตรขนาด ควรตัดสินว่าจะยึดแนว padding-driven หรือ gap-driven ก่อน เพราะคุมคนละตัวแปร
2. **ความสูง** ค่าที่พบซ้ำที่สุดคือ **32 px** (MUI medium, Fluent, Atlassian) และเจ้าที่มีแกนจริงคือ MUI (26/32/40) กับ Carbon (24/32/40/48) ซึ่งทั้งคู่ step ไม่สม่ำเสมอ สูตร `base + i × step` ของเราจะได้ 24/32/40/48 ตรงกับ Carbon พอดี (base 24 step 8)
3. **ปุ่มไม่จัตุรัส** ทุกเจ้าที่มีปุ่มเลขเลือก `min-width = ความสูง` แล้วปล่อยให้ยืดตามจำนวนหลัก ไม่มีใครบีบเป็นจัตุรัสตายตัว ควรทำแบบเดียวกันและกำหนด padding-inline แยกจากความสูง
4. **จุดไข่ปลากดได้** มีแค่ Carbon และทำด้วย `<select>` ส่วน Atlassian แก้ปัญหาการเข้าถึงด้วยข้อความ visually-hidden บอกช่วงหน้าที่ถูกข้าม ถ้าเราทำกดไม่ได้ ควรหยิบแนว Atlassian มาใช้
5. **ค่าเริ่มต้นจำนวนเลข** 5 (Fluent) ถึง 7 (Atlassian, MUI) โดย MUI ใช้ sibling/boundary ซึ่งอ่านง่ายกว่าและขยายต่อได้ดีกว่า `max` ตัวเดียว
6. **a11y baseline** `<nav>` + `<ul>` + `<button>` + `aria-current="page"` คือมาตรฐานที่ 3 ใน 5 เจ้าทำตรงกัน (MUI, Carbon, Atlassian) แบบ `role="radio"` ของ Fluent ไม่ควรเอาเป็นตัวอย่าง

---

## 5. รายละเอียด Polaris · Ant Design · Primer · SLDS · Untitled UI


**Context:** หาข้อมูลตัวแบ่งหน้าจาก 5 design system เพื่อใช้ตัดสินโครง component ของ NTGDS โดยเฉพาะแกนขนาดและช่องไฟ ซึ่งไฟล์ออกแบบเดิมของเราลอกโครงมาจาก Untitled UI
**วันที่สำรวจ:** 2026-10-12
**ป้ายที่มา:** `[สำรวจ]` อ่านจากโค้ดต้นทาง/เอกสารทางการเอง · `[แหล่งรอง]` อ่านจากที่อื่นเล่า · `[ตีความ]` ข้อสรุปของผู้วิจัย

---

### 1. ตารางสรุป 5 เจ้า

| หัวข้อ | Polaris | Ant Design | Primer | SLDS | Untitled UI |
|---|---|---|---|---|---|
| เวอร์ชันที่อ่าน | polaris-react main (2026-10) | ant-design master + rc-pagination master | @primer/react main | ไม่มี component | untitleduico/react main |
| มีเลขหน้า | ไม่มี | มี | มี | หาไม่พบ | มี |
| ก่อนหน้า/ถัดไป | มี (มีแค่นี้) | มี | มี | หาไม่พบ | มี |
| โหลดเพิ่ม / เลื่อนไม่สิ้นสุด | ไม่มีใน component นี้ | ไม่มี | ไม่มี | หาไม่พบ | ไม่มี |
| แยกของตารางออกมา | แยก (prop `type`) | ไม่แยก (Table เรียกตัวเดียวกัน) | แยก (TablePagination ใน DataTable) | หาไม่พบ | แยกเชิง variant (ชุด Card) |
| จุดไข่ปลากดได้ | ไม่มีจุดไข่ปลา | **กดได้** กระโดด 5 หน้า | กดไม่ได้ | หาไม่พบ | กดไม่ได้ |
| prop คุมจำนวนเลข | ไม่มี | `showLessItems` (buffer 2 หรือ 1) | `surroundingPageCount` = 2, `marginPageCount` = 1 | หาไม่พบ | `siblingCount` = 1 |
| ปุ่มหน้าแรก/สุดท้าย | ไม่มี | ไม่มีปุ่ม (ใช้ช่องกรอกแทน) | ไม่มีปุ่ม (แต่โชว์เลขแรก/ท้ายเสมอ) | หาไม่พบ | มี ใน variant Advanced |
| แกนขนาด | ไม่มี | 3 ขั้น (24 / 32 / 40) | 1 ขั้น (32) | หาไม่พบ | 1 ขั้น (36) |
| ความสูงปุ่มจริง | 28px (เฉพาะ type table) | 24 / 32 / 40 px | 32px | หาไม่พบ | 36px |
| ช่องไฟระหว่างปุ่มเลข | ไม่มีเลข, ปุ่มติดกัน | 4 / 8 / 12 px ตามขนาด | 4px | หาไม่พบ | 2px |
| ทรงปุ่มและมุมโค้ง | ตาม Button | สี่เหลี่ยมมุมมน 6px | สี่เหลี่ยมมุมมน 6px | หาไม่พบ | มุมมน 8px หรือวงกลม |
| จัตุรัสตายตัว | ตายตัว 28x28 | ไม่, ขยายตามหลัก | ไม่, ขยายตามหลัก | หาไม่พบ | **ตายตัว 36x36** |
| markup | `<nav>` + `<button>` | `<ul>` + `<li role=button>` | `<nav>` + `<a>` | หาไม่พบ | `<nav>` + `<button>` |
| `aria-current="page"` | ไม่มี (ไม่มีหน้าปัจจุบัน) | มี | มี | หาไม่พบ | มี |

---

### 2. รายละเอียดรายเจ้า

### 2.1 Shopify Polaris

ที่มา `[สำรวจ]` `polaris-react/src/components/Pagination/Pagination.tsx` + `Pagination.module.css` + `polaris-tokens/src/size.ts` (main branch, อ่าน 2026-10-12)

- **ชนิดที่มี:** ก่อนหน้า/ถัดไป เท่านั้น **ไม่มีเลขหน้าเลย** ไม่มีโหลดเพิ่ม ไม่มีเลื่อนไม่สิ้นสุด
- **แยกตาราง:** แยกด้วย prop `type: 'page' | 'table'` · `page` ใช้ `ButtonGroup variant="segmented"` · `table` ห่อในกล่องพื้นหลัง secondary แล้วจัดกลางด้วย `InlineStack`
- **ส่วนประกอบ:** ลูกศรซ้ายขวา (chevron) · `label` ข้อความกลางสำหรับบอกช่วง · tooltip ต่อปุ่ม · ไม่มีตัวเลือกจำนวนต่อหน้า ไม่มีจุดไข่ปลา
- **จุดไข่ปลา:** ไม่มี
- **สูตรจำนวนเลข:** ไม่มี เพราะไม่มีเลขหน้า
- **ปุ่มหน้าแรก/สุดท้าย:** ไม่มี · มีแต่คีย์ลัด `nextKeys` / `previousKeys`
- **แกนขนาด:** ไม่มีแกนขนาด · ปุ่มใน `type="table"` ตั้ง `--button-min-height: var(--p-height-700)` แล้วใช้ค่านี้ทั้ง height, width, min-height, min-width → **28x28 px** (`height-700` ชี้ `size.700` = `28px`) `[สำรวจ]`
- **ช่องไฟ:** `.TablePaginationActions { gap: var(--p-space-025) }` = **1px** (`space-025` ชี้ `size.025` = `1px`) · ส่วน `type="page"` ใช้ ButtonGroup แบบ segmented คือปุ่มติดกันไม่มีช่องไฟ `[สำรวจ]`
- **ทรงปุ่ม:** CSS ไฟล์นี้ตั้ง `border: none !important` และไม่ประกาศ `border-radius` เอง มุมโค้งมาจาก component Button `[ตีความ]`
- **จัตุรัส:** ตายตัว 28x28 เพราะ fix ทั้ง width และ height · ไม่มีปัญหาเลข 3 หลักเพราะไม่มีเลข
- **สถานะ:** disabled เมื่อ `!hasPrevious` / `!hasNext` · ไม่มีสถานะหน้าปัจจุบัน
- **ลูกศรสุดทาง:** disabled ไม่ซ่อน
- **markup:** `<nav aria-label>` ครอบ Button (`<button>`) · `label` มี `aria-live="polite"` เฉพาะ type page · ไม่ใช้ `aria-current`
- **จอแคบ:** ไม่มีกฎ responsive ใน CSS ของ component นี้
- **ข้อสังเกตสำหรับเรา** `[ตีความ]` Polaris เลือกตัดเลขหน้าออกทั้งระบบ เพราะ UI แบบ cursor paging ไม่รู้จำนวนหน้ารวม ถ้าระบบข่าวเรารู้จำนวนหน้าชัดเจน แนวนี้ใช้อ้างได้แค่ส่วน prev/next

### 2.2 Ant Design

ที่มา `[สำรวจ]` `components/pagination/style/index.ts`, `components/pagination/Pagination.tsx`, `components/theme/themes/seed.ts`, `react-component/pagination` `src/Pagination.tsx` + `src/Pager.tsx` (master, อ่าน 2026-10-12)

- **ชนิดที่มี:** เลขหน้าพร้อม prev/next (หลัก) · `simple` แบบย่อเหลือช่องกรอก · ไม่มีโหลดเพิ่ม ไม่มีเลื่อนไม่สิ้นสุด
- **แยกตาราง:** ไม่แยก Table ใช้ Pagination ตัวเดียวกันผ่าน prop `pagination`
- **ส่วนประกอบ:** prev/next · เลขหน้า · jump-prev/jump-next (จุดไข่ปลา) · size changer เลือกจำนวนต่อหน้า · quick jumper ช่องกรอกเลขหน้า · `total-text` ข้อความบอกช่วง
- **จุดไข่ปลากดได้:** **กดได้** เป็น `<li role="button" tabIndex={0}>` กระโดด `current ± 5` หน้า (เป็น `± 3` เมื่อ `showLessItems`) มี `aria-label` ว่า prev_5 / next_5 `[สำรวจ]`
- **สูตรจำนวนเลข:** `pageBufferSize = showLessItems ? 1 : 2` · ถ้า `allPages <= 3 + pageBufferSize * 2` (คือ 7 ปกติ หรือ 5 เมื่อ showLessItems) โชว์ครบทุกหน้า · เกินกว่านั้นโชว์ `current ± pageBufferSize` บวกหน้าแรกและหน้าสุดท้าย แล้วแทรกจุดไข่ปลาตรงช่องว่าง `[สำรวจ]`
- **ค่าเริ่มต้นอื่น:** `defaultPageSize` 10 · `defaultCurrent` 1 · `showPrevNextJumpers` true · `showSizeChanger` เปิดเองเมื่อ `total > 50`
- **ปุ่มหน้าแรก/สุดท้าย:** ไม่มีปุ่มแยก ใช้ quick jumper แทน
- **แกนขนาด 3 ขั้น** `[สำรวจ]` CSS ประกาศตัวแปร `--ant-pagination-item-size-actual` ต่อขั้น
  - small `itemSizeSM = controlHeightSM` = **24px**
  - default `itemSize = controlHeight` = **32px** (`seed.ts` ตั้ง `controlHeight: 32`)
  - large `itemSizeLG = controlHeightLG` = **40px**
  - prop `size` ที่เปิดให้ใช้จริงคือ `small` กับค่าว่าง (default) · ชั้น `-large` มีใน CSS แต่ไม่ใช่ทางเลือกหลักในเอกสาร `[ตีความ]`
- **ช่องไฟ** `[สำรวจ]` ใช้ `margin-inline-end` ต่อ item จากตัวแปร `--ant-pagination-item-spacing-actual`
  - default = `marginXS` = **8px**
  - small = `marginXXS` = **4px**
  - large = `marginSM` = **12px**
  - ไม่มีช่องไฟ "ระหว่างกลุ่ม" แยก เพราะทุกชิ้น (total-text, prev, เลข, next, options) ใช้ระยะเดียวกันหมด
- **ทรงปุ่ม:** สี่เหลี่ยมมุมมน `borderRadius` = **6px** (`seed.ts`) · variant `-simple` ตั้ง `borderRadius: 0` บางส่วน
- **จัตุรัสเสมอหรือไม่:** **ไม่** ตั้ง `min-width` = item-size และ `height` = item-size แล้วเติม `paginationItemPaddingInline = marginXXS * 1.5` = **6px** → เลข 3 หลักกล่องยืดกว้างออก สูงคงที่ `[สำรวจ]`
- **สถานะ:** default, hover, active (หน้าปัจจุบัน ใช้ `itemActiveColor = colorPrimary` กับขอบสี primary), disabled, focus-visible (เรียก `genFocusOutline`) · หน้าปัจจุบันบอกด้วยสีตัวอักษรกับสีขอบ ไม่ใช่พื้นทึบ
- **ลูกศรสุดทาง:** disabled ไม่ซ่อน
- **markup:** `<ul class="ant-pagination">` ครอบ `<li role="button" tabIndex={0} aria-label aria-current="page">` ที่ข้างในมี `<a rel="nofollow">` · **ไม่ห่อ `<nav>`** `[สำรวจ]`
- **จอแคบ:** prop `responsive` (ค่าเริ่มต้นเปิด) เช็ค breakpoint `xs` แล้วสลับเป็น small อัตโนมัติ `[สำรวจ]`
- **ข้อสังเกตสำหรับเรา** `[ตีความ]` เจ้านี้เป็นเจ้าเดียวใน 5 เจ้าที่ทำจุดไข่ปลาให้กดได้ และเป็นเจ้าเดียวที่ผูกขนาดปุ่มเข้ากับ `controlHeight` ตัวเดียวกับ input/button ทั้งระบบ ตรงกับแนวสูตรสเกลที่ CLAUDE.md บังคับ

### 2.3 GitHub Primer

ที่มา `[สำรวจ]` `@primer/react` `src/Pagination/Pagination.tsx` + `Pagination.module.css` และ primer.style/components/pagination (main, อ่าน 2026-10-12)

- **ชนิดที่มี:** เลขหน้าพร้อม prev/next · ตั้ง `showPages={false}` ได้เหลือแค่ prev/next · ไม่มีโหลดเพิ่ม ไม่มีเลื่อนไม่สิ้นสุด
- **แยกตาราง:** แยก มี TablePagination ใน DataTable ใช้ CSS ไฟล์เดียวกัน (คลาส `.TablePaginationSteps`) `[สำรวจ]`
- **ส่วนประกอบ:** prev/next (ไอคอน chevron คู่กับคำว่า Previous/Next) · เลขหน้า · จุดไข่ปลา · ไม่มีตัวเลือกจำนวนต่อหน้า · TablePagination มีข้อความบอกช่วง
- **จุดไข่ปลากดได้:** **กดไม่ได้** CSS จับ `[aria-hidden]` และ `[role='presentation']` ให้สี `--fgColor-disabled` กับ `cursor: default` และพื้นโปร่ง `[สำรวจ]`
- **สูตรจำนวนเลข:** `marginPageCount = 1` (จำนวนหน้าที่ตรึงไว้หัวและท้ายเสมอ) · `surroundingPageCount = 2` (จำนวนหน้าสองข้างของหน้าปัจจุบัน) · `showPages = true` · หน้าแรกและหน้าสุดท้ายโชว์เสมอ `[สำรวจ]`
- **ปุ่มหน้าแรก/สุดท้าย:** ไม่มีปุ่มสัญลักษณ์ แต่เลขหน้าแรกกับหน้าสุดท้ายอยู่ครบจาก `marginPageCount`
- **แกนขนาด:** **ขั้นเดียว** `min-width: 32px` และ `height: 32px` พร้อมคอมเมนต์ในโค้ดว่า `primer.control.medium.size` `[สำรวจ]`
- **ช่องไฟ:** `margin-right: var(--base-size-4)` = **4px** ต่อชิ้น และ `.Page:last-child { margin-right: 0 }` · ไอคอนลูกศรเว้นจากคำ 4px (`margin-inline-start/end: var(--base-size-4)`) · ไม่มีช่องไฟระหว่างกลุ่มแยก ทุกชิ้นเว้น 4px เท่ากัน `[สำรวจ]`
- **ทรงปุ่ม:** สี่เหลี่ยมมุมมน `border-radius: var(--borderRadius-medium)` = 6px ตาม Primer primitives `[ตีความ]` ค่าตัวเลขอ่านจาก primitives ไม่ใช่ไฟล์นี้
- **จัตุรัสเสมอหรือไม่:** **ไม่** `min-width: 32px` ร่วมกับ `padding: 8px calc((32 - 20) / 2)` คือ padding แนวนอน **6px** → เลข 3 หลักกล่องยืดกว้าง สูงคงที่ 32 `[สำรวจ]`
- **สถานะ:** hover และ focus (พื้น `--control-transparent-bgColor-hover`) · focus-visible `outline: 2px solid` พร้อม `outline-offset: -2px` · active (เปลี่ยนสีขอบ) · prev/next ใช้สี `--fgColor-accent` · **หน้าปัจจุบันบอกด้วย `[aria-current]`** ที่เปลี่ยนเป็นพื้น `--bgColor-accent-emphasis` ตัวอักษร `--fgColor-onEmphasis` และ focus-visible เพิ่ม `box-shadow: inset 0 0 0 3px` `[สำรวจ]`
- **ลูกศรสุดทาง:** ไม่ซ่อน แต่เปลี่ยนเป็น `<span>` ที่มี `aria-hidden` หรือ `role="presentation"` แล้วแสดงสี disabled `[ตีความ]` อ่านจาก selector ใน CSS
- **markup:** `<nav aria-label="Pagination" data-component="Pagination">` ครอบ `<div class="TablePaginationSteps">` แล้วแต่ละชิ้นเป็น `<a>` โดยค่าเริ่มต้น (`props.as || 'a'`) ชิ้นที่กดไม่ได้เป็น `span` · ใช้ `aria-current` `[สำรวจ]`
- **จอแคบ:** `showPages` รับ object แบบ responsive (`narrow` / `regular` / `wide`) แล้วเขียนลง `data-hidden-viewport-ranges` · CSS ซ่อนลูกทุกตัวยกเว้นตัวแรกและตัวสุดท้าย (คือเหลือแค่ prev/next) และล้าง margin ของสองตัวที่เหลือ `[สำรวจ]`
- **ข้อสังเกตสำหรับเรา** `[ตีความ]` วิธีย่อบนจอแคบของ Primer คือ "ซ่อนลูกกลาง ด้วย CSS ตาม breakpoint" ไม่ต้องเปลี่ยนโครง DOM เป็นแพตเทิร์นที่ลอกมาทำใน Figma ได้ง่าย (variant แคบ = ซ่อนเลขทั้งแถว)

### 2.4 SLDS (Salesforce Lightning Design System)

**หาไม่พบ** ไม่มี component หรือ blueprint ชื่อ Pagination ใน SLDS ทั้ง SLDS 1 และ SLDS 2

- `[สำรวจ]` GitHub issue `salesforce-ux/design-system#529` ที่ขอให้เพิ่ม pagination component ได้คำตอบจากทีมเมื่อ 2026-01-19 (ปีตามที่หน้า issue แสดง) แค่ว่า "จะเอาไปคุยกันในทีมว่าเป็นแพตเทิร์นที่อยากทำไหม" แล้ว **ถูกปิดอัตโนมัติด้วย stale bot วันที่ 2018-07-07** ไม่มีมติปฏิเสธหรือรับอย่างเป็นทางการ · repo ถูก archive เป็น read-only เมื่อ 2026-08-12
- `[แหล่งรอง]` เอกสาร `lightning-button-group` และ `lightning-datatable` บน developer.salesforce.com ยืนยันว่า datatable ไม่มี pagination ให้ และแนวทางที่นักพัฒนาใช้กันคือประกอบเองจาก Button Group blueprint แล้วเขียน logic เอง
- **ตอบคำถามข้อ 1 ถึง 14:** หาไม่พบทั้งหมด ไม่มีค่าขนาด ช่องไฟ มุมโค้ง หรือ markup ทางการให้อ้าง
- **ข้อสังเกตสำหรับเรา** `[ตีความ]` ตัดเจ้านี้ออกจากการอ้างอิง pagination ได้เลย ถ้าต้องการมุม enterprise ให้ใช้ Ant Design แทน

### 2.5 Untitled UI React (เจ้าที่ไฟล์ออกแบบเดิมของเราอ้าง)

ที่มา `[สำรวจ]` `untitleduico/react` `components/application/pagination/pagination.tsx` (493 บรรทัด) + `pagination-base.tsx` (main, อ่าน 2026-10-12) ค่า px แปลงจากคลาส Tailwind มาตรฐาน (`size-9` = 2.25rem = 36px, `gap-0.5` = 2px, `gap-2` = 8px, `gap-3` = 12px, `gap-4` = 16px, `rounded-lg` = 8px, `p-3` = 12px)

- **ชนิดที่มี:** เลขหน้าพร้อม prev/next ทุก variant · ไม่มีโหลดเพิ่ม ไม่มีเลื่อนไม่สิ้นสุด · มีตัวบอกตำแหน่งแบบ carousel แยกอีก 2 ตัว (`PaginationDot`, `PaginationLine` รับ prop `size` md กับ lg และ flag `framed`)
- **โครงที่เขาวาง (ข้อนี้ละเอียดเป็นพิเศษ):** แยก logic ออกจากหน้าตาสองไฟล์
  - `pagination-base.tsx` = headless มี `Pagination.Root` (คำนวณรายการหน้า, ให้ context) · `Pagination.Context` (render prop ส่ง `pages`, `currentPage`, `total`) · `Pagination.Item` · `Pagination.Ellipsis` · `Pagination.PrevTrigger` · `Pagination.NextTrigger` โดย trigger รองรับ `asChild` เพื่อยืมปุ่มจาก DS มาใช้
  - `pagination.tsx` = 6 variant สำเร็จ `PaginationPageDefault` · `PaginationPageMinimalCenter` · `PaginationCardDefault` · `PaginationCardMinimal` · `PaginationButtonGroup` · `PaginationCardAdvanced`
- **แยกตาราง:** แยกเชิง variant ชุด `Card*` ตั้ง `border-t border-secondary px-4 py-3 md:px-6 md:pt-3 md:pb-4` คือออกแบบให้เป็นแถบท้ายการ์ด/ตาราง ส่วนชุด `Page*` ตั้ง `border-t pt-4 md:pt-5` ใช้ท้ายรายการเนื้อหา `[สำรวจ]`
- **ส่วนประกอบ:** prev/next · เลขหน้า · จุดไข่ปลา · Select จำนวนต่อหน้า (ตัวเลือก 10, 25, 50, 100) · ข้อความ "Page X of Y" · ช่องกรอกเลขหน้าใน Advanced · ปุ่มหน้าแรก/สุดท้ายใน Advanced
- **จุดไข่ปลากดได้:** **กดไม่ได้** `Pagination.Ellipsis` เป็นกล่องแสดงผลเฉย ๆ ขนาด `size-9` สี `text-tertiary` และใน variant ButtonGroup ยังเติม `pointer-events-none` ทับอีกชั้น · เอกสารระบุว่าใส่ `aria-hidden` `[สำรวจ]`
- **สูตรจำนวนเลข:** `siblingCount` ค่าเริ่มต้น **1** · ตัวแปรกลางคือ `totalPageNumbers = siblingCount * 2 + 5` = **7** · ถ้า `totalPageNumbers >= total` โชว์ครบทุกหน้าไม่มีจุดไข่ปลา · ถ้าเกิน แยก 3 กรณี (จุดไข่ปลาขวาเดียว, ซ้ายเดียว, สองข้าง) โดยกรณีข้างเดียวโชว์ `siblingCount * 2 + 3` = 5 หน้าติดกันแล้วต่อจุดไข่ปลาและหน้าปลาย `[สำรวจ]`
- **ปุ่มหน้าแรก/สุดท้าย:** **มี** เฉพาะ `PaginationCardAdvanced` ใช้ไอคอน `ChevronLeftDouble` / `ChevronRightDouble` วางเป็นคู่กับลูกศรทีละหน้า และ disabled เมื่อ `page === 1` หรือ `page === total` `[สำรวจ]`
- **แกนขนาด: ขั้นเดียว** ปุ่มเลขทุก variant ตั้ง `size-9` ตรง ๆ = **36x36 px** ไม่มี prop size ให้ปรับ · ปุ่มลูกศรรอบนอกยืม `Button size="sm"` จาก DS · ButtonGroup variant ก็ตั้ง `size="sm"` แล้วบังคับ `size-9` ที่ item `[สำรวจ]`
- **ช่องไฟจริง** `[สำรวจ]`
  - ระหว่างปุ่มเลข `gap-0.5` = **2px** (ทุก variant ที่โชว์เลขเป็นแถว)
  - variant `PaginationButtonGroup` = **0** ปุ่มติดกันเป็นแถบเดียว และจุดไข่ปลาตั้ง `rounded-none!`
  - ระหว่างกลุ่มใหญ่ (prev, เลข, next) `gap-3` = **12px** ที่ `Pagination.Root`
  - ในกลุ่มลูกศรคู่ของ Advanced `gap-2` = **8px**
  - ระหว่างกลุ่มลูกศรกับแถวเลขใน Advanced `gap-4` = **16px**
  - ระยะบนจากเส้นคั่น `pt-4` = 16px และ `md:pt-5` = 20px (ชุด Page) · ชุด Card ใช้ `px-4 py-3` = 16/12px และ `md:px-6 md:pt-3 md:pb-4` = 24/12/16px
  - เส้นคั่นแนวตั้งใน Advanced `h-4 w-px` คือสูง 16px หนา 1px เว้นข้าง `mx-1` = 4px
- **ทรงปุ่ม:** prop `rounded` เป็น boolean · false = `rounded-lg` = **8px** · true = `rounded-full` = **วงกลม** `[สำรวจ]`
- **จัตุรัสเสมอหรือไม่:** **จัตุรัสตายตัว** `size-9` ล็อกทั้งกว้างและสูงที่ 36px พร้อม `p-3` (12px รอบด้าน) `[สำรวจ]` → `[ตีความ]` **เลข 3 หลักขึ้นไปจะล้นกล่อง** เพราะพื้นที่เนื้อหาเหลือแค่ 36 ลบ 24 = 12px ขณะที่เลข 3 หลักที่ `text-sm` กว้างราว 24px เขาไม่ได้ทำ `min-w` หรือ padding ยืดไว้ นี่คือจุดที่ไฟล์ออกแบบของเราไม่ควรลอกตามตรง
- **สถานะ:** hover (`bg-primary_hover` + `text-secondary`) · focus-visible (`outline-2 outline-offset-2 outline-focus-ring` พร้อม `z-10`) · selected คือหน้าปัจจุบัน ใช้สีเดียวกับ hover (`bg-primary_hover text-secondary`) · disabled อยู่ที่ trigger ไม่ใช่ที่ปุ่มเลข · transition `duration-100 ease-linear` `[สำรวจ]`
  - `[ตีความ]` หน้าปัจจุบันกับ hover ใช้โทนเดียวกัน แยกกันไม่ออกด้วยตาเวลาเมาส์อยู่บนปุ่มอื่น เป็นจุดอ่อนที่ควรแก้ตอนทำของเรา
- **ลูกศรสุดทาง:** **disabled ไม่ซ่อน** `Trigger` คำนวณ `isDisabled` จาก `currentPage <= 1` และ `currentPage >= total` แล้วส่ง `disabled` กับ `isDisabled` ลงลูกผ่าน `cloneElement` `[สำรวจ]`
- **markup:** `<nav aria-label="Pagination Navigation">` ที่ `Pagination.Root` · ปุ่มเป็น `<button>` จริง (หรือ clone ปุ่ม DS ด้วย `asChild`) · มี `aria-current="page"` และ `aria-label` ต่อปุ่ม · trigger มี `aria-label` ค่าเริ่มต้น "Previous Page" / "Next Page" `[สำรวจ]`
- **จอแคบ:** ใช้ Tailwind `md:` สลับโครงทั้งก้อน `[สำรวจ]`
  - แถวเลขหน้าทั้งแถวซ่อน (`hidden ... md:flex`) แล้วโชว์ข้อความ "Page X of Y" แทน
  - ปุ่ม prev/next เปลี่ยนจาก `color="link-gray"` มีคำ เป็น `color="secondary"` ไอคอนเปล่าไม่มีคำ (คุมด้วย hook `useBreakpoint("md")` ว่าจะส่ง children เป็นคำหรือ undefined)
  - `MobilePagination` เป็น component แยกสำหรับ variant CardMinimal จัด `justify-between` ลูกศรซ้ายขวาสุด ข้อความกลาง
  - Select จำนวนต่อหน้าและช่องกรอกเลขหน้าซ่อนบนจอแคบทั้งคู่

---

### 3. Design implications สำหรับ NTGDS

1. `[ตีความ]` **ความสูงปุ่มที่ควรเลือก** 5 เจ้าให้ตัวเลข 24/28/32/36/40 ถ้าจะทำแกนขนาดจริง สูตร `base + i x step` ที่เข้ากับของเราคือ base 32 step 8 (sm 32, md 40) หรืออิง `controlHeight` ของระบบเราแบบที่ Ant ทำ ไม่ควรตั้ง 36 ลอยแบบ Untitled UI เพราะหลุดจากสเกลปุ่มที่มีอยู่
2. `[ตีความ]` **ช่องไฟ** ค่าที่เจอคือ 1, 2, 4, 8, 12 px ตรงกับ SPACE_SCALE ของเราทุกตัว ถ้าทำแกนขนาดควรให้ช่องไฟขยับตามขนาดแบบ Ant (4/8/12) ไม่ใช่ตรึง 2px ทุกขนาดแบบ Untitled UI
3. `[ตีความ]` **ห้ามทำปุ่มจัตุรัสตายตัว** Primer และ Ant ใช้ `min-width` คู่กับ padding แนวนอนเพื่อให้เลข 3 หลักยืดได้ ข่าวของเรามีหมวดที่หน้าทะลุ 100 หน้าได้จริง จึงต้องใช้แนว min-width ไม่ใช่ fixed size
4. `[ตีความ]` **จุดไข่ปลา** 3 ใน 4 เจ้าที่มีเลขหน้าทำให้กดไม่ได้ ถ้าเราทำให้กดได้แบบ Ant ต้องออกแบบสถานะ hover และ aria-label กำกับด้วย ไม่ใช่แค่วางจุด 3 จุด
5. `[ตีความ]` **จอแคบ** แพตเทิร์นที่ตรงกันทั้ง Primer กับ Untitled UI คือซ่อนเลขหน้าแล้วเหลือ prev/next (Untitled UI เติมข้อความ "Page X of Y") ควรทำเป็น variant แยกในไฟล์ออกแบบ ไม่ใช่แค่ย่อขนาด
6. `[ตีความ]` **จำนวนเลขที่โชว์** ค่าที่ทั้ง 3 เจ้าตั้งใกล้กันคือหน้าปัจจุบันบวกลบ 1 ถึง 2 รวมทั้งแถวราว 7 ถึง 9 ช่อง ใช้ 7 ช่อง (sibling 1) เป็นค่าเริ่มต้นได้โดยไม่ขัดใครเลย

### 4. Sources

- Shopify Polaris: `github.com/Shopify/polaris` `polaris-react/src/components/Pagination/Pagination.tsx`, `Pagination.module.css`, `polaris-tokens/src/size.ts`, `polaris-tokens/src/themes/base/height.ts`, `space.ts` (main, 2026-10-12)
- Ant Design: `github.com/ant-design/ant-design` `components/pagination/style/index.ts`, `components/pagination/Pagination.tsx`, `components/theme/themes/seed.ts` และ `github.com/react-component/pagination` `src/Pagination.tsx`, `src/Pager.tsx` (master, 2026-10-12)
- Primer: `github.com/primer/react` `packages/react/src/Pagination/Pagination.tsx`, `Pagination.module.css` และ `primer.style/components/pagination` (main, 2026-10-12)
- SLDS: `github.com/salesforce-ux/design-system/issues/529`, `developer.salesforce.com/docs/platform/lightning-component-reference/guide/lightning-button-group.html`, `developer.salesforce.com/docs/component-library/bundle/lightning-datatable/documentation`, `lightningdesignsystem.com/components/overview`
- Untitled UI: `github.com/untitleduico/react` `components/application/pagination/pagination.tsx`, `pagination-base.tsx` และ `untitledui.com/react/components/pagination` (main, 2026-10-12)

---

## 6. รายละเอียด Mantine · Chakra · Base Web · Zag · Gestalt


วันที่สำรวจ 2026-10-12 อ่านจากซอร์สที่เผยแพร่จริงบน unpkg (ไฟล์ build ของแพ็กเกจ) ไม่ได้อ่านจากเอกสารการตลาด

ป้ายที่มา
- `[สำรวจ]` อ่านจากโค้ดต้นทางหรือ CSS ที่แพ็กเกจส่งออกจริง
- `[แหล่งรอง]` ค่ามาตรฐานของธีมที่อ้างอิงต่อ (เช่น token ของธีมเริ่มต้น)
- `[ตีความ]` ผู้วิจัยคำนวณหรือสรุปเอง ไม่ใช่ตัวเลขที่เขียนไว้ตรง ๆ

เวอร์ชันที่อ่าน
- `@mantine/core` 9.7.2 · `@mantine/hooks` 9.7.2
- `@chakra-ui/react` 3.37.0
- `baseui` (Base Web) 18.2.0
- `@zag-js/pagination` 1.46.0 · `@ark-ui/react` 5.39.3 (Radix UI ไม่มี pagination)
- `gestalt` 177.0.12

---

### 1. ตารางสรุป 5 เจ้า

| หัวข้อ | Mantine 9.7.2 | Chakra UI 3.37.0 | Base Web 18.2.0 | Zag/Ark 1.46 | Gestalt 177 |
|---|---|---|---|---|---|
| มี component | มี ครบชุด มีสไตล์ให้ | มี แต่ไม่มีสไตล์ประจำ ต้องประกอบกับ Button | มี แต่เป็นทรงดรอปดาวน์ | มี แต่เป็น headless ไม่มีสไตล์ | ไม่มี |
| ชนิด | ตัวเลขหน้า + ก่อนหน้าถัดไป + หน้าแรกสุดท้าย | ตัวเลขหน้า + ก่อนหน้าถัดไป | ดรอปดาวน์เลือกหน้า + ก่อนหน้าถัดไป | ตัวเลขหน้า + ก่อนหน้าถัดไป + หน้าแรกสุดท้าย | ไม่มี (ใช้ Masonry กับ ScrollFetch แทน) |
| แยกของตารางออกจากของรายการ | ไม่แยก | ไม่แยก | ไม่แยก | ไม่แยก | ไม่มี |
| จุดไข่ปลา | มี กดไม่ได้ (`pointer-events: none`) | มี กดไม่ได้ (เรนเดอร์เป็น `span`) | ไม่มี | มี เป็น part แยก ไม่ผูก onClick | ไม่มี |
| ตัวเลือกจำนวนต่อหน้า | ไม่มี | ไม่มี UI ให้ (มี API `setPageSize`) | ไม่มี | ไม่มี UI ให้ (มี `setPageSize`) | ไม่มี |
| ข้อความบอกช่วง | มี `Pagination.Label` | มี `Pagination.PageText` 3 รูปแบบ | มี ป้าย "of N" | ไม่มี part แต่คืน `pageRange` | ไม่มี |
| ปุ่มหน้าแรกหน้าสุดท้าย | มี เปิดด้วย `withEdges` | ไม่ห่อออกมาให้ | ไม่มี | มี `firstTrigger` กับ `lastTrigger` | ไม่มี |
| แกนขนาด | 5 ขั้น xs ถึง xl | 7 ขั้น (มาจาก Button) | 4 ขั้น (มาจาก Button) | ไม่มี | ไม่มี |
| ความสูงปุ่ม md | 32 px | 40 px | 48 px (default) | ไม่กำหนด | ไม่มี |
| ช่องไฟระหว่างปุ่มเลข | 8 px | 8 px | ไม่มีแถวเลข | ไม่กำหนด | ไม่มี |
| ทรงปุ่ม | สี่เหลี่ยมมุมมน 4 px มีเส้นขอบ 1 px | สี่เหลี่ยมมุมมน 4 px | สี่เหลี่ยมมุมมน 8 px (mini 4 px) | ไม่กำหนด | ไม่มี |
| จัตุรัสหรือยืดตามหลัก | ยืดได้ (`min-width`) | ยืดได้ (`minW`) | ไม่เกี่ยว | ไม่กำหนด | ไม่มี |
| หน้าปัจจุบัน | `data-active` + `aria-current="page"` | `_selected` + `aria-current="page"` | ค่าที่เลือกในดรอปดาวน์ | `data-selected` + `aria-current="page"` | ไม่มี |
| ลูกศรสุดทาง | disabled (จาง 0.4) | disabled | disabled | disabled หรือ `aria-disabled` | ไม่มี |
| markup | `div` + `button` ไม่มี `nav`/`ul` | `div` + `button` ไม่มี `nav`/`ul` | `div` + `button` + Select | `div` + `button` หรือ `a` เลือกได้ | ไม่มี |

---

### 2. รายละเอียดรายเจ้า

### 2.1 Mantine 9.7.2

ไฟล์ที่อ่าน
- `@mantine/core/styles/Pagination.css`
- `@mantine/core/esm/components/Pagination/*.mjs`
- `@mantine/hooks/esm/use-pagination/use-pagination.mjs`

- **ชนิด** มีแบบตัวเลขหน้าเป็นหลัก ประกอบจาก `Pagination.First` `Previous` `Items` `Next` `Last` `Dots` `Label` ไม่มีโหลดเพิ่มหรือเลื่อนไม่สิ้นสุด [สำรวจ]
- **แกนขนาด 5 ขั้น** ความสูงกับความกว้างต่ำสุดเท่ากัน อ่านจากตัวแปรใน CSS ตรง ๆ [สำรวจ]
  - xs `1.375rem` = **22 px** · sm `1.625rem` = **26 px** · md `2rem` = **32 px** (ค่าเริ่มต้น) · lg `2.375rem` = **38 px** · xl `2.75rem` = **44 px**
  - ในไฟล์เดียวกันมีชุดที่สองชื่อ `--pagination-control-size-input-*` = 30 · 36 · 42 · 50 · 60 px แต่ `PaginationRoot` ไม่ได้อ้างชุดนี้ [สำรวจ]
- **ช่องไฟ** prop `gap` ค่าเริ่มต้น **8** (ส่งเข้า `Group`) และเฟรมกลุ่มตัวเลขตั้ง `gap: inherit` แปลว่า **ช่องไฟระหว่างปุ่มเลข 8 px เท่ากับช่องไฟระหว่างกลุ่ม** ไม่ได้แยกสองค่า [สำรวจ]
- **ทรงปุ่ม** สี่เหลี่ยมมุมมน `border-radius: var(--pagination-control-radius, var(--mantine-radius-default))` ซึ่ง `defaultRadius` ของธีมคือ sm = 4 px [สำรวจ + แหล่งรอง] · มีเส้นขอบ 1 px รอบทุกปุ่ม
- **จัตุรัสหรือยืด** ใช้ `height` คู่กับ `min-width` ไม่ใช่ `width` ปุ่มเลขจึงยืดได้เมื่อเลขยาว และปุ่มเลขมี `padding: calc(var(--pagination-control-size) / 4)` (md = 8 px สองข้าง) ส่วนปุ่มลูกศรตั้ง `withPadding={false}` ไม่มี padding [สำรวจ] · เลข 3 หลักขึ้นไปจึงกว้างกว่าสูง ไม่ตัดคำเพราะ `line-height: 1`
- **สูตรโชว์เลขกี่ตัว** prop `siblings` เริ่มต้น **1** · `boundaries` เริ่มต้น **1** [สำรวจ] สูตรจริงจาก `usePagination`
  - เงื่อนไขโชว์ครบทุกหน้า `siblings * 2 + 3 + boundaries * 2 >= total`
  - `leftSiblingIndex = max(active - siblings, start + boundaries - 1)`
  - `rightSiblingIndex = min(active + siblings, end - boundaries)`
  - โชว์จุดไข่ปลาซ้ายเมื่อ `leftSiblingIndex > start + boundaries + 1` · ขวาเมื่อ `rightSiblingIndex < end - (boundaries + 1)`
  - กรณีมีจุดไข่ปลาขวาข้างเดียว จำนวนเลขฝั่งซ้าย `leftItemCount = siblings * 2 + boundaries + 2`
  - กรณีมีจุดไข่ปลาซ้ายข้างเดียว จำนวนเลขฝั่งขวา `rightItemCount = boundaries + 1 + 2 * siblings`
  - ค่าเริ่มต้น siblings 1 boundaries 1 จึงได้สูงสุด 7 ช่อง ตัวอย่าง `1 ... 4 5 6 ... 10` [ตีความ จากสูตร]
- **ปุ่มหน้าแรกหน้าสุดท้าย** มี เปิดด้วย `withEdges` (ค่าเริ่มต้นปิด) · `withControls` ค่าเริ่มต้นเปิด [สำรวจ]
- **จุดไข่ปลา กดไม่ได้** คลาสจุดไข่ปลาตั้ง `pointer-events: none` และเรนเดอร์เป็น `Box` ไม่ใช่ปุ่ม [สำรวจ]
- **สถานะ** hover (`gray-0` โหมดสว่าง) · active ที่หน้าปัจจุบัน (พื้น `--pagination-active-bg` = สีหลักของธีม) · disabled `opacity: 0.4` + `cursor: not-allowed` · บนอุปกรณ์ที่ไม่มี hover สลับไปใช้ `:active` แทน [สำรวจ]
- **ลูกศรสุดทาง** disabled ไม่ซ่อน (`type === 'next' ? active === total : active === 1`) [สำรวจ]
- **markup** รากเป็น `div` · ทุกปุ่มมาจาก `UnstyledButton` จึงเป็น `<button>` · ปุ่มหน้าปัจจุบันใส่ `aria-current="page"` · **ไม่มี `<nav>` และไม่มี `<ul>`** [สำรวจ]
- **จอแคบ** มีโหมด `layout="responsive"` ที่ตั้ง `container-type: inline-size` แล้วใช้ container query `@container (width <= 400px)` ซ่อนแถวตัวเลขทั้งแถว แล้วโชว์ป้ายข้อความแทน รูปแบบเริ่มต้น `Page {page} of {totalPages}` [สำรวจ]
- **ขนาดไอคอนในลูกศร** `calc(var(--pagination-control-size) / 1.8)` (md ได้ราว 17.8 px) [สำรวจ]

### 2.2 Chakra UI 3.37.0

ไฟล์ที่อ่าน
- `dist/esm/components/pagination/pagination.js`
- `dist/esm/theme/recipes/button.js` และ `dist/esm/theme/slot-recipes.js`
- `dist/esm/components/group/group.js`
- `dist/esm/theme/tokens/radius.js` และ `dist/esm/theme/semantic-tokens/radii.js`

- **ฐานคือ Zag** นำเข้า `Pagination` จาก `@ark-ui/react/pagination` ตรง ๆ สูตรคำนวณจึงเป็นของ Zag ทั้งหมด (ดูข้อ 2.4) [สำรวจ]
- **ไม่มีสไตล์ประจำ** ไฟล์ `theme/slot-recipes.js` ไม่มีรายการ `pagination` เลย (ไล่รายการนำเข้าทั้งไฟล์แล้ว) แม้โค้ดจะเรียก `createSlotRecipeContext({ key: "pagination" })` ไว้ แปลว่าหน้าตาทั้งหมดมาจาก `ButtonGroup` กับ `IconButton` ที่เอามาประกอบ [สำรวจ]
- **ส่วนที่ Chakra ห่อออกมา** `Root` `RootProvider` `Item` `Items` `Ellipsis` `PrevTrigger` `NextTrigger` `PageText` `Context` `PropsProvider` · **ไม่ห่อ `FirstTrigger` และ `LastTrigger`** ทั้งที่ Ark มีให้ ถ้าต้องการต้องเรียกจาก Ark เอง [สำรวจ]
- **แกนขนาด 7 ขั้น** มาจาก recipe ของ Button (`h` กับ `minW` เท่ากันทุกขั้น) หน่วย Chakra 1 = 0.25rem [สำรวจ + ตีความ แปลงหน่วย]

  | ขั้น | h/minW | px | px แนวนอน | ขนาดไอคอน |
  |---|---|---|---|---|
  | 2xs | 6 | **24** | 8 | 14 |
  | xs | 8 | **32** | 10 | 16 |
  | sm | 9 | **36** | 14 | 16 |
  | md | 10 | **40** | 16 | 20 |
  | lg | 11 | **44** | 20 | 20 |
  | xl | 12 | **48** | 20 | 20 |
  | 2xl | 16 | **64** | 28 | 24 |

- **ช่องไฟ** `Group` ตั้ง `gap: var(--group-gap, 0.5rem)` = **8 px** เป็นค่าเริ่มต้น และถ้าใช้โหมด `attached` จะบังคับ `gap: 0!` ให้ปุ่มติดกัน [สำรวจ] · ไม่มีการแยกช่องไฟระหว่างกลุ่มออกจากระหว่างเลข เพราะทั้งแถวอยู่ใน `ButtonGroup` เดียว
- **ทรงปุ่ม** `borderRadius: "l2"` ซึ่ง `l2` ชี้ `radii.sm` = `0.25rem` = **4 px** · มี `borderWidth: 1px` สีโปร่ง [สำรวจ]
- **จัตุรัสหรือยืด** ใช้ `minW` ไม่ใช่ `w` บวก `px` ตามขั้น ปุ่มจึงเป็นจัตุรัสที่เลขหลักเดียวแล้วยืดออกเมื่อเลขยาว และมี `whiteSpace: nowrap` กันตัดบรรทัด [สำรวจ]
- **จุดไข่ปลา** ค่าเริ่มต้นเรนเดอร์ `IconButton as="span"` ใส่ `EllipsisIcon` จึงหน้าตาเหมือนปุ่มแต่ **กดไม่ได้** เพราะเป็น `span` [สำรวจ]
- **ข้อความบอกช่วง** `Pagination.PageText` มี 3 รูปแบบ ค่าเริ่มต้น `compact` [สำรวจ]
  - `short` = `"{page} / {totalPages}"` · `compact` = `"{page} of {totalPages}"` · อย่างอื่น = `"{start+1} - {min(end, count)} of {count}"`
- **สถานะ** ใช้ของ Button ทั้งชุด (hover · disabled ผ่าน `layerStyle: disabled` · โฟกัสผ่าน `focusVisibleRing: "outside"`) · หน้าปัจจุบันเอกสารแนะนำให้สลับ variant ด้วย `_selected` ซึ่งมาจาก `data-selected` ของ Zag [สำรวจ + ตีความ]
- **จอแคบ** ไม่มีกลไกในตัว แต่ `PageText` ถูกออกแบบมาให้สลับเอาแทนแถวเลขได้ และ prop ของ Chakra รับค่าแบบ responsive object ได้ [ตีความ]

### 2.3 Base Web 18.2.0 (Uber)

ไฟล์ที่อ่าน
- `pagination/pagination.js` และ `pagination/stateful-container.js`
- `pagination/styled-components.js` และ `pagination/locale.js`
- `button/constants.js` และ `button/styled-components.js`
- `themes/shared/sizing.js`, `themes/shared/typography.js`, `themes/shared/borders.js`

- **ชนิดเดียว ไม่ใช่แถวตัวเลข** โครงจริงคือ ปุ่ม Prev (kind tertiary) + ดรอปดาวน์ `Select` ที่บรรจุตัวเลขหน้า 1 ถึง numPages + ป้าย `of N` + ปุ่ม Next (kind tertiary) [สำรวจ]
- **ไม่มีแถวตัวเลขหน้า จึงไม่มีจุดไข่ปลา ไม่มีปุ่มหน้าแรกหน้าสุดท้าย ไม่มีสูตรว่าจะโชว์เลขกี่ตัว** เพราะยัดทุกหน้าลงเมนู (`getMenuOptions` วนตั้งแต่ 1 ถึง numPages แบบ memoize) [สำรวจ]
- **ส่วนประกอบที่ override ได้** `Root` `PrevButton` `NextButton` `DropdownContainer` `MaxLabel` `Select` [สำรวจ]
- **แกนขนาด 4 ขั้น** prop `size` ส่งต่อให้ทั้ง Button และ Select ตรง ๆ ค่าที่รับคือ `mini`/`xSmall` · `compact`/`small` · `default`/`medium` · `large` [สำรวจ]
  - Base Web **ไม่ตั้งความสูงปุ่มเป็นตัวเลขตรง ๆ** แต่คิดจาก padding บวกบรรทัดข้อความ ค่าที่อ่านได้
    - mini/xSmall padding แนวตั้ง `scale200` = 6 px · ตัวอักษร LabelXSmall 12/16 → **28 px**
    - compact/small padding `scale400` = 10 px · LabelSmall 14/16 → **36 px**
    - default/medium padding `scale550` = 14 px · LabelMedium 16/20 → **48 px**
    - large padding `scale600` = 16 px · LabelLarge 18/24 → **56 px** [ตีความ จากค่า padding กับ line-height ที่อ่านได้]
  - แต่ในปุ่ม Prev/Next ของ pagination มีไอคอน chevron `size: 24` เป็น enhancer ขั้นเล็กจึงสูงกว่าตัวเลขข้างบน (mini ได้ราว 6+6+24 = 36 px) ต้องวัดจริงก่อนยึดตัวเลข [ตีความ]
- **ช่องไฟจริง** อ่านจาก styled component ตรง ๆ [สำรวจ]
  - `DropdownContainer` margin ด้านต้น `scale600` = **16 px** ด้านท้าย `scale300` = **8 px**
  - `MaxLabel` margin ด้านต้น `scale300` = **8 px** ด้านท้าย `scale600` = **16 px**
  - รวมเป็น ปุ่ม Prev เว้น **16 px** ก่อนถึงดรอปดาวน์ · ดรอปดาวน์เว้น 8 + 8 = **16 px** ก่อนถึงป้าย `of N` · ป้ายเว้น **16 px** ก่อนถึงปุ่ม Next
  - ค่าทั้งหมดสลับข้างให้เองเมื่อธีมเป็น rtl
- **ทรงปุ่ม** `buttonBorderRadius` = **8 px** · ขั้น mini ใช้ `buttonBorderRadiusMini` = **4 px** [สำรวจ]
- **สถานะ** ดรอปดาวน์ถูก override ให้เส้นขอบโปร่งทั้ง 4 ด้าน ไม่มีเงา พื้นเป็น `buttonTertiaryFill` และเปลี่ยนเป็น `buttonTertiaryHover` ตอน hover หรือตอนเมนูเปิด · ตอน disabled พื้นเป็น `buttonDisabledFill` [สำรวจ]
- **โฟกัส** `DropdownContainer` ตั้ง `outline: 3px solid borderAccent` เมื่อ `isFocusVisible` คือใช้ outline ไม่ใช่เงา [สำรวจ]
- **ลูกศรสุดทาง disabled ไม่ซ่อน** `disabled: currentPage <= 1` และ `disabled: currentPage >= numPages` · ตัว handler ยังกันซ้ำอีกชั้นด้วย `clamp(nextPage, 1, numPages)` ใน stateful container [สำรวจ]
- **markup** รากเป็น `div` ติด `data-baseweb="pagination"` · ปุ่มเป็น `<button type="button">` · **ไม่มี `<nav>` ไม่มี `<ul>` ไม่ใช้ `aria-current`** แทนด้วย aria-label ที่ประกอบเป็นประโยค เช่น `previous page. current page 3 of 10` และ `page 3 of 10` ที่ตัวดรอปดาวน์ · ป้าย `of N` ติด `aria-hidden` [สำรวจ]
- **คำแปลเริ่มต้น** `prev: 'Prev'` · `next: 'Next'` · `preposition: 'of'` เปลี่ยนได้ทาง prop `labels` หรือ LocaleProvider [สำรวจ]
- **จอแคบ** ไม่มีกลไกเฉพาะ แต่ทรงดรอปดาวน์กว้างคงที่อยู่แล้วไม่ว่ามีกี่หน้า จึงไม่ล้นเหมือนแถวตัวเลข [ตีความ]

### 2.4 Radix และ Zag (Ark UI)

- **Radix UI ไม่มี pagination** ทั้ง primitives และ themes ไม่มี component นี้ [สำรวจ จากการที่แพ็กเกจกลางที่อ้างถึงคือ Zag ไม่ใช่ Radix] ของที่คนเข้าใจสลับกันคือ **Zag.js** ซึ่งเป็นเครื่องจักรสถานะของ Ark UI และเป็นฐานของ Chakra v3
- **headless เต็มตัว ไม่มี CSS เลย** จึงตอบข้อ 7 ข้อ 8 ข้อ 9 ไม่ได้ **ไม่มีแกนขนาด ไม่มีความสูงปุ่ม ไม่มีช่องไฟ ไม่มีมุมโค้ง** ทั้งหมดเป็นหน้าที่ของผู้ใช้ [สำรวจ]
- **ส่วนประกอบ (anatomy) 7 ชิ้น** `root` `item` `ellipsis` `firstTrigger` `prevTrigger` `nextTrigger` `lastTrigger` · ฝั่ง Ark React มีไฟล์ครบทั้ง 7 รวม `pagination-first-trigger.js` และ `pagination-last-trigger.js` [สำรวจ]
- **ไม่มีส่วนประกอบสำหรับตัวเลือกจำนวนต่อหน้าและข้อความบอกช่วง** แต่ API คืน `pageSize` `setPageSize` `pageRange` และ `slice(data)` ให้เอาไปทำเอง [สำรวจ]
- **ค่าเริ่มต้นของ props** `defaultPageSize: 10` · `siblingCount: 1` · `boundaryCount: 1` · `defaultPage: 1` · `type: "button"` · `count: 1` [สำรวจ จาก `pagination.machine.mjs`]
- **สูตรจริง** จาก `pagination.utils.mjs` ฟังก์ชัน `getRange` [สำรวจ]
  - `totalPageNumbers = min(siblingCount * 2 + 3 + boundaryCount * 2, totalPages)` ถ้า `totalPages <= totalPageNumbers` โชว์ครบทุกหน้า
  - `itemCount = totalPageNumbers - 1 - boundaryCount`
  - `leftSiblingIndex = max(page - siblingCount, 1)` · `rightSiblingIndex = min(page + siblingCount, totalPages)`
  - `showLeftEllipsis = leftSiblingIndex > 1 + boundaryCount + 1 && abs(leftSiblingIndex - 1) > boundaryCount + 1`
  - `showRightEllipsis = rightSiblingIndex < totalPages - boundaryCount - 1 && abs(totalPages - rightSiblingIndex) > boundaryCount + 1`
  - **ขั้นสุดท้ายที่ Mantine ไม่มี** วนตรวจทุกตำแหน่งจุดไข่ปลา ถ้า `nextPage - prevPage === 2` คือจุดไข่ปลาบังหน้าเดียว จะ **แทนจุดไข่ปลาด้วยเลขหน้านั้นเลย** (`pages[i] = prevPage + 1`) กันกรณี `1 ... 3 4 5` ที่เสียที่เปล่า ๆ
  - ค่าเริ่มต้น siblingCount 1 boundaryCount 1 ได้สูงสุด 7 ช่อง [ตีความ จากสูตร]
- **จุดไข่ปลากดไม่ได้** `getEllipsisProps` คืนแค่ `id` `dir` และแอตทริบิวต์ของ part ไม่มี `onClick` ไม่มี `tabIndex` [สำรวจ]
- **สถานะ** `data-selected` ที่หน้าปัจจุบัน · `data-disabled` ที่ทริกเกอร์สุดทาง · เครื่องจักรมีสถานะเดียวคือ `idle` ที่เหลือเป็น guard (`isValidPage` `canGoToNextPage` `canGoToPrevPage`) [สำรวจ]
- **ลูกศรสุดทาง disabled ไม่ซ่อน** โหมด `type="button"` ใส่ `disabled` จริง · โหมด `type="link"` ใส่ `role="link"` กับ `aria-disabled: true` แทนเพราะลิงก์ disable ไม่ได้ [สำรวจ]
- **markup เลือกได้** prop `type` เป็น `"button"` (ได้ `<button type="button">`) หรือ `"link"` (ได้ `<a href>` โดยสร้าง url จาก `getPageUrl({page, pageSize})`) · ราก **ไม่ใช่ `<nav>` แต่เป็น element ธรรมดาที่ติด `aria-label="pagination"`** และ **ใช้ `aria-current="page"`** ที่หน้าปัจจุบัน [สำรวจ]
- **คำอ่านเริ่มต้น** `rootLabel: "pagination"` · `prevTriggerLabel: "previous page"` · `nextTriggerLabel: "next page"` · `firstTriggerLabel: "first page"` · `lastTriggerLabel: "last page"` · ปุ่มเลข `page {n}` และหน้าสุดท้ายเติมคำนำว่า `last page, page {n}` [สำรวจ]
- **จอแคบ** ไม่มีกลไกในตัว แต่ลด `siblingCount` เป็น 0 ได้ ซึ่งจะเหลือ `1 ... 5 ... 10` [ตีความ จากสูตร]
- **จำนวนหน้าคิดจากจำนวนข้อมูล ไม่ใช่จำนวนหน้า** `totalPages = ceil(count / pageSize)` ต่างจาก Mantine ที่รับ `total` เป็นจำนวนหน้าตรง ๆ [สำรวจ] จุดนี้สำคัญเวลาเทียบ API สองเจ้า

### 2.5 Gestalt 177.0.12 (Pinterest)

- **ไม่มี Pagination เลย** ไล่รายการ export ทั้งหมดใน `dist/gestalt.js` แล้ว (ราว 90 รายการ) ไม่มีชื่อที่มีคำว่า Paginat และไม่มีไฟล์ใดในแพ็กเกจที่ชื่อมีคำนี้ [สำรวจ]
- สิ่งที่ Gestalt มีแทน และตรงกับรูปแบบการใช้งานจริงของ Pinterest ที่เป็นฟีดเลื่อนไม่สิ้นสุด [สำรวจ ชื่อ export · ตีความ เรื่องเหตุผล]
  - `Masonry` และ `MasonryV` กริดแบบอิฐเรียง สำหรับฟีดยาว
  - `ScrollFetch` ตัวช่วยโหลดชุดถัดไปเมื่อเลื่อนใกล้ถึงท้าย คือกลไกเลื่อนไม่สิ้นสุด
  - `ScrollBoundaryContainer` คุมขอบเขตการเลื่อน
  - `Table` มีเอง แต่ **ไม่มีตัวแบ่งหน้าให้ตาราง**
  - `Tabs` `SideNavigation` `SegmentedControl` สำหรับแบ่งเนื้อหาเป็นส่วน ไม่ใช่แบ่งหน้า
- **ข้อสรุปที่ใช้ตัดสินใจได้** Gestalt เป็นตัวอย่างของ design system ระดับใหญ่ที่เลือก **ไม่ทำ pagination เลย** เพราะรูปแบบการบริโภคเนื้อหาของผลิตภัณฑ์เป็นฟีด ไม่ใช่รายการที่ต้องกระโดดหน้า [ตีความ]

---

### 3. ข้อสังเกตที่เอาไปใช้กับ Nation DS ได้

ทั้งหมดในหัวข้อนี้เป็น `[ตีความ]`

1. **ความสูงปุ่มที่เป็นข้อมูลจริงมีแค่ 2 เจ้า** Mantine (22 · 26 · 32 · 38 · 44) และ Chakra ที่ยืมของ Button (24 · 32 · 36 · 40 · 44 · 48 · 64) ที่เหลือ headless หรือคิดจาก padding ถ้าจะอ้างเป็นหลักฐานตั้งสูตรสเกล ให้ยึดสองเจ้านี้
2. **ช่องไฟ 8 px เป็นค่ากลางที่ตรงกัน** Mantine ตั้ง gap 8 และ Chakra Group ก็ 8 ทั้งคู่ **ไม่แยกค่าระหว่างกลุ่มกับระหว่างเลข** ส่วน Base Web ที่แยกกลุ่มจริงใช้ 16 px ระหว่างกลุ่ม ซึ่งเท่ากับ 8 x 2
3. **จุดไข่ปลาไม่มีใครในห้าเจ้านี้ทำให้กดได้** ทุกเจ้าปิดการกด (pointer-events none · span · ไม่ผูก onClick)
4. **ปุ่มไม่ใช่จัตุรัสตายตัว** ทั้ง Mantine และ Chakra ใช้ `min-width` คู่กับ `height` เพื่อให้ยืดได้เมื่อเลขหลายหลัก ซึ่งเป็นรูปแบบที่ควรลอก เพราะข่าวที่มีหน้าเกิน 100 หน้าเกิดขึ้นได้
5. **สูตร siblings 1 boundaries 1 เป็นมาตรฐานโดยพฤตินัย** ทั้งสองค่ายใช้เลขเดียวกันและสูตรเดียวกันเกือบคำต่อคำ ต่างกันที่ Zag เติมขั้นยุบจุดไข่ปลาที่บังหน้าเดียวให้เป็นเลขหน้า ซึ่งดีกว่าและควรเอามาใช้
6. **ไม่มีใครใช้ `<nav>` กับ `<ul>`** ทั้งห้าเจ้าไปทาง `aria-label` ที่ราก บวก `aria-current="page"` ที่หน้าปัจจุบัน (Base Web ไม่ใช้ `aria-current` แต่ประกอบประโยคใส่ aria-label แทน)
7. **มีแค่ Mantine ที่แก้เรื่องจอแคบมาให้ในตัว** ด้วย container query 400 px ที่สลับแถวเลขเป็นข้อความ `Page X of Y` ซึ่งเป็นรูปแบบที่เข้ากับผู้ใช้มือถือ 70 เปอร์เซ็นต์ของ Nation
8. **ไม่มีเจ้าไหนแยก pagination ของตารางออกจากของรายการทั่วไป** ถ้า Nation DS จะแยก ต้องมีเหตุผลของตัวเองรองรับ ไม่มีแบบอย่างจากห้าเจ้านี้

---

## 7. บริบทข่าวและการเข้าถึง


> งานวิจัยส่วน D สำรวจ 2026-10-12 โดย ux-researcher

### Context

ต้องการข้อมูลจริงก่อนออกแบบ component ตัวแบ่งหน้าใน NTGDS จึงดึง HTML กับ CSS ที่เซิร์ฟเวอร์ส่งมาจริงของเว็บในเครือ 6 เว็บ และเว็บข่าวต่างประเทศ 5 เจ้า แล้วเทียบกับ WCAG 2.2 และแนวทางของ W3C

**วิธีสำรวจ** ดึงด้วย curl พร้อม user agent ของเบราว์เซอร์ แล้วอ่าน markup กับ CSS ที่ฝังมาในหน้า ไม่ได้รันจาวาสคริปต์ สิ่งที่พบจึงเป็นสถานะแรกที่ผู้ใช้ได้รับ ซึ่งเป็นสถานะที่โปรแกรมอ่านหน้าจอและบอตค้นหาเห็นก่อน ส่วน **ป้ายที่มา** ในเอกสารนี้ `[สำรวจ]` คือเห็นจาก HTML หรือ CSS จริง `[แหล่งรอง]` คือจากเอกสารมาตรฐาน `[ตีความ]` คือความเห็นผู้วิจัย

### ส่วนที่ 1 เว็บในเครือ 6 เว็บ `[สำรวจ]`

| เว็บ | หน้ารายการหมวด | หน้าแท็ก | เลขหน้า | `<nav>` ของตัวแบ่งหน้า | `aria-current` |
|---|---|---|---|---|---|
| bangkokbiznews | ปุ่มโหลดเพิ่ม | โหลดเพิ่ม | ไม่มี | ไม่มี | ไม่มี |
| nationtv | เลื่อนไม่สิ้นสุด | เลื่อนไม่สิ้นสุด | ไม่มี | ไม่มี | ไม่มี |
| komchadluek | เรนเดอร์ฝั่งผู้ใช้ทั้งหมด | ปุ่มโหลดเพิ่ม | ไม่มี | ไม่มี | ไม่มี |
| thansettakij | เลื่อนไม่สิ้นสุด | เลื่อนไม่สิ้นสุด | ไม่มี | ไม่มี | ไม่มี |
| springnews | เลื่อนไม่สิ้นสุด | เลื่อนไม่สิ้นสุด | ไม่มี | ไม่มี | ไม่มี |
| posttoday | เลื่อนไม่สิ้นสุด | เลื่อนไม่สิ้นสุด | ไม่มี | ไม่มี | ไม่มี |

**ข้อค้นพบสำคัญที่สุด** สแกน 12 หน้า (หมวด 6 แท็ก 6) พบ `aria-current` **0 จุด** และลิงก์ `<a href="...page=N">` ที่เป็นเลขหน้า **0 จุด** ทั้งเครือไม่มีตัวแบ่งหน้าแบบเลขหน้าเลยแม้แต่ที่เดียว

### แพลตฟอร์มร่วม

5 เว็บ (bangkokbiznews, nationtv, thansettakij, springnews, posttoday) ใช้แพลตฟอร์มเดียวกัน เห็นจากก้อนข้อมูลที่ฝังในหน้าซึ่งมีคีย์เหมือนกัน

- หน้าหมวดส่ง `"nextArticles":"/api/v1.0/categories/<หมวด>?page=2"` คือรู้แค่หน้าถัดไปหน้าเดียว
- หน้าแท็กส่งเป็นอ็อบเจกต์ `{"first":...,"last":...,"prev":null,"next":...}` รูปแบบ paginator ของ Laravel
- springnews หน้าหมวดส่ง `"per_page":24,"to":24,"total":122448` คือ API รู้ยอดรวมและจำนวนหน้าอยู่แล้ว แต่หน้าเว็บไม่เอามาแสดง
- แท็กเศรษฐกิจของ bangkokbiznews ส่ง `"last":"...page=2278"` คือมี 2,278 หน้า

**นัยสำคัญ** API มีข้อมูลพอจะทำตัวแบ่งหน้าแบบเลขหน้าได้ทันที ข้อจำกัดอยู่ที่ชั้นหน้าจอ ไม่ใช่ชั้นข้อมูล

### markup จริงที่พบ
**bangkokbiznews หน้าหมวด** ปุ่มโหลดเพิ่มเป็นปุ่มเปล่าไม่มีแอตทริบิวต์ใด คือ `<div class="sc-fPXMVe MUCwW"><button> ดูเพิ่มเติม</button></div>`

```css
.MUCwW button{width:100%;border:1px solid #e3e3e3;background-color:#e3e3e3;
  color:#555555;border-radius:5px;font-size:18px;padding:5px 0;}
```

ความสูงที่ได้ คือ บรรทัดข้อความของฟอนต์ 18px บวก padding 10px บวกเส้นขอบ 2px รวมประมาณ 33 ถึง 36px กว้างเต็มคอลัมน์ แกนตั้งจึงเป็นตัวตัดสิน ปุ่มนี้ **ผ่าน 2.5.8 (AA)** แต่ **ไม่ผ่าน 2.5.5 (AAA)**

**komchadluek หน้าแท็ก** ปุ่มโหลดเพิ่มในกล่อง `#widget-loading` คือ `<button class=" flex-center" title="ดูทั้งหมด">`

```css
.css-9vr1d button,.css-9vr1d .fetching{background:var(--white-color);padding:5px 10px;
  border:1px solid var(--primary-color);border-radius:10px;cursor:pointer;width:200px;}
.css-9vr1d button span{font-size:16px;font-weight:400;}
```

กว้าง 200px ตายตัว สูงประมาณ 31 ถึง 36px ผ่าน 2.5.8 ไม่ผ่าน 2.5.5

**thansettakij และ posttoday** เลื่อนไม่สิ้นสุดแบบไม่มีปุ่มเลย มีแค่แถบโหลดเป็นภาพเคลื่อนไหว `.fetching .loading-bars .bar{animation:scale-up 1s linear infinite;}` คือไม่มีอะไรให้กด ไม่มีอะไรให้โฟกัสด้วยแป้นพิมพ์

### ปัญหาที่เห็น
1. **ไม่มี `aria-current` ที่ไหนเลย** 0 จุดจาก 12 หน้า ผู้ใช้โปรแกรมอ่านหน้าจอไม่มีทางรู้ว่าอยู่หน้าไหน `[สำรวจ]`
2. **เลื่อนไม่สิ้นสุดแบบไม่มีปุ่ม 4 เว็บ** ผู้ใช้แป้นพิมพ์เดินถึงท้ายรายการแล้วไปต่อไม่ได้ และส่วนท้ายเว็บเอื้อมไม่ถึงเพราะเนื้อหาแทรกเข้ามาเรื่อย `[สำรวจ]` `[ตีความ]`
3. **ไม่มี `aria-live` หรือ `role="status"` ที่ไหนเลย** ทั้ง 6 เว็บเป็น 0 จุด ข่าวชุดใหม่โหลดเข้ามาโดยไม่ประกาศ · **ไม่มี `rel="next"` ที่ไหนเลย** 0 จุดทั้ง 12 หน้า `[สำรวจ]`
4. **canonical ชี้หน้าแรกเสมอ** หน้าหมวดทุกเว็บส่ง canonical แบบไม่มีพารามิเตอร์หน้า เช่น `thansettakij.com/category/business` แปลว่าข่าวตั้งแต่ชุดที่ 2 ขึ้นไปไม่มี URL ของตัวเอง แชร์ไม่ได้ บุ๊กมาร์กไม่ได้ บอตค้นหาเข้าไม่ถึง `[สำรวจ]`
5. **ปุ่มไม่มีชื่อที่โปรแกรมอ่านได้อย่างเหมาะสม** bangkokbiznews ใช้ปุ่มเปล่าที่พึ่งข้อความข้างในล้วน komchadluek ใช้ `title="ดูทั้งหมด"` ซึ่งโปรแกรมอ่านหน้าจอหลายตัวไม่อ่าน และบนมือถือไม่มีผลเลย `[สำรวจ]` `[แหล่งรอง]`
6. **ไม่บอกตำแหน่งหรือยอดรวม** ไม่มีเว็บไหนแสดงประโยคแบบ "แสดง 1 ถึง 24 จาก 122,448 รายการ" ทั้งที่ API ส่ง `total` มาให้แล้ว · **บั๊ก canonical ของ komchadluek** หน้าแท็กส่ง `rel="canonical" href="https://www.komchadluek.net/tags/undefined"` `[สำรวจ]`

### ส่วนที่ 2 เว็บข่าวต่างประเทศ 5 เจ้า `[สำรวจ]`

### Guardian ตัวอย่างที่ดีที่สุดด้านโครงสร้าง

หน้า `theguardian.com/uk/business?page=2` ใช้เลขหน้าจริงบน URL และเรนเดอร์จากเซิร์ฟเวอร์

```html
<span class="dcr-ghyje2">About 260,668 results for Business</span>
<div class="dcr-1dymsfh">
  <a href="/business" class="dcr-1hjdo3p"><svg aria-hidden="true" focusable="false">..</svg></a>
  <a href="/business" class="dcr-zantjo">1</a>  <span class="dcr-708r6z">2</span>
  <a href="/business?page=3" class="dcr-zantjo">3</a>  <span class="dcr-11y2y7h">...</span>
  <a href="/business?page=3" class="dcr-1hjdo3p"><svg aria-hidden="true">..</svg></a></div>
```
```css
.dcr-1dymsfh{display:flex;align-items:center;gap:2px;}
.dcr-zantjo{display:inline-flex;justify-content:center;min-width:25px;height:25px;
  padding:3px 4px;font-size:0.75rem;font-weight:700;border-radius:12.5px;border:1px solid transparent;}
.dcr-1hjdo3p{width:25px;height:25px;border:1px solid #DCDCDC;border-radius:20px;padding:2px;}
```

- โชว์เลขหน้า 4 ตัว บวกจุดไข่ปลา 1 ชุดท้ายรายการ บวกลูกศรหน้า หลัง · ขนาดเป้า 25 คูณ 25 ระยะห่าง 2px **ผ่าน 2.5.8 (AA)** แบบฉิวเฉียด **ไม่ผ่าน 2.5.5 (AAA)**
- **ปัญหา** หน้าปัจจุบันเป็น `<span>` ไม่ใช่ลิงก์ และ **ไม่มี `aria-current`** · ลูกศรหน้า หลัง เป็นลิงก์ที่มีแต่ไอคอนซึ่ง `aria-hidden="true"` และไม่มี `aria-label` จึงเป็นลิงก์ไม่มีชื่อ ผิด WCAG 2.4.4 · กล่องครอบเป็น `<div>` ไม่ใช่ `<nav>` และไม่มีป้ายชื่อ
- **ที่น่าเอาอย่าง** canonical ชี้ `?page=2` ถูกต้อง · บอกยอดรวม 260,668 รายการ · เลขหน้าอยู่บน URL จริงจึงแชร์และบุ๊กมาร์กได้

### BBC ขนาดเป้าดีที่สุด แต่ชื่อขาด

หน้า `bbc.com/news/world` มี component ตัวแบ่งหน้าชัดเจน

```html
<div class="Pagination-styles__PaginationStyled-sc-3094f74e-0 gdhDyc">
  <button class="PaginationButton-styles__PaginationButtonStyled-sc-c649ee72-0 gEGuIW">
    <svg viewBox="0 0 32 32" width="15" height="1em" icon="chevron-left">..</svg></button>
  <span class="Pagination-styles__PaginationPlaceholderStyled-sc-3094f74e-1 lpsXdy">...</span>
  <button class="...gEGuIW"><svg icon="chevron-right">..</svg></button></div>
```
```css
.gdhDyc{display:flex;align-items:center;justify-content:center;gap:4px;}
.gEGuIW{display:inline-flex;align-items:center;justify-content:center;min-width:44px;
  height:44px;padding-inline:12px;font-size:16px;line-height:18px;}
.lpsXdy{min-width:44px;display:inline-flex;justify-content:center;font-size:16px;}
```

- **ขนาดเป้า 44 คูณ 44 ผ่านทั้ง 2.5.8 และ 2.5.5** ช่องว่างระหว่างปุ่ม 4px
- จุดไข่ปลาถูกจองที่ด้วย `min-width:44px` เท่ากัน แถวจึงไม่กระตุกเวลาเลขเปลี่ยน แนวคิดนี้ดีมาก
- **ปัญหา** กล่องเป็น `<div>` ไม่ใช่ `<nav>` · ใช้ `<button>` ไม่ใช่ `<a>` จึงไม่มี URL ให้แชร์ · ปุ่มมีแต่ SVG ไม่มี `aria-label` จึงไม่มีชื่อ · ไม่มี `aria-current` เลยในหน้า · `<span>...</span>` ของจุดไข่ปลาไม่ได้ `aria-hidden` โปรแกรมอ่านหน้าจอจะอ่านจุดสามจุดออกมา

### CNN หน้าหมวดไม่มีเลย หน้าค้นหามีเลขหน้า

`edition.cnn.com/business` คือหน้าโซนที่บรรณาธิการจัดเอง **ไม่มีตัวแบ่งหน้าเลย** สแกนไม่พบ class ตัวแบ่งหน้าใน DOM ไปต่อด้วยลิงก์หัวข้ออื่น ส่วน `edition.cnn.com/search?q=...&page=2` มีเลขหน้าจริง

```css
.search__pagination-link{cursor:pointer;color:#a6a6a6;align-items:center;
  padding:0 16px;font-size:20px;line-height:22px;display:inline-flex}
.search__pagination-link--active{color:#262626;font-weight:700}
.search__pagination-link--active:after{border-bottom:3px solid #ee373b;width:32px}
```

- **ความสูงเป้าแค่ 22px** เพราะ padding แกนตั้งเป็นศูนย์ ต่ำกว่า 24px จึงต้องพึ่งข้อยกเว้นเรื่องระยะห่างของ 2.5.8 ซึ่ง padding แกนนอน 16px ต่อข้างน่าจะช่วยให้ผ่าน แต่เป็นการผ่านแบบบังเอิญ ไม่ใช่แบบออกแบบมา
- สแกนทั้งหน้าค้นหาพบ `aria-current` **0 จุด** หน้าปัจจุบันบอกด้วยสีกับขีดเส้นใต้แดงเท่านั้น

### New York Times และ Reuters เข้าไม่ได้

nytimes.com ตอบกลับ 403 และ reuters.com ตอบกลับ 401 ทั้งด้วย curl และเครื่องมือดึงหน้าเว็บ ยืนยัน markup จริงไม่ได้ จึงไม่สรุป

### ส่วนที่ 3 การเข้าถึง `[แหล่งรอง]`

### 3.1 โครง markup ที่แนะนำ และวิธีใช้ `aria-current="page"`

**ข้อเท็จจริงที่ต้องรู้ก่อน** WAI-ARIA APG **ไม่มี** pattern ชื่อ pagination ดึงสารบัญ pattern ทั้ง 33 ตัวมาตรวจแล้วไม่มี ของที่ใกล้ที่สุดคือ pattern Breadcrumb, Link และ Landmarks แนวทางที่ควรยึดจึงเป็น W3C Design System และ GOV.UK Design System

**โครงจาก W3C Design System**

```html
<nav class="pagination" aria-labelledby="pagination">
  <h2 id="pagination" class="visuallyhidden">Pagination</h2>
  <ul class="pagination__list">
    <li><a href="/path">Previous</a></li>  <li><a href="/path">1</a></li>
    <li><a class="ellipsis">…</a></li>     <li><a href="#" aria-current="page">8</a></li>
    <li><a href="/path">20</a></li>        <li><a href="/path">Next</a></li>
  </ul></nav>```

หลักที่ได้จากทั้งสองแหล่ง
- ครอบด้วย `<nav>` แล้ว **ต้องมีชื่อ** ผ่าน `aria-labelledby` ชี้หัวข้อที่ซ่อนสายตา หรือ `aria-label="Pagination"` แบบ GOV.UK เพราะหน้าเดียวมี `<nav>` หลายตัว ทุกตัวต้องมีชื่อไม่ซ้ำ
- ใช้ `<ul>` กับ `<li>` เพื่อให้โปรแกรมอ่านหน้าจอบอกได้ว่ามีกี่รายการ · GOV.UK เติม `rel="prev"` กับ `rel="next"` ที่ลิงก์ก่อนหน้าและถัดไป
- **หน้าปัจจุบันยังเป็นลิงก์** และใส่ `aria-current="page"` W3C Design System ระบุว่าทำแบบเดียวกับเบรดครัมบ์ คือเป็นลิงก์เต็มตัว เพื่อให้ผู้ใช้เครื่องช่วยหาหน้าที่กำลังอยู่ได้ · **มีได้ตัวเดียวในหนึ่งชุด** เปลี่ยนหน้าแล้วต้องถอดของเก่าก่อนใส่ของใหม่
- ผูกสไตล์ด้วยตัวเลือกแอตทริบิวต์ `[aria-current="page"]` ให้สภาพที่โปรแกรมอ่านได้กับสภาพที่ตาเห็นมาจากแหล่งเดียวกัน

### 3.2 `<a>` หรือ `<button>`

ทั้ง W3C Design System และ GOV.UK Design System ใช้ `<a>` ไม่ใช่ `<button>` เหตุผลเชิงปฏิบัติ

| ประเด็น | `<a href>` | `<button>` |
|---|---|---|
| ความหมายที่ประกาศ | ลิงก์ ไปที่อื่น | ปุ่ม ทำอะไรบางอย่าง |
| แชร์และบุ๊กมาร์ก URL ของหน้าที่ 5 | ได้ | ไม่ได้ |
| ปุ่มย้อนกลับของเบราว์เซอร์ | ทำงานถูก | ต้องเขียนจัดการเอง |
| เปิดแท็บใหม่ ใช้งานได้เมื่อจาวาสคริปต์ล่ม บอตค้นหาตามเข้าไปเก็บ | ได้ | ไม่ได้ |

**ข้อสรุป** `[ตีความ]` ตัวแบ่งหน้าที่เปลี่ยน URL ต้องเป็น `<a href>` เสมอ `<button>` ใช้ได้เฉพาะกรณีไม่มี URL จริงให้ชี้ เช่นแดชบอร์ดหลังบ้านที่สถานะอยู่ในหน่วยความจำของแอป กรณี BBC ที่ใช้ `<button>` คือตัวอย่างที่ไม่ควรเอาอย่าง เพราะเสียความสามารถในการแชร์ URL หน้าที่ N ไปทั้งหมด

### 3.3 หลังกดเปลี่ยนหน้า โฟกัสควรไปอยู่ที่ไหน

**กรณีเปลี่ยนเนื้อหาด้วยจาวาสคริปต์โดยไม่โหลดหน้าใหม่** ซึ่งเป็นกรณีของเว็บในเครือทั้งหมด ถ้าไม่ทำอะไรเลย โฟกัสค้างที่ปุ่มเดิมและผู้ใช้โปรแกรมอ่านหน้าจอไม่รู้ว่ามีอะไรเปลี่ยน แหล่งรองเห็นพ้องกันว่าต้อง **ทำทั้งสองอย่าง**

1. **ย้ายโฟกัสไปที่หัวข้อของผลลัพธ์** ให้หัวข้อมี `tabindex="-1"` แล้วเรียก `.focus()` ผู้ใช้แป้นพิมพ์จะถูกพาไปยืนที่หัวเนื้อหาชุดใหม่ และโปรแกรมอ่านหน้าจออ่านหัวข้อนั้นออกมาซึ่งบอกตำแหน่งให้ในตัว แหล่งรองระบุว่าวิธีนี้แรงกว่าและเป็นวิธีหลัก
2. **ประกาศผ่านพื้นที่ประกาศสด** วางอิลิเมนต์ซ่อนสายตาที่มี `aria-live="polite"` ติดอยู่ใน DOM ตลอดเวลา ไม่ใช่สร้างใหม่ตอนต้องการ เพราะอิลิเมนต์ที่เพิ่งใส่เข้า DOM มักไม่ถูกประกาศ แล้วเปลี่ยนข้อความข้างในเป็น "หน้า 3 จาก 48 แสดง 49 ถึง 72 จาก 1,152 รายการ" โครง `role="status"` ให้ผลเทียบเท่า กรณีโหลดหน้าใหม่จริงไม่ต้องทำอะไรเพิ่ม เบราว์เซอร์รีเซ็ตโฟกัสให้เอง

**ข้อควรระวังเฉพาะปุ่มโหลดเพิ่มกับเลื่อนไม่สิ้นสุด** `[ตีความ]` ต่างจากเลขหน้าตรงที่เนื้อหาเก่าไม่หายไป ดังนั้น **ห้ามย้ายโฟกัสไปหัวรายการ** เพราะจะพาผู้ใช้ย้อนไปของที่อ่านจบแล้ว ควรย้ายโฟกัสไปที่ **รายการแรกของชุดที่โหลดเข้ามาใหม่** แล้วประกาศผ่านพื้นที่ประกาศสดว่า "เพิ่มข่าว 24 รายการ" ปุ่มต้องคงอยู่ท้ายรายการชุดใหม่เสมอ และเมื่อหมดต้องเปลี่ยนเป็นข้อความบอกว่าหมด ไม่ใช่หายไปเงียบ

### 3.4 เกณฑ์ขนาดพื้นที่กด

| เกณฑ์ | ระดับ | ขนาดขั้นต่ำ |
|---|---|---|
| 2.5.8 Target Size (Minimum) | AA | 24 คูณ 24 พิกเซล CSS |
| 2.5.5 Target Size (Enhanced) | AAA | 44 คูณ 44 พิกเซล CSS |

ข้อยกเว้นของ 2.5.8 มี 5 ข้อ ที่เกี่ยวกับตัวแบ่งหน้ามากสุดคือ **ข้อยกเว้นเรื่องระยะห่าง** เป้าที่เล็กกว่า 24px ผ่านได้ถ้าวาดวงกลมสมมุติเส้นผ่านศูนย์กลาง 24px ที่จุดกลางของกรอบเป้าแต่ละอัน แล้ววงนั้นไม่ทับเป้าอื่นและไม่ทับวงของเป้าเล็กที่อยู่ข้างกัน ข้อยกเว้นอื่นคือ เป้าในประโยค, เป้าที่เบราว์เซอร์คุมขนาด, เป้าที่มีทางเลือกอื่นขนาดพอในหน้าเดียวกัน และเป้าที่ขนาดเป็นสาระของข้อมูลเอง

**คำตอบเรื่องขนาด 24 กับ 32**
- **24 คูณ 24** ผ่าน 2.5.8 (AA) พอดีขั้นต่ำ ไม่ผ่าน 2.5.5 (AAA) `[ตีความ]` ผ่านแบบไม่มีระยะเผื่อ ถ้ามีเส้นขอบหรือปัดเศษจากหน่วย rem อาจหลุดได้ง่าย และยังต้องมีระยะห่างระหว่างเป้าพอด้วย ไม่ใช่แค่ขนาดอิลิเมนต์
- **32 คูณ 32** ผ่าน 2.5.8 (AA) สบาย ไม่ผ่าน 2.5.5 (AAA) `[ตีความ]` ยอมรับได้สำหรับหลังบ้านบนจอคอม แต่ยังเล็กสำหรับนิ้วบนมือถือ

### 3.5 จุดไข่ปลาควรประกาศหรือซ่อน

`[แหล่งรอง]` `[ตีความ]` **ควรซ่อนจากโปรแกรมอ่านหน้าจอ** ใส่ `aria-hidden="true"` และทำให้โฟกัสไม่ได้ เหตุผล
- จุดไข่ปลาไม่ใช่ปลายทาง ไม่พาผู้ใช้ไปไหน อ่านว่า "จุด จุด จุด" คือเสียงรบกวนล้วน
- ข้อมูลที่จุดไข่ปลาสื่อด้วยตา คือ ยังมีหน้าอีกตรงนี้ ควรส่งให้โปรแกรมอ่านหน้าจอด้วยช่องทางที่ชัดกว่า คือชื่อของ `<nav>` บวกข้อความบอกตำแหน่งแบบ "หน้า 3 จาก 48" ซึ่งบอกครบกว่าจุดสามจุด
- สองแหล่งอ้างอิงหลักไม่ได้ระบุเรื่องนี้ชัด W3C Design System ใช้ `<a class="ellipsis">…</a>` ซึ่งเป็นลิงก์ไม่มี href และ GOV.UK ใช้ `<li class="...--ellipsis">&ctdot;</li>` ทั้งสองไม่ได้ใส่ `aria-hidden` จึงเป็นช่องว่างที่ NTGDS ควรปิดให้ดีกว่าต้นแบบ · **ห้ามทำให้จุดไข่ปลากดได้** แบบที่ W3C Design System เขียน `<a>` ไว้ เพราะเป็นลิงก์ไม่มีปลายทาง ควรเป็น `<span aria-hidden="true">` หรือ `<li aria-hidden="true">` เท่านั้น

### ส่วนที่ 4 ข้อเสนอ `[ตีความ]`

### 4.1 หลังบ้านกับหน้าอ่านข่าว ควรใช้คนละแบบ

**ควรแยก** และควรเป็น component ต่างตัวใน NTGDS ไม่ใช่ตัวเดียวที่สลับ variant เพราะโครง markup และงานที่ต้องทำต่างกันจริง

| ประเด็น | หน้าอ่านข่าว | หลังบ้าน แดชบอร์ด ระบบจัดการเนื้อหา |
|---|---|---|
| โจทย์ของผู้ใช้ | ไล่ดูเรื่อย หาของน่าสนใจ ไม่รู้ว่าจะหยุดตรงไหน | ไปหาแถวที่รู้ว่าอยู่หน้าไหน หรือไล่ตรวจให้ครบทุกแถว |
| แบบที่เหมาะ | ปุ่มโหลดเพิ่ม | เลขหน้า บวกช่องกระโดดไปหน้าที่ต้องการ บวกตัวเลือกจำนวนแถวต่อหน้า |
| ความสำคัญของการรู้ตำแหน่ง | ต่ำ ไม่มีใครจำว่าอ่านถึงหน้า 7 | สูงมาก ต้องรู้ว่าตรวจถึงไหนและเหลืออีกเท่าไหร่ |
| ความสำคัญของ URL ที่แชร์ได้ | สูง ต้องส่งลิงก์ให้กันได้ และบอตค้นหาต้องเข้าถึง | ปานกลาง มีประโยชน์กับการส่งงานในทีม |
| อิลิเมนต์ และการบอกยอดรวม | `<a href>` ที่มี URL จริง ไม่ต้องบอกยอดรวม | `<a href>` ถ้าสถานะอยู่บน URL หรือ `<button>` ถ้าอยู่ในแอป ต้องบอก "แสดง X ถึง Y จาก Z" |

**เหตุผลที่ไม่ควรใช้เลื่อนไม่สิ้นสุดทั้งสองฝั่ง** GOV.UK Design System เขียนตรงว่าให้หลีกเลี่ยงเทคนิคเลื่อนไม่สิ้นสุดที่โหลดเนื้อหาเองเมื่อผู้ใช้ใกล้ท้ายหน้า ซึ่งตรงกับที่สำรวจเจอในเครือ คือเอื้อมท้ายหน้าไม่ถึง ผู้ใช้แป้นพิมพ์ติดกับ ไม่มี URL ให้แชร์ บอตค้นหาเข้าไม่ถึง และกดย้อนกลับแล้วตำแหน่งหาย

**ทางสายกลางสำหรับหน้าอ่านข่าว** ใช้ปุ่มโหลดเพิ่มเป็นสิ่งที่ผู้ใช้เห็นและกด แต่ให้ **URL ขยับตามไปด้วย** และวาง `<a href="?page=N">` สำหรับหน้าถัดไปไว้ในหน้าจริง เพื่อให้บอตและผู้ใช้ที่จาวาสคริปต์ไม่ทำงานยังตามเข้าไปได้ ได้ทั้งความลื่นของการไล่ดูและความสามารถในการแชร์กับ SEO ซึ่งเป็นสิ่งที่ Guardian ทำได้และทั้ง 6 เว็บในเครือทำไม่ได้

### 4.2 ขนาดปุ่มขั้นต่ำบนหน้าอ่านข่าว

บริบทคือผู้ใช้มือถือเกิน 70 เปอร์เซ็นต์ และกลุ่มเป้าหมายอายุถึง 55 ปี

| สิ่งที่ออกแบบ | ขนาดที่เสนอ | เหตุผล |
|---|---|---|
| ปุ่มโหลดเพิ่ม | มือถือสูง **48px** กว้างเต็มคอลัมน์ · จอคอมสูง **40px** | เป้าหลักที่คนกดซ้ำ ควรใหญ่กว่าขั้นต่ำ 2.5.5 เล็กน้อยเพื่อเผื่อการกดพลาดด้วยนิ้วโป้ง จอคอมชี้ด้วยเมาส์ซึ่งแม่นกว่า |
| เลขหน้าบนหน้าอ่านข่าว | มือถือ **44 คูณ 44** · จอคอม **40 คูณ 40** ช่องว่าง 4px | 44 ตรงเกณฑ์ 2.5.5 (AAA) พอดี และเป็นค่าที่ BBC ใช้จริงอยู่แล้ว |
| ลูกศรหน้า หลัง | ขนาดเดียวกับเลขหน้า ไอคอน 20 ถึง 24px อยู่กลาง | ห้ามทำเล็กกว่าเลขหน้าทั้งที่เป็นเป้าที่คนกดบ่อยสุด |
| เลขหน้าในหลังบ้าน | **32 คูณ 32** ช่องว่าง 4px | ผ่าน 2.5.8 ได้ความแน่นที่ตารางข้อมูลต้องการ |
| ตัวแบ่งหน้าในตารางข้อมูลแน่น | ไม่ต่ำกว่า **24 คูณ 24** ช่องว่างไม่น้อยกว่า 8px | พื้นขั้นต่ำสุด ห้ามต่ำกว่านี้ไม่ว่ากรณีใด |

**เส้นที่ไม่ควรข้าม**
- **ห้ามต่ำกว่า 24 คูณ 24 ในทุกกรณี** เพราะเป็นเกณฑ์ AA ไม่ใช่ของเสริม และห้ามพึ่งข้อยกเว้นเรื่องระยะห่างมาแก้ตัวให้เป้าที่เล็กเกิน แบบที่หน้าค้นหาของ CNN เป็นอยู่ที่สูงแค่ 22px
- **ขนาดพื้นที่กดวัดที่พื้นที่กด ไม่ใช่ที่ตัวเลขที่เห็น** ตัวเลขขนาด 12px วางกลางเป้า 44px ถือว่าถูก การขยายด้วย padding บวก `display:inline-flex` และ `align-items:center` ถูกกว่าการขยายขนาดฟอนต์
- **หน้าอ่านข่าวควรเล็งที่ 2.5.5 (AAA) ไม่ใช่แค่ 2.5.8 (AA)** เพราะผู้ใช้มือถือเป็นคนส่วนใหญ่ของเรา ไม่ใช่กลุ่มชายขอบ

### 4.3 Design implications สำหรับ NTGDS

1. **component ตัวแบ่งหน้าควรมี 2 ตัว** เลขหน้าสำหรับหลังบ้านและหน้าค้นหา · ปุ่มโหลดเพิ่มสำหรับหน้าอ่านข่าว ไม่ควรยัดเป็นตัวเดียว
2. **โครงที่ต้องคุมไว้ตั้งแต่ต้น** `<nav>` ที่มีชื่อ · `<ul>` `<li>` · `<a href>` ทุกตัวรวมหน้าปัจจุบัน · `aria-current="page"` ที่หน้าปัจจุบัน · `aria-hidden="true"` ที่จุดไข่ปลา · `aria-label` ที่ลูกศรที่มีแต่ไอคอน · พื้นที่ `aria-live="polite"` ที่ติดอยู่ตลอด
3. **ผูกสไตล์สภาพหน้าปัจจุบันกับ `[aria-current="page"]`** ไม่ผูกกับ class แยก เพื่อให้สภาพที่ตาเห็นกับสภาพที่โปรแกรมอ่านได้หลุดจากกันไม่ได้
4. **ต้องมี token ขนาดเป้าที่แยกมือถือกับจอคอม** 44 กับ 40 สำหรับหน้าอ่านข่าว และ 32 สำหรับหลังบ้าน ตามกฎระบบสเกลใน CLAUDE.md คือนิยามสูตรใน `tokens/scale/<component>.mjs` พร้อมกับตัว component
5. **สภาพที่ต้องออกแบบให้ครบ** หน้าปัจจุบัน · ปิดใช้งาน (หน้าแรกกับหน้าสุดท้าย) · กำลังโหลด · โหลดครบแล้ว · โหลดไม่สำเร็จและให้กดลองใหม่ · วงแหวนโฟกัส ซึ่งหน้า 05 Effect มีอยู่แล้ว · **จุดไข่ปลาควรจองความกว้างเท่าปุ่ม** ตามที่ BBC ทำด้วย `min-width:44px` เพื่อไม่ให้แถวกระตุกเวลาเลขเปลี่ยน

### Sources

**เว็บที่สำรวจเอง** `[สำรวจ]` ดึง 2026-10-12 ด้วย curl ได้แก่ หน้าหมวดและหน้าแท็กของทุกเว็บในเครือ (bangkokbiznews, nationtv, komchadluek, thansettakij, springnews, posttoday) จากนั้น theguardian.com/uk/business ทั้งหน้าแรกและ `?page=2` แล้ว bbc.com/news/world แล้ว edition.cnn.com/business กับ `/search?q=economy&page=2` ส่วน nytimes.com/section/business ตอบ 403 เข้าไม่ได้ และ reuters.com/business/ ตอบ 401 เข้าไม่ได้

**มาตรฐานและเอกสารอ้างอิง** `[แหล่งรอง]`

- [WCAG 2.2 Understanding SC 2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- [WCAG 2.2 Understanding SC 2.5.5 Target Size (Enhanced)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html)
- [WAI-ARIA APG Patterns index](https://www.w3.org/WAI/ARIA/apg/patterns/) ตรวจแล้วไม่มี pattern pagination
- [W3C Design System Pagination](https://design-system.w3.org/components/pagination.html)
- [GOV.UK Design System Pagination](https://design-system.service.gov.uk/components/pagination/)
- [A11Y Collective เรื่อง aria-current](https://www.a11y-collective.com/blog/aria-current/) · [accessibility.build Accessible Pagination Pattern](https://accessibility.build/learn/pagination) · [a11ymatters Accessible Pagination](https://a11ymatters.com/pattern/pagination/)
- [Nielsen Norman Group Infinite Scrolling When to Use It](https://www.nngroup.com/articles/infinite-scrolling-tips/)
