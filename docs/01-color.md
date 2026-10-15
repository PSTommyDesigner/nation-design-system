---
title: "01 Color Nation Design System"
description: "ระบบสีของ Nation Design System primitive palette, semantic/component/utility variables, gradients, รองรับ light/dark mode และมาตรฐาน WCAG contrast"
target_audience: ["UI/UX Designer", "Frontend Developer", "Design System Maintainer"]
version: "1.1.0"
last_updated: "2026-07-10"
status: "active"
sources_of_truth:
  figma_page: "01 Color (node 1981:15963) ไฟล์ QgmoT5"
  tokens: "tokens/tokens.json/*.json (แยกไฟล์ต่อ collection, W3C DTCG Style Dictionary source)"
  naming: "docs/rules/token-naming-taxonomy.md (semantic token naming)"
  code: "generated CSS variables (--ntg-color-*)"
---

# 01 Color Nation Design System

## 1. ข้อมูลควบคุม (Metadata)

| ฟิลด์ | รายละเอียด |
|---|---|
| **Title** | Nation Design System Color |
| **Description** | ระบบสีกลาง: primitive palette → semantic/component/utility variables รองรับ light/dark mode และตรวจ WCAG contrast sync Figma Variables ↔ tokens |
| **Target Audience** | Designer (ใช้ variable จาก palette), Developer (ใช้ CSS variable/token), Maintainer (ดูแล token/sync) |
| **Source of Truth** | Figma หน้า `01 Color` (ดีไซน์) `tokens/tokens.json` (Style Dictionary) → CSS variables |
| **Version / Updated** | 1.1.0, 2026-07-10 |

## 2. วัตถุประสงค์ (Objective & Business Logic)

- **เป้าหมาย:** ทุกเว็บในเครือใช้ระบบสีเดียวกัน มี semantic ชัดเจน ปรับจากศูนย์กลางได้
- **Semantic tokens:** ใช้ระดับ semantic/component (เช่น `text/heading`, `background/primary`) ไม่ผูกกับสีดิบ → เปลี่ยน brand/theme ได้โดยไม่แก้ทุกจุด
- **Light/Dark mode:** variable มีหลาย mode → สลับธีมอัตโนมัติ
- **Accessibility:** คู่สี text/background ต้องผ่าน WCAG contrast (AA/AAA)
- **Single source of truth:** ดีไซน์ที่ Figma Variables → export เป็น token/CSS กันสีไม่ตรงกัน

## 3. ขั้นตอนการใช้งาน (Workflow)

### สำหรับ Designer (Figma)
1. เปิดหน้า `01 Color` → ดู palette / variables ที่มี
2. ใช้ **color variable** ระดับ semantic/component ผูกเข้ากับ fill/stroke/text (ห้ามใส่ hex ดิบ)
3. ถ้าต้องการสีที่ยังไม่มี token → **แจ้ง Maintainer ก่อนสร้าง** (ไม่สร้าง variable เอง)

### สำหรับ Developer (โค้ด)
1. ใช้ CSS variable ที่ gen จาก token เช่น `var(--ntg-color-text-heading)`
2. เลือกระดับ semantic/component ไม่อ้าง primitive ตรงๆ
3. รองรับ dark mode ผ่าน mode/attribute ที่สลับชุด variable

### สำหรับการแก้ไข/เพิ่มสี (Sync)
1. แก้/เพิ่ม Figma Variable ในหน้า `01 Color`
2. export ด้วย **Token Press plugin** ทับ `tokens/tokens.json/*.json` (แก้เล็ก 2-3 ตัวแก้ไฟล์ตรงๆ ได้) ⚠️ `npm run tokens:pull` (REST) = **Enterprise-only ใช้ไม่ได้บนแพลนนี้**
3. รัน `npm run tokens:build` (Style Dictionary → CSS `--ntg-color-*`)
4. ตรวจ contrast (WCAG) และคู่ light/dark ให้ครบก่อน publish · token ใหม่ต้องผ่าน checklist ใน `docs/rules/token-naming-taxonomy.md`

## 4. โครงสร้างข้อมูลและ UI (Structure)

### 4.1 Documents (เฟรม) ในหน้า 01 Color

