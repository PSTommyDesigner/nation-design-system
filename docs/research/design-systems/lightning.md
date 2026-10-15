# Salesforce Lightning Design System (SLDS / SLDS 2)

> Research: enterprise DS benchmark อัปเดตข้อมูล 2024–2026 โฟกัส token + governance

## Overview
- DS ของ Salesforce สำหรับ Lightning Platform ออกแบบมาเพื่อ **multi-brand / per-org customization** ระดับสูงสุดในกลุ่มนี้
- Spring '25 เปิดตัว **SLDS 2** (beta) สถาปัตยกรรม CSS ใหม่ แยก "structure" ออกจาก "theme"
- เปลี่ยนจาก design token (SLDS 1) → **styling hooks** (CSS custom properties) เป็นแกนหลัก

## 1. Token architecture
- **SLDS 1:** design tokens (Aura `t()` / Sass) legacy
- **SLDS 2:** แทน design token ด้วย **styling hooks** = CSS custom properties ล้วน
- Namespace ทางการ = **`--slds`**
  - **Global styling hooks:** `--slds-g-*` (color, spacing, font, border ระดับระบบ ตัวที่ SLDS 2 รองรับ)
  - **Component styling hooks:** `--slds-c-*` (ระดับ component ยังใช้ได้เต็มใน SLDS 1; SLDS 2 ยังไม่รองรับเต็มถึง Summer '25)
- เหตุผลย้ายเป็น CSS var: ทำงานข้าม **Shadow DOM** ของ Lightning Web Components ได้ (design token แบบเดิมทะลุ shadow boundary ไม่ได้)

## 2. Theming / multi-brand
- **จุดแข็งสูงสุด:** structure/theme แยกกันด้วย styling hooks → เปลี่ยนแบรนด์/ธีมโดยไม่แตะ component
- ธีม default ของ SLDS 2 = **Cosmos**; เปิด SLDS 2 = activate ธีมที่ build บน SLDS 2
- ใช้ `--slds-g-*` เสมอ → component ได้สีถูกทั้ง **light + dark + custom brand** อัตโนมัติ
- ออกแบบมาเพื่อลูกค้าจำนวนมากปรับ brand ของตัวเองบน platform เดียว

## 3. Component library + variant model
- Base component ("blueprints") + Lightning Web Components; styling hooks เป็นช่องปรับ style ที่เปิดไว้
- component variant ปรับผ่าน hook ไม่ต้อง fork CSS
- ข้อควรระวัง: `--slds-c-*` hooks อาจไม่ทำงานตามคาดใต้ธีม Cosmos (SLDS 2) จนกว่ารองรับเต็ม

## 4. Documentation approach
- docs + Trailhead module (learning path) + developer guide สำหรับ LWC
- แยกเอกสาร SLDS 1 vs SLDS 2 ชัด + release notes ต่อ season (Spring/Summer/Winter)
- มี guide migrate เฉพาะ (design token → styling hooks)

## 5. Governance / contribution
- Centralized ของ Salesforce (ไม่ใช่ open contribution แบบ Carbon/Polaris) คุมทิศทางโดยทีมกลาง
- **จุดเด่น governance = migration discipline:** ปล่อย SLDS 2 เป็น beta ก่อน, ให้ SLDS 1 อยู่ขนานได้, มีเครื่องมือช่วยย้าย
- นโยบายเวอร์ชันผูก season release ของ platform (คาดเดาได้)

## 6. Tooling Figma↔code / pipeline / a11y
- **SLDS Validator** ช่วยแปลง styling จาก design token (SLDS 1) → global styling hooks
- **SLDS Linter** code analysis ช่วย migrate เข้า SLDS 2 + future-proof code
- styling hooks = CSS custom properties → ปรับ runtime, ข้าม Shadow DOM ได้
- a11y เป็น requirement หลักของ platform (accessible + scalable UI)

## สิ่งที่ Nation DS ควรเรียนรู้
1. **แยก structure ออกจาก theme ด้วย CSS custom properties + naming แบ่งชั้น `-g-` (global) / `-c-` (component)** โมเดลนี้ทำให้ธีม light/dark ของ Nation + ความต่างสไตล์ของ 6 เว็บ (bangkokbiznews vs komchadluek ฯลฯ) ทำได้โดยไม่ fork component; ตรงกับ pipeline CSS variable ของเราอยู่แล้ว
2. **Migration tooling (Validator + Linter)** Nation ควรมี lint rule จับ **hex ดิบ / token เลิกใช้** อัตโนมัติ (บังคับกฎ "ห้าม hex ดิบ" ของ CLAUDE.md ด้วยเครื่องมือ ไม่ใช่รีวิวมือ)
3. **ปล่อยของใหญ่แบบขนาน + beta** เวลาปรับ token architecture ครั้งใหญ่ ให้ระบบเก่าอยู่ขนานชั่วคราว + มี migration guide แทนการ big-bang (สำคัญเมื่อมี 6 เว็บ consume พร้อมกัน)
