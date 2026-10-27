---
title: "Component Documentation Standard Nation Design System"
description: "มาตรฐานการทำเอกสารประจำ component/หน้าทุกหน้า ทั้ง Markdown page doc และ Figma visual doc ใช้ซ้ำทุก component (อนาคต + ย้อนหลัง)"
version: "1.0.0"
last_updated: "2026-07-16"
status: "active"
---

# Component Documentation Standard Nation Design System

> มาตรฐานกลาง: ทุก component/หน้าใน DS ต้องมีเอกสาร **2 ชนิด** ตามโครงนี้ ใช้กับหน้าใหม่ (Input/Badge/...) **และย้อนหลังหน้าที่ทำแล้ว** อ้างอิงจากแนวทาง Material 3 Carbon Polaris Spectrum Atlassian Ant

## 0. เอกสาร 2 ชนิดต่อ 1 component

| ชนิด | ไฟล์/ที่อยู่ | หน้าที่ | template |
|---|---|---|---|
| **A. Markdown page doc** | `docs/<NN>-<ชื่อ>.md` | สเปค/กติกา/token/workflow (อ่าน+ค้นได้) | [_TEMPLATE-page-doc.md](page-doc-template.md) (5 หัวข้อ) |
| **B. Figma visual doc** | frame ในหน้า Figma นั้น | โชว์ตัวจริงเป็นภาพ (variant/state/anatomy/do-don't) | DS document pattern (§2) |

> ชื่อไฟล์ .md ตั้งตามเลขหน้า Figma (source of truth) ตัวอย่างที่ทำแล้ว: [12-buttons.md](../12-buttons.md)

---

## 0.5 เอกสารใน Figma = 5 ชนิดต่อหน้า (Document taxonomy)

> **⚠️ กฎบังคับ:** เมื่อผู้ใช้สั่ง "เขียน/ทำ Document" **ต้องถามก่อนเสมอว่าเป็นเอกสารชนิดไหน** (1/2/3/4/5) ก่อนลงมือ แต่ละชนิดมี template ของตัวเองบนหน้า **00 Document**

| # | ชนิด | หน้าที่ | จำนวน/หน้า | Figma template (00 Document) | ตัวอย่าง |
|---|---|---|:-:|---|---|
| 1 | **Page Documentation** | skeleton 12 section คู่มือ+ข้อกำหนดมาตรฐาน ให้ Designer/Dev/AI เข้าใจว่าหน้านี้คืออะไร มีอะไร | **1 เท่านั้น** | `[Template] Page Documentation` (9331:18) | 01 Color Documentation 02 Icon Documentation |
| 2 | **Information Document** | ข้อมูล/หลักการ/เหตุผล/ตาราง/บันทึก ละเอียดลึกกว่า Page Doc **ไม่ใช่** component preview | หลายอัน | `[Template] Information Document` (9412:18) | Color palette Usage Detail Background Text Text Roles |
| 3 | **Component Previews** | เก็บ component / base component จริงของหน้า | หลายอัน **optional** | `[Template] Component Previews` (9412:33) | Base Components (internal) Nation UI Icons Brand/Error/Alpha Button Data Table |
| 4 | **Token Document** | พจนานุกรมกลาง Design↔Dev: จับคู่ชื่อใน Figma (Style/Variable) ↔ ชื่อโค้ด (CSS class/var) + ค่าจริง + ใช้ตรงไหน ให้ 2 ทีมเรียกของชิ้นเดียวกัน | 1 ต่อหน้า (ถ้าหน้านั้นมี token) | `[Template] Token Document` (9624:26) | Typography Token Color Token Icon Token Buttons Token |
| 5 | **Space Document** | ระยะห่างและขนาดของ component ในหน้านั้น สูตร base กับ step ค่าทุกขนาด และตัวแปรที่ผูกได้ ทั้ง padding gap และมุมโค้ง | 1 ต่อหน้า (ถ้าหน้านั้นมี component) | `[Template] Space Document` (หน้า 00 Document) | Buttons Space |

**Component Previews (แก้เกณฑ์ 2026-08-06 ตามคำสั่ง user):** **หน้าไหนมี component จริงอยู่บนหน้า ต้องมี Component Previews แยกตามชนิด** (base `_prefix` แยกจากตัวใช้งาน) เฉพาะหน้าที่ **variable-driven ล้วนจริงๆ ไม่มี component เลย** (เช่น Typography) จึงไม่ต้องมี
> เดิมเขียนว่า Grid ไม่ต้องมี ซึ่งผิด เพราะหน้า 04 Grid มี component จริง 18 ตัวลอยอยู่ในหน้า

**การเรียงเอกสารบนแคนวาส (บังคับ ตั้ง 2026-08-27 ตามคำสั่ง user)**

เรียงจากซ้ายไปขวาตามลำดับนี้เสมอ ทุกหน้าเหมือนกันหมด

| ลำดับ | ชนิด |
|---:|---|
| 1 | Page Documentation |
| 2 | Token Document |
| 3 | Information Document (มีหลายอันให้เรียงต่อกันตามหัวข้อ) |
| 4 | Component Previews |
| 5 | Space Document |

- **เอกสารแรกอยู่ที่ x = 0 และ y = 0** ทุกหน้า
- **ช่องไฟระหว่างเอกสาร 200** คิดจากขอบขวาของอันก่อนหน้า ไม่ใช่ระยะตายตัว เพราะบางเอกสารกว้างไม่เท่า 1440
- ชนิดไหนไม่มีในหน้านั้นให้ข้ามไป ไม่ต้องเว้นที่ว่างไว้
- ของที่ไม่ใช่เอกสารทั้ง 5 ชนิด ให้วางต่อท้ายสุด
- **เส้นสีม่วงรอบชุด variant ไม่ใช่เส้นดิบ** (`#7b61ff` และ `#9747ff`) เป็นเส้นที่ Figma วาดเองรอบ COMPONENT_SET ทุกชุดในไฟล์ ตรวจแล้ว 12 Buttons 22 ชุด, 21 Tags 100 ชุด, 22 Badge 40 ชุด, 26 Table 1 ชุด มีครบทุกชุด **ห้ามผูกตัวแปรและห้ามนับเป็นเส้นดิบตอนสแกน**
- **มุมโค้ง 5px ของกรอบชุด variant ไม่ใช่มุมโค้งดิบ** (ตัดสิน 2026-09-29 ผู้ใช้สั่งว่าไม่ควรผูก) เป็นมุมของกรอบที่ Figma วาดเองรอบ COMPONENT_SET เหมือนเส้นสีม่วง ไม่ใช่รูปทรงของชิ้นงาน ผู้ใช้ปลายทางไม่เห็น **ห้ามผูกตัวแปรและห้ามนับเป็นมุมโค้งดิบตอนสแกน** ถ้าผูกจะกลายเป็นว่าค่ามุมโค้งของ component ถูกเอาไปใช้กับของที่ไม่ใช่ component
- **หน้าที่ยังไม่ได้ทำเอกสารจะมี `_document-header` ลอยอยู่บนแคนวาสเป็นป้ายชื่อหน้า** (สำรวจ 2026-08-27 พบ 42 อันใน 22 หน้า) อันนี้เป็นรูปแบบเดิมก่อนมีมาตรฐาน **ห้ามลบทิ้งเฉย ๆ** เพราะเป็นสิ่งเดียวที่บอกว่าหน้านั้นคืออะไร ให้ลบตอนทำเอกสารของหน้านั้นเสร็จแล้วเท่านั้น เพราะหัวเอกสารจริงจะอยู่ในเฟรมเอกสารแทน

**⚠️ กติกาตอนลงมืออยู่ที่ [context/workflows/figma-ds-file/doc-pages.md](../../context/workflows/figma-ds-file/doc-pages.md) (ย้ายมาจาก CLAUDE.md 2026-10-27):** ก่อนแตะเอกสารหน้าใดต้องทำ pre-flight 4 ขั้น (อ่านไฟล์นี้ สแกน frame ของหน้า เทียบ reference 01 Color / 03 Typography แจกแจง doc ชนิดที่จะทำแล้วรอยืนยัน) **ห้ามใช้ Page Documentation เป็นที่ทิ้งของ** specimen/ภาพชุด/anatomy ยาว/ตารางค่า ต้องแยกเป็น Information Document ตาราง token ต้องเป็น Token Document

**Token Document โครง + กฎ:** header + "เอกสารนี้คืออะไร" + "วิธีอ่าน" (🎨 ฝั่งออกแบบ Figma / 💻 ฝั่งพัฒนา Code) + **ตาราง 4 คอลัมน์** (ชื่อ Figma ชื่อโค้ด ค่า ใช้ตรงไหน) + กติกา sync **ตารางต้องประกอบจาก DS ชุดที่ลงท้ายด้วย `-table-cell` (หน้า 26 Table) ห้ามวาด cell เอง** (ดู [[table-cell-system]]) token เยอะ (สี/ปุ่ม หลายร้อย) → โชว์ชุดที่ใช้จริง/ตัวอย่างตระกูล + ชี้ไฟล์เต็ม ไม่ต้องลิสต์ทุกตัว

> ทุกหน้า DS = Page Documentation 1 (นำ) + Information Document หลายอัน + Component Previews หลายอัน (ถ้ามี component) + Token Document 1 (ถ้ามี token) + Space Document 1 (ถ้ามี component) **ทุก text/สี ต้อง bind variable สแกน raw=0 + em-dash=0 ก่อนถือว่าเสร็จ** (ดู [[figma-no-raw-fill-on-create]] [[naming-no-emdash]])

---

## 1. โครง Figma visual doc (section anatomy)

เรียงบนลงล่างในหน้า Figma **★ = must-have** (ทุก component ต้องมี) ที่เหลือใส่เมื่อเกี่ยวข้อง

| # | Section | เนื้อหา | must |
|---|---|---|:-:|
| 1 | **Header** | `_document-header` + ชื่อ + description 1 บรรทัด | ★ |
| 2 | **Overview / Preview** | ตัวอย่างเด่น (hero) ของ component | ★ |
| 3 | **Anatomy** | ผังส่วนประกอบมี label (container / label / icon / border …) | ★ |
| 4 | **Variants** | โชว์ทุก variant/family (เช่น ปุ่ม: brand/error/alpha/gray/neutral/link) | ★ |
| 5 | **Hierarchy / Emphasis** | primary / secondary / tertiary (ถ้ามี) | ★ |
| 6 | **Sizes** | xs–xl (ถ้ามี) | ★ |
| 7 | **States** | default / hover / focused / disabled (+ loading/selected ถ้ามี) เป็น matrix | ★ |
| 8 | **Usage Do / Don't** | ตัวอย่างถูก ✅ / ผิด ❌ พร้อมคำอธิบายสั้น | ★ |
| 9 | **Accessibility** | contrast ≥ 4.5:1 focus ring target size (≥ 44px) keyboard | ◇ |
| 10 | **Design tokens** | ตาราง token ที่ใช้ (ลิงก์ไป .md) | ◇ |
| 11 | **Specs / Redline** | spacing/padding/measurement | ◇ |
| 12 | **Related components** | ลิงก์ component ที่เกี่ยวข้อง | ◇ |

**หลักการ layout (DS document pattern):** container 1440 padding 0 section = FILL padding 80/40 grid 1280 ทุก text ผูก DS text style + สี bound variable (ห้าม raw/hex) ใช้ instance ของ component จริง (ห้ามวาดใหม่)

### 1.1 ตารางข้อมูลในเอกสาร (มาตรฐานบังคับ ตั้ง 2026-08-24)

> **ทำไมต้องมี** ตารางที่ทำเองในเอกสารหน้า Radius By Component และ Nested Radius ออกมาไม่เหมือนตารางมาตรฐาน เพราะสร้าง frame เปล่าขึ้นมาเองแทนที่จะลอกโครงจาก `[Template] Token Document` ไม่เคยมีกฎเขียนไว้ จึงบันทึกไว้ที่นี่

| ส่วน | เส้นขอบ | มุมโค้ง | ผูกกับ |
|---|---|---|---|
| **กล่องนอกสุดของตาราง** | 1px **ครบทั้ง 4 ด้าน** align INSIDE | **8px** ทั้ง 4 มุม + เปิด clip content | เส้น `color/border/general/primary` มุม `doc-table/radius/*` |
| **ทุกแถว รวมแถวหัวตาราง** | 1px **เฉพาะด้านล่าง** | ไม่มี | `color/border/general/primary` |
| **cell** | ไม่มีเส้นขอบ | ไม่มี | |

> **ตารางในเอกสารกับตารางของโปรดักต์ใช้คนละ token** เอกสารใช้ `doc-table/radius/*` ตารางข้อมูลจริงบนหน้า 26 Table ใช้ `table/radius/*` ค่าเท่ากันที่ 8 แต่แยกเจ้าของเพื่อให้เปลี่ยนแยกกันได้ในอนาคต

**กติกาเพิ่มเติม**
- cell ต้องเป็น instance `header-table-cell` และ `text-table-cell` จากหน้า 26 Table เท่านั้น ห้ามสร้าง cell เอง
- หัวตารางปิดไอคอน sort (`show-sort = false`) เว้นแต่ตารางนั้นเรียงลำดับได้จริง
- `text-table-cell` มี 2 ช่องข้อความ บรรทัดหลักคือค่า บรรทัดรองใช้ขยายความ ถ้าไม่ใช้ให้เว้นว่าง ห้ามปล่อยคำ default ค้าง
- ความกว้างคอลัมน์รวมกันต้องเท่ากับความกว้าง grid (1280)
- **วิธีที่ปลอดภัยที่สุดคือ clone `token-table` จาก `[Template] Token Document`** แล้วแก้เนื้อใน ไม่ต้องประกอบเอง

---

## 2. โครง Markdown page doc (สรุป)

ตาม [_TEMPLATE-page-doc.md](page-doc-template.md) 5 หัวข้อคงลำดับเสมอ:
1. **Metadata** (source of truth)
2. **Objective & Business Logic**
3. **Workflow** (Designer / Developer)
4. **Structure** (ตาราง: variants · props · tokens)
5. **Constraints** (ข้อห้าม + ปัญหาที่พบบ่อย)

---

## 3. Checklist ก่อนถือว่า "component doc เสร็จ"

- [ ] Markdown `docs/<NN>-<ชื่อ>.md` ครบ 5 หัวข้อ
- [ ] Figma visual doc ครบ section ★ (1–8)
- [ ] ทุก text/สี ใน Figma doc ผูก DS style/variable (ไม่มี hex ดิบ)
- [ ] ใช้ instance component จริง (ไม่วาดใหม่)
- [ ] ตาราง token ตรงกับ `component.json` ปัจจุบัน
- [ ] มี Do/Don't อย่างน้อย 1 คู่

---

## 4. Coverage สถานะเอกสารแต่ละหน้า

> component pages หลัก ◐ = มีบางส่วน ✅ = ครบ ⬜ = ยังไม่ทำ

> **Template Figma visual doc:** `[Template] Page Documentation` (node `9331:18`) บนหน้า **00 Document** clone ไปใช้ทุกหน้า (header + 11 section skeleton, layout มาตรฐาน)

| หน้า | Markdown | Figma visual doc |
|---|:-:|:-:|
| 01 Color | ✅ | ✅ **self-contained 12 section** (node 9335:7634, curated) sibling frames (Color palette/…) คงไว้เป็น specimen |
| 02 Icon | ✅ | ✅ **self-contained 9 section** (node 9343:50, ตัด hierarchy/states) Nation UI Icons + legacy sets คงไว้ |
| 12 Buttons | ✅ | ✅ 12 section (node 9232:338) = reference + **Space Document** `Buttons Space` (2026-08-26) |

> **หลักการ doc (สำคัญ):** visual doc เป็น **frame แรกของหน้า self-contained** (มี text + clone ตัวอย่าง hero) **ห้ามย้าย/กิน/ลบ frame อื่น (sibling)** ในหน้า sibling = specimen ตัวเต็มที่ doc โยงไปถึง (clone มาโชว์ตัวอย่างเท่านั้น)
| 07 Space (foundation) | ✅ | ✅ **4 เฟรม** Page Doc + Space Scale + Space Usage + Token Doc · **Page Doc ครบ 12 section (2026-09-04) จับคู่ชื่อเดิม structure→anatomy scale→sizes usage→usage-do-dont** |
| 08 Logo (foundation) | ✅ | ✅ **3 เฟรม** Page Doc + Component Previews `Nation Brand Logos` + Information `Draft Logos` · **Page Doc ครบ 12 section มี instance 14 ตัว และ Do/Don't (2026-09-04)** |
| 09 Third-party Logos | ✅ | ✅ **2 เฟรม** Page Doc + Component Previews `Third-party Logos` 505 การ์ด · **Page Doc ครบ 12 section มี instance 11 ตัว (2026-09-04)** |
| 05 Effect | ✅ | ✅ **6 เฟรม** Page Doc ครบ 12 section มี instance 40 ตัว และ Do/Don't 2 คู่ + Effect Token + Elevation Principle + Component Previews 3 เฟรม (2026-09-04) |
| 06 Shape | ✅ | ✅ **5 เฟรม** Page Doc ครบ 12 section + Radius Scale + Radius By Component + Nested Radius + Token Doc · หน้านี้ไม่มี component จึงใช้คำอธิบายแทนภาพใน section ที่ไม่มีของ (2026-09-04) |
| 03 Typography (foundation) | ⬜ | ◐ |
| 26 Table | ⬜ | ◐ **Space Document** `Table Space` (2026-08-26) |
| 00 Document | ✅ | ✅ **2 เฟรม** Page Doc `00 Document Documentation` 6 section มีตัวอย่างหัวเอกสารจริง 2 แบบ และ Do/Don't + Component Previews `Document Base Components` เก็บชุด `_document-header` 4 แบบ (2026-10-14) |
| 10 Frame | ✅ | ✅ **3 เฟรม** Page Doc + Component Previews `Frame Ratios` + Information `Ratio Guide` · **Page Doc ครบ 12 section มี instance 23 ตัว และ Do/Don't (2026-09-04)** |
| 11 Avatar | ✅ | ✅ **4 เฟรม** Page Doc + Information `Avatar Guide` + Component Previews `Avatar Components` + Space `Avatar Space` · **Page Doc ครบ 12 section มี instance 52 ตัว และ Do/Don't 2 คู่ (2026-09-04)** |
| 13 Input | ✅ | ✅ **5 เฟรม ครบทุกชนิด** Page Doc + Token `Input Token` + Information `Input Guide` + Component Previews `Input Components` + Space `Input Space` · **Page Doc ครบ 12 section มี instance 37 ตัว และ Do/Don't 2 คู่ (2026-09-04)** |
| 21 Tags | ✅ | ✅ **14 เฟรม ครบทุกชนิด** Page Doc + Token `Tags Token` + Information `Tags Guide` + Component Previews 10 ตระกูล + Space `Tags Space` (2026-09-11 ยุบโครงให้สไตล์อยู่ในแกน hierarchy เหลือ 100 ชุด 2,910 แบบ 10 ชื่อ ชื่อทรงใช้ `semi-rounded-` และ `pill-` ตรงกับปุ่มและป้าย) |
| 22 Badge | ✅ | ✅ **14 เฟรม ครบทุกชนิด** Page Doc + Token `Badge Token` + Information `Badge Guide` + Component Previews 10 ตระกูล + Space `Badge Space` (2026-09-11 ยุบจาก 140 ชุดเหลือ 40 ชุด 800 แบบ 4 ชื่อ สร้าง token 50 ตัว ผูกตัวแปรและ text style ครบ Badge เป็นของนิ่ง ไม่มีแกน state) |
| 14 Toggles | ✅ | ✅ **5 ชนิดครบ** Page Doc 12 section มี instance 23 ตัว + Token + Information 3 อัน + Component Previews เฟรม `Toggle` แยกเก็บชุดต้นฉบับ 40 แบบ + Space (2026-09-04) |
| 23 Progress Bars | ✅ | ✅ **7 เฟรม ครบทุกชนิด** Page Doc + Token + Information 2 + Component Previews 2 + Space (2026-10-09) |
| 24 Pagination | ✅ | ✅ **7 เฟรม ครบทุกชนิด** Page Doc + Token + Information 2 + Component Previews 2 + Space (2026-10-12) |
| 25 Dropdowns | ✅ | ✅ **7 เฟรม ครบทุกชนิด** Page Doc + Token + Information 2 + Component Previews 2 + Space (2026-10-12) |
| 27 Card | ✅ | ✅ **7 เฟรม ครบทุกชนิด** Page Doc + Token + Information 2 (`Card Usage` `Card Anatomy`) + Component Previews 2 + Space (2026-10-14) |
| 28 Dividers | ✅ | ✅ **5 เฟรม ครบทุกชนิด** Page Doc + Token + Information `Divider Usage` + Component Previews + Space (2026-10-14) |
| 15 Checkbox 16 Radio 17 Sliders 18 Tabs 19 Toasts&Banners 20 Tooltips | ⬜ | ⬜ |

> **หมายเหตุ:** foundation pages (color/typo/icon/grid/effect/space/logo) เน้น token/specimen เป็นหลัก section Anatomy/States/Do-Don't อาจปรับให้เหมาะ (ไม่ใช่ทุก section เท่ากับ interactive component)

---

## 5. อ้างอิง benchmark (เจ้าใหญ่มี section อะไร)

| Section | M3 | Carbon | Polaris | Spectrum | Atlassian | Ant |
|---|:-:|:-:|:-:|:-:|:-:|:-:|
| Overview | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Anatomy | ✅ | ✅ | | ✅ | ✅ | |
| Variants | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| States | ✅ | ✅ | | ✅ | ✅ | |
| Do/Don't | ✅ | ✅ | ✅ | ✅ | ✅ | |
| Accessibility | ✅ | ✅ | ✅ | ✅ | ✅ | |
| Tokens/Specs | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Content/writing | | ✅ | ✅ | ✅ | ✅ | |
| Code/API | | ✅ | ✅ | | ✅ | ✅ |

Carbon/M3 จัดเป็น tab (Usage/Style/Code/Accessibility) Polaris เน้น best-practice + examples Spectrum เน้น anatomy/options ละเอียด
