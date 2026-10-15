---
title: "Effect & Elevation Research สำหรับหน้า 05 Effect"
description: "เทียบวิธีทำ elevation/shadow/blur/focus ring ของ DS เจ้าใหญ่ 6 เจ้า แล้วสรุปข้อเสนอปรับ Nation DS"
research_date: "2026-08-14"
scope: "Material 3 Fluent 2 Carbon Polaris Atlassian Spectrum"
status: "draft"
---

# Effect & Elevation Research สำหรับหน้า 05 Effect

> เป้าหมาย: ดูว่า DS เจ้าใหญ่จัดการ "ความลึก" (elevation) กันยังไง แล้วเอามาเทียบกับของ Nation เพื่อตัดสินใจว่าจะปรับอะไร

## 1. ของ Nation ตอนนี้ (ข้อมูลจริงจากไฟล์)

**Effect style 25 ตัว** ในหน้า `05 Effect`

| กลุ่ม | จำนวน | ค่าจริง |
|---|:-:|---|
| `shadows/bottom/*` | 5 | xs `0 1 2 0 / 5%` sm `0 1 4 0 / 10%` md `0 3 8 -2 / 10%` lg `0 12 16 -4 / 10%` xl `0 20 24 -4 / 10%` |
| `shadows/top/*` | 5 | กลับทิศ y เป็นลบ ค่าอื่นเท่า bottom |
| `shadows/center/*` | 5 | y=0 spread บวก xs `0 0 4 0 / 5%` … xl `0 0 24 8 / 10%` |
| `background-blur/*` | 5 | 4, 8, 16, 24, 40 px |
| `effect/*-focused-ring` | 5 | spread 4px สีตามบทบาท (default/brand/error/warning/success) opacity 10–20% |

**ข้อสังเกตจากค่าจริง**
- เงาทุกตัวเป็น **shadow ชั้นเดียว** สีดำล้วน opacity 5–10%
- ชื่อบอก **ทิศทางกับขนาด** (bottom/top/center × xs–xl) ไม่ได้บอก **หน้าที่** ว่าใช้กับอะไร
- ยังไม่มีชั้น semantic เช่น "การ์ด" "เมนูลอย" "โมดัล" ต้องให้คนเลือกเองว่าจะใช้ md หรือ lg
- **ยังไม่มีค่าโหมดมืด** shadow ดำบนพื้นมืดแทบมองไม่เห็น

## 1.5 การใช้งานจริงในไฟล์ (นับทั้ง 51 หน้า 2026-08-14)

รวม **5,377 จุด** ที่ผูก effect style แต่กระจุกตัวมาก

| Style | จำนวนจุด | อ่านว่า |
|---|--:|---|
| `shadows/bottom/xs` | **4,097** | ตัวเดียวกินสัดส่วน 76% ของทั้งหมด |
| `shadows/center/xs` | 181 | ใช้จริงพอควร |
| `effect/brand-focused-ring` | 163 | ใช้จริง |
| `effect/default-focused-ring` | 125 | ใช้จริง |
| `effect/error-focused-ring` | 106 | ใช้จริง |
| `shadows/bottom/md` `sm` `xl` `lg` | 87, 68, 50, 15 | ใช้จริงแต่น้อย |
| `shadows/center/sm` `md` | 55, 19 | ใช้จริงแต่น้อย |
| `shadows/center/lg` `xl` | 1, 1 | เกือบไม่ได้ใช้ |
| **`shadows/top/*` ทั้ง 5 ตัว** | **ตัวละ 2** | **= ตัวอย่างในหน้าเอกสารเท่านั้น ไม่ได้ใช้งานจริงเลย** |
| **`background-blur/*` ทั้ง 5 ตัว** | **ตัวละ 3** | **= ตัวอย่างในหน้าเอกสารเท่านั้น** |
| `effect/warning-focused-ring` `success` | 1, 1 | เกือบไม่ได้ใช้ |

**⚠️ เจอหนี้เทคนิค: style เก่ายังถูกใช้อยู่ ~382 จุด**
ชื่อเก่าที่ยังไม่ได้ย้ายมาชุดปัจจุบัน เช่น `Shadows/Bottom/xs` (89+60+5 มีหลายตัวชื่อซ้ำ) `Shadow/md` (88) `Shadows/Bottom/sm` (82+20) `Background blur/sm` (12) `Shadow/xs` (8) `Effect/Brand focused ring` (8+1) `Shadows/sm` (6) `Focus ring/4px primary-100` (2) `Shadows/Top/md` (1)

