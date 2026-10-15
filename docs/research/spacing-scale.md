---
title: "ระบบระยะห่าง (Spacing Scale) research"
description: "เทียบระบบ spacing ของ DS เจ้าใหญ่ 14 เจ้า จากไฟล์ token ต้นทางจริง พร้อมข้อเสนอสเกลกลางของ NTGDS สำหรับหน้า 07 Space"
research_date: "2026-08-26"
scope: "Material 3 Apple HIG IBM Carbon Shopify Polaris Atlassian Fluent 2 GitHub Primer Adobe Spectrum 2 Ant Design Tailwind v4 Salesforce Lightning Uber Base Guardian Source News UK NewsKit BBC GEL"
status: "draft รอตัดสิน"
owner: "ux-researcher"
---

# Research ระบบระยะห่าง (Spacing Scale) ของ Design System เจ้าใหญ่

**วันที่วิจัย:** 2026-08-26
**โจทย์:** ตัดสินสเกลระยะห่างกลางของ NTGDS (หน่วยฐาน จำนวนขั้น การตั้งชื่อ ชั้น semantic layout เทียบ component density responsive ระยะที่ผูกกับ typography)

**ป้ายแหล่ง:** `[ทางการ]` = ไฟล์ token หรือเอกสารขององค์กรเอง `[กึ่งทางการ]` = พนักงานหรือชุมชนทางการพูดเอง `[แหล่งรอง]` = คนนอก

> **วิธีเก็บข้อมูล:** ค่าทุกค่าในเอกสารนี้อ่านจาก **ไฟล์ token ต้นทางจริง** ของแต่ละเจ้า (GitHub raw หรือแพ็กเกจ npm) ไม่ได้อ่านจากหน้าเว็บที่คนเขียนสรุปไว้ ยกเว้นที่ระบุไว้เป็นอย่างอื่น เพราะบทเรียนจาก [shape-radius.md](shape-radius.md) §2 ที่พบว่าเว็บ Fluent 2 กับโค้ด Fluent 2 ให้ค่าไม่ตรงกัน

---

## 1. สรุปคำตอบ 8 ประเด็น (อ่านหน้าเดียวจบ)

| # | ประเด็น | คำตอบสั้นจากข้อมูลจริง |
|---|---|---|
| 1 | หน่วยฐาน | **ไม่มีใครใช้ 8 ล้วน** ทุกเจ้าที่ประกาศฐาน 8 (Carbon Atlassian BBC GEL) ยังมีขั้นย่อย 2 และ 4 อยู่ใต้ฐานเสมอ เจ้าที่ประกาศฐาน 4 (Tailwind Ant Design Material) ก็เดินเป็นทวีคูณของ 8 ตั้งแต่ 16 ขึ้นไป ข้อสรุปคือ **ฐานเดียวไม่พอ ต้องเป็นฐาน 8 ที่มีครึ่งขั้นล่าง หรือฐาน 4 ที่เว้นห่างขึ้นเมื่อค่าโต** |
| 2 | จำนวนขั้นและรูปแบบ | มัธยฐาน **15 ขั้น** (ต่ำสุด Ant Design 8 สูงสุด Uber Base 22) **ไม่มีเจ้าไหนเป็นเชิงเส้นตลอด** ทุกเจ้าถี่ตอนค่าน้อยแล้วห่างขึ้นเมื่อค่าโต เพราะตาคนแยก 2px ที่ระยะ 8 ออก แต่แยก 2px ที่ระยะ 96 ไม่ออก |
| 3 | ระบบตั้งชื่อ | **ตัวเลขชนะขาด** (Carbon Polaris Atlassian Spectrum Lightning Base Web Guardian NewsKit) t-shirt เหลือแค่ Fluent กับ Ant Design ชื่อตามหน้าที่ (inset/stack/inline) **มีเจ้าเดียวที่ยังทำจริงคือ NewsKit** ส่วน Spectrum ทำแล้ว **เลิก** (ดู §10) |
| 4 | ชั้น semantic | มี **แต่บางมาก** Polaris มี 4 ตัว Spectrum มี 2 ตระกูล (`container-*`, `base-*`) Atlassian กับ Carbon **ไม่มีเลย** **Spectrum เคยทำชั้น semantic แบบเชิงสัมพันธ์ (`text-to-visual-*`) แล้วประกาศ deprecated ทั้งตระกูล** เปลี่ยนกลับไปใช้ชื่อกลาง ๆ (`base-gap-*`) |
| 5 | layout เทียบ component | **Carbon เคยแยก 2 สเกล (`spacing01-13` กับ `layout01-07`) แล้วประกาศ deprecated สเกล layout ทิ้ง** เหลือสเกลเดียว ไม่มีเจ้าไหนแยกสเกล layout ออกจาก component ในปัจจุบัน |
| 6 | density / compact | 2 วิธี **(ก) แกน variant ในชื่อ token** (Primer: `condensed / normal / spacious`) **(ข) สูตรตัวคูณ** (Material `density` scale ระยะ 4px ต่อขั้น Ant Design `sizeUnit`/`sizeStep`) **ไม่มีใครสลับสเกลทั้งชุด** |
| 7 | responsive | **แทบไม่มีใครเปลี่ยนสเกลตาม breakpoint** ที่ทำคือ Spectrum (ชุด `desktop`/`mobile` ต่อ token) Primer (ชุด `fine`/`coarse` ตามชนิดตัวชี้ ไม่ใช่ความกว้างจอ) Carbon (fluid spacing เป็น `vw` แยก 4 ตัว) |
| 8 | ระยะที่ผูกกับ typography | **ไม่มีเจ้าไหนนับเป็นส่วนหนึ่งของสเกล** Spectrum เคยมี `text-to-*` แล้วเลิก ที่เหลือให้ใช้ token ระยะห่างธรรมดา และคุมจังหวะแนวตั้งด้วย line-height ของ preset |

---

## 2. สถานะปัจจุบันของ NTGDS (ข้อมูลจากไฟล์จริง)

| ประเด็น | สถานะ |
|---|---|
| สเกลระยะห่างกลาง | **ไม่มี** ทั้งฝั่ง Figma variable และฝั่ง CSS |
| token ระยะห่างที่มีจริงในโค้ด | **40 ตัว** ทั้งหมดขึ้นต้น `--ntg-space-button-*` (height padding l/r/t/b padding-icon-only gap icon) generate จาก [`tokens/scale/button.mjs`](../../tokens/scale/button.mjs) |
| ค่าที่สูตรผลิตออกมา | padding l/r `8, 10, 12, 14, 16` gap `2, 4, 6, 8, 10` height `24, 32, 40, 48, 56` icon-only `4, 7, 10, 13, 16` |
| หน้า 07 Space ใน Figma | เขียนตัวเลข **26 ขั้น** ไว้เป็นภาพประกอบ **ไม่ผูก token** `0, 2, 4, 6, 8, 10, 12, 16, 20, 24, 28, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 112, 120, 128, 136, 144` |
| taxonomy ที่ประกาศไว้ | [`token-naming-taxonomy.md`](../rules/token-naming-taxonomy.md) §3.3 ระบุ `size.space.<scale>` แบบ compound tier-step (`sm-md` = 16px) แต่ **ชื่อชุดนี้ไม่มีอยู่ในไฟล์ build แล้ว** เป็นซากของระบบเดิม |
| ฐานกริด | ฐาน **8** ทุกจอตั้งแต่รุ่น v2026 (มือถือ 360: ร่อง 8 ขอบ 24 container 312 คอลัมน์ 72) ดู [`04-grid.md`](../04-grid.md) §4.3 |
| โมเดลที่ใช้อยู่กับ radius | สเกลกลางอยู่ในโค้ดเป็น input ของสูตร **ไม่กลายเป็น variable ใน Figma** Figma มี variable ชั้นเดียวคือระดับ component (ตัดสิน 2026-08-20 ดู taxonomy §3.3.1) |

**ข้อสังเกตสำคัญ 3 ข้อ ที่ต้องเอาไปคิดตอนตัดสิน**

1. **ค่าที่ปุ่มใช้จริงมี step 2 (8·10·12·14·16)** ถ้าสเกลกลางเป็นทวีคูณของ 8 ล้วน ค่าเหล่านี้จะไม่มีขั้นรองรับ · แต่ตามกติกาที่ตัดสินไว้แล้วสำหรับ radius (taxonomy §3.3.1 กติกาข้อ 2) **ค่าที่เป็นผลจากสูตรไม่จำเป็นต้องมีในสเกล** ข้อขัดแย้งนี้จึงหายไปถ้ายึดกติกาเดิม
2. **26 ขั้นที่เขียนไว้ในหน้า Figma ตอนนี้เกินค่ากลางของตลาดเกือบเท่าตัว** (มัธยฐาน 15) และช่วงบน `72 · 80 · 88 · 96 · 104 · 112 · 120 · 128 · 136 · 144` เดินทีละ 8 ติดกัน 10 ขั้น ซึ่ง **ไม่มี DS เจ้าไหนในโลกทำ** ทุกเจ้าเว้นห่างขึ้นเมื่อค่าโต
3. **spacing ไม่เหมือน radius ตรงจุดเดียวที่สำคัญมาก** radius ผูกกับ component เสมอ (กล่องต้องมีมุม) แต่ระยะห่างจำนวนมากอยู่บน **frame ที่ไม่ใช่ component** (ช่องไฟระหว่าง section · padding ของหน้า · gap ของ auto-layout ที่นักออกแบบสร้างสด) ถ้าไม่มี variable ชั้นไหนให้ผูกเลย นักออกแบบจะพิมพ์ตัวเลขดิบ ซึ่งเป็นสภาพเดียวกับ "สีดิบ" ที่ DoD ห้ามไว้ · เรื่องนี้อภิปรายเต็มใน §17.5

---

## 3. IBM Carbon

Carbon เป็นเจ้าที่ **มีหลักฐานการเปลี่ยนใจย้อนหลังชัดที่สุด** และเป็นคำตอบตรงของประเด็นข้อ 5

### 3.1 สเกลและหน่วยฐาน

จาก `packages/layout/src/index.ts` `[ทางการ]`

```
export const miniUnit = 8;
export const miniUnits = (count) => rem(miniUnit * count);
```

| Token | สูตร | rem | px |
|---|---|---|---|
| spacing01 | miniUnits(0.25) | 0.125 | 2 |
| spacing02 | miniUnits(0.5) | 0.25 | 4 |
| spacing03 | miniUnits(1) | 0.5 | 8 |
| spacing04 | miniUnits(1.5) | 0.75 | 12 |
| spacing05 | miniUnits(2) | 1 | 16 |
| spacing06 | miniUnits(3) | 1.5 | 24 |
| spacing07 | miniUnits(4) | 2 | 32 |
| spacing08 | miniUnits(5) | 2.5 | 40 |
| spacing09 | miniUnits(6) | 3 | 48 |
| spacing10 | miniUnits(8) | 4 | 64 |
| spacing11 | miniUnits(10) | 5 | 80 |
| spacing12 | miniUnits(12) | 6 | 96 |
| spacing13 | miniUnits(20) | 10 | 160 |

**หน่วยฐาน:** ประกาศเป็น **mini-unit 8** แต่ 2 ขั้นแรกเป็นเศษของ 8 (0.25 และ 0.5 เท่า) แปลว่าในทางปฏิบัติ **ฐานที่ใช้จริงคือ 2**
**ชนิดสเกล:** ตัวคูณเดิน `0.25, 0.5, 1, 1.5, 2, 3, 4, 5, 6, 8, 10, 12, 20` เป็น **กึ่งเรขาคณิต** ช่วงล่างถี่ ช่วงบนกระโดด จุดกระโดดใหญ่ที่สุดคือ 96 ไป 160
**การตั้งชื่อ:** เลขลำดับล้วน `01 ถึง 13` **ไม่ใช่ค่า px** และ **ไม่บอกอะไรเลย** ต้องเปิดตารางทุกครั้ง (ข้อเสียที่ Atlassian กับ Polaris แก้ไปแล้ว ดู §5 และ §4)
**ชั้น semantic:** **ไม่มี** component เรียก `$spacing-05` ตรง ๆ

### 3.2 หลักฐานว่า Carbon เคยแยกสเกล layout แล้วเลิก

ในไฟล์เดียวกัน ต่อจากบล็อก spacing `[ทางการ]`

