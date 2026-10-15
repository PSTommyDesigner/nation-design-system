# IBM Carbon Design System

> Research: enterprise DS benchmark อัปเดตข้อมูล 2024–2026 โฟกัส token + governance

## Overview
- Open-source DS ของ IBM สำหรับ product/enterprise app จำนวนมาก มี **IBM Design Language** เป็นรากฐาน
- Monorepo เดียว: React + Web Components + Sass styles + design tokens + icons/pictograms + tooling
- เด่นเรื่อง maturity: governance เป็นทางการ (steering committee + advisory board), เอกสาร a11y ลึกระดับ per-component

## 1. Token architecture
- **2 ชั้นหลัก:** *core/global tokens* (สีที่ใช้ข้ามทุก component) → *component tokens* (property เฉพาะ component)
- Token **nest ซ้อนกันได้** เช่น semantic `$interactive` อ้างค่าไปที่ primitive `$blue-60` ของ IBM Design Language palette
- Semantic naming แบบ role-based: `$text-primary`, `$text-error`, `$interactive`, `$layer` (แทน hex ดิบ)
- มี token หลายประเภท: color, **type token** (font size/weight/line-height สำเร็จรูปกับ IBM Plex), spacing/layout scale, motion
- 2024–2025: เพิ่มชุด **AI color tokens** สำหรับ AI components โดยเฉพาะ (แยกออกจาก token ทั่วไป)

## 2. Theming / multi-brand
- 4 ธีมมาตรฐาน: **White, Gray 10** (light) + **Gray 90, Gray 100** (dark) token ตัวเดียวกัน map ค่าต่างกันต่อธีม
- Override token ที่จุดเดียว → ทุก component ที่ reference อัปเดตอัตโนมัติ (theme = ชั้น mapping ไม่ใช่แก้ component)
- ธีมทั้ง 4 อยู่ครบใน Figma library เดียว (light + dark) ผูกด้วย Figma Variables

## 3. Component library + variant model
- Component จริงมีทั้ง React และ Web Components จาก source เดียว → cross-framework
- แต่ละ component มี **component token** ของตัวเองสำหรับ property ที่ปรับได้ (ไม่ต้องแก้ core)
- Documented API + a11y pattern (keyboard/ARIA) กำกับทุกตัว

## 4. Documentation approach
- เว็บ docs รวม guideline + working code + design resource ในที่เดียว, มี live example
- เอกสาร accessibility ลึกกว่าค่าเฉลี่ย: keyboard interaction, ARIA, mapping WCAG 2.1 AA ราย component
- Figma kit publish บน Figma Community ภายใต้โปรไฟล์ IBM อย่างเป็นทางการ (versioned)

## 5. Governance / contribution
- **โครงสร้างธรรมาภิบาลเป็นทางการ:** *steering committee* (Carbon practitioners คุมทิศทาง) + *advisory board* (executives ให้ buy-in + จัดสรรทรัพยากร)
- **3 ระดับการ contribute:** Light (แก้ดีไซน์เล็ก) · Medium (แก้ guideline / เพิ่ม icon) · Heavy (เพิ่ม component ใหม่ทั้งตัว)
- เกณฑ์รับ contribution: ต้อง document API, ผ่าน **WCAG 2.1 AA**, ตรงตาม naming convention ก่อนเข้า shared library

## 6. Tooling Figma↔code / pipeline / a11y
- Figma Variables → export **W3C-compliant JSON** → **Style Dictionary** → CSS custom properties → typed React
- "Carbon Figma Tools" ชุด plugin เชื่อม design↔dev (บางส่วนเสริม AI ช่วยออก production code)
- a11y: อิง IBM Accessibility Checklist (WCAG AA + Section 508 + EU standard), การันตี WCAG 2.1 AA ทั้ง kit

## สิ่งที่ Nation DS ควรเรียนรู้
1. **แยก core token กับ component token ให้ชัด** Nation ใช้กฎ "bind variable จาก collection `component` เท่านั้น" อยู่แล้ว; โมเดล Carbon ยืนยันว่า component token ควร reference ขึ้นไปหา core/primitive (nest) เพื่อคุมค่าจุดเดียว
2. **Governance เป็นระดับ (Light/Medium/Heavy)** เอามาปรับเป็น contribution tier ของ Nation ได้ ลดภาระ review งานเล็ก แต่คุมเข้มงาน component ใหม่ (ตรงกับกฎ ask-first)
3. **Pipeline Figma Variables → W3C JSON → Style Dictionary → CSS** เหมือน Nation เป๊ะ → ยืนยันว่าเส้นทาง token ของเราถูกทาง และควร enforce WCAG 2.1 AA เป็นเกณฑ์รับ contribution
