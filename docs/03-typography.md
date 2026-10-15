---
title: "03 Typography Nation Design System"
description: "ระบบตัวอักษร Nation DS 2 ฟอนต์ 2 หน้าที่ (Prompt/Sarabun), atomic 2-tier (primitive→semantic), 48 text-style presets 9 ตระกูล"
target_audience: ["UI/UX Designer", "Frontend Developer", "Maintainer"]
version: "2.2.0"
last_updated: "2026-09-22"
status: "active"
sources_of_truth:
  figma_page: "03 Typography (node 1986:15629) ไฟล์ QgmoT5 เอกสาร 4 เฟรม ดูข้อ 4.4"
  code: "tokens/tokens.json/{primitive,semantics-light-mode,typography}.json → tokens/output/css/typography.css"
  prototype: "-"
---

# 03 Typography Nation Design System

## 1. ข้อมูลควบคุม (Metadata)

| ฟิลด์ | รายละเอียด |
|---|---|
| **Title** | 03 Typography |
| **Description** | ระบบ text style ของ DS 2 ฟอนต์แยกตามหน้าที่ + โครง token 2 ชั้น (primitive→semantic) + 48 preset จัด 9 ตระกูล ทุกตัวผูก variable |
| **Target Audience** | Designer (เลือก preset ตาม role) Developer (ใช้ class/token) Maintainer (ดูแล scale) |
| **Source of Truth** | Figma หน้า 03 Typography (เอกสาร 4 เฟรม ดูข้อ 4.4) และ `tokens/tokens.json/*` |
| **Version / Updated** | 2.2.0, 2026-09-22 |

## 2. วัตถุประสงค์ (Objective & Business Logic)

- **เป้าหมาย:** ให้ทุกทีมเลือก typography ตาม **หน้าที่ (role)** ไม่ใช่เดาจากขนาด คุมความสม่ำเสมอทั้ง editorial + UI
- **Business logic:** เว็บข่าวในเครือ (bangkokbiznews/nationtv/komchadluek/…) ต้องอ่านง่าย + brand เดียวกัน → แยก `Prompt` (UI/functional) กับ `Sarabun` (บทความ) ชัดเจน
- **คุณค่า:** ใช้ซ้ำได้ ทำธีมได้ ปรับ scale ที่ primitive จุดเดียวกระทบทั้งระบบ และ publish library ไปไฟล์อื่นได้ (ทุก style ผูก variable)

## 3. ขั้นตอนการใช้งาน (Workflow)

### สำหรับ Designer
1. เลือก **text style preset** ตาม role (เช่น หัวข่าว → `page-heading/*` เนื้อบทความ → `article/*` ปุ่ม → `label/*`)
2. ห้าม compose เอง ถ้าไม่มี combo ที่ต้องการ **ถามก่อนเพิ่ม preset**
3. ดู usage รายตัวได้ที่ช่อง **Description** ของแต่ละ style หรือเอกสาร Text Roles ส่วนตัวอย่างฟอนต์และชุดขนาดพื้นฐานอยู่ที่เอกสาร Type Scale

### สำหรับ Developer
1. ใช้ class `.ntg-typography-<family>-<size>` จาก `tokens/output/css/typography.css` (เช่น `.ntg-typography-article-lg`)
2. หรืออ้าง token ผ่าน CSS var / `tokens/output/js/tokens.mjs`
3. แก้ scale → แก้ `tokens/tokens.json/primitive.json` → `npm run tokens:build` (ห้าม hardcode px)

## 4. โครงสร้างข้อมูลและ UI (Structure)

### 4.1 ตระกูล & ไซส์ (48 roles / 9 ตระกูล)

| ตระกูล | ฟอนต์ น้ำหนัก | ไซส์ | หน้าที่ |
|---|---|---|---|
| **display** | Prompt **Bold** (600) | xl 56 lg 48 md 40 sm 32 xs 26 | หัวใหญ่พิเศษ hero/cover |
| **page-heading** | Prompt **Bold** (600) | xl 40 lg 32 md 26 sm 24 xs 22 | ชื่อหน้า/หัวบทความหลัก (H1) |
| **section-heading** | Prompt **Medium** (500) | xl 26 lg 24 md 22 sm 20 xs 18 | หัว section (H2/H3/H4) |
| **title** | Prompt **Medium** (500) | xl 22 lg 20 md 18 sm 16 xs 14 | หัว card/module/list |
| **body** | Prompt Regular (400) | xl 20 lg 18 md 16 sm 14 xs 12 | เนื้อความ UI ทั่วไป / Description |
| **article** | Sarabun Regular (400) | xl 20 lg 18 md 16 sm 14 xs 12 | เนื้อบทความ (เฉพาะหน้าอ่าน) |
| **article/pullquote** | Sarabun **Medium** (500) | xl 20 lg 18 md 16 sm 14 xs 12 | ข้อความดึงเด่นกลางบทความ |
| **meta** | Prompt mixed | byline 14 **M** overline 12 **B** read-time 12 **M** timestamp caption helper 12 R credit 10 R micro 8 R | ข้อมูลประกอบข่าว |
| **label** | Prompt **Medium** (500) | xl 18 lg 16 md 14 sm 12 xs 10 | ป้ายบน component (ปุ่ม/tag/tab) |