## 2. DS เจ้าใหญ่ทำกันยังไง

### Material 3 (Google)
- ใช้ **elevation level 0–5** เป็นชั้น semantic (`md.sys.elevation.level1…level5`) ไม่ได้ตั้งชื่อตามขนาดเงา
- แต่ละ level = **เงา 2 ชั้นซ้อน** (key shadow ที่คมกับ ambient shadow ที่ฟุ้ง)
- **โหมดมืดไม่ใช้เงา** แต่ใช้ **tonal elevation** คือทำสีพื้นผิวให้สว่างขึ้นตามระดับ (surface-container ไล่ระดับ) เพราะเงาดำบนพื้นมืดมองไม่เห็น
- Roadmap กำลังเพิ่ม shape/motion token เข้าระบบเดียวกัน

### Fluent 2 (Microsoft)
- ชื่อ token บอก **ค่า blur ตรง ๆ** `shadow2` `shadow4` `shadow8` `shadow16` `shadow28` `shadow64`
- ทุกตัวประกอบจาก **key + ambient** เหมือน M3
- มีชุด **brand shadow** แยก (เงาที่มีสีแบรนด์ผสม) สำหรับ element ที่ต้องเด่น

### Carbon (IBM)
- **ไม่ใช้เงาเป็นหลัก** ใช้ **สีพื้น (layer)** บอกความลึกแทน layer-01/02/03 ไล่สว่างขึ้น
- โหมดมืดก็ใช้หลักเดียวกัน (ยิ่งลอยยิ่งสว่าง) จึงข้ามปัญหาเงาหายในพื้นมืดไปเลย

### Polaris (Shopify)
- แยก shadow เป็น **3 ตระกูลตามหน้าที่**: `shadow-*` (เงาตกกระทบ) · `shadow-inset-*` (เงาด้านใน) · `shadow-bevel-*` (ขอบนูน)
- ไล่สเกลเป็นเลข 100/200/300… (base = 100)
- **component-specific shadow แยก collection** ต่างหาก ใช้เฉพาะ component ที่ชื่อตรงกันเท่านั้น

### Atlassian
- **5 ระดับ semantic**: sunken · default · raised · overlay · overflow (เงาสำหรับเนื้อหาที่เลื่อนได้)
- ทุกระดับ **จับคู่ surface กับ shadow เสมอ** (`elevation.surface.overlay` ต้องใช้คู่กับ `elevation.shadow.overlay`)
- โหมดมืดใช้ **ทั้งเงาและสีพื้น** ควบคู่ เพราะเงาอย่างเดียวอ่านไม่ออก

### Spectrum (Adobe)
- ยึด elevation เป็นแนวคิดของ "ระนาบ" มากกว่าค่าเงา และผูกกับ z-index/ลำดับการซ้อนอย่างเป็นระบบ

## 3. เทียบกับ Nation แล้วเห็นอะไร

| ประเด็น | เจ้าใหญ่ส่วนมาก | Nation ตอนนี้ | ช่องว่าง |
|---|---|---|---|
| ชื่อ token | บอกหน้าที่ (raised/overlay/level2) | บอกทิศทาง+ขนาด (bottom/md) | คนใช้ต้องเดาเองว่าอันไหนใช้กับอะไร |
| จำนวนชั้นเงา | 2 ชั้น (key + ambient) | 1 ชั้น | เงาดูแบน ไม่มีมิติเท่า |
| โหมดมืด | เปลี่ยนไปใช้สีพื้น หรือใช้เงา+สีคู่กัน | ยังไม่มี | โหมดมืดจะมองไม่เห็นความลึก |
| เงาเข้า (inset) | Polaris มี ใช้กับช่องกรอก/ปุ่มกด | ไม่มี | ทำ input แบบกดยุบไม่ได้ |
| focus ring | แยกจาก elevation ชัดเจน WCAG 2.2 บังคับ | **แยกแล้ว มี 5 บทบาท** | ✅ ตรงแนวทางแล้ว |
| เงา 3 ทิศ | ไม่มีเจ้าไหนทำ top/center เป็นชุดเต็ม | มีครบ 3 ทิศ 15 ตัว | อาจเกินความจำเป็น ต้องดูการใช้จริง |

## 4. ข้อเสนอปรับ Nation DS (เรียงตามความคุ้มค่า)

