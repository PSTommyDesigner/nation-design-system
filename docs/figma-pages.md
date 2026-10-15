---
title: "Figma Pages Inventory Nation Design System"
description: "รายชื่อหน้าทั้งหมดในไฟล์ Figma DS หลัก (QgmoT5) พร้อม node id ใช้ตรวจลำดับเลข/หา node เร็ว"
figma_file: "QgmoT5Uuvv3elB96F4nsTq (DS หลัก)"
last_checked: "2026-09-11"
source: "figma.root.children ผ่าน use_figma (get_metadata คืน page list ไม่ครบ อย่าใช้)"
---

# Figma Pages Inventory

> Snapshot ล่าสุด: **2026-09-11** (อัปเดตหน้า 21 Tags และ 22 Badge หลังยุบโครงให้ใช้แกน hierarchy หน้าอื่นยังเป็นยอดของ 2026-08-27)
> ดึงจาก `figma.root.children` โดยตรง (get_metadata คืนไม่ครบ เห็นแค่ Thumbnail/08 Logo)

## ประวัติการเลื่อนเลขหน้า
- **2026-08-27:** เพิ่มหน้า **09 Third-party Logos** (ย้ายโลโก้บริษัทนอก ธงประเทศ และช่องทางชำระเงิน 505 ตัวออกจากหน้า 08 Logo) → เลข `09 Frame`→`10 Frame` เป็นต้นไปเลื่อน +1 ทั้งหมด และเปลี่ยนชื่อไฟล์ `docs/11-buttons.md`→`docs/12-buttons.md`
- **2026-07-17:** เพิ่มหน้า Table (component ตาราง + table-cell/color-cell) → เลขหลังจากนั้นเลื่อน +1

## โครงสร้างตาม Atomic Design (section คั่นด้วย divider `-`)

### Atoms (Identity)
| # | หน้า | node id | children |
|---|---|---|---|
| 00 | Document | `8948:52` | 5 |
| 01 | Color | `1981:15963` | 13 |
| 02 | Icon | `502:2747` | 8 |
| 03 | Typography | `1986:15629` | 3 |
| 04 | Grid | `2326:64859` | 6 |
| 05 | Effect | `2334:79324` | 6 |
| 06 | Shape | `7121:7244` | 5 |
| 07 | Space | `7125:81` | 4 |
| 08 | Logo | `1976:22116` | 3 |
| 09 | Third-party Logos | `10246:172` | 1 |

> **09 Third-party Logos** = โลโก้ที่ไม่ใช่อัตลักษณ์ของเครือ (`payment` 15 `integration` 232 `flag` 258) แยกออกมาจากหน้า 08 Logo เมื่อ 2026-08-27 เพื่อให้หน้า 08 เหลือเฉพาะโลโก้ในเครือ

> **หน้า 00 Document มีเอกสารของตัวเองแล้ว 2026-10-14** คือ `00 Document Documentation` (Page Doc อธิบายว่าหน้านี้คืออะไร โครงเอกสาร เอกสาร 5 ชนิด และลำดับการวาง) กับ `Document Base Components` (Component Previews เก็บชุดหัวเอกสาร) วางต่อท้ายเทมเพลตทั้งห้า

> **ลบหน้า Header แล้ว 2026-10-12** ผู้ใช้ย้ายชุดหัวเอกสารไปไว้ที่หน้า 00 Document ในเฟรม `Document Base Components` และเปลี่ยนชื่อชุดจาก `_Design System Header` เป็น `_document-header` การเปลี่ยนชื่อไม่ทำให้ instance พัง เพราะ Figma ผูกด้วย id

> **เรียงเลขหน้าใหม่ 2026-10-12** หลังยุบหน้า Lists แล้วเลขขาดช่วง จึงเลื่อนให้ต่อเนื่อง `28 Table` เป็น `26 Table` · `29 Card` เป็น `27 Card` · `31 Dividers` เป็น `28 Dividers` ตอนนี้เลขเรียง 00 ถึง 28 ไม่ขาดช่วง · เลข 26 กับ 27 เคยเป็นหน้า Image And Carousel กับ Lists ที่ลบไปแล้ว เอกสารเก่าที่อ้างสองเลขนั้นกำกับว่า เลขเดิม ไว้แล้ว

### Molecules (Element)