> line-height/letter-space ครบทุกตัว ดูค่าจริงที่ `typography.css` หรือ Figma text style
> **น้ำหนัก (weight scheme):** Bold 600 = หัวหลัก (display page-heading overline) Medium 500 = หัวรอง/UI/เน้น (section-heading title label pullquote byline read-time) Regular 400 = เนื้อความ (body article meta ที่เหลือ)

### 4.2 Token tiers (atomic 2-tier)

| ชั้น | path | หน้าที่ |
|---|---|---|
| **Primitive** | `typography/{font-size\|line-height\|letter-space}/{size-key}` `/font-weight/{regular\|medium\|bold}` `/font-family/{primary\|article}` | ค่าดิบ (ladder) `primary`=Prompt `article`=Sarabun Sarabun size-key = `read-*` |
| **Semantic (role)** | `typography/{property}/{role}` → alias primitive 5 property/role (48 roles = 240 vars) | บทบาท |
| **Text Style** | `{family}/{size}` (Figma) = `.ntg-typography-{family}-{size}` (CSS) bind semantic ครบ 5 | preset ใช้จริง |

> ตัด **component tier** ออก Text Style ผูก semantic ตรง ใช้ครบ 3 น้ำหนัก (regular 400 medium 500 bold 600) ตาม weight scheme ใน §4.1

### 4.3 ไฟล์ที่เกี่ยวข้อง

| Path | หน้าที่ |
|---|---|
| `tokens/tokens.json/primitive.json` | ladder ขนาด/lh/ls + weight + family |
| `tokens/tokens.json/semantics-light-mode.json` | 240 semantic role vars (typography ไม่แยก light/dark) |
| `tokens/tokens.json/typography.json` | 48 composite text-style presets |
| `tokens/output/css/typography.css` | 48 class `.ntg-typography-*` |

### 4.4 เอกสารบนหน้า Figma

เรียงซ้ายไปขวาตามมาตรฐาน เริ่มที่ x = 0 ห่างกัน 200 หน้านี้ไม่มี component จึงไม่มี Component Previews กับ Space Document

| ลำดับ | เฟรม | ชนิด | เนื้อหา |
|---:|---|---|---|
| 1 | `03 Typography Documentation` | Page Documentation | สรุปภาพรวม โครง token 2 ชั้น ควรและไม่ควร การเข้าถึง การตั้งชื่อ |
| 2 | `Typography Token` | Token Document | จับคู่ชื่อสไตล์ฝั่ง Figma กับฝั่งโค้ด 48 แบบ |
| 3 | `Type Scale` | Information Document | ตัวอย่างฟอนต์ 2 ตระกูลกับชุดขนาดพื้นฐาน 18 ขั้น (เพิ่ม 2026-09-22) |
| 4 | `Text Roles` | Information Document | ตัวอย่างจริงของ text style ครบ 48 แบบ แยก 9 ตระกูล |

**ตัวอย่างในเอกสาร Type Scale ผูกกับตัวแปรชั้น primitive ไม่ใช่ text style** เพราะสิ่งที่โชว์คือขั้นบันไดพื้นฐาน (h1 ถึง read-sm) ซึ่งยังไม่ได้เป็นบทบาท ตัวอย่างน้ำหนักฟอนต์ใช้ขั้น h6 (26) และชื่อฟอนต์ใช้ขั้น h4 (40) ย้ายออกมาจากเอกสารประจำหน้าเมื่อ 2026-09-22 ตามกฎว่าตัวอย่างและตารางค่าต้องอยู่ใน Information Document

## 5. ข้อควรระวังและปัญหาที่พบบ่อย (Constraints)

| # | ข้อควรระวัง | เหตุผล / วิธีปฏิบัติ |
|---|---|---|
| 1 | **ใช้ preset เท่านั้น ห้าม compose เอง** | preset = combo ที่ตัดสินแล้ว ต้องการ combo ใหม่ → ถามก่อนเพิ่ม (ห้าม override lineHeight/weight/ls/family นอก preset) |
| 2 | **กฎบทบาทฟอนต์** | `Prompt` = UI/functional (heading title label meta body) `Sarabun` = `article` เฉพาะหน้าอ่าน ห้ามสลับ |
| 3 | **primitive Sarabun = `read-*` ไม่ใช่ `article-*`** | เลี่ยง path ชนกับ semantic `article/*` ตอน build (เคยชนแล้ว output พัง) |
| 4 | **ห้าม hardcode px** | แก้ scale ที่ primitive แล้ว `npm run tokens:build` เสมอ Figma bind variable ทุก property |
| 5 | **usage อยู่ที่ Description ของ style** | เลือกถูก role โดยไม่ต้องเดา อ่าน "What's it for?" ในแต่ละ text style |
