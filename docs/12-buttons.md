---
title: "12 Buttons Nation Design System"
description: "Button component ทุก family (brand/error/alpha/gray/neutral/link) token component-tier ผูกกับ Figma component set หน้า 12 Buttons"
target_audience: ["UI/UX Designer", "Frontend Developer", "Maintainer"]
version: "1.1.0"
last_updated: "2026-09-23"
status: "active"
sources_of_truth:
  figma_page: "12 Buttons (ไฟล์ QgmoT5) Button/Brand 7135:24778 Button/Error 7135:25951 Button/Alpha 7135:28015 Link Brand 7135:25679 Link Error 7135:26502 Link Gray 7226:11764"
  code: "tokens/tokens.json/component.json (button.color.*) → tokens/output/css/variables.css"
  prototype: "-"
---

# 12 Buttons Nation Design System

## 1. ข้อมูลควบคุม (Metadata)

| ฟิลด์ | รายละเอียด |
|---|---|
| **Title** | 12 Buttons |
| **Description** | Button component-tier tokens ทุก family ผูก (bind) เข้ากับ Figma component set จริงบนหน้า 12 Buttons flow `component → semantic → primitive` |
| **Target Audience** | Designer (เลือก variant + ผูก variable), Developer (ใช้ `--ntg-button-color-*`), Maintainer (ดูแล token/sync) |
| **Source of Truth** | Figma page "12 Buttons" `tokens/tokens.json/component.json` (`button.color.*`) |
| **Version / Updated** | 1.1.0, 2026-09-23 |

## 2. วัตถุประสงค์ (Objective & Business Logic)

- **เป้าหมาย:** ทำ **component-tier token** ให้ปุ่มทุก family เพื่อให้ code + Figma bind ที่ชั้นเดียว (`button.color.*`) แทนการ bind semantic ตรงๆ
- **Business logic:** ปุ่มเป็น component ที่ใช้บ่อยสุด · การมี token ต่อ family/variant/state ทำให้เปลี่ยนสีปุ่มทั้งระบบได้จากจุดเดียว + รองรับ multi-brand (ดู [brand-codes.md](brand-codes.md))
- **คุณค่า:** ความสม่ำเสมอ · reuse · theming · ไม่มี hex ดิบ (ผูก variable เสมอ)

## 3. ขั้นตอนการใช้งาน (Workflow)