| # | หน้า | node id | children |
|---|---|---|---|
| 10 | Frame | `562:4386` | 10 |
| 11 | Avatar | `7121:7231` | 10 |
| 12 | Buttons | `7121:7232` | 7 |
| 13 | Input | `7121:7233` | 5 |
| 14 | Toggles | `7121:7234` | 7 |
| 15 | Checkbox | `7121:7235` | 3 |
| 16 | Radio | `7125:909` | 3 |
| 17 | Sliders | `7121:7236` | 4 |
| 18 | Tabs | `7121:7237` | 6 |
| 19 | Toasts & Banners | `7121:7238` | 7 |
| 20 | Tooltips | `7121:7239` | 6 |
| 21 | Tags | `7121:7240` | 14 |
| 22 | Badge | `8672:5101` | 14 |
| 23 | Progress Bars | `7121:7243` | 7 |
| 24 | Pagination | `7125:910` | 11 |
| 25 | Dropdowns | `7125:911` | 7 |
| 26 | Table | `9377:29760` | 4 |
| 27 | Card | `7130:26` | 43 |
| 28 | Dividers | `7130:30` | 3 |

### Organisms (Component)

**ไม่มีหน้า component แล้ว** (ตัดสิน 2026-10-12) เหลือหน้าหัวข้อที่มีเอกสาร 4 ใบ คือ `Organisms Documentation` `Organisms Inventory` `Organism Examples` (10 ตัวอย่างที่นับ) และ `Organism Exclusions` (10 ตัวอย่างที่ไม่นับ) เหตุผลและขอบเขตอยู่ที่ [docs/rules/layer-scope.md](rules/layer-scope.md)

> **ยุบหน้า Lists (เลขเดิม 27 ยุบไปแล้ว) แล้ว** (2026-10-12) ความสามารถของแถว list item ยกเข้า `_dropdown-option` บนหน้า 25 ส่วนที่เหลือ 65 ชิ้นตัดทิ้ง เพราะไม่มีใครใช้ เหตุผลเต็มอยู่ที่ [docs/rules/layer-scope.md](rules/layer-scope.md) §5.1

> **26 Table** = component ตาราง เป็นที่อยู่ของชุดที่ลงท้ายด้วย `-table-cell` และ `-color-cell` (master ที่หน้า doc อื่นดึง instance ไปใช้) · เปลี่ยนชื่อจากรูปแบบเดิมที่มีขีดทับเมื่อ 2026-09-14

### Page (Prototype)

**ไม่มีหน้า component แล้ว** (ตัดสิน 2026-10-12) เหลือหน้าหัวข้อที่มีเอกสาร 4 ใบ คือ `Prototype Documentation` `Prototype Inventory` `Prototype Examples` (2 หน้าที่นับ) และ `Prototype Exclusions` (2 ตัวอย่างที่ไม่นับ) เหตุผลและขอบเขตอยู่ที่ [docs/rules/layer-scope.md](rules/layer-scope.md)

### Template (Composition)

**ไม่มีหน้า component แล้ว** (ตัดสิน 2026-10-12) เหลือหน้าหัวข้อที่มีเอกสาร 4 ใบ คือ `Template Documentation` `Template Inventory` `Template Examples` (10 ผังที่นับ) และ `Template Exclusions` (10 ตัวอย่างที่ไม่นับ) เหตุผลและขอบเขตอยู่ที่ [docs/rules/layer-scope.md](rules/layer-scope.md)

### Page (Prototype)

**ลบทั้งชั้นแล้ว** (ตัดสิน 2026-10-12) หน้า Desktop และ Mobile ว่างเปล่าทั้งคู่

### หน้าอื่น (นอกลำดับเลข)
| หน้า | node id | หมายเหตุ |
|---|---|---|
| Thumnail | `0:1` | หน้าปก |
| Work in Progress | `8543:7711` | งานระหว่างทำ |
| Atoms(Identity) | `1941:12626` | section header |
| Molecules(Element) | `7121:7230` | section header |
| Organisms(Component) | `7130:23` | section header |
| Template(Composition) | `7130:32` | section header |
| Page(Prototype) | `7135:50132` | section header |
| `-` (x6) | 7118:6979 / 7121:7229 / 7130:22 / 7130:31 / 7135:50142 / 7135:50145 | divider |

## หมายเหตุ
- **พื้นหลังทุก page = #EEF5FF** (ตั้งเท่ากันหมด 2026-07-17 เป็นสี canvas ของ editor Figma bind variable ไม่ได้ ใส่ค่าตรง)
- เลขหน้า = **Figma DS library เป็น source of truth** ชื่อไฟล์ doc (`docs/<NN>-<ชื่อ>.md`) ตั้งตามเลขหน้า Figma ถ้าเลขเลื่อน ต้องตรวจชื่อไฟล์ doc ให้ตรง
- การเปลี่ยนเลขหน้า/พื้นหลัง **ไม่กระทบ token (`tokens/`) หรือ component code** เป็น layer organization ของ Figma เท่านั้น
