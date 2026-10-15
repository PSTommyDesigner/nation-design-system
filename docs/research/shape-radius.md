---
title: "Shape และ Corner Radius System (research)"
description: "เทียบระบบ radius ของ DS เจ้าใหญ่ 10 เจ้า พร้อมข้อเสนอสเกล radius ของ NTGDS สำหรับหน้า 06 Shape"
research_date: "2026-08-19"
scope: "Material 3 Fluent 2 Adobe Spectrum 2 Tailwind v4 Atlassian GitHub Primer Shopify Polaris Radix Themes News UK NewsKit IBM Carbon"
status: "ปิดแล้ว ข้อเสนอใน §16 ถูกทดลองแล้วไม่ได้ใช้ ดูบันทึกท้ายหัวเรื่อง"
owner: "ux-researcher"
asana: "1217627828408109"
---

# Research Shape และ Corner Radius System ของ Design System เจ้าใหญ่

> ## ⚠️ อ่านก่อน ข้อเสนอในไฟล์นี้ถูกทดลองแล้วและไม่ได้ใช้ (บันทึก 2026-08-20)
>
> ข้อเสนอใน §16 (สเกลกลางชื่อเลข 9 ขั้น ชั้น semantic ตามบทบาท สร้างเป็นตัวแปรใน Figma) **ถูกลงมือทำจริงแล้วถอยออกภายในวันเดียว**
>
> **สาเหตุ** สร้างชั้นกลาง 16 ตัวใน Figma ก่อนที่จะมีชิ้นงานมาใช้ พอตรวจจริงพบว่าไม่มี component ตัวไหนผูกเลย และไฟล์นี้เคยมีชั้นกลางแบบเดียวกันมาแล้ว **2 รุ่น** ซึ่งถูกลบทิ้งทั้งคู่ ทิ้งของค้างไว้ **3,467 จุด** ที่ผูกกับตัวแปรที่ไม่มีอยู่แล้ว
>
> **ทางที่ใช้จริง** ค่าตัวเลขโค้ดเป็นคนตัดสินโดยคำนวณจากสเกล Figma มีตัวแปรชั้นเดียวคือระดับ component เหตุผลเต็มอยู่ที่ [../rules/token-naming-taxonomy.md](../rules/token-naming-taxonomy.md) §3.3.1 และ [../06-shape.md](../06-shape.md) ข้อ 6
>
> เนื้อหาส่วนเทียบ design system เจ้าอื่น (§1 ถึง §15) ยังใช้อ้างอิงได้ตามปกติ



**วันที่วิจัย:** 2026-08-19
**ผู้วิจัย:** ux-researcher (Nation Design System)
**โจทย์:** หาข้อมูลระบบ shape/corner radius ของ DS ระดับโลก เพื่อปรับปรุงหน้า 06 Shape ของ NTGDS

**ป้ายแหล่ง:** `[ทางการ]` = เว็บ/repo ขององค์กรเอง `[กึ่งทางการ]` = พนักงานพูดเอง `[แหล่งรอง]` = คนนอก

---

## 1. Material 3 (Google)

### 1.1 โครงสเกล radius

M3 Expressive (2025) ขยายสเกลจาก 7 ขั้นเดิมเป็น **10 ขั้น** โดยเพิ่มขั้น "increased" คั่นกลางและเพิ่ม xxl

ค่าจริงอ่านจาก source ของ Jetpack Compose Material3 (`ShapeTokens.kt`) `[ทางการ]`

| ขั้น (token) | ค่า | หมายเหตุ |
|---|---|---|
| CornerNone | 0 dp | RectangleShape |
| CornerExtraSmall | 4 dp | |
| CornerSmall | 8 dp | |
| CornerMedium | 12 dp | |
| CornerLarge | 16 dp | |
| CornerLargeIncreased | 20 dp | **ขั้นใหม่ M3 Expressive** |
| CornerExtraLarge | 28 dp | |
| CornerExtraLargeIncreased | 32 dp | **ขั้นใหม่ M3 Expressive** |
| CornerExtraExtraLarge | 48 dp | **ขั้นใหม่ M3 Expressive** |
| CornerFull | CircleShape | pill/วงกลม |

**ชนิดสเกล:** ไม่ใช่เลขคณิตล้วนและไม่ใช่เรขาคณิตล้วน ช่วงล่างเป็นเลขคณิต step 4 (0, 4, 8, 12, 16, 20) แล้วช่วงบนกระโดด (28, 32, 48) เป็นแบบ "ผสม" ที่เลือกค่าตามการใช้งานจริงมากกว่าสูตร

**มี `none` และ `full` ครบ** `full` implement เป็น CircleShape (percent 50) ไม่ใช่ตัวเลข px คงที่

นอกจากนี้ M3 ยังมีชุด **directional token** สำหรับกรณีโค้งเฉพาะบางมุม `[ทางการ]`
`CornerExtraSmallTop` (4dp เฉพาะบน) `CornerExtraLargeTop` (28dp เฉพาะบน) `CornerLargeTop` `CornerLargeStart` `CornerLargeEnd` (16dp) ใช้กับ bottom sheet, side sheet, navigation drawer

### 1.2 การตั้งชื่อ

ใช้ **t-shirt size** (`none / extra-small / small / medium / large / extra-large / full`) + suffix `-increased` สำหรับขั้นแทรก
รูปแบบ CSS custom property ของ Material Web คือ `--md-sys-shape-corner-<step>` `[ทางการ]`

**Tier:** M3 มี 2 ชั้นชัดเจน
- `md.sys.shape.corner.*` = system/semantic (ตัวสเกล)
- `md.comp.<component>.container.shape` = component token ที่ชี้ไปยัง sys อีกที (เช่น `md.comp.filled-button.container.shape`)
ไม่มีชั้น primitive ตัวเลขดิบแยกต่างหาก คือ sys เป็นตัวถือค่า px เอง

Material Web ยังมี "shorthand token" สำหรับมุมเดี่ยว (`corner-large-start`, `corner-extra-small-top`) แต่ระบุว่าเป็น **unsupported shorthand** ตั้งค่าตรงไม่ได้ ต้องตั้งที่ custom property ของมุมเดี่ยวแทน `[ทางการ]`

### 1.3 ผูกกับ component

หลักที่ M3 ใช้คือ **ยิ่ง container ใหญ่/ยิ่งลอยสูง ยิ่งโค้งมาก** ตัวอย่าง mapping (จาก Compose default + token) `[ทางการ]`
- ปุ่ม, FAB, chip = full หรือ large (M3 Expressive เปลี่ยนปุ่มมาตรฐานเป็น full/pill)
- card = medium (12dp)
- dialog = extra-large (28dp)
- bottom sheet = extra-large-top (28dp เฉพาะมุมบน)
- text field = extra-small-top (4dp เฉพาะมุมบน) สำหรับ filled variant
- menu / snackbar = extra-small ถึง small

### 1.4 shape มากกว่า radius

M3 คือกลุ่มที่ไปไกลที่สุดในเรื่อง shape ที่ไม่ใช่แค่ radius
- **Corner family** M3 รองรับ 2 ตระกูลคือ `rounded` และ `cut` (มุมตัดเฉียง) กำหนดได้ที่ระดับ theme
- **Shape library (M3 Expressive)** เพิ่มชุดรูปทรง abstract ประมาณ 35 แบบ (pill, clover, cookie, burst, flower ฯลฯ) ใช้เป็น container/avatar/loading indicator
- **Shape morph** เปลี่ยนรูปทรงหนึ่งเป็นอีกรูปทรงตอน interaction (เช่น กดปุ่มแล้ว square กลายเป็น pill, loading indicator หมุนเปลี่ยนทรง) implement ผ่าน `androidx.graphics.shapes`

> ข้อสังเกตสำหรับ NTGDS: shape library + morph เป็นของ native app (Compose) เป็นหลัก เว็บข่าวไม่จำเป็นต้องทำ ที่ควรหยิบมาคือ **โครงสเกล 10 ขั้น + directional token + กฎ "ใหญ่ = โค้งมาก"**