```
// Layout
// Deprecated
export const layout01 = miniUnits(2);   // 16
export const layout02 = miniUnits(3);   // 24
export const layout03 = miniUnits(4);   // 32
export const layout04 = miniUnits(6);   // 48
export const layout05 = miniUnits(8);   // 64
export const layout06 = miniUnits(12);  // 96
export const layout07 = miniUnits(20);  // 160
```

อ่านว่า Carbon **เคยมี 2 สเกลคู่ขนาน** ชุดหนึ่งสำหรับระยะภายใน component อีกชุดสำหรับระยะระดับ layout แล้วพบว่าค่าทั้ง 7 ตัวของ layout **ซ้ำกับ spacing ทุกตัว** (16, 24, 32, 48, 64, 96, 160 มีอยู่ใน `spacing05, 06, 07, 09, 10, 12, 13` หมดแล้ว) จึงติดป้าย Deprecated ทิ้งไว้เพื่อความเข้ากันได้ย้อนหลัง

> **บทเรียนตรงสำหรับ NTGDS:** อย่าแยกสเกล layout ออกจากสเกล component ตั้งแต่แรก เจ้าที่ลองแล้วพบว่าได้ตัวเลขชุดเดียวกัน ต่างกันแค่ชื่อ ซึ่งแปลว่าเพิ่มของให้ดูแลโดยไม่ได้อะไรกลับมา

### 3.3 fluid spacing

Carbon เป็นเจ้าเดียวที่มี token ระยะห่างเป็นหน่วย viewport `[ทางการ]`

```
fluidSpacing01 = 0 · fluidSpacing02 = 2vw · fluidSpacing03 = 5vw · fluidSpacing04 = 10vw
```

ใช้กับระยะขอบระดับหน้าที่ควรโตตามจอ แยกออกจากสเกลหลักชัดเจน ไม่ปนกัน