**1. เพิ่มชั้นชื่อตามหน้าที่ทับของเดิม (ไม่ต้องรื้อ)**
สร้าง alias ที่บอกว่าใช้กับอะไร แล้วชี้ไปเงาที่มีอยู่
```
elevation/raised   → shadows/bottom/xs   (การ์ด ปุ่มยกเล็กน้อย)
elevation/overlay  → shadows/bottom/md   (เมนู ดรอปดาวน์ ทูลทิป)
elevation/modal    → shadows/bottom/lg   (โมดัล ไดอะล็อก)
elevation/sticky   → shadows/bottom/sm   (แถบที่ตรึงไว้เวลาเลื่อน)
elevation/overflow → shadows/bottom/xs   (บอกว่ายังมีเนื้อหาเลื่อนต่อ)
```
ได้ประโยชน์ทันทีโดยไม่กระทบของเดิม คนใช้เลือกถูกขึ้น

**2. ล้าง style ที่ไม่ได้ใช้ (มีข้อมูลยืนยันแล้ว)**
- `shadows/top/*` ทั้ง 5 ตัว **ไม่ได้ใช้งานจริงเลย** (เจอแค่ 2 จุดต่อตัวซึ่งคือตัวอย่างในหน้าเอกสาร) → เสนอ **ลบ** หรือยุบเหลือ 2 ตัว (xs/md) ถ้าอยากเก็บไว้เผื่อ dropdown ที่เปิดขึ้นบน
- `shadows/center/lg` · `xl` และ `warning/success focused-ring` ใช้ตัวละ 1 จุด → ทบทวนว่าจำเป็นไหม
- `background-blur/*` ไม่ได้ใช้จริงเลยเช่นกัน แต่**ควรเก็บไว้** เพราะเป็นของที่จะได้ใช้ตอนทำ overlay/modal ในอนาคต

**2.5 เก็บกวาด style เก่า 382 จุด (ควรทำก่อนเพิ่มของใหม่)**
ยังมี node ผูกกับ style ชื่อเก่า (`Shadows/Bottom/xs` `Shadow/md` `Background blur/sm` ฯลฯ) ทำให้แก้ค่าที่ชุดปัจจุบันแล้วไม่มีผลกับของเหล่านี้ ต้องไล่เปลี่ยนให้ชี้ชุดปัจจุบันแล้วลบ style เก่าทิ้ง

**3. โหมดมืด** เลือกแนวทางเดียวจาก 2 แบบ
- แบบ Carbon/M3: ใช้ **สีพื้นไล่ระดับ** แทนเงา (เหมาะกับเว็บข่าวที่มีโหมดมืด)
- แบบ Atlassian: ใช้ **เงา + สีพื้น** คู่กัน (งานมากกว่าแต่ได้มิติครบ)

**4. เพิ่มเงา 2 ชั้น (key + ambient)** เฉพาะระดับที่ลอยสูง (overlay/modal) ให้ดูมีมิติขึ้น โดยไม่ต้องแก้ทุกตัว

**5. เพิ่ม inset shadow** ถ้าจะทำ component ช่องกรอก/ปุ่มกดในอนาคต (ยังไม่เร่ง)

## 5. สิ่งที่ยังต้องตรวจก่อนลงมือ
- นับการใช้งานจริงของ `shadows/top/*` และ `shadows/center/*` ในไฟล์ Figma ทั้ง 51 หน้า
- ตรวจว่าเงาที่ผูกไว้ในโค้ด (`shadows.json` 20 token) ถูกใช้ที่ไหนบ้าง
- ตัดสินใจเรื่องโหมดมืดก่อน เพราะกระทบโครง token ทั้งชุด

## แหล่งอ้างอิง
- [Elevation – Material Design 3](https://m3.material.io/styles/elevation/tokens)
- [Elevation – Fluent 2](https://fluent2.microsoft.design/elevation)
- [Elevation – Atlassian Design](https://atlassian.design/foundations/elevation)
- [Depth Tokens – Shopify Polaris](https://polaris-react.shopify.com/design/depth/shadow-tokens)
- [Color tokens – Carbon Design System](https://carbondesignsystem.com/elements/color/tokens/)
- [Elevation Design Patterns: Tokens, Shadows, and Roles](https://designsystems.surf/articles/depth-with-purpose-how-elevation-adds-realism-and-hierarchy)
- [What is Elevation in Design Systems?](https://designsystems.surf/guides/elevation)
- [Visible Focus Rings: A Practical Guide for 2026](https://www.72technologies.com/blog/focus-rings-visible-focus-guide)
