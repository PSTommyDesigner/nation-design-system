---
title: "Nation Design System ภาพรวมระบบ"
description: "จุดเริ่มต้นของเอกสารทั้งหมด บอกว่าระบบประกอบด้วยอะไร ความจริงอยู่ที่ไหน ค่าไหลจากไฟล์ออกแบบไปเป็นโค้ดอย่างไร และเอกสารแต่ละฉบับอยู่ตรงไหน"
target_audience: ["UI/UX Designer", "Frontend Developer", "Design System Maintainer"]
version: "1.0.0"
last_updated: "2026-10-19"
status: "active"
sources_of_truth:
  figma_page: "ไฟล์ DS หลัก QgmoT5Uuvv3elB96F4nsTq"
  code: "tokens/tokens.json และ tokens/scale"
  prototype: "prototype/"
---

# Nation Design System ภาพรวมระบบ

ระบบออกแบบกลางของเครือเนชั่น ใช้ร่วมกันทุกเว็บในเครือ (bangkokbiznews, nationtv, komchadluek, thansettakij, springnews, posttoday)
เอกสารฉบับนี้เป็นจุดเริ่มต้น อ่านก่อนแตะอะไรก็ตามในโปรเจกต์

## 1. ระบบนี้ประกอบด้วยอะไร

| ชั้น | อยู่ที่ไหน | ใครเป็นเจ้าของความจริง |
|---|---|---|
| ไฟล์ออกแบบ | Figma ไฟล์ `QgmoT5` 29 หน้า (00 ถึง 28) เรียงตาม Atomic Design | Figma |
| สูตรขนาด | `tokens/scale/*.mjs` | โค้ด |
| ค่ากลาง (token) | `tokens/tokens.json/*.json` รูปแบบ W3C DTCG แยกไฟล์ตาม collection | Figma แล้ว export ลงมา |
| ผลลัพธ์ที่เอาไปใช้ | `tokens/output/css/*.css` และ `tokens/output/js/*.mjs` | สร้างอัตโนมัติ ห้ามแก้มือ |
| ชิ้นงานฝั่งโค้ด | `components/` | โค้ด |
| prototype ของแต่ละโปรเจค ทีละหน้า | `prototype/<โปรเจค>/` เป็น Storybook story ที่ใช้ component จริง | โค้ด |
| เว็บพรีวิว component library | `npm run storybook` (dev) หรือ `.storybook/` + `*.stories.tsx` ในแต่ละโฟลเดอร์ component | โค้ด |

ตัวแปร CSS ใช้คำนำหน้า `--ntg-` ทั้งระบบ แบรนด์ในเครือใช้ตัวย่อ 3 ตัวอักษร ดู [brand-codes.md](brand-codes.md)

## 2. ค่าไหลอย่างไร

```
Figma variables + styles
   ↓  Token Press plugin (export ทับ tokens/tokens.json/*.json)
tokens/tokens.json/*.json          ← แก้เล็กน้อยแก้ไฟล์นี้ตรง ๆ ได้
   ↓  npm run tokens:build
   ├── clean-selfref.mjs           ล้าง token ที่อ้างตัวเอง
   ├── generate-scale.mjs          คำนวณขนาดจากสูตร + ด่านตรวจ
   └── build-tokens.mjs            Style Dictionary
tokens/output/css + js             ← เอาไปใช้จริง
```

**ข้อควรรู้:** `npm run tokens:pull` (REST `/variables/local`) ใช้ไม่ได้บนแพลนปัจจุบัน เป็นของ Enterprise เท่านั้น
วิธี sync จริงคือ Token Press plugin หรือแก้ไฟล์ token ตรง ๆ แล้ว build ทั้งสองวิธีได้ข้อมูลเหมือนกัน

การเปลี่ยนชื่อ layer จัดหน้า หรือเลื่อนเลขหน้าใน Figma **ไม่กระทบโค้ด** sync เฉพาะชั้นตัวแปรเท่านั้น

## 3. ด่านตรวจตอนสร้างไฟล์

`generate-scale.mjs` จะหยุด build ถ้าเจอค่าที่อธิบายที่มาไม่ได้ มี 3 ด่าน

| ด่าน | จับอะไร |
|---|---|
| มุมโค้ง | ค่าต้องมาจาก `RADIUS_SCALE` หรือสูตรของ component ตัวเอง |
| ระยะห่าง | ชุดขนาดต้องเป็นเส้นตรงหรือมี `$description` ครบทุกขั้น · ค่าเดี่ยวต้องมีคำอธิบาย · ต้องเป็นจำนวนเต็มไม่ติดลบเว้นแต่ประกาศ `allowNegative` · component ที่ประกาศ `checks` ต้องบวกกลับได้ |
| สเกลกลาง | ค่าในสเกลระยะห่างกลางห้ามซ้ำกัน ชื่อสองชื่อห้ามหมายถึงค่าเดียวกัน |