### แหล่ง
- [ShapeTokens.kt androidx Compose Material3](https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ShapeTokens.kt) `[ทางการ]` (ค่า dp ทุกตัวมาจากไฟล์นี้)
- [Material Web Theming Shape](https://material-web.dev/theming/shape/) `[ทางการ]` (ชื่อ custom property `--md-sys-shape-corner-*`)
- [m3.material.io/styles/shape/corner-radius-scale](https://m3.material.io/styles/shape/corner-radius-scale) `[ทางการ]` **หมายเหตุ:** หน้านี้ render ด้วย JS ดึงเนื้อหาผ่าน WebFetch ไม่ได้ (ได้แต่ title) จึงใช้ source code เป็นหลักแทน

---

## 2. Fluent 2 (Microsoft)

### 2.1 โครงสเกล radius และความไม่ตรงกันระหว่างเอกสารกับโค้ด

**สำคัญ:** พบว่า **เว็บ design ของ Fluent 2 กับ token ในโค้ดให้ค่าไม่ตรงกัน** ต้องระวัง

**ก. จากเว็บ fluent2.microsoft.design/shapes** `[ทางการ]`

| Token | ค่า |
|---|---|
| None | 0 px |
| Small | 2 px |
| Medium | 4 px |
| Large | 8 px |
| X-Large | 12 px |
| Circle | 50% |

**ข. จาก source `packages/tokens/src/global/borderRadius.ts` ของ FluentUI** `[ทางการ]`

| Token | ค่า |
|---|---|
| borderRadiusNone | 0 |
| borderRadiusSmall | 2px |
| borderRadiusMedium | 4px |
| borderRadiusLarge | 6px |
| borderRadiusXLarge | 8px |
| borderRadius2XLarge | 12px |
| borderRadius3XLarge | 16px |
| borderRadius4XLarge | 24px |
| borderRadius5XLarge | 32px |
| borderRadius6XLarge | 40px |
| borderRadiusCircular | 10000px |

จะเห็นว่าโค้ดมี 11 ขั้น (ละเอียดกว่าเว็บมาก) และค่า Large/XLarge เลื่อนกันหนึ่งขั้น
**บทเรียนสำหรับ NTGDS:** เอกสารกับ token ต้องเป็นตัวเดียวกัน ไม่งั้นจะเกิดสภาพนี้ (นักออกแบบอ่านเว็บได้ 8px แต่ dev เขียนโค้ดได้ 6px)

**ชนิดสเกล:** ช่วงล่างละเอียด step 2 (0, 2, 4, 6, 8) แล้วเป็น step 4 (12, 16) แล้วกระโดดเป็น step 8 (24, 32, 40) = สเกลแบบ "ถี่ตอนเล็ก ห่างตอนใหญ่" ซึ่งตรงกับความจริงว่าตาคนแยกความต่าง 2px ที่ radius เล็กได้ แต่แยก 2px ที่ radius 32 ไม่ออก

**`full`:** Fluent ใช้ `borderRadiusCircular = 10000px` (ค่าใหญ่มาก) แทน `9999px`/`50%` เพื่อให้ได้ pill ที่ไม่เพี้ยนตอน element ไม่เป็นสี่เหลี่ยมจัตุรัส

### 2.2 การตั้งชื่อ

t-shirt size ล้วน (`None/Small/Medium/Large/XLarge/2XLarge...`) ไม่มีเลข ไม่มีชื่อตามหน้าที่
**Tier:** Fluent เก็บ borderRadius ไว้ที่ชั้น **global token เท่านั้น** (โฟลเดอร์ `global/`) ไม่มีชั้น alias/semantic สำหรับ radius (ต่างจากสีที่มี global → alias เต็มระบบ) component เรียก global โดยตรง

### 2.3 กฎผูกกับ component

Fluent เขียนกฎเป็นตัวหนังสือชัดที่สุดในบรรดาทุกเจ้า `[ทางการ]`
- ค่ามาตรฐานของสี่เหลี่ยมทั่วไป = **4 px**
- **ถ้า shape เล็กกว่า 32 px ให้ลด radius เหลือ 2 px**
- component ขนาดใหญ่/ใหญ่พิเศษใช้ 8 px และ 12 px
- ตัวอย่าง: badge เล็ก = 2px · button/dropdown = 4px · button ใหญ่ = 8px · sheet/popover = 12px · avatar/persona = circle

นี่คือ **กฎ threshold ตามขนาดจริงของ element** (ไม่ใช่ตามชนิด component) ซึ่งเอามาใช้กับ NTGDS ได้ตรง ๆ

### แหล่ง
- [Fluent 2 Shapes](https://fluent2.microsoft.design/shapes) `[ทางการ]`
- [fluentui/packages/tokens/src/global/borderRadius.ts](https://raw.githubusercontent.com/microsoft/fluentui/master/packages/tokens/src/global/borderRadius.ts) `[ทางการ]`

---

## 3. Adobe Spectrum (Spectrum 2)

Spectrum เป็นเจ้าที่ทำ **radius ผันตามขนาด component** เป็นระบบที่สุด (ตอบข้อ 3 ของโจทย์ได้ดีที่สุด)

### 3.1 โครงสเกล radius (primitive)

จาก `packages/tokens/src/layout.json` ของ repo `adobe/spectrum-design-data` `[ทางการ]`

| Token | ค่า |
|---|---|
| corner-radius-0 | 0 px |
| corner-radius-75 | 3 px |
| corner-radius-100 | 4 px |
| corner-radius-200 | 5 px |
| corner-radius-300 | 6 px |
| corner-radius-400 | 7 px |
| corner-radius-500 | 8 px |
| corner-radius-600 | 9 px |
| corner-radius-700 | 10 px |
| corner-radius-800 | 16 px |
| corner-radius-1000 | 0.5 (ตัวคูณ = 50%) |

**ชนิดสเกล:** เลขคณิต step 1 px ตั้งแต่ 3 ถึง 10 (75, 100, 200, 300, 400, 500, 600, 700 = 3, 4, 5, 6, 7, 8, 9, 10) แล้วกระโดดไป 16
นี่คือสเกลที่ **ละเอียดมากผิดจากคนอื่น** เพราะ Spectrum ต้องรองรับ 2 platform scale (desktop/mobile) และต้องให้ radius โตตามขนาด component แบบทีละ px

### 3.2 การตั้งชื่อ และ tier

Spectrum ใช้ **ระบบ 3 ชั้นเต็มรูปแบบ** ซึ่งเป็นแบบที่ NTGDS ควรลอก

1. **primitive/ตัวเลข:** `corner-radius-75 … corner-radius-1000` (ชื่อเป็นเลขล้วน ไม่ผูกความหมาย)
2. **semantic ตามขนาด default:**
   - `corner-radius-none` → `{corner-radius-0}`
   - `corner-radius-small-default` → `{corner-radius-100}` (4px)
   - `corner-radius-medium-default` → `{corner-radius-500}` (8px)
   - `corner-radius-large-default` → `{corner-radius-700}` (10px)
   - `corner-radius-extra-large-default` → `{corner-radius-800}` (16px)
   - `corner-radius-full` → `{corner-radius-1000}` (50%)
3. **semantic ผันตามขนาด component (size-responsive)** ชั้นนี้คือหัวใจ

| radius tier | size=extra-small | size=small | size=medium | size=large | size=extra-large |
|---|---|---|---|---|---|
| corner-radius-small-* | ไม่มี | 3 px (75) | 4 px (100) | 5 px (200) | 6 px (300) |
| corner-radius-medium-* | 6 px (300) | 7 px (400) | 8 px (500) | 9 px (600) | 10 px (700) |

อ่านว่า: component ที่ถูกจัดอยู่ในกลุ่ม "radius เล็ก" เมื่อ render ที่ size medium จะได้ 4px แต่ถ้า render ที่ size extra-large จะได้ 6px **โดยอัตโนมัติ ไม่ต้องเขียน override รายตัว**

นี่คือคำตอบเชิงระบบของโจทย์ "ของเล็กใช้ radius เล็ก ของใหญ่ใช้ radius ใหญ่" ที่ Fluent เขียนไว้เป็นแค่กฎบนกระดาษ แต่ Spectrum ทำเป็น token จริง

### 3.3 ผูกกับ component

Spectrum เก็บ token ของ component แยกไฟล์ต่อ component (91 ไฟล์ใน `packages/tokens/src/`) แต่ component ที่ radius ไม่เปลี่ยนตามอะไรเลยจะ hardcode ชี้ primitive ตรง ๆ
ตัวอย่าง `[แหล่งรอง / wiki ของ adobe/spectrum-css]`: ActionButton มี border-radius = `corner-radius-100` เสมอ ประกาศเป็น component-level custom property
**หมายเหตุความไม่ครบ:** เปิด `button.json` แล้วไม่พบ token radius (มีแต่ `button-minimum-width-multiplier`) แปลว่า Spectrum 2 ให้ปุ่มไปดึงจาก semantic size-responsive ชั้นบนแทนที่จะประกาศซ้ำใน component

### แหล่ง
- [spectrum-design-data packages/tokens/src/layout.json](https://raw.githubusercontent.com/adobe/spectrum-design-data/main/packages/tokens/src/layout.json) `[ทางการ]`
- [รายชื่อไฟล์ token ทั้ง 91 ไฟล์](https://api.github.com/repos/adobe/spectrum-design-data/contents/packages/tokens/src) `[ทางการ]`
- [adobe/spectrum-css wiki Migrating a component to Spectrum Tokens](https://github.com/adobe/spectrum-css/wiki/Migrating-a-component-to-Spectrum-Tokens) `[กึ่งทางการ]` (ตัวอย่าง ActionButton = corner-radius-100)
- หมายเหตุ: repo เดิม `adobe/spectrum-tokens` ถูก rename เป็น `adobe/spectrum-design-data` แล้ว URL เก่า redirect

---

## 4. Tailwind CSS v4

ไม่ใช่ DS ขององค์กร แต่เป็น **มาตรฐานที่ dev ไทยคุ้นที่สุด** จึงใช้เป็นตัวเทียบความคาดหวังของทีม frontend

| Class | Token | rem | px |
|---|---|---|---|
| rounded-none | | 0 | 0 |
| rounded-xs | --radius-xs | 0.125 | 2 |
| rounded-sm | --radius-sm | 0.25 | 4 |
| rounded-md | --radius-md | 0.375 | 6 |
| rounded-lg | --radius-lg | 0.5 | 8 |
| rounded-xl | --radius-xl | 0.75 | 12 |
| rounded-2xl | --radius-2xl | 1 | 16 |
| rounded-3xl | --radius-3xl | 1.5 | 24 |
| rounded-4xl | --radius-4xl | 2 | 32 |
| rounded-full | | | `calc(infinity * 1px)` |

**ชนิดสเกล:** เรขาคณิตโดยประมาณ (2, 4, 6, 8, 12, 16, 24, 32 ประมาณ ×1.5 ต่อขั้นในช่วงบน)
**การตั้งชื่อ:** t-shirt size ล้วน ไม่มี tier semantic (Tailwind ให้ผู้ใช้ตั้ง semantic เอง)
**`full`:** v4 เปลี่ยนจาก `9999px` เป็น `calc(infinity * 1px)`
**หมายเหตุสำคัญ:** Tailwind v4 rename ทั้งสเกล (เดิม `rounded-sm`=2px, `rounded`=4px, `rounded-md`=6px) ทำให้ v3→v4 ค่าเลื่อนหนึ่งขั้น ถ้า NTGDS ตั้งชื่อ t-shirt size ต้องระบุค่า px กำกับเสมอ อย่าให้คนเดาจากชื่อ

**แหล่ง:** [Tailwind CSS border-radius](https://tailwindcss.com/docs/border-radius) `[ทางการ]`

---

## 5. Atlassian Design System

Atlassian คือเจ้าที่ **ตั้งชื่อ radius ตาม t-shirt size แต่เขียนกฎ mapping ต่อ component ไว้ครบที่สุด** และเป็นเจ้าเดียวที่พบว่ามี token สำหรับ **focus ring radius** โดยเฉพาะ

### 5.1 โครงสเกล และ mapping ต่อ component

จากหน้า Radius (สถานะ Beta) `[ทางการ]`

| Token | ค่า | ใช้กับอะไร (คำของ Atlassian) |
|---|---|---|
| radius.xsmall | 2 px | ของรายละเอียดเล็ก: badge, checkbox, avatar label, keyboard shortcut |
| radius.small | 4 px | ของประกอบ: label, lozenge, timestamp, tag, date, tooltip |
| radius.medium | 6 px | ของกดได้: button, input, textarea, select, navigation item, smart link |
| radius.large | 8 px | ของที่ห่อของอื่น: card, in-page container, floating UI, dropdown menu |
| radius.xlarge | 12 px | ของระดับหน้า: full-page container, container ใหญ่, modal, Kanban column, table |
| radius.xxlarge | 16 px | video player container |
| radius.full | 999 px | ของกลม (เกี่ยวกับคน): avatar, ชื่อผู้ใช้, emoji reaction |
| radius.tile | 25% (คำนวณ) | ใช้กับ tile component เท่านั้น |

**ชนิดสเกล:** 2, 4, 6, 8, 12, 16 = เลขคณิต step 2 ในช่วงล่าง แล้ว step 4 ในช่วงบน

### 5.2 กฎ nested radius แบบทางการ (focus ring)

Atlassian มีชุด token คู่ขนานสำหรับวงแหวน focus ที่ **บวก 2 px จากตัวฐานเสมอ** `[ทางการ]`

| ฐาน | focus |
|---|---|
| radius.xsmall 2 | radius.focus.xsmall 4 |
| radius.small 4 | radius.focus.small 6 |
| radius.medium 6 | radius.focus.medium 8 |
| radius.large 8 | radius.focus.large 10 |
| radius.xlarge 12 | radius.focus.xlarge 14 |
| radius.xxlarge 16 | radius.focus.xxlarge 18 |

นี่คือสูตร nested radius (`outer = inner + gap`) ที่ถูกทำเป็น token จริง โดย gap = ระยะ offset ของ focus ring (2 px)
**ข้อดีที่ NTGDS ควรลอก:** แทนที่จะให้นักออกแบบคำนวณเองทุกครั้ง ให้ประกาศคู่ token ไว้เลย

### 5.3 การตั้งชื่อ และ tier

- ตั้งชื่อแบบ **t-shirt size** (`radius.xsmall … radius.xxlarge`) ไม่ใช่ชื่อ component แต่ **เขียน mapping ต่อ component ไว้ในเอกสาร** (ได้ประโยชน์ทั้งสองทาง: token กลางใช้ซ้ำได้ + นักออกแบบรู้ว่าจะหยิบตัวไหน)
- มี token เฉพาะกิจได้ถ้าจำเป็นจริง (`radius.tile` = 25%) แต่มีตัวเดียว

**แหล่ง:** [Atlassian Design System Radius](https://atlassian.design/foundations/radius) `[ทางการ]` [Atlassian Border (สำหรับ border width)](https://atlassian.design/foundations/border) `[ทางการ]`

---

## 6. GitHub Primer

Primer คือตัวอย่างของ **"สเกลน้อยขั้นที่สุด"** ในกลุ่มเจ้าใหญ่ (มีแค่ 3 ขั้น + full)

| Token | rem | px |
|---|---|---|
| --borderRadius-small | 0.1875rem | 3 px |
| --borderRadius-medium | 0.375rem | 6 px |
| --borderRadius-large | 0.75rem | 12 px |
| --borderRadius-full | 624.9375rem | 9999 px |
| --borderRadius-default | (alias ของ medium) | 6 px |

**ชนิดสเกล:** เรขาคณิต ×2 ทุกขั้น (3 → 6 → 12) เป็นสเกลที่จำง่ายที่สุดในบรรดาทุกเจ้า
**การตั้งชื่อ:** t-shirt size + มี alias `default` ซึ่งเป็นแนวคิดดี (บอกว่าถ้าไม่รู้จะใช้อะไร ให้ใช้ตัวนี้)
**Tier:** เป็น primitive ชั้นเดียว ไม่มี semantic ต่อ component

**ข้อสังเกต:** 3 ขั้นพอสำหรับ GitHub เพราะ UI เป็น dense productivity tool ที่แทบไม่มี surface โค้งมาก แต่เว็บข่าวมีการ์ดข่าว ภาพ thumbnail รูปวงกลม โมดัล และ pill tag ครบ จึงน่าจะต้องมากกว่า 3

**แหล่ง:** [Primer Foundations Primitives Size](https://primer.style/foundations/primitives/size) `[ทางการ]`

---

## 7. Shopify Polaris

Polaris ใช้ **ชื่อเป็นตัวเลข (numeric scale)** ไม่ใช่ t-shirt size และ **ผูก radius เข้ากับ size scale ตัวเดียวกับ spacing** ซึ่งเป็นแนวคิดที่ NTGDS ควรพิจารณาเพราะเรามี `tokens/scale/` อยู่แล้ว

| Token | อ้างถึง | ค่า px |
|---|---|---|
| border-radius-0 | size 0 | 0 |
| border-radius-050 | size 050 | 2 |
| border-radius-100 | size 100 | 4 |
| border-radius-150 | size 150 | 6 |
| border-radius-200 | size 200 | 8 |
| border-radius-300 | size 300 | 12 |
| border-radius-400 | size 400 | 16 |
| border-radius-500 | size 500 | 20 |
| border-radius-750 | size 750 | 30 |
| border-radius-full | (ค่าตรง) | 9999px |

**ชนิดสเกล:** เลขคณิต step 2 ช่วงล่าง (0, 2, 4, 6, 8) แล้ว step 4 (12, 16, 20) แล้วกระโดด 30
**หลักการตั้งชื่อ:** เลข = px × 25 (เช่น 4px → 100, 8px → 200, 30px → 750) ทำให้ **แปลงกลับเป็น px ได้ในหัว** และเพิ่มขั้นแทรกกลางได้โดยไม่ต้อง rename (นี่คือข้อได้เปรียบใหญ่ที่สุดของ numeric scale เหนือ t-shirt size)
**Tier:** primitive `size.*` (แชร์กับ spacing/width/height) → semantic `border-radius-*` ไม่มีชั้น component

**แหล่ง:**
- [Shopify/polaris polaris-tokens/src/themes/base/border.ts](https://raw.githubusercontent.com/Shopify/polaris/main/polaris-tokens/src/themes/base/border.ts) `[ทางการ]`
- [Shopify/polaris polaris-tokens/src/size.ts](https://raw.githubusercontent.com/Shopify/polaris/main/polaris-tokens/src/size.ts) `[ทางการ]` (ค่า px ของ size scale)

---

## 8. Radix Themes

Radix คือคำตอบตรงที่สุดของโจทย์ **multi-brand** เพราะเขาทำ radius เป็น **ตัวคูณระดับธีม (radius factor)** ไม่ใช่ค่าตายตัว

### 8.1 โครงสเกล

จาก `radius.css` ของ repo radix-ui/themes `[ทางการ]`

```
--radius-1: calc(3px  * var(--scaling) * var(--radius-factor))
--radius-2: calc(4px  * var(--scaling) * var(--radius-factor))
--radius-3: calc(6px  * var(--scaling) * var(--radius-factor))
--radius-4: calc(8px  * var(--scaling) * var(--radius-factor))
--radius-5: calc(12px * var(--scaling) * var(--radius-factor))
--radius-6: calc(16px * var(--scaling) * var(--radius-factor))
```

**ชนิดสเกล:** 3, 4, 6, 8, 12, 16 (ใกล้เคียง Radix Themes กับ Primer มาก) ชื่อเป็น **เลขลำดับ 1 ถึง 6** ไม่ใช่ t-shirt size ไม่ใช่ px

### 8.2 radius factor คือกลไก multi-brand

ธีมตั้ง prop `radius` ได้ 5 ค่า แล้วค่านั้นไปคุมตัวคูณ `[ทางการ]`

| preset | --radius-factor | --radius-full | --radius-thumb |
|---|---|---|---|
| none | 0 | 0px | 0.5px |
| small | 0.75 | 0px | 0.5px |
| medium | 1 | 0px | 9999px |
| large | 1.5 | 0px | 9999px |
| full | 1.5 | 9999px | 9999px |

อ่านว่า: **สเกลมีชุดเดียว แต่แบรนด์เลือก "ความโค้งรวม" ได้ด้วยตัวเลขตัวเดียว** เปลี่ยน `--radius-factor` จาก 1 เป็น 1.5 ทั้งระบบโค้งขึ้น 50% พร้อมกัน โดยไม่ต้องแก้ token รายตัว

อีกจุดที่ฉลาด: `--radius-full` แยกจาก factor คือ preset `large` ยังไม่ทำให้ปุ่มเป็น pill แต่ preset `full` ทำ และ `--radius-thumb` แยกออกมาเพราะ thumb ของ switch/slider ต้องกลมเสมอแม้ธีมจะเป็น `none` (ค่า 0.5px ป้องกันขอบคม)

**พฤติกรรมตาม component:** เอกสารระบุว่า radius `full` ทำให้ Button เป็น pill แต่ Checkbox ยังโค้งแค่บางส่วน เพื่อไม่ให้สับสนกับ Radio ซึ่งเป็น **กฎ semantic override** ที่สำคัญมาก (รูปทรงเป็นตัวแยกความหมายของ control)

**แหล่ง:**
- [radix-ui/themes radius.css](https://raw.githubusercontent.com/radix-ui/themes/main/packages/radix-ui-themes/src/styles/tokens/radius.css) `[ทางการ]`
- [Radix Themes Radius docs](https://www.radix-ui.com/themes/docs/theme/radius) `[ทางการ]`

---

## 9. IBM Carbon

**ผลการค้น: ไม่พบ border-radius token ในระบบหลักของ Carbon**

หลักฐาน
- ดึงเอกสาร Sass ทางการของ `@carbon/styles` (`packages/styles/docs/sass.md`) มาค้นคำว่า border-radius / corner radius / rounded แล้ว **ไม่พบ token หรือ variable ใด ๆ** เอกสารครอบคลุม color, spacing, motion, type, component, utility แต่ไม่มีหมวด radius `[ทางการ]`
- Issue เก่าใน repo Carbon (`Explicitly make border-radius: 0 on buttons`) ยืนยันว่า Carbon ตั้งใจให้ปุ่มมุมฉาก และเคยต้องรีเซ็ต border-radius 4px ที่ Chromium ใส่มาให้ `[ทางการ]`
- Carbon v9 มี Sass variable `$button-border-radius: 0` `[ทางการ]`

**คำค้นที่ใช้แล้วไม่เจอ:** `carbon design system border radius token layer-radius 2025` `"carbon design system" border-radius rounded corners components v11 change square corners` `carbon design system "border-radius" token scss @carbon/styles rounded corners AI`

**บทเรียน:** มุมฉาก 0 px เป็น **จุดยืนเชิงแบรนด์** ของ IBM (ภาษาออกแบบวิศวกรรม จริงจัง แม่นยำ) การไม่มี radius token เลยก็เป็นการตัดสินใจที่ถูกต้องสำหรับเขา แปลว่า "จำนวนขั้น radius" ไม่ได้วัดคุณภาพ DS แต่ต้องมาจากบุคลิกแบรนด์

**แหล่ง:**
- [@carbon/styles sass.md](https://raw.githubusercontent.com/carbon-design-system/carbon/main/packages/styles/docs/sass.md) `[ทางการ]`
- [carbon issue #285 border-radius 0 on buttons](https://github.com/carbon-design-system/carbon/issues/285) `[ทางการ]`
- [Carbon v9 themes guidelines](https://v9.carbondesignsystem.com/guidelines/themes/) `[ทางการ]`

---

## 10. เจ้าสื่อ (News/Media design systems)

### 10.1 News UK NewsKit (The Times, The Sun)

NewsKit เป็นเจ้าสื่อเจ้าเดียวที่พบว่ามีระบบ radius เป็น token เต็มรูปแบบ
จาก `src/theme/foundations/borders.ts` และ `sizing.ts` `[ทางการ]`

| Token | อ้างถึง | ค่า |
|---|---|---|
| borderRadiusSharp | sizing000 | 0 |
| borderRadiusRounded010 | sizing010 | 4 px |
| borderRadiusRounded020 | sizing020 | 8 px |
| borderRadiusRounded030 | sizing030 | 12 px |
| borderRadiusRounded040 | sizing040 | 16 px |
| borderRadiusRounded050 | sizing050 | 24 px |
| borderRadiusDefault | sizing020 | 8 px |
| borderRadiusPill | (ค่าตรง) | 20 rem = 320 px |
| borderRadiusCircle | (ค่าตรง) | 50% |

**สิ่งที่น่าเรียน (ตรงกับบริบท NTGDS มาก)**
1. **ผูกกับ sizing scale เดียวกับ spacing** (`sizing010…050`) ไม่มีสเกลลอยแยก ตรงกับที่ NTGDS มี `tokens/scale/` อยู่แล้ว
2. **มี `borderRadiusDefault`** ชี้ไปที่ 8px บอกค่ากลางของระบบชัดเจน
3. **แยก `Pill` กับ `Circle` ออกจากกัน** (pill = 320px สำหรับกล่องยาว · circle = 50% สำหรับ avatar สี่เหลี่ยมจัตุรัส) นี่สำคัญเพราะ 50% บนกล่องยาวจะได้วงรีเพี้ยน ส่วนค่าใหญ่ ๆ บนกล่องจัตุรัสจะได้วงกลมพอดี **NTGDS ควรมี 2 ตัวนี้แยกกันเหมือนกัน**
4. **NewsKit เป็น multi-brand โดยกำเนิด** (The Times ใช้ค่าโค้งน้อย, The Sun โค้งมาก) โดย theme override ค่าที่ชั้น token เดียวกัน

**แหล่ง:** [newskit src/theme/foundations/borders.ts](https://raw.githubusercontent.com/newscorp-ghfb/newskit/main/src/theme/foundations/borders.ts) `[ทางการ]` [newskit sizing.ts](https://raw.githubusercontent.com/newscorp-ghfb/newskit/main/src/theme/foundations/sizing.ts) `[ทางการ]` [NewsKit Borders docs](https://newskit.co.uk/theme/foundation/borders/) `[ทางการ]` (หน้าเว็บ render ตารางด้วย JS ดึงค่าไม่ได้ จึงใช้ source)

### 10.2 The Guardian Source

**ผลการค้น: Guardian Source ไม่มี radius เป็น foundation/token**

หลักฐาน: list โฟลเดอร์ `libs/@guardian/source/src/foundations` ได้ `accessibility animation breakpoints buttonHoverColour mq palette size space typography utils` **ไม่มีโฟลเดอร์ radius หรือ border** `[ทางการ]`

แทนที่จะมี token Guardian **คำนวณ radius จากความสูงของ component** ในไฟล์ style ของปุ่มโดยตรง `[ทางการ]`
```
border-radius: ${height.ctaMedium}px;   // ปุ่มขนาดปกติ
border-radius: ${height.ctaSmall}px;    // ปุ่มเล็ก
border-radius: ${height.ctaXsmall}px;   // ปุ่มเล็กพิเศษ
border-radius: 0;                       // variant subdued
```
คือ **radius = ความสูงของปุ่ม** = pill สมบูรณ์เสมอโดยไม่ต้องใช้ค่ามหาศาลอย่าง 9999px
และมี comment อธิบายว่า variant `subdued` (ปุ่มข้อความล้วน) ใช้ 0 เพราะ "เวลามีแต่ข้อความ การแสดง focus halo เป็นสี่เหลี่ยมจะดูเป็นธรรมชาติกว่า"

**บทเรียน:** เจ้านี้เลือก **บุคลิกเดียว (pill) แล้วไม่ต้องมีสเกลเลย** เป็นทางเลือกที่สุดขั้วตรงข้ามกับ Spectrum เหมาะกับแบรนด์ที่มีเสียงเดียว ไม่เหมาะกับ NTGDS ที่ต้องรองรับ 6 ถึง 12 แบรนด์

**แหล่ง:** [csnx source foundations directory listing](https://api.github.com/repos/guardian/csnx/contents/libs/%40guardian/source/src/foundations) `[ทางการ]` [Guardian Source button styles.ts](https://raw.githubusercontent.com/guardian/csnx/main/libs/%40guardian/source/src/react-components/button/styles.ts) `[ทางการ]`

### 10.3 FT Origami

**ผลการค้น: ไม่พบข้อมูล radius token ที่ยืนยันได้**

พยายามเข้า GitHub API ของ `Financial-Times/origami` (ทั้ง root contents และ `components/`) ได้ **HTTP 404** ทุกครั้ง แปลว่า repo ถูกย้าย/เปลี่ยนสิทธิ์/เปลี่ยนชื่อ
**คำค้นที่ใช้แล้วไม่เจอค่า:** `FT Origami design system border-radius token o-normalise corner radius financial times`
แหล่งที่ควรตามต่อถ้าจำเป็น: registry.origami.ft.com และ o3.origami.ft.com (เป็น Storybook render ด้วย JS ดึงผ่าน WebFetch ไม่ได้)

**ประเมินจากภาพหน้าเว็บ ft.com:** FT ใช้มุมฉากเป็นหลัก (ยังไม่ยืนยันด้วยหลักฐาน token จึงไม่นับเป็น finding)

---

## 11. shape มากกว่า radius หรือเปล่า

สรุปว่า **"shape" ในวงการ DS ตอนนี้กว้างกว่า radius จริง แต่มีแค่ 2 เจ้าที่ลงมือทำ** ส่วนที่เหลือ shape = radius เท่านั้น

### 11.1 corner family / shape family

| เจ้า | มี shape family ไหม |
|---|---|
| Material 3 | **มี** rounded และ cut (มุมตัดเฉียง) ตั้งได้ที่ระดับ theme M3 Expressive เพิ่มคลังรูปทรง abstract ประมาณ 35 แบบ + shape morph ตอน interaction |
| Fluent 2 / Spectrum / Atlassian / Primer / Polaris / Radix / NewsKit / Carbon | **ไม่มี** shape = corner radius ล้วน |

### 11.2 squircle / superellipse ใครทำบ้าง

- **Apple (iOS)** เป็นต้นทางของ squircle (มุมโค้งต่อเนื่อง continuous curve บนไอคอน iOS 7 เป็นต้นมา) `[แหล่งรอง อธิบายผ่านเอกสาร Figma]`
- **Figma** มี slider `corner smoothing` 0 ถึง 100% พร้อมปุ่มพรีเซ็ต **iOS = 60%** `[ทางการ]`
- **CSS** กำลังจะมี property `corner-shape` ใน CSS Borders and Box Decorations Module Level 4 รับค่า `round` (= `superellipse(1)`, เท่ากับ border-radius ปกติ) · `squircle` (= `superellipse(2)`) · `bevel` (= `superellipse(0)`) · `scoop` (= `superellipse(-1)`) · `notch` · `square` และฟังก์ชัน `superellipse(<number>)` `[ทางการ MDN/CSSWG]`
- **สถานะรองรับ:** MDN ระบุว่า **Limited availability ยังไม่เป็น Baseline** และติดป้าย Experimental `[ทางการ]`

> **ข้อสรุปสำหรับ NTGDS:** ถ้าใช้ corner smoothing 60% ใน Figma ตอนนี้ **โค้ดจะทำตามไม่ได้** เพราะ `corner-shape: squircle` ยังไม่ Baseline จะเกิดช่องว่าง Figma กับ code ทันที (ทำ workaround ด้วย SVG mask หรือ clip-path ได้แต่แลกด้วย performance และ accessibility) **แนะนำให้ล็อก corner smoothing = 0% ทั้งไฟล์และเขียนเป็นกฎในหน้า 06 Shape**

### 11.3 shape นับรวม border width ไหม

- **Atlassian** แยก 2 หน้าเอกสารชัด: `Border` (width/color) กับ `Radius` เป็นคนละ foundation `[ทางการ]`
- **NewsKit** รวมไว้ไฟล์เดียว `borders.ts` (borderWidth + borderRadius อยู่ด้วยกัน) `[ทางการ]`
- **Fluent** แยก `borderRadius` ออกมาเป็นไฟล์ global ของตัวเอง `[ทางการ]`

ทั้งสองแบบใช้ได้ ประเด็นคือความสม่ำเสมอ NTGDS มีหน้า 05 Effect แยกอยู่แล้ว การมีหน้า 06 Shape ที่ครอบทั้ง radius และ border width ก็สมเหตุสมผล (เป็นเรื่อง "ขอบของกล่อง" เหมือนกัน)

### แหล่ง
- [MDN CSS corner-shape](https://developer.mozilla.org/en-US/docs/Web/CSS/corner-shape) `[ทางการ]`
- [CSS Borders and Box Decorations Module Level 4 (CSSWG draft)](https://drafts.csswg.org/css-borders-4/) `[ทางการ]`
- [Figma Help Adjust corner radius and smoothing](https://help.figma.com/hc/en-us/articles/360050986854-Adjust-corner-radius-and-smoothing) `[ทางการ]`

---

## 12. กฎ nested radius

### 12.1 สูตร

สูตรที่ทุกแหล่งตรงกันคือ

```
inner radius = outer radius - gap
(gap = padding ระหว่างขอบนอกกับขอบใน)
```

Cloud Four เขียนเป็น CSS ตรง ๆ ว่า `--inner-radius: calc(var(--outer-radius) - var(--padding))` `[แหล่งรอง]`
เคสตัวอย่าง: การ์ดนอก radius 24 padding 8 → รูปข้างในต้อง radius 16 ถ้าผลลัพธ์ติดลบให้ใช้ 0 (มุมฉาก)

**ข้อจำกัดที่ต้องรู้:** บทความต้นทางยอมรับเองว่ายังไม่มีคำตอบว่าจะจัดการเรื่องนี้ในระบบ token อย่างไร และสูตรนี้ตั้งอยู่บนสมมติฐานว่า padding เท่ากันทุกด้าน (padding ไม่เท่ากัน / ซ้อนหลายชั้น / รูปทรงไม่ใช่สี่เหลี่ยม จะเพี้ยน) `[แหล่งรอง]`

### 12.2 ใครทำเป็น token จริง

**Atlassian เป็นเจ้าเดียวที่พบว่าทำ** ผ่านชุด `radius.focus.*` ที่ = ค่าฐาน + 2 px ทุกตัว (เพราะ focus ring offset 2 px) `[ทางการ]`
เจ้าอื่น (M3 Fluent Spectrum Primer Polaris Radix NewsKit) **ไม่พบ token หรือกฎ nested radius ในเอกสาร** ปล่อยให้นักออกแบบคำนวณเอง

> **โอกาสของ NTGDS:** ถ้าเราประกาศคู่ token `radius.focus.*` (= ฐาน + ระยะ offset ของวง focus) และเขียนสูตร `inner = outer - padding` ไว้ในหน้า 06 Shape เราจะทำได้ดีกว่ามาตรฐานตลาด และแก้ปัญหาการ์ดข่าวที่มีภาพ thumbnail ซ้อนอยู่ข้างใน ซึ่งเป็น pattern ที่เจอทุกหน้าของเว็บข่าว

### แหล่ง
- [Cloud Four The Math Behind Nesting Rounded Corners](https://cloudfour.com/thinks/the-math-behind-nesting-rounded-corners/) `[แหล่งรอง]`
- [Atlassian Radius (radius.focus.*)](https://atlassian.design/foundations/radius) `[ทางการ]`

---

## 13. ความหมายเชิงแบรนด์ของ radius

### 13.1 มีงานวิจัยรองรับว่าโค้ง = เป็นมิตร

Bar และ Neta (2006) เผยแพร่ใน Psychological Science ทดสอบด้วยวัตถุที่เป็นกลางทางอารมณ์ (นาฬิกา โซฟา ตัวอักษร รูปทรงสุ่ม) โดยเทียบเวอร์ชันมุมแหลมกับเวอร์ชันมุมโค้ง พบว่า **คนชอบเวอร์ชันโค้งมากกว่าอย่างมีนัยสำคัญ (67.2% เทียบกับ 50.6%)** และเสนอว่ามุมแหลมสื่อถึงภัยคุกคาม `[แหล่งรอง ระดับงานวิจัย peer-reviewed]`
งานต่อยอดพบว่าวัตถุมุมแหลมกระตุ้น amygdala มากกว่าวัตถุมุมโค้ง `[แหล่งรอง]`

**ข้อควรระวังในการอ้าง:** งานนี้ทดสอบ "รูปทรงวัตถุ" ไม่ใช่ "UI radius 4px เทียบ 8px" ความต่างระดับ px ในหน้าจอมีผลน้อยกว่ามาก ใช้เป็นเหตุผลเชิงทิศทาง (โค้งกว่า = อ่อนโยนกว่า) ได้ แต่อย่าอ้างเป็นตัวเลขประสิทธิผล

### 13.2 หลักฐานเชิงพฤติกรรมจาก DS จริง

| แบรนด์ | ค่าที่เลือก | สื่ออะไร |
|---|---|---|
| IBM Carbon | 0 px ทั้งระบบ ไม่มี token radius เลย | วิศวกรรม แม่นยำ จริงจัง องค์กร |
| GitHub Primer | 3 ถึง 12 px แค่ 3 ขั้น | เครื่องมือ dense ไม่เน้นอารมณ์ |
| Fluent 2 | 4 px เป็นค่ามาตรฐาน | มืออาชีพ สะอาด |
| Material 3 Expressive | ดันขึ้นถึง 48 px และเปลี่ยนปุ่มเป็น pill | อารมณ์ สนุก แสดงออก (ชื่อ Expressive บอกเอง) |
| Guardian Source | pill เต็มทุกปุ่ม (radius = ความสูง) | บุคลิกเดียว จำได้ทันที |

### 13.3 ใครเปลี่ยน radius ตามแบรนด์ย่อยบ้าง (ข้อสำคัญสำหรับ NTGDS)

- **Radix Themes** = ตัวอย่างที่ชัดที่สุด มี `--radius-factor` ตัวคูณเดียวคุมทั้งระบบ (none 0 · small 0.75 · medium 1 · large 1.5 · full 1.5) เปลี่ยนบุคลิกทั้งธีมด้วยตัวเลขตัวเดียว `[ทางการ]`
- **NewsKit (News UK)** = ออกแบบมาเป็น multi-brand ตั้งแต่ต้น (The Times, The Sun อยู่ระบบเดียวกัน) โดย theme override ค่าที่ชั้น token เดียวกัน `[ทางการ]`
- **Material 3** = เปลี่ยน corner family (rounded/cut) ได้ที่ระดับ theme `[ทางการ]`
- **Fluent / Spectrum / Primer / Polaris / Carbon** = **ไม่พบ** กลไกปรับ radius ตามแบรนด์ย่อย (เป็น DS แบรนด์เดียว)

### แหล่ง
- [Bar and Neta 2006 Humans Prefer Curved Visual Objects (Psychological Science)](https://journals.sagepub.com/doi/abs/10.1111/j.1467-9280.2006.01759.x) `[แหล่งรอง]`
- [Preference for Curvature: A Historical and Conceptual Framework (Frontiers in Human Neuroscience 2015)](https://www.frontiersin.org/journals/human-neuroscience/articles/10.3389/fnhum.2015.00712/full) `[แหล่งรอง]`
- [Radix Themes radius.css (radius-factor)](https://raw.githubusercontent.com/radix-ui/themes/main/packages/radix-ui-themes/src/styles/tokens/radius.css) `[ทางการ]`

---

## 14. ตารางเทียบค่า radius ทุกเจ้า

ค่าเป็น px ช่องว่างหมายถึงไม่มีขั้นนั้นในระบบ ค่าในวงเล็บคือชื่อ token ของเจ้านั้น

| px | Material 3 | Fluent 2 (code) | Spectrum 2 | Tailwind v4 | Atlassian | Primer | Polaris | Radix | NewsKit | Carbon | NTGDS ปัจจุบัน |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 0 | none | None | 0 / none | none | | | 0 | (factor 0) | Sharp | **ทั้งระบบ** | link-button |
| 2 | | Small | | xs | xsmall | | 050 | | | | |
| 3 | | | 75 | | | small | | 1 | | | |
| 4 | extra-small | Medium | 100 / small-default | sm | small | | 100 | 2 | Rounded010 | | |
| 5 | | | 200 | | | | | | | | |
| 6 | | Large | 300 | md | medium | medium / default | 150 | 3 | | | button xs |
| 7 | | | 400 | | | | | | | | button sm |
| 8 | small | XLarge | 500 / medium-default | lg | large | | 200 | 4 | Rounded020 / **Default** | | button md |
| 9 | | | 600 | | | | | | | | button lg |
| 10 | | | 700 | | | | | | | | button xl |
| 12 | medium | 2XLarge | | xl | xlarge | large | 300 | 5 | Rounded030 | | |
| 16 | large | 3XLarge | 800 / extra-large-default | 2xl | xxlarge | | 400 | 6 | Rounded040 | | |
| 20 | large-increased | | | | | | 500 | | | | |
| 24 | | 4XLarge | | 3xl | | | | | Rounded050 | | |
| 28 | extra-large | | | | | | | | | | |
| 30 | | | | | | | 750 | | | | |
| 32 | extra-large-increased | 5XLarge | | 4xl | | | | | | | |
| 40 | | 6XLarge | | | | | | | | | |
| 48 | extra-extra-large | | | | | | | | | | |
| pill | full (Circle) | Circular 10000px | full = 50% | full = calc(infinity) | full 999px | full 9999px | full 9999px | full 9999px | **Pill 320px** | | full 9999px |
| circle | | | | | | | | | **Circle 50%** | | |
| **จำนวนขั้น (ไม่นับ full)** | **9** | **10** | **10** | **9** | **7** | **3** | **9** | **6** | **6** | **1** | **6 (แต่เป็น component token ไม่ใช่สเกล)** |

### อ่านตารางแล้วเห็นอะไร

1. **จุดร่วมของทุกเจ้า:** ทุกคนมี 0, 4, 8, 12, 16 · ห้าค่านี้คือแกนกลางที่ปลอดภัยที่สุด
2. **ค่ากลางของระบบ (default)** ตลาดแบ่งเป็น 2 ค่าย: 4 px (Fluent, Spectrum small-default) กับ 6 ถึง 8 px (Primer 6, Atlassian 6 สำหรับปุ่ม, NewsKit 8) · แนวโน้ม 3 ปีหลังเลื่อนขึ้นจาก 4 ไป 6 ถึง 8
3. **จำนวนขั้นส่วนใหญ่อยู่ที่ 6 ถึง 10** · น้อยกว่า 6 มีแค่ Primer (3) และ Carbon (1) ซึ่งทั้งคู่เป็น DS ที่จงใจให้ UI เรียบ
4. **ค่าที่ 20 ขึ้นไปแทบไม่มีใครใช้บนเว็บ** (Spectrum หยุดที่ 16, Atlassian หยุดที่ 16, Primer หยุดที่ 12) ค่าที่สูงกว่านั้นมาจากฝั่ง native app (M3 28/32/48) และ utility framework (Tailwind)
5. **NTGDS ตอนนี้ไม่มีสเกล radius เลย** มีแต่ค่าที่ฝังอยู่ใน component token (button/icon-button 6·7·8·9·10 ต่อ xs..xl และ link-button 0) รวม 62 ตัวแปร CSS แต่ไม่มี tier primitive/semantic ให้ component อื่นหยิบใช้

---

## 15. สถานะปัจจุบันของ NTGDS

ตรวจจาก repo จริง (`tokens/output/css/variables.css` และ `tokens/scale/`)

| ประเด็น | สถานะ |
|---|---|
| สเกล radius กลาง (primitive) | **ไม่มี** |
| semantic radius (ตามบทบาท) | **ไม่มี** |
| component radius | **มี** แต่แตกเป็นรายมุม รายขนาด (`--ntg-button-radius-top-left-xs` … ครบ 4 มุม × 5 ขนาด × 3 component) |
| ค่าที่ใช้จริง | button และ icon-button = 6, 7, 8, 9, 10 px ตาม xs sm md lg xl link-button = 0 `radius-full` = 9999px |
| อยู่ในระบบสูตร `tokens/scale/` ไหม | **ไม่อยู่** `global-scale.config.mjs` มีแต่ `SIZES` และสูตร `size[i] = base + i × scale` ส่วน `button.mjs` ไม่ได้นิยาม radius (ค่ามาจาก Figma ตรง ๆ) |
| จำนวน CSS variable ที่มีคำว่า radius | 62 |

**ข้อสังเกตสำคัญ:** ค่าปุ่ม 6, 7, 8, 9, 10 = `base 6 + i × 1` ซึ่ง**ตรงกับโมเดล `base + i × step` ของ `tokens/scale/` อยู่แล้ว** และตรงกับแนวคิด size-responsive radius ของ Spectrum พอดี (Spectrum medium tier = 6, 7, 8, 9, 10 เป๊ะ ๆ ตาม `corner-radius-medium-size-*`) แปลว่าคนที่ตั้งค่านี้ไว้เดินมาถูกทางแล้ว แค่ยังไม่ได้ยกขึ้นเป็นระบบ

---

## 16. ข้อเสนอสำหรับ NTGDS

### 16.1 ควรมีกี่ขั้น

**เสนอ 8 ขั้น + full + circle รวม 10 รายการ**

เหตุผล
- ต่ำกว่า 6 ขั้น (แบบ Primer) ไม่พอ เพราะเว็บข่าวมี element หลากหลายกว่า GitHub มาก: tag หมวดข่าว · badge สด/ด่วน · input ค้นหา · ปุ่ม 5 ขนาด · การ์ดข่าว · thumbnail · โมดัล · bottom sheet บนมือถือ · avatar คอลัมนิสต์ · ปุ่มแชร์ LINE/Facebook ทรง pill
- เกิน 10 ขั้น (แบบ Fluent code 11 ขั้น) จะเลือกไม่ถูก และเกิดปัญหาแบบ Fluent คือเอกสารกับโค้ดหลุดกัน
- ตลาดกระจุกที่ 6 ถึง 10 ขั้น (ดูตารางข้อ 14) 8 ขั้นอยู่กลางพอดี

### 16.2 ตั้งชื่ออย่างไร

**เสนอใช้ชื่อเลข (numeric) แบบ Polaris ไม่ใช่ t-shirt size**

เหตุผลที่หนักที่สุดสำหรับ NTGDS โดยเฉพาะ
1. **หลีกเลี่ยงการชนกันของคำว่า sm/md/lg** ระบบเรามี `SIZES = ['xs','sm','md','lg','xl']` เป็น **ขนาดของ component** อยู่แล้ว ถ้า radius ใช้ชื่อเดียวกันจะเกิดประโยคที่อ่านไม่รู้เรื่องทันที เช่น "ปุ่ม size=sm ใช้ radius.sm" ทั้งที่ค่าจริง radius ของปุ่ม sm คือ 7px ไม่ใช่ค่าของ `radius.sm`
2. **เพิ่มขั้นแทรกกลางได้โดยไม่ต้อง rename** ปัญหาที่ Tailwind เจอตอน v3 ไป v4 (ทุกชื่อเลื่อนหนึ่งขั้น) และที่ Fluent เจอ (เอกสาร Large 8 แต่โค้ด Large 6) เกิดจาก t-shirt size ทั้งคู่
3. **แปลงกลับเป็น px ได้ในหัว** ใช้กติกา `เลข = px × 25` เหมือน Polaris

**สเกลที่เสนอ**

| Token | ค่า | ที่มาของค่า |
|---|---|---|
| `radius.0` | 0 px | ทุกเจ้ามี ใช้กับ link-button ที่มีอยู่แล้ว |
| `radius.050` | 2 px | Fluent Small, Atlassian xsmall, Polaris 050, Tailwind xs |
| `radius.100` | 4 px | ค่าร่วมของทุกเจ้า |
| `radius.150` | 6 px | ตรงกับ button xs ของเราวันนี้ Primer default Atlassian medium |
| `radius.200` | 8 px | **ค่า default ของระบบ** ตรงกับ button md ของเราวันนี้ NewsKit Default Atlassian large |
| `radius.300` | 12 px | การ์ดข่าว M3 medium Atlassian xlarge Polaris 300 |
| `radius.400` | 16 px | โมดัล/sheet จุดที่ Spectrum และ Atlassian หยุด |
| `radius.600` | 24 px | hero card / takeover บนมือถือ NewsKit Rounded050 |
| `radius.full` | 9999 px | pill (ปุ่มแชร์ tag หมวด) |
| `radius.circle` | 50% | avatar เท่านั้น |

**เหตุผลที่ต้องแยก `full` กับ `circle`** (ลอกจาก NewsKit ซึ่งเป็นเจ้าสื่อเหมือนเรา) ถ้าใช้ 50% กับกล่องยาวจะได้วงรีเพี้ยน ถ้าใช้ 9999px กับกล่องจัตุรัสจะได้วงกลมพอดีก็จริงแต่ตอน element ยืดจะไม่กลม แยกไว้ตั้งแต่ต้นจะไม่ต้องมาแก้ทีหลัง

**ไม่เสนอค่า 20, 28, 32, 48** เพราะเว็บข่าวบนมือถือ ค่าเกิน 24 กินพื้นที่แสดงเนื้อหาโดยไม่ได้อะไรกลับมา และไม่มี DS ฝั่งเว็บเจ้าไหนใช้ (ค่าพวกนี้มาจาก native app ล้วน)

### 16.3 โครง tier

**เสนอ 3 ชั้น ตามแบบ Spectrum ผสม Atlassian**

```
ชั้น 1 primitive   radius.0 / 050 / 100 / 150 / 200 / 300 / 400 / 600 / full / circle
                   (อยู่ใน primitive.json ไม่มีความหมาย มีแต่ค่า)
        ↓
ชั้น 2 semantic    radius.control  → {radius.200}   ปุ่ม input select
        ตามบทบาท    radius.tag      → {radius.100}   tag หมวดข่าว lozenge badge
                   radius.card     → {radius.300}   การ์ดข่าว
                   radius.media    → {radius.300}   ภาพ thumbnail (ต้องคู่กับ card)
                   radius.surface  → {radius.400}   modal, bottom sheet, dropdown
                   radius.pill     → {radius.full}  ปุ่มแชร์ chip filter
                   radius.avatar   → {radius.circle}
                   radius.none     → {radius.0}
        ↓
ชั้น 3 component   radius.button.{xs..xl}  คำนวณจากสูตร base 6 + i × 1
                   (เฉพาะ component ที่ radius ต้องผันตามขนาด)
```

**ทำไมต้องมีชั้น 2 (semantic ตามบทบาท)** เพราะเป็นชั้นที่ทำให้ **multi-brand เปลี่ยนบุคลิกได้โดยไม่ต้องแตะ component ทีละตัว** และเป็นชั้นที่นักออกแบบเลือกใช้จริง (Atlassian พิสูจน์แล้วว่าการเขียน mapping ต่อ component ไว้ในเอกสารช่วยลดการเลือกผิดได้มาก)

**ทำไมชั้น 3 ต้องคำนวณด้วยสูตร** เพราะ CLAUDE.md บังคับไว้แล้วว่า component ที่มีหลายขนาดต้องนิยามสูตรใน `tokens/scale/<component>.mjs` ตอนนี้ `button.mjs` มีแต่ height/padding/gap ยังไม่มี radius **แนะนำเพิ่ม dimension `radius` เข้าไปในไฟล์เดิม** (base 6, step 1) แทนที่จะปล่อยให้ค่ามาจาก Figma ตรง ๆ อย่างวันนี้

**ผลข้างเคียงที่ต้องยอมรับ:** ค่า 7 และ 9 (button sm และ lg) จะไม่มีใน primitive scale มี 2 ทางเลือก
- ทาง ก. เพิ่ม `radius.175 = 7` และ `radius.250 = 9` เข้า primitive (แบบ Spectrum ที่มีครบ 3 ถึง 10 ทีละ px) ข้อดีคือทุกค่า bind primitive ได้ ข้อเสียคือสเกลบวมเป็น 10 ขั้น
- ทาง ข. ให้ `radius.button.*` เป็นค่าที่สูตรคำนวณเองโดยไม่ต้อง bind primitive (เหมือนที่ `space.button.*` ทำอยู่) ข้อดีคือสเกลสะอาด **แนะนำทางนี้** เพราะสอดคล้องกับโมเดลที่โปรเจกต์ใช้อยู่แล้ว

### 16.4 ผูกกับ component อย่างไร

**เสนอใช้กฎ 2 ชั้นซ้อนกัน**

**กฎ ก. กฎตามบทบาท (หลัก)** ลอกโครงจาก Atlassian แต่ปรับค่าให้เข้ากับเว็บข่าวไทย

| radius | ค่า | component ของ NTGDS |
|---|---|---|
| radius.none | 0 | link-button, ตาราง, divider, เส้นแบ่ง section, โฆษณา banner |
| radius.tag | 4 | tag หมวดข่าว, badge สด/ด่วน, checkbox, timestamp, lozenge |
| radius.control | 8 | button, input ค้นหา, select, dropdown item, nav item |
| radius.card | 12 | การ์ดข่าว, การ์ดวิดีโอ, widget ข้างหน้า |
| radius.media | 12 | ภาพ thumbnail, ภาพปก, player |
| radius.surface | 16 | modal, bottom sheet, dropdown menu, toast, ป๊อปอัปสมัครสมาชิก |
| radius.pill | full | ปุ่มแชร์ LINE/Facebook, chip filter, ปุ่มติดตาม |
| radius.avatar | circle | รูปคอลัมนิสต์, โลโก้แบรนด์ในเครือแบบกลม |

**กฎ ข. กฎ threshold ตามขนาดจริง (เสริม)** ลอกจาก Fluent ตรง ๆ เพราะเขียนเป็นประโยคที่ตรวจได้
> ถ้า element เล็กกว่า 32 px ให้ลด radius ลงหนึ่งขั้น

ใช้กับกรณีที่กฎ ก. ให้ผลแปลก เช่น badge ตัวเลขความสูง 16 px ถ้าใส่ 8 px จะดูเป็นแคปซูลไปเลย

**กฎ ค. nested radius** ประกาศเป็นสูตรในเอกสาร + ทำ token คู่
```
radius ของลูก = radius ของแม่ - padding ของแม่   (ถ้าติดลบให้ใช้ 0)
```
และทำชุด `radius.focus.*` = ค่าฐาน + ระยะ offset ของวง focus (แบบ Atlassian) ให้ครบทุกขั้น เพื่อไม่ให้ใครต้องคำนวณเอง

เคสจริงที่เจอบ่อยที่สุดบนเว็บข่าว: การ์ดข่าว radius 12 padding 8 → ภาพข้างในต้อง 4 ไม่ใช่ 12

### 16.5 multi-brand ทำอย่างไร

**เสนอ override ที่ชั้น semantic เท่านั้น (ไม่ใช้ radius factor)**

| ทางเลือก | ข้อดี | ข้อเสีย | ตัดสิน |
|---|---|---|---|
| **ก. override ชั้น semantic ต่อแบรนด์** เช่น thansettakij ตั้ง `radius.card → {radius.100}` | ค่ายังเป็นจำนวนเต็ม px ตรวจสอบง่าย ทำงานกับ Figma variable mode ได้ตรง ๆ ไม่กระทบ pipeline Style Dictionary ที่มีอยู่ | ต้องประกาศ mapping ต่อแบรนด์ (8 บรรทัดต่อแบรนด์) | **แนะนำ** |
| ข. radius factor แบบ Radix (`--ntg-radius-factor`) | เปลี่ยนบุคลิกทั้งระบบด้วยเลขตัวเดียว | ได้ค่าทศนิยม (12 × 0.75 = 9) ทำให้เส้นเบลอบนจอ 1x Figma variable คูณค่าไม่ได้ ต้องคำนวณล่วงหน้าอยู่ดี ขัดกับหลัก "ค่าต้องสอดคล้องกันเอง ตรวจย้อนได้" ใน CLAUDE.md | ไม่แนะนำตอนนี้ |

**ทิศทางบุคลิกที่เสนอ (ต้องยืนยันกับฝ่ายแบรนด์ก่อน ยังเป็นสมมติฐาน ไม่ใช่ข้อเท็จจริง)**

| กลุ่ม | เว็บ | บุคลิก | radius.card |
|---|---|---|---|
| ธุรกิจ/เศรษฐกิจ | bangkokbiznews, thansettakij, posttoday | น่าเชื่อถือ จริงจัง | 4 ถึง 8 |
| ข่าวทั่วไป/ทีวี | nationtv, komchadluek | กลาง เข้าถึงง่าย | 12 (ค่ากลาง) |
| ไลฟ์สไตล์/บันเทิง | springnews | อ่อนโยน สนุก | 16 |

หลักฐานรองรับทิศทางนี้: Carbon (องค์กร/วิศวกรรม) = 0 Fluent (มืออาชีพ) = 4 M3 Expressive (อารมณ์) = 16 ขึ้นไป (ดูข้อ 13.2) และงานวิจัย Bar & Neta ที่ว่ามุมโค้งอ่านว่าเป็นมิตรกว่า (ข้อ 13.1)

**หมายเหตุ:** ไม่ควรให้แบรนด์ต่างกันเกิน 2 ขั้นในสเกล เพราะ component เดียวกันจะดูเป็นคนละระบบ (NewsKit ที่มี The Times กับ The Sun ก็ยังใช้ scale เดียวกันแค่เลือกค่าต่างกัน)

### 16.6 สิ่งที่ไม่ควรทำตอนนี้

1. **ไม่ทำ corner smoothing / squircle** เพราะ `corner-shape: squircle` ยังไม่ Baseline (ข้อ 11.2) จะเกิดช่องว่าง Figma กับ code ทันที · **ควรเขียนกฎในหน้า 06 Shape ว่า corner smoothing ต้องเป็น 0% ทุก node** และเพิ่มเข้า Definition of Done เหมือนกฎสีดิบ
2. **ไม่ทำ shape family (cut corner) และ shape morph** เป็นของฝั่ง native app ไม่มี DS เว็บเจ้าไหนทำ
3. **ไม่ใช้ค่าเกิน 24 px** ไม่มี DS เว็บเจ้าไหนใช้
4. **ไม่ตั้งชื่อ radius ด้วย t-shirt size** เพราะชนกับ `SIZES` ของ component ที่มีอยู่ (ข้อ 16.2)

### 16.7 ข้อเสนอโครงเอกสารหน้า 06 Shape

ตาม Pre-flight ใน CLAUDE.md (doc 4 ชนิดต่อหน้า) หน้านี้ควรมี

| ชนิด doc | เนื้อหา |
|---|---|
| **Page Documentation** (1 อัน) | หน้า Shape คืออะไร มีอะไรบ้าง ใช้เมื่อไหร่ ควร/ไม่ควร + link ไปเอกสารลูก |
| **Information Document** | (1) Radius scale specimen ภาพชุด 10 ขั้นเรียงกัน (2) Radius ตามบทบาท ตาราง mapping component (3) Nested radius หลักการ + สูตร + ภาพผิด/ถูก (4) Multi-brand shape เทียบ 3 กลุ่มแบรนด์ |
| **Token Document** (1 อัน) | ตารางจับคู่ ชื่อ Figma ↔ ชื่อโค้ด (`--ntg-radius-*`) ↔ ค่า px ↔ ใช้ตรงไหน |
| **Component Previews** | ถ้าหน้านี้จะมี component ตัวอย่าง (เช่น shape swatch) ต้องแยกออกมา ไม่ยัดลง Page Doc |

**เตือนตาม DoD:** ห้ามวาด swatch เอง ต้องใช้ instance ของ DS ตารางต้องใช้ `table-cell/*` จากหน้า 26 Table ล้างสีดิบของหน้า 06 ให้เหลือ 0 ก่อนบอกเสร็จ

---

## 17. สรุปข้อจำกัดของงานวิจัยนี้

1. **ค่าของ Material 3** ดึงจาก source code ของ Jetpack Compose ไม่ใช่จากหน้าเว็บ m3.material.io เพราะหน้าเว็บ render ด้วย JS ดึงผ่าน WebFetch ไม่ได้ · ค่าน่าเชื่อถือเพราะเป็น source ทางการของ Google แต่เป็นฝั่ง Android อาจต่างจากคำแนะนำฝั่งเว็บเล็กน้อย
2. **Fluent 2 มีค่า 2 ชุดที่ขัดกัน** (เว็บ design กับ code) รายงานไว้ทั้งคู่แล้ว ไม่ได้ตัดสินว่าชุดไหนถูก
3. **FT Origami ไม่ได้ข้อมูล** GitHub API คืน 404 ทุก path ที่ลอง
4. **Guardian Source** ยืนยันได้ว่าไม่มี radius foundation จากการ list directory แต่ไม่ได้ตรวจทุก component จึงพูดได้แค่ว่า "ไม่มีในชั้น foundation"
5. **การจับคู่บุคลิกแบรนด์กับค่า radius ในข้อ 16.5 เป็นสมมติฐาน** ไม่ใช่ข้อเท็จจริงจากงานวิจัย ต้องทดสอบกับผู้อ่านจริงหรือยืนยันกับฝ่ายแบรนด์ก่อนใช้
6. **ยังไม่ได้ทำ competitive analysis ของเว็บข่าวไทย** (Sanook, Matichon, Workpoint, Khaosod) ในเรื่อง radius โดยเฉพาะ · ถ้าต้องการให้เทียบว่าคู่แข่งไทยใช้ radius เท่าไหร่ ต้องสั่งงานเพิ่ม