### สำหรับ Designer
1. เลือก Button component set บนหน้า 12 Buttons (Brand/Error/Alpha หรือ Link)
2. ตั้ง variant property: **Hierarchy** (Primary/Secondary/Tertiary) · **State** · **Size** · **Default Gray**/**Neutral Color** (modifier)
3. สี fill/text/icon/stroke ผูก `color/button/<family>/*` อยู่แล้ว ไม่ต้องแตะสีเอง (ห้ามใส่ hex)

### สำหรับ Developer
1. ใช้ CSS var `--ntg-button-color-<family>-<property>-<hierarchy>-<state>` เช่น `--ntg-button-color-brand-background-primary-hover`
2. ห้าม hardcode สี อ้าง token เสมอ · dark mode สลับอัตโนมัติผ่าน `[data-theme="dark"]`
3. token เปลี่ยน → `npm run tokens:build` → CSS/JS regenerate

## 4. โครงสร้างข้อมูลและ UI (Structure)

### 4.1 Families (7 รวม 295 tokens)

| Family | tokens | Hierarchy | State | Properties | หมายเหตุ |
|---|---|---|---|---|---|
| `brand` | 48 | primary/secondary/tertiary | default/hover/focused/pressed/disabled | bg text icon border | ปุ่มหลัก |
| `error` | 48 | primary/secondary/tertiary | default/hover/focused/pressed/disabled | bg text icon border | destructive/danger |
| `alpha` | 15 | (ไม่มี) | default/hover/focused/pressed/disabled | bg text icon | พื้นโปร่งแสง (บนรูป) |
| `brand-gray` | 48 | primary/secondary/tertiary | default/hover/focused/pressed/disabled | bg text icon border | เทา default → brand ตอน hover |
| `error-gray` | 48 | primary/secondary/tertiary | default/hover/focused/pressed/disabled | bg text icon border | เทา default → error ตอน hover |
| `neutral` | 48 | primary/secondary/tertiary | default/hover/focused/pressed/disabled | bg text icon border | เทาล้วน (ไม่มีสี family) |
| `link` | 40 | (ไม่มี) | default/hover/pressed/disabled | text icon | 5 sub: brand/brand-gray/error/error-gray/gray (ไม่มี bg) |

### 4.2 Variant modifier (Figma → token family)

| Figma property | ค่า | → token family |
|---|---|---|
| Default Gray | False | family เดิม (brand/error) |
| Default Gray | True | `<family>-gray` (เทา default, family สี hover) |
| Neutral Color | True (Brand เท่านั้น) | `neutral` (เทาล้วน) |
| (Link) Default Gray | True | `link/<family>-gray` |

### 4.3 Token pattern (naming)

| ระดับ | รูปแบบ | ตัวอย่าง CSS var |
|---|---|---|
| มี hierarchy | `button.color.<family>.<property>.<hierarchy>.<state>` | `--ntg-button-color-brand-background-primary-hover` |
| ไม่มี hierarchy (alpha) | `button.color.alpha.<property>.<state>` | `--ntg-button-color-alpha-background-default` |
| link | `button.color.link.<subfamily>.<property>.<state>` | `--ntg-button-color-link-brand-text-hover` |

- **property:** `background` · `text` · `icon` · `border` (border เฉพาะ secondary)
- **state (lock):** `default` · `hover` · `focused` · `pressed` · `disabled`
- **`pressed` เพิ่งเพิ่มเมื่อ 2026-09-23** token ครบทุกตระกูลแล้ว แต่ **ยังไม่มี variant `state=pressed` ใน Figma และยังไม่มี `:active` ในโค้ด** ต้องทำให้ครบตอนหยิบหน้านี้มาแก้ดีไซน์
- tertiary/link พื้นโปร่ง → ไม่มี background token ใน state ที่โปร่ง

### 4.4 การผูก (binding) Figma component

| ส่วนใน variant | ผูก token |
|---|---|
| container fill | `.../background/...` |
| Title (TEXT) | `.../text/...` |
| Left/Right Icon (VECTOR ใน instance) | `.../icon/...` |
| stroke (secondary) | `.../border/...` |

## 5. ข้อควรระวังและปัญหาที่พบบ่อย (Constraints)

| # | ข้อควรระวัง | เหตุผล / วิธีปฏิบัติ |
|---|---|---|
| 1 | **ห้ามใส่ hex ดิบในปุ่ม** | ต้องผูก `color/button/*` เสมอ flow component→semantic→primitive |
| 2 | **Warning / Success buttons ถูกลบ** | over-built warning/success เป็นสีของ alert/badge ไม่ใช่ปุ่ม (M3/Ant/Carbon ไม่มี) semantic `system/warning-*` `success-*` ยังคงอยู่ (alert/badge ใช้) |
| 3 | **gray ≠ neutral** | `<family>-gray` = เทาแล้วโชว์สี family ตอน hover `neutral` = เทาล้วนตลอด (secondary/tertiary เท่านั้น) |
| 4 | **icon ผูกที่ VECTOR ใน instance** | icon อยู่ใน Material icon instance ผูก variable ที่ vector fill (ต่างจาก text) |
| 5 | **แก้สีปุ่ม แก้ที่ token ไม่ใช่ variant** | เปลี่ยน `color/button/*` → กระทบทุกปุ่ม family นั้นทั้งระบบ |
| 6 | **Size ไม่ใช่ color token** | Size (xs–xl) คุม padding/font/icon เป็น Figma variant ไม่ผูกสี |
| 7 | **ปุ่มลิงก์ระยะขอบเป็น 0 ถาวร** | `link-button` ไม่มีพื้นหลัง ความสูงมาจากความสูงบรรทัดของ text style ถ้าใส่ระยะขอบซ้ายขวา ตัวอักษรตัวแรกจะเยื้องออกจากขอบเนื้อหาที่ปุ่มวางต่อท้าย ถ้าใส่บนล่าง กล่องจะดันบรรทัดอื่นในย่อหน้าเดียวกัน ตัวแปรใน Figma ล็อกด้วย description ไว้แล้ว (ตัดสิน 2026-09-02) |
| 8 | **ความสูงปุ่มลิงก์ไม่มีสูตร** | ตัวคุมจริงคือ text style ต่อขนาด xs ใช้ `meta/overline` sm `label/md` md `label/lg` lg `label/xl` xl `title/lg` จะเปลี่ยนความสูงต้องเปลี่ยนที่ preset ห้ามพิมพ์ตัวเลขทับใน `tokens/scale/link-button.mjs` |
| 9 | **กรอบไอคอนต้องล็อกสัดส่วน 1 ต่อ 1** | Figma ยอมให้ผูกตัวแปรได้มิติเดียวเมื่อล็อกสัดส่วน จึงผูกเฉพาะความสูงแล้วให้ความกว้างวิ่งตาม กรอบที่ไม่ล็อกเคยเพี้ยนเป็น 24x22 ที่ขนาด lg ของ Neutral กับ Error โดยไม่มีใครเห็น (แก้ 2026-09-02) |
| 10 | **ช่องไฟของ `link-icon-button` เป็น 0** | มีลูกตัวเดียว ช่องไฟไม่มีผล ค่าเดิม 4, 4, 5, 6, 4 หลอกคนอ่านเปล่า ๆ |
| 11 | **ชื่อ token ของปุ่มยึดตามไฟล์ออกแบบแล้ว** | ยกเลิก namespace `space/` เมื่อ 2026-09-23 ชื่อปัจจุบันคือ `--ntg-button-padding-top-md` `--ntg-button-size-md` `--ntg-icon-button-padding-top-md` `--ntg-link-icon-button-icon-only-padding-top-md` ตรวจแล้วว่า `prototype/buttons.html` กับ `components/` ไม่เหลือชื่อเก่า ตรวจซ้ำได้ด้วย `npm run tokens:verify` |
