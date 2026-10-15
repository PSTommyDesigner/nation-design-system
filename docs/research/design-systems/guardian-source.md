# The Guardian Source Design System

> Research reference สำหรับ Nation Design System อัปเดต 2026-07-10
> โฟกัส: editorial typography + section-based theming

## Overview
**Source** คือ design system ของ The Guardian ที่รวม brand + editorial + UX design ไว้ด้วยกัน
เป็น open-source (guardian.github.io/theguardian.design) และมี tokens/components เปิดให้ใช้ (แต่ผูกกับ React + @emotion/react)
จุดเด่นสุดคือ **typography system สำหรับงานอ่านยาว/หนังสือพิมพ์รายวัน** และ **สีแบบผูกกับหมวดข่าว (section)**

5 หลักการหลัก: start with intent practice radical clarity spark powerful conversations
generate real hope play with expectations

## 1. Token architecture + multi-brand
Guardian เป็นแบรนด์เดียว (ไม่ multi-publication แบบ BBC/Vox) แต่ **จัดการหมวดข่าวเหมือน sub-brand ด้วยสี**
มีชุด tokens ทั้ง CSS/SCSS (interactive-style-library) แยกใช้ในงาน Visuals/interactive
โมเดล token ของ Source เป็นแบบ **preset-first**: pre-decide ทุก combination ที่ valid ไว้ล่วงหน้า

## 2. Theming
**สีเป็น section-based** แต่ละสีแทน "เสาหลักของงานข่าว" (journalism pillar/หมวด)
เพจในหมวดต่างกันเปลี่ยน accent color ตามหมวด แต่โครง/typography คงเดิม
Brand element (titlepiece + roundel) มีกฎ placement ตายตัว (align มุมขวาบน/ขวาล่างเสมอ)

## 3. Component เฉพาะข่าว
Source ครอบ card/headline/media สำหรับ front + article
โครง component เน้น "โครงเดียว เปลี่ยน accent ตามหมวด" (structural coherence + sectional expression)

## 4. Typography จุดแข็งที่สุด (โมเดลที่ Nation ควรลอก)
- ตระกูลฟอนต์ Guardian = **4 family ทำงานร่วมกัน**: Egyptian (headline), Text Egyptian (body),
  Sans (headline 4 ความกว้าง), Text Sans ครอบทุกความต้องการของหนังสือพิมพ์รายวัน
- ในระบบ Source ใช้แกน 3 typeface: Titlepiece (brand) · Headline · Text Egyptian (body)
- **~100 typography tokens** = named presets เกือบทุก combination ของ family/weight/style/size
  แต่สร้างจากฐานแค่ **12 sizes**
- **preset-based:** ทุก combo ที่ valid ถูกตัดสินไว้แล้ว → "ไม่มีใคร (คนหรือ AI agent) ประกอบ combination ผิดได้"
- **scale ออกแบบตามข้อจำกัด editorial จริง**: word count ของ headline + ขนาดที่อ่าน body สบายตา

## 5. Performance / Accessibility
- "radical clarity" เป็นหลักการหลัก → hierarchy อ่านง่ายเป็นเกณฑ์
- preset ช่วยกันค่า typography/สีที่ contrast ไม่ผ่านตั้งแต่ต้น

## 6. Governance
- Source เป็น open design system + open code (GitHub) → contribution ชัดเจน
- แยก "Foundations / Design system / Conversations / Jobs" เป็นหมวด documentation
- โมเดล preset = governance ในตัว: จำกัดทางเลือกให้ถูกต้องโดยดีไซน์ ลดการ review รายเคส

## สิ่งที่ Nation DS ควรเรียนรู้
1. **สร้าง typography เป็น preset ไม่ใช่ token ดิบ** จากฐานไม่กี่ size (Guardian ใช้ 12) ประกอบเป็น named preset
   ครบทุก combination ที่ valid (heading/h1-bold, lead ฯลฯ ที่เรามี 63 styles อยู่แล้ว) แล้ว **ห้าม compose เอง**
   ประโยชน์ตรงกับทีมเรา: ทั้งคนและ AI agent จะประกอบ Prompt/Sarabun ผิดคู่ไม่ได้เลย
2. **ออกแบบ type scale จากข้อจำกัดข่าวจริง** วัด word count headline ไทยและขนาด body Sarabun ที่อ่านยาวสบายตา
   ก่อน fix scale (ภาษาไทยความสูง x-height/บรรทัดต่างจากอังกฤษ อย่าลอก scale ฝรั่งตรงๆ)
3. **Section color = sub-brand แบบเบา** ถ้าไม่อยากทำ 6 แบรนด์เต็ม ใช้โมเดล Guardian: โครง+typography เดียว
   เปลี่ยนแค่ accent color ตามหมวด/เว็บ ได้ความต่างของแบรนด์โดยไม่แตก system

## Sources
- [Source The Guardian Design System](https://guardian.github.io/theguardian.design/)
- [50 design token files, one problem (typography presets)](https://learn.thedesignsystem.guide/p/50-design-token-files-one-problem)
- [The Guardian digital design system (CSS-Tricks)](https://css-tricks.com/the-guardian-digital-design-system/)
- [Guardian interactive-style-library (GitHub)](https://github.com/guardian/interactive-style-library)
- [Guardian typeface review (Typographica)](https://typographica.org/typeface-reviews/guardian/)
