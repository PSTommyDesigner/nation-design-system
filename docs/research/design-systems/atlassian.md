# Atlassian Design System (ADS / Atlaskit)

> Research: enterprise DS benchmark อัปเดตข้อมูล 2024–2026 โฟกัส token + governance

## Overview
- DS ของ Atlassian (Jira, Confluence, Trello ฯลฯ) เผยแพร่ผ่าน `atlassian.design` + package `@atlaskit/*`
- ต้นแบบเรื่อง **semantic token taxonomy** ที่อ่านชื่อแล้วเข้าใจ intent + รองรับ theming ตั้งแต่ราก
- 2024–2025 active มาก: brand-refresh theme, surface detection, typography v2, motion tokens

## 1. Token architecture
- **โครงชื่อ 3 ส่วน:** `Foundation.Property.Modifier`
  - Foundation = ประเภท attribute (`color`, `space`, `elevation`)
  - Property = UI element ที่ใช้ (`background`, `text`, `border`, `icon`)
  - Modifier = บทบาท/สถานะ (`success`, `danger`, `subtle`, `default`)
- ตัวอย่าง: `color.background.default`, `color.icon.success`, `color.background.accent.blue.subtle`
- **Semantic-first:** ชื่อสื่อ "ใช้ทำอะไร" ไม่ใช่ "สีอะไร" → เปลี่ยนธีมโดยไม่แตะชื่อ token
- Semantic role มาตรฐาน: `danger`, `warning`, `success`, `discovery`, `information`
- 2024–2025 เพิ่ม `*.subtle` สำหรับ element ไม่ interactive (badge, status pill, callout), motion semantic tokens (experimental), typography theme v2

## 2. Theming / multi-brand
- ธีม default ปัจจุบัน = **light-brand-refresh / dark-brand-refresh** (เปลี่ยนจาก light/dark เดิม)
- **Surface detection:** UI อ่านสี surface ของ parent ผ่าน token/CSS var แล้วปรับสีตัวเองอัตโนมัติ แก้ปัญหา component ซ้อนบนพื้นหลายสี
- theming ทำที่ชั้น semantic token ล้วน → component code ไม่รู้จักธีม

## 3. Component library + variant model
- `@atlaskit/*` แยก package ต่อ component → เวอร์ชัน/อัปเกรดอิสระ
- ออกแบบให้ consume ผ่าน token props ไม่ hardcode สี → theme-safe โดยปริยาย
- Foundations (color/space/typography) แยกจาก components ชัดเจน

## 4. Documentation approach
- docs แยก **Foundations** (token, guideline, visual style) vs **Components** vs **Tokens reference** (all-tokens list ค้นได้)
- มี **Changelog ของ tokens** เป็นทางการ ระบุ token เพิ่ม/deprecate ทุกรุ่น → consumer วางแผน migrate ได้
- Preview สี + token ในแอปได้จาก docs

## 5. Governance / contribution
- Token ใหม่ผ่านทีมกลางที่คุม taxonomy เข้มงวด (ชื่อต้องเข้าโครง Foundation.Property.Modifier)
- ใช้ **deprecation แบบมี changelog** แทนการลบทันที → มี migration path
- แนวคิด "experimental" tokens (เช่น motion, typography v2) = ปล่อยของใหม่แบบ opt-in ก่อน promote เป็น stable

## 6. Tooling Figma↔code / pipeline / a11y
- ออกแบบด้วย token ใน Figma ได้โดยตรง (Figma Variables) + preview
- Token distribute เป็น CSS var / JS ให้ code consume; รองรับแนว Tokens Studio → JSON
- a11y ผูกกับ semantic color pair (มี text/background ที่การันตี contrast ต่อธีม)

## สิ่งที่ Nation DS ควรเรียนรู้
1. **Taxonomy `Foundation.Property.Modifier`** เป็นโมเดลตั้งชื่อที่ดีที่สุดในกลุ่มนี้ Nation ควรใช้เป็นแม่แบบชื่อ semantic token (เช่น `color.background.*`, `color.text.*`, `color.border.*`) ให้ชื่ออ่านแล้วรู้ intent แทนการอ้าง primitive
2. **Tokens changelog + deprecation แทนการลบ** Nation ควรมี changelog token เป็นทางการ + สถานะ `experimental`/`deprecated` เพื่อปล่อยของใหม่แบบ opt-in และให้ 6 เว็บวางแผน migrate โดยไม่พัง
3. **Surface detection** ไอเดียนี้ตรงกับปัญหาข่าว (card ซ้อนบนพื้น light/dark สลับ) ควรออกแบบ semantic pair แบบ surface-aware ตั้งแต่แรกในธีม light/dark ของ Nation
