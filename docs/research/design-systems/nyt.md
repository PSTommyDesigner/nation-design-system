# The New York Times Design System

> Research reference สำหรับ Nation Design System อัปเดต 2026-07-10
> โฟกัส: editorial typography + section-specific systems + token layers

## Overview
NYT ไม่มี "monolithic component library" ตัวเดียว แต่ใช้แนวคิด **section-specific visual systems**:
แต่ละหมวด (Lifestyle, Opinion, Today, Games ฯลฯ) มี identity ของตัวเอง แต่ยัง coherent ทั้งเว็บ
โฟกัสหลักคือ **storytelling** designer ทำงานกับ newsroom สร้าง story format (image/text/video/audio หลาย layout)
โดยชั่งน้ำหนักระหว่าง component ที่ reuse ได้กับความต้องการเฉพาะข่าว
(news stakeholders สนใจ "วิธีเล่าเรื่องที่ดีที่สุด" มากกว่ายึด component ตายตัว)

## 1. Token architecture (จาก NYT Games เคสที่ documented ชัดสุด)
โครง token 3 ชั้นแบบมาตรฐาน:
- **primitive/base tokens** รวบ hex ดิบทั้งหมดมาเป็นฐาน
- **semantic tokens** map ความหมายทับ primitive
- **component tokens** เฉพาะ component
implement เป็น **CSS variables** (สี/spacing/typography) เพื่อ scale + สลับธีมได้
มี **3 semantic color libraries แยก**: Games Home Surfaces Games Brand Gameplay Color
→ บทเรียน: หมวด/product ที่ต่างกันมี semantic library ของตัวเอง แต่ยืนบน primitive ชุดเดียว

## 2. Theming
- Dark mode ทำผ่าน token: นิยาม token หลายชุด (light/dark) แล้วสลับ dynamically
- ทุก visual element อัปเดตพร้อมกันเมื่อเปลี่ยนธีม เพราะผูก CSS variable
- documented ใน **Storybook** เพื่อให้ทุก stakeholder ใช้ง่าย (React + CSS modules)

## 3. Component เฉพาะข่าว
- **section-specific systems** แทน library เดียว: แต่ละหมวดมี visual identity ต่าง
- **storytelling components / story formats** จับ image+text+video+audio หลาย layout
- balance ระหว่าง reusable DS elements กับ editorial flexibility (ยอมให้ข่าวใหญ่ break pattern ได้)

## 4. Typography โมเดล "หน้าที่ของฟอนต์"
ระบบ 3 typeface หลักในดิจิทัล:
- **NYT Cheltenham** headline/editorial (เสียง narrative)
- **NYT Imperial** body/อ่านยาว
- **NYT Franklin** (custom Franklin Gothic, Matthew Carter 2007) **ทุกอย่างที่ไม่ใช่ editorial copy**:
  byline, timestamp, caption, section label, navigation
- หลักคิดสำคัญ: **sans = "ข้อมูลเชิงหน้าที่" · serif = "เรื่องเล่า"** ฟอนต์เป็น cue บอกผู้อ่านว่านี่ label หรือ story
- palette แสดงออกกว้างมาก: ~212 color combination × 24 cut ของ Franklin/Cheltenham ในระบบเดียว

## 5. Performance / Accessibility
- CSS variables + token layers = สลับธีม/หมวด โดยไม่ต้องเขียน CSS ซ้ำ (ดีต่อ payload)
- Storybook เป็น single reference ลด drift ข้ามทีม

## 6. Governance
- ทำงานผ่าน **Figma** เป็นหลัก, collaborate แบบ async ("hop into Figma" แทน video call)
- แต่ละ section/product ดูแล semantic library ของตัวเอง บน primitive ร่วม → กระจายอำนาจแต่ยึดฐานเดียว
- (เทียบ The Economist: type scale + grid กลางตัวเดียว flexible ครอบ web/app/newsletter, variables mirror เป็น code tokens)

## สิ่งที่ Nation DS ควรเรียนรู้
1. **แยกฟอนต์ตาม "หน้าที่" ให้ชัด** กำหนดบทบาท Prompt vs Sarabun แบบ NYT: ตัวหนึ่งเป็น "เสียงเล่าเรื่อง"
   (headline/body ยาว) อีกตัวเป็น "ข้อมูลหน้าที่" (byline, timestamp, label, nav) แล้วผูกเป็น semantic typography token
   ตามบทบาท ไม่ใช่ตามขนาด ผู้อ่านจะแยก "label กับ story" ได้ทันทีทั่วทั้ง 6 เว็บ
2. **primitive เดียว → semantic library ต่อเว็บ/หมวด** เก็บ primitive ramp ชุดเดียว (เรามี ntgds1/2, ams อยู่แล้ว)
   แล้วให้แต่ละเว็บ/หมวดมี semantic mapping ของตัวเองทับลงไป (แบบ 3 libraries ของ NYT Games)
   ตรงกับ layer `component` ที่เราบังคับให้ bind
3. **ยอมให้ข่าวใหญ่ break pattern อย่างมีระบบ** อย่าออกแบบ DS ให้ rigid จน newsroom เล่าเรื่องไม่ได้
   เตรียม "story format / storytelling components" ที่ยืดหยุ่นสำหรับ breaking news / long-form / infographic โดยเฉพาะ

## Sources
- [The NYT Games' Path to Dark Mode (NYT Open)](https://medium.com/timesopen/the-new-york-times-games-path-to-dark-mode-345dfe464e1a)
- [How Publishers Use Figma to Design the News (Figma Blog)](https://www.figma.com/blog/in-good-company-how-publishers-use-figma-to-help-design-the-news/)
- [NYT Franklin in use (Fonts In Use)](https://fontsinuse.com/typefaces/12496/nyt-franklin)
- [Every Font Used by The New York Times (Sensatype)](https://sensatype.com/every-font-used-by-the-new-york-times-in-2025)
