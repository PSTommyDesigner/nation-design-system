# Shopify Polaris

> Research: enterprise DS benchmark อัปเดตข้อมูล 2024–2026 โฟกัส token + governance

## Overview
- DS ของ Shopify สำหรับ merchant admin หนึ่งใน public DS ที่ครบที่สุด (foundation + component + content guideline + a11y)
- Token เผยแพร่แยก package `@shopify/polaris-tokens` (open source บน GitHub)
- 2025 pivot สำคัญ: ออก **Polaris Web Components** (1 ต.ค. 2025) เป็น foundation ที่ framework-agnostic; React lib เดิม deprecated

## 1. Token architecture
- **2 ชั้น:** *palette tokens* (core color ดิบ) → *alias / semantic tokens* (developer-facing, ผูก role)
- Prefix + kebab-case: **`--p-color-bg-surface`**, `--p-color-text`, `--p-space-*`
- โครงชื่อ semantic: `group + subgroup + variant` เช่น `color-bg-surface`
- **State ต่อท้าย token:** `-hover`, `-active`, `-selected`, `-disabled` (เช่น `--p-color-bg-surface-hover`)
- Component token (เสนอ pattern): `--p-color-{component}-{variant}-{...}` เช่น `--p-color-avatar-fill`
- Space token ต้องใช้กับทุก property เชิงระยะ (padding/margin/gap) บังคับ consistency

## 2. Theming / multi-brand
- Token abstraction คั่น hex ออกจากการใช้งาน → เปลี่ยนสีระดับใหญ่ที่ชั้น alias จุดเดียว
- โฟกัสหลักคือ admin ของ Shopify (ไม่ใช่ multi-brand หลายลูกค้าแบบ Salesforce) จุดแข็งคือ **ความสม่ำเสมอ** มากกว่าความยืดหยุ่นหลายแบรนด์
- Web Components ใหม่ใช้ CSS custom properties → theme/override ข้าม framework ได้

## 3. Component library + variant model
- API component สะอาด/สม่ำเสมอสูง เป็นจุดเด่นที่คนยกย่อง
- ย้ายจาก React-only → **Web Components** เพื่อรองรับทุก framework + plain JS + server-rendered
- Component ผูก alias token ล้วน ไม่แตะ palette ดิบ

## 4. Documentation approach
- docs รวม design foundation + component + **content/UX writing guideline** + a11y standard
- Token reference มีหน้าเฉพาะ (color/space/layout) + versioned token pages (เช่น v11) ให้ย้อนดู
- เดิมมี Storybook ครบทุก component

## 5. Governance / contribution
- **Core team รวมศูนย์** เป็นเจ้าของ canonical component + token; product team contribute ผ่าน public process
- **Token เปลี่ยนต้องผ่าน internal RFC**; component เปลี่ยนขึ้นเวอร์ชันพร้อม **deprecation period**
- มี template ชัดเจน (request / design proposal / code patch) ลด barrier การ contribute ข้ามทีม
- **Council/DS team triage** proposal + compatibility review + quality gate (automated test + manual review)
- semver + migration guide + feature flag / opt-in release กัน breaking change

## 6. Tooling Figma↔code / pipeline / a11y
- `@shopify/polaris-tokens` = source of truth แจกเป็น JSON/CSS/JS ให้ consume ได้หลายทาง
- Figma UI Kit อัปเดตโดยพนักงาน Shopify (design↔token ตรงกัน)
- a11y เป็น standard ในตัว docs (contrast จาก semantic token, keyboard, ARIA)

## สิ่งที่ Nation DS ควรเรียนรู้
1. **แยก palette (ดิบ) กับ alias/semantic (ใช้งาน) เด็ดขาด + prefix เดียว** Nation ใช้กฎ "bind จาก collection `component`" อยู่แล้ว โมเดล `--p-color-bg-surface` ยืนยันว่า dev ควรแตะเฉพาะชั้น semantic; primitive ห้าม consume ตรง (= กฎห้าม hex ดิบของเรา)
2. **State encode ในชื่อ token** (`-hover/-active/-disabled`) pattern ที่ Nation ควรรับมาทำ interactive state ให้เป็นระบบ แทนคำนวณสี state เอง
3. **Contribution แบบ RFC + template + deprecation period + semver** เหมาะกับ Nation ที่มี 6 เว็บ consume ร่วมกัน: token เปลี่ยนต้องมี RFC + migration guide กันเว็บใดเว็บหนึ่งพัง