ระยะห่างภายในชิ้นงานเป็นของชิ้นงานนั้นเอง **ไม่บังคับ**ให้อยู่ในสเกลกลาง ส่วนระยะห่างระดับจัดหน้าใช้สเกลกลาง `size/space/s1..s5`

## 4. คำสั่งที่ใช้บ่อย

| คำสั่ง | ทำอะไร |
|---|---|
| `npm run tokens:build` | สร้าง token ใหม่ทั้งหมด ใช้หลัง export จาก Token Press ทุกครั้ง |
| `npm run tokens:generate` | รันเฉพาะสูตรขนาดและด่านตรวจ |
| `npm run typecheck` | ตรวจชนิดข้อมูลของ `components/` ทั้งหมด ต้องขึ้น 0 error ก่อนบอกว่าแก้โค้ดเสร็จ |
| `npm run tokens:verify` | เทียบชื่อและค่าตัวแปรระหว่างไฟล์ออกแบบกับ `tokens/tokens.json` ต้องขึ้น "ต้องดู 0 กลุ่ม" |
| `npm run verify:coverage` | เทียบ `tokens/scale/*.mjs` กับ `components/` หาช่องว่างและโฟลเดอร์เปล่า |
| `npm run verify:api` | เทียบแกน variant กับ component property ในไฟล์ออกแบบ กับ props จริงในไฟล์ `.tsx` |
| `npm run verify:families` | เทียบสีที่แต่ละตระกูลใช้กับตระกูลของตัวเอง สำหรับหน้าที่จัดชิ้นงานเป็นตระกูลสี |
| `npm run worklog:new` | สร้างไฟล์บันทึกงานประจำวัน |
| `npm run worklog:asana` | ส่งบันทึกงานขึ้น Asana |
| `npm run worklog:month` | สรุปรายเดือนขึ้นการ์ดสรุป |
| `npm run storybook` | เปิดเว็บพรีวิว component library แบบ dev ที่ `localhost:6006` |
| `npm run build-storybook` | build เว็บพรีวิวเป็น static ลง `storybook-static/` deploy อัตโนมัติขึ้น GitHub Pages ทุกครั้งที่ push เข้า `main` |

## 5. กฎที่ห้ามฝ่าฝืน

รายละเอียดเต็มอยู่ใน [AGENTS.md](../AGENTS.md) ที่รากโปรเจกต์ (CLAUDE.md ดึงไฟล์นี้ไปใช้) และไฟล์ที่ระบุใน [context/index.md](../context/index.md) สรุปหัวใจ

- **ห้ามใช้สีดิบ** ทุกสีต้องผูกตัวแปร และผูกจาก collection `component` เท่านั้น
- **ตัวอักษรใช้ preset เท่านั้น** ห้ามจับคู่ family กับขนาดเอง ห้าม override ความสูงบรรทัดหรือน้ำหนัก
- **ใช้ของที่มีใน DS** ห้ามวาดหรือสร้าง element เองถ้ามีชิ้นงานหรือไอคอนอยู่แล้ว
- **สร้าง component ใหม่ที่มีหลายขนาด ต้องทำสูตรขนาดไปพร้อมกัน** ห้ามพิมพ์ค่าตายทีละขนาด
- **สร้าง component ใหม่ ต้องกำหนดเงาให้ด้วยเสมอ** และห้ามใส่เงาดิบ
- **ทำทีละหน้า** หยิบหน้าไหนมาทำให้ตรวจและแก้เฉพาะหน้านั้น ของเก่านอกหน้าที่ทำอยู่ให้บันทึกเป็นงานค้าง ไม่ต้องแก้
- **ถามก่อนเสมอ** ทั้งของที่ยังไม่มีและของที่จะแก้หรือลบ

## 6. สารบัญเอกสาร

### กติกา (docs/rules)
| ไฟล์ | เนื้อหา |
|---|---|
| [component-doc-standard.md](rules/component-doc-standard.md) | เอกสาร 5 ชนิดต่อหน้าในไฟล์ออกแบบ และเนื้อหาแบบไหนอยู่ชนิดไหน |
| [page-doc-template.md](rules/page-doc-template.md) | แม่แบบเอกสารประจำหน้าฝั่งโค้ด 5 หัวข้อ |
| [token-naming-taxonomy.md](rules/token-naming-taxonomy.md) | กติกาตั้งชื่อ token ตามลำดับชั้น base semantic component |
| [asana-task-naming.md](rules/asana-task-naming.md) | กติกาตั้งชื่อการ์ดงานและแม่แบบรายละเอียด 5 หัวข้อ |
| [worklog.md](rules/worklog.md) | วิธีบันทึกงาน เก็บที่ไหน ส่งขึ้น Asana อย่างไร |

