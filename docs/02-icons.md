---
title: "02 Icons Nation Design System"
description: "ระบบไอคอนกลางของ Nation Group ครอบคลุมชุดไอคอนใน Figma และ Icon component ในโค้ด ใช้ร่วมกันทุกเว็บในเครือ"
target_audience: ["UI/UX Designer", "Frontend Developer", "Design System Maintainer"]
version: "1.0.0"
last_updated: "2026-07-03"
status: "active"
sources_of_truth:
  figma_page: "02 Icon (node 502:2747) ไฟล์ QgmoT5"
  code: "components/Icon/"
  storybook: "components/Icon/Icon.stories.tsx"
---

# 02 Icons Nation Design System

## 1. ข้อมูลควบคุม (Metadata)


| ฟิลด์ | รายละเอียด |
|---|---|
| **Title** | Nation Design System Icons |
| **Description** | ระบบไอคอนกลางของ Nation Group ประกอบด้วยชุดไอคอนใน Figma (5 Documents) และ `Icon` component ในโค้ด (React/TypeScript) ทำ bidirectional sync ระหว่าง Figma ↔ code |
| **Target Audience** | Designer (ใช้จาก Figma Assets), Developer (ใช้ผ่าน `Icon` component), Maintainer (ดูแล token/sync) |
| **Source of Truth** | Figma หน้า `02 Icon` (ดีไซน์) `components/Icon/` (โค้ด) |
| **Version / Updated** | 1.0.0, 2026-07-03 |

## 2. วัตถุประสงค์ (Objective & Business Logic)

- **เป้าหมาย:** ให้ทุกเว็บในเครือ (bangkokbiznews, nationtv, komchadluek, thansettakij, springnews, posttoday) ใช้ไอคอนชุดเดียวกัน หน้าตาสม่ำเสมอ
- **Single source of truth:** ดีไซน์ที่ Figma → export เป็นโค้ด ป้องกันไอคอนหลุด/ไม่ตรงกันระหว่างดีไซน์กับงานจริง
- **ปรับสี/ขนาดจากศูนย์กลาง:** สีผูกกับ DS color variables และขนาดผูกกับ size tokens → รองรับ theming/dark mode และแก้ทีเดียวมีผลทั้งระบบ
- **Reuse:** ไอคอนทุกตัวเป็น Figma Component (ลากใช้ซ้ำได้) และเป็น registry เดียวในโค้ด (`<Icon name="..." />`)

## 3. ขั้นตอนการใช้งาน (Workflow)

### สำหรับ Designer (Figma)
1. เปิดหน้า `02 Icon` → เปิด **Assets panel**
2. เลือกไอคอนจากกลุ่ม `<หมวด> / <ชื่อ>` (เช่น `Navigation & Arrows / menu`) แล้วลากลงงาน ค่าเริ่มต้น **24px**
3. ปรับสีผ่าน color variable และขนาดผ่าน size token (ห้ามใส่ค่าดิบ)

### สำหรับ Developer (โค้ด)
1. `import { Icon } from '@/components/Icon'`
2. เรียกใช้: `<Icon name="search" size="md" />` (ค่าเริ่มต้น `size="lg"` = 24px)
3. กำหนดสีด้วย `currentColor` ตั้ง `color` บน element/parent หรือใช้ foreground token

### สำหรับการแก้ไข/เพิ่มไอคอน (Sync)
1. แก้/เพิ่มไอคอนใน Figma หน้า `02 Icon` (ตาม anatomy)
2. Export SVG จาก component → regenerate `components/Icon/` (อย่าแก้ `icons.ts`/`svg/` ด้วยมือ)
3. ตรวจแกลเลอรีไอคอนใน Storybook (`components/Icon/Icon.stories.tsx`) ว่าครบและถูกต้อง

## 4. โครงสร้างข้อมูลและ UI (Structure)

### 4.1 ชุดไอคอนใน Figma (5 Documents)

| Document | จำนวน | สไตล์ | การตั้งชื่อ Component | หมายเหตุ |
|---|---|---|---|---|
| **Nation UI Icons** | 151 (13 หมวด) | Outlined, filled vector | `<หมวด> / <ชื่อ>` | ชุดหลัก 24dp grid live area 16 สี `icon/general/tertiary` |
| **Material Icons** | 1,355 (17 หมวด) | Outlined | `<หมวด> / <ชื่อ>` | อ้างอิงจาก Material (ลบ Filled ออกแล้ว) |
| **Nation House Icons** | 150 | Brand (สีน้ำเงิน) | `nation-house / <ชื่อ>` | ไอคอนแบรนด์ 40dp สองชั้น เส้น (`icon/general/primary`) กับรูปทึบสีแบรนด์ (`icon/brand/primary`) ที่ปิดไว้ |
| **Document Icons** | 7 | File type (สี) | `Document / <ชื่อ>` | TXT/DOC/XLS/PPT/PDF/MEM/IMG |
| **Other** | 1 set (11 states) | | `Other / Star icon` | Star fill 0–100% |

