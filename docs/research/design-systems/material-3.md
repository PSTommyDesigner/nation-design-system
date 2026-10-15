# Google Material 3 (Material You) Design System Study

> Research date: 2026-07-10 Scope: 2024–2026 (Material 3 + M3 Expressive)
> เพื่อประกอบการปรับปรุง Nation Design System (6 เว็บข่าว, Figma + Style Dictionary, W3C DTCG)

## Overview
- Material 3 (M3) = generation ล่าสุดของ Material Design ต่อจาก M2 เน้น **personal, adaptive, expressive**
- จุดขายหลัก: **Dynamic Color (Material You)** สร้างธีมทั้งชุดจากสีเดียว (seed color) เช่นดึงจาก wallpaper ผู้ใช้
- **M3 Expressive** (2025) = ส่วนขยาย เพิ่ม shape system (35 shapes, corner-radius 10 สเต็ป), physics-based motion, emphasized typography, shape morphing
- Token เป็น single source of truth ทุกค่า style · roadmap 2024–2026 กำลังเพิ่ม shape/motion tokens แล้วต่อด้วย density & spacing tokens

## 1. Token Architecture
- โครง 3 ชั้นชัดเจน + naming แบบ dot namespace:
  - **Reference tokens** `md.ref.*` ค่าดิบ (palette เช่น `md.ref.palette.primary40`, typeface)
  - **System tokens** `md.sys.*` ชั้น semantic ให้ "role" เช่น `md.sys.color.primary`, `md.sys.typescale.body-large`, `md.sys.elevation.level2`
  - **Component tokens** `md.comp.*` เจาะจง component เช่น `md.comp.fab.container.color` → ชี้ไป `md.sys.color.primary-container`
- Flow การ bind: `comp → sys → ref` (component ห้ามชี้ ref ตรงๆ) ตรงกับกฎ Nation ที่ให้ bind ผ่าน `component` collection
- Naming เป็น **role-based** ไม่ใช่ value-based (บอกหน้าที่ ไม่บอกสี) เช่น `on-primary`, `surface-container-high`

## 2. Theming / Multi-brand
- **Dynamic Color** ใช้ color space **HCT** (Hue-Chroma-Tone): seed 1 สี → gen **tonal palettes** 13 tones (0–100) ต่อ 5 กลุ่ม (primary/secondary/tertiary/neutral/neutral-variant)
- Light/Dark = map tone ต่างกันบน role เดียวกัน: light ใช้ tone เข้ม (primary = tone 40), dark ใช้ tone อ่อน (primary = tone 80) สลับธีมโดยไม่แตะชื่อ role
- Contrast pairs สำเร็จรูป: ทุก `color` มีคู่ `on-color` การันตี contrast (accessibility ในตัว)
- Multi-brand ทำผ่าน "seed + fixed palette overrides" brand กำหนด seed หรือ lock บาง palette; แต่ระบบ **โน้มไป single-brand generative** (M3 ออกแบบมาเพื่อ personalization ระดับ user มากกว่า multi-brand ระดับองค์กร)
- Tool: **Material Theme Builder** (Figma plugin) ป้อน seed → export baseline theme + light/dark

## 3. Component Library + Variant Model
- Components มาพร้อม role mapping ครบ (แต่ละ component รู้ว่าใช้ sys token ตัวไหน)
- Variant ผ่าน "แบบของ component" เช่น Button 5 แบบ (elevated/filled/filled-tonal/outlined/text), FAB (regular/small/large/extended)
- Expressive เพิ่ม state ผ่าน shape morphing (rest → pressed เปลี่ยน shape) และ 10-step corner radius scale
- แจก implementation หลาย platform: Android (Jetpack Compose), Flutter, Material Web (web components)

## 4. Documentation
- เว็บ `m3.material.io` โครง foundations / styles / components พร้อม interactive spec
- แต่ละ component มี anatomy, states, spec ค่า token ตรงๆ, do/don't
- เอกสาร token แยกเป็น overview + how-to-use + ตาราง reference/system/component ครบ

## 5. Governance / Contribution
- **Closed governance** Google เป็นเจ้าของทิศทาง ไม่รับ external contribution เข้าตัว spec โดยตรง
- แต่ implementations (Material Web, Compose, Flutter) เป็น open source บน GitHub รับ issue/PR
- Google เป็นสมาชิก **W3C Design Tokens Community Group (DTCG)** ร่วมกำหนดมาตรฐานกลาง

## 6. Tooling Sync / Pipeline / a11y
- **Figma → code:** Material Theme Builder export ได้ Android XML, Jetpack Compose, และ variables; ใช้ Figma "Export to JSON" ได้ DTCG-aligned → ป้อน **Style Dictionary** ได้
- Token pipeline: DTCG (`$value`/`$type`) → Style Dictionary 4 (CI) → CSS vars / Compose / Swift / Kotlin
- Figma variable **modes** = light/dark (สลับทั้ง frame ทันที)
- a11y: contrast การันตีจากคู่ `color`/`on-color` + tonal system; expressive เพิ่ม state layer opacity มาตรฐาน

## สิ่งที่ Nation DS ควรเรียนรู้
1. **แยก 3 ชั้น comp→sys→ref เข้มงวด + naming แบบ role** ตรงกับกฎ Nation อยู่แล้ว (bind ผ่าน `component` เท่านั้น); เอา pattern `on-<role>` มาใช้เพื่อการันตี contrast text-on-surface ทุกธีม
2. **คู่ color/on-color สำเร็จรูป** ลดโอกาสผูกสีผิดจนอ่านไม่ออก เหมาะกับ 6 เว็บที่มี surface หลายระดับ
3. **ข้อควรระวัง multi-brand:** M3 เก่ง personalization แต่ *ไม่* ได้ออกแบบเพื่อ 6 แบรนด์ที่ identity ต่างกันชัด Nation ควรดู Fluent/Spectrum เป็นหลักเรื่อง multi-brand แล้วยืมแค่ tonal-palette discipline ของ M3 มาทำ ramp ต่อแบรนด์