### เอกสารประจำหน้า (มีแล้ว 28 จาก 29 หน้า)
| 01 ถึง 28 | 00 Document |
|---|---|
| [01 Color](01-color.md) · [02 Icons](02-icons.md) · [03 Typography](03-typography.md) · [04 Grid](04-grid.md) · [05 Effect](05-effect.md) · [06 Shape](06-shape.md) · [07 Space](07-space.md) · [08 Logo](08-logo.md) · [09 Third-party Logos](09-third-party-logos.md) · [10 Frame](10-frame.md) · [11 Avatar](11-avatar.md) · [12 Buttons](12-buttons.md) · [13 Input](13-input.md) · [14 Toggles](14-toggles.md) · [15 Checkbox](15-checkbox.md) · [16 Radio](16-radio.md) · [17 Sliders](17-sliders.md) · [18 Tabs](18-tabs.md) · [19 Toasts & Banners](19-toasts-banners.md) · [20 Tooltips](20-tooltips.md) · [21 Tags](21-tags.md) · [22 Badge](22-badge.md) · [23 Progress Bars](23-progress-bars.md) · [24 Pagination](24-pagination.md) · [25 Dropdowns](25-dropdowns.md) · [26 Table](26-table.md) · [27 Card](27-card.md) · [28 Dividers](28-dividers.md) | ไม่มีไฟล์ `docs/00-*.md` เพราะหน้า 00 ใช้ Page Documentation และ Component Previews ในไฟล์ออกแบบเองแทน (ดูหน้า `00 Document Documentation` ใน Figma) |

> **ตัดจากรายการเดิม (ไม่มีอยู่จริงแล้ว 2026-10-19)** `26 Image And Carousel` และ `27 Lists` (เลขเก่าก่อนยุบหน้า) `30 Panels` `32 Modals` `33 Sidebars` `29 Header` `35 Footer` `36 Templates` เป็นหน้าชั้น Organisms ที่ถูกยุบไปแล้วเมื่อ 2026-10-12 (ดูเหตุผลที่ [rules/layer-scope.md](rules/layer-scope.md)) ไฟล์ Figma ปัจจุบันมี 29 หน้าเท่านั้นคือ 00 ถึง 28

รายชื่อหน้าทั้งหมดพร้อมรหัสโหนดอยู่ที่ [figma-pages.md](figma-pages.md) **เลขหน้ายึดตามไฟล์ Figma เป็นหลัก** ชื่อไฟล์เอกสารตั้งตามเลขหน้านั้น

### งานวิจัยที่ใช้ตัดสิน (docs/research)
| ไฟล์ | ใช้ตัดสินเรื่องอะไร |
|---|---|
| [spacing-scale.md](research/spacing-scale.md) | โครงสเกลระยะห่างและขอบเขตว่าใช้กับอะไร |
| [shape-radius.md](research/shape-radius.md) | ค่ามุมโค้งและการตั้งชื่อ |
| [effect-elevation.md](research/effect-elevation.md) | ชื่อและโครงของเงา |
| [grid-column-width.md](research/grid-column-width.md) | ระบบกริดและความกว้างคอลัมน์ |
| [avatar-component.md](research/avatar-component.md) · [badge-component.md](research/badge-component.md) · [input-component.md](research/input-component.md) · [toggle-component.md](research/toggle-component.md) · [dropdown-component.md](research/dropdown-component.md) · [pagination-component.md](research/pagination-component.md) · [progress-component.md](research/progress-component.md) · [slider-component.md](research/slider-component.md) · [tabs-component.md](research/tabs-component.md) · [toast-banner-component.md](research/toast-banner-component.md) · [tooltip-component.md](research/tooltip-component.md) | สูตรขนาดและโครงของชิ้นงานแต่ละชนิด เทียบกับ DS เจ้าใหญ่ 10 ถึง 15 เจ้าต่อตัว |
| [ds-ownership-model.md](research/ds-ownership-model.md) | โมเดลการดูแล DS จาก 19 องค์กร |
| [component-library-preview-site.md](research/component-library-preview-site.md) | เครื่องมือทำเว็บพรีวิว component ที่ทีมอื่นเข้ามาดู/ใช้ได้ ตัดสินใจเลือก Storybook เมื่อ 2026-10-19 |
| [component-inventory-research.md](component-inventory-research.md) | รายการชิ้นงานที่ต้องมีและ token ที่ต้องใช้ |

### บันทึกงาน
บันทึกรายวันอยู่ที่ `docs/daily-log/daily/<เดือนไทย ปีพุทธศักราช>/` หนึ่งไฟล์ต่อวัน วิธีเขียนและจังหวะส่งขึ้น Asana อยู่ใน [worklog.md](rules/worklog.md)
