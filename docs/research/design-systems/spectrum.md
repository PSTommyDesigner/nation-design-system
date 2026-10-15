# Adobe Spectrum (Spectrum 2) Design System Study

> Research date: 2026-07-10 Scope: 2024–2026 (Spectrum + Spectrum 2 / S2)
> เพื่อประกอบการปรับปรุง Nation Design System (6 เว็บข่าว, Figma + Style Dictionary, W3C DTCG)

## Overview
- Spectrum = design system ของ Adobe ครอบ Creative Cloud, Document Cloud, Experience Cloud ฯลฯ
- **Spectrum 2 (S2)** = major redesign ล่าสุด (rollout 2024–2026) ปรับ visual + ยกเครื่อง token/data ให้เป็น **data-driven** จริงจัง
- จุดเด่นวิศวกรรม: **tokens เป็น "design data" (JSON schema) แยกจาก implementation** + tooling รอบ token ครบที่สุดในสามเจ้า
- Repo กลาง: `adobe/spectrum-design-data` (เปลี่ยนชื่อจาก `spectrum-tokens`) open source

## 1. Token Architecture
- โครง 3 ชั้น (แนวเดียวกับ M3 แต่เป็น data-first):
  - **Primitive/global** ค่าดิบ (color ramp, dimension)
  - **Alias/semantic** context-aware ชี้ primitive เช่น `color/action/primary`
  - **Component** เจาะจง component
- Token เก็บเป็น **JSON schema** มี schema validation; แยก **token-name package** ออกจาก token-value package → "decouple taxonomy changes จาก value updates" (เปลี่ยนชื่อ token โดยไม่พังเวอร์ชัน)
- ชื่อ dev-facing แปลงตรง เช่น `color/action/primary` → `--color-action-primary` (เห็นได้ใน Figma Dev Mode)

## 2. Theming / Multi-brand
- Token เดียวกันแตกได้หลาย **set/context** พร้อมกัน:
  - **Color theme**: light / dark
  - **Platform scale**: desktop vs mobile (**คนละ scale** ค่า dimension/type ปรับตามความหนาแน่นและระยะมอง)
  - **Contrast**: standard / high-contrast
- Multi-brand: ใน Figma แต่ละแบรนด์ = **mode ของตัวเอง** ที่ override สี+typography ส่วนที่เหลือ (layout/spacing/component) แชร์ร่วม
- สลับ mode ใน Figma = ทั้ง frame เปลี่ยน token ทันที (light↔dark, brand↔brand)
- จุดแข็งเฉพาะ: **desktop/mobile เป็น scale แยก** ในระบบ token เดียว (สองเจ้าที่เหลือไม่เน้น)

## 3. Component Library + Variant Model
- Component schema กำหนดเป็น data ("**Component Options**") มี Figma plugin **Component Options Editor** authoring schema ของ option ต่อ component
- Variant = ชุด option (size t-shirt: S/M/L/XL, variant, state) นิยามใน schema แล้ว gen ทั้ง Figma + code จากแหล่งเดียว
- Implementation: React Spectrum + React Aria (accessibility-first behavior hooks) + Spectrum Web Components

## 4. Documentation
- `spectrum.adobe.com` foundations / tokens / components; token page มี dependency graph
- **S2 Visualizer** interactive dependency graph ของ token S2 (ancestor/descendant, filter ตามค่า, search) เห็น impact ก่อนแก้
- Tooling doc: `markdown-generator` gen เอกสารจาก token data อัตโนมัติ (docs ตาม data เสมอ)

## 5. Governance / Contribution
- **Open source เต็มรูป** monorepo: pnpm + **moon** (task orchestration) + **Changesets** (versioning)
- Contribution ผ่าน **Conventional Commits** + commitlint + husky; ทุกการเปลี่ยน token ต้องมี **changeset** (auto changelog + semver)
- Tooling governance เด่น: `token-diff-generator` (diff ระหว่าง release/branch), `token-naming-audit` (report "token debt"), `release-analyzer`
- Adobe เป็นสมาชิก W3C DTCG

## 6. Tooling Sync / Pipeline / a11y
- **Data-driven pipeline:** token JSON schema → transform tools → manifest → distribute หลาย platform (web/iOS/Android)
- Figma sync: modes = theme/brand/scale/contrast; Dev Mode โชว์ชื่อ token → dev copy ใช้ได้เลย
- เครื่องมือ CI: validator (schema conformance), diff generator, changeset generator (docs อัตโนมัติ)
- a11y: **React Aria** แยก behavior/a11y ออกจาก visual (keyboard/ARIA/focus การันตี); high-contrast เป็น token set แยก

## สิ่งที่ Nation DS ควรเรียนรู้
1. **Multi-brand = "mode ต่อแบรนด์" ในระบบ token เดียว** 6 เว็บ Nation ทำเป็น 6 modes (override สี+typography เท่านั้น) ที่เหลือแชร์; เข้ากับ Figma variable modes + Style Dictionary ที่มีอยู่ตรงๆ
2. **แยก token-name package จาก token-value + changeset governance** Nation กำลังโต (`tokens/tokens.json/*.json` per collection); การมี diff/audit/changeset ต่อการแก้ token จะกัน "token debt" และทำ changelog อัตโนมัติ (เอา `token-diff-generator`/`Changesets` เป็นแบบ)
3. **desktop/mobile เป็น scale แยกในระบบเดียว** Nation เว็บข่าวเป็น mobile-first (70%+ mobile) การมี scale mode แยกจะคุม type/spacing density บนมือถือได้โดยไม่ต้อง fork token; และ dependency graph (S2 Visualizer style) ช่วยเห็น impact ก่อนแก้ token ที่กระทบ 6 เว็บ