> ทุก Document ใช้โครงเดียวกัน: `_document-header` + section ตามหมวด + สี chrome ผูก variable (ดู [ds-document-pattern])

### 4.2 Icon component (โค้ด) Props

| Prop | ชนิด | ค่าเริ่มต้น | คำอธิบาย |
|---|---|---|---|
| `name` | `IconName` | (required) | ชื่อไอคอนจาก registry |
| `size` | `IconSize \| number \| string` | `'lg'` (24px) | token (`xs`–`2xl`) หรือ px |
| `title` | `string` | | ป้าย a11y; ถ้าไม่ใส่ = decorative (`aria-hidden`) |
| `...rest` | `SVGProps` | | ส่ง props อื่นเข้า `<svg>` |

### 4.3 Size tokens

| Token | px | CSS variable |
|---|---|---|
| `xs` | 12 | `--ntg-size-icon-xs` |
| `sm` | 16 | `--ntg-size-icon-sm` |
| `md` | 20 | `--ntg-size-icon-md` |
| `lg` (default) | 24 | `--ntg-size-icon-lg` |
| `xl` | 32 | `--ntg-size-icon-xl` |
| `2xl` | 40 | `--ntg-size-icon-2xl` |

### 4.4 ไฟล์ในโค้ด

| Path | หน้าที่ |
|---|---|
| `components/Icon/Icon.tsx` | React component (name/size/title, สี currentColor) |
| `components/Icon/icons.ts` | registry: `icons`, `iconCategories`, `iconNames`, type `IconName` |
| `components/Icon/svg/*.svg` | ไฟล์ SVG รายตัว (151 ไฟล์, `fill="currentColor"`) |
| `components/NationHouseIcon/NationHouseIcon.tsx` | React component ชุดแบรนด์ (name/size/filled/title) |
| `components/NationHouseIcon/icons.ts` | registry ชุดแบรนด์: `nationHouseIcons`, `nationHouseIconNames`, type `NationHouseIconName` |
| `components/NationHouseIcon/svg/*.svg` | ไฟล์ SVG ชุดแบรนด์ (150 ไฟล์ ชั้นเส้น `stroke="currentColor"`) |
| `components/Icon/Icon.stories.tsx`, `components/NationHouseIcon/NationHouseIcon.stories.tsx` | หน้า Docs ใน Storybook เป็นแกลเลอรีค้นหา (ครบทุกตัว จัดตามหมวดของ `iconCategories` กดเพื่อคัดลอกชื่อ) บวกหัวข้อขนาด สถานะ ควรไม่ควร ตัวแกลเลอรีอยู่ที่ `.storybook/icon-gallery.tsx` ใช้ TextField ของระบบเป็นช่องค้นหา (2026-10-27) |

## 5. ข้อควรระวังและปัญหาที่พบบ่อย (Constraints)

| # | ข้อควรระวัง | เหตุผล / วิธีปฏิบัติ |
|---|---|---|
| 1 | **ห้าม hardcode สี** | ทุก fill/stroke/text ต้องผูก DS color variable ถ้าไม่มี token ให้ถามก่อนสร้าง |
| 2 | **ไอคอนต้องมี padding (live area 16 บน grid 24)** | ถ้าเต็มกรอบ 24 จะโดน clip ในกรอบมุมโค้ง/วงกลม |
| 3 | **ไอคอนต้องเป็น single vector (union)** | ถ้าเป็นหลาย path ทับกัน corner-radius/boolean จะเพี้ยน ส่วนหาย |
| 4 | **อย่าใช้ `resize()` เป็นจัตุรัสบน vector ที่ bbox ไม่จัตุรัส** | จะยืดเสียสัดส่วน (วงกลม→วงรี) ให้ scale แบบ uniform แล้ว center |
| 5 | **การ resize/recolor/ลบ main component ที่ publish กระทบ instance ไฟล์อื่น** | ต้องเช็ค Figma Library Analytics ก่อน rename ปลอดภัย (key คงเดิม) แต่ delete = key หายถาวร |
| 6 | **Material ลบ Filled ถาวรแล้ว** | ถ้าไฟล์อื่นเคยใช้ Filled ต้องสลับไปใช้ Outline |
| 7 | **อย่าแก้ `icons.ts` / `svg/` ด้วยมือ** | เป็นไฟล์ auto-generated แก้ที่ Figma แล้ว regenerate |
| 8 | **Header ของทุก Document ต้องใช้ `_document-header`** | ห้ามวาด header เอง เพื่อความสม่ำเสมอ |