### แหล่ง
- [carbon packages/layout/src/index.ts](https://raw.githubusercontent.com/carbon-design-system/carbon/main/packages/layout/src/index.ts) `[ทางการ]` (ค่าทุกค่าและคอมเมนต์ Deprecated มาจากไฟล์นี้)
- [carbon packages/layout/src/tokens.ts](https://raw.githubusercontent.com/carbon-design-system/carbon/main/packages/layout/src/tokens.ts) `[ทางการ]` (รายชื่อ token ที่ export)
- [Carbon Spacing overview](https://carbondesignsystem.com/elements/spacing/overview/) `[ทางการ]` **หมายเหตุ:** หน้าเว็บยาวเกินจนดึงเนื้อหาไม่ครบ จึงใช้ source เป็นหลัก

---

## 4. Shopify Polaris

Polaris คือคำตอบของคำถาม "ตั้งชื่อเป็นเลขแบบไหนถึงจะอ่านออก"

### 4.1 สเกล

`space-*` เป็น alias ที่ชี้ไปยัง `size` scale ตัวเดียวกับที่ radius และ width/height ใช้ `[ทางการ]`

| Token | px | Token | px |
|---|---|---|---|
| space-0 | 0 | space-500 | 20 |
| space-025 | 1 | space-600 | 24 |
| space-050 | 2 | space-800 | 32 |
| space-100 | 4 | space-1000 | 40 |
| space-150 | 6 | space-1200 | 48 |
| space-200 | 8 | space-1600 | 64 |
| space-300 | 12 | space-2000 | 80 |
| space-400 | 16 | space-2400 | 96 |
| | | space-2800 | 112 |
| | | space-3200 | 128 |

**กติกาชื่อ:** เลข = **px × 25** (4px คือ 100, 8px คือ 200, 128px คือ 3200) แปลงกลับในหัวได้ และ **แทรกขั้นกลางได้โดยไม่ต้อง rename ตัวอื่น** (เพิ่ม `space-250` = 10px ได้ทันที)
**หน่วยฐาน:** ฐานจริงคือ **1** (มี 1px และ 2px) แต่ค่าที่ใช้จริงส่วนใหญ่เดินฐาน 4
**จำนวนขั้น 18** เป็นเจ้าที่ขั้นเยอะเป็นอันดับ 2 รองจาก Uber Base

### 4.2 ชั้น semantic ที่มีจริง (มีแค่ 4 ตัว)

ในไฟล์เดียวกันมีบล็อกที่คอมเมนต์ว่า "Specialty and component spacing" `[ทางการ]`

```
space-button-group-gap   = var(--space-200)   8px
space-card-gap           = var(--space-400)   16px
space-card-padding       = var(--space-400)   16px
space-table-cell-padding = var(--space-150)   6px
```

อ่านว่า Polaris **ไม่ได้ทำชั้น semantic เต็มระบบ** ทำเฉพาะ 4 จุดที่ต้องบังคับให้เท่ากันข้าม component จริง ๆ ที่เหลือให้ผูก primitive ตรง

> **จุดที่ควรลอก:** ชั้น semantic ของ spacing ควรเกิดจาก **ปัญหาที่พบจริงว่ามีของหลายชิ้นต้องเท่ากัน** ไม่ใช่สร้างล่วงหน้าให้ครบทุกบทบาท ตรงกับบทเรียน radius ของเราที่สร้างชั้นกลาง 16 ตัวแล้วไม่มีใครใช้

### แหล่ง
- [polaris-tokens/src/themes/base/space.ts](https://raw.githubusercontent.com/Shopify/polaris/main/polaris-tokens/src/themes/base/space.ts) `[ทางการ]`
- [polaris-tokens/src/size.ts](https://raw.githubusercontent.com/Shopify/polaris/main/polaris-tokens/src/size.ts) `[ทางการ]` (ค่า px ของ size scale)
- หมายเหตุ: `polaris.shopify.com/design/space` ถูกย้ายไป shopify.dev แล้วและไม่มีเนื้อหา spacing เดิม จึงใช้ source แทน

---

## 5. Atlassian Design System

Atlassian คือเจ้าที่ **ประกาศหน่วยฐานชัดที่สุด** และตั้งชื่อให้ชื่อบอกค่าเองได้

| Token | px | Token | px |
|---|---|---|---|
| space.0 | 0 | space.300 | 24 |
| space.025 | 2 | space.400 | 32 |
| space.050 | 4 | space.500 | 40 |
| space.075 | 6 | space.600 | 48 |
| space.100 | **8 (ฐาน)** | space.800 | 64 |
| space.150 | 12 | space.1000 | 80 |
| space.200 | 16 | | |
| space.250 | 20 | | |

**คำประกาศทางการ:** "Our spacing system is built around a base unit of 8 pixels" และ "The number suffix representing the percentage of the base unit" `[ทางการ]`
อ่านว่า `space.200` = 200% ของ 8 = 16px **ชื่อคือสูตร** ไม่ต้องจำตาราง

**สังเกตว่าฐาน 8 แต่มีขั้นย่อยใต้ฐาน 3 ขั้น** (2, 4, 6 = 25% 50% 75%) ซึ่งจำเป็นเพราะระยะภายใน component เล็ก ๆ ใช้ 8 ไม่ได้

**คำแนะนำการเลือกใช้ตามช่วง** `[ทางการ]`

| ช่วง | ใช้กับอะไร |
|---|---|
| 0 ถึง 8 | ระยะไอคอนกับข้อความ padding ของ component แน่น padding ของ input ระยะระหว่างชิ้นในการ์ด |
| 12 ถึง 24 | padding ของ component ใหญ่ ระยะ avatar กับเนื้อหา layout ที่ไม่แน่น |
| 32 ถึง 80 | ระยะระดับหน้า การจัดวาง layout หลัก |

> นี่คือ **การแบ่ง layout กับ component โดยไม่ต้องแยกสเกล** ใช้สเกลเดียวแล้วเขียนกฎว่าช่วงไหนเป็นของใคร ซึ่งเบากว่าและกันปัญหาที่ Carbon เจอ

**ชั้น semantic:** ไม่มี **density:** ไม่มี token เฉพาะ **responsive:** ไม่เปลี่ยนตาม breakpoint

### แหล่ง
- [Atlassian Design System Spacing](https://atlassian.design/foundations/spacing) `[ทางการ]`
- [Introducing the spacing scale (Atlassian Developer Community, ม.ค. 2023)](https://community.developer.atlassian.com/t/introducing-the-spacing-scale-the-beginnings-of-an-atlassian-spacing-system/65393) `[ทางการ]` ยืนยันว่าก่อนหน้านั้น Atlassian **ไม่มีระบบ spacing เลย** เพิ่งมามีปี 2023

---

## 6. Microsoft Fluent 2

Fluent เป็น **เจ้าเดียวในกลุ่มใหญ่ที่ยังใช้ t-shirt size สำหรับ spacing** และเป็นเจ้าเดียวที่แยกแนวนอนกับแนวตั้ง

จาก `packages/tokens/src/global/spacings.ts` `[ทางการ]`

| Token | px | Token | px |
|---|---|---|---|
| none | 0 | mNudge | 10 |
| xxs | 2 | m | 12 |
| xs | 4 | l | 16 |
| sNudge | 6 | xl | 20 |
| s | 8 | xxl | 24 |
| | | xxxl | 32 |

**ของแปลกที่ควรรู้ 3 อย่าง**

1. **`Nudge` คือคำตอบของ Fluent ต่อปัญหา "ต้องการค่าคั่นกลาง"** แทนที่จะเพิ่ม `sm-plus` หรือเลื่อนทั้งสเกล เขาเติมคำว่า Nudge ต่อท้ายขั้นเดิม (`sNudge` = 6 อยู่ระหว่าง `s` = 8 กับ `xs` = 4) · **นี่คือหลักฐานว่า t-shirt size แตกเมื่อต้องแทรกขั้น** ต้องประดิษฐ์คำใหม่มาอุด
2. **แยก 2 ชุดเต็ม** `spacingHorizontal*` และ `spacingVertical*` ค่าเท่ากันทุกตัว แต่แยกชื่อเพื่อให้เปลี่ยนแยกกันได้ในอนาคต
3. คอมเมนต์ในไฟล์ระบุว่าตัวสเกลดิบ **"Intentionally not exported!"** ให้ใช้ชุด horizontal/vertical เท่านั้น `[ทางการ]`

**หยุดที่ 32** เป็นสเกลที่สั้นที่สุดในฝั่งเจ้าใหญ่ เพราะ Fluent เป็น DS ของ productivity app ที่ระยะระดับหน้าจัดการด้วย layout component ไม่ใช่ token
**ชั้น semantic:** ไม่มี spacing อยู่ในโฟลเดอร์ `global/` ชั้นเดียว เหมือนที่ Fluent ทำกับ borderRadius

### แหล่ง
- [fluentui/packages/tokens/src/global/spacings.ts](https://raw.githubusercontent.com/microsoft/fluentui/master/packages/tokens/src/global/spacings.ts) `[ทางการ]`

---

## 7. GitHub Primer

Primer คือ **คำตอบที่ดีที่สุดของประเด็น density และ responsive** (ข้อ 6 และ 7 ของโจทย์)

### 7.1 ชั้น base (ตัวเลขล้วน)

`src/tokens/base/size/size.json5` `[ทางการ]` ชื่อ token = ค่า px ตรง ๆ

```
2 · 4 · 6 · 8 · 12 · 16 · 20 · 24 · 28 · 32 · 36 · 40 · 44 · 48 · 64 · 80 · 96 · 112 · 128
```

**19 ขั้น** และมี **ชุดค่าติดลบครบทุกขั้นถึง -48** (`base.size.negative-24`) สำหรับ margin ติดลบ ซึ่งไม่มีเจ้าอื่นทำ
**การตั้งชื่อ:** `base.size.16` = 16px **ชื่อคือค่า** อ่านออกทันทีโดยไม่ต้องคูณอะไร (ต่างจาก Polaris ที่ต้อง หาร 25 และ Atlassian ที่ต้อง คูณ 8 หาร 100)

### 7.2 density เป็นแกนในชื่อ token

`src/tokens/functional/size/size.json5` `[ทางการ]`

```
stack.padding.condensed = 8   · stack.padding.normal = 16  · stack.padding.spacious = 24
stack.gap.condensed     = 8   · stack.gap.normal     = 16  · stack.gap.spacious     = 24

control.medium.paddingInline.condensed = 8 · .normal = 12 · .spacious = 16
control.large.paddingInline.condensed  = 8 · .normal = 12 · .spacious = 16
control.xsmall.paddingInline.condensed = 4 · .normal = 8  · .spacious = 12
```

อ่านว่า **density ไม่ใช่การสลับสเกลทั้งชุด** แต่เป็น **ค่าที่สาม (`condensed` / `normal` / `spacious`) ต่อท้ายชื่อ token ที่มีอยู่แล้ว** ผลคือทีมเลือก density ได้ทีละจุด ไม่ต้องสลับทั้งหน้า และไม่มีสเกลที่สองให้ดูแล

### 7.3 responsive ตาม "ชนิดตัวชี้" ไม่ใช่ความกว้างจอ

Primer แยกไฟล์ `size-coarse.json5` (ตัวชี้หยาบ คือนิ้ว) กับ `size-fine.json5` (ตัวชี้ละเอียด คือเมาส์) `[ทางการ]`

| token | fine (เมาส์) | coarse (สัมผัส) |
|---|---|---|
| control.minTarget | 16 px | **44 px** |
| controlStack.small.gap.auto | 8 px | **16 px** |
| controlStack.medium.gap.auto | 8 px | **12 px** |

คำอธิบายในไฟล์ระบุว่า 44px มาเพื่อ **"Ensures WCAG 2.5.5 compliance (44x44px minimum)"** และเตือนว่า "Do NOT use for fine pointer (mouse) contexts" `[ทางการ]`

> **จุดที่ตรงกับ Nation มาก** ผู้ใช้เรา mobile 70% ขึ้นไป การแยกตาม `pointer: coarse` แม่นกว่าแยกตามความกว้างจอ เพราะแท็บเล็ตกว้างเท่าโน้ตบุ๊กเล็กแต่ใช้นิ้ว

### แหล่ง
- [primer/primitives base/size/size.json5](https://raw.githubusercontent.com/primer/primitives/main/src/tokens/base/size/size.json5) `[ทางการ]`
- [primer/primitives functional/size/size.json5](https://raw.githubusercontent.com/primer/primitives/main/src/tokens/functional/size/size.json5) `[ทางการ]`
- [primer/primitives functional/size/size-coarse.json5](https://raw.githubusercontent.com/primer/primitives/main/src/tokens/functional/size/size-coarse.json5) `[ทางการ]`
- [Primer Foundations Primitives Size](https://primer.style/foundations/primitives/size) `[ทางการ]`

---

## 8. Adobe Spectrum 2

Spectrum เป็นเจ้าที่ **ให้บทเรียนแพงที่สุด** เพราะทำชั้น semantic แบบเชิงสัมพันธ์เต็มระบบแล้วต้องถอย

### 8.1 ชั้น primitive

`packages/tokens/src/layout.json` `[ทางการ]`

| Token | px | Token | px |
|---|---|---|---|
| spacing-25 | 1 | spacing-400 | 24 |
| spacing-50 | 2 | spacing-500 | 32 |
| spacing-75 | 4 | spacing-600 | 40 |
| spacing-85 | 6 | spacing-700 | 48 |
| spacing-100 | **8** | spacing-800 | 64 |
| spacing-200 | 12 | spacing-900 | 80 |
| spacing-300 | 16 | spacing-1000 | 96 |
| spacing-350 | 20 | | |

15 ขั้น เลขไม่ได้แปลงเป็น px ตรง ๆ (`spacing-100` = 8 ไม่ใช่ 100 และไม่ใช่ 4) เป็นเลขลำดับที่มีที่ว่างให้แทรก

### 8.2 ชั้น semantic ที่ยังใช้อยู่

```
container-gap-2x-small     = {spacing-85}   6      container-padding-2x-small  = {spacing-85}   6
container-gap-extra-small  = {spacing-100}  8      container-padding-extra-small = {spacing-100} 8
container-gap-small        = {spacing-200}  12     container-padding-small     = {spacing-200}  12
container-gap-medium       = {spacing-300}  16     container-padding-medium    = {spacing-300}  16
container-gap-large        = {spacing-350}  20     container-padding-large     = {spacing-350}  20
container-gap-extra-large  = {spacing-400}  24     container-padding-extra-large = {spacing-400} 24
container-gap-2x-large     = {spacing-500}  32     container-padding-3x-large  = {spacing-600}  40
```

พร้อมคำอธิบายในไฟล์ว่า "Spacing between child elements for containers at medium size" `[ทางการ]`

และชุด `base-*` สำหรับระยะภายใน UI element

```
base-gap-small 4 · base-gap-medium 6 · base-gap-large 6 · base-gap-extra-large 6 · base-gap-4x-large 10
base-padding-vertical-2x-small 2 · extra-small 3 · small 4 · medium 7 · large 10 · extra-large 13 · 2x-large 15 · 3x-large 19
```

**สังเกตค่า padding แนวตั้ง 3, 7, 10, 13, 15, 19** ไม่อยู่บนฐาน 4 หรือ 8 เลย เพราะเป็น **ค่าที่คำนวณย้อนจากความสูงของ component ลบความสูงบรรทัดข้อความ** ซึ่งเป็นโมเดลเดียวกับที่ CLAUDE.md บังคับไว้ว่า `padding × 2 + icon = ขนาดปุ่ม`

### 8.3 หลักฐานการเปลี่ยนใจ ตระกูล token ชื่อตามหน้าที่ถูก deprecated ทั้งชุด

ในไฟล์เดียวกันมี token กว่า **60 ตัว** ที่ติดธง `"deprecated": true` พร้อม `deprecated_comment` ระบุตัวแทน `[ทางการ]`

| token เดิม (ชื่อเชิงสัมพันธ์) | ค่า desktop/mobile | คอมเมนต์ทางการ |
|---|---|---|
| `text-to-visual-100` | 6 / 8 | "Use semantic token **base-gap-medium** instead." |
| `text-to-control-100` | 10 / 13 | "Use semantic token **base-gap-medium** instead." |
| `component-edge-to-text-100` | 12 / 15 | "Use semantic token **base-padding-horizontal-medium** instead. Updated to follow Spectrum Future Foundations spacing formula" |
| `component-top-to-text-100` | 6 / 8 | "Use semantic token **base-padding-vertical-medium** instead. Change required for VF upgrade" |
| `component-to-menu-small` | 6 / 7 | "Use semantic token **popover-gap** instead. Unifying to a single popover-gap value across use cases" |

ตระกูลที่ถูกยกเลิกทั้งหมดคือ `component-edge-to-text-*` `component-top-to-text-*` `component-bottom-to-text-*` `component-edge-to-visual-*` `component-pill-edge-to-*` `text-to-visual-*` `text-to-control-*` `component-to-menu-*` `field-edge-to-*`

> **นี่คือคำตอบตรงของโจทย์ข้อ 3 และ 4**
> Spectrum เคยตั้งชื่อ token ระยะห่างตาม **สิ่งที่อยู่สองข้างของช่องว่าง** ("ขอบ component ถึงข้อความ" "ข้อความถึงไอคอน") ซึ่งอ่านแล้วเข้าใจทันทีว่าใช้ตรงไหน แต่ผลคือ **จำนวน token ระเบิด** (ทุกคู่ของสิ่งที่มาชิดกัน คูณ ทุกขนาด) และค่าจำนวนมากซ้ำกัน
> ทางออกที่เขาเลือกคือถอยกลับไปใช้ชื่อกลาง ๆ ตามขนาด (`base-gap-medium`) แล้วเขียน `description` กำกับว่าใช้ตอนไหน **ความหมายย้ายจากชื่อไปอยู่ในคำอธิบาย**

### 8.4 responsive desktop เทียบ mobile

token หลายตัวเป็น `scale-set` ที่มี 2 ค่าในตัวเดียว `[ทางการ]`

| token | desktop | mobile |
|---|---|---|
| base-padding-horizontal-small | 10 | 8 |
| base-padding-horizontal-medium | 12 | 10 |
| base-padding-horizontal-large | 14 | 12 |
| base-padding-horizontal-2x-large | 18 | 14 |
| component-top-to-text-100 (เดิม) | 6 | **8** |

อ่านว่า Spectrum ให้ **มือถือแคบกว่าในแนวนอน แต่สูงกว่าในแนวตั้ง** ซึ่งสมเหตุสมผล (แนวนอนมีที่จำกัด แนวตั้งต้องการพื้นที่กดด้วยนิ้ว) การสลับเกิดที่ระดับ **platform scale** ไม่ใช่ breakpoint จำนวนมาก มีแค่ 2 ชุด

### แหล่ง
- [spectrum-design-data packages/tokens/src/layout.json](https://raw.githubusercontent.com/adobe/spectrum-design-data/main/packages/tokens/src/layout.json) `[ทางการ]` (ไฟล์ 340 token ค่าและคอมเมนต์ deprecated ทั้งหมดมาจากไฟล์นี้)

---

## 9. Ant Design

Ant Design เป็นเจ้าเดียวที่ **spacing ทั้งหมดเกิดจากสูตร ไม่ใช่ตาราง**

### 9.1 seed token 2 ตัวคุมทั้งระบบ

จากหน้า Customize Theme `[ทางการ]`

| Seed token | ค่า default | คำอธิบายทางการ |
|---|---|---|
| `sizeUnit` | **4** | "The unit of size change, in Ant Design, our base unit is 4, which is more fine-grained control of the size step" |
| `sizeStep` | **4** | "The base step of size change, the size step combined with the size change unit, can derive various size steps" |

ตัวอย่างสูตรที่เอกสารยกมา `sizeXXL = sizeUnit × (sizeStep + 8) = 4 × 12 = 48`

### 9.2 map token ที่ได้

| Token | px |
|---|---|
| sizeXXS | 4 |
| sizeXS | 8 |
| sizeSM | 12 |
| size / sizeMS | 16 |
| sizeMD | 20 |
| sizeLG | 24 |
| sizeXL | 32 |
| sizeXXL | 48 |

`padding*` และ `margin*` เดินตามชุดเดียวกัน (4, 8, 12, 16, 20, 24, 32, 48)

**8 ขั้น น้อยที่สุดในบรรดาทุกเจ้า** เพราะขั้นที่ขาดสร้างเพิ่มได้ด้วยการขยับ seed 2 ตัว
**ชนิดสเกล:** เชิงเส้น step 4 จนถึง 24 แล้วกระโดด (32, 48)
**การตั้งชื่อ:** t-shirt size และมีปัญหาเดียวกับ Fluent คือต้องประดิษฐ์ `sizeMS` (Medium-Small) มาแทรกระหว่าง SM กับ MD

> **จุดที่ตรงกับ NTGDS ที่สุด** โมเดล "seed 2 ตัว แล้วสูตรผลิตขั้นที่เหลือ" คือสิ่งเดียวกับที่เราทำใน `tokens/scale/*.mjs` (`size[i] = base + i × step`) ต่างกันที่ Ant ใช้กับสเกลกลาง ส่วนเราใช้กับ component

### แหล่ง
- [Ant Design Customize Theme (Seed Token / Map Token)](https://ant.design/docs/react/customize-theme/) `[ทางการ]`
- [Design Token Architecture (DeepWiki ant-design)](https://deepwiki.com/ant-design/ant-design/3.2-design-token-architecture) `[แหล่งรอง]` อธิบายชั้น Seed ไป Map ไป Alias

---

## 10. Tailwind CSS v4

ไม่ใช่ DS ขององค์กร แต่เป็นมาตรฐานที่ dev คุ้นที่สุด และเป็น **โมเดลที่สุดขั้วอีกด้าน คือไม่มีสเกลเลย**

จากหน้า Theme variables `[ทางการ]`

```
--spacing: 0.25rem;   /* = 4px */
```

ทุก utility ระยะห่างคำนวณจากตัวแปรตัวเดียวนี้ `p-4` = `calc(var(--spacing) × 4)` = 16px `p-7` = 28px
**จำนวนขั้น: ไม่จำกัด** เขียนเลขอะไรก็ได้ ระบบคูณให้
**ข้อดี:** ไม่มีวันเจอปัญหา "ไม่มีขั้นที่ต้องการ"
**ข้อเสียที่ต้องรู้:** ระบบไม่ได้บังคับอะไรเลย ทีมที่ไม่มีวินัยจะได้ `p-13` `p-17` `p-23` ปนกันในโค้ดเดียวกัน Tailwind แก้ปัญหาการมีสเกลด้วยการทิ้งข้อดีของการมีสเกลไปเลย

> **NTGDS เอาไปใช้ได้จุดเดียว** คือกติกาว่า **หน่วยฐานต้องเป็นตัวแปรตัวเดียวที่แก้ได้ที่เดียว** ไม่ใช่ค่าที่พิมพ์ซ้ำ 26 ครั้ง

### แหล่ง
- [Tailwind CSS Theme variables](https://tailwindcss.com/docs/theme) `[ทางการ]`

---

## 11. Salesforce Lightning (SLDS 2)

จากแพ็กเกจ `@salesforce-ux/design-system` ไฟล์ `design-tokens/dist/spacing.raw.json` `[ทางการ]`

| Token | rem | px | Token | rem | px |
|---|---|---|---|---|---|
| spacing-1 | 0.25 | 4 | spacing-7 | 2.5 | 40 |
| spacing-2 | 0.5 | 8 | spacing-8 | 3 | 48 |
| spacing-3 | 0.75 | 12 | spacing-9 | 3.5 | 56 |
| spacing-4 | 1 | 16 | spacing-10 | 4 | 64 |
| spacing-5 | 1.5 | 24 | spacing-11 | 4.5 | 72 |
| spacing-6 | 2 | 32 | spacing-12 | 5 | 80 |

**12 ขั้น** **หน่วยฐาน 4** (เดิน +4 ถึง 16 แล้ว +8 ตลอด)
**การตั้งชื่อ:** เลขลำดับล้วน `1 ถึง 12` เหมือน Carbon คือ **ชื่อไม่บอกค่า**
**ที่น่าสังเกต:** SLDS **เคยใช้ t-shirt size** (`spacingXSmall` `spacingMedium` `spacingXxLarge`) ในรุ่น Aura แล้ว **SLDS 2 เปลี่ยนมาเป็นเลขลำดับทั้งชุด** เป็นหลักฐานอีกชิ้นว่าทิศทางของตลาดคือย้ายออกจาก t-shirt (ตรวจแพ็กเกจรุ่น 2.24.3 พบว่าใช้ `spacing-1..12` แล้วเช่นกัน แปลว่าการย้ายเกิดก่อนหน้านั้น)
**ช่วงบนไม่มี 96 หรือ 128** หยุดที่ 80 เพราะ SLDS เป็น DS ของ CRM ที่หน้าจอแน่น

### แหล่ง
- [@salesforce-ux/design-system design-tokens/dist/spacing.raw.json (jsDelivr)](https://cdn.jsdelivr.net/npm/@salesforce-ux/design-system/design-tokens/dist/spacing.raw.json) `[ทางการ]`
- [Spacing and Sizing (Lightning Design System 2)](https://www.lightningdesignsystem.com/2e1ef8501/p/03d6b0) `[ทางการ]`

---

## 12. Uber Base

จาก `src/themes/shared/sizing.ts` `[ทางการ]`

```
scale0   2      scale550 14     scale850  28     scale1400 56
scale100 4      scale600 16     scale900  32     scale1600 64
scale200 6      scale650 18     scale950  36     scale2400 96
scale300 8      scale700 20     scale1000 40     scale3200 128
scale400 10     scale750 22     scale1200 48     scale4800 192
scale500 12     scale800 24
```

**22 ขั้น มากที่สุดในบรรดาทุกเจ้า** และเดินทีละ 2 ตั้งแต่ 2 ถึง 24 (12 ขั้นรวด)
**ปัญหาการตั้งชื่อที่เห็นชัดที่สุดในบรรดาทุกเจ้า:** ชื่อเป็นเลขแต่ **ไม่มีความสัมพันธ์กับค่า** `scale100` = 4px `scale1000` = 40px `scale4800` = 192px ตัวคูณไม่คงที่ (100 ต่อ 4 = 25, 1000 ต่อ 40 = 25, 4800 ต่อ 192 = 25) เอาจริง ๆ คือ px × 25 เหมือน Polaris **แต่มี `scale550` `scale650` `scale750` `scale850` `scale950` แทรกอยู่ซึ่งไม่ตรงสูตร** (550 ต่อ 14 = 39.3) แปลว่าสูตรพังไปแล้วตอนแทรกขั้น

> **บทเรียน:** ถ้าจะตั้งชื่อเป็นเลขตามสูตร **ต้องบังคับให้ทุกขั้นใหม่เข้าสูตร** ไม่งั้นจะกลายเป็นเลขที่ท่องจำเหมือน Carbon แต่ยาวกว่า

### แหล่ง
- [uber/baseweb src/themes/shared/sizing.ts](https://raw.githubusercontent.com/uber/baseweb/main/src/themes/shared/sizing.ts) `[ทางการ]`
- [Base Design System Dimensions](https://base.uber.com/6d2425e9f/p/598458-dimensions) `[ทางการ]`

---

## 13. Material 3 และ Apple HIG (2 เจ้าที่ไม่ให้สเกลแบบที่คิด)

### 13.1 Material 3

**สถานะ:** M3 มีหน้า Spacing tokens ทางการที่ [m3.material.io/styles/spacing/tokens](https://m3.material.io/styles/spacing/tokens) `[ทางการ]` แต่ **ดึงค่าออกมายืนยันไม่ได้**

หลักฐานที่พยายามและผลลัพธ์
- ดึงหน้า `m3.material.io/styles/spacing/tokens` และ `/overview` ผ่าน HTTP ได้ HTML ที่มีแต่ `<title>` และข้อความ "This website requires JavaScript" ค่าทั้งหมด render ด้วย JS
- ค้นหา token `md.sys.spacing.*` ใน source ของ `material-components/material-web` (`tokens/_md-sys-spacing.scss`) ได้ **404** ขณะที่ `_md-sys-shape.scss` มีอยู่จริง แปลว่า **ฝั่ง web implementation ยังไม่มี spacing token**
- ค้นหาในฝั่ง Compose ไม่พบไฟล์ `SpacingTokens.kt` คู่ขนานกับ `ShapeTokens.kt` ที่ใช้อ้างอิงใน [shape-radius.md](shape-radius.md)

**สิ่งที่ยืนยันได้จากแหล่งทางการ**
- Material ใช้ **กริดฐาน 4dp** เป็นหลักในการวางองค์ประกอบ และค่าที่ใช้บ่อยเป็นทวีคูณของ 4 (`[กึ่งทางการ]` จากคำอธิบายทั่วไปของ M3 · ไม่ได้ยืนยันจากไฟล์ token)
- **Density subsystem** ของ Material มีจริงและเป็นทางการ จาก `packages/mdc-density/_density.scss` `[ทางการ]`

```
$interval: 4px
$default-scale: 0
value = default + density_scale × interval
```

  ใช้ผ่าน mixin เช่น `@include button.density(-3)` ซึ่งลดความสูงปุ่มลง 12px (3 × 4) เอกสารระบุว่า "Material Design uses low-density space by default but offers high-density space when it improves the user experience" และแนะนำให้ใช้กับ "List, tables, and long forms" `[ทางการ]`

> **นี่คือ `base + i × step` ตัวเดียวกับที่ `tokens/scale/*.mjs` ของเราใช้อยู่** แค่ Material เดินไปทางลบ (ยิ่งลบยิ่งแน่น) แทนที่จะเดินไปทางบวก

**ข้อสรุปที่ใช้ได้:** อย่าอ้าง "สเกล spacing 18 ขั้นของ M3" ในเอกสารของเรา จนกว่าจะยืนยันค่าจากไฟล์ token ทางการได้ ที่อ้างได้ตอนนี้คือกริดฐาน 4dp และโมเดล density interval 4px

### 13.2 Apple HIG

**Apple ไม่มีสเกลระยะห่างเลย** ไม่มี token ไม่มีตาราง ไม่มีชื่อขั้น

ดึงเนื้อหาหน้า Layout ของ HIG จาก API เอกสารทางการของ Apple แล้วอ่านทั้งหน้า พบว่าเป็น **หลักการล้วน** ไม่มีตัวเลขระยะห่างแม้แต่ค่าเดียว `[ทางการ]` ประโยคที่ใกล้ที่สุดคือ

> "Make controls easier to use by providing enough space around them and grouping them in logical sections."

ตัวเลขที่ Apple ให้จริงอยู่ในหน้า Accessibility `[ทางการ]`

| แพลตฟอร์ม | ขนาดปุ่มมาตรฐาน | ขนาดต่ำสุด |
|---|---|---|
| iOS, iPadOS | 44x44 pt | 28x28 pt |
| macOS | 28x28 pt | 20x20 pt |
| tvOS | 66x66 pt | 56x56 pt |
| visionOS | 60x60 pt | 28x28 pt |
| watchOS | 44x44 pt | 28x28 pt |

และคำแนะนำระยะห่างเพียงย่อหน้าเดียวของทั้ง HIG

> "Consider spacing between controls as important as size. Include enough padding between elements to reduce the chance that someone taps the wrong control. In general, it works well to add about **12 points of padding** around elements that include a bezel. For elements without a bezel, about **24 points of padding** works well around the element's visible edges."

**ข้อสังเกต:** 12 และ 24 **ไม่ได้อยู่บนกริด 8** (เป็นทวีคูณของ 4 และของ 12) Apple จงใจไม่ผูกตัวเองกับกริดตัวเลข เพราะระบบของเขาปล่อยให้ SwiftUI จัดระยะมาตรฐานให้เอง

> **บทเรียนสำหรับ NTGDS:** ค่า **44 pt ขั้นต่ำของพื้นที่กด** เป็นข้อจำกัดที่ต้องยึด และตรงกับที่ Primer ใส่ไว้เป็น token `control.minTarget.coarse = 44` และตรงกับ WCAG 2.5.5 เว็บข่าวที่ mobile 70% ควรมีกฎนี้ในระบบระยะห่าง ไม่ใช่ปล่อยให้เป็นความจำของนักออกแบบ

### แหล่ง
- [Material Design 3 Spacing tokens](https://m3.material.io/styles/spacing/tokens) `[ทางการ]` (ค่าดึงไม่ได้ ระบุไว้เป็นข้อจำกัด §18)
- [material-components-web packages/mdc-density/README.md](https://raw.githubusercontent.com/material-components/material-components-web/master/packages/mdc-density/README.md) `[ทางการ]`
- [material-components-web packages/mdc-density/_density.scss](https://raw.githubusercontent.com/material-components/material-components-web/master/packages/mdc-density/_density.scss) `[ทางการ]` (`$interval: 4px`)
- [Apple HIG Layout](https://developer.apple.com/design/human-interface-guidelines/layout) `[ทางการ]`
- [Apple HIG Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility) `[ทางการ]`

---

## 14. เจ้าสายข่าวและสื่อ

### 14.1 The Guardian (Source)

จาก `libs/@guardian/source/src/foundations/__generated__/space.ts` `[ทางการ]`

```
space = { 0: 2, 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 8: 32, 9: 36,
          10: 40, 12: 48, 14: 56, 16: 64, 18: 72, 24: 96 }
```

**กติกาชื่อที่ฉลาดที่สุดในบรรดาทุกเจ้า:** คีย์ = **ค่า px หาร 4** (`space[4]` = 16px `space[24]` = 96px) แปลว่า **ชื่อบอกจำนวน "หน่วยฐาน 4" ตรง ๆ** และ **คีย์ที่หายไปคือขั้นที่ตั้งใจไม่มี** (ไม่มี `space[7]` = 28 ไม่มี `space[11]` = 44) เห็นช่องว่างของสเกลได้จากชื่อเลย
**ข้อยกเว้นเดียว:** `space[0] = 2` ซึ่งควรจะเป็น 0 ตามกติกา เป็นการฝืนกฎเพื่อให้มีค่า 2px ใช้ (ปัญหาเดียวกับที่ทุกเจ้าเจอ คือต้องมีค่าเล็กกว่าฐาน)
**15 ขั้น** ตรงมัธยฐานของตลาดพอดี มีทั้ง `space` (px) และ `remSpace` (rem) คู่กันทุกตัว
**ชั้น semantic:** ไม่มี **density:** ไม่มี **responsive:** ไม่มี (Guardian จัดการด้วย media query ในไฟล์ style ของ component แทน)

**คำอธิบายทางการในเอกสาร:** "Space units create visual rhythm and balance" และ "The following units can be applied to margin or padding properties, vertically or horizontally" `[ทางการ]`

### 14.2 News UK NewsKit (The Times, The Sun)

NewsKit เป็น **เจ้าเดียวในการสำรวจนี้ที่ยังทำ token ชื่อตามหน้าที่ (inset / squish / stretch) อยู่จริง** และวิธีที่เขาทำคือคำตอบของโจทย์ข้อ 3

**ชั้นล่างสุด `sizing`** `[ทางการ]`

```
sizing000 0 · sizing010 4 · sizing020 8 · sizing030 12 · sizing040 16 · sizing045 20
sizing050 24 · sizing060 32 · sizing070 40 · sizing080 48 · sizing090 64 · sizing100 80
sizing110 120 · sizing120 160
```

**14 ขั้น** ฐาน 4 สเกลนี้ใช้ร่วมกับ radius และ icon size (เหมือน Polaris)

**ชั้นบน `spacePresets`** `[ทางการ]` แบ่งเป็น 4 ตระกูลที่ทั้งหมดชี้กลับไปที่ `sizing` ตัวเดิม

| ตระกูล | ความหมาย | ตัวอย่าง |
|---|---|---|
| `space010 ถึง space120` | ระยะห่างทั่วไป (ใช้กับ gap margin) | `space040` = `{sizing040}` = 16 |
| `spaceInset010 ถึง spaceInset070` | padding เท่ากันทุกด้าน | `spaceInset040` = 16 |
| `spaceInsetSquish010 ถึง 060` | padding **บนล่างน้อยกว่าซ้ายขวา** | `spaceInsetSquish030` = `12px 16px` |
| `spaceInsetStretch010 ถึง 060` | padding **บนล่างมากกว่าซ้ายขวา** | `spaceInsetStretch030` = `16px 12px` |

**จุดสำคัญที่ต้องอ่านให้ออก**

1. **ไม่มี `stack` และ `inline`** ทั้งที่ทั้งสองคำเป็นส่วนหนึ่งของโมเดล inset/stack/inline ที่ Nathan Curtis เสนอ · NewsKit ตัดทิ้งเพราะระยะแนวตั้งกับแนวนอนใช้ค่าเดียวกันได้ ไม่ต้องแยกชื่อ
2. **ตระกูลที่เก็บไว้คือตระกูลที่ค่าไม่ใช่ตัวเดียว** (`squish` และ `stretch` เก็บ **คู่ค่า** เช่น `12px 16px`) ซึ่งเป็นสิ่งที่ token ค่าเดียวทำแทนไม่ได้ · ส่วน `inset` ที่ค่าเท่ากันทุกด้านนั้นค่าเท่ากับ `space*` เป๊ะทุกตัว คือมีไว้เพื่อ **บอกเจตนา** ล้วน ๆ
3. **ทุกตระกูลชี้กลับไป `sizing` ชุดเดียวกัน** ไม่มีตัวเลขใหม่เกิดขึ้นเลย

> **นี่คือทางสายกลางระหว่างชื่อตัวเลขกับชื่อตามหน้าที่** สเกลตัวเลขเป็นแกน แล้วเติมชื่อตามหน้าที่เฉพาะกรณีที่ **โครงสร้างค่าต่างจริง** (คู่ค่า) ไม่ใช่เติมทุกบทบาท ต่างจาก Spectrum ที่เติมชื่อตามหน้าที่ให้ทุกคู่ของสิ่งที่มาชิดกันแล้วต้องถอย (§8.3)

### 14.3 BBC GEL

BBC เป็นตัวอย่างของ **"ประกาศหน่วยฐาน แต่ไม่ประกาศสเกล"**

จาก `lib/settings/_globals.scss` ของ `bbc/gel-sass-tools` `[ทางการ]`

```scss
// GEL spacing is based on an 8px baseline and multiples of this number, where possible
// this baseline and multiples of should act as your default spacing unit. This helps to
// ensure we have consistant spacing across products.
$gel-spacing-unit: 8px !default;

// We also make available an alternative spacing unit based on a 12px baseline to allow more
// flexibility with spacing elements
$gel-alt-spacing-unit: 12px !default;
```

**ไม่มีตารางขั้นเลย** มีแค่หน่วยฐาน 2 ตัว (8 และ 12) แล้วให้ product คูณเอาเอง
**ข้อสังเกตที่สำคัญมาก:** BBC ยอมรับตั้งแต่ในคอมเมนต์ว่า **ฐาน 8 ตัวเดียวไม่ยืดหยุ่นพอ** จึงเปิดฐานที่สองที่ 12 นี่เป็นหลักฐานอีกชิ้นในทิศทางเดียวกับ Atlassian ที่ต้องมี 2, 4, 6 อยู่ใต้ฐาน 8
**เทียบกับ NTGDS:** เรามีปัญหาเดียวกันแบบกลับด้าน กริดเราย้ายมาฐาน 8 ทุกจอแล้ว แต่ค่าภายในปุ่มเดิน step 2

**หมายเหตุความไม่ครบ:** GEL ฝั่งเอกสาร (bbc.co.uk/gel) เป็นเว็บที่ render ด้วย JS ดึงไม่ได้ ตัวเลข breakpoint ที่ยืนยันได้จาก source คือ `240, 400, 600, 900, 1008, 1280` และตั้งชื่อแบบ t-shirt (`gel-bp-xs` ถึง `gel-bp-xxl`) ซึ่งแปลว่า **BBC ใช้ t-shirt กับ breakpoint แต่ไม่ใช้กับ spacing เพราะ spacing ไม่มีสเกลให้ตั้งชื่อ**

### 14.4 The New York Times

**ผลการค้น: ไม่พบระบบ spacing สาธารณะที่ยืนยันได้**

NYT ไม่ได้เผยแพร่ design system เป็น repo หรือเว็บสาธารณะแบบ Guardian หรือ News UK ที่มีสาธารณะคือบทความเล่าเรื่องระบบ ไม่ใช่ค่า token **จึงไม่นำมานับเป็น finding ในเอกสารนี้**

### แหล่ง
- [guardian/csnx source/src/foundations/__generated__/space.ts](https://raw.githubusercontent.com/guardian/csnx/main/libs/%40guardian/source/src/foundations/__generated__/space.ts) `[ทางการ]`
- [guardian/csnx source/src/foundations/space/space.mdx](https://raw.githubusercontent.com/guardian/csnx/main/libs/%40guardian/source/src/foundations/space/space.mdx) `[ทางการ]`
- [newskit src/theme/foundations/sizing.ts](https://raw.githubusercontent.com/newscorp-ghfb/newskit/main/src/theme/foundations/sizing.ts) `[ทางการ]`
- [newskit src/theme/presets/space-presets.ts](https://raw.githubusercontent.com/newscorp-ghfb/newskit/main/src/theme/presets/space-presets.ts) `[ทางการ]`
- [bbc/gel-sass-tools lib/settings/_globals.scss](https://raw.githubusercontent.com/bbc/gel-sass-tools/master/lib/settings/_globals.scss) `[ทางการ]`

---

## 15. ตารางเทียบค่าทุกเจ้า

ค่าเป็น px ช่องว่าง = ไม่มีขั้นนั้น เนื้อในช่อง = ชื่อ token ของเจ้านั้น (`✓` = มีขั้นนั้นแต่ชื่อ = ค่า px)

### 15.1 กลุ่มเจ้าใหญ่ฝั่ง product

| px | Carbon | Polaris | Atlassian | Fluent 2 | Primer | Spectrum |
|---|---|---|---|---|---|---|
| 0 |  | 0 | 0 | None |  |  |
| 1 |  | 025 |  |  |  | 25 |
| 2 | 01 | 050 | 025 | XXS | ✓ | 50 |
| 4 | 02 | 100 | 050 | XS | ✓ | 75 |
| 6 |  | 150 | 075 | SNudge | ✓ | 85 |
| 8 | 03 | 200 | **100 (ฐาน)** | S | ✓ | 100 |
| 10 |  |  |  | MNudge |  |  |
| 12 | 04 | 300 | 150 | M | ✓ | 200 |
| 16 | 05 | 400 | 200 | L | ✓ | 300 |
| 20 |  | 500 | 250 | XL | ✓ | 350 |
| 24 | 06 | 600 | 300 | XXL | ✓ | 400 |
| 28 |  |  |  |  | ✓ |  |
| 32 | 07 | 800 | 400 | XXXL | ✓ | 500 |
| 36 |  |  |  |  | ✓ |  |
| 40 | 08 | 1000 | 500 |  | ✓ | 600 |
| 44 |  |  |  |  | ✓ |  |
| 48 | 09 | 1200 | 600 |  | ✓ | 700 |
| 64 | 10 | 1600 | 800 |  | ✓ | 800 |
| 80 | 11 | 2000 | 1000 |  | ✓ | 900 |
| 96 | 12 | 2400 |  |  | ✓ | 1000 |
| 112 |  | 2800 |  |  | ✓ |  |
| 128 |  | 3200 |  |  | ✓ |  |
| 160 | 13 |  |  |  |  |  |
| **จำนวนขั้น** | **13** | **18** | **14** | **11** | **19** | **15** |

### 15.2 กลุ่มที่เหลือ สื่อ และของเรา

| px | Ant Design | Lightning | Uber Base | Guardian | NewsKit | **NTGDS Figma 07** |
|---|---|---|---|---|---|---|
| 0 |  |  |  |  | 000 | ✓ |
| 2 |  |  | scale0 | space[0] |  | ✓ |
| 4 | XXS | 1 | scale100 | space[1] | 010 | ✓ |
| 6 |  |  | scale200 |  |  | ✓ |
| 8 | XS | 2 | scale300 | space[2] | 020 | ✓ |
| 10 |  |  | scale400 |  |  | ✓ |
| 12 | SM | 3 | scale500 | space[3] | 030 | ✓ |
| 14 |  |  | scale550 |  |  |  |
| 16 | MD | 4 | scale600 | space[4] | 040 | ✓ |
| 18 |  |  | scale650 |  |  |  |
| 20 | MD+ |  | scale700 | space[5] | 045 | ✓ |
| 22 |  |  | scale750 |  |  |  |
| 24 | LG | 5 | scale800 | space[6] | 050 | ✓ |
| 28 |  |  | scale850 |  |  | ✓ |
| 32 | XL | 6 | scale900 | space[8] | 060 | ✓ |
| 36 |  |  | scale950 | space[9] |  |  |
| 40 |  | 7 | scale1000 | space[10] | 070 | ✓ |
| 48 | XXL | 8 | scale1200 | space[12] | 080 | ✓ |
| 56 |  | 9 | scale1400 | space[14] |  | ✓ |
| 64 |  | 10 | scale1600 | space[16] | 090 | ✓ |
| 72 |  | 11 |  | space[18] |  | ✓ |
| 80 |  | 12 |  |  | 100 | ✓ |
| 88 |  |  |  |  |  | ✓ |
| 96 |  |  | scale2400 | space[24] |  | ✓ |
| 104 |  |  |  |  |  | ✓ |
| 112 |  |  |  |  |  | ✓ |
| 120 |  |  |  |  | 110 | ✓ |
| 128 |  |  | scale3200 |  |  | ✓ |
| 136 |  |  |  |  |  | ✓ |
| 144 |  |  |  |  |  | ✓ |
| 160 |  |  |  |  | 120 |  |
| 192 |  |  | scale4800 |  |  |  |
| **จำนวนขั้น** | **8** | **12** | **22** | **15** | **14** | **26** |

### 15.3 อ่านตารางแล้วเห็นอะไร

1. **แกนกลางที่ทุกเจ้ามีตรงกันคือ `4 · 8 · 12 · 16 · 24 · 32 · 48`** เจ็ดค่านี้ปลอดภัยที่สุด (13 จาก 13 เจ้าที่มีสเกลมีครบ ยกเว้น Fluent ที่หยุดที่ 32)
2. **`2` มี 9 จาก 12 เจ้า** ไม่ใช่ค่าแปลก เป็นค่าที่ระบบต้องมีสำหรับระยะไอคอนกับข้อความ
3. **`20` มี 8 จาก 12 เจ้า** แต่ **`36` มีแค่ 3 เจ้า** และ **`44` มีเจ้าเดียว** (Primer เพราะทำ min tap target)
4. **ค่าเกิน 96 มีแค่ 4 เจ้า** (Polaris ถึง 128 · Primer ถึง 128 · Base Web ถึง 192 · Carbon และ NewsKit ถึง 160) และทุกเจ้าที่ไปถึงนั้นเว้นช่วงใหญ่ ไม่มีใครเดินทีละ 8
5. **NTGDS ตอนนี้มี 26 ขั้น มากกว่าทุกเจ้ายกเว้น Uber Base** และ **ช่วง 72 ถึง 144 เดินทีละ 8 ติดกัน 10 ขั้น ซึ่งไม่มีใครทำเลย** · เทียบกันตรง ๆ ในช่วงเดียวกัน Guardian มี 3 ขั้น (72 · 96) NewsKit มี 3 ขั้น (80 · 120 · 160) Atlassian มี 1 ขั้น (80)
6. **ไม่มีเจ้าไหนที่ขั้นทั้งหมดเป็นทวีคูณของ 8** แม้แต่เจ้าที่ประกาศฐาน 8 (Carbon มี 2 · 4 · 12 · 20 ไม่ได้ · Atlassian มี 2 · 4 · 6 · 12 · 20 · BBC เปิดฐานสำรอง 12)

---

## 16. เจาะประเด็นที่โจทย์ถาม

### 16.1 layout เทียบ component (ข้อ 5)

| แนวทาง | ใครทำ | ผล |
|---|---|---|
| แยก 2 สเกล | **Carbon เคยทำ** (`spacing01-13` กับ `layout01-07`) | **เลิก** ค่าซ้ำกันทั้ง 7 ตัว ปัจจุบันติดป้าย Deprecated `[ทางการ]` |
| สเกลเดียว เขียนกฎว่าช่วงไหนของใคร | **Atlassian** (0 ถึง 8 = ภายใน component 12 ถึง 24 = component ใหญ่ 32 ถึง 80 = ระดับหน้า) | ใช้อยู่ |
| สเกลเดียว แยกด้วยชั้น semantic | **Spectrum** (`base-*` = ภายใน UI element `container-*` = ระหว่างลูกใน container) | ใช้อยู่ |
| สเกลเดียว ไม่แยกอะไรเลย | Polaris Fluent Guardian NewsKit Base Web Lightning | ใช้อยู่ |

**สรุป: ไม่มีใครแยกสเกล และเจ้าที่เคยแยกก็ถอยแล้ว** ที่ควรทำคือ **สเกลเดียว + กฎบอกช่วง** แบบ Atlassian ซึ่งเบาที่สุดและไม่มีของให้ดูแลเพิ่ม

### 16.2 density (ข้อ 6)

| วิธี | ใครทำ | รายละเอียด |
|---|---|---|
| **แกน variant ในชื่อ token** | **Primer** | `stack.padding.condensed / normal / spacious` = 8 / 16 / 24 `control.<size>.paddingInline.condensed / normal / spacious` |
| **สูตรตัวคูณ** | **Material** | `$interval: 4px` `value = default + density_scale × interval` density scale เดินทางลบ 0 ถึง -3 |
| **สูตรจาก seed** | **Ant Design** | ขยับ `sizeUnit` หรือ `sizeStep` แล้วทุกค่าขยับตาม |
| **ขนาด component แทน density** | Carbon Spectrum Fluent | ไม่มี density แยก แต่ component มี size variant (sm/md/lg) ที่มีค่า padding ของตัวเอง |
| **ไม่มีอะไรเลย** | Atlassian Polaris Guardian NewsKit Lightning | |

**สรุป: ไม่มีใครสลับสเกลทั้งชุด** ทุกคนแก้ที่ค่าปลายทาง ไม่ใช่ที่สเกล
**ที่ NTGDS ควรหยิบ:** Material กับ Ant ใช้โมเดลเดียวกับ `tokens/scale/*.mjs` ของเราแล้ว ถ้าจะทำ density ในอนาคต **ทำเป็นพารามิเตอร์ของสูตรใน `tokens/scale/` ไม่ใช่สร้าง token ชุดที่สอง**

### 16.3 responsive spacing (ข้อ 7)

| วิธี | ใครทำ | ทำที่ชั้นไหน |
|---|---|---|
| ชุดค่าต่อ platform ใน token เดียว | **Spectrum** | ชั้น token (`sets.desktop` / `sets.mobile`) desktop กว้างกว่าแนวนอน mobile สูงกว่าแนวตั้ง |
| ชุดค่าต่อชนิดตัวชี้ | **Primer** | ชั้น token แยกไฟล์ (`size-fine` / `size-coarse`) min tap target 16 เทียบ 44 |
| token หน่วย viewport แยกตระกูล | **Carbon** | `fluidSpacing01-04` = 0, 2vw 5vw 10vw |
| media query ในไฟล์ style ของ component | Guardian ส่วนใหญ่ | ชั้นโค้ด ไม่ใช่ token |
| ไม่ทำ | Atlassian Polaris Fluent Lightning Base Web NewsKit | |

**สรุป: 9 จาก 13 เจ้าใช้สเกลชุดเดียวทุกจอ** ที่แยกก็แยกแค่ 2 ชุด ไม่เคยแยกตาม breakpoint ทั้ง 5 จอ
**ข้อควรระวังสำหรับเรา:** Figma variable รองรับ mode ได้ ถ้าจะทำ desktop/mobile mode ให้ทำแค่ 2 mode และต้องยอมรับว่า **ค่าใน Figma กับ CSS จะต้อง sync กัน 2 ชุด** ซึ่งเพิ่มงานเป็นเท่าตัว แนะนำให้ **ยังไม่ทำในรอบแรก**

### 16.4 ระยะที่ผูกกับ typography (ข้อ 8)

**ไม่มีเจ้าไหนนับเป็นส่วนหนึ่งของสเกลระยะห่าง** หลักฐาน

- **Spectrum** เคยมีตระกูล `text-to-visual-*` และ `text-to-control-*` และ `component-*-to-text-*` ซึ่งเป็น token ที่พูดถึงระยะจากข้อความไปยังของอื่นโดยตรง · **ทั้งหมดถูก deprecated** ให้ไปใช้ `base-gap-*` และ `base-padding-*` แทน `[ทางการ]`
- **ค่าที่เหลืออยู่จริงคือ `base-padding-vertical-*` (2 · 3 · 4 · 7 · 10 · 13 · 15 · 19)** ซึ่งเป็นค่าที่คำนวณย้อนจาก "ความสูง component ลบความสูงบรรทัด" ไม่ใช่ค่าที่หยิบจากสเกล
- **Carbon · Atlassian · Polaris · Primer · Guardian · NewsKit** ไม่มี token ระยะห่างที่ผูกกับ typography เลย

**สรุปสำหรับ NTGDS:** จังหวะแนวตั้งระหว่างหัวเรื่องกับเนื้อความควรคุมด้วย **line-height ของ preset ใน `typography.json` บวก token ระยะห่างธรรมดา** ไม่ต้องสร้าง token ประเภทที่สาม ซึ่งตรงกับกติกาที่ CLAUDE.md ตั้งไว้แล้วสำหรับ link-button ("ของที่ความสูงคุมด้วย text style ห้ามทำสูตรความสูงให้")

---

## 17. ข้อเสนอสำหรับ NTGDS

> ส่วนนี้เป็น **ข้อเสนอเพื่อให้ตัดสิน** ไม่ใช่การตัดสิน §17.1 ให้ 2 ทางเลือกโดยไม่เลือกให้ ตามที่โจทย์ระบุ ส่วนที่เหลือมีคำแนะนำพร้อมเหตุผลเพราะโจทย์ถามหาคำตอบ

### 17.1 หน่วยฐาน จำนวนขั้น และค่า (2 ทางเลือก)

**สิ่งที่ทั้ง 2 ทางเลือกยึดเหมือนกัน**

- แกนกลาง `4 · 8 · 12 · 16 · 24 · 32 · 48` ที่ทุกเจ้ามีตรงกัน (ดู §15.3 ข้อ 1)
- มี `0` และมี `2` (9 จาก 12 เจ้ามี 2 และเราต้องใช้จริงกับ gap ของปุ่ม xs)
- **ช่วงบนต้องเว้นห่างขึ้น** ไม่เดินทีละ 8 ยาว ๆ เหมือนหน้า Figma ตอนนี้
- **ค่าที่เป็นผลจากสูตร component ไม่ต้องมีในสเกล** (ตามกติกาที่ตัดสินไว้แล้วใน taxonomy §3.3.1 ข้อ 2) จึงไม่ต้องมี 10 · 14 · 7 · 13 ในสเกลกลาง แม้ปุ่มจะใช้อยู่

---

**ทางเลือก ก. ฐาน 8 มีครึ่งขั้นล่าง (แบบ Atlassian + Carbon) รวม 14 ขั้น**

```
0 · 2 · 4 · 6 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 80 · 96
```

(นับไม่รวม 0 = 14 ขั้น)

| ข้อดี | ข้อเสีย |
|---|---|
| **ตรงกับกริดฐาน 8 ที่เราเพิ่งย้ายมาใช้ทุกจอ** ระยะห่างกับร่องกริดจะเป็นระบบเดียวกัน | ขั้นเยอะกว่าทางเลือก ข. 3 ขั้น มีโอกาสเลือกผิดมากกว่า |
| ค่า `2, 4, 6` ใต้ฐานรองรับระยะภายใน component เล็กได้ครบ (gap ของปุ่ม xs = 2 มีที่อยู่) | มี 20 และ 40 ซึ่งไม่ใช่ทวีคูณของ 8 ทำให้กติกา "ทุกอย่างฐาน 8" ไม่จริง 100% ต้องอธิบายเพิ่ม |
| ตรงกับ Atlassian เป๊ะ 13 จาก 14 ขั้น (Atlassian ไม่มี 96) ซึ่งเป็นเจ้าที่เอกสารครบที่สุดและมีกฎแบ่งช่วงพร้อมใช้ | ถ้าตั้งชื่อเป็น % ของ 8 จะได้เลขที่มีจุดทศนิยมในหัว (6 = 75%) |
| ครอบคลุมค่าที่ใช้จริงในไฟล์ Figma ปัจจุบันได้มากที่สุด (มี 6, 20, 28 หายไปแค่ 28) | ยังไม่ครอบคลุมช่วง 100 ขึ้นไปที่หน้า Figma เขียนไว้ (ต้องยอมตัด) |

---

**ทางเลือก ข. ฐาน 4 แบบกึ่งเรขาคณิต (แบบ Guardian + NewsKit) รวม 11 ขั้น**

```
0 · 2 · 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128
```

(นับไม่รวม 0 = 11 ขั้น)

| ข้อดี | ข้อเสีย |
|---|---|
| **สั้นที่สุด จำได้ทั้งชุด** ต่ำกว่ามัธยฐานตลาด (15) ชัดเจน เลือกผิดยาก | **ไม่มี 6 และ 20** ซึ่งเป็นค่าที่มีอยู่จริงในไฟล์ Figma ตอนนี้ ต้องไล่ย้ายของที่ใช้ 6 ไป 4 หรือ 8 |
| ตรงกับสองเจ้าสายข่าวที่บริบทใกล้เราที่สุด (Guardian ฐาน 4 NewsKit ฐาน 4) | ค่ากระโดดจาก 16 ไป 24 ไป 32 ไป 48 อาจแข็งเกินไปสำหรับ layout การ์ดข่าวที่ต้องการ 20 |
| ทุกขั้นตั้งแต่ 8 ขึ้นไปเป็นทวีคูณของ 4 และตั้งแต่ 16 ขึ้นไปเป็นทวีคูณของ 8 ทั้งหมด กติกาอธิบายง่าย | ครอบคลุมช่วงบนกว้าง (ถึง 128) แต่มีแค่ 3 ขั้นในช่วงนั้น อาจไม่พอสำหรับช่องไฟระหว่าง section บน desktop |
| ขั้นน้อยแปลว่า **variable ใน Figma น้อย** ซึ่งลดความเสี่ยงซ้ำรอย "ชั้นกลางที่ไม่มีคนใช้แล้วถูกลบ" | ถ้าภายหลังต้องแทรกขั้น จะต้องเพิ่มทีหลัง (ระบบชื่อต้องรองรับการแทรก ดู §17.2) |

---

**ข้อมูลประกอบการตัดสิน**

| เกณฑ์ | ทางเลือก ก. (14 ขั้น) | ทางเลือก ข. (11 ขั้น) |
|---|---|---|
| เทียบมัธยฐานตลาด (15) | ใกล้เคียง | น้อยกว่า |
| ครอบคลุมค่าที่ใช้จริงในไฟล์วันนี้ | สูง | ปานกลาง (ต้องย้าย 6 และ 20) |
| สอดคล้องกับกริดฐาน 8 ของเรา | สูง | ปานกลาง |
| สอดคล้องกับสูตร step 2 ของปุ่ม | ทั้งคู่เท่ากัน (ค่าจากสูตรไม่ต้องอยู่ในสเกล) | |
| จำนวน variable ที่ต้องสร้างใน Figma | 15 | 12 |
| ความเสี่ยง "ชั้นกลางตายเหมือน radius" | สูงกว่า | ต่ำกว่า |

**ทั้งสองทางตัด 88, 104, 136, 144 ออกจากหน้า Figma ปัจจุบันเหมือนกัน** เพราะไม่มี DS เจ้าไหนในโลกมีค่าเหล่านี้ และการมีอยู่ของมันทำให้ช่วงบนของสเกลไม่มีความหมาย (เลือกระหว่าง 96 กับ 104 ด้วยเกณฑ์อะไร)

### 17.2 การตั้งชื่อ

**เสนอ `ntg.size.space.<เลข>` โดยเลข = ค่า px หาร 4 (แบบ Guardian)**

ตัวอย่าง

```
size.space.0    = 0     size.space.4  = 16     size.space.12 = 48
size.space.05   = 2     size.space.5  = 20     size.space.16 = 64
size.space.1    = 4     size.space.6  = 24     size.space.20 = 80
size.space.15   = 6     size.space.8  = 32     size.space.24 = 96
size.space.2    = 8     size.space.10 = 40
size.space.3    = 12
```

**เหตุผล 5 ข้อ**

1. **เข้ากับ taxonomy ที่ประกาศไว้แล้วโดยไม่ต้องแก้กติกา** `token-naming-taxonomy.md` §3.3 ระบุ pattern `nation.size.<property>.<scale>` และ `space` อยู่ในรายการ property ที่อนุญาตแล้ว · เปลี่ยนเฉพาะรูปแบบของ `<scale>` จาก compound tier-step เดิม (`sm-md`) ที่ไม่มีอยู่จริงในไฟล์ build แล้ว
2. **ห้ามใช้ t-shirt เด็ดขาด เพราะชนกับ `SIZES` ของ component** เหตุผลเดียวกับที่ตัดสินไปแล้วเรื่อง radius (taxonomy §3.3.1 เหตุผลข้อ 3) · ประโยค "ปุ่ม `size=sm` ใช้ `space.sm`" อ่านแล้วเข้าใจผิดทันที · หลักฐานฝั่งตลาดก็ตรงกัน มีแค่ Fluent กับ Ant ที่ยังใช้ t-shirt และทั้งคู่ต้องประดิษฐ์คำอุด (`sNudge` · `sizeMS`)
3. **เลขต้องบอกค่าได้** ซึ่งตัดตัวเลือก "เลขลำดับ" แบบ Carbon (`spacing07`) และ Lightning (`spacing-6`) ออก เพราะต้องเปิดตารางทุกครั้ง · เหลือ 3 สูตรที่ใช้ได้ ` px × 25` (Polaris) · `% ของฐาน 8` (Atlassian) · `px หาร 4` (Guardian)
4. **`px หาร 4` ให้เลขสั้นที่สุดใน 3 สูตร** (16px คือ `4` ไม่ใช่ `400` ไม่ใช่ `200`) และเป็นตัวเลขที่คนพูดในทีมได้ ("ใช้สเปซสี่") · ข้อแลกคือค่า 2 และ 6 ต้องเขียนเป็น `05` และ `15` ซึ่งอ่านว่า 0.5 และ 1.5 หน่วย
5. **แทรกขั้นได้โดยไม่ต้อง rename** เพิ่ม `size.space.7` = 28 ได้ทันที ไม่กระทบตัวอื่น ซึ่งเป็นบทเรียนจาก Tailwind v3 ไป v4 ที่ rename ทั้งสเกลจนค่าเลื่อนหนึ่งขั้น (ดู [shape-radius.md](shape-radius.md) §4)

**ทางเลือกรองถ้าไม่เอา `px หาร 4`:** ใช้ `% ของฐาน 8` แบบ Atlassian (`space.100` = 8px) เหมาะกว่าถ้าเลือกทางเลือก ก. เพราะฐานคือ 8 อยู่แล้ว แต่จะได้ชื่อยาวกว่าและมี `space.025` `space.075` ที่อ่านยากกว่า

**สิ่งที่ต้องห้าม**

- ห้ามตั้งชื่อตามหน้าที่ (`spacing.section` · `spacing.card-gap`) เป็นชั้นหลัก · Spectrum ทำแล้วต้อง deprecated ทั้งตระกูล (§8.3)
- ห้ามใส่ทิศทางในชื่อชั้นหลัก (`space-horizontal-*` แบบ Fluent) เพราะเพิ่ม token เป็น 2 เท่าโดยค่าเหมือนกันทุกตัว

### 17.3 26 ขั้นในหน้า Figma มากไปหรือน้อยไป

**มากไปชัดเจน** เทียบตัวเลข

| ตัววัด | ค่า |
|---|---|
| ขั้นของ NTGDS ตอนนี้ | **26** |
| มัธยฐานของ 12 เจ้าที่มีสเกล | **15** |
| เจ้าที่มากกว่าเรา | **1 เจ้า** (Uber Base 22 ยังน้อยกว่า) จริง ๆ คือ **ไม่มีใครมากกว่าเรา** |
| เจ้าที่น้อยที่สุด | Ant Design 8 |

**ปัญหาไม่ได้อยู่ที่จำนวนอย่างเดียว แต่อยู่ที่การกระจาย** ช่วง 72 ถึง 144 เดินทีละ 8 ติดกัน 10 ขั้น เทียบกับตลาด

| ช่วง 72 ถึง 160 | จำนวนขั้น |
|---|---|
| NTGDS | **10** (72, 80, 88, 96, 104, 112, 120, 128, 136, 144) |
| Guardian | 2 (72, 96) |
| NewsKit | 3 (80, 120, 160) |
| Polaris | 4 (80, 96, 112, 128) |
| Atlassian | 1 (80) |
| Carbon | 3 (80, 96, 160) |

**ผลของการมี 10 ขั้นในช่วงนั้น** คือไม่มีเกณฑ์ให้เลือกได้ ไม่มีใครแยกออกด้วยตาว่า 104 ต่างจาก 112 ตรงไหน สุดท้ายทุกคนจะหยิบมั่ว แล้วสเกลก็ไม่ได้ทำหน้าที่ของมัน

**ที่ควรตัดออกแน่ ๆ: 88, 104, 136, 144** (ไม่มีเจ้าไหนในโลกมี) **ที่ควรพิจารณาตัด: 28, 56, 72, 112, 120** (มี 3 เจ้าหรือน้อยกว่า)

### 17.4 ทำไมสเกลต้องไม่เชิงเส้น

ข้อมูลจากทุกเจ้ายืนยันตรงกัน **ไม่มีเจ้าไหนเดินสม่ำเสมอตลอดสเกล** เพราะ

- **ตาคนอ่านความต่างเป็นสัดส่วน ไม่ใช่เป็นค่าสัมบูรณ์** ความต่างจาก 4 ไป 8 คือ 100% ตาเห็นทันที · ความต่างจาก 96 ไป 104 คือ 8% ตาแยกไม่ออก
- Carbon จึงเดินตัวคูณ `0.25 · 0.5 · 1 · 1.5 · 2 · 3 · 4 · 5 · 6 · 8 · 10 · 12 · 20` ของ mini-unit 8
- Guardian จึงมี `2 · 4 · 8 · 12 · 16 · 20 · 24 · 32` แล้วข้าม 28 ไปเลย
- แม้แต่ Base Web ที่เดินทีละ 2 ยาวที่สุด ก็หยุดเดินทีละ 2 ที่ 24 แล้วเปลี่ยนเป็นทีละ 4 และทีละ 8 และทีละ 32

**สำหรับ NTGDS** ช่วงที่ต้องถี่คือ **0 ถึง 24** (ระยะภายใน component) ช่วงที่ต้องห่างคือ **32 ขึ้นไป** (ระยะระดับ layout) ตามกฎแบ่งช่วงของ Atlassian

### 17.5 ควรมีชั้น semantic ไหม

**เสนอ: ไม่มีชั้น semantic ตามบทบาทในรอบแรก แต่ต้องมี variable ใน Figma สำหรับสเกลกลาง** ซึ่ง **ต่างจากที่ตัดสินไว้กับ radius**

**ทบทวนว่า radius ตัดสินไว้ยังไง** (taxonomy §3.3.1)

| ชั้น | radius | เป็น variable ใน Figma ไหม |
|---|---|---|
| 1 สเกลกลาง | `RADIUS_SCALE` ใน `global-scale.config.mjs` | **ไม่** |
| 2 สูตรต่อ component | `tokens/scale/<comp>.mjs` | **ไม่** |
| 3 ค่าที่ใช้จริง | `component.json` เช่น `card/radius/top-left` = 4 | **ใช่ ชั้นเดียว** |

เหตุผลตอนนั้นคือ ชั้นกลางที่ไม่มีชิ้นงานผูกจะตายและถูกลบ (เกิดมาแล้ว 2 รุ่น ทิ้งของค้าง 3,467 จุด)

**ทำไม spacing ต่างจาก radius ในจุดชี้ขาด**

| | radius | spacing |
|---|---|---|
| ผูกกับอะไร | **มุมของกล่อง** ซึ่งกล่องที่มีมุมโค้งเกือบทั้งหมดเป็น component | **padding และ gap ของ auto-layout** ซึ่งจำนวนมากอยู่บน frame ที่ไม่ใช่ component |
| ตัวอย่างของจริงในไฟล์เรา | การ์ด ปุ่ม tag input ล้วนเป็น component | `content-section` padding 80 gap 24 `content` padding 40 ตามโครง section มาตรฐานใน CLAUDE.md **เป็น frame เปล่า ไม่ใช่ component** |
| ถ้าไม่มี variable กลางให้ผูก | ไม่เป็นไร เพราะทุกที่ที่ต้องใช้มี component token อยู่แล้ว | **นักออกแบบพิมพ์ตัวเลขดิบ** ซึ่งเป็นสภาพเดียวกับสีดิบที่ DoD ห้าม และตรวจสอบไม่ได้ว่าใครใช้อะไร |

**ข้อสรุปที่เสนอ**

```
ชั้น 1  สเกลกลาง        tokens/scale/global-scale.config.mjs → SPACE_SCALE
                        ✅ เป็น variable ใน Figma collection `component` ชื่อ size/space/<n>
                        เพราะมีชิ้นงานผูกจริงตั้งแต่วันแรก (padding และ gap ของ frame เอกสารทุกหน้า)

ชั้น 2  สูตรต่อ component  tokens/scale/<comp>.mjs   (มีอยู่แล้ว)
                        ❌ ไม่เป็น variable  เหมือน radius

ชั้น 3  ค่าที่ใช้จริงของ component  component.json → space.<comp>.*
                        ✅ เป็น variable  (มีอยู่แล้ว 40 ตัวของปุ่ม)

ชั้น semantic ตามบทบาท (space.section · space.card-gap)
                        ❌ ยังไม่ทำ
```

**เหตุผลที่ยังไม่ทำชั้น semantic ตามบทบาท**

1. **Spectrum ทำแล้วต้องถอย** ตระกูลชื่อเชิงสัมพันธ์กว่า 60 token ถูก deprecated ในรอบเดียว (§8.3)
2. **Polaris ที่ทำสำเร็จ ทำแค่ 4 ตัว** และทั้ง 4 ตัวเกิดจากปัญหาจริงว่ามีของหลายชิ้นต้องเท่ากัน ไม่ได้สร้างล่วงหน้า (§4.2)
3. **Atlassian และ Carbon ซึ่งเป็นเจ้าที่ระบบ spacing สมบูรณ์ที่สุด ไม่มีชั้นนี้เลย** ใช้กฎบอกช่วงแทน
4. **เราเคยพลาดแบบนี้มาแล้วกับ radius** สร้างชั้นกลาง 16 ตัวก่อนมีชิ้นงานมาใช้ แล้วต้องถอยภายในวันเดียว · กติกาที่ได้จากบทเรียนนั้นคือ **สร้างชั้นเมื่อมีคนใช้ ไม่ใช่สร้างเผื่อ**

**ถ้าภายหลังพบว่ามีของหลายชิ้นต้องเท่ากันจริง** (เช่น ระยะระหว่างการ์ดข่าวในทุกหน้า) ค่อยเพิ่มทีละตัวแบบ Polaris ไม่ใช่สร้างทั้งชุด

### 17.6 กฎแบ่งช่วงที่เสนอ (แทนการแยกสเกล)

ลอกโครงจาก Atlassian แล้วปรับให้ตรงกับของจริงในไฟล์เรา

| ช่วง | ใช้กับอะไรในเว็บข่าว |
|---|---|
| 0 ถึง 8 | ระยะไอคอนกับข้อความ gap ภายในปุ่ม ระยะ tag กับ timestamp padding ของ badge |
| 12 ถึง 24 | padding ในการ์ดข่าว ระยะระหว่างหัวข้อกับสรุปข่าว gap ระหว่างการ์ดในกริด ร่องกริด |
| 32 ขึ้นไป | ช่องไฟระหว่าง section padding ของหน้า ระยะระหว่างบล็อกเนื้อหาใหญ่ |

### 17.7 สิ่งที่ยังไม่ควรทำในรอบแรก

| # | สิ่งที่ไม่ควรทำ | เหตุผล |
|---|---|---|
| 1 | ชั้น semantic ตามบทบาท | §17.5 Spectrum ถอยแล้ว เราก็เคยถอยแล้ว |
| 2 | แยกสเกล layout ออกจากสเกล component | §16.1 Carbon ทำแล้ว deprecated ค่าซ้ำกันหมด |
| 3 | token แยกแนวนอนกับแนวตั้ง | §6 Fluent ทำแล้วค่าเท่ากันทุกตัว เพิ่ม token 2 เท่าโดยไม่ได้อะไร |
| 4 | ชุดค่าตาม breakpoint (Figma variable mode) | §16.3, 9 จาก 13 เจ้าใช้ชุดเดียวทุกจอ ทำแล้วต้อง sync 2 ชุดตลอดไป |
| 5 | density scale | §16.2 ยังไม่มีหน้าจอไหนของเราที่ต้องการโหมดแน่น ถ้าทำภายหลังให้ทำเป็นพารามิเตอร์ของสูตรใน `tokens/scale/` |
| 6 | token ระยะห่างที่ผูกกับ typography | §16.4 ไม่มีเจ้าไหนทำ และ Spectrum เคยทำแล้วเลิก |

### 17.8 สิ่งที่ควรทำต่อ (ถ้าอนุมัติทิศทาง)

1. **ตัดสินระหว่างทางเลือก ก. กับ ข.** (§17.1) และตัดสินระบบชื่อ (§17.2)
2. **สำรวจค่าระยะห่างที่ใช้จริงในไฟล์ Figma ทั้ง 51 หน้า** ว่าค่าไหนถูกใช้กี่จุด ก่อนล็อกสเกล · เป็นวิธีเดียวกับที่ `RADIUS_SCALE` ใช้ตัดสิน (คอมเมนต์ในไฟล์ระบุว่า "ค่ามาจากของที่ใช้จริงในไฟล์ Figma สำรวจ 2026-08-20") · **งานนี้ยังไม่ได้ทำ และควรทำก่อนตัดสิน**
3. เพิ่ม `SPACE_SCALE` ใน `tokens/scale/global-scale.config.mjs` คู่กับ `RADIUS_SCALE` ที่มีอยู่
4. ตัดสินว่าจะเขียนกฎ **พื้นที่กดขั้นต่ำ 44px** (WCAG 2.5.5 · Apple HIG · Primer) เข้าไปในระบบระยะห่างหรือไม่ · แนะนำให้เขียน เพราะผู้ใช้เรา mobile 70% ขึ้นไป
5. ทำเอกสารหน้า 07 Space ตาม Pre-flight ใน CLAUDE.md (Page Doc 1 · Information Doc สำหรับ specimen สเกล และกฎแบ่งช่วง · Token Doc 1)

---

## 18. ข้อจำกัดของงานวิจัยนี้

1. **Material 3 ยืนยันค่าสเกล spacing ไม่ได้** หน้า `m3.material.io/styles/spacing/tokens` render ด้วย JS และไม่พบไฟล์ token คู่ขนานทั้งฝั่ง Material Web (`_md-sys-spacing.scss` = 404) และฝั่ง Compose · **จึงไม่ได้นำ M3 เข้าตารางเทียบใน §15** ที่รายงานได้คือกริดฐาน 4dp และโมเดล density interval 4px ซึ่งยืนยันจาก source ของ `mdc-density` ได้จริง
2. **Apple HIG ไม่มีสเกลให้เทียบ** จึงไม่อยู่ในตาราง §15 · ที่ได้คือตารางขนาดปุ่มมาตรฐานและคำแนะนำ padding 12 กับ 24 pt เท่านั้น
3. **BBC GEL ได้แค่หน่วยฐาน** เพราะไม่มีสเกลให้ดึง และเว็บ gel.bbc.co.uk render ด้วย JS
4. **NYT ไม่มีข้อมูลสาธารณะ** ไม่ได้นับเป็น finding
5. **Carbon อ่านค่าจาก source ไม่ใช่หน้าเว็บ** เพราะหน้า carbondesignsystem.com/elements/spacing/overview ยาวเกินจนดึงเนื้อหาไม่ครบ · ค่าจาก source เชื่อถือได้กว่าอยู่แล้ว แต่ **ข้อความอธิบายเชิงหลักการของ Carbon จึงไม่ได้ถูกอ้างในเอกสารนี้**
6. **Polaris อ่านค่าจาก source** เพราะหน้า `polaris.shopify.com/design/space` ถูกย้ายไป shopify.dev และเนื้อหาเดิมหายไป · คำอธิบายเชิงหลักการของ Polaris จึงไม่ได้ถูกอ้าง
7. **ยังไม่ได้สำรวจว่าค่าระยะห่างไหนถูกใช้กี่จุดในไฟล์ Figma ของเราเอง** ซึ่งเป็นข้อมูลที่จำเป็นก่อนล็อกสเกลจริง (ดู §17.8 ข้อ 2) · ข้อเสนอใน §17.1 จึงอิงตลาดกับค่าที่เห็นในหน้า 07 Space เป็นหลัก ไม่ได้อิงความถี่การใช้จริง
8. **ยังไม่ได้ทำ competitive analysis ระยะห่างของเว็บข่าวไทย** (Sanook · Matichon · Workpoint · Khaosod) ถ้าต้องการต้องสั่งงานเพิ่ม
9. **การจับคู่ช่วงสเกลกับ component ของเว็บข่าวใน §17.6 เป็นข้อเสนอ ไม่ใช่ข้อเท็จจริงจากงานวิจัย** ดัดแปลงจากกฎแบ่งช่วงของ Atlassian ต้องทดสอบกับหน้าจริงก่อนใช้

---

## 19. แหล่งอ้างอิงรวม

**ไฟล์ token ต้นทาง (ทางการ)**
- [carbon packages/layout/src/index.ts](https://raw.githubusercontent.com/carbon-design-system/carbon/main/packages/layout/src/index.ts)
- [polaris-tokens/src/themes/base/space.ts](https://raw.githubusercontent.com/Shopify/polaris/main/polaris-tokens/src/themes/base/space.ts) · [polaris-tokens/src/size.ts](https://raw.githubusercontent.com/Shopify/polaris/main/polaris-tokens/src/size.ts)
- [fluentui packages/tokens/src/global/spacings.ts](https://raw.githubusercontent.com/microsoft/fluentui/master/packages/tokens/src/global/spacings.ts)
- [primer/primitives base/size/size.json5](https://raw.githubusercontent.com/primer/primitives/main/src/tokens/base/size/size.json5) · [functional/size/size.json5](https://raw.githubusercontent.com/primer/primitives/main/src/tokens/functional/size/size.json5) · [functional/size/size-coarse.json5](https://raw.githubusercontent.com/primer/primitives/main/src/tokens/functional/size/size-coarse.json5)
- [spectrum-design-data packages/tokens/src/layout.json](https://raw.githubusercontent.com/adobe/spectrum-design-data/main/packages/tokens/src/layout.json)
- [@salesforce-ux/design-system spacing.raw.json](https://cdn.jsdelivr.net/npm/@salesforce-ux/design-system/design-tokens/dist/spacing.raw.json)
- [uber/baseweb src/themes/shared/sizing.ts](https://raw.githubusercontent.com/uber/baseweb/main/src/themes/shared/sizing.ts)
- [guardian/csnx foundations/__generated__/space.ts](https://raw.githubusercontent.com/guardian/csnx/main/libs/%40guardian/source/src/foundations/__generated__/space.ts)
- [newskit foundations/sizing.ts](https://raw.githubusercontent.com/newscorp-ghfb/newskit/main/src/theme/foundations/sizing.ts) · [newskit presets/space-presets.ts](https://raw.githubusercontent.com/newscorp-ghfb/newskit/main/src/theme/presets/space-presets.ts)
- [bbc/gel-sass-tools lib/settings/_globals.scss](https://raw.githubusercontent.com/bbc/gel-sass-tools/master/lib/settings/_globals.scss)
- [material-components-web mdc-density/_density.scss](https://raw.githubusercontent.com/material-components/material-components-web/master/packages/mdc-density/_density.scss) · [mdc-density/README.md](https://raw.githubusercontent.com/material-components/material-components-web/master/packages/mdc-density/README.md)

**เอกสารทางการ**
- [Atlassian Design System Spacing](https://atlassian.design/foundations/spacing) · [Introducing the spacing scale (2023)](https://community.developer.atlassian.com/t/introducing-the-spacing-scale-the-beginnings-of-an-atlassian-spacing-system/65393)
- [Ant Design Customize Theme](https://ant.design/docs/react/customize-theme/)
- [Tailwind CSS Theme variables](https://tailwindcss.com/docs/theme)
- [Primer Foundations Primitives Size](https://primer.style/foundations/primitives/size)
- [Carbon Spacing overview](https://carbondesignsystem.com/elements/spacing/overview/)
- [Material Design 3 Spacing tokens](https://m3.material.io/styles/spacing/tokens) (ค่าดึงไม่ได้)
- [Apple HIG Layout](https://developer.apple.com/design/human-interface-guidelines/layout) · [Apple HIG Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility)
- [Lightning Design System 2 Spacing and Sizing](https://www.lightningdesignsystem.com/2e1ef8501/p/03d6b0)
- [Base Design System Dimensions](https://base.uber.com/6d2425e9f/p/598458-dimensions)
- [Guardian Source space.mdx](https://raw.githubusercontent.com/guardian/csnx/main/libs/%40guardian/source/src/foundations/space/space.mdx)

**แนวคิดพื้นฐาน**
- Nathan Curtis, *Space in Design Systems* (EightShapes) โมเดล inset · squish · stretch · stack · inline `[แหล่งรอง เข้าถึงไม่ได้ตอนวิจัย Medium คืน 403]` · หลักฐานว่าโมเดลนี้ถูกนำไปใช้จริงดูที่ NewsKit §14.2
- Nathan Curtis, *Naming Tokens in Design Systems* (EightShapes, 2020) กรอบ level order ที่ [token-naming-taxonomy.md](../rules/token-naming-taxonomy.md) ยึดอยู่

**เอกสารภายในที่เกี่ยวข้อง**
- [shape-radius.md](shape-radius.md) รูปแบบเอกสารและบทเรียนเรื่องชั้นกลางที่ไม่มีคนใช้
- [effect-elevation.md](effect-elevation.md) รูปแบบเอกสาร
- [grid-column-width.md](grid-column-width.md) และ [04-grid.md](../04-grid.md) ที่มาของฐาน 8
- [token-naming-taxonomy.md](../rules/token-naming-taxonomy.md) §3.3 และ §3.3.1 กติกาชื่อและกติกาชั้น
