# Vox Media Chorus / Unison Design System

> Research reference สำหรับ Nation Design System อัปเดต 2026-07-10
> โฟกัส: multi-brand editorial บน codebase เดียว (เคสตรงกับ Nation ที่สุด)

## Overview
Vox Media ทำ **Unison Project** (multi-year) รวม **8 แบรนด์ editorial + 300+ team sites** ให้อยู่บน
**design system + codebase เดียว** โดยยังรักษา identity ของแต่ละแบรนด์
แบรนด์: The Verge, Eater, Polygon, Curbed, Recode, Vox.com, Racked, SB Nation
- **Chorus** = CMS/platform
- **Unison** = design system (front-end counterpart ของ Chorus)
ปรัชญาหลัก: **"design brands, not websites"** (ออกแบบแบรนด์ ไม่ใช่ทำเว็บทีละเว็บ)
เดิมแต่ละแบรนด์ถูก custom-engineer แยก (bespoke CSS/layout/logic ตั้งแต่ 2011) → กระจัดกระจาย
ผลลัพธ์: โหลดเร็วขึ้น ~50% page size เล็กลง 60–70% launch จากหลักเดือนเหลือหลักสัปดาห์ 100% traffic วิ่งบน Unison

**นี่คือ blueprint ที่ Nation (6 เว็บ) ควรศึกษาเป็นอันดับแรก**

## 1. Token architecture + multi-brand
- **configurable design tokens** แบรนด์ปรับ layout / typography / shape / color ได้เองผ่าน token
  โดยไม่แตะ core codebase
- โครง: core templates + UI components ร่วม → แต่ละแบรนด์ override ผ่าน token + เพิ่ม module เฉพาะจุดตามต้องการ
- documentation ครอบ: design principles + patterns for editorial goals + content & token guidelines
  (ไม่ใช่แค่ documentation component)

## 2. Theming
- Theming = ปรับชุด token ต่อแบรนด์ (typography/color/shape/layout) บน component ร่วม
- **จุดเด่น: มี "expressive module" เฉพาะแบรนด์** เช่น module คะแนน/สรุปเกม (game scores) ของ SB Nation
  ถูกออกแบบให้เป็นจุดที่แบรนด์ปล่อยของ แสดง voice ตัวเอง โดยไม่ทำลายโครงร่วม
- สมดุล: shared components (โครง) + pointed additions (จุดที่แบรนด์ต่าง)

## 3. Component เฉพาะข่าว
- core templates รองรับ **ทุก content type** (mobile-first)
- **build once, reuse everywhere**: แบรนด์หนึ่งต้องการ gallery format → สร้างครั้งเดียว ใช้ได้ทุกแบรนด์
- expressive modules ต่อแบรนด์สำหรับจุดที่ต้องการ voice เฉพาะ

## 4. Typography
typography เป็น **"expression lever" หลัก** ในการแยกแบรนด์
กำกับด้วยหลักการของ Unison (principles) ไม่ใช่กฎ prescriptive ตายตัว → แบรนด์เลือก typography ต่างกันได้บนกรอบเดียว

## 5. Performance / Accessibility จุดขายใหญ่
- โหลดเร็วขึ้น ~50% · page size เล็กลง 60–70%
- หลักคิดสำคัญ: **"every optimization benefited every brand iteration เป็นตัวคูณ"**
  แก้ perf ครั้งเดียวที่ shared component → ทุกแบรนด์ได้ประโยชน์พร้อมกัน
- mobile-first ตั้งแต่ต้น (ตรงกับผู้อ่านเรา 70%+ mobile)

## 6. Governance
- ปรัชญาเปลี่ยนจาก "สร้างเว็บ" เป็น "ออกแบบแบรนด์บนแพลตฟอร์มร่วม"
- shared architecture = การปรับปรุงเป็น multiplier ข้ามแบรนด์ (แรงจูงใจให้ทุกทีมลงทุนใน DS ร่วม)
- แบรนด์เพิ่ม module เฉพาะได้ แต่ต้องอยู่ในกรอบ token/principle ของ Unison

## สิ่งที่ Nation DS ควรเรียนรู้
1. **"design brands, not websites" = โมเดลเป้าหมายของ 6 เว็บ** component + template ร่วมชุดเดียว
   ให้แต่ละเว็บ (bangkokbiznews, komchadluek, thansettakij ฯลฯ) ปรับผ่าน configurable token
   (typography/color/shape/layout) ไม่ต้อง maintain 6 codebase ลดต้นทุนมหาศาลและ launch เว็บ/หมวดใหม่ได้เร็ว
2. **เปิด "expressive module" ให้แต่ละแบรนด์ปล่อยของอย่างมีขอบเขต** โครงร่วม 90% + จุดเด่นเฉพาะแบรนด์ 10%
   (เช่น กราฟหุ้น/ราคาทองของ thansettakij, การ์ด entertainment ของ springnews) ได้ voice โดยไม่แตก system
3. **ผูก performance เข้ากับ shared component เป็นแรงจูงใจ governance** สื่อสารกับทีมว่า optimize DS ครั้งเดียว
   = ทุกเว็บได้ Core Web Vitals ดีขึ้นพร้อมกัน (ผู้อ่าน mass + mobile-first) ทำให้การลงทุนใน DS ร่วมคุ้มและขายง่ายภายในองค์กร

## Sources
- [Vox Media Unison (Yesenia Perez-Cruz portfolio)](https://www.yeseniaperezcruz.com/projects/vox-media)
- [Audience experience at Vox Media (Bethany Heck portfolio)](https://heckhouse.com/work/vox-media/)