| Document | เนื้อหา |
|---|---|
| **01 Color Documentation** | เอกสารประจำหน้า (Metadata Objective Workflow Structure Constraints) |
| **Usage & Documentation** | DS Library, WCAG accessibility, plugin, primitive/semantic/component colors, naming |
| **Color palette** | primitive palette ทุก hue (Blue/Green/Teal/Cyan/Purple/Pink/Rose/Red/Orange/Yellow/Gold/Gray) step 25–900 |
| **Base Components (internal)** | base component ภายใน เหลือ `_swatch-base` (cell ตารางสีย้ายไปหน้า 26 ชุดที่ลงท้ายด้วย `-color-cell` แล้ว) |
| **Text Background Border Foreground Icon** | ตาราง semantic/component variable แต่ละหมวด (คอลัมน์ ลำดับ/ชื่อ โหมดสว่าง โหมดมืด คำอธิบาย) |
| **AMS project Brand Utility Color Utility Color** | ตาราง utility/brand/ams variable รายหมวด (keyline/graph/สถานะ) |

### 4.2 ลำดับชั้นของ Color token (tier)

| Tier | ตัวอย่างชื่อ | ใช้เมื่อ |
|---|---|---|
| **Primitive / Palette** | `color/brand/500`, `<hue>/<step>` | ค่าดิบของสี ไม่อ้างตรงในงาน |
| **Semantic** | `color/text/general/heading`, `color/background/general/primary` | ใช้จริงในงานส่วนใหญ่ |
| **Component** | สีเฉพาะ component | ผูกกับ component |
| **Utility** | `color/utility/<hue>/<hue>-300` | keyline, graph, สถานะ, decorative |

### 4.3 Mode

| Mode | หมายเหตุ |
|---|---|
| **Light** | ค่าเริ่มต้น |
| **Dark** | ทุก semantic variable ต้องมีคู่ dark (มี dark/light mode color badge เป็นตัวช่วยตรวจ) |

### 4.4 ไฟล์/แหล่งที่เกี่ยวข้อง

| Path | หน้าที่ |
|---|---|
| `tokens/tokens.json/*.json` | source ของ token แยกต่อ collection (W3C DTCG Style Dictionary) |
| CSS variables (`--ntg-color-*`) | output ที่ใช้ในโค้ด |
| Figma หน้า `01 Color` | source ฝั่งดีไซน์ (Figma Variables) |
| Figma หน้า `26 Table` | cell ตาราง (ชุดที่ลงท้ายด้วย `-color-cell` และ `-table-cell`) ตารางในหน้า 01 ใช้ instance ดึงจากที่นี่ |

## 5. ข้อควรระวังและปัญหาที่พบบ่อย (Constraints)

| # | ข้อควรระวัง | เหตุผล / วิธีปฏิบัติ |
|---|---|---|
| 1 | **ห้าม hardcode hex** | ทุก fill/stroke/text ผูก color variable swatch/graphic ก็ต้องผูก |
| 2 | **ใช้ semantic ไม่ใช่ primitive ตรงๆ** | primitive เปลี่ยนได้; อ้าง semantic ทำให้ theme/rebrand ไม่พัง |
| 3 | **ตรวจ WCAG contrast** | คู่ text/background ต้องผ่าน AA (≥4.5:1 ข้อความปกติ) |
| 4 | **สีต้องมีคู่ light/dark ครบ** | ไม่งั้น dark mode เพี้ยน |
| 5 | **ไม่มี token → ถามก่อนสร้าง** | กันสีนอกระบบ เพิ่มที่ Figma Variables แล้ว sync |
| 6 | **อย่าแก้ CSS variable ที่ gen ด้วยมือ** | เป็น output จาก token แก้ที่ tokens/Figma แล้ว build ใหม่ |
| 7 | **swatch ในหน้าต้องผูก variable** | ✅ ครบแล้ว (220/222) navy backup palette (จากการเปลี่ยนโลโก้) tokenize เป็น `color/ntgds1/*` และ `color/ntgds2/*` |
| 8 | **ตาราง + text ต้องใช้ DS component/style** | ✅ 2026-07-10: ตารางทุกอันใช้ instance ชุดที่ลงท้ายด้วย `-color-cell` และ `-table-cell` (หน้า 26) text ทุกตัวผูก DS text style (Prompt) ไม่มี frame/text/สีดิบหลงเหลือ |
