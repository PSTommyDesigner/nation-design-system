# Microsoft Fluent 2 Design System Study

> Research date: 2026-07-10 Scope: 2024–2026
> เพื่อประกอบการปรับปรุง Nation Design System (6 เว็บข่าว, Figma + Style Dictionary, W3C DTCG)

## Overview
- Fluent 2 = design system ของ Microsoft ครอบ Windows, Office/Microsoft 365, Teams, web (Fluent UI React v9)
- ปรัชญา: consistent ข้ามแพลตฟอร์ม + **brandable** ออกแบบมาให้ product/พาร์ตเนอร์ inject แบรนด์ตัวเองได้
- โดดเด่นเรื่อง **multi-brand ผ่าน brand ramp injection** (คนละแนวกับ M3 ที่ generate จาก seed)

## 1. Token Architecture
- โครง **2 ชั้น** (compact กว่า M3):
  - **Global tokens** ค่าดิบ context-agnostic เช่น `Global.Color.Blue.60`, ครอบทั้งสี typography radius stroke animation
  - **Alias tokens** ชั้น semantic ชี้ไป global; JSON prefix `Set` เช่น `colorBrandBackground`, `colorNeutralForeground1`
- Naming alias เป็น 5 ส่วน: **Set + [token set] + [element] + [property] + [state]** อ่านเป็นประโยค "สิ่งที่ใช้ set (2) มี (3) ที่ควรเป็น (4) เมื่อ (5)"
- State อยู่ในชื่อ token เลย: Rest / Hover / Pressed / Disabled / Selected (เช่น `...Hover`)
- Property ครอบ Fill, Stroke, Font, Shadow, CornerRadius, Layout, Padding, Spacing
- ไม่มีชั้น component token แยกชัดเท่า M3 alias ทำหน้าที่ semantic + ใกล้ component ในตัว

## 2. Theming / Multi-brand
- **หัวใจ: brand ramp injection** product ป้อน **brand ramp 16 เฉด** ของสีแบรนด์ → ระบบ map เข้ากับ **alias token ~160 ตัว** อัตโนมัติ
- ต่างจาก M3: ไม่ generate จาก seed เดียว แต่ให้ควบคุมทั้ง ramp เอง → คุม identity ได้แม่นกว่า (เหมาะ multi-brand จริง)
- Theme ที่รองรับ: **light, dark, high-contrast, branded** theming เกิดที่ชั้น alias (สลับ mapping alias→global เปลี่ยนหน้าตาทั้งแอป)
- Fluent UI React v9: `createLightTheme(brandRamp)` / `createDarkTheme(brandRamp)` → ได้ theme object พร้อมใช้ผ่าน `FluentProvider`
- High-contrast เป็น first-class theme (สำคัญเพราะ Windows accessibility)

## 3. Component Library + Variant Model
- Fluent UI React v9 (`@fluentui/react-components`) components ใช้ **Griffel** (CSS-in-JS) อ่านค่าจาก token object
- Variant model: props + `appearance` (เช่น Button: primary/outline/subtle/transparent) + size + shape
- Slot-based composition (component ประกอบจาก slot ที่ override style ได้)
- Token ผูกกับ component ผ่าน theme context ไม่ hardcode

## 4. Documentation
- `fluent2.microsoft.design` foundations / color / tokens / components พร้อม UI kit (web + iOS)
- ทุก component: anatomy, states, usage, token ที่เกี่ยวข้อง
- Developer docs แยก (Microsoft Learn + Storybook) สำหรับ React v9

## 5. Governance / Contribution
- **Open source** บน GitHub (`microsoft/fluentui`, `microsoft/fluentui-token-pipeline`)
- รับ contribution แต่ต้องเซ็น **CLA** + ปฏิบัติตาม Microsoft Open Source Code of Conduct
- มี RFC process (เช่น "Fluent Semantic Tokens" RFC) เปิดถกก่อนเปลี่ยน token architecture
- Microsoft เป็นสมาชิก W3C DTCG

## 6. Tooling Sync / Pipeline / a11y
- **fluentui-token-pipeline** = pipeline เฉพาะของ Microsoft (มาก่อน Style Dictionary จะนิ่ง) รับ JSON → gen source หลาย platform (web/iOS/Android/WinUI)
- สำคัญ: pipeline **อ่าน DTCG format ได้แล้ว** และ Microsoft ประกาศทิศทาง "จะย้ายไปใช้ solution มาตรฐาน open source" (คือ DTCG/Style Dictionary) แทน tool proprietary เดิม
- Token naming แปลงต่อ platform อัตโนมัติ (`Global.Color.Blue.60` → `colorBlue60` บน web)
- a11y: contrast ถูกดูแลที่ alias (neutral foreground/background pairs), high-contrast theme แยก, ramp injection ยังคุม contrast

## สิ่งที่ Nation DS ควรเรียนรู้
1. **Brand ramp injection = โมเดลที่ตรงกับ Nation ที่สุด** 6 เว็บ (bangkokbiznews/nationtv/komchadluek/thansettakij/springnews/posttoday) แต่ละแบรนด์ป้อน ramp สีตัวเอง แล้ว map เข้า alias ~160 ตัวชุดเดียวกัน → โครงสร้าง/สเปซซิ่ง/component แชร์หมด เปลี่ยนแค่ brand ramp
2. **แยก brand tokens ออกจาก neutral/status ชัด** (Fluent จัด alias เป็น neutral/brand/status/generic) Nation ควรทำ collection แบรนด์ที่ swap ได้ ส่วน neutral+status ใช้ร่วม
3. **High-contrast เป็น theme แยก** ไม่ใช่ปรับจาก dark Nation ควรวางโครง mode ให้เพิ่ม hc ได้ในอนาคตโดยไม่รื้อ; และ Fluent พิสูจน์ว่า DTCG/Style Dictionary (ที่ Nation ใช้อยู่) คือทิศทางถูกแล้ว
